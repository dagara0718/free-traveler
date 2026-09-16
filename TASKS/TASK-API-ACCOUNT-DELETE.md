# API-ACCOUNT-DELETE — 탈퇴/개인정보 삭제

- Seq: 41
- Category: API
- Priority: P1

## Context
탈퇴/개인정보 삭제. 이 Task는 Supabase 기반 서버 로직(Server Action/Route Handler)을 구현한다. 대상 범위: SCR-005. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 41에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-045; REQ-NF-018

## Screen / Route / Page Entry
- Screen: SCR-005
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
DB-SCHEMA-BASE, DB-ACCESS

## Expected Files
`src/lib/server/account.ts`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
탈퇴 즉시 프로필 비식별화; 데이터 내보내기 최소 JSON 제공

## Visual AC
해당 없음

## Security/Privacy AC
분쟁보존 대상 제외 개인정보 처리

## Test Cases
- Functional AC(`탈퇴 즉시 프로필 비식별화; 데이터 내보내기 최소 JSON 제공`)를 충족하는 동작 확인
- 검증 경로: 수동 QA

## Verify
수동 QA

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(수동 QA) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
