module.exports = [
"[project]/features/overview/api/chapters.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchChapters",
    ()=>fetchChapters,
    "fetchKnowledgeGraph",
    ()=>fetchKnowledgeGraph,
    "trackOverviewView",
    ()=>trackOverviewView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-ssr] (ecmascript)");
;
;
async function fetchChapters() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/course/chapters");
}
async function fetchKnowledgeGraph() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/course/knowledge-graph");
}
async function trackOverviewView() {
    await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/analytics/track`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            event_type: "page_view",
            page: "overview"
        })
    }).catch(()=>{});
}
}),
"[project]/app/(platform)/overview/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OverviewPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$overview$2f$api$2f$chapters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/overview/api/chapters.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
// ── Graph constants ────────────────────────────────────────────────────────────
const NODE_COLOR = {
    chapter: "#1e3a5f",
    concept: "#3a6ea5",
    method: "#6b9cc9",
    step: "#a8b8a0",
    tool: "#b8a888",
    metric: "#c47b6c"
};
const NODE_RADIUS = {
    chapter: 30,
    concept: 22,
    method: 20,
    step: 16,
    tool: 18,
    metric: 15
};
const EDGE_COLOR = {
    contains: "#c5cdd6",
    prerequisite: "#c5cdd6",
    related: "#c5cdd6",
    applied_in: "#c5cdd6"
};
const NODE_TYPE_LABEL = {
    chapter: "章节根节点",
    concept: "核心概念",
    method: "方法",
    step: "流程步骤",
    tool: "工具",
    metric: "指标"
};
const EDGE_TYPE_LABEL = {
    contains: "包含",
    prerequisite: "前置",
    related: "相关",
    applied_in: "应用于"
};
// ── Force simulation ───────────────────────────────────────────────────────────
const NODE_LABEL_CHARS_PER_LINE = 8;
const NODE_LABEL_LINE_HEIGHT = 13;
function wrapNodeTitle(title) {
    const chars = Array.from(title.trim());
    if (chars.length === 0) return [
        title
    ];
    const lines = [];
    for(let i = 0; i < chars.length; i += NODE_LABEL_CHARS_PER_LINE){
        lines.push(chars.slice(i, i + NODE_LABEL_CHARS_PER_LINE).join(""));
    }
    return lines;
}
function getNodeRadius(node) {
    return NODE_RADIUS[node.node_type] ?? 16;
}
function darkenColor(hex, amount = 0.16) {
    const normalized = hex.replace("#", "");
    if (normalized.length !== 6) return hex;
    const channels = [
        0,
        2,
        4
    ].map((start)=>{
        const value = Number.parseInt(normalized.slice(start, start + 2), 16);
        return Math.max(0, Math.round(value * (1 - amount))).toString(16).padStart(2, "0");
    });
    return `#${channels.join("")}`;
}
function runSimulation(nodes, edges, W, H) {
    const pos = {};
    // Init: chapter nodes on an inner ring, others on a wider outer ring.
    const rInner = Math.min(W, H) * 0.24;
    const rOuter = Math.min(W, H) * 0.44;
    nodes.forEach((n, i)=>{
        const angle = i / Math.max(nodes.length, 1) * Math.PI * 2;
        const r = n.node_type === "chapter" ? rInner : rOuter + i % 3 * (Math.min(W, H) * 0.04);
        const jitter = ()=>(Math.random() - 0.5) * Math.min(W, H) * 0.04;
        pos[n.id] = {
            x: W / 2 + Math.cos(angle) * r + jitter(),
            y: H / 2 + Math.sin(angle) * r + jitter(),
            vx: 0,
            vy: 0
        };
    });
    const IDEAL = Math.min(W, H) * 0.24;
    const REPULSE = Math.min(W, H) ** 2 * 0.026;
    const PAD = Math.min(W, H) * 0.12;
    const LABEL_SPACE = 48;
    const ITERS = 620;
    for(let iter = 0; iter < ITERS; iter++){
        const alpha = 1 - iter / ITERS;
        // Repulsion between all pairs
        for(let i = 0; i < nodes.length; i++){
            for(let j = i + 1; j < nodes.length; j++){
                const a = pos[nodes[i].id];
                const b = pos[nodes[j].id];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const dist2 = dx * dx + dy * dy || 1;
                const dist = Math.sqrt(dist2);
                const f = REPULSE * alpha / dist2;
                const fx = f * dx / dist;
                const fy = f * dy / dist;
                a.vx -= fx;
                a.vy -= fy;
                b.vx += fx;
                b.vy += fy;
            }
        }
        // Edge springs
        edges.forEach((e)=>{
            const a = pos[e.source];
            const b = pos[e.target];
            if (!a || !b) return;
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const f = 0.018 * (dist - IDEAL);
            const fx = f * dx / dist;
            const fy = f * dy / dist;
            a.vx += fx;
            a.vy += fy;
            b.vx -= fx;
            b.vy -= fy;
        });
        // Weak gravity toward center
        nodes.forEach((n)=>{
            const p = pos[n.id];
            p.vx += 0.0018 * (W / 2 - p.x);
            p.vy += 0.0018 * (H / 2 - p.y);
        });
        // Collision pass: keep circles and their lower labels from visually stacking.
        for(let i = 0; i < nodes.length; i++){
            for(let j = i + 1; j < nodes.length; j++){
                const aNode = nodes[i];
                const bNode = nodes[j];
                const a = pos[aNode.id];
                const b = pos[bNode.id];
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                const minDist = getNodeRadius(aNode) + getNodeRadius(bNode) + LABEL_SPACE;
                if (dist >= minDist) continue;
                const push = (minDist - dist) / dist * 0.45;
                const px = dx * push;
                const py = dy * push;
                a.vx -= px;
                a.vy -= py;
                b.vx += px;
                b.vy += py;
            }
        }
        // Apply velocity with damping + boundary
        nodes.forEach((n)=>{
            const p = pos[n.id];
            p.vx *= 0.82;
            p.vy *= 0.82;
            p.x = Math.max(PAD, Math.min(W - PAD, p.x + p.vx));
            p.y = Math.max(PAD, Math.min(H - PAD, p.y + p.vy));
        });
    }
    return Object.fromEntries(Object.entries(pos).map(([k, v])=>[
            k,
            {
                x: v.x,
                y: v.y
            }
        ]));
}
function findChapterById(chapters, id) {
    if (!id) return null;
    for (const chapter of chapters){
        if (chapter.id === id) return chapter;
        const child = findChapterById(chapter.children ?? [], id);
        if (child) return child;
    }
    return null;
}
function findTopLevelChapterById(chapters, id) {
    if (!id) return null;
    for (const chapter of chapters){
        if (chapter.id === id) return chapter;
        if (findChapterById(chapter.children ?? [], id)) return chapter;
    }
    return null;
}
function collectChapterIds(chapter) {
    const ids = new Set();
    const visit = (item)=>{
        ids.add(item.id);
        item.children?.forEach(visit);
    };
    if (chapter) visit(chapter);
    return ids;
}
function filterGraphByChapterIds(graph, chapterIds) {
    if (chapterIds.size === 0) return graph;
    const nodes = graph.nodes.filter((node)=>typeof node.chapter_id === "number" && chapterIds.has(node.chapter_id));
    const nodeIds = new Set(nodes.map((node)=>node.id));
    const edges = graph.edges.filter((edge)=>nodeIds.has(edge.source) && nodeIds.has(edge.target));
    return {
        nodes,
        edges
    };
}
// ── Fallback data ──────────────────────────────────────────────────────────────
const FALLBACK_CHAPTERS = [
    {
        id: 1,
        sort_order: 1,
        level: 1,
        title: "供应源搜寻的基本流程",
        children: [
            {
                id: 2,
                sort_order: 1,
                level: 2,
                title: "1.1 供应源搜寻的界定"
            },
            {
                id: 3,
                sort_order: 2,
                level: 2,
                title: "1.2 供应源搜寻过程"
            },
            {
                id: 4,
                sort_order: 3,
                level: 2,
                title: "1.3 潜在供应商的选择"
            },
            {
                id: 5,
                sort_order: 4,
                level: 2,
                title: "1.4 供应商资格预审和供应商评估"
            },
            {
                id: 6,
                sort_order: 5,
                level: 2,
                title: "1.5 供应商信息的收集和验证"
            },
            {
                id: 7,
                sort_order: 6,
                level: 2,
                title: "1.6 供应商绩效评估"
            },
            {
                id: 8,
                sort_order: 7,
                level: 2,
                title: "1.7 实践指导"
            }
        ]
    },
    {
        id: 9,
        sort_order: 2,
        level: 1,
        title: "供应源搜寻战略",
        children: [
            {
                id: 10,
                sort_order: 1,
                level: 2,
                title: "2.1 供应商数量优化"
            },
            {
                id: 11,
                sort_order: 2,
                level: 2,
                title: "2.2 供应源搜寻战略"
            },
            {
                id: 12,
                sort_order: 3,
                level: 2,
                title: "2.3 合作关系的建立"
            },
            {
                id: 13,
                sort_order: 4,
                level: 2,
                title: "2.4 合同授予"
            },
            {
                id: 14,
                sort_order: 5,
                level: 2,
                title: "2.5 实践指导"
            }
        ]
    }
];
function OverviewPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isAuthenticated, openAuthModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [chapters, setChapters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedIds, setExpandedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [activeGraphChapterId, setActiveGraphChapterId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rawGraph, setRawGraph] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [graph, setGraph] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [positions, setPositions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [graphLoading, setGraphLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [graphEntering, setGraphEntering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Canvas measurement
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [canvasSize, setCanvasSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    // Locked to the exact W/H used for the simulation — viewBox must match these
    const [simSize, setSimSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        w: 0,
        h: 0
    });
    const [hoveredId, setHoveredId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pan / zoom
    const [panZoom, setPanZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0,
        scale: 1
    });
    const panZoomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0,
        scale: 1
    });
    const svgRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeGraphChapter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>findChapterById(chapters, activeGraphChapterId), [
        chapters,
        activeGraphChapterId
    ]);
    const filteredGraph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!rawGraph) return null;
        const chapter = activeGraphChapter ?? chapters[0] ?? null;
        const currentGraph = filterGraphByChapterIds(rawGraph, collectChapterIds(chapter));
        if (currentGraph.nodes.length > 0) return currentGraph;
        const topLevelChapter = findTopLevelChapterById(chapters, activeGraphChapterId);
        if (!topLevelChapter || topLevelChapter.id === chapter?.id) return currentGraph;
        return filterGraphByChapterIds(rawGraph, collectChapterIds(topLevelChapter));
    }, [
        rawGraph,
        chapters,
        activeGraphChapter,
        activeGraphChapterId
    ]);
    // Effect 1 — fetch data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$overview$2f$api$2f$chapters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchChapters"])().then((data)=>{
            const top = Array.isArray(data) ? data.filter((c)=>!c.level || c.level === 1) : [];
            const nextChapters = top.length > 0 ? top : FALLBACK_CHAPTERS;
            setChapters(nextChapters);
            setActiveGraphChapterId((current)=>current ?? nextChapters[0]?.id ?? null);
            setExpandedIds((current)=>current.size > 0 ? current : new Set(nextChapters[0]?.id ? [
                    nextChapters[0].id
                ] : []));
        }).catch(()=>{
            setChapters(FALLBACK_CHAPTERS);
            setActiveGraphChapterId((current)=>current ?? FALLBACK_CHAPTERS[0]?.id ?? null);
            setExpandedIds((current)=>current.size > 0 ? current : new Set([
                    FALLBACK_CHAPTERS[0].id
                ]));
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$overview$2f$api$2f$chapters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchKnowledgeGraph"])().then(setRawGraph).catch(()=>setGraphLoading(false)); // nothing to show, stop spinner
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$overview$2f$api$2f$chapters$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["trackOverviewView"])();
    }, []);
    // Effect 2 — measure canvas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = canvasRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry])=>{
            const { width, height } = entry.contentRect;
            if (width > 0 && height > 0) setCanvasSize({
                w: width,
                h: height
            });
        });
        ro.observe(el);
        return ()=>ro.disconnect();
    }, []);
    // Effect 3 — run simulation for the active chapter once data and canvas size are ready
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!filteredGraph || canvasSize.w === 0) return;
        const { w, h } = canvasSize; // snapshot — never changes after this
        setSimSize({
            w,
            h
        });
        setGraph(filteredGraph);
        setPositions(runSimulation(filteredGraph.nodes, filteredGraph.edges, w, h));
        setGraphEntering(true);
        setGraphLoading(false);
        setSelectedId(null);
        setHoveredId(null);
        resetView();
    }, [
        filteredGraph,
        canvasSize
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!graphEntering) return;
        const timeout = window.setTimeout(()=>setGraphEntering(false), 1600);
        return ()=>window.clearTimeout(timeout);
    }, [
        graphEntering
    ]);
    // Keep ref in sync so wheel handler can read latest value
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        panZoomRef.current = panZoom;
    }, [
        panZoom
    ]);
    // Non-passive wheel handler (must be added imperatively)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const el = svgRef.current;
        if (!el) return;
        const onWheel = (e)=>{
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
            const next = {
                x: newX,
                y: newY,
                scale: newScale
            };
            panZoomRef.current = next;
            setPanZoom(next);
        };
        el.addEventListener("wheel", onWheel, {
            passive: false
        });
        return ()=>el.removeEventListener("wheel", onWheel);
    }, [
        graphLoading
    ]); // re-attach after SVG mounts (graphLoading → false)
    const handleSvgMouseDown = (e)=>{
        if (e.button !== 0) return;
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: panZoomRef.current.x,
            originY: panZoomRef.current.y,
            moved: false
        };
    };
    const handleSvgMouseMove = (e)=>{
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        if (!dragRef.current.moved && Math.abs(dx) + Math.abs(dy) < 3) return;
        dragRef.current.moved = true;
        const next = {
            ...panZoomRef.current,
            x: dragRef.current.originX + dx,
            y: dragRef.current.originY + dy
        };
        panZoomRef.current = next;
        setPanZoom(next);
    };
    const endDrag = ()=>{
        dragRef.current = null;
    };
    const zoomBy = (delta)=>{
        const { x, y, scale } = panZoomRef.current;
        const cx = canvasSize.w / 2;
        const cy = canvasSize.h / 2;
        const newScale = Math.min(4, Math.max(0.25, scale * delta));
        const next = {
            x: cx - (cx - x) * (newScale / scale),
            y: cy - (cy - y) * (newScale / scale),
            scale: newScale
        };
        panZoomRef.current = next;
        setPanZoom(next);
    };
    const resetView = ()=>{
        const next = {
            x: 0,
            y: 0,
            scale: 1
        };
        panZoomRef.current = next;
        setPanZoom(next);
    };
    const handleNodeClick = (e, nodeId, nodeColor, baseRadius)=>{
        if (dragRef.current?.moved) return;
        const node = e.currentTarget.querySelector(".overview-node-core");
        const ring = e.currentTarget.querySelector(".click-ring");
        if (node) {
            node.style.transition = "transform 0.1s ease-out, fill 0.1s ease";
            node.style.transform = "scale(0.88)";
            node.style.fill = darkenColor(nodeColor);
            window.setTimeout(()=>{
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
        setSelectedId((prev)=>prev === nodeId ? null : nodeId);
    };
    const toggleExpand = (id)=>setExpandedIds((prev)=>{
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    const selectGraphChapter = (chapterId)=>{
        setActiveGraphChapterId(chapterId);
    };
    // Nodes connected to selected/hovered
    const focusId = selectedId ?? hoveredId;
    const connectedIds = focusId && graph ? new Set(graph.edges.filter((e)=>e.source === focusId || e.target === focusId).flatMap((e)=>[
            e.source,
            e.target
        ])) : null;
    const focusNode = focusId ? graph?.nodes.find((n)=>n.id === focusId) : null;
    const focusEdges = focusId && graph ? graph.edges.filter((e)=>e.source === focusId || e.target === focusId) : [];
    const handleChapterNav = (chapterId)=>{
        if (isAuthenticated) {
            router.push(`/course?chapter=${chapterId}`);
        } else {
            openAuthModal({
                mode: "login",
                reason: "查看章节详情前请先登录。"
            });
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overview-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "overview-sidebar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overview-sidebar-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "eyebrow",
                                children: "知识图谱"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 531,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "overview-sidebar-title",
                                children: "供应链导源课程"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 532,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/overview/page.tsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        "aria-label": "课程章节",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                            className: "chapter-list",
                            children: chapters.map((ch)=>{
                                const isExpanded = expandedIds.has(ch.id);
                                const hasChildren = Array.isArray(ch.children) && ch.children.length > 0;
                                const isActiveParent = activeGraphChapterId === ch.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "chapter-group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: `chapter-item${hasChildren ? " is-parent" : ""}${isActiveParent ? " is-active" : ""}`,
                                            "aria-expanded": isExpanded ? "true" : "false",
                                            onClick: ()=>{
                                                selectGraphChapter(ch.id);
                                                if (hasChildren) toggleExpand(ch.id);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "chapter-num",
                                                    "aria-hidden": "true",
                                                    children: String(ch.sort_order).padStart(2, "0")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                    lineNumber: 552,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chapter-body",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "chapter-title",
                                                            children: ch.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 556,
                                                            columnNumber: 23
                                                        }, this),
                                                        !isExpanded && hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "chapter-summary",
                                                            children: [
                                                                ch.children.length,
                                                                " 个小节"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 558,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                    lineNumber: 555,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "chapter-item-right",
                                                    children: hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `chapter-toggle${isExpanded ? " is-open" : ""}`,
                                                        "aria-hidden": "true",
                                                        children: "▶"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                                        lineNumber: 565,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                    lineNumber: 563,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                            lineNumber: 543,
                                            columnNumber: 19
                                        }, this),
                                        hasChildren && isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                                            className: "chapter-children",
                                            children: ch.children.map((sub)=>{
                                                const isActiveChild = activeGraphChapterId === sub.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: `chapter-child-item${isActiveChild ? " is-active" : ""}`,
                                                    onClick: ()=>selectGraphChapter(sub.id),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "chapter-child-dot",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 585,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "chapter-child-title",
                                                            children: sub.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 586,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "chapter-action route-link",
                                                            type: "button",
                                                            onClick: (event)=>{
                                                                event.stopPropagation();
                                                                handleChapterNav(sub.id);
                                                            },
                                                            children: "查看"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 587,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, sub.id, true, {
                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                    lineNumber: 580,
                                                    columnNumber: 25
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                            lineNumber: 576,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, ch.id, true, {
                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                    lineNumber: 542,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/app/(platform)/overview/page.tsx",
                            lineNumber: 536,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/overview/page.tsx",
                        lineNumber: 535,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/overview/page.tsx",
                lineNumber: 529,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overview-graph-area",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overview-graph-toolbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "overview-graph-title",
                                children: [
                                    "知识图谱",
                                    activeGraphChapter ? ` · ${activeGraphChapter.title}` : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 613,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overview-graph-legend",
                                children: Object.entries(NODE_TYPE_LABEL).map(([type, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "overview-legend-item",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "overview-legend-dot",
                                                style: {
                                                    background: NODE_COLOR[type]
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                lineNumber: 620,
                                                columnNumber: 17
                                            }, this),
                                            label
                                        ]
                                    }, type, true, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 619,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 617,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/overview/page.tsx",
                        lineNumber: 612,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overview-graph-canvas",
                        ref: canvasRef,
                        children: [
                            graphLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overview-graph-placeholder",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "overview-loading-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 634,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "overview-loading-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 635,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "overview-loading-dot"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 636,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "overview-loading-label",
                                        children: "加载知识图谱中"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 637,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 633,
                                columnNumber: 13
                            }, this) : !graph || graph.nodes.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overview-graph-placeholder",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        color: "var(--cds-text-helper)",
                                        fontSize: 14
                                    },
                                    children: "暂无图谱数据"
                                }, void 0, false, {
                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                    lineNumber: 641,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 640,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                ref: svgRef,
                                viewBox: `0 0 ${simSize.w} ${simSize.h}`,
                                preserveAspectRatio: "xMidYMid meet",
                                width: "100%",
                                height: "100%",
                                className: "overview-graph-svg",
                                "aria-label": "知识图谱",
                                style: {
                                    cursor: dragRef.current ? "grabbing" : "grab"
                                },
                                onMouseDown: handleSvgMouseDown,
                                onMouseMove: handleSvgMouseMove,
                                onMouseUp: endDrag,
                                onMouseLeave: endDrag,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                        children: Object.entries(EDGE_COLOR).map(([type, color])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("marker", {
                                                id: `arrow-${type}`,
                                                markerWidth: "8",
                                                markerHeight: "8",
                                                refX: "7",
                                                refY: "3",
                                                orient: "auto",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M0,0 L0,6 L8,3 z",
                                                    fill: color,
                                                    opacity: "0.7"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                    lineNumber: 671,
                                                    columnNumber: 21
                                                }, this)
                                            }, type, false, {
                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                lineNumber: 662,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 660,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                        className: `overview-graph-stage${graphEntering ? " is-entering" : ""}`,
                                        transform: `translate(${panZoom.x},${panZoom.y}) scale(${panZoom.scale})`,
                                        children: [
                                            graph.edges.map((e, i)=>{
                                                const a = positions[e.source];
                                                const b = positions[e.target];
                                                if (!a || !b) return null;
                                                const isFocus = focusId === e.source || focusId === e.target;
                                                const color = EDGE_COLOR[e.relation_type] ?? "#c6c6c6";
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    className: "overview-graph-edge",
                                                    x1: a.x,
                                                    y1: a.y,
                                                    x2: b.x,
                                                    y2: b.y,
                                                    stroke: color,
                                                    strokeWidth: isFocus ? 2 : 1,
                                                    opacity: focusId && !isFocus ? 0.15 : isFocus ? 0.9 : 0.5,
                                                    pathLength: 1,
                                                    markerEnd: `url(#arrow-${e.relation_type})`,
                                                    style: {
                                                        "--edge-delay": `${80 + i * 18}ms`
                                                    }
                                                }, i, false, {
                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                    lineNumber: 689,
                                                    columnNumber: 19
                                                }, this);
                                            }),
                                            graph.nodes.map((n, index)=>{
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
                                                    isHovered ? "is-hovered" : ""
                                                ].filter(Boolean).join(" ");
                                                const fullLabelLines = wrapNodeTitle(n.title);
                                                const labelY = r + 14;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                    className: nodeClassName,
                                                    transform: `translate(${p.x}, ${p.y})`,
                                                    style: {
                                                        "--node-delay": `${180 + index * 34}ms`,
                                                        cursor: "pointer",
                                                        opacity: dimmed ? 0.2 : 1
                                                    },
                                                    onClick: (e)=>handleNodeClick(e, n.id, color, r),
                                                    onMouseEnter: ()=>setHoveredId(n.id),
                                                    onMouseLeave: ()=>setHoveredId(null),
                                                    role: "button",
                                                    tabIndex: 0,
                                                    "aria-label": n.title,
                                                    onKeyDown: (e)=>e.key === "Enter" && setSelectedId((prev)=>prev === n.id ? null : n.id),
                                                    children: [
                                                        isHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "overview-node-halo",
                                                            cx: 0,
                                                            cy: 0,
                                                            r: r + 9,
                                                            fill: color
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 745,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "overview-node-core",
                                                            cx: 0,
                                                            cy: 0,
                                                            r: r,
                                                            fill: color,
                                                            stroke: "#ffffff",
                                                            strokeWidth: isFocus ? 2.5 : 2
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 753,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            className: "click-ring",
                                                            cx: 0,
                                                            cy: 0,
                                                            r: r,
                                                            fill: "none",
                                                            stroke: color,
                                                            opacity: 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 760,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                            className: "overview-node-label",
                                                            x: 0,
                                                            y: labelY,
                                                            textAnchor: "middle",
                                                            fill: "#161616",
                                                            fontSize: n.node_type === "chapter" ? 12 : 11,
                                                            fontWeight: isFocus ? 600 : 500,
                                                            fontFamily: "IBM Plex Sans, sans-serif",
                                                            stroke: "var(--cds-background-muted)",
                                                            strokeWidth: 3,
                                                            paintOrder: "stroke fill",
                                                            style: {
                                                                pointerEvents: "none",
                                                                userSelect: "none"
                                                            },
                                                            children: fullLabelLines.map((line, li)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tspan", {
                                                                    x: 0,
                                                                    dy: li === 0 ? 0 : NODE_LABEL_LINE_HEIGHT,
                                                                    children: line
                                                                }, `${n.id}-label-${li}`, false, {
                                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                                    lineNumber: 784,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/overview/page.tsx",
                                                            lineNumber: 769,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, n.id, true, {
                                                    fileName: "[project]/app/(platform)/overview/page.tsx",
                                                    lineNumber: 724,
                                                    columnNumber: 19
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 676,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 646,
                                columnNumber: 13
                            }, this),
                            graph && graph.nodes.length > 0 && !graphLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overview-zoom-controls",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "overview-zoom-btn",
                                        type: "button",
                                        "aria-label": "放大",
                                        onClick: ()=>zoomBy(1 / 0.85),
                                        children: "+"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 803,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "overview-zoom-btn",
                                        type: "button",
                                        "aria-label": "重置视图",
                                        onClick: resetView,
                                        children: "重置"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 809,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "overview-zoom-btn",
                                        type: "button",
                                        "aria-label": "缩小",
                                        onClick: ()=>zoomBy(0.85),
                                        children: "−"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 815,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 802,
                                columnNumber: 13
                            }, this),
                            focusNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overview-node-detail",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overview-node-detail-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "overview-node-type-badge",
                                                style: {
                                                    background: NODE_COLOR[focusNode.node_type] ?? "#525252"
                                                },
                                                children: NODE_TYPE_LABEL[focusNode.node_type] ?? focusNode.node_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                lineNumber: 828,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button-ghost overview-node-close",
                                                type: "button",
                                                onClick: ()=>setSelectedId(null),
                                                "aria-label": "关闭详情",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                lineNumber: 834,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 827,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overview-node-detail-title",
                                        children: focusNode.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 843,
                                        columnNumber: 15
                                    }, this),
                                    focusNode.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "overview-node-detail-desc",
                                        children: focusNode.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 845,
                                        columnNumber: 17
                                    }, this),
                                    focusEdges.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "overview-node-edges",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "overview-node-edges-label",
                                                children: "关联关系"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                lineNumber: 849,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "overview-node-edges-list",
                                                children: focusEdges.map((e, i)=>{
                                                    const otherId = e.source === focusNode.id ? e.target : e.source;
                                                    const other = graph?.nodes.find((n)=>n.id === otherId);
                                                    const dir = e.source === focusNode.id ? "→" : "←";
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "overview-node-edge-item",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "overview-node-edge-type",
                                                                style: {
                                                                    color: EDGE_COLOR[e.relation_type] ?? "#525252"
                                                                },
                                                                children: [
                                                                    dir,
                                                                    " ",
                                                                    EDGE_TYPE_LABEL[e.relation_type] ?? e.relation_type
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                                lineNumber: 857,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "overview-node-edge-target",
                                                                children: other?.title ?? otherId
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                                lineNumber: 863,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, i, true, {
                                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                                        lineNumber: 856,
                                                        columnNumber: 25
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                                lineNumber: 850,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 848,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 826,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/overview/page.tsx",
                        lineNumber: 631,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "overview-edge-legend",
                        children: Object.entries(EDGE_TYPE_LABEL).map(([type, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "overview-legend-item",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "overview-legend-line",
                                        style: {
                                            background: EDGE_COLOR[type]
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/overview/page.tsx",
                                        lineNumber: 880,
                                        columnNumber: 15
                                    }, this),
                                    label
                                ]
                            }, type, true, {
                                fileName: "[project]/app/(platform)/overview/page.tsx",
                                lineNumber: 879,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/overview/page.tsx",
                        lineNumber: 877,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/overview/page.tsx",
                lineNumber: 610,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(platform)/overview/page.tsx",
        lineNumber: 527,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_cc4312fe._.js.map