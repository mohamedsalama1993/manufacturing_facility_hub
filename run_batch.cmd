@echo off
setlocal
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  echo ERROR: .venv is missing. Run install.cmd first.
  exit /b 1
)

REM Pass normal main.py batch arguments, for example:
REM run_batch.cmd --input data\input\suppliers.tsv --workers 3
REM run_batch.cmd --all --workers 3 --replace
".venv\Scripts\python.exe" main.py %*
exit /b %ERRORLEVEL%
