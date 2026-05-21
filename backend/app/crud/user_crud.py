from typing import Optional
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models import User


async def get_user_by_id(db: AsyncSession, user_id: int) -> Optional[User]:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def get_user_by_username(db: AsyncSession, username: str) -> Optional[User]:
    result = await db.execute(select(User).where(User.username == username))
    return result.scalar_one_or_none()


async def get_user_by_email(db: AsyncSession, email: str) -> Optional[User]:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_identifier(db: AsyncSession, identifier: str) -> Optional[User]:
    """Find user by username or email."""
    result = await db.execute(
        select(User).where(or_(User.username == identifier, User.email == identifier))
    )
    return result.scalar_one_or_none()


async def create_user(
    db: AsyncSession,
    username: str,
    email: str,
    password_hash: str,
    full_name: Optional[str] = None,
    phone: Optional[str] = None,
) -> User:
    user = User(
        username=username,
        email=email,
        password_hash=password_hash,
        full_name=full_name,
        phone=phone,
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user
