@echo off
title Smart Healthcare - Next.js Frontend
echo ===================================================
echo   Starting Smart Healthcare Frontend (Next.js)
echo   App URL: http://localhost:3000
echo ===================================================
echo.
cd /d "%~dp0frontend"
npm run dev
pause
