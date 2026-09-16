# SRS-TRAVEL-001 — UI/UX Revision Note

**Document ID:** SRS-UIUX-REV-001
**개정 대상:** `02_SRS_BASELINE.md` (SRS-TRAVEL-001 v1.0)
**개정 사유:** Baseline SRS 3.5절의 다중 Route 구조를 승인된 5개 디자인 Screen(SCR-001~005)으로 통합
**개정 원칙:** REQ-FUNC-001~080, REQ-NF-001~034 중 어떤 것도 삭제하지 않는다. 이 문서는 요구사항의 **화면 배치와 구현 상태**만 갱신하며, 요구사항 본문·우선순위·수용 기준은 Baseline SRS 4장을 그대로 따른다.

---

## 1. 개정 범위

| 절 | Baseline SRS 원문 | 이 개정에서 바뀌는 것 |
|---|---|---|
| 3.5 Page and Route Inventory | `/`, `/destinations*`, `/flights`, `/hotels`, `/mates*`, `/safety*`, `/about`, `/auth/*`, `/my/*`, `/admin/*` 등 다수 Route | `docs/05_UIUX_APPROVED.md` 2장의 통합 매핑에 따라 SCR-001~005 5개 Route로 대체 |
| 4.1 Functional Requirements | REQ-FUNC-001~080 | 요구사항 본문 불변. 각 REQ가 어느 Screen/Route/Page Entry에서 충족되는지만 `docs/UIUX_TRACEABILITY.md`에 추가 |
| 4.2 Non-Functional Requirements | REQ-NF-001~034 | 동일 |
| 6.1 Internal API and Server Actions | API-01~17 | Screen 수 변경과 무관하게 유지. `design-reference/SCREEN_ROUTE_CONTRACT.json`의 `technical_routes`에 재기재 |

`PROJECT_SCOPE.md`에서 EXCLUDED로 확정된 항목은 이 개정에서도 **EXCLUDED로 유지**한다. 화면이 5개로 줄었다고 해서 제외 항목이 부활하지 않는다.

## 2. Screen 통합에 따른 F1~F7 요약

아래는 Baseline SRS의 기능 그룹(F1~F7)이 어느 Screen(들)로 흡수되었는지에 대한 서술 요약이다. REQ 단위의 정확한 매핑·구현 상태·Task·Test는 `docs/UIUX_TRACEABILITY.md`에서 관리하며, 이 표는 그 색인 역할만 한다.

| 그룹 | REQ 범위 | 흡수 Screen | Implementation Status 분포 (PROJECT_SCOPE 기준) |
|---|---|---|---|
| F1 Destination Guide | REQ-FUNC-001~010 | SCR-001 | IMPLEMENT 9, NON_UI(데이터 규칙) 1(008) |
| F2 Flight Link-out | REQ-FUNC-011~018 | SCR-003(항공 Tab) | IMPLEMENT 8 |
| F3 Hotel Link-out | REQ-FUNC-019~026 | SCR-003(숙소 Tab) | IMPLEMENT 8 |
| F4 Travel Mate | REQ-FUNC-027~045 | SCR-003(작성 Tab), SCR-004(조회/상세), SCR-005(프로필/내활동/Admin) | IMPLEMENT 18, EXCLUDED 1(042) |
| F5 Country Safety | REQ-FUNC-046~056 | SCR-001(Drawer) | IMPLEMENT 9, EXCLUDED 2(055, 056) |
| F6 About free_traveler | REQ-FUNC-057~063 | SCR-002 | IMPLEMENT 7 |
| F7 Common/Admin/Governance | REQ-FUNC-064~080 | 전역 공통(Header/Footer) + SCR-005(Admin) + 기술 Route(오류 화면) | IMPLEMENT 11, EXCLUDED 6(071~076) |
| NFR 전체 | REQ-NF-001~034 | 전역 또는 해당 기능이 속한 Screen | IMPLEMENT(간소화 포함) 23, EXCLUDED 11 |

합계: FUNC 80 + NF 34 = **114개 요구사항 전부 보존**(추적 상세는 `docs/UIUX_TRACEABILITY.md` 참고).

## 3. UI Route Contract (개정 반영)

Baseline SRS 3.5절의 Route Inventory는 아래 5개 Screen Route로 대체된다. 상세 계약은 `design-reference/UI_CONTRACT.md`, 스키마는 `design-reference/SCREEN_ROUTE_CONTRACT.json`(schema_version `traveler-screen-route-v1`)을 정본으로 한다.

| Screen | Route | Page Entry | 분류 | 포함 기능(원 Route) |
|---|---|---|---|---|
| SCR-001 | `/` | `src/app/page.tsx` | 핵심 | 홈, 여행지 목록/상세(Drawer), 안전정보 목록/상세(Drawer) |
| SCR-002 | `/about` | `src/app/about/page.tsx` | 보조 | 대표 소개 |
| SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | 핵심 | 항공(`/flights`), 숙소(`/hotels`), 동행 작성(`/mates/new`) — 3 Tab |
| SCR-004 | `/mates` | `src/app/mates/page.tsx` | 핵심 | 동행 목록·상세(`/mates/[id]`) |
| SCR-005 | `/account` | `src/app/account/page.tsx` | 보조 | 인증(`/auth/*`), 프로필·내 활동(`/my/*`), 간단 관리자(`/admin/*`) |

API Route(API-01~17)와 인증 콜백, `not-found`는 Screen 수에 포함하지 않는 기술 Route로 유지한다(`design-reference/SCREEN_ROUTE_CONTRACT.json`의 `technical_routes` 참고).

## 4. Release Acceptance Criteria

`docs/05_UIUX_APPROVED.md` 4장의 8개 조건을 SRS 수용 기준으로 승격한다. 이 개정 문서를 "충족"으로 표시하려면:

1. SCR-001~005 5개 Route가 각각 독립 페이지로 존재한다.
2. 각 Screen이 `design-reference/UI_CONTRACT.md`의 영역 순서·최소 콘텐츠 수를 충족한다.
3. SCR-003의 항공/숙소/동행 3개 Tab이 모두 독립 상태로 동작한다.
4. SCR-005가 역할별(Guest/Member/Admin) Tab만 렌더링하고 Admin에 통계 대시보드가 없다.
5. `PROJECT_SCOPE.md` EXCLUDED 항목이 코드에 없다.
6. Airbnb 상표, 구매/예약/결제 UI, Proprietary 폰트, 미등록 임의 색상이 없다.
7. Playwright 핵심 Smoke Test(`PROJECT_SCOPE.md` 6장)가 5개 Route에서 통과한다.
8. `docs/UIUX_TRACEABILITY.md`의 Task 열이 `PENDING_TASK_GENERATION`에서 실제 Task ID로 전부 갱신된다.

**현재 상태:** `src/app`에는 기본 스캐폴드(`layout.tsx`, `page.tsx`, `globals.css`)만 존재하며, 위 8개 조건 중 어느 것도 충족되지 않았다. 이 개정 문서는 요구사항과 화면의 매핑만 확정할 뿐, 구현 완료를 선언하지 않는다.

## 5. 다음 단계

- REQ 단위의 Screen/Route/Page Entry/Task/Test/Status 전체 매핑: `docs/UIUX_TRACEABILITY.md`
- Task 생성 후 해당 문서의 `PENDING_TASK_GENERATION` 값을 실제 Task ID로 교체한다.
- 구현 완료 시 Status 열을 `NOT_IMPLEMENTED`에서 실제 검증된 상태로만 갱신한다(임의 상향 금지).
