@echo off
cd /d "%~dp0"
echo Birthday H5 preview server
echo.
echo Keep this window open.
echo Then open this URL in Edge or Chrome:
echo.
echo   http://localhost:5173
echo.
node preview-server.js
pause
