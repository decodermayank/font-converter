@echo off
title Rajbhasha Kruti Dev 010 Converter Server
color 0A
echo =========================================================================
echo       RAJBHASHA KRUTI DEV 010 CONVERTER - OFFICE NETWORK SERVER
echo =========================================================================
echo.
echo Starting local web server...
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
)
set IP=%IP:~1%

echo [1] Local Machine Access Link:
echo     http://localhost:8080
echo.
echo [2] Shareable Office Network / Wi-Fi Link (Share this with colleagues):
echo     http://%IP%:8080
echo.
echo Press Ctrl+C in this window to stop the server when done.
echo =========================================================================
echo.
python -m http.server 8080
pause
