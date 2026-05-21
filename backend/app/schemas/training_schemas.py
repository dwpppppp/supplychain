from typing import Optional, Any
from pydantic import BaseModel


class TrainingCaseOut(BaseModel):
    id: int
    slug: Optional[str] = None
    title: str
    category: str
    difficulty: int
    status: str = "draft"
    total_steps: int = 5
    max_attempts: int = 4
    background: Optional[str]
    objective: Optional[str]
    cover_image_url: Optional[str] = None

    model_config = {"from_attributes": True}


class SupplierOut(BaseModel):
    id: int
    code: Optional[str] = None
    name: str
    location: Optional[str]
    certifications: Optional[list]
    capacity: Optional[str]
    price_text: Optional[str] = None
    risk_note: Optional[str] = None
    brief: Optional[str]
    supplier_type: Optional[str] = None
    is_candidate: bool = True
    is_qualified: bool = False
    is_recommended: bool = False
    sort_order: int = 0
    profile: Optional[dict] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None

    model_config = {"from_attributes": True}


class StepConfigOut(BaseModel):
    id: Optional[int] = None
    step: int
    step_key: Optional[str] = None
    title: str
    scene_description: Optional[str]
    interaction_type: Optional[str]
    sort_order: int = 0
    is_required: bool = True
    form_schema: Optional[dict]
    scoring_rules: Optional[dict] = None
    resources: Optional[dict]

    model_config = {"from_attributes": True}


class TrainingCaseDetail(TrainingCaseOut):
    scoring_weights: Optional[dict]
    case_config: Optional[dict] = None
    suppliers: list[SupplierOut] = []
    steps: list[StepConfigOut] = []


class StepSubmitRequest(BaseModel):
    answers: dict[str, Any]
    score: Optional[float] = None
    dimension_scores: Optional[dict[str, Any]] = None
    result_snapshot: Optional[dict[str, Any]] = None
    attempt_no: Optional[int] = 1
    time_spent_seconds: Optional[int] = None


class DimensionScore(BaseModel):
    compliance: float = 0
    quality: float = 0
    cost: float = 0
    delivery: float = 0
    negotiation: float = 0


class StepSubmitResponse(BaseModel):
    score: float
    dimension_scores: DimensionScore
    feedback: str
    is_last_step: bool


class NegotiateRequest(BaseModel):
    conversation_id: Optional[str] = None
    content: str
    supplier_id: Optional[int] = None


class NegotiateResponse(BaseModel):
    conversation_id: str
    message_id: str
    content: str


class NegotiationSupplierOut(BaseModel):
    id: int
    case_id: int
    supplier_code: str
    supplier_name: str
    init_price: float
    init_payment_days: int
    init_warranty_months: int

    model_config = {"from_attributes": True}


class NegotiationOptionOut(BaseModel):
    id: int
    case_id: int
    round_no: int
    ask: str
    answer: str
    affect_field: str
    delta_value: float
    sort_order: int = 0

    model_config = {"from_attributes": True}


class NegotiationSubmitRequest(BaseModel):
    supplier_code: str
    picked_option_ids: list[int]
    final_price: float
    payment_days: int
    warranty_months: int
    time_spent_seconds: Optional[int] = None


class NegotiationSubmitResponse(BaseModel):
    score: float
    dimension_scores: dict[str, float]
    result_snapshot: dict[str, Any]
    feedback: str


class PurchaseQuoteSpecIn(BaseModel):
    order_index: int
    field_key: str
    label: str
    value: str
    unit: Optional[str] = None
    requirement_type: Optional[str] = None
    input_type: Optional[str] = "text"
    expected_value: Optional[str] = None
    numeric_min: Optional[float] = None
    numeric_max: Optional[float] = None
    options: Optional[list[dict[str, Any]]] = None
    is_required: bool = True


class PurchaseQuoteSpecOut(PurchaseQuoteSpecIn):
    id: int

    model_config = {"from_attributes": True}


class PurchaseQuoteSubmit(BaseModel):
    category: str
    item_name: str
    annual_quantity: str
    unit: str
    delivery_cycle: str
    quote_validity: str
    tax_mode: Optional[str] = None
    supplier_code: Optional[str] = None
    supplier_name: Optional[str] = None
    unit_price: Optional[float] = None
    estimated_total: Optional[float] = None
    payment_terms: Optional[str] = None
    warranty_months: Optional[int] = None
    remarks: Optional[str] = None
    specs: list[PurchaseQuoteSpecIn]


class PurchaseQuoteOut(PurchaseQuoteSubmit):
    id: int
    case_id: int
    status: str
    specs: list[PurchaseQuoteSpecOut]

    model_config = {"from_attributes": True}


class TrainingReport(BaseModel):
    case_id: int
    title: str
    total_score: float
    dimension_scores: dict[str, float]
    steps_completed: int
    steps_total: int
    feedback_summary: str


class TrainingSupplierConfigIn(BaseModel):
    id: Optional[int] = None
    code: Optional[str] = None
    name: str
    location: Optional[str] = None
    certifications: Optional[list[Any]] = None
    capacity: Optional[str] = None
    brief: Optional[str] = None
    supplier_type: Optional[str] = None
    is_candidate: bool = True
    is_qualified: bool = False
    is_recommended: bool = False
    sort_order: int = 0
    profile: Optional[dict[str, Any]] = None
    price_text: Optional[str] = None
    risk_note: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    image_url: Optional[str] = None


class TrainingNegotiationSupplierConfigIn(BaseModel):
    id: Optional[int] = None
    supplier_code: str
    supplier_name: str
    init_price: float
    init_payment_days: int = 30
    init_warranty_months: int = 12


class TrainingNegotiationOptionConfigIn(BaseModel):
    id: Optional[int] = None
    round_no: int
    ask: str
    answer: str
    affect_field: str = "price"
    delta_value: float = 0
    sort_order: int = 0


class TrainingStepConfigIn(BaseModel):
    id: Optional[int] = None
    step: int
    step_key: Optional[str] = None
    title: str
    scene_description: Optional[str] = None
    interaction_type: Optional[str] = None
    sort_order: int = 0
    is_required: bool = True
    form_schema: Optional[dict[str, Any]] = None
    scoring_rules: Optional[dict[str, Any]] = None
    resources: Optional[dict[str, Any]] = None


class TrainingCaseConfigIn(BaseModel):
    slug: Optional[str] = None
    title: str
    category: str = "food"
    difficulty: int = 1
    status: str = "draft"
    total_steps: int = 5
    max_attempts: int = 4
    background: Optional[str] = None
    objective: Optional[str] = None
    cover_image_url: Optional[str] = None
    scoring_weights: Optional[dict[str, Any]] = None
    case_config: Optional[dict[str, Any]] = None
    suppliers: list[TrainingSupplierConfigIn] = []
    negotiation_suppliers: list[TrainingNegotiationSupplierConfigIn] = []
    negotiation_options: list[TrainingNegotiationOptionConfigIn] = []
    steps: list[TrainingStepConfigIn] = []


class TrainingCaseConfigOut(TrainingCaseDetail):
    negotiation_suppliers: list[NegotiationSupplierOut] = []
    negotiation_options: list[NegotiationOptionOut] = []
