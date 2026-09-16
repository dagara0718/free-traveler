# COMPONENT-SC004-REPORT-BLOCK — 신고/차단 버튼

- Seq: 29
- Category: COMPONENT
- Priority: P0

## Context
신고/차단 버튼. 이 Task는 하나 이상의 Page Owner Task가 의존하는 화면 구성요소를 구현한다. 대상 범위: SCR-004. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 29에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준). 지정 구현 방법: 실제 이메일 발송 대신 Toast/화면 상태로 알림 — `docs/PROJECT_SCOPE.md` §2 알림 항목과 일치.

## Requirement Ref
REQ-FUNC-039,REQ-FUNC-040; REQ-NF-019

## Screen / Route / Page Entry
- Screen: SCR-004
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
API-REPORTS, API-BLOCKS

## Expected Files
`src/components/mates/ReportButton.tsx`, `src/components/mates/BlockButton.tsx`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
신고 접수 3초 이내 접수번호 표시; 차단 후 상호 비노출

## Visual AC
Toast로 접수 확인

## Security/Privacy AC
신고 상세는 관리자만 열람

## Test Cases
- Functional AC(`신고 접수 3초 이내 접수번호 표시; 차단 후 상호 비노출`)를 충족하는 동작 확인
- 검증 경로: E2E-MATE-AUTH

## Verify
E2E-MATE-AUTH

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(E2E-MATE-AUTH) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
