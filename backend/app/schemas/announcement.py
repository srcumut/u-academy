from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class AnnouncementCreate(BaseModel): 
    title:str 
    content:str 
    is_global: bool= True

class Announcement(BaseModel):
    id : int
    title : str
    content: str
    is_global : bool
    created_at : datetime
    teacher_name: Optional[str] = None
    class Config:
        orm_mode = True