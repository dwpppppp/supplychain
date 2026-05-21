from datetime import datetime
from typing import Optional
from sqlalchemy import (
    BigInteger, Boolean, DateTime, Enum, ForeignKey, Index,
    Integer, JSON, Numeric, SmallInteger, String, Text, UniqueConstraint, func,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(32), unique=True, nullable=False)
    email: Mapped[str] = mapped_column(String(128), unique=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(128), nullable=False)
    full_name: Mapped[Optional[str]] = mapped_column(String(64))
    phone: Mapped[Optional[str]] = mapped_column(String(20))
    role: Mapped[str] = mapped_column(
        Enum("student", "teacher", "admin"), default="student", nullable=False
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.now(), onupdate=func.now(), nullable=False
    )

    conversations: Mapped[list["Conversation"]] = relationship(back_populates="user")
    notes: Mapped[list["UserNote"]] = relationship(back_populates="user")
    chapter_progress: Mapped[list["UserChapterProgress"]] = relationship(back_populates="user")
    training_progress: Mapped[list["UserTrainingProgress"]] = relationship(back_populates="user")
    step_submissions: Mapped[list["UserStepSubmission"]] = relationship(back_populates="user")
    purchase_quotes: Mapped[list["TrainingPurchaseQuote"]] = relationship(back_populates="user")
    analytics_events: Mapped[list["AnalyticsEvent"]] = relationship(back_populates="user")


class Conversation(Base):
    __tablename__ = "conversations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)  # UUID
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    scene: Mapped[str] = mapped_column(
        Enum("assistant", "ask_ai", "negotiate"), default="assistant", nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.now(), onupdate=func.now(), nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="conversations")
    messages: Mapped[list["ChatMessage"]] = relationship(
        back_populates="conversation", order_by="ChatMessage.created_at"
    )

    __table_args__ = (
        Index("ix_conversations_user_id_updated_at", "user_id", "updated_at"),
    )


class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id: Mapped[str] = mapped_column(String(36), primary_key=True)  # UUID
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    conversation_id: Mapped[str] = mapped_column(ForeignKey("conversations.id"), nullable=False)
    role: Mapped[str] = mapped_column(Enum("user", "assistant"), nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    text_hash: Mapped[Optional[str]] = mapped_column(String(32))  # MD5 for TTS cache
    audio_url: Mapped[Optional[str]] = mapped_column(String(512))
    audio_duration_ms: Mapped[Optional[int]] = mapped_column(Integer)
    token_count: Mapped[Optional[int]] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)

    conversation: Mapped["Conversation"] = relationship(back_populates="messages")

    __table_args__ = (
        Index("ix_chat_messages_text_hash", "text_hash"),
        Index("ix_chat_messages_conv_created", "conversation_id", "created_at"),
    )


class Chapter(Base):
    __tablename__ = "chapters"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    parent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("chapters.id"))
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    level: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    content: Mapped[Optional[str]] = mapped_column(Text)
    content_format: Mapped[str] = mapped_column(String(16), default="text", nullable=False)
    render_type: Mapped[str] = mapped_column(String(16), default="pdf", nullable=False)
    pdf_url: Mapped[Optional[str]] = mapped_column(String(512))
    source_file_name: Mapped[Optional[str]] = mapped_column(String(255))
    word_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    prev_chapter_id: Mapped[Optional[int]] = mapped_column(ForeignKey("chapters.id"))
    next_chapter_id: Mapped[Optional[int]] = mapped_column(ForeignKey("chapters.id"))

    children: Mapped[list["Chapter"]] = relationship(
        "Chapter", foreign_keys=[parent_id], back_populates="parent"
    )
    parent: Mapped[Optional["Chapter"]] = relationship(
        "Chapter", foreign_keys=[parent_id], back_populates="children", remote_side=[id]
    )
    videos: Mapped[list["Video"]] = relationship(back_populates="chapter")
    progress: Mapped[list["UserChapterProgress"]] = relationship(back_populates="chapter")
    notes: Mapped[list["UserNote"]] = relationship(back_populates="chapter")
    knowledge_nodes: Mapped[list["KnowledgeNode"]] = relationship(back_populates="chapter")

    __table_args__ = (
        Index("ix_chapters_parent_id", "parent_id"),
    )


class Video(Base):
    __tablename__ = "videos"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"), nullable=False)
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    oss_url: Mapped[str] = mapped_column(String(512), nullable=False)
    cover_url: Mapped[Optional[str]] = mapped_column(String(512))
    duration_seconds: Mapped[Optional[int]] = mapped_column(Integer)
    file_size_mb: Mapped[Optional[float]] = mapped_column()
    format: Mapped[str] = mapped_column(String(16), default="mp4", nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    chapter: Mapped["Chapter"] = relationship(back_populates="videos")


class KnowledgeNode(Base):
    __tablename__ = "knowledge_nodes"

    id: Mapped[str] = mapped_column(String(32), primary_key=True)  # e.g. kn_001
    title: Mapped[str] = mapped_column(String(128), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text)
    icon: Mapped[Optional[str]] = mapped_column(String(64))
    node_type: Mapped[str] = mapped_column(String(32), nullable=False)
    chapter_id: Mapped[Optional[int]] = mapped_column(ForeignKey("chapters.id"))
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    chapter: Mapped[Optional["Chapter"]] = relationship(back_populates="knowledge_nodes")
    source_edges: Mapped[list["KnowledgeEdge"]] = relationship(
        "KnowledgeEdge", foreign_keys="KnowledgeEdge.source_node_id", back_populates="source_node"
    )
    target_edges: Mapped[list["KnowledgeEdge"]] = relationship(
        "KnowledgeEdge", foreign_keys="KnowledgeEdge.target_node_id", back_populates="target_node"
    )


class KnowledgeEdge(Base):
    __tablename__ = "knowledge_edges"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    source_node_id: Mapped[str] = mapped_column(ForeignKey("knowledge_nodes.id"), nullable=False)
    target_node_id: Mapped[str] = mapped_column(ForeignKey("knowledge_nodes.id"), nullable=False)
    relation_type: Mapped[str] = mapped_column(
        Enum("contains", "prerequisite", "related", "applied_in"), nullable=False
    )

    source_node: Mapped["KnowledgeNode"] = relationship(
        "KnowledgeNode", foreign_keys=[source_node_id], back_populates="source_edges"
    )
    target_node: Mapped["KnowledgeNode"] = relationship(
        "KnowledgeNode", foreign_keys=[target_node_id], back_populates="target_edges"
    )


class UserChapterProgress(Base):
    __tablename__ = "user_chapter_progress"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"), nullable=False)
    progress_percent: Mapped[int] = mapped_column(SmallInteger, default=0, nullable=False)
    last_read_position: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.now(), onupdate=func.now(), nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="chapter_progress")
    chapter: Mapped["Chapter"] = relationship(back_populates="progress")

    __table_args__ = (
        Index("ix_user_chapter_progress_uid_cid", "user_id", "chapter_id", unique=True),
    )


class UserNote(Base):
    __tablename__ = "user_notes"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    chapter_id: Mapped[int] = mapped_column(ForeignKey("chapters.id"), nullable=False)
    selected_text: Mapped[str] = mapped_column(Text, nullable=False)
    note_content: Mapped[Optional[str]] = mapped_column(Text)
    position_start: Mapped[Optional[int]] = mapped_column(Integer)
    position_end: Mapped[Optional[int]] = mapped_column(Integer)
    highlight_color: Mapped[str] = mapped_column(String(16), default="yellow", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)

    user: Mapped["User"] = relationship(back_populates="notes")
    chapter: Mapped["Chapter"] = relationship(back_populates="notes")


class TrainingCase(Base):
    __tablename__ = "training_cases"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    slug: Mapped[Optional[str]] = mapped_column(String(64), unique=True)
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    category: Mapped[str] = mapped_column(
        Enum("food", "industrial", "fmcg"), nullable=False
    )
    difficulty: Mapped[int] = mapped_column(SmallInteger, default=1, nullable=False)
    status: Mapped[str] = mapped_column(String(16), default="draft", nullable=False)
    total_steps: Mapped[int] = mapped_column(SmallInteger, default=5, nullable=False)
    max_attempts: Mapped[int] = mapped_column(SmallInteger, default=4, nullable=False)
    background: Mapped[Optional[str]] = mapped_column(Text)
    objective: Mapped[Optional[str]] = mapped_column(Text)
    cover_image_url: Mapped[Optional[str]] = mapped_column(String(512))
    scoring_weights: Mapped[Optional[dict]] = mapped_column(JSON)
    case_config: Mapped[Optional[dict]] = mapped_column(JSON)
    published_at: Mapped[Optional[datetime]] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.now(), onupdate=func.now(), nullable=False
    )

    suppliers: Mapped[list["TrainingSupplier"]] = relationship(back_populates="case")
    step_configs: Mapped[list["TrainingStepConfig"]] = relationship(back_populates="case")
    user_progress: Mapped[list["UserTrainingProgress"]] = relationship(back_populates="case")
    step_submissions: Mapped[list["UserStepSubmission"]] = relationship(back_populates="case")
    purchase_quotes: Mapped[list["TrainingPurchaseQuote"]] = relationship(back_populates="case")
    negotiation_suppliers: Mapped[list["TrainingCaseNegotiationSupplier"]] = relationship(back_populates="case")
    negotiation_options: Mapped[list["TrainingCaseNegotiationOption"]] = relationship(back_populates="case")


class TrainingSupplier(Base):
    __tablename__ = "training_suppliers"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    case_id: Mapped[int] = mapped_column(ForeignKey("training_cases.id"), nullable=False)
    code: Mapped[Optional[str]] = mapped_column(String(32))
    name: Mapped[str] = mapped_column(String(128), nullable=False)
    location: Mapped[Optional[str]] = mapped_column(String(128))
    certifications: Mapped[Optional[list]] = mapped_column(JSON)
    capacity: Mapped[Optional[str]] = mapped_column(String(256))
    price_text: Mapped[Optional[str]] = mapped_column(String(64))
    risk_note: Mapped[Optional[str]] = mapped_column(String(512))
    brief: Mapped[Optional[str]] = mapped_column(Text)
    supplier_type: Mapped[Optional[str]] = mapped_column(String(32))
    is_candidate: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    is_qualified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    is_recommended: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    profile: Mapped[Optional[dict]] = mapped_column(JSON)
    latitude: Mapped[Optional[float]] = mapped_column(Numeric(10, 7))
    longitude: Mapped[Optional[float]] = mapped_column(Numeric(10, 7))
    image_url: Mapped[Optional[str]] = mapped_column(String(512))

    case: Mapped["TrainingCase"] = relationship(back_populates="suppliers")


class TrainingStepConfig(Base):
    __tablename__ = "training_step_config"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    case_id: Mapped[int] = mapped_column(ForeignKey("training_cases.id"), nullable=False)
    step: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    step_key: Mapped[Optional[str]] = mapped_column(String(64))
    title: Mapped[str] = mapped_column(String(256), nullable=False)
    scene_description: Mapped[Optional[str]] = mapped_column(Text)
    interaction_type: Mapped[Optional[str]] = mapped_column(String(32))
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    is_required: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    form_schema: Mapped[Optional[dict]] = mapped_column(JSON)
    scoring_rules: Mapped[Optional[dict]] = mapped_column(JSON)
    resources: Mapped[Optional[dict]] = mapped_column(JSON)

    case: Mapped["TrainingCase"] = relationship(back_populates="step_configs")


class TrainingCaseNegotiationSupplier(Base):
    __tablename__ = "training_case_negotiation_supplier"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    case_id: Mapped[int] = mapped_column(ForeignKey("training_cases.id"), nullable=False)
    supplier_code: Mapped[str] = mapped_column(String(16), nullable=False)
    supplier_name: Mapped[str] = mapped_column(String(64), nullable=False)
    init_price: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    init_payment_days: Mapped[int] = mapped_column(Integer, default=30, nullable=False)
    init_warranty_months: Mapped[int] = mapped_column(Integer, default=12, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)

    case: Mapped["TrainingCase"] = relationship(back_populates="negotiation_suppliers")

    __table_args__ = (
        UniqueConstraint("case_id", "supplier_code", name="uq_neg_supplier_case_code"),
        Index("idx_neg_supplier_case", "case_id"),
    )


class TrainingCaseNegotiationOption(Base):
    __tablename__ = "training_case_negotiation_option"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    case_id: Mapped[int] = mapped_column(ForeignKey("training_cases.id"), nullable=False)
    round_no: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    ask: Mapped[str] = mapped_column(Text, nullable=False)
    answer: Mapped[str] = mapped_column(Text, nullable=False)
    affect_field: Mapped[str] = mapped_column(String(32), nullable=False)
    delta_value: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)

    case: Mapped["TrainingCase"] = relationship(back_populates="negotiation_options")

    __table_args__ = (
        Index("idx_neg_option_lookup", "case_id", "round_no"),
    )


class UserTrainingProgress(Base):
    __tablename__ = "user_training_progress"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    case_id: Mapped[int] = mapped_column(ForeignKey("training_cases.id"), nullable=False)
    current_step: Mapped[int] = mapped_column(SmallInteger, default=1, nullable=False)
    status: Mapped[str] = mapped_column(
        Enum("not_started", "in_progress", "completed"), default="not_started", nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="training_progress")
    case: Mapped["TrainingCase"] = relationship(back_populates="user_progress")

    __table_args__ = (
        Index("ix_user_training_progress_uid_cid", "user_id", "case_id", unique=True),
    )


class UserStepSubmission(Base):
    __tablename__ = "user_step_submissions"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    case_id: Mapped[int] = mapped_column(ForeignKey("training_cases.id"), nullable=False)
    step: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    attempt_no: Mapped[int] = mapped_column(SmallInteger, default=1, nullable=False)
    answers: Mapped[Optional[dict]] = mapped_column(JSON)
    score: Mapped[Optional[float]] = mapped_column()
    dimension_scores: Mapped[Optional[dict]] = mapped_column(JSON)
    result_snapshot: Mapped[Optional[dict]] = mapped_column(JSON)
    feedback: Mapped[Optional[str]] = mapped_column(Text)
    time_spent_seconds: Mapped[Optional[int]] = mapped_column(Integer)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)

    user: Mapped["User"] = relationship(back_populates="step_submissions")
    case: Mapped["TrainingCase"] = relationship(back_populates="step_submissions")


class TrainingPurchaseQuote(Base):
    __tablename__ = "training_purchase_quotes"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    case_id: Mapped[int] = mapped_column(ForeignKey("training_cases.id"), nullable=False)
    category: Mapped[str] = mapped_column(String(64), nullable=False)
    item_name: Mapped[str] = mapped_column(String(128), nullable=False)
    annual_quantity: Mapped[str] = mapped_column(String(64), nullable=False)
    unit: Mapped[str] = mapped_column(String(32), nullable=False)
    delivery_cycle: Mapped[str] = mapped_column(String(256), nullable=False)
    quote_validity: Mapped[str] = mapped_column(String(128), nullable=False)
    tax_mode: Mapped[Optional[str]] = mapped_column(String(128))
    supplier_code: Mapped[Optional[str]] = mapped_column(String(32))
    supplier_name: Mapped[Optional[str]] = mapped_column(String(128))
    unit_price: Mapped[Optional[float]] = mapped_column(Numeric(12, 2))
    estimated_total: Mapped[Optional[float]] = mapped_column(Numeric(14, 2))
    payment_terms: Mapped[Optional[str]] = mapped_column(String(128))
    warranty_months: Mapped[Optional[int]] = mapped_column(Integer)
    remarks: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(16), default="submitted", nullable=False)
    submitted_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=func.now(), onupdate=func.now(), nullable=False
    )

    user: Mapped["User"] = relationship(back_populates="purchase_quotes")
    case: Mapped["TrainingCase"] = relationship(back_populates="purchase_quotes")
    specs: Mapped[list["TrainingPurchaseQuoteSpec"]] = relationship(
        back_populates="quote",
        cascade="all, delete-orphan",
    )

    __table_args__ = (
        UniqueConstraint("user_id", "case_id", name="uq_training_purchase_quote_uid_cid"),
        Index("ix_training_purchase_quotes_user_case", "user_id", "case_id"),
    )


class TrainingPurchaseQuoteSpec(Base):
    __tablename__ = "training_purchase_quote_specs"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    quote_id: Mapped[int] = mapped_column(ForeignKey("training_purchase_quotes.id"), nullable=False)
    order_index: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    field_key: Mapped[str] = mapped_column(String(64), nullable=False)
    label: Mapped[str] = mapped_column(String(128), nullable=False)
    value: Mapped[str] = mapped_column(Text, nullable=False)
    unit: Mapped[Optional[str]] = mapped_column(String(32))
    requirement_type: Mapped[Optional[str]] = mapped_column(String(32))
    input_type: Mapped[Optional[str]] = mapped_column(String(24), default="text")
    expected_value: Mapped[Optional[str]] = mapped_column(String(256))
    numeric_min: Mapped[Optional[float]] = mapped_column(Numeric(12, 2))
    numeric_max: Mapped[Optional[float]] = mapped_column(Numeric(12, 2))
    options: Mapped[Optional[list]] = mapped_column(JSON)
    is_required: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)

    quote: Mapped["TrainingPurchaseQuote"] = relationship(back_populates="specs")

    __table_args__ = (
        UniqueConstraint("quote_id", "order_index", name="uq_training_quote_spec_order"),
        Index("ix_training_purchase_quote_specs_quote", "quote_id"),
    )


class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"

    id: Mapped[int] = mapped_column(BigInteger, primary_key=True, autoincrement=True)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id"))
    session_id: Mapped[Optional[str]] = mapped_column(String(36))
    type: Mapped[str] = mapped_column(String(32), nullable=False)
    data: Mapped[Optional[dict]] = mapped_column(JSON)
    page_url: Mapped[Optional[str]] = mapped_column(String(512))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now(), nullable=False)

    user: Mapped[Optional["User"]] = relationship(back_populates="analytics_events")

    __table_args__ = (
        Index("ix_analytics_events_user_created", "user_id", "created_at"),
        Index("ix_analytics_events_type_created", "type", "created_at"),
    )
