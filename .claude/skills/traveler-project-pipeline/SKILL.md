---
name: traveler-project-pipeline
description: Traveler(Free Traveler) 프로젝트의 Task 생성 파이프라인. 승인된 5개 Screen(SCR-001~005)과 114개 Baseline SRS Requirement를 실제 구현 가능한 Task List + Task 상세 파일로 변환한다. "태스크 만들어줘", "task list 생성", "gen-tasklist", "gen-task-details", "audit-tasks" 같은 요청에 사용한다.
---

# Traveler Task Generation Pipeline

이 Skill은 `docs/06_SRS_UIUX_REVISED.md`, `docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md`, `design-reference/D-001/DESIGN.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`를 입력으로 받아 `TASKS/` 아래에 Task List와 Task 상세 파일을 생성하는 파이프라인을 정의한다.

```
python scripts/validate_inputs.py   # 0단계: 입력 무결성 게이트 (모든 명령 이전에 필수)
/gen-tasklist                       # 1단계: TASKS/00_TASK_LIST.md 생성
/gen-task-details                   # 2단계: TASKS/TASK-<ID>.md 생성 + audit_tasks.py 자동 실행
/audit-tasks                        # 필요 시 재검증 (수동 편집 후 등)
```

이 파이프라인의 모든 단계는 **실제 파일을 읽고** 그 내용에 근거해서만 산출물을 쓴다. 입력 문서를 요약해서 기억하고 있다고 가정하지 않는다 — 매 실행마다 Read로 다시 확인한다. 이 파이프라인 어디에서도 애플리케이션 구현 코드(`src/app`, `src/components`, `src/lib`, `supabase/*.sql` 등)를 작성하지 않는다. 결과물은 `TASKS/` 아래 Task 정의 파일뿐이다.

## HARNESS_SCHEMA

```
HARNESS_SCHEMA = "traveler-screen-route-v1"
```

이 값은 `design-reference/SCREEN_ROUTE_CONTRACT.json`의 `schema_version`과 정확히 일치해야 한다. 불일치 시 `scripts/validate_inputs.py`가 실패한다.

## Screen 목록의 정본

**`design-reference/SCREEN_ROUTE_CONTRACT.json`이 Screen 목록의 유일한 정본이다.** `docs/*.md`나 `design-reference/UI_CONTRACT.md`의 서술이 이 JSON과 다르면 JSON을 따르고, 문서 쪽 불일치는 별도로 보고한다. 이 파일을 임의로 다시 만들거나 Screen 수를 바꾸지 않는다.

현재 정본 기준 5개 Screen: `SCR-001`(`/`), `SCR-002`(`/about`), `SCR-003`(`/travel-tools`), `SCR-004`(`/mates`), `SCR-005`(`/account`). 핵심(Core): SCR-001, SCR-003, SCR-004. 보조(Support): SCR-002, SCR-005.

## 파일·ID 규칙 (전 단계 공통)

| 산출물 | 경로 |
|---|---|
| 입력 스냅샷 | `.claude/tasks/SRC_APP_SNAPSHOT.json` (`validate_inputs.py`가 실제 `src/app` 트리를 읽어 생성) |
| Task List | `TASKS/00_TASK_LIST.md` |
| Task 상세 | `TASKS/TASK-<ID>.md` (예: `TASK-PAGE-SCR001.md`, `TASK-COMPONENT-SC003-FLIGHT-FORM.md`) |
| 제외 등록부 | `TASKS/00_TASK_LIST.md` 내 `## NON_IMPLEMENTATION` 절(별도 파일 아님) |
| Task 개요 CSV | `TASKS/TASK_MANIFEST.csv` (`scripts/audit_tasks.py`가 매 실행마다 재생성) |
| Audit 리포트 | `TASKS/TASK_AUDIT_REPORT.md` (`scripts/audit_tasks.py`가 매 실행마다 재생성) |

- Task ID는 `<CATEGORY>-<설명>` 형태의 사람이 읽는 이름을 쓴다(예: `PAGE-SCR001`, `COMPONENT-SC003-FLIGHT-FORM`, `DATA-DESTINATIONS`, `DB-SCHEMA-BASE`, `API-MATES-READ`, `UNIT-TRAVEL-DATES`, `E2E-PUBLIC-SMOKE`, `MANUAL-CHECK-ACCESSIBILITY`, `OPS-CI-PIPELINE`). 기존 Task와 같은 ID를 새로 만들지 않는다.
- `00_TASK_LIST.md`의 Task 표 각 행은 `Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority` 16개 열을 가진다.
  - `Category` ∈ `PAGE_OWNER` | `COMPONENT` | `DATA` | `DB` | `API` | `UNIT` | `INTEGRATION` | `E2E` | `MANUAL_CHECK` | `OPS`. 그 외 Category 신설 금지(자동 인프라 Task를 만들지 않기 위함).
  - `Screen`은 `SCR-001`~`SCR-005` 중 하나, 화면에 종속되지 않는 Task는 `-`, 전 Screen 공통이면 `ALL`.
  - `Depends On`은 Task ID 콤마 목록 또는 `-`.
  - `Requirement Ref`는 `REQ-FUNC-xxx`/`REQ-NF-xxx` 콤마 목록(세미콜론으로 FUNC/NF 구분 가능) 또는 `-`(순수 인프라 셋업 등).
  - `Expected Files`는 실제로 존재를 확인했거나 신규 생성 예정인 파일 경로만 적는다(임의 경로 금지).

## 20개 핵심 규칙 (모든 단계에서 강제)

1. HARNESS_SCHEMA는 `traveler-screen-route-v1`이다.
2. Screen 목록의 정본은 `SCREEN_ROUTE_CONTRACT.json`이다.
3. 정확히 5개 Screen 각각에 Page Owner Task를 하나 만든다 — 5개보다 많거나 적으면 안 된다.
4. Task 상세의 Expected Files는 실제 `src/app` 파일 트리(직접 Read/Glob으로 확인, 또는 `.claude/tasks/SRC_APP_SNAPSHOT.json`)를 근거로 쓴다. 존재 여부를 확인하지 않고 파일 경로를 지어내지 않는다.
5. Page Owner Task(화면 전체 조립·라우트 소유)와 Component Task(화면 내부 컴포넌트/로직 단위)를 명확히 구분한다.
6. Page Owner Task는 같은 Screen에 속한 Component Task 최소 1개 이상에 의존(Depends On)한다.
7. `src/app/page.tsx`를 다루는 SCR-001 Page Owner Task는 Next.js Starter 스캐폴드(기본 로고·링크·템플릿 텍스트) 제거를 Acceptance Criteria로 명시한다.
8. `/travel-tools`(SCR-003) Page Owner Task는 항공·숙소·동행 작성 3개 탭을 실제로 조립하는 것을 Acceptance Criteria로 명시한다.
9. `/account`(SCR-005) Page Owner Task는 Guest·Member·Admin 상태를 실제로 조립하는 것을 Acceptance Criteria로 명시한다(역할에 없는 탭 미렌더링 포함).
10. DB 스키마는 6개 테이블로 제한한다(`user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `admin_setting`). 여행지·안전정보·대표 콘텐츠·감사 로그용 테이블을 추가하지 않는다.
11. 여행지·안전정보·대표(About) 콘텐츠는 DB Task가 아니라 `src/data` 정적 데이터 Task로 만든다.
12. 항공·숙소 입력값(국가/지역/날짜 등)은 서버·DB·외부 URL 쿼리로 전송하지 않는다 — 관련 Task의 Acceptance Criteria와 Expected Files 어디에도 서버 저장/전송을 넣지 않는다.
13. Playwright Task는 **Chromium 기반 Smoke Test(2~3개)**만 만든다. 크로스 브라우저 매트릭스나 부하 테스트를 만들지 않는다.
14. EC2, AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등) Task를 만들지 않는다.
15. `docs/UIUX_TRACEABILITY.md`의 114개 Requirement 전부에 IMPLEMENT 또는 EXCLUDED 상태가 기록되어 있어야 하며, 이 파이프라인은 그 상태를 그대로 승계한다(새로 뒤집지 않는다).
16. EXCLUDED Requirement는 상세 구현 Task를 만들지 않되, `00_TASK_LIST.md`의 `NON_IMPLEMENTATION` 절에서 삭제하지 않는다 — 추적성은 유지한다.
17. Task List(`00_TASK_LIST.md`)와 상세 파일(`TASK-<ID>.md`)은 1:1이어야 한다 — 누락·잉여 파일 금지.
18. 상세 파일 생성이 끝나면 **반드시** `python scripts/audit_tasks.py`를 실행하고, 실패(exit 1 또는 `AUDIT_FAIL`)를 무시하지 않고 통과할 때까지 수정한다.
19. Page Owner Task의 Acceptance Criteria에는 해당 화면의 Section 순서와 최소 콘텐츠 수(`design-reference/UI_CONTRACT.md`, `D-001/DESIGN.md` 기준)를 명시한다.
20. Page Owner Task는 큰 빈 영역과 Placeholder 문구(Lorem ipsum, 준비 중, 정보 확인 필요 등)를 금지 사항으로 명시하고, 데이터가 없는 상태도 안내 문장·이용 방법·CTA가 있는 완성형 Empty State를 요구 사항으로 못박는다.

## Task 개수에 대한 원칙

45~65개를 예상치로 삼되, **개수 자체를 완료 조건으로 쓰지 않는다.** `scripts/audit_tasks.py`는 이 범위를 벗어나도 INFO로만 보고하고 실패시키지 않는다. 완료 조건은 항상 위 20개 규칙과 Requirement 커버리지, 그리고 `scripts/audit_tasks.py`의 18개 검사 전부 통과다.

## Audit 실패를 무시하지 않는다

`scripts/audit_tasks.py`가 `AUDIT_FAIL`을 출력하면:
- 해당 실행에서 "완료"로 보고하지 않는다.
- 리포트에 적힌 실패 원인을 하나씩 고치고(`00_TASK_LIST.md` 또는 개별 `TASK-<ID>.md` 수정), 다시 `python scripts/audit_tasks.py`를 실행한다.
- `AUDIT_PASS`가 나올 때까지 이 과정을 반복한다. 검사 항목을 건너뛰거나 스크립트를 완화해서 통과시키지 않는다 — 스크립트 자체에 버그가 있다고 판단되면 근거를 들어 스크립트를 고치되, 규칙(1~20)의 취지를 약화시키는 방향으로 고치지 않는다.

## 단계별 실행 주체

- 0단계(`validate_inputs.py`) 실패 시 어떤 명령도 진행하지 않는다.
- `/gen-tasklist`: 1단계 — 상세 규칙은 `.claude/commands/gen-tasklist.md` 참고.
- `/gen-task-details`: 2단계 — 상세 규칙은 `.claude/commands/gen-task-details.md` 참고.
- `/audit-tasks`: 검증 재실행 — 상세 규칙은 `.claude/commands/audit-tasks.md` 참고.
