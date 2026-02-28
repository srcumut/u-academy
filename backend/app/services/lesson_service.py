from typing import List, Optional
from sqlalchemy.orm import Session
from app.db.models.course import Lesson
from app.db.models.user import User, UserRole
from app.db.models.student import Student
from fastapi import HTTPException

class LessonService:
    @staticmethod
    def get_lessons_for_user(db: Session, user: User) -> List[Lesson]:
        if user.role == UserRole.STUDENT:
            student = db.query(Student).filter(Student.id == user.id).first()
            if not student:
                return []
            return student.enrolled_lessons

        elif user.role == UserRole.TEACHER:
            if user.teacher:
                return user.teacher.lessons
            return []
        
        return []

    @staticmethod
    def get_lesson_by_id(db: Session, lesson_id: int) -> Optional[Lesson]:
        """
        ID'ye göre dersi getirir.
        """
        return db.query(Lesson).filter(Lesson.id == lesson_id).first()

lesson_service = LessonService()
