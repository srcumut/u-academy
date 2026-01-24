from fastapi import APIRouter

api_router = APIRouter()

from app.api.v1 import auth

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
# api_router.include_router(student.router, prefix="/student", tags=["student"])
# api_router.include_router(teacher.router, prefix="/teacher", tags=["teacher"])
# api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
