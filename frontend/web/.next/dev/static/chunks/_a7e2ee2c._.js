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
    sessionChanged: "supplychain:session-changed",
    sessionExpired: "supplychain:session-expired"
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
    "notifySessionExpired",
    ()=>notifySessionExpired,
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
const AUTH_EXPIRED_CODES = new Set([
    401,
    40101,
    40102,
    40103
]);
function notifySessionExpired() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    window.dispatchEvent(new Event(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionExpired));
}
function isAuthExpired(status, code) {
    return status === 401 || AUTH_EXPIRED_CODES.has(code);
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
        const code = payload?.code || response.status;
        if (isAuthExpired(response.status, code)) {
            notifySessionExpired();
        }
        throw new ApiRequestError(payload?.message || "Request failed", response.status, code);
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
    ()=>login,
    "register",
    ()=>register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-client] (ecmascript)");
;
function login(payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/auth/login", {
        method: "POST",
        body: payload
    });
}
function register(payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/auth/register", {
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
"[project]/features/auth/lib/session.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearSession",
    ()=>clearSession,
    "persistSession",
    ()=>persistSession,
    "readSession",
    ()=>readSession,
    "readStoredUser",
    ()=>readStoredUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-client] (ecmascript)");
;
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
function readSession() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return {
        token: window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken),
        user: readStoredUser()
    };
}
function persistSession(token, user, refreshToken) {
    window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken, token);
    window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser, JSON.stringify(user));
    if (refreshToken) {
        window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].refreshToken, refreshToken);
    }
    window.dispatchEvent(new Event(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged));
}
function clearSession() {
    window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken);
    window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].refreshToken);
    window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser);
    window.dispatchEvent(new Event(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/auth/components/auth-access-panel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthAccessPanel",
    ()=>AuthAccessPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const DEFAULT_LOGIN_FORM = {
    identifier: "",
    password: ""
};
const DEFAULT_REGISTER_FORM = {
    username: "",
    email: "",
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: ""
};
function AuthAccessPanel({ variant = "page", initialMode = "login", reason, onSuccess, onCancel, showSkipLink = true }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { loginWithCredentials, registerAndLogin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    const [loginForm, setLoginForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_LOGIN_FORM);
    const [registerForm, setRegisterForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_REGISTER_FORM);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const panelTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthAccessPanel.useMemo[panelTitle]": ()=>{
            if (mode === "register") {
                return "创建学习账号";
            }
            return variant === "modal" ? "登录后继续操作" : "登录 / 注册";
        }
    }["AuthAccessPanel.useMemo[panelTitle]"], [
        mode,
        variant
    ]);
    const panelCopy = mode === "register" ? "注册后会直接进入平台，后续即可继续提问 AI、打开知识图谱和进入实训。" : "游客可以先跳过浏览课程界面；当你准备提问 AI、打开知识图谱或进入受限功能时，再登录即可。";
    const handleSkip = ()=>{
        router.push("/overview");
    };
    const handleLogin = async ()=>{
        if (!loginForm.identifier.trim() || !loginForm.password.trim()) {
            setErrorMessage("请输入账号和密码。");
            return;
        }
        setIsSubmitting(true);
        setErrorMessage(null);
        try {
            await loginWithCredentials({
                identifier: loginForm.identifier.trim(),
                password: loginForm.password,
                remember_me: true
            });
            onSuccess?.();
            if (variant === "page") {
                router.push("/overview");
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "登录失败，请稍后重试。");
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleRegister = async ()=>{
        if (!registerForm.username.trim() || !registerForm.email.trim() || !registerForm.password || !registerForm.confirmPassword) {
            setErrorMessage("请先补齐用户名、邮箱和密码。");
            return;
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            setErrorMessage("两次输入的密码不一致。");
            return;
        }
        setIsSubmitting(true);
        setErrorMessage(null);
        try {
            await registerAndLogin({
                username: registerForm.username.trim(),
                email: registerForm.email.trim(),
                password: registerForm.password,
                full_name: registerForm.fullName.trim() || undefined,
                phone: registerForm.phone.trim() || undefined
            });
            onSuccess?.();
            if (variant === "page") {
                router.push("/overview");
            }
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "注册失败，请稍后重试。");
        } finally{
            setIsSubmitting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `auth-panel auth-panel-${variant}`,
        "aria-label": "认证面板",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-panel-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "eyebrow",
                                children: "Authentication"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "panel-title",
                                children: panelTitle
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    variant === "modal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button-ghost",
                        type: "button",
                        onClick: onCancel,
                        children: "关闭"
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 154,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-switch",
                role: "tablist",
                "aria-label": "认证模式",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `auth-switch-item${mode === "login" ? " is-active" : ""}`,
                        type: "button",
                        role: "tab",
                        "aria-selected": mode === "login",
                        onClick: ()=>{
                            setMode("login");
                            setErrorMessage(null);
                        },
                        children: "登录"
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `auth-switch-item${mode === "register" ? " is-active" : ""}`,
                        type: "button",
                        role: "tab",
                        "aria-selected": mode === "register",
                        onClick: ()=>{
                            setMode("register");
                            setErrorMessage(null);
                        },
                        children: "注册"
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            reason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-reason",
                children: reason
            }, void 0, false, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 187,
                columnNumber: 17
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "body-copy",
                children: panelCopy
            }, void 0, false, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            mode === "login" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "form-stack",
                onSubmit: (event)=>{
                    event.preventDefault();
                    void handleLogin();
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "用户名或邮箱"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "field-input",
                                type: "text",
                                value: loginForm.identifier,
                                onChange: (event)=>setLoginForm((current)=>({
                                            ...current,
                                            identifier: event.target.value
                                        })),
                                placeholder: "请输入用户名或邮箱"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 198,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "密码"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 215,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "field-input",
                                type: "password",
                                value: loginForm.password,
                                onChange: (event)=>setLoginForm((current)=>({
                                            ...current,
                                            password: event.target.value
                                        })),
                                placeholder: "请输入密码"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this),
                    errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-error",
                        children: errorMessage
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 230,
                        columnNumber: 27
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "actions-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "submit",
                                disabled: isSubmitting,
                                children: isSubmitting ? "登录中..." : "登录并继续"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, this),
                            showSkipLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-secondary",
                                type: "button",
                                onClick: handleSkip,
                                children: "先跳过"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 237,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 191,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "form-stack",
                onSubmit: (event)=>{
                    event.preventDefault();
                    void handleRegister();
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "用户名"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 252,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "field-input",
                                type: "text",
                                value: registerForm.username,
                                onChange: (event)=>setRegisterForm((current)=>({
                                            ...current,
                                            username: event.target.value
                                        })),
                                placeholder: "3-32 位字母、数字或下划线"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 253,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "邮箱"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "field-input",
                                type: "email",
                                value: registerForm.email,
                                onChange: (event)=>setRegisterForm((current)=>({
                                            ...current,
                                            email: event.target.value
                                        })),
                                placeholder: "用于登录和找回账号"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "姓名"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 284,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "field-input",
                                type: "text",
                                value: registerForm.fullName,
                                onChange: (event)=>setRegisterForm((current)=>({
                                            ...current,
                                            fullName: event.target.value
                                        })),
                                placeholder: "可选"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 283,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "手机号"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "field-input",
                                type: "tel",
                                value: registerForm.phone,
                                onChange: (event)=>setRegisterForm((current)=>({
                                            ...current,
                                            phone: event.target.value
                                        })),
                                placeholder: "可选，11 位手机号"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 301,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 299,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-form-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "field-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "field-label",
                                        children: "密码"
                                    }, void 0, false, {
                                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                        lineNumber: 317,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "field-input",
                                        type: "password",
                                        value: registerForm.password,
                                        onChange: (event)=>setRegisterForm((current)=>({
                                                    ...current,
                                                    password: event.target.value
                                                })),
                                        placeholder: "至少 8 位，包含大小写和数字"
                                    }, void 0, false, {
                                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                        lineNumber: 318,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 316,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "field-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "field-label",
                                        children: "确认密码"
                                    }, void 0, false, {
                                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "field-input",
                                        type: "password",
                                        value: registerForm.confirmPassword,
                                        onChange: (event)=>setRegisterForm((current)=>({
                                                    ...current,
                                                    confirmPassword: event.target.value
                                                })),
                                        placeholder: "再次输入密码"
                                    }, void 0, false, {
                                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                        lineNumber: 334,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 332,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 315,
                        columnNumber: 11
                    }, this),
                    errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-error",
                        children: errorMessage
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 349,
                        columnNumber: 27
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "actions-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "submit",
                                disabled: isSubmitting,
                                children: isSubmitting ? "注册中..." : "注册并进入平台"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this),
                            showSkipLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "button-secondary",
                                href: "/overview",
                                children: "先跳过"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 356,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
_s(AuthAccessPanel, "nsGfFIQKn0LtpbO+lFeOmruljbY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AuthAccessPanel;
var _c;
__turbopack_context__.k.register(_c, "AuthAccessPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/features/auth/components/auth-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/api/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/lib/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$access$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-access-panel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthModal({ isOpen, mode, reason, onClose }) {
    if (!isOpen) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-modal-backdrop",
        role: "presentation",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "auth-modal-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "登录或注册",
            onClick: (event)=>event.stopPropagation(),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$access$2d$panel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthAccessPanel"], {
                variant: "modal",
                initialMode: mode,
                reason: reason,
                onSuccess: onClose,
                onCancel: onClose,
                showSkipLink: false
            }, void 0, false, {
                fileName: "[project]/features/auth/components/auth-provider.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/features/auth/components/auth-provider.tsx",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/features/auth/components/auth-provider.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_c = AuthModal;
function AuthProvider({ children }) {
    _s();
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthReady, setIsAuthReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalState, setModalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        mode: "login",
        reason: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            let validationRunId = 0;
            let isMounted = true;
            const syncSession = {
                "AuthProvider.useEffect.syncSession": ()=>{
                    const runId = ++validationRunId;
                    const nextSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["readSession"])();
                    if (!nextSession.token || !nextSession.user) {
                        setToken(null);
                        setCurrentUser(null);
                        setIsAuthReady(true);
                        return;
                    }
                    setIsAuthReady(false);
                    void (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getMe"])(nextSession.token).then({
                        "AuthProvider.useEffect.syncSession": (user)=>{
                            if (!isMounted || validationRunId !== runId) {
                                return;
                            }
                            setToken(nextSession.token);
                            setCurrentUser(user);
                            setIsAuthReady(true);
                        }
                    }["AuthProvider.useEffect.syncSession"]).catch({
                        "AuthProvider.useEffect.syncSession": ()=>{
                            if (!isMounted || validationRunId !== runId) {
                                return;
                            }
                            setToken(null);
                            setCurrentUser(null);
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
                            setIsAuthReady(true);
                        }
                    }["AuthProvider.useEffect.syncSession"]);
                }
            }["AuthProvider.useEffect.syncSession"];
            const expireSession = {
                "AuthProvider.useEffect.expireSession": ()=>{
                    validationRunId += 1;
                    setToken(null);
                    setCurrentUser(null);
                    setIsAuthReady(true);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
                    setModalState({
                        "AuthProvider.useEffect.expireSession": (current)=>({
                                ...current,
                                isOpen: false,
                                reason: null
                            })
                    }["AuthProvider.useEffect.expireSession"]);
                }
            }["AuthProvider.useEffect.expireSession"];
            syncSession();
            window.addEventListener("storage", syncSession);
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged, syncSession);
            window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionExpired, expireSession);
            return ({
                "AuthProvider.useEffect": ()=>{
                    isMounted = false;
                    window.removeEventListener("storage", syncSession);
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged, syncSession);
                    window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionExpired, expireSession);
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], []);
    const openAuthModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[openAuthModal]": (options)=>{
            setModalState({
                isOpen: true,
                mode: options?.mode ?? "login",
                reason: options?.reason ?? null
            });
        }
    }["AuthProvider.useCallback[openAuthModal]"], []);
    const closeAuthModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[closeAuthModal]": ()=>{
            setModalState({
                "AuthProvider.useCallback[closeAuthModal]": (current)=>({
                        ...current,
                        isOpen: false,
                        reason: null
                    })
            }["AuthProvider.useCallback[closeAuthModal]"]);
        }
    }["AuthProvider.useCallback[closeAuthModal]"], []);
    const loginWithCredentials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[loginWithCredentials]": async (payload)=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["login"])(payload);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["persistSession"])(result.token.access_token, result.user, result.token.refresh_token);
            setToken(result.token.access_token);
            setCurrentUser(result.user);
        }
    }["AuthProvider.useCallback[loginWithCredentials]"], []);
    const registerAndLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[registerAndLogin]": async (payload)=>{
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["register"])(payload);
            await loginWithCredentials({
                identifier: payload.username,
                password: payload.password,
                remember_me: true
            });
        }
    }["AuthProvider.useCallback[registerAndLogin]"], [
        loginWithCredentials
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[logout]": ()=>{
            setToken(null);
            setCurrentUser(null);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearSession"])();
            closeAuthModal();
        }
    }["AuthProvider.useCallback[logout]"], [
        closeAuthModal
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AuthProvider.useMemo[value]": ()=>({
                token,
                currentUser,
                isAuthenticated: Boolean(token && currentUser),
                isAuthReady,
                modalState,
                openAuthModal,
                closeAuthModal,
                loginWithCredentials,
                registerAndLogin,
                logout
            })
    }["AuthProvider.useMemo[value]"], [
        token,
        currentUser,
        isAuthReady,
        modalState,
        openAuthModal,
        closeAuthModal,
        loginWithCredentials,
        registerAndLogin,
        logout
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {
                isOpen: modalState.isOpen,
                mode: modalState.mode,
                reason: modalState.reason,
                onClose: closeAuthModal
            }, void 0, false, {
                fileName: "[project]/features/auth/components/auth-provider.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/auth/components/auth-provider.tsx",
        lineNumber: 232,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "sMp4L/gKvoD5DRdutrH/gTX0Shg=");
_c1 = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c, _c1;
__turbopack_context__.k.register(_c, "AuthModal");
__turbopack_context__.k.register(_c1, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_a7e2ee2c._.js.map