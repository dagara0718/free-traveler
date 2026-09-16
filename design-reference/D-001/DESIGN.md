---
version: D-001
name: Free-Traveler-design-system
status: LOCKED
description: Traveler 전용 디자인 정본. Airbnb DESIGN.md는 레이아웃 밀도·섹션 구성·상태 설계 방식만 참고했으며, 색상·서체·로고·상표 요소는 차용하지 않는다. 흰 배경, 짙은 잉크 텍스트, 코랄 1색 포인트 위에 여행 사진이 콘텐츠 무게를 담당한다.

colors:
  primary: "#F2603C"
  primary-hover: "#D94E2E"
  primary-disabled: "#F9C7B6"
  on-primary: "#FFFFFF"
  canvas: "#FFFFFF"
  surface-soft: "#F7F7F8"
  surface-strong: "#EFEFF1"
  hairline: "#E4E4E7"
  ink: "#1F2328"
  body: "#42474F"
  muted: "#6B7280"
  success: "#1E8E5A"
  warning: "#B45309"
  danger: "#C1272D"
  info-link: "#2454C7"
  scrim: "#000000"

typography:
  display-lg:
    fontFamily: "'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.2px
  display-md:
    fontFamily: "'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif"
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: 0
  title:
    fontFamily: "'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif"
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 0
  body-md:
    fontFamily: "'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: -0.1px
  body-sm:
    fontFamily: "'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0
  label:
    fontFamily: "'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif"
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.02em
    textTransform: uppercase
  button:
    fontFamily: "'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: 0

rounded:
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px

spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section-desktop: 80px
  section-mobile: 48px

layout:
  container-desktop: 1200px-1280px
  frame-desktop: 1440px
  frame-mobile: 390px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.full}"
    height: 48px
    padding: 14px 24px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    border: "1px solid {colors.hairline}"
    height: 48px
  search-bar-pill:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    border: "1px solid {colors.hairline}"
    height: 56px
    padding: 12px 20px
  destination-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.hairline}"
  mate-post-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
  safety-list-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.hairline}"
  status-badge-success:
    backgroundColor: "rgba(30,142,90,0.12)"
    textColor: "{colors.success}"
    rounded: "{rounded.full}"
  status-badge-warning:
    backgroundColor: "rgba(180,83,9,0.12)"
    textColor: "{colors.warning}"
    rounded: "{rounded.full}"
  status-badge-danger:
    backgroundColor: "rgba(193,39,45,0.12)"
    textColor: "{colors.danger}"
    rounded: "{rounded.full}"
  chip:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: 8px 16px
  drawer-panel:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    shadow: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.md}"
    shadow: "0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)"
  text-input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    border: "1px solid {colors.hairline}"
    height: 52px
    padding: 14px 16px
  tab:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.title}"
  tab-active:
    backgroundColor: transparent
    textColor: "{colors.primary}"
    border-bottom: "2px solid {colors.primary}"
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    height: 72px
    border-bottom: "1px solid {colors.hairline}"
  footer-light:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: 64px 80px
---

## Overview

Free Traveler는 여행지 탐색·항공/숙소 조건 정리·국가 안전정보·동행 매칭을 하나의 흰 캔버스 위에서 제공하는 여행 준비 허브다. 배경은 순백(`{colors.canvas}`), 본문은 짙은 잉크(`{colors.ink}` — #1F2328), 포인트 컬러는 코랄(`{colors.primary}` — #F2603C) 1색뿐이다. 여행 사진과 카드 콘텐츠가 시각적 무게를 담당하고, 코랄은 CTA·활성 탭·즐겨찾기 상태에만 절제해서 쓴다.

본문 서체는 **Inter**이며 한글은 시스템 폰트(`Apple SD Gothic Neo`, `Malgun Gothic`)로 폴백한다. Proprietary 서체 파일(Airbnb Cereal 등)은 사용하지 않는다. semantic color(success/warning/danger)는 코랄과 색상적으로 명확히 분리되어, "눌러야 하는 버튼"과 "주의해야 하는 상태"를 혼동하지 않게 한다.

모양 언어는 부드럽되 절제한다: 버튼·검색창은 완전 pill(`{rounded.full}`), 여행지/동행 카드는 16px(`{rounded.lg}`)·12px(`{rounded.md}`), 폼 입력은 8px(`{rounded.sm}`). 그림자는 1개 tier만 존재하며 Drawer/Modal과 hover 카드에만 쓰고, 나머지는 1px hairline 테두리로 구분한다.

이 문서는 `design-reference/vendor/airbnb/DESIGN.md`(참고본)와 `docs/04_UIUX_PLAN.md`(설계안), 그리고 `docs/STITCH_VALIDATION_REPORT.md`에서 PASS 판정을 받은 승인 화면(SCR-001~005, Desktop/Mobile)을 근거로 확정한 **정본(D-001, LOCKED)**이다. 이후 화면 작업은 이 문서의 토큰과 규칙을 그대로 따른다.

## Colors

### Brand & Accent
- **Coral** (`{colors.primary}` — #F2603C): 유일한 브랜드 컬러. Primary CTA, 활성 탭 밑줄, 즐겨찾기 채움 아이콘에만 사용.
- **Coral Hover** (`{colors.primary-hover}` — #D94E2E): press/hover 변형.
- **Coral Disabled** (`{colors.primary-disabled}` — #F9C7B6): 외부 이동 버튼 비활성 등.

### Surface
- **Canvas** (`{colors.canvas}` — #FFFFFF): 전 화면 배경. 다크모드 없음.
- **Surface Soft** (`{colors.surface-soft}` — #F7F7F8): 칩 배경, Drawer 구획선.
- **Surface Strong** (`{colors.surface-strong}` — #EFEFF1): 비활성 입력, 비활성 필터 칩.
- **Hairline** (`{colors.hairline}` — #E4E4E7): 기본 1px 테두리 — 카드 외곽선, nav/footer 구분선, 입력창 테두리.

### Text
- **Ink** (`{colors.ink}` — #1F2328): 제목·본문·내비 라벨.
- **Body** (`{colors.body}` — #42474F): 여행지 상세 본문 등 2차 본문.
- **Muted** (`{colors.muted}` — #6B7280): 캡션, 메타(기간·거리·최종확인일), 비활성 탭.

### Semantic (코랄과 분리)
- **Success** (`{colors.success}` — #1E8E5A): 모집중, 승인됨, 최근 확인.
- **Warning** (`{colors.warning}` — #B45309): 마감 임박, 안전정보 stale 경고.
- **Danger** (`{colors.danger}` — #C1272D): 폼 오류, 중대 여행경보, 거절/차단.
- **Info Link** (`{colors.info-link}` — #2454C7): 정책·공식 출처 인라인 링크.

이 문서 밖에서 임의 색상을 새로 추가하지 않는다. 위 토큰에 없는 색이 필요하면 이 문서를 먼저 개정한다.

## Typography

폰트: `'Inter', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, system-ui, sans-serif`. Inter는 오픈소스이며, Airbnb Cereal 같은 Proprietary 폰트 파일은 배포하지 않는다.

| 토큰 | 크기/굵기 | 용도 |
|---|---|---|
| `display-lg` | 32px/700 | Hero 제목(SCR-001, SCR-002) |
| `display-md` | 26px/700 | Section 제목 |
| `title` | 18px/600 | 카드 제목, 탭 라벨 |
| `body-md` | 16px/400 | 본문 설명 |
| `body-sm` | 14px/400 | 카드 메타, 캡션 |
| `label` | 13px/600 uppercase | 배지, 칩 라벨 |
| `button` | 16px/600 | 버튼 텍스트 |

## Spacing

기본 단위 4px. `xs`(4) `sm`(8) `md`(12) `base`(16) `lg`(24) `xl`(32) `xxl`(48).

- Section 상하 여백: Desktop `{spacing.section-desktop}` 64~96px(기본값 80px), Mobile `{spacing.section-mobile}` 40~64px(기본값 48px).
- Card 내부 패딩: `{spacing.lg}`(24px), Card 간 gutter: `{spacing.base}`(16px).

## Radius

`sm` 8px(입력창) · `md` 12px(동행/안전 리스트 카드) · `lg` 16px(여행지 카드, Drawer) · `full` 9999px(버튼, 검색창, 칩, 배지). 하드 코너는 페이지 그리드 외에는 쓰지 않는다.

## Shadow

**1개 tier만 존재한다**: `0 1px 2px rgba(0,0,0,.04), 0 4px 12px rgba(0,0,0,.06)`. Drawer/Modal 패널과 hover 상태의 카드에만 적용한다. 그 외 모든 표면은 flat + 1px hairline 테두리로만 구분한다. 여러 단계 elevation을 만들지 않는다.

## Header · Footer

5개 화면(SCR-001~005) 공통 컴포넌트로 한 번만 정의하고 재사용한다.

- **Header (Desktop 72px)**: 좌측 "Free Traveler" 워드마크, 중앙 내비게이션(여행지 `/` · 여행 도구 `/travel-tools` · 동행 `/mates` · 대표 소개 `/about`), 우측 계정 진입(Guest: 로그인 버튼 / Member·Admin: 아바타). 활성 라우트는 코랄 2px 밑줄. 하단 1px hairline.
- **Header (Mobile 56px)**: 워드마크 + 검색 아이콘 + 햄버거. 햄버거 시트에 내비 4개 + 계정 진입을 세로 목록으로.
- **Footer**: Desktop 3열(서비스/정책/안내) → Mobile 1열 누적. 정책 열에 이용약관·개인정보처리방침·동행 안전수칙·콘텐츠 면책 안내 링크 필수. 안내 열에 "항공·숙소 링크는 제3자 사이트로 연결되며 예약을 대행하지 않습니다" 고지 포함. 최하단 legal band는 `body-sm` + `{colors.muted}`.

## Search · Filter

- **Search bar pill** (`search-bar-pill`): 흰 배경, 완전 pill, 56px 높이, 1px hairline. SCR-001 Hero의 목적지/테마 통합 검색에 사용.
- **Filter bar**: 국가·지역·기간·상태 등 드롭다운을 가로 배열하고, 옆에 "N개의 결과" 요약 텍스트를 body-sm/muted로 붙인다(SCR-004). 필터 칩은 `chip` 토큰(surface-soft, full radius), 선택 상태는 코랄 텍스트 + surface-soft 배경 유지(배경을 코랄로 채우지 않는다 — 코랄 과다 사용 방지).
- 결과 0건일 때는 6장 "완성형 Empty State" 규칙(본 문서 하단)을 따른다.

## Destination Card

- 사진 우선(`destination-card` + `destination-card-photo`): 16px 라운드, 1px hairline. 사진 위 배지 없음(국가 배지는 사진 상단 좌측에 작게, 해외 카드에 한해 사용).
- 구성: 사진 → 제목(도시/여행지명, `title`) → 테마 태그 1~2개(`chip`, 작은 사이즈) → 메타 1줄(`body-sm`/muted, 추천 기간 등).
- 국가 안전정보는 사진 없는 리스트형 카드(`safety-list-card`)로 별도 스타일을 쓴다 — 아이콘 + 국가명 + 경보 배지(`status-badge-*`) + "최종 확인 N일 전" 텍스트. 사진 카드와 리스트 카드를 같은 그리드에 섞지 않는다.

## Form · Tabs

- **Tab**(`tab`/`tab-active`): 라벨 + 하단 2px 코랄 밑줄로 활성 표시. SCR-003의 항공/숙소/동행 구하기 3탭은 각각 독립된 입력·검증·완료 상태를 가지며, 한 탭의 입력값이 다른 탭에 영향을 주지 않는다.
- **Text input**(`text-input`): 흰 배경, 1px hairline, 8px 라운드, 52px 높이. 포커스 시 2px ink 테두리로 전환(글로우 없음). 오류 시 테두리 `{colors.danger}` + 필드 하단 인라인 오류 메시지.
- 항공/숙소 조건 폼은 국가·지역·시작일·종료일 4필드를 기본으로 하고, 제출 전 요약 카드 + 외부 이동 CTA로 이어진다. 입력값 비전달 고지(“입력값은 외부로 전달되지 않습니다”)는 요약 카드 옆에 상시 노출한다.

## Mate Post Card

- `mate-post-card`: 12px 라운드, 1px hairline, 사진 없음(사람/장소 사진을 얼굴 식별 가능한 형태로 카드에 노출하지 않는다).
- 구성: 제목(`title`) → 국가·지역/기간(`body-sm`) → 모집 인원 → 모집 상태 배지(`status-badge-success`="모집중", `status-badge-warning`="마감임박", 회색="마감"). 공개 연락처(전화번호/메신저ID/이메일)는 카드·상세 어디에도 표시하지 않는다.
- 목록+상세 동시 노출 레이아웃(SCR-004): Desktop은 좌 40%(목록)+우 60%(상세) 분할, Mobile은 목록 → 카드 탭 → 하단 Drawer로 전환.

## Drawer · Modal

- 여행지 상세와 국가 안전정보 상세는 **동일한 Drawer 셸**을 공유하고 내부 콘텐츠만 전환한다(SCR-001).
- Desktop: 우측 슬라이드인, 폭 480~560px, `drawer-panel` 토큰(16px 라운드 + 1개 shadow tier), 배경 스크림 `{colors.scrim}` 40%.
- Mobile: 하단에서 슬라이드업하는 Full-height Sheet, 상단 드래그 핸들, 닫기 버튼 44×44px 이상.
- Modal(확인/경고용)은 Drawer보다 작은 고정폭 카드로, 동일한 shadow tier와 scrim을 재사용한다. 별도의 elevation 단계를 새로 만들지 않는다.

## Alert · Toast

- **Alert(배너형)**: 국가 안전정보의 중대 경보, 폼 오류, "입력값 비전달" 고지 등 상시/조건부 노출 메시지. `status-badge-*` 색을 배경 12% tint로 얕게 쓰고 텍스트는 해당 semantic color 진한 톤. 코랄을 경고 색으로 쓰지 않는다.
- **Toast**(`toast`): 참가 요청 접수/승인/거절, 신고 접수 등 일회성 알림. 화면 우하단(Desktop) / 하단 고정(Mobile), `{colors.ink}` 배경 + 흰 텍스트, 1개 shadow tier, 3~5초 후 자동 소멸. 실제 이메일 발송 대신 이 Toast 또는 화면 내 상태 배지로 알림을 대체한다.

## Loading · Empty · Error 상태

- **Loading**: Card Grid는 카드 형태 그대로의 스켈레톤(회색 `surface-strong` 블록)을 사용, 레이아웃 시프트가 없게 실제 카드와 동일한 크기를 유지한다.
- **Empty**: 6장 "완성형 Empty State" 규칙을 따른다. 스피너만 있는 빈 화면, 혹은 아이콘 하나만 있는 화면을 만들지 않는다.
- **Error**: 인라인 배너(`status-badge-danger` 계열 텍스트/테두리) + 원인 설명 1문장 + 재시도 또는 대안 행동 버튼. 페이지 전체를 흰 화면으로 비우지 않는다.
- **Unauthorized**: 로그인/성인확인이 필요한 시도는 별도의 깨진 화면이 아니라 로그인 유도 카드(설명 1문장 + 로그인 CTA)로 대체한다.

## Desktop · Mobile 규칙

| 기준 | Desktop | Mobile |
|---|---|---|
| 기준 프레임 | 1440px | 390px |
| Page Section 콘텐츠 최대 폭 | 1200~1280px (중앙 정렬) | 뷰포트 전체 폭, 좌우 gutter 16~20px |
| Section 상하 여백 | 64~96px (기본 80px) | 40~64px (기본 48px) |
| Card Grid 열 수 | 3~4열 | 1열 |
| Drawer | 우측 슬라이드인 480~560px | 하단 Full-height Sheet |
| 터치 영역 | 최소 44×44px | 최소 44×44px (동일 기준 유지) |

## Hero 높이 규칙

Hero는 1440px 데스크톱 기준 뷰포트의 **약 60~70% 높이**로 제한한다. 스크롤 없이 첫 화면에서 다음 Section의 제목(또는 첫 카드 줄)이 보여야 한다. Hero가 뷰포트 전체를 채우는 구성은 이 문서를 위반한 것으로 간주한다.

## Section 제목·설명·본문·CTA 계층과 리듬

모든 Section은 다음 4요소를 순서대로 갖춘다:
1. **제목**(`display-md`, 1개 문장 이하의 명사구)
2. **설명**(`body-md`, 1~3문장, 이 Section이 왜 존재하는지)
3. **본문**(Card Grid / List Card / Chip 목록 / 좌우 분할 / Timeline / Gallery / Tab 중 해당 Section에 맞는 패턴 — 아래 화면별 표 참고)
4. **CTA 또는 다음 행동**(버튼, 링크, 혹은 다음 Section으로의 자연스러운 유도)

같은 패턴(예: Card Grid)이 연속되는 경우 사진 유무·배지 구성·클릭 목적지를 다르게 하여 시각적으로 구분한다. 한 화면 안에서 Hero → Card Grid → Card Grid → Chip → List Card → CTA Banner처럼 최소 3가지 이상의 시각 패턴을 교차 사용해 같은 Card만 반복되지 않게 한다.

## 화면별 Section 순서와 최소 콘텐츠 수

승인된 Stitch 화면(`docs/STITCH_VALIDATION_REPORT.md` PASS 판정) 기준으로 아래 순서와 최소 수량을 계약으로 고정한다.

| Screen | Section 순서 | 최소 콘텐츠 수 |
|---|---|---|
| SCR-001 `/` | Hero → 국내 여행지 → 해외 여행지 → 여행 테마 → 국가별 주의사항 → 최근 동행글(또는 Empty State) → 대표 소개 | 국내 6, 해외 6, 테마 6, 안전정보 6, 동행글 3(또는 완성형 Empty State) |
| SCR-002 `/about` | Profile Hero → 여행 지표 → 소개·철학 → Timeline → 방문 국가 → Gallery → 추천 여행지+CTA | 지표 3, Timeline **6 이상**, 방문국가 칩 30, Gallery 8, 추천 여행지 4 |
| SCR-003 `/travel-tools` | Intro → 탭(항공/숙소/동행) → 입력 Form → 요약·외부이동 → Tip → 동행 작성/로그인·안전안내 | 탭 3개 모두 필수, Tip 3, Form 필드 4(국가·지역·시작일·종료일) 이상 |
| SCR-004 `/mates` | Intro+작성CTA → Filter+결과요약 → 목록 → 상세 → 신청방법 3단계 → 안전·신고·차단 안내+CTA | 목록 카드 최대 8(우선순위 노출), 목록+상세 동시 존재, 3단계 안내 |
| SCR-005 `/account` | 역할별(Guest/Member/Admin) Section — Intro, 핵심 작업, 도움말/다음행동 | Member: 프로필+내 활동(내 글/받은 요청/차단목록) 모두 존재. Admin: 신고 큐(상태 필터+카드)+외부 URL 설정 Form 모두 존재. 대시보드/통계 차트 금지 |

Mobile 변형(SCR-001, SCR-003)은 위와 동일한 Section 순서·최소 수량을 유지하며 Card Grid만 1열로 전환한다.

## 완성형 Empty State와 Placeholder 문구 금지 규칙

- `Lorem ipsum`, `준비 중`, `정보 확인 필요`, 의미 없는 반복 문구를 어떤 화면에도 쓰지 않는다.
- 데이터가 없는 목록(동행글 0건, 신고 0건, 내 글 0건 등)도 다음 3요소를 반드시 갖춘 **완성형 Empty State**로 표시한다: ① 상황 설명 1문장 ② 이용 방법 1문장 ③ 다음 행동 CTA(필터 초기화, 새 글 작성 등).
- 빈 Card, 텍스트 없는 장식 영역, 스피너만 있는 화면을 방치하지 않는다.
- 모든 이미지 alt 텍스트는 실제 장소·상황을 설명하는 문장으로 작성한다(예: "노을이 지는 부산 해운대 해변").

## Do / Do Not

**Do**
- 코랄(`{colors.primary}`)은 화면당 1~2개 모먼트로 절제해서 쓴다.
- semantic color(success/warning/danger)로 상태를 표현하고, 텍스트 라벨을 항상 함께 쓴다(색상 단독 전달 금지).
- Header/Footer/Drawer/Toast는 5개 화면에서 동일 컴포넌트를 재사용한다.
- 여행지 사진, 사용자 활동 사진 모두 실제 장소·상황을 설명하는 alt 텍스트를 붙인다.
- 데이터 없는 상태를 완성형 Empty State로 채운다.

**Do Not**
- Airbnb 로고, 워드마크, 슬로건, 브랜드 색(Rausch #ff385c 등)을 복제하지 않는다.
- 항공/숙소/동행 어디에도 예약·결제·체크아웃 UI(가격 확정, 결제수단 입력, 발권 버튼 등)를 넣지 않는다 — Free Traveler는 조건 정리 후 외부 사이트로 이동만 시킨다.
- Airbnb Cereal 등 Proprietary 폰트 파일을 프로젝트에 포함하지 않는다. Inter + 시스템 한글 폰트만 쓴다.
- 이 문서의 Color 토큰에 없는 임의 색상을 새로 추가하지 않는다. 새 색이 필요하면 이 문서를 개정한다.
- 광고 배너, 별점(rating stars), 실시간 항공권/호텔 가격 표시를 추가하지 않는다.
- SCR-005 Admin 영역에 통계 대시보드/차트를 추가하지 않는다 — 신고 상태 변경과 외부 URL 설정 폼만 유지한다.
- 동행 카드·상세 어디에도 공개 연락처(전화번호/메신저ID/이메일)를 노출하지 않는다.
