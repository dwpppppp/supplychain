"""
阿里云 OSS 上传封装。
"""
import io
from typing import Optional
import oss2
from app.core.config import settings


def _get_bucket() -> oss2.Bucket:
    auth = oss2.Auth(settings.OSS_ACCESS_KEY_ID, settings.OSS_ACCESS_KEY_SECRET)
    endpoint = f"https://{settings.OSS_ENDPOINT}"
    return oss2.Bucket(auth, endpoint, settings.OSS_BUCKET_NAME)


def upload_audio(audio_bytes: bytes, object_key: str) -> str:
    """
    Upload audio bytes to OSS.
    Returns public URL (CDN or OSS).
    """
    bucket = _get_bucket()
    bucket.put_object(object_key, io.BytesIO(audio_bytes), headers={"Content-Type": "audio/mpeg"})

    if settings.OSS_CDN_DOMAIN:
        return f"https://{settings.OSS_CDN_DOMAIN}/{object_key}"
    return f"https://{settings.OSS_BUCKET_NAME}.{settings.OSS_ENDPOINT}/{object_key}"


def tts_object_key(text_hash: str) -> str:
    return f"tts/{text_hash}.mp3"
