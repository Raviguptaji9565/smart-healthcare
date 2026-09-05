from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Time
from sqlalchemy.orm import relationship
from app.database.database import Base
import datetime


class Medicine(Base):
    __tablename__ = "medicines"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)           # e.g. "Metformin 500mg"
    dosage = Column(String, nullable=True)          # e.g. "500mg"
    frequency = Column(String, nullable=True)       # e.g. "Twice daily"
    instructions = Column(String, nullable=True)    # e.g. "Take with breakfast"
    is_taken = Column(Boolean, default=False)
    taken_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationship
    user = relationship("User", foreign_keys=[user_id])
