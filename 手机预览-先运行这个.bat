@echo off
cd /d "%~dp0"
echo.
echo Birthday H5 preview server
echo.
echo Open on this computer:
echo   http://localhost:5173
echo.
echo Open on your phone:
echo   1. Connect phone and computer to the same Wi-Fi
echo   2. Open one of these URLs in the phone browser
echo.
powershell -NoProfile -Command "Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.PrefixOrigin -ne 'WellKnown' } | ForEach-Object { '  http://' + $_.IPAddress + ':5173' }"
echo.
echo Keep this window open. Press Ctrl + C to stop.
echo.
node preview-server.js
pause
