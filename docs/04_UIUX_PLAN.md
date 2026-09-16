# Free Traveler — UI/UX Plan

**Document ID:** UIUX-TRAVEL-001
**기반 문서:** `01_PRD.md.md`, `02_SRS_BASELINE.md`, `PROJECT_SCOPE.md`, `03_UI_COVERAGE_ANALYSIS.md`, `design-reference/vendor/airbnb/DESIGN.md`(참고용, 상표·색상·서체 미차용)

이 문서는 5개 디자인 Screen(SCR-001~005)의 화면별 Section 구성, 디자인 토큰, 상태(State) 정의를 기록한다. `PROJECT_SCOPE.md`에서 EXCLUDED로 분류된 기능(전체 CMS, 미디어 업로드 워크플로, 범용 감사 로그, 자동 백업·장애알림, 외부 이메일 연동 등)은 화면 어디에도 되살리지 않는다.

---

## 1. 브랜드·디자인 원칙

- 브랜드명은 **Free Traveler**. Airbnb DESIGN.md는 레이아웃 밀도·섹션 구성·상태 설계 방식만 참고하며, Rausch 색상·Cereal 폰트·로고·상표 요소는 사용하지 않는다.
- 배경은 흰색, 본문 텍스트는 짙은 회색(Ink), 포인트 컬러는 코랄 1색만 사용한다.
- 오류·경고·안전정보는 코랄과 색상적으로 구분되는 semantic color(빨강/주황/초록)를 사용해 "포인트 코랄 = 액션", "semantic color = 상태 신호"로 의미를 분리한다.
- 한글 본문 폰트는 Inter + 시스템 한글 폰트(Fallback)를 사용한다.
- Header·Footer는 SCR-001~005에서 동일 컴포넌트를 재사용한다.
- 키보드 포커스 링과 44×44px 이상 터치 영역을 모든 인터랙션 요소에 적용한다.

## 2. 디자인 토큰

### 2.1 색상

| 토큰 | 값 | 용도 |
|---|---|---|
| `color.canvas` | `#FFFFFF` | 기본 배경 |
| `color.surface-soft` | `#F7F7F8` | 카드 배경 대비, 섹션 구분 배경 |
| `color.surface-strong` | `#EFEFF1` | 비활성 필드, 태그 배경 |
| `color.hairline` | `#E4E4E7` | 1px 구분선, 카드 테두리 |
| `color.ink` | `#1F2328` | 제목·본문 기본 텍스트 |
| `color.body` | `#42474F` | 본문 보조 텍스트 |
| `color.muted` | `#6B7280` | 캡션, 메타 정보, 비활성 라벨 |
| `color.primary` (Coral) | `#F2603C` | 주요 CTA, 활성 탭, 링크 강조, 즐겨찾기 활성 |
| `color.primary-hover` | `#D94E2E` | 코랄 호버/press 상태 |
| `color.primary-disabled` | `#F9C7B6` | 비활성 CTA |
| `color.on-primary` | `#FFFFFF` | 코랄 위 텍스트 |
| `color.success` | `#1E8E5A` | 성공/승인/모집중 상태 |
| `color.warning` | `#B45309` | 주의(마감 임박, stale 경고) |
| `color.danger` | `#C1272D` | 오류, 중대 여행경보, 거절/차단 |
| `color.info-link` | `#2454C7` | 정책·외부 출처 본문 내 링크 |

> `color.danger`, `color.warning`, `color.success`는 코랄(`color.primary`)과 색상표에서 명확히 구분되어 안전정보·오류·CTA를 혼동하지 않도록 한다.

### 2.2 타이포그래피

- 폰트: `Inter, 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif`
- 한글 본문은 Inter의 라틴 숫자·영문 혼용 시에도 자간이 넓어지지 않도록 `letter-spacing: -0.1px` 기준을 둔다.

| 토큰 | 크기/굵기 | 용도 |
|---|---|---|
| `type.display-lg` | 32px / 700 | Hero 제목(SCR-001, 002) |
| `type.display-md` | 26px / 700 | Section 제목 |
| `type.title` | 18px / 600 | 카드 제목, 탭 라벨 |
| `type.body` | 16px / 400, line-height 1.6 | 본문 설명 |
| `type.body-sm` | 14px / 400 | 카드 메타, 캡션 |
| `type.label` | 13px / 600, uppercase 0.02em | 배지, 칩 라벨 |
| `type.button` | 16px / 600 | 버튼 텍스트 |

### 2.3 여백·모양·그림자

| 토큰 | 값 |
|---|---|
| `radius.sm` / `radius.md` / `radius.lg` / `radius.full` | 8px / 12px / 16px / 9999px |
| `space.xs`~`space.xxl` | 4 · 8 · 12 · 16 · 24 · 32 · 48px |
| `space.section-desktop` | 64~96px (Section 상하 여백) |
| `space.section-mobile` | 40~64px |
| `layout.container` | 1200~1280px (Desktop 콘텐츠 최대폭) |
| `shadow.card` | `0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)` (Card hover/Drawer에만 사용, 1개 tier로 제한) |

### 2.4 브레이크포인트

| 기준 | 폭 | 비고 |
|---|---|---|
| Desktop 기준 프레임 | 1440px | 콘텐츠는 `layout.container`(1200~1280px)로 중앙 정렬, 좌우 여백은 뷰포트가 흡수 |
| Mobile 기준 프레임 | 390px | 좌우 gutter 16~20px, Card 1열 |

- Hero는 1440px 기준 뷰포트 전체 높이를 차지하지 않으며, 스크롤 없이도 다음 Section의 상단 일부(제목 또는 첫 Card 줄)가 보이도록 Hero 높이를 뷰포트의 약 60~70%로 제한한다.

## 3. 공통 컴포넌트

### 3.1 Header (5개 화면 공통)

- Desktop: 높이 72px, 좌측 `Free Traveler` 워드마크, 중앙 내비게이션(여행지 검색 `/`, 여행 도구 `/travel-tools`, 동행 `/mates`, 대표 소개 `/about`), 우측 계정 진입(Guest: 로그인 버튼 / Member·Admin: 아바타+닉네임), 하단 1px `color.hairline`.
- Mobile: 높이 56px, 좌측 워드마크, 우측 검색 아이콘+햄버거 메뉴. 햄버거 시트에 내비게이션 4개+계정 진입을 세로 목록으로 표시.
- 활성 라우트는 코랄 밑줄(2px)로 표시. 포커스 시 2px 코랄 아웃라인.

### 3.2 Footer (5개 화면 공통)

- 3열 링크 그룹(Desktop) → 1열 누적(Mobile): ① 서비스(여행지/여행도구/동행/대표소개) ② 정책(이용약관/개인정보처리방침/동행 안전수칙/콘텐츠 면책 안내) ③ 안내(외부 서비스 고지: "항공·숙소 링크는 제3자 사이트로 연결되며 예약을 대행하지 않습니다", 문의 링크).
- 최하단 legal band: 저작권 문구 + 정책 링크, `type.body-sm`, `color.muted`.

### 3.3 Drawer / Modal (SCR-001 전용 상세 패널)

- Desktop: 우측에서 슬라이드인, 폭 480~560px, `shadow.card` 적용, 배경 스크림(검정 40%).
- Mobile: 하단에서 슬라이드업 Full-height Sheet, 상단 드래그 핸들, 닫기 버튼 44px.
- 여행지 Drawer와 안전정보 Drawer는 동일 컴포넌트 셸을 공유하고 내부 콘텐츠만 전환한다(REQ-FUNC-004~007, 047~054).

---

## 4. SCR-001 `/` 메인 — Section 7개

Desktop 콘텐츠 폭 1200~1280px, Section 상하 여백 64~96px. Mobile 여백 40~64px, Card 1열.

| # | Section | 레이아웃 패턴 | 내용 |
|---|---|---|---|
| 1 | 여행지 검색 Hero | Hero | "어디로 떠나볼까요?" 톤의 제목 1문장 + 설명 1문장, 통합 검색 입력창(REQ-FUNC-003/067), `/travel-tools`로 이동하는 보조 CTA "항공·숙소 조건 정리하기". Hero 높이는 뷰포트의 약 65%로 제한해 하단 Section 도입부가 보이도록 한다. |
| 2 | 국내 인기 여행지 | Card Grid (Desktop 3×2, Mobile 1열) | 서울·부산·제주 등 국내 여행지 6개 카드. 카드 구성: 실제 장소 사진(장소를 설명하는 alt), 지역명, 테마 태그 1~2개, 추천 기간 요약 1문장. 카드 클릭 시 SCR-001 내 여행지 Drawer가 열린다(REQ-FUNC-001/004). |
| 3 | 해외 인기 여행지 | Card Grid (국가 플래그 라벨 + 도시명 배지로 국내 그리드와 시각적으로 구분) | 도쿄·방콕·파리 등 해외 여행지 6개 카드. 국가명·도시명·테마 태그·추천 시기 요약 표시. 클릭 시 여행지 Drawer, Drawer 내 "이 국가 안전정보 보기" 링크로 안전정보 Drawer 전환(REQ-FUNC-006). |
| 4 | 여행 동기·테마 | Chip 목록 (가로 스크롤, Desktop은 6개 균등 배치) | "휴양", "미식", "액티비티", "가족여행", "혼자여행", "도시탐방" 등 테마 6개 Chip. Chip 선택 시 2·3번 Section 필터에 반영(REQ-FUNC-002). |
| 5 | 국가별 주의사항 | List Card (아이콘+국가명+경보단계 배지+최종확인일, 사진 없는 목록형으로 2·3번과 형태 차별화) | 해외 국가 6개의 안전정보 요약 카드. 각 카드에 여행경보 단계 배지(semantic color)와 "최종 확인 OO일 전" 텍스트 표시, 클릭 시 안전정보 Drawer(REQ-FUNC-046~052). |
| 6 | 최근 동행글 | Card Grid(3장) 또는 Empty State | 데이터 존재 시 모집중 동행글 3개(국가·기간·모집인원·모집상태 배지). 데이터 없을 시 Empty State: "아직 등록된 동행글이 없어요" 설명 1문장 + "동행 모집은 이렇게 진행돼요" 1문장 + `/travel-tools`(동행 작성 탭) CTA. |
| 7 | free_traveler 소개 | 좌우 분할(Desktop) / 세로 스택(Mobile) | 좌측 대표 사진, 우측 한 문장 소개 + `50+ Trips`·`30+ Countries` 지표 + `/about` CTA(REQ-FUNC-057). |

**상태:** Loading(각 Card Grid 스켈레톤), Success(정상 데이터), Empty(#6 동행글 Empty State), Error(여행지/안전정보 로딩 실패 시 인라인 재시도 배너), Unauthorized 없음(SCR-001은 Public).

---

## 5. SCR-002 `/about` 대표 소개 — Section 7개

| # | Section | 레이아웃 패턴 | 내용 |
|---|---|---|---|
| 1 | 대표 Hero | Hero | 대표 사진 + "50회 이상의 자유여행으로 30개국을 이해한 여행 큐레이터" 유형의 소개 문장 1개(REQ-FUNC-058). |
| 2 | 여행 지표 | Stat Row (3개 지표 카드: 여행 횟수, 방문 국가, 활동 연차) | `50+ Trips`, `30+ Countries`, 대표 활동 기간 요약(REQ-FUNC-057). |
| 3 | 소개·철학 | 좌우 분할(사진+텍스트) | 자기소개, 여행을 시작한 이유, 여행 철학을 2~4개 문단으로 구성한 실제 문장(REQ-FUNC-058). |
| 4 | 여행 타임라인 | Timeline (세로형, Mobile은 좌측 정렬 축선) | 연도·장소·한 줄 요약으로 구성된 시점 6개 이상(REQ-FUNC-060). |
| 5 | 방문 국가 | Chip 목록(권역별 그룹: 아시아/유럽/북미/오세아니아) | 30개국을 권역별로 묶은 Chip 또는 목록(REQ-FUNC-059). |
| 6 | 여행 사진 Gallery | Card Grid (Desktop 4열, Mobile 2열, 사진만) | 서로 다른 장소의 여행 사진 8장 이상, 각 사진에 장소를 설명하는 alt 텍스트(REQ-FUNC-061). |
| 7 | 기억에 남는 여행지 | Card Grid(4장) + CTA Banner | 대표가 꼽은 여행지 4개 카드(클릭 시 SCR-001 Drawer로 이동, REQ-FUNC-063) + 하단 CTA Banner "지금 여행을 준비해보세요" — `/travel-tools`, `/mates` 버튼 2개. |

**상태:** Loading(스켈레톤), Success. Empty/Error/Unauthorized는 정적 콘텐츠 특성상 정의하지 않음(콘텐츠 부재 시 배포하지 않음).

---

## 6. SCR-003 `/travel-tools` 통합 여행 준비 — Section 6개

세 탭(항공/숙소/동행 구하기)은 각각 독립된 입력·검증·완료 상태를 가진다. 탭 전환 시 다른 탭의 입력값에 영향을 주지 않는다.

| # | Section | 레이아웃 패턴 | 내용 |
|---|---|---|---|
| 1 | 이용 안내 Intro | 3단계 안내 | "① 조건을 입력하세요 → ② 요약을 확인하세요 → ③ 외부 사이트로 이동하거나 동행을 신청하세요" 3단계 요약 + 페이지 목적 1~2문장. |
| 2 | 탭 전환 | Tab (항공편 / 숙소 / 동행 구하기) | 탭별 아이콘+라벨, 활성 탭은 코랄 밑줄. |
| 3 | 조건 입력 Form | Form (2열 Desktop / 1열 Mobile) | 국가·지역·출발일(체크인)·귀국일(체크아웃) 필드, 인라인 오류 메시지는 `color.danger`(REQ-FUNC-011~013, 019~021). |
| 4 | 요약 + 외부 이동 | Action Card | 입력값 요약 카드 + "항공편 보러 가기"/"숙소 보러 가기" 코랄 CTA(새 탭 이동), 비활성 시 사유 표시(REQ-FUNC-014~016, 022~024). |
| 5 | 고지·Tip | Chip/리스트 3개 | "입력값은 외부로 전달되지 않습니다" 고지 배너(`color.info-link` 아님, 중립 `surface-soft` 배경) + 항공·숙소 찾기 Tip 3개 카드(REQ-FUNC-015/023, 054). |
| 6 | 동행 구하기 탭 | 조건부 Split | 비로그인/미성년: 로그인·성인확인 안내 카드 + SCR-005 이동 CTA(REQ-FUNC-027/028). 로그인 성인 회원: 모집글 작성 Form(제목·국가·지역·기간·인원·스타일·설명) + 안전수칙 동의 체크박스 + 안전 안내 문구(REQ-FUNC-031/032/080). |

**상태:** Loading(외부 이동 처리 중 버튼 spinner), Success(요약 표시/제출 완료 토스트), Empty 해당 없음(입력 전 상태는 Form 기본값으로 표현), Error(날짜 검증 실패, 연락처 탐지 차단, 외부 URL 오류 배너), Unauthorized(동행 탭 로그인 필요 안내).

---

## 7. SCR-004 `/mates` 동행 조회 — Section 6개

| # | Section | 레이아웃 패턴 | 내용 |
|---|---|---|---|
| 1 | 동행 찾기 Intro | Intro + CTA | "함께할 동행을 찾아보세요" 1문장 설명 + "새 동행글 작성" CTA(→SCR-003 동행 탭, REQ-FUNC-031). |
| 2 | 검색 Filter | Filter Bar | 국가·지역·기간·모집 상태 필터 + "N개의 모집글" 결과 요약 텍스트(REQ-FUNC-030). |
| 3 | 동행글 목록 | Card Grid(최대 8개 우선 노출, 이후 더 보기) | 제목·국가/지역·기간·모집인원·상태 배지 카드(REQ-FUNC-033/037). 데이터 없으면 Empty State: 안내 문장 + 필터 초기화 버튼 + 작성 CTA + 이용 방법 요약. |
| 4 | 목록+상세 | Desktop: 좌측 목록 40% + 우측 상세 패널 60% 분할. Mobile: 목록 → 카드 탭 시 하단 상세 Drawer | 상세 패널에 설명·선호조건·참가 메시지 입력 폼·신고/차단 버튼(REQ-FUNC-034/039/040). |
| 5 | 참가 신청 방법 | 3단계 안내 | "① 모집글을 확인하세요 → ② 참가 메시지를 보내세요 → ③ 작성자의 승인을 기다리세요". |
| 6 | 안전 안내 | CTA Banner | 공개 연락처 금지·신고/차단 정책 요약 + "여행 도구로 돌아가기"(`/travel-tools`) CTA. |

**상태:** Loading, Success, Empty(#3에서 조건 초기화·작성 CTA·이용 방법 동시 표시), Error(목록/상세 로딩 실패 재시도), Unauthorized(비로그인·미성년 상태에서 참가 신청 시도 시 SCR-005 로그인 유도 모달).

---

## 8. SCR-005 `/account` 계정·관리 (역할별 Tab)

고정 Section 수 대신 역할(Guest/Member/Admin)에 따라 보이는 Tab이 달라진다. 역할에 없는 Tab은 렌더링하지 않는다. Dashboard·통계 화면은 만들지 않는다.

| 역할 | Tab 구성 | 내용 |
|---|---|---|
| Guest | 계정 기능 Intro, 로그인/가입/비밀번호 재설정 Card | Intro: "로그인하면 동행 모집·참가·즐겨찾기 관리를 할 수 있어요" + 로그인 후 가능한 기능 3개 요약(Chip) + 보안 안내(성인확인·연락처 비공개 정책, REQ-FUNC-066). |
| Member | 프로필, 내 활동 | 프로필 Tab: 닉네임·연령대·성별·여행 스타일·성인확인 상태 요약+수정(REQ-FUNC-028/029). 내 활동 Tab: 내 모집글(수정/마감), 받은·보낸 참가 요청(승인/거절), 차단 목록, 새 동행글 작성 CTA(REQ-FUNC-036/038/040/041 중 Member 범위). |
| Admin | 관리 | 관리 Intro 1문장 + 신고 큐(상태 필터: OPEN/REVIEWING/RESOLVED/DISMISSED, 상태 변경 액션) + 항공·숙소 외부 URL 설정 Form(HTTPS 검증)(REQ-FUNC-041/077). 표·그래프 기반 대시보드는 만들지 않는다. |

**상태:** Loading, Success, Empty(내 글/요청/차단 목록이 비어 있을 때 각각 "아직 없음" 설명 + 다음 행동 CTA), Error(저장/상태변경 실패 인라인 메시지), Unauthorized(Guest가 Member/Admin Tab URL로 직접 접근 시 로그인 유도 화면으로 대체).

---

## 9. Section 패턴 교차 사용 점검

| 패턴 | 사용 Screen |
|---|---|
| Hero | SCR-001(#1), SCR-002(#1) |
| Card Grid | SCR-001(#2,#3,#6), SCR-002(#6,#7), SCR-004(#3) |
| List Card(비사진형) | SCR-001(#5) |
| Chip 목록 | SCR-001(#4), SCR-002(#5), SCR-003(#5) |
| 좌우 분할(Split) | SCR-001(#7), SCR-002(#3), SCR-004(#4), SCR-003(#6) |
| 3단계 안내 | SCR-003(#1), SCR-004(#5) |
| Stat Row | SCR-002(#2) |
| Timeline | SCR-002(#4) |
| Tab | SCR-003(#2) |
| Form | SCR-003(#3), SCR-003(#6 회원), SCR-005(관리 Tab) |
| Action Card | SCR-003(#4) |
| Filter Bar | SCR-004(#2) |
| CTA Banner | SCR-002(#7), SCR-004(#6) |

같은 Card 컴포넌트를 연속 사용하는 구간(예: SCR-001의 #2/#3, SCR-002의 #6/#7)은 사진 유무·라벨 구성·클릭 목적지를 다르게 하여 시각적으로 구분한다.

## 10. 빈 데이터·자리표시 텍스트 원칙

- `Lorem ipsum`, `준비 중`, `정보 확인 필요` 같은 자리표시 문구를 사용하지 않는다.
- DB/정적 데이터가 비어 있는 경우(SCR-001 #6, SCR-004 #3, SCR-005 내 활동)에도 반드시 ① 상황 설명 문장 ② 이용 방법 한 줄 ③ 다음 행동 CTA를 함께 표시한다.
- 모든 이미지 alt 텍스트는 실제 장소·인물 상황을 설명하는 문장으로 작성한다(예: "노을이 지는 부산 해운대 해변").
