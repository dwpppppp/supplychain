from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.course_crud import (
    get_chapter_tree, get_chapter_by_id, get_knowledge_graph,
    upsert_chapter_progress, create_note
)
from app.schemas.course_schemas import (
    ChapterTreeNode, ChapterDetail, VideoOut, KnowledgeGraphResponse,
    KnowledgeNodeOut, KnowledgeEdgeOut, NoteCreate, NoteOut, ProgressUpdate
)
from fastapi import HTTPException


def _build_tree(all_chapters, parent_id=None) -> list[ChapterTreeNode]:
    return [
        ChapterTreeNode(
            id=c.id,
            title=c.title,
            level=c.level,
            sort_order=c.sort_order,
            children=_build_tree(all_chapters, parent_id=c.id),
        )
        for c in all_chapters
        if c.parent_id == parent_id
    ]


async def get_chapter_tree_service(db: AsyncSession) -> list[ChapterTreeNode]:
    all_chapters = await get_chapter_tree(db)
    return _build_tree(all_chapters)


async def get_chapter_detail(db: AsyncSession, chapter_id: int) -> ChapterDetail:
    chapter = await get_chapter_by_id(db, chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "章节不存在"})
    return ChapterDetail(
        id=chapter.id,
        title=chapter.title,
        level=chapter.level,
        content=chapter.content,
        content_format=chapter.content_format,
        render_type=chapter.render_type,
        pdf_url=chapter.pdf_url,
        source_file_name=chapter.source_file_name,
        word_count=chapter.word_count,
        prev_chapter_id=chapter.prev_chapter_id,
        next_chapter_id=chapter.next_chapter_id,
        videos=[VideoOut.model_validate(v) for v in chapter.videos],
    )


async def update_reading_progress(
    db: AsyncSession, user_id: int, chapter_id: int, req: ProgressUpdate
):
    chapter = await get_chapter_by_id(db, chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "章节不存在"})
    await upsert_chapter_progress(
        db, user_id, chapter_id, req.progress_percent, req.last_read_position
    )


async def save_note(
    db: AsyncSession, user_id: int, chapter_id: int, req: NoteCreate
) -> NoteOut:
    chapter = await get_chapter_by_id(db, chapter_id)
    if not chapter:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "章节不存在"})
    note = await create_note(
        db, user_id, chapter_id,
        req.selected_text, req.note_content,
        req.position_start, req.position_end,
        req.highlight_color,
    )
    return NoteOut.model_validate(note)


async def get_knowledge_graph_service(db: AsyncSession) -> KnowledgeGraphResponse:
    nodes, edges = await get_knowledge_graph(db)
    return KnowledgeGraphResponse(
        nodes=[KnowledgeNodeOut.model_validate(n) for n in nodes],
        edges=[
            KnowledgeEdgeOut(
                source=e.source_node_id,
                target=e.target_node_id,
                relation_type=e.relation_type,
            )
            for e in edges
        ],
    )
