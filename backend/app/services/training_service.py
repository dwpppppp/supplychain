from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.crud.training_crud import (
    create_step_submission,
    create_training_case_config,
    get_negotiation_supplier,
    get_purchase_quote,
    get_or_create_training_progress,
    get_training_case_by_slug,
    list_case_suppliers,
    list_negotiation_options,
    list_negotiation_options_by_ids,
    list_negotiation_suppliers,
    get_step_config,
    get_training_case,
    get_user_submissions,
    list_training_cases,
    list_training_cases_for_admin,
    update_training_case_config,
    upsert_purchase_quote,
)
from app.schemas.training_schemas import (
    DimensionScore,
    NegotiateRequest,
    NegotiateResponse,
    NegotiationOptionOut,
    NegotiationSubmitRequest,
    NegotiationSubmitResponse,
    NegotiationSupplierOut,
    PurchaseQuoteOut,
    PurchaseQuoteSpecOut,
    PurchaseQuoteSubmit,
    StepConfigOut,
    StepSubmitRequest,
    StepSubmitResponse,
    SupplierOut,
    TrainingCaseConfigIn,
    TrainingCaseConfigOut,
    TrainingCaseDetail,
    TrainingCaseOut,
    TrainingReport,
)
from app.engine.llm import chat_completion
from app.crud.chat_crud import (
    create_conversation,
    create_message,
    get_conversation,
    get_recent_messages,
)


def _sorted_suppliers(case) -> list:
    return sorted(case.suppliers, key=lambda item: (item.sort_order, item.id))


def _sorted_steps(case) -> list:
    return sorted(case.step_configs, key=lambda item: (item.sort_order, item.step, item.id))


def _case_detail(case) -> TrainingCaseDetail:
    return TrainingCaseDetail(
        id=case.id,
        slug=case.slug,
        title=case.title,
        category=case.category,
        difficulty=case.difficulty,
        status=case.status,
        total_steps=case.total_steps,
        max_attempts=case.max_attempts,
        background=case.background,
        objective=case.objective,
        cover_image_url=case.cover_image_url,
        scoring_weights=case.scoring_weights,
        case_config=case.case_config,
        suppliers=[SupplierOut.model_validate(s) for s in _sorted_suppliers(case)],
        steps=[StepConfigOut.model_validate(s) for s in _sorted_steps(case)],
    )


def _case_config(case) -> TrainingCaseConfigOut:
    detail = _case_detail(case).model_dump(mode="json")
    negotiation_suppliers = sorted(
        case.negotiation_suppliers,
        key=lambda item: (item.supplier_code, item.id),
    )
    negotiation_options = sorted(
        case.negotiation_options,
        key=lambda item: (item.round_no, item.sort_order, item.id),
    )
    return TrainingCaseConfigOut(
        **detail,
        negotiation_suppliers=[
            NegotiationSupplierOut.model_validate(item) for item in negotiation_suppliers
        ],
        negotiation_options=[
            NegotiationOptionOut.model_validate(item) for item in negotiation_options
        ],
    )


def _purchase_quote_out(quote) -> PurchaseQuoteOut:
    specs = sorted(quote.specs, key=lambda item: (item.order_index, item.id))
    return PurchaseQuoteOut(
        id=quote.id,
        case_id=quote.case_id,
        category=quote.category,
        item_name=quote.item_name,
        annual_quantity=quote.annual_quantity,
        unit=quote.unit,
        delivery_cycle=quote.delivery_cycle,
        quote_validity=quote.quote_validity,
        tax_mode=quote.tax_mode,
        supplier_code=quote.supplier_code,
        supplier_name=quote.supplier_name,
        unit_price=quote.unit_price,
        estimated_total=quote.estimated_total,
        payment_terms=quote.payment_terms,
        warranty_months=quote.warranty_months,
        remarks=quote.remarks,
        status=quote.status,
        specs=[PurchaseQuoteSpecOut.model_validate(item) for item in specs],
    )


async def list_cases_service(db: AsyncSession) -> list[TrainingCaseOut]:
    cases = await list_training_cases(db)
    return [TrainingCaseOut.model_validate(c) for c in cases]


async def get_case_detail_service(db: AsyncSession, case_id: int) -> TrainingCaseDetail:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    return _case_detail(case)


async def get_case_detail_by_slug_service(db: AsyncSession, slug: str) -> TrainingCaseDetail:
    case = await get_training_case_by_slug(db, slug)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    return _case_detail(case)


async def list_case_suppliers_service(db: AsyncSession, case_id: int) -> list[SupplierOut]:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    suppliers = await list_case_suppliers(db, case_id)
    return [SupplierOut.model_validate(item) for item in suppliers]


async def get_step_service(db: AsyncSession, case_id: int, step: int) -> StepConfigOut:
    config = await get_step_config(db, case_id, step)
    if not config:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "步骤不存在"})
    return StepConfigOut.model_validate(config)


async def list_negotiation_suppliers_service(
    db: AsyncSession, case_id: int
) -> list[NegotiationSupplierOut]:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    suppliers = await list_negotiation_suppliers(db, case_id)
    return [NegotiationSupplierOut.model_validate(item) for item in suppliers]


async def list_negotiation_options_service(
    db: AsyncSession, case_id: int, round_no: int
) -> list[NegotiationOptionOut]:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    options = await list_negotiation_options(db, case_id, round_no)
    return [NegotiationOptionOut.model_validate(item) for item in options]


def _score_negotiation(
    initial_price: float,
    final_price: float,
    initial_payment_days: int,
    payment_days: int,
    initial_warranty_months: int,
    warranty_months: int,
) -> tuple[float, dict[str, float]]:
    price_saving_rate = max(0.0, (initial_price - final_price) / initial_price)
    price_score = min(60.0, price_saving_rate / 0.1 * 60.0)
    payment_score = min(20.0, max(0, payment_days - initial_payment_days) * 1.0)
    warranty_score = min(20.0, max(0, warranty_months - initial_warranty_months) * 2.0)
    dimensions = {
        "price": round(price_score, 2),
        "payment": round(payment_score, 2),
        "warranty": round(warranty_score, 2),
    }
    return round(sum(dimensions.values()), 2), dimensions


async def submit_step_service(
    db: AsyncSession, user_id: int, case_id: int, step: int, req: StepSubmitRequest
) -> StepSubmitResponse:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})

    weights = case.scoring_weights or {
        "compliance": 0.2,
        "quality": 0.2,
        "cost": 0.2,
        "delivery": 0.2,
        "negotiation": 0.2,
    }

    if req.score is not None:
        score = max(0.0, min(100.0, float(req.score)))
        feedback_text = "已保存前端实训评分。"
    else:
        prompt_messages = [
            {
                "role": "user",
                "content": (
                    f"请评估学员在寻源实训案例《{case.title}》第{step}步的作答，"
                    f"给出 0-100 的综合评分和简短反馈（100字以内）。\n"
                    f"学员提交内容：{req.answers}"
                ),
            }
        ]
        feedback_text, _ = await chat_completion(prompt_messages)
        score = 75.0
        for line in feedback_text.split("\n"):
            import re

            match = re.search(r"(\d{2,3})\s*分", line)
            if match:
                score = min(100.0, float(match.group(1)))
                break

    dim = DimensionScore(
        compliance=score * weights.get("compliance", 0.2),
        quality=score * weights.get("quality", 0.2),
        cost=score * weights.get("cost", 0.2),
        delivery=score * weights.get("delivery", 0.2),
        negotiation=score * weights.get("negotiation", 0.2),
    )

    if req.dimension_scores:
        dim = DimensionScore(**req.dimension_scores)

    await create_step_submission(
        db,
        user_id,
        case_id,
        step,
        req.answers,
        score,
        dim.model_dump(),
        feedback_text,
        req.time_spent_seconds,
        req.result_snapshot,
        req.attempt_no or 1,
    )

    progress = await get_or_create_training_progress(db, user_id, case_id)
    progress.current_step = max(progress.current_step, step + 1)
    progress.status = "in_progress"
    is_last = step >= case.total_steps
    if is_last:
        progress.status = "completed"

    return StepSubmitResponse(
        score=score,
        dimension_scores=dim,
        feedback=feedback_text,
        is_last_step=is_last,
    )


async def negotiate_service(
    db: AsyncSession, user_id: int, case_id: int, req: NegotiateRequest
) -> NegotiateResponse:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})

    conversation_id = req.conversation_id
    if conversation_id:
        conv = await get_conversation(db, conversation_id, user_id)
        if not conv:
            conversation_id = None
    if not conversation_id:
        conv = await create_conversation(db, user_id, scene="negotiate")
        conversation_id = conv.id

    await create_message(db, user_id, conversation_id, "user", req.content)
    history = await get_recent_messages(db, conversation_id, limit=20)
    lm_messages = [{"role": m.role, "content": m.content} for m in history]

    system = (
        f"你正在扮演供应商代表，参与《{case.title}》采购谈判。"
        "语气专业、务实，适当坚持立场，回复控制在 150 字以内。"
    )
    reply, _ = await chat_completion(lm_messages, system_prompt=system)
    ai_msg = await create_message(db, user_id, conversation_id, "assistant", reply)

    return NegotiateResponse(
        conversation_id=conversation_id,
        message_id=ai_msg.id,
        content=reply,
    )


async def submit_negotiation_service(
    db: AsyncSession, user_id: int, case_id: int, req: NegotiationSubmitRequest
) -> NegotiationSubmitResponse:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})

    supplier = await get_negotiation_supplier(db, case_id, req.supplier_code)
    if not supplier:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "谈判供应商不存在"})

    options = await list_negotiation_options_by_ids(db, case_id, req.picked_option_ids)
    if len(options) != len(set(req.picked_option_ids)):
        raise HTTPException(status_code=400, detail={"code": 40001, "message": "谈判选项不完整或不属于该案例"})

    option_by_id = {item.id: item for item in options}
    ordered_options = [option_by_id[item_id] for item_id in req.picked_option_ids]
    score, dimensions = _score_negotiation(
        float(supplier.init_price),
        req.final_price,
        supplier.init_payment_days,
        req.payment_days,
        supplier.init_warranty_months,
        req.warranty_months,
    )
    result_snapshot = {
        "supplier_code": req.supplier_code,
        "supplier_name": supplier.supplier_name,
        "initial_price": float(supplier.init_price),
        "final_price": req.final_price,
        "initial_payment_days": supplier.init_payment_days,
        "payment_days": req.payment_days,
        "initial_warranty_months": supplier.init_warranty_months,
        "warranty_months": req.warranty_months,
        "picked_options": [
            {
                "id": item.id,
                "round_no": item.round_no,
                "ask": item.ask,
                "answer": item.answer,
                "affect_field": item.affect_field,
                "delta_value": float(item.delta_value),
            }
            for item in ordered_options
        ],
    }
    feedback = f"谈判已保存，综合得分 {score:.1f} 分。"

    await create_step_submission(
        db,
        user_id,
        case_id,
        3,
        {
            "supplier_code": req.supplier_code,
            "picked_option_ids": req.picked_option_ids,
        },
        score,
        dimensions,
        feedback,
        req.time_spent_seconds,
        result_snapshot,
        1,
    )

    progress = await get_or_create_training_progress(db, user_id, case_id)
    progress.current_step = max(progress.current_step, 4)
    progress.status = "in_progress"

    return NegotiationSubmitResponse(
        score=score,
        dimension_scores=dimensions,
        result_snapshot=result_snapshot,
        feedback=feedback,
    )


async def get_report_service(db: AsyncSession, user_id: int, case_id: int) -> TrainingReport:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})

    submissions = await get_user_submissions(db, user_id, case_id)
    if not submissions:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "暂无实训记录"})

    latest_by_step = {}
    for submission in submissions:
        current = latest_by_step.get(submission.step)
        if not current or (submission.created_at, submission.id) > (current.created_at, current.id):
            latest_by_step[submission.step] = submission

    latest_submissions = [latest_by_step[key] for key in sorted(latest_by_step)]
    raw_scores = {submission.step: float(submission.score or 0) for submission in latest_submissions}
    # Step 01 is a reading step. The report should be a normalized 100-point score,
    # not the sum of every historical attempt.
    score_weights = {
        2: 0.25,
        3: 0.5,
        4: 0.25,
    }
    total_score = sum(
        min(100.0, raw_scores.get(step, 0.0)) * weight
        for step, weight in score_weights.items()
    )
    dim_totals: dict[str, float] = {}
    for submission in latest_submissions:
        ds = submission.dimension_scores or {}
        for key, value in ds.items():
            dim_totals[key] = dim_totals.get(key, 0.0) + float(value or 0)

    return TrainingReport(
        case_id=case_id,
        title=case.title,
        total_score=round(total_score, 1),
        dimension_scores={key: round(value, 2) for key, value in dim_totals.items()},
        steps_completed=len(latest_submissions),
        steps_total=case.total_steps,
        feedback_summary=f"你完成了 {len(latest_submissions)} 个步骤，当前综合得分 {total_score:.1f} 分。",
    )


async def save_purchase_quote_service(
    db: AsyncSession, user_id: int, case_id: int, req: PurchaseQuoteSubmit
) -> PurchaseQuoteOut:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    if not req.specs:
        raise HTTPException(status_code=400, detail={"code": 40001, "message": "规格明细不能为空"})

    quote = await upsert_purchase_quote(db, user_id, case_id, req.model_dump(mode="json"))
    progress = await get_or_create_training_progress(db, user_id, case_id)
    progress.current_step = max(progress.current_step, 5)
    progress.status = "in_progress"
    return _purchase_quote_out(quote)


async def get_purchase_quote_service(
    db: AsyncSession, user_id: int, case_id: int
) -> PurchaseQuoteOut:
    quote = await get_purchase_quote(db, user_id, case_id)
    if not quote:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "暂无采购报价单"})
    return _purchase_quote_out(quote)


async def list_admin_case_configs_service(db: AsyncSession) -> list[TrainingCaseOut]:
    cases = await list_training_cases_for_admin(db)
    return [TrainingCaseOut.model_validate(c) for c in cases]


async def get_admin_case_config_service(db: AsyncSession, case_id: int) -> TrainingCaseConfigOut:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    return _case_config(case)


async def create_admin_case_config_service(
    db: AsyncSession, req: TrainingCaseConfigIn
) -> TrainingCaseConfigOut:
    case = await create_training_case_config(db, req.model_dump(mode="json"))
    return _case_config(case)


async def update_admin_case_config_service(
    db: AsyncSession, case_id: int, req: TrainingCaseConfigIn
) -> TrainingCaseConfigOut:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    updated = await update_training_case_config(db, case, req.model_dump(mode="json"))
    return _case_config(updated)


async def publish_admin_case_config_service(
    db: AsyncSession, case_id: int, status: str
) -> TrainingCaseConfigOut:
    case = await get_training_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail={"code": 40401, "message": "案例不存在"})
    if status not in {"draft", "published", "archived"}:
        raise HTTPException(status_code=400, detail={"code": 40001, "message": "状态不合法"})
    case.status = status
    if status == "published":
        case.published_at = datetime.now()
    await db.flush()
    updated = await get_training_case(db, case_id)
    return _case_config(updated or case)
