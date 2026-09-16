# PAGE-SCR004 — `/mates` 동행 조회 페이지 조립

- Seq: 4
- Category: PAGE_OWNER
- Priority: P0

## Context
`/mates` 동행 조회 페이지 조립. 이 Task는 승인된 Screen의 Route Page를 실제로 조립하는 Page Owner Task다. 대상 범위: SCR-004. 이 Task는 `TASKS/00_TASK_LIST.md`의 Seq 4에 대응한다.

## Project Scope
Implementation Status: **IMPLEMENT** (`docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md` 기준).

## Requirement Ref
REQ-FUNC-030,REQ-FUNC-033,REQ-FUNC-034,REQ-FUNC-035,REQ-FUNC-036,REQ-FUNC-037,REQ-FUNC-039,REQ-FUNC-040,REQ-FUNC-043,REQ-FUNC-044,REQ-FUNC-064,REQ-FUNC-065,REQ-FUNC-069,REQ-FUNC-070,REQ-FUNC-079; REQ-NF-001,REQ-NF-002,REQ-NF-003,REQ-NF-006,REQ-NF-019,REQ-NF-021,REQ-NF-023,REQ-NF-030

## Screen / Route / Page Entry
- Screen: SCR-004
- Route: `/mates`
- Page Entry: `src/app/mates/page.tsx`

## Design Ref
`design-reference/D-001/DESIGN.md`(토큰: colors/typography/spacing/rounded/shadow, Section 리듬·Empty State 규칙); `design-reference/UI_CONTRACT.md`(해당 Screen의 영역 순서·주요 Component·상태·금지 기능); `design-reference/SCREEN_ROUTE_CONTRACT.json`(Route/Page Entry 정본)

## Depends On
COMPONENT-SHELL-HEADER-FOOTER, COMPONENT-SEO-METADATA, COMPONENT-SHARE-BUTTON, COMPONENT-SC004-FILTER-BAR, COMPONENT-SC004-LIST, COMPONENT-SC004-DETAIL-PANEL, COMPONENT-SC004-APPLY-FLOW, COMPONENT-SC004-REPORT-BLOCK, API-MATES-READ, API-APPLICATIONS, API-BLOCKS, API-REPORTS

## Expected Files
`src/app/mates/page.tsx`(신규)

이 목록 밖의 파일은 이 Task에서 수정하지 않는다.

## Functional AC
1. Intro + 새 동행글 작성 CTA — 데이터 출처: 없음(정적 문구)
2. Filter + 결과 요약 — 데이터 출처: `API-MATES-READ`
3. 동행글 목록(최대 **8개** 우선 노출) — 데이터 출처: `API-MATES-READ`
4. 상세 패널 — 데이터 출처: `API-MATES-READ`
5. 참가 신청 방법 **3단계** 안내 — 데이터 출처: 정적 문구
6. 안전·신고·차단 안내 + CTA — 데이터 출처: 정적 문구 + `API-REPORTS`/`API-BLOCKS`

**반응형 밀도:** Desktop 좌측 40%(목록)+우측 60%(상세) 분할. Mobile 목록→카드 탭→하단 상세 Drawer. Section 여백 Desktop 80px/Mobile 48px.

## Visual AC
Lorem ipsum/준비 중/정보 확인 필요/빈 Card 금지. 목록 0건 시 ① 조건 완화 안내 ② 이용 방법 ③ "새 동행글 작성" CTA를 갖춘 완성형 Empty State를 표시한다.
- Loading: 목록/상세 패널은 실제 크기와 동일한 스켈레톤으로 표시한다(D-001 Loading 규칙).
- Error: 목록·상세 로딩 실패 시 인라인 오류 배너(원인 설명+재시도)를 표시한다. 비로그인·미성년 참가 신청 시도는 오류 화면 대신 로그인 유도 모달로 대체한다(D-001 Error/Unauthorized 규칙).

## Security/Privacy AC
목록·상세 어디에도 전화번호/메신저ID/이메일 노출 없음; 차단 사용자 상호 비노출(RLS)

## Test Cases
- Functional AC 7개(또는 6개) 항목이 모두 렌더링되는지 확인 (수동 QA + E2E-MATE-AUTH)
- 데이터 0건 상태에서 완성형 Empty State가 표시되는지 확인
- Lorem ipsum/`준비 중`/`정보 확인 필요`/빈 Card가 없는지 확인
- Desktop(1440px)/Mobile(390px) 각각에서 반응형 밀도 규칙 확인

## Verify
E2E-MATE-AUTH

## Definition of Done
- [ ] Functional AC 전 항목 충족
- [ ] Visual AC 전 항목 충족(해당 시)
- [ ] Security/Privacy AC 전 항목 충족(해당 시)
- [ ] Verify(E2E-MATE-AUTH) 통과
- [ ] Expected Files 목록 밖 파일 변경 없음
- [ ] 신규 페이지이므로 Next.js 기본 스캐폴드 텍스트/링크가 애초에 존재하지 않음(확인만)

## Forbidden
- Expected Files 목록 밖의 파일을 수정하지 않는다.
- 이 Task는 하위 Component/Data/API를 새로 구현하지 않는다 — Depends On에 명시된 Task의 산출물을 import하여 Page Entry에서 조립만 한다.
- 다른 Screen의 Route(Page Entry)를 동시에 소유하지 않는다.
- EC2/AWS, 자동 Merge Runner, 부하 테스트 인프라, 외부 이메일 발송(SES/SendGrid 등)을 도입하지 않는다.
- `docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement의 기능을 구현하지 않는다(해당 항목은 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표 참고).
