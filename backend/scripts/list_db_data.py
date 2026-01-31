import sys
import os

# Add the parent directory to sys.path to allow importing app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
# Import all models to ensure mappers are initialized
from app.db.models.user import User
from app.db.models.user import User
from app.db.models.teacher import Teacher
from app.db.models.student import Student
from app.db.models.announcement import Announcement
from app.db.models.course import Lesson, StudentLesson

def list_data():
    db = SessionLocal()
    try:
        print("\n--- USERS ---")
        users = db.query(User).all()
        for u in users:
            print(f"ID: {u.id} | Username: {u.username} | Role: {u.role} | Name: {u.full_name}")

        print("\n--- TEACHERS ---")
        teachers = db.query(Teacher).all()
        for t in teachers:
            print(f"ID: {t.id} | Specialization: {t.specialization}")

        print("\n--- STUDENTS ---")
        students = db.query(Student).all()
        for s in students:
            print(f"ID: {s.id}")

        print("\n--- LESSONS ---")
        lessons = db.query(Lesson).all()
        for l in lessons:
             # Using .teacher.user.full_name if available safely
            teacher_name = l.teacher.user.full_name if l.teacher and l.teacher.user else "Unknown"
            print(f"ID: {l.id} | Name: {l.name} | Teacher: {teacher_name}")

        print("\n--- ANNOUNCEMENTS ---")
        announcements = db.query(Announcement).all()
        if not announcements:
            print("No announcements found.")
        for a in announcements:
            sender = "Unknown"
            if a.teacher and a.teacher.user:
                sender = a.teacher.user.full_name
            print(f"ID: {a.id} | Title: {a.title} | Sender: {sender} | Global: {a.is_global}")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    list_data()
