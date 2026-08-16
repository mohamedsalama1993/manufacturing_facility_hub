param(
    [string]$Input = "data\input\suppliers.tsv",
    [string]$Output = "data\output\master_facilities.tsv",
    [ValidateRange(1, 50)][int]$Workers = 3,
    [switch]$All,
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

$Arguments = @("main.py", "--output", $Output, "--workers", "$Workers")
if ($All) {
    $Arguments += "--all"
}
else {
    if (-not (Test-Path $Input)) {
        Write-Host "ERROR: Input TSV was not found: $Input" -ForegroundColor Red
        exit 1
    }
    $Arguments += @("--input", $Input)
}

if ($Replace) { $Arguments += "--replace" }
if ($ShowBrowser) { $Arguments += "--show-browser" }
if ($Verbose) { $Arguments += "--verbose" }

& $Python @Arguments
exit $LASTEXITCODE
