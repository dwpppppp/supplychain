from fastapi import APIRouter, Depends, Path
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.middleware import check_chat_rate_limit
from app.core.response import ok, created
from app.models.models import User
from app.schemas.course_schemas import AskRequest, NoteCreate, ProgressUpdate
from app.services.course_service import (
    get_chapter_tree_service, get_chapter_detail,
    update_reading_progress, save_note, get_knowledge_graph_service
)
from app.services.ai_service import ask_chapter_ai

router = APIRouter(prefix="/course", tags=["课程"])


@router.get("/chapters")
async def get_chapters(db: AsyncSession = Depends(get_db)):
    tree = await get_chapter_tree_service(db)
    return ok([n.model_dump(mode="json") for n in tree])


@router.get("/chapters/{chapter_id}")
async def get_chapter(
    chapter_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    detail = await get_chapter_detail(db, chapter_id)
    return ok(detail.model_dump(mode="json"))


@router.post("/chapters/{chapter_id}/ask")
async def ask_ai(
    req: AskRequest,
    chapter_id: int = Path(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await check_chat_rate_limit(current_user.id)
    result = await ask_chapter_ai(
        db, current_user.id, chapter_id,
        req.selected_text, req.context_before, req.context_after,
        req.conversation_id,
    )
    return ok(result)


@router.post("/chapters/{chapter_id}/notes")
async def create_note(
    req: NoteCreate,
    chapter_id: int = Path(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    note = await save_note(db, current_user.id, chapter_id, req)
    return created(note.model_dump(mode="json"))


@router.put("/chapters/{chapter_id}/progress")
async def update_progress(
    req: ProgressUpdate,
    chapter_id: int = Path(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    await update_reading_progress(db, current_user.id, chapter_id, req)
    return ok(message="进度已更新")


@router.get("/knowledge-graph")
async def knowledge_graph(db: AsyncSession = Depends(get_db)):
    graph = await get_knowledge_graph_service(db)
    return ok(graph.model_dump(mode="json"))
