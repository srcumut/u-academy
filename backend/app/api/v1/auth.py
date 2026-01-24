from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.db.session import SessionLocal
from app.core import security
from app.schemas import auth as auth_schemas
from app.services.auth_service import auth_service
from app.core.config import settings
from app.db.models.user import User

router = APIRouter()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login", response_model=auth_schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # Using OAuth2PasswordRequestForm for Swagger UI compatibility, 
    # but our schema uses 'email', form uses 'username'. 
    # We map form.username to email.
    user = auth_service.authenticate_user(db, auth_schemas.Login(email=form_data.username, password=form_data.password))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        subject=user.email, expires_delta=access_token_expires
    )
    # TODO: Generate and store refresh token here
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/reset-password", status_code=status.HTTP_200_OK)
def reset_password(
    reset_data: auth_schemas.PasswordReset,
    db: Session = Depends(get_db)
):
    user = auth_service.reset_password(db, reset_data)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    return {"message": "Password updated successfully"}

from app.api import deps
from app.schemas import user as user_schemas

@router.get("/me", response_model=user_schemas.User)
def read_users_me(current_user: User = Depends(deps.get_current_user)):
    return current_user
