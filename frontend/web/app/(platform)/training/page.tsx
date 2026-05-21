"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../../features/auth/components/auth-provider";
import {
  fetchNegotiationOptions,
  fetchNegotiationSuppliers,
  fetchTrainingCaseBySlug,
  fetchTrainingReport,
  fetchTrainingStep,
  fetchTrainingSuppliers,
  savePurchaseQuote,
  submitNegotiationResult,
  submitTrainingStep,
  type NegotiationOption,
  type NegotiationSupplier,
  type TrainingCaseDetail,
  type TrainingStepConfig,
  type TrainingSupplier,
} from "../../../features/training/api/training";
import { API_BASE_URL } from "../../../lib/constants/api";

const SupplierLeafletMap = dynamic(
  () => import("../../../features/training/components/supplier-map").then((mod) => mod.SupplierLeafletMap),
  {
    ssr: false,
    loading: () => <div className="jam-map-loading">地图加载中...</div>,
  },
);

type StepId = 1 | 2 | 3 | 4 | 5;

type PracticeCase = {
  slug: string;
  title: string;
  subtitle: string;
  isImplemented: boolean;
};

type QuoteSpec = {
  orderIndex: number;
  fieldKey: string;
  label: string;
  value: string;
  unit?: string;
  requirementType?: string;
  inputType: "number" | "select" | "text";
  expectedValue?: string;
  numericMin?: number;
  numericMax?: number;
  options?: Array<{ label: string; value: string }>;
  isRequired: boolean;
};

type PurchaseQuote = {
  category: string;
  itemName: string;
  annualQuantity: string;
  unit: string;
  deliveryCycle: string;
  quoteValidity: string;
  taxMode: string;
  remarks: string;
  specs: QuoteSpec[];
};

type QuoteOptions = {
  category: string[];
  itemName: string[];
  unit: string[];
};

type TrainingCaseRuntimeConfig = {
  trainingLabel: string;
  unitPriceUnit: string;
  quoteDefaults: Omit<PurchaseQuote, "specs">;
  quoteOptions: QuoteOptions;
};

type NegotiationLog = {
  round: number;
  ask: string;
  answer: string;
  price: number;
  paymentDays: number;
  warrantyMonths: number;
};

type NegotiationState = {
  supplierCode: string;
  supplierName: string;
  round: number;
  currentPrice: number;
  paymentDays: number;
  warrantyMonths: number;
  pickedOptionIds: number[];
  done: boolean;
  score: number | null;
  dimensionScores: Record<string, number>;
  log: NegotiationLog[];
};

function InfoIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7.5h.01" />
    </svg>
  );
}

const CASE_SLUG = "strawberry_jam";

const CASES: PracticeCase[] = [
  {
    slug: CASE_SLUG,
    title: "草莓果酱采购寻源实训",
    subtitle: "食品原料 · 5 步",
    isImplemented: true,
  },
  {
    slug: "motor",
    title: "电机采购寻源实训",
    subtitle: "工业品 · 5 步",
    isImplemented: true,
  },
  {
    slug: "dangerous_goods",
    title: "危险品采购寻源实训",
    subtitle: "危化品 · 5 步",
    isImplemented: true,
  },
];

const STEPS: { id: StepId; title: string; subtitle: string }[] = [
  { id: 1, title: "需求分析", subtitle: "案例说明" },
  { id: 2, title: "市场寻源", subtitle: "单选供应商" },
  { id: 3, title: "商务谈判", subtitle: "5 轮选择" },
  { id: 4, title: "采购报价单", subtitle: "条款确认" },
  { id: 5, title: "决策复盘", subtitle: "结果点评" },
];

const FALLBACK_CASE_TEXT =
  "公司计划采购草莓果酱用于新品草莓夹心饼干。研发要求糖度不低于 65 Brix,不得使用人工防腐剂,供应商需要同时具备 HACCP 与 ISO22000 认证。预计年用量 200 吨,首批到货不超过合同签署后 45 天,采购上限为 29,000 元/吨,含税含运。";

const DEFAULT_SPECS: QuoteSpec[] = [
  {
    orderIndex: 1,
    fieldKey: "brix",
    label: "糖度要求",
    value: "65",
    unit: "Brix",
    requirementType: "quality",
    inputType: "number",
    numericMin: 65,
    isRequired: true,
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
      { label: "不得使用人工防腐剂", value: "no_artificial" },
      { label: "允许使用合规防腐剂", value: "allowed_legal" },
      { label: "未明确限制", value: "not_specified" },
    ],
    isRequired: true,
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
      { label: "符合 GB 2760", value: "gb2760" },
      { label: "按供应商企业标准", value: "supplier_standard" },
      { label: "未明确执行标准", value: "not_specified" },
    ],
    isRequired: true,
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
      { label: "HACCP 与 ISO22000 均在有效期内", value: "haccp_iso22000_valid" },
      { label: "仅 HACCP 有效", value: "haccp_only" },
      { label: "仅 ISO22000 有效", value: "iso22000_only" },
    ],
    isRequired: true,
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
      { label: "COA、批次检测报告和生产日期记录", value: "coa_test_production_date" },
      { label: "仅提供 COA", value: "coa_only" },
      { label: "到货后按需补充资料", value: "provide_on_request" },
    ],
    isRequired: true,
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
    isRequired: true,
  },
];

const DEFAULT_QUOTE: PurchaseQuote = {
  category: "食品原料",
  itemName: "草莓果酱",
  annualQuantity: "200",
  unit: "吨",
  deliveryCycle: "45",
  quoteValidity: "30",
  taxMode: "含税含运",
  remarks: "供应商需持有 HACCP 与 ISO22000 在期认证,批次质检资料随货提供。",
  specs: DEFAULT_SPECS,
};

const DEFAULT_QUOTE_OPTIONS: QuoteOptions = {
  category: ["食品原料", "包装材料", "工业品"],
  itemName: ["草莓果酱", "草莓果粒馅", "草莓浓缩浆"],
  unit: ["吨", "千克", "箱"],
};

const DEFAULT_RUNTIME_CONFIG: TrainingCaseRuntimeConfig = {
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
    remarks: DEFAULT_QUOTE.remarks,
  },
  quoteOptions: DEFAULT_QUOTE_OPTIONS,
};

const ASSET_BASE_URL = API_BASE_URL.replace(/\/api\/v1\/?$/, "");

function assetUrl(path?: string | null) {
  if (!path) return `${ASSET_BASE_URL}/static/training/training1.png`;
  if (/^https?:\/\//.test(path)) return path;
  return `${ASSET_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function money(value: number) {
  return `¥${Number(value || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function quantity(value: string) {
  const parsed = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function specTemplateFromConfig(stepConfig?: TrainingStepConfig | null) {
  const schema = stepConfig?.form_schema as
    | {
        specs?: Array<
          Partial<QuoteSpec> & {
            order_index?: number;
            field_key?: string;
            requirement_type?: string;
            input_type?: QuoteSpec["inputType"];
            expected_value?: string;
            numeric_min?: number;
            numeric_max?: number;
            is_required?: boolean;
          }
        >;
      }
    | null
    | undefined;
  if (!schema?.specs?.length) return DEFAULT_SPECS;
  return schema.specs.map((item, index) => ({
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
    isRequired: item.isRequired ?? item.is_required ?? true,
  }));
}

function toStringArray(value: unknown, fallback: string[]) {
  return Array.isArray(value) && value.every((item) => typeof item === "string")
    ? value
    : fallback;
}

function getCaseRuntimeConfig(caseDetail?: TrainingCaseDetail | null): TrainingCaseRuntimeConfig {
  const rawConfig = (caseDetail?.case_config ?? {}) as Record<string, unknown>;
  const rawQuoteDefaults = (rawConfig.quoteDefaults ?? rawConfig.quote_defaults ?? {}) as Record<string, unknown>;
  const rawQuoteOptions = (rawConfig.quoteOptions ?? rawConfig.quote_options ?? {}) as Record<string, unknown>;

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
      remarks: String(rawQuoteDefaults.remarks ?? DEFAULT_RUNTIME_CONFIG.quoteDefaults.remarks),
    },
    quoteOptions: {
      category: toStringArray(rawQuoteOptions.category, DEFAULT_RUNTIME_CONFIG.quoteOptions.category),
      itemName: toStringArray(rawQuoteOptions.itemName ?? rawQuoteOptions.item_name, DEFAULT_RUNTIME_CONFIG.quoteOptions.itemName),
      unit: toStringArray(rawQuoteOptions.unit, DEFAULT_RUNTIME_CONFIG.quoteOptions.unit),
    },
  };
}

function buildQuoteFromCase(caseDetail: TrainingCaseDetail, stepConfig?: TrainingStepConfig | null): PurchaseQuote {
  const runtimeConfig = getCaseRuntimeConfig(caseDetail);
  return {
    ...runtimeConfig.quoteDefaults,
    specs: specTemplateFromConfig(stepConfig),
  };
}

function scoreQuoteSpecs(specs: QuoteSpec[]) {
  const requiredSpecs = specs.filter((spec) => spec.isRequired);
  if (!requiredSpecs.length) return 100;
  const correctCount = requiredSpecs.filter((spec) => {
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
  return Math.round((correctCount / requiredSpecs.length) * 1000) / 10;
}

function parsePriceText(priceText?: string | null) {
  const matched = priceText?.match(/[\d.]+/);
  return matched ? Number(matched[0]) : 0;
}

function createNegotiationState(supplier: NegotiationSupplier | TrainingSupplier): NegotiationState {
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
    log: [],
  };
}

function applyOption(state: NegotiationState, option: NegotiationOption): NegotiationState {
  let currentPrice = state.currentPrice;
  let paymentDays = state.paymentDays;
  let warrantyMonths = state.warrantyMonths;
  const delta = Number(option.delta_value || 0);

  if (option.affect_field === "price") currentPrice = Math.max(0, currentPrice + delta);
  if (option.affect_field === "payment_days") paymentDays = Math.max(0, paymentDays + delta);
  if (option.affect_field === "warranty_months") warrantyMonths = Math.max(0, warrantyMonths + delta);

  const nextPicked = [...state.pickedOptionIds, option.id];
  const done = state.round >= 5;
  return {
    ...state,
    currentPrice,
    paymentDays,
    warrantyMonths,
    pickedOptionIds: nextPicked,
    done,
    round: done ? 5 : ((state.round + 1) as StepId),
    log: [
      ...state.log,
      {
        round: option.round_no,
        ask: option.ask,
        answer: option.answer,
        price: currentPrice,
        paymentDays,
        warrantyMonths,
      },
    ],
  };
}

export default function TrainingPage() {
  const { token, isAuthenticated, isAuthReady, openAuthModal } = useAuth();
  const [activeCaseSlug, setActiveCaseSlug] = useState(CASE_SLUG);
  const [activeStep, setActiveStep] = useState<StepId>(1);
  const [caseDetail, setCaseDetail] = useState<TrainingCaseDetail | null>(null);
  const [suppliers, setSuppliers] = useState<TrainingSupplier[]>([]);
  const [stepConfig, setStepConfig] = useState<TrainingStepConfig | null>(null);
  const [negotiationSuppliers, setNegotiationSuppliers] = useState<NegotiationSupplier[]>([]);
  const [roundOptions, setRoundOptions] = useState<NegotiationOption[]>([]);
  const [selectedSupplierCode, setSelectedSupplierCode] = useState<string | null>(null);
  const [sourcingScore, setSourcingScore] = useState<number | null>(null);
  const [negotiation, setNegotiation] = useState<NegotiationState | null>(null);
  const [purchaseQuote, setPurchaseQuote] = useState<PurchaseQuote>(DEFAULT_QUOTE);
  const [quoteStatus, setQuoteStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [reportScore, setReportScore] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [maxUnlockedCaseIndex, setMaxUnlockedCaseIndex] = useState(0);

  const activeCase = CASES.find((item) => item.slug === activeCaseSlug) ?? CASES[0];
  const runtimeConfig = getCaseRuntimeConfig(caseDetail);
  const selectedSupplier = suppliers.find((item) => item.code === selectedSupplierCode) ?? suppliers[0];
  const caseId = caseDetail?.id;
  const isImplementedCase = activeCase.isImplemented;
  const completedFirstCase = maxUnlockedCaseIndex >= 1;
  const quoteTotal = negotiation ? negotiation.currentPrice * quantity(purchaseQuote.annualQuantity) : 0;
  const localFinalScore = Math.round(
    ((sourcingScore ?? 0) * 0.25 + (negotiation?.score ?? 0) * 0.5 + (quoteStatus === "saved" ? 25 : 0)) * 10,
  ) / 10;
  const finalScore = reportScore !== null && reportScore <= 100 ? reportScore : localFinalScore;
  const currentOptions = roundOptions.filter((item) => item.round_no === (negotiation?.round ?? 1));
  const completedSteps = [
    activeStep > 1,
    sourcingScore !== null,
    negotiation?.done,
    activeStep > 4 && quoteStatus === "saved",
    activeStep === 5,
  ].filter(Boolean).length;

  const isQuoteComplete = useMemo(
    () =>
      [
        purchaseQuote.category,
        purchaseQuote.itemName,
        purchaseQuote.annualQuantity,
        purchaseQuote.deliveryCycle,
        purchaseQuote.quoteValidity,
        ...purchaseQuote.specs.filter((spec) => spec.isRequired).map((spec) => spec.value),
      ].every((value) => String(value ?? "").trim().length > 0),
    [purchaseQuote],
  );

  useEffect(() => {
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
        const detail = await fetchTrainingCaseBySlug(activeCaseSlug, authToken);
        if (cancelled) return;
        setCaseDetail(detail);
        const [supplierList, negotiationList, quoteStep] = await Promise.all([
          fetchTrainingSuppliers(detail.id, authToken),
          fetchNegotiationSuppliers(detail.id, authToken),
          fetchTrainingStep(detail.id, 4, authToken).catch(() => null),
        ]);
        if (cancelled) return;
        setSuppliers(supplierList);
        setNegotiationSuppliers(negotiationList);
        setStepConfig(quoteStep);
        setPurchaseQuote(buildQuoteFromCase(detail, quoteStep));
        const defaultSupplier = supplierList.find((item) => item.is_qualified) ?? supplierList[0];
        if (defaultSupplier) setSelectedSupplierCode(defaultSupplier.code ?? null);
      } catch {
        if (!cancelled) setLoadError("实训数据加载失败，请确认后端和登录状态正常。");
      }
    }

    void loadCase();
    return () => {
      cancelled = true;
    };
  }, [activeCaseSlug, token, isAuthReady, isAuthenticated]);

  useEffect(() => {
    if (!caseId || !token || !negotiation || negotiation.done) return;
    const authToken = token;
    const activeCaseId = caseId;
    const activeNegotiation = negotiation;
    let cancelled = false;

    async function loadOptions() {
      const options = await fetchNegotiationOptions(activeCaseId, activeNegotiation.round, authToken).catch(() => []);
      if (!cancelled) setRoundOptions(options);
    }

    void loadOptions();
    return () => {
      cancelled = true;
    };
  }, [caseId, token, negotiation?.round, negotiation?.done]);

  const requireAuth = () => {
    openAuthModal({ mode: "login", reason: "进入实训前，请先登录学习账号。" });
  };

  const switchCase = (slug: string) => {
    if (slug === activeCaseSlug) return;
    setActiveCaseSlug(slug);
    setActiveStep(1);
  };

  const submitDemand = async () => {
    if (caseId && token) {
      await submitTrainingStep(caseId, 1, { read_case_brief: true }, 20, token, {
        score: 100,
        dimension_scores: { compliance: 20, quality: 20, cost: 20, delivery: 20, negotiation: 20 },
        result_snapshot: { slug: activeCaseSlug },
      }).catch(() => null);
    }
    setActiveStep(2);
  };

  const submitSourcing = async () => {
    if (!selectedSupplier || !caseId || !token) return;
    const score = selectedSupplier.is_qualified ? 100 : 0;
    setSourcingScore(score);
    const dimensions = {
      compliance: score,
      quality: 0,
      cost: 0,
      delivery: 0,
      negotiation: 0,
    };
    await submitTrainingStep(
      caseId,
      2,
      {
        selected_supplier_code: selectedSupplier.code,
        selected_supplier_name: selectedSupplier.name,
      },
      60,
      token,
      {
        score,
        dimension_scores: dimensions,
        result_snapshot: {
          supplier_code: selectedSupplier.code,
          supplier_name: selectedSupplier.name,
          is_qualified: selectedSupplier.is_qualified,
          risk_note: selectedSupplier.risk_note,
        },
      },
    ).catch(() => null);

    const negotiationSeed =
      negotiationSuppliers.find((item) => item.supplier_code === selectedSupplier.code) ?? selectedSupplier;
    setNegotiation(createNegotiationState(negotiationSeed));
    setActiveStep(3);
  };

  const chooseNegotiationOption = async (option: NegotiationOption) => {
    if (!negotiation || negotiation.done || negotiation.pickedOptionIds.includes(option.id)) return;
    const next = applyOption(negotiation, option);
    setNegotiation(next);

    if (next.done && caseId && token) {
      const result = await submitNegotiationResult(
        caseId,
        {
          supplier_code: next.supplierCode,
          picked_option_ids: next.pickedOptionIds,
          final_price: next.currentPrice,
          payment_days: next.paymentDays,
          warranty_months: next.warrantyMonths,
          time_spent_seconds: 180,
        },
        token,
      ).catch(() => null);
      if (result) {
        setNegotiation({
          ...next,
          score: result.score,
          dimensionScores: result.dimension_scores,
        });
      }
    }
  };

  const updatePurchaseQuote = <K extends keyof PurchaseQuote>(key: K, value: PurchaseQuote[K]) => {
    setPurchaseQuote((current) => ({ ...current, [key]: value }));
    setQuoteStatus("idle");
  };

  const updatePurchaseQuoteSpec = (fieldKey: string, value: string) => {
    setPurchaseQuote((current) => ({
      ...current,
      specs: current.specs.map((spec) => (spec.fieldKey === fieldKey ? { ...spec, value } : spec)),
    }));
    setQuoteStatus("idle");
  };

  const submitPurchaseQuote = async () => {
    if (!caseId || !token || !negotiation || !isQuoteComplete) return;
    setQuoteStatus("saving");
    try {
      await savePurchaseQuote(
        caseId,
        {
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
          specs: purchaseQuote.specs
            .slice()
            .sort((left, right) => left.orderIndex - right.orderIndex)
            .map((spec) => ({
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
              is_required: spec.isRequired,
            })),
        },
        token,
      );
      const quoteScore = scoreQuoteSpecs(purchaseQuote.specs);
      await submitTrainingStep(caseId, 4, { quote_saved: true }, 120, token, {
        score: quoteScore,
        dimension_scores: {
          compliance: quoteScore * 0.4,
          quality: quoteScore * 0.3,
          cost: quoteScore * 0.1,
          delivery: quoteScore * 0.2,
          negotiation: 0,
        },
        result_snapshot: {
          supplier_code: negotiation.supplierCode,
          estimated_total: quoteTotal,
          quote_score: quoteScore,
        },
      }).catch(() => null);
      const report = await fetchTrainingReport(caseId, token).catch(() => null);
      setReportScore(report?.total_score ?? null);
      setQuoteStatus("saved");
      const currentCaseIndex = CASES.findIndex((item) => item.slug === activeCaseSlug);
      if (currentCaseIndex >= 0) {
        setMaxUnlockedCaseIndex((current) => Math.max(current, currentCaseIndex + 1));
      }
      setActiveStep(5);
    } catch {
      setQuoteStatus("error");
    }
  };

  const canOpenStep = (step: StepId) => {
    if (step === 1) return true;
    if (step === 2) return activeStep > 1;
    if (step === 3) return sourcingScore !== null || activeStep >= 3;
    if (step === 4) return Boolean(negotiation?.done) || activeStep >= 4;
    return quoteStatus === "saved" || activeStep === 5;
  };

  if (isAuthReady && !isAuthenticated) {
    return (
      <section className="jam-training-page">
        <div className="jam-lock-panel">
          <div className="eyebrow">Training Case</div>
          <h2 className="page-title">采购寻源模拟实训</h2>
          <p className="page-description">登录后会读取后端案例、供应商、谈判脚本和报价单模板。</p>
          <button className="button-primary" type="button" onClick={requireAuth}>
            登录后开始实训
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="jam-training-page">
      <nav className="jam-stepper" aria-label="实训步骤">
        {STEPS.map((step) => (
          <button
            key={step.id}
            className={`jam-step${activeStep === step.id ? " is-current" : ""}${activeStep > step.id ? " is-complete" : ""}`}
            type="button"
            disabled={!canOpenStep(step.id)}
            onClick={() => canOpenStep(step.id) && setActiveStep(step.id)}
          >
            <span className="jam-step-icon">{step.id}</span>
            <span><small>STEP {String(step.id).padStart(2, "0")}</small><b>{step.title}</b><em>{step.subtitle}</em></span>
          </button>
        ))}
      </nav>

      <div className="jam-workspace">
        <aside className="jam-rail">
          <div className="jam-case-switch-head">
            <div>
              <span>Case Switch</span>
              <strong>案例切换</strong>
            </div>
            <em>{completedFirstCase ? "unlocked" : "linear"}</em>
          </div>

          <div className="jam-case-switch-list">
            {CASES.map((item, index) => {
              const locked = index > maxUnlockedCaseIndex;
              return (
                <button
                  key={item.slug}
                  type="button"
                  className={`jam-case-switch-card${activeCaseSlug === item.slug ? " is-active" : ""}`}
                  disabled={locked}
                  onClick={() => switchCase(item.slug)}
                >
                  <span className="jam-case-switch-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <small>{locked ? "LOCKED" : item.isImplemented ? "AVAILABLE" : "COMING SOON"}</small>
                    <strong>{item.title}</strong>
                    <em>{item.subtitle}</em>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <main className="jam-main">
          {loadError ? <div className="jam-warning">{loadError}</div> : null}

          {!isImplementedCase ? (
            <section className="jam-step-view">
              <div className="jam-section-head">
                <div>
                  <div className="eyebrow">Case</div>
                  <h3 className="section-title">{activeCase.title}</h3>
                </div>
                <span className="jam-score-chip">LOCKED</span>
              </div>
              <div className="jam-empty">上一个案例完成后解锁下一个案例。</div>
            </section>
          ) : null}

          {isImplementedCase && activeStep === 1 ? (
            <section className="jam-step-view">
              <div className="jam-section-head">
                <div>
                  <div className="eyebrow">Step 01</div>
                  <h3 className="section-title">需求分析 · 阅读案例说明</h3>
                </div>
                <span className="jam-score-chip">CASE BRIEF</span>
              </div>

              <div className="jam-case-intro-grid">
                <article className="jam-procurement-doc">
                  <div className="jam-doc-head">
                    <div>
                      <span>PROCUREMENT BRIEF</span>
                      <strong>内部采购需求说明</strong>
                    </div>
                    <span>CONFIDENTIAL</span>
                  </div>
                  <p>{caseDetail?.background || FALLBACK_CASE_TEXT}</p>
                </article>

                <figure className="jam-case-figure">
                  <img src={assetUrl(caseDetail?.cover_image_url)} alt={`${activeCase.title}案例配图`} />
                </figure>
              </div>
            </section>
          ) : null}

          {isImplementedCase && activeStep === 2 ? (
            <section className="jam-step-view">
              <div className="jam-section-head">
                <div>
                  <div className="eyebrow">Step 02</div>
                  <h3 className="section-title">市场寻源 · 在地图中选择 1 家供应商</h3>
                </div>
                <span className="jam-score-chip">{selectedSupplierCode ? "1 / 1 已选" : "未选择"}</span>
              </div>

              <div className="jam-map-layout">
                <div className="jam-supplier-map" aria-label="候选供应商地图">
                  <SupplierLeafletMap
                    suppliers={suppliers}
                    selectedSupplierCode={selectedSupplierCode}
                    onSelectSupplier={setSelectedSupplierCode}
                  />
                </div>

                <aside className="jam-map-detail">
                  {selectedSupplier ? (
                    <>
                      {selectedSupplier.image_url ? (
                        <img src={assetUrl(selectedSupplier.image_url)} alt={selectedSupplier.name} />
                      ) : null}
                      <span className="jam-supplier-code">{selectedSupplier.code}</span>
                      <h4>{selectedSupplier.name}</h4>
                      <dl className="jam-summary-list">
                        <div><dt>所在地</dt><dd>{selectedSupplier.location || "--"}</dd></div>
                        <div><dt>认证</dt><dd>{selectedSupplier.certifications?.join(" / ") || "--"}</dd></div>
                        <div><dt>产能</dt><dd>{selectedSupplier.capacity || "--"}</dd></div>
                        <div><dt>报价</dt><dd>{selectedSupplier.price_text || "--"}</dd></div>
                      </dl>
                      <div className="jam-supplier-intro">
                        <span>简介</span>
                        <p>{selectedSupplier.brief || selectedSupplier.risk_note || "暂无简介。"}</p>
                      </div>
                    </>
                  ) : (
                    <div className="jam-empty">请选择地图上的供应商水滴标记。</div>
                  )}
                </aside>
              </div>

              {sourcingScore !== null ? (
                <div className="jam-notification">
                  <b>寻源评分: {sourcingScore} / 100</b>
                  <span>系统按供应商资质和风险备注判定；选错仍可继续完成后续流程。</span>
                </div>
              ) : null}
            </section>
          ) : null}

          {isImplementedCase && activeStep === 3 && negotiation ? (
            <section className="jam-step-view">
              <div className="jam-section-head">
                <div>
                  <div className="eyebrow">Step 03</div>
                  <h3 className="section-title">商务谈判 · 5 轮话术选择</h3>
                </div>
                <span className="jam-score-chip">Round {negotiation.round} / 5</span>
              </div>

              <article className="jam-negotiation-stage">
                <div className="jam-stage-head">
                  <div className="jam-avatar">{negotiation.supplierCode}</div>
                  <div>
                    <strong>{negotiation.supplierName}</strong>
                    <span>当前 {money(negotiation.currentPrice)} / {runtimeConfig.unitPriceUnit} · 账期 {negotiation.paymentDays} 天 · 质保 {negotiation.warrantyMonths} 个月</span>
                  </div>
                  <div className="jam-round-pill">{negotiation.done ? "已完成" : `回合 ${negotiation.round}`}</div>
                </div>

                <div className="jam-speech">
                  {negotiation.log.at(-1)?.answer ??
                    "请从本轮话术中选择一个谈判动作。已选过的选项会写入谈判记录,最终由后端统一评分。"}
                </div>

                <div className="jam-options is-three">
                  {currentOptions.length === 0 ? (
                    <div className="jam-empty">本轮谈判选项还没有配置。重启后端会自动补齐当前案例默认选项。</div>
                  ) : (
                    currentOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        disabled={negotiation.done || negotiation.pickedOptionIds.includes(option.id)}
                        onClick={() => chooseNegotiationOption(option)}
                      >
                        <span>OPTION {option.sort_order}</span>
                        <b>{option.ask}</b>
                      </button>
                    ))
                  )}
                </div>
              </article>

              <article className="jam-negotiation-log">
                <div className="jam-log-row is-head">
                  <span>回合</span><span>动作</span><span>对方回应</span><span>价格</span><span>条款</span>
                </div>
                {negotiation.log.length === 0 ? (
                  <div className="jam-empty">尚未开始谈判。</div>
                ) : (
                  negotiation.log.map((item) => (
                    <div key={item.round} className="jam-log-row">
                      <span>R{item.round}</span>
                      <span>{item.ask}</span>
                      <span>{item.answer}</span>
                      <span>{money(item.price)}</span>
                      <span>{item.paymentDays} 天 / {item.warrantyMonths} 月</span>
                    </div>
                  ))
                )}
              </article>
            </section>
          ) : null}

          {isImplementedCase && activeStep === 4 && negotiation ? (
            <section className="jam-step-view">
              <div className="jam-section-head">
                <div>
                  <div className="eyebrow">Step 04</div>
                  <h3 className="section-title">采购报价单 · 填写结构化报价</h3>
                </div>
                <span className="jam-score-chip">QUOTE FORM</span>
              </div>

              <div className="jam-quotation-grid">
                <article className="jam-spec-form jam-quotation-form">
                  <div className="jam-spec-form-head">
                    <div>
                      <span>PROCUREMENT QUOTATION</span>
                      <strong>采购报价单</strong>
                    </div>
                    <em>{runtimeConfig.trainingLabel}</em>
                  </div>

                  <div className="jam-spec-grid">
                    <label className="jam-field">
                      <span><b>采购品类</b><em>Category</em></span>
                      <select
                        value={purchaseQuote.category}
                        onChange={(event) => updatePurchaseQuote("category", event.target.value)}
                      >
                        {runtimeConfig.quoteOptions.category.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label className="jam-field">
                      <span><b>物料名称</b><em>Item</em></span>
                      <select
                        value={purchaseQuote.itemName}
                        onChange={(event) => updatePurchaseQuote("itemName", event.target.value)}
                      >
                        {runtimeConfig.quoteOptions.itemName.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label className="jam-field">
                      <span><b>年采购量</b><em>Qty</em></span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={purchaseQuote.annualQuantity}
                        onChange={(event) => updatePurchaseQuote("annualQuantity", event.target.value)}
                      />
                    </label>
                    <label className="jam-field">
                      <span><b>计量单位</b><em>Unit</em></span>
                      <select
                        value={purchaseQuote.unit}
                        onChange={(event) => updatePurchaseQuote("unit", event.target.value)}
                      >
                        {runtimeConfig.quoteOptions.unit.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label className="jam-field">
                      <span>
                        <b>交付要求</b>
                        <span className="jam-field-meta">
                          <em>Lead time</em>
                        </span>
                      </span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={purchaseQuote.deliveryCycle}
                        onChange={(event) => updatePurchaseQuote("deliveryCycle", event.target.value)}
                      />
                    </label>
                    <label className="jam-field">
                      <span><b>报价有效期</b><em>Validity</em></span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={purchaseQuote.quoteValidity}
                        onChange={(event) => updatePurchaseQuote("quoteValidity", event.target.value)}
                      />
                    </label>

                    <div className="jam-spec-detail-list">
                      <div className="jam-spec-detail-head">
                        <span>SPECIFICATIONS</span>
                        <strong>规格要求明细</strong>
                      </div>
                      {purchaseQuote.specs
                        .slice()
                        .sort((left, right) => left.orderIndex - right.orderIndex)
                        .map((spec) => (
                          <label key={spec.fieldKey} className="jam-field">
                            <span>
                              <b>{String(spec.orderIndex).padStart(2, "0")} · {spec.label}</b>
                              <span className="jam-field-meta">
                                {spec.fieldKey === "shelf_life" ? (
                                  <span className="jam-help-dot" tabIndex={0}>
                                    <InfoIcon />
                                    <span className="jam-help-tip">填写到货剩余保质期占总保质期的比例，67 表示不少于 67%。</span>
                                  </span>
                                ) : null}
                                <em>{spec.unit || spec.requirementType || "Spec"}</em>
                              </span>
                            </span>
                            {spec.inputType === "select" ? (
                              <select
                                value={spec.value}
                                onChange={(event) => updatePurchaseQuoteSpec(spec.fieldKey, event.target.value)}
                              >
                                {(spec.options ?? []).map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                type={spec.inputType === "number" ? "number" : "text"}
                                min={spec.numericMin}
                                max={spec.numericMax}
                                step={spec.fieldKey === "shelf_life" ? "1" : "0.1"}
                                value={spec.value}
                                onChange={(event) => updatePurchaseQuoteSpec(spec.fieldKey, event.target.value)}
                              />
                            )}
                          </label>
                        ))}
                    </div>

                  </div>
                </article>

                <aside className="jam-quotation-summary">
                  <div className="jam-spec-form-head">
                    <div>
                      <span>FINAL TERMS</span>
                      <strong>谈判结果带入</strong>
                    </div>
                    <em>自动生成</em>
                  </div>
                  <dl className="jam-summary-list">
                    <div><dt>成交供应商</dt><dd>{negotiation.supplierName}</dd></div>
                    <div><dt>成交单价</dt><dd>{money(negotiation.currentPrice)} / {runtimeConfig.unitPriceUnit}</dd></div>
                    <div><dt>采购数量</dt><dd>{purchaseQuote.annualQuantity || "--"} {purchaseQuote.unit}</dd></div>
                    <div><dt>预计总额</dt><dd>{quoteTotal ? money(quoteTotal) : "--"}</dd></div>
                    <div><dt>付款账期</dt><dd>{negotiation.paymentDays} 天</dd></div>
                    <div><dt>质保周期</dt><dd>{negotiation.warrantyMonths} 个月</dd></div>
                  </dl>
                  <div className="jam-notification">
                    <b>
                      {quoteStatus === "saving"
                        ? "正在保存报价单"
                        : quoteStatus === "saved"
                          ? "报价单已保存"
                          : quoteStatus === "error"
                            ? "报价单保存失败，请重试"
                            : isQuoteComplete
                              ? "报价单信息已完整"
                              : "请补齐报价单必填信息"}
                    </b>
                    <span>规格要求按独立明细保存到后端规格表，后续案例可以替换不同 specs 模板。</span>
                  </div>
                </aside>
              </div>
            </section>
          ) : null}

          {isImplementedCase && activeStep === 5 && negotiation ? (
            <section className="jam-step-view">
              <div className="jam-section-head">
                <div>
                  <div className="eyebrow">Step 05</div>
                  <h3 className="section-title">决策复盘 · 谈判结果与系统点评</h3>
                </div>
                <span className="jam-score-chip">{finalScore} 分</span>
              </div>

              <div className="jam-report-grid">
                <article className="jam-report-tile">
                  <span>累计得分</span>
                  <strong>{finalScore}<small> 分</small></strong>
                  <p>总分按 Step 02 寻源 25%、Step 03 谈判 50%、Step 04 报价单 25% 折算，最高 100 分。</p>
                </article>
                <article className="jam-report-tile">
                  <span>最终条款</span>
                  <dl className="jam-summary-list">
                    <div><dt>供应商</dt><dd>{negotiation.supplierName}</dd></div>
                    <div><dt>物料</dt><dd>{purchaseQuote.itemName}</dd></div>
                    <div><dt>单价</dt><dd>{money(negotiation.currentPrice)} / {runtimeConfig.unitPriceUnit}</dd></div>
                    <div><dt>账期</dt><dd>{negotiation.paymentDays} 天</dd></div>
                    <div><dt>质保</dt><dd>{negotiation.warrantyMonths} 个月</dd></div>
                  </dl>
                </article>
                <article className="jam-report-tile is-wide">
                  <span>谈判得分拆解</span>
                  <div className="jam-breakdown">
                    {Object.entries(negotiation.dimensionScores).map(([key, value]) => (
                      <div key={key}>
                        <b>{key}</b>
                        <span><i style={{ width: `${Math.min(100, Number(value))}%` }} /></span>
                        <em>{Number(value).toFixed(1)} 分</em>
                      </div>
                    ))}
                    {Object.keys(negotiation.dimensionScores).length === 0 ? <p>谈判提交后显示后端评分拆解。</p> : null}
                  </div>
                </article>
              </div>
            </section>
          ) : null}
        </main>
      </div>

      <footer className="jam-action-bar">
        <div className="jam-progress-text">已完成 <b>{completedSteps} / 5</b> 步</div>
        <div className="jam-footer-actions">
          <button
            className="button-secondary"
            type="button"
            disabled={activeStep <= 1}
            onClick={() => setActiveStep((current) => Math.max(1, current - 1) as StepId)}
          >
            上一步
          </button>
          {activeStep === 1 ? (
            <button className="button-primary" type="button" onClick={submitDemand}>
              已阅读，进入市场寻源
            </button>
          ) : null}
          {activeStep === 2 ? (
            <button className="button-primary" type="button" disabled={!selectedSupplierCode} onClick={submitSourcing}>
              选择该供应商，进入谈判
            </button>
          ) : null}
          {activeStep === 3 ? (
            <button className="button-primary" type="button" disabled={!negotiation?.done} onClick={() => setActiveStep(4)}>
              填写采购报价单
            </button>
          ) : null}
          {activeStep === 4 ? (
            <button className="button-primary" type="button" disabled={!isQuoteComplete || quoteStatus === "saving"} onClick={submitPurchaseQuote}>
              {quoteStatus === "saving" ? "保存中" : "确认报价单，进入复盘"}
            </button>
          ) : null}
          {activeStep === 5 ? (
            <button className="button-primary" type="button" onClick={() => window.print()}>
              导出复盘报告
            </button>
          ) : null}
        </div>
      </footer>
    </section>
  );
}
