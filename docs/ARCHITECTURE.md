# Free Traveler — Architecture

**기반 문서:** `docs/06_SRS_UIUX_REVISED.md`, `docs/PROJECT_SCOPE.md`, `design-reference/D-001/DESIGN.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`, `TASKS/TASK_MANIFEST.csv`, `package.json`

이 문서는 Free Traveler가 **무엇으로 만들어지고, 무엇으로 만들어지지 않는지** 그 경계를 정의한다. 여기 없는 기술·인프라·서비스는 이 프로젝트 범위가 아니다.

---

## 1. 기술 스택

- **프레임워크:** Next.js App Router (현재 `package.json` 기준 `next@16.3.4`)
- **언어:** TypeScript (`typescript@^5`, `tsconfig.json` strict 대상)
- **UI:** React `19.2.8`, Tailwind CSS `^4`
- **린트:** ESLint `^9` + `eslint-config-next`

Pages Router, 별도 SPA 프레임워크, 다른 메타프레임워크(Remix 등)는 사용하지 않는다.

## 2. 화면 구성 — 핵심 4개 · 보조 1개

`design-reference/SCREEN_ROUTE_CONTRACT.json`(schema `traveler-screen-route-v1`)이 Screen 목록의 정본이다.

| Screen | 분류 | Route | Page Entry |
|---|---|---|---|
| SCR-001 | 핵심 | `/` | `src/app/page.tsx` |
| SCR-002 | 보조 | `/about` | `src/app/about/page.tsx` |
| SCR-003 | 핵심 | `/travel-tools` | `src/app/travel-tools/page.tsx` |
| SCR-004 | 핵심 | `/mates` | `src/app/mates/page.tsx` |
| SCR-005 | 핵심 | `/account` | `src/app/account/page.tsx` |

5개 Route 외 공개 페이지를 추가하지 않는다. 인증 콜백·API Route·`not-found`는 기술 Route로 별도 취급하며 이 5개 Screen 수에 포함하지 않는다(`design-reference/SCREEN_ROUTE_CONTRACT.json`의 `technical_routes` 참고).

## 3. Server Component / Client Component 경계

- **기본값은 Server Component다.** 5개 Page Entry(`page.tsx`)는 Server Component로 시작해 정적 데이터(`src/data`)와 Supabase 조회 결과를 서버에서 읽어 렌더링한다.
- **Client Component(`"use client"`)는 상호작용이 필요한 부분에만 한정한다:**
  - 항공/숙소 입력 Form, 요약 카드, 탭 전환(SCR-003)
  - 즐겨찾기 토글(localStorage 접근, SCR-001)
  - Drawer/Modal 열고 닫기 상태(SCR-001)
  - 참가 메시지 Form, 신고/차단 버튼(SCR-004)
  - 로그인/가입 Form, 프로필 편집 Form(SCR-005)
- 데이터 조회 자체(Supabase 조회, 정적 데이터 import)는 가능한 한 Server Component/Server Action에서 수행하고, Client Component는 이미 받은 데이터를 렌더링하거나 사용자 입력만 다룬다.

## 4. 항공·숙소 입력 폼 — Client 상태 전용

항공(`/travel-tools` 항공편 Tab)과 숙소(숙소 Tab) 입력 폼은 **Client Component의 일시 상태(예: `useState`)로만** 국가·지역·날짜 값을 보관한다.

- 이 값을 Server Action, Route Handler, Supabase 테이블, 어떤 형태의 서버 저장소에도 전달하지 않는다.
- 외부 이동 시 항공/숙소 URL에 목적지·날짜를 쿼리 파라미터로 붙이지 않는다(설정된 일반 URL을 `noopener,noreferrer`로 새 탭에 그대로 연다).
- 분석 이벤트·구조화 로그 어디에도 이 값을 기록하지 않는다.
- 브라우저를 새로고침하거나 페이지를 벗어나면 값은 사라진다 — 영속화하지 않는 것이 의도다.

## 5. 항공·숙소 입력값 미전송 원칙 (API·DB·URL·로그 전 구간)

4번 원칙을 아래 4개 경로에 대해 각각 명시적으로 적용한다:

| 경로 | 적용 |
|---|---|
| API(Server Action/Route Handler) | 항공·숙소 폼은 어떤 API도 호출하지 않는다. 이 폼을 위한 Route Handler를 만들지 않는다. |
| DB(Supabase) | 항공·숙소 조건을 저장하는 테이블을 만들지 않는다(6장 테이블 목록에 없음). |
| URL | 외부 이동 URL, 내부 페이지 URL 어디에도 목적지·날짜를 쿼리로 남기지 않는다. |
| 로그 | 서버 로그, 분석 이벤트(`REQ-FUNC-071` 자체가 EXCLUDED이므로 분석 파이프라인 없음), 브라우저 콘솔 어디에도 원시 입력값을 기록하지 않는다. |

## 6. 여행지·안전정보·대표 소개 — `src/data` 정적 데이터

여행지(`DATA-DESTINATIONS`), 국가 안전정보(`DATA-SAFETY`), 대표 소개(`DATA-REPRESENTATIVE`), 정책 콘텐츠(`DATA-POLICY-CONTENT`)는 **모두 `src/data/*.ts` TypeScript 정적 데이터**로 관리한다.

- DB 테이블로 만들지 않는다.
- 앱 내 CMS·편집 UI를 만들지 않는다(`docs/PROJECT_SCOPE.md`에서 EXCLUDED로 확정: REQ-FUNC-055, 072, 074).
- 콘텐츠 변경은 코드 수정 + 재배포로 처리한다. 변경 이력은 Git 커밋 이력으로 대체하며 별도 이력 테이블을 두지 않는다(REQ-FUNC-056 EXCLUDED).
- 이미지 등 미디어는 일반 URL + alt 텍스트만 사용한다. 업로드·라이선스 승인 워크플로는 만들지 않는다(REQ-FUNC-073 EXCLUDED).

## 7. Supabase — Auth와 동행 기능 중심

Supabase는 **① 이메일 인증(Auth) ② 동행(Mate) 관련 쓰기 기능**을 위해서만 사용한다. 여행지·안전정보·대표 소개는 Supabase를 거치지 않는다(6번 항목).

Supabase가 담당하는 범위:
- 이메일 가입/인증/로그인/로그아웃/비밀번호 재설정, 성인 확인 상태(`is_adult`, `adult_verified_at`)
- 동행 모집글 작성/조회/수정/마감
- 참가 요청 생성/승인/거절
- 사용자 차단
- 신고 접수 및 관리자 상태 변경
- 관리자 외부 URL(항공/숙소) 설정

## 8. DB — 6개 테이블

Supabase Postgres에 아래 **6개 테이블만** 둔다(`DB-SCHEMA-BASE`, `TASKS/TASK_MANIFEST.csv` 기준). 이 목록을 벗어나는 테이블(감사 로그, 미디어, 콘텐츠, 항공/숙소 조건 등)을 추가하지 않는다.

| 테이블 | 역할 |
|---|---|
| `user_profile` | 닉네임, 연령대, 성별, 여행 스타일, 성인 확인 상태 |
| `mate_post` | 동행 모집글 |
| `mate_application` | 참가 요청 |
| `user_block` | 사용자 차단 관계 |
| `report` | 신고 |
| `admin_setting` | 항공·숙소 외부 URL 설정 |

## 9. Supabase Client — Browser / Server 분리

- **Browser Client**: Client Component에서 세션 상태 구독, 로그인/로그아웃 트리거 등 브라우저 컨텍스트 작업에만 사용.
- **Server Client**: Server Component/Server Action/Route Handler에서 쿠키 기반 세션으로 데이터를 조회·변경할 때 사용. 비밀키(Service Role Key 등)는 서버 Client 경로에서만, 환경변수로만 참조하고 클라이언트 번들에 포함하지 않는다.
- 두 Client는 별도 모듈(예: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`)로 분리해 서버 전용 값이 실수로 브라우저에 노출되지 않게 한다.

## 10. RLS 원칙 (간단)

- 각 테이블은 **본인 데이터(작성자/요청자 본인)**, **상대방에게 공개된 데이터(공개 모집글 목록 등)**, **Moderator/Admin 전용 데이터(신고 상세, 외부 URL 설정)** 세 종류로만 나눠 정책을 정의한다.
- 차단 관계에 있는 두 사용자 사이의 글/요청/프로필은 서로 노출되지 않도록 조회 정책에 반영한다.
- 복잡한 다단계 권한 매트릭스(세부 조직 역할, 위임 등)를 만들지 않는다 — Guest/Adult Member/Moderator/Admin 4개 역할 범위 안에서만 정책을 둔다.

## 11. ORM 미사용

Prisma를 포함한 어떤 ORM도 사용하지 않는다. Supabase JS 클라이언트(`@supabase/supabase-js`, `@supabase/ssr`)로 직접 쿼리하며, 스키마·마이그레이션은 SQL 파일(`supabase/migrations/*.sql`)로 관리한다.

## 12. 테스트 — Vitest + Playwright(Chromium Smoke)

- **단위 테스트:** Vitest. 날짜 검증, 연락처 탐지, 동행 상태 전이 등 순수 로직만 대상으로 한다.
- **E2E 테스트:** Playwright, **Chromium 단일 브라우저**로만 Smoke Test를 구성한다(`E2E-PUBLIC-SMOKE`, `E2E-TRAVEL-TOOLS`, `E2E-MATE-AUTH`, `TASKS/TASK_MANIFEST.csv` 기준). Firefox/WebKit 등 크로스 브라우저 매트릭스나 부하 테스트는 만들지 않는다.
- Jest, Cypress 등 다른 테스트 러너를 추가하지 않는다.

## 13. CI/CD — GitHub Actions + Vercel Preview

- **CI:** GitHub Actions(`.github/workflows/ci.yml`)에서 TypeScript strict 빌드, ESLint, Vitest, Playwright Chromium Smoke를 실행한다. main 병합 전 통과를 필수로 한다.
- **배포:** Vercel Git 연동을 사용한다. PR마다 Vercel Preview 배포로 확인하고, main 병합 시 Production으로 반영한다.
- 별도 배포 서버, 컨테이너 오케스트레이션, 자체 CD 파이프라인을 구축하지 않는다.

## 14. AWS·EC2 미사용

AWS(EC2 포함) 인프라를 사용하지 않는다. 호스팅은 Vercel(Hobby/Pro), 데이터베이스·Auth는 Supabase(Free tier)만 사용한다. S3, Lambda, RDS 등 AWS 관리형 서비스로 대체 구성하지 않는다.

## 15. 자동 Merge 미사용

GitHub Actions 등에 자동 Merge(merge queue, auto-merge bot)를 구성하지 않는다. PR 병합은 사람이 검토 후 수동으로 진행한다. CI 통과는 병합의 필요 조건일 뿐 자동 병합의 트리거가 아니다.

---

## 착수 차단 (Blockers)

아래는 **실제로 지금 존재하지 않아** 구현 착수 전에 준비해야 하는 파일·환경변수만 기록한다. 존재 여부를 확인하지 않고 추정으로 채우지 않는다.

### 누락된 파일

| 항목 | 확인 방법 | 상태 |
|---|---|---|
| `.env.local` (또는 `.env.example`) | 저장소 루트 확인 | **없음** — Supabase URL/Key, 외부 URL 기본값을 넣을 파일이 없다 |
| `supabase/` 디렉터리(migrations, seed) | 저장소 루트 확인 | **없음** — `DB-SCHEMA-BASE`/`DB-RLS-BASE`/`DB-SEED-BASE` 착수 전 생성 필요 |
| `.github/workflows/ci.yml` | 저장소 루트 확인 | **없음** — `OPS-CI-PIPELINE` 착수 전 생성 필요 |
| `src/app/about`, `src/app/travel-tools`, `src/app/mates`, `src/app/account` 디렉터리 | `src/app` 확인 | **없음** — 현재 `src/app`에는 `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`만 존재(Next.js 기본 스캐폴드) |

### 누락된 package.json 의존성

`package.json`에 아래 패키지가 아직 없다(현재 `next`, `react`, `react-dom`, Tailwind, ESLint, TypeScript만 설치됨):

- `@supabase/supabase-js`, `@supabase/ssr` — 9·10번 원칙(Supabase Browser/Server Client) 착수 전 필요
- `vitest` — 12번 원칙(단위 테스트) 착수 전 필요
- `@playwright/test` — 12번 원칙(E2E Smoke) 착수 전 필요
- `zod`(또는 동등 검증 라이브러리) — Server Action 입력 검증(CSRF/XSS 방어 보강) 착수 전 필요

### 누락된 환경변수

`.env.local`이 없으므로 아래 값 자체가 어디에도 정의되어 있지 않다:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Browser Client용
- `SUPABASE_SERVICE_ROLE_KEY` — Server Client용(서버 전용, 클라이언트 번들 미포함)
- `FLIGHT_OUTBOUND_URL`, `HOTEL_OUTBOUND_URL` — 관리자 설정의 기본값/허용목록 시드용

### 프로젝트 범위 제외 (착수 차단 아님 — 애초에 만들지 않음)

아래는 파일이 없어서가 아니라 **범위에서 제외되었기 때문에** 준비하지 않는다:

- **CMS**: 콘텐츠는 6번 원칙대로 `src/data` 정적 데이터로만 관리한다. 앱 내 콘텐츠 CMS는 만들지 않는다.
- **외부 Email 공급자**(SES, SendGrid, Mailgun 등): 실제 이메일 발송을 연동하지 않는다. 알림은 인앱 Toast/화면 상태로 대체한다(`docs/PROJECT_SCOPE.md` REQ-FUNC-043 처리 방식).
- **Monitoring**(Sentry, Datadog 등 5xx/장애 자동 알림, APM): 도입하지 않는다. Vercel/Supabase 기본 로그·대시보드에만 의존한다(REQ-NF-009, 032, 033 EXCLUDED).
