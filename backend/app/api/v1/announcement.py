from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api import deps
from app.schemas import announcement as announcement_schemas 
from app.services.announcement_service import announcement_service

router = APIRouter()

@router.get("/", response_model=List[announcement_schemas.Announcement])
def read_announcements(
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    return announcement_service.get_global_announcements(db)

@router.get("/teacher/{teacher_id}", response_model=List[announcement_schemas.Announcement])
def read_teacher_announcements(
    teacher_id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    return announcement_service.get_announcements_by_teacher(db, teacher_id)

@router.post("/", response_model=announcement_schemas.Announcement)
def create_announcement(
    announcement_in: announcement_schemas.AnnouncementCreate,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    return announcement_service.create_announcement(db, current_user, announcement_in)

@router.delete("/{id}", response_model=announcement_schemas.Announcement)
def delete_announcement( 
    id: int,
    db: Session = Depends(deps.get_db),
    current_user = Depends(deps.get_current_user)
):
    return announcement_service.delete_announcement(db, current_user, id)
