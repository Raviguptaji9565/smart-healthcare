from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from app.database.database import get_db
from app.models.health_metrics import HealthMetric
import datetime

router = APIRouter(prefix="/api/health-metrics", tags=["Health Metrics"])


# ─── Pydantic Schemas ─────────────────────────────────────────────────────────

class HealthMetricCreate(BaseModel):
    user_id: int
    heart_rate: Optional[float] = None
    systolic_bp: Optional[float] = None
    diastolic_bp: Optional[float] = None
    blood_glucose: Optional[float] = None
    sleep_duration: Optional[float] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    notes: Optional[str] = None


class HealthMetricResponse(BaseModel):
    id: int
    user_id: int
    heart_rate: Optional[float]
    systolic_bp: Optional[float]
    diastolic_bp: Optional[float]
    blood_glucose: Optional[float]
    sleep_duration: Optional[float]
    weight: Optional[float]
    height: Optional[float]
    notes: Optional[str]
    recorded_at: Optional[datetime.datetime]

    class Config:
        from_attributes = True


# ─── Helper ───────────────────────────────────────────────────────────────────

def serialize_metric(m: HealthMetric) -> dict:
    return {
        "id": m.id,
        "user_id": m.user_id,
        "heart_rate": m.heart_rate,
        "systolic_bp": m.systolic_bp,
        "diastolic_bp": m.diastolic_bp,
        "blood_glucose": m.blood_glucose,
        "sleep_duration": m.sleep_duration,
        "weight": m.weight,
        "height": m.height,
        "notes": m.notes,
        "recorded_at": m.recorded_at.isoformat() if m.recorded_at else None,
    }


# ─── Routes ───────────────────────────────────────────────────────────────────

@router.post("/", response_model=HealthMetricResponse)
def add_metric(data: HealthMetricCreate, db: Session = Depends(get_db)):
    """Record new health metrics for a user."""
    metric = HealthMetric(**data.model_dump())
    db.add(metric)
    db.commit()
    db.refresh(metric)
    return metric


@router.get("/user/{user_id}")
def get_user_metrics(user_id: int, limit: int = 10, db: Session = Depends(get_db)):
    """Get the most recent health metrics for a user."""
    metrics = (
        db.query(HealthMetric)
        .filter(HealthMetric.user_id == user_id)
        .order_by(HealthMetric.recorded_at.desc())
        .limit(limit)
        .all()
    )
    return [serialize_metric(m) for m in metrics]


@router.get("/user/{user_id}/latest")
def get_latest_metric(user_id: int, db: Session = Depends(get_db)):
    """Get the single most recent health metric record for a user."""
    metric = (
        db.query(HealthMetric)
        .filter(HealthMetric.user_id == user_id)
        .order_by(HealthMetric.recorded_at.desc())
        .first()
    )
    if not metric:
        # Return demo defaults if no data yet
        return {
            "id": None,
            "user_id": user_id,
            "heart_rate": 72,
            "systolic_bp": 120,
            "diastolic_bp": 80,
            "blood_glucose": 95,
            "sleep_duration": 7.5,
            "weight": None,
            "height": None,
            "notes": "Demo data — no readings recorded yet",
            "recorded_at": None,
        }
    return serialize_metric(metric)


@router.delete("/{metric_id}")
def delete_metric(metric_id: int, db: Session = Depends(get_db)):
    metric = db.query(HealthMetric).filter(HealthMetric.id == metric_id).first()
    if not metric:
        raise HTTPException(status_code=404, detail="Metric not found")
    db.delete(metric)
    db.commit()
    return {"message": "Deleted successfully"}
