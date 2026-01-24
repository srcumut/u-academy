from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.session import Base

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"))

    # Relationships
    teacher = relationship("Teacher", back_populates="courses")
    topics = relationship("Topic", back_populates="course")
    # Association via TeacherStudent
    teacher_students = relationship("TeacherStudent", back_populates="course")


class TeacherStudent(Base):
    __tablename__ = "teacher_student"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    student_id = Column(Integer, ForeignKey("students.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    is_active = Column(Boolean, default=True)

    # Relationships
    teacher = relationship("Teacher", back_populates="teacher_students")
    student = relationship("Student", back_populates="enrolled_courses")
    course = relationship("Course", back_populates="teacher_students")

    # Constraint enforcement for unique teacher-student-course mapping would typically be improved
    # by a unique constraint here, but the user requirement "Same student same course ONLY ONE teacher"
    # implies a logic check or a unique index on (student_id, course_id).
    # I'll add a UniqueConstraint for robustness.
    
    __table_args__ = (
        UniqueConstraint('student_id', 'course_id', name='uq_student_course_teacher'),
    )
    # Actually wait, "Same student same course same time only one teacher".
    # So (student_id, course_id) should be unique if is_active is True? 
    # Or just simpler: A student can only have ONE teacher per course.
    # So (student_id, course_id) must be unique.
