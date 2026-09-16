# COMPONENT-SC003-HOTEL-FORM — 숙소 조건 Form+요약+외부이동

- Seq: 23
- Category: COMPONENT
- Priority: P0

## Context
숙소 조건 Form+요약+외부이동. 이 Task는 하나 이상의 Page Owner Task가 의존하는 화면 구성요소를 구현한다. 대상 범위: SCR-003. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 23에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-019,REQ-FUNC-020,REQ-FUNC-021,REQ-FUNC-022,REQ-FUNC-023,REQ-FUNC-024,REQ-FUNC-025,REQ-FUNC-026; REQ-NF-017

## Screen / Route / Page Entry
- Screen: SCR-003
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
COMPONENT-SC003-TABS-SHELL

## Expected Files
`src/components/travel-tools/HotelForm.tsx`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
국가·지역·체크인·체크아웃; 체크아웃≤체크인 차단; 요약 후 새 탭 외부이동

## Visual AC
비전달 고지 문구 상시 노출

## Security/Privacy AC
입력값 서버·DB·URL query 미전송

## Test Cases
- Functional AC(`국가·지역·체크인·체크아웃; 체크아웃≤체크인 차단; 요약 후 새 탭 외부이동`)를 충족하는 동작 확인
- 검증 경로: UNIT-TRAVEL-DATES, E2E-TRAVEL-TOOLS

## Verify
UNIT-TRAVEL-DATES, E2E-TRAVEL-TOOLS

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(UNIT-TRAVEL-DATES, E2E-TRAVEL-TOOLS) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- 항공·숙소 입력값(국가/지역/날짜)을 서버·DB·외부 URL 쿼리로 전송하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
