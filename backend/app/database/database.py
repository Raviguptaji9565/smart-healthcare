import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from dotenv import load_dotenv

# .env file ko load karein
load_dotenv()

def _normalize_database_url(url: str) -> str:
    if url and url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql://", 1)
    return url

LOCAL_DATABASE_URL = os.getenv("LOCAL_DATABASE_URL", "sqlite:///./smart_healthcare.db")
DATABASE_URL = _normalize_database_url(os.getenv("DATABASE_URL") or LOCAL_DATABASE_URL)

def _engine_options(database_url: str):
    if database_url.startswith("sqlite"):
        return {"connect_args": {"check_same_thread": False}}
    return {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }

def _create_engine(database_url: str):
    normalized = _normalize_database_url(database_url)
    return create_engine(normalized, **_engine_options(normalized))

engine = _create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def initialize_database():
    global DATABASE_URL, engine

    try:
        Base.metadata.create_all(bind=engine)
        return
    except SQLAlchemyError as error:
        if DATABASE_URL.startswith("sqlite"):
            raise

        print(
            "Remote database connection failed. "
            f"Using local SQLite database instead. Error: {error.__class__.__name__}"
        )
        DATABASE_URL = LOCAL_DATABASE_URL
        engine = _create_engine(DATABASE_URL)
        SessionLocal.configure(bind=engine)
        Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
