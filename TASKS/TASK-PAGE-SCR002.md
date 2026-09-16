# PAGE-SCR002 — `/about` 대표 소개 페이지 조립

- Seq: 2
- Category: PAGE_OWNER
- Priority: P1

## Context
`/about` 대표 소개 페이지 조립. 이 Task는 승인된 Screen의 Route Page를 실제로 조립하는 Page Owner Task다. 대상 범위: SCR-002. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 2에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-057,REQ-FUNC-058,REQ-FUNC-059,REQ-FUNC-060,REQ-FUNC-061,REQ-FUNC-062,REQ-FUNC-063,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-069,REQ-FUNC-070,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-023,REQ-NF-030

## Screen / Route / Page Entry
- Screen: SCR-002
- Route: `/about`
- Page Entry: `src/app/about/page.tsx`

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SHARE-BUTTON, COMPONENT-SC002-PROFILE-HERO-STATS, COMPONENT-SC002-TIMELINE, COMPONENT-SC002-COUNTRY-CHIPS, COMPONENT-SC002-GALLERY, COMPONENT-SC002-PICKS-CTA, DATA-REPRESENTATIVE

## Expected Files
`src/app/about/page.tsx`(신규)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
1. Profile Hero — 데이터 출처: `src/data/profile.ts`
2. 여행 지표 3개(50+ Trips/30+ Countries/활동연차) — 데이터 출처: `src/data/profile.ts`
3. 소개·철학 3문단 — 데이터 출처: `src/data/profile.ts`
4. Timeline **6개 이상** — 데이터 출처: `src/data/profile.ts`
5. 방문 국가 **30개**(권역별 Chip) — 데이터 출처: `src/data/profile.ts`
6. Gallery **8장** — 데이터 출처: `src/data/profile.ts`
7. 기억에 남는 여행지 **4개** + CTA — 데이터 출처: `src/data/profile.ts` + `src/data/destinations.ts`(slug 유효성 필터)

**반응형 밀도:** Desktop Gallery 4열, 소개 좌우 분할. Mobile Gallery 2열, 좌우 분할→세로 스택, Section 여백 48px.

## Visual AC
Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. 정적 콘텐츠만 다루므로 Empty/Error 상태는 정의하지 않되, 콘텐츠 미완성 시 배포하지 않는다. Loading: Gallery/Timeline/Chip 목록은 실제 콘텐츠와 동일 크기의 스켈레톤으로 표시해 레이아웃 시프트를 만들지 않는다(D-001 Loading 규칙).

## Security/Privacy AC
인물 사진에 상업적 보증 오인 문구 없음

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
- [ ] 신규 페이지이므로 Next.js 기본 스캐폴드 텍스트/링크가 애초에 존재하지 않음(확인만)

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- 이 Task는 하위 Component/Data/API를 새로 구현하지 않는다 — Depends On에 명시된 Task의 산출물을 import하여 Page Entry에서 조립만 한다.
- 다른 Screen의 Route(Page Entry)를 동시에 소유하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
