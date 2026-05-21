"""
千问 TTS qwen3-tts-flash 封装，直接调用 DashScope REST API。
"""
import httpx
from app.core.config import settings

_TTS_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation"


async def synthesize_speech(text: str) -> str:
    """
    Synthesize text to audio.
    Returns audio URL (DashScope OSS, valid 24h).
    """
    async with httpx.AsyncClient(timeout=60) as client:
        resp = await client.post(
            _TTS_URL,
            headers={"Authorization": f"Bearer {settings.DASHSCOPE_API_KEY}"},
            json={
                "model": settings.TTS_MODEL,
                "input": {
                    "text": text,
                    "voice": settings.TTS_VOICE,
                    "language_type": "Chinese",
                },
            },
        )
        resp.raise_for_status()
        data = resp.json()

    if data.get("code"):
        raise RuntimeError(f"TTS failed [{data['code']}]: {data.get('message')}")

    audio_url = data.get("output", {}).get("audio", {}).get("url")
    if not audio_url:
        raise RuntimeError(f"TTS returned no audio URL: {data}")

    return audio_url


def estimate_duration_ms(char_count: int = 0) -> int:
    """Estimate duration from character count (~5 chars/sec at normal speed)."""
    if char_count <= 0:
        return 0
    return int(char_count / 5 * 1000)
