import { request } from "../../../lib/api/http";

export type TrainingCase = {
  id: number;
  slug?: string | null;
  title: string;
  category: string;
  difficulty: number;
  status?: string;
  total_steps?: number;
  max_attempts?: number;
  background?: string | null;
  objective?: string | null;
  cover_image_url?: string | null;
};

export type TrainingSupplier = {
  id: number;
  code?: string | null;
  name: string;
  location?: string | null;
  certifications?: string[] | null;
  capacity?: string | null;
  price_text?: string | null;
  risk_note?: string | null;
  brief?: string | null;
  supplier_type?: string | null;
  is_candidate?: boolean;
  is_qualified?: boolean;
  is_recommended?: boolean;
  sort_order?: number;
  profile?: Record<string, unknown> | null;
  latitude?: number | null;
  longitude?: number | null;
  image_url?: string | null;
};

export type TrainingCaseDetail = TrainingCase & {
  scoring_weights?: Record<string, number> | null;
  case_config?: Record<string, unknown> | null;
  suppliers: TrainingSupplier[];
  total_steps: number;
  max_attempts?: number;
  steps?: TrainingStepConfig[];
};

export type TrainingFormField = {
  name?: string;
  key?: string;
  label?: string;
  title?: string;
  type?: string;
  placeholder?: string;
  options?: Array<string | { label: string; value: string }>;
  required?: boolean;
};

export type TrainingStepConfig = {
  id?: number;
  step: number;
  step_key?: string | null;
  title: string;
  scene_description?: string | null;
  interaction_type?: string | null;
  sort_order?: number;
  is_required?: boolean;
  form_schema?: {
    fields?: TrainingFormField[];
    properties?: Record<string, TrainingFormField>;
    required?: string[];
    specs?: Array<Record<string, unknown>>;
  } | null;
  scoring_rules?: Record<string, unknown> | null;
  resources?: Record<string, unknown> | null;
};

export type DimensionScores = {
  compliance: number;
  quality: number;
  cost: number;
  delivery: number;
  negotiation: number;
};

export type StepSubmitResponse = {
  score: number;
  dimension_scores: Record<string, number>;
  feedback: string;
  is_last_step: boolean;
};

export type NegotiateResponse = {
  conversation_id: string;
  message_id: string;
  content: string;
};

export type NegotiationSupplier = {
  id: number;
  case_id: number;
  supplier_code: string;
  supplier_name: string;
  init_price: number;
  init_payment_days: number;
  init_warranty_months: number;
};

export type NegotiationOption = {
  id: number;
  case_id: number;
  round_no: number;
  ask: string;
  answer: string;
  affect_field: "price" | "payment_days" | "warranty_months" | string;
  delta_value: number;
  sort_order: number;
};

export type NegotiationSubmitPayload = {
  supplier_code: string;
  picked_option_ids: number[];
  final_price: number;
  payment_days: number;
  warranty_months: number;
  time_spent_seconds?: number | null;
};

export type NegotiationSubmitResponse = {
  score: number;
  dimension_scores: Record<string, number>;
  result_snapshot: Record<string, unknown>;
  feedback: string;
};

export type PurchaseQuoteSpec = {
  order_index: number;
  field_key: string;
  label: string;
  value: string;
  unit?: string | null;
  requirement_type?: string | null;
  input_type?: string | null;
  expected_value?: string | null;
  numeric_min?: number | null;
  numeric_max?: number | null;
  options?: Array<{ label: string; value: string }> | null;
  is_required?: boolean;
};

export type PurchaseQuotePayload = {
  category: string;
  item_name: string;
  annual_quantity: string;
  unit: string;
  delivery_cycle: string;
  quote_validity: string;
  tax_mode?: string | null;
  supplier_code?: string | null;
  supplier_name?: string | null;
  unit_price?: number | null;
  estimated_total?: number | null;
  payment_terms?: string | null;
  warranty_months?: number | null;
  remarks?: string | null;
  specs: PurchaseQuoteSpec[];
};

export type PurchaseQuoteResponse = PurchaseQuotePayload & {
  id: number;
  case_id: number;
  status: string;
  specs: Array<PurchaseQuoteSpec & { id: number }>;
};

export type TrainingReport = {
  case_id: number;
  title: string;
  total_score: number;
  dimension_scores: Record<string, number>;
  steps_completed: number;
  steps_total: number;
  feedback_summary: string;
};

export function fetchTrainingCases(token: string): Promise<TrainingCase[]> {
  return request<TrainingCase[]>("/training/cases", { token });
}

export function fetchTrainingCaseDetail(
  caseId: number,
  token: string,
): Promise<TrainingCaseDetail> {
  return request<TrainingCaseDetail>(`/training/cases/${caseId}`, { token });
}

export function fetchTrainingCaseBySlug(
  slug: string,
  token: string,
): Promise<TrainingCaseDetail> {
  return request<TrainingCaseDetail>(`/training/cases/slug/${slug}`, { token });
}

export function fetchTrainingSuppliers(
  caseId: number,
  token: string,
): Promise<TrainingSupplier[]> {
  return request<TrainingSupplier[]>(`/training/cases/${caseId}/suppliers`, { token });
}

export function fetchTrainingStep(
  caseId: number,
  step: number,
  token: string,
): Promise<TrainingStepConfig> {
  return request<TrainingStepConfig>(`/training/cases/${caseId}/steps/${step}`, {
    token,
  });
}

export function fetchNegotiationSuppliers(
  caseId: number,
  token: string,
): Promise<NegotiationSupplier[]> {
  return request<NegotiationSupplier[]>(
    `/training/cases/${caseId}/negotiation/suppliers`,
    { token },
  );
}

export function fetchNegotiationOptions(
  caseId: number,
  roundNo: number,
  token: string,
): Promise<NegotiationOption[]> {
  return request<NegotiationOption[]>(
    `/training/cases/${caseId}/negotiation/options?round_no=${roundNo}`,
    { token },
  );
}

export function submitNegotiationResult(
  caseId: number,
  payload: NegotiationSubmitPayload,
  token: string,
): Promise<NegotiationSubmitResponse> {
  return request<NegotiationSubmitResponse>(
    `/training/cases/${caseId}/negotiation/submit`,
    {
      method: "POST",
      token,
      body: payload,
    },
  );
}

export function submitTrainingStep(
  caseId: number,
  step: number,
  answers: Record<string, unknown>,
  timeSpentSeconds: number,
  token: string,
  extra?: {
    score?: number;
    dimension_scores?: Record<string, number>;
    result_snapshot?: Record<string, unknown>;
  },
): Promise<StepSubmitResponse> {
  return request<StepSubmitResponse>(
    `/training/cases/${caseId}/steps/${step}/submit`,
    {
      method: "POST",
      token,
      body: {
        answers,
        time_spent_seconds: timeSpentSeconds,
        ...extra,
      },
    },
  );
}

export function sendNegotiationMessage(
  caseId: number,
  content: string,
  token: string,
  conversationId?: string | null,
  supplierId?: number | null,
): Promise<NegotiateResponse> {
  return request<NegotiateResponse>(`/training/cases/${caseId}/negotiate`, {
    method: "POST",
    token,
    body: {
      conversation_id: conversationId,
      content,
      supplier_id: supplierId,
    },
  });
}

export function fetchTrainingReport(
  caseId: number,
  token: string,
): Promise<TrainingReport> {
  return request<TrainingReport>(`/training/cases/${caseId}/report`, { token });
}

export function savePurchaseQuote(
  caseId: number,
  payload: PurchaseQuotePayload,
  token: string,
): Promise<PurchaseQuoteResponse> {
  return request<PurchaseQuoteResponse>(`/training/cases/${caseId}/purchase-quote`, {
    method: "POST",
    token,
    body: payload,
  });
}

export type TrainingSupplierConfig = Omit<TrainingSupplier, "id"> & {
  id?: number;
};

export type TrainingNegotiationSupplierConfig = Omit<NegotiationSupplier, "id" | "case_id"> & {
  id?: number;
};

export type TrainingNegotiationOptionConfig = Omit<NegotiationOption, "id" | "case_id"> & {
  id?: number;
};

export type TrainingCaseConfig = Omit<TrainingCaseDetail, "id" | "suppliers" | "steps"> & {
  id?: number;
  suppliers: TrainingSupplierConfig[];
  negotiation_suppliers?: TrainingNegotiationSupplierConfig[];
  negotiation_options?: TrainingNegotiationOptionConfig[];
  steps: TrainingStepConfig[];
};

export function fetchAdminTrainingCases(token: string): Promise<TrainingCase[]> {
  return request<TrainingCase[]>("/training/admin/cases", { token });
}

export function fetchAdminTrainingCaseConfig(
  caseId: number,
  token: string,
): Promise<TrainingCaseConfig> {
  return request<TrainingCaseConfig>(`/training/admin/cases/${caseId}`, { token });
}

export function createAdminTrainingCaseConfig(
  config: TrainingCaseConfig,
  token: string,
): Promise<TrainingCaseConfig> {
  return request<TrainingCaseConfig>("/training/admin/cases", {
    method: "POST",
    token,
    body: config,
  });
}

export function updateAdminTrainingCaseConfig(
  caseId: number,
  config: TrainingCaseConfig,
  token: string,
): Promise<TrainingCaseConfig> {
  return request<TrainingCaseConfig>(`/training/admin/cases/${caseId}`, {
    method: "PUT",
    token,
    body: config,
  });
}

export function publishAdminTrainingCase(
  caseId: number,
  token: string,
): Promise<TrainingCaseConfig> {
  return request<TrainingCaseConfig>(`/training/admin/cases/${caseId}/publish`, {
    method: "POST",
    token,
  });
}

export function unpublishAdminTrainingCase(
  caseId: number,
  token: string,
): Promise<TrainingCaseConfig> {
  return request<TrainingCaseConfig>(`/training/admin/cases/${caseId}/unpublish`, {
    method: "POST",
    token,
  });
}
