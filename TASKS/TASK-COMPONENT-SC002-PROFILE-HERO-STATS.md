# COMPONENT-SC002-PROFILE-HERO-STATS — Profile Hero + 지표 3개

- Seq: 16
- Category: COMPONENT
- Priority: P1

## Context
Profile Hero + 지표 3개. 이 Task는 하나 이상의 Page Owner Task가 의존하는 화면 구성요소를 구현한다. 대상 범위: SCR-002. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 16에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-057,REQ-FUNC-058

## Screen / Route / Page Entry
- Screen: SCR-002
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
DATA-REPRESENTATIVE

## Expected Files
`src/components/about/ProfileHero.tsx`, `src/components/about/StatCards.tsx`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
소개문·철학 문단, 지표 3개(50+/30+/활동연차)

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- Functional AC(`소개문·철학 문단, 지표 3개(50+/30+/활동연차)`)를 충족하는 동작 확인
- 검증 경로: E2E-PUBLIC-SMOKE

## Verify
E2E-PUBLIC-SMOKE

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(E2E-PUBLIC-SMOKE) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
