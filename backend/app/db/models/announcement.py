from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    sender_teacher_id = Column(Integer, ForeignKey("teachers.id"))
    receiver_student_id = Column(Integer, ForeignKey("students.id"), nullable=True)
    is_global = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # Relationships
    teacher = relationship("Teacher", back_populates="sent_announcements")
    # For Receiver Student, we don't have a direct back_populates relation on Student yet as it might not be needed extensively, 
    # or we can iterate over Announcements. I'll leave it simple for now. 
    # If a student wants to see "my announcements", they query Announcement where receiver_student_id == me OR is_global == True.
    @property
    def teacher_name(self):
        if self.teacher:
            return self.teacher.user.full_name
        return None