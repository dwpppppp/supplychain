import { API_BASE_URL } from "../../../lib/constants/api";
import { request } from "../../../lib/api/http";

export type Chapter = {
  id: number;
  title: string;
  sort_order: number;
  level?: number;
  children?: Chapter[];
  summary?: string;
};

export type KnowledgeNode = {
  id: string;
  title: string;
  description?: string;
  node_type: string;
  chapter_id?: number;
};

export type KnowledgeEdge = {
  source: string;
  target: string;
  relation_type: string;
};

export type KnowledgeGraphData = {
  nodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
};

export async function fetchChapters(): Promise<Chapter[]> {
  return request<Chapter[]>("/course/chapters");
}

export async function fetchKnowledgeGraph(): Promise<KnowledgeGraphData> {
  return request<KnowledgeGraphData>("/course/knowledge-graph");
}

export async function trackOverviewView(): Promise<void> {
  await fetch(`${API_BASE_URL}/analytics/track`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_type: "page_view", page: "overview" }),
  }).catch(() => {});
}
