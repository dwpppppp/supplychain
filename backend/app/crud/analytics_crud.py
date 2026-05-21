from typing import Optional
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import AnalyticsEvent


async def create_event(
    db: AsyncSession,
    event_type: str,
    data: dict,
    user_id: Optional[int] = None,
    session_id: Optional[str] = None,
    page_url: Optional[str] = None,
) -> AnalyticsEvent:
    event = AnalyticsEvent(
        user_id=user_id,
        session_id=session_id,
        type=event_type,
        data=data,
        page_url=page_url,
    )
    db.add(event)
    await db.flush()
    await db.refresh(event)
    return event


async def get_overview_stats(db: AsyncSession, days: int = 7) -> dict:
    from datetime import datetime, timedelta, timezone
    since = datetime.now(timezone.utc) - timedelta(days=days)

    graph_clicks = (await db.execute(
        select(func.count(AnalyticsEvent.id)).where(
            AnalyticsEvent.type == "node_click",
            AnalyticsEvent.created_at >= since,
        )
    )).scalar_one()

    ai_questions = (await db.execute(
        select(func.count(AnalyticsEvent.id)).where(
            AnalyticsEvent.type == "ai_question",
            AnalyticsEvent.created_at >= since,
        )
    )).scalar_one()

    active_users = (await db.execute(
        select(func.count(func.distinct(AnalyticsEvent.user_id))).where(
            AnalyticsEvent.user_id.isnot(None),
            AnalyticsEvent.created_at >= since,
        )
    )).scalar_one()

    return {
        "total_graph_clicks": graph_clicks,
        "total_ai_questions": ai_questions,
        "active_users": active_users,
        "popular_chapters_count": 0,
        "popular_keywords_count": 0,
    }


async def get_user_activity(db: AsyncSession, days: int = 7) -> list[dict]:
    from datetime import datetime, timedelta, timezone
    from sqlalchemy import cast, Date, text
    since = datetime.now(timezone.utc) - timedelta(days=days)
    result = await db.execute(
        select(
            func.date(AnalyticsEvent.created_at).label("date"),
            func.count(AnalyticsEvent.id).label("count"),
        )
        .where(AnalyticsEvent.created_at >= since)
        .group_by(func.date(AnalyticsEvent.created_at))
        .order_by(func.date(AnalyticsEvent.created_at))
    )
    return [{"date": str(row.date), "count": row.count} for row in result.all()]
