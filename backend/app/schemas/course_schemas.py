from typing import Optional
from pydantic import BaseModel, field_validator


class ChapterTreeNode(BaseModel):
    id: int
    title: str
    level: int
    sort_order: int
    children: list["ChapterTreeNode"] = []

    model_config = {"from_attributes": True}


class VideoOut(BaseModel):
    id: int
    title: str
    oss_url: str
    cover_url: Optional[str]
    duration_seconds: Optional[int]

    model_config = {"from_attributes": True}


class ChapterDetail(BaseModel):
    id: int
    title: str
    level: int
    content: Optional[str]
    content_format: str
    render_type: str
    pdf_url: Optional[str]
    source_file_name: Optional[str]
    word_count: int
    prev_chapter_id: Optional[int]
    next_chapter_id: Optional[int]
    videos: list[VideoOut] = []

    model_config = {"from_attributes": True}


class AskRequest(BaseModel):
    selected_text: str
    context_before: Optional[str] = None
    context_after: Optional[str] = None
    conversation_id: Optional[str] = None

    @field_validator("selected_text")
    @classmethod
    def validate_selected_text(cls, v):
        if len(v) > 200:
            raise ValueError("选中文本超过 200 字限制")
        return v


class RelatedChapter(BaseModel):
    chapter_id: int
    title: str


class AskResponse(BaseModel):
    conversation_id: str
    message_id: str
    answer: str
    related_chapters: list[RelatedChapter] = []


class NoteCreate(BaseModel):
    selected_text: str
    note_content: Optional[str] = None
    position_start: Optional[int] = None
    position_end: Optional[int] = None
    highlight_color: str = "yellow"


class NoteOut(BaseModel):
    id: int
    selected_text: str
    note_content: Optional[str]
    highlight_color: str

    model_config = {"from_attributes": True}


class ProgressUpdate(BaseModel):
    progress_percent: int
    last_read_position: int = 0


class KnowledgeNodeOut(BaseModel):
    id: str
    title: str
    description: Optional[str]
    icon: Optional[str]
    node_type: str
    chapter_id: Optional[int]

    model_config = {"from_attributes": True}


class KnowledgeEdgeOut(BaseModel):
    source: str
    target: str
    relation_type: str


class KnowledgeGraphResponse(BaseModel):
    nodes: list[KnowledgeNodeOut]
    edges: list[KnowledgeEdgeOut]
