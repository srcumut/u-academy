from typing import Optional
from pydantic import BaseModel
from app.db.models.user import UserRole

# Shared properties
class UserBase(BaseModel):
    username: Optional[str] = None
    is_active: Optional[bool] = True
    role: UserRole
    full_name: Optional[str] = None

# Properties to receive via API on creation
class UserCreate(UserBase):
    username: str
    password: str

# Properties to return to client
class User(UserBase):
    id: int

    class Config:
        from_attributes = True
