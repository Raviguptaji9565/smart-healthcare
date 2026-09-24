from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.services.auth import get_password_hash, verify_password

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check karein ki email pehle se toh nahi hai
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    try:
        # DEBUG: VS Code terminal mein dekhein ki asal mein kya password aa raha hai
        print(f"👉 Frontend se aaya password: '{user.password}'")
        
        # FIX: Agar password kisi wajah se lamba aa bhi jaye, toh hum usko 72 chars tak kat (truncate) denge taaki error na aaye.
        safe_password = str(user.password)[:72] 
        
        hashed_pwd = get_password_hash(safe_password)
        
        # Naya user create karein
        new_user = User(
            full_name=user.full_name,
            email=user.email,
            hashed_password=hashed_pwd,
            role=user.role
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    
    except SQLAlchemyError as e:
        db.rollback() # Error aane par database state theek rakhein
        print(f"Database Error: {e}")
        raise HTTPException(status_code=500, detail="Database table missing ya error hai. Terminal check karein.")
    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    # Database mein user dhundhein
    db_user = db.query(User).filter(User.email == user.email).first()
    
    # Agar user na mile ya password galat ho
    # Safe verification ke liye string mein convert kiya gaya hai
    if not db_user or not verify_password(str(user.password)[:72], db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "id": db_user.id,
        "role": db_user.role,
        "name": db_user.full_name,
        "email": db_user.email,
    }

@router.get("/doctors", response_model=list[UserResponse])
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(User).filter(User.role == "doctor").all()
    return doctors