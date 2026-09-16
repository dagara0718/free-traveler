---
description: Wave 안의 READY Task를 Depends On 순서로 하나씩 prepare-task/implement-task 규칙에 따라 처리한다. status/resume/dry-run 서브커맨드를 지원한다. Branch/PR/Merge는 자동 수행하지 않는다.
---

# /run-wave

CLAUDE.md 규칙 6("`/run-wave WXX`를 표준 개발 명령으로 사용한다")의 실행 명령이다. 이 Command는 `prepare-task`·`implement-task`가 이미 정의한 판정/구현 규칙을 그대로 호출한다 — 여기서 그 규칙을 다시 정의하지 않는다.

## 입력 파일

- **WAVE_PLAN** — `TASKS/WAVE-<WAVE_ID>.md`. 이 Wave에 포함되는 Task ID 목록(Depends On 순서), 그리고 선택적으로 사람 확인이 필요한 Preview Checkpoint 위치(예: "PAGE-SCR001 완료 후 Preview 확인 필요"). 사용자가 Wave를 지시할 때 직접 작성한다 — `run-wave`는 이 파일을 새로 만들지 않는다. 파일이 없으면 `/run-wave W<ID>`는 진행하지 않고 "WAVE_PLAN 없음, 먼저 `TASKS/WAVE-<ID>.md`를 작성해달라"고 보고한다.
- **WAVE_STATE** — `TASKS/WAVE-<WAVE_ID>-STATE.md`. Wave 진행 상태를 기록하는 유일한 파일이며, `run-wave`가 직접 쓰는 유일한 산출물이다(그 외 코드 변경은 전부 `implement-task`가 수행). 존재하지 않으면 최초 실행 시 WAVE_PLAN의 Task 목록으로 초기화한다(전부 `READY`, 단 Depends On이 Wave 내 다른 Task면 `BLOCKED_DEPENDENCY`).

WAVE_STATE 형식:

```markdown
# WAVE-<ID> STATE

| Task ID | 상태 | 마지막 갱신 근거 |
|---|---|---|
| <ID> | READY \| IN_PROGRESS \| DONE \| BLOCKED_DEPENDENCY \| BLOCKED_SCOPE \| BLOCKED_DIRTY_TREE \| BLOCKED_INPUT | prepare-task/implement-task 실행 결과 또는 "WAVE_PLAN 초기화" |

**Wave 종료 상태:** IN_PROGRESS | WAITING_FOR_PREVIEW | DONE
```

상태 값은 실제 `prepare-task`/`implement-task` 실행 결과로만 갱신한다(`docs/PROJECT_STATE.md`와 동일 원칙 — 실행 없이 앞당겨 적지 않는다).

## `/run-wave <WAVE_ID>` (예: `/run-wave W03`)

1. **WAVE_PLAN·WAVE_STATE 읽기** — 둘 다 Read한다(WAVE_STATE 없으면 위 규칙대로 초기화하고 파일을 쓴다).
2. **READY Task 선택** — WAVE_STATE에서 상태가 `READY`인 Task 중 WAVE_PLAN의 Depends On 순서상 가장 앞선 것 하나를 고른다. `READY` Task가 없으면 5번으로 간다.
3. **`prepare-task <WAVE_ID> <TASK_ID>` 실행** — 그 판정을 그대로 따른다.
   - `READY_TO_IMPLEMENT`가 아니면 WAVE_STATE의 해당 Task 상태를 그 `BLOCKED_*` 값으로 갱신하고, 그 Task는 건너뛰어 다음 `READY` Task로 2번을 반복한다. 같은 Task를 억지로 통과시키지 않는다.
4. **`implement-task <WAVE_ID> <TASK_ID>` 실행** — WAVE_STATE를 `IN_PROGRESS`로 갱신한 뒤 실행한다.
   - 완료 보고가 `DONE`이고 관련 검증(Unit Test, 해당하면 Playwright)이 전부 PASS면 WAVE_STATE를 `DONE`으로 갱신하고 2번으로 돌아가 다음 `READY` Task를 처리한다.
   - 완료 보고가 `PARTIAL`/`BLOCKED`면 WAVE_STATE를 그 값 그대로(또는 `BLOCKED_INPUT`) 기록하고 **여기서 멈춘다** — 다음 Task로 넘어가지 않고 사용자에게 보고한다(CLAUDE.md 규칙 7: 의존성 안 끝난 Task 먼저 안 건드림 원칙과 동일하게, 실패한 Task를 방치한 채 뒤 Task를 먼저 처리하지 않는다).
5. **Wave Task 전부 `DONE`인지 확인** — 전부 `DONE`이면 WAVE_STATE의 Wave 종료 상태를 `DONE`으로 갱신하고 종료 보고한다.
6. **사람 Preview Checkpoint** — WAVE_PLAN에 이번에 완료한 Task 뒤 Preview Checkpoint가 명시되어 있으면(CLAUDE.md 규칙 22: 화면 단위는 사람 확인 후에만 다음으로 진행), WAVE_STATE의 Wave 종료 상태를 `WAITING_FOR_PREVIEW`로 갱신하고 **여기서 멈춘다** — Checkpoint 뒤 Task를 확인 없이 이어서 진행하지 않는다.

## `/run-wave status`

- 가장 최근에 언급된(또는 사용자가 지정한) `WAVE_ID`의 WAVE_STATE를 Read해서 표 그대로 보고한다. 코드나 파일을 고치지 않는다.

## `/run-wave resume`

- 가장 최근 WAVE_STATE를 Read한다. Wave 종료 상태가 `WAITING_FOR_PREVIEW`면, 사람이 실제로 Preview를 확인했다고 이번 대화에서 명시적으로 확인해 준 경우에만 `/run-wave <WAVE_ID>`의 2번부터 이어서 진행한다. 확인이 없으면 멈추고 확인을 요청한다 — 스스로 "확인된 것으로 간주"하지 않는다.
- Wave 종료 상태가 `IN_PROGRESS`(예: 이전 세션이 중간에 끊김)면 `/run-wave <WAVE_ID>`와 동일하게 2번부터 이어서 진행한다.

## `/run-wave dry-run <WAVE_ID>`

- 1~2번(WAVE_PLAN/WAVE_STATE 읽기, READY Task 선택)까지만 수행하고, 그 Task에 대해 `prepare-task`를 실행해서 판정만 보고한다. **`implement-task`를 호출하지 않는다.** WAVE_STATE도 갱신하지 않는다(순수 조회).

## 금지 사항

- 이 Command는 Git Branch 생성, Commit, Push, PR 생성, Merge를 자동으로 수행하지 않는다(CLAUDE.md 규칙 20, 21, DEC-012). Commit이 필요하면 `implement-task` 7단계(사용자 명시 요청 시 Task 단위 Commit)를 그대로 따르되, 이 Command 자체가 그것을 요청하지 않는다.
- 한 번에 Task 여러 개를 동시에(병렬로) 구현하지 않는다 — Depends On 순서로 하나씩(CLAUDE.md 규칙 7).
- WAVE_PLAN에 없는 Task를 Wave에 임의로 추가해 처리하지 않는다.
- 실패한 Task를 건너뛰고 그 뒤 의존 Task를 먼저 구현하지 않는다.
