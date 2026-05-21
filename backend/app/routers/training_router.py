from fastapi import APIRouter, Depends, HTTPException, Path, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.response import ok
from app.models.models import User
from app.schemas.training_schemas import (
    NegotiateRequest,
    NegotiationSubmitRequest,
    PurchaseQuoteSubmit,
    StepSubmitRequest,
    TrainingCaseConfigIn,
)
from app.services.training_service import (
    create_admin_case_config_service,
    get_admin_case_config_service,
    get_case_detail_service,
    get_case_detail_by_slug_service,
    get_report_service,
    get_purchase_quote_service,
    get_step_service,
    list_case_suppliers_service,
    list_admin_case_configs_service,
    list_cases_service,
    list_negotiation_options_service,
    list_negotiation_suppliers_service,
    negotiate_service,
    publish_admin_case_config_service,
    save_purchase_quote_service,
    submit_negotiation_service,
    submit_step_service,
    update_admin_case_config_service,
)

router = APIRouter(prefix="/training", tags=["实训"])


def ensure_training_admin(user: User) -> None:
    if user.role not in {"teacher", "admin"}:
        raise HTTPException(
            status_code=403,
            detail={"code": 40303, "message": "仅教师或管理员可管理实训配置"},
        )


@router.get("/admin/cases")
async def admin_list_cases(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ensure_training_admin(current_user)
    cases = await list_admin_case_configs_service(db)
    return ok([c.model_dump(mode="json") for c in cases])


@router.post("/admin/cases")
async def admin_create_case(
    req: TrainingCaseConfigIn,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ensure_training_admin(current_user)
    config = await create_admin_case_config_service(db, req)
    return ok(config.model_dump(mode="json"))


@router.get("/admin/cases/{case_id}")
async def admin_get_case(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ensure_training_admin(current_user)
    config = await get_admin_case_config_service(db, case_id)
    return ok(config.model_dump(mode="json"))


@router.put("/admin/cases/{case_id}")
async def admin_update_case(
    req: TrainingCaseConfigIn,
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ensure_training_admin(current_user)
    config = await update_admin_case_config_service(db, case_id, req)
    return ok(config.model_dump(mode="json"))


@router.post("/admin/cases/{case_id}/publish")
async def admin_publish_case(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ensure_training_admin(current_user)
    config = await publish_admin_case_config_service(db, case_id, "published")
    return ok(config.model_dump(mode="json"))


@router.post("/admin/cases/{case_id}/unpublish")
async def admin_unpublish_case(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ensure_training_admin(current_user)
    config = await publish_admin_case_config_service(db, case_id, "draft")
    return ok(config.model_dump(mode="json"))


@router.get("/cases")
async def list_cases(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cases = await list_cases_service(db)
    return ok([c.model_dump(mode="json") for c in cases])


@router.get("/cases/slug/{slug}")
async def get_case_by_slug(
    slug: str = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    detail = await get_case_detail_by_slug_service(db, slug)
    return ok(detail.model_dump(mode="json"))


@router.get("/cases/{case_id}")
async def get_case(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    detail = await get_case_detail_service(db, case_id)
    return ok(detail.model_dump(mode="json"))


@router.get("/cases/{case_id}/suppliers")
async def get_case_suppliers(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    suppliers = await list_case_suppliers_service(db, case_id)
    return ok([item.model_dump(mode="json") for item in suppliers])


@router.get("/cases/{case_id}/steps/{step}")
async def get_step(
    case_id: int = Path(...),
    step: int = Path(..., ge=1, le=20),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    config = await get_step_service(db, case_id, step)
    return ok(config.model_dump(mode="json"))


@router.get("/cases/{case_id}/negotiation/suppliers")
async def get_negotiation_suppliers(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    suppliers = await list_negotiation_suppliers_service(db, case_id)
    return ok([item.model_dump(mode="json") for item in suppliers])


@router.get("/cases/{case_id}/negotiation/options")
async def get_negotiation_options(
    case_id: int = Path(...),
    round_no: int = Query(..., ge=1, le=20),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    options = await list_negotiation_options_service(db, case_id, round_no)
    return ok([item.model_dump(mode="json") for item in options])


@router.post("/cases/{case_id}/negotiation/submit")
async def submit_negotiation(
    req: NegotiationSubmitRequest,
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await submit_negotiation_service(db, current_user.id, case_id, req)
    return ok(result.model_dump(mode="json"))


@router.post("/cases/{case_id}/steps/{step}/submit")
async def submit_step(
    req: StepSubmitRequest,
    case_id: int = Path(...),
    step: int = Path(..., ge=1, le=20),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await submit_step_service(db, current_user.id, case_id, step, req)
    return ok(result.model_dump(mode="json"))


@router.post("/cases/{case_id}/negotiate")
async def negotiate(
    req: NegotiateRequest,
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await negotiate_service(db, current_user.id, case_id, req)
    return ok(result.model_dump(mode="json"))


@router.post("/cases/{case_id}/purchase-quote")
async def save_purchase_quote(
    req: PurchaseQuoteSubmit,
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await save_purchase_quote_service(db, current_user.id, case_id, req)
    return ok(result.model_dump(mode="json"))


@router.get("/cases/{case_id}/purchase-quote")
async def get_purchase_quote(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await get_purchase_quote_service(db, current_user.id, case_id)
    return ok(result.model_dump(mode="json"))


@router.get("/cases/{case_id}/report")
async def get_report(
    case_id: int = Path(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    report = await get_report_service(db, current_user.id, case_id)
    return ok(report.model_dump(mode="json"))
