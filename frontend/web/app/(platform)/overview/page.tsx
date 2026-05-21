"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../../features/auth/components/auth-provider";
import {
  fetchChapters,
  fetchKnowledgeGraph,
  trackOverviewView,
  type Chapter,
  type KnowledgeNode,
  type KnowledgeEdge,
  type KnowledgeGraphData,
} from "../../../features/overview/api/chapters";

// ── Graph constants ────────────────────────────────────────────────────────────

const NODE_COLOR: Record<string, string> = {
  chapter:  "#1e3a5f",
  concept:  "#3a6ea5",
  method:   "#6b9cc9",
  step:     "#a8b8a0",
  tool:     "#b8a888",
  metric:   "#c47b6c",
};

const NODE_RADIUS: Record<string, number> = {
  chapter:  30,
  concept:  22,
  method:   20,
  step:     16,
  tool:     18,
  metric:   15,
};

const EDGE_COLOR: Record<string, string> = {
  contains:     "#c5cdd6",
  prerequisite: "#c5cdd6",
  related:      "#c5cdd6",
  applied_in:   "#c5cdd6",
};

const NODE_TYPE_LABEL: Record<string, string> = {
  chapter:  "章节根节点",
  concept:  "核心概念",
  method:   "方法",
  step:     "流程步骤",
  tool:     "工具",
  metric:   "指标",
};

const EDGE_TYPE_LABEL: Record<string, string> = {
  contains:     "包含",
  prerequisite: "前置",
  related:      "相关",
  applied_in:   "应用于",
};

// ── Force simulation ───────────────────────────────────────────────────────────

const NODE_LABEL_CHARS_PER_LINE = 8;
const NODE_LABEL_LINE_HEIGHT = 13;

function wrapNodeTitle(title: string): string[] {
  const chars = Array.from(title.trim());
  if (chars.length === 0) return [title];

  const lines: string[] = [];
  for (let i = 0; i < chars.length; i += NODE_LABEL_CHARS_PER_LINE) {
    lines.push(chars.slice(i, i + NODE_LABEL_CHARS_PER_LINE).join(""));
  }
  return lines;
}

type Pos = { x: number; y: number };
type PosWithV = Pos & { vx: number; vy: number };

function getNodeRadius(node: KnowledgeNode): number {
  return NODE_RADIUS[node.node_type] ?? 16;
}

function darkenColor(hex: string, amount = 0.16): string {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return hex;

  const channels = [0, 2, 4].map((start) => {
    const value = Number.parseInt(normalized.slice(start, start + 2), 16);
    return Math.max(0, Math.round(value * (1 - amount)))
      .toString(16)
      .padStart(2, "0");
  });

  return `#${channels.join("")}`;
}

function runSimulation(
  nodes: KnowledgeNode[],
  edges: KnowledgeEdge[],
  W: number,
  H: number,
): Record<string, Pos> {
  const pos: Record<string, PosWithV> = {};

  // Init: chapter nodes on an inner ring, others on a wider outer ring.
  const rInner = Math.min(W, H) * 0.24;
  const rOuter = Math.min(W, H) * 0.44;
  nodes.forEach((n, i) => {
    const angle = (i / Math.max(nodes.length, 1)) * Math.PI * 2;
    const r = n.node_type === "chapter" ? rInner : rOuter + (i % 3) * (Math.min(W, H) * 0.04);
    const jitter = () => (Math.random() - 0.5) * Math.min(W, H) * 0.04;
    pos[n.id] = {
      x: W / 2 + Math.cos(angle) * r + jitter(),
      y: H / 2 + Math.sin(angle) * r + jitter(),
      vx: 0,
      vy: 0,
    };
  });

  const IDEAL = Math.min(W, H) * 0.24;
  const REPULSE = Math.min(W, H) ** 2 * 0.026;
  const PAD = Math.min(W, H) * 0.12;
  const LABEL_SPACE = 48;

  const ITERS = 620;
  for (let iter = 0; iter < ITERS; iter++) {
    const alpha = 1 - iter / ITERS;

    // Repulsion between all pairs
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = pos[nodes[i].id];
        const b = pos[nodes[j].id];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist2 = dx * dx + dy * dy || 1;
        const dist = Math.sqrt(dist2);
        const f = (REPULSE * alpha) / dist2;
        const fx = (f * dx) / dist;
        const fy = (f * dy) / dist;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }

    // Edge springs
    edges.forEach((e) => {
      const a = pos[e.source];
      const b = pos[e.target];
      if (!a || !b) return;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = 0.018 * (dist - IDEAL);
      const fx = (f * dx) / dist;
      const fy = (f * dy) / dist;
      a.vx += fx; a.vy += fy;
      b.vx -= fx; b.vy -= fy;
    });

    // Weak gravity toward center
    nodes.forEach((n) => {
      const p = pos[n.id];
      p.vx += 0.0018 * (W / 2 - p.x);
      p.vy += 0.0018 * (H / 2 - p.y);
    });

    // Collision pass: keep circles and their lower labels from visually stacking.
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const aNode = nodes[i];
        const bNode = nodes[j];
        const a = pos[aNode.id];
        const b = pos[bNode.id];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const minDist = getNodeRadius(aNode) + getNodeRadius(bNode) + LABEL_SPACE;
        if (dist >= minDist) continue;

        const push = ((minDist - dist) / dist) * 0.45;
        const px = dx * push;
        const py = dy * push;
        a.vx -= px;
        a.vy -= py;
        b.vx += px;
        b.vy += py;
      }
    }

    // Apply velocity with damping + boundary
    nodes.forEach((n) => {
      const p = pos[n.id];
      p.vx *= 0.82;
      p.vy *= 0.82;
      p.x = Math.max(PAD, Math.min(W - PAD, p.x + p.vx));
      p.y = Math.max(PAD, Math.min(H - PAD, p.y + p.vy));
    });
  }

  return Object.fromEntries(
    Object.entries(pos).map(([k, v]) => [k, { x: v.x, y: v.y }]),
  );
}

function findChapterById(chapters: Chapter[], id: number | null): Chapter | null {
  if (!id) return null;
  for (const chapter of chapters) {
    if (chapter.id === id) return chapter;
    const child = findChapterById(chapter.children ?? [], id);
    if (child) return child;
  }
  return null;
}

function findTopLevelChapterById(chapters: Chapter[], id: number | null): Chapter | null {
  if (!id) return null;
  for (const chapter of chapters) {
    if (chapter.id === id) return chapter;
    if (findChapterById(chapter.children ?? [], id)) return chapter;
  }
  return null;
}

function collectChapterIds(chapter: Chapter | null): Set<number> {
  const ids = new Set<number>();
  const visit = (item: Chapter) => {
    ids.add(item.id);
    item.children?.forEach(visit);
  };
  if (chapter) visit(chapter);
  return ids;
}

function filterGraphByChapterIds(
  graph: KnowledgeGraphData,
  chapterIds: Set<number>,
): KnowledgeGraphData {
  if (chapterIds.size === 0) return graph;

  const nodes = graph.nodes.filter((node) => (
    typeof node.chapter_id === "number" && chapterIds.has(node.chapter_id)
  ));
  const nodeIds = new Set(nodes.map((node) => node.id));
  const edges = graph.edges.filter(
    (edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target),
  );

  return { nodes, edges };
}

// ── Fallback data ──────────────────────────────────────────────────────────────

const FALLBACK_CHAPTERS: Chapter[] = [
  {
    id: 1, sort_order: 1, level: 1, title: "供应源搜寻的基本流程",
    children: [
      { id: 2, sort_order: 1, level: 2, title: "1.1 供应源搜寻的界定" },
      { id: 3, sort_order: 2, level: 2, title: "1.2 供应源搜寻过程" },
      { id: 4, sort_order: 3, level: 2, title: "1.3 潜在供应商的选择" },
      { id: 5, sort_order: 4, level: 2, title: "1.4 供应商资格预审和供应商评估" },
      { id: 6, sort_order: 5, level: 2, title: "1.5 供应商信息的收集和验证" },
      { id: 7, sort_order: 6, level: 2, title: "1.6 供应商绩效评估" },
      { id: 8, sort_order: 7, level: 2, title: "1.7 实践指导" },
    ],
  },
  {
    id: 9, sort_order: 2, level: 1, title: "供应源搜寻战略",
    children: [
      { id: 10, sort_order: 1, level: 2, title: "2.1 供应商数量优化" },
      { id: 11, sort_order: 2, level: 2, title: "2.2 供应源搜寻战略" },
      { id: 12, sort_order: 3, level: 2, title: "2.3 合作关系的建立" },
      { id: 13, sort_order: 4, level: 2, title: "2.4 合同授予" },
      { id: 14, sort_order: 5, level: 2, title: "2.5 实践指导" },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  const router = useRouter();
  const { isAuthenticated, openAuthModal } = useAuth();

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [activeGraphChapterId, setActiveGraphChapterId] = useState<number | null>(null);

  const [rawGraph, setRawGraph] = useState<KnowledgeGraphData | null>(null);
  const [graph, setGraph] = useState<KnowledgeGraphData | null>(null);
  const [positions, setPositions] = useState<Record<string, Pos>>({});
  const [graphLoading, setGraphLoading] = useState(true);
  const [graphEntering, setGraphEntering] = useState(false);

  // Canvas measurement
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  // Locked to the exact W/H used for the simulation — viewBox must match these
  const [simSize, setSimSize] = useState({ w: 0, h: 0 });

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Pan / zoom
  const [panZoom, setPanZoom] = useState({ x: 0, y: 0, scale: 1 });
  const panZoomRef = useRef({ x: 0, y: 0, scale: 1 });
  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ startX: number; startY: number; originX: number; originY: number; moved: boolean } | null>(null);

  const activeGraphChapter = useMemo(
    () => findChapterById(chapters, activeGraphChapterId),
    [chapters, activeGraphChapterId],
  );

  const filteredGraph = useMemo<KnowledgeGraphData | null>(() => {
    if (!rawGraph) return null;
    const chapter = activeGraphChapter ?? chapters[0] ?? null;
    const currentGraph = filterGraphByChapterIds(rawGraph, collectChapterIds(chapter));
    if (currentGraph.nodes.length > 0) return currentGraph;

    const topLevelChapter = findTopLevelChapterById(chapters, activeGraphChapterId);
    if (!topLevelChapter || topLevelChapter.id === chapter?.id) return currentGraph;
    return filterGraphByChapterIds(rawGraph, collectChapterIds(topLevelChapter));
  }, [rawGraph, chapters, activeGraphChapter, activeGraphChapterId]);

  // Effect 1 — fetch data
  useEffect(() => {
    fetchChapters()
      .then((data) => {
        const top = Array.isArray(data) ? data.filter((c) => !c.level || c.level === 1) : [];
        const nextChapters = top.length > 0 ? top : FALLBACK_CHAPTERS;
        setChapters(nextChapters);
        setActiveGraphChapterId((current) => current ?? nextChapters[0]?.id ?? null);
        setExpandedIds((current) => current.size > 0 ? current : new Set(nextChapters[0]?.id ? [nextChapters[0].id] : []));
      })
      .catch(() => {
        setChapters(FALLBACK_CHAPTERS);
        setActiveGraphChapterId((current) => current ?? FALLBACK_CHAPTERS[0]?.id ?? null);
        setExpandedIds((current) => current.size > 0 ? current : new Set([FALLBACK_CHAPTERS[0].id]));
      });

    fetchKnowledgeGraph()
      .then(setRawGraph)
      .catch(() => setGraphLoading(false));   // nothing to show, stop spinner

    trackOverviewView();
  }, []);

  // Effect 2 — measure canvas
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setCanvasSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Effect 3 — run simulation for the active chapter once data and canvas size are ready
  useEffect(() => {
    if (!filteredGraph || canvasSize.w === 0) return;
    const { w, h } = canvasSize;          // snapshot — never changes after this
    setSimSize({ w, h });
    setGraph(filteredGraph);
    setPositions(runSimulation(filteredGraph.nodes, filteredGraph.edges, w, h));
    setGraphEntering(true);
    setGraphLoading(false);
    setSelectedId(null);
    setHoveredId(null);
    resetView();
  }, [filteredGraph, canvasSize]);

  useEffect(() => {
    if (!graphEntering) return;
    const timeout = window.setTimeout(() => setGraphEntering(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [graphEntering]);

  // Keep ref in sync so wheel handler can read latest value
  useEffect(() => { panZoomRef.current = panZoom; }, [panZoom]);

  // Non-passive wheel handler (must be added imperatively)
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const { x, y, scale } = panZoomRef.current;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const delta = e.deltaY > 0 ? 0.85 : 1 / 0.85;
      const newScale = Math.min(4, Math.max(0.25, scale * delta));
      // Zoom toward cursor
      const newX = mouseX - (mouseX - x) * (newScale / scale);
      const newY = mouseY - (mouseY - y) * (newScale / scale);
      const next = { x: newX, y: newY, scale: newScale };
      panZoomRef.current = next;
      setPanZoom(next);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [graphLoading]);  // re-attach after SVG mounts (graphLoading → false)

  const handleSvgMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: panZoomRef.current.x,
      originY: panZoomRef.current.y,
      moved: false,
    };
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (!dragRef.current.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
    dragRef.current.moved = true;
    const next = {
      ...panZoomRef.current,
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    };
    panZoomRef.current = next;
    setPanZoom(next);
  };

  const endDrag = () => { dragRef.current = null; };

  const zoomBy = (delta: number) => {
    const { x, y, scale } = panZoomRef.current;
    const cx = canvasSize.w / 2;
    const cy = canvasSize.h / 2;
    const newScale = Math.min(4, Math.max(0.25, scale * delta));
    const next = {
      x: cx - (cx - x) * (newScale / scale),
      y: cy - (cy - y) * (newScale / scale),
      scale: newScale,
    };
    panZoomRef.current = next;
    setPanZoom(next);
  };

  const resetView = () => {
    const next = { x: 0, y: 0, scale: 1 };
    panZoomRef.current = next;
    setPanZoom(next);
  };

  const handleNodeClick = (
    e: ReactMouseEvent<SVGGElement>,
    nodeId: string,
    nodeColor: string,
    baseRadius: number,
  ) => {
    if (dragRef.current?.moved) return;

    const node = e.currentTarget.querySelector<SVGCircleElement>(".overview-node-core");
    const ring = e.currentTarget.querySelector<SVGCircleElement>(".click-ring");

    if (node) {
      node.style.transition = "transform 0.1s ease-out, fill 0.1s ease";
      node.style.transform = "scale(0.88)";
      node.style.fill = darkenColor(nodeColor);

      window.setTimeout(() => {
        node.style.transition = "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), fill 0.3s ease";
        node.style.transform = "scale(1)";
        node.style.fill = nodeColor;
      }, 100);
    }

    if (ring) {
      ring.setAttribute("r", String(baseRadius));
      ring.setAttribute("opacity", "0.7");
      ring.style.transition = "none";
      ring.getBoundingClientRect();
      ring.style.transition = "r 0.55s ease-out, opacity 0.55s ease-out";
      ring.setAttribute("r", String(baseRadius * 2.2));
      ring.setAttribute("opacity", "0");
    }

    setSelectedId((prev) => (prev === nodeId ? null : nodeId));
  };

  const toggleExpand = (id: number) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const selectGraphChapter = (chapterId: number) => {
    setActiveGraphChapterId(chapterId);
  };

  // Nodes connected to selected/hovered
  const focusId = selectedId ?? hoveredId;
  const connectedIds = focusId && graph
    ? new Set(
        graph.edges
          .filter((e) => e.source === focusId || e.target === focusId)
          .flatMap((e) => [e.source, e.target]),
      )
    : null;

  const focusNode = focusId ? graph?.nodes.find((n) => n.id === focusId) : null;
  const focusEdges = focusId && graph
    ? graph.edges.filter((e) => e.source === focusId || e.target === focusId)
    : [];

  const handleChapterNav = (chapterId: number) => {
    if (isAuthenticated) {
      router.push(`/course?chapter=${chapterId}`);
    } else {
      openAuthModal({ mode: "login", reason: "查看章节详情前请先登录。" });
    }
  };

  return (
    <div className="overview-page">
      {/* ── Left sidebar ── */}
      <aside className="overview-sidebar">
        <div className="overview-sidebar-head">
          <div className="eyebrow">知识图谱</div>
          <h2 className="overview-sidebar-title">供应链导源课程</h2>
        </div>

        <nav aria-label="课程章节">
          <ol className="chapter-list">
            {chapters.map((ch) => {
              const isExpanded = expandedIds.has(ch.id);
              const hasChildren = Array.isArray(ch.children) && ch.children.length > 0;
              const isActiveParent = activeGraphChapterId === ch.id;
              return (
                <li key={ch.id} className="chapter-group">
                  <button
                    type="button"
                    className={`chapter-item${hasChildren ? " is-parent" : ""}${isActiveParent ? " is-active" : ""}`}
                    aria-expanded={isExpanded ? "true" : "false"}
                    onClick={() => {
                      selectGraphChapter(ch.id);
                      if (hasChildren) toggleExpand(ch.id);
                    }}
                  >
                    <span className="chapter-num" aria-hidden="true">
                      {String(ch.sort_order).padStart(2, "0")}
                    </span>
                    <div className="chapter-body">
                      <span className="chapter-title">{ch.title}</span>
                      {!isExpanded && hasChildren && (
                        <span className="chapter-summary">
                          {ch.children!.length} 个小节
                        </span>
                      )}
                    </div>
                    <div className="chapter-item-right">
                      {hasChildren && (
                        <span
                          className={`chapter-toggle${isExpanded ? " is-open" : ""}`}
                          aria-hidden="true"
                        >
                          ▶
                        </span>
                      )}
                    </div>
                  </button>

                  {hasChildren && isExpanded && (
                    <ol className="chapter-children">
                      {ch.children!.map((sub) => {
                        const isActiveChild = activeGraphChapterId === sub.id;
                        return (
                        <li
                          key={sub.id}
                          className={`chapter-child-item${isActiveChild ? " is-active" : ""}`}
                          onClick={() => selectGraphChapter(sub.id)}
                        >
                          <span className="chapter-child-dot" aria-hidden="true" />
                          <span className="chapter-child-title">{sub.title}</span>
                          <button
                            className="chapter-action route-link"
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleChapterNav(sub.id);
                            }}
                          >
                            查看
                          </button>
                        </li>
                      );
                      })}
                    </ol>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </aside>

      {/* ── Graph area ── */}
      <div className="overview-graph-area">
        {/* Toolbar */}
        <div className="overview-graph-toolbar">
          <span className="overview-graph-title">
            知识图谱
            {activeGraphChapter ? ` · ${activeGraphChapter.title}` : ""}
          </span>
          <div className="overview-graph-legend">
            {Object.entries(NODE_TYPE_LABEL).map(([type, label]) => (
              <span key={type} className="overview-legend-item">
                <span
                  className="overview-legend-dot"
                  style={{ background: NODE_COLOR[type] }}
                />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* SVG canvas */}
        <div className="overview-graph-canvas" ref={canvasRef}>
          {graphLoading ? (
            <div className="overview-graph-placeholder">
              <span className="overview-loading-dot" />
              <span className="overview-loading-dot" />
              <span className="overview-loading-dot" />
              <span className="overview-loading-label">加载知识图谱中</span>
            </div>
          ) : !graph || graph.nodes.length === 0 ? (
            <div className="overview-graph-placeholder">
              <span style={{ color: "var(--cds-text-helper)", fontSize: 14 }}>
                暂无图谱数据
              </span>
            </div>
          ) : (
            <svg
              ref={svgRef}
              viewBox={`0 0 ${simSize.w} ${simSize.h}`}
              preserveAspectRatio="xMidYMid meet"
              width="100%"
              height="100%"
              className="overview-graph-svg"
              aria-label="知识图谱"
              style={{ cursor: dragRef.current ? "grabbing" : "grab" }}
              onMouseDown={handleSvgMouseDown}
              onMouseMove={handleSvgMouseMove}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
            >
              <defs>
                {Object.entries(EDGE_COLOR).map(([type, color]) => (
                  <marker
                    key={type}
                    id={`arrow-${type}`}
                    markerWidth="8"
                    markerHeight="8"
                    refX="7"
                    refY="3"
                    orient="auto"
                  >
                    <path d="M0,0 L0,6 L8,3 z" fill={color} opacity="0.7" />
                  </marker>
                ))}
              </defs>

              <g
                className={`overview-graph-stage${graphEntering ? " is-entering" : ""}`}
                transform={`translate(${panZoom.x},${panZoom.y}) scale(${panZoom.scale})`}
              >
              {/* Edges */}
              {graph.edges.map((e, i) => {
                const a = positions[e.source];
                const b = positions[e.target];
                if (!a || !b) return null;
                const isFocus =
                  focusId === e.source || focusId === e.target;
                const color = EDGE_COLOR[e.relation_type] ?? "#c6c6c6";
                return (
                  <line
                    key={i}
                    className="overview-graph-edge"
                    x1={a.x} y1={a.y}
                    x2={b.x} y2={b.y}
                    stroke={color}
                    strokeWidth={isFocus ? 2 : 1}
                    opacity={focusId && !isFocus ? 0.15 : isFocus ? 0.9 : 0.5}
                    pathLength={1}
                    markerEnd={`url(#arrow-${e.relation_type})`}
                    style={{ "--edge-delay": `${80 + i * 18}ms` } as CSSProperties}
                  />
                );
              })}

              {/* Nodes */}
              {graph.nodes.map((n, index) => {
                const p = positions[n.id];
                if (!p) return null;
                const r = getNodeRadius(n);
                const color = NODE_COLOR[n.node_type] ?? "#525252";
                const isFocus = focusId === n.id;
                const isHovered = hoveredId === n.id;
                const isConnected = connectedIds?.has(n.id);
                const dimmed = focusId && !isFocus && !isConnected;
                const nodeClassName = [
                  "overview-graph-node",
                  isFocus ? "is-selected" : "",
                  isHovered ? "is-hovered" : "",
                ].filter(Boolean).join(" ");

                const fullLabelLines = wrapNodeTitle(n.title);
                const labelY = r + 14;

                return (
                  <g
                    key={n.id}
                    className={nodeClassName}
                    transform={`translate(${p.x}, ${p.y})`}
                    style={{
                      "--node-delay": `${180 + index * 34}ms`,
                      cursor: "pointer",
                      opacity: dimmed ? 0.2 : 1,
                    } as CSSProperties}
                    onClick={(e) => handleNodeClick(e, n.id, color, r)}
                    onMouseEnter={() => setHoveredId(n.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={n.title}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      setSelectedId((prev) => (prev === n.id ? null : n.id))
                    }
                  >
                    {isHovered && (
                      <circle
                        className="overview-node-halo"
                        cx={0}
                        cy={0}
                        r={r + 9}
                        fill={color}
                      />
                    )}
                    <circle
                      className="overview-node-core"
                      cx={0} cy={0} r={r}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth={isFocus ? 2.5 : 2}
                    />
                    <circle
                      className="click-ring"
                      cx={0}
                      cy={0}
                      r={r}
                      fill="none"
                      stroke={color}
                      opacity={0}
                    />
                    <text
                      className="overview-node-label"
                      x={0}
                      y={labelY}
                      textAnchor="middle"
                      fill="#161616"
                      fontSize={n.node_type === "chapter" ? 12 : 11}
                      fontWeight={isFocus ? 600 : 500}
                      fontFamily="IBM Plex Sans, sans-serif"
                      stroke="var(--cds-background-muted)"
                      strokeWidth={3}
                      paintOrder="stroke fill"
                      style={{ pointerEvents: "none", userSelect: "none" }}
                    >
                      {fullLabelLines.map((line, li) => (
                        <tspan
                          key={`${n.id}-label-${li}`}
                          x={0}
                          dy={li === 0 ? 0 : NODE_LABEL_LINE_HEIGHT}
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </g>
                );
              })}
              </g>
            </svg>
          )}

          {/* Zoom controls */}
          {graph && graph.nodes.length > 0 && !graphLoading && (
            <div className="overview-zoom-controls">
              <button
                className="overview-zoom-btn"
                type="button"
                aria-label="放大"
                onClick={() => zoomBy(1 / 0.85)}
              >+</button>
              <button
                className="overview-zoom-btn"
                type="button"
                aria-label="重置视图"
                onClick={resetView}
              >重置</button>
              <button
                className="overview-zoom-btn"
                type="button"
                aria-label="缩小"
                onClick={() => zoomBy(0.85)}
              >−</button>
            </div>
          )}

          {/* Node detail panel — absolute, floats over canvas */}
          {focusNode && (
            <div className="overview-node-detail">
              <div className="overview-node-detail-head">
                <span
                  className="overview-node-type-badge"
                  style={{ background: NODE_COLOR[focusNode.node_type] ?? "#525252" }}
                >
                  {NODE_TYPE_LABEL[focusNode.node_type] ?? focusNode.node_type}
                </span>
                <button
                  className="button-ghost overview-node-close"
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="关闭详情"
                >
                  ✕
                </button>
              </div>
              <div className="overview-node-detail-title">{focusNode.title}</div>
              {focusNode.description && (
                <p className="overview-node-detail-desc">{focusNode.description}</p>
              )}
              {focusEdges.length > 0 && (
                <div className="overview-node-edges">
                  <div className="overview-node-edges-label">关联关系</div>
                  <ul className="overview-node-edges-list">
                    {focusEdges.map((e, i) => {
                      const otherId = e.source === focusNode.id ? e.target : e.source;
                      const other = graph?.nodes.find((n) => n.id === otherId);
                      const dir = e.source === focusNode.id ? "→" : "←";
                      return (
                        <li key={i} className="overview-node-edge-item">
                          <span
                            className="overview-node-edge-type"
                            style={{ color: EDGE_COLOR[e.relation_type] ?? "#525252" }}
                          >
                            {dir} {EDGE_TYPE_LABEL[e.relation_type] ?? e.relation_type}
                          </span>
                          <span className="overview-node-edge-target">
                            {other?.title ?? otherId}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Edge legend */}
        <div className="overview-edge-legend">
          {Object.entries(EDGE_TYPE_LABEL).map(([type, label]) => (
            <span key={type} className="overview-legend-item">
              <span
                className="overview-legend-line"
                style={{ background: EDGE_COLOR[type] }}
              />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
