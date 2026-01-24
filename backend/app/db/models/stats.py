from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class StudentStats(Base):
    __tablename__ = "student_stats"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    exam_name = Column(String)
    overall_net = Column(Float)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    student = relationship("Student", back_populates="student_stats")

    __table_args__ = (
        UniqueConstraint('student_id', 'exam_name', name='uq_student_exam'),
    )
