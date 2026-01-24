from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.db.session import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, ForeignKey("users.id"), primary_key=True)

    # Relationships
    user = relationship("User", back_populates="teacher")
    courses = relationship("Course", back_populates="teacher")
    # For many-to-many or direct access to students via TeacherStudent
    teacher_students = relationship("TeacherStudent", back_populates="teacher")
    sent_announcements = relationship("Announcement", back_populates="teacher")
