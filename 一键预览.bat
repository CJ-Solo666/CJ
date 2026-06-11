@echo off
cd /d "%~dp0"
echo Starting birthday H5 preview...
echo.
start "birthday-preview-server" /min node preview-server.js
timeout /t 1 /nobreak >nul
start "" "http://localhost:5173"
echo.
echo If the browser is open, keep this window for reference.
echo If the page does not open, run:
echo   node preview-server.js
echo.
pause
