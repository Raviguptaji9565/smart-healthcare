from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.database.database import get_db
from app.models.medicine import Medicine
import datetime

router = APIRouter(prefix="/api/medicines", tags=["Medicines"])


# ─── Pydantic Schemas ─────────────────────────────────────────────────────────

class MedicineCreate(BaseModel):
    user_id: int
    name: str
    dosage: Optional[str] = None
    frequency: Optional[str] = None
    instructions: Optional[str] = None


class MedicineResponse(BaseModel):
    id: int
    user_id: int
    name: str
    dosage: Optional[str]
    frequency: Optional[str]
    instructions: Optional[str]
    is_taken: bool
    taken_at: Optional[datetime.datetime]
    created_at: Optional[datetime.datetime]

    class Config:
        from_attributes = True


class MedicineTakenUpdate(BaseModel):
    is_taken: bool


# ─── Helper ───────────────────────────────────────────────────────────────────

def serialize_medicine(m: Medicine) -> dict:
    return {
        "id": m.id,
        "user_id": m.user_id,
        "name": m.name,
        "dosage": m.dosage,
        "frequency": m.frequency,
        "instructions": m.instructions,
        "is_taken": m.is_taken,
        "taken_at": m.taken_at.isoformat() if m.taken_at else None,
        "created_at": m.created_at.isoformat() if m.created_at else None,
    }


# ─── Routes ───────────────────────────────────────────────────────────────────

@router.post("/", response_model=MedicineResponse)
def add_medicine(data: MedicineCreate, db: Session = Depends(get_db)):
    """Add a new medicine reminder for a user."""
    medicine = Medicine(**data.model_dump())
    db.add(medicine)
    db.commit()
    db.refresh(medicine)
    return medicine


@router.get("/user/{user_id}")
def get_user_medicines(user_id: int, db: Session = Depends(get_db)):
    """Get all medicine reminders for a user."""
    medicines = (
        db.query(Medicine)
        .filter(Medicine.user_id == user_id)
        .order_by(Medicine.created_at.desc())
        .all()
    )
    return [serialize_medicine(m) for m in medicines]


@router.patch("/{medicine_id}/taken")
def mark_medicine_taken(
    medicine_id: int,
    update: MedicineTakenUpdate,
    db: Session = Depends(get_db),
):
    """Mark a medicine as taken or not taken."""
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    medicine.is_taken = update.is_taken
    medicine.taken_at = datetime.datetime.utcnow() if update.is_taken else None

    db.commit()
    db.refresh(medicine)
    return serialize_medicine(medicine)


@router.delete("/{medicine_id}")
def delete_medicine(medicine_id: int, db: Session = Depends(get_db)):
    """Delete a medicine reminder."""
    medicine = db.query(Medicine).filter(Medicine.id == medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    db.delete(medicine)
    db.commit()
    return {"message": "Medicine deleted successfully"}
