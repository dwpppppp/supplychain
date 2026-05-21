"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import { API_BASE_URL } from "../../../lib/constants/api";
import { useAuth } from "../../../features/auth/components/auth-provider";
import {
  askChapterQuestion,
  fetchChapterDetail,
  fetchCourseChapters,
  type ChapterDetail,
  type CourseChapter,
} from "../../../features/course/api/course";

type ReaderStatus = "idle" | "loading" | "error";
type AskStatus = "idle" | "asking" | "error";
type SelectionBubble = {
  text: string;
  x: number;
  y: number;
};
type InlineAskPanel = {
  prompt: string;
  answer: string;
  error: string | null;
  status: AskStatus;
  x: number;
  y: number;
};

const COURSE_ASK_MAX_LENGTH = 200;
const COURSE_ASK_PROMPT_PREFIX = "请帮助解答或给出相关提示，内容是关于：";

const CHAPTER_HTML_PATH: Record<number, string> = {
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
  60: "/static/course-html/chapter-10.html",
};

const CHAPTER_HTML_ANCHOR: Record<number, string> = {
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
  60: "section-6",
};

const FALLBACK_CHAPTERS: CourseChapter[] = [
  {
    id: 1,
    title: "供应源搜寻的基本流程",
    level: 1,
    sort_order: 1,
    children: [
      { id: 2, title: "1.1 供应源搜寻的界定", level: 2, sort_order: 1 },
      { id: 3, title: "1.2 供应源搜寻过程", level: 2, sort_order: 2 },
      { id: 4, title: "1.3 潜在供应商的选择", level: 2, sort_order: 3 },
      { id: 5, title: "1.4 供应商资格预审和供应商评估", level: 2, sort_order: 4 },
      { id: 6, title: "1.5 供应商信息的收集和验证", level: 2, sort_order: 5 },
      { id: 7, title: "1.6 供应商绩效评估", level: 2, sort_order: 6 },
      { id: 8, title: "1.7 实践指导", level: 2, sort_order: 7 },
    ],
  },
];

function flattenChapters(chapters: CourseChapter[]): CourseChapter[] {
  return chapters.flatMap((chapter) => [
    chapter,
    ...flattenChapters(chapter.children ?? []),
  ]);
}

function getReadableChapters(chapters: CourseChapter[]) {
  const flat = flattenChapters(chapters);
  const leaves = flat.filter((chapter) => !chapter.children?.length);
  return leaves.length > 0 ? leaves : flat;
}

function getStaticAssetUrl(path: string | null) {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const origin = API_BASE_URL.replace(/\/api\/v1\/?$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
}

function truncateByChars(value: string, maxLength: number) {
  return Array.from(value).slice(0, Math.max(0, maxLength)).join("");
}

function buildCourseAskPrompt(selectedContent: string) {
  const normalized = selectedContent.replace(/\s+/g, " ").trim();
  const availableLength = COURSE_ASK_MAX_LENGTH - Array.from(COURSE_ASK_PROMPT_PREFIX).length;
  return `${COURSE_ASK_PROMPT_PREFIX}${truncateByChars(normalized, availableLength)}`;
}

function toCamelCase(value: string) {
  return value.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function parseStyleAttribute(styleText: string): CSSProperties {
  return styleText.split(";").reduce<CSSProperties>((styles, declaration) => {
    const [rawProperty, ...rawValue] = declaration.split(":");
    const property = rawProperty?.trim();
    const value = rawValue.join(":").trim();

    if (!property || !value) return styles;
    return {
      ...styles,
      [toCamelCase(property)]: value,
    };
  }, {});
}

const REACT_ATTRIBUTE_NAMES: Record<string, string> = {
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
  "xlink:href": "xlinkHref",
};

function getElementProps(element: Element, baseUrl: string, key: string): Record<string, unknown> {
  const props: Record<string, unknown> = { key };

  Array.from(element.attributes).forEach((attribute) => {
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
      } catch {
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

function mergeClassName(current: unknown, className: string) {
  return String(current ?? "")
    .split(/\s+/)
    .concat(className)
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join(" ");
}

function getSectionNumber(element: Element) {
  const section = element.closest("section[id^='section-']");
  const match = section?.id.match(/^section-(\d+)$/);
  return match?.[1] ? match[1].padStart(2, "0") : null;
}

function renderHtmlNode(node: Node, baseUrl: string, key: string): ReactNode {
  if (node.nodeType === Node.TEXT_NODE) {
    const parentTag = node.parentElement?.tagName.toLowerCase();
    const tableParentTags = new Set(["table", "thead", "tbody", "tfoot", "tr", "colgroup"]);
    if (parentTag && tableParentTags.has(parentTag) && !node.textContent?.trim()) {
      return null;
    }
    return node.textContent;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (["script", "style", "link", "meta", "title", "base"].includes(tagName)) {
    return null;
  }

  if (tagName === "nav" && element.classList.contains("breadcrumb")) {
    return null;
  }

  const children = Array.from(element.childNodes).map((child, index) =>
    renderHtmlNode(child, baseUrl, `${key}-${index}`),
  );
  const props = getElementProps(element, baseUrl, key);

  if (tagName === "h2" && element.closest("section[id^='section-']")) {
    props.className = mergeClassName(props.className, "section-title");

    if (!element.querySelector(".section-num")) {
      const sectionNumber = getSectionNumber(element);
      if (sectionNumber) {
        children.unshift(
          React.createElement(
            "span",
            { className: "section-num", key: `${key}-section-num` },
            `Section ${sectionNumber}`,
          ),
        );
      }
    }
  }

  if (tagName === "h3") {
    props.className = mergeClassName(props.className, "subsection-title");
  }

  return React.createElement(tagName, props, ...children);
}

function CourseHtmlDocument({ html, baseUrl }: { html: string; baseUrl: string }) {
  const content = useMemo(() => {
    if (!html) return null;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const main = doc.querySelector("main.main");
    const nodes = main ? Array.from(main.childNodes) : Array.from(doc.body.childNodes);

    return nodes.map((node, index) => renderHtmlNode(node, baseUrl, `course-doc-${index}`));
  }, [baseUrl, html]);

  return <article className="course-react-doc">{content}</article>;
}

function CoursePageContent() {
  const searchParams = useSearchParams();
  const { token, isAuthenticated, openAuthModal } = useAuth();

  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [detail, setDetail] = useState<ChapterDetail | null>(null);
  const [readerStatus, setReaderStatus] = useState<ReaderStatus>("idle");
  const [readerError, setReaderError] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [answer, setAnswer] = useState("");
  const [askStatus, setAskStatus] = useState<AskStatus>("idle");
  const [askError, setAskError] = useState<string | null>(null);
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [courseHtml, setCourseHtml] = useState("");
  const [selectionBubble, setSelectionBubble] = useState<SelectionBubble | null>(null);
  const [inlineAskPanel, setInlineAskPanel] = useState<InlineAskPanel | null>(null);
  const courseReaderRef = useRef<HTMLElement | null>(null);

  const flatChapters = useMemo(() => flattenChapters(chapters), [chapters]);
  const readableChapters = useMemo(() => getReadableChapters(chapters), [chapters]);

  useEffect(() => {
    fetchCourseChapters()
      .then((data) => {
        const nextChapters = Array.isArray(data) && data.length > 0 ? data : FALLBACK_CHAPTERS;
        const defaultId = Number(searchParams.get("chapter")) || getReadableChapters(nextChapters)[0]?.id || null;
        setChapters(nextChapters);
        setExpandedIds(new Set(nextChapters.map((chapter) => chapter.id)));
        setActiveChapterId(defaultId);
      })
      .catch(() => {
        const defaultId = Number(searchParams.get("chapter")) || getReadableChapters(FALLBACK_CHAPTERS)[0]?.id || null;
        setChapters(FALLBACK_CHAPTERS);
        setExpandedIds(new Set(FALLBACK_CHAPTERS.map((chapter) => chapter.id)));
        setActiveChapterId(defaultId);
      });
  }, [searchParams]);

  useEffect(() => {
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

    fetchChapterDetail(token, activeChapterId)
      .then((data) => {
        setDetail(data);
        setReaderStatus("idle");
      })
      .catch((error: Error) => {
        setDetail(null);
        setReaderStatus("error");
        setReaderError(error.message || "章节加载失败");
      });
  }, [activeChapterId, isAuthenticated, token]);

  const activeChapter = flatChapters.find((chapter) => chapter.id === activeChapterId) ?? null;
  const pdfUrl = getStaticAssetUrl(detail?.pdf_url ?? null);
  const htmlUrl = getStaticAssetUrl(activeChapterId ? CHAPTER_HTML_PATH[activeChapterId] ?? null : null);

  const openLockedReader = () => {
    openAuthModal({ mode: "login", reason: "查看课程文档前请先登录。" });
  };

  const selectChapter = (chapterId: number) => {
    setActiveChapterId(chapterId);
    if (!isAuthenticated) {
      openLockedReader();
    }
  };

  const toggleExpand = (chapterId: number) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId);
      return next;
    });
  };

  const askSelectedText = async () => {
    if (!token || !activeChapterId || !selectedText.trim()) return;

    setAskStatus("asking");
    setAskError(null);
    setAnswer("");

    try {
      const result = await askChapterQuestion(token, activeChapterId, {
        selected_text: selectedText.trim(),
      });
      setAnswer(result.answer);
      setAskStatus("idle");
    } catch (error) {
      setAskStatus("error");
      setAskError(error instanceof Error ? error.message : "问答失败");
    }
  };

  const askInlineSelection = async (selection: SelectionBubble) => {
    if (!token || !activeChapterId) return;

    const prompt = buildCourseAskPrompt(selection.text);
    setSelectionBubble(null);
    setInlineAskPanel({
      prompt,
      answer: "",
      error: null,
      status: "asking",
      x: selection.x,
      y: selection.y,
    });

    try {
      const result = await askChapterQuestion(token, activeChapterId, {
        selected_text: prompt,
      });
      setInlineAskPanel((current) => current && current.prompt === prompt
        ? { ...current, answer: result.answer, status: "idle" }
        : current);
    } catch (error) {
      setInlineAskPanel((current) => current && current.prompt === prompt
        ? {
            ...current,
            error: error instanceof Error ? error.message : "问答失败",
            status: "error",
          }
        : current);
    }
  };

  const openAskModal = () => {
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

  const readCourseSelection = () => {
    if (typeof window === "undefined") return null;
    const selection = window.getSelection();
    const rawText = selection?.toString().replace(/\s+/g, " ").trim() ?? "";
    const anchorNode = selection?.anchorNode;
    const reader = courseReaderRef.current;

    if (!selection || selection.rangeCount === 0 || !rawText || !anchorNode || !reader) {
      return null;
    }

    const anchorElement = anchorNode.nodeType === Node.ELEMENT_NODE
      ? anchorNode as Element
      : anchorNode.parentElement;

    if (!anchorElement || !reader.contains(anchorElement)) {
      return null;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (!rect.width && !rect.height) return null;

    const text = truncateByChars(rawText, COURSE_ASK_MAX_LENGTH);
    const x = Math.min(Math.max(rect.left + rect.width / 2, 96), window.innerWidth - 96);
    const y = rect.top > 64 ? rect.top - 44 : rect.bottom + 12;

    return { text, x, y };
  };

  useEffect(() => {
    if (!isAuthenticated || isAskModalOpen) {
      setSelectionBubble(null);
      return;
    }

    const updateSelection = (event: MouseEvent | KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.closest(".course-selection-ask, .course-inline-answer")
      ) {
        return;
      }

      if (inlineAskPanel?.status === "asking") {
        return;
      }

      window.setTimeout(() => {
        const nextSelection = readCourseSelection();
        setSelectionBubble(nextSelection);
        if (nextSelection) {
          setInlineAskPanel(null);
        }
      }, 0);
    };

    document.addEventListener("mouseup", updateSelection);
    document.addEventListener("keyup", updateSelection);

    return () => {
      document.removeEventListener("mouseup", updateSelection);
      document.removeEventListener("keyup", updateSelection);
    };
  }, [inlineAskPanel?.status, isAskModalOpen, isAuthenticated, courseHtml]);

  useEffect(() => {
    if (!htmlUrl) {
      setCourseHtml("");
      return;
    }

    let isCancelled = false;

    fetch(htmlUrl, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTML document unavailable");
        }
        return response.text();
      })
      .then((source) => {
        if (isCancelled) return;

        setCourseHtml(source);
      })
      .catch(() => {
        if (!isCancelled) {
          setCourseHtml("");
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [htmlUrl]);

  useEffect(() => {
    const anchor = activeChapterId ? CHAPTER_HTML_ANCHOR[activeChapterId] : "";
    if (!courseHtml || !anchor) return;

    const frameId = requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ block: "start" });
    });

    return () => cancelAnimationFrame(frameId);
  }, [activeChapterId, courseHtml]);

  const renderChapterList = (items: CourseChapter[]) => (
    <ol className="course-chapter-list">
      {items.map((chapter) => {
        const hasChildren = Boolean(chapter.children?.length);
        const isExpanded = expandedIds.has(chapter.id);
        const isActive = activeChapterId === chapter.id;

        return (
          <li key={chapter.id} className="course-chapter-group">
            <button
              type="button"
              className={`course-chapter-item${isActive ? " is-active" : ""}${hasChildren ? " is-parent" : ""}`}
              onClick={() => {
                if (hasChildren) {
                  toggleExpand(chapter.id);
                } else {
                  selectChapter(chapter.id);
                }
              }}
              aria-expanded={hasChildren ? isExpanded : undefined}
            >
              <span className="course-chapter-num">
                {String(chapter.sort_order).padStart(2, "0")}
              </span>
              <span className="course-chapter-title">{chapter.title}</span>
              {hasChildren && (
                <span className={`course-chapter-toggle${isExpanded ? " is-open" : ""}`}>
                  ▶
                </span>
              )}
            </button>
            {hasChildren && isExpanded && renderChapterList(chapter.children ?? [])}
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className={`course-page${isSidebarCollapsed ? " is-sidebar-collapsed" : ""}`}>
      <button
        type="button"
        className="button-ghost course-sidebar-rail-button"
        aria-label="展开章节目录"
        title="展开章节目录"
        onClick={() => setIsSidebarCollapsed(false)}
      >
        ›
      </button>

      <aside className="course-sidebar" aria-hidden={isSidebarCollapsed}>
        <div className="course-sidebar-head">
          <h2 className="course-sidebar-heading">章节目录</h2>
          <button
            type="button"
            className="button-ghost course-sidebar-icon-button"
            aria-label="收起章节目录"
            title="收起章节目录"
            onClick={() => setIsSidebarCollapsed(true)}
          >
            ‹
          </button>
        </div>
        {renderChapterList(chapters)}
      </aside>

      <main className="course-reader" ref={courseReaderRef}>
        <button type="button" className="button-primary course-ask-fab" onClick={openAskModal}>
          划词问 AI
        </button>

        {!isAuthenticated ? (
          <section className="course-locked">
            <div>
              <div className="course-locked-title">登录后查看章节正文</div>
              <p className="course-locked-copy">
                课程目录可预览，课程文档需要登录后使用。
              </p>
            </div>
            <button type="button" className="button-primary" onClick={openLockedReader}>
              登录查看
            </button>
          </section>
        ) : readerStatus === "loading" && !courseHtml ? (
          <section className="course-state">
            <span className="overview-loading-dot" />
            <span className="overview-loading-dot" />
            <span className="overview-loading-dot" />
            <span>章节加载中</span>
          </section>
        ) : readerStatus === "error" && !courseHtml ? (
          <section className="course-state is-error">{readerError}</section>
        ) : (
          <>
            {courseHtml && htmlUrl ? (
              <section className="course-html-panel">
                <CourseHtmlDocument html={courseHtml} baseUrl={htmlUrl} />
              </section>
            ) : pdfUrl && (
              <section className="course-pdf-panel is-full">
                <iframe className="course-pdf-frame" src={pdfUrl} title={detail?.title ?? "课程文档"} />
              </section>
            )}

            {!courseHtml && !pdfUrl && (
              <section className="course-state">
                当前章节暂无课程文档。
              </section>
            )}

          </>
        )}
      </main>

      {selectionBubble && !inlineAskPanel && !isAskModalOpen && (
        <button
          type="button"
          className="course-selection-ask"
          style={{ left: selectionBubble.x, top: selectionBubble.y }}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => void askInlineSelection(selectionBubble)}
        >
          问 AI
        </button>
      )}

      {inlineAskPanel && !isAskModalOpen && (
        <section
          className="course-inline-answer"
          style={{ left: inlineAskPanel.x, top: inlineAskPanel.y }}
          aria-live="polite"
        >
          <header className="course-inline-answer-head">
            <span>划词问 AI</span>
            <button
              type="button"
              className="button-ghost course-inline-answer-close"
              aria-label="关闭划词问 AI 结果"
              onClick={() => setInlineAskPanel(null)}
            >
              ✕
            </button>
          </header>
          <div className="course-inline-answer-question">{inlineAskPanel.prompt}</div>
          {inlineAskPanel.status === "asking" ? (
            <div className="course-inline-answer-loading">AI 正在生成回答...</div>
          ) : inlineAskPanel.error ? (
            <div className="course-inline-answer-error">{inlineAskPanel.error}</div>
          ) : (
            <div className="course-inline-answer-body">{inlineAskPanel.answer}</div>
          )}
        </section>
      )}

      {isAskModalOpen && (
        <div className="course-ask-modal-backdrop" role="presentation" onClick={() => setIsAskModalOpen(false)}>
          <section
            className="course-ask-modal"
            role="dialog"
            aria-modal="true"
            aria-label="划词问 AI"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="course-ask-modal-head">
              <div>
                <div className="eyebrow">划词提问</div>
                <h3 className="course-tool-title">划词问 AI</h3>
              </div>
              <button
                type="button"
                className="button-ghost course-ask-close"
                aria-label="关闭"
                onClick={() => setIsAskModalOpen(false)}
              >
                ✕
              </button>
            </header>
            <p className="course-tool-copy">
              在课程文档中选中文字后可直接提问，也可以在这里编辑后再发送。
            </p>
            <textarea
              className="course-note-input"
              value={selectedText}
              maxLength={COURSE_ASK_MAX_LENGTH}
              onChange={(event) => {
                setSelectedText(event.target.value);
                setAskError(null);
              }}
              placeholder="选中文本会自动生成提问，也可以手动输入课程相关问题"
            />
            <button
              type="button"
              className="button-primary course-tool-button"
              disabled={!selectedText.trim() || askStatus === "asking"}
              onClick={askSelectedText}
            >
              {askStatus === "asking" ? "回答中" : "询问 AI"}
            </button>
            {answer && <div className="course-answer">{answer}</div>}
            {askError && <div className="course-tool-error">{askError}</div>}
          </section>
        </div>
      )}
    </div>
  );
}

export default function CoursePage() {
  return (
    <Suspense fallback={<div className="course-page" />}>
      <CoursePageContent />
    </Suspense>
  );
}
