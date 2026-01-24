import sys
import os

# Create a valid path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.db.session import SessionLocal, engine
from app.db.models.user import User, UserRole
from app.core.security import get_password_hash
from app.db.base import Base

def seed_db():
    print("Seeding database...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        if not db.query(User).filter(User.email == "student@example.com").first():
            student = User(
                email="student@example.com",
                password_hash=get_password_hash("password123"),
                role=UserRole.STUDENT,
                full_name="Test Student"
            )
            db.add(student)
            print("Created student@example.com / password123")

        if not db.query(User).filter(User.email == "teacher@example.com").first():
            teacher = User(
                email="teacher@example.com",
                password_hash=get_password_hash("password123"),
                role=UserRole.TEACHER,
                full_name="Test Teacher"
            )
            db.add(teacher)
            print("Created teacher@example.com / password123")
        
        db.commit()
    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
