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
"[project]/app/(platform)/training/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrainingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/auth/components/auth-provider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/features/training/api/training.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/constants/api.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const SupplierLeafletMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/features/training/components/supplier-map.tsx [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.SupplierLeafletMap), {
    loadableGenerated: {
        modules: [
            "[project]/features/training/components/supplier-map.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "jam-map-loading",
            children: "地图加载中..."
        }, void 0, false, {
            fileName: "[project]/app/(platform)/training/page.tsx",
            lineNumber: 29,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0))
});
_c = SupplierLeafletMap;
function InfoIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        focusable: "false",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "12",
                r: "9"
            }, void 0, false, {
                fileName: "[project]/app/(platform)/training/page.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 10v6"
            }, void 0, false, {
                fileName: "[project]/app/(platform)/training/page.tsx",
                lineNumber: 109,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 7.5h.01"
            }, void 0, false, {
                fileName: "[project]/app/(platform)/training/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(platform)/training/page.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c1 = InfoIcon;
const CASE_SLUG = "strawberry_jam";
const CASES = [
    {
        slug: CASE_SLUG,
        title: "草莓果酱采购寻源实训",
        subtitle: "食品原料 · 5 步",
        isImplemented: true
    },
    {
        slug: "motor",
        title: "电机采购寻源实训",
        subtitle: "工业品 · 5 步",
        isImplemented: true
    },
    {
        slug: "dangerous_goods",
        title: "危险品采购寻源实训",
        subtitle: "危化品 · 5 步",
        isImplemented: true
    }
];
const STEPS = [
    {
        id: 1,
        title: "需求分析",
        subtitle: "案例说明"
    },
    {
        id: 2,
        title: "市场寻源",
        subtitle: "单选供应商"
    },
    {
        id: 3,
        title: "商务谈判",
        subtitle: "5 轮选择"
    },
    {
        id: 4,
        title: "采购报价单",
        subtitle: "条款确认"
    },
    {
        id: 5,
        title: "决策复盘",
        subtitle: "结果点评"
    }
];
const FALLBACK_CASE_TEXT = "公司计划采购草莓果酱用于新品草莓夹心饼干。研发要求糖度不低于 65 Brix,不得使用人工防腐剂,供应商需要同时具备 HACCP 与 ISO22000 认证。预计年用量 200 吨,首批到货不超过合同签署后 45 天,采购上限为 29,000 元/吨,含税含运。";
const DEFAULT_SPECS = [
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
const DEFAULT_QUOTE = {
    category: "食品原料",
    itemName: "草莓果酱",
    annualQuantity: "200",
    unit: "吨",
    deliveryCycle: "45",
    quoteValidity: "30",
    taxMode: "含税含运",
    remarks: "供应商需持有 HACCP 与 ISO22000 在期认证,批次质检资料随货提供。",
    specs: DEFAULT_SPECS
};
const DEFAULT_QUOTE_OPTIONS = {
    category: [
        "食品原料",
        "包装材料",
        "工业品"
    ],
    itemName: [
        "草莓果酱",
        "草莓果粒馅",
        "草莓浓缩浆"
    ],
    unit: [
        "吨",
        "千克",
        "箱"
    ]
};
const DEFAULT_RUNTIME_CONFIG = {
    trainingLabel: "草莓果酱寻源实训",
    unitPriceUnit: "kg",
    quoteDefaults: {
        category: DEFAULT_QUOTE.category,
        itemName: DEFAULT_QUOTE.itemName,
        annualQuantity: DEFAULT_QUOTE.annualQuantity,
        unit: DEFAULT_QUOTE.unit,
        deliveryCycle: DEFAULT_QUOTE.deliveryCycle,
        quoteValidity: DEFAULT_QUOTE.quoteValidity,
        taxMode: DEFAULT_QUOTE.taxMode,
        remarks: DEFAULT_QUOTE.remarks
    },
    quoteOptions: DEFAULT_QUOTE_OPTIONS
};
const ASSET_BASE_URL = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$constants$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_BASE_URL"].replace(/\/api\/v1\/?$/, "");
function assetUrl(path) {
    if (!path) return `${ASSET_BASE_URL}/static/training/training1.png`;
    if (/^https?:\/\//.test(path)) return path;
    return `${ASSET_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
function money(value) {
    return `¥${Number(value || 0).toLocaleString("zh-CN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}
function quantity(value) {
    const parsed = Number(value.replace(/[^\d.]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}
function specTemplateFromConfig(stepConfig) {
    const schema = stepConfig?.form_schema;
    if (!schema?.specs?.length) return DEFAULT_SPECS;
    return schema.specs.map((item, index)=>({
            orderIndex: item.orderIndex ?? item.order_index ?? index + 1,
            fieldKey: item.fieldKey ?? item.field_key ?? `spec_${index + 1}`,
            label: item.label ?? `规格 ${index + 1}`,
            value: item.value ?? "",
            unit: item.unit,
            requirementType: item.requirementType ?? item.requirement_type,
            inputType: item.inputType ?? item.input_type ?? "text",
            expectedValue: item.expectedValue ?? item.expected_value,
            numericMin: item.numericMin ?? item.numeric_min,
            numericMax: item.numericMax ?? item.numeric_max,
            options: item.options,
            isRequired: item.isRequired ?? item.is_required ?? true
        }));
}
function toStringArray(value, fallback) {
    return Array.isArray(value) && value.every((item)=>typeof item === "string") ? value : fallback;
}
function getCaseRuntimeConfig(caseDetail) {
    const rawConfig = caseDetail?.case_config ?? {};
    const rawQuoteDefaults = rawConfig.quoteDefaults ?? rawConfig.quote_defaults ?? {};
    const rawQuoteOptions = rawConfig.quoteOptions ?? rawConfig.quote_options ?? {};
    return {
        trainingLabel: String(rawConfig.trainingLabel ?? rawConfig.training_label ?? caseDetail?.title ?? DEFAULT_RUNTIME_CONFIG.trainingLabel),
        unitPriceUnit: String(rawConfig.unitPriceUnit ?? rawConfig.unit_price_unit ?? DEFAULT_RUNTIME_CONFIG.unitPriceUnit),
        quoteDefaults: {
            category: String(rawQuoteDefaults.category ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.category),
            itemName: String(rawQuoteDefaults.itemName ?? rawQuoteDefaults.item_name ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.itemName),
            annualQuantity: String(rawQuoteDefaults.annualQuantity ?? rawQuoteDefaults.annual_quantity ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.annualQuantity),
            unit: String(rawQuoteDefaults.unit ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.unit),
            deliveryCycle: String(rawQuoteDefaults.deliveryCycle ?? rawQuoteDefaults.delivery_cycle ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.deliveryCycle),
            quoteValidity: String(rawQuoteDefaults.quoteValidity ?? rawQuoteDefaults.quote_validity ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.quoteValidity),
            taxMode: String(rawQuoteDefaults.taxMode ?? rawQuoteDefaults.tax_mode ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.taxMode),
            remarks: String(rawQuoteDefaults.remarks ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.remarks)
        },
        quoteOptions: {
            category: toStringArray(rawQuoteOptions.category, DEFAULT_RUNTIME_CONFIG.quoteOptions.category),
            itemName: toStringArray(rawQuoteOptions.itemName ?? rawQuoteOptions.item_name, DEFAULT_RUNTIME_CONFIG.quoteOptions.itemName),
            unit: toStringArray(rawQuoteOptions.unit, DEFAULT_RUNTIME_CONFIG.quoteOptions.unit)
        }
    };
}
function buildQuoteFromCase(caseDetail, stepConfig) {
    const runtimeConfig = getCaseRuntimeConfig(caseDetail);
    return {
        ...runtimeConfig.quoteDefaults,
        specs: specTemplateFromConfig(stepConfig)
    };
}
function scoreQuoteSpecs(specs) {
    const requiredSpecs = specs.filter((spec)=>spec.isRequired);
    if (!requiredSpecs.length) return 100;
    const correctCount = requiredSpecs.filter((spec)=>{
        if (spec.inputType === "number") {
            const value = Number(spec.value);
            if (!Number.isFinite(value)) return false;
            if (spec.numericMin !== undefined && value < spec.numericMin) return false;
            if (spec.numericMax !== undefined && value > spec.numericMax) return false;
            return true;
        }
        if (spec.inputType === "select") {
            return spec.value === spec.expectedValue;
        }
        return String(spec.value).trim().length > 0;
    }).length;
    return Math.round(correctCount / requiredSpecs.length * 1000) / 10;
}
function parsePriceText(priceText) {
    const matched = priceText?.match(/[\d.]+/);
    return matched ? Number(matched[0]) : 0;
}
function createNegotiationState(supplier) {
    const isNegotiationSupplier = "supplier_code" in supplier;
    return {
        supplierCode: isNegotiationSupplier ? supplier.supplier_code : supplier.code ?? "",
        supplierName: isNegotiationSupplier ? supplier.supplier_name : supplier.name,
        round: 1,
        currentPrice: isNegotiationSupplier ? supplier.init_price : parsePriceText(supplier.price_text),
        paymentDays: isNegotiationSupplier ? supplier.init_payment_days : 30,
        warrantyMonths: isNegotiationSupplier ? supplier.init_warranty_months : 12,
        pickedOptionIds: [],
        done: false,
        score: null,
        dimensionScores: {},
        log: []
    };
}
function applyOption(state, option) {
    let currentPrice = state.currentPrice;
    let paymentDays = state.paymentDays;
    let warrantyMonths = state.warrantyMonths;
    const delta = Number(option.delta_value || 0);
    if (option.affect_field === "price") currentPrice = Math.max(0, currentPrice + delta);
    if (option.affect_field === "payment_days") paymentDays = Math.max(0, paymentDays + delta);
    if (option.affect_field === "warranty_months") warrantyMonths = Math.max(0, warrantyMonths + delta);
    const nextPicked = [
        ...state.pickedOptionIds,
        option.id
    ];
    const done = state.round >= 5;
    return {
        ...state,
        currentPrice,
        paymentDays,
        warrantyMonths,
        pickedOptionIds: nextPicked,
        done,
        round: done ? 5 : state.round + 1,
        log: [
            ...state.log,
            {
                round: option.round_no,
                ask: option.ask,
                answer: option.answer,
                price: currentPrice,
                paymentDays,
                warrantyMonths
            }
        ]
    };
}
function TrainingPage() {
    _s();
    const { token, isAuthenticated, isAuthReady, openAuthModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [activeCaseSlug, setActiveCaseSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(CASE_SLUG);
    const [activeStep, setActiveStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [caseDetail, setCaseDetail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [suppliers, setSuppliers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [stepConfig, setStepConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [negotiationSuppliers, setNegotiationSuppliers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [roundOptions, setRoundOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedSupplierCode, setSelectedSupplierCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [sourcingScore, setSourcingScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [negotiation, setNegotiation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [purchaseQuote, setPurchaseQuote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(DEFAULT_QUOTE);
    const [quoteStatus, setQuoteStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [reportScore, setReportScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadError, setLoadError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [maxUnlockedCaseIndex, setMaxUnlockedCaseIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const activeCase = CASES.find((item)=>item.slug === activeCaseSlug) ?? CASES[0];
    const runtimeConfig = getCaseRuntimeConfig(caseDetail);
    const selectedSupplier = suppliers.find((item)=>item.code === selectedSupplierCode) ?? suppliers[0];
    const caseId = caseDetail?.id;
    const isImplementedCase = activeCase.isImplemented;
    const completedFirstCase = maxUnlockedCaseIndex >= 1;
    const quoteTotal = negotiation ? negotiation.currentPrice * quantity(purchaseQuote.annualQuantity) : 0;
    const localFinalScore = Math.round(((sourcingScore ?? 0) * 0.25 + (negotiation?.score ?? 0) * 0.5 + (quoteStatus === "saved" ? 25 : 0)) * 10) / 10;
    const finalScore = reportScore !== null && reportScore <= 100 ? reportScore : localFinalScore;
    const currentOptions = roundOptions.filter((item)=>item.round_no === (negotiation?.round ?? 1));
    const completedSteps = [
        activeStep > 1,
        sourcingScore !== null,
        negotiation?.done,
        activeStep > 4 && quoteStatus === "saved",
        activeStep === 5
    ].filter(Boolean).length;
    const isQuoteComplete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TrainingPage.useMemo[isQuoteComplete]": ()=>[
                purchaseQuote.category,
                purchaseQuote.itemName,
                purchaseQuote.annualQuantity,
                purchaseQuote.deliveryCycle,
                purchaseQuote.quoteValidity,
                ...purchaseQuote.specs.filter({
                    "TrainingPage.useMemo[isQuoteComplete]": (spec)=>spec.isRequired
                }["TrainingPage.useMemo[isQuoteComplete]"]).map({
                    "TrainingPage.useMemo[isQuoteComplete]": (spec)=>spec.value
                }["TrainingPage.useMemo[isQuoteComplete]"])
            ].every({
                "TrainingPage.useMemo[isQuoteComplete]": (value)=>String(value ?? "").trim().length > 0
            }["TrainingPage.useMemo[isQuoteComplete]"])
    }["TrainingPage.useMemo[isQuoteComplete]"], [
        purchaseQuote
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrainingPage.useEffect": ()=>{
            if (!token || !isAuthReady || !isAuthenticated) return;
            const authToken = token;
            let cancelled = false;
            async function loadCase() {
                setLoadError(null);
                setCaseDetail(null);
                setSuppliers([]);
                setNegotiationSuppliers([]);
                setRoundOptions([]);
                setSelectedSupplierCode(null);
                setSourcingScore(null);
                setNegotiation(null);
                setQuoteStatus("idle");
                setReportScore(null);
                try {
                    const detail = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTrainingCaseBySlug"])(activeCaseSlug, authToken);
                    if (cancelled) return;
                    setCaseDetail(detail);
                    const [supplierList, negotiationList, quoteStep] = await Promise.all([
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTrainingSuppliers"])(detail.id, authToken),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNegotiationSuppliers"])(detail.id, authToken),
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTrainingStep"])(detail.id, 4, authToken).catch({
                            "TrainingPage.useEffect.loadCase": ()=>null
                        }["TrainingPage.useEffect.loadCase"])
                    ]);
                    if (cancelled) return;
                    setSuppliers(supplierList);
                    setNegotiationSuppliers(negotiationList);
                    setStepConfig(quoteStep);
                    setPurchaseQuote(buildQuoteFromCase(detail, quoteStep));
                    const defaultSupplier = supplierList.find({
                        "TrainingPage.useEffect.loadCase": (item)=>item.is_qualified
                    }["TrainingPage.useEffect.loadCase"]) ?? supplierList[0];
                    if (defaultSupplier) setSelectedSupplierCode(defaultSupplier.code ?? null);
                } catch  {
                    if (!cancelled) setLoadError("实训数据加载失败，请确认后端和登录状态正常。");
                }
            }
            void loadCase();
            return ({
                "TrainingPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["TrainingPage.useEffect"];
        }
    }["TrainingPage.useEffect"], [
        activeCaseSlug,
        token,
        isAuthReady,
        isAuthenticated
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrainingPage.useEffect": ()=>{
            if (!caseId || !token || !negotiation || negotiation.done) return;
            const authToken = token;
            const activeCaseId = caseId;
            const activeNegotiation = negotiation;
            let cancelled = false;
            async function loadOptions() {
                const options = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchNegotiationOptions"])(activeCaseId, activeNegotiation.round, authToken).catch({
                    "TrainingPage.useEffect.loadOptions": ()=>[]
                }["TrainingPage.useEffect.loadOptions"]);
                if (!cancelled) setRoundOptions(options);
            }
            void loadOptions();
            return ({
                "TrainingPage.useEffect": ()=>{
                    cancelled = true;
                }
            })["TrainingPage.useEffect"];
        }
    }["TrainingPage.useEffect"], [
        caseId,
        token,
        negotiation?.round,
        negotiation?.done
    ]);
    const requireAuth = ()=>{
        openAuthModal({
            mode: "login",
            reason: "进入实训前，请先登录学习账号。"
        });
    };
    const switchCase = (slug)=>{
        if (slug === activeCaseSlug) return;
        setActiveCaseSlug(slug);
        setActiveStep(1);
    };
    const submitDemand = async ()=>{
        if (caseId && token) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitTrainingStep"])(caseId, 1, {
                read_case_brief: true
            }, 20, token, {
                score: 100,
                dimension_scores: {
                    compliance: 20,
                    quality: 20,
                    cost: 20,
                    delivery: 20,
                    negotiation: 20
                },
                result_snapshot: {
                    slug: activeCaseSlug
                }
            }).catch(()=>null);
        }
        setActiveStep(2);
    };
    const submitSourcing = async ()=>{
        if (!selectedSupplier || !caseId || !token) return;
        const score = selectedSupplier.is_qualified ? 100 : 0;
        setSourcingScore(score);
        const dimensions = {
            compliance: score,
            quality: 0,
            cost: 0,
            delivery: 0,
            negotiation: 0
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitTrainingStep"])(caseId, 2, {
            selected_supplier_code: selectedSupplier.code,
            selected_supplier_name: selectedSupplier.name
        }, 60, token, {
            score,
            dimension_scores: dimensions,
            result_snapshot: {
                supplier_code: selectedSupplier.code,
                supplier_name: selectedSupplier.name,
                is_qualified: selectedSupplier.is_qualified,
                risk_note: selectedSupplier.risk_note
            }
        }).catch(()=>null);
        const negotiationSeed = negotiationSuppliers.find((item)=>item.supplier_code === selectedSupplier.code) ?? selectedSupplier;
        setNegotiation(createNegotiationState(negotiationSeed));
        setActiveStep(3);
    };
    const chooseNegotiationOption = async (option)=>{
        if (!negotiation || negotiation.done || negotiation.pickedOptionIds.includes(option.id)) return;
        const next = applyOption(negotiation, option);
        setNegotiation(next);
        if (next.done && caseId && token) {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitNegotiationResult"])(caseId, {
                supplier_code: next.supplierCode,
                picked_option_ids: next.pickedOptionIds,
                final_price: next.currentPrice,
                payment_days: next.paymentDays,
                warranty_months: next.warrantyMonths,
                time_spent_seconds: 180
            }, token).catch(()=>null);
            if (result) {
                setNegotiation({
                    ...next,
                    score: result.score,
                    dimensionScores: result.dimension_scores
                });
            }
        }
    };
    const updatePurchaseQuote = (key, value)=>{
        setPurchaseQuote((current)=>({
                ...current,
                [key]: value
            }));
        setQuoteStatus("idle");
    };
    const updatePurchaseQuoteSpec = (fieldKey, value)=>{
        setPurchaseQuote((current)=>({
                ...current,
                specs: current.specs.map((spec)=>spec.fieldKey === fieldKey ? {
                        ...spec,
                        value
                    } : spec)
            }));
        setQuoteStatus("idle");
    };
    const submitPurchaseQuote = async ()=>{
        if (!caseId || !token || !negotiation || !isQuoteComplete) return;
        setQuoteStatus("saving");
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savePurchaseQuote"])(caseId, {
                category: purchaseQuote.category,
                item_name: purchaseQuote.itemName,
                annual_quantity: purchaseQuote.annualQuantity,
                unit: purchaseQuote.unit,
                delivery_cycle: `合同签署后 ${purchaseQuote.deliveryCycle} 天内首批到货`,
                quote_validity: `${purchaseQuote.quoteValidity} 天`,
                tax_mode: purchaseQuote.taxMode,
                supplier_code: negotiation.supplierCode,
                supplier_name: negotiation.supplierName,
                unit_price: negotiation.currentPrice,
                estimated_total: quoteTotal,
                payment_terms: `${negotiation.paymentDays} 天`,
                warranty_months: negotiation.warrantyMonths,
                remarks: purchaseQuote.remarks,
                specs: purchaseQuote.specs.slice().sort((left, right)=>left.orderIndex - right.orderIndex).map((spec)=>({
                        order_index: spec.orderIndex,
                        field_key: spec.fieldKey,
                        label: spec.label,
                        value: spec.value,
                        unit: spec.unit,
                        requirement_type: spec.requirementType,
                        input_type: spec.inputType,
                        expected_value: spec.expectedValue,
                        numeric_min: spec.numericMin,
                        numeric_max: spec.numericMax,
                        options: spec.options,
                        is_required: spec.isRequired
                    }))
            }, token);
            const quoteScore = scoreQuoteSpecs(purchaseQuote.specs);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["submitTrainingStep"])(caseId, 4, {
                quote_saved: true
            }, 120, token, {
                score: quoteScore,
                dimension_scores: {
                    compliance: quoteScore * 0.4,
                    quality: quoteScore * 0.3,
                    cost: quoteScore * 0.1,
                    delivery: quoteScore * 0.2,
                    negotiation: 0
                },
                result_snapshot: {
                    supplier_code: negotiation.supplierCode,
                    estimated_total: quoteTotal,
                    quote_score: quoteScore
                }
            }).catch(()=>null);
            const report = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$training$2f$api$2f$training$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchTrainingReport"])(caseId, token).catch(()=>null);
            setReportScore(report?.total_score ?? null);
            setQuoteStatus("saved");
            const currentCaseIndex = CASES.findIndex((item)=>item.slug === activeCaseSlug);
            if (currentCaseIndex >= 0) {
                setMaxUnlockedCaseIndex((current)=>Math.max(current, currentCaseIndex + 1));
            }
            setActiveStep(5);
        } catch  {
            setQuoteStatus("error");
        }
    };
    const canOpenStep = (step)=>{
        if (step === 1) return true;
        if (step === 2) return activeStep > 1;
        if (step === 3) return sourcingScore !== null || activeStep >= 3;
        if (step === 4) return Boolean(negotiation?.done) || activeStep >= 4;
        return quoteStatus === "saved" || activeStep === 5;
    };
    if (isAuthReady && !isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "jam-training-page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jam-lock-panel",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "eyebrow",
                        children: "Training Case"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 733,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "page-title",
                        children: "采购寻源模拟实训"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 734,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "page-description",
                        children: "登录后会读取后端案例、供应商、谈判脚本和报价单模板。"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 735,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button-primary",
                        type: "button",
                        onClick: requireAuth,
                        children: "登录后开始实训"
                    }, void 0, false, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 736,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/training/page.tsx",
                lineNumber: 732,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(platform)/training/page.tsx",
            lineNumber: 731,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "jam-training-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "jam-stepper",
                "aria-label": "实训步骤",
                children: STEPS.map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `jam-step${activeStep === step.id ? " is-current" : ""}${activeStep > step.id ? " is-complete" : ""}`,
                        type: "button",
                        disabled: !canOpenStep(step.id),
                        onClick: ()=>canOpenStep(step.id) && setActiveStep(step.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "jam-step-icon",
                                children: step.id
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 755,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: [
                                            "STEP ",
                                            String(step.id).padStart(2, "0")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: step.title
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 73
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: step.subtitle
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 756,
                                        columnNumber: 92
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 756,
                                columnNumber: 13
                            }, this)
                        ]
                    }, step.id, true, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 748,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/(platform)/training/page.tsx",
                lineNumber: 746,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jam-workspace",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "jam-rail",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jam-case-switch-head",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Case Switch"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "案例切换"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 766,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 764,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        children: completedFirstCase ? "unlocked" : "linear"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 768,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 763,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jam-case-switch-list",
                                children: CASES.map((item, index)=>{
                                    const locked = index > maxUnlockedCaseIndex;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: `jam-case-switch-card${activeCaseSlug === item.slug ? " is-active" : ""}`,
                                        disabled: locked,
                                        onClick: ()=>switchCase(item.slug),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jam-case-switch-index",
                                                children: String(index + 1).padStart(2, "0")
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 782,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: locked ? "LOCKED" : item.isImplemented ? "AVAILABLE" : "COMING SOON"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 784,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 785,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: item.subtitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 786,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 783,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, item.slug, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 775,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 771,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 762,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "jam-main",
                        children: [
                            loadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jam-warning",
                                children: loadError
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 795,
                                columnNumber: 24
                            }, this) : null,
                            !isImplementedCase ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jam-step-view",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-section-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "eyebrow",
                                                        children: "Case"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 801,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: activeCase.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 802,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 800,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jam-score-chip",
                                                children: "LOCKED"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 804,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 799,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-empty",
                                        children: "上一个案例完成后解锁下一个案例。"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 806,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 798,
                                columnNumber: 13
                            }, this) : null,
                            isImplementedCase && activeStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jam-step-view",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-section-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "eyebrow",
                                                        children: "Step 01"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 814,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "需求分析 · 阅读案例说明"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 815,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 813,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jam-score-chip",
                                                children: "CASE BRIEF"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 817,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 812,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-case-intro-grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "jam-procurement-doc",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-doc-head",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "PROCUREMENT BRIEF"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 824,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "内部采购需求说明"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 825,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 823,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "CONFIDENTIAL"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 827,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 822,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: caseDetail?.background || FALLBACK_CASE_TEXT
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 829,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 821,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                                                className: "jam-case-figure",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: assetUrl(caseDetail?.cover_image_url),
                                                    alt: `${activeCase.title}案例配图`
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                    lineNumber: 833,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 832,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 820,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 811,
                                columnNumber: 13
                            }, this) : null,
                            isImplementedCase && activeStep === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jam-step-view",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-section-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "eyebrow",
                                                        children: "Step 02"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 843,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "市场寻源 · 在地图中选择 1 家供应商"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 844,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 842,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jam-score-chip",
                                                children: selectedSupplierCode ? "1 / 1 已选" : "未选择"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 846,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 841,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-map-layout",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jam-supplier-map",
                                                "aria-label": "候选供应商地图",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SupplierLeafletMap, {
                                                    suppliers: suppliers,
                                                    selectedSupplierCode: selectedSupplierCode,
                                                    onSelectSupplier: setSelectedSupplierCode
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                    lineNumber: 851,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                                className: "jam-map-detail",
                                                children: selectedSupplier ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        selectedSupplier.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: assetUrl(selectedSupplier.image_url),
                                                            alt: selectedSupplier.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 862,
                                                            columnNumber: 25
                                                        }, this) : null,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "jam-supplier-code",
                                                            children: selectedSupplier.code
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 864,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            children: selectedSupplier.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 865,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                                            className: "jam-summary-list",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                            children: "所在地"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 867,
                                                                            columnNumber: 30
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                            children: selectedSupplier.location || "--"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 867,
                                                                            columnNumber: 42
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                    lineNumber: 867,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                            children: "认证"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 868,
                                                                            columnNumber: 30
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                            children: selectedSupplier.certifications?.join(" / ") || "--"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 868,
                                                                            columnNumber: 41
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                    lineNumber: 868,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                            children: "产能"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 869,
                                                                            columnNumber: 30
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                            children: selectedSupplier.capacity || "--"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 869,
                                                                            columnNumber: 41
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                    lineNumber: 869,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                            children: "报价"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 870,
                                                                            columnNumber: 30
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                            children: selectedSupplier.price_text || "--"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 870,
                                                                            columnNumber: 41
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                    lineNumber: 870,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 866,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "jam-supplier-intro",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "简介"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                    lineNumber: 873,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: selectedSupplier.brief || selectedSupplier.risk_note || "暂无简介。"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                    lineNumber: 874,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 872,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jam-empty",
                                                    children: "请选择地图上的供应商水滴标记。"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                    lineNumber: 878,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 858,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 849,
                                        columnNumber: 15
                                    }, this),
                                    sourcingScore !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-notification",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                children: [
                                                    "寻源评分: ",
                                                    sourcingScore,
                                                    " / 100"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 885,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "系统按供应商资质和风险备注判定；选错仍可继续完成后续流程。"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 886,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 884,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 840,
                                columnNumber: 13
                            }, this) : null,
                            isImplementedCase && activeStep === 3 && negotiation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jam-step-view",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-section-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "eyebrow",
                                                        children: "Step 03"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 896,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "商务谈判 · 5 轮话术选择"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 897,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 895,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jam-score-chip",
                                                children: [
                                                    "Round ",
                                                    negotiation.round,
                                                    " / 5"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 899,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 894,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "jam-negotiation-stage",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jam-stage-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-avatar",
                                                        children: negotiation.supplierCode
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 904,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                children: negotiation.supplierName
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 906,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "当前 ",
                                                                    money(negotiation.currentPrice),
                                                                    " / ",
                                                                    runtimeConfig.unitPriceUnit,
                                                                    " · 账期 ",
                                                                    negotiation.paymentDays,
                                                                    " 天 · 质保 ",
                                                                    negotiation.warrantyMonths,
                                                                    " 个月"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 907,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 905,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-round-pill",
                                                        children: negotiation.done ? "已完成" : `回合 ${negotiation.round}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 909,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 903,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jam-speech",
                                                children: negotiation.log.at(-1)?.answer ?? "请从本轮话术中选择一个谈判动作。已选过的选项会写入谈判记录,最终由后端统一评分。"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 912,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jam-options is-three",
                                                children: currentOptions.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jam-empty",
                                                    children: "本轮谈判选项还没有配置。重启后端会自动补齐当前案例默认选项。"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                    lineNumber: 919,
                                                    columnNumber: 21
                                                }, this) : currentOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        disabled: negotiation.done || negotiation.pickedOptionIds.includes(option.id),
                                                        onClick: ()=>chooseNegotiationOption(option),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "OPTION ",
                                                                    option.sort_order
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 928,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: option.ask
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 929,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, option.id, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 922,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 917,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 902,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "jam-negotiation-log",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jam-log-row is-head",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "回合"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "动作"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 34
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "对方回应"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 49
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "价格"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 66
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "条款"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 938,
                                                        columnNumber: 81
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 937,
                                                columnNumber: 17
                                            }, this),
                                            negotiation.log.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jam-empty",
                                                children: "尚未开始谈判。"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 941,
                                                columnNumber: 19
                                            }, this) : negotiation.log.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jam-log-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "R",
                                                                item.round
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 945,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: item.ask
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 946,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: item.answer
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 947,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: money(item.price)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 948,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                item.paymentDays,
                                                                " 天 / ",
                                                                item.warrantyMonths,
                                                                " 月"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                            lineNumber: 949,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.round, true, {
                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                    lineNumber: 944,
                                                    columnNumber: 21
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 936,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 893,
                                columnNumber: 13
                            }, this) : null,
                            isImplementedCase && activeStep === 4 && negotiation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jam-step-view",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-section-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "eyebrow",
                                                        children: "Step 04"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 961,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "采购报价单 · 填写结构化报价"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 962,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 960,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jam-score-chip",
                                                children: "QUOTE FORM"
                                            }, void 0, false, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 964,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 959,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-quotation-grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "jam-spec-form jam-quotation-form",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-spec-form-head",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "PROCUREMENT QUOTATION"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 971,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "采购报价单"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 972,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 970,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                children: runtimeConfig.trainingLabel
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 974,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 969,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-spec-grid",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "jam-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "采购品类"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 979,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                children: "Category"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 979,
                                                                                columnNumber: 40
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 979,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: purchaseQuote.category,
                                                                        onChange: (event)=>updatePurchaseQuote("category", event.target.value),
                                                                        children: runtimeConfig.quoteOptions.category.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: option,
                                                                                children: option
                                                                            }, option, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 985,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 980,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 978,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "jam-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "物料名称"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 990,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                children: "Item"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 990,
                                                                                columnNumber: 40
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 990,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: purchaseQuote.itemName,
                                                                        onChange: (event)=>updatePurchaseQuote("itemName", event.target.value),
                                                                        children: runtimeConfig.quoteOptions.itemName.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: option,
                                                                                children: option
                                                                            }, option, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 996,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 991,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 989,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "jam-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "年采购量"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1001,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                children: "Qty"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1001,
                                                                                columnNumber: 40
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1001,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "1",
                                                                        step: "1",
                                                                        value: purchaseQuote.annualQuantity,
                                                                        onChange: (event)=>updatePurchaseQuote("annualQuantity", event.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1002,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1000,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "jam-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "计量单位"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1011,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                children: "Unit"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1011,
                                                                                columnNumber: 40
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1011,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                        value: purchaseQuote.unit,
                                                                        onChange: (event)=>updatePurchaseQuote("unit", event.target.value),
                                                                        children: runtimeConfig.quoteOptions.unit.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: option,
                                                                                children: option
                                                                            }, option, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1017,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1012,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1010,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "jam-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "交付要求"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1023,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "jam-field-meta",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                    children: "Lead time"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                    lineNumber: 1025,
                                                                                    columnNumber: 27
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1024,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1022,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "1",
                                                                        step: "1",
                                                                        value: purchaseQuote.deliveryCycle,
                                                                        onChange: (event)=>updatePurchaseQuote("deliveryCycle", event.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1028,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1021,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "jam-field",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: "报价有效期"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1037,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                children: "Validity"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1037,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1037,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "number",
                                                                        min: "1",
                                                                        step: "1",
                                                                        value: purchaseQuote.quoteValidity,
                                                                        onChange: (event)=>updatePurchaseQuote("quoteValidity", event.target.value)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1038,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1036,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jam-spec-detail-list",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jam-spec-detail-head",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: "SPECIFICATIONS"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1049,
                                                                                columnNumber: 25
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                                children: "规格要求明细"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1050,
                                                                                columnNumber: 25
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1048,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    purchaseQuote.specs.slice().sort((left, right)=>left.orderIndex - right.orderIndex).map((spec)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "jam-field",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                            children: [
                                                                                                String(spec.orderIndex).padStart(2, "0"),
                                                                                                " · ",
                                                                                                spec.label
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                            lineNumber: 1058,
                                                                                            columnNumber: 31
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "jam-field-meta",
                                                                                            children: [
                                                                                                spec.fieldKey === "shelf_life" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "jam-help-dot",
                                                                                                    tabIndex: 0,
                                                                                                    children: [
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoIcon, {}, void 0, false, {
                                                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                                            lineNumber: 1062,
                                                                                                            columnNumber: 37
                                                                                                        }, this),
                                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                            className: "jam-help-tip",
                                                                                                            children: "填写到货剩余保质期占总保质期的比例，67 表示不少于 67%。"
                                                                                                        }, void 0, false, {
                                                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                                            lineNumber: 1063,
                                                                                                            columnNumber: 37
                                                                                                        }, this)
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                                    lineNumber: 1061,
                                                                                                    columnNumber: 35
                                                                                                }, this) : null,
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                                    children: spec.unit || spec.requirementType || "Spec"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                                    lineNumber: 1066,
                                                                                                    columnNumber: 33
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                            lineNumber: 1059,
                                                                                            columnNumber: 31
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                    lineNumber: 1057,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                spec.inputType === "select" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                                    value: spec.value,
                                                                                    onChange: (event)=>updatePurchaseQuoteSpec(spec.fieldKey, event.target.value),
                                                                                    children: (spec.options ?? []).map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                            value: option.value,
                                                                                            children: option.label
                                                                                        }, option.value, false, {
                                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                            lineNumber: 1075,
                                                                                            columnNumber: 35
                                                                                        }, this))
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                    lineNumber: 1070,
                                                                                    columnNumber: 31
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                    type: spec.inputType === "number" ? "number" : "text",
                                                                                    min: spec.numericMin,
                                                                                    max: spec.numericMax,
                                                                                    step: spec.fieldKey === "shelf_life" ? "1" : "0.1",
                                                                                    value: spec.value,
                                                                                    onChange: (event)=>updatePurchaseQuoteSpec(spec.fieldKey, event.target.value)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                    lineNumber: 1081,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, spec.fieldKey, true, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 1056,
                                                                            columnNumber: 27
                                                                        }, this))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1047,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 977,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 968,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                                className: "jam-quotation-summary",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-spec-form-head",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "FINAL TERMS"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1100,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                        children: "谈判结果带入"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1101,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1099,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                children: "自动生成"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1103,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1098,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                                        className: "jam-summary-list",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "成交供应商"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1106,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: negotiation.supplierName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1106,
                                                                        columnNumber: 40
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1106,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "成交单价"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1107,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: [
                                                                            money(negotiation.currentPrice),
                                                                            " / ",
                                                                            runtimeConfig.unitPriceUnit
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1107,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1107,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "采购数量"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1108,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: [
                                                                            purchaseQuote.annualQuantity || "--",
                                                                            " ",
                                                                            purchaseQuote.unit
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1108,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1108,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "预计总额"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1109,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: quoteTotal ? money(quoteTotal) : "--"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1109,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "付款账期"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1110,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: [
                                                                            negotiation.paymentDays,
                                                                            " 天"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1110,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1110,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "质保周期"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1111,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: [
                                                                            negotiation.warrantyMonths,
                                                                            " 个月"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1111,
                                                                        columnNumber: 39
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1111,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-notification",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: quoteStatus === "saving" ? "正在保存报价单" : quoteStatus === "saved" ? "报价单已保存" : quoteStatus === "error" ? "报价单保存失败，请重试" : isQuoteComplete ? "报价单信息已完整" : "请补齐报价单必填信息"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1114,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "规格要求按独立明细保存到后端规格表，后续案例可以替换不同 specs 模板。"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1125,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1113,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 1097,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 967,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 958,
                                columnNumber: 13
                            }, this) : null,
                            isImplementedCase && activeStep === 5 && negotiation ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jam-step-view",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-section-head",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "eyebrow",
                                                        children: "Step 05"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1136,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "section-title",
                                                        children: "决策复盘 · 谈判结果与系统点评"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1137,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 1135,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jam-score-chip",
                                                children: [
                                                    finalScore,
                                                    " 分"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 1139,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jam-report-grid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "jam-report-tile",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "累计得分"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1144,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: [
                                                            finalScore,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                children: " 分"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1145,
                                                                columnNumber: 39
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1145,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "总分按 Step 02 寻源 25%、Step 03 谈判 50%、Step 04 报价单 25% 折算，最高 100 分。"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1146,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 1143,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "jam-report-tile",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "最终条款"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1149,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                                        className: "jam-summary-list",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "供应商"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1151,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: negotiation.supplierName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1151,
                                                                        columnNumber: 38
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1151,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "物料"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1152,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: purchaseQuote.itemName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1152,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1152,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "单价"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1153,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: [
                                                                            money(negotiation.currentPrice),
                                                                            " / ",
                                                                            runtimeConfig.unitPriceUnit
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1153,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1153,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "账期"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1154,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: [
                                                                            negotiation.paymentDays,
                                                                            " 天"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1154,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1154,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                        children: "质保"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1155,
                                                                        columnNumber: 26
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                        children: [
                                                                            negotiation.warrantyMonths,
                                                                            " 个月"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                                        lineNumber: 1155,
                                                                        columnNumber: 37
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1155,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1150,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 1148,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "jam-report-tile is-wide",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "谈判得分拆解"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1159,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jam-breakdown",
                                                        children: [
                                                            Object.entries(negotiation.dimensionScores).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                            children: key
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 1163,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                style: {
                                                                                    width: `${Math.min(100, Number(value))}%`
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                                lineNumber: 1164,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 1164,
                                                                            columnNumber: 25
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                            children: [
                                                                                Number(value).toFixed(1),
                                                                                " 分"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/(platform)/training/page.tsx",
                                                                            lineNumber: 1165,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    ]
                                                                }, key, true, {
                                                                    fileName: "[project]/app/(platform)/training/page.tsx",
                                                                    lineNumber: 1162,
                                                                    columnNumber: 23
                                                                }, this)),
                                                            Object.keys(negotiation.dimensionScores).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                children: "谈判提交后显示后端评分拆解。"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                                lineNumber: 1168,
                                                                columnNumber: 78
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                                        lineNumber: 1160,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(platform)/training/page.tsx",
                                                lineNumber: 1158,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/(platform)/training/page.tsx",
                                        lineNumber: 1142,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1133,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 794,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/training/page.tsx",
                lineNumber: 761,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "jam-action-bar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jam-progress-text",
                        children: [
                            "已完成 ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: [
                                    completedSteps,
                                    " / 5"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1178,
                                columnNumber: 48
                            }, this),
                            " 步"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 1178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jam-footer-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-secondary",
                                type: "button",
                                disabled: activeStep <= 1,
                                onClick: ()=>setActiveStep((current)=>Math.max(1, current - 1)),
                                children: "上一步"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1180,
                                columnNumber: 11
                            }, this),
                            activeStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "button",
                                onClick: submitDemand,
                                children: "已阅读，进入市场寻源"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1189,
                                columnNumber: 13
                            }, this) : null,
                            activeStep === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "button",
                                disabled: !selectedSupplierCode,
                                onClick: submitSourcing,
                                children: "选择该供应商，进入谈判"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1194,
                                columnNumber: 13
                            }, this) : null,
                            activeStep === 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "button",
                                disabled: !negotiation?.done,
                                onClick: ()=>setActiveStep(4),
                                children: "填写采购报价单"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1199,
                                columnNumber: 13
                            }, this) : null,
                            activeStep === 4 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "button",
                                disabled: !isQuoteComplete || quoteStatus === "saving",
                                onClick: submitPurchaseQuote,
                                children: quoteStatus === "saving" ? "保存中" : "确认报价单，进入复盘"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1204,
                                columnNumber: 13
                            }, this) : null,
                            activeStep === 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button-primary",
                                type: "button",
                                onClick: ()=>window.print(),
                                children: "导出复盘报告"
                            }, void 0, false, {
                                fileName: "[project]/app/(platform)/training/page.tsx",
                                lineNumber: 1209,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(platform)/training/page.tsx",
                        lineNumber: 1179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(platform)/training/page.tsx",
                lineNumber: 1177,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(platform)/training/page.tsx",
        lineNumber: 745,
        columnNumber: 5
    }, this);
}
_s(TrainingPage, "EpFP7Jhtj5Mo2YsAiGgVy/WGQJQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$features$2f$auth$2f$components$2f$auth$2d$provider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c2 = TrainingPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "SupplierLeafletMap");
__turbopack_context__.k.register(_c1, "InfoIcon");
__turbopack_context__.k.register(_c2, "TrainingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0a674a0a._.js.map