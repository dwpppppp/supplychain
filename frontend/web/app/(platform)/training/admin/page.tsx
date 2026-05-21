"use client";

import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../../../features/auth/components/auth-provider";
import {
  createAdminTrainingCaseConfig,
  fetchAdminTrainingCaseConfig,
  fetchAdminTrainingCases,
  publishAdminTrainingCase,
  unpublishAdminTrainingCase,
  updateAdminTrainingCaseConfig,
  type TrainingCase,
  type TrainingCaseConfig,
  type TrainingNegotiationOptionConfig,
  type TrainingNegotiationSupplierConfig,
  type TrainingStepConfig,
  type TrainingSupplierConfig,
} from "../../../../features/training/api/training";

type QuoteSpecConfig = {
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

const DEFAULT_QUOTE_SPECS: QuoteSpecConfig[] = [
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

const DEFAULT_CASE: TrainingCaseConfig = {
  slug: "strawberry_jam",
  title: "草莓果酱采购寻源实训",
  category: "food",
  difficulty: 2,
  status: "draft",
  total_steps: 5,
  max_attempts: 4,
  background:
    "公司计划采购草莓果酱用于新品草莓夹心饼干。研发要求糖度不低于 65 Brix，不得使用人工防腐剂，供应商需要同时具备 HACCP 与 ISO22000 认证。",
  objective: "完成需求分析、市场寻源、商务谈判、采购报价单和决策复盘。",
  cover_image_url: "/static/training/training1.png",
  scoring_weights: { sourcing: 0.25, negotiation: 0.5, quote: 0.25 },
  case_config: { scenario: "strawberry_jam" },
  suppliers: [],
  negotiation_suppliers: [],
  negotiation_options: [],
  steps: [
    { step: 1, step_key: "demand_analysis", title: "需求分析", interaction_type: "case_brief", sort_order: 1, is_required: true },
    { step: 2, step_key: "market_sourcing", title: "市场寻源", interaction_type: "supplier_map_select", sort_order: 2, is_required: true },
    { step: 3, step_key: "negotiation", title: "商务谈判", interaction_type: "scripted_negotiation", sort_order: 3, is_required: true },
    {
      step: 4,
      step_key: "purchase_quote",
      title: "采购报价单",
      interaction_type: "purchase_quote",
      sort_order: 4,
      is_required: true,
      form_schema: { specs: DEFAULT_QUOTE_SPECS },
    },
    { step: 5, step_key: "review", title: "决策复盘", interaction_type: "report", sort_order: 5, is_required: false },
  ],
};

const EMPTY_SUPPLIER: TrainingSupplierConfig = {
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
  profile: {},
};

const EMPTY_NEGOTIATION_OPTION: TrainingNegotiationOptionConfig = {
  round_no: 1,
  ask: "",
  answer: "",
  affect_field: "price",
  delta_value: 0,
  sort_order: 1,
};

function toNumber(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function csvToList(value: string) {
  return value.split(/[,，]/).map((item) => item.trim()).filter(Boolean);
}

function listToCsv(value?: unknown[] | null) {
  return Array.isArray(value) ? value.join("，") : "";
}

function normalizeConfig(config: TrainingCaseConfig): TrainingCaseConfig {
  const step4 = config.steps?.find((step) => step.step === 4);
  return {
    ...DEFAULT_CASE,
    ...config,
    suppliers: config.suppliers ?? [],
    negotiation_suppliers: config.negotiation_suppliers ?? [],
    negotiation_options: config.negotiation_options ?? [],
    steps: config.steps?.length ? config.steps : DEFAULT_CASE.steps,
    case_config: config.case_config ?? {},
    cover_image_url: config.cover_image_url ?? "",
    ...(step4?.form_schema ? {} : {}),
  };
}

function stripIds<T extends { id?: number }>(items?: T[]) {
  return (items ?? []).map(({ id: _id, ...item }) => item);
}

function cleanForSave(config: TrainingCaseConfig): TrainingCaseConfig {
  return {
    ...config,
    id: undefined,
    suppliers: stripIds(config.suppliers),
    negotiation_suppliers: stripIds(config.negotiation_suppliers),
    negotiation_options: stripIds(config.negotiation_options),
    steps: stripIds(config.steps),
  };
}

function getQuoteSpecs(draft: TrainingCaseConfig): QuoteSpecConfig[] {
  const step4 = draft.steps.find((step) => step.step === 4);
  const specs = (step4?.form_schema as { specs?: QuoteSpecConfig[] } | undefined)?.specs;
  return specs?.length ? specs : DEFAULT_QUOTE_SPECS;
}

export default function TrainingAdminPage() {
  const { token, currentUser, isAuthenticated, isAuthReady, openAuthModal } = useAuth();
  const [cases, setCases] = useState<TrainingCase[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState<TrainingCaseConfig>(DEFAULT_CASE);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const canManage = currentUser?.role === "teacher" || currentUser?.role === "admin";
  const quoteSpecs = useMemo(() => getQuoteSpecs(draft), [draft]);

  const loadCases = async () => {
    if (!token) return;
    setIsLoading(true);
    setMessage(null);
    try {
      const data = await fetchAdminTrainingCases(token);
      setCases(data);
      setSelectedId((current) => current ?? data[0]?.id ?? null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "案例列表加载失败。");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token && canManage) void loadCases();
  }, [token, canManage]);

  useEffect(() => {
    if (!token || !selectedId || !canManage) return;
    setIsLoading(true);
    fetchAdminTrainingCaseConfig(selectedId, token)
      .then((config) => setDraft(normalizeConfig(config)))
      .catch((error) => setMessage(error instanceof Error ? error.message : "配置加载失败。"))
      .finally(() => setIsLoading(false));
  }, [token, selectedId, canManage]);

  const updateDraft = <K extends keyof TrainingCaseConfig>(key: K, value: TrainingCaseConfig[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const updateSupplier = (index: number, patch: Partial<TrainingSupplierConfig>) => {
    setDraft((current) => ({
      ...current,
      suppliers: current.suppliers.map((supplier, i) => (i === index ? { ...supplier, ...patch } : supplier)),
    }));
  };

  const updateNegotiationSupplier = (index: number, patch: Partial<TrainingNegotiationSupplierConfig>) => {
    setDraft((current) => ({
      ...current,
      negotiation_suppliers: (current.negotiation_suppliers ?? []).map((supplier, i) =>
        i === index ? { ...supplier, ...patch } : supplier,
      ),
    }));
  };

  const updateNegotiationOption = (index: number, patch: Partial<TrainingNegotiationOptionConfig>) => {
    setDraft((current) => ({
      ...current,
      negotiation_options: (current.negotiation_options ?? []).map((option, i) =>
        i === index ? { ...option, ...patch } : option,
      ),
    }));
  };

  const updateStep = (index: number, patch: Partial<TrainingStepConfig>) => {
    setDraft((current) => ({
      ...current,
      steps: current.steps.map((step, i) => (i === index ? { ...step, ...patch } : step)),
    }));
  };

  const updateQuoteSpec = (index: number, patch: Partial<QuoteSpecConfig>) => {
    setDraft((current) => ({
      ...current,
      steps: current.steps.map((step) => {
        if (step.step !== 4) return step;
        const currentSpecs = ((step.form_schema as { specs?: QuoteSpecConfig[] } | undefined)?.specs ?? DEFAULT_QUOTE_SPECS);
        return {
          ...step,
          form_schema: {
            ...(step.form_schema ?? {}),
            specs: currentSpecs.map((spec, i) => (i === index ? { ...spec, ...patch } : spec)),
          },
        };
      }),
    }));
  };

  const createTemplate = () => {
    setSelectedId(null);
    setDraft({
      ...DEFAULT_CASE,
      slug: `${DEFAULT_CASE.slug}_${Date.now().toString().slice(-5)}`,
      suppliers: [],
      negotiation_suppliers: [],
      negotiation_options: [],
      steps: DEFAULT_CASE.steps.map((step) => ({ ...step })),
    });
    setMessage("已创建新模板，编辑后保存。");
  };

  const save = async () => {
    if (!token) return;
    setIsSaving(true);
    setMessage(null);
    try {
      const payload = cleanForSave(draft);
      const saved = selectedId
        ? await updateAdminTrainingCaseConfig(selectedId, payload, token)
        : await createAdminTrainingCaseConfig(payload, token);
      await loadCases();
      setSelectedId(saved.id ?? null);
      setDraft(normalizeConfig(saved));
      setMessage("配置已保存。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "保存失败。");
    } finally {
      setIsSaving(false);
    }
  };

  const publish = async (nextPublished: boolean) => {
    if (!token || !selectedId) return;
    setIsSaving(true);
    try {
      const saved = nextPublished
        ? await publishAdminTrainingCase(selectedId, token)
        : await unpublishAdminTrainingCase(selectedId, token);
      setDraft(normalizeConfig(saved));
      await loadCases();
      setMessage(nextPublished ? "案例已发布。" : "案例已下线为草稿。");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "状态更新失败。");
    } finally {
      setIsSaving(false);
    }
  };

  if (isAuthReady && !isAuthenticated) {
    return (
      <section className="training-admin-page">
        <div className="training-admin-lock">
          <div className="eyebrow">Training Admin</div>
          <h2 className="page-title">实训配置后台</h2>
          <p className="page-description">登录教师或管理员账号后，可以维护实训案例。</p>
          <button className="button-primary" type="button" onClick={() => openAuthModal({ mode: "login", reason: "进入实训配置后台前，请先登录。" })}>
            登录后进入后台
          </button>
        </div>
      </section>
    );
  }

  if (isAuthReady && !canManage) {
    return (
      <section className="training-admin-page">
        <div className="training-admin-lock">
          <div className="eyebrow">Training Admin</div>
          <h2 className="page-title">权限不足</h2>
          <p className="page-description">当前账号不是 teacher/admin，不能维护实训配置。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="training-admin-page">
      <header className="training-admin-head">
        <div>
          <div className="eyebrow">Training Admin</div>
          <h2 className="page-title">实训配置后台</h2>
          <p className="page-description">维护案例、地图供应商、谈判脚本、报价单规格和五步流程。</p>
        </div>
        <div className="training-admin-actions">
          <button className="button-secondary" type="button" onClick={createTemplate}>新建模板</button>
          <button className="button-primary" type="button" onClick={save} disabled={isSaving}>{isSaving ? "保存中..." : "保存配置"}</button>
        </div>
      </header>

      {message ? <div className="training-admin-message">{message}</div> : null}

      <div className="training-admin-layout">
        <aside className="training-admin-list">
          <div className="training-section-head">
            <h3 className="section-title">案例列表</h3>
            <span className="training-meta">{isLoading ? "加载中" : `${cases.length} 个`}</span>
          </div>
          {cases.map((item) => (
            <button
              key={item.id}
              className={`training-admin-case${item.id === selectedId ? " is-active" : ""}`}
              type="button"
              onClick={() => setSelectedId(item.id)}
            >
              <strong>{item.title}</strong>
              <span>{item.slug || `case-${item.id}`} · {item.status || "draft"}</span>
            </button>
          ))}
          {cases.length === 0 ? <div className="training-empty">暂无案例，可先新建模板。</div> : null}
        </aside>

        <main className="training-admin-form">
          <section className="training-admin-card">
            <div className="training-admin-card-head">
              <div>
                <h3 className="section-title">基础信息</h3>
                <p>学生端案例说明、配图和流程控制使用这些配置。</p>
              </div>
              {selectedId ? (
                <div className="training-admin-actions">
                  <button className="route-link" type="button" onClick={() => void publish(true)} disabled={isSaving}>发布</button>
                  <button className="route-link" type="button" onClick={() => void publish(false)} disabled={isSaving}>下线</button>
                </div>
              ) : null}
            </div>
            <div className="training-admin-grid">
              <label className="training-admin-field"><span>案例名称</span><input value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} /></label>
              <label className="training-admin-field"><span>业务 slug</span><input value={draft.slug ?? ""} onChange={(event) => updateDraft("slug", event.target.value)} /></label>
              <label className="training-admin-field"><span>配图地址</span><input value={draft.cover_image_url ?? ""} onChange={(event) => updateDraft("cover_image_url", event.target.value)} /></label>
              <label className="training-admin-field"><span>分类</span><input value={draft.category} onChange={(event) => updateDraft("category", event.target.value)} /></label>
              <label className="training-admin-field"><span>难度</span><input type="number" min={1} max={5} value={draft.difficulty} onChange={(event) => updateDraft("difficulty", toNumber(event.target.value, 1))} /></label>
              <label className="training-admin-field"><span>步骤数</span><input type="number" min={1} value={draft.total_steps} onChange={(event) => updateDraft("total_steps", toNumber(event.target.value, 5))} /></label>
            </div>
            <label className="training-admin-field"><span>案例背景</span><textarea value={draft.background ?? ""} onChange={(event) => updateDraft("background", event.target.value)} /></label>
            <label className="training-admin-field"><span>教学目标</span><textarea value={draft.objective ?? ""} onChange={(event) => updateDraft("objective", event.target.value)} /></label>
          </section>

          <section className="training-admin-card">
            <div className="training-admin-card-head">
              <div>
                <h3 className="section-title">Step 02 地图供应商</h3>
                <p>学生会在地图上看到候选供应商。合格字段用于自动评分。</p>
              </div>
              <button
                className="button-secondary"
                type="button"
                onClick={() => updateDraft("suppliers", [...draft.suppliers, { ...EMPTY_SUPPLIER, sort_order: draft.suppliers.length + 1 }])}
              >
                添加供应商
              </button>
            </div>
            <div className="training-admin-supplier-list">
              {draft.suppliers.map((supplier, index) => (
                <article key={`${supplier.code}-${index}`} className="training-admin-supplier">
                  <div className="training-admin-card-head">
                    <strong>{supplier.code || `供应商 ${index + 1}`}</strong>
                    <button className="route-link" type="button" onClick={() => updateDraft("suppliers", draft.suppliers.filter((_, i) => i !== index))}>删除</button>
                  </div>
                  <div className="training-admin-grid">
                    <label className="training-admin-field"><span>编号</span><input value={supplier.code ?? ""} onChange={(event) => updateSupplier(index, { code: event.target.value })} /></label>
                    <label className="training-admin-field"><span>名称</span><input value={supplier.name} onChange={(event) => updateSupplier(index, { name: event.target.value })} /></label>
                    <label className="training-admin-field"><span>所在地</span><input value={supplier.location ?? ""} onChange={(event) => updateSupplier(index, { location: event.target.value })} /></label>
                    <label className="training-admin-field"><span>认证，逗号分隔</span><input value={listToCsv(supplier.certifications)} onChange={(event) => updateSupplier(index, { certifications: csvToList(event.target.value) })} /></label>
                    <label className="training-admin-field"><span>产能</span><input value={supplier.capacity ?? ""} onChange={(event) => updateSupplier(index, { capacity: event.target.value })} /></label>
                    <label className="training-admin-field"><span>报价文本</span><input value={supplier.price_text ?? ""} onChange={(event) => updateSupplier(index, { price_text: event.target.value })} /></label>
                    <label className="training-admin-field"><span>纬度</span><input type="number" value={supplier.latitude ?? ""} onChange={(event) => updateSupplier(index, { latitude: toNumber(event.target.value) })} /></label>
                    <label className="training-admin-field"><span>经度</span><input type="number" value={supplier.longitude ?? ""} onChange={(event) => updateSupplier(index, { longitude: toNumber(event.target.value) })} /></label>
                    <label className="training-admin-field"><span>图片地址</span><input value={supplier.image_url ?? ""} onChange={(event) => updateSupplier(index, { image_url: event.target.value })} /></label>
                  </div>
                  <label className="training-admin-field"><span>简介</span><textarea value={supplier.brief ?? ""} onChange={(event) => updateSupplier(index, { brief: event.target.value })} /></label>
                  <label className="training-admin-field"><span>risk_note 字段</span><textarea value={supplier.risk_note ?? ""} onChange={(event) => updateSupplier(index, { risk_note: event.target.value })} /></label>
                  <div className="training-admin-checks">
                    <label><input type="checkbox" checked={supplier.is_candidate ?? true} onChange={(event) => updateSupplier(index, { is_candidate: event.target.checked })} /> 候选供应商</label>
                    <label><input type="checkbox" checked={supplier.is_qualified ?? false} onChange={(event) => updateSupplier(index, { is_qualified: event.target.checked })} /> 合格供应商</label>
                    <label><input type="checkbox" checked={supplier.is_recommended ?? false} onChange={(event) => updateSupplier(index, { is_recommended: event.target.checked })} /> 推荐/标准答案</label>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="training-admin-card">
            <div className="training-admin-card-head">
              <div>
                <h3 className="section-title">Step 03 谈判初始条款</h3>
                <p>通常与 Step 02 的供应商编号一致。学生选哪家，就取哪家的初始条款。</p>
              </div>
              <button
                className="button-secondary"
                type="button"
                onClick={() =>
                  updateDraft("negotiation_suppliers", [
                    ...(draft.negotiation_suppliers ?? []),
                    { supplier_code: "", supplier_name: "", init_price: 0, init_payment_days: 30, init_warranty_months: 12 },
                  ])
                }
              >
                添加谈判供应商
              </button>
            </div>
            <div className="training-admin-supplier-list">
              {(draft.negotiation_suppliers ?? []).map((supplier, index) => (
                <article key={`${supplier.supplier_code}-${index}`} className="training-admin-supplier">
                  <div className="training-admin-grid">
                    <label className="training-admin-field"><span>供应商编号</span><input value={supplier.supplier_code} onChange={(event) => updateNegotiationSupplier(index, { supplier_code: event.target.value })} /></label>
                    <label className="training-admin-field"><span>供应商名称</span><input value={supplier.supplier_name} onChange={(event) => updateNegotiationSupplier(index, { supplier_name: event.target.value })} /></label>
                    <label className="training-admin-field"><span>初始单价</span><input type="number" value={supplier.init_price} onChange={(event) => updateNegotiationSupplier(index, { init_price: toNumber(event.target.value) })} /></label>
                    <label className="training-admin-field"><span>初始账期</span><input type="number" value={supplier.init_payment_days} onChange={(event) => updateNegotiationSupplier(index, { init_payment_days: toNumber(event.target.value, 30) })} /></label>
                    <label className="training-admin-field"><span>初始质保月数</span><input type="number" value={supplier.init_warranty_months} onChange={(event) => updateNegotiationSupplier(index, { init_warranty_months: toNumber(event.target.value, 12) })} /></label>
                  </div>
                  <button className="route-link" type="button" onClick={() => updateDraft("negotiation_suppliers", (draft.negotiation_suppliers ?? []).filter((_, i) => i !== index))}>删除</button>
                </article>
              ))}
            </div>
          </section>

          <section className="training-admin-card">
            <div className="training-admin-card-head">
              <div>
                <h3 className="section-title">Step 03 谈判选项</h3>
                <p>所有供应商共用同一套话术。每轮建议配置 3 个选项。</p>
              </div>
              <button
                className="button-secondary"
                type="button"
                onClick={() => updateDraft("negotiation_options", [...(draft.negotiation_options ?? []), { ...EMPTY_NEGOTIATION_OPTION }])}
              >
                添加选项
              </button>
            </div>
            <div className="training-admin-step-list">
              {(draft.negotiation_options ?? []).map((option, index) => (
                <article key={`${option.round_no}-${index}`} className="training-admin-step">
                  <div className="training-admin-grid">
                    <label className="training-admin-field"><span>轮次</span><input type="number" value={option.round_no} onChange={(event) => updateNegotiationOption(index, { round_no: toNumber(event.target.value, 1) })} /></label>
                    <label className="training-admin-field"><span>顺序</span><input type="number" value={option.sort_order} onChange={(event) => updateNegotiationOption(index, { sort_order: toNumber(event.target.value, 1) })} /></label>
                    <label className="training-admin-field"><span>影响字段</span><select value={option.affect_field} onChange={(event) => updateNegotiationOption(index, { affect_field: event.target.value })}><option value="price">价格</option><option value="payment_days">账期</option><option value="warranty_months">质保</option></select></label>
                    <label className="training-admin-field"><span>变化值</span><input type="number" step="0.1" value={option.delta_value} onChange={(event) => updateNegotiationOption(index, { delta_value: toNumber(event.target.value) })} /></label>
                  </div>
                  <label className="training-admin-field"><span>学生话术</span><textarea value={option.ask} onChange={(event) => updateNegotiationOption(index, { ask: event.target.value })} /></label>
                  <label className="training-admin-field"><span>供应商回应</span><textarea value={option.answer} onChange={(event) => updateNegotiationOption(index, { answer: event.target.value })} /></label>
                  <button className="route-link" type="button" onClick={() => updateDraft("negotiation_options", (draft.negotiation_options ?? []).filter((_, i) => i !== index))}>删除</button>
                </article>
              ))}
            </div>
          </section>

          <section className="training-admin-card">
            <h3 className="section-title">Step 04 报价单规格</h3>
            <div className="training-admin-step-list">
              {quoteSpecs.map((spec, index) => (
                <article key={`${spec.fieldKey}-${index}`} className="training-admin-step">
                  <div className="training-admin-grid">
                    <label className="training-admin-field"><span>序号</span><input type="number" value={spec.orderIndex} onChange={(event) => updateQuoteSpec(index, { orderIndex: toNumber(event.target.value, index + 1) })} /></label>
                    <label className="training-admin-field"><span>字段 key</span><input value={spec.fieldKey} onChange={(event) => updateQuoteSpec(index, { fieldKey: event.target.value })} /></label>
                    <label className="training-admin-field"><span>名称</span><input value={spec.label} onChange={(event) => updateQuoteSpec(index, { label: event.target.value })} /></label>
                    <label className="training-admin-field"><span>控件类型</span><select value={spec.inputType} onChange={(event) => updateQuoteSpec(index, { inputType: event.target.value as QuoteSpecConfig["inputType"] })}><option value="number">数字</option><option value="select">单选</option><option value="text">文本</option></select></label>
                    <label className="training-admin-field"><span>默认值</span><input value={spec.value} onChange={(event) => updateQuoteSpec(index, { value: event.target.value })} /></label>
                    <label className="training-admin-field"><span>正确值</span><input value={spec.expectedValue ?? ""} onChange={(event) => updateQuoteSpec(index, { expectedValue: event.target.value })} /></label>
                    <label className="training-admin-field"><span>最小值</span><input type="number" value={spec.numericMin ?? ""} onChange={(event) => updateQuoteSpec(index, { numericMin: event.target.value ? toNumber(event.target.value) : undefined })} /></label>
                    <label className="training-admin-field"><span>最大值</span><input type="number" value={spec.numericMax ?? ""} onChange={(event) => updateQuoteSpec(index, { numericMax: event.target.value ? toNumber(event.target.value) : undefined })} /></label>
                  </div>
                  <label className="training-admin-field">
                    <span>单选项 JSON</span>
                    <textarea
                      value={JSON.stringify(spec.options ?? [], null, 2)}
                      onChange={(event) => {
                        try {
                          updateQuoteSpec(index, { options: JSON.parse(event.target.value) });
                        } catch {
                          setMessage("单选项 JSON 格式不正确。");
                        }
                      }}
                    />
                  </label>
                </article>
              ))}
            </div>
          </section>

          <section className="training-admin-card">
            <h3 className="section-title">五步流程</h3>
            <div className="training-admin-step-list">
              {draft.steps.map((step, index) => (
                <article key={`${step.step}-${index}`} className="training-admin-step">
                  <div className="training-admin-grid">
                    <label className="training-admin-field"><span>步骤</span><input type="number" value={step.step} onChange={(event) => updateStep(index, { step: toNumber(event.target.value, index + 1) })} /></label>
                    <label className="training-admin-field"><span>标题</span><input value={step.title} onChange={(event) => updateStep(index, { title: event.target.value })} /></label>
                    <label className="training-admin-field"><span>类型</span><input value={step.interaction_type ?? ""} onChange={(event) => updateStep(index, { interaction_type: event.target.value })} /></label>
                  </div>
                  <label className="training-admin-field"><span>步骤说明</span><textarea value={step.scene_description ?? ""} onChange={(event) => updateStep(index, { scene_description: event.target.value })} /></label>
                </article>
              ))}
            </div>
          </section>

          <section className="training-admin-card">
            <button className="button-secondary" type="button" onClick={() => setShowJson((current) => !current)}>
              {showJson ? "收起完整 JSON" : "查看完整 JSON"}
            </button>
            {showJson ? <textarea className="training-admin-json" value={JSON.stringify(draft, null, 2)} readOnly spellCheck={false} /> : null}
          </section>
        </main>
      </div>
    </section>
  );
}
