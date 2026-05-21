from typing import Any, Optional
from pydantic import BaseModel
from fastapi.responses import JSONResponse


class ApiResponse(BaseModel):
    code: int = 0
    message: str = "success"
    data: Any = None


def ok(data: Any = None, message: str = "success", status_code: int = 200) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={"code": 0, "message": message, "data": data},
    )


def created(data: Any = None, message: str = "success") -> JSONResponse:
    return ok(data=data, message=message, status_code=201)


def error(code: int, message: str, status_code: int = 400) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={"code": code, "message": message, "data": None},
    )
