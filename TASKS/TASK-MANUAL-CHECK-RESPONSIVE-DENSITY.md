# MANUAL-CHECK-RESPONSIVE-DENSITY — 반응형 콘텐츠 밀도 점검

- Seq: 58
- Category: MANUAL_CHECK
- Priority: P1

## Context
반응형 콘텐츠 밀도 점검. 이 Task는 자동화가 어려운 항목을 브라우저에서 수동으로 점검한다. 대상 범위: 5개 Screen 공통. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 58에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-065

## Screen / Route / Page Entry
- Screen: ALL
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
PAGE-SCR001, PAGE-SCR002, PAGE-SCR003, PAGE-SCR004, PAGE-SCR005

## Expected Files
없음(체크리스트 기반 수동 점검)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
1440px/390px에서 Hero 다음 Section 노출, 큰 빈 영역 없음, Empty State 완성도 확인

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- 체크리스트 형태로 수동 점검 항목을 문서화하고 결과를 기록한다(자동화 코드 없음)

## Verify
브라우저 수동 확인

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(브라우저 수동 확인) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
