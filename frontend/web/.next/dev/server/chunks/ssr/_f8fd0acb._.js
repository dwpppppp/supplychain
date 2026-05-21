module.exports = [
"[project]/features/course/api/course.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "askChapterQuestion",
    ()=>askChapterQuestion,
    "fetchChapterDetail",
    ()=>fetchChapterDetail,
    "fetchCourseChapters",
    ()=>fetchCourseChapters,
    "saveChapterNote",
    ()=>saveChapterNote,
    "updateChapterProgress",
    ()=>updateChapterProgress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-ssr] (ecmascript)");
;
function fetchCourseChapters() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/course/chapters");
}
function fetchChapterDetail(token, chapterId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/course/chapters/${chapterId}`, {
        token
    });
}
function askChapterQuestion(token, chapterId, payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/course/chapters/${chapterId}/ask`, {
        method: "POST",
        token,
        body: payload
    });
}
function saveChapterNote(token, chapterId, payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/course/chapters/${chapterId}/notes`, {
        method: "POST",
        token,
        body: payload
    });
}
function updateChapterProgress(token, chapterId, progressPercent, lastReadPosition = 0) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])(`/course/chapters/${chapterId}/progress`, {
        method: "PUT",
        token,
        body: {
            progress_percent: progressPercent,
            last_read_position: lastReadPosition
        }
    });
}
}),
"[project]/app/(platform)/course/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoursePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$course$2f$api$2f$course$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/course/api/course.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const COURSE_ASK_MAX_LENGTH = 200;
const COURSE_ASK_PROMPT_PREFIX = "请帮助解答或给出相关提示，内容是关于：";
const CHAPTER_HTML_PATH = {
    1: "/static/course-html/chapter-01.html",
    2: "/static/course-html/chapter-01.html",
    3: "/static/course-html/chapter-01.html",
    4: "/static/course-html/chapter-01.html",
    5: "/static/course-html/chapter-01.html",
    6: "/static/course-html/chapter-01.html",
    7: "/static/course-html/chapter-01.html",
    8: "/static/course-html/chapter-01.html",
    9: "/static/course-html/chapter-02.html",
    10: "/static/course-html/chapter-02.html",
    11: "/static/course-html/chapter-02.html",
    12: "/static/course-html/chapter-02.html",
    13: "/static/course-html/chapter-02.html",
    14: "/static/course-html/chapter-02.html",
    15: "/static/course-html/chapter-03.html",
    16: "/static/course-html/chapter-03.html",
    17: "/static/course-html/chapter-03.html",
    18: "/static/course-html/chapter-03.html",
    19: "/static/course-html/chapter-03.html",
    20: "/static/course-html/chapter-03.html",
    21: "/static/course-html/chapter-04.html",
    22: "/static/course-html/chapter-04.html",
    23: "/static/course-html/chapter-04.html",
    24: "/static/course-html/chapter-04.html",
    25: "/static/course-html/chapter-04.html",
    26: "/static/course-html/chapter-05.html",
    27: "/static/course-html/chapter-05.html",
    28: "/static/course-html/chapter-05.html",
    29: "/static/course-html/chapter-05.html",
    30: "/static/course-html/chapter-05.html",
    31: "/static/course-html/chapter-05.html",
    32: "/static/course-html/chapter-06.html",
    33: "/static/course-html/chapter-06.html",
    34: "/static/course-html/chapter-06.html",
    35: "/static/course-html/chapter-06.html",
    36: "/static/course-html/chapter-06.html",
    37: "/static/course-html/chapter-07.html",
    38: "/static/course-html/chapter-07.html",
    39: "/static/course-html/chapter-07.html",
    40: "/static/course-html/chapter-07.html",
    41: "/static/course-html/chapter-07.html",
    42: "/static/course-html/chapter-07.html",
    43: "/static/course-html/chapter-08.html",
    44: "/static/course-html/chapter-08.html",
    45: "/static/course-html/chapter-08.html",
    46: "/static/course-html/chapter-08.html",
    47: "/static/course-html/chapter-08.html",
    48: "/static/course-html/chapter-08.html",
    49: "/static/course-html/chapter-09.html",
    50: "/static/course-html/chapter-09.html",
    51: "/static/course-html/chapter-09.html",
    52: "/static/course-html/chapter-09.html",
    53: "/static/course-html/chapter-09.html",
    54: "/static/course-html/chapter-10.html",
    55: "/static/course-html/chapter-10.html",
    56: "/static/course-html/chapter-10.html",
    57: "/static/course-html/chapter-10.html",
    58: "/static/course-html/chapter-10.html",
    59: "/static/course-html/chapter-10.html",
    60: "/static/course-html/chapter-10.html"
};
const CHAPTER_HTML_ANCHOR = {
    2: "section-1",
    3: "section-2",
    4: "section-3",
    5: "section-4",
    6: "section-5",
    7: "section-6",
    8: "section-7",
    10: "section-1",
    11: "section-2",
    12: "section-3",
    13: "section-4",
    14: "section-5",
    16: "section-1",
    17: "section-2",
    18: "section-3",
    19: "section-4",
    20: "section-5",
    22: "section-1",
    23: "section-2",
    24: "section-3",
    25: "section-4",
    27: "section-1",
    28: "section-2",
    29: "section-3",
    30: "section-4",
    31: "section-5",
    33: "section-1",
    34: "section-2",
    35: "section-3",
    36: "section-4",
    38: "section-1",
    39: "section-2",
    40: "section-3",
    41: "section-4",
    42: "section-5",
    44: "section-1",
    45: "section-2",
    46: "section-3",
    47: "section-4",
    48: "section-5",
    50: "section-1",
    51: "section-2",
    52: "section-3",
    53: "section-4",
    55: "section-1",
    56: "section-2",
    57: "section-3",
    58: "section-4",
    59: "section-5",
    60: "section-6"
};
const FALLBACK_CHAPTERS = [
    {
        id: 1,
        title: "供应源搜寻的基本流程",
        level: 1,
        sort_order: 1,
        children: [
            {
                id: 2,
                title: "1.1 供应源搜寻的界定",
                level: 2,
                sort_order: 1
            },
            {
                id: 3,
                title: "1.2 供应源搜寻过程",
                level: 2,
                sort_order: 2
            },
            {
                id: 4,
                title: "1.3 潜在供应商的选择",
                level: 2,
                sort_order: 3
            },
            {
                id: 5,
                title: "1.4 供应商资格预审和供应商评估",
                level: 2,
                sort_order: 4
            },
            {
                id: 6,
                title: "1.5 供应商信息的收集和验证",
                level: 2,
                sort_order: 5
            },
            {
                id: 7,
                title: "1.6 供应商绩效评估",
                level: 2,
                sort_order: 6
            },
            {
                id: 8,
                title: "1.7 实践指导",
                level: 2,
                sort_order: 7
            }
        ]
    }
];
function flattenChapters(chapters) {
    return chapters.flatMap((chapter)=>[
            chapter,
            ...flattenChapters(chapter.children ?? [])
        ]);
}
function getReadableChapters(chapters) {
    const flat = flattenChapters(chapters);
    const leaves = flat.filter((chapter)=>!chapter.children?.length);
    return leaves.length > 0 ? leaves : flat;
}
function getStaticAssetUrl(path) {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    const origin = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"].replace(/\/api\/v1\/?$/, "");
    return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}
function truncateByChars(value, maxLength) {
    return Array.from(value).slice(0, Math.max(0, maxLength)).join("");
}
function buildCourseAskPrompt(selectedContent) {
    const normalized = selectedContent.replace(/\s+/g, " ").trim();
    const availableLength = COURSE_ASK_MAX_LENGTH - Array.from(COURSE_ASK_PROMPT_PREFIX).length;
    return `${COURSE_ASK_PROMPT_PREFIX}${truncateByChars(normalized, availableLength)}`;
}
function toCamelCase(value) {
    return value.replace(/-([a-z])/g, (_, letter)=>letter.toUpperCase());
}
function parseStyleAttribute(styleText) {
    return styleText.split(";").reduce((styles, declaration)=>{
        const [rawProperty, ...rawValue] = declaration.split(":");
        const property = rawProperty?.trim();
        const value = rawValue.join(":").trim();
        if (!property || !value) return styles;
        return {
            ...styles,
            [toCamelCase(property)]: value
        };
    }, {});
}
const REACT_ATTRIBUTE_NAMES = {
    "accept-charset": "acceptCharset",
    "clip-path": "clipPath",
    "clip-rule": "clipRule",
    "fill-rule": "fillRule",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-style": "fontStyle",
    "font-weight": "fontWeight",
    "marker-end": "markerEnd",
    "marker-mid": "markerMid",
    "marker-start": "markerStart",
    "refx": "refX",
    "refy": "refY",
    "srcset": "srcSet",
    "stroke-dasharray": "strokeDasharray",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-width": "strokeWidth",
    "text-anchor": "textAnchor",
    "viewbox": "viewBox",
    "xlink:href": "xlinkHref"
};
function getElementProps(element, baseUrl, key) {
    const props = {
        key
    };
    Array.from(element.attributes).forEach((attribute)=>{
        const { name, value } = attribute;
        if (name.startsWith("on")) return;
        if (name === "class") {
            props.className = value;
            return;
        }
        if (name === "style") {
            props.style = parseStyleAttribute(value);
            return;
        }
        if (name === "for") {
            props.htmlFor = value;
            return;
        }
        if (name === "colspan") {
            props.colSpan = Number(value);
            return;
        }
        if (name === "rowspan") {
            props.rowSpan = Number(value);
            return;
        }
        if ((name === "src" || name === "href") && value && !/^#/.test(value)) {
            try {
                props[name] = new URL(value, baseUrl).href;
            } catch  {
                props[name] = value;
            }
            return;
        }
        const reactAttributeName = REACT_ATTRIBUTE_NAMES[name];
        if (reactAttributeName) {
            props[reactAttributeName] = value;
            return;
        }
        props[name] = value;
    });
    return props;
}
function mergeClassName(current, className) {
    return String(current ?? "").split(/\s+/).concat(className).filter(Boolean).filter((value, index, values)=>values.indexOf(value) === index).join(" ");
}
function getSectionNumber(element) {
    const section = element.closest("section[id^='section-']");
    const match = section?.id.match(/^section-(\d+)$/);
    return match?.[1] ? match[1].padStart(2, "0") : null;
}
function renderHtmlNode(node, baseUrl, key) {
    if (node.nodeType === Node.TEXT_NODE) {
        const parentTag = node.parentElement?.tagName.toLowerCase();
        const tableParentTags = new Set([
            "table",
            "thead",
            "tbody",
            "tfoot",
            "tr",
            "colgroup"
        ]);
        if (parentTag && tableParentTags.has(parentTag) && !node.textContent?.trim()) {
            return null;
        }
        return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) {
        return null;
    }
    const element = node;
    const tagName = element.tagName.toLowerCase();
    if ([
        "script",
        "style",
        "link",
        "meta",
        "title",
        "base"
    ].includes(tagName)) {
        return null;
    }
    if (tagName === "nav" && element.classList.contains("breadcrumb")) {
        return null;
    }
    const children = Array.from(element.childNodes).map((child, index)=>renderHtmlNode(child, baseUrl, `${key}-${index}`));
    const props = getElementProps(element, baseUrl, key);
    if (tagName === "h2" && element.closest("section[id^='section-']")) {
        props.className = mergeClassName(props.className, "section-title");
        if (!element.querySelector(".section-num")) {
            const sectionNumber = getSectionNumber(element);
            if (sectionNumber) {
                children.unshift(/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement("span", {
                    className: "section-num",
                    key: `${key}-section-num`
                }, `Section ${sectionNumber}`));
            }
        }
    }
    if (tagName === "h3") {
        props.className = mergeClassName(props.className, "subsection-title");
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].createElement(tagName, props, ...children);
}
function CourseHtmlDocument({ html, baseUrl }) {
    const content = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!html) return null;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const main = doc.querySelector("main.main");
        const nodes = main ? Array.from(main.childNodes) : Array.from(doc.body.childNodes);
        return nodes.map((node, index)=>renderHtmlNode(node, baseUrl, `course-doc-${index}`));
    }, [
        baseUrl,
        html
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "course-react-doc",
        children: content
    }, void 0, false, {
        fileName: "[project]/app/(platform)/course/page.tsx",
        lineNumber: 375,
        columnNumber: 10
    }, this);
}
function CoursePageContent() {
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { token, isAuthenticated, openAuthModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [chapters, setChapters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedIds, setExpandedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [activeChapterId, setActiveChapterId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [detail, setDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [readerStatus, setReaderStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [readerError, setReaderError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedText, setSelectedText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [answer, setAnswer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [askStatus, setAskStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [askError, setAskError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAskModalOpen, setIsAskModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [courseHtml, setCourseHtml] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectionBubble, setSelectionBubble] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inlineAskPanel, setInlineAskPanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const courseReaderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const flatChapters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>flattenChapters(chapters), [
        chapters
    ]);
    const readableChapters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>getReadableChapters(chapters), [
        chapters
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$course$2f$api$2f$course$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchCourseChapters"])().then((data)=>{
            const nextChapters = Array.isArray(data) && data.length > 0 ? data : FALLBACK_CHAPTERS;
            const defaultId = Number(searchParams.get("chapter")) || getReadableChapters(nextChapters)[0]?.id || null;
            setChapters(nextChapters);
            setExpandedIds(new Set(nextChapters.map((chapter)=>chapter.id)));
            setActiveChapterId(defaultId);
        }).catch(()=>{
            const defaultId = Number(searchParams.get("chapter")) || getReadableChapters(FALLBACK_CHAPTERS)[0]?.id || null;
            setChapters(FALLBACK_CHAPTERS);
            setExpandedIds(new Set(FALLBACK_CHAPTERS.map((chapter)=>chapter.id)));
            setActiveChapterId(defaultId);
        });
    }, [
        searchParams
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!activeChapterId) return;
        setSelectedText("");
        setAnswer("");
        setAskStatus("idle");
        setAskError(null);
        setIsAskModalOpen(false);
        setSelectionBubble(null);
        setInlineAskPanel(null);
        if (!isAuthenticated || !token) {
            setDetail(null);
            setReaderStatus("idle");
            setReaderError(null);
            return;
        }
        setReaderStatus("loading");
        setReaderError(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$course$2f$api$2f$course$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["fetchChapterDetail"])(token, activeChapterId).then((data)=>{
            setDetail(data);
            setReaderStatus("idle");
        }).catch((error)=>{
            setDetail(null);
            setReaderStatus("error");
            setReaderError(error.message || "章节加载失败");
        });
    }, [
        activeChapterId,
        isAuthenticated,
        token
    ]);
    const activeChapter = flatChapters.find((chapter)=>chapter.id === activeChapterId) ?? null;
    const pdfUrl = getStaticAssetUrl(detail?.pdf_url ?? null);
    const htmlUrl = getStaticAssetUrl(activeChapterId ? CHAPTER_HTML_PATH[activeChapterId] ?? null : null);
    const openLockedReader = ()=>{
        openAuthModal({
            mode: "login",
            reason: "查看课程文档前请先登录。"
        });
    };
    const selectChapter = (chapterId)=>{
        setActiveChapterId(chapterId);
        if (!isAuthenticated) {
            openLockedReader();
        }
    };
    const toggleExpand = (chapterId)=>{
        setExpandedIds((current)=>{
            const next = new Set(current);
            next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId);
            return next;
        });
    };
    const askSelectedText = async ()=>{
        if (!token || !activeChapterId || !selectedText.trim()) return;
        setAskStatus("asking");
        setAskError(null);
        setAnswer("");
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$course$2f$api$2f$course$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["askChapterQuestion"])(token, activeChapterId, {
                selected_text: selectedText.trim()
            });
            setAnswer(result.answer);
            setAskStatus("idle");
        } catch (error) {
            setAskStatus("error");
            setAskError(error instanceof Error ? error.message : "问答失败");
        }
    };
    const askInlineSelection = async (selection)=>{
        if (!token || !activeChapterId) return;
        const prompt = buildCourseAskPrompt(selection.text);
        setSelectionBubble(null);
        setInlineAskPanel({
            prompt,
            answer: "",
            error: null,
            status: "asking",
            x: selection.x,
            y: selection.y
        });
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$course$2f$api$2f$course$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["askChapterQuestion"])(token, activeChapterId, {
                selected_text: prompt
            });
            setInlineAskPanel((current)=>current && current.prompt === prompt ? {
                    ...current,
                    answer: result.answer,
                    status: "idle"
                } : current);
        } catch (error) {
            setInlineAskPanel((current)=>current && current.prompt === prompt ? {
                    ...current,
                    error: error instanceof Error ? error.message : "问答失败",
                    status: "error"
                } : current);
        }
    };
    const openAskModal = ()=>{
        if (!isAuthenticated) {
            openLockedReader();
            return;
        }
        const currentSelection = readCourseSelection();
        if (currentSelection?.text) {
            setSelectedText(buildCourseAskPrompt(currentSelection.text));
            setSelectionBubble(null);
        }
        setIsAskModalOpen(true);
    };
    const readCourseSelection = ()=>{
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
        const selection = undefined;
        const rawText = undefined;
        const anchorNode = undefined;
        const reader = undefined;
        const anchorElement = undefined;
        const range = undefined;
        const rect = undefined;
        const text = undefined;
        const x = undefined;
        const y = undefined;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated || isAskModalOpen) {
            setSelectionBubble(null);
            return;
        }
        const updateSelection = (event)=>{
            const target = event.target;
            if (target instanceof Element && target.closest(".course-selection-ask, .course-inline-answer")) {
                return;
            }
            if (inlineAskPanel?.status === "asking") {
                return;
            }
            window.setTimeout(()=>{
                const nextSelection = readCourseSelection();
                setSelectionBubble(nextSelection);
                if (nextSelection) {
                    setInlineAskPanel(null);
                }
            }, 0);
        };
        document.addEventListener("mouseup", updateSelection);
        document.addEventListener("keyup", updateSelection);
        return ()=>{
            document.removeEventListener("mouseup", updateSelection);
            document.removeEventListener("keyup", updateSelection);
        };
    }, [
        inlineAskPanel?.status,
        isAskModalOpen,
        isAuthenticated,
        courseHtml
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!htmlUrl) {
            setCourseHtml("");
            return;
        }
        let isCancelled = false;
        fetch(htmlUrl, {
            cache: "no-store"
        }).then((response)=>{
            if (!response.ok) {
                throw new Error("HTML document unavailable");
            }
            return response.text();
        }).then((source)=>{
            if (isCancelled) return;
            setCourseHtml(source);
        }).catch(()=>{
            if (!isCancelled) {
                setCourseHtml("");
            }
        });
        return ()=>{
            isCancelled = true;
        };
    }, [
        htmlUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const anchor = activeChapterId ? CHAPTER_HTML_ANCHOR[activeChapterId] : "";
        if (!courseHtml || !anchor) return;
        const frameId = requestAnimationFrame(()=>{
            document.getElementById(anchor)?.scrollIntoView({
                block: "start"
            });
        });
        return ()=>cancelAnimationFrame(frameId);
    }, [
        activeChapterId,
        courseHtml
    ]);
    const renderChapterList = (items)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
            className: "course-chapter-list",
            children: items.map((chapter)=>{
                const hasChildren = Boolean(chapter.children?.length);
                const isExpanded = expandedIds.has(chapter.id);
                const isActive = activeChapterId === chapter.id;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                    className: "course-chapter-group",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `course-chapter-item${isActive ? " is-active" : ""}${hasChildren ? " is-parent" : ""}`,
                            onClick: ()=>{
                                if (hasChildren) {
                                    toggleExpand(chapter.id);
                                } else {
                                    selectChapter(chapter.id);
                                }
                            },
                            "aria-expanded": hasChildren ? isExpanded : undefined,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "course-chapter-num",
                                    children: String(chapter.sort_order).padStart(2, "0")
                                }, void 0, false, {
                                    fileName: "[project]/app/(platform)/course/page.tsx",
                                    lineNumber: 668,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "course-chapter-title",
                                    children: chapter.title
                                }, void 0, false, {
                                    fileName: "[project]/app/(platform)/course/page.tsx",
                                    lineNumber: 671,
                                    columnNumber: 15
                                }, this),
                                hasChildren && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `course-chapter-toggle${isExpanded ? " is-open" : ""}`,
                                    children: "▶"
                                }, void 0, false, {
                                    fileName: "[project]/app/(platform)/course/page.tsx",
                                    lineNumber: 673,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(platform)/course/page.tsx",
                            lineNumber: 656,
                            columnNumber: 13
                        }, this),
                        hasChildren && isExpanded && renderChapterList(chapter.children ?? [])
                    ]
                }, chapter.id, true, {
                    fileName: "[project]/app/(platform)/course/page.tsx",
                    lineNumber: 655,
                    columnNumber: 11
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/app/(platform)/course/page.tsx",
            lineNumber: 648,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `course-page${isSidebarCollapsed ? " is-sidebar-collapsed" : ""}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "button-ghost course-sidebar-rail-button",
                "aria-label": "展开章节目录",
                title: "展开章节目录",
                onClick: ()=>setIsSidebarCollapsed(false),
                children: "›"
            }, void 0, false, {
                fileName: "[project]/app/(platform)/course/page.tsx",
                lineNumber: 687,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "course-sidebar",
                "aria-hidden": isSidebarCollapsed,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "course-sidebar-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "course-sidebar-heading",
                                children: "章节目录"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 699,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "button-ghost course-sidebar-icon-button",
                                "aria-label": "收起章节目录",
                                title: "收起章节目录",
                                onClick: ()=>setIsSidebarCollapsed(true),
                                children: "‹"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 700,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 698,
                        columnNumber: 9
                    }, this),
                    renderChapterList(chapters)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/course/page.tsx",
                lineNumber: 697,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "course-reader",
                ref: courseReaderRef,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "button-primary course-ask-fab",
                        onClick: openAskModal,
                        children: "划词问 AI"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 714,
                        columnNumber: 9
                    }, this),
                    !isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "course-locked",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "course-locked-title",
                                        children: "登录后查看章节正文"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/course/page.tsx",
                                        lineNumber: 721,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "course-locked-copy",
                                        children: "课程目录可预览，课程文档需要登录后使用。"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/course/page.tsx",
                                        lineNumber: 722,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 720,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "button-primary",
                                onClick: openLockedReader,
                                children: "登录查看"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 726,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 719,
                        columnNumber: 11
                    }, this) : readerStatus === "loading" && !courseHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "course-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "overview-loading-dot"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 732,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "overview-loading-dot"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 733,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "overview-loading-dot"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 734,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "章节加载中"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 735,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 731,
                        columnNumber: 11
                    }, this) : readerStatus === "error" && !courseHtml ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "course-state is-error",
                        children: readerError
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 738,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            courseHtml && htmlUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "course-html-panel",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CourseHtmlDocument, {
                                    html: courseHtml,
                                    baseUrl: htmlUrl
                                }, void 0, false, {
                                    fileName: "[project]/app/(platform)/course/page.tsx",
                                    lineNumber: 743,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 742,
                                columnNumber: 15
                            }, this) : pdfUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "course-pdf-panel is-full",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    className: "course-pdf-frame",
                                    src: pdfUrl,
                                    title: detail?.title ?? "课程文档"
                                }, void 0, false, {
                                    fileName: "[project]/app/(platform)/course/page.tsx",
                                    lineNumber: 747,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 746,
                                columnNumber: 15
                            }, this),
                            !courseHtml && !pdfUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "course-state",
                                children: "当前章节暂无课程文档。"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 752,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/course/page.tsx",
                lineNumber: 713,
                columnNumber: 7
            }, this),
            selectionBubble && !inlineAskPanel && !isAskModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "course-selection-ask",
                style: {
                    left: selectionBubble.x,
                    top: selectionBubble.y
                },
                onMouseDown: (event)=>event.preventDefault(),
                onClick: ()=>void askInlineSelection(selectionBubble),
                children: "问 AI"
            }, void 0, false, {
                fileName: "[project]/app/(platform)/course/page.tsx",
                lineNumber: 762,
                columnNumber: 9
            }, this),
            inlineAskPanel && !isAskModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "course-inline-answer",
                style: {
                    left: inlineAskPanel.x,
                    top: inlineAskPanel.y
                },
                "aria-live": "polite",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "course-inline-answer-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "划词问 AI"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 780,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "button-ghost course-inline-answer-close",
                                "aria-label": "关闭划词问 AI 结果",
                                onClick: ()=>setInlineAskPanel(null),
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/course/page.tsx",
                                lineNumber: 781,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 779,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "course-inline-answer-question",
                        children: inlineAskPanel.prompt
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 790,
                        columnNumber: 11
                    }, this),
                    inlineAskPanel.status === "asking" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "course-inline-answer-loading",
                        children: "AI 正在生成回答..."
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 792,
                        columnNumber: 13
                    }, this) : inlineAskPanel.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "course-inline-answer-error",
                        children: inlineAskPanel.error
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 794,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "course-inline-answer-body",
                        children: inlineAskPanel.answer
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/course/page.tsx",
                        lineNumber: 796,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/course/page.tsx",
                lineNumber: 774,
                columnNumber: 9
            }, this),
            isAskModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "course-ask-modal-backdrop",
                role: "presentation",
                onClick: ()=>setIsAskModalOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "course-ask-modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": "划词问 AI",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "course-ask-modal-head",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "eyebrow",
                                            children: "划词提问"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(platform)/course/page.tsx",
                                            lineNumber: 812,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "course-tool-title",
                                            children: "划词问 AI"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(platform)/course/page.tsx",
                                            lineNumber: 813,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(platform)/course/page.tsx",
                                    lineNumber: 811,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "button-ghost course-ask-close",
                                    "aria-label": "关闭",
                                    onClick: ()=>setIsAskModalOpen(false),
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/app/(platform)/course/page.tsx",
                                    lineNumber: 815,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(platform)/course/page.tsx",
                            lineNumber: 810,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "course-tool-copy",
                            children: "在课程文档中选中文字后可直接提问，也可以在这里编辑后再发送。"
                        }, void 0, false, {
                            fileName: "[project]/app/(platform)/course/page.tsx",
                            lineNumber: 824,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            className: "course-note-input",
                            value: selectedText,
                            maxLength: COURSE_ASK_MAX_LENGTH,
                            onChange: (event)=>{
                                setSelectedText(event.target.value);
                                setAskError(null);
                            },
                            placeholder: "选中文本会自动生成提问，也可以手动输入课程相关问题"
                        }, void 0, false, {
                            fileName: "[project]/app/(platform)/course/page.tsx",
                            lineNumber: 827,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: "button-primary course-tool-button",
                            disabled: !selectedText.trim() || askStatus === "asking",
                            onClick: askSelectedText,
                            children: askStatus === "asking" ? "回答中" : "询问 AI"
                        }, void 0, false, {
                            fileName: "[project]/app/(platform)/course/page.tsx",
                            lineNumber: 837,
                            columnNumber: 13
                        }, this),
                        answer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "course-answer",
                            children: answer
                        }, void 0, false, {
                            fileName: "[project]/app/(platform)/course/page.tsx",
                            lineNumber: 845,
                            columnNumber: 24
                        }, this),
                        askError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "course-tool-error",
                            children: askError
                        }, void 0, false, {
                            fileName: "[project]/app/(platform)/course/page.tsx",
                            lineNumber: 846,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(platform)/course/page.tsx",
                    lineNumber: 803,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(platform)/course/page.tsx",
                lineNumber: 802,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(platform)/course/page.tsx",
        lineNumber: 686,
        columnNumber: 5
    }, this);
}
function CoursePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "course-page"
        }, void 0, false, {
            fileName: "[project]/app/(platform)/course/page.tsx",
            lineNumber: 856,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CoursePageContent, {}, void 0, false, {
            fileName: "[project]/app/(platform)/course/page.tsx",
            lineNumber: 857,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(platform)/course/page.tsx",
        lineNumber: 856,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_f8fd0acb._.js.map