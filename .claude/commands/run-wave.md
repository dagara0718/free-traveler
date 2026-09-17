---
description: WAVE_ID의 pending Task를 하나씩 prepare-task/implement-task로 처리한다. --status/--dry-run/--resume 옵션을 지원한다. Branch/PR/Merge는 자동 수행하지 않는다.
---

# /run-wave WAVE_ID [--status | --dry-run | --resume]

CLAUDE.md 규칙 6의 실행 명령이다. `prepare-task`·`implement-task`가 이미 정의한 판정/구현 규칙을 그대로 호출한다 — 여기서 그 규칙을 다시 정의하지 않는다.

## 입력

- **WAVE_ID** (예: `W04`) — `TASKS/WAVE_PLAN.md`/`TASKS/WAVE_STATE.json`에 존재해야 한다.
- **옵션**(상호 배타, 최대 1개): `--status`, `--dry-run`, `--resume`. 옵션 없으면 기본 동작.

## 정본 파일

- `TASKS/WAVE_PLAN.md`, `TASKS/WAVE_STATE.json` — `python scripts/build_waves.py` 산출물. 이 Command는 두 파일을 새로 만들지 않는다 — 없으면 "먼저 `python scripts/build_waves.py`를 실행해달라"고 보고하고 멈춘다.
- 이 Command가 실행 중 유일하게 갱신하는 파일은 `TASKS/WAVE_STATE.json`이다(그 외 코드 변경은 전부 `prepare-task`/`implement-task`가 수행). 처음 다루는 Wave는 해당 wave 객체에 `tasks` 맵을 추가해 초기화한다:

```json
{
  "wave_id": "W04",
  "...": "...",
  "tasks": { "<TASK_ID>": "pending" }
}
```

`tasks`의 각 값은 `pending | in_progress | done | blocked` 중 하나이며, 실제 `prepare-task`/`implement-task` 실행 결과로만 갱신한다(실행 없이 앞당겨 적지 않는다). `build_waves.py`를 다시 실행(쓰기 모드)하면 `WAVE_STATE.json`이 통째로 재생성되어 이 진행 상태가 사라진다 — Wave 실행이 시작된 뒤에는 `build_waves.py --check`(읽기 전용)만 쓰고, 쓰기 모드는 재생성하지 않는다.

## `--status`

읽기 전용. 지정 WAVE_ID의 `WAVE_STATE.json` 항목을 그대로 보고한다: Wave `status`, `tasks` 맵(Task별 상태), `checkpoint_required`/`checkpoint_result`. 아무 파일도 쓰지 않는다.

## `--dry-run`

읽기 전용. 아래 "기본 동작" 1~3단계(Rule1 게이트 확인 → 다음 처리 대상 Task 선정)까지만 수행하고, 그 Task에 대해 `prepare-task`를 실행해 판정만 보고한다. 그 Task의 Expected Files·Verify(최소 검증)·Depends On과, 이 Wave의 `checkpoint_required` 여부도 함께 보여준다. **`implement-task`는 호출하지 않는다. `WAVE_STATE.json`도 갱신하지 않는다.**

## 기본 동작 (옵션 없음)

1. **Rule1 게이트** — `WAVE_STATE.json`의 `waves[]` 배열에서 이 WAVE_ID 바로 앞 Wave의 `status`가 `completed`가 아니면 여기서 멈추고 어떤 Wave가 끝나지 않았는지 보고한다(첫 Wave는 이 게이트 없음). 임의로 건너뛰지 않는다.
2. `WAVE_STATE.json`에 이 Wave의 `tasks` 맵이 없으면 `task_ids` 전부 `pending`으로 초기화해 기록한다.
3. `tasks` 맵에서 상태가 `pending`인 Task 중, `TASKS/WAVE_PLAN.md`에 기록된 순서(= `build_waves.py`가 이미 Depends On 순서로 정렬한 순서)상 가장 앞선 것 하나를 고른다. `pending` Task가 없으면 6번으로 간다.
4. **`prepare-task <WAVE_ID> <TASK_ID>` 실행** — 판정을 그대로 따른다.
   - `READY_TO_IMPLEMENT`가 아니면 **Rule2**: 그 Task를 `blocked`로 기록하고, Wave `status`도 `blocked`로 갱신한 뒤 **여기서 멈춘다**. 다음 Task로 넘어가지 않는다.
5. **`implement-task <WAVE_ID> <TASK_ID>` 실행** — 먼저 그 Task를 `in_progress`로 기록한다.
   - 완료 보고가 `DONE`이고 **Rule3**(Task 상세의 `Verify` 필드에 지정된 최소 검증: Unit Test/Playwright/수동 확인 등)이 전부 PASS면 그 Task를 `done`으로 기록하고 3번으로 돌아가 다음 `pending` Task를 처리한다.
   - 완료 보고가 `PARTIAL`/`BLOCKED`거나 검증이 하나라도 FAIL이면 **Rule2**: 그 Task를 `blocked`, Wave `status`를 `blocked`로 기록하고 **여기서 멈춘다**.
6. **Wave의 모든 Task가 `done`인지 확인**:
   - `checkpoint_required`가 `false`면 Wave `status`를 `completed`로 갱신하고 종료 보고한다.
   - `checkpoint_required`가 `true`면(**Rule4**: 이 Wave에 Page Owner Task 포함) Wave `status`를 `completed`로 바꾸지 않는다. **Rule5**: 사람이 실제로 Browser에서 확인하기 전에는 다음 Wave를 자동 실행하지 않으므로, "Browser Checkpoint 대기" 상태로 **여기서 멈춘다**.

## `--resume`

1. 이 WAVE_ID의 `tasks` 맵에서 상태가 `pending` 또는 `blocked`인 첫 Task부터 "기본 동작" 3~6단계를 이어서 진행한다(`blocked`였던 Task는 원인이 해결됐다는 전제하에 `prepare-task`부터 다시 판정).
2. 예외 — 이 Wave의 Task가 전부 `done`이고 `checkpoint_required=true`이며 `checkpoint_result`가 아직 비어 있는 "Browser Checkpoint 대기" 상태에서 `--resume`이 호출된 경우: **사람이 이번 대화에서 Browser로 실제 확인했다고 명시적으로 말해준 경우에만** `checkpoint_result`(확인 시각/확인자 언급)를 기록하고 Wave `status`를 `completed`로 갱신한다. 명시적 확인이 없으면 멈추고 확인을 요청한다 — 스스로 "확인된 것으로 간주"하지 않는다.

## 금지 사항 (Rule6 등)

- Git Branch 생성, Commit, Push, PR 생성, Merge를 자동으로 수행하지 않는다(CLAUDE.md 규칙 20, 21). Commit이 필요하면 `implement-task` 7단계(사용자 명시 요청 시 Task 단위 Commit)를 그대로 따르되, 이 Command 자체가 그것을 요청하지 않는다.
- 한 Wave 안에서 Task 여러 개를 동시에(병렬로) 처리하지 않는다 — 한 번에 하나씩.
- `WAVE_PLAN.md`/`WAVE_STATE.json`에 없는 Task를 이 Wave에 임의로 추가해 처리하지 않는다.
- Browser Checkpoint 확인 없이 다음 Wave로 넘어가지 않는다.
- `blocked` Task를 건너뛰고 그 뒤 Task를 먼저 진행하지 않는다.

## 종료 보고 (기본 동작/`--resume` 공통 형식)

```
WAVE_ID: <ID>
WAVE_STATUS: in_progress | blocked | waiting_for_checkpoint | completed

완료 Task: <이번 호출에서 새로 done 처리된 Task ID 목록, 없으면 "없음">

변경 파일:
- <완료된 각 Task의 implement-task 완료 보고에 나온 파일 목록을 합쳐서 나열>

통과한 검사:
- <TASK_ID>: <Verify 필드 값> — PASS

남은 수동 Browser 확인: <checkpoint_required=true이고 미확인이면 확인해야 할 Screen ID/Route, 없으면 "없음">

다음에 입력할 명령: <예: "Browser에서 <route> 확인 후 /run-wave <ID> --resume" | "/run-wave <다음 WAVE_ID>" | "원인 해결 후 /run-wave <ID> --resume">
```

`--status`/`--dry-run`은 이 형식 대신 각자 절에서 설명한 조회 결과만 보여주고 종료한다.
