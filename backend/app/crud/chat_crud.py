import uuid
from typing import Optional
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import Conversation, ChatMessage


async def create_conversation(
    db: AsyncSession, user_id: int, scene: str = "assistant"
) -> Conversation:
    conv = Conversation(id=str(uuid.uuid4()), user_id=user_id, scene=scene)
    db.add(conv)
    await db.flush()
    await db.refresh(conv)
    return conv


async def get_conversation(
    db: AsyncSession, conversation_id: str, user_id: int
) -> Optional[Conversation]:
    result = await db.execute(
        select(Conversation).where(
            Conversation.id == conversation_id,
            Conversation.user_id == user_id,
        )
    )
    return result.scalar_one_or_none()


async def list_conversations(
    db: AsyncSession, user_id: int, scene: Optional[str] = None,
    page: int = 1, page_size: int = 20
) -> tuple[list[Conversation], int]:
    from sqlalchemy import func
    query = select(Conversation).where(Conversation.user_id == user_id)
    if scene:
        query = query.where(Conversation.scene == scene)
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar_one()
    query = query.order_by(Conversation.updated_at.desc()).offset((page - 1) * page_size).limit(page_size)
    items = (await db.execute(query)).scalars().all()
    return list(items), total


async def get_recent_messages(
    db: AsyncSession, conversation_id: str, limit: int = 40
) -> list[ChatMessage]:
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.conversation_id == conversation_id)
        .order_by(ChatMessage.created_at.desc())
        .limit(limit)
    )
    msgs = result.scalars().all()
    return list(reversed(msgs))


async def list_conversation_messages(
    db: AsyncSession, conversation_id: str, limit: int = 100
) -> list[ChatMessage]:
    result = await db.execute(
        select(ChatMessage)
        .where(ChatMessage.conversation_id == conversation_id)
        .order_by(ChatMessage.created_at.asc())
        .limit(limit)
    )
    return list(result.scalars().all())


async def create_message(
    db: AsyncSession,
    user_id: int,
    conversation_id: str,
    role: str,
    content: str,
    text_hash: Optional[str] = None,
    audio_url: Optional[str] = None,
    audio_duration_ms: Optional[int] = None,
    token_count: Optional[int] = None,
) -> ChatMessage:
    msg = ChatMessage(
        id=str(uuid.uuid4()),
        user_id=user_id,
        conversation_id=conversation_id,
        role=role,
        content=content,
        text_hash=text_hash,
        audio_url=audio_url,
        audio_duration_ms=audio_duration_ms,
        token_count=token_count,
    )
    db.add(msg)
    await db.flush()
    await db.refresh(msg)
    return msg


async def find_message_by_text_hash(
    db: AsyncSession, text_hash: str
) -> Optional[ChatMessage]:
    result = await db.execute(
        select(ChatMessage).where(
            ChatMessage.text_hash == text_hash,
            ChatMessage.audio_url.isnot(None),
        ).limit(1)
    )
    return result.scalar_one_or_none()
