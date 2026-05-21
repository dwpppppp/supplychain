from typing import Optional
from sqlalchemy import delete, select, func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import (
    TrainingCase, TrainingStepConfig, UserTrainingProgress,
    UserStepSubmission, TrainingSupplier,
    TrainingCaseNegotiationSupplier, TrainingCaseNegotiationOption,
    TrainingPurchaseQuote, TrainingPurchaseQuoteSpec,
)


async def list_training_cases(db: AsyncSession) -> list[TrainingCase]:
    result = await db.execute(select(TrainingCase).order_by(TrainingCase.id))
    return list(result.scalars().all())


async def list_training_cases_for_admin(db: AsyncSession) -> list[TrainingCase]:
    result = await db.execute(
        select(TrainingCase).order_by(TrainingCase.updated_at.desc(), TrainingCase.id.desc())
    )
    return list(result.scalars().all())


async def get_training_case(db: AsyncSession, case_id: int) -> Optional[TrainingCase]:
    result = await db.execute(
        select(TrainingCase)
        .where(TrainingCase.id == case_id)
        .options(
            selectinload(TrainingCase.suppliers),
            selectinload(TrainingCase.step_configs),
        )
    )
    return result.scalar_one_or_none()


async def get_training_case_by_slug(db: AsyncSession, slug: str) -> Optional[TrainingCase]:
    result = await db.execute(
        select(TrainingCase)
        .where(TrainingCase.slug == slug)
        .options(
            selectinload(TrainingCase.suppliers),
            selectinload(TrainingCase.step_configs),
        )
    )
    return result.scalar_one_or_none()


async def list_case_suppliers(db: AsyncSession, case_id: int) -> list[TrainingSupplier]:
    result = await db.execute(
        select(TrainingSupplier)
        .where(
            TrainingSupplier.case_id == case_id,
            TrainingSupplier.is_candidate == True,  # noqa: E712
        )
        .order_by(TrainingSupplier.sort_order, TrainingSupplier.id)
    )
    return list(result.scalars().all())


async def create_training_case_config(db: AsyncSession, payload: dict) -> TrainingCase:
    suppliers = payload.pop("suppliers", [])
    negotiation_suppliers = payload.pop("negotiation_suppliers", [])
    negotiation_options = payload.pop("negotiation_options", [])
    steps = payload.pop("steps", [])
    case = TrainingCase(**payload)
    db.add(case)
    await db.flush()
    await replace_training_case_children(
        db, case.id, suppliers, steps, negotiation_suppliers, negotiation_options
    )
    await db.refresh(case)
    return await get_training_case(db, case.id) or case


async def update_training_case_config(
    db: AsyncSession, case: TrainingCase, payload: dict
) -> TrainingCase:
    suppliers = payload.pop("suppliers", [])
    negotiation_suppliers = payload.pop("negotiation_suppliers", [])
    negotiation_options = payload.pop("negotiation_options", [])
    steps = payload.pop("steps", [])
    for key, value in payload.items():
        setattr(case, key, value)
    await db.flush()
    await replace_training_case_children(
        db, case.id, suppliers, steps, negotiation_suppliers, negotiation_options
    )
    await db.refresh(case)
    return await get_training_case(db, case.id) or case


async def replace_training_case_children(
    db: AsyncSession,
    case_id: int,
    suppliers: list[dict],
    steps: list[dict],
    negotiation_suppliers: list[dict],
    negotiation_options: list[dict],
) -> None:
    await db.execute(delete(TrainingSupplier).where(TrainingSupplier.case_id == case_id))
    await db.execute(delete(TrainingStepConfig).where(TrainingStepConfig.case_id == case_id))
    await db.execute(
        delete(TrainingCaseNegotiationSupplier).where(
            TrainingCaseNegotiationSupplier.case_id == case_id
        )
    )
    await db.execute(
        delete(TrainingCaseNegotiationOption).where(
            TrainingCaseNegotiationOption.case_id == case_id
        )
    )

    for item in suppliers:
        item.pop("id", None)
        db.add(TrainingSupplier(case_id=case_id, **item))

    for item in steps:
        item.pop("id", None)
        db.add(TrainingStepConfig(case_id=case_id, **item))

    for item in negotiation_suppliers:
        item.pop("id", None)
        db.add(TrainingCaseNegotiationSupplier(case_id=case_id, **item))

    for item in negotiation_options:
        item.pop("id", None)
        db.add(TrainingCaseNegotiationOption(case_id=case_id, **item))

    await db.flush()


async def get_step_config(
    db: AsyncSession, case_id: int, step: int
) -> Optional[TrainingStepConfig]:
    result = await db.execute(
        select(TrainingStepConfig).where(
            TrainingStepConfig.case_id == case_id,
            TrainingStepConfig.step == step,
        )
    )
    return result.scalar_one_or_none()


async def get_or_create_training_progress(
    db: AsyncSession, user_id: int, case_id: int
) -> UserTrainingProgress:
    result = await db.execute(
        select(UserTrainingProgress).where(
            UserTrainingProgress.user_id == user_id,
            UserTrainingProgress.case_id == case_id,
        )
    )
    progress = result.scalar_one_or_none()
    if not progress:
        progress = UserTrainingProgress(user_id=user_id, case_id=case_id)
        db.add(progress)
        await db.flush()
    return progress


async def list_negotiation_suppliers(
    db: AsyncSession, case_id: int
) -> list[TrainingCaseNegotiationSupplier]:
    result = await db.execute(
        select(TrainingCaseNegotiationSupplier)
        .where(TrainingCaseNegotiationSupplier.case_id == case_id)
        .order_by(TrainingCaseNegotiationSupplier.id)
    )
    return list(result.scalars().all())


async def get_negotiation_supplier(
    db: AsyncSession, case_id: int, supplier_code: str
) -> Optional[TrainingCaseNegotiationSupplier]:
    result = await db.execute(
        select(TrainingCaseNegotiationSupplier).where(
            TrainingCaseNegotiationSupplier.case_id == case_id,
            TrainingCaseNegotiationSupplier.supplier_code == supplier_code,
        )
    )
    return result.scalar_one_or_none()


async def list_negotiation_options(
    db: AsyncSession, case_id: int, round_no: int
) -> list[TrainingCaseNegotiationOption]:
    result = await db.execute(
        select(TrainingCaseNegotiationOption)
        .where(
            TrainingCaseNegotiationOption.case_id == case_id,
            TrainingCaseNegotiationOption.round_no == round_no,
        )
        .order_by(TrainingCaseNegotiationOption.sort_order, TrainingCaseNegotiationOption.id)
    )
    return list(result.scalars().all())


async def list_negotiation_options_by_ids(
    db: AsyncSession, case_id: int, option_ids: list[int]
) -> list[TrainingCaseNegotiationOption]:
    if not option_ids:
        return []
    result = await db.execute(
        select(TrainingCaseNegotiationOption).where(
            TrainingCaseNegotiationOption.case_id == case_id,
            TrainingCaseNegotiationOption.id.in_(option_ids),
        )
    )
    return list(result.scalars().all())


async def create_step_submission(
    db: AsyncSession, user_id: int, case_id: int, step: int,
    answers: dict, score: float, dimension_scores: dict,
    feedback: str, time_spent_seconds: Optional[int],
    result_snapshot: Optional[dict] = None,
    attempt_no: int = 1,
) -> UserStepSubmission:
    sub = UserStepSubmission(
        user_id=user_id,
        case_id=case_id,
        step=step,
        attempt_no=attempt_no,
        answers=answers,
        score=score,
        dimension_scores=dimension_scores,
        result_snapshot=result_snapshot,
        feedback=feedback,
        time_spent_seconds=time_spent_seconds,
    )
    db.add(sub)
    await db.flush()
    await db.refresh(sub)
    return sub


async def get_user_submissions(
    db: AsyncSession, user_id: int, case_id: int
) -> list[UserStepSubmission]:
    result = await db.execute(
        select(UserStepSubmission).where(
            UserStepSubmission.user_id == user_id,
            UserStepSubmission.case_id == case_id,
        ).order_by(UserStepSubmission.step)
    )
    return list(result.scalars().all())


async def get_purchase_quote(
    db: AsyncSession, user_id: int, case_id: int
) -> Optional[TrainingPurchaseQuote]:
    result = await db.execute(
        select(TrainingPurchaseQuote)
        .where(
            TrainingPurchaseQuote.user_id == user_id,
            TrainingPurchaseQuote.case_id == case_id,
        )
        .options(selectinload(TrainingPurchaseQuote.specs))
    )
    return result.scalar_one_or_none()


async def upsert_purchase_quote(
    db: AsyncSession, user_id: int, case_id: int, payload: dict
) -> TrainingPurchaseQuote:
    specs = payload.pop("specs", [])
    quote = await get_purchase_quote(db, user_id, case_id)

    if not quote:
        quote = TrainingPurchaseQuote(user_id=user_id, case_id=case_id, **payload)
        db.add(quote)
        await db.flush()
    else:
        for key, value in payload.items():
            setattr(quote, key, value)
        await db.flush()
        await db.execute(
            delete(TrainingPurchaseQuoteSpec).where(
                TrainingPurchaseQuoteSpec.quote_id == quote.id
            )
        )

    for item in specs:
        db.add(TrainingPurchaseQuoteSpec(quote_id=quote.id, **item))

    await db.flush()
    await db.refresh(quote)
    return await get_purchase_quote(db, user_id, case_id) or quote


async def count_user_training(db: AsyncSession, user_id: int) -> tuple[int, int]:
    """Return (completed, total)."""
    total = (await db.execute(select(func.count(TrainingCase.id)))).scalar_one()
    completed = (await db.execute(
        select(func.count(UserTrainingProgress.id)).where(
            UserTrainingProgress.user_id == user_id,
            UserTrainingProgress.status == "completed",
        )
    )).scalar_one()
    return completed, total
