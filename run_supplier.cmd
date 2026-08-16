@echo off
setlocal
cd /d "%~dp0"

if "%~1"=="" (
  echo Usage: run_supplier.cmd VENDOR_CODE [additional main.py arguments]
  echo Example: run_supplier.cmd ADVENE --replace
  exit /b 2
)

if not exist ".venv\Scripts\python.exe" (
  echo ERROR: .venv is missing. Run install.cmd first.
  exit /b 1
)

set VENDOR_CODE=%~1
shift
".venv\Scripts\python.exe" main.py --vendor-code "%VENDOR_CODE%" %*
exit /b %ERRORLEVEL%
