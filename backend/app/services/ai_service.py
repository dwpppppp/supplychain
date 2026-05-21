import hashlib
import logging
from collections.abc import AsyncIterator
from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession

from app.core.middleware import check_dedup, get_tts_cache, set_dedup, set_tts_cache
from app.crud.chat_crud import (
    create_conversation,
    create_message,
    find_message_by_text_hash,
    get_conversation,
    get_recent_messages,
    list_conversation_messages,
    list_conversations,
)
from app.engine.llm import chat_completion, chat_completion_stream
from app.engine.rag import retrieve_knowledge
from app.engine.tts import estimate_duration_ms, synthesize_speech
from app.schemas.chat_schemas import ConversationMessageOut, ConversationOut, MessageOut

logger = logging.getLogger(__name__)


async def create_chat_conversation(
    db: AsyncSession,
    user_id: int,
    scene: str = "assistant",
) -> ConversationOut:
    conv = await create_conversation(db, user_id, scene)
    return ConversationOut.model_validate(conv)


async def get_chat_conversations(
    db: AsyncSession,
    user_id: int,
    page: int = 1,
    page_size: int = 20,
    scene: Optional[str] = None,
) -> tuple[list[ConversationOut], int]:
    items, total = await list_conversations(
        db,
        user_id,
        scene=scene,
        page=page,
        page_size=page_size,
    )
    return [ConversationOut.model_validate(item) for item in items], total


async def get_chat_conversation_messages(
    db: AsyncSession,
    user_id: int,
    conversation_id: str,
    limit: int = 100,
) -> list[ConversationMessageOut]:
    conv = await get_conversation(db, conversation_id, user_id)
    if not conv:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail={"code": 40401, "message": "Conversation not found"},
        )

    messages = await list_conversation_messages(db, conversation_id, limit=limit)
    return [
        ConversationMessageOut(
            id=message.id,
            conversation_id=message.conversation_id,
            role=message.role,
            content=message.content,
            audio_url=message.audio_url,
            duration_ms=message.audio_duration_ms,
            created_at=message.created_at,
        )
        for message in messages
    ]


async def send_chat_message(
    db: AsyncSession,
    user_id: int,
    conversation_id: str,
    content: str,
    response_mode: str = "text",
) -> MessageOut:
    conv = await get_conversation(db, conversation_id, user_id)
    if not conv:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail={"code": 40401, "message": "Conversation not found"},
        )

    cached = await check_dedup(user_id, content, response_mode)
    if cached:
        return MessageOut(**cached)

    await create_message(db, user_id, conversation_id, "user", content)

    rag_context = await retrieve_knowledge(content)
    logger.info("RAG context: %s", rag_context[:200] if rag_context else "None")

    history = await get_recent_messages(db, conversation_id, limit=40)
    lm_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in history
        if msg.role in ("user", "assistant")
    ]

    reply_text, token_count = await chat_completion(lm_messages, rag_context=rag_context)

    text_hash = hashlib.md5(reply_text.encode()).hexdigest()
    audio_url: Optional[str] = None
    duration_ms: Optional[int] = None

    if response_mode == "voice":
        cached_url = await get_tts_cache(text_hash)
        if cached_url:
            audio_url = cached_url
            duration_ms = len(reply_text) * 100
        else:
            existing_msg = await find_message_by_text_hash(db, text_hash)
            if existing_msg and existing_msg.audio_url:
                audio_url = existing_msg.audio_url
                duration_ms = existing_msg.audio_duration_ms
                await set_tts_cache(text_hash, audio_url)
            else:
                try:
                    audio_url = await synthesize_speech(reply_text)
                    duration_ms = estimate_duration_ms(char_count=len(reply_text))
                    await set_tts_cache(text_hash, audio_url)
                except Exception as exc:
                    logger.error("TTS failed: %s", exc)

    ai_msg = await create_message(
        db,
        user_id,
        conversation_id,
        "assistant",
        reply_text,
        text_hash=text_hash,
        audio_url=audio_url,
        audio_duration_ms=duration_ms,
        token_count=token_count,
    )

    result = MessageOut(
        message_id=ai_msg.id,
        content=reply_text,
        audio_url=audio_url,
        duration_ms=duration_ms,
        references=[],
        created_at=ai_msg.created_at,
    )
    await set_dedup(user_id, content, result.model_dump(mode="json"), response_mode)
    return result


def chunk_text(text: str, chunk_size: int = 24) -> list[str]:
    return [text[index : index + chunk_size] for index in range(0, len(text), chunk_size)]


async def stream_chat_message(
    db: AsyncSession,
    user_id: int,
    conversation_id: str,
    content: str,
) -> AsyncIterator[dict]:
    conv = await get_conversation(db, conversation_id, user_id)
    if not conv:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail={"code": 40401, "message": "Conversation not found"},
        )

    cached = await check_dedup(user_id, content, "text")
    if cached:
        yield {"event": "start", "data": {"conversation_id": conversation_id}}
        for piece in chunk_text(cached.get("content", "")):
            yield {"event": "delta", "data": {"content": piece}}
        yield {"event": "end", "data": cached}
        return

    await create_message(db, user_id, conversation_id, "user", content)

    rag_context = await retrieve_knowledge(content)
    logger.info("RAG context: %s", rag_context[:200] if rag_context else "None")

    history = await get_recent_messages(db, conversation_id, limit=40)
    lm_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in history
        if msg.role in ("user", "assistant")
    ]

    reply_parts: list[str] = []
    yield {"event": "start", "data": {"conversation_id": conversation_id}}

    try:
        async for delta in chat_completion_stream(
            lm_messages,
            rag_context=rag_context,
        ):
            reply_parts.append(delta)
            yield {"event": "delta", "data": {"content": delta}}
    except Exception as exc:
        logger.exception("Streaming chat completion failed")
        yield {
            "event": "error",
            "data": {"message": str(exc) or "Streaming response failed"},
        }
        return

    reply_text = "".join(reply_parts)
    text_hash = hashlib.md5(reply_text.encode()).hexdigest()
    ai_msg = await create_message(
        db,
        user_id,
        conversation_id,
        "assistant",
        reply_text,
        text_hash=text_hash,
        audio_url=None,
        audio_duration_ms=None,
        token_count=None,
    )

    result = MessageOut(
        message_id=ai_msg.id,
        content=reply_text,
        audio_url=None,
        duration_ms=None,
        references=[],
        created_at=ai_msg.created_at,
    )
    await set_dedup(user_id, content, result.model_dump(mode="json"), "text")
    yield {"event": "end", "data": result.model_dump(mode="json")}


async def ask_chapter_ai(
    db: AsyncSession,
    user_id: int,
    chapter_id: int,
    selected_text: str,
    context_before: Optional[str],
    context_after: Optional[str],
    conversation_id: Optional[str],
) -> dict:
    from app.crud.course_crud import get_chapter_by_id

    chapter = await get_chapter_by_id(db, chapter_id)
    if not chapter:
        from fastapi import HTTPException

        raise HTTPException(
            status_code=404,
            detail={"code": 40401, "message": "Chapter not found"},
        )

    if conversation_id:
        conv = await get_conversation(db, conversation_id, user_id)
        if not conv:
            conversation_id = None

    if not conversation_id:
        conv = await create_conversation(db, user_id, scene="ask_ai")
        conversation_id = conv.id

    ctx_parts: list[str] = []
    if context_before:
        ctx_parts.append(context_before)
    ctx_parts.append(f"【选中文本】{selected_text}")
    if context_after:
        ctx_parts.append(context_after)
    user_content = "\n".join(ctx_parts) + "\n\n请解释上面选中的内容。"

    chapter_ctx = (chapter.content or "")[:2000]
    history = await get_recent_messages(db, conversation_id, limit=20)
    lm_messages = [
        {"role": msg.role, "content": msg.content}
        for msg in history
    ] + [{"role": "user", "content": user_content}]

    await create_message(db, user_id, conversation_id, "user", user_content)

    system = (
        f"你是供应链寻源课程的 AI 助教。学员在教材中选中了一段文字并提问。"
        f"请结合以下章节内容（《{chapter.title}》）给出准确解释，不超过 200 字。\n"
        f"【章节内容摘要】{chapter_ctx}"
    )

    reply_text, _ = await chat_completion(lm_messages, system_prompt=system)
    ai_msg = await create_message(db, user_id, conversation_id, "assistant", reply_text)

    return {
        "conversation_id": conversation_id,
        "message_id": ai_msg.id,
        "answer": reply_text,
        "related_chapters": [],
    }
