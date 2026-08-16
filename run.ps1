param(
    [Parameter(Mandatory=$true)]
    [string]$VendorCode,

    [string]$Output = "data\output\master_facilities.tsv",

    [string]$Html = "",

    [switch]$Replace,
    [switch]$ShowBrowser,
    [switch]$Verbose
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$Python = ".\.venv\Scripts\python.exe"
if (-not (Test-Path $Python)) {
    Write-Host "ERROR: .venv is missing. Run install.cmd first." -ForegroundColor Red
    exit 1
}

$Arguments = @("main.py", "--vendor-code", $VendorCode, "--output", $Output)
if ($Html) { $Arguments += @("--html", $Html) }
if ($Replace) { $Arguments += "--replace" }
if ($ShowBrowser) { $Arguments += "--show-browser" }
if ($Verbose) { $Arguments += "--verbose" }

& $Python @Arguments
exit $LASTEXITCODE
