# Free Traveler — Decision Log

각 결정은 ID·결정·배경·근거 문서/파일·영향을 기록한다. 결정을 뒤집으려면 새 DEC 항목을 추가하고 이전 항목은 `Status: SUPERSEDED`로 남긴다(삭제하지 않는다).

---

## DEC-001 — 실제 개발 루트는 `traveler/app`

**Status:** ACCEPTED
**결정:** 이 저장소에서 Free Traveler의 실제 Next.js 프로젝트 루트는 `traveler/app`이다. 문서·Task·스크립트의 모든 상대 경로(`src/app`, `docs/`, `design-reference/`, `TASKS/`, `scripts/`)는 이 루트 기준이다.
**배경:** `package.json`, `src/app`(Next.js App Router 스캐폴드), `tsconfig.json` 등 실제 프로젝트 파일이 `traveler/app` 아래에 위치한다. 상위 디렉터리에는 무관한 개인 파일들이 섞여 있다.
**근거:** `package.json`, `src/app/*`, 현재 작업 디렉터리.
**영향:** 모든 후속 문서·스크립트·Task 파일 경로는 `traveler/app`을 루트로 가정한다.

## DEC-002 — 디자인 Screen은 핵심 4개·보조 1개

**Status:** ACCEPTED
**결정:** 공개 Route를 SCR-001~005 5개 디자인 Screen으로 고정한다. 핵심(Core): SCR-001(`/`), SCR-003(`/travel-tools`), SCR-004(`/mates`), SCR-005(`/account`). 보조(Support): SCR-002(`/about`).
**배경:** Baseline SRS의 다수 공개 Route(여행지/안전정보/항공/숙소/동행 각각 별도 페이지)를 Stitch 승인 화면 5개로 통합했다.
**근거:** `design-reference/SCREEN_ROUTE_CONTRACT.json`(`core_screens`/`support_screens`), `docs/05_UIUX_APPROVED.md`, `docs/STITCH_VALIDATION_REPORT.md`(SCR-001~005 PASS).
**영향:** 6번째 공개 Screen을 추가하지 않는다. 새 화면 요구가 생기면 기존 5개 Screen의 탭/패널/Drawer로 흡수하거나 이 결정을 개정(DEC 추가)한 뒤 진행한다.

## DEC-003 — `/travel-tools`에 항공·숙소·동행 작성 통합

**Status:** ACCEPTED
**결정:** 항공 조건 입력, 숙소 조건 입력, 동행 모집글 작성을 별도 페이지(`/flights`, `/hotels`, `/mates/new`)가 아니라 SCR-003(`/travel-tools`) 한 Route의 3개 Tab으로 통합한다. 각 Tab은 독립된 입력·검증·완료 상태를 가진다.
**근거:** `design-reference/UI_CONTRACT.md`(SCR-003 정의), `docs/05_UIUX_APPROVED.md` 2장(Route 통합 매핑), `TASKS/00_TASK_LIST.md`(`COMPONENT-SC003-FLIGHT-FORM`/`HOTEL-FORM`/`MATE-WRITE`).
**영향:** `src/app/flights`, `src/app/hotels`, `src/app/mates/new` 디렉터리를 만들지 않는다. 관련 REQ(REQ-FUNC-011~026, 031, 032 등)는 모두 `src/app/travel-tools/page.tsx` 산하 컴포넌트로 구현한다.

## DEC-004 — 여행지·안전·대표는 정적 TypeScript Data

**Status:** ACCEPTED
**결정:** 여행지, 국가 안전정보, 대표(About) 소개, 정책 콘텐츠는 DB 테이블이 아니라 `src/data/*.ts` 정적 TypeScript 데이터로 관리한다.
**배경:** 앱 내 콘텐츠 CMS(편집자 작성/검수/게시 워크플로)는 프로젝트 범위에서 제외했다(REQ-FUNC-055, 072, 074 EXCLUDED). 콘텐츠 변경은 코드 수정 + 재배포로 처리하고, 변경 이력은 Git 커밋 이력으로 대체한다(REQ-FUNC-056 EXCLUDED).
**근거:** `docs/PROJECT_SCOPE.md`(§구현 방식, EXCLUDED 사유), `docs/ARCHITECTURE.md` 6장, `TASKS/00_TASK_LIST.md`(`DATA-DESTINATIONS`/`DATA-SAFETY`/`DATA-REPRESENTATIVE`/`DATA-POLICY-CONTENT`).
**영향:** 이 콘텐츠를 위한 Supabase 테이블·API Route·업로드 폼을 만들지 않는다.

## DEC-005 — Supabase는 Auth와 동행 기능 중심

**Status:** ACCEPTED
**결정:** Supabase는 ① 이메일 인증(Auth, 성인 확인 상태 포함) ② 동행(Mate) 모집글·참가요청·차단·신고·관리자 설정에만 사용한다. 여행지/안전정보/대표 콘텐츠는 Supabase를 거치지 않는다(DEC-004와 결합).
**근거:** `docs/06_SRS_UIUX_REVISED.md`, `docs/PROJECT_SCOPE.md`, `docs/ARCHITECTURE.md` 7장.
**영향:** Supabase 스키마·RLS·API 설계는 동행/인증 도메인에만 집중한다(DEC-006과 연결).

## DEC-006 — DB는 6개 Table로 제한

**Status:** ACCEPTED
**결정:** Supabase Postgres 테이블은 `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `admin_setting` 6개로 제한한다. 감사 로그·미디어·콘텐츠·항공/숙소 조건 등 추가 테이블을 만들지 않는다.
**배경:** 범용 감사 로그(REQ-FUNC-076, REQ-NF-022 EXCLUDED), 미디어 라이선스 전체 관리(REQ-NF-029 EXCLUDED)가 제외 확정되어 이를 위한 테이블이 불필요해졌다.
**근거:** `TASKS/00_TASK_LIST.md`(`DB-SCHEMA-BASE`), `TASKS/TASK_MANIFEST.csv`, `scripts/audit_tasks.py`(check 12: DB Table 상한 검증), `docs/ARCHITECTURE.md` 8장.
**영향:** 새 테이블이 필요하다고 판단되면 먼저 이 결정을 개정(DEC 추가)한 뒤 스키마를 바꾼다. 감사 자동화가 6개 초과 시 실패하도록 이미 걸려 있다.

## DEC-007 — 항공·숙소 입력은 Browser Memory에만 유지

**Status:** ACCEPTED
**결정:** 항공·숙소 조건 입력값(국가/지역/날짜)은 Client Component의 일시 상태로만 유지한다. Server Action, Route Handler, Supabase 테이블, 외부 URL 쿼리, 서버 로그, 분석 이벤트 어디에도 전달·저장하지 않는다.
**근거:** Baseline SRS CON-01/CON-02, `docs/PROJECT_SCOPE.md`(REQ-FUNC-017/025), `docs/ARCHITECTURE.md` 4~5장, `TASKS/TASK-COMPONENT-SC003-FLIGHT-FORM.md`/`TASK-COMPONENT-SC003-HOTEL-FORM.md`.
**영향:** 이 값을 위한 API·DB 스키마를 설계하지 않는다. 새로고침·페이지 이탈 시 값이 사라지는 것은 의도된 동작이다.

## DEC-008 — Airbnb DESIGN.md는 vendor 참고본, D-001이 실제 정본

**Status:** ACCEPTED
**결정:** `design-reference/vendor/airbnb/DESIGN.md`는 레이아웃 밀도·섹션 구성·상태 설계 방식만 참고하는 읽기 전용 자료다. 실제 디자인 토큰·규칙의 정본은 `design-reference/D-001/DESIGN.md`(Status: LOCKED)이며, 색상·타이포·상표 요소는 Airbnb에서 차용하지 않는다.
**근거:** `design-reference/DESIGN_MANIFEST.md`(Active Design Version: D-001, Active File 지정), `design-reference/D-001/DESIGN.md`(Do Not: Airbnb 상표 요소 금지).
**영향:** 새 디자인 토큰이 필요하면 D-001을 개정(버전 증가)해서 반영하고, vendor 참고본은 수정하지 않는다.

## DEC-009 — Playwright는 Chromium Smoke만 필수

**Status:** ACCEPTED
**결정:** E2E 테스트는 Playwright, **Chromium 단일 브라우저** Smoke Test 3개(`E2E-PUBLIC-SMOKE`, `E2E-TRAVEL-TOOLS`, `E2E-MATE-AUTH`)로만 구성한다. 크로스 브라우저 매트릭스(Firefox/WebKit)와 부하 테스트는 만들지 않는다.
**근거:** `docs/PROJECT_SCOPE.md`(REQ-NF-004/005 부하 테스트 EXCLUDED), `TASKS/00_TASK_LIST.md`, `scripts/audit_tasks.py`(check 15).
**영향:** CI(`OPS-CI-PIPELINE`)는 Chromium Smoke만 실행하며, 추가 브라우저 타겟 요청은 이 결정 개정 없이는 반영하지 않는다.

## DEC-010 — 사용자의 개발 실행 단위는 Wave

**Status:** ACCEPTED
**결정:** 사용자는 개발 진행을 개별 Task 단위가 아니라 **Wave**(관련 Task를 묶은 실행 배치) 단위로 지시하고 검토한다. 하나의 Wave는 `TASKS/00_TASK_LIST.md`의 Task 여러 개를 묶어 한 번에 착수·완료 보고한다.
**배경:** 지금까지의 세션 진행 방식(문서화 Wave → Stitch 화면 Wave → 검증 Wave → Task 생성 Wave → 감사 Wave → 아키텍처 Wave)이 이 패턴을 따랐다.
**영향:** 향후 Task 착수는 "Wave 1: PAGE-SCR001 + 의존 Component/Data" 식으로 사용자가 지정한 Wave 범위 안에서만 진행한다. Wave 경계를 넘는 임의 착수를 하지 않는다.

## DEC-011 — Single Agent가 Wave 내부 Task를 순차 수행

**Status:** ACCEPTED
**결정:** 하나의 Wave 안에서는 Single Agent(현재 세션)가 Task를 **순차적으로** 수행한다. 여러 Task를 병렬 Agent로 동시 착수하지 않는다.
**배경:** Depends On 그래프(예: Page Owner는 Component/Data/API Task에 의존)가 이미 정의되어 있어, 의존성 순서를 지키는 순차 실행이 충돌·재작업 위험을 줄인다.
**근거:** `TASKS/00_TASK_LIST.md`(Depends On 열), `scripts/audit_tasks.py`(check 3/4: Depends On 누락·Cycle 검증).
**영향:** 병렬 멀티 에이전트 오케스트레이션(Workflow 등)은 사용자가 명시적으로 요청하기 전까지 사용하지 않는다.

## DEC-012 — PR·Merge는 사용자가 수동 수행

**Status:** ACCEPTED
**결정:** Pull Request 생성과 Merge는 사용자가 직접 수행한다. 에이전트는 Task 구현·커밋까지만 수행하고 PR 생성·Merge를 자동으로 트리거하지 않는다.
**근거:** DEC-015(자동 Merge 미사용)와 결합, `docs/ARCHITECTURE.md` 15장.
**영향:** CI 통과는 Merge의 필요조건일 뿐 충분조건이 아니다. 에이전트는 PR을 만들어 링크를 제시할 수는 있으나, 병합 승인은 항상 사용자 몫이다.

## DEC-013 — EC2·AWS는 사용하지 않음

**Status:** ACCEPTED
**결정:** AWS(EC2 포함) 인프라를 도입하지 않는다. 호스팅은 Vercel, 데이터/Auth는 Supabase만 사용한다.
**근거:** `docs/PROJECT_SCOPE.md`(제외 기능 목록), `docs/ARCHITECTURE.md` 14장, `scripts/validate_inputs.py`(check 11), `scripts/audit_tasks.py`(check 16, 금지어 스캔).
**영향:** S3/Lambda/RDS 등 AWS 관리형 서비스로 대체 구성하지 않는다. Task·문서 어디에도 EC2/AWS를 활성 기술로 기록하지 않는다(자동 검증 대상).

## DEC-014 — 제외 기능은 EXCLUDED로 관리

**Status:** ACCEPTED
**결정:** 구현하지 않는 Requirement는 삭제하지 않고 **EXCLUDED** 상태로 추적한다. 각 EXCLUDED 항목은 근거와 후속 방향을 함께 기록한다.
**근거:** `docs/PROJECT_SCOPE.md`(IMPLEMENT/EXCLUDED 분류, 20개), `docs/UIUX_TRACEABILITY.md`, `TASKS/00_TASK_LIST.md`(NON_IMPLEMENTATION 표), `scripts/audit_tasks.py`(check 17/18: 114개 전수 등장, EXCLUDED가 구현 Task에 섞이지 않음 자동 검증).
**영향:** 새로운 제외 결정이 필요하면 PROJECT_SCOPE.md → UIUX_TRACEABILITY.md → 00_TASK_LIST.md NON_IMPLEMENTATION 표 순으로 갱신하고, 감사 스크립트가 계속 114개 Requirement 전수 등장을 강제한다.

---

## 색인

| ID | 제목 | Status |
|---|---|---|
| DEC-001 | 실제 개발 루트는 `traveler/app` | ACCEPTED |
| DEC-002 | 디자인 Screen은 핵심 4개·보조 1개 | ACCEPTED |
| DEC-003 | `/travel-tools`에 항공·숙소·동행 작성 통합 | ACCEPTED |
| DEC-004 | 여행지·안전·대표는 정적 TypeScript Data | ACCEPTED |
| DEC-005 | Supabase는 Auth와 동행 기능 중심 | ACCEPTED |
| DEC-006 | DB는 6개 Table로 제한 | ACCEPTED |
| DEC-007 | 항공·숙소 입력은 Browser Memory에만 유지 | ACCEPTED |
| DEC-008 | Airbnb DESIGN.md는 vendor 참고본, D-001이 실제 정본 | ACCEPTED |
| DEC-009 | Playwright는 Chromium Smoke만 필수 | ACCEPTED |
| DEC-010 | 사용자의 개발 실행 단위는 Wave | ACCEPTED |
| DEC-011 | Single Agent가 Wave 내부 Task를 순차 수행 | ACCEPTED |
| DEC-012 | PR·Merge는 사용자가 수동 수행 | ACCEPTED |
| DEC-013 | EC2·AWS는 사용하지 않음 | ACCEPTED |
| DEC-014 | 제외 기능은 EXCLUDED로 관리 | ACCEPTED |
