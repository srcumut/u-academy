import sys
import os
import random

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine, Base
from app.core.security import get_password_hash
from app.db.models.user import User, UserRole
from app.db.models.teacher import Teacher
from app.db.models.student import Student
# Update: file is course.py but class is Lesson.
from app.db.models.course import Lesson, StudentLesson
from app.db.models.announcement import Announcement

def seed_data():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Creating all tables...")
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        password_hash = get_password_hash("123456")

        # 1. Create Lessons and Teachers
        lessons_data = [
            {"name": "TYT Türkçe", "teacher": "Ahmet Yılmaz"},
            {"name": "AYT Fizik", "teacher": "Mehmet Demir"},
            {"name": "TYT Tarih", "teacher": "Ayşe Kaya"},
            {"name": "AYT Matematik", "teacher": "Fatma Çelik"},
            {"name": "TYT Coğrafya", "teacher": "Mustafa Şahin"},
            {"name": "AYT Kimya", "teacher": "Zeynep Yıldız"},
        ]

        print("Creating Teachers and Lessons...")
        created_lessons = []
        
        for item in lessons_data:
            teacher_name = item["teacher"]
            # Convert name to username (english characters, lowercase, combined)
            # e.g. "Ahmet Yılmaz" -> "ahmetyilmaz"
            mapping = str.maketrans("ğĞüÜşŞıİöÖçÇ ", "gGuUsSiIoOcC_")
            username = teacher_name.translate(mapping).lower().replace("_", "")
            
            # Create User for Teacher
            teacher_user = User(
                username=username,
                full_name=teacher_name,
                password_hash=password_hash,
                role=UserRole.TEACHER,
                is_active=True
            )
            db.add(teacher_user)
            db.commit()
            db.refresh(teacher_user)
            
            # Create Teacher Profile
            teacher_profile = Teacher(
                id=teacher_user.id,
                specialization=item["name"]
            )
            db.add(teacher_profile)
            db.commit()
            
            # Create Lesson
            lesson = Lesson(
                name=item["name"],
                teacher_id=teacher_profile.id
            )
            db.add(lesson)
            db.commit()
            db.refresh(lesson)
            created_lessons.append(lesson)
            print(f"Created Teacher: {teacher_name} ({username}) and Lesson: {item['name']}")

        # 2. Create Students
        print("\nCreating Students...")
        student_names = [
            "Ali Veli", "Veli Can", "Zehra Yılmaz", "Burak Öz", 
            "Elif Demir", "Canan Tan", "Oğuz Atay", "Yaşar Kemal", 
            "Halide Edip", "Orhan Pamuk"
        ]
        
        created_students = []
        for name in student_names:
            mapping = str.maketrans("ğĞüÜşŞıİöÖçÇ ", "gGuUsSiIoOcC_")
            username = name.translate(mapping).lower().replace("_", "")
            
            student_user = User(
                username=username,
                full_name=name,
                password_hash=password_hash,
                role=UserRole.STUDENT,
                is_active=True
            )
            db.add(student_user)
            db.commit()
            db.refresh(student_user)
            
            student_profile = Student(id=student_user.id)
            db.add(student_profile)
            db.commit()
            db.refresh(student_profile)
            created_students.append(student_profile)
            print(f"Created Student: {name} ({username})")

        # 3. Enroll Students in Lessons
        # Strategy: Each student enrolls in 3 random lessons
        print("\nEnrolling Students in random lessons (3 each)...")
        for student in created_students:
            enrolled_lessons_for_student = random.sample(created_lessons, 3)
            for lesson in enrolled_lessons_for_student:
                enrollment = StudentLesson(
                    student_id=student.id,
                    lesson_id=lesson.id
                )
                db.add(enrollment)
            print(f"Student {student.id} enrolled in {[l.name for l in enrolled_lessons_for_student]}")
        
        db.commit()
        print("\nSeeding Completed Successfully!")

    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
