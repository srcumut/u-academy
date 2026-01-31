from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.db.models.user import User, RefreshToken
from app.core.security import verify_password, get_password_hash
from app.schemas.auth import Login, PasswordReset
from datetime import datetime

class AuthService:
    @staticmethod
    def authenticate_user(db: Session, login_data: Login) -> User:
        user = db.query(User).filter(User.username == login_data.username).first()
        if not user:
            return None
        if not verify_password(login_data.password, user.password_hash):
            return None
        return user

    @staticmethod
    def reset_password(db: Session, reset_data: PasswordReset) -> User:
        user = db.query(User).filter(User.username == reset_data.username).first()
        if not user:
            return None
        if not verify_password(reset_data.current_password, user.password_hash):
            return None
        
        user.password_hash = get_password_hash(reset_data.new_password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    @staticmethod # MVP: Basic refresh token handling
    def create_refresh_token(db: Session, user_id: int, token: str, expires_at: datetime):
        db_token = RefreshToken(user_id=user_id, token=token, expires_at=expires_at)
        db.add(db_token)
        db.commit()
        return db_token

auth_service = AuthService()
