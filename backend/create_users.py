import app.db.base # Import all models to register them
from app.db.session import SessionLocal
from app.db.models.user import User, UserRole
from app.db.models.teacher import Teacher
from app.db.models.student import Student
from app.core.security import get_password_hash

def create_initial_user():
    db = SessionLocal()
    try:
        # Check if user exists
        user = db.query(User).filter(User.username == "ogretmen").first()
        if user:
            print("User already exists")
            return

        # Create Teacher User
        new_user = User(
            username="ogretmen",
            password_hash=get_password_hash("123456"),
            role=UserRole.TEACHER,
            full_name="Baş Öğretmen"
        )
        db.add(new_user)
        db.commit()
        print("Teacher user created successfully!")
        print("Username: ogretmen")
        print("Password: 123456")
        
        # Create Student User (for testing)
        student_user = User(
            username="ogrenci",
            password_hash=get_password_hash("123456"),
            role=UserRole.STUDENT,
            full_name="Meraklı Öğrenci"
        )
        db.add(student_user)
        db.commit()
        print("Student user created successfully!")
        print("Username: ogrenci")
        print("Password: 123456")

    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    create_initial_user()
