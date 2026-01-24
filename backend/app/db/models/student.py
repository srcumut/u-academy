from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, ForeignKey("users.id"), primary_key=True)

    # Relationships
    user = relationship("User", back_populates="student")
    student_stats = relationship("StudentStats", back_populates="student")
    overall_progress = relationship("TopicProgress", back_populates="student")
    enrolled_courses = relationship("TeacherStudent", back_populates="student")
