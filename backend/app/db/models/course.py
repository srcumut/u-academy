from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.db.session import Base

class Lesson(Base):
    __tablename__ = "lessons"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"))

    # Relationships
    teacher = relationship("Teacher", back_populates="lessons")
    students = relationship("Student", back_populates="enrolled_lessons", secondary="student_lessons")

class StudentLesson(Base):
    __tablename__ = "student_lessons"
    
    student_id = Column(Integer, ForeignKey("students.id"), primary_key=True)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), primary_key=True)
