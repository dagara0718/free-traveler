# UNIT-TRAVEL-DATES — 날짜 검증 단위 테스트

- Seq: 50
- Category: UNIT
- Priority: P0

## Context
날짜 검증 단위 테스트. 이 Task는 단위 테스트를 작성한다. 대상 범위: SCR-003. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 50에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-013,REQ-FUNC-021

## Screen / Route / Page Entry
- Screen: SCR-003
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
COMPONENT-SC003-FLIGHT-FORM, COMPONENT-SC003-HOTEL-FORM

## Expected Files
`src/lib/validation/travelDates.test.ts`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
과거일/역전일/동일일 경계값 전부 차단 검증

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- 경계값(정상/실패) 케이스를 모두 포함한 단위 테스트 작성
- ``src/lib/validation/travelDates.test.ts`` 실행 시 100% 통과

## Verify
CI

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(CI) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
