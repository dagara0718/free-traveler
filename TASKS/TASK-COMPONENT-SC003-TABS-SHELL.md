# COMPONENT-SC003-TABS-SHELL — 항공/숙소/동행 3-Tab 컨테이너

- Seq: 21
- Category: COMPONENT
- Priority: P0

## Context
항공/숙소/동행 3-Tab 컨테이너. 이 Task는 하나 이상의 Page Owner Task가 의존하는 화면 구성요소를 구현한다. 대상 범위: SCR-003. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 21에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
없음(구조적 지원 Task)

## Screen / Route / Page Entry
- Screen: SCR-003
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
없음

## Expected Files
`src/components/travel-tools/TravelToolsTabs.tsx`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
3탭 각각 독립 입력·검증·완료 상태(다른 탭에 영향 없음)

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- Functional AC(`3탭 각각 독립 입력·검증·완료 상태(다른 탭에 영향 없음)`)를 충족하는 동작 확인
- 검증 경로: E2E-TRAVEL-TOOLS

## Verify
E2E-TRAVEL-TOOLS

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(E2E-TRAVEL-TOOLS) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
