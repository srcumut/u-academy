from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.session import Base

class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    name = Column(String, index=True)

    # Relationships
    course = relationship("Course", back_populates="topics")
    progress = relationship("TopicProgress", back_populates="topic")


class TopicProgress(Base):
    __tablename__ = "topic_progress"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    topic_id = Column(Integer, ForeignKey("topics.id"))
    week_number = Column(Integer)
    is_completed = Column(Boolean, default=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    # Relationships
    student = relationship("Student", back_populates="overall_progress")
    topic = relationship("Topic", back_populates="progress")
    
    # Unique constraint likely needed: one progress record per student+topic
    # __table_args__ = (UniqueConstraint('student_id', 'topic_id', name='uq_student_topic_progress'),)
