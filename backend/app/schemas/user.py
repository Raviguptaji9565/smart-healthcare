from pydantic import BaseModel, EmailStr
from app.models.user import UserRole

# Register karte waqt jo data aayega
class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    role: UserRole = UserRole.PATIENT

# Login karte waqt jo data aayega
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Response mein jo data wapas jayega (password hide karke)
class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role: UserRole

    class Config:
        from_attributes = True