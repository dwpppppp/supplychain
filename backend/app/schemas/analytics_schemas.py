from typing import Optional, Any
from pydantic import BaseModel


class TrackRequest(BaseModel):
    type: str  # node_click | ai_question | action
    data: dict[str, Any] = {}


class TrackResponse(BaseModel):
    event_id: int


class OverviewStats(BaseModel):
    total_graph_clicks: int
    total_ai_questions: int
    active_users: int
    popular_chapters_count: int
    popular_keywords_count: int


class PopularItem(BaseModel):
    id: Any
    title: str
    count: int


class PopularNodes(BaseModel):
    popular_chapters: list[PopularItem]
    popular_keywords: list[PopularItem]


class AIUsageStats(BaseModel):
    total_questions: int
    success_rate: float
    avg_response_time: float
    popular_keywords: list[PopularItem]


class UserActivityItem(BaseModel):
    date: str
    count: int


class DashboardResponse(BaseModel):
    overview: OverviewStats
    popular_nodes: PopularNodes
    ai_usage: AIUsageStats
    user_activity: list[UserActivityItem]
