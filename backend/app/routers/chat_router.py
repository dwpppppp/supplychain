import json

from fastapi import APIRouter, Depends, Query
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.middleware import check_chat_rate_limit
from app.core.response import created, ok
from app.models.models import User
from app.schemas.chat_schemas import ASRRequest, ConversationCreate, SendMessageRequest
from app.services.ai_service import (
    create_chat_conversation,
    get_chat_conversation_messages,
    get_chat_conversations,
    send_chat_message,
    stream_chat_message,
)

router = APIRouter(prefix="/chat", tags=["对话"])


@router.post("/conversations")
async def create_conversation(
    req: ConversationCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await create_chat_conversation(db, current_user.id, req.scene)
    return created(result.model_dump(mode="json"))


@router.get("/conversations")
async def list_conversations(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    scene: str | None = Query(None),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    items, total = await get_chat_conversations(
        db,
        current_user.id,
        page,
        page_size,
        scene,
    )
    return ok(
        {
            "items": [item.model_dump(mode="json") for item in items],
            "total": total,
            "page": page,
            "page_size": page_size,
        }
    )


@router.get("/conversations/{conversation_id}/messages")
async def list_conversation_messages(
    conversation_id: str,
    limit: int = Query(100, ge=1, le=200),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    items = await get_chat_conversation_messages(
        db,
        current_user.id,
        conversation_id,
        limit,
    )
    return ok(
        {
            "conversation_id": conversation_id,
            "items": [item.model_dump(mode="json") for item in items],
        }
    )


@router.post("/messages")
async def send_message(
    req: SendMessageRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await check_chat_rate_limit(current_user.id)
    result = await send_chat_message(
        db,
        current_user.id,
        req.conversation_id,
        req.content,
        req.response_mode,
    )
    return ok(result.model_dump(mode="json"))


@router.post("/messages/stream")
async def stream_message(
    req: SendMessageRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await check_chat_rate_limit(current_user.id)

    async def event_stream():
        async for item in stream_chat_message(
            db,
            current_user.id,
            req.conversation_id,
            req.content,
        ):
            yield (
                f"event: {item['event']}\n"
                f"data: {json.dumps(item['data'], ensure_ascii=False)}\n\n"
            )

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


@router.post("/asr")
async def speech_to_text(
    req: ASRRequest,
    current_user: User = Depends(get_current_user),
):
    try:
        import base64
        import os
        import tempfile

        import dashscope
        from dashscope.audio.asr import Transcription

        from app.core.config import settings

        dashscope.api_key = settings.DASHSCOPE_API_KEY
        audio_bytes = base64.b64decode(req.audio_data)

        with tempfile.NamedTemporaryFile(suffix=f".{req.format}", delete=False) as file:
            file.write(audio_bytes)
            tmp_path = file.name

        try:
            response = Transcription.call(
                model="paraformer-realtime-v2",
                file_urls=[f"file://{tmp_path}"],
                language_hints=["zh", "en"],
            )
            text = ""
            if response.output and response.output.results:
                for item in response.output.results:
                    if item.transcription:
                        text += item.transcription
        finally:
            os.unlink(tmp_path)

        return ok({"text": text})
    except Exception:
        return ok({"text": ""})
