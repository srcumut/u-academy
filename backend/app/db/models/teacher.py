from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from app.db.session import Base

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, ForeignKey("users.id"), primary_key=True) 

    specialization = Column(String , nullable=True)
    # Relationships
    user = relationship("User", back_populates="teacher")
    lessons = relationship("Lesson", back_populates="teacher")
    sent_announcements = relationship("Announcement", back_populates="teacher")
