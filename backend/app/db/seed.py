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
        if not db.query(User).filter(User.username == "ogrenci1").first():
            student = User(
                username="ogrenci1",
                password_hash=get_password_hash("123456"),
                role=UserRole.STUDENT,
                full_name="Ahmet Yılmaz"
            )
            db.add(student)
            print("Created: ogrenci1 / 123456")

        if not db.query(User).filter(User.username == "ogretmen1").first():
            teacher = User(
                username="ogretmen1",
                password_hash=get_password_hash("123456"),
                role=UserRole.TEACHER,
                full_name="Dr. Zeynep Kaya"
            )
            db.add(teacher)
            print("Created: ogretmen1 / 123456")
        
        db.commit()
    except Exception as e:
        print(f"Error seeding DB: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()
