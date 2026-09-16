# E2E-PUBLIC-SMOKE — Chromium Smoke: 공개 탐색 흐름

- Seq: 54
- Category: E2E
- Priority: P0

## Context
Chromium Smoke: 공개 탐색 흐름. 이 Task는 Chromium 기반 Playwright Smoke Test를 작성한다. 대상 범위: SCR-001, SCR-002. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 54에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-001,REQ-FUNC-004,REQ-FUNC-006,REQ-FUNC-047,REQ-FUNC-050,REQ-FUNC-057,REQ-FUNC-063

## Screen / Route / Page Entry
- Screen: SCR-001, SCR-002
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
PAGE-SCR001, PAGE-SCR002

## Expected Files
`e2e/public-smoke.spec.ts`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
여행지 목록→필터→상세 Drawer→안전정보 Drawer 전환, About 이동 3개 흐름

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- ``e2e/public-smoke.spec.ts``에 Requirement Ref의 핵심 흐름을 Chromium 기준으로 구현
- 크로스 브라우저(firefox/webkit) 테스트를 추가하지 않는다

## Verify
Chromium 단일 실행(CI)

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(Chromium 단일 실행(CI)) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- Chromium 외 브라우저 매트릭스, 부하 테스트를 추가하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
