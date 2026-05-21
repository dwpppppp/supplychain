from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from app.core.security import hash_password, verify_password, create_access_token, create_refresh_token, verify_refresh_token
from app.core.config import settings
from app.crud.user_crud import (
    get_user_by_username, get_user_by_email, get_user_by_identifier,
    get_user_by_id, create_user
)
from app.crud.course_crud import count_user_chapters
from app.crud.training_crud import count_user_training
from app.schemas.auth_schemas import (
    RegisterRequest, LoginRequest, RefreshRequest,
    UserOut, TokenOut, LoginResponse, MeResponse, LearningProgress
)


async def register_user(db: AsyncSession, req: RegisterRequest) -> dict:
    if await get_user_by_username(db, req.username):
        raise HTTPException(status_code=400, detail={"code": 40001, "message": "用户名已存在"})
    if await get_user_by_email(db, req.email):
        raise HTTPException(status_code=400, detail={"code": 40002, "message": "邮箱已被注册"})

    pw_hash = hash_password(req.password)
    user = await create_user(
        db, req.username, req.email, pw_hash, req.full_name, req.phone
    )
    return {"user_id": user.id, "username": user.username}


async def login_user(db: AsyncSession, req: LoginRequest) -> LoginResponse:
    user = await get_user_by_identifier(db, req.identifier)
    if not user or not verify_password(req.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": 40101, "message": "用户名或密码错误"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"code": 40301, "message": "账号已被禁用"},
        )

    expire_minutes = settings.ACCESS_TOKEN_EXPIRE_MINUTES
    if req.remember_me:
        expire_minutes = 60 * 24 * 7  # 7 days

    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    return LoginResponse(
        user=UserOut.model_validate(user),
        token=TokenOut(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=expire_minutes * 60,
        ),
    )


async def refresh_access_token(db: AsyncSession, req: RefreshRequest) -> dict:
    user_id = verify_refresh_token(req.refresh_token)
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": 40102, "message": "Refresh Token 无效或已过期"},
        )
    user = await get_user_by_id(db, user_id)
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"code": 40103, "message": "用户不存在或已禁用"},
        )
    access_token = create_access_token(user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


async def get_me(db: AsyncSession, user_id: int) -> MeResponse:
    from app.models.models import User
    user = await get_user_by_id(db, user_id)
    chapters_completed, chapters_total = await count_user_chapters(db, user_id)
    training_completed, training_total = await count_user_training(db, user_id)

    return MeResponse(
        id=user.id,
        username=user.username,
        email=user.email,
        full_name=user.full_name,
        role=user.role,
        is_active=user.is_active,
        learning_progress=LearningProgress(
            chapters_completed=chapters_completed,
            chapters_total=chapters_total,
            training_cases_completed=training_completed,
            training_cases_total=training_total,
        ),
    )
