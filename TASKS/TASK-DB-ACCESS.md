# DB-ACCESS — Supabase 클라이언트/서버 접근 레이어

- Seq: 44
- Category: DB
- Priority: P0

## Context
Supabase 클라이언트/서버 접근 레이어. 이 Task는 Supabase 스키마/RLS/서버 접근 계층을 구현한다. 대상 범위: 5개 Screen 공통. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 44에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-017,REQ-FUNC-025,REQ-FUNC-044; REQ-NF-014,REQ-NF-015,REQ-NF-016,REQ-NF-017

## Screen / Route / Page Entry
- Screen: ALL
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
DB-SCHEMA-BASE, DB-RLS-BASE

## Expected Files
`src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
Server Action 기본 CSRF 보호, 입력 검증(zod 등)로 XSS 방지

## Visual AC
해당 없음

## Security/Privacy AC
비밀키 환경변수만 사용, 클라이언트 번들 미포함; 항공·숙소 입력 미저장

## Test Cases
- Functional AC(`Server Action 기본 CSRF 보호, 입력 검증(zod 등)로 XSS 방지`)를 충족하는 동작 확인
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
