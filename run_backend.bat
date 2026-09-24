@echo off
title Smart Healthcare - FastAPI Backend
echo ===================================================
echo   Starting Smart Healthcare Backend (FastAPI)
echo   API Base: http://127.0.0.1:8000
echo   API Docs: http://127.0.0.1:8000/docs
echo ===================================================
echo.
cd /d "%~dp0backend"
call .\venv\Scripts\activate.bat
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
pause
