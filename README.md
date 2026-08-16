# Manufacturing Facility Hub

A Python framework for extracting every official supplier facility from supplier-specific HTML pages. Each supplier has a separate Python module named from its vendor code. The shared engine handles HTTP/browser fetching, parsing, normalization, manufacturing classification, deduplication, validation, snapshots, and TSV output.

## Final output schema

```text
supplier_name
vendor_code
facility_name
country
state_region
city
postal_code
address
complete_address
scope
source_role
manufacturing_flag
source_url
```

`manufacturing_flag` is `Yes` only when manufacturing is explicit in the facility scope or role. Engineering, sales, service, logistics, warehouse, headquarters, and unclassified locations remain in the output with `No`; their official function is retained in `source_role` and `scope`.

### Address fields

- `address` preserves the cleaned official address text extracted from the supplier page.
- `complete_address` combines the official address with any missing `city`, `state_region`, `postal_code`, and `country` values. Components already present are not repeated.
- The shared runner calculates `complete_address` for every supplier module, so individual modules do not need custom concatenation logic.

Example:

```text
address: Unit 10, Hawthorn Road
city: Littlehampton
state_region: West Sussex
postal_code: BN17 7LT
country: United Kingdom
complete_address: Unit 10, Hawthorn Road, Littlehampton, West Sussex, BN17 7LT, United Kingdom
```

## Project layout

```text
manufacturing_facility_hub/
├── AGENT.md
├── README.md
├── main.py
├── requirements.txt
├── install.cmd
├── install.ps1
├── run.ps1
├── run_supplier.cmd
├── run_batch.cmd
├── run_batch.ps1
├── facility_hub/
├── supplier_modules/
│   ├── _standalone.py
│   ├── _template.py
│   ├── ADVENE.py
│   ├── DELTA.py
│   └── JAE.py
├── tools/
│   ├── new_supplier_module.py
│   └── verify_install.py
├── data/
│   ├── input/suppliers.tsv
│   ├── output/
│   └── raw_html/
└── tests/
```

## Installation on Windows

The easiest method avoids PowerShell execution-policy problems. From PowerShell, use the required current-folder prefix:

```powershell
.\install.cmd
```

From Command Prompt, use:

```bat
install.cmd
```

`install.cmd` launches `install.ps1` with a process-only execution-policy bypass. The installer:

1. Detects Python 3.10 or newer.
2. Creates `.venv` when missing.
3. Upgrades `pip`, `setuptools`, and `wheel`.
4. Installs every library in `requirements.txt`.
5. Verifies all required imports and supplier modules.
6. Compiles the project.
7. Runs the automated tests.

Recreate the virtual environment completely:

```powershell
.\install.cmd -Clean
```

Install without running tests:

```powershell
.\install.cmd -SkipTests
```

PowerShell can also be used directly:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\install.ps1
```

Chrome or Microsoft Edge must be installed for Selenium browser fallback. Selenium Manager normally obtains the compatible browser driver automatically.

## Run a supplier module directly

Every public supplier module is standalone. It adds the project root to `sys.path` before importing the shared package.

```powershell
.\.venv\Scripts\python.exe supplier_modules\ADVENE.py
```

Use a separate output and replace it:

```powershell
.\.venv\Scripts\python.exe supplier_modules\ADVENE.py `
  --output data\output\ADVENE_test.tsv `
  --replace
```

Use saved HTML:

```powershell
.\.venv\Scripts\python.exe supplier_modules\ADVENE.py `
  --html saved_page.html `
  --output data\output\ADVENE_offline.tsv `
  --replace
```

Available standalone arguments:

```text
--output PATH
--html PATH
--replace
--show-browser
--verbose
```

## Run one supplier through the shared runner

```powershell
.\.venv\Scripts\python.exe main.py --vendor-code ADVENE
```

Or use the CMD launcher:

```bat
run_supplier.cmd ADVENE
```

Additional arguments are passed to `main.py`:

```bat
run_supplier.cmd ADVENE --output data\output\ADVENE.tsv --replace
```

PowerShell launcher:

```powershell
.\run.ps1 -VendorCode ADVENE -Replace
```

## Run selected suppliers as a batch

Repeat `--vendor-code`:

```powershell
.\.venv\Scripts\python.exe main.py `
  --vendor-code ADVENE `
  --vendor-code DELTA `
  --vendor-code JAE `
  --workers 3
```

## Run a TSV batch

The input file must contain a `vendor_code` column. `supplier_name` and `facility_url` can remain for documentation; each supplier module is the extraction configuration source.

```bat
run_batch.cmd --input data\input\suppliers.tsv --workers 3
```

Replace the previous output:

```bat
run_batch.cmd --input data\input\suppliers.tsv --workers 3 --replace
```

Equivalent PowerShell wrapper:

```powershell
.\run_batch.ps1 `
  -Input data\input\suppliers.tsv `
  -Workers 3 `
  -Replace
```

## Run every supplier module

```bat
run_batch.cmd --all --workers 3
```

Or:

```powershell
.\run_batch.ps1 -All -Workers 3
```

Use modest concurrency—normally 3 to 5 workers—for browser-heavy suppliers.

## Create a new standalone supplier module

```powershell
.\.venv\Scripts\python.exe tools\new_supplier_module.py `
  --supplier-name "Supplier Name" `
  --vendor-code "VENDOR" `
  --url "https://supplier.example/facilities"
```

The generated module includes:

- Project-root bootstrap for direct execution
- `CONFIG = SupplierConfig(...)`
- Standalone `__main__` block
- Compatibility with `main.py`, `run_supplier.cmd`, and batch runs

Then follow `AGENT.md` to inspect the official page, replace selectors, test every region, and validate the output.


## Included Advanced Energy module (`ADVENE`)

`ADVENE.py` is the live Advanced Energy Industries configuration. The page uses location headings followed by role and address text instead of stable repeated facility cards. The module therefore:

- extracts locations by heading boundaries;
- captures official role/scope and address text;
- normalizes country values and common source misspellings;
- extracts city, state/region, and postal code when available;
- merges responsive desktop/mobile duplicates;
- merges repeated Shanghai role information;
- receives `complete_address` automatically from the shared runner; and
- works standalone and through single-supplier or batch execution.

Run it directly:

```powershell
.\.venv\Scripts\python.exe .\supplier_modules\ADVENE.py `
  --output .\data\output\ADVENE.tsv `
  --replace
```

## Supplier-module contract

Every module must expose:

```python
CONFIG = SupplierConfig(...)
```

Configuration-only modules use the generic parser. Complex modules can additionally expose:

```python
def parse_facilities(context: PageContext) -> list[FacilityRecord]:
    ...
```

Optional final cleanup:

```python
def postprocess_records(rows: list[FacilityRecord]) -> list[FacilityRecord]:
    ...
```

Every public supplier module must end with:

```python
if __name__ == "__main__":
    from supplier_modules._standalone import run_standalone

    raise SystemExit(run_standalone(CONFIG.vendor_code))
```

Do not write TSV files from supplier modules. Return `FacilityRecord` objects and let the shared runner handle output.

## Offline HTML and snapshots

For a module containing one configured page:

```powershell
.\.venv\Scripts\python.exe main.py `
  --vendor-code MYCODE `
  --html saved_page.html `
  --output data\output\MYCODE_test.tsv `
  --replace
```

Every run saves raw HTML under:

```text
data/raw_html/<VENDOR_CODE>/<TIMESTAMP>/
```

## Verification commands

```powershell
.\.venv\Scripts\python.exe tools\verify_install.py
.\.venv\Scripts\python.exe -m compileall facility_hub supplier_modules tools
.\.venv\Scripts\python.exe -m pytest -q
```

## Quality rules

- Extract every official facility category, not only plants.
- Keep exact official scope/function text where useful.
- Set manufacturing to `Yes` only with explicit manufacturing evidence.
- Never infer manufacturing from a legal entity name or industrial address.
- Use precise repeated containers and stable selectors.
- Exercise tabs, regions, accordions, iframes, dropdowns, pagination, and load-more controls.
- Keep locations with missing addresses when they are clearly real official facilities.
- Inspect generated TSV rows, including `complete_address`, before accepting a module.
