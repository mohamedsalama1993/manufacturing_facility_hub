@echo off
setlocal
cd /d "%~dp0"

set PY=.venv\Scripts\python.exe
if not exist "%PY%" set PY=python

echo Running RRD diagnostic in visible Chrome...
"%PY%" RRDN_DEBUG.py --headed --wait 12 --output RRDN_debug

if errorlevel 1 (
  echo.
  echo DEBUG RUN FAILED. See the error above.
  pause
  exit /b 1
)

echo.
echo Finished.
echo Upload RRDN_debug.zip back to ChatGPT.
pause
