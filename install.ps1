param(
    [switch]$Clean,
    [switch]$SkipTests,
    [switch]$NoUpgrade
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

function Invoke-Checked {
    param(
        [Parameter(Mandatory=$true)][string]$Description,
        [Parameter(Mandatory=$true)][scriptblock]$Command
    )

    Write-Host ""
    Write-Host "==> $Description" -ForegroundColor Cyan
    & $Command
    if ($LASTEXITCODE -ne 0) {
        throw "$Description failed with exit code $LASTEXITCODE."
    }
}

function Resolve-PythonLauncher {
    if (Get-Command py.exe -ErrorAction SilentlyContinue) {
        try {
            & py.exe -3 -c "import sys; print(sys.executable)" | Out-Null
            if ($LASTEXITCODE -eq 0) {
                return @{ Command = "py.exe"; Arguments = @("-3") }
            }
        }
        catch { }
    }

    if (Get-Command python.exe -ErrorAction SilentlyContinue) {
        return @{ Command = "python.exe"; Arguments = @() }
    }

    if (Get-Command python -ErrorAction SilentlyContinue) {
        return @{ Command = "python"; Arguments = @() }
    }

    throw "Python was not found. Install Python 3.10 or newer and enable 'Add Python to PATH'."
}

$launcher = Resolve-PythonLauncher
$basePython = $launcher.Command
$baseArgs = $launcher.Arguments

$version = & $basePython @baseArgs -c "import sys; print('.'.join(map(str, sys.version_info[:3])))"
if ($LASTEXITCODE -ne 0) {
    throw "Unable to start Python."
}

$versionOk = & $basePython @baseArgs -c "import sys; raise SystemExit(0 if sys.version_info >= (3,10) else 1)"
if ($LASTEXITCODE -ne 0) {
    throw "Python 3.10 or newer is required. Detected: $version"
}
Write-Host "Using Python $version" -ForegroundColor Green

if ($Clean -and (Test-Path ".venv")) {
    Write-Host "Removing existing .venv..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".venv" -ErrorAction Stop
}

if (-not (Test-Path ".\.venv\Scripts\python.exe")) {
    Invoke-Checked "Creating virtual environment" {
        & $basePython @baseArgs -m venv .venv
    }
}

$Python = ".\.venv\Scripts\python.exe"
if (-not (Test-Path $Python)) {
    throw "Virtual environment was not created correctly: $Python is missing."
}

if (-not $NoUpgrade) {
    Invoke-Checked "Upgrading pip, setuptools, and wheel" {
        & $Python -m pip install --upgrade pip setuptools wheel
    }
}

Invoke-Checked "Installing all project libraries" {
    & $Python -m pip install --upgrade -r requirements.txt
}

Invoke-Checked "Verifying installed libraries and supplier modules" {
    & $Python tools\verify_install.py
}

Invoke-Checked "Compiling project Python files" {
    & $Python -m compileall -q facility_hub supplier_modules tools main.py
}

if (-not $SkipTests) {
    Invoke-Checked "Running automated tests" {
        & $Python -m pytest -q
    }
}

$chromeCandidates = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
)

if (-not ($chromeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1)) {
    Write-Warning "Chrome or Edge was not detected. Requests-only modules will work, but Selenium browser fallback needs a supported browser."
}

Write-Host ""
Write-Host "Installation completed successfully." -ForegroundColor Green
Write-Host "Run one module directly:"
Write-Host "  .\.venv\Scripts\python.exe supplier_modules\ADVENE.py"
Write-Host "Run one module through the shared runner:"
Write-Host "  .\.venv\Scripts\python.exe main.py --vendor-code ADVENE"
Write-Host "Run a batch:"
Write-Host "  .\run_batch.cmd --input data\input\suppliers.tsv --workers 3"
