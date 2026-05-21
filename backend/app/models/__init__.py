from app.models.models import (
    User,
    Conversation,
    ChatMessage,
    Chapter,
    Video,
    KnowledgeNode,
    KnowledgeEdge,
    UserChapterProgress,
    UserNote,
    TrainingCase,
    TrainingSupplier,
    TrainingStepConfig,
    TrainingCaseNegotiationSupplier,
    TrainingCaseNegotiationOption,
    UserTrainingProgress,
    UserStepSubmission,
    TrainingPurchaseQuote,
    TrainingPurchaseQuoteSpec,
    AnalyticsEvent,
)

# Referenced by database.py init_db to ensure all models are imported
all_models = [
    User, Conversation, ChatMessage, Chapter, Video,
    KnowledgeNode, KnowledgeEdge, UserChapterProgress, UserNote,
    TrainingCase, TrainingSupplier, TrainingStepConfig,
    TrainingCaseNegotiationSupplier, TrainingCaseNegotiationOption,
    UserTrainingProgress, UserStepSubmission,
    TrainingPurchaseQuote, TrainingPurchaseQuoteSpec, AnalyticsEvent,
]

__all__ = [
    "User", "Conversation", "ChatMessage", "Chapter", "Video",
    "KnowledgeNode", "KnowledgeEdge", "UserChapterProgress", "UserNote",
    "TrainingCase", "TrainingSupplier", "TrainingStepConfig",
    "TrainingCaseNegotiationSupplier", "TrainingCaseNegotiationOption",
    "UserTrainingProgress", "UserStepSubmission",
    "TrainingPurchaseQuote", "TrainingPurchaseQuoteSpec", "AnalyticsEvent",
    "all_models",
]
