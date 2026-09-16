---
description: traveler-project-pipeline Skill을 사용해 실제 입력 문서를 읽고 TASKS/00_TASK_LIST.md를 생성한다. 구현 코드는 만들지 않는다.
---

# /gen-tasklist

`traveler-project-pipeline` Skill을 사용한다. 이 Skill을 먼저 로드하고, 그 안의 HARNESS_SCHEMA·Screen 정본·파일 규칙·20개 핵심 규칙을 그대로 따른다.

**이 명령은 `TASKS/00_TASK_LIST.md`만 쓴다. 애플리케이션 구현 코드(`src/**`, `supabase/**` 등)는 한 줄도 만들지 않는다.**

## 0. 선행 검증 (필수, 생략 불가)

```
python scripts/validate_inputs.py
```

실패하면 여기서 멈추고 원인을 보고한다. 통과하면 `.claude/tasks/SRC_APP_SNAPSHOT.json`이 갱신된 것을 확인한다 — 이후 모든 Expected Files는 이 스냅샷과 실제 `src/app` 트리를 근거로만 작성한다(임의 경로 금지, 규칙 4).

## 1. 실제 파일을 Read한다 (요약·기억에 의존하지 않는다)

아래 파일을 이번 실행에서 **직접 Read**한다. 이전 대화에서 이미 봤다고 다시 읽지 않고 넘어가지 않는다 — 사용자가 그 사이 파일을 고쳤을 수 있다.

- `design-reference/SCREEN_ROUTE_CONTRACT.json` → Screen 목록의 정본(규칙 2). `schema_version`이 `traveler-screen-route-v1`인지 재확인(규칙 1).
- `docs/UIUX_TRACEABILITY.md` → 114개 Requirement와 Implementation Status(IMPLEMENT/EXCLUDED), Screen/Route/Page Entry 매핑.
- `docs/PROJECT_SCOPE.md` → 각 Requirement의 구현 방식(정적 데이터 여부, 간소화 범위, 제외 사유).
- `design-reference/UI_CONTRACT.md` → Screen별 영역 순서·주요 Component·상태·금지 기능.
- `design-reference/D-001/DESIGN.md` → Section 최소 콘텐츠 수, Empty State 규칙, 금지 색상/폰트/상표.
- `docs/06_SRS_UIUX_REVISED.md` → Release Acceptance Criteria(참고용).
- `.claude/tasks/SRC_APP_SNAPSHOT.json` → 실제 `src/app` 파일 트리.
- 기존 `TASKS/00_TASK_LIST.md`가 있다면 그것도 Read해서 기존 Task ID와 겹치지 않게 한다.

## 2. NON_IMPLEMENTATION 절 작성

`docs/UIUX_TRACEABILITY.md`에서 Implementation Status가 `EXCLUDED`(부분 포함)인 모든 Requirement를 `TASKS/00_TASK_LIST.md`의 `## NON_IMPLEMENTATION` 절에 표로 기록한다. 열: `Requirement | 근거(PROJECT_SCOPE.md 인용) | 후속 방향`. 이 목록에 있는 Requirement는 3단계에서 구현 Task를 만들지 않는다(규칙 16). 기존 등록 항목을 삭제하지 않는다 — 새 EXCLUDED가 생기면 추가만 한다.

## 3. Task 분해 및 Task 표 작성

`TASKS/00_TASK_LIST.md`에 16개 열(Seq/Task ID/제목/Category/Implementation Status/Requirement Ref/Screen/Route/Page Entry/Depends On/Expected Files/Functional AC/Visual AC/Security·Privacy AC/Verify/Priority)로 표를 작성한다. Task ID는 `<CATEGORY>-<설명>` 형태(예: `PAGE-SCR001`, `COMPONENT-SC003-FLIGHT-FORM`)를 쓰고, 기존 Task와 중복되지 않게 한다.

### 3.1 Page Owner Task (정확히 5개, 규칙 3)

`SCREEN_ROUTE_CONTRACT.json`의 5개 Screen마다 `Category=PAGE_OWNER` Task를 정확히 1개씩 만든다. Depends On에는 같은 Screen의 Component Task를 최소 1개 이상 넣는다(규칙 6).

- SCR-001 Page Owner: Next.js Starter 제거를 Acceptance Criteria에 명시(규칙 7).
- SCR-003 Page Owner: 항공·숙소·동행 작성 3탭 조립을 명시(규칙 8).
- SCR-005 Page Owner: Guest·Member·Admin 상태 조립을 명시(규칙 9).

### 3.2 Component / Data / DB / API Task

`design-reference/UI_CONTRACT.md`의 "주요 Component"와 "영역 순서"를 근거로 Component Task를 쪼갠다. 여행지·안전정보·대표 콘텐츠는 `Type=DATA`(`src/data` 대상, 규칙 11)로, Supabase 스키마·RLS·접근 계층은 `Type=DB`(6개 테이블 제한, 규칙 10)로, 서버 로직은 `Type=API`로 분리한다.

### 3.3 Test Task

`Type=UNIT`/`INTEGRATION`은 필요한 만큼, `Type=E2E`는 **Chromium Smoke 2~3개**만 만든다(규칙 13). 크로스 브라우저·부하 테스트 Task를 만들지 않는다.

### 3.4 금지 사항 확인 (규칙 14)

EC2, AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등) Task를 만들지 않는다. `docs/PROJECT_SCOPE.md`의 제외 목록과 대조해 스킵한다.

## 4. Requirement 커버리지 자체 점검

작성을 마치면 Task 표의 Requirement Ref 열을 전부 합쳐 IMPLEMENT Requirement 수와 정확히 일치하는지 확인한다. 어긋나면 누락된 REQ를 담을 Task를 추가한다(새 Category를 만들지 말고 기존 Component/Data/API/Page Owner Task에 배정).

## 5. 출력

- `TASKS/00_TASK_LIST.md` (신규 또는 갱신)
- 콘솔에 Task 총 개수를 보고한다(45~65 예상치와 비교하되 벗어나도 계속 진행 — 개수는 완료 조건이 아니다).

이 단계에서 `python scripts/audit_tasks.py`를 실행하지 않는다(상세 파일이 아직 없어 실패한다). 다음 단계는 `/gen-task-details`다. 여기서 `TASKS/TASK-<ID>.md` 상세 파일이나 애플리케이션 코드를 만들지 않는다.
