---
description: traveler-project-pipeline Skill을 사용해 TASKS/00_TASK_LIST.md를 실제로 읽고 TASKS/TASK-<ID>.md 상세 파일을 1:1로 생성한 뒤 scripts/audit_tasks.py를 실행한다. 구현 코드는 만들지 않는다.
---

# /gen-task-details

`traveler-project-pipeline` Skill을 사용한다. `/gen-tasklist`가 먼저 실행되어 `TASKS/00_TASK_LIST.md`가 존재해야 한다.

**이 명령은 `TASKS/TASK-<ID>.md` 상세 파일만 쓴다. 애플리케이션 구현 코드(`src/**`, `supabase/**`, `e2e/**` 등)는 한 줄도 만들지 않는다** — 여기서 만드는 것은 "무엇을 어떻게 구현해야 하는가"를 적은 계획 문서이지, 구현 자체가 아니다.

## 1. 실제 파일을 Read한다

- `TASKS/00_TASK_LIST.md` — 상세를 만들 Task 전체 표. 이번 실행에서 다시 Read해서 최신 상태를 확인한다(이전 턴 기억으로 대체하지 않는다).
- `.claude/tasks/SRC_APP_SNAPSHOT.json`(없으면 `python scripts/validate_inputs.py`로 재생성) — 실제 `src/app` 파일 트리(규칙 4). 새로 만들 파일과 이미 존재하는 파일을 구분해서 Expected Files에 쓴다.
- `design-reference/UI_CONTRACT.md`, `design-reference/D-001/DESIGN.md` — Section 순서, 최소 콘텐츠 수, 상태(Loading/Empty/Error/Unauthorized), 금지 규칙.
- `docs/UIUX_TRACEABILITY.md` — Task의 Requirement Ref 열에 적힌 각 REQ의 원문·수용 기준.
- 이미 존재하는 `TASKS/TASK-<ID>.md` 파일이 있다면 Read해서 내용을 파악한다 — **같은 ID의 파일이 이미 있으면 새로 만들지 않는다**(중복 생성 금지). 내용을 고쳐야 하면 기존 파일을 갱신한다.

## 2. Task 상세 파일 형식

`00_TASK_LIST.md`의 각 Task ID마다 `TASKS/TASK-<ID>.md`를 정확히 1개 만든다(규칙 17 — Task List와 1:1). 모든 상세 파일은 아래 절을 포함한다:

```markdown
# <Task ID> — <제목>

- Seq / Category / Priority

## Context
## Project Scope
## Requirement Ref
## Screen / Route / Page Entry
## Design Ref
## Depends On
## Expected Files
## Functional AC
## Visual AC
## Security/Privacy AC
## Test Cases
## Verify
## Definition of Done
## Forbidden
```

## 3. Page Owner Task 상세 작성 규칙 (규칙 19, 20 — 가장 엄격)

Page Owner Task(5개)의 Functional AC에는 반드시 다음을 명시한다:

1. **Section 순서**: `design-reference/UI_CONTRACT.md`에 기록된 해당 Screen의 "영역 순서"를 그대로 옮긴다.
2. **최소 콘텐츠 수**: `design-reference/D-001/DESIGN.md`의 숫자(예: SCR-001 국내/해외/테마/안전정보 각 6, 동행글 3, SCR-002 Timeline 6 이상·방문국가 30·Gallery 8·추천여행지 4 등)를 그대로 옮긴다.
3. **Empty State 규칙**: 데이터가 없는 목록도 ① 상황 설명 ② 이용 방법 1문장 ③ 다음 행동 CTA를 갖춘 완성형 Empty State여야 하며, 큰 빈 영역이나 Placeholder 문구(Lorem ipsum, 준비 중, 정보 확인 필요 등)를 Visual AC/Forbidden에 금지 사항으로 명시한다(규칙 20).
4. Screen별 추가 규칙:
   - **SCR-001** Page Owner: "Next.js 기본 스타터(로고, `layout.tsx`/`page.tsx` 기본 템플릿 텍스트·링크)를 완전히 제거한다"를 Functional AC에 명시(규칙 7).
   - **SCR-003** Page Owner: "항공편·숙소·동행 구하기 3개 Tab을 실제로 조립하고, 각 Tab은 독립된 입력·검증·완료 상태를 가진다"를 명시(규칙 8). "입력값(국가/지역/날짜)을 서버·DB·외부 URL 쿼리에 전달하지 않는다"를 Security/Privacy AC와 Forbidden에 명시(규칙 12).
   - **SCR-005** Page Owner: "Guest·Member·Admin 역할별 상태를 실제로 조립하고, 역할에 없는 Tab은 렌더링하지 않는다. Admin에 통계 대시보드를 추가하지 않는다"를 명시(규칙 9).

## 4. Expected Files 작성 (규칙 4)

실제 `src/app` 트리에 이미 존재하는 파일은 "기존 파일 수정"으로, 없는 파일은 "신규 생성"으로 구분해 적는다. 존재를 확인하지 않은 경로를 지어내지 않는다. Page Owner Task의 Expected Files에는 `SCREEN_ROUTE_CONTRACT.json`의 `page_entry` 값을 그대로 쓴다.

## 5. Data / DB / Test Task 상세

- **Data Task**: Expected Files는 `src/data/*.ts` 형태. DB 접근 코드를 포함하지 않는다(규칙 11).
- **DB Task**: 테이블 선언은 `Table: <name>` 형식으로 명시하고, 전체 DB Task를 합쳐 6개(`user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `admin_setting`)를 넘지 않는다(규칙 10).
- **Test Task**: `E2E`는 Chromium Smoke만, "Chromium" 문자열을 반드시 포함하고 다른 브라우저(firefox/webkit/safari)나 부하 테스트를 언급하지 않는다(규칙 13).

## 6. EXCLUDED Requirement 처리 (규칙 16)

`TASKS/00_TASK_LIST.md`의 `NON_IMPLEMENTATION` 절에 있는 Requirement는 어떤 Task 상세에도 Requirement Ref로 넣지 않는다.

## 7. 생성 후 필수 감사 (규칙 18) — 실패를 무시하지 않는다

모든 상세 파일 생성이 끝나면 **반드시** 아래를 실행한다:

```
python scripts/audit_tasks.py
```

`AUDIT_FAIL`이 나오면 그 실행을 완료로 보고하지 않는다. 리포트(`TASKS/TASK_AUDIT_REPORT.md`)와 콘솔에 적힌 실패 항목(1:1 불일치, Page Owner 개수/의존성, Screen별 필수 문구 누락, Dependency Cycle, Requirement 커버리지 누락, DB 테이블 초과, 금지어 검출 등)을 하나씩 고치고 다시 실행한다. `AUDIT_PASS`가 나올 때까지 이 단계를 반복하며, 검사를 건너뛰거나 실패를 그대로 두고 다음 단계로 넘어가지 않는다. 최종 보고에 Audit 결과(PASS/FAIL, 통과한 검사 수)를 포함한다.
