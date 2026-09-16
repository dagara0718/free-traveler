# OPS-VERCEL-SUPABASE-CHECK — Vercel/Supabase 배포·비용 확인

- Seq: 61
- Category: OPS
- Priority: P1

## Context
Vercel/Supabase 배포·비용 확인. 이 Task는 CI/배포 파이프라인 설정 또는 배포 환경 확인을 수행한다. 대상 범위: 5개 Screen 공통. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 61에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-NF-012,REQ-NF-034

## Screen / Route / Page Entry
- Screen: ALL
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
OPS-CI-PIPELINE

## Expected Files
없음(배포 콘솔/청구 확인)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
Vercel Hobby/Pro + Supabase Free tier만 사용, EC2/AWS 미사용 확인; HTTPS/TLS 플랫폼 기본 제공 확인

## Visual AC
해당 없음

## Security/Privacy AC
해당 없음

## Test Cases
- 설정/파이프라인이 의도대로 동작하는지 1회 수동 실행으로 확인

## Verify
배포 콘솔 수동 확인

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(배포 콘솔 수동 확인) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
