"""Traveler Screen Contract checker.

Verifies the 5 fixed Screens (SCR-001~005), their Page Owner Tasks, and
(depending on --mode) the actual `src/app` implementation stay in sync with
`design-reference/SCREEN_ROUTE_CONTRACT.json` and `TASKS/TASK_MANIFEST.csv`.

Usage:
    python scripts/check_screen_contract.py --mode=plan
    python scripts/check_screen_contract.py --mode=ci
    python scripts/check_screen_contract.py --mode=release

Modes:
    plan    - Page Owner Task 배정과 Route 계획만 검사(구현 파일 존재는 보지 않음).
    ci      - plan의 전 검사 + 실제 src/app Page 파일 존재 확인.
    release - ci의 전 검사 + docs/preview-checks/SCR-00N.md Preview Checkpoint 확인.

Output:
    성공 -> "SCREEN_CONTRACT_PASS (mode=<mode>)", exit 0.
    실패 -> 각 오류를 "파일/화면 ID: 문제 — 수정 힌트" 형식으로 출력, exit 1.
"""
import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTRACT_PATH = ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"
MANIFEST_PATH = ROOT / "TASKS" / "TASK_MANIFEST.csv"
SRC_APP_DIR = ROOT / "src" / "app"
PREVIEW_CHECKS_DIR = ROOT / "docs" / "preview-checks"

VALID_MODES = ("plan", "ci", "release")

FIXED_SCREENS = [
    ("SCR-001", "/", "src/app/page.tsx"),
    ("SCR-002", "/about", "src/app/about/page.tsx"),
    ("SCR-003", "/travel-tools", "src/app/travel-tools/page.tsx"),
    ("SCR-004", "/mates", "src/app/mates/page.tsx"),
    ("SCR-005", "/account", "src/app/account/page.tsx"),
]
FIXED_SCREEN_IDS = {s[0] for s in FIXED_SCREENS}
ROUTE_BY_ID = {s[0]: s[1] for s in FIXED_SCREENS}
PAGE_ENTRY_BY_ID = {s[0]: s[2] for s in FIXED_SCREENS}

# 허용 기술 경로 — 사용자 화면(Screen) 수에 포함하지 않는다.
ALLOWED_TECHNICAL_ROUTE_PREFIXES = ("/auth/callback", "/api/")
ALLOWED_TECHNICAL_ROUTE_EXACT = ("*",)  # not-found catch-all route in SCREEN_ROUTE_CONTRACT.json

# 여행지 상세/안전정보는 SCR-001 Drawer(COMPONENT-SC001-DRAWER-SHELL)로만 노출한다 — 별도 Page 금지.
FORBIDDEN_NEW_PAGE_DIRS = ["destinations", "safety"]

errors = []


def report(check_no, target, message, hint):
    errors.append(f"[검사 {check_no}] {target}: {message} — 수정 힌트: {hint}")


def parse_mode():
    mode = None
    for arg in sys.argv[1:]:
        if arg.startswith("--mode="):
            mode = arg.split("=", 1)[1]
    if mode not in VALID_MODES:
        print(f"FAIL: --mode=plan|ci|release 중 하나를 지정해야 함 (받은 값: {mode!r})")
        sys.exit(1)
    return mode


def load_contract():
    if not CONTRACT_PATH.is_file():
        report(0, str(CONTRACT_PATH.relative_to(ROOT)), "파일 없음", "design-reference/SCREEN_ROUTE_CONTRACT.json을 먼저 생성")
        return None
    return json.loads(CONTRACT_PATH.read_text(encoding="utf-8"))


def load_manifest():
    if not MANIFEST_PATH.is_file():
        report(0, str(MANIFEST_PATH.relative_to(ROOT)), "파일 없음", "python scripts/audit_tasks.py를 먼저 실행")
        return []
    with open(MANIFEST_PATH, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def split_depends_on(raw):
    if not raw:
        return []
    return [p.strip() for p in raw.replace(",", ";").split(";") if p.strip()]


def check_1_fixed_screens_exist(contract):
    if contract is None:
        return
    contract_ids = {s["id"] for s in contract.get("screens", [])}
    missing = FIXED_SCREEN_IDS - contract_ids
    for sid in sorted(missing):
        report(1, sid, "SCREEN_ROUTE_CONTRACT.json에 없음", f"screens 배열에 {sid}({ROUTE_BY_ID[sid]}) 항목 추가")
    extra = contract_ids - FIXED_SCREEN_IDS
    for sid in sorted(extra):
        report(1, sid, "고정 5개 화면 목록에 없는 미승인 Screen ID", "SCREEN_ROUTE_CONTRACT.json에서 제거하거나 고정 화면 목록을 갱신")

    for s in contract.get("screens", []):
        sid = s.get("id")
        if sid not in FIXED_SCREEN_IDS:
            continue
        if s.get("route") != ROUTE_BY_ID[sid]:
            report(1, sid, f"route가 {s.get('route')!r}, 기대값 {ROUTE_BY_ID[sid]!r}", "SCREEN_ROUTE_CONTRACT.json route 값 수정")
        if s.get("page_entry") != PAGE_ENTRY_BY_ID[sid]:
            report(1, sid, f"page_entry가 {s.get('page_entry')!r}, 기대값 {PAGE_ENTRY_BY_ID[sid]!r}", "SCREEN_ROUTE_CONTRACT.json page_entry 값 수정")

    if len(contract.get("screens", [])) != 5:
        report(1, "screens[]", f"화면 수 {len(contract.get('screens', []))}개, 기대값 5개", "고정 5개 화면만 남기고 SCREEN_ROUTE_CONTRACT.json 정리")


def check_2_page_owner_exactly_one(manifest_rows):
    owners_by_screen = {sid: [] for sid in FIXED_SCREEN_IDS}
    unexpected = []
    for r in manifest_rows:
        if r.get("Category") != "PAGE_OWNER":
            continue
        screen = (r.get("Screen") or "").strip()
        if screen in owners_by_screen:
            owners_by_screen[screen].append(r.get("Task ID"))
        else:
            unexpected.append((r.get("Task ID"), screen))

    for sid in sorted(FIXED_SCREEN_IDS):
        owners = owners_by_screen[sid]
        if len(owners) == 0:
            report(2, sid, "Page Owner Task 없음", f"{sid}({ROUTE_BY_ID[sid]})의 Page Owner Task를 TASK_MANIFEST.csv/00_TASK_LIST.md에 추가")
        elif len(owners) > 1:
            report(2, sid, f"Page Owner Task {len(owners)}개({owners}) — 정확히 1개여야 함", "중복 Page Owner Task를 하나로 합치거나 나머지를 다른 Category로 재분류")

    for task_id, screen in unexpected:
        report(2, task_id, f"Screen 값 {screen!r}이 고정 5개 화면 밖", "Task의 Screen 필드를 SCR-001~005 중 하나로 수정하거나 Task를 재검토")


def check_3_technical_routes_not_counted(contract, manifest_rows):
    if contract is not None:
        screen_routes = {s.get("route") for s in contract.get("screens", [])}
        for tr in contract.get("technical_routes", []):
            route = tr.get("route")
            if route in screen_routes:
                report(3, route, "기술 경로가 screens[] 화면 목록에도 등록됨", "technical_routes 전용으로 남기고 screens[]에서 제거")
        core_support_total = len(contract.get("core_screens", [])) + len(contract.get("support_screens", []))
        if core_support_total != 5:
            report(3, "core_screens+support_screens", f"합계 {core_support_total}개, 기대값 5개", "core_screens/support_screens 배열에 기술 경로가 섞이지 않았는지 확인")

    for r in manifest_rows:
        screen = (r.get("Screen") or "").strip()
        if screen in ("ALL", "-", ""):
            continue
        for part in [p.strip() for p in screen.split(",")]:
            if part.startswith("/") or part in ("not-found", "*"):
                report(3, r.get("Task ID"), f"Screen 값 {part!r}이 기술 경로로 보임", "기술 경로는 Screen 열에 적지 않고 Route 열에만 기록")


def check_4_no_new_detail_pages():
    if not SRC_APP_DIR.is_dir():
        return
    for forbidden in FORBIDDEN_NEW_PAGE_DIRS:
        base = SRC_APP_DIR / forbidden
        if not base.is_dir():
            continue
        found = list(base.rglob("page.tsx"))
        for f in found:
            report(
                4,
                str(f.relative_to(ROOT)),
                f"여행지 상세/안전정보용 새 Page 생성 금지 영역({forbidden}/)에 page.tsx 존재",
                "이 콘텐츠는 SCR-001의 COMPONENT-SC001-DRAWER-SHELL(Drawer)로만 노출 — 별도 Route/Page 삭제",
            )


def check_5_scr003_covers_both_inputs(manifest_rows):
    row = next((r for r in manifest_rows if r.get("Task ID") == "PAGE-SCR003"), None)
    if row is None:
        report(5, "PAGE-SCR003", "TASK_MANIFEST.csv에 없음", "PAGE-SCR003 Page Owner Task를 먼저 생성")
        return
    depends = split_depends_on(row.get("Depends On", ""))
    has_travel_input = any("FLIGHT" in d.upper() or "HOTEL" in d.upper() for d in depends)
    has_mate_write = any("MATE-WRITE" in d.upper() for d in depends)
    if not has_travel_input:
        report(5, "PAGE-SCR003", "여행 입력(항공/숙소) Component에 대한 Depends On 없음", "Depends On에 COMPONENT-SC003-FLIGHT-FORM/HOTEL-FORM 추가")
    if not has_mate_write:
        report(5, "PAGE-SCR003", "동행 작성 Component에 대한 Depends On 없음", "Depends On에 COMPONENT-SC003-MATE-WRITE 추가")


def check_ci_pages_implemented():
    for sid, route, page_entry in FIXED_SCREENS:
        p = ROOT / page_entry
        if not p.is_file():
            report(1, sid, f"Page 파일 없음: {page_entry}", f"{page_entry} 구현(Page Owner Task 완료) 후 재검사")


def check_6_release_preview_checkpoints():
    for sid, _route, _page_entry in FIXED_SCREENS:
        p = PREVIEW_CHECKS_DIR / f"{sid}.md"
        if not p.is_file():
            report(
                6,
                sid,
                f"docs/preview-checks/{sid}.md 없음",
                "사람이 Preview 확인 후 docs/preview-checks/{}.md 작성(CLAUDE.md 규칙 22)".format(sid),
            )


def main():
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")

    mode = parse_mode()
    contract = load_contract()
    manifest_rows = load_manifest()

    check_1_fixed_screens_exist(contract)
    check_2_page_owner_exactly_one(manifest_rows)
    check_3_technical_routes_not_counted(contract, manifest_rows)
    check_4_no_new_detail_pages()
    check_5_scr003_covers_both_inputs(manifest_rows)

    if mode in ("ci", "release"):
        check_ci_pages_implemented()

    if mode == "release":
        check_6_release_preview_checkpoints()

    if errors:
        for e in errors:
            print(f"FAIL {e}")
        sys.exit(1)

    print(f"SCREEN_CONTRACT_PASS (mode={mode})")
    sys.exit(0)


if __name__ == "__main__":
    main()
