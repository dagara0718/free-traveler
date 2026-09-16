# Free Traveler — Project Scope (구현 범위 정의서)

**Document ID:** SCOPE-TRAVEL-001
**기반 문서:** `01_PRD.md.md` (PRD-TRAVEL-001), `02_SRS_BASELINE.md` (SRS-TRAVEL-001)
**상태:** 구현 기준

이 문서는 SRS의 REQ-FUNC-001~080, REQ-NF-001~034를 **IMPLEMENT**(구현하고 테스트)와 **EXCLUDED**(만들지 않음, 사유 기록)로 분류한다. 어떤 요구사항도 목록에서 삭제하지 않는다.

---

## 1. 화면 범위

### 1.1 핵심 화면 4개 + 보조 화면 1개

| 구분 | 화면 | 라우트 |
|---|---|---|
| 핵심 | 여행지 탐색(목록/필터/상세) | `/destinations`, `/destinations/domestic`, `/destinations/overseas`, `/destinations/[slug]` |
| 핵심 | 항공 조건 입력·요약·외부 이동 | `/flights` |
| 핵심 | 호텔 조건 입력·요약·외부 이동 | `/hotels` |
| 핵심 | 동행 모집(목록/상세/작성/참가요청) | `/mates`, `/mates/[id]`, `/mates/new` |
| 보조 | 국가 안전정보(목록/상세) + 대표 소개 | `/safety`, `/safety/[countryCode]`, `/about` |

추가로 `/auth/*`(가입·로그인·성인확인), `/my/*`(내 활동), `/admin/*`(신고 상태·외부 URL 설정)를 구현한다.

### 1.2 현재 코드베이스 상태

- `src/app`에는 Next.js 기본 스캐폴드(`layout.tsx`, `page.tsx`, `globals.css`)만 존재한다. 위 라우트·컴포넌트·`src/data`는 신규 작성 대상이다.
- `package.json`에는 Next 16 + React 19만 있다. Supabase 클라이언트, 폼 검증 라이브러리 등은 필요에 따라 추가한다.

---

## 2. 구현 방식 확정 사항

| 영역 | 방식 |
|---|---|
| 여행지·안전정보·대표 콘텐츠 | `src/data`의 정적 TypeScript 데이터(코드로 관리, 앱 내 CMS 없음) |
| 즐겨찾기 | `localStorage` (서버 저장 없음) |
| 참가요청/신고/상태변경 알림 | 실제 이메일 발송 대신 Toast 또는 화면 내 상태 표시 |
| 동행글 자동 마감 | 배치 작업 없이 조회 시점에 `end_date` 비교로 계산 |
| 안전정보 stale 표시 | 배치 작업 없이 렌더링 시점에 `verified_at` 기준 7일 경과 계산 |
| 이미지 | 일반 인터넷 이미지 URL + alt 텍스트만 기록 (라이선스·작가 메타데이터 전체 관리는 하지 않음) |
| 관리자 | 신고 상태 변경(OPEN/REVIEWING/RESOLVED/DISMISSED)과 항공·호텔 외부 URL 설정만 제공 |
| 인증·동행 데이터 | Supabase Auth(이메일 인증) + Supabase Postgres(RLS)로 모집글·참가요청·차단·신고 저장 |
| 테스트 | Playwright 핵심 Smoke Test (핵심 UC 왕복 확인) |
| 배포 | Vercel |

## 3. 제외 기능 (전역)

| 제외 항목 | 사유 |
|---|---|
| 전체 콘텐츠 CMS | 여행지·안전·대표 콘텐츠는 정적 데이터로 관리, 앱 내 CRUD·미리보기·게시 워크플로 미제공 |
| 미디어 업로드·라이선스 승인 워크플로 | 이미지는 URL 참조만 사용, 업로드·심사 절차 없음 |
| 범용 감사 로그 | 관리자 행위 전체 이력(before/after) 보존 없음 |
| 자동 백업·장애 알림·부하 테스트 | 운영 모니터링·재해복구·성능 부하 검증 인프라 구축하지 않음 |
| 외부 이메일 사업자 연동 | 실제 이메일 발송(SES/SendGrid 등) 없음, 인앱 알림으로 대체 |
| EC2·AWS 인프라 | Vercel + Supabase 관리형 서비스만 사용 |
| 무인 자동 Merge Runner | CI 자동 병합 파이프라인 구축하지 않음 |

---

## 4. 기능 요구사항 추적표 (REQ-FUNC-001~080)

### 4.1 F1. Destination Guide

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-001 | IMPLEMENT | `src/data`의 `scope`(DOMESTIC/OVERSEAS) 필드로 탭 분기, 클라이언트 필터 | Playwright: 탭 전환 시 목록 검증 |
| REQ-FUNC-002 | IMPLEMENT | 국가·도시·계절·테마·기간 필터를 AND 조건 배열 필터로 구현 | 수동 QA (정적 데이터라 즉시 응답, 정식 부하 측정은 REQ-NF-004 참고) |
| REQ-FUNC-003 | IMPLEMENT | 클라이언트 키워드 검색(부분 일치), 결과 없음 상태 처리 | 수동 QA + Playwright 검색 시나리오 |
| REQ-FUNC-004 | IMPLEMENT | 여행지 콘텐츠 타입에 필수 필드를 TS 타입으로 강제(옵셔널 아님) | TypeScript 컴파일 통과 + 시드 데이터 수동 검수 |
| REQ-FUNC-005 | IMPLEMENT | 결과 0건 시 안내 문구 + 필터 초기화 버튼 컴포넌트 | 수동 QA / Playwright |
| REQ-FUNC-006 | IMPLEMENT | `destination.countryCode` → `/safety/[countryCode]` 링크 매핑 | 데이터 매핑 수동 검수 + 클릭 이동 확인 |
| REQ-FUNC-007 | IMPLEMENT (간소화) | 이미지에 alt 텍스트 + 출처 URL만 기록(작가·라이선스 전체 관리는 제외, §3 참고) | 시드 데이터 필드 존재 여부 수동 검수 |
| REQ-FUNC-008 | IMPLEMENT | 국내 10곳 이상, 해외 15개국 30개 도시 이상 시드 데이터 작성 | 데이터 배열 길이 수동/스크립트 카운트 |
| REQ-FUNC-009 | IMPLEMENT | 동일 국가·테마 조건으로 관련 여행지 최대 6개 slice, 비공개 제외 | 수동 QA |
| REQ-FUNC-010 | IMPLEMENT | `useSearchParams`로 필터 상태 직렬화, 허용 키·값만 파싱 | 수동 QA (새로고침/URL 공유 복원 확인) |

### 4.2 F2. Flight Link-out

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-011 | IMPLEMENT | 국가·지역·출발일·귀국일 4필드 클라이언트 폼 | 수동 QA / Playwright |
| REQ-FUNC-012 | IMPLEMENT | 국가별 지역 매핑 정적 데이터로 선택지 제한, 국가 변경 시 지역값 초기화 | 수동 QA |
| REQ-FUNC-013 | IMPLEMENT | 클라이언트 날짜 검증(과거 출발일/역전 날짜 차단) | Playwright 경계값 테스트 |
| REQ-FUNC-014 | IMPLEMENT | 유효 입력 후 요약 단계 표시, `useState`로 세션 내 값 유지 | 수동 QA |
| REQ-FUNC-015 | IMPLEMENT | 폼·요약에 "입력값은 외부로 전달되지 않습니다" 고정 문구 | 수동 QA |
| REQ-FUNC-016 | IMPLEMENT | `window.open(url, '_blank', 'noopener,noreferrer')`, URL은 환경변수 | 코드 리뷰(속성 확인) + 수동 팝업 점검 |
| REQ-FUNC-017 | IMPLEMENT | 서버 API·DB 미경유(클라이언트 상태로만 처리) | 네트워크 탭 점검(요청 페이로드에 값 없음) |
| REQ-FUNC-018 | IMPLEMENT | URL 미설정/허용목록 밖이면 오류 배너 + 재시도 버튼 | 수동 QA |

### 4.3 F3. Hotel Link-out

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-019 | IMPLEMENT | 국가·지역·체크인·체크아웃 4필드 클라이언트 폼 | 수동 QA / Playwright |
| REQ-FUNC-020 | IMPLEMENT | 국가별 지역 매핑, 국가 변경 시 지역값 초기화 | 수동 QA |
| REQ-FUNC-021 | IMPLEMENT | 체크인 과거/체크아웃≤체크인 차단 | Playwright 경계값 테스트 |
| REQ-FUNC-022 | IMPLEMENT | 요약 값이 입력값과 동일하게 표시 | 수동 QA |
| REQ-FUNC-023 | IMPLEMENT | 비전달 고지 문구 표시 | 수동 QA |
| REQ-FUNC-024 | IMPLEMENT | 새 탭 + `noopener,noreferrer`로 외부 URL 오픈 | 코드 리뷰 + 수동 점검 |
| REQ-FUNC-025 | IMPLEMENT | 서버 저장 없음(클라이언트 상태만) | 네트워크/DB 점검 |
| REQ-FUNC-026 | IMPLEMENT | URL 오류 시 이동 차단 + 현재 입력 유지 + 오류 표시 | 수동 QA |

### 4.4 F4. Travel Mate

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-027 | IMPLEMENT | Supabase Auth 세션 필수, 서버 액션에서 세션 검사 | 비회원 요청 차단 수동/Playwright 테스트 |
| REQ-FUNC-028 | IMPLEMENT | `is_adult`, `adult_verified_at`만 저장, 생년월일 미수집 | DB 스키마 검수 |
| REQ-FUNC-029 | IMPLEMENT | 닉네임·연령대·스타일 필수, 성별 선택형 프로필 폼 | 수동 QA |
| REQ-FUNC-030 | IMPLEMENT | 국가/지역/기간겹침/연령대/성별/스타일/모집상태 서버 필터 + 차단관계 제외 | 수동 QA + RLS 테스트 |
| REQ-FUNC-031 | IMPLEMENT | 모집글 작성 폼 + 서버 액션 필수값·날짜 검증 | Playwright |
| REQ-FUNC-032 | IMPLEMENT | 정규식 기반 전화번호/이메일/메신저ID 탐지, 제출 차단 + 안내 | 유닛 테스트(패턴 케이스) + 수동 QA |
| REQ-FUNC-033 | IMPLEMENT | API 응답 select 컬럼에서 이메일·연락처 필드 제외 | API 응답 수동 점검 |
| REQ-FUNC-034 | IMPLEMENT | 500자 참가 메시지 제출 → PENDING insert, RLS로 비공개 | 수동 QA + RLS 테스트 |
| REQ-FUNC-035 | IMPLEMENT | DB unique 제약(post_id, applicant_id, 활성 상태) | DB 제약 테스트 |
| REQ-FUNC-036 | IMPLEMENT | 작성자 전용 상태 변경 서버 액션(owner 체크, 403) | 비작성자 접근 테스트 |
| REQ-FUNC-037 | IMPLEMENT | 배치 없이 조회 시 `end_date < 오늘`이면 CLOSED로 표시 | 수동 QA(과거 종료일 글 숨김/닫힘 확인) |
| REQ-FUNC-038 | IMPLEMENT | 작성자 수동 마감/수정/삭제, 승인 요청 존재 시 경고 모달 | 수동 QA |
| REQ-FUNC-039 | IMPLEMENT | 사유코드+설명 신고 폼 → report insert | 수동 QA |
| REQ-FUNC-040 | IMPLEMENT | 차단/해제 insert·delete, 조회 쿼리에서 상호 필터링 | 수동 QA |
| REQ-FUNC-041 | IMPLEMENT (간단) | 관리자 탭에서 report 상태별(OPEN/REVIEWING/RESOLVED/DISMISSED) 목록만 제공 | 수동 QA |
| REQ-FUNC-042 | EXCLUDED | 경고·콘텐츠 숨김·계정 제한 등 세부 제재 액션과 그 감사 이력은 "간단한 관리자 탭"·"범용 감사 로그 제외" 범위 밖. 관리자는 report.status 변경만 수행 | N/A |
| REQ-FUNC-043 | IMPLEMENT | 실제 이메일 대신 Toast/화면 상태로 알림 표시 | 수동 QA |
| REQ-FUNC-044 | IMPLEMENT | Supabase RLS로 본인/작성자/moderator만 열람 허용 | RLS 정책 부정 접근 테스트 |
| REQ-FUNC-045 | IMPLEMENT (간소화) | 탈퇴 시 프로필 즉시 비식별화, 개인정보 삭제는 관리자 수동 처리(자동 배치 없음) | 수동 QA(탈퇴 직후 비공개 확인) |

### 4.5 F5. Country Safety

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-046 | IMPLEMENT | 게시 대상 해외 국가 전체에 안전정보 정적 데이터 작성 | 국가 수 = 안전 데이터 수 수동 대조 |
| REQ-FUNC-047 | IMPLEMENT | 8개 카테고리를 타입 필수 필드로 강제 | 타입 체크 + 데이터 리뷰 |
| REQ-FUNC-048 | IMPLEMENT | `source_name`/`source_url`/`verified_at`/`editor` 정적 필드 포함 | 데이터 리뷰 |
| REQ-FUNC-049 | IMPLEMENT | 외교부 링크 새 탭 + `noopener,noreferrer` | 코드 리뷰 + 수동 클릭 |
| REQ-FUNC-050 | IMPLEMENT | 렌더링 시 `(오늘 - verified_at) > 7일` 계산해 stale 배지 표시 | 날짜 mock 유닛 테스트 + 수동 QA |
| REQ-FUNC-051 | IMPLEMENT | `advisory_level` 텍스트를 상단 배너로 표시(색상+텍스트 병기) | 수동 QA |
| REQ-FUNC-052 | IMPLEMENT | `scope_type`/`scope_text` 필드로 국가/지역 범위 구분 | 데이터 리뷰 |
| REQ-FUNC-053 | IMPLEMENT | 현지 긴급전화 + 영사콜센터 정적 데이터 표시 | 데이터 리뷰 |
| REQ-FUNC-054 | IMPLEMENT | 안전 페이지·항공 요약에 면책 고지 고정 표시 | 수동 QA |
| REQ-FUNC-055 | EXCLUDED | Editor/Admin의 앱 내 작성·검수·게시 워크플로는 CMS 영역이라 제외, 콘텐츠는 개발자가 `src/data`를 직접 수정·배포하는 방식으로 관리 | N/A |
| REQ-FUNC-056 | EXCLUDED | 변경 이력(이전값/새값/사유) DB 보존은 범용 감사 로그 제외 범위에 해당, Git 커밋 이력으로 대체 | N/A |

### 4.6 F6. About free_traveler

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-057 | IMPLEMENT | 단일 소스(`src/data/profile.ts`)의 상수를 홈·About에서 공용 참조 | 두 페이지 값 일치 수동 확인 |
| REQ-FUNC-058 | IMPLEMENT | 소개문·철학·편집 원칙 정적 텍스트 | 콘텐츠 리뷰 |
| REQ-FUNC-059 | IMPLEMENT | 방문 국가 30개국 이상 정적 목록(지도 대신 목록형으로 구현) | 데이터 리뷰 |
| REQ-FUNC-060 | IMPLEMENT | 타임라인(연도/장소/요약) 정적 배열 | 데이터 리뷰 |
| REQ-FUNC-061 | IMPLEMENT (간소화) | 대표 이미지 alt + 출처 URL만 기록(§3 이미지 방식과 동일) | 데이터 리뷰 |
| REQ-FUNC-062 | IMPLEMENT (간소화) | 문의·SNS 링크는 관리자 UI가 아닌 정적 설정 상수로 관리, 빈 값은 렌더링 생략 | 수동 QA |
| REQ-FUNC-063 | IMPLEMENT | 추천 여행지 slug 6개를 정적 참조, 존재하는 slug만 표시 | 데이터 리뷰 + 링크 클릭 테스트 |

### 4.7 F7. Common, Admin, Governance

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-FUNC-064 | IMPLEMENT | 공용 Header/Footer 레이아웃(`src/app/layout.tsx`) | 수동 QA |
| REQ-FUNC-065 | IMPLEMENT | Tailwind 반응형 클래스, 320px~데스크톱 대응 | 브라우저 반응형 점검 |
| REQ-FUNC-066 | IMPLEMENT | Supabase Auth 이메일 가입/인증/로그인/로그아웃/재설정 | Playwright 인증 스모크 |
| REQ-FUNC-067 | IMPLEMENT | 여행지+안전정보 정적 데이터를 합쳐 클라이언트 통합 검색 | 수동 QA |
| REQ-FUNC-068 | IMPLEMENT | `localStorage` 즐겨찾기, 중복 방지(Set 기반) | 수동 QA |
| REQ-FUNC-069 | IMPLEMENT | Web Share API 우선, 실패 시 클립보드 복사 폴백 | 수동 QA(모바일/데스크톱) |
| REQ-FUNC-070 | IMPLEMENT | Next.js `generateMetadata`로 title/description/canonical/OG | 페이지 소스 메타태그 점검 |
| REQ-FUNC-071 | EXCLUDED | 행동 분석 이벤트 수집 파이프라인은 반드시 구현할 범위(§1) 밖이며 KPI 측정 인프라를 구축하지 않음 | N/A |
| REQ-FUNC-072 | EXCLUDED | 콘텐츠 CRUD/미리보기 관리자 UI는 "전체 콘텐츠 CMS" 제외 대상, 정적 데이터로 대체 | N/A |
| REQ-FUNC-073 | EXCLUDED | 미디어 업로드 시 출처·라이선스 필수 입력 폼은 "미디어 업로드·라이선스 워크플로" 제외 대상 | N/A |
| REQ-FUNC-074 | EXCLUDED | 게시 전 런타임 완전성 게이트는 CMS 게시 워크플로에 속해 제외, 정적 데이터 작성 시 TS 타입/수동 검수로 대체 | N/A |
| REQ-FUNC-075 | EXCLUDED | stale 현황 대시보드는 관리자 범위(신고 상태+외부 URL 설정) 밖, 공개 안전 페이지의 stale 배지(REQ-FUNC-050)로 대체 | N/A |
| REQ-FUNC-076 | EXCLUDED | 범용 감사 로그 제외 원칙에 해당 | N/A |
| REQ-FUNC-077 | IMPLEMENT | Admin 설정 화면에서 항공·호텔 URL을 HTTPS+허용목록 검증 후 저장 | 수동 QA(HTTP/`javascript:` 입력 거부 확인) |
| REQ-FUNC-078 | IMPLEMENT | Next.js not-found/error 페이지 + 외부 연결 실패 배너, 홈/이전/재시도 제공 | 수동 QA |
| REQ-FUNC-079 | IMPLEMENT | 시맨틱 HTML + ARIA 속성이 있는 컴포넌트 사용 | axe 브라우저 확장 수동 점검 |
| REQ-FUNC-080 | IMPLEMENT | 이용약관/개인정보처리방침/안전수칙/면책 정적 페이지 + 모집글 작성 시 동의 체크박스(정책버전+동의시각 저장) | 수동 QA + DB 필드 확인 |

---

## 5. 비기능 요구사항 추적표 (REQ-NF-001~034)

### 5.1 Performance

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-001 | IMPLEMENT | Next.js 이미지 최적화·코드 스플리팅으로 LCP 목표 대응 | Lighthouse 수동 측정 |
| REQ-NF-002 | IMPLEMENT | 불필요한 리렌더 최소화, 경량 클라이언트 상태 | Lighthouse/수동 조작감 점검 |
| REQ-NF-003 | IMPLEMENT | 이미지 크기 고정/스켈레톤으로 레이아웃 이동 방지 | Lighthouse CLS 측정 |
| REQ-NF-004 | EXCLUDED (부분) | 동시사용자 50명 부하 테스트는 "부하 테스트" 제외 원칙에 해당. 단일 사용자 기준 응답만 확인 | 수동 단일 요청 응답시간 참고 확인 |
| REQ-NF-005 | EXCLUDED (부분) | 쓰기 API 정식 부하 테스트 생략, 단일 요청 기준 응답시간만 참고 확인 | 수동 참고 측정 |
| REQ-NF-006 | IMPLEMENT | `next/image` 또는 반응형 img + `loading="lazy"`, LCP 이미지 `priority` | 코드 리뷰 + Lighthouse |
| REQ-NF-007 | IMPLEMENT (간소화) | 배포 전 Lighthouse 수동 실행(CI 자동 게이트 미구성) | 수동 Lighthouse 리포트 |

### 5.2 Reliability and Recovery

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-008 | EXCLUDED | 가용성 SLA 측정·모니터링 체계 미구축, Vercel/Supabase 기본 가용성에 의존 | N/A |
| REQ-NF-009 | EXCLUDED | 5xx 비율 모니터링 도구 미도입("장애 알림" 제외 원칙) | N/A |
| REQ-NF-010 | EXCLUDED | 자동 백업/RPO·RTO 목표 관리 제외, Supabase 기본 백업 정책에 의존 | N/A |
| REQ-NF-011 | EXCLUDED | 외부 링크 주간 자동 점검 배치 미구현, 필요 시 관리자 수동 점검으로 대체 | N/A |

### 5.3 Security and Privacy

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-012 | IMPLEMENT | Vercel/Supabase 기본 제공 HTTPS/TLS 사용 | 브라우저 인증서 확인 |
| REQ-NF-013 | IMPLEMENT | Supabase RLS + 서버 액션 역할 체크 | RLS 정책 부정 접근 테스트 |
| REQ-NF-014 | IMPLEMENT | Next.js Server Actions 기본 보호 + Supabase Auth 쿠키(SameSite) | 코드 리뷰 |
| REQ-NF-015 | IMPLEMENT | 서버측 입력 검증(zod 등) + React 기본 이스케이프 | XSS 페이로드 수동 테스트 |
| REQ-NF-016 | IMPLEMENT | 비밀키는 `.env`/Vercel 환경변수로만 관리 | 빌드 산출물 grep 점검 |
| REQ-NF-017 | IMPLEMENT | REQ-FUNC-017/025와 동일 근거(서버 미전송) | 네트워크 탭 점검 |
| REQ-NF-018 | IMPLEMENT (간소화) | 탈퇴/삭제 요청 처리(REQ-FUNC-045 연계), 데이터 내보내기는 최소 형태(JSON 다운로드)로 제공 | 수동 QA |

### 5.4 Safety and Moderation

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-019 | IMPLEMENT | 신고 insert 단순 처리(정식 부하 측정 제외, 단일 요청 기준) | 수동 응답시간 확인 |
| REQ-NF-020 | EXCLUDED | 24시간 내 90% 1차 검토는 실제 운영 인력의 SLA이며 앱 기능이 아님, 신고 큐 UI(REQ-FUNC-041)만 제공 | N/A |
| REQ-NF-021 | IMPLEMENT (간소화) | 동일 사용자의 글/신고 생성에 최근 생성 시각 기준 간단 속도 제한 적용 | 수동 QA(연속 제출 차단 확인) |
| REQ-NF-022 | EXCLUDED | Moderator 조치의 감사 이력은 범용 감사 로그 제외 범위, `report.status` 변경만 단순 기록 | N/A |

### 5.5 Accessibility

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-023 | IMPLEMENT | WCAG 2.2 AA 목표로 시맨틱 HTML·명도 대비·포커스 스타일 설계 | axe 확장 + 수동 점검 |
| REQ-NF-024 | IMPLEMENT (간소화) | axe-core 수동 실행(자동 CI 게이트 미구성) | axe 브라우저 확장 리포트 |
| REQ-NF-025 | IMPLEMENT | 핵심 UC 키보드·스크린리더 수동 점검 | 수동 점검 체크리스트 |

### 5.6 Content, Freshness, SEO, Copyright

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-026 | IMPLEMENT | 정적 데이터 작성 시 TS 타입으로 필수 필드 강제 | 타입 체크 + 콘텐츠 리뷰 |
| REQ-NF-027 | IMPLEMENT | 게시 대상 해외 국가 전체 안전 데이터 작성(REQ-FUNC-046과 동일) | 데이터 카운트 검수 |
| REQ-NF-028 | IMPLEMENT | stale 계산 로직(REQ-FUNC-050) 재사용 | 날짜 mock 테스트 |
| REQ-NF-029 | EXCLUDED | 작가·라이선스타입·라이선스URL 등 전체 미디어 메타데이터 관리는 미디어 워크플로 제외 대상, alt텍스트+출처URL만 기록 | N/A |
| REQ-NF-030 | IMPLEMENT | Next.js metadata API로 페이지별 SEO 태그 제공 | 페이지 소스 점검 |

### 5.7 Maintainability, Monitoring, Cost

| ID | 분류 | 처리 방법 | 확인 방법 |
|---|---|---|---|
| REQ-NF-031 | IMPLEMENT (간소화) | TS strict + ESLint 빌드 게이트, 핵심 유틸(날짜 검증·연락처 탐지)만 최소 유닛 테스트 작성. 전체 UI는 Playwright Smoke로 대체 | `npm run build`/`lint` 통과 |
| REQ-NF-032 | EXCLUDED | 구조화 로깅 시스템 미구축(범용 로그 인프라 제외), Vercel 기본 함수 로그만 사용 | N/A |
| REQ-NF-033 | EXCLUDED | 5xx/외부 링크 실패 자동 알림 제외("장애 알림" 제외 원칙) | N/A |
| REQ-NF-034 | IMPLEMENT | Vercel Hobby/Pro + Supabase Free tier만 사용, EC2/AWS 등 별도 인프라 미사용 | 사용 tier·청구 대시보드 확인 |

---

## 6. Playwright 핵심 Smoke Test 대상

| 시나리오 | 대응 요구사항 |
|---|---|
| 여행지 목록 진입 → 필터 적용 → 상세 진입 → 안전정보 연결 | REQ-FUNC-001~006 |
| 항공 폼 입력 → 검증 실패/성공 → 요약 → 외부 새 탭 이동 | REQ-FUNC-011~018 |
| 호텔 폼 입력 → 검증 실패/성공 → 요약 → 외부 새 탭 이동 | REQ-FUNC-019~026 |
| 회원가입·이메일 인증·성인 확인 → 동행글 작성(연락처 탐지 포함) → 참가 요청 → 승인/거절 → 자동/수동 마감 | REQ-FUNC-027~038 |
| 신고 제출·차단 → 관리자 신고 상태 변경 | REQ-FUNC-039~042 |
| 국가 안전정보 상세(필수 카테고리·stale 배지·중대 경보 노출) | REQ-FUNC-046~054 |
| 대표 소개 페이지 핵심 정보 노출 | REQ-FUNC-057~061 |
| 404/외부 연결 실패 화면 복구 동작 | REQ-FUNC-078 |
