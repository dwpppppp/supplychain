module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lib/constants/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
const DEFAULT_API_BASE_URL = "http://127.0.0.1:8000/api/v1";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || DEFAULT_API_BASE_URL;
const STORAGE_KEYS = {
    accessToken: "supplychain.access_token",
    refreshToken: "supplychain.refresh_token",
    currentUser: "supplychain.current_user"
};
const APP_EVENTS = {
    sessionChanged: "supplychain:session-changed",
    sessionExpired: "supplychain:session-expired"
};
}),
"[project]/lib/api/http.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiRequestError",
    ()=>ApiRequestError,
    "notifySessionExpired",
    ()=>notifySessionExpired,
    "request",
    ()=>request
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-ssr] (ecmascript)");
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
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
}
function isAuthExpired(status, code) {
    return status === 401 || AUTH_EXPIRED_CODES.has(code);
}
async function request(path, options = {}) {
    const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_BASE_URL"]}${path}`, {
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
}),
"[project]/features/auth/api/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMe",
    ()=>getMe,
    "login",
    ()=>login,
    "register",
    ()=>register
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-ssr] (ecmascript)");
;
function login(payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/auth/login", {
        method: "POST",
        body: payload
    });
}
function register(payload) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/auth/register", {
        method: "POST",
        body: payload
    });
}
function getMe(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["request"])("/auth/me", {
        token
    });
}
}),
"[project]/features/auth/lib/session.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-ssr] (ecmascript)");
;
function readStoredUser() {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
    const raw = undefined;
}
function readSession() {
    if ("TURBOPACK compile-time truthy", 1) {
        return {
            token: null,
            user: null
        };
    }
    //TURBOPACK unreachable
    ;
}
function persistSession(token, user, refreshToken) {
    window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken, token);
    window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser, JSON.stringify(user));
    if (refreshToken) {
        window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].refreshToken, refreshToken);
    }
    window.dispatchEvent(new Event(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged));
}
function clearSession() {
    window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken);
    window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].refreshToken);
    window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser);
    window.dispatchEvent(new Event(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged));
}
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/features/auth/components/auth-access-panel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthAccessPanel",
    ()=>AuthAccessPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-ssr] (ecmascript)");
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
const DEFAULT_REGISTER_FORM = {
    username: "",
    email: "",
    fullName: "",
    phone: "",
    password: "",
    confirmPassword: ""
};
function AuthAccessPanel({ variant = "page", initialMode = "login", reason, onSuccess, onCancel, showSkipLink = true }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { loginWithCredentials, registerAndLogin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    const [loginForm, setLoginForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_LOGIN_FORM);
    const [registerForm, setRegisterForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_REGISTER_FORM);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const panelTitle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (mode === "register") {
            return "创建学习账号";
        }
        return variant === "modal" ? "登录后继续操作" : "登录 / 注册";
    }, [
        mode,
        variant
    ]);
    const panelCopy = mode === "register" ? "创建学习账号后，即可保存课程进度、AI 对话和实训记录。" : "登录后可继续课程学习，并同步保存你的学习进度、提问记录和实训结果。";
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: `auth-panel auth-panel-${variant}`,
        "aria-label": "认证面板",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-panel-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "panel-title",
                            children: panelTitle
                        }, void 0, false, {
                            fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    variant === "modal" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button-ghost",
                        type: "button",
                        onClick: onCancel,
                        children: "关闭"
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 153,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-switch",
                role: "tablist",
                "aria-label": "认证模式",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            reason ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "auth-reason",
                children: reason
            }, void 0, false, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 186,
                columnNumber: 17
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "body-copy",
                children: panelCopy
            }, void 0, false, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            mode === "login" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "form-stack",
                onSubmit: (event)=>{
                    event.preventDefault();
                    void handleLogin();
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "用户名或邮箱"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 199,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "密码"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 214,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 215,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-error",
                        children: errorMessage
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 229,
                        columnNumber: 27
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "actions-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "submit",
                                disabled: isSubmitting,
                                children: isSubmitting ? "登录中..." : "登录并继续"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 232,
                                columnNumber: 13
                            }, this),
                            showSkipLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-secondary",
                                type: "button",
                                onClick: handleSkip,
                                children: "先跳过"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 236,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 231,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 190,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "form-stack",
                onSubmit: (event)=>{
                    event.preventDefault();
                    void handleRegister();
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "用户名"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 252,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "邮箱"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 267,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 266,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "姓名"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 284,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field-group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "field-label",
                                children: "手机号"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                lineNumber: 300,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 298,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-form-grid",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "field-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "field-label",
                                        children: "密码"
                                    }, void 0, false, {
                                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 317,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 315,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "field-group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "field-label",
                                        children: "确认密码"
                                    }, void 0, false, {
                                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                        lineNumber: 333,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 331,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 314,
                        columnNumber: 11
                    }, this),
                    errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-error",
                        children: errorMessage
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 348,
                        columnNumber: 27
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "actions-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "submit",
                                disabled: isSubmitting,
                                children: isSubmitting ? "注册中..." : "注册并进入平台"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            showSkipLink ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                className: "button-secondary",
                                href: "/overview",
                                children: "先跳过"
                            }, void 0, false, {
                                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                                lineNumber: 355,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 243,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "auth-legal-note",
                children: [
                    "登录或注册即表示你已阅读并同意",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/terms",
                        children: "《用户协议》"
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 365,
                        columnNumber: 9
                    }, this),
                    "和",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/privacy",
                        children: "《隐私政策》"
                    }, void 0, false, {
                        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                        lineNumber: 367,
                        columnNumber: 9
                    }, this),
                    "。"
                ]
            }, void 0, true, {
                fileName: "[project]/features/auth/components/auth-access-panel.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/auth/components/auth-access-panel.tsx",
        lineNumber: 146,
        columnNumber: 5
    }, this);
}
}),
"[project]/features/auth/components/auth-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/api/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/lib/session.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$access$2d$panel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-access-panel.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(null);
function AuthModal({ isOpen, mode, reason, onClose }) {
    if (!isOpen) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "auth-modal-backdrop",
        role: "presentation",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "auth-modal-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "登录或注册",
            onClick: (event)=>event.stopPropagation(),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$access$2d$panel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthAccessPanel"], {
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
function AuthProvider({ children }) {
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isAuthReady, setIsAuthReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [modalState, setModalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isOpen: false,
        mode: "login",
        reason: null
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let validationRunId = 0;
        let isMounted = true;
        const syncSession = ()=>{
            const runId = ++validationRunId;
            const nextSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["readSession"])();
            if (!nextSession.token || !nextSession.user) {
                setToken(null);
                setCurrentUser(null);
                setIsAuthReady(true);
                return;
            }
            setIsAuthReady(false);
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getMe"])(nextSession.token).then((user)=>{
                if (!isMounted || validationRunId !== runId) {
                    return;
                }
                setToken(nextSession.token);
                setCurrentUser(user);
                setIsAuthReady(true);
            }).catch(()=>{
                if (!isMounted || validationRunId !== runId) {
                    return;
                }
                setToken(null);
                setCurrentUser(null);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearSession"])();
                setIsAuthReady(true);
            });
        };
        const expireSession = ()=>{
            validationRunId += 1;
            setToken(null);
            setCurrentUser(null);
            setIsAuthReady(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearSession"])();
            setModalState((current)=>({
                    ...current,
                    isOpen: false,
                    reason: null
                }));
        };
        syncSession();
        window.addEventListener("storage", syncSession);
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged, syncSession);
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionExpired, expireSession);
        return ()=>{
            isMounted = false;
            window.removeEventListener("storage", syncSession);
            window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged, syncSession);
            window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionExpired, expireSession);
        };
    }, []);
    const openAuthModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((options)=>{
        setModalState({
            isOpen: true,
            mode: options?.mode ?? "login",
            reason: options?.reason ?? null
        });
    }, []);
    const closeAuthModal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setModalState((current)=>({
                ...current,
                isOpen: false,
                reason: null
            }));
    }, []);
    const loginWithCredentials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (payload)=>{
        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["login"])(payload);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persistSession"])(result.token.access_token, result.user, result.token.refresh_token);
        setToken(result.token.access_token);
        setCurrentUser(result.user);
    }, []);
    const registerAndLogin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (payload)=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$api$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["register"])(payload);
        await loginWithCredentials({
            identifier: payload.username,
            password: payload.password,
            remember_me: true
        });
    }, [
        loginWithCredentials
    ]);
    const logout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setToken(null);
        setCurrentUser(null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$lib$2f$session$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clearSession"])();
        closeAuthModal();
    }, [
        closeAuthModal
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
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
        }), [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {
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
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d26ed07d._.js.map