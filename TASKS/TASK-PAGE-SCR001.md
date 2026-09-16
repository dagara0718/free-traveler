# PAGE-SCR001 — `/` 메인 페이지 조립

- Seq: 1
- Category: PAGE_OWNER
- Priority: P0

## Context
`/` 메인 페이지 조립. 이 Task는 승인된 Screen의 Route Page를 실제로 조립하는 Page Owner Task다. 대상 범위: SCR-001. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 1에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준). 지정 구현 방법: localStorage(서버 미저장) — `docs/PROJECT_SCOPE.md` §2 즐겨찾기 항목과 일치.

## Requirement Ref
REQ-FUNC-001,REQ-FUNC-002,REQ-FUNC-003,REQ-FUNC-004,REQ-FUNC-005,REQ-FUNC-006,REQ-FUNC-007,REQ-FUNC-008,REQ-FUNC-009,REQ-FUNC-010,REQ-FUNC-047,REQ-FUNC-048,REQ-FUNC-049,REQ-FUNC-050,REQ-FUNC-051,REQ-FUNC-052,REQ-FUNC-053,REQ-FUNC-054,REQ-FUNC-057,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-067,REQ-FUNC-068,REQ-FUNC-069,REQ-FUNC-070,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-023,REQ-NF-026,REQ-NF-027,REQ-NF-028,REQ-NF-030

## Screen / Route / Page Entry
- Screen: SCR-001
- Route: `/`
- Page Entry: `src/app/page.tsx`

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-FAVORITES-LOCALSTORAGE, COMPONENT-SHARE-BUTTON, COMPONENT-SC001-HERO-SEARCH, COMPONENT-SC001-DESTINATION-GRID, COMPONENT-SC001-DRAWER-SHELL, COMPONENT-SC001-MATE-TEASER, COMPONENT-SC001-ABOUT-TEASER, DATA-DESTINATIONS, DATA-SAFETY, API-MATES-READ

## Expected Files
`src/app/page.tsx`(기존 스캐폴드 교체)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
0. **Next.js 기본 Starter 스캐폴드(로고, "Get started by editing" 등 기본 템플릿 텍스트·링크)를 `src/app/page.tsx`에서 완전히 제거한다** — 아래 7개 Section으로 전면 교체한다.
1. Hero(통합 검색 + `/travel-tools` CTA) — 뷰포트 60~70% 높이, 데이터 출처: 없음(정적 문구+검색 입력)
2. 국내 여행지 Card Grid **6개** — 데이터 출처: `src/data/destinations.ts`(scope=DOMESTIC)
3. 해외 여행지 Card Grid **6개** — 데이터 출처: `src/data/destinations.ts`(scope=OVERSEAS)
4. 여행 동기·테마 Chip **6개** — 데이터 출처: `src/data/destinations.ts`의 theme 집계
5. 국가별 주의사항 List Card **6개** — 데이터 출처: `src/data/safety.ts`
6. 최근 동행글 Card **3개** 또는 완성형 Empty State — 데이터 출처: `API-MATES-READ`(Supabase)
7. free_traveler 소개(지표+CTA) — 데이터 출처: `src/data/profile.ts`

**반응형 밀도:** Desktop 컨테이너 1200~1280px, Card Grid 3열, Section 여백 80px. Mobile Card Grid 1열, Section 여백 48px, Hero 다음 Section 제목이 스크롤 없이 보여야 함.

## Visual AC
- Lorem ipsum, `준비 중`, `정보 확인 필요` 문구를 어디에도 쓰지 않는다.
- 내용 없는 빈 Card를 만들지 않는다.
- 동행글 0건 시에도 ① 상황 설명 ② 이용 방법 1문장 ③ "동행 모집 시작하기" 등 CTA를 갖춘 완성형 Empty State를 표시한다.
- Loading: Card Grid/List Card는 실제 카드와 동일 크기의 스켈레톤(`surface-strong`)으로 표시해 레이아웃 시프트를 만들지 않는다(D-001 Loading 규칙).
- Error: 여행지·안전정보·최근 동행글 데이터 로딩 실패 시 인라인 오류 배너(원인 설명 1문장 + 재시도 버튼)로 대체하고 화면 전체를 비우지 않는다(D-001 Error 규칙).

## Security/Privacy AC
Drawer 콘텐츠에 공개 연락처 없음; 클라이언트 즐겨찾기만 localStorage, 서버 미전송

## Test Cases
- Functional AC 7개(또는 6개) 항목이 모두 렌더링되는지 확인 (수동 QA + E2E-PUBLIC-SMOKE)
- 데이터 0건 상태에서 완성형 Empty State가 표시되는지 확인
- Lorem ipsum/`준비 중`/`정보 확인 필요`/빈 Card가 없는지 확인
- Desktop(1440px)/Mobile(390px) 각각에서 반응형 밀도 규칙 확인

## Verify
E2E-PUBLIC-SMOKE

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(E2E-PUBLIC-SMOKE) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음
- [ ] Next.js 기본 스캐폴드(로고, 기본 링크·템플릿 텍스트)가 `src/app/page.tsx`에서 완전히 제거됨

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- 이 Task는 하위 Component/Data/API를 새로 구현하지 않는다 — Depends On에 명시된 Task의 산출물을 import하여 Page Entry에서 조립만 한다.
- 다른 Screen의 Route(Page Entry)를 동시에 소유하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
