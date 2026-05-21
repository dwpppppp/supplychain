from fastapi import APIRouter
from app.core.config import settings
from app.core.response import ok

router = APIRouter(prefix="/system", tags=["系统"])


@router.get("/health")
async def health():
    """无需认证的健康检查接口。"""
    # Quick connectivity check
    db_status = "connected"
    redis_status = "connected"
    ai_status = "available"

    try:
        from app.core.database import engine
        async with engine.connect() as conn:
            await conn.execute(__import__("sqlalchemy").text("SELECT 1"))
    except Exception:
        db_status = "disconnected"

    try:
        from app.core.middleware import get_redis
        r = get_redis()
        await r.ping()
    except Exception:
        redis_status = "disconnected"

    if not settings.DASHSCOPE_API_KEY:
        ai_status = "not_configured"

    return ok({
        "status": "healthy",
        "version": settings.APP_VERSION,
        "database": db_status,
        "redis": redis_status,
        "ai_engine": ai_status,
    })
