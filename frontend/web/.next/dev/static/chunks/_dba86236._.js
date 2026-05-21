(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/constants/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "APP_EVENTS",
    ()=>APP_EVENTS,
    "DEFAULT_API_BASE_URL",
    ()=>DEFAULT_API_BASE_URL,
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000/api/v1";
const API_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;
const STORAGE_KEYS = {
    accessToken: "supplychain.access_token",
    refreshToken: "supplychain.refresh_token",
    currentUser: "supplychain.current_user"
};
const APP_EVENTS = {
    sessionChanged: "supplychain:session-changed"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/http.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiRequestError",
    ()=>ApiRequestError,
    "request",
    ()=>request
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-client] (ecmascript)");
;
class ApiRequestError extends Error {
    status;
    code;
    constructor(message, status, code){
        super(message);
        this.name = "ApiRequestError";
        this.status = status;
        this.code = code;
    }
}
async function request(path, options = {}) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"]}${path}`, {
        method: options.method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...options.token ? {
                Authorization: `Bearer ${options.token}`
            } : {}
        },
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: options.signal,
        cache: "no-store"
    });
    const payload = await response.json().catch(()=>null);
    if (!response.ok || !payload || payload.code !== 0) {
        throw new ApiRequestError(payload?.message || "Request failed", response.status, payload?.code || response.status);
    }
    return payload.data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/auth/api/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMe",
    ()=>getMe,
    "login",
    ()=>login
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-client] (ecmascript)");
;
function login(payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/auth/login", {
        method: "POST",
        body: payload
    });
}
function getMe(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/auth/me", {
        token
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
    ()=>sendConversationMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-client] (ecmascript)");
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
function sendConversationMessage(token, conversationId, content) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/chat/messages", {
        method: "POST",
        token,
        body: {
            conversation_id: conversationId,
            content
        }
    });
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
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/api/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/assistant/api/chat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const DEFAULT_LOGIN_FORM = {
    identifier: "",
    password: ""
};
function readStoredUser() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const raw = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser);
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
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
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeConversationId, setActiveConversationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [messageDraft, setMessageDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [presence, setPresence] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("offline");
    const [isBootstrapping, setIsBootstrapping] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoggingIn, setIsLoggingIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSending, setIsSending] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDrawerOpen, setIsDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loginForm, setLoginForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_LOGIN_FORM);
    const audioRunIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const persistSession = (nextToken, nextUser)=>{
        window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken, nextToken);
        window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser, JSON.stringify(nextUser));
        setToken(nextToken);
        setCurrentUser(nextUser);
    };
    const clearSession = ()=>{
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken);
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].refreshToken);
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser);
        setToken(null);
        setCurrentUser(null);
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
    const bootstrapWithToken = async (nextToken)=>{
        setIsBootstrapping(true);
        setErrorMessage(null);
        try {
            const me = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])(nextToken);
            persistSession(nextToken, me);
            await ensureConversation(nextToken);
            setPresence("idle");
        } catch (error) {
            clearSession();
            setErrorMessage(error instanceof Error ? error.message : "Assistant workspace bootstrap failed");
        } finally{
            setIsBootstrapping(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAssistantChat.useEffect": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            const savedToken = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken);
            const savedUser = readStoredUser();
            if (!savedToken) {
                setCurrentUser(savedUser);
                setIsBootstrapping(false);
                return;
            }
            if (savedUser) {
                setCurrentUser(savedUser);
            }
            void bootstrapWithToken(savedToken);
        }
    }["useAssistantChat.useEffect"], []);
    const handleLoginSubmit = async ()=>{
        if (!loginForm.identifier.trim() || !loginForm.password.trim()) {
            setErrorMessage("Enter username or email, then password");
            return;
        }
        setIsLoggingIn(true);
        setErrorMessage(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])({
                identifier: loginForm.identifier.trim(),
                password: loginForm.password,
                remember_me: true
            });
            window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].refreshToken, result.token.refresh_token);
            persistSession(result.token.access_token, result.user);
            await ensureConversation(result.token.access_token);
            setPresence("idle");
            setLoginForm(DEFAULT_LOGIN_FORM);
        } catch (error) {
            setPresence("error");
            setErrorMessage(error instanceof Error ? error.message : "Login failed, check the backend");
        } finally{
            setIsLoggingIn(false);
            setIsBootstrapping(false);
        }
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
            setErrorMessage(error instanceof Error ? error.message : "Failed to load conversation messages");
        }
    };
    const handleCreateConversation = async ()=>{
        if (!token) {
            setErrorMessage("Log in before creating a new conversation");
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
            setErrorMessage(error instanceof Error ? error.message : "Failed to create conversation");
        }
    };
    const handleSendMessage = async ()=>{
        if (!token) {
            setErrorMessage("Log in before sending a message");
            return;
        }
        const content = messageDraft.trim();
        if (!content || isSending) {
            return;
        }
        setIsSending(true);
        setErrorMessage(null);
        setPresence("thinking");
        try {
            const conversationId = activeConversationId || await ensureConversation(token);
            const userMessage = buildUserMessage(conversationId, content);
            setMessages((current)=>[
                    ...current,
                    userMessage
                ]);
            setMessageDraft("");
            const reply = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendConversationMessage"])(token, conversationId, content);
            const assistantMessage = {
                id: reply.message_id,
                conversation_id: conversationId,
                role: "assistant",
                content: reply.content,
                audio_url: reply.audio_url,
                duration_ms: reply.duration_ms,
                created_at: reply.created_at
            };
            setMessages((current)=>[
                    ...current,
                    assistantMessage
                ]);
            const refreshedConversations = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$api$2f$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listAssistantConversations"])(token);
            setConversations(refreshedConversations.items);
            setActiveConversationId(conversationId);
            if (assistantMessage.audio_url) {
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
            } else {
                setPresence("idle");
            }
        } catch (error) {
            setPresence("error");
            if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiRequestError"] && error.status === 401) {
                clearSession();
            }
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
        } finally{
            setIsSending(false);
        }
    };
    const handleLogout = ()=>{
        clearSession();
        setLoginForm(DEFAULT_LOGIN_FORM);
        setErrorMessage(null);
    };
    return {
        token,
        currentUser,
        conversations,
        activeConversationId,
        messages,
        messageDraft,
        setMessageDraft,
        presence,
        isBootstrapping,
        isLoggingIn,
        isSending,
        isDrawerOpen,
        setIsDrawerOpen,
        errorMessage,
        loginForm,
        setLoginForm,
        handleLoginSubmit,
        handleConversationSelect,
        handleCreateConversation,
        handleSendMessage,
        handleLogout
    };
}
_s(useAssistantChat, "mRiNY1KSN74YphhK/4t6yY4lwvo=");
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
                    const availableWidth = width * 0.82;
                    const availableHeight = height * 0.94;
                    const scale = Math.min(availableWidth / safeWidth, availableHeight / safeHeight);
                    model.scale.set(scale);
                    model.pivot.set(bounds.x + safeWidth / 2, bounds.y + safeHeight);
                    model.position.set(width * 0.56, height * 0.98);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$hooks$2f$use$2d$assistant$2d$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/assistant/hooks/use-assistant-chat.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$components$2f$live2d$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/assistant/components/live2d-avatar.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const PRESENCE_LABEL = {
    offline: "Offline",
    idle: "Idle",
    thinking: "Thinking",
    speaking: "Speaking",
    error: "Error"
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
    const { token, currentUser, conversations, activeConversationId, messages, messageDraft, setMessageDraft, presence, isBootstrapping, isLoggingIn, isSending, isDrawerOpen, setIsDrawerOpen, errorMessage, loginForm, setLoginForm, handleLoginSubmit, handleConversationSelect, handleCreateConversation, handleSendMessage, handleLogout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$hooks$2f$use$2d$assistant$2d$chat$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAssistantChat"])();
    const statusText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AssistantWorkspace.useMemo[statusText]": ()=>PRESENCE_LABEL[presence] ?? "Idle"
    }["AssistantWorkspace.useMemo[statusText]"], [
        presence
    ]);
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
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "eyebrow",
                                                children: "Assistant Console"
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 67,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "section-title",
                                                children: "Conversation History"
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 68,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 66,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button-secondary assistant-small-button",
                                        type: "button",
                                        onClick: handleCreateConversation,
                                        disabled: !token,
                                        children: "New Conversation"
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-login-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-login-copy",
                                        children: token && currentUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-name",
                                                    children: currentUser.full_name || currentUser.username
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-meta",
                                                    children: "Connected to backend chat APIs."
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-name",
                                                    children: "Connect Backend"
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "assistant-user-meta",
                                                    children: "Sign in here to fetch a token and load conversations."
                                                }, void 0, false, {
                                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                    lineNumber: 94,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, this),
                                    token && currentUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button-secondary assistant-full-button",
                                        type: "button",
                                        onClick: handleLogout,
                                        children: "Disconnect"
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 102,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-login-form",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "field-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "field-label",
                                                        children: "Username or Email"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 112,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "field-input",
                                                        type: "text",
                                                        value: loginForm.identifier,
                                                        onChange: (event)=>setLoginForm((current)=>({
                                                                    ...current,
                                                                    identifier: event.target.value
                                                                })),
                                                        placeholder: "Enter identifier"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 113,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 111,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "field-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "field-label",
                                                        children: "Password"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "field-input",
                                                        type: "password",
                                                        value: loginForm.password,
                                                        onChange: (event)=>setLoginForm((current)=>({
                                                                    ...current,
                                                                    password: event.target.value
                                                                })),
                                                        placeholder: "Enter password"
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
                                                onClick: handleLoginSubmit,
                                                disabled: isLoggingIn,
                                                children: isLoggingIn ? "Signing in..." : "Connect Backend"
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 143,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-conversation-list",
                                children: conversations.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "assistant-empty-card",
                                    children: isBootstrapping ? "Bootstrapping conversations..." : "No conversations yet"
                                }, void 0, false, {
                                    fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this) : conversations.map((conversation, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `assistant-conversation-item${conversation.id === activeConversationId ? " is-active" : ""}`,
                                        type: "button",
                                        onClick: ()=>handleConversationSelect(conversation.id),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-conversation-title",
                                                children: [
                                                    "Conversation ",
                                                    String(index + 1).padStart(2, "0")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 172,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-conversation-meta",
                                                children: formatTime(conversation.updated_at)
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 175,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-conversation-id",
                                                children: conversation.id
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 178,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, conversation.id, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 164,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "assistant-main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "assistant-board-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "eyebrow",
                                                children: "AI Tutor Workspace"
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 188,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "page-title",
                                                children: "Digital Human & AI Course Desk"
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 189,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "page-description",
                                                children: "This page is wired to backend login, conversation creation, conversation list, message send, and message history APIs. The digital human currently enters as a side drawer so the main chat workspace keeps its width."
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 190,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-status-panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `assistant-status-dot is-${presence}`
                                            }, void 0, false, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 199,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "assistant-status-title",
                                                        children: "Digital Human State"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 201,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "assistant-status-value",
                                                        children: statusText
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 200,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-error-banner",
                                children: errorMessage
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-chat-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-chat-scroll",
                                        children: messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "assistant-empty-chat",
                                            children: token ? "Ask about the current chapter to start the conversation." : "Connect a backend account from the left side first."
                                        }, void 0, false, {
                                            fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                            lineNumber: 214,
                                            columnNumber: 17
                                        }, this) : messages.map((message)=>{
                                            const isAssistant = message.role === "assistant";
                                            const speakerName = isAssistant ? "AI Tutor" : currentUser?.full_name || currentUser?.username || "Learner";
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
                                                                lineNumber: 234,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "assistant-message-time",
                                                                children: formatTime(message.created_at)
                                                            }, void 0, false, {
                                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                                lineNumber: 237,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "assistant-message-body",
                                                        children: message.content
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 242,
                                                        columnNumber: 23
                                                    }, this),
                                                    message.audio_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        className: "assistant-audio-link",
                                                        href: message.audio_url,
                                                        target: "_blank",
                                                        rel: "noreferrer",
                                                        children: "Open Audio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 25
                                                    }, this) : null
                                                ]
                                            }, message.id, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 227,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 212,
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
                                                        children: "Learner Prompt"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        className: "assistant-textarea",
                                                        value: messageDraft,
                                                        onChange: (event)=>setMessageDraft(event.target.value),
                                                        placeholder: "Ask a question about the current chapter",
                                                        disabled: !token || isSending
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 261,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "assistant-composer-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "assistant-composer-tip",
                                                        children: "API: `POST /api/v1/chat/messages`"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "button-primary",
                                                        type: "button",
                                                        onClick: handleSendMessage,
                                                        disabled: !token || isSending,
                                                        children: isSending ? "Sending..." : "Send Message"
                                                    }, void 0, false, {
                                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                        lineNumber: 276,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                                lineNumber: 272,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "assistant-drawer-trigger",
                type: "button",
                onClick: ()=>setIsDrawerOpen((current)=>!current),
                children: isDrawerOpen ? "Hide Avatar" : "Show Avatar"
            }, void 0, false, {
                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            isDrawerOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "assistant-drawer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "assistant-drawer-head",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "eyebrow",
                                        children: "Digital Human"
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 302,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "assistant-drawer-title",
                                        children: "Digital Human Drawer"
                                    }, void 0, false, {
                                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-secondary assistant-small-button",
                                type: "button",
                                onClick: ()=>setIsDrawerOpen(false),
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 305,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `assistant-avatar-stage is-${presence}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$assistant$2f$components$2f$live2d$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Live2DAvatar"], {
                                presence: presence
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "assistant-avatar-caption",
                                children: statusText
                            }, void 0, false, {
                                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "assistant-drawer-note",
                        children: "The drawer now mounts the Haru-2 model and reacts to the current assistant state. It uses local Cubism Core plus browser-loaded PIXI and pixi-live2d-display."
                    }, void 0, false, {
                        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                        lineNumber: 319,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
                lineNumber: 299,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/features/assistant/components/assistant-workspace.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(AssistantWorkspace, "SKYcej16KCztoAiUWWekKBQQz60=", false, function() {
    return [
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
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=_dba86236._.js.map