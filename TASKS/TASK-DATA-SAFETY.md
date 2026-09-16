# DATA-SAFETY — 국가 안전정보 정적 데이터

- Seq: 47
- Category: DATA
- Priority: P0

## Context
국가 안전정보 정적 데이터. 이 Task는 `src/data`의 정적 데이터를 작성한다. DB 접근 코드를 포함하지 않는다. 대상 범위: SCR-001. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 47에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준). 지정 구현 방법: `src/data` 정적 데이터, 앱 내 CMS 없음 — `docs/PROJECT_SCOPE.md` EXCLUDED(전체 콘텐츠 CMS)와 충돌하지 않는지 확인.

## Requirement Ref
REQ-FUNC-046,REQ-FUNC-047,REQ-FUNC-048,REQ-FUNC-049,REQ-FUNC-050,REQ-FUNC-051,REQ-FUNC-052,REQ-FUNC-053,REQ-FUNC-054; REQ-NF-027,REQ-NF-028

## Screen / Route / Page Entry
- Screen: SCR-001
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
없음

## Expected Files
`src/data/safety.ts`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
게시 해외국가 전체 커버리지; 8개 카테고리+출처+최종확인일 TS 타입 강제

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- Functional AC(`게시 해외국가 전체 커버리지; 8개 카테고리+출처+최종확인일 TS 타입 강제`)를 충족하는 동작 확인
- 검증 경로: 수동 데이터 검수

## Verify
수동 데이터 검수

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(수동 데이터 검수) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
