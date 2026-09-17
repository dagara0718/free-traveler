#!/usr/bin/env python3
"""Final audit for the Traveler Task Generation Pipeline.

Runs the 18 numbered checks against TASKS/00_TASK_LIST.md and the
TASKS/TASK-<ID>.md detail files, cross-referenced with
design-reference/SCREEN_ROUTE_CONTRACT.json and docs/PROJECT_SCOPE.md.

Usage:
    python scripts/audit_tasks.py

Output:
    TASKS/TASK_MANIFEST.csv       - one row per task (always written)
    TASKS/TASK_AUDIT_REPORT.md    - 18 checks with PASS/FAIL + details (always written)
    stdout: "AUDIT_PASS (18 checks)" and exit 0 on success.
            "AUDIT_FAIL" with per-check failures and exit 1 otherwise.
"""

from __future__ import annotations

import csv
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HARNESS_SCHEMA = "traveler-screen-route-v1"
CONTRACT_PATH = ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"
PROJECT_SCOPE_PATH = ROOT / "docs" / "PROJECT_SCOPE.md"

TASKS_DIR = ROOT / "TASKS"
TASKLIST_PATH = TASKS_DIR / "00_TASK_LIST.md"
MANIFEST_PATH = TASKS_DIR / "TASK_MANIFEST.csv"
REPORT_PATH = TASKS_DIR / "TASK_AUDIT_REPORT.md"

REQUIRED_DB_TASKS = ["DB-SCHEMA-BASE", "DB-RLS-BASE", "DB-ACCESS", "DB-SEED-BASE"]
BASE_DB_TABLE_COUNT = 6
DB_TABLE_TOLERANCE = 2  # "크게 넘지 않음" — allow a small margin, not an exact cap

FORBIDDEN_KEYWORDS = [
    "EC2", "AWS SDK", "aws-sdk", "자동 merge", "auto-merge", "automerge",
    "merge queue", "load test", "부하 테스트 인프라", "SES", "SendGrid", "Mailgun",
]
CROSS_BROWSER_KEYWORDS = ["firefox", "webkit", "safari", "cross-browser", "다중 브라우저"]
NEGATION_MARKERS = (
    "않는다", "않음", "금지", "제외", "없다", "없음", "미도입", "미구현", "미포함",
    "미사용", "사용하지", "지양", "배제", "not allowed", "never",
)

REQ_TOKEN_RE = re.compile(r"REQ-(?:FUNC|NF)-\d{3}")

checks: list[dict] = []  # {"no": int, "desc": str, "passed": bool, "details": [str]}


def record(no: int, desc: str, passed: bool, details: list[str] | None = None) -> None:
    checks.append({"no": no, "desc": desc, "passed": passed, "details": details or []})


def read(path: Path) -> str:
    return path.read_text(encoding="utf-8") if path.exists() else ""


def detail_path(task_id: str) -> Path:
    return TASKS_DIR / f"TASK-{task_id}.md"


def split_req_ids(cell: str) -> list[str]:
    if not cell or cell.strip() in ("-", "없음", ""):
        return []
    return REQ_TOKEN_RE.findall(cell)


def split_task_ids(cell: str) -> list[str]:
    if not cell or cell.strip() in ("-", "없음", ""):
        return []
    return [c.strip() for c in cell.split(",") if c.strip() and c.strip() != "-"]


def load_contract() -> dict:
    if not CONTRACT_PATH.exists():
        return {}
    contract = json.loads(CONTRACT_PATH.read_text(encoding="utf-8"))
    return contract


def load_tasklist() -> tuple[list[dict], str]:
    text = read(TASKLIST_PATH)
    if not text:
        return [], ""
    lines = text.split("\n")
    rows: list[dict] = []
    in_table = False
    for line in lines:
        if line.startswith("| Seq | Task ID"):
            in_table = True
            continue
        if in_table:
            if line.startswith("|---"):
                continue
            if not line.startswith("|"):
                break
            cells = [c.strip() for c in line.split("|")[1:-1]]
            if len(cells) < 16:
                continue
            rows.append(
                {
                    "seq": cells[0], "id": cells[1], "title": cells[2], "category": cells[3],
                    "impl_status": cells[4], "requirements": split_req_ids(cells[5]),
                    "req_cell": cells[5], "screen": cells[6], "route": cells[7],
                    "page_entry": cells[8], "depends": split_task_ids(cells[9]),
                    "expected_files": cells[10], "functional_ac": cells[11],
                    "visual_ac": cells[12], "security_ac": cells[13],
                    "verify": cells[14], "priority": cells[15],
                }
            )
    return rows, text


SCOPE_ROW_RE = re.compile(r"^\|\s*(REQ-(?:FUNC|NF)-\d{3})\s*\|\s*([^|]+?)\s*\|", re.MULTILINE)


def load_project_scope_excluded() -> set[str]:
    """Only requirement rows whose classification cell starts with EXCLUDED
    count — PROJECT_SCOPE.md mentions every REQ ID regardless of status, so a
    blanket token scan would misclassify every IMPLEMENT row as excluded."""
    text = read(PROJECT_SCOPE_PATH)
    if not text:
        return set()
    return {rid for rid, status in SCOPE_ROW_RE.findall(text) if status.strip().startswith("EXCLUDED")}


def _line_is_prohibition(line: str) -> bool:
    return any(m in line for m in NEGATION_MARKERS)


def _find_active_use(text: str, keywords: list[str]) -> list[str]:
    hits = []
    for raw_line in text.split("\n"):
        for kw in keywords:
            if re.search(r"\b" + re.escape(kw) + r"\b", raw_line, re.IGNORECASE) and not _line_is_prohibition(raw_line):
                hits.append(f"'{kw}' :: {raw_line.strip()[:120]}")
    return hits


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        if hasattr(stream, "reconfigure"):
            stream.reconfigure(encoding="utf-8")

    contract = load_contract()
    screen_ids = [s["id"] for s in contract.get("screens", [])]
    screen_by_id = {s["id"]: s for s in contract.get("screens", [])}

    tasks, full_text = load_tasklist()
    task_by_id = {t["id"]: t for t in tasks}
    detail_ids = {p.stem.removeprefix("TASK-") for p in TASKS_DIR.glob("TASK-*.md")}

    # 1. Task List <-> detail files 1:1
    task_id_set = set(task_by_id.keys())
    missing_details = sorted(task_id_set - detail_ids)
    orphan_details = sorted(detail_ids - task_id_set)
    record(1, "Task List 구현 ID와 상세 Task 파일 1:1", not missing_details and not orphan_details,
           [f"missing detail files: {missing_details}"] * bool(missing_details)
           + [f"orphan detail files: {orphan_details}"] * bool(orphan_details))

    # 2. Duplicate Task ID == 0
    ids = [t["id"] for t in tasks]
    dup = sorted({i for i in ids if ids.count(i) > 1})
    record(2, "중복 Task ID 0", not dup, [f"duplicates: {dup}"] if dup else [])

    # 3. Depends On 누락 0 (every referenced ID must exist in the Task List)
    dangling = []
    for t in tasks:
        for d in t["depends"]:
            if d not in task_id_set:
                dangling.append(f"{t['id']} -> {d}")
    record(3, "Depends On 누락 0", not dangling, [f"dangling dependency: {x}" for x in dangling])

    # 4. Dependency Cycle == 0
    cycle_found = []
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {t["id"]: WHITE for t in tasks}

    def dfs(node: str, stack: list[str]) -> None:
        color[node] = GRAY
        stack.append(node)
        for dep in task_by_id.get(node, {}).get("depends", []):
            if dep not in task_by_id:
                continue
            if color.get(dep) == GRAY:
                cyc = stack[stack.index(dep):] + [dep]
                cycle_found.append(" -> ".join(cyc))
            elif color.get(dep) == WHITE:
                dfs(dep, stack)
        stack.pop()
        color[node] = BLACK

    for t in tasks:
        if color.get(t["id"]) == WHITE:
            dfs(t["id"], [])
    record(4, "Dependency Cycle 0", not cycle_found, [f"cycle: {c}" for c in cycle_found])

    # 5. Screen 5개 모두 Page Owner 정확히 1개
    owners = [t for t in tasks if t["category"] == "PAGE_OWNER"]
    owners_by_screen: dict[str, dict] = {}
    dup_owner_screens = []
    for o in owners:
        if o["screen"] in owners_by_screen:
            dup_owner_screens.append(o["screen"])
        owners_by_screen[o["screen"]] = o
    missing_owner_screens = [sid for sid in screen_ids if sid not in owners_by_screen]
    ok5 = len(owners) == len(screen_ids) and not dup_owner_screens and not missing_owner_screens
    d5 = []
    if missing_owner_screens:
        d5.append(f"missing Page Owner for: {missing_owner_screens}")
    if dup_owner_screens:
        d5.append(f"more than one Page Owner for: {dup_owner_screens}")
    record(5, "Screen 5개 모두 Page Owner 정확히 1개", ok5, d5)

    # 6. Route / Page Entry / Expected Files 일치
    mismatches = []
    for sid, owner in owners_by_screen.items():
        contract_screen = screen_by_id.get(sid)
        if not contract_screen:
            mismatches.append(f"{sid} not defined in SCREEN_ROUTE_CONTRACT.json")
            continue
        if owner["route"].strip("`") != contract_screen["route"]:
            mismatches.append(f"{owner['id']} route {owner['route']!r} != contract {contract_screen['route']!r}")
        if owner["page_entry"].strip("`") != contract_screen["page_entry"]:
            mismatches.append(f"{owner['id']} page_entry {owner['page_entry']!r} != contract {contract_screen['page_entry']!r}")
        if contract_screen["page_entry"] not in owner["expected_files"]:
            mismatches.append(f"{owner['id']} Expected Files does not include page_entry {contract_screen['page_entry']!r}")
    record(6, "Route·Page Entry·Expected Files 일치", not mismatches, mismatches)

    # 7. Component-only Screen 0 (every SCR-* referenced by any task must have a Page Owner)
    referenced_screens: set[str] = set()
    for t in tasks:
        for tok in re.split(r",\s*", t["screen"]):
            tok = tok.strip()
            if tok.startswith("SCR-"):
                referenced_screens.add(tok)
    component_only = sorted(referenced_screens - set(owners_by_screen.keys()))
    unknown_screens = sorted(referenced_screens - set(screen_ids))
    ok7 = not component_only and not unknown_screens
    d7 = []
    if component_only:
        d7.append(f"screens with tasks but no Page Owner: {component_only}")
    if unknown_screens:
        d7.append(f"screens not in SCREEN_ROUTE_CONTRACT.json: {unknown_screens}")
    record(7, "Component-only Screen 0", ok7, d7)

    # 8. SCR-001 Starter 제거 AC 존재
    root_owner = owners_by_screen.get("SCR-001")
    ok8 = False
    d8 = []
    if root_owner:
        text = read(detail_path(root_owner["id"]))
        ok8 = any(s in text for s in ("스타터", "starter", "Starter"))
        if not ok8:
            d8.append(f"TASK-{root_owner['id']}.md missing starter-removal reference")
    else:
        d8.append("no Page Owner found for SCR-001")
    record(8, "SCR-001 Starter 제거 AC 존재", ok8, d8)

    # 9. SCR-003 세 탭 조립 AC 존재
    tools_owner = owners_by_screen.get("SCR-003")
    ok9 = False
    d9 = []
    if tools_owner:
        text = read(detail_path(tools_owner["id"]))
        missing_tabs = [s for s in ("항공", "숙소", "동행") if s not in text]
        ok9 = not missing_tabs
        if missing_tabs:
            d9.append(f"TASK-{tools_owner['id']}.md missing tab reference(s): {missing_tabs}")
    else:
        d9.append("no Page Owner found for SCR-003")
    record(9, "SCR-003 세 탭 조립 AC 존재", ok9, d9)

    # 10. SCR-005 역할별 상태 조립 AC 존재
    account_owner = owners_by_screen.get("SCR-005")
    ok10 = False
    d10 = []
    if account_owner:
        text = read(detail_path(account_owner["id"]))
        missing_roles = [s for s in ("Guest", "Member", "Admin") if s not in text]
        ok10 = not missing_roles
        if missing_roles:
            d10.append(f"TASK-{account_owner['id']}.md missing role reference(s): {missing_roles}")
    else:
        d10.append("no Page Owner found for SCR-005")
    record(10, "SCR-005 역할별 상태 조립 AC 존재", ok10, d10)

    # 11. DB Schema·RLS·Access·Seed Task 존재
    missing_db_tasks = [tid for tid in REQUIRED_DB_TASKS if tid not in task_id_set]
    record(11, "DB Schema·RLS·Access·Seed Task 존재", not missing_db_tasks,
           [f"missing DB task: {t}" for t in missing_db_tasks])

    # 12. DB Table 범위가 6개 기본 테이블을 크게 넘지 않음
    table_re = re.compile(r"(?:Table|테이블)\s*[:：]\s*`?([a-zA-Z_][a-zA-Z0-9_]*)`?")
    tables: set[str] = set()
    for t in tasks:
        if t["category"] != "DB":
            continue
        tables.update(table_re.findall(read(detail_path(t["id"]))))
    ok12 = len(tables) <= BASE_DB_TABLE_COUNT + DB_TABLE_TOLERANCE
    record(12, f"DB Table 범위가 기본 {BASE_DB_TABLE_COUNT}개를 크게 넘지 않음 (허용 상한 {BASE_DB_TABLE_COUNT + DB_TABLE_TOLERANCE})",
           ok12, [] if ok12 else [f"tables found ({len(tables)}): {sorted(tables)}"])

    # 13. 외부 입력 비저장 AC 존재 (flight/hotel forms must state no server/DB/URL transmission)
    no_transmit_ids = [tid for tid in ("COMPONENT-SC003-FLIGHT-FORM", "COMPONENT-SC003-HOTEL-FORM") if tid in task_id_set]
    d13 = []
    for tid in no_transmit_ids:
        text = read(detail_path(tid))
        if not any(s in text for s in ("미전송", "저장하지 않", "전달하지 않", "전송하지 않")):
            d13.append(f"TASK-{tid}.md missing no-transmit AC")
    record(13, "외부 입력 비저장 AC 존재", not d13 and bool(no_transmit_ids), d13 or ([] if no_transmit_ids else ["flight/hotel form tasks not found"]))

    # 14. Auth·성인·기본 RLS AC 존재
    d14 = []
    auth_text = read(detail_path("API-AUTH")) if "API-AUTH" in task_id_set else ""
    if not any(s in auth_text for s in ("성인", "adult_verified_at", "is_adult")):
        d14.append("API-AUTH detail missing adult-verification reference")
    rls_text = read(detail_path("DB-RLS-BASE")) if "DB-RLS-BASE" in task_id_set else ""
    if not rls_text or "RLS" not in rls_text:
        d14.append("DB-RLS-BASE detail missing RLS reference")
    record(14, "Auth·성인·기본 RLS AC 존재", not d14, d14)

    # 15. Playwright Chromium Smoke Task 존재
    e2e_tasks = [t for t in tasks if t["category"] == "E2E"]
    d15 = []
    if not e2e_tasks:
        d15.append("no E2E task found")
    for t in e2e_tasks:
        text = read(detail_path(t["id"]))
        if "chromium" not in text.lower():
            d15.append(f"TASK-{t['id']}.md missing 'Chromium' reference")
    record(15, "Playwright Chromium Smoke Task 존재", not d15, d15)

    # 16. AWS·EC2·자동 Merge 구현 Task 0
    d16 = []
    for hit in _find_active_use(full_text, FORBIDDEN_KEYWORDS):
        d16.append(f"00_TASK_LIST.md: {hit}")
    for t in tasks:
        for hit in _find_active_use(read(detail_path(t["id"])), FORBIDDEN_KEYWORDS):
            d16.append(f"TASK-{t['id']}.md: {hit}")
    record(16, "AWS·EC2·자동 Merge 구현 Task 0", not d16, d16)

    # 17. REQ-FUNC 80개 / REQ-NF 34개가 Task 또는 EXCLUDED 표에 존재
    expected_ids = {f"REQ-FUNC-{i:03d}" for i in range(1, 81)} | {f"REQ-NF-{i:03d}" for i in range(1, 35)}
    covered_by_tasks: set[str] = set()
    for t in tasks:
        covered_by_tasks.update(t["requirements"])
    excluded_registered: set[str] = set()
    heading_match = re.search(r"^##\s+NON_IMPLEMENTATION", full_text, re.MULTILINE)
    if heading_match:
        section_start = heading_match.end()
        next_boundary = full_text.find("\n---\n", section_start)
        section_end = next_boundary if next_boundary != -1 else len(full_text)
        excluded_registered = set(REQ_TOKEN_RE.findall(full_text[section_start:section_end]))
    covered_total = covered_by_tasks | excluded_registered
    missing17 = sorted(expected_ids - covered_total)
    record(17, "REQ-FUNC 80개 + REQ-NF 34개가 Task 또는 EXCLUDED 표에 존재", not missing17,
           [f"missing Requirement ID(s): {missing17}"] if missing17 else [])

    # 18. EXCLUDED 상세 구현 파일이 생성되지 않음
    scope_excluded = load_project_scope_excluded()
    excluded_ids = excluded_registered | (scope_excluded & expected_ids)
    d18 = []
    wrongly_covered = sorted(excluded_ids & covered_by_tasks)
    if wrongly_covered:
        for rid in wrongly_covered:
            owners_of = [t["id"] for t in tasks if rid in t["requirements"]]
            d18.append(f"EXCLUDED requirement {rid} referenced by implementation task(s): {owners_of}")
    record(18, "EXCLUDED 상세 구현 파일이 생성되지 않음", not d18, d18)

    # ---- write TASK_MANIFEST.csv ----
    # Preserve wave_id from a previous scripts/build_waves.py run — this script
    # only re-derives audit columns, it must not silently erase Wave assignment.
    previous_wave_id = {}
    if MANIFEST_PATH.is_file():
        with MANIFEST_PATH.open(newline="", encoding="utf-8") as f:
            for row in csv.DictReader(f):
                wid = row.get("wave_id", "")
                if wid:
                    previous_wave_id[row["Task ID"]] = wid

    TASKS_DIR.mkdir(parents=True, exist_ok=True)
    with MANIFEST_PATH.open("w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f)
        writer.writerow([
            "Seq", "Task ID", "Title", "Category", "Implementation Status",
            "Screen", "Route", "Page Entry", "Depends On", "Requirement Count",
            "Priority", "Detail File Exists", "wave_id",
        ])
        for t in tasks:
            writer.writerow([
                t["seq"], t["id"], t["title"], t["category"], t["impl_status"],
                t["screen"], t["route"], t["page_entry"], "; ".join(t["depends"]),
                len(t["requirements"]), t["priority"],
                "YES" if t["id"] in detail_ids else "NO",
                previous_wave_id.get(t["id"], ""),
            ])

    # ---- write TASK_AUDIT_REPORT.md ----
    passed_count = sum(1 for c in checks if c["passed"])
    lines = [
        "# Traveler Task Audit Report",
        "",
        f"**대상:** `TASKS/00_TASK_LIST.md` + `TASKS/TASK-*.md` ({len(tasks)}개 Task, {len(detail_ids)}개 상세 파일)",
        f"**결과:** {'AUDIT_PASS' if passed_count == len(checks) else 'AUDIT_FAIL'} ({passed_count}/{len(checks)} checks passed)",
        "",
        "| # | 검사 | 결과 | 상세 |",
        "|---|---|---|---|",
    ]
    for c in checks:
        status = "PASS" if c["passed"] else "FAIL"
        detail = "<br>".join(c["details"]) if c["details"] else "-"
        lines.append(f"| {c['no']} | {c['desc']} | {status} | {detail} |")
    lines += [
        "",
        f"- DB 테이블: {sorted(tables)} ({len(tables)}개)",
        f"- Requirement 커버리지: {len(covered_total)}/114 (Task {len(covered_by_tasks)}개 + EXCLUDED 등록 {len(excluded_registered)}개)",
        f"- Task 총수: {len(tasks)} (참고용, 완료 조건 아님)",
        "",
    ]
    REPORT_PATH.write_text("\n".join(lines) + "\n", encoding="utf-8")

    # ---- stdout summary ----
    for c in checks:
        if not c["passed"]:
            for d in c["details"]:
                print(f"FAIL[{c['no']}] {c['desc']}: {d}")

    print(f"\nWrote {MANIFEST_PATH.relative_to(ROOT)}")
    print(f"Wrote {REPORT_PATH.relative_to(ROOT)}")

    if passed_count != len(checks):
        print(f"\nAUDIT_FAIL ({passed_count}/{len(checks)} checks passed)")
        return 1

    print(f"\nAUDIT_PASS ({len(checks)} checks)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
