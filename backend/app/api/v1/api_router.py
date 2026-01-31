from fastapi import APIRouter
from app.api.v1 import announcement, lesson

api_router = APIRouter()

from app.api.v1 import auth

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(announcement.router, prefix = "/announcements" , tags=  ["announcements"])
api_router.include_router(lesson.router, prefix="/lessons", tags=["lessons"])
# api_router.include_router(teacher.router, prefix="/teacher", tags=["teacher"])
# api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
