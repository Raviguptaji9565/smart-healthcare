from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.database.database import Base
import enum

# User ke 3 roles define kar rahe hain (Master prompt ke anusaar)
class UserRole(str, enum.Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    ADMIN = "admin"

# Database table ka structure
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.PATIENT)
    is_active = Column(Boolean, default=True)
    
    # Helper method
    def is_doctor(self):
        return self.role == UserRole.DOCTOR