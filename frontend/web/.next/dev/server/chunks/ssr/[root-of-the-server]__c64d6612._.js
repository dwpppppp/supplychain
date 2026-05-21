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
    sessionChanged: "supplychain:session-changed"
};
}),
"[project]/features/platform/components/platform-session-status.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlatformSessionStatus",
    ()=>PlatformSessionStatus
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
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
function PlatformSessionStatus() {
    const [token, setToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const syncSession = ()=>{
            const nextSession = readSession();
            setToken(nextSession.token);
            setUser(nextSession.user);
        };
        syncSession();
        window.addEventListener("storage", syncSession);
        window.addEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged, syncSession);
        return ()=>{
            window.removeEventListener("storage", syncSession);
            window.removeEventListener(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged, syncSession);
        };
    }, []);
    const handleDisconnect = ()=>{
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].accessToken);
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].refreshToken);
        window.localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].currentUser);
        window.dispatchEvent(new Event(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APP_EVENTS"].sessionChanged));
    };
    if (!token || !user) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            className: "button-secondary",
            href: "/login",
            children: "Login"
        }, void 0, false, {
            fileName: "[project]/features/platform/components/platform-session-status.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "platform-session",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "platform-session-copy",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "platform-session-name",
                        children: user.full_name || user.username
                    }, void 0, false, {
                        fileName: "[project]/features/platform/components/platform-session-status.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "platform-session-meta",
                        children: "Connected to backend chat APIs."
                    }, void 0, false, {
                        fileName: "[project]/features/platform/components/platform-session-status.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/features/platform/components/platform-session-status.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "button-secondary platform-session-button",
                type: "button",
                onClick: handleDisconnect,
                children: "Disconnect"
            }, void 0, false, {
                fileName: "[project]/features/platform/components/platform-session-status.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/features/platform/components/platform-session-status.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c64d6612._.js.map