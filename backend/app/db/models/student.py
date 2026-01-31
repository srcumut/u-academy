from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, ForeignKey("users.id"), primary_key=True)

    # Relationships
    user = relationship("User", back_populates="student")
    enrolled_lessons = relationship("Lesson", back_populates="students", secondary="student_lessons")
