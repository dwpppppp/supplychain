from typing import Optional
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import (
    Chapter, Video, KnowledgeNode, KnowledgeEdge,
    UserChapterProgress, UserNote
)


async def get_chapter_tree(db: AsyncSession) -> list[Chapter]:
    """Return all chapters; tree is built in Python to avoid async lazy-load."""
    result = await db.execute(
        select(Chapter).order_by(Chapter.sort_order)
    )
    return list(result.scalars().all())


async def get_chapter_by_id(db: AsyncSession, chapter_id: int) -> Optional[Chapter]:
    result = await db.execute(
        select(Chapter)
        .where(Chapter.id == chapter_id)
        .options(selectinload(Chapter.videos))
    )
    return result.scalar_one_or_none()


async def upsert_chapter_progress(
    db: AsyncSession, user_id: int, chapter_id: int,
    progress_percent: int, last_read_position: int = 0
) -> UserChapterProgress:
    result = await db.execute(
        select(UserChapterProgress).where(
            UserChapterProgress.user_id == user_id,
            UserChapterProgress.chapter_id == chapter_id,
        )
    )
    progress = result.scalar_one_or_none()
    if progress:
        progress.progress_percent = progress_percent
        progress.last_read_position = last_read_position
    else:
        progress = UserChapterProgress(
            user_id=user_id,
            chapter_id=chapter_id,
            progress_percent=progress_percent,
            last_read_position=last_read_position,
        )
        db.add(progress)
    await db.flush()
    return progress


async def create_note(
    db: AsyncSession, user_id: int, chapter_id: int,
    selected_text: str, note_content: Optional[str],
    position_start: Optional[int], position_end: Optional[int],
    highlight_color: str = "yellow"
) -> UserNote:
    note = UserNote(
        user_id=user_id,
        chapter_id=chapter_id,
        selected_text=selected_text,
        note_content=note_content,
        position_start=position_start,
        position_end=position_end,
        highlight_color=highlight_color,
    )
    db.add(note)
    await db.flush()
    await db.refresh(note)
    return note


async def get_knowledge_graph(db: AsyncSession) -> tuple[list[KnowledgeNode], list[KnowledgeEdge]]:
    nodes_result = await db.execute(select(KnowledgeNode).order_by(KnowledgeNode.sort_order))
    edges_result = await db.execute(select(KnowledgeEdge))
    return list(nodes_result.scalars().all()), list(edges_result.scalars().all())


async def count_user_chapters(db: AsyncSession, user_id: int) -> tuple[int, int]:
    """Return (completed, total)."""
    from sqlalchemy import func
    total = (await db.execute(select(func.count(Chapter.id)))).scalar_one()
    completed = (await db.execute(
        select(func.count(UserChapterProgress.id)).where(
            UserChapterProgress.user_id == user_id,
            UserChapterProgress.progress_percent >= 100,
        )
    )).scalar_one()
    return completed, total
