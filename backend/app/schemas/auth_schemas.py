import re
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, field_validator, EmailStr


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: Optional[str] = None
    phone: Optional[str] = None

    @field_validator("username")
    @classmethod
    def validate_username(cls, v):
        if not re.match(r"^[a-zA-Z0-9_]{3,32}$", v):
            raise ValueError("用户名需为 3-32 位字母、数字或下划线")
        return v

    @field_validator("password")
    @classmethod
    def validate_password(cls, v):
        if len(v) < 8 or len(v) > 64:
            raise ValueError("密码需为 8-64 位")
        if not re.search(r"[A-Z]", v):
            raise ValueError("密码需包含大写字母")
        if not re.search(r"[a-z]", v):
            raise ValueError("密码需包含小写字母")
        if not re.search(r"\d", v):
            raise ValueError("密码需包含数字")
        return v

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v):
        if v and not re.match(r"^1\d{10}$", v):
            raise ValueError("手机号格式不正确")
        return v


class LoginRequest(BaseModel):
    identifier: str  # username or email
    password: str
    remember_me: bool = False


class RefreshRequest(BaseModel):
    refresh_token: str


class UserOut(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str]
    role: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}


class TokenOut(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int


class LoginResponse(BaseModel):
    user: UserOut
    token: TokenOut


class LearningProgress(BaseModel):
    chapters_completed: int
    chapters_total: int
    training_cases_completed: int
    training_cases_total: int


class MeResponse(BaseModel):
    id: int
    username: str
    email: str
    full_name: Optional[str]
    role: str
    is_active: bool
    learning_progress: LearningProgress

    model_config = {"from_attributes": True}
