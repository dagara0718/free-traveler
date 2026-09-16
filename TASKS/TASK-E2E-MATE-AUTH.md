# E2E-MATE-AUTH — Chromium Smoke: 가입~동행~신고 흐름

- Seq: 56
- Category: E2E
- Priority: P0

## Context
Chromium Smoke: 가입~동행~신고 흐름. 이 Task는 Chromium 기반 Playwright Smoke Test를 작성한다. 대상 범위: SCR-003, SCR-004, SCR-005. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 56에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-027,REQ-FUNC-028,REQ-FUNC-031,REQ-FUNC-032,REQ-FUNC-034,REQ-FUNC-036,REQ-FUNC-039,REQ-FUNC-040,REQ-FUNC-043,REQ-FUNC-045,REQ-FUNC-066

## Screen / Route / Page Entry
- Screen: SCR-003, SCR-004, SCR-005
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
PAGE-SCR003, PAGE-SCR004, PAGE-SCR005

## Expected Files
`e2e/mate-auth.spec.ts`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
가입·성인확인→동행글 작성(연락처탐지)→참가요청→승인/거절→신고/차단→내활동 확인 1개 흐름

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- ``e2e/mate-auth.spec.ts``에 Requirement Ref의 핵심 흐름을 Chromium 기준으로 구현
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
