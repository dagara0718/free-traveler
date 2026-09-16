# PAGE-SCR005 — `/account` 계정·관리 페이지 조립

- Seq: 5
- Category: PAGE_OWNER
- Priority: P0

## Context
`/account` 계정·관리 페이지 조립. 이 Task는 승인된 Screen의 Route Page를 실제로 조립하는 Page Owner Task다. 대상 범위: SCR-005. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 5에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-028,REQ-FUNC-029,REQ-FUNC-036,REQ-FUNC-038,REQ-FUNC-040,REQ-FUNC-041,REQ-FUNC-043,REQ-FUNC-045,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-066,REQ-FUNC-070,REQ-FUNC-077,REQ-FUNC-079,REQ-FUNC-080; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-018,REQ-NF-023,REQ-NF-030,REQ-NF-034

## Screen / Route / Page Entry
- Screen: SCR-005
- Route: `/account`
- Page Entry: `src/app/account/page.tsx`

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SC005-AUTH, COMPONENT-SC005-PROFILE, COMPONENT-SC005-MY-ACTIVITY, COMPONENT-SC005-ADMIN, API-AUTH, API-APPLICATIONS, API-BLOCKS, API-ADMIN-SETTINGS, API-ACCOUNT-DELETE, DATA-POLICY-CONTENT

## Expected Files
`src/app/account/page.tsx`(신규)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
1. Guest: 계정 기능 Intro + 로그인/가입/재설정 Card — 데이터 출처: `API-AUTH`
2. Member: 프로필 + 내 활동(내 글/받은 요청/차단목록) — 데이터 출처: `API-AUTH`, `API-MATES-WRITE`, `API-APPLICATIONS`, `API-BLOCKS`
3. Admin: 관리 Intro + 신고 상태 변경 + 외부 URL 설정 — 데이터 출처: `API-REPORTS`, `API-ADMIN-SETTINGS`

역할에 없는 관리 영역(Tab)은 렌더링하지 않는다(Guest에게 Member/Admin Tab 미노출, Member에게 Admin Tab 미노출).

**반응형 밀도:** Desktop 좌측 세로 Tab. Mobile 상단 가로 Tab/드롭다운. Section 여백 Desktop 80px/Mobile 48px.

## Visual AC
Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. 내 글/받은 요청/차단 목록이 각각 0건이어도 완성형 Empty State(설명+이용방법+CTA)를 표시한다. Admin 탭에 통계 대시보드·차트를 추가하지 않는다.
- Loading: 프로필/내 활동/Admin 목록은 실제 크기와 동일한 스켈레톤으로 표시한다(D-001 Loading 규칙).
- Error: 저장/상태변경 실패 시 인라인 오류 메시지를 표시한다. Guest가 Member/Admin Tab URL에 직접 접근하면 오류 화면 대신 로그인 유도 화면으로 대체한다(D-001 Error/Unauthorized 규칙).

## Security/Privacy AC
역할 검사는 서버(Server Action)에서 수행; Admin 탭에 통계 대시보드 없음; 정확한 생년월일 미저장

## Test Cases
- Functional AC 7개(또는 6개) 항목이 모두 렌더링되는지 확인 (수동 QA + E2E-MATE-AUTH)
- 데이터 0건 상태에서 완성형 Empty State가 표시되는지 확인
- Lorem ipsum/`준비 중`/`정보 확인 필요`/빈 Card가 없는지 확인
- Desktop(1440px)/Mobile(390px) 각각에서 반응형 밀도 규칙 확인

## Verify
E2E-MATE-AUTH

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(E2E-MATE-AUTH) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음
- [ ] 신규 페이지이므로 Next.js 기본 스캐폴드 텍스트/링크가 애초에 존재하지 않음(확인만)

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- 이 Task는 하위 Component/Data/API를 새로 구현하지 않는다 — Depends On에 명시된 Task의 산출물을 import하여 Page Entry에서 조립만 한다.
- 다른 Screen의 Route(Page Entry)를 동시에 소유하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
