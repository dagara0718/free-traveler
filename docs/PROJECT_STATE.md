# Free Traveler — Project State

이 문서는 프로젝트의 **살아있는 현재 상태**를 기록한다. Wave/Task가 진행될 때마다 이 문서를 갱신한다(구현 코드 변경이 아니므로 `implement-task` 6단계 완료 보고 직후, 또는 Wave 경계에서 갱신). 실제로 확인되지 않은 값을 추정으로 채우지 않는다 — 확인 전 항목은 `PENDING`/`UNKNOWN`으로 둔다.

**마지막 갱신 시점:** 초기화(Task 착수 이전, `TASKS/00_TASK_LIST.md` + `TASKS/TASK-*.md` 생성 및 감사 통과 직후)

---

| 필드 | 값 |
|---|---|
| **Harness Schema** | `traveler-screen-route-v1` (`design-reference/SCREEN_ROUTE_CONTRACT.json`) |
| **Design Version** | D-001 — `Status: LOCKED` (`design-reference/D-001/DESIGN.md`, `design-reference/DESIGN_MANIFEST.md`) |
| **Scope Mode** | `docs/PROJECT_SCOPE.md` 기준 IMPLEMENT 94 / EXCLUDED 20 (합계 114, `docs/UIUX_TRACEABILITY.md`와 일치) |
| **Current Wave** | NONE — 아직 어떤 Wave도 시작되지 않음 |
| **Current Task** | NONE |
| **Completed Tasks** | 0 / 61 (`TASKS/TASK_MANIFEST.csv` 기준 전체 Task 수) |
| **Blocked Tasks** | NONE — 아직 어떤 Task도 `/prepare-task`를 통과하지 않아 착수된 것이 없음. (환경 준비 자체가 안 된 상태는 아래 Deferred Items 참고) |
| **Latest CI** | NOT_CONFIGURED — `.github/workflows/ci.yml` 없음(`docs/ARCHITECTURE.md` 착수 차단 항목) |
| **Supabase State** | NOT_PROVISIONED — `supabase/` 디렉터리 없음, `.env.local` 없음, `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`/`SUPABASE_SERVICE_ROLE_KEY` 미정의 |
| **Vercel Preview URL** | NONE — 아직 배포되지 않음 |
| **Screen Checkpoints** | 아래 표 참고 |
| **Playwright State** | NOT_RUN — `e2e/` 디렉터리 없음, Chromium Smoke 3종(`E2E-PUBLIC-SMOKE`/`E2E-TRAVEL-TOOLS`/`E2E-MATE-AUTH`) 미작성 |
| **Deferred Items** | 아래 목록 참고 |
| **Next Action** | 사용자가 Wave 1 범위(Task ID 목록)를 지정 → 첫 Task에 `/prepare-task W01 <TASK_ID>` 실행 |

## Screen Checkpoints

| Screen | Route | 상태 |
|---|---|---|
| SCR-001 | `/` | PENDING |
| SCR-002 | `/about` | PENDING |
| SCR-003 | `/travel-tools` | PENDING |
| SCR-004 | `/mates` | PENDING |
| SCR-005 | `/account` | PENDING |
| FINAL | 전체 통합(5개 Screen + Playwright Smoke + CI 통과) | PENDING |

각 Screen은 해당 Page Owner Task(`PAGE-SCR001`~`PAGE-SCR005`)가 `implement-task` 6단계 완료 보고에서 `DONE`이고, 관련 Playwright Smoke가 통과한 뒤에만 `DONE`으로 갱신한다. `FINAL`은 5개 Screen이 전부 `DONE`이고 `scripts/audit_tasks.py`가 `AUDIT_PASS`이며 CI가 통과한 뒤에만 `DONE`으로 갱신한다.

## Deferred Items

- **EXCLUDED Requirement 20개** — `TASKS/00_TASK_LIST.md`의 `NON_IMPLEMENTATION` 절 참고(REQ-FUNC-042/055/056/071~076, REQ-NF-004/005/008~011/020/022/029/032/033). 구현하지 않으며, 필요 재검토 시 `docs/DECISION_LOG.md`에 새 DEC 항목을 추가한 뒤에만 반영한다.
- **SCR-001, SCR-003 Mobile(390px) 변형** — `docs/STITCH_VALIDATION_REPORT.md`에서 BLOCKED(미생성)로 기록됨. 별도 생성 필요.
- **Stitch 프로젝트 내 중복 Desktop 화면** — SCR-001×2, SCR-002×6, SCR-004×2, SCR-005×1(수정 전 원본) 잔존. Stitch 웹 UI에서 수동 정리 필요(MCP 삭제 API 없음).
- **CMS·외부 Email 공급자·Monitoring** — `docs/ARCHITECTURE.md`에 따라 프로젝트 범위 자체에서 제외. Deferred가 아니라 구축 대상이 아님.

## 상태 값 참고

- `Blocked Tasks`, `Screen Checkpoints`, `Playwright State`, `Latest CI`, `Supabase State`, `Vercel Preview URL`은 `prepare-task`/`implement-task`/`audit-tasks` 실행 결과로만 갱신한다. 실행 없이 값을 앞당겨 `DONE`/`READY`로 적지 않는다.
- `Current Wave`/`Current Task`는 사용자가 다음 Wave/Task를 지시하는 시점에 갱신하고, 완료 후 다시 `NONE`으로 되돌리거나 다음 Task로 이동한다.
