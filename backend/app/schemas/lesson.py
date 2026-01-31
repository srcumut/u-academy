from pydantic import BaseModel
from typing import List, Optional

class LessonBase(BaseModel):
    name: str

class LessonCreate(LessonBase):
    pass

class Lesson(LessonBase):
    id: int
    teacher_name: Optional[str] = None

    class Config:
        from_attributes = True
