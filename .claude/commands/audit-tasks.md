---
description: traveler-project-pipeline Skill을 사용해 scripts/audit_tasks.py를 실행하고, TASKS/TASK_AUDIT_REPORT.md를 실제로 읽어 결과를 보고한다. 실패를 무시하지 않으며 구현 코드는 만들지 않는다.
---

# /audit-tasks

`traveler-project-pipeline` Skill을 사용한다. `/gen-task-details`가 끝날 때 자동으로 한 번 실행되지만(규칙 18), 이후 `TASKS/00_TASK_LIST.md`나 `TASKS/TASK-<ID>.md`를 수동으로 편집했거나 재검증이 필요할 때 언제든 다시 호출한다.

**이 명령은 검증만 수행한다. `TASKS/TASK_MANIFEST.csv`, `TASKS/TASK_AUDIT_REPORT.md` 외의 파일을 쓰지 않는다. 애플리케이션 구현 코드나 Task 내용을 자동으로 고치지 않는다.**

## 1. 실행

```
python scripts/audit_tasks.py
```

이 스크립트가 없거나 최신 규칙(18개 검사: 1:1 매핑, 중복 ID, Depends On 누락, Dependency Cycle, Screen당 Page Owner 1개, Route/Page Entry/Expected Files 일치, Component-only Screen, SCR-001/003/005 필수 AC, DB Schema/RLS/Access/Seed 존재, DB 테이블 상한, 외부 입력 비저장 AC, Auth·성인·RLS AC, Playwright Chromium, 금지어, Requirement 커버리지, EXCLUDED 미구현)를 반영하지 않은 것으로 보이면, 먼저 `scripts/audit_tasks.py`를 실제로 Read해서 확인한 뒤 진행한다.

## 2. 결과를 실제로 Read해서 보고한다

명령 출력(`AUDIT_PASS (N checks)` 또는 `AUDIT_FAIL (M/N checks passed)`)만 보지 말고 `TASKS/TASK_AUDIT_REPORT.md`를 Read해서 각 검사 번호(1~18)의 PASS/FAIL과 상세 사유를 확인한다. 요약해서 짐작하지 않는다.

- **PASS**: 18개 검사 전부 통과. `TASKS/TASK_AUDIT_REPORT.md`의 DB 테이블 목록, Requirement 커버리지(114/114), Task 총수를 인용해 보고한다.
- **FAIL**: 실패한 검사 번호와 사유를 그대로 인용해 보고한다. **이 실패를 무시하고 "완료"로 보고하지 않는다.** 다음 중 하나로 이어간다:
  - 원인이 `TASKS/00_TASK_LIST.md`/`TASKS/TASK-<ID>.md`에 있으면 `/gen-task-details`(또는 해당 파일 직접 수정)로 고치고 이 명령을 다시 실행한다.
  - 원인이 입력 문서 자체(SRS/Scope/Design/Screen Contract)의 불일치라면, 문서를 임의로 고치지 않고 사용자에게 보고한다.

## 3. 이 명령이 하지 않는 일

- 새 Task를 만들거나 Task 내용을 자동 수정하지 않는다 — `/gen-tasklist`, `/gen-task-details`의 역할이다.
- Requirement 본문이나 `docs/UIUX_TRACEABILITY.md`/`docs/PROJECT_SCOPE.md`의 Implementation Status를 바꾸지 않는다.
- 애플리케이션 코드(`src/**`, `supabase/**`, `e2e/**`)를 생성·수정하지 않는다.
- `AUDIT_FAIL`을 "부분 성공"이나 "거의 완료"로 재해석해서 보고하지 않는다 — FAIL은 FAIL로 보고한다.
