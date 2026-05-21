(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/features/assistant/api/chat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createConversation",
    ()=>createConversation,
    "listAssistantConversations",
    ()=>listAssistantConversations,
    "listConversationMessages",
    ()=>listConversationMessages,
    "sendConversationMessage",
    ()=>sendConversationMessage,
    "streamConversationMessage",
    ()=>streamConversationMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-client] (ecmascript)");
;
;
;
function createConversation(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/chat/conversations", {
        method: "POST",
        token,
        body: {
            scene: "assistant"
        }
    });
}
function listAssistantConversations(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/chat/conversations?scene=assistant", {
        token
    });
}
function listConversationMessages(token, conversationId, limit = 100) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/chat/conversations/${conversationId}/messages?limit=${limit}`, {
        token
    });
}
function sendConversationMessage(token, conversationId, content, responseMode = "text") {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/chat/messages", {
        method: "POST",
        token,
        body: {
            conversation_id: conversationId,
            content,
            response_mode: responseMode
        }
    });
}
function parseSseBlock(block) {
    const lines = block.split("\n").map((line)=>line.trimEnd()).filter(Boolean);
    let eventName = "message";
    const dataLines = [];
    for (const line of lines){
        if (line.startsWith("event:")) {
            eventName = line.slice(6).trim();
            continue;
        }
        if (line.startsWith("data:")) {
            dataLines.push(line.slice(5).trim());
        }
    }
    return {
        event: eventName,
        data: dataLines.join("\n")
    };
}
async function streamConversationMessage(token, conversationId, content, handlers) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}/chat/messages/stream`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            conversation_id: conversationId,
            content,
            response_mode: "text"
        }),
        cache: "no-store"
    });
    if (!response.ok || !response.body) {
        const payload = await response.json().catch(()=>null);
        const code = payload?.code || response.status;
        if (response.status === 401 || code === 40101 || code === 40102 || code === 40103) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notifySessionExpired"])();
        }
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiRequestError"](payload?.message || "Stream request failed", response.status, code);
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let streamError = null;
    while(true){
        const { done, value } = await reader.read();
        buffer += decoder.decode(value || new Uint8Array(), {
            stream: !done
        });
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() || "";
        for (const block of blocks){
            if (!block.trim()) {
                continue;
            }
            const parsed = parseSseBlock(block);
            const data = parsed.data ? JSON.parse(parsed.data) : {};
            if (parsed.event === "start") {
                handlers.onStart?.(data);
                continue;
            }
            if (parsed.event === "delta") {
                handlers.onDelta(data);
                continue;
            }
            if (parsed.event === "end") {
                handlers.onEnd(data);
                continue;
            }
            if (parsed.event === "error") {
                streamError = data.message || "Stream failed";
                handlers.onError?.(data);
            }
        }
        if (done) {
            break;
        }
    }
    if (streamError) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiRequestError"](streamError, 500, 500);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/assistant/hooks/use-assistant-chat.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAssistantChat",
    ()=>useAssistantChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/assistant/api/chat.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function buildUserMessage(conversationId, content) {
    return {
        id: `local-user-${Date.now()}`,
        conversation_id: conversationId,
        role: "user",
        content,
        audio_url: null,
        duration_ms: null,
        created_at: new Date().toISOString()
    };
}
async function playAudio(url) {
    const audio = new Audio(url);
    audio.preload = "auto";
    await new Promise((resolve, reject)=>{
        const cleanup = ()=>{
            audio.onended = null;
            audio.onerror = null;
        };
        audio.onended = ()=>{
            cleanup();
            resolve();
        };
        audio.onerror = ()=>{
            cleanup();
            reject(new Error("Audio playback failed"));
        };
        void audio.play().catch((error)=>{
            cleanup();
            reject(error);
        });
    });
}
function useAssistantChat() {
    _s();
    const { token, currentUser, isAuthReady, openAuthModal, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeConversationId, setActiveConversationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [messageDraft, setMessageDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [avatarDraft, setAvatarDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [presence, setPresence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("offline");
    const [isBootstrapping, setIsBootstrapping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDrawerOpen, setIsDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const audioRunIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const resetWorkspace = ()=>{
        setConversations([]);
        setActiveConversationId(null);
        setMessages([]);
        setPresence("offline");
    };
    const loadConversationMessages = async (nextToken, conversationId)=>{
        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listConversationMessages"])(nextToken, conversationId);
        setMessages(data.items);
        setActiveConversationId(conversationId);
    };
    const ensureConversation = async (nextToken)=>{
        const conversationList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listAssistantConversations"])(nextToken);
        const items = conversationList.items;
        setConversations(items);
        if (items.length > 0) {
            await loadConversationMessages(nextToken, items[0].id);
            return items[0].id;
        }
        const createdConversation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConversation"])(nextToken);
        setConversations([
            createdConversation
        ]);
        setMessages([]);
        setActiveConversationId(createdConversation.id);
        return createdConversation.id;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAssistantChat.useEffect": ()=>{
            if (!isAuthReady) {
                return;
            }
            if (!token) {
                resetWorkspace();
                setIsBootstrapping(false);
                return;
            }
            let cancelled = false;
            const bootstrap = {
                "useAssistantChat.useEffect.bootstrap": async ()=>{
                    setIsBootstrapping(true);
                    setErrorMessage(null);
                    try {
                        await ensureConversation(token);
                        if (!cancelled) {
                            setPresence("idle");
                        }
                    } catch (error) {
                        if (!cancelled) {
                            resetWorkspace();
                            setPresence("error");
                            setErrorMessage(error instanceof Error ? error.message : "AI 助学工作台初始化失败。");
                        }
                    } finally{
                        if (!cancelled) {
                            setIsBootstrapping(false);
                        }
                    }
                }
            }["useAssistantChat.useEffect.bootstrap"];
            void bootstrap();
            return ({
                "useAssistantChat.useEffect": ()=>{
                    cancelled = true;
                }
            })["useAssistantChat.useEffect"];
        }
    }["useAssistantChat.useEffect"], [
        isAuthReady,
        token
    ]);
    const requireAuth = (reason)=>{
        openAuthModal({
            mode: "login",
            reason
        });
    };
    const handleConversationSelect = async (conversationId)=>{
        if (!token || conversationId === activeConversationId) {
            return;
        }
        setErrorMessage(null);
        try {
            await loadConversationMessages(token, conversationId);
            setPresence("idle");
        } catch (error) {
            setPresence("error");
            setErrorMessage(error instanceof Error ? error.message : "加载历史对话失败。");
        }
    };
    const handleCreateConversation = async ()=>{
        if (!token) {
            requireAuth("创建新对话前请先登录。");
            return;
        }
        setErrorMessage(null);
        try {
            const createdConversation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createConversation"])(token);
            setConversations((current)=>[
                    createdConversation,
                    ...current
                ]);
            setActiveConversationId(createdConversation.id);
            setMessages([]);
            setPresence("idle");
        } catch (error) {
            setPresence("error");
            setErrorMessage(error instanceof Error ? error.message : "创建对话失败。");
        }
    };
    const sendMessage = async (draft, responseMode, clearDraft)=>{
        if (!token) {
            requireAuth(responseMode === "voice" ? "使用数字人语音问答前请先登录。" : "向 AI 助学提问前请先登录。");
            return;
        }
        const content = draft.trim();
        if (!content || isSending) {
            return;
        }
        setIsSending(true);
        setErrorMessage(null);
        setPresence("thinking");
        const pendingAssistantId = `local-assistant-${Date.now()}`;
        try {
            const conversationId = activeConversationId || await ensureConversation(token);
            const userMessage = buildUserMessage(conversationId, content);
            const pendingAssistantMessage = {
                id: pendingAssistantId,
                conversation_id: conversationId,
                role: "assistant",
                content: "",
                audio_url: null,
                duration_ms: null,
                created_at: new Date().toISOString()
            };
            setMessages((current)=>[
                    ...current,
                    userMessage,
                    pendingAssistantMessage
                ]);
            clearDraft();
            if (responseMode === "text") {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["streamConversationMessage"])(token, conversationId, content, {
                    onDelta: ({ content: delta })=>{
                        setMessages((current)=>current.map((message)=>message.id === pendingAssistantId ? {
                                    ...message,
                                    content: `${message.content}${delta}`
                                } : message));
                    },
                    onEnd: (reply)=>{
                        setMessages((current)=>current.map((message)=>message.id === pendingAssistantId ? {
                                    id: reply.message_id,
                                    conversation_id: conversationId,
                                    role: "assistant",
                                    content: reply.content,
                                    audio_url: reply.audio_url,
                                    duration_ms: reply.duration_ms,
                                    created_at: reply.created_at
                                } : message));
                    },
                    onError: ({ message })=>{
                        setErrorMessage(message);
                    }
                });
            } else {
                const reply = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendConversationMessage"])(token, conversationId, content, responseMode);
                const assistantMessage = {
                    id: reply.message_id,
                    conversation_id: conversationId,
                    role: "assistant",
                    content: reply.content,
                    audio_url: reply.audio_url,
                    duration_ms: reply.duration_ms,
                    created_at: reply.created_at
                };
                setMessages((current)=>current.map((message)=>message.id === pendingAssistantId ? assistantMessage : message));
                if (assistantMessage.audio_url && responseMode === "voice") {
                    const runId = Date.now();
                    audioRunIdRef.current = runId;
                    setPresence("speaking");
                    try {
                        await playAudio(assistantMessage.audio_url);
                        if (audioRunIdRef.current === runId) {
                            setPresence("idle");
                        }
                    } catch  {
                        setPresence("idle");
                    }
                }
            }
            const refreshedConversations = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listAssistantConversations"])(token);
            setConversations(refreshedConversations.items);
            setActiveConversationId(conversationId);
            setPresence("idle");
        } catch (error) {
            setPresence("error");
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiRequestError"] && error.status === 401) {
                logout();
            }
            setMessages((current)=>current.filter((message)=>message.id !== pendingAssistantId));
            setErrorMessage(error instanceof Error ? error.message : "发送消息失败。");
        } finally{
            setIsSending(false);
        }
    };
    const handleSendMessage = async ()=>{
        await sendMessage(messageDraft, "text", ()=>setMessageDraft(""));
    };
    const handleSendAvatarMessage = async ()=>{
        await sendMessage(avatarDraft, "voice", ()=>setAvatarDraft(""));
    };
    return {
        token,
        currentUser,
        conversations,
        activeConversationId,
        messages,
        messageDraft,
        setMessageDraft,
        avatarDraft,
        setAvatarDraft,
        presence,
        isBootstrapping,
        isSending,
        isDrawerOpen,
        setIsDrawerOpen,
        errorMessage,
        handleConversationSelect,
        handleCreateConversation,
        handleSendMessage,
        handleSendAvatarMessage
    };
}
_s(useAssistantChat, "anc3sJ2QzzVW/0BuLZ+2rwpSFMs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/assistant/components/live2d-avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Live2DAvatar",
    ()=>Live2DAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const MODEL_URL = "/characters/Haru-2/Haru-2.model3.json";
const CORE_SCRIPT_URL = "/live2d/live2dcubismcore.min.js";
const PIXI_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/pixi.js@7.4.3/dist/pixi.min.js";
const PIXI_LIVE2D_SCRIPT_URL = "https://cdn.jsdelivr.net/npm/pixi-live2d-display@0.4.0/dist/cubism4.min.js";
const scriptPromises = new Map();
function loadScript(src, test) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (test()) {
        return Promise.resolve();
    }
    const existingPromise = scriptPromises.get(src);
    if (existingPromise) {
        return existingPromise;
    }
    const promise = new Promise((resolve, reject)=>{
        const existing = document.querySelector(`script[data-src="${src}"]`);
        if (existing) {
            existing.addEventListener("load", ()=>resolve(), {
                once: true
            });
            existing.addEventListener("error", ()=>reject(new Error(`Failed to load script: ${src}`)), {
                once: true
            });
            return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.dataset.src = src;
        script.onload = ()=>resolve();
        script.onerror = ()=>reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
    });
    scriptPromises.set(src, promise);
    return promise;
}
async function ensureLive2DScripts() {
    const globalWindow = window;
    await loadScript(CORE_SCRIPT_URL, ()=>Boolean(globalWindow.Live2DCubismCore));
    await loadScript(PIXI_SCRIPT_URL, ()=>Boolean(globalWindow.PIXI?.Application));
    await loadScript(PIXI_LIVE2D_SCRIPT_URL, ()=>Boolean(globalWindow.PIXI?.live2d?.Live2DModel));
}
function applyPresenceMotion(model, presence) {
    if (presence === "thinking") {
        model.expression?.("coldness");
        model.motion?.("Idle", 3);
        return;
    }
    if (presence === "speaking") {
        model.expression?.("happy-01");
        model.motion?.("TapBody", 8);
        return;
    }
    if (presence === "error") {
        model.expression?.("sad");
        model.motion?.("TapBody", 24);
        return;
    }
    model.expression?.("smile");
    model.motion?.("Idle", 0);
}
function Live2DAvatar({ presence }) {
    _s();
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const appRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const modelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resizeObserverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastPresenceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("loading");
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Live2DAvatar.useEffect": ()=>{
            let disposed = false;
            const fitModel = {
                "Live2DAvatar.useEffect.fitModel": ()=>{
                    const stageElement = stageRef.current;
                    const app = appRef.current;
                    const model = modelRef.current;
                    if (!stageElement || !app || !model) {
                        return;
                    }
                    const { width, height } = stageElement.getBoundingClientRect();
                    app.renderer.resize(width, height);
                    const bounds = model.getLocalBounds();
                    const safeWidth = Math.max(bounds.width, 1);
                    const safeHeight = Math.max(bounds.height, 1);
                    const availableWidth = width * 1.24;
                    const availableHeight = height * 1.62;
                    const scale = Math.min(availableWidth / safeWidth, availableHeight / safeHeight);
                    model.scale.set(scale);
                    model.pivot.set(bounds.x + safeWidth / 2, bounds.y + safeHeight);
                    model.position.set(width * 0.52, height * 1.65);
                }
            }["Live2DAvatar.useEffect.fitModel"];
            const init = {
                "Live2DAvatar.useEffect.init": async ()=>{
                    const stageElement = stageRef.current;
                    if (!stageElement) {
                        return;
                    }
                    setStatus("loading");
                    setErrorMessage(null);
                    try {
                        await ensureLive2DScripts();
                        if (disposed) {
                            return;
                        }
                        const globalWindow = window;
                        const Application = globalWindow.PIXI?.Application;
                        const Live2DModelFactory = globalWindow.PIXI?.live2d?.Live2DModel;
                        if (!Application || !Live2DModelFactory) {
                            throw new Error("PIXI or pixi-live2d-display is unavailable");
                        }
                        const app = new Application({
                            resizeTo: stageElement,
                            autoDensity: true,
                            antialias: true,
                            backgroundAlpha: 0
                        });
                        stageElement.innerHTML = "";
                        stageElement.appendChild(app.view);
                        const model = await Live2DModelFactory.from(MODEL_URL, {
                            autoInteract: false
                        });
                        if (disposed) {
                            app.destroy(true, {
                                children: true
                            });
                            model.destroy?.({
                                children: true
                            });
                            return;
                        }
                        model.eventMode = "none";
                        model.cursor = "default";
                        app.stage.addChild(model);
                        appRef.current = app;
                        modelRef.current = model;
                        fitModel();
                        applyPresenceMotion(model, presence);
                        lastPresenceRef.current = presence;
                        setStatus("ready");
                        if (typeof ResizeObserver !== "undefined") {
                            resizeObserverRef.current = new ResizeObserver({
                                "Live2DAvatar.useEffect.init": ()=>{
                                    fitModel();
                                }
                            }["Live2DAvatar.useEffect.init"]);
                            resizeObserverRef.current.observe(stageElement);
                        } else {
                            window.addEventListener("resize", fitModel);
                        }
                    } catch (error) {
                        if (disposed) {
                            return;
                        }
                        setStatus("error");
                        setErrorMessage(error instanceof Error ? error.message : "Failed to initialize Live2D");
                    }
                }
            }["Live2DAvatar.useEffect.init"];
            void init();
            return ({
                "Live2DAvatar.useEffect": ()=>{
                    disposed = true;
                    resizeObserverRef.current?.disconnect();
                    resizeObserverRef.current = null;
                    window.removeEventListener("resize", fitModel);
                    modelRef.current?.destroy?.({
                        children: true
                    });
                    appRef.current?.destroy(true, {
                        children: true
                    });
                    modelRef.current = null;
                    appRef.current = null;
                }
            })["Live2DAvatar.useEffect"];
        }
    }["Live2DAvatar.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Live2DAvatar.useEffect": ()=>{
            const model = modelRef.current;
            if (!model) {
                return;
            }
            if (lastPresenceRef.current === presence) {
                return;
            }
            applyPresenceMotion(model, presence);
            lastPresenceRef.current = presence;
        }
    }["Live2DAvatar.useEffect"], [
        presence
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `assistant-live2d-shell is-${status}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: stageRef,
                className: "assistant-live2d-stage"
            }, void 0, false, {
                fileName: "[project]/features/assistant/components/live2d-avatar.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            status === "loading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "assistant-live2d-overlay",
                children: "Loading Live2D..."
            }, void 0, false, {
                fileName: "[project]/features/assistant/components/live2d-avatar.tsx",
                lineNumber: 292,
                columnNumber: 9
            }, this) : null,
            status === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "assistant-live2d-overlay is-error",
                children: errorMessage || "Failed to load Live2D"
            }, void 0, false, {
                fileName: "[project]/features/assistant/components/live2d-avatar.tsx",
                lineNumber: 296,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/features/assistant/components/live2d-avatar.tsx",
        lineNumber: 288,
        columnNumber: 5
    }, this);
}
_s(Live2DAvatar, "WmF25WxHzD+c22q/U1OMT+bxs20=");
_c = Live2DAvatar;
var _c;
__turbopack_context__.k.register(_c, "Live2DAvatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/assistant/components/assistant-workspace.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AssistantWorkspace",
    ()=>AssistantWorkspace
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$hooks$2f$use$2d$assistant$2d$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/assistant/hooks/use-assistant-chat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$components$2f$live2d$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/assistant/components/live2d-avatar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const PRESENCE_LABEL = {
    offline: "未连接",
    idle: "待命中",
    thinking: "思考中",
    speaking: "讲解中",
    error: "异常"
};
function formatTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "--";
    }
    return new Intl.DateTimeFormat("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
}
function AssistantWorkspace() {
    _s();
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [playingAudioUrl, setPlayingAudioUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { openAuthModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { token, currentUser, conversations, activeConversationId, messages, messageDraft, setMessageDraft, avatarDraft, setAvatarDraft, presence, isBootstrapping, isSending, isDrawerOpen, setIsDrawerOpen, errorMessage, handleConversationSelect, handleCreateConversation, handleSendMessage, handleSendAvatarMessage } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$hooks$2f$use$2d$assistant$2d$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistantChat"])();
    const statusText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssistantWorkspace.useMemo[statusText]": ()=>PRESENCE_LABEL[presence] ?? "待命中"
    }["AssistantWorkspace.useMemo[statusText]"], [
        presence
    ]);
    const recentAvatarMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssistantWorkspace.useMemo[recentAvatarMessages]": ()=>messages.slice(-4)
    }["AssistantWorkspace.useMemo[recentAvatarMessages]"], [
        messages
    ]);
    const learnerName = currentUser?.full_name || currentUser?.username || "学习者";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AssistantWorkspace.useEffect": ()=>{
            return ({
                "AssistantWorkspace.useEffect": ()=>{
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current = null;
                    }
                }
            })["AssistantWorkspace.useEffect"];
        }
    }["AssistantWorkspace.useEffect"], []);
    const handleAudioToggle = async (audioUrl)=>{
        if (audioRef.current && playingAudioUrl === audioUrl) {
            audioRef.current.pause();
            audioRef.current = null;
            setPlayingAudioUrl(null);
            return;
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        const audio = new Audio(audioUrl);
        audio.preload = "auto";
        audio.onended = ()=>{
            setPlayingAudioUrl(null);
            audioRef.current = null;
        };
        audio.onerror = ()=>{
            setPlayingAudioUrl(null);
            audioRef.current = null;
        };
        audioRef.current = audio;
        setPlayingAudioUrl(audioUrl);
        try {
            await audio.play();
        } catch  {
            setPlayingAudioUrl(null);
            audioRef.current = null;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "assistant-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "assistant-layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "assistant-history",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-section-head",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "eyebrow",
                                            children: "助学控制台"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "section-title",
                                            children: "对话历史"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 120,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-login-card",
                                children: token && currentUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "assistant-login-copy",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-name",
                                                    children: "新建对话"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-meta",
                                                    children: "围绕当前章节开启一个新的问答线程。"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button-primary assistant-full-button",
                                            type: "button",
                                            onClick: handleCreateConversation,
                                            children: "创建对话"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "assistant-login-copy",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-name",
                                                    children: "游客访问"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-meta",
                                                    children: "你可以先浏览当前界面；登录后即可创建问答线程、发送提问并保留历史记录。"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button-primary assistant-full-button",
                                            type: "button",
                                            onClick: ()=>openAuthModal({
                                                    mode: "login",
                                                    reason: "登录后即可开启 AI 助学问答与数字人语音互动。"
                                                }),
                                            children: "登录后开始提问"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 151,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-conversation-list",
                                children: conversations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "assistant-empty-card",
                                    children: isBootstrapping ? "正在加载对话..." : "暂无对话记录"
                                }, void 0, false, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 169,
                                    columnNumber: 15
                                }, this) : conversations.map((conversation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `assistant-conversation-item${conversation.id === activeConversationId ? " is-active" : ""}`,
                                        type: "button",
                                        onClick: ()=>handleConversationSelect(conversation.id),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-conversation-title",
                                                children: [
                                                    "对话 ",
                                                    String(index + 1).padStart(2, "0")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 182,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-conversation-meta",
                                                children: formatTime(conversation.updated_at)
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 185,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-conversation-id",
                                                children: conversation.id
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 188,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, conversation.id, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 174,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "assistant-main",
                        children: [
                            errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-error-banner",
                                children: errorMessage
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 197,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-chat-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-chat-scroll",
                                        children: messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "assistant-empty-chat",
                                            children: token ? "围绕当前课程内容发起提问，开始新的 AI 助学对话。" : "游客可先浏览界面；真正发起 AI 问答前需要先登录。"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 203,
                                            columnNumber: 17
                                        }, this) : messages.map((message)=>{
                                            const isAssistant = message.role === "assistant";
                                            const speakerName = isAssistant ? "AI 助教" : learnerName;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: `assistant-message ${isAssistant ? "is-assistant" : "is-user"}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "assistant-message-head",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "assistant-message-speaker",
                                                                children: speakerName
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "assistant-message-time",
                                                                children: formatTime(message.created_at)
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                                lineNumber: 224,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "assistant-message-body",
                                                        children: message.content ? message.content : isAssistant ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "assistant-typing",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "assistant-typing-dot"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                                    lineNumber: 234,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "assistant-typing-dot"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                                    lineNumber: 235,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "assistant-typing-dot"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                                    lineNumber: 236,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "assistant-typing-label",
                                                                    children: "思考中..."
                                                                }, void 0, false, {
                                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                                    lineNumber: 237,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                            lineNumber: 233,
                                                            columnNumber: 27
                                                        }, this) : null
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 229,
                                                        columnNumber: 23
                                                    }, this),
                                                    message.audio_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "assistant-audio-button",
                                                        type: "button",
                                                        onClick: ()=>void handleAudioToggle(message.audio_url),
                                                        children: playingAudioUrl === message.audio_url ? "暂停语音" : "播放语音"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 25
                                                    }, this) : null
                                                ]
                                            }, message.id, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 214,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-composer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "field-group assistant-composer-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "field-label",
                                                        children: "文字对话"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: "assistant-textarea",
                                                        value: messageDraft,
                                                        onChange: (event)=>setMessageDraft(event.target.value),
                                                        placeholder: token ? "输入课程相关问题，主聊天会返回流式文本回复" : "可以先输入问题，点击发送时会提示登录",
                                                        disabled: isSending
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 262,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-composer-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "assistant-composer-tip",
                                                        children: token ? "主聊天返回流式文本回复。" : "AI 助学提问需登录后使用。"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "button-primary",
                                                        type: "button",
                                                        onClick: handleSendMessage,
                                                        disabled: isSending,
                                                        children: isSending ? "发送中..." : "发送消息"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 277,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 195,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "assistant-avatar-fab",
                type: "button",
                onClick: ()=>setIsDrawerOpen(true),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "assistant-avatar-fab-bubble",
                        children: "AI"
                    }, void 0, false, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "assistant-avatar-fab-copy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "assistant-avatar-fab-title",
                                children: "数字人助教"
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "assistant-avatar-fab-meta",
                                children: "试试数字人"
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                lineNumber: 295,
                columnNumber: 7
            }, this),
            isDrawerOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "assistant-avatar-modal-backdrop",
                onClick: ()=>setIsDrawerOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                    className: "assistant-avatar-modal",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "assistant-avatar-modal-head",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "assistant-avatar-modal-label",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-avatar-modal-title",
                                        children: "数字人助教 小秋老师"
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 318,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 317,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `assistant-presence-chip is-${presence}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "assistant-presence-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 322,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: statusText
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 323,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 321,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                            lineNumber: 316,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `assistant-avatar-modal-stage is-${presence}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$components$2f$live2d$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Live2DAvatar"], {
                                presence: presence
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 328,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "assistant-avatar-mini-chat",
                            children: recentAvatarMessages.length > 0 ? recentAvatarMessages.map((message)=>{
                                const isAssistant = message.role === "assistant";
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `assistant-avatar-mini-message ${isAssistant ? "is-assistant" : "is-user"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "assistant-avatar-mini-speaker",
                                            children: isAssistant ? "AI 助教" : learnerName
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 343,
                                            columnNumber: 23
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: message.content ? message.content : isAssistant ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "assistant-typing assistant-typing-inline",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "assistant-typing-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 351,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "assistant-typing-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 352,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "assistant-typing-dot"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 29
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "assistant-typing-label",
                                                        children: "思考中..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 29
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 350,
                                                columnNumber: 27
                                            }, this) : null
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 346,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, message.id, true, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 337,
                                    columnNumber: 21
                                }, this);
                            }) : null
                        }, void 0, false, {
                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                            lineNumber: 331,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "assistant-avatar-modal-foot",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "assistant-avatar-input",
                                    type: "text",
                                    value: avatarDraft,
                                    onChange: (event)=>setAvatarDraft(event.target.value),
                                    placeholder: token ? "向数字人提问" : "登录后可发起数字人语音问答",
                                    disabled: isSending,
                                    onKeyDown: (event)=>{
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            void handleSendAvatarMessage();
                                        }
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "assistant-avatar-modal-actions",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button-secondary assistant-small-button",
                                            type: "button",
                                            onClick: ()=>setIsDrawerOpen(false),
                                            children: "关闭"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button-primary assistant-small-button",
                                            type: "button",
                                            onClick: handleSendAvatarMessage,
                                            disabled: isSending,
                                            children: isSending ? "发送中..." : "发送"
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 384,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                    lineNumber: 312,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                lineNumber: 308,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AssistantWorkspace, "kzWFLhAdGFULcbXLDaTBBIZIojo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$hooks$2f$use$2d$assistant$2d$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistantChat"]
    ];
});
_c = AssistantWorkspace;
var _c;
__turbopack_context__.k.register(_c, "AssistantWorkspace");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=features_assistant_5bb418dc._.js.map