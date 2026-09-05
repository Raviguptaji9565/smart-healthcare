from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base
import datetime


class HealthMetric(Base):
    __tablename__ = "health_metrics"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    heart_rate = Column(Float, nullable=True)          # bpm
    systolic_bp = Column(Float, nullable=True)         # mmHg
    diastolic_bp = Column(Float, nullable=True)        # mmHg
    blood_glucose = Column(Float, nullable=True)       # mg/dL
    sleep_duration = Column(Float, nullable=True)      # hours
    weight = Column(Float, nullable=True)              # kg
    height = Column(Float, nullable=True)              # cm
    notes = Column(String, nullable=True)
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationship
    user = relationship("User", foreign_keys=[user_id])
