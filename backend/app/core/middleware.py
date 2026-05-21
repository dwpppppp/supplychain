import hashlib
import json
import logging
from typing import Optional

from fastapi import HTTPException, status
import redis.asyncio as aioredis
from redis.exceptions import RedisError

from app.core.config import settings

_redis: Optional[aioredis.Redis] = None
logger = logging.getLogger(__name__)


def get_redis() -> aioredis.Redis:
    global _redis
    if _redis is None:
        _redis = aioredis.from_url(settings.REDIS_URL, decode_responses=True)
    return _redis


async def check_chat_rate_limit(user_id: int) -> bool:
    """Returns True if under limit, raises 429 if exceeded."""
    try:
        r = get_redis()
        key = f"ratelimit:chat:{user_id}"
        count = await r.incr(key)
        if count == 1:
            await r.expire(key, 60)
        if count > settings.CHAT_RATE_LIMIT_PER_MINUTE:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail={"code": 42901, "message": "请求过于频繁，请稍后再试"},
            )
    except RedisError as exc:
        logger.warning("Redis unavailable, skip chat rate limit: %s", exc)
    return True


async def check_dedup(
    user_id: int,
    content: str,
    response_mode: str = "text",
) -> Optional[dict]:
    """Returns cached result if duplicate within dedup window, else None."""
    try:
        r = get_redis()
        content_hash = hashlib.md5(f"{response_mode}:{content}".encode()).hexdigest()
        key = f"dedup:{user_id}:{content_hash}"
        cached = await r.get(key)
        if cached:
            return json.loads(cached)
    except RedisError as exc:
        logger.warning("Redis unavailable, skip dedup lookup: %s", exc)
    return None


async def set_dedup(
    user_id: int,
    content: str,
    result: dict,
    response_mode: str = "text",
):
    try:
        r = get_redis()
        content_hash = hashlib.md5(f"{response_mode}:{content}".encode()).hexdigest()
        key = f"dedup:{user_id}:{content_hash}"
        await r.setex(
            key,
            settings.DEDUP_WINDOW_SECONDS,
            json.dumps(result, ensure_ascii=False),
        )
    except RedisError as exc:
        logger.warning("Redis unavailable, skip dedup cache write: %s", exc)


async def get_tts_cache(text_hash: str) -> Optional[str]:
    """Returns cached audio_url if exists."""
    try:
        r = get_redis()
        key = f"tts_cache:{text_hash}"
        return await r.get(key)
    except RedisError as exc:
        logger.warning("Redis unavailable, skip TTS cache lookup: %s", exc)
        return None


async def set_tts_cache(text_hash: str, audio_url: str, ttl: int = 86400 * 7):
    try:
        r = get_redis()
        key = f"tts_cache:{text_hash}"
        await r.setex(key, ttl, audio_url)
    except RedisError as exc:
        logger.warning("Redis unavailable, skip TTS cache write: %s", exc)
