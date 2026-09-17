"""Traveler wave builder.

Reads TASKS/TASK_MANIFEST.csv (+ TASKS/details/TASK-*.md or TASKS/TASK-*.md
detail files, + design-reference/SCREEN_ROUTE_CONTRACT.json), assigns every
Task to a Wave following the fixed Wave Group order, and writes:

  - TASKS/TASK_DAG.md       (dependency graph + topological order + cycle report)
  - TASKS/WAVE_PLAN.md      (human-readable Wave plan)
  - TASKS/WAVE_STATE.json   (machine state consumed by /run-wave)
  - TASKS/TASK_MANIFEST.csv (wave_id column added/updated in place)

No Branch/PR/Merge automation. No auto-retry loops. Read-only against
docs/scope files; only the four outputs above are written.
"""
import csv
import json
import sys
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parent.parent
TASKS_DIR = ROOT / "TASKS"
MANIFEST_PATH = TASKS_DIR / "TASK_MANIFEST.csv"
DETAILS_DIR_CANDIDATES = [TASKS_DIR / "details", TASKS_DIR]
SCREEN_CONTRACT_PATH = ROOT / "design-reference" / "SCREEN_ROUTE_CONTRACT.json"
TASK_DAG_PATH = TASKS_DIR / "TASK_DAG.md"
WAVE_PLAN_PATH = TASKS_DIR / "WAVE_PLAN.md"
WAVE_STATE_PATH = TASKS_DIR / "WAVE_STATE.json"

MIN_WAVE_SIZE = 4
MAX_WAVE_SIZE = 7

GROUP_TITLES = {
    1: "Scaffold, 문서, Harness 확인",
    2: "Airbnb 스타일 공통 UI, 정적 데이터, Layout",
    3: "Supabase Auth, 6개 Table, 기본 RLS",
    4: "SCR-001 메인 Component와 Page Owner",
    5: "SCR-002 대표 소개 Component와 Page Owner",
    6: "SCR-003 여행 입력·외부 이동·동행글 입력 Component와 Page Owner",
    7: "SCR-004 동행 목록·상세·신청 Component와 Page Owner",
    8: "SCR-005 계정·내 활동·간단 관리자 Component와 Page Owner",
    9: "Unit·Playwright·접근성·CI",
    10: "Vercel Preview와 Release 확인",
}

GROUP_3_IDS = {"DB-SCHEMA-BASE", "DB-RLS-BASE", "DB-ACCESS", "DB-SEED-BASE", "API-AUTH"}
GROUP_2_IDS = {
    "COMPONENT-SHELL-HEADER-FOOTER", "COMPONENT-ERROR-STATES", "COMPONENT-SEO-METADATA",
    "COMPONENT-FAVORITES-LOCALSTORAGE", "COMPONENT-SHARE-BUTTON",
    "DATA-DESTINATIONS", "DATA-SAFETY", "DATA-REPRESENTATIVE", "DATA-POLICY-CONTENT",
}
GROUP_4_EXTRA = {"API-MATES-READ", "PAGE-SCR001"}
GROUP_5_EXTRA = {"PAGE-SCR002"}
GROUP_6_EXTRA = {"API-MATES-WRITE", "PAGE-SCR003"}
GROUP_7_EXTRA = {"API-APPLICATIONS", "API-BLOCKS", "API-REPORTS", "PAGE-SCR004"}
GROUP_8_EXTRA = {"API-ADMIN-SETTINGS", "API-ACCOUNT-DELETE", "PAGE-SCR005"}
GROUP_10_IDS = {"OPS-VERCEL-SUPABASE-CHECK"}


def fail(errors, note=""):
    if note:
        print(note)
    for e in errors:
        print(f"FAIL: {e}")
    sys.exit(1)


def load_manifest():
    if not MANIFEST_PATH.is_file():
        fail([f"{MANIFEST_PATH} 없음"])
    with open(MANIFEST_PATH, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        rows = list(reader)
    return fieldnames, rows


def find_detail_file(task_id):
    name = f"TASK-{task_id}.md"
    for d in DETAILS_DIR_CANDIDATES:
        p = d / name
        if p.is_file():
            return p
    return None


def extract_expected_files(detail_path):
    if detail_path is None:
        return []
    text = detail_path.read_text(encoding="utf-8")
    marker = "## Expected Files"
    idx = text.find(marker)
    if idx == -1:
        return []
    rest = text[idx + len(marker):]
    end = rest.find("\n## ")
    section = rest if end == -1 else rest[:end]
    files = []
    depth = 0
    i = 0
    # naive backtick token extractor
    tokens = section.split("`")
    for i in range(1, len(tokens), 2):
        token = tokens[i].strip()
        if token and ("/" in token or "." in token):
            files.append(token)
    return files


def split_depends_on(raw):
    if not raw:
        return []
    raw = raw.strip()
    if raw in ("", "-", "없음"):
        return []
    parts = [p.strip() for p in raw.replace(",", ";").split(";")]
    return [p for p in parts if p]


def assign_group(task_id):
    if task_id in GROUP_3_IDS:
        return 3
    if task_id in GROUP_2_IDS:
        return 2
    if task_id.startswith("COMPONENT-SC001") or task_id in GROUP_4_EXTRA:
        return 4
    if task_id.startswith("COMPONENT-SC002") or task_id in GROUP_5_EXTRA:
        return 5
    if task_id.startswith("COMPONENT-SC003") or task_id in GROUP_6_EXTRA:
        return 6
    if task_id.startswith("COMPONENT-SC004") or task_id in GROUP_7_EXTRA:
        return 7
    if task_id.startswith("COMPONENT-SC005") or task_id in GROUP_8_EXTRA:
        return 8
    if (task_id.startswith("UNIT-") or task_id.startswith("E2E-")
            or task_id.startswith("MANUAL-CHECK") or task_id in {"TEST-RLS-BASIC", "OPS-CI-PIPELINE"}):
        return 9
    if task_id in GROUP_10_IDS:
        return 10
    return 1


def detect_cycles(task_ids, deps):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {t: WHITE for t in task_ids}
    cycles = []

    def dfs(node, stack):
        color[node] = GRAY
        stack.append(node)
        for dep in deps.get(node, []):
            if dep not in color:
                continue
            if color[dep] == GRAY:
                cycle_start = stack.index(dep)
                cycles.append(stack[cycle_start:] + [dep])
            elif color[dep] == WHITE:
                dfs(dep, stack)
        stack.pop()
        color[node] = BLACK

    for t in task_ids:
        if color[t] == WHITE:
            dfs(t, [])
    return cycles


def topological_order(task_ids, deps):
    indegree = {t: 0 for t in task_ids}
    dependents = {t: [] for t in task_ids}
    for t in task_ids:
        for dep in deps.get(t, []):
            if dep in indegree:
                indegree[t] += 1
                dependents[dep].append(t)

    ready = sorted([t for t in task_ids if indegree[t] == 0])
    order = []
    import heapq
    heapq.heapify(ready)
    while ready:
        node = heapq.heappop(ready)
        order.append(node)
        for nxt in dependents[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                heapq.heappush(ready, nxt)
    return order


def run_check_mode(waves):
    """Read-only Wave 계약 검사: recompute Wave assignment in memory and
    compare against the committed TASKS/WAVE_PLAN.md / WAVE_STATE.json /
    TASK_MANIFEST.csv wave_id column. Never writes any file — status/
    checkpoint_result in WAVE_STATE.json are live progress data owned by
    /run-wave, not something a validate/ci run may reset.
    """
    mismatches = []

    if not WAVE_STATE_PATH.is_file():
        fail([f"{WAVE_STATE_PATH} 없음 — 먼저 `python scripts/build_waves.py`를 실행해야 함"])
    existing_state = json.loads(WAVE_STATE_PATH.read_text(encoding="utf-8"))
    existing_waves = {w["wave_id"]: w for w in existing_state.get("waves", [])}

    if set(existing_waves.keys()) != {w["wave_id"] for w in waves}:
        mismatches.append(
            f"Wave ID 집합 불일치: 기록됨={sorted(existing_waves.keys())} 재계산={sorted(w['wave_id'] for w in waves)}"
        )
    else:
        for w in waves:
            recorded = existing_waves[w["wave_id"]]
            if recorded.get("task_ids") != w["task_ids"]:
                mismatches.append(
                    f"{w['wave_id']} task_ids 불일치: 기록됨={recorded.get('task_ids')} 재계산={w['task_ids']}"
                )
            if recorded.get("title") != w["title"]:
                mismatches.append(f"{w['wave_id']} title 불일치: 기록됨={recorded.get('title')!r} 재계산={w['title']!r}")
            if bool(recorded.get("checkpoint_required")) != w["checkpoint_required"]:
                mismatches.append(f"{w['wave_id']} checkpoint_required 불일치")

    if MANIFEST_PATH.is_file():
        with open(MANIFEST_PATH, newline="", encoding="utf-8") as f:
            manifest_rows = list(csv.DictReader(f))
        wave_of_task = {}
        for w in waves:
            for tid in w["task_ids"]:
                wave_of_task[tid] = w["wave_id"]
        for r in manifest_rows:
            tid = r.get("Task ID")
            recorded_wave = r.get("wave_id", "")
            expected_wave = wave_of_task.get(tid, "")
            if recorded_wave != expected_wave:
                mismatches.append(f"TASK_MANIFEST.csv {tid} wave_id 불일치: 기록됨={recorded_wave!r} 재계산={expected_wave!r}")

    if mismatches:
        fail(mismatches, "Wave 계약 검사 불일치:")

    print(f"Wave 총수: {len(waves)} (기록값과 일치)")
    print("BUILD_WAVES_CHECK_PASS")


def main():
    if sys.stdout.encoding and sys.stdout.encoding.lower() != "utf-8":
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")

    if not SCREEN_CONTRACT_PATH.is_file():
        fail([f"{SCREEN_CONTRACT_PATH} 없음"])
    screen_contract = json.loads(SCREEN_CONTRACT_PATH.read_text(encoding="utf-8"))
    screen_ids = {s["id"] for s in screen_contract.get("screens", [])}

    fieldnames, rows = load_manifest()
    id_col = "Task ID"
    dep_col = "Depends On"
    cat_col = "Category"
    if id_col not in fieldnames or dep_col not in fieldnames:
        fail([f"{MANIFEST_PATH}에 '{id_col}'/'{dep_col}' 컬럼 없음"])

    task_ids = [r[id_col] for r in rows]
    if len(task_ids) != len(set(task_ids)):
        dups = sorted({t for t in task_ids if task_ids.count(t) > 1})
        fail([f"중복 Task ID: {dups}"])

    deps = {}
    files_by_task = {}
    for r in rows:
        tid = r[id_col]
        deps[tid] = split_depends_on(r.get(dep_col, ""))
        detail_path = find_detail_file(tid)
        files_by_task[tid] = extract_expected_files(detail_path)

    missing_dep_targets = []
    for tid, dlist in deps.items():
        for d in dlist:
            if d not in deps:
                missing_dep_targets.append(f"{tid} -> {d} (대상 Task 없음)")
    if missing_dep_targets:
        fail(missing_dep_targets, "Depends On 대상 누락:")

    cycles = detect_cycles(task_ids, deps)
    if cycles:
        lines = [" -> ".join(c) for c in cycles]
        fail(lines, f"순환 의존성 {len(cycles)}건 발견:")

    global_order = topological_order(task_ids, deps)
    order_index = {tid: i for i, tid in enumerate(global_order)}

    group_of = {tid: assign_group(tid) for tid in task_ids}

    # Rule 2 safety net: bump a task's group up to the max group of its deps.
    changed = True
    while changed:
        changed = False
        for tid in task_ids:
            dep_groups = [group_of[d] for d in deps[tid]]
            if dep_groups:
                needed = max(dep_groups)
                if group_of[tid] < needed:
                    group_of[tid] = needed
                    changed = True

    groups = {}
    for tid in task_ids:
        groups.setdefault(group_of[tid], []).append(tid)

    def files_of(tid):
        return set(files_by_task.get(tid, []))

    waves = []  # list of dict(wave_id, group, part, task_ids)
    for group_num in sorted(groups.keys()):
        members = groups[group_num]
        ordered = sorted(members, key=lambda t: order_index.get(t, 10**9))
        n = len(ordered)
        num_chunks = max(1, -(-n // MAX_WAVE_SIZE))  # ceil(n / MAX_WAVE_SIZE)
        target_size = -(-n // num_chunks)  # ceil(n / num_chunks), evens out remainder waves
        chunks = []
        current = []
        current_files = set()
        for tid in ordered:
            tfiles = files_of(tid)
            conflict = bool(current_files & tfiles)
            if current and (len(current) >= target_size or conflict):
                chunks.append(current)
                current = []
                current_files = set()
            current.append(tid)
            current_files |= tfiles
        if current:
            chunks.append(current)
        for part_idx, chunk in enumerate(chunks, start=1):
            waves.append({"group": group_num, "part": part_idx, "of": len(chunks), "task_ids": chunk})

    # Assign sequential Wave IDs; validate ordering constraint (rule 2) hard fail if violated.
    wave_index_of = {}
    for i, w in enumerate(waves, start=1):
        wid = f"W{i:02d}"
        w["wave_id"] = wid
        for tid in w["task_ids"]:
            wave_index_of[tid] = i

    ordering_violations = []
    for tid in task_ids:
        for dep in deps[tid]:
            if wave_index_of[dep] > wave_index_of[tid]:
                ordering_violations.append(
                    f"{tid}(Wave {wave_index_of[tid]}) depends on {dep}(Wave {wave_index_of[dep]}) — 선행 Task가 뒤 Wave"
                )
    if ordering_violations:
        fail(ordering_violations, "Wave 순서 위반:")

    category_by_id = {r[id_col]: r.get(cat_col, "") for r in rows}

    for w in waves:
        title = GROUP_TITLES.get(w["group"], "기타")
        if w["of"] > 1:
            title = f"{title} ({w['part']}/{w['of']})"
        w["title"] = title
        w["checkpoint_required"] = any(
            category_by_id.get(tid, "") == "PAGE_OWNER" for tid in w["task_ids"]
        )

    if "--check" in sys.argv[1:]:
        run_check_mode(waves)
        return

    # --- Write TASKS/TASK_DAG.md ---
    dag_lines = ["# Free Traveler — Task Dependency DAG", ""]
    dag_lines.append(f"**순환 의존성:** {len(cycles)}건")
    dag_lines.append("")
    dag_lines.append("## Depends On 관계")
    dag_lines.append("")
    dag_lines.append("| Task ID | Depends On |")
    dag_lines.append("|---|---|")
    for tid in task_ids:
        dag_lines.append(f"| {tid} | {', '.join(deps[tid]) or '없음'} |")
    dag_lines.append("")
    dag_lines.append("## 전역 Topological Order")
    dag_lines.append("")
    for i, tid in enumerate(global_order, start=1):
        dag_lines.append(f"{i}. {tid}")
    TASK_DAG_PATH.write_text("\n".join(dag_lines) + "\n", encoding="utf-8")

    # --- Write TASKS/WAVE_PLAN.md ---
    plan_lines = ["# Free Traveler — Wave Plan", "",
                  "Wave ID는 `build_waves.py` 실행 결과로 확정된다(미리 고정하지 않음). "
                  "이후 `/run-wave`는 이 문서를 WAVE_PLAN 정본으로 사용한다.", ""]
    plan_lines.append("| Wave ID | 그룹 | Task 수 | Preview Checkpoint | Task ID (순서대로) |")
    plan_lines.append("|---|---|---|---|---|")
    for w in waves:
        checkpoint = "필요" if w["checkpoint_required"] else "-"
        plan_lines.append(
            f"| {w['wave_id']} | {w['title']} | {len(w['task_ids'])} | {checkpoint} | {', '.join(w['task_ids'])} |"
        )
    WAVE_PLAN_PATH.write_text("\n".join(plan_lines) + "\n", encoding="utf-8")

    # --- Write TASKS/WAVE_STATE.json ---
    generated_at = datetime.now(timezone.utc).isoformat()
    state = {
        "schema_version": "traveler-wave-state-v1",
        "generated_at": generated_at,
        "waves": [
            {
                "wave_id": w["wave_id"],
                "title": w["title"],
                "task_ids": w["task_ids"],
                "status": "pending",
                "checkpoint_required": w["checkpoint_required"],
                "checkpoint_result": None,
            }
            for w in waves
        ],
    }
    WAVE_STATE_PATH.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    # --- Update TASKS/TASK_MANIFEST.csv with wave_id column ---
    if "wave_id" not in fieldnames:
        fieldnames = fieldnames + ["wave_id"]
    for r in rows:
        r["wave_id"] = next(w["wave_id"] for w in waves if r[id_col] in w["task_ids"])
    with open(MANIFEST_PATH, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for r in rows:
            writer.writerow(r)

    # --- Summary output ---
    print(f"순환 의존성: {len(cycles)}건")
    print(f"Wave 총수: {len(waves)}")
    for w in waves:
        print(f"  {w['wave_id']} [{w['title']}] — {len(w['task_ids'])}개 Task")
    print("Page Owner 위치:")
    for tid in task_ids:
        if category_by_id.get(tid) == "PAGE_OWNER":
            print(f"  {tid} -> {wave_index_of[tid]:02d} (Wave {next(w['wave_id'] for w in waves if tid in w['task_ids'])})")
    print("BUILD_WAVES_PASS")


if __name__ == "__main__":
    main()
