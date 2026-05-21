import logging
import uvicorn
from pathlib import Path
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.openapi.utils import get_openapi

from app.core.config import settings
from app.core.database import init_db
from app.core.training_seed import seed_training_defaults
from app.routers.auth_router import router as auth_router
from app.routers.chat_router import router as chat_router
from app.routers.course_router import router as course_router
from app.routers.training_router import router as training_router
from app.routers.analytics_router import router as analytics_router
from app.routers.system_router import router as system_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 应用启动时初始化数据库表
    logger.info("Starting up: initializing database tables...")
    await init_db()
    await seed_training_defaults()
    logger.info("Database ready.")
    yield
    # 应用关闭时执行清理
    logger.info("Shutting down.")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)


def custom_openapi():
    # 自定义 OpenAPI schema，注入 Bearer Token 安全方案，让 Swagger 显示 Authorize 按钮
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        routes=app.routes,
    )
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }
    openapi_schema["security"] = [{"BearerAuth": []}]
    app.openapi_schema = openapi_schema
    return app.openapi_schema


# 替换默认 openapi 方法为自定义版本
app.openapi = custom_openapi

# 配置跨域中间件，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    # 全局异常捕获，统一返回标准格式的错误响应
    from fastapi import HTTPException
    if isinstance(exc, HTTPException):
        detail = exc.detail
        if isinstance(detail, dict):
            return JSONResponse(
                status_code=exc.status_code,
                content={
                    "code": detail.get("code", exc.status_code),
                    "message": detail.get("message", str(exc.detail)),
                    "data": None,
                },
            )
        return JSONResponse(
            status_code=exc.status_code,
            content={"code": exc.status_code, "message": str(detail), "data": None},
        )
    logger.exception("Unhandled error: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"code": 50001, "message": "服务器内部错误", "data": None},
    )


# 注册所有路由，统一挂载到 /api/v1 前缀下
PREFIX = "/api/v1"
app.include_router(auth_router, prefix=PREFIX)
app.include_router(chat_router, prefix=PREFIX)
app.include_router(course_router, prefix=PREFIX)
app.include_router(training_router, prefix=PREFIX)
app.include_router(analytics_router, prefix=PREFIX)
app.include_router(system_router, prefix=PREFIX)

# Expose course PDFs and other local teaching assets.
if STATIC_DIR.exists():
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


@app.get("/")
async def root():
    # 根路径健康检查，确认服务正常运行
    return {"message": f"{settings.APP_NAME} API is running", "docs": "/docs"}


if __name__ == "__main__":
    # 直接运行时启动 uvicorn 服务
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        workers=1,
    )
