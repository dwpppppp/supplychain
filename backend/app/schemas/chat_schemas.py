from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel


class ConversationCreate(BaseModel):
    scene: str = "assistant"


class ConversationOut(BaseModel):
    id: str
    scene: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class SendMessageRequest(BaseModel):
    conversation_id: str
    content: str
    response_mode: Literal["text", "voice"] = "text"


class ReferenceOut(BaseModel):
    chapter_id: int
    title: str


class MessageOut(BaseModel):
    message_id: str
    content: str
    audio_url: Optional[str]
    duration_ms: Optional[int]
    references: list[ReferenceOut] = []
    created_at: datetime


class ConversationMessageOut(BaseModel):
    id: str
    conversation_id: str
    role: str
    content: str
    audio_url: Optional[str]
    duration_ms: Optional[int]
    created_at: datetime

    model_config = {"from_attributes": True}


class ASRRequest(BaseModel):
    audio_data: str  # base64
    format: str = "wav"
    sample_rate: int = 16000


class ASRResponse(BaseModel):
    text: str
