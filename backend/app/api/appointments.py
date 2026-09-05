from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.appointment import Appointment
from app.models.user import User
from app.schemas.appointment import AppointmentCreate, AppointmentResponse, AppointmentStatusUpdate

router = APIRouter(prefix="/api/appointments", tags=["Appointments"])

def serialize_appointment(apt: Appointment) -> dict:
    return {
        "id": apt.id,
        "patient_id": apt.patient_id,
        "doctor_id": apt.doctor_id,
        "appointment_date": apt.appointment_date,
        "status": apt.status,
        "reason": apt.reason,
        "patient_name": apt.patient.full_name if apt.patient else f"Patient #{apt.patient_id}",
        "doctor_name": apt.doctor.full_name if apt.doctor else f"Dr. #{apt.doctor_id}",
    }

@router.post("/", response_model=AppointmentResponse)
def book_appointment(appointment: AppointmentCreate, db: Session = Depends(get_db)):
    try:
        new_appointment = Appointment(
            patient_id=appointment.patient_id,
            doctor_id=appointment.doctor_id,
            appointment_date=appointment.appointment_date,
            reason=appointment.reason,
            status="Pending"
        )
        db.add(new_appointment)
        db.commit()
        db.refresh(new_appointment)
        return serialize_appointment(new_appointment)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/patient/{patient_id}", response_model=list[AppointmentResponse])
def get_patient_appointments(patient_id: int, db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(Appointment.patient_id == patient_id).order_by(Appointment.appointment_date.desc()).all()
    return [serialize_appointment(apt) for apt in appointments]

@router.get("/doctor/{doctor_id}", response_model=list[AppointmentResponse])
def get_doctor_appointments(doctor_id: int, db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(Appointment.doctor_id == doctor_id).order_by(Appointment.appointment_date.desc()).all()
    return [serialize_appointment(apt) for apt in appointments]

@router.patch("/{appointment_id}/status", response_model=AppointmentResponse)
def update_appointment_status(appointment_id: int, status_update: AppointmentStatusUpdate, db: Session = Depends(get_db)):
    apt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not apt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    apt.status = status_update.status
    try:
        db.commit()
        db.refresh(apt)
        return serialize_appointment(apt)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))