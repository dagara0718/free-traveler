# COMPONENT-SHELL-HEADER-FOOTER — 전역 Header/Footer 공용 컴포넌트

- Seq: 6
- Category: COMPONENT
- Priority: P0

## Context
전역 Header/Footer 공용 컴포넌트. 이 Task는 하나 이상의 Page Owner Task가 의존하는 화면 구성요소를 구현한다. 대상 범위: 5개 Screen 공통. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 6에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-023

## Screen / Route / Page Entry
- Screen: ALL
- Route: -
- Page Entry: -

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
없음

## Expected Files
`src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/app/layout.tsx`(기존 파일 수정)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
5개 Screen 공통 재사용; 로고/내비4개/로그인·아바타; 320px~데스크톱 반응형; 활성 라우트 코랄 밑줄

## Visual AC
하드코딩 색상 없이 D-001 토큰만 사용

## Security/Privacy AC
개인정보 미포함

## Test Cases
- Functional AC(`5개 Screen 공통 재사용; 로고/내비4개/로그인·아바타; 320px~데스크톱 반응형; 활성 라우트 코랄 밑줄`)를 충족하는 동작 확인
- 검증 경로: MANUAL-CHECK-ACCESSIBILITY

## Verify
MANUAL-CHECK-ACCESSIBILITY

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(MANUAL-CHECK-ACCESSIBILITY) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
