# Free Traveler — UI Contract (Next.js App Router)

**기반 문서:** `docs/03_UI_COVERAGE_ANALYSIS.md`, `docs/04_UIUX_PLAN.md`, `docs/STITCH_VALIDATION_REPORT.md`, `design-reference/D-001/DESIGN.md`
**현재 코드 상태:** `src/app`에는 Next.js 기본 스캐폴드(`layout.tsx`, `page.tsx`, `globals.css`)만 존재. 아래 5개 Screen 전부 신규 구현 대상.

이 문서는 승인된 5개 Screen(SCR-001~005, `docs/STITCH_VALIDATION_REPORT.md`에서 PASS)을 실제 Next.js App Router 구현 계약으로 고정한다. 화면·컴포넌트·상태·이동 관계는 `design-reference/D-001/DESIGN.md`의 토큰·규칙을 그대로 따른다.

---

## SCR-001 — 메인

| 항목 | 내용 |
|---|---|
| **Screen ID** | SCR-001 |
| **Route** | `/` |
| **Page Entry** | `src/app/page.tsx` |
| **분류** | 핵심(Core) |
| **영역 순서** | Header(공통) → Hero(통합 검색+`/travel-tools` CTA) → 국내 여행지 Card Grid(6) → 해외 여행지 Card Grid(6) → 여행 테마 Chip(6) → 국가별 주의사항 List Card(6) → 최근 동행글 Card(3, 또는 완성형 Empty State) → free_traveler 소개(지표+CTA) → Footer(공통) |
| **주요 Component** | `Header`, `Footer`, `SearchBarPill`, `DestinationCard`(국내/해외 2변형), `Chip`, `SafetyListCard`, `MatePostCardMini`, `Drawer`(여행지/안전정보 공용 셸), `StatCard`(50+/30+), `EmptyState` |
| **상태** | Loading(카드 그리드 스켈레톤), Success, Empty(동행글 섹션), Error(여행지/안전정보 로딩 실패 시 인라인 재시도 배너) |
| **사용자 행동** | 통합 검색 입력, 테마 칩 선택(필터), 여행지/안전정보 카드 클릭 → Drawer 열기, 즐겨찾기 토글(localStorage), CTA 클릭 |
| **다른 화면 이동** | Hero CTA → `/travel-tools`, 동행글 섹션 CTA → `/mates`, 대표소개 섹션 CTA → `/about`, Header 로그인 → `/account` |
| **Desktop·Mobile 규칙** | Desktop: 컨테이너 1200~1280px, Hero 높이 뷰포트 60~70%(다음 섹션 제목 노출), Card Grid 3열, Section 여백 80px. Mobile: Hero 여백 48px, Card Grid 1열, Drawer는 하단 Full-height Sheet |
| **금지 기능** | 예약·결제·체크아웃 UI, 광고 배너, 별점, 실시간 항공권/호텔 가격, Airbnb 상표 요소, 콘텐츠 CMS 편집 UI |

## SCR-002 — 대표 소개

| 항목 | 내용 |
|---|---|
| **Screen ID** | SCR-002 |
| **Route** | `/about` |
| **Page Entry** | `src/app/about/page.tsx` |
| **분류** | 보조(Support) |
| **영역 순서** | Header(공통) → Profile Hero → 여행 지표(3) → 소개·철학(3문단) → Timeline(6 이상) → 방문 국가 칩(30, 권역별) → Gallery(8) → 추천 여행지 카드(4)+CTA 배너 → Footer(공통) |
| **주요 Component** | `Header`, `Footer`, `ProfileHero`, `StatCard`, `TimelineItem`, `Chip`(권역 그룹), `GalleryGrid`, `DestinationCardMini`, `CTAButton` |
| **상태** | Loading(스켈레톤), Success. 정적 콘텐츠 특성상 Empty/Error/Unauthorized 상태는 정의하지 않음(콘텐츠 부재 시 배포하지 않음) |
| **사용자 행동** | 추천 여행지 카드 클릭, CTA 버튼 클릭, Gallery 스크롤 |
| **다른 화면 이동** | 추천 여행지 카드 → `/`(해당 여행지 Drawer), CTA 배너 → `/travel-tools`, `/mates` |
| **Desktop·Mobile 규칙** | Desktop: Gallery 4열, 소개 섹션 좌우 분할(사진+텍스트). Mobile: Gallery 2열, 좌우 분할 → 세로 스택, Section 여백 48px |
| **금지 기능** | 예약·결제 UI, Airbnb 상표 요소, 광고/별점, 인물 사진의 상업적 보증 오인 연출, 임의 색상 추가 |

## SCR-003 — 통합 여행 준비

| 항목 | 내용 |
|---|---|
| **Screen ID** | SCR-003 |
| **Route** | `/travel-tools` |
| **Page Entry** | `src/app/travel-tools/page.tsx` |
| **분류** | 핵심(Core) |
| **영역 순서** | Header(공통) → Intro(이용 순서 3단계) → Tab(항공편/숙소/동행 구하기) → 여행 정보 입력 Form → 입력 요약+외부 이동 CTA → 비전달 고지+Tip(3) → 동행 탭: 로그인 안내 또는 작성 Form+안전 안내 → Footer(공통) |
| **주요 Component** | `Header`, `Footer`, `Tabs`, `TextInput`(국가/지역/날짜), `SummaryCard`, `ExternalLinkButton`(새 탭 이동), `TipCard`, `LoginPromptCard`, `MatePostForm`, `SafetyNotice` |
| **상태** | 탭별 독립 Loading/Success/Error/Unauthorized. 항공·숙소 탭: Loading(외부 이동 처리 중), Success(요약 표시), Error(날짜 검증 실패/외부 URL 오류). 동행 탭: Unauthorized(비로그인·미성년), Success(작성 완료 토스트) |
| **사용자 행동** | 탭 전환, 국가·지역·날짜 입력, 요약 확인, 외부 사이트 이동(새 탭), 동행글 작성 제출, 안전수칙 동의 체크 |
| **다른 화면 이동** | 항공/숙소 CTA → 외부 항공·숙소 사이트(새 탭), 동행글 작성 완료 → `/mates`(해당 글 상세), 동행 탭 로그인 안내 → `/account` |
| **Desktop·Mobile 규칙** | Desktop: Form 2열, 요약 Action Card 우측 배치. Mobile: Form 1열, Tab은 가로 스크롤 가능, Section 여백 48px. 세 탭의 입력·검증·완료 상태는 서로 분리되어 유지된다 |
| **금지 기능** | 예약·결제·체크아웃·발권 UI, 실시간 항공권/호텔 가격 표시, 입력값의 서버 저장/외부 URL 쿼리 전달, Airbnb 상표 요소 |

## SCR-004 — 동행 조회

| 항목 | 내용 |
|---|---|
| **Screen ID** | SCR-004 |
| **Route** | `/mates` |
| **Page Entry** | `src/app/mates/page.tsx` |
| **분류** | 핵심(Core) |
| **영역 순서** | Header(공통) → Intro+새 동행글 작성 CTA → Filter+결과 요약 → 동행글 목록(최대 8, 우선 노출) → 상세 패널 → 참가 신청 방법 3단계 → 안전·신고·차단 안내+CTA → Footer(공통) |
| **주요 Component** | `Header`, `Footer`, `FilterBar`, `MatePostCard`, `DetailPanel`, `ApplyMessageForm`, `StepGuide`(3단계), `SafetyBanner`, `ReportButton`, `BlockButton`, `EmptyState` |
| **상태** | Loading, Success, Empty(완성형: 조건 초기화+작성 CTA+이용 방법), Error(목록/상세 로딩 실패 재시도), Unauthorized(비로그인·미성년 참가 신청 시도 시 로그인 유도 모달) |
| **사용자 행동** | 필터 적용, 목록 카드 선택 → 상세 패널 전환, 참가 메시지 제출, 신고/차단 |
| **다른 화면 이동** | 새 동행글 작성 CTA → `/travel-tools`(동행 탭), 로그인 유도 → `/account`, 내 활동에서 요청 관리 → `/account`(내 활동 탭) |
| **Desktop·Mobile 규칙** | Desktop: 좌측 40%(목록)+우측 60%(상세) 분할. Mobile: 목록 → 카드 탭 → 하단 상세 Drawer. Section 여백 Desktop 80px / Mobile 48px |
| **금지 기능** | 공개 연락처(전화번호/메신저ID/이메일) 노출, 예약·결제 UI, 광고/별점/실시간 가격, Airbnb 상표 요소 |

## SCR-005 — 계정·관리

| 항목 | 내용 |
|---|---|
| **Screen ID** | SCR-005 |
| **Route** | `/account` |
| **Page Entry** | `src/app/account/page.tsx` |
| **분류** | 핵심(Core) |
| **영역 순서** | Header(공통) → 역할별 Tab(Guest: 로그인/가입/비밀번호 재설정 / Member: 프로필, 내 활동 / Admin: 관리자) — 역할에 없는 Tab은 렌더링하지 않음 → Footer(공통) |
| **주요 Component** | `Header`, `Footer`, `AuthForm`, `ProfileForm`, `MatePostManageCard`, `ApplicationCard`(승인/거절), `BlockListItem`, `AdminReportQueue`(상태 필터+카드), `ExternalUrlForm`(항공/숙소 URL), `EmptyState` |
| **상태** | Loading, Success, Empty(내 글/받은 요청/차단 목록 각각 완성형 Empty State), Error(저장/상태변경 실패 인라인 메시지), Unauthorized(Guest가 Member/Admin 탭 URL 직접 접근 시 로그인 유도 화면으로 대체) |
| **사용자 행동** | 로그인/가입/비밀번호 재설정, 프로필 수정, 내 동행글 수정/마감, 참가 요청 승인/거절, 차단 해제, (Admin) 신고 상태 변경, (Admin) 외부 URL 저장 |
| **다른 화면 이동** | 내 글/받은 요청 클릭 → `/mates`(해당 글 상세), "새 동행글 작성" → `/travel-tools`(동행 탭) |
| **Desktop·Mobile 규칙** | Desktop: 좌측 세로 Tab 내비게이션. Mobile: 상단 가로 Tab 또는 드롭다운으로 전환. Section 여백 Desktop 80px / Mobile 48px |
| **금지 기능** | 통계 대시보드·차트(Admin 영역 포함), 예약·결제 UI, Airbnb 상표 요소, 임의 색상 추가 |

---

## 공통 규칙 요약

- Header·Footer는 5개 Screen에서 동일 컴포넌트를 재사용한다(개별 구현 금지).
- Drawer/Modal 셸은 SCR-001의 여행지/안전정보 상세에서 공유되며, 다른 Screen에서 새로운 elevation 패턴을 만들지 않는다.
- 모든 색상·타이포·spacing·radius·shadow 값은 `design-reference/D-001/DESIGN.md` 토큰만 사용한다.
- 인증·역할 검사(Adult Member, Admin)는 서버 측(Server Action/Route Handler)에서 수행하며, 클라이언트는 UI 분기만 담당한다.
