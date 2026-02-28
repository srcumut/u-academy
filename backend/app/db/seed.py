import sys
import os

# Create a valid path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.db.session import SessionLocal, engine
from app.db.models.user import User, UserRole
from app.db.models.teacher import Teacher
from app.db.models.student import Student
from app.db.models.course import Lesson
from app.core.security import get_password_hash
from app.db.base import Base

def seed_db():
    print("Seeding database from text report format...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        password = get_password_hash("123456")
        
        # 1. ADD TEACHERS
        teachers_data = [
            {"id": 1, "username": "ahmetyilmaz", "full_name": "Ahmet Yılmaz", "spec": "TYT Türkçe"},
            {"id": 2, "username": "mehmetdemir", "full_name": "Mehmet Demir", "spec": "AYT Fizik"},
            {"id": 3, "username": "aysekaya", "full_name": "Ayşe Kaya", "spec": "TYT Tarih"},
            {"id": 4, "username": "fatmacelik", "full_name": "Fatma Çelik", "spec": "AYT Matematik"},
            {"id": 5, "username": "mustafasahin", "full_name": "Mustafa Şahin", "spec": "TYT Coğrafya"},
            {"id": 6, "username": "zeynepyildiz", "full_name": "Zeynep Yıldız", "spec": "AYT Kimya"},
        ]
        
        for t_data in teachers_data:
            if not db.query(User).filter(User.username == t_data["username"]).first():
                user = User(
                    id=t_data["id"],
                    username=t_data["username"],
                    password_hash=password,
                    role=UserRole.TEACHER,
                    full_name=t_data["full_name"]
                )
                db.add(user)
                
                teacher = Teacher(id=t_data["id"], specialization=t_data["spec"])
                db.add(teacher)
                print(f"Created teacher: {t_data['username']}")

        # 2. ADD STUDENTS
        students_data = [
            {"id": 7, "username": "aliveli", "full_name": "Ali Veli"},
            {"id": 8, "username": "velican", "full_name": "Veli Can"},
            {"id": 9, "username": "zehrayilmaz", "full_name": "Zehra Yılmaz"},
            {"id": 10, "username": "burakoz", "full_name": "Burak Öz"},
            {"id": 11, "username": "elifdemir", "full_name": "Elif Demir"},
            {"id": 12, "username": "canantan", "full_name": "Canan Tan"},
            {"id": 13, "username": "oguzatay", "full_name": "Oğuz Atay"},
            {"id": 14, "username": "yasarkemal", "full_name": "Yaşar Kemal"},
            {"id": 15, "username": "halideedip", "full_name": "Halide Edip"},
            {"id": 16, "username": "orhanpamuk", "full_name": "Orhan Pamuk"},
        ]
        
        for s_data in students_data:
            if not db.query(User).filter(User.username == s_data["username"]).first():
                user = User(
                    id=s_data["id"],
                    username=s_data["username"],
                    password_hash=password,
                    role=UserRole.STUDENT,
                    full_name=s_data["full_name"]
                )
                db.add(user)
                
                student = Student(id=s_data["id"])
                db.add(student)
                print(f"Created student: {s_data['username']}")

        db.commit() # Commit users first to get their IDs
        
        # 3. ADD LESSONS
        lessons_data = [
            {"id": 1, "name": "TYT Türkçe", "teacher_id": 1},
            {"id": 2, "name": "AYT Fizik", "teacher_id": 2},
            {"id": 3, "name": "TYT Tarih", "teacher_id": 3},
            {"id": 4, "name": "AYT Matematik", "teacher_id": 4},
            {"id": 5, "name": "TYT Coğrafya", "teacher_id": 5},
            {"id": 6, "name": "AYT Kimya", "teacher_id": 6},
        ]
        
        for l_data in lessons_data:
            if not db.query(Lesson).filter(Lesson.id == l_data["id"]).first():
                lesson = Lesson(
                    id=l_data["id"],
                    name=l_data["name"],
                    teacher_id=l_data["teacher_id"]
                )
                db.add(lesson)
                print(f"Created lesson: {l_data['name']}")

        db.commit()
        print("Database seeding completed successfully.")
        print("All users have password: '123456'")
        
    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
