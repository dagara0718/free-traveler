---
description: Task 구현 착수 전 Wave 소속·Depends On·Expected Files·정본 참조·환경변수·Secret 위험·EXCLUDED 침범을 검사하고 READY_TO_IMPLEMENT/BLOCKED_* 상태만 보고한다. 코드를 수정하지 않는다.
---

# /prepare-task WAVE_ID TASK_ID

**이 Command는 읽기 전용 게이트다. 어떤 파일도 수정하지 않는다** — `src/**`, `supabase/**`, `TASKS/**`, `docs/**` 어디에도 쓰기(Write/Edit)를 실행하지 않는다. Bash는 상태 확인(`git status` 등)에만 쓰고, 수정 명령(`git add`/`git commit`/`git checkout` 등)을 실행하지 않는다.

## 입력

- `WAVE_ID` — 이번에 진행 중인 Wave 식별자(예: `W01`). 사용자가 명령 인자로 전달한다.
- `TASK_ID` — 착수하려는 Task ID(예: `PAGE-SCR001`). `TASKS/00_TASK_LIST.md`에 존재해야 한다.
- **선택된 상세 Task 파일** — `TASKS/TASK-<TASK_ID>.md`. 이번 실행에서 반드시 Read한다(이전 대화에서 이미 본 내용이라도 다시 읽어 최신 상태를 확인한다).

인자가 없거나 `TASKS/TASK-<TASK_ID>.md`가 존재하지 않으면 즉시 `BLOCKED_INPUT`으로 보고하고 아래 8개 검사를 진행하지 않는다.

## 검사 순서 (8개, 전부 수행 후 종합 판정)

### 1. Working Tree 상태

```
git status --porcelain
```

출력이 비어 있지 않으면 커밋되지 않은 변경이 있다는 뜻이다. 이 변경이 **이번에 착수하려는 `TASK_ID` 자신의 이전 부분 작업**이라고 명확히 확인되는 경우가 아니라면 `BLOCKED_DIRTY_TREE`로 판정한다. 이 Command는 stash/commit/checkout 등으로 정리하지 않는다 — 상태만 보고한다.

### 2. Task가 현재 Wave에 포함되는지

`WAVE_ID`의 Task 구성은 사용자가 해당 Wave를 지시할 때 명시한 Task ID 목록(또는 `TASKS/WAVE-<WAVE_ID>.md`가 존재하면 그 목록)을 기준으로 한다.

- Wave의 Task 목록을 어디서도 확인할 수 없으면(이번 대화에서 사용자가 알려주지 않았고 `TASKS/WAVE-<WAVE_ID>.md`도 없으면) `BLOCKED_INPUT`으로 판정하고, Wave 범위를 알려달라고 요청한다 — 임의로 "포함된다"고 가정하지 않는다.
- Wave 목록을 확인했는데 `TASK_ID`가 그 안에 없으면 `BLOCKED_SCOPE`로 판정한다(CLAUDE.md 규칙 6: Wave 범위 밖 착수 금지).

### 3. Depends On 완료 여부

`TASKS/TASK-<TASK_ID>.md`의 `Depends On` 목록을 읽는다. 목록에 있는 각 Task ID에 대해:

- 해당 `TASKS/TASK-<DepID>.md`를 Read해서 그 Task의 Expected Files를 확인한다.
- 그 Expected Files가 실제 저장소에 존재하고(Glob/Read로 확인), 아직 Next.js 기본 스캐폴드 상태 그대로가 아닌지(예: SCR-001 의존성이면 `src/app/page.tsx`가 기본 템플릿 텍스트를 벗어났는지) 확인한다.
- 하나라도 파일이 없거나 스캐폴드 상태 그대로면 그 의존성은 "미완료"다.

미완료 의존성이 하나라도 있으면 `BLOCKED_DEPENDENCY`로 판정하고, 어떤 Depends On Task가 미완료인지, 어떤 Expected Files가 없는지 나열한다. `00_TASK_LIST.md`에 별도 Status 열이 없으므로 이 파일 존재 여부가 유일한 완료 판단 근거다 — 존재하지 않는 상태 트래커를 지어내지 않는다.

### 4. Expected Files

`TASK-<TASK_ID>.md`의 Expected Files를 확인한다:

- Page Owner Task라면 Expected Files에 `design-reference/SCREEN_ROUTE_CONTRACT.json`의 해당 Screen `page_entry` 값이 정확히 포함되는지 확인한다.
- Expected Files 경로가 이 Task의 Screen 범위를 벗어나 다른 Screen의 Page Entry를 포함하지 않는지 확인한다(CLAUDE.md 규칙 8, 16).
- 경로 표기가 실제 프로젝트 구조(`src/app/...`, `src/components/...`, `src/data/...`, `supabase/...` 등)와 형식이 맞는지 확인한다.

불일치가 있으면 `BLOCKED_INPUT`(Task 정의 자체의 오류)으로 판정한다.

### 5. SRS·Scope·Design·Screen Ref

- `TASK-<TASK_ID>.md`의 `Requirement Ref`에 적힌 각 REQ ID가 `docs/UIUX_TRACEABILITY.md`에 실제로 존재하고 Implementation Status가 `IMPLEMENT`(간소화/간단/부분 포함)인지 확인한다.
- `Screen / Route / Page Entry`가 `design-reference/SCREEN_ROUTE_CONTRACT.json`의 값과 일치하는지 확인한다.
- `Design Ref`가 가리키는 `design-reference/D-001/DESIGN.md`, `design-reference/UI_CONTRACT.md`가 실제로 존재하고 LOCKED 상태인지 확인한다.

REQ ID가 존재하지 않거나, 정본 문서가 없거나, 서로 어긋나면 `BLOCKED_INPUT`으로 판정한다.

### 6. 필요한 환경변수 이름

Task의 Category/Screen/Expected Files를 근거로 필요한 환경변수 **이름만** 나열한다(값은 다루지 않는다):

- Supabase Browser Client를 다루는 Task → `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Supabase Server Client/서버 전용 로직을 다루는 Task → 위 2개 + `SUPABASE_SERVICE_ROLE_KEY`
- 관리자 외부 URL 설정(Admin/Outbound) 관련 Task → `FLIGHT_OUTBOUND_URL`, `HOTEL_OUTBOUND_URL`

`docs/ARCHITECTURE.md`의 "착수 차단" 절 기준으로 `.env.local`/`.env.example`가 저장소에 없으면, 위 환경변수가 필요한 Task는 전부 `BLOCKED_INPUT`으로 판정하고 필요한 변수 이름 목록을 함께 보고한다. 정적 데이터(DATA)·순수 UI(COMPONENT, Supabase 미사용) Task처럼 환경변수가 필요 없으면 "필요 없음"으로 명시하고 이 검사를 통과시킨다.

### 7. Secret 하드코딩 위험

- `TASK-<TASK_ID>.md` 본문에 실제 키 형태 문자열(예: `sk-`, `eyJ`로 시작하는 JWT, `service_role` 값 등)이 하드코딩되어 있는지 확인한다. 있으면 `BLOCKED_INPUT`.
- Category가 `COMPONENT`이면서 `"use client"` 대상인 Task가 `SUPABASE_SERVICE_ROLE_KEY`나 서버 전용 Supabase Client(`src/lib/supabase/server.ts` 등)를 Expected Files/Functional AC에서 직접 참조하면 CLAUDE.md 규칙 15 위반 위험이므로 `BLOCKED_SCOPE`로 판정한다.
- 위 두 가지에 해당하지 않으면 통과.

### 8. EXCLUDED 범위 침범 여부

- `TASK-<TASK_ID>.md`의 `Requirement Ref`가 `TASKS/00_TASK_LIST.md`의 `## NON_IMPLEMENTATION` 절에 등록된 REQ ID를 하나라도 포함하면 `BLOCKED_SCOPE`.
- Task 제목/Functional AC/Expected Files가 `docs/PROJECT_SCOPE.md`에서 EXCLUDED로 확정된 기능(전체 콘텐츠 CMS, 미디어 업로드 워크플로, 범용 감사 로그, 자동 백업/장애알림, 외부 이메일 발송, AWS/EC2, 자동 Merge)을 구현하도록 요구하면 `BLOCKED_SCOPE`.

## 종합 판정

8개 검사를 전부 수행한 뒤 하나의 최종 상태만 출력한다. 우선순위(여러 개 동시에 걸리면 앞쪽을 보고):

1. `BLOCKED_DIRTY_TREE` (검사 1)
2. `BLOCKED_INPUT` (검사 2 Wave 목록 불명, 4, 5, 6, 7 전반부)
3. `BLOCKED_DEPENDENCY` (검사 3)
4. `BLOCKED_SCOPE` (검사 2 Wave 범위 밖, 7 후반부, 8)
5. 위 넷 다 해당 없음 → `READY_TO_IMPLEMENT`

## 출력 형식

```
STATUS: READY_TO_IMPLEMENT | BLOCKED_INPUT | BLOCKED_DEPENDENCY | BLOCKED_DIRTY_TREE | BLOCKED_SCOPE
WAVE_ID: <입력값>
TASK_ID: <입력값>

1. Working Tree: <PASS|FAIL + 근거>
2. Wave 소속: <PASS|FAIL + 근거>
3. Depends On: <PASS|FAIL + 근거>
4. Expected Files: <PASS|FAIL + 근거>
5. SRS·Scope·Design·Screen Ref: <PASS|FAIL + 근거>
6. 필요 환경변수: <목록 또는 '필요 없음' + 존재 여부>
7. Secret 하드코딩 위험: <PASS|FAIL + 근거>
8. EXCLUDED 침범: <PASS|FAIL + 근거>
```

`READY_TO_IMPLEMENT`가 아니면 이 Command 안에서 어떤 것도 고치지 않는다 — 판정과 근거만 보고하고 사용자의 다음 지시를 기다린다.
