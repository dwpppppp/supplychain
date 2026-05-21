from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App
    APP_NAME: str = "供应链寻源课程平台"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Database
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_NAME: str = "supplychain"
    DB_USER: str = "root"
    DB_PASSWORD: str = ""

    @property
    def DATABASE_URL(self) -> str:
        return f"mysql+aiomysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?charset=utf8mb4"

    @property
    def SYNC_DATABASE_URL(self) -> str:
        return f"mysql+pymysql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}?charset=utf8mb4"

    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    REDIS_PASSWORD: Optional[str] = None

    @property
    def REDIS_URL(self) -> str:
        if self.REDIS_PASSWORD:
            return f"redis://:{self.REDIS_PASSWORD}@{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"
        return f"redis://{self.REDIS_HOST}:{self.REDIS_PORT}/{self.REDIS_DB}"

    # JWT
    JWT_SECRET_KEY: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Aliyun Dashscope (Qwen LLM + TTS)
    DASHSCOPE_API_KEY: str = ""
    LLM_MODEL: str = "qwen-plus"
    TTS_MODEL: str = "qwen3-tts-flash-realtime"
    TTS_VOICE: str = "longxiaochun"

    # Aliyun Bailian (RAG)
    BAILIAN_WORKSPACE_ID: str = ""
    BAILIAN_INDEX_ID: str = ""

    # Aliyun OSS
    OSS_ACCESS_KEY_ID: str = ""
    OSS_ACCESS_KEY_SECRET: str = ""
    OSS_BUCKET_NAME: str = ""
    OSS_ENDPOINT: str = "oss-cn-beijing.aliyuncs.com"
    OSS_CDN_DOMAIN: str = ""

    # Rate limiting
    CHAT_RATE_LIMIT_PER_MINUTE: int = 5
    DEDUP_WINDOW_SECONDS: int = 10

    # CORS
    CORS_ORIGINS: list[str] = ["*"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
