@echo off
title Smart Healthcare Platform Launcher
echo =========================================================
echo   Starting Smart Healthcare Full-Stack Platform
echo =========================================================
echo.
echo [1/2] Launching Backend (FastAPI on Port 8000)...
start "SmartHealth-Backend" cmd /k "cd /d %~dp0backend && .\venv\Scripts\activate.bat && python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

timeout /t 2 /nobreak > nul

echo [2/2] Launching Frontend (Next.js on Port 3000)...
start "SmartHealth-Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo =========================================================
echo   All services launched in separate windows!
echo   - Web Application: http://localhost:3000
echo   - Backend Swagger: http://localhost:8000/docs
echo =========================================================
echo.
pause
