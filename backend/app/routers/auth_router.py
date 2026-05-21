from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.core.response import ok, created, error
from app.models.models import User
from app.schemas.auth_schemas import RegisterRequest, LoginRequest, RefreshRequest
from app.services.auth_service import register_user, login_user, refresh_access_token, get_me

router = APIRouter(prefix="/auth", tags=["认证"])


@router.post("/register")
async def register(req: RegisterRequest, db: AsyncSession = Depends(get_db)):
    data = await register_user(db, req)
    return created(data, message="注册成功")


@router.post("/login")
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await login_user(db, req)
    return ok(result.model_dump(mode="json"), message="登录成功")


@router.post("/refresh")
async def refresh(req: RefreshRequest, db: AsyncSession = Depends(get_db)):
    data = await refresh_access_token(db, req)
    return ok(data)


@router.get("/me")
async def me(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    data = await get_me(db, current_user.id)
    return ok(data.model_dump(mode="json"))


@router.post("/logout")
async def logout(current_user: User = Depends(get_current_user)):
    # JWT is stateless; client deletes token locally.
    return ok(message="已退出登录")
