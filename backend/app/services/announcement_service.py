from typing import List, Optional
from sqlalchemy.orm import Session
from app.db.models.announcement import Announcement
from app.db.models.teacher import Teacher
from app.db.models.user import User, UserRole
from app.schemas import announcement as announcement_schemas
from fastapi import HTTPException

class AnnouncementService:
    @staticmethod
    def get_global_announcements(db: Session) -> List[Announcement]:
        return db.query(Announcement)\
            .filter(Announcement.is_global == True)\
            .order_by(Announcement.created_at.desc())\
            .all()

    @staticmethod
    def get_announcements_by_teacher(db: Session, teacher_id: int) -> List[Announcement]:
        return db.query(Announcement)\
            .filter(Announcement.sender_teacher_id == teacher_id)\
            .order_by(Announcement.created_at.desc())\
            .all()

    @staticmethod
    def create_announcement(
        db: Session, 
        user: User, 
        announcement_in: announcement_schemas.AnnouncementCreate
    ) -> Announcement:
        """
        Yeni bir duyuru oluşturur.
        Yetki kontrolü yapar (Sadece Öğretmenler).
        """
        if user.role != UserRole.TEACHER:
            raise HTTPException(
                status_code=403,
                detail="Yetersiz yetki. Sadece öğretmenler duyuru yayınlayabilir"
            )

        teacher = db.query(Teacher).filter(Teacher.id == user.id).first()
        if not teacher:
            # Should theoretically be created during registration, but as a fallback/safety:
            teacher = Teacher(id=user.id, specialization="Genel")
            db.add(teacher)
            db.commit()

        db_obj = Announcement(
            title=announcement_in.title,
            content=announcement_in.content,
            is_global=announcement_in.is_global,
            sender_teacher_id=teacher.id
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    @staticmethod
    def delete_announcement(db: Session, user: User, announcement_id: int) -> Announcement:
        """
        Duyuruyu siler.
        Yetki kontrolü yapar.
        """
        if user.role != UserRole.TEACHER:
            raise HTTPException(
                status_code=403,
                detail="Yetersiz yetki. Sadece öğretmenler duyuru silebilir"
            )

        announcement = db.query(Announcement).filter(Announcement.id == announcement_id).first()
        if not announcement:
            raise HTTPException(status_code=404, detail="Duyuru bulunamadı")

        db.delete(announcement)
        db.commit()
        return announcement

announcement_service = AnnouncementService()
