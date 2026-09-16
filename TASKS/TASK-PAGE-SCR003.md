# PAGE-SCR003 — `/travel-tools` 통합 여행 준비 페이지 조립

- Seq: 3
- Category: PAGE_OWNER
- Priority: P0

## Context
`/travel-tools` 통합 여행 준비 페이지 조립. 이 Task는 승인된 Screen의 Route Page를 실제로 조립하는 Page Owner Task다. 대상 범위: SCR-003. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 3에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-011,REQ-FUNC-012,REQ-FUNC-013,REQ-FUNC-014,REQ-FUNC-015,REQ-FUNC-016,REQ-FUNC-017,REQ-FUNC-018,REQ-FUNC-019,REQ-FUNC-020,REQ-FUNC-021,REQ-FUNC-022,REQ-FUNC-023,REQ-FUNC-024,REQ-FUNC-025,REQ-FUNC-026,REQ-FUNC-027,REQ-FUNC-028,REQ-FUNC-031,REQ-FUNC-032,REQ-FUNC-054,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-070,REQ-FUNC-079,REQ-FUNC-080; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-017,REQ-NF-021,REQ-NF-023,REQ-NF-030

## Screen / Route / Page Entry
- Screen: SCR-003
- Route: `/travel-tools`
- Page Entry: `src/app/travel-tools/page.tsx`

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SC003-TABS-SHELL, COMPONENT-SC003-FLIGHT-FORM, COMPONENT-SC003-HOTEL-FORM, COMPONENT-SC003-MATE-WRITE, API-MATES-WRITE, API-AUTH, DATA-POLICY-CONTENT

## Expected Files
`src/app/travel-tools/page.tsx`(신규)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
1. Intro(이용 순서 3단계) — 데이터 출처: 없음(정적 문구)
2. Tab(항공편/숙소/동행 구하기) — 데이터 출처: 없음(UI 상태)
3. 여행 정보 입력 Form — 데이터 출처: 없음(클라이언트 상태만, 서버 미전송)
4. 입력 요약 + 외부 이동 CTA — 데이터 출처: 없음(클라이언트 상태)
5. 비전달 고지 + Tip **3개** — 데이터 출처: 정적 문구
6. 동행 탭: 로그인 안내 또는 작성 Form + 안전 안내 — 데이터 출처: `API-AUTH`, `API-MATES-WRITE`, `src/data/policies.ts`

**반응형 밀도:** Desktop Form 2열, 요약 Action Card 우측. Mobile Form 1열, Tab 가로 스크롤. 세 Tab은 서로 독립된 입력·검증·완료 상태를 유지한다.

## Visual AC
Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. Tip 3개는 각각 구체적 문구를 채우고 자리표시자를 쓰지 않는다. 탭별 Loading(외부 이동 처리 중 스켈레톤/버튼 비활성)과 Error(날짜 검증 실패/외부 URL 오류 시 인라인 오류 배너+재시도)를 UI_CONTRACT SCR-003 상태 정의대로 각 탭에 독립 적용한다(D-001 Loading/Error 규칙).

## Security/Privacy AC
항공·숙소 입력값(국가/지역/날짜)을 서버·DB·외부 URL 쿼리에 전달하지 않음(클라이언트 상태 한정)

## Test Cases
- Functional AC 7개(또는 6개) 항목이 모두 렌더링되는지 확인 (수동 QA + E2E-TRAVEL-TOOLS)
- 데이터 0건 상태에서 완성형 Empty State가 표시되는지 확인
- Lorem ipsum/`준비 중`/`정보 확인 필요`/빈 Card가 없는지 확인
- Desktop(1440px)/Mobile(390px) 각각에서 반응형 밀도 규칙 확인

## Verify
E2E-TRAVEL-TOOLS

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(E2E-TRAVEL-TOOLS) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음
- [ ] 신규 페이지이므로 Next.js 기본 스캐폴드 텍스트/링크가 애초에 존재하지 않음(확인만)

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- 이 Task는 하위 Component/Data/API를 새로 구현하지 않는다 — Depends On에 명시된 Task의 산출물을 import하여 Page Entry에서 조립만 한다.
- 다른 Screen의 Route(Page Entry)를 동시에 소유하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
