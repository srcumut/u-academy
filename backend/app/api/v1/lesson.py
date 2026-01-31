from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.schemas import lesson as lesson_schemas
from app.services.lesson_service import lesson_service
from app.db.models.user import User

router = APIRouter()

@router.get("/", response_model=List[lesson_schemas.Lesson])
def read_my_lessons(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Retrieve lessons for the current user using LessonService.
    """
    lessons = lesson_service.get_lessons_for_user(db, current_user)
    
    # Serialize to Pydantic schema
    result = []
    for l in lessons:
        l_schema = lesson_schemas.Lesson.model_validate(l)
        if l.teacher and l.teacher.user:
            l_schema.teacher_name = l.teacher.user.full_name
        result.append(l_schema)
        
    return result

@router.get("/{id}", response_model=lesson_schemas.Lesson)
def read_lesson(
    id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    lesson = lesson_service.get_lesson_by_id(db, id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Ders bulunamadı")
    
    l_schema = lesson_schemas.Lesson.model_validate(lesson)
    if lesson.teacher and lesson.teacher.user:
        l_schema.teacher_name = lesson.teacher.user.full_name
    
    return l_schema
