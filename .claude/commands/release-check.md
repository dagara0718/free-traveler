---
description: 릴리스 전 Task/Wave 상태, Page Owner 5개, CI, Playwright Smoke, Supabase 6개 Table·RLS, Vercel Preview Checkpoint, EXCLUDED 목록을 실제 기록으로 검사해 RELEASE_READY/RELEASE_BLOCKED만 판정한다. 읽기 전용.
---

# /release-check

**읽기 전용 게이트다.** 어떤 파일도 쓰지 않는다(WAVE_STATE, `docs/PROJECT_STATE.md`, 코드 어디에도 Write/Edit 없음). 실행 없이 통과한 것으로 앞당겨 적힌 값을 그대로 믿지 않는다 — 각 항목의 근거 파일을 실제로 Read해서 판단한다.

## 검사 순서 (7개, 전부 수행 후 종합 판정)

### 1. Task·Wave 상태

- `docs/PROJECT_STATE.md`의 `Completed Tasks`/`Blocked Tasks`를 Read한다.
- 이번 릴리스 대상 Wave가 있으면 `TASKS/WAVE-<ID>-STATE.md`를 Read해서 Wave 종료 상태가 `DONE`인지 확인한다. `IN_PROGRESS`/`WAITING_FOR_PREVIEW`/`BLOCKED_*` Task가 하나라도 있으면 FAIL.
- `TASKS/TASK_AUDIT_REPORT.md`를 Read해서 `AUDIT_PASS` 상태(18개 검사 전부 PASS)인지 확인한다. `AUDIT_FAIL`이면 FAIL.

### 2. Page Owner 5개 DONE

- `design-reference/SCREEN_ROUTE_CONTRACT.json`의 5개 Screen(`PAGE-SCR001`~`PAGE-SCR005`)에 대응하는 Page Owner Task 각각의 완료 여부를 `docs/PROJECT_STATE.md`의 Screen Checkpoints 표에서 확인한다.
- 5개 전부 `DONE`이 아니면 FAIL — 어떤 Screen이 미완료인지 나열한다.

### 3. CI PASS

- `docs/PROJECT_STATE.md`의 `Latest CI` 값을 Read한다. `NOT_CONFIGURED`이거나 최근 실행 결과가 실패면 FAIL.
- 이 Command는 CI를 직접 트리거하지 않는다 — 기록된 최신 상태만 읽는다.

### 4. Playwright Smoke PASS

- `docs/PROJECT_STATE.md`의 `Playwright State`를 Read한다. `NOT_RUN`이거나 `E2E-PUBLIC-SMOKE`/`E2E-TRAVEL-TOOLS`/`E2E-MATE-AUTH` 중 하나라도 실패 기록이면 FAIL.
- Chromium 외 브라우저 실행 기록이 있으면(CLAUDE.md 규칙 18 위반) 별도로 보고하되, 이 자체가 릴리스 판정 FAIL 사유는 아니다(범위 위반 사실만 병기).

### 5. Supabase 6개 Table·기본 RLS 확인 기록

- `docs/PROJECT_STATE.md`의 `Supabase State`를 Read한다. `NOT_PROVISIONED`면 FAIL.
- Provisioned 상태면 `TASKS/TASK_AUDIT_REPORT.md`의 DB 테이블 목록(`user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `admin_setting`)이 정확히 6개인지, `DB-RLS-BASE` Task가 `DONE` 기록인지 확인한다.
- 6개를 초과하거나 RLS 확인 기록이 없으면 FAIL.

### 6. Vercel Preview Checkpoint

- `docs/PROJECT_STATE.md`의 `Vercel Preview URL`이 `NONE`이면 FAIL.
- URL이 있어도, 관련 Wave의 WAVE_PLAN에 명시된 사람 Preview Checkpoint가 실제로 확인 완료(`/run-wave resume` 시 사람이 확인했다고 명시한 기록, 또는 사용자가 이번 대화에서 확인)로 남아있지 않으면 FAIL — URL 존재만으로 Checkpoint 통과를 대신하지 않는다(CLAUDE.md 규칙 22).

### 7. EXCLUDED 목록

- `TASKS/00_TASK_LIST.md`의 `## NON_IMPLEMENTATION` 절과 `docs/PROJECT_SCOPE.md`의 EXCLUDED 행을 Read해서 두 목록이 일치하는지, 20개 EXCLUDED Requirement가 모두 등록되어 있는지 확인한다.
- 이 Command는 EXCLUDED 항목을 통과 조건으로 요구하지 않는다 — **EXCLUDED가 EXCLUDED로 명확히 기록되어 있는지**만 확인한다(임의로 구현됐거나 목록에서 누락됐으면 FAIL — CLAUDE.md 규칙 19).

## 종합 판정

7개 검사를 전부 수행한다. 하나라도 FAIL이면 `RELEASE_BLOCKED`. 전부 PASS면 `RELEASE_READY`.

## 출력 형식

```
STATUS: RELEASE_READY | RELEASE_BLOCKED

1. Task·Wave 상태: <PASS|FAIL + 근거>
2. Page Owner 5개 DONE: <PASS|FAIL + 근거>
3. CI PASS: <PASS|FAIL + 근거>
4. Playwright Smoke PASS: <PASS|FAIL + 근거>
5. Supabase 6개 Table·RLS: <PASS|FAIL + 근거>
6. Vercel Preview Checkpoint: <PASS|FAIL + 근거>
7. EXCLUDED 목록: <PASS|FAIL + 근거>
```

`RELEASE_BLOCKED`면 FAIL 항목과 근거만 그대로 보고한다 — 이 Command 안에서 무엇도 고치지 않는다. 고치려면 해당 원인의 담당 Command(`run-wave`/`implement-task`/`audit-tasks` 등)를 사용자가 별도로 실행해야 한다.
