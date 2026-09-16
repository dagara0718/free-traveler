# Free Traveler — Task List

**기반 문서:** `docs/02_SRS_BASELINE.md`, `docs/06_SRS_UIUX_REVISED.md`, `docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md`, `design-reference/D-001/DESIGN.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`, 현재 `src/app`(스캐폴드만 존재: `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`)
**선행 검사:** `python scripts/validate_inputs.py` → `VALIDATE_INPUTS_PASS (11 checks)` 확인 후 작성.
**구현 코드·Branch·Commit·Issue는 생성하지 않았다.** 이 문서는 Task 정의뿐이다.

---

## 요약

| 구분 | 개수 |
|---|---:|
| **Task 총수** | **61** |
| PAGE_OWNER | 5 |
| COMPONENT | 28 |
| API | 8 |
| DB | 4 |
| DATA | 4 |
| UNIT | 3 |
| INTEGRATION | 1 |
| E2E | 3 |
| MANUAL_CHECK | 3 |
| OPS | 2 |

| Requirement 커버리지 | 개수 |
|---|---:|
| REQ-FUNC-001 ~ REQ-FUNC-080 (전체 목록) | 80 |
| REQ-NF-001 ~ REQ-NF-034 (전체 목록) | 34 |
| **합계** | **114** |
| IMPLEMENT → Task List에 매핑됨 | 94 / 94 |
| EXCLUDED → `NON_IMPLEMENTATION` 표에 등록됨 | 20 / 20 |
| **누락 Requirement ID** | **없음** |

114개 Requirement 전부 이 문서 어딘가(Task List 또는 NON_IMPLEMENTATION 표)에 등장한다. 누락이 없으므로 완료로 보고한다. 누락이 발견되면 이 표의 "누락 Requirement ID"에 목록을 적고 완료로 보고하지 않는다.

---

## Task List

열: **Seq · Task ID · 제목 · Category · Implementation Status · Requirement Ref · Screen · Route · Page Entry · Depends On · Expected Files · Functional AC · Visual AC · Security/Privacy AC · Verify · Priority**

Page Owner(PAGE-SCR001~005) 5개 행의 Functional AC/Visual AC는 표에는 요약만 적고, 전문(Section 순서·데이터 출처·최소 콘텐츠 수·반응형 밀도·Empty State·금지 문구)은 표 아래 "Page Owner Acceptance Criteria 상세" 절에 그대로 옮긴다.

| Seq | Task ID | 제목 | Category | Impl. Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | PAGE-SCR001 | `/` 메인 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-001,REQ-FUNC-002,REQ-FUNC-003,REQ-FUNC-004,REQ-FUNC-005,REQ-FUNC-006,REQ-FUNC-007,REQ-FUNC-008,REQ-FUNC-009,REQ-FUNC-010,REQ-FUNC-047,REQ-FUNC-048,REQ-FUNC-049,REQ-FUNC-050,REQ-FUNC-051,REQ-FUNC-052,REQ-FUNC-053,REQ-FUNC-054,REQ-FUNC-057,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-067,REQ-FUNC-068,REQ-FUNC-069,REQ-FUNC-070,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-023,REQ-NF-026,REQ-NF-027,REQ-NF-028,REQ-NF-030 | SCR-001 | `/` | `src/app/page.tsx` | COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-FAVORITES-LOCALSTORAGE, COMPONENT-SHARE-BUTTON, COMPONENT-SC001-HERO-SEARCH, COMPONENT-SC001-DESTINATION-GRID, COMPONENT-SC001-DRAWER-SHELL, COMPONENT-SC001-MATE-TEASER, COMPONENT-SC001-ABOUT-TEASER, DATA-DESTINATIONS, DATA-SAFETY, API-MATES-READ | `src/app/page.tsx`(기존 스캐폴드 교체) | 상세 절 참고 | 상세 절 참고 | Drawer 콘텐츠에 공개 연락처 없음; 클라이언트 즐겨찾기만 localStorage, 서버 미전송 | E2E-PUBLIC-SMOKE | P0 |
| 2 | PAGE-SCR002 | `/about` 대표 소개 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-057,REQ-FUNC-058,REQ-FUNC-059,REQ-FUNC-060,REQ-FUNC-061,REQ-FUNC-062,REQ-FUNC-063,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-069,REQ-FUNC-070,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-023,REQ-NF-030 | SCR-002 | `/about` | `src/app/about/page.tsx` | COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SHARE-BUTTON, COMPONENT-SC002-PROFILE-HERO-STATS, COMPONENT-SC002-TIMELINE, COMPONENT-SC002-COUNTRY-CHIPS, COMPONENT-SC002-GALLERY, COMPONENT-SC002-PICKS-CTA, DATA-REPRESENTATIVE | `src/app/about/page.tsx`(신규) | 상세 절 참고 | 상세 절 참고 | 인물 사진에 상업적 보증 오인 문구 없음 | E2E-PUBLIC-SMOKE | P1 |
| 3 | PAGE-SCR003 | `/travel-tools` 통합 여행 준비 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-011,REQ-FUNC-012,REQ-FUNC-013,REQ-FUNC-014,REQ-FUNC-015,REQ-FUNC-016,REQ-FUNC-017,REQ-FUNC-018,REQ-FUNC-019,REQ-FUNC-020,REQ-FUNC-021,REQ-FUNC-022,REQ-FUNC-023,REQ-FUNC-024,REQ-FUNC-025,REQ-FUNC-026,REQ-FUNC-027,REQ-FUNC-028,REQ-FUNC-031,REQ-FUNC-032,REQ-FUNC-054,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-070,REQ-FUNC-079,REQ-FUNC-080; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-017,REQ-NF-021,REQ-NF-023,REQ-NF-030 | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SC003-TABS-SHELL, COMPONENT-SC003-FLIGHT-FORM, COMPONENT-SC003-HOTEL-FORM, COMPONENT-SC003-MATE-WRITE, API-MATES-WRITE, API-AUTH, DATA-POLICY-CONTENT | `src/app/travel-tools/page.tsx`(신규) | 상세 절 참고 | 상세 절 참고 | 항공·숙소 입력값(국가/지역/날짜)을 서버·DB·외부 URL 쿼리에 전달하지 않음(클라이언트 상태 한정) | E2E-TRAVEL-TOOLS | P0 |
| 4 | PAGE-SCR004 | `/mates` 동행 조회 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-030,REQ-FUNC-033,REQ-FUNC-034,REQ-FUNC-035,REQ-FUNC-036,REQ-FUNC-037,REQ-FUNC-039,REQ-FUNC-040,REQ-FUNC-043,REQ-FUNC-044,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-069,REQ-FUNC-070,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-019,REQ-NF-021,REQ-NF-023,REQ-NF-030 | SCR-004 | `/mates` | `src/app/mates/page.tsx` | COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SHARE-BUTTON, COMPONENT-SC004-FILTER-BAR, COMPONENT-SC004-LIST, COMPONENT-SC004-DETAIL-PANEL, COMPONENT-SC004-APPLY-FLOW, COMPONENT-SC004-REPORT-BLOCK, API-MATES-READ, API-APPLICATIONS, API-BLOCKS, API-REPORTS | `src/app/mates/page.tsx`(신규) | 상세 절 참고 | 상세 절 참고 | 목록·상세 어디에도 전화번호/메신저ID/이메일 노출 없음; 차단 사용자 상호 비노출(RLS) | E2E-MATE-AUTH | P0 |
| 5 | PAGE-SCR005 | `/account` 계정·관리 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-028,REQ-FUNC-029,REQ-FUNC-036,REQ-FUNC-038,REQ-FUNC-040,REQ-FUNC-041,REQ-FUNC-043,REQ-FUNC-045,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-066,REQ-FUNC-070,REQ-FUNC-077,REQ-FUNC-079,REQ-FUNC-080; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-018,REQ-NF-023,REQ-NF-030,REQ-NF-034 | SCR-005 | `/account` | `src/app/account/page.tsx` | COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SC005-AUTH, COMPONENT-SC005-PROFILE, COMPONENT-SC005-MY-ACTIVITY, COMPONENT-SC005-ADMIN, API-AUTH, API-APPLICATIONS, API-BLOCKS, API-ADMIN-SETTINGS, API-ACCOUNT-DELETE, DATA-POLICY-CONTENT | `src/app/account/page.tsx`(신규) | 상세 절 참고 | 상세 절 참고 | 역할 검사는 서버(Server Action)에서 수행; Admin 탭에 통계 대시보드 없음; 정확한 생년월일 미저장 | E2E-MATE-AUTH | P0 |
| 6 | COMPONENT-SHELL-HEADER-FOOTER | 전역 Header/Footer 공용 컴포넌트 | COMPONENT | IMPLEMENT | REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-023 | ALL | - | - | - | `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/app/layout.tsx`(기존 파일 수정) | 5개 Screen 공통 재사용; 로고/내비4개/로그인·아바타; 320px~데스크톱 반응형; 활성 라우트 코랄 밑줄 | 하드코딩 색상 없이 D-001 토큰만 사용 | 개인정보 미포함 | MANUAL-CHECK-ACCESSIBILITY | P0 |
| 7 | COMPONENT-ERROR-STATES | 404/오류 화면 | COMPONENT | IMPLEMENT | REQ-FUNC-078 | - | `*` | `src/app/not-found.tsx` | COMPONENT-SHELL-HEADER-FOOTER | `src/app/not-found.tsx`, `src/app/error.tsx` | 홈/이전/재시도 중 최소 1개 복구 행동 제공 | Lorem ipsum/Placeholder 금지 | - | MANUAL-CHECK-RESPONSIVE-DENSITY | P1 |
| 8 | COMPONENT-SEO-METADATA | 페이지별 SEO metadata 헬퍼 | COMPONENT | IMPLEMENT | REQ-FUNC-070; REQ-NF-030 | ALL | - | - | - | `src/lib/seo.ts` | 5개 Page Entry 각각 `generateMetadata`로 title/description/canonical/OG 제공 | - | - | E2E-PUBLIC-SMOKE(메타 존재 확인) | P1 |
| 9 | COMPONENT-FAVORITES-LOCALSTORAGE | 여행지 즐겨찾기(localStorage) | COMPONENT | IMPLEMENT | REQ-FUNC-068 | SCR-001 | - | - | - | `src/lib/favorites.ts`, `src/components/destination/FavoriteButton.tsx` | 지정 구현 방법: `localStorage`만 사용, 서버 저장 없음; 중복 즐겨찾기 생성 안 됨(Set 기반) | 채움/빈 하트 아이콘 상태 명확히 구분 | 서버·DB 전송 없음 | UNIT 없음(수동 QA) | P2 |
| 10 | COMPONENT-SHARE-BUTTON | URL 공유 버튼 | COMPONENT | IMPLEMENT | REQ-FUNC-069 | SCR-001, SCR-002, SCR-004 | - | - | - | `src/components/common/ShareButton.tsx` | Web Share API 우선, 실패 시 클립보드 복사 폴백 | 복사 완료 Toast 표시 | - | MANUAL-CHECK-EXTERNAL-LINKS | P2 |
| 11 | COMPONENT-SC001-HERO-SEARCH | SCR-001 Hero + 통합 검색 | COMPONENT | IMPLEMENT | REQ-FUNC-003,REQ-FUNC-067 | SCR-001 | - | - | DATA-DESTINATIONS | `src/components/home/HeroSearch.tsx` | 한글 부분 일치 검색; 뷰포트 60~70% 높이 제한 | 결과 없음 상태는 GRID에서 처리 | - | E2E-PUBLIC-SMOKE | P0 |
| 12 | COMPONENT-SC001-DESTINATION-GRID | 국내/해외 Card Grid + 테마 Chip + 필터 | COMPONENT | IMPLEMENT | REQ-FUNC-001,REQ-FUNC-002,REQ-FUNC-005,REQ-FUNC-007,REQ-FUNC-010 | SCR-001 | - | - | DATA-DESTINATIONS | `src/components/home/DestinationGrid.tsx`, `src/components/home/ThemeChips.tsx` | 국내 6·해외 6·테마 6 카드; AND 필터; URL query 상태 반영; 빈 결과 시 조건완화 안내+초기화 버튼 | 이미지 alt는 실제 장소 설명 문장 | - | E2E-PUBLIC-SMOKE | P0 |
| 13 | COMPONENT-SC001-DRAWER-SHELL | 여행지/안전정보 공용 Drawer | COMPONENT | IMPLEMENT | REQ-FUNC-004,REQ-FUNC-006,REQ-FUNC-009,REQ-FUNC-047,REQ-FUNC-048,REQ-FUNC-049,REQ-FUNC-050,REQ-FUNC-051,REQ-FUNC-052,REQ-FUNC-053,REQ-FUNC-054; REQ-NF-028 | SCR-001 | - | - | DATA-DESTINATIONS, DATA-SAFETY | `src/components/drawer/DetailDrawer.tsx`, `src/components/drawer/DestinationDetail.tsx`, `src/components/drawer/SafetyDetail.tsx` | 여행지 상세 필수 10종 필드; 안전정보 8개 카테고리+경보배지+stale(7일) 계산; 관련 여행지 최대 6 | 중대 경보는 텍스트로도 표시(색상 단독 금지) | 외부 출처 링크 `noopener,noreferrer` | E2E-PUBLIC-SMOKE | P0 |
| 14 | COMPONENT-SC001-MATE-TEASER | 최근 동행글 3개/Empty State | COMPONENT | IMPLEMENT | - | SCR-001 | - | - | API-MATES-READ | `src/components/home/MateTeaser.tsx` | 모집중 글 최대 3개 또는 완성형 Empty State | Placeholder 문구 금지 | 연락처 비노출 | 수동 QA | P1 |
| 15 | COMPONENT-SC001-ABOUT-TEASER | 대표 소개 요약 카드 | COMPONENT | IMPLEMENT | REQ-FUNC-057 | SCR-001 | - | - | DATA-REPRESENTATIVE | `src/components/home/AboutTeaser.tsx` | `50+ Trips`/`30+ Countries` 홈·About 값 일치 | - | - | 수동 QA | P2 |
| 16 | COMPONENT-SC002-PROFILE-HERO-STATS | Profile Hero + 지표 3개 | COMPONENT | IMPLEMENT | REQ-FUNC-057,REQ-FUNC-058 | SCR-002 | - | - | DATA-REPRESENTATIVE | `src/components/about/ProfileHero.tsx`, `src/components/about/StatCards.tsx` | 소개문·철학 문단, 지표 3개(50+/30+/활동연차) | - | - | E2E-PUBLIC-SMOKE | P1 |
| 17 | COMPONENT-SC002-TIMELINE | 여행 Timeline | COMPONENT | IMPLEMENT | REQ-FUNC-060 | SCR-002 | - | - | DATA-REPRESENTATIVE | `src/components/about/Timeline.tsx` | 최소 6개 항목(연도/장소/한줄요약) | - | - | 수동 QA | P1 |
| 18 | COMPONENT-SC002-COUNTRY-CHIPS | 방문국가 30개 권역별 Chip | COMPONENT | IMPLEMENT | REQ-FUNC-059 | SCR-002 | - | - | DATA-REPRESENTATIVE | `src/components/about/CountryChips.tsx` | 30개국, 4권역(아시아/유럽/북미/오세아니아) 그룹 | - | - | 수동 QA | P1 |
| 19 | COMPONENT-SC002-GALLERY | 여행 사진 Gallery 8장 | COMPONENT | IMPLEMENT | REQ-FUNC-061 | SCR-002 | - | - | DATA-REPRESENTATIVE | `src/components/about/Gallery.tsx` | 서로 다른 장소 8장, Desktop 4열/Mobile 2열 | alt는 장소 설명 문장; 라이선스 메타 없으면 플레이스홀더 | - | 수동 QA | P2 |
| 20 | COMPONENT-SC002-PICKS-CTA | 추천 여행지 4 + CTA 배너 | COMPONENT | IMPLEMENT | REQ-FUNC-062,REQ-FUNC-063 | SCR-002 | - | - | DATA-REPRESENTATIVE, DATA-DESTINATIONS | `src/components/about/TopPicks.tsx` | 추천 4개, 비공개 여행지 자동 제외; CTA 2개(`/travel-tools`,`/mates`) | - | - | E2E-PUBLIC-SMOKE | P1 |
| 21 | COMPONENT-SC003-TABS-SHELL | 항공/숙소/동행 3-Tab 컨테이너 | COMPONENT | IMPLEMENT | - | SCR-003 | - | - | - | `src/components/travel-tools/TravelToolsTabs.tsx` | 3탭 각각 독립 입력·검증·완료 상태(다른 탭에 영향 없음) | - | - | E2E-TRAVEL-TOOLS | P0 |
| 22 | COMPONENT-SC003-FLIGHT-FORM | 항공 조건 Form+요약+외부이동 | COMPONENT | IMPLEMENT | REQ-FUNC-011,REQ-FUNC-012,REQ-FUNC-013,REQ-FUNC-014,REQ-FUNC-015,REQ-FUNC-016,REQ-FUNC-017,REQ-FUNC-018,REQ-FUNC-054; REQ-NF-017 | SCR-003 | - | - | COMPONENT-SC003-TABS-SHELL | `src/components/travel-tools/FlightForm.tsx`, `src/components/travel-tools/SummaryCard.tsx` | 국가·지역·출발일·귀국일; 과거/역전 날짜 차단; 요약 후 새 탭 외부이동(`noopener,noreferrer`) | 비전달 고지 문구 상시 노출 | 입력값 서버·DB·URL query 미전송(클라이언트 상태 한정) | UNIT-TRAVEL-DATES, E2E-TRAVEL-TOOLS | P0 |
| 23 | COMPONENT-SC003-HOTEL-FORM | 숙소 조건 Form+요약+외부이동 | COMPONENT | IMPLEMENT | REQ-FUNC-019,REQ-FUNC-020,REQ-FUNC-021,REQ-FUNC-022,REQ-FUNC-023,REQ-FUNC-024,REQ-FUNC-025,REQ-FUNC-026; REQ-NF-017 | SCR-003 | - | - | COMPONENT-SC003-TABS-SHELL | `src/components/travel-tools/HotelForm.tsx` | 국가·지역·체크인·체크아웃; 체크아웃≤체크인 차단; 요약 후 새 탭 외부이동 | 비전달 고지 문구 상시 노출 | 입력값 서버·DB·URL query 미전송 | UNIT-TRAVEL-DATES, E2E-TRAVEL-TOOLS | P0 |
| 24 | COMPONENT-SC003-MATE-WRITE | 동행 작성 Tab(로그인안내/Form) | COMPONENT | IMPLEMENT | REQ-FUNC-027,REQ-FUNC-028,REQ-FUNC-031,REQ-FUNC-032,REQ-FUNC-080 | SCR-003 | - | - | COMPONENT-SC003-TABS-SHELL, API-MATES-WRITE, API-AUTH, DATA-POLICY-CONTENT | `src/components/travel-tools/MateWriteForm.tsx` | 비로그인/미성년: 로그인·성인확인 안내; 로그인 성인회원: 제목/국가/지역/기간/인원/스타일/설명 Form + 안전수칙 동의 체크박스 | 연락처 패턴 탐지 시 인라인 오류 안내 | 정확한 생년월일 미저장(`is_adult`,`adult_verified_at`만) | UNIT-CONTACT-DETECTION, E2E-MATE-AUTH | P0 |
| 25 | COMPONENT-SC004-FILTER-BAR | 동행 목록 Filter+결과요약 | COMPONENT | IMPLEMENT | REQ-FUNC-030 | SCR-004 | - | - | API-MATES-READ | `src/components/mates/FilterBar.tsx` | 국가/지역/기간겹침/연령대/성별/스타일/모집상태 AND 필터 | "N개의 모집글" 요약 텍스트 | 차단 사용자 글 결과 제외 | E2E-MATE-AUTH | P0 |
| 26 | COMPONENT-SC004-LIST | 동행글 목록(최대 8, 우선노출) | COMPONENT | IMPLEMENT | REQ-FUNC-033,REQ-FUNC-037 | SCR-004 | - | - | API-MATES-READ | `src/components/mates/MatePostList.tsx`, `src/components/mates/MatePostCard.tsx` | 제목/국가·기간/인원/상태 배지; 종료일 경과 글은 조회 시 CLOSED로 표시 | 완성형 Empty State(설명+이용방법+CTA) | 연락처 비노출(select 컬럼 제한) | E2E-MATE-AUTH | P0 |
| 27 | COMPONENT-SC004-DETAIL-PANEL | 동행 상세 패널(Desktop 분할/Mobile Drawer) | COMPONENT | IMPLEMENT | REQ-FUNC-033,REQ-FUNC-037 | SCR-004 | - | - | API-MATES-READ | `src/components/mates/MateDetailPanel.tsx` | Desktop 좌40/우60 분할, Mobile 하단 Drawer | 연락처 비노출 | RLS로 비공개 정보 필터링 | E2E-MATE-AUTH | P0 |
| 28 | COMPONENT-SC004-APPLY-FLOW | 참가 메시지 제출 | COMPONENT | IMPLEMENT | REQ-FUNC-034,REQ-FUNC-035,REQ-FUNC-043; REQ-NF-019 | SCR-004 | - | - | API-APPLICATIONS | `src/components/mates/ApplyForm.tsx` | 500자 이하 메시지, PENDING 저장; 중복요청 차단 오류 | 제출 성공 Toast(REQ-FUNC-043 지정 구현: 실제 이메일 대신 Toast) | 요청 내용은 작성자/요청자만 열람(RLS) | E2E-MATE-AUTH | P0 |
| 29 | COMPONENT-SC004-REPORT-BLOCK | 신고/차단 버튼 | COMPONENT | IMPLEMENT | REQ-FUNC-039,REQ-FUNC-040; REQ-NF-019 | SCR-004 | - | - | API-REPORTS, API-BLOCKS | `src/components/mates/ReportButton.tsx`, `src/components/mates/BlockButton.tsx` | 신고 접수 3초 이내 접수번호 표시; 차단 후 상호 비노출 | Toast로 접수 확인 | 신고 상세는 관리자만 열람 | E2E-MATE-AUTH | P0 |
| 30 | COMPONENT-SC005-AUTH | Guest 인증 Tab | COMPONENT | IMPLEMENT | REQ-FUNC-066 | SCR-005 | - | - | API-AUTH | `src/components/account/AuthPanel.tsx` | 이메일 가입/인증/로그인/로그아웃/재설정 | 미인증 계정은 동행 쓰기 권한 없음 UI 반영 | 비밀번호 등 민감정보 클라이언트 로그 미노출 | E2E-MATE-AUTH | P0 |
| 31 | COMPONENT-SC005-PROFILE | Member 프로필 Tab | COMPONENT | IMPLEMENT | REQ-FUNC-028,REQ-FUNC-029 | SCR-005 | - | - | API-AUTH | `src/components/account/ProfilePanel.tsx` | 닉네임/연령대 필수, 성별 선택, 스타일 필수, 성인확인 배지 | - | 정확한 생년월일 미저장 | E2E-MATE-AUTH | P0 |
| 32 | COMPONENT-SC005-MY-ACTIVITY | Member 내 활동 Tab | COMPONENT | IMPLEMENT | REQ-FUNC-036,REQ-FUNC-038,REQ-FUNC-040,REQ-FUNC-043,REQ-FUNC-045; REQ-NF-018 | SCR-005 | - | - | API-APPLICATIONS, API-BLOCKS, API-MATES-WRITE, API-ACCOUNT-DELETE | `src/components/account/MyActivityPanel.tsx` | 내 글 수정/마감, 받은 요청 승인/거절, 차단 목록 해제, 탈퇴(즉시 비식별화) | 완성형 Empty State(글/요청/차단 각각) | 탈퇴 시 개인정보 최소 보존 원칙 | E2E-MATE-AUTH | P0 |
| 33 | COMPONENT-SC005-ADMIN | Admin 관리자 Tab | COMPONENT | IMPLEMENT | REQ-FUNC-041,REQ-FUNC-077 | SCR-005 | - | - | API-REPORTS, API-ADMIN-SETTINGS | `src/components/account/AdminPanel.tsx` | 신고 상태 필터(OPEN/REVIEWING/RESOLVED/DISMISSED)+카드; 항공·숙소 외부 URL HTTPS 저장 | 통계 대시보드/차트 없음 | HTTP·javascript: URL 저장 거부 | 수동 QA | P1 |
| 34 | API-MATES-READ | 동행글 목록/상세 조회 | API | IMPLEMENT | REQ-FUNC-030,REQ-FUNC-033,REQ-FUNC-037,REQ-FUNC-044 | SCR-001, SCR-004 | - | - | DB-SCHEMA-BASE, DB-RLS-BASE | `src/lib/server/mates.ts` | 필터+겹침기간+차단제외 쿼리; p95 목표 1초(정식 부하측정 제외) | - | RLS로 비공개 필드 제한 | TEST-RLS-BASIC | P0 |
| 35 | API-MATES-WRITE | 동행글 생성/수정/마감 | API | IMPLEMENT | REQ-FUNC-031,REQ-FUNC-035,REQ-FUNC-038,REQ-FUNC-044; REQ-NF-021 | SCR-003, SCR-005 | - | - | DB-SCHEMA-BASE, DB-ACCESS | `src/app/api/mates/route.ts`, `src/lib/server/mates.ts` | 필수값/날짜검증 서버측 재검증; 중복 활성 요청 unique 제약 연동 | - | 동일 사용자 과다 생성 간단 rate limit | UNIT-MATE-STATE | P0 |
| 36 | API-APPLICATIONS | 참가요청 생성/승인/거절 | API | IMPLEMENT | REQ-FUNC-034,REQ-FUNC-035,REQ-FUNC-036,REQ-FUNC-043,REQ-FUNC-044 | SCR-004, SCR-005 | - | - | DB-SCHEMA-BASE, DB-ACCESS | `src/app/api/mates/[id]/applications/route.ts`, `src/app/api/applications/[id]/route.ts` | 비작성자 상태변경 403; 인앱 알림 상태 1분 이내 생성 | - | RLS: 작성자/요청자만 열람 | UNIT-MATE-STATE, TEST-RLS-BASIC | P0 |
| 37 | API-BLOCKS | 차단 생성/해제 | API | IMPLEMENT | REQ-FUNC-040,REQ-FUNC-044 | SCR-004, SCR-005 | - | - | DB-SCHEMA-BASE, DB-ACCESS | `src/app/api/blocks/route.ts` | 차단 즉시 상호 콘텐츠 비노출 반영 | - | RLS 적용 | TEST-RLS-BASIC | P0 |
| 38 | API-REPORTS | 신고 생성/관리자 상태변경 | API | IMPLEMENT | REQ-FUNC-039,REQ-FUNC-041,REQ-FUNC-044; REQ-NF-019 | SCR-004, SCR-005 | - | - | DB-SCHEMA-BASE, DB-ACCESS | `src/app/api/reports/route.ts`, `src/app/api/admin/reports/[id]/route.ts` | 신고 3초 이내 접수; 상태 필터 조회 | - | 신고 상세 Moderator/Admin만 열람(RLS) | TEST-RLS-BASIC | P0 |
| 39 | API-ADMIN-SETTINGS | 외부 URL 설정 저장 | API | IMPLEMENT | REQ-FUNC-077 | SCR-005 | - | - | DB-SCHEMA-BASE, DB-ACCESS | `src/app/api/admin/settings/outbound/route.ts` | HTTPS+허용목록만 저장 | - | HTTP/`javascript:`/`data:` 거부 | 수동 QA | P1 |
| 40 | API-AUTH | 이메일 가입/인증/로그인/성인확인 | API | IMPLEMENT | REQ-FUNC-027,REQ-FUNC-028,REQ-FUNC-066 | SCR-003, SCR-005 | - | - | DB-SCHEMA-BASE | `src/app/auth/callback/route.ts`, `src/lib/server/auth.ts` | Supabase Auth 세션 검증; 미인증 쓰기 요청 401 | - | 생년월일 미수집, `is_adult`+시각만 저장 | E2E-MATE-AUTH | P0 |
| 41 | API-ACCOUNT-DELETE | 탈퇴/개인정보 삭제 | API | IMPLEMENT | REQ-FUNC-045; REQ-NF-018 | SCR-005 | - | - | DB-SCHEMA-BASE, DB-ACCESS | `src/lib/server/account.ts` | 탈퇴 즉시 프로필 비식별화; 데이터 내보내기 최소 JSON 제공 | - | 분쟁보존 대상 제외 개인정보 처리 | 수동 QA | P1 |
| 42 | DB-SCHEMA-BASE | Supabase 스키마(6테이블 제한) | DB | IMPLEMENT | REQ-FUNC-028,REQ-FUNC-029,REQ-FUNC-031,REQ-FUNC-039,REQ-FUNC-040,REQ-FUNC-041,REQ-FUNC-077 | ALL | - | - | - | `supabase/migrations/0001_schema.sql` | Table: `user_profile`; Table: `mate_post`; Table: `mate_application`; Table: `user_block`; Table: `report`; Table: `admin_setting` — 6개 초과 금지 | - | 감사 로그/미디어/콘텐츠 테이블 생성 안 함(정적 데이터로 대체) | TEST-RLS-BASIC | P0 |
| 43 | DB-RLS-BASE | RLS 정책 | DB | IMPLEMENT | REQ-FUNC-044; REQ-NF-013 | ALL | - | - | DB-SCHEMA-BASE | `supabase/migrations/0002_rls.sql` | 본인/작성자/Moderator/Admin만 비공개 데이터 열람 | - | 권한별 부정 접근 테스트 전부 403/빈 결과 | TEST-RLS-BASIC | P0 |
| 44 | DB-ACCESS | Supabase 클라이언트/서버 접근 레이어 | DB | IMPLEMENT | REQ-FUNC-017,REQ-FUNC-025,REQ-FUNC-044; REQ-NF-014,REQ-NF-015,REQ-NF-016,REQ-NF-017 | ALL | - | - | DB-SCHEMA-BASE, DB-RLS-BASE | `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts` | Server Action 기본 CSRF 보호, 입력 검증(zod 등)로 XSS 방지 | - | 비밀키 환경변수만 사용, 클라이언트 번들 미포함; 항공·숙소 입력 미저장 | TEST-RLS-BASIC | P0 |
| 45 | DB-SEED-BASE | 개발/테스트 시드 데이터 | DB | IMPLEMENT (지원) | - | ALL | - | - | DB-SCHEMA-BASE | `supabase/seed.sql` | E2E/수동QA용 최소 계정·동행글·신고 시드 | - | 실 개인정보 미포함(가상 데이터만) | E2E-MATE-AUTH | P2 |
| 46 | DATA-DESTINATIONS | 여행지 정적 데이터 | DATA | IMPLEMENT | REQ-FUNC-001,REQ-FUNC-002,REQ-FUNC-003,REQ-FUNC-004,REQ-FUNC-005,REQ-FUNC-007,REQ-FUNC-008,REQ-FUNC-009,REQ-FUNC-010; REQ-NF-026 | SCR-001, SCR-002 | - | - | - | `src/data/destinations.ts` | 국내 10곳 이상, 해외 15개국 30개 도시 이상; 필수 10종 필드 TS 타입 강제 | 이미지 alt 필드 필수 | - | 수동 데이터 검수 | P0 |
| 47 | DATA-SAFETY | 국가 안전정보 정적 데이터 | DATA | IMPLEMENT | REQ-FUNC-046,REQ-FUNC-047,REQ-FUNC-048,REQ-FUNC-049,REQ-FUNC-050,REQ-FUNC-051,REQ-FUNC-052,REQ-FUNC-053,REQ-FUNC-054; REQ-NF-027,REQ-NF-028 | SCR-001 | - | - | - | `src/data/safety.ts` | 게시 해외국가 전체 커버리지; 8개 카테고리+출처+최종확인일 TS 타입 강제 | - | - | 수동 데이터 검수 | P0 |
| 48 | DATA-REPRESENTATIVE | 대표(About) 정적 데이터 | DATA | IMPLEMENT | REQ-FUNC-057,REQ-FUNC-058,REQ-FUNC-059,REQ-FUNC-060,REQ-FUNC-061,REQ-FUNC-062,REQ-FUNC-063 | SCR-001, SCR-002 | - | - | - | `src/data/profile.ts` | `50+ Trips`/`30+ Countries` 단일 소스, Timeline 6+, 방문국가 30 | 이미지 alt 필드 필수 | - | 수동 데이터 검수 | P1 |
| 49 | DATA-POLICY-CONTENT | 이용약관·개인정보·안전수칙·면책 정적 콘텐츠 | DATA | IMPLEMENT | REQ-FUNC-080 | SCR-003, SCR-005 | - | - | - | `src/data/policies.ts` | 정책 버전 필드 포함(동의 시각 기록용) | - | - | 수동 QA | P1 |
| 50 | UNIT-TRAVEL-DATES | 날짜 검증 단위 테스트 | UNIT | IMPLEMENT | REQ-FUNC-013,REQ-FUNC-021 | SCR-003 | - | - | COMPONENT-SC003-FLIGHT-FORM, COMPONENT-SC003-HOTEL-FORM | `src/lib/validation/travelDates.test.ts` | 과거일/역전일/동일일 경계값 전부 차단 검증 | - | - | CI | P0 |
| 51 | UNIT-CONTACT-DETECTION | 공개 연락처 탐지 단위 테스트 | UNIT | IMPLEMENT | REQ-FUNC-032 | SCR-003 | - | - | COMPONENT-SC003-MATE-WRITE | `src/lib/validation/contactDetection.test.ts` | 전화번호/이메일/메신저ID 패턴 탐지율 95%+, 오탐 5%- 기준 테스트셋 | - | - | CI | P0 |
| 52 | UNIT-MATE-STATE | 동행글/요청 상태 전이 단위 테스트 | UNIT | IMPLEMENT | REQ-FUNC-035,REQ-FUNC-036,REQ-FUNC-037,REQ-FUNC-038 | SCR-004 | - | - | API-MATES-WRITE, API-APPLICATIONS | `src/lib/mates/state.test.ts` | OPEN/CLOSED, PENDING/ACCEPTED/REJECTED 전이 규칙 검증 | - | - | CI | P0 |
| 53 | TEST-RLS-BASIC | Supabase RLS 통합 테스트 | INTEGRATION | IMPLEMENT | REQ-FUNC-044; REQ-NF-013 | ALL | - | - | DB-RLS-BASE | `supabase/tests/rls.test.ts` | 역할별(Guest/Member/작성자/Moderator/Admin) 접근 시나리오 전부 통과 | - | 부정 접근 전부 403/빈 결과 | CI | P0 |
| 54 | E2E-PUBLIC-SMOKE | Chromium Smoke: 공개 탐색 흐름 | E2E | IMPLEMENT | REQ-FUNC-001,REQ-FUNC-004,REQ-FUNC-006,REQ-FUNC-047,REQ-FUNC-050,REQ-FUNC-057,REQ-FUNC-063 | SCR-001, SCR-002 | - | - | PAGE-SCR001, PAGE-SCR002 | `e2e/public-smoke.spec.ts` | 여행지 목록→필터→상세 Drawer→안전정보 Drawer 전환, About 이동 3개 흐름 | - | - | Chromium 단일 실행(CI) | P0 |
| 55 | E2E-TRAVEL-TOOLS | Chromium Smoke: 항공·숙소·동행 도구 흐름 | E2E | IMPLEMENT | REQ-FUNC-011,REQ-FUNC-013,REQ-FUNC-016,REQ-FUNC-017,REQ-FUNC-019,REQ-FUNC-021,REQ-FUNC-024,REQ-FUNC-025,REQ-FUNC-027 | SCR-003 | - | - | PAGE-SCR003 | `e2e/travel-tools.spec.ts` | 항공/숙소 입력→검증→요약→외부 새 탭 이동 확인, 동행 탭 로그인 안내 2개 흐름 | - | 네트워크 로그에 입력값 없음 확인 | Chromium 단일 실행(CI) | P0 |
| 56 | E2E-MATE-AUTH | Chromium Smoke: 가입~동행~신고 흐름 | E2E | IMPLEMENT | REQ-FUNC-027,REQ-FUNC-028,REQ-FUNC-031,REQ-FUNC-032,REQ-FUNC-034,REQ-FUNC-036,REQ-FUNC-039,REQ-FUNC-040,REQ-FUNC-043,REQ-FUNC-045,REQ-FUNC-066 | SCR-003, SCR-004, SCR-005 | - | - | PAGE-SCR003, PAGE-SCR004, PAGE-SCR005 | `e2e/mate-auth.spec.ts` | 가입·성인확인→동행글 작성(연락처탐지)→참가요청→승인/거절→신고/차단→내활동 확인 1개 흐름 | - | - | Chromium 단일 실행(CI) | P0 |
| 57 | MANUAL-CHECK-ACCESSIBILITY | 접근성 수동 점검 | MANUAL_CHECK | IMPLEMENT | REQ-FUNC-079; REQ-NF-024,REQ-NF-025 | ALL | - | - | PAGE-SCR001, PAGE-SCR002, PAGE-SCR003, PAGE-SCR004, PAGE-SCR005 | 없음(체크리스트 기반 수동 점검) | axe serious/critical 0건, 키보드·스크린리더로 핵심 UC 완료 | - | - | 브라우저 수동 확인 | P1 |
| 58 | MANUAL-CHECK-RESPONSIVE-DENSITY | 반응형 콘텐츠 밀도 점검 | MANUAL_CHECK | IMPLEMENT | REQ-FUNC-065 | ALL | - | - | PAGE-SCR001, PAGE-SCR002, PAGE-SCR003, PAGE-SCR004, PAGE-SCR005 | 없음(체크리스트 기반 수동 점검) | 1440px/390px에서 Hero 다음 Section 노출, 큰 빈 영역 없음, Empty State 완성도 확인 | - | - | 브라우저 수동 확인 | P1 |
| 59 | MANUAL-CHECK-EXTERNAL-LINKS | 외부 링크 새 탭 동작 점검 | MANUAL_CHECK | IMPLEMENT | REQ-FUNC-016,REQ-FUNC-018,REQ-FUNC-024,REQ-FUNC-026 | SCR-003 | - | - | PAGE-SCR003 | 없음(체크리스트 기반 수동 점검) | 항공·숙소 CTA가 새 탭+`noopener,noreferrer`로 열림, opener 접근 불가 확인 | - | - | 브라우저 수동 확인 | P1 |
| 60 | OPS-CI-PIPELINE | CI 파이프라인(빌드/lint/유닛/E2E) | OPS | IMPLEMENT | REQ-NF-007,REQ-NF-031 | ALL | - | - | UNIT-TRAVEL-DATES, UNIT-CONTACT-DETECTION, UNIT-MATE-STATE, TEST-RLS-BASIC, E2E-PUBLIC-SMOKE, E2E-TRAVEL-TOOLS, E2E-MATE-AUTH | `.github/workflows/ci.yml` | main 병합 전 TS strict+lint+유닛+E2E 통과 필수; 배포 전 Lighthouse 수동 참고 확인 | - | - | CI 실행 로그 | P1 |
| 61 | OPS-VERCEL-SUPABASE-CHECK | Vercel/Supabase 배포·비용 확인 | OPS | IMPLEMENT | REQ-NF-012,REQ-NF-034 | ALL | - | - | OPS-CI-PIPELINE | 없음(배포 콘솔/청구 확인) | Vercel Hobby/Pro + Supabase Free tier만 사용, EC2/AWS 미사용 확인; HTTPS/TLS 플랫폼 기본 제공 확인 | - | - | 배포 콘솔 수동 확인 | P1 |

---

## Page Owner Acceptance Criteria 상세

### PAGE-SCR001 — `/`

**Functional AC (Section 순서·데이터 출처·최소 콘텐츠 수, 규칙 17)**
1. Hero(통합 검색 + `/travel-tools` CTA) — 뷰포트 60~70% 높이, 데이터 출처: 없음(정적 문구+검색 입력)
2. 국내 여행지 Card Grid **6개** — 데이터 출처: `src/data/destinations.ts`(scope=DOMESTIC)
3. 해외 여행지 Card Grid **6개** — 데이터 출처: `src/data/destinations.ts`(scope=OVERSEAS)
4. 여행 동기·테마 Chip **6개** — 데이터 출처: `src/data/destinations.ts`의 theme 집계
5. 국가별 주의사항 List Card **6개** — 데이터 출처: `src/data/safety.ts`
6. 최근 동행글 Card **3개** 또는 완성형 Empty State — 데이터 출처: `API-MATES-READ`(Supabase)
7. free_traveler 소개(지표+CTA) — 데이터 출처: `src/data/profile.ts`

**반응형 밀도:** Desktop 컨테이너 1200~1280px, Card Grid 3열, Section 여백 80px. Mobile Card Grid 1열, Section 여백 48px, Hero 다음 Section 제목이 스크롤 없이 보여야 함.

**Visual AC (규칙 18)**
- Lorem ipsum, `준비 중`, `정보 확인 필요` 문구를 어디에도 쓰지 않는다.
- 내용 없는 빈 Card를 만들지 않는다.
- 동행글 0건 시에도 ① "아직 등록된 동행글이 없어요" 같은 상황 설명 ② 이용 방법 1문장 ③ "동행 모집 시작하기" 등 CTA를 갖춘 완성형 Empty State를 표시한다.
- Loading: Card Grid/List Card는 실제 카드와 동일 크기의 스켈레톤(`surface-strong`)으로 표시해 레이아웃 시프트를 만들지 않는다(D-001 Loading 규칙).
- Error: 여행지·안전정보·최근 동행글 데이터 로딩 실패 시 인라인 오류 배너(원인 설명 1문장 + 재시도 버튼)로 대체하고 화면 전체를 비우지 않는다(D-001 Error 규칙).

### PAGE-SCR002 — `/about`

**Functional AC**
1. Profile Hero — 데이터 출처: `src/data/profile.ts`
2. 여행 지표 3개(50+ Trips/30+ Countries/활동연차) — 데이터 출처: `src/data/profile.ts`
3. 소개·철학 3문단 — 데이터 출처: `src/data/profile.ts`
4. Timeline **6개 이상** — 데이터 출처: `src/data/profile.ts`
5. 방문 국가 **30개**(권역별 Chip) — 데이터 출처: `src/data/profile.ts`
6. Gallery **8장** — 데이터 출처: `src/data/profile.ts`
7. 기억에 남는 여행지 **4개** + CTA — 데이터 출처: `src/data/profile.ts` + `src/data/destinations.ts`(slug 유효성 필터)

**반응형 밀도:** Desktop Gallery 4열, 소개 좌우 분할. Mobile Gallery 2열, 좌우 분할→세로 스택, Section 여백 48px.

**Visual AC:** Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. 정적 콘텐츠만 다루므로 Empty/Error 상태는 정의하지 않되, 콘텐츠 미완성 시 배포하지 않는다. Loading: Gallery/Timeline/Chip 목록은 실제 콘텐츠와 동일 크기의 스켈레톤으로 표시해 레이아웃 시프트를 만들지 않는다(D-001 Loading 규칙).

### PAGE-SCR003 — `/travel-tools`

**Functional AC**
1. Intro(이용 순서 3단계) — 데이터 출처: 없음(정적 문구)
2. Tab(항공편/숙소/동행 구하기) — 데이터 출처: 없음(UI 상태)
3. 여행 정보 입력 Form — 데이터 출처: 없음(클라이언트 상태만, 서버 미전송)
4. 입력 요약 + 외부 이동 CTA — 데이터 출처: 없음(클라이언트 상태)
5. 비전달 고지 + Tip **3개** — 데이터 출처: 정적 문구
6. 동행 탭: 로그인 안내 또는 작성 Form + 안전 안내 — 데이터 출처: `API-AUTH`, `API-MATES-WRITE`, `src/data/policies.ts`

**반응형 밀도:** Desktop Form 2열, 요약 Action Card 우측. Mobile Form 1열, Tab 가로 스크롤. 세 Tab은 서로 독립된 입력·검증·완료 상태를 유지한다.

**Visual AC:** Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. Tip 3개는 각각 구체적 문구를 채우고 자리표시자를 쓰지 않는다. 탭별 Loading(외부 이동 처리 중 스켈레톤/버튼 비활성)과 Error(날짜 검증 실패/외부 URL 오류 시 인라인 오류 배너+재시도)를 UI_CONTRACT SCR-003 상태 정의대로 각 탭에 독립 적용한다(D-001 Loading/Error 규칙).

### PAGE-SCR004 — `/mates`

**Functional AC**
1. Intro + 새 동행글 작성 CTA — 데이터 출처: 없음(정적 문구)
2. Filter + 결과 요약 — 데이터 출처: `API-MATES-READ`
3. 동행글 목록(최대 **8개** 우선 노출) — 데이터 출처: `API-MATES-READ`
4. 상세 패널 — 데이터 출처: `API-MATES-READ`
5. 참가 신청 방법 **3단계** 안내 — 데이터 출처: 정적 문구
6. 안전·신고·차단 안내 + CTA — 데이터 출처: 정적 문구 + `API-REPORTS`/`API-BLOCKS`

**반응형 밀도:** Desktop 좌측 40%(목록)+우측 60%(상세) 분할. Mobile 목록→카드 탭→하단 상세 Drawer. Section 여백 Desktop 80px/Mobile 48px.

**Visual AC:** Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. 목록 0건 시 ① 조건 완화 안내 ② 이용 방법 ③ "새 동행글 작성" CTA를 갖춘 완성형 Empty State를 표시한다. Loading: 목록/상세 패널은 실제 크기와 동일한 스켈레톤으로 표시한다(D-001 Loading 규칙). Error: 목록·상세 로딩 실패 시 인라인 오류 배너(원인 설명+재시도)를 표시하고, 비로그인·미성년 참가 신청 시도는 오류 화면 대신 로그인 유도 모달로 대체한다(D-001 Error/Unauthorized 규칙).

### PAGE-SCR005 — `/account`

**Functional AC**
1. Guest: 계정 기능 Intro + 로그인/가입/재설정 Card — 데이터 출처: `API-AUTH`
2. Member: 프로필 + 내 활동(내 글/받은 요청/차단목록) — 데이터 출처: `API-AUTH`, `API-MATES-WRITE`, `API-APPLICATIONS`, `API-BLOCKS`
3. Admin: 관리 Intro + 신고 상태 변경 + 외부 URL 설정 — 데이터 출처: `API-REPORTS`, `API-ADMIN-SETTINGS`

역할에 없는 관리 영역(Tab)은 렌더링하지 않는다(Guest에게 Member/Admin Tab 미노출, Member에게 Admin Tab 미노출).

**반응형 밀도:** Desktop 좌측 세로 Tab. Mobile 상단 가로 Tab/드롭다운. Section 여백 Desktop 80px/Mobile 48px.

**Visual AC:** Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. 내 글/받은 요청/차단 목록이 각각 0건이어도 완성형 Empty State(설명+이용방법+CTA)를 표시한다. Admin 탭에 통계 대시보드·차트를 추가하지 않는다. Loading: 프로필/내 활동/Admin 목록은 실제 크기와 동일한 스켈레톤으로 표시한다(D-001 Loading 규칙). Error: 저장/상태변경 실패 시 인라인 오류 메시지를 표시하고, Guest가 Member/Admin Tab URL에 직접 접근하면 오류 화면 대신 로그인 유도 화면으로 대체한다(D-001 Error/Unauthorized 규칙).

---

## NON_IMPLEMENTATION (EXCLUDED Requirement 등록부)

EXCLUDED로 확정된 20개 Requirement는 구현 Task를 만들지 않되, 아래 표로 추적성을 유지한다.

| Requirement | 근거(PROJECT_SCOPE.md) | 후속 방향 |
|---|---|---|
| REQ-FUNC-042 | "간단한 관리자 탭" 범위 밖 — 경고·콘텐츠 숨김·계정 제한 등 세부 제재와 그 감사 이력은 범용 감사 로그 제외 원칙과 충돌 | 관리자는 `report.status` 변경만 수행(COMPONENT-SC005-ADMIN). 세부 제재 UI가 필요해지면 별도 스코프 승인 후 재검토 |
| REQ-FUNC-055 | 콘텐츠는 정적 데이터(`src/data`)로 관리, 앱 내 Editor/Admin 작성·검수·게시 워크플로 미제공 | 콘텐츠 변경은 코드 수정+배포로 처리. 편집자용 CMS가 필요해지면 별도 프로젝트로 재검토 |
| REQ-FUNC-056 | 변경 이력 DB 보존은 범용 감사 로그 제외 범위 | Git 커밋 이력으로 대체. 별도 이력 DB가 필요해지면 재검토 |
| REQ-FUNC-071 | 행동 분석 이벤트 수집 파이프라인은 반드시 구현할 범위 밖, KPI 측정 인프라 미구축 | 분석 도구 도입 결정 시 새 요구사항으로 별도 승인 |
| REQ-FUNC-072 | 콘텐츠 CRUD/미리보기 관리자 UI는 "전체 콘텐츠 CMS" 제외 대상 | 정적 데이터로 대체 유지. CMS 필요 시 별도 프로젝트 |
| REQ-FUNC-073 | 미디어 업로드 시 출처·라이선스 입력 폼은 "미디어 업로드 워크플로" 제외 대상 | 이미지는 URL+alt만 사용(DATA 태스크). 업로드 워크플로 필요 시 재검토 |
| REQ-FUNC-074 | 게시 전 런타임 완전성 게이트는 CMS 게시 워크플로에 속해 제외 | 정적 데이터 작성 시 TS 타입 강제+수동 검수로 대체 |
| REQ-FUNC-075 | stale 현황 대시보드는 관리자 범위(신고 상태+외부 URL) 밖 | 공개 안전 페이지의 stale 배지(COMPONENT-SC001-DRAWER-SHELL)로 대체 |
| REQ-FUNC-076 | 범용 감사 로그 명시적 제외 | Vercel/Supabase 기본 로그만 사용. 감사 로그 필요 시 별도 승인 |
| REQ-NF-004 | 동시사용자 50명 부하 테스트는 "부하 테스트" 제외 원칙 | 정적 데이터 특성상 실사용 응답은 즉시 처리됨을 수동 확인으로 대체(MANUAL-CHECK-RESPONSIVE-DENSITY 참고) |
| REQ-NF-005 | 쓰기 API 부하 테스트도 동일 제외 원칙 | 단일 요청 기준 응답시간만 참고 확인 |
| REQ-NF-008 | 가용성 SLA 측정·모니터링 체계 미구축 | Vercel/Supabase 기본 가용성에 의존. 모니터링 도입 시 재검토 |
| REQ-NF-009 | 5xx 비율 모니터링 도구 미도입("장애 알림" 제외 원칙) | 동일. Sentry 등 도입 시 별도 승인 |
| REQ-NF-010 | 자동 백업/RPO·RTO 목표 관리 제외 | Supabase 기본 백업 정책에 의존 |
| REQ-NF-011 | 외부 링크 주간 자동 점검 배치 미구현(자동화 인프라 제외) | MANUAL-CHECK-EXTERNAL-LINKS로 대체(비정기 수동 점검) |
| REQ-NF-020 | 24시간 내 90% 1차 검토는 실제 운영 인력의 SLA이며 앱 기능이 아님 | 신고 큐 UI(COMPONENT-SC005-ADMIN)만 제공, 운영 SLA는 조직 프로세스 영역 |
| REQ-NF-022 | Moderator 조치의 감사 이력은 범용 감사 로그 제외 범위 | `report.status` 변경만 단순 기록(감사 이력 없음) |
| REQ-NF-029 | 미디어 라이선스 메타데이터(작가/라이선스타입/URL) 전체 관리는 미디어 워크플로 제외 대상 | alt텍스트+출처URL만 기록(DATA 태스크) |
| REQ-NF-032 | 구조화 로깅 시스템 미구축(범용 로그 인프라 제외) | Vercel 기본 함수 로그만 사용 |
| REQ-NF-033 | 5xx/외부 링크 실패 자동 알림 제외("장애 알림" 제외 원칙) | 자동 알림 없음. 필요 시 별도 모니터링 프로젝트로 승인 |

---

## 완료 조건 자체 점검

- [x] REQ-FUNC-001,REQ-FUNC-002,REQ-FUNC-003,REQ-FUNC-004,REQ-FUNC-005,REQ-FUNC-006,REQ-FUNC-007,REQ-FUNC-008,REQ-FUNC-009,REQ-FUNC-010,REQ-FUNC-011,REQ-FUNC-012,REQ-FUNC-013,REQ-FUNC-014,REQ-FUNC-015,REQ-FUNC-016,REQ-FUNC-017,REQ-FUNC-018,REQ-FUNC-019,REQ-FUNC-020,REQ-FUNC-021,REQ-FUNC-022,REQ-FUNC-023,REQ-FUNC-024,REQ-FUNC-025,REQ-FUNC-026,REQ-FUNC-027,REQ-FUNC-028,REQ-FUNC-029,REQ-FUNC-030,REQ-FUNC-031,REQ-FUNC-032,REQ-FUNC-033,REQ-FUNC-034,REQ-FUNC-035,REQ-FUNC-036,REQ-FUNC-037,REQ-FUNC-038,REQ-FUNC-039,REQ-FUNC-040,REQ-FUNC-041,REQ-FUNC-042,REQ-FUNC-043,REQ-FUNC-044,REQ-FUNC-045,REQ-FUNC-046,REQ-FUNC-047,REQ-FUNC-048,REQ-FUNC-049,REQ-FUNC-050,REQ-FUNC-051,REQ-FUNC-052,REQ-FUNC-053,REQ-FUNC-054,REQ-FUNC-055,REQ-FUNC-056,REQ-FUNC-057,REQ-FUNC-058,REQ-FUNC-059,REQ-FUNC-060,REQ-FUNC-061,REQ-FUNC-062,REQ-FUNC-063,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-066,REQ-FUNC-067,REQ-FUNC-068,REQ-FUNC-069,REQ-FUNC-070,REQ-FUNC-071,REQ-FUNC-072,REQ-FUNC-073,REQ-FUNC-074,REQ-FUNC-075,REQ-FUNC-076,REQ-FUNC-077,REQ-FUNC-078,REQ-FUNC-079,REQ-FUNC-080, REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-004,REQ-NF-005,REQ-NF-006,REQ-NF-007,REQ-NF-008,REQ-NF-009,REQ-NF-010,REQ-NF-011,REQ-NF-012,REQ-NF-013,REQ-NF-014,REQ-NF-015,REQ-NF-016,REQ-NF-017,REQ-NF-018,REQ-NF-019,REQ-NF-020,REQ-NF-021,REQ-NF-022,REQ-NF-023,REQ-NF-024,REQ-NF-025,REQ-NF-026,REQ-NF-027,REQ-NF-028,REQ-NF-029,REQ-NF-030,REQ-NF-031,REQ-NF-032,REQ-NF-033,REQ-NF-034 114개 전부 Task List 또는 NON_IMPLEMENTATION 표에 등장(누락 0건)
- [x] IMPLEMENT 94개 전부 최소 1개 구현 Task와 최소 1개 검증 경로(UNIT/INTEGRATION/E2E/MANUAL_CHECK/OPS)에 연결됨
- [x] EXCLUDED 20개 전부 NON_IMPLEMENTATION 표에 근거+후속 방향 기록, 구현 Task 미생성
- [x] 승인된 5개 Screen 각각 Page Owner Task 정확히 1개(PAGE-SCR001~005)
- [x] 모든 Page Owner Depends On에 같은 Screen의 Component/Data/API Task 포함
- [x] 어떤 Task도 2개 이상의 Page Entry를 동시에 소유하지 않음(Page Owner 외 Task는 Page Entry 열이 전부 `-`)
- [x] SCR-003: 항공(FLIGHT-FORM)/숙소(HOTEL-FORM)/동행 작성(MATE-WRITE) 3개 Component Task로 분리
- [x] SCR-004: 목록(LIST)/필터(FILTER-BAR)/상세(DETAIL-PANEL)/참가(APPLY-FLOW)/신고·차단(REPORT-BLOCK) 분리
- [x] SCR-005: Auth/Profile/My Activity/Admin 4개 Component Task로 분리
- [x] DB-SCHEMA-BASE 테이블 6개(`user_profile`,`mate_post`,`mate_application`,`user_block`,`report`,`admin_setting`) 제한 준수
- [x] UNIT-TRAVEL-DATES, UNIT-CONTACT-DETECTION, UNIT-MATE-STATE, TEST-RLS-BASIC, E2E-PUBLIC-SMOKE, E2E-TRAVEL-TOOLS, E2E-MATE-AUTH 7개 필수 Test Task 전부 존재
- [x] Playwright는 Chromium Smoke Task 3개(E2E-*)로만 구성, 크로스 브라우저·부하 테스트 없음
- [x] CI(OPS-CI-PIPELINE), Vercel/Supabase 확인(OPS-VERCEL-SUPABASE-CHECK) 존재
- [x] EC2/AWS/자동 Merge Runner Task 없음

**빠진 Requirement ID: 없음.** 이 문서를 완료로 보고한다.
