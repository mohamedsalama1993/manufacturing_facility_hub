# Changelog

## 1.1.2

- Added `complete_address` to the final TSV schema.
- Added shared `build_complete_address()` normalization for all supplier modules.
- Existing TSV files are migrated during append runs by calculating missing complete addresses.
- Updated `ADVENE.py` to module version 1.1.2 and documented shared complete-address handling.
- Updated README, AGENT instructions, and automated tests.

## 1.1.1

- Replaced the Advanced Energy starter selectors with a live-page custom heading parser.
- Added duplicate merging for the responsive location lists and repeated Shanghai record.
- Added structured city, country, state, and postal extraction for Advanced Energy.
- Added `tzdata` to the installation requirements for Windows `zoneinfo` support.
- Added an offline regression test for the Advanced Energy module.

## 1.1.0

- Added `install.cmd` to avoid PowerShell execution-policy blocking.
- Rebuilt `install.ps1` to detect Python, create/reuse `.venv`, install all requirements, verify imports, compile files, and run tests.
- Added `tools/verify_install.py`.
- Made every public supplier module directly executable.
- Added shared `supplier_modules/_standalone.py` runner.
- Updated module template and scaffold generator to include standalone bootstrap and main block.
- Added `run_supplier.cmd`, `run_batch.cmd`, and `run_batch.ps1`.
- Expanded README and AGENT instructions for standalone and batch execution.
