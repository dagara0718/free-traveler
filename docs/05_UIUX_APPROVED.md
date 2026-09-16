# Free Traveler — Approved UI/UX Scope

**Document ID:** UIUX-APPROVED-001
**기반 문서:** `02_SRS_BASELINE.md`, `PROJECT_SCOPE.md`, `03_UI_COVERAGE_ANALYSIS.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`

이 문서는 Baseline SRS(`02_SRS_BASELINE.md`)가 정의한 다수의 공개 Route를 승인된 5개 디자인 Screen(SCR-001~005)으로 통합한 결과를 기록한다. Baseline SRS의 REQ-FUNC-001~080, REQ-NF-001~034는 하나도 삭제하지 않는다 — 통합은 화면 수를 줄이는 것이지 요구사항을 줄이는 것이 아니다.

---

## 1. 승인된 Screen 인벤토리

| Screen ID | Route | Page Entry | 분류 | 승인된 Stitch Screen ID |
|---|---|---|---|---|
| SCR-001 | `/` | `src/app/page.tsx` | 핵심(Core) | `c683c3c0c2554f148b7f9e127ea45b68` |
| SCR-002 | `/about` | `src/app/about/page.tsx` | 보조(Support) | `8c6d8f1824b44746826b723a3a9e2da9` |
| SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | 핵심(Core) | `df8effc7ed084a57aa224430247ae2a3` |
| SCR-004 | `/mates` | `src/app/mates/page.tsx` | 핵심(Core) | `a78a54f733e64af4ac6a309b6c3875b2` |
| SCR-005 | `/account` | `src/app/account/page.tsx` | 보조(Support) | `0b6a9f10d15a43aa859354e73bd1508b` |

Mobile 변형(SCR-001, SCR-003 390px)은 `docs/STITCH_VALIDATION_REPORT.md`에서 **BLOCKED**(미생성)로 기록되어 있다. 이 문서는 이 사실을 그대로 유지하며 구현된 것으로 기재하지 않는다.

---

## 2. 기존 Route → 승인 Screen 통합 매핑

Baseline SRS 3.5절의 Route Inventory를 5개 Screen으로 통합한다. 통합은 별도 페이지를 없애고 해당 Screen의 탭·패널·Drawer·Modal로 흡수하는 방식이며, 관련 REQ는 그대로 유지된다.

| 기존 Route(Baseline SRS) | 기존 페이지 | 통합 대상 Screen | 통합 형태 |
|---|---|---|---|
| `/` | 홈 | SCR-001 | 그대로 유지 |
| `/destinations` | 전체 여행지 | SCR-001 | 목록 Section |
| `/destinations/domestic` | 국내 여행지 | SCR-001 | 국내 Card Grid Section |
| `/destinations/overseas` | 해외 여행지 | SCR-001 | 해외 Card Grid Section |
| `/destinations/[slug]` | 여행지 상세 | SCR-001 | Drawer |
| `/flights` | 비행기 찾기 | SCR-003 | 항공편 Tab |
| `/hotels` | 호텔 찾기 | SCR-003 | 숙소 Tab |
| `/mates` | 동행 모집글 목록 | SCR-004 | 그대로 유지(목록+상세 패널 구조로 확장) |
| `/mates/[id]` | 동행 모집글 상세 | SCR-004 | 상세 패널(같은 Route 내 인터랙션) |
| `/mates/new` | 동행 모집글 작성 | SCR-003 | 동행 구하기 Tab |
| `/safety` | 국가별 주의사항 목록 | SCR-001 | 국가별 주의사항 Section |
| `/safety/[countryCode]` | 국가별 주의사항 상세 | SCR-001 | Drawer(여행지 Drawer와 동일 셸 공유) |
| `/about` | 대표 소개 | SCR-002 | 그대로 유지 |
| `/auth/*` | 가입·로그인·성인 확인 | SCR-005 | Guest Tab |
| `/my/*` | 내 글·참가 요청·차단 | SCR-005 | Member "내 활동" Tab |
| `/admin/*` | 콘텐츠·신고·설정 | SCR-005 | Admin Tab(신고 상태 변경+외부 URL 설정만) |

`/mates`, `/mates/[id]`는 SCR-004 한 Route 안에서 목록+상세 패널 상호작용으로 동작하며, 별도 `[id]` 동적 Route를 만들지 않는다(`design-reference/UI_CONTRACT.md` SCR-004 정의 기준).

---

## 3. UI Route Contract

`design-reference/SCREEN_ROUTE_CONTRACT.json`(schema `traveler-screen-route-v1`)을 규범으로 삼는다.

### 3.1 Screen Route (5개, 고정)

| ID | Route | Page Entry | page_owner_task_required | preview_required | starter_template_forbidden |
|---|---|---|:---:|:---:|:---:|
| SCR-001 | `/` | `src/app/page.tsx` | true | true | **true** |
| SCR-002 | `/about` | `src/app/about/page.tsx` | true | true | false |
| SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | true | true | false |
| SCR-004 | `/mates` | `src/app/mates/page.tsx` | true | true | false |
| SCR-005 | `/account` | `src/app/account/page.tsx` | true | true | false |

### 3.2 Technical Route (Screen 수에서 제외)

| 종류 | Route | Page Entry |
|---|---|---|
| Auth Callback | `/auth/callback` | `src/app/auth/callback/route.ts` |
| API Route | `/api/mates/[id]/applications` | `src/app/api/mates/[id]/applications/route.ts` |
| API Route | `/api/applications/[id]` | `src/app/api/applications/[id]/route.ts` |
| API Route | `/api/reports` | `src/app/api/reports/route.ts` |
| API Route | `/api/admin/reports/[id]` | `src/app/api/admin/reports/[id]/route.ts` |
| API Route | `/api/admin/settings/outbound` | `src/app/api/admin/settings/outbound/route.ts` |
| Not Found | `*` | `src/app/not-found.tsx` |

### 3.3 Required Navigation

`design-reference/SCREEN_ROUTE_CONTRACT.json`의 `required_navigation` 13개 엣지를 그대로 인용한다: SCR-001 ↔ SCR-002/003/004/005, SCR-002 → SCR-001/003/004, SCR-003 → SCR-004/005, SCR-004 → SCR-003/005, SCR-005 → SCR-003/004.

### 3.4 Screen 구성 규칙(요약)

- `/travel-tools`(SCR-003)는 **항공·숙소·동행 작성 3개 Tab**을 모두 포함하며, 각 Tab은 독립된 입력·검증·완료 상태를 가진다.
- `/account`(SCR-005)는 **인증(Guest)·프로필(Member)·내 활동(Member)·간단 관리자(Admin)**를 역할별 Tab으로 포함하며, 역할에 없는 Tab은 렌더링하지 않는다. 통계 대시보드는 포함하지 않는다.
- Header·Footer는 5개 Screen 공통 컴포넌트로 1회만 구현한다.
- 상세 사양은 `design-reference/UI_CONTRACT.md`, 토큰·상태·금지 규칙은 `design-reference/D-001/DESIGN.md`를 따른다.

---

## 4. Release Acceptance Criteria

아래 조건을 모두 만족해야 "UI/UX 승인 범위 구현 완료"로 간주한다. 하나라도 미충족이면 `06_SRS_UIUX_REVISED.md`의 상태는 NOT_IMPLEMENTED로 유지한다.

1. **Route 존재**: `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/travel-tools/page.tsx`, `src/app/mates/page.tsx`, `src/app/account/page.tsx` 5개가 모두 존재하고 각각 독립 Route로 응답한다.
2. **Screen 계약 충족**: 각 Page Entry가 `design-reference/UI_CONTRACT.md`에 기록된 영역 순서·주요 Component·최소 콘텐츠 수(`design-reference/D-001/DESIGN.md` 6장 기준)를 충족한다.
3. **SCR-003 3-Tab**: 항공편·숙소·동행 구하기 Tab이 모두 렌더링되고 서로 독립된 상태를 가진다.
4. **SCR-005 역할 분기**: Guest/Member/Admin 각 역할에서 정의된 Tab만 보이고, Admin Tab에는 신고 상태 변경과 외부 URL 설정만 존재하며 통계 대시보드가 없다.
5. **EXCLUDED 미구현 확인**: `PROJECT_SCOPE.md`에서 EXCLUDED로 분류된 기능(전체 CMS, 미디어 업로드 워크플로, 범용 감사 로그, 자동 백업/장애알림, 외부 이메일 연동, AWS/EC2, 자동 Merge Runner 등)이 코드베이스 어디에도 구현되어 있지 않다.
6. **금지 요소 미포함**: Airbnb 상표 요소, 구매·예약·결제 UI, Proprietary 폰트 파일, `design-reference/D-001/DESIGN.md`에 없는 임의 색상이 없다.
7. **Playwright 핵심 Smoke Test 통과**: `PROJECT_SCOPE.md` 6장에 정의된 시나리오가 5개 Route에 대해 모두 통과한다.
8. **Task 매핑 완료**: `docs/UIUX_TRACEABILITY.md`의 모든 IMPLEMENT 행이 `PENDING_TASK_GENERATION`에서 실제 Task ID로 갱신되어 있다(이 문서 작성 시점에는 아직 미충족).

현재 시점(`src/app`에 스캐폴드 파일만 존재) 기준으로 위 8개 조건은 **모두 미충족** 상태다.
