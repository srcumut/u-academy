from typing import Optional
from pydantic import BaseModel

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None

class Login(BaseModel):
    username: str
    password: str

class PasswordReset(BaseModel):
    username: str
    current_password: str
    new_password: str
