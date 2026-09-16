# Free Traveler — UI/UX Traceability Matrix

**Document ID:** UIUX-TRACE-001
**기반 문서:** `02_SRS_BASELINE.md`, `PROJECT_SCOPE.md`, `03_UI_COVERAGE_ANALYSIS.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`, `06_SRS_UIUX_REVISED.md`

REQ-FUNC-001~080, REQ-NF-001~034 **114개 전부**를 1행씩 기록한다. 삭제된 요구사항 없음.

**열 정의**
- **Implementation Status**: `PROJECT_SCOPE.md` 기준 구현 여부 결정(IMPLEMENT/EXCLUDED, 간소화·간단·부분 표기 포함).
- **Screen / Route / Page Entry**: `design-reference/UI_CONTRACT.md`, `SCREEN_ROUTE_CONTRACT.json` 기준. `ALL`=5개 Screen 공통(Header/Footer 등), `N/A`=화면에 직접 대응되지 않는 백엔드/데이터/운영 규칙, `N/A (EXCLUDED)`=제외된 기능이라 화면 자체가 없음.
- **Task**: 이 문서 작성 시점에 Task를 생성하지 않았으므로 구현 대상 전부 `PENDING_TASK_GENERATION`. 제외 항목은 `N/A (EXCLUDED)`.
- **Test**: Baseline SRS 5.1/5.2절의 숫자 접미사 1:1 대응 규칙에 따른 예정 테스트 케이스 ID(`TC-FUNC-xxx`/`TC-NF-xxx`). 제외 항목은 `N/A (EXCLUDED)`.
- **Status**: 코드베이스 현재 상태. `src/app`에 스캐폴드만 존재하므로 구현 대상은 전부 `NOT_IMPLEMENTED`, 제외 항목은 `EXCLUDED`. 어떤 행도 "구현 완료"로 기재하지 않는다.

---

## F1 Destination Guide (SCR-001)

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-001 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-001 | NOT_IMPLEMENTED |
| REQ-FUNC-002 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-002 | NOT_IMPLEMENTED |
| REQ-FUNC-003 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-003 | NOT_IMPLEMENTED |
| REQ-FUNC-004 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-004 | NOT_IMPLEMENTED |
| REQ-FUNC-005 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-005 | NOT_IMPLEMENTED |
| REQ-FUNC-006 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-006 | NOT_IMPLEMENTED |
| REQ-FUNC-007 | IMPLEMENT (간소화) | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-007 | NOT_IMPLEMENTED |
| REQ-FUNC-008 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-008 | NOT_IMPLEMENTED |
| REQ-FUNC-009 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-009 | NOT_IMPLEMENTED |
| REQ-FUNC-010 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-010 | NOT_IMPLEMENTED |

## F2 Flight Link-out (SCR-003 항공 Tab)

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-011 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-011 | NOT_IMPLEMENTED |
| REQ-FUNC-012 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-012 | NOT_IMPLEMENTED |
| REQ-FUNC-013 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-013 | NOT_IMPLEMENTED |
| REQ-FUNC-014 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-014 | NOT_IMPLEMENTED |
| REQ-FUNC-015 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-015 | NOT_IMPLEMENTED |
| REQ-FUNC-016 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-016 | NOT_IMPLEMENTED |
| REQ-FUNC-017 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-017 | NOT_IMPLEMENTED |
| REQ-FUNC-018 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-018 | NOT_IMPLEMENTED |

## F3 Hotel Link-out (SCR-003 숙소 Tab)

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-019 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-019 | NOT_IMPLEMENTED |
| REQ-FUNC-020 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-020 | NOT_IMPLEMENTED |
| REQ-FUNC-021 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-021 | NOT_IMPLEMENTED |
| REQ-FUNC-022 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-022 | NOT_IMPLEMENTED |
| REQ-FUNC-023 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-023 | NOT_IMPLEMENTED |
| REQ-FUNC-024 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-024 | NOT_IMPLEMENTED |
| REQ-FUNC-025 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-025 | NOT_IMPLEMENTED |
| REQ-FUNC-026 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-026 | NOT_IMPLEMENTED |

## F4 Travel Mate (SCR-003 작성 Tab / SCR-004 조회·상세 / SCR-005 프로필·내활동·Admin)

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-027 | IMPLEMENT | SCR-003, SCR-004 | `/travel-tools`, `/mates` | `src/app/travel-tools/page.tsx`, `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-027 | NOT_IMPLEMENTED |
| REQ-FUNC-028 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-028 | NOT_IMPLEMENTED |
| REQ-FUNC-029 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-029 | NOT_IMPLEMENTED |
| REQ-FUNC-030 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-030 | NOT_IMPLEMENTED |
| REQ-FUNC-031 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-031 | NOT_IMPLEMENTED |
| REQ-FUNC-032 | IMPLEMENT | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-032 | NOT_IMPLEMENTED |
| REQ-FUNC-033 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-033 | NOT_IMPLEMENTED |
| REQ-FUNC-034 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-034 | NOT_IMPLEMENTED |
| REQ-FUNC-035 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-035 | NOT_IMPLEMENTED |
| REQ-FUNC-036 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-036 | NOT_IMPLEMENTED |
| REQ-FUNC-037 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-037 | NOT_IMPLEMENTED |
| REQ-FUNC-038 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-038 | NOT_IMPLEMENTED |
| REQ-FUNC-039 | IMPLEMENT | SCR-004 | `/mates` | `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-039 | NOT_IMPLEMENTED |
| REQ-FUNC-040 | IMPLEMENT | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-040 | NOT_IMPLEMENTED |
| REQ-FUNC-041 | IMPLEMENT (간단) | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-041 | NOT_IMPLEMENTED |
| REQ-FUNC-042 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-043 | IMPLEMENT | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-043 | NOT_IMPLEMENTED |
| REQ-FUNC-044 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-044 | NOT_IMPLEMENTED |
| REQ-FUNC-045 | IMPLEMENT (간소화) | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-045 | NOT_IMPLEMENTED |

## F5 Country Safety (SCR-001 Drawer)

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-046 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-FUNC-046 | NOT_IMPLEMENTED |
| REQ-FUNC-047 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-047 | NOT_IMPLEMENTED |
| REQ-FUNC-048 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-048 | NOT_IMPLEMENTED |
| REQ-FUNC-049 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-049 | NOT_IMPLEMENTED |
| REQ-FUNC-050 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-050 | NOT_IMPLEMENTED |
| REQ-FUNC-051 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-051 | NOT_IMPLEMENTED |
| REQ-FUNC-052 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-052 | NOT_IMPLEMENTED |
| REQ-FUNC-053 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-053 | NOT_IMPLEMENTED |
| REQ-FUNC-054 | IMPLEMENT | SCR-001, SCR-003 | `/`, `/travel-tools` | `src/app/page.tsx`, `src/app/travel-tools/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-054 | NOT_IMPLEMENTED |
| REQ-FUNC-055 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-056 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |

## F6 About free_traveler (SCR-002)

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-057 | IMPLEMENT | SCR-001, SCR-002 | `/`, `/about` | `src/app/page.tsx`, `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-057 | NOT_IMPLEMENTED |
| REQ-FUNC-058 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-058 | NOT_IMPLEMENTED |
| REQ-FUNC-059 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-059 | NOT_IMPLEMENTED |
| REQ-FUNC-060 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-060 | NOT_IMPLEMENTED |
| REQ-FUNC-061 | IMPLEMENT (간소화) | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-061 | NOT_IMPLEMENTED |
| REQ-FUNC-062 | IMPLEMENT (간소화) | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-062 | NOT_IMPLEMENTED |
| REQ-FUNC-063 | IMPLEMENT | SCR-002 | `/about` | `src/app/about/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-063 | NOT_IMPLEMENTED |

## F7 Common, Admin, Governance

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-FUNC-064 | IMPLEMENT | ALL | 전체(5) | 공통 Header/Footer(5개 Page Entry) | PENDING_TASK_GENERATION | TC-FUNC-064 | NOT_IMPLEMENTED |
| REQ-FUNC-065 | IMPLEMENT | ALL | 전체(5) | 공통 Header/Footer(5개 Page Entry) | PENDING_TASK_GENERATION | TC-FUNC-065 | NOT_IMPLEMENTED |
| REQ-FUNC-066 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-066 | NOT_IMPLEMENTED |
| REQ-FUNC-067 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-067 | NOT_IMPLEMENTED |
| REQ-FUNC-068 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-068 | NOT_IMPLEMENTED |
| REQ-FUNC-069 | IMPLEMENT | SCR-001, SCR-002, SCR-004 | `/`, `/about`, `/mates` | `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-069 | NOT_IMPLEMENTED |
| REQ-FUNC-070 | IMPLEMENT | ALL | 전체(5) | 5개 Page Entry 개별 metadata | PENDING_TASK_GENERATION | TC-FUNC-070 | NOT_IMPLEMENTED |
| REQ-FUNC-071 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-072 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-073 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-074 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-075 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-076 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-FUNC-077 | IMPLEMENT | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-077 | NOT_IMPLEMENTED |
| REQ-FUNC-078 | IMPLEMENT | N/A (기술 Route) | `*` | `src/app/not-found.tsx` | PENDING_TASK_GENERATION | TC-FUNC-078 | NOT_IMPLEMENTED |
| REQ-FUNC-079 | IMPLEMENT | ALL | 전체(5) | 공통 Header/Footer(5개 Page Entry) | PENDING_TASK_GENERATION | TC-FUNC-079 | NOT_IMPLEMENTED |
| REQ-FUNC-080 | IMPLEMENT | SCR-003, SCR-005 | `/travel-tools`, `/account` | `src/app/travel-tools/page.tsx`, `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-FUNC-080 | NOT_IMPLEMENTED |

## NFR — Performance

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-001 | IMPLEMENT | ALL | 전체(5) | 5개 Page Entry | PENDING_TASK_GENERATION | TC-NF-001 | NOT_IMPLEMENTED |
| REQ-NF-002 | IMPLEMENT | ALL | 전체(5) | 5개 Page Entry | PENDING_TASK_GENERATION | TC-NF-002 | NOT_IMPLEMENTED |
| REQ-NF-003 | IMPLEMENT | ALL | 전체(5) | 5개 Page Entry | PENDING_TASK_GENERATION | TC-NF-003 | NOT_IMPLEMENTED |
| REQ-NF-004 | EXCLUDED (부분) | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-005 | EXCLUDED (부분) | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-006 | IMPLEMENT | ALL | 전체(5) | 5개 Page Entry | PENDING_TASK_GENERATION | TC-NF-006 | NOT_IMPLEMENTED |
| REQ-NF-007 | IMPLEMENT (간소화) | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-007 | NOT_IMPLEMENTED |

## NFR — Reliability and Recovery

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-008 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-009 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-010 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-011 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |

## NFR — Security and Privacy

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-012 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-012 | NOT_IMPLEMENTED |
| REQ-NF-013 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-013 | NOT_IMPLEMENTED |
| REQ-NF-014 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-014 | NOT_IMPLEMENTED |
| REQ-NF-015 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-015 | NOT_IMPLEMENTED |
| REQ-NF-016 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-016 | NOT_IMPLEMENTED |
| REQ-NF-017 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-017 | NOT_IMPLEMENTED |
| REQ-NF-018 | IMPLEMENT (간소화) | SCR-005 | `/account` | `src/app/account/page.tsx` | PENDING_TASK_GENERATION | TC-NF-018 | NOT_IMPLEMENTED |

## NFR — Safety and Moderation

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-019 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-019 | NOT_IMPLEMENTED |
| REQ-NF-020 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-021 | IMPLEMENT (간소화) | SCR-003, SCR-004 | `/travel-tools`, `/mates` | `src/app/travel-tools/page.tsx`, `src/app/mates/page.tsx` | PENDING_TASK_GENERATION | TC-NF-021 | NOT_IMPLEMENTED |
| REQ-NF-022 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |

## NFR — Accessibility

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-023 | IMPLEMENT | ALL | 전체(5) | 5개 Page Entry | PENDING_TASK_GENERATION | TC-NF-023 | NOT_IMPLEMENTED |
| REQ-NF-024 | IMPLEMENT (간소화) | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-024 | NOT_IMPLEMENTED |
| REQ-NF-025 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-025 | NOT_IMPLEMENTED |

## NFR — Content, Freshness, SEO, Copyright

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-026 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-026 | NOT_IMPLEMENTED |
| REQ-NF-027 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-027 | NOT_IMPLEMENTED |
| REQ-NF-028 | IMPLEMENT | SCR-001 | `/` | `src/app/page.tsx` | PENDING_TASK_GENERATION | TC-NF-028 | NOT_IMPLEMENTED |
| REQ-NF-029 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-030 | IMPLEMENT | ALL | 전체(5) | 5개 Page Entry | PENDING_TASK_GENERATION | TC-NF-030 | NOT_IMPLEMENTED |

## NFR — Maintainability, Monitoring, Cost

| Requirement | Implementation Status | Screen | Route | Page Entry | Task | Test | Status |
|---|---|---|---|---|---|---|---|
| REQ-NF-031 | IMPLEMENT (간소화) | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-031 | NOT_IMPLEMENTED |
| REQ-NF-032 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-033 | EXCLUDED | N/A (EXCLUDED) | N/A | N/A | N/A (EXCLUDED) | N/A (EXCLUDED) | EXCLUDED |
| REQ-NF-034 | IMPLEMENT | N/A | N/A | N/A | PENDING_TASK_GENERATION | TC-NF-034 | NOT_IMPLEMENTED |

---

## 집계

| 구분 | 개수 |
|---|---:|
| REQ-FUNC-001~080 | 80 |
| REQ-NF-001~034 | 34 |
| **합계(보존 확인)** | **114** |

| Status | 개수 |
|---|---:|
| NOT_IMPLEMENTED (구현 대상, 미착수) | 94 |
| EXCLUDED (제외 확정) | 20 |
| **합계** | **114** |

Task 열은 전 행이 `PENDING_TASK_GENERATION` 또는 `N/A (EXCLUDED)`이며, 실제 Task ID로 채워진 행은 없다. 구현 완료를 선언한 행도 없다 — Status 열은 코드베이스(`src/app` 스캐폴드만 존재)의 실제 상태를 그대로 반영한다.
