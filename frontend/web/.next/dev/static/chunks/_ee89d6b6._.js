(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/features/training/api/training.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminTrainingCaseConfig",
    ()=>createAdminTrainingCaseConfig,
    "fetchAdminTrainingCaseConfig",
    ()=>fetchAdminTrainingCaseConfig,
    "fetchAdminTrainingCases",
    ()=>fetchAdminTrainingCases,
    "fetchNegotiationOptions",
    ()=>fetchNegotiationOptions,
    "fetchNegotiationSuppliers",
    ()=>fetchNegotiationSuppliers,
    "fetchTrainingCaseBySlug",
    ()=>fetchTrainingCaseBySlug,
    "fetchTrainingCaseDetail",
    ()=>fetchTrainingCaseDetail,
    "fetchTrainingCases",
    ()=>fetchTrainingCases,
    "fetchTrainingReport",
    ()=>fetchTrainingReport,
    "fetchTrainingStep",
    ()=>fetchTrainingStep,
    "fetchTrainingSuppliers",
    ()=>fetchTrainingSuppliers,
    "publishAdminTrainingCase",
    ()=>publishAdminTrainingCase,
    "savePurchaseQuote",
    ()=>savePurchaseQuote,
    "sendNegotiationMessage",
    ()=>sendNegotiationMessage,
    "submitNegotiationResult",
    ()=>submitNegotiationResult,
    "submitTrainingStep",
    ()=>submitTrainingStep,
    "unpublishAdminTrainingCase",
    ()=>unpublishAdminTrainingCase,
    "updateAdminTrainingCaseConfig",
    ()=>updateAdminTrainingCaseConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/http.ts [app-client] (ecmascript)");
;
function fetchTrainingCases(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/training/cases", {
        token
    });
}
function fetchTrainingCaseDetail(caseId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}`, {
        token
    });
}
function fetchTrainingCaseBySlug(slug, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/slug/${slug}`, {
        token
    });
}
function fetchTrainingSuppliers(caseId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/suppliers`, {
        token
    });
}
function fetchTrainingStep(caseId, step, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/steps/${step}`, {
        token
    });
}
function fetchNegotiationSuppliers(caseId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/negotiation/suppliers`, {
        token
    });
}
function fetchNegotiationOptions(caseId, roundNo, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/negotiation/options?round_no=${roundNo}`, {
        token
    });
}
function submitNegotiationResult(caseId, payload, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/negotiation/submit`, {
        method: "POST",
        token,
        body: payload
    });
}
function submitTrainingStep(caseId, step, answers, timeSpentSeconds, token, extra) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/steps/${step}/submit`, {
        method: "POST",
        token,
        body: {
            answers,
            time_spent_seconds: timeSpentSeconds,
            ...extra
        }
    });
}
function sendNegotiationMessage(caseId, content, token, conversationId, supplierId) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/negotiate`, {
        method: "POST",
        token,
        body: {
            conversation_id: conversationId,
            content,
            supplier_id: supplierId
        }
    });
}
function fetchTrainingReport(caseId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/report`, {
        token
    });
}
function savePurchaseQuote(caseId, payload, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/cases/${caseId}/purchase-quote`, {
        method: "POST",
        token,
        body: payload
    });
}
function fetchAdminTrainingCases(token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/training/admin/cases", {
        token
    });
}
function fetchAdminTrainingCaseConfig(caseId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/admin/cases/${caseId}`, {
        token
    });
}
function createAdminTrainingCaseConfig(config, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])("/training/admin/cases", {
        method: "POST",
        token,
        body: config
    });
}
function updateAdminTrainingCaseConfig(caseId, config, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/admin/cases/${caseId}`, {
        method: "PUT",
        token,
        body: config
    });
}
function publishAdminTrainingCase(caseId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/admin/cases/${caseId}/publish`, {
        method: "POST",
        token
    });
}
function unpublishAdminTrainingCase(caseId, token) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["request"])(`/training/admin/cases/${caseId}/unpublish`, {
        method: "POST",
        token
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/(platform)/training/admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrainingAdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/training/api/training.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const DEFAULT_QUOTE_SPECS = [
    {
        orderIndex: 1,
        fieldKey: "brix",
        label: "糖度要求",
        value: "65",
        unit: "Brix",
        requirementType: "quality",
        inputType: "number",
        numericMin: 65,
        isRequired: true
    },
    {
        orderIndex: 2,
        fieldKey: "preservative",
        label: "防腐剂要求",
        value: "no_artificial",
        requirementType: "compliance",
        inputType: "select",
        expectedValue: "no_artificial",
        options: [
            {
                label: "不得使用人工防腐剂",
                value: "no_artificial"
            },
            {
                label: "允许使用合规防腐剂",
                value: "allowed_legal"
            },
            {
                label: "未明确限制",
                value: "not_specified"
            }
        ],
        isRequired: true
    },
    {
        orderIndex: 3,
        fieldKey: "food_standard",
        label: "执行标准",
        value: "gb2760",
        requirementType: "compliance",
        inputType: "select",
        expectedValue: "gb2760",
        options: [
            {
                label: "符合 GB 2760",
                value: "gb2760"
            },
            {
                label: "按供应商企业标准",
                value: "supplier_standard"
            },
            {
                label: "未明确执行标准",
                value: "not_specified"
            }
        ],
        isRequired: true
    },
    {
        orderIndex: 4,
        fieldKey: "certification",
        label: "供应商认证",
        value: "haccp_iso22000_valid",
        requirementType: "qualification",
        inputType: "select",
        expectedValue: "haccp_iso22000_valid",
        options: [
            {
                label: "HACCP 与 ISO22000 均在有效期内",
                value: "haccp_iso22000_valid"
            },
            {
                label: "仅 HACCP 有效",
                value: "haccp_only"
            },
            {
                label: "仅 ISO22000 有效",
                value: "iso22000_only"
            }
        ],
        isRequired: true
    },
    {
        orderIndex: 5,
        fieldKey: "inspection_documents",
        label: "验收资料",
        value: "coa_test_production_date",
        requirementType: "document",
        inputType: "select",
        expectedValue: "coa_test_production_date",
        options: [
            {
                label: "COA、批次检测报告和生产日期记录",
                value: "coa_test_production_date"
            },
            {
                label: "仅提供 COA",
                value: "coa_only"
            },
            {
                label: "到货后按需补充资料",
                value: "provide_on_request"
            }
        ],
        isRequired: true
    },
    {
        orderIndex: 6,
        fieldKey: "shelf_life",
        label: "保质与追溯",
        value: "",
        unit: "%",
        requirementType: "traceability",
        inputType: "number",
        numericMin: 67,
        numericMax: 100,
        isRequired: true
    }
];
const DEFAULT_CASE = {
    slug: "strawberry_jam",
    title: "草莓果酱采购寻源实训",
    category: "food",
    difficulty: 2,
    status: "draft",
    total_steps: 5,
    max_attempts: 4,
    background: "公司计划采购草莓果酱用于新品草莓夹心饼干。研发要求糖度不低于 65 Brix，不得使用人工防腐剂，供应商需要同时具备 HACCP 与 ISO22000 认证。",
    objective: "完成需求分析、市场寻源、商务谈判、采购报价单和决策复盘。",
    cover_image_url: "/static/training/training1.png",
    scoring_weights: {
        sourcing: 0.25,
        negotiation: 0.5,
        quote: 0.25
    },
    case_config: {
        scenario: "strawberry_jam"
    },
    suppliers: [],
    negotiation_suppliers: [],
    negotiation_options: [],
    steps: [
        {
            step: 1,
            step_key: "demand_analysis",
            title: "需求分析",
            interaction_type: "case_brief",
            sort_order: 1,
            is_required: true
        },
        {
            step: 2,
            step_key: "market_sourcing",
            title: "市场寻源",
            interaction_type: "supplier_map_select",
            sort_order: 2,
            is_required: true
        },
        {
            step: 3,
            step_key: "negotiation",
            title: "商务谈判",
            interaction_type: "scripted_negotiation",
            sort_order: 3,
            is_required: true
        },
        {
            step: 4,
            step_key: "purchase_quote",
            title: "采购报价单",
            interaction_type: "purchase_quote",
            sort_order: 4,
            is_required: true,
            form_schema: {
                specs: DEFAULT_QUOTE_SPECS
            }
        },
        {
            step: 5,
            step_key: "review",
            title: "决策复盘",
            interaction_type: "report",
            sort_order: 5,
            is_required: false
        }
    ]
};
const EMPTY_SUPPLIER = {
    code: "",
    name: "",
    location: "",
    certifications: [],
    capacity: "",
    brief: "",
    price_text: "",
    risk_note: "",
    latitude: 35,
    longitude: 105,
    image_url: "",
    is_candidate: true,
    is_qualified: false,
    is_recommended: false,
    sort_order: 1,
    profile: {}
};
const EMPTY_NEGOTIATION_OPTION = {
    round_no: 1,
    ask: "",
    answer: "",
    affect_field: "price",
    delta_value: 0,
    sort_order: 1
};
function toNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}
function csvToList(value) {
    return value.split(/[,，]/).map((item)=>item.trim()).filter(Boolean);
}
function listToCsv(value) {
    return Array.isArray(value) ? value.join("，") : "";
}
function normalizeConfig(config) {
    const step4 = config.steps?.find((step)=>step.step === 4);
    return {
        ...DEFAULT_CASE,
        ...config,
        suppliers: config.suppliers ?? [],
        negotiation_suppliers: config.negotiation_suppliers ?? [],
        negotiation_options: config.negotiation_options ?? [],
        steps: config.steps?.length ? config.steps : DEFAULT_CASE.steps,
        case_config: config.case_config ?? {},
        cover_image_url: config.cover_image_url ?? "",
        ...step4?.form_schema ? {} : {}
    };
}
function stripIds(items) {
    return (items ?? []).map(({ id: _id, ...item })=>item);
}
function cleanForSave(config) {
    return {
        ...config,
        id: undefined,
        suppliers: stripIds(config.suppliers),
        negotiation_suppliers: stripIds(config.negotiation_suppliers),
        negotiation_options: stripIds(config.negotiation_options),
        steps: stripIds(config.steps)
    };
}
function getQuoteSpecs(draft) {
    const step4 = draft.steps.find((step)=>step.step === 4);
    const specs = step4?.form_schema?.specs;
    return specs?.length ? specs : DEFAULT_QUOTE_SPECS;
}
function TrainingAdminPage() {
    _s();
    const { token, currentUser, isAuthenticated, isAuthReady, openAuthModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [cases, setCases] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_CASE);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSaving, setIsSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showJson, setShowJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const canManage = currentUser?.role === "teacher" || currentUser?.role === "admin";
    const quoteSpecs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TrainingAdminPage.useMemo[quoteSpecs]": ()=>getQuoteSpecs(draft)
    }["TrainingAdminPage.useMemo[quoteSpecs]"], [
        draft
    ]);
    const loadCases = async ()=>{
        if (!token) return;
        setIsLoading(true);
        setMessage(null);
        try {
            const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAdminTrainingCases"])(token);
            setCases(data);
            setSelectedId((current)=>current ?? data[0]?.id ?? null);
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "案例列表加载失败。");
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrainingAdminPage.useEffect": ()=>{
            if (token && canManage) void loadCases();
        }
    }["TrainingAdminPage.useEffect"], [
        token,
        canManage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrainingAdminPage.useEffect": ()=>{
            if (!token || !selectedId || !canManage) return;
            setIsLoading(true);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchAdminTrainingCaseConfig"])(selectedId, token).then({
                "TrainingAdminPage.useEffect": (config)=>setDraft(normalizeConfig(config))
            }["TrainingAdminPage.useEffect"]).catch({
                "TrainingAdminPage.useEffect": (error)=>setMessage(error instanceof Error ? error.message : "配置加载失败。")
            }["TrainingAdminPage.useEffect"]).finally({
                "TrainingAdminPage.useEffect": ()=>setIsLoading(false)
            }["TrainingAdminPage.useEffect"]);
        }
    }["TrainingAdminPage.useEffect"], [
        token,
        selectedId,
        canManage
    ]);
    const updateDraft = (key, value)=>{
        setDraft((current)=>({
                ...current,
                [key]: value
            }));
    };
    const updateSupplier = (index, patch)=>{
        setDraft((current)=>({
                ...current,
                suppliers: current.suppliers.map((supplier, i)=>i === index ? {
                        ...supplier,
                        ...patch
                    } : supplier)
            }));
    };
    const updateNegotiationSupplier = (index, patch)=>{
        setDraft((current)=>({
                ...current,
                negotiation_suppliers: (current.negotiation_suppliers ?? []).map((supplier, i)=>i === index ? {
                        ...supplier,
                        ...patch
                    } : supplier)
            }));
    };
    const updateNegotiationOption = (index, patch)=>{
        setDraft((current)=>({
                ...current,
                negotiation_options: (current.negotiation_options ?? []).map((option, i)=>i === index ? {
                        ...option,
                        ...patch
                    } : option)
            }));
    };
    const updateStep = (index, patch)=>{
        setDraft((current)=>({
                ...current,
                steps: current.steps.map((step, i)=>i === index ? {
                        ...step,
                        ...patch
                    } : step)
            }));
    };
    const updateQuoteSpec = (index, patch)=>{
        setDraft((current)=>({
                ...current,
                steps: current.steps.map((step)=>{
                    if (step.step !== 4) return step;
                    const currentSpecs = step.form_schema?.specs ?? DEFAULT_QUOTE_SPECS;
                    return {
                        ...step,
                        form_schema: {
                            ...step.form_schema ?? {},
                            specs: currentSpecs.map((spec, i)=>i === index ? {
                                    ...spec,
                                    ...patch
                                } : spec)
                        }
                    };
                })
            }));
    };
    const createTemplate = ()=>{
        setSelectedId(null);
        setDraft({
            ...DEFAULT_CASE,
            slug: `${DEFAULT_CASE.slug}_${Date.now().toString().slice(-5)}`,
            suppliers: [],
            negotiation_suppliers: [],
            negotiation_options: [],
            steps: DEFAULT_CASE.steps.map((step)=>({
                    ...step
                }))
        });
        setMessage("已创建新模板，编辑后保存。");
    };
    const save = async ()=>{
        if (!token) return;
        setIsSaving(true);
        setMessage(null);
        try {
            const payload = cleanForSave(draft);
            const saved = selectedId ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAdminTrainingCaseConfig"])(selectedId, payload, token) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createAdminTrainingCaseConfig"])(payload, token);
            await loadCases();
            setSelectedId(saved.id ?? null);
            setDraft(normalizeConfig(saved));
            setMessage("配置已保存。");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "保存失败。");
        } finally{
            setIsSaving(false);
        }
    };
    const publish = async (nextPublished)=>{
        if (!token || !selectedId) return;
        setIsSaving(true);
        try {
            const saved = nextPublished ? await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publishAdminTrainingCase"])(selectedId, token) : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unpublishAdminTrainingCase"])(selectedId, token);
            setDraft(normalizeConfig(saved));
            await loadCases();
            setMessage(nextPublished ? "案例已发布。" : "案例已下线为草稿。");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "状态更新失败。");
        } finally{
            setIsSaving(false);
        }
    };
    if (isAuthReady && !isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "training-admin-page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "training-admin-lock",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "eyebrow",
                        children: "Training Admin"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "page-title",
                        children: "实训配置后台"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 382,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "page-description",
                        children: "登录教师或管理员账号后，可以维护实训案例。"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button-primary",
                        type: "button",
                        onClick: ()=>openAuthModal({
                                mode: "login",
                                reason: "进入实训配置后台前，请先登录。"
                            }),
                        children: "登录后进入后台"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 384,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                lineNumber: 380,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(platform)/training/admin/page.tsx",
            lineNumber: 379,
            columnNumber: 7
        }, this);
    }
    if (isAuthReady && !canManage) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "training-admin-page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "training-admin-lock",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "eyebrow",
                        children: "Training Admin"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 396,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "page-title",
                        children: "权限不足"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 397,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "page-description",
                        children: "当前账号不是 teacher/admin，不能维护实训配置。"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 398,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                lineNumber: 395,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(platform)/training/admin/page.tsx",
            lineNumber: 394,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "training-admin-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "training-admin-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "eyebrow",
                                children: "Training Admin"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "page-title",
                                children: "实训配置后台"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 409,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "page-description",
                                children: "维护案例、地图供应商、谈判脚本、报价单规格和五步流程。"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 410,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "training-admin-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-secondary",
                                type: "button",
                                onClick: createTemplate,
                                children: "新建模板"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 413,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "button",
                                onClick: save,
                                disabled: isSaving,
                                children: isSaving ? "保存中..." : "保存配置"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 414,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                lineNumber: 406,
                columnNumber: 7
            }, this),
            message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "training-admin-message",
                children: message
            }, void 0, false, {
                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                lineNumber: 418,
                columnNumber: 18
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "training-admin-layout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "training-admin-list",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "training-section-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "section-title",
                                        children: "案例列表"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "training-meta",
                                        children: isLoading ? "加载中" : `${cases.length} 个`
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            cases.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `training-admin-case${item.id === selectedId ? " is-active" : ""}`,
                                    type: "button",
                                    onClick: ()=>setSelectedId(item.id),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                            lineNumber: 433,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                item.slug || `case-${item.id}`,
                                                " · ",
                                                item.status || "draft"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                            lineNumber: 434,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                    lineNumber: 427,
                                    columnNumber: 13
                                }, this)),
                            cases.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "training-empty",
                                children: "暂无案例，可先新建模板。"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 437,
                                columnNumber: 33
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "training-admin-form",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "training-admin-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-card-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "基础信息"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "学生端案例说明、配图和流程控制使用这些配置。"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 445,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 443,
                                                columnNumber: 15
                                            }, this),
                                            selectedId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "training-admin-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "route-link",
                                                        type: "button",
                                                        onClick: ()=>void publish(true),
                                                        disabled: isSaving,
                                                        children: "发布"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "route-link",
                                                        type: "button",
                                                        onClick: ()=>void publish(false),
                                                        disabled: isSaving,
                                                        children: "下线"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 450,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 448,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 442,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "training-admin-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "案例名称"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: draft.title,
                                                        onChange: (event)=>updateDraft("title", event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 72
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 455,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "training-admin-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "业务 slug"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: draft.slug ?? "",
                                                        onChange: (event)=>updateDraft("slug", event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 456,
                                                        columnNumber: 75
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 456,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "training-admin-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "配图地址"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: draft.cover_image_url ?? "",
                                                        onChange: (event)=>updateDraft("cover_image_url", event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 72
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 457,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "training-admin-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "分类"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: draft.category,
                                                        onChange: (event)=>updateDraft("category", event.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 458,
                                                        columnNumber: 70
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 458,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "training-admin-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "难度"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: 1,
                                                        max: 5,
                                                        value: draft.difficulty,
                                                        onChange: (event)=>updateDraft("difficulty", toNumber(event.target.value, 1))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 459,
                                                        columnNumber: 70
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 459,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "training-admin-field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "步骤数"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 55
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        min: 1,
                                                        value: draft.total_steps,
                                                        onChange: (event)=>updateDraft("total_steps", toNumber(event.target.value, 5))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 460,
                                                        columnNumber: 71
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 460,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 454,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "training-admin-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "案例背景"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 53
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: draft.background ?? "",
                                                onChange: (event)=>updateDraft("background", event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 462,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 462,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "training-admin-field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "教学目标"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 463,
                                                columnNumber: 53
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: draft.objective ?? "",
                                                onChange: (event)=>updateDraft("objective", event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 463,
                                                columnNumber: 70
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 463,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "training-admin-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-card-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "Step 02 地图供应商"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 469,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "学生会在地图上看到候选供应商。合格字段用于自动评分。"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 468,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button-secondary",
                                                type: "button",
                                                onClick: ()=>updateDraft("suppliers", [
                                                        ...draft.suppliers,
                                                        {
                                                            ...EMPTY_SUPPLIER,
                                                            sort_order: draft.suppliers.length + 1
                                                        }
                                                    ]),
                                                children: "添加供应商"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 472,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 467,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-supplier-list",
                                        children: draft.suppliers.map((supplier, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "training-admin-supplier",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "training-admin-card-head",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: supplier.code || `供应商 ${index + 1}`
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 484,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "route-link",
                                                                type: "button",
                                                                onClick: ()=>updateDraft("suppliers", draft.suppliers.filter((_, i)=>i !== index)),
                                                                children: "删除"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 485,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 483,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "training-admin-grid",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "编号"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.code ?? "",
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                code: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 488,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 488,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "名称"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.name,
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                name: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 489,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 489,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "所在地"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.location ?? "",
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                location: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 77
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 490,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "认证，逗号分隔"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: listToCsv(supplier.certifications),
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                certifications: csvToList(event.target.value)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 491,
                                                                        columnNumber: 81
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 491,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "产能"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 492,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.capacity ?? "",
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                capacity: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 492,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 492,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "报价文本"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.price_text ?? "",
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                price_text: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 493,
                                                                        columnNumber: 78
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 493,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "纬度"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 494,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: supplier.latitude ?? "",
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                latitude: toNumber(event.target.value)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 494,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 494,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "经度"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 495,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: supplier.longitude ?? "",
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                longitude: toNumber(event.target.value)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 495,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "图片地址"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.image_url ?? "",
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                image_url: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 496,
                                                                        columnNumber: 78
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 487,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "training-admin-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "简介"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 59
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: supplier.brief ?? "",
                                                                onChange: (event)=>updateSupplier(index, {
                                                                        brief: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 498,
                                                                columnNumber: 74
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "training-admin-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "risk_note 字段"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 59
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: supplier.risk_note ?? "",
                                                                onChange: (event)=>updateSupplier(index, {
                                                                        risk_note: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 499,
                                                                columnNumber: 84
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 499,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "training-admin-checks",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        checked: supplier.is_candidate ?? true,
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                is_candidate: event.target.checked
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 501,
                                                                        columnNumber: 28
                                                                    }, this),
                                                                    " 候选供应商"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 501,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        checked: supplier.is_qualified ?? false,
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                is_qualified: event.target.checked
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 502,
                                                                        columnNumber: 28
                                                                    }, this),
                                                                    " 合格供应商"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 502,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "checkbox",
                                                                        checked: supplier.is_recommended ?? false,
                                                                        onChange: (event)=>updateSupplier(index, {
                                                                                is_recommended: event.target.checked
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 503,
                                                                        columnNumber: 28
                                                                    }, this),
                                                                    " 推荐/标准答案"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 503,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `${supplier.code}-${index}`, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 482,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 480,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 466,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "training-admin-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-card-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "Step 03 谈判初始条款"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 513,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "通常与 Step 02 的供应商编号一致。学生选哪家，就取哪家的初始条款。"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 512,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button-secondary",
                                                type: "button",
                                                onClick: ()=>updateDraft("negotiation_suppliers", [
                                                        ...draft.negotiation_suppliers ?? [],
                                                        {
                                                            supplier_code: "",
                                                            supplier_name: "",
                                                            init_price: 0,
                                                            init_payment_days: 30,
                                                            init_warranty_months: 12
                                                        }
                                                    ]),
                                                children: "添加谈判供应商"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 516,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 511,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-supplier-list",
                                        children: (draft.negotiation_suppliers ?? []).map((supplier, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "training-admin-supplier",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "training-admin-grid",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "供应商编号"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 533,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.supplier_code,
                                                                        onChange: (event)=>updateNegotiationSupplier(index, {
                                                                                supplier_code: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 533,
                                                                        columnNumber: 79
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 533,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "供应商名称"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 534,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: supplier.supplier_name,
                                                                        onChange: (event)=>updateNegotiationSupplier(index, {
                                                                                supplier_name: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 534,
                                                                        columnNumber: 79
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 534,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "初始单价"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 535,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: supplier.init_price,
                                                                        onChange: (event)=>updateNegotiationSupplier(index, {
                                                                                init_price: toNumber(event.target.value)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 535,
                                                                        columnNumber: 78
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 535,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "初始账期"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 536,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: supplier.init_payment_days,
                                                                        onChange: (event)=>updateNegotiationSupplier(index, {
                                                                                init_payment_days: toNumber(event.target.value, 30)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 536,
                                                                        columnNumber: 78
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 536,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "初始质保月数"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 537,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: supplier.init_warranty_months,
                                                                        onChange: (event)=>updateNegotiationSupplier(index, {
                                                                                init_warranty_months: toNumber(event.target.value, 12)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 537,
                                                                        columnNumber: 80
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "route-link",
                                                        type: "button",
                                                        onClick: ()=>updateDraft("negotiation_suppliers", (draft.negotiation_suppliers ?? []).filter((_, i)=>i !== index)),
                                                        children: "删除"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 539,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `${supplier.supplier_code}-${index}`, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 531,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 529,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 510,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "training-admin-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-card-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "Step 03 谈判选项"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 548,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "所有供应商共用同一套话术。每轮建议配置 3 个选项。"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 549,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 547,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button-secondary",
                                                type: "button",
                                                onClick: ()=>updateDraft("negotiation_options", [
                                                        ...draft.negotiation_options ?? [],
                                                        {
                                                            ...EMPTY_NEGOTIATION_OPTION
                                                        }
                                                    ]),
                                                children: "添加选项"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 551,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 546,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-step-list",
                                        children: (draft.negotiation_options ?? []).map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "training-admin-step",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "training-admin-grid",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "轮次"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: option.round_no,
                                                                        onChange: (event)=>updateNegotiationOption(index, {
                                                                                round_no: toNumber(event.target.value, 1)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 563,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 563,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "顺序"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 564,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: option.sort_order,
                                                                        onChange: (event)=>updateNegotiationOption(index, {
                                                                                sort_order: toNumber(event.target.value, 1)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 564,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 564,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "影响字段"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 565,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: option.affect_field,
                                                                        onChange: (event)=>updateNegotiationOption(index, {
                                                                                affect_field: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "price",
                                                                                children: "价格"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                                lineNumber: 565,
                                                                                columnNumber: 205
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "payment_days",
                                                                                children: "账期"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                                lineNumber: 565,
                                                                                columnNumber: 238
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "warranty_months",
                                                                                children: "质保"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                                lineNumber: 565,
                                                                                columnNumber: 278
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 565,
                                                                        columnNumber: 78
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 565,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "变化值"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 566,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        step: "0.1",
                                                                        value: option.delta_value,
                                                                        onChange: (event)=>updateNegotiationOption(index, {
                                                                                delta_value: toNumber(event.target.value)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 566,
                                                                        columnNumber: 77
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 566,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "training-admin-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "学生话术"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 568,
                                                                columnNumber: 59
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: option.ask,
                                                                onChange: (event)=>updateNegotiationOption(index, {
                                                                        ask: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 568,
                                                                columnNumber: 76
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "training-admin-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "供应商回应"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 569,
                                                                columnNumber: 59
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: option.answer,
                                                                onChange: (event)=>updateNegotiationOption(index, {
                                                                        answer: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 569,
                                                                columnNumber: 77
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "route-link",
                                                        type: "button",
                                                        onClick: ()=>updateDraft("negotiation_options", (draft.negotiation_options ?? []).filter((_, i)=>i !== index)),
                                                        children: "删除"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `${option.round_no}-${index}`, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 561,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 559,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 545,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "training-admin-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "section-title",
                                        children: "Step 04 报价单规格"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 577,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-step-list",
                                        children: quoteSpecs.map((spec, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "training-admin-step",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "training-admin-grid",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "序号"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: spec.orderIndex,
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                orderIndex: toNumber(event.target.value, index + 1)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 582,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 582,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "字段 key"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: spec.fieldKey,
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                fieldKey: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 583,
                                                                        columnNumber: 80
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 583,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "名称"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 584,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: spec.label,
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                label: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 584,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 584,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "控件类型"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: spec.inputType,
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                inputType: event.target.value
                                                                            }),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "number",
                                                                                children: "数字"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                                lineNumber: 585,
                                                                                columnNumber: 221
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "select",
                                                                                children: "单选"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                                lineNumber: 585,
                                                                                columnNumber: 255
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: "text",
                                                                                children: "文本"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                                lineNumber: 585,
                                                                                columnNumber: 289
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 585,
                                                                        columnNumber: 78
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 585,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "默认值"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: spec.value,
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                value: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 586,
                                                                        columnNumber: 77
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "正确值"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 587,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: spec.expectedValue ?? "",
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                expectedValue: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 587,
                                                                        columnNumber: 77
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 587,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "最小值"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 588,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: spec.numericMin ?? "",
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                numericMin: event.target.value ? toNumber(event.target.value) : undefined
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 588,
                                                                        columnNumber: 77
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 588,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "最大值"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 589,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: spec.numericMax ?? "",
                                                                        onChange: (event)=>updateQuoteSpec(index, {
                                                                                numericMax: event.target.value ? toNumber(event.target.value) : undefined
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 589,
                                                                        columnNumber: 77
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 589,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 581,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "training-admin-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "单选项 JSON"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 592,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: JSON.stringify(spec.options ?? [], null, 2),
                                                                onChange: (event)=>{
                                                                    try {
                                                                        updateQuoteSpec(index, {
                                                                            options: JSON.parse(event.target.value)
                                                                        });
                                                                    } catch  {
                                                                        setMessage("单选项 JSON 格式不正确。");
                                                                    }
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 593,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `${spec.fieldKey}-${index}`, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 580,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 578,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 576,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "training-admin-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "section-title",
                                        children: "五步流程"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 610,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "training-admin-step-list",
                                        children: draft.steps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "training-admin-step",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "training-admin-grid",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "步骤"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 615,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        value: step.step,
                                                                        onChange: (event)=>updateStep(index, {
                                                                                step: toNumber(event.target.value, index + 1)
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 615,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 615,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "标题"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 616,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: step.title,
                                                                        onChange: (event)=>updateStep(index, {
                                                                                title: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 616,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 616,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "training-admin-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "类型"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 617,
                                                                        columnNumber: 61
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        value: step.interaction_type ?? "",
                                                                        onChange: (event)=>updateStep(index, {
                                                                                interaction_type: event.target.value
                                                                            })
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                        lineNumber: 617,
                                                                        columnNumber: 76
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 617,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 614,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "training-admin-field",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "步骤说明"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 619,
                                                                columnNumber: 59
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                value: step.scene_description ?? "",
                                                                onChange: (event)=>updateStep(index, {
                                                                        scene_description: event.target.value
                                                                    })
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                                lineNumber: 619,
                                                                columnNumber: 76
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                        lineNumber: 619,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, `${step.step}-${index}`, true, {
                                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                                lineNumber: 613,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 611,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 609,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "training-admin-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button-secondary",
                                        type: "button",
                                        onClick: ()=>setShowJson((current)=>!current),
                                        children: showJson ? "收起完整 JSON" : "查看完整 JSON"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 626,
                                        columnNumber: 13
                                    }, this),
                                    showJson ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        className: "training-admin-json",
                                        value: JSON.stringify(draft, null, 2),
                                        readOnly: true,
                                        spellCheck: false
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                        lineNumber: 629,
                                        columnNumber: 25
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                                lineNumber: 625,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/admin/page.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/training/admin/page.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(platform)/training/admin/page.tsx",
        lineNumber: 405,
        columnNumber: 5
    }, this);
}
_s(TrainingAdminPage, "lWOSqWw0+8WAtAF8MNaB26XWkjc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = TrainingAdminPage;
var _c;
__turbopack_context__.k.register(_c, "TrainingAdminPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_ee89d6b6._.js.map