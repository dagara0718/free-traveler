# Free Traveler — CLAUDE.md

이 파일은 Free Traveler(`traveler/app`) 작업의 유일한 규칙 소스다. 다른 Agent 규칙 파일을 참조하지 않는다 — 필요한 규칙은 전부 아래에 직접 기록되어 있다.

## Harness Marker

```
HARNESS_SCHEMA=traveler-screen-route-v1
DESIGN_PATH=design-reference/D-001/DESIGN.md
SCREEN_CONTRACT=design-reference/SCREEN_ROUTE_CONTRACT.json
PROJECT_SCOPE=docs/PROJECT_SCOPE.md
PLAYWRIGHT_ENABLED=true
PLAYWRIGHT_SCOPE=chromium-smoke
AUTO_MERGE=false
AWS_ENABLED=false
```

## 정본(Source of Truth)

| 항목 | 정본 |
|---|---|
| SRS | `docs/06_SRS_UIUX_REVISED.md` |
| Scope 분류(IMPLEMENT/EXCLUDED) | `docs/PROJECT_SCOPE.md` |
| 디자인 토큰·규칙 | `design-reference/D-001/DESIGN.md` (Status: LOCKED) |
| Screen/Route/Page Entry | `design-reference/SCREEN_ROUTE_CONTRACT.json` (`schema_version` = `traveler-screen-route-v1`) |
| Task 목록 | `TASKS/00_TASK_LIST.md` + `TASKS/TASK-<ID>.md` |

정본끼리 내용이 어긋나면 위 표의 정본을 따르고, 어긋남 자체를 사용자에게 보고한다. 정본을 바꾸려면 `docs/DECISION_LOG.md`에 새 DEC 항목을 추가한 뒤 바꾼다.

## 필수 규칙

1. 작업 전 `package.json`과 현재 설치된 Next.js 버전의 공식 문서를 확인한다. 기억에 의존해 API를 추정하지 않는다.
2. SRS 정본은 `docs/06_SRS_UIUX_REVISED.md`다. Baseline SRS(`docs/02_SRS_BASELINE.md`)의 Requirement 본문은 유지하되, Screen/Route 배치는 이 개정본을 따른다.
3. Scope 분류 정본은 `docs/PROJECT_SCOPE.md`다. 어떤 Requirement가 IMPLEMENT인지 EXCLUDED인지는 이 문서로만 판단한다.
4. 디자인 정본은 `design-reference/D-001/DESIGN.md`다. 색상·타이포·spacing·radius·shadow는 이 문서의 토큰만 쓴다.
5. Screen 정본은 `design-reference/SCREEN_ROUTE_CONTRACT.json`이다. Screen 개수(5개)와 Route/Page Entry는 이 파일 값을 그대로 쓴다.
6. `/run-wave WXX`를 표준 개발 명령으로 사용한다. Wave 범위는 사용자가 지정한 Task 묶음이며, 지정된 범위 밖 Task에 임의로 착수하지 않는다.
7. Wave 내부 Task는 `TASKS/00_TASK_LIST.md`의 Depends On 순서를 따라 **한 번에 하나만** 구현한다. 의존성이 끝나지 않은 Task를 먼저 건드리지 않는다.
8. 현재 진행 중인 Task의 Expected Files 목록 밖 파일은 수정하지 않는다.
9. Page Owner Task는 Page Entry(`page.tsx`)에서 Depends On에 명시된 Component/Data/API를 **실제로 조립**하는 것만 범위로 한다 — 하위 Component를 새로 구현하지 않는다.
10. SCR-001(`src/app/page.tsx`) 완료 시 Next.js 기본 Starter 스캐폴드(로고, 기본 템플릿 텍스트·링크)를 완전히 제거한다.
11. SCR-003(`src/app/travel-tools/page.tsx`)은 항공·숙소·동행 작성 3개 Tab을 모두 조립한다. 하나라도 빠진 상태로 완료 보고하지 않는다.
12. 항공·숙소 입력값(국가/지역/날짜)은 서버·DB·URL 쿼리·로그·분석 이벤트 어디로도 보내지 않는다. Client Component의 일시 상태로만 유지한다.
13. Supabase 쓰기(Insert/Update/Delete)는 Auth·동행(mate_post/mate_application)·차단(user_block)·신고(report)·관리자 설정(admin_setting) 범위로 제한한다. 이 6개 테이블(`user_profile` 포함) 밖의 테이블을 새로 만들지 않는다.
14. RLS를 우회하는 Client 코드(Service Role Key로 클라이언트 쿼리, RLS 무시 옵션 사용 등)를 작성하지 않는다.
15. Service Role Key를 Client Component·브라우저 번들 어디에도 쓰지 않는다. 서버 전용 모듈(`src/lib/supabase/server.ts` 등)에서만 환경변수로 참조한다.
16. 여행지·안전정보·대표(About) 콘텐츠는 `src/data/*.ts` 정적 데이터를 사용한다. 이 콘텐츠를 위한 DB 테이블이나 CMS를 만들지 않는다.
17. Prisma를 포함한 ORM, AWS, EC2를 추가하지 않는다. DB 접근은 Supabase JS 클라이언트로 직접 쿼리한다.
18. Playwright는 핵심 Smoke Test만 작성한다(`PLAYWRIGHT_SCOPE=chromium-smoke`). 크로스 브라우저 매트릭스나 부하 테스트를 추가하지 않는다.
19. `docs/PROJECT_SCOPE.md`/`docs/UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 기능을 임의로 구현하지 않는다. 필요하다고 판단되면 구현 대신 `docs/DECISION_LOG.md`에 재검토 필요성만 기록하고 사용자에게 확인한다.
20. `git reset --hard`, `git clean -f`, `git checkout --force`, `git push --force` 등 destructive Git 명령을 사용자 명시적 요청 없이 사용하지 않는다.
21. 자동 PR 생성이나 자동 Merge를 실행하지 않는다(`AUTO_MERGE=false`). PR은 만들 수 있으나 Merge는 항상 사람이 한다.
22. 화면 단위 작업은 사람이 Preview를 확인한 뒤에만 다음 화면 Wave로 진행한다. 확인 없이 여러 화면을 연달아 구현하지 않는다.
23. 작업 완료 시 ① 변경된 파일 목록 ② 검증 결과(빌드/Lint/Test/Playwright) ③ 남은 제한사항(미완료 AC, 수동 확인 필요 항목)을 보고한다.

## Task 완료 순서

Task마다 아래 순서를 그대로 따른다. 순서를 건너뛰지 않는다.

1. **Task 읽기** — `TASKS/TASK-<ID>.md`의 Context/Requirement Ref/Screen·Route·Page Entry/Depends On/Expected Files/Functional·Visual·Security AC/Forbidden을 전부 읽는다.
2. **입력 확인** — Depends On Task가 실제로 완료되어 있는지, 참조할 정본 파일(SRS/Scope/Design/Screen Contract)이 최신인지 확인한다.
3. **구현** — Expected Files 안에서만 코드를 작성한다. Forbidden에 적힌 사항을 만들지 않는다.
4. **관련 포맷·Unit Test** — 해당 코드에 필요한 포맷(Prettier/ESLint) 정리와 관련 Vitest 단위 테스트를 실행한다.
5. **필요 시 Playwright** — Task가 E2E 대상(Page Owner 완료, 핵심 흐름 변경 등)이면 Chromium Smoke Test를 실행한다. 해당 없으면 생략한다.
6. **Diff 확인** — 변경된 파일이 Expected Files와 정확히 일치하는지 diff로 재확인한다.
7. **완료 보고** — 변경 파일·검증 결과·남은 제한사항을 사용자에게 보고한다.
