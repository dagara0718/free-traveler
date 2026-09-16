#!/usr/bin/env python3
"""Pre-flight input validator for the Traveler Task Generation Pipeline.

Runs 11 checks against the repo's package.json, src/app, docs/, and
design-reference/ before any Task List generation is allowed to proceed.

Usage:
    python scripts/validate_inputs.py

Output:
    Success -> "VALIDATE_INPUTS_PASS" plus the number of checks run, exit 0.
    Failure -> each failing check prints the missing file/Screen/Requirement
               ID(s) it found, exit 1.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HARNESS_SCHEMA = "traveler-screen-route-v1"
EXPECTED_SCREEN_IDS = [f"SCR-{i:03d}" for i in range(1, 6)]
EXPECTED_ROUTES = {"/", "/about", "/travel-tools", "/mates", "/account"}
EXPECTED_FUNC_COUNT = 80
EXPECTED_NF_COUNT = 34

PACKAGE_JSON_PATH = ROOT / "package.json"
PAGE_TSX_PATH = ROOT / "src" / "app" / "page.tsx"
LAYOUT_TSX_PATH = ROOT / "src" / "app" / "layout.tsx"

PRD_PATH = ROOT / "docs" / "01_PRD.md.md"
SRS_PATH = ROOT / "docs" / "02_SRS_BASELINE.md"
PROJECT_SCOPE_PATH = ROOT / "docs" / "PROJECT_SCOPE.md"
UI_DOC_PATH = ROOT / "design-reference" / "UI_CONTRACT.md"

DESIGN_MD_PATH = ROOT / "design-reference" / "D-001" / "DESIGN.md"
MANIFEST_PATH = ROOT / "design-reference" / "DESIGN_MANIFEST.md"

CONTRACT_PATH = ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"
SRC_APP_PATH = ROOT / "src" / "app"
SNAPSHOT_PATH = ROOT / ".claude" / "tasks" / "SRC_APP_SNAPSHOT.json"

PAGE_ENTRY_RE = re.compile(r"^src/app(/[A-Za-z0-9_\-\[\]]+)*/(page|route)\.(tsx|ts)$")

TOTAL_CHECKS = 11

errors: list[str] = []


def fail(check_no: int, msg: str) -> None:
    errors.append(f"[check {check_no}] {msg}")


# 1. package.json has a Next.js dependency
def check_1_next_dependency() -> None:
    if not PACKAGE_JSON_PATH.exists():
        fail(1, f"missing file: {PACKAGE_JSON_PATH.relative_to(ROOT)}")
        return
    try:
        pkg = json.loads(PACKAGE_JSON_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(1, f"package.json is not valid JSON: {exc}")
        return
    deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
    if "next" not in deps:
        fail(1, "package.json has no 'next' dependency")


# 2. src/app/page.tsx and src/app/layout.tsx exist
def check_2_app_entry_files() -> None:
    for p in (PAGE_TSX_PATH, LAYOUT_TSX_PATH):
        if not p.exists():
            fail(2, f"missing file: {p.relative_to(ROOT)}")


# 3. PRD, SRS, Project Scope, UI docs exist
def check_3_core_docs() -> None:
    for path, label in (
        (PRD_PATH, "PRD"),
        (SRS_PATH, "SRS"),
        (PROJECT_SCOPE_PATH, "Project Scope"),
        (UI_DOC_PATH, "UI 문서"),
    ):
        if not path.exists():
            fail(3, f"missing {label} file: {path.relative_to(ROOT)}")


# 4. D-001 DESIGN.md and LOCKED Manifest exist
def check_4_design_and_manifest() -> None:
    if not DESIGN_MD_PATH.exists():
        fail(4, f"missing file: {DESIGN_MD_PATH.relative_to(ROOT)}")
    if not MANIFEST_PATH.exists():
        fail(4, f"missing file: {MANIFEST_PATH.relative_to(ROOT)}")
        return
    manifest_text = MANIFEST_PATH.read_text(encoding="utf-8")
    if "LOCKED" not in manifest_text:
        fail(4, f"{MANIFEST_PATH.relative_to(ROOT)} does not declare Status: LOCKED")


# 5. SCREEN_ROUTE_CONTRACT.json parses as JSON
def check_5_contract_parses() -> dict | None:
    if not CONTRACT_PATH.exists():
        fail(5, f"missing file: {CONTRACT_PATH.relative_to(ROOT)}")
        return None
    try:
        return json.loads(CONTRACT_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(5, f"SCREEN_ROUTE_CONTRACT.json is not valid JSON: {exc}")
        return None


# 6. Screen count is exactly 5
def check_6_screen_count(contract: dict | None) -> list[dict]:
    if contract is None:
        return []
    screens = contract.get("screens", [])
    if len(screens) != 5:
        fail(6, f"expected exactly 5 screens, found {len(screens)}")
    return screens


# 7. SCR-001~005 all present
def check_7_screen_ids_present(screens: list[dict]) -> None:
    found_ids = {s.get("id") for s in screens}
    missing = [sid for sid in EXPECTED_SCREEN_IDS if sid not in found_ids]
    if missing:
        fail(7, f"missing Screen ID(s): {missing}")


# 8. Routes are exactly /, /about, /travel-tools, /mates, /account
def check_8_routes(screens: list[dict]) -> None:
    routes = {s.get("route") for s in screens}
    missing = EXPECTED_ROUTES - routes
    extra = routes - EXPECTED_ROUTES
    if missing:
        fail(8, f"missing required Route(s): {sorted(missing)}")
    if extra:
        fail(8, f"unexpected Route(s) not in the approved set: {sorted(extra)}")


# 9. Page Entry matches real Next.js App Router path shape
def check_9_page_entry_shape(screens: list[dict]) -> None:
    for s in screens:
        entry = s.get("page_entry", "")
        if not PAGE_ENTRY_RE.match(entry or ""):
            fail(9, f"{s.get('id', '?')} page_entry is not a valid App Router path: {entry!r}")


# 10. PROJECT_SCOPE.md mentions all 80 REQ-FUNC and 34 REQ-NF IDs
def check_10_project_scope_requirement_ids() -> None:
    if not PROJECT_SCOPE_PATH.exists():
        return  # already reported by check 3
    text = PROJECT_SCOPE_PATH.read_text(encoding="utf-8")
    expected_ids = [f"REQ-FUNC-{i:03d}" for i in range(1, EXPECTED_FUNC_COUNT + 1)]
    expected_ids += [f"REQ-NF-{i:03d}" for i in range(1, EXPECTED_NF_COUNT + 1)]
    missing = [rid for rid in expected_ids if rid not in text]
    if missing:
        fail(10, f"missing Requirement ID(s) in PROJECT_SCOPE.md: {missing}")


# 11. AWS/EC2 not defined as active technology
def check_11_no_active_aws_ec2(contract: dict | None) -> None:
    aws_pattern = re.compile(r"\b(aws|ec2)\b", re.IGNORECASE)

    if PACKAGE_JSON_PATH.exists():
        try:
            pkg = json.loads(PACKAGE_JSON_PATH.read_text(encoding="utf-8"))
            deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
            hits = [d for d in deps if aws_pattern.search(d)]
            if hits:
                fail(11, f"package.json declares AWS/EC2 dependency: {hits}")
        except json.JSONDecodeError:
            pass  # already reported by check 1

    if contract is not None:
        contract_text = json.dumps(contract, ensure_ascii=False)
        if aws_pattern.search(contract_text):
            fail(11, "SCREEN_ROUTE_CONTRACT.json references AWS/EC2 as active technology")

    if DESIGN_MD_PATH.exists():
        design_text = DESIGN_MD_PATH.read_text(encoding="utf-8")
        if aws_pattern.search(design_text):
            fail(11, "D-001/DESIGN.md references AWS/EC2 as active technology")


def snapshot_src_app() -> None:
    """Write the real src/app file tree so later pipeline steps (Expected
    Files, rule 4) diff against reality instead of inventing paths."""
    files: list[str] = []
    if SRC_APP_PATH.exists():
        for p in sorted(SRC_APP_PATH.rglob("*")):
            if p.is_file():
                files.append(str(p.relative_to(ROOT)).replace("\\", "/"))
    SNAPSHOT_PATH.parent.mkdir(parents=True, exist_ok=True)
    SNAPSHOT_PATH.write_text(
        json.dumps({"harness_schema": HARNESS_SCHEMA, "src_app_files": files}, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8")

    snapshot_src_app()
    check_1_next_dependency()
    check_2_app_entry_files()
    check_3_core_docs()
    check_4_design_and_manifest()

    contract = check_5_contract_parses()
    screens = check_6_screen_count(contract)
    check_7_screen_ids_present(screens)
    check_8_routes(screens)
    check_9_page_entry_shape(screens)
    check_10_project_scope_requirement_ids()
    check_11_no_active_aws_ec2(contract)

    if errors:
        for e in errors:
            print(f"FAIL: {e}")
        print(f"\nVALIDATE_INPUTS_FAIL ({len(errors)} error(s) across {TOTAL_CHECKS} checks)")
        return 1

    print(f"VALIDATE_INPUTS_PASS ({TOTAL_CHECKS} checks)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
