---
description: prepare-task가 READY_TO_IMPLEMENT로 판정한 Task 1개를 Expected Files 안에서 구현하고, 관련 Unit/Playwright 검증 후 변경 파일·검증·제약을 보고한다. 기본적으로 Commit/Push/PR을 수행하지 않는다.
---

# /implement-task WAVE_ID TASK_ID

CLAUDE.md의 Task 완료 순서(Task 읽기 → 입력 확인 → 구현 → 관련 포맷·Unit Test → 필요 시 Playwright → Diff 확인 → 완료 보고)를 그대로 따른다. 이 Command는 실제 애플리케이션 코드를 작성하는 유일한 단계다 — `prepare-task`, `gen-tasklist`, `gen-task-details`, `audit-tasks`는 코드를 만들지 않는다.

## 0. 선행 게이트 (규칙 1)

**`prepare-task`가 이 `WAVE_ID`/`TASK_ID`에 대해 `READY_TO_IMPLEMENT`를 반환한 경우에만 진행한다.**

- 이번 대화에서 아직 `/prepare-task WAVE_ID TASK_ID`를 실행하지 않았다면 먼저 실행한다.
- 결과가 `BLOCKED_*`면 여기서 멈추고 그 판정과 근거를 그대로 보고한다 — 원인을 자체적으로 우회하거나 무시하고 구현을 진행하지 않는다.
- 한 번의 `/implement-task` 호출은 **Task 정확히 1개**만 구현한다. 여러 Task를 한 번에 묶어 진행하지 않는다(Wave 내부는 Depends On 순서로 하나씩).

## 1. Task 읽기 · 입력 확인

`TASKS/TASK-<TASK_ID>.md`를 다시 Read한다(요약·기억으로 대체하지 않는다). 아래를 확인한다:

- **Expected Files** — 이번 작업에서 만들거나 고칠 수 있는 파일의 전부다.
- **Functional AC / Visual AC / Security·Privacy AC** — 구현이 만족해야 하는 조건 전부.
- **Design Ref** — `design-reference/D-001/DESIGN.md`(토큰), `design-reference/UI_CONTRACT.md`(Section 순서·Component)를 함께 Read해서 실제 값(색상 hex, spacing, radius 등)을 확인한다. 기억나는 값으로 대충 쓰지 않는다.
- **Depends On** — 의존 Task의 산출물(Expected Files)을 Read해서 실제 export/인터페이스를 확인한 뒤 import한다.

## 2. 구현 (규칙 2, 3, 4, 7)

- **Expected Files 안에서만 작업한다.** Task 상세에 없는 파일을 새로 만들거나 고치지 않는다. 목록 밖 파일이 꼭 필요하다고 판단되면 구현을 멈추고 사용자에게 Task 재정의를 요청한다(임의로 범위를 넓히지 않는다).
- **Functional AC·Visual AC·Security/Privacy AC를 전부 만족시킨다.** 일부만 만족시키고 나머지를 "추후 처리"로 남기지 않는다. AC에 명시된 Section 순서, 최소 콘텐츠 수, Empty State 완성도(안내+이용방법+CTA), Lorem ipsum/`준비 중`/`정보 확인 필요` 금지, 색상·spacing 토큰 준수를 그대로 코드에 반영한다.
- **Page Owner Task는 실제 Page Entry를 조립하는 것만 한다.** Depends On의 Component/Data/API 산출물을 import해서 배치할 뿐, 그 안에서 새 Component 로직을 만들지 않는다(다른 Task 소관). SCR-001이면 Next.js 기본 스캐폴드(로고, 기본 템플릿 텍스트·링크)를 완전히 제거한다. SCR-003이면 항공·숙소·동행 3개 Tab이 실제로 조립되어 각각 독립 상태로 동작하는지 확인한다. SCR-005면 Guest/Member/Admin 역할별 Tab이 실제로 조립되고 역할에 없는 Tab은 렌더링되지 않는지 확인한다.
- **항공·숙소 입력값**은 Client Component의 일시 상태로만 유지한다. Server Action, Route Handler, Supabase 테이블, 외부 URL 쿼리, 로그, 분석 이벤트로 보내는 코드를 절대 추가하지 않는다.
- **금지 기술을 추가하지 않는다(규칙 7):** AWS(EC2 포함), Prisma를 포함한 ORM, 자동 Merge(merge queue/auto-merge bot) 관련 코드·설정·워크플로를 만들지 않는다. DB 접근은 Supabase JS 클라이언트로 직접 쿼리한다.
- Service Role Key는 서버 전용 모듈에서만 참조하고 Client Component·브라우저 번들에 노출하지 않는다.
- `TASKS/00_TASK_LIST.md`의 `NON_IMPLEMENTATION` 절에 있는 Requirement에 해당하는 기능을 이 Task 구현 과정에서 "겸사겸사" 만들지 않는다.

## 3. 관련 Unit Test 실행 (규칙 5)

- Task Requirement Ref/Category와 관련된 Vitest 단위 테스트가 있으면 실행한다(예: 날짜 검증 로직을 건드리면 `UNIT-TRAVEL-DATES` 관련 테스트, 연락처 탐지 로직을 건드리면 `UNIT-CONTACT-DETECTION` 관련 테스트).
- 관련 단위 테스트가 아직 없고 이 Task가 `UNIT` Category 자신이면, Task 상세의 Test Cases에 따라 테스트를 작성하고 실행한다.
- 실패하면 구현을 고쳐 통과시킨다. 테스트를 지우거나 스킵 처리해서 통과시키지 않는다.

## 4. Playwright — Page Owner 또는 E2E Task일 때만 (규칙 6)

- **이 Task의 Category가 `PAGE_OWNER` 또는 `E2E`일 때만** 관련 Playwright Chromium Smoke를 실행한다(`E2E-PUBLIC-SMOKE`/`E2E-TRAVEL-TOOLS`/`E2E-MATE-AUTH` 중 이 Screen을 다루는 것).
- 그 외 Category(`COMPONENT`, `DATA`, `DB`, `API`, `UNIT`, `INTEGRATION`, `MANUAL_CHECK`, `OPS`)는 Playwright를 실행하지 않는다 — 3번(Unit Test)까지만 하고 다음 단계로 넘어간다.
- Chromium 외 브라우저를 추가하거나 실행하지 않는다.

## 5. Diff 확인

변경된 파일 목록을 Task의 Expected Files와 대조한다(예: `git status --porcelain`, `git diff --stat`으로 읽기 전용 확인). Expected Files 밖의 파일이 변경되어 있으면 그 변경을 되돌리거나, 정말 필요한 변경이면 이유를 설명하고 사용자 승인을 받은 뒤에만 유지한다.

## 6. 완료 보고 (규칙 8)

아래 형식으로 보고한다:

```
TASK_ID: <ID>
STATUS: DONE | PARTIAL | BLOCKED

변경 파일:
- <path> (신규/수정)
...

검증:
- Unit Test: <실행한 테스트, 결과>
- Playwright: <실행 여부(PAGE_OWNER/E2E만), 결과>
- 빌드/Lint: <결과>

남은 제약:
- <미충족 AC가 있다면 목록, 없으면 "없음">
- <Expected Files 밖 변경이 있었다면 사유, 없으면 "없음">
```

`PARTIAL`/`BLOCKED`를 `DONE`으로 보고하지 않는다.

## 7. Commit·Push·PR 정책

- **기본적으로 Commit, Push, PR 생성을 자동 수행하지 않는다.** 구현과 검증까지만 하고 결과를 보고한 뒤 멈춘다.
- **사용자가 명시적으로 요청한 경우에만** 이번에 구현한 **Task 단위로** Commit을 만든다(예: "이 Task 커밋해줘"). 이때도:
  - 여러 Task를 하나의 Commit으로 묶지 않는다 — Task 1개 = Commit 1개 원칙을 지킨다.
  - Push, PR 생성, Merge는 사용자가 별도로 요청하지 않는 한 여전히 수행하지 않는다(CLAUDE.md 규칙 21, DEC-012).
  - Commit 메시지에 `TASK_ID`와 구현 요약을 남긴다.
- Push나 PR을 요청받아도 Merge는 항상 사람이 한다 — 이 Command로 Merge를 실행하지 않는다.
