from typing import Optional
from fastapi import APIRouter, Depends, Header, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_optional_user
from app.core.response import ok, created
from app.models.models import User
from app.schemas.analytics_schemas import TrackRequest
from app.crud.analytics_crud import create_event, get_overview_stats, get_user_activity

router = APIRouter(prefix="/analytics", tags=["数据分析"])


@router.post("/track")
async def track_event(
    req: TrackRequest,
    x_session_id: Optional[str] = Header(None, alias="X-Session-ID"),
    page_url: Optional[str] = None,
    current_user: Optional[User] = Depends(get_optional_user),
    db: AsyncSession = Depends(get_db),
):
    event = await create_event(
        db,
        event_type=req.type,
        data=req.data,
        user_id=current_user.id if current_user else None,
        session_id=x_session_id,
        page_url=req.data.get("page_url"),
    )
    return created({"event_id": event.id})


@router.get("/dashboard")
async def dashboard(
    days: int = Query(7, ge=1, le=90),
    current_user: User = Depends(get_optional_user),
    db: AsyncSession = Depends(get_db),
):
    overview = await get_overview_stats(db, days)
    activity = await get_user_activity(db, days)
    return ok({
        "overview": overview,
        "popular_nodes": {"popular_chapters": [], "popular_keywords": []},
        "ai_usage": {
            "total_questions": overview["total_ai_questions"],
            "success_rate": 1.0,
            "avg_response_time": 0,
            "popular_keywords": [],
        },
        "user_activity": activity,
    })


@router.get("/popular")
async def popular_content(
    type: str = Query("chapters"),
    days: int = Query(7, ge=1, le=90),
    limit: int = Query(10, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
):
    return ok({"items": [], "type": type, "days": days})


@router.get("/export")
async def export_data(
    type: str = Query("training_scores"),
    format: str = Query("csv"),
    current_user: User = Depends(get_optional_user),
    db: AsyncSession = Depends(get_db),
):
    # Placeholder: implement actual export logic
    return ok({"download_url": None, "message": "导出功能即将上线"})
