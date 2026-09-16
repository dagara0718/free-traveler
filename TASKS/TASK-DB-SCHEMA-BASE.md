# DB-SCHEMA-BASE — Supabase 스키마(6테이블 제한)

- Seq: 42
- Category: DB
- Priority: P0

## Context
Supabase 스키마(6테이블 제한). 이 Task는 Supabase 스키마/RLS/서버 접근 계층을 구현한다. 대상 범위: 5개 Screen 공통. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 42에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준). 지정 구현 방법: `src/data` 정적 데이터, 앱 내 CMS 없음 — `docs/PROJECT_SCOPE.md` EXCLUDED(전체 콘텐츠 CMS)와 충돌하지 않는지 확인.

## Requirement Ref
REQ-FUNC-028,REQ-FUNC-029,REQ-FUNC-031,REQ-FUNC-039,REQ-FUNC-040,REQ-FUNC-041,REQ-FUNC-077

## Screen / Route / Page Entry
- Screen: ALL
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
없음

## Expected Files
`supabase/migrations/0001_schema.sql`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
Table: `user_profile`; Table: `mate_post`; Table: `mate_application`; Table: `user_block`; Table: `report`; Table: `admin_setting` — 6개 초과 금지

## Visual AC
해당 없음

## Security/Privacy AC
감사 로그/미디어/콘텐츠 테이블 생성 안 함(정적 데이터로 대체)

## Test Cases
- Functional AC(`Table: `user_profile`; Table: `mate_post`; Table: `mate_application`; Table: `user_block`; Table: `report`; Table: `admin_setting` — 6개 초과 금지`)를 충족하는 동작 확인
- 검증 경로: TEST-RLS-BASIC

## Verify
TEST-RLS-BASIC

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(TEST-RLS-BASIC) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- `docs/00_TASK_LIST.md`/`DB-SCHEMA-BASE`에 정의된 6개 테이블(`user_profile`,`mate_post`,`mate_application`,`user_block`,`report`,`admin_setting`) 외 테이블을 추가하지 않는다.
- 감사 로그·미디어·콘텐츠용 테이블을 만들지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
