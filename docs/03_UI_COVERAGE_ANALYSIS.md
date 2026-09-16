# Free Traveler — UI Coverage Analysis

**Document ID:** UICOV-TRAVEL-001
**기반 문서:** `02_SRS_BASELINE.md`(REQ-FUNC-001~080, REQ-NF-001~034), `PROJECT_SCOPE.md`

SRS의 요구사항 114개(REQ-FUNC 80 + REQ-NF 34)를 5개 디자인 Screen에 배치하고, 각 요구사항을 UI 표현 방식과 `PROJECT_SCOPE.md`의 구현 분류(IMPLEMENT/EXCLUDED)와 함께 기록한다. 구현 범위나 요구사항 수를 변경하지 않는다.

## 분류 정의

| 분류 | 의미 |
|---|---|
| **UI_DIRECT** | 화면에 보이는 요소·문구·상호작용으로 직접 구현되는 요구사항 |
| **UI_STATE** | 화면 동작에 관여하지만 눈에 보이는 요소가 아닌 상태·데이터 흐름 규칙(예: 세션 한정 저장, URL 상태 복원, 중복 차단) |
| **NON_UI** | 서버·보안·데이터·성능 등 화면과 직접 대응되지 않는 기술 요구사항 |
| **OPERATIONS** | 감사·모니터링·SLA·비용·검증 프로세스 등 운영/거버넌스 성격 요구사항 (대부분 `PROJECT_SCOPE`에서 EXCLUDED) |

`REQ-FUNC-078`(오류 화면), API Route, 인증 콜백은 기술 Route로 취급하며 5개 디자인 Screen에 포함하지 않는다.

---

## 1. 디자인 Screen 정의 (5개 고정)

### SCR-001 `/` 메인

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 국내·해외 여행지를 발견하고, 안전정보를 확인하고, 다른 화면(항공/호텔/동행/대표소개/계정)으로 진입한다 |
| 주요 영역 | 전역 Header/Footer, 통합 검색바, 국내/해외 탭 목록, 필터 패널, 즐겨찾기 토글, 여행지 상세 Drawer(대표 이미지·일정·예산·교통·음식·에티켓·출처), 안전정보 Drawer(카테고리·stale 배지·중대 경보 배너·긴급연락처), 대표 소개 티저, 빈 결과 안내 |
| 상태 | 필터/검색 상태(URL 동기화), 즐겨찾기 localStorage 상태, Drawer 열림/대상(destination \| safety) 상태, stale 판정 계산 상태 |
| 이동 목적지 | SCR-002(대표 소개), SCR-003(항공·호텔 이동, 동행 글쓰기), SCR-004(동행 찾기), SCR-005(로그인) |

### SCR-002 `/about` 대표 소개

| 항목 | 내용 |
|---|---|
| 사용자 목표 | `free_traveler`의 경험·철학·추천 기준을 확인한다 |
| 주요 영역 | 히어로(대표 이미지+`50+ Trips`/`30+ Countries`), 소개문·철학·편집 원칙, 방문 국가 목록, 여행 타임라인, 추천 여행지 6, 문의·SNS 링크 |
| 상태 | 대부분 정적 콘텐츠, 추천 여행지 slug 유효성 필터링 상태 |
| 이동 목적지 | SCR-001(추천 여행지 상세 Drawer) |

### SCR-003 `/travel-tools` 통합 여행 준비 (3-Tab)

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 항공·호텔 조건을 정리한 뒤 외부 사이트로 이동하거나, 동행 모집글을 작성한다 |
| 주요 영역 | Tab A 항공(입력→검증→요약→외부이동), Tab B 호텔(입력→검증→요약→외부이동), Tab C 동행 작성(모집조건 폼+연락처 탐지+안전수칙 동의) |
| 상태 | 각 탭의 폼 입력은 세션 한정 클라이언트 상태(서버 미전송), 날짜 검증 상태, 요약 표시 상태, 연락처 탐지 차단 상태, 동행 작성 제출 성공 상태 |
| 이동 목적지 | 항공/호텔 외부 사이트(새 탭), SCR-004(동행 작성 완료 후 상세로 이동), SCR-005(로그인 필요 시) |

### SCR-004 `/mates` 동행 조회

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 조건이 맞는 동행 모집글을 찾고, 참가를 요청하거나 신고·차단한다 |
| 주요 영역 | 필터 가능한 모집글 목록, 상세 패널(제목·조건·설명·모집상태 배지, 참가 메시지 제출 폼, 신고·차단 버튼) |
| 상태 | 목록 필터 상태, 상세 패널 열림 상태, 자동 마감(조회 시 계산) 배지 상태, 참가요청 제출 상태(PENDING), 알림 Toast 상태 |
| 이동 목적지 | SCR-003(새 모집글 작성), SCR-005(로그인, 내 활동에서 받은 요청 관리) |

### SCR-005 `/account` 계정·관리 (Tab)

| 항목 | 내용 |
|---|---|
| 사용자 목표 | 로그인/가입, 프로필·성인확인 관리, 내 글·요청·차단 관리, (역할 보유 시) 신고 상태·외부 URL 관리 |
| 주요 영역 | Tab A 로그인/가입/재설정, Tab B 프로필(닉네임·연령대·성별·스타일·성인확인), Tab C 내 활동(내 모집글 수정/마감, 받은·보낸 참가요청, 차단 목록, 탈퇴), Tab D 관리자(role 제한: 신고 큐 상태 변경, 외부 URL 설정) |
| 상태 | 인증 세션 상태, 프로필 편집 상태, 내 활동 목록 상태, 관리자 필터/상태 변경 상태 |
| 이동 목적지 | SCR-004(내 글/받은 요청 클릭 시 상세), SCR-003(동행 작성 바로가기) |

---

## 2. Requirement 배치표 — Functional (REQ-FUNC-001~080)

### F1 Destination Guide

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-FUNC-001 | UI_DIRECT | IMPLEMENT | SCR-001 | 국내/해외 탭 |
| REQ-FUNC-002 | UI_DIRECT | IMPLEMENT | SCR-001 | 필터 패널 |
| REQ-FUNC-003 | UI_DIRECT | IMPLEMENT | SCR-001 | 통합 검색바 |
| REQ-FUNC-004 | UI_DIRECT | IMPLEMENT | SCR-001 | 여행지 상세 Drawer |
| REQ-FUNC-005 | UI_DIRECT | IMPLEMENT | SCR-001 | 필터 결과 없음 안내 |
| REQ-FUNC-006 | UI_DIRECT | IMPLEMENT | SCR-001 | 상세 Drawer → 안전정보 Drawer 연결 |
| REQ-FUNC-007 | UI_DIRECT | IMPLEMENT (간소화) | SCR-001 | 상세 Drawer 이미지 alt/출처 |
| REQ-FUNC-008 | NON_UI | IMPLEMENT | N/A | 콘텐츠 수량 기준(빌드/데이터 검수) |
| REQ-FUNC-009 | UI_DIRECT | IMPLEMENT | SCR-001 | 상세 Drawer 하단 관련 여행지 |
| REQ-FUNC-010 | UI_STATE | IMPLEMENT | SCR-001 | 필터 상태 URL 동기화 |

### F2 Flight Link-out

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-FUNC-011 | UI_DIRECT | IMPLEMENT | SCR-003 | 항공 탭 입력 폼 |
| REQ-FUNC-012 | UI_DIRECT | IMPLEMENT | SCR-003 | 항공 탭 지역 옵션 제한 |
| REQ-FUNC-013 | UI_DIRECT | IMPLEMENT | SCR-003 | 항공 탭 날짜 오류 표시 |
| REQ-FUNC-014 | UI_DIRECT | IMPLEMENT | SCR-003 | 항공 탭 요약 단계 |
| REQ-FUNC-015 | UI_DIRECT | IMPLEMENT | SCR-003 | 항공 탭 비전달 고지 |
| REQ-FUNC-016 | UI_DIRECT | IMPLEMENT | SCR-003 | 항공 탭 외부이동 버튼(새 탭) |
| REQ-FUNC-017 | NON_UI | IMPLEMENT | N/A | 서버 미전송(클라이언트 한정 상태) |
| REQ-FUNC-018 | UI_DIRECT | IMPLEMENT | SCR-003 | 항공 탭 오류 배너/재시도 |

### F3 Hotel Link-out

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-FUNC-019 | UI_DIRECT | IMPLEMENT | SCR-003 | 호텔 탭 입력 폼 |
| REQ-FUNC-020 | UI_DIRECT | IMPLEMENT | SCR-003 | 호텔 탭 지역 옵션 제한 |
| REQ-FUNC-021 | UI_DIRECT | IMPLEMENT | SCR-003 | 호텔 탭 날짜 오류 표시 |
| REQ-FUNC-022 | UI_DIRECT | IMPLEMENT | SCR-003 | 호텔 탭 요약 단계 |
| REQ-FUNC-023 | UI_DIRECT | IMPLEMENT | SCR-003 | 호텔 탭 비전달 고지 |
| REQ-FUNC-024 | UI_DIRECT | IMPLEMENT | SCR-003 | 호텔 탭 외부이동 버튼(새 탭) |
| REQ-FUNC-025 | NON_UI | IMPLEMENT | N/A | 서버 미전송(클라이언트 한정 상태) |
| REQ-FUNC-026 | UI_DIRECT | IMPLEMENT | SCR-003 | 호텔 탭 오류 배너/재시도 |

### F4 Travel Mate

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-FUNC-027 | UI_DIRECT | IMPLEMENT | SCR-003 / SCR-004 | 작성·참가요청 시도 시 로그인 유도 |
| REQ-FUNC-028 | UI_DIRECT | IMPLEMENT | SCR-005 | 프로필 탭 성인확인 절차 |
| REQ-FUNC-029 | UI_DIRECT | IMPLEMENT | SCR-005 | 프로필 탭 입력 필드 |
| REQ-FUNC-030 | UI_DIRECT | IMPLEMENT | SCR-004 | 목록 필터(국가·기간·연령대·성별·스타일·상태) |
| REQ-FUNC-031 | UI_DIRECT | IMPLEMENT | SCR-003 | 동행 작성 탭 입력 폼 |
| REQ-FUNC-032 | UI_DIRECT | IMPLEMENT | SCR-003 | 동행 작성 탭 연락처 탐지 오류 |
| REQ-FUNC-033 | UI_DIRECT | IMPLEMENT | SCR-004 | 목록·상세 패널 표시(연락처 비노출) |
| REQ-FUNC-034 | UI_DIRECT | IMPLEMENT | SCR-004 | 상세 패널 참가 메시지 폼 |
| REQ-FUNC-035 | UI_STATE | IMPLEMENT | SCR-004 | 중복 요청 차단(제출 시 오류) |
| REQ-FUNC-036 | UI_DIRECT | IMPLEMENT | SCR-005 | 내 활동 탭 승인/거절 |
| REQ-FUNC-037 | UI_DIRECT | IMPLEMENT | SCR-004 | 목록/상세 마감 배지(조회 시 계산) |
| REQ-FUNC-038 | UI_DIRECT | IMPLEMENT | SCR-005 | 내 활동 탭 마감/수정/삭제 |
| REQ-FUNC-039 | UI_DIRECT | IMPLEMENT | SCR-004 | 상세 패널 신고 버튼 |
| REQ-FUNC-040 | UI_DIRECT | IMPLEMENT | SCR-004 / SCR-005 | 상세 패널 차단 버튼, 내 활동 탭 차단 목록 |
| REQ-FUNC-041 | UI_DIRECT | IMPLEMENT (간단) | SCR-005 | 관리자 탭 신고 큐 |
| REQ-FUNC-042 | OPERATIONS | EXCLUDED | N/A | 세부 제재·감사이력 미제공 |
| REQ-FUNC-043 | UI_DIRECT | IMPLEMENT | SCR-004 / SCR-005 | Toast/상태 알림 |
| REQ-FUNC-044 | NON_UI | IMPLEMENT | N/A | RLS 서버측 필터링 |
| REQ-FUNC-045 | UI_DIRECT | IMPLEMENT (간소화) | SCR-005 | 내 활동 탭 탈퇴 |

### F5 Country Safety

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-FUNC-046 | NON_UI | IMPLEMENT | N/A | 안전정보 콘텐츠 커버리지(데이터 검수) |
| REQ-FUNC-047 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer 8개 카테고리 |
| REQ-FUNC-048 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer 출처/확인일/편집자 |
| REQ-FUNC-049 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer 외교부 링크 |
| REQ-FUNC-050 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer stale 배지 |
| REQ-FUNC-051 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer 상단 중대경보 배너 |
| REQ-FUNC-052 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer 범위 구분 표시 |
| REQ-FUNC-053 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer 긴급연락처 |
| REQ-FUNC-054 | UI_DIRECT | IMPLEMENT | SCR-001 / SCR-003 | 안전정보 Drawer 및 항공 탭 요약의 면책 고지 |
| REQ-FUNC-055 | OPERATIONS | EXCLUDED | N/A | 앱 내 편집 워크플로 미제공(코드 수정으로 대체) |
| REQ-FUNC-056 | OPERATIONS | EXCLUDED | N/A | 변경 이력 DB 미보존(Git 이력 대체) |

### F6 About free_traveler

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-FUNC-057 | UI_DIRECT | IMPLEMENT | SCR-001 / SCR-002 | 홈 소개 카드 + 대표 페이지 히어로 수치 |
| REQ-FUNC-058 | UI_DIRECT | IMPLEMENT | SCR-002 | 소개문/철학/편집원칙 |
| REQ-FUNC-059 | UI_DIRECT | IMPLEMENT | SCR-002 | 방문 국가 목록 |
| REQ-FUNC-060 | UI_DIRECT | IMPLEMENT | SCR-002 | 여행 타임라인 |
| REQ-FUNC-061 | UI_DIRECT | IMPLEMENT (간소화) | SCR-002 | 히어로 이미지 alt/출처 |
| REQ-FUNC-062 | UI_DIRECT | IMPLEMENT (간소화) | SCR-002 | 문의·SNS 링크 |
| REQ-FUNC-063 | UI_DIRECT | IMPLEMENT | SCR-002 | 추천 여행지 6 (→ SCR-001 상세 Drawer 연결) |

### F7 Common, Admin, Governance

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-FUNC-064 | UI_DIRECT | IMPLEMENT | 전역(SCR-001~005) | 공용 Header/Footer |
| REQ-FUNC-065 | UI_STATE | IMPLEMENT | 전역(SCR-001~005) | 반응형 레이아웃 규칙 |
| REQ-FUNC-066 | UI_DIRECT | IMPLEMENT | SCR-005 | 로그인/가입 탭 |
| REQ-FUNC-067 | UI_DIRECT | IMPLEMENT | SCR-001 | 통합 검색바 |
| REQ-FUNC-068 | UI_DIRECT | IMPLEMENT | SCR-001 | 여행지 즐겨찾기 토글 |
| REQ-FUNC-069 | UI_DIRECT | IMPLEMENT | SCR-001 / SCR-002 / SCR-004 | 공유 버튼 |
| REQ-FUNC-070 | NON_UI | IMPLEMENT | 전역(SCR-001~005) | 페이지별 메타데이터(비가시) |
| REQ-FUNC-071 | OPERATIONS | EXCLUDED | N/A | 행동 분석 이벤트 미수집 |
| REQ-FUNC-072 | OPERATIONS | EXCLUDED | N/A | 콘텐츠 CRUD UI 미제공 |
| REQ-FUNC-073 | OPERATIONS | EXCLUDED | N/A | 미디어 업로드 폼 미제공 |
| REQ-FUNC-074 | OPERATIONS | EXCLUDED | N/A | 게시 전 완전성 게이트 UI 미제공 |
| REQ-FUNC-075 | OPERATIONS | EXCLUDED | N/A | stale 대시보드 미제공 |
| REQ-FUNC-076 | OPERATIONS | EXCLUDED | N/A | 감사 로그 미제공 |
| REQ-FUNC-077 | UI_DIRECT | IMPLEMENT | SCR-005 | 관리자 탭 외부 URL 설정 |
| REQ-FUNC-078 | NON_UI | IMPLEMENT | 기술 Route(디자인 Screen 아님) | 404/500/권한없음/외부연결실패 |
| REQ-FUNC-079 | UI_STATE | IMPLEMENT | 전역(SCR-001~005) | ARIA/시맨틱 마크업 규칙 |
| REQ-FUNC-080 | UI_DIRECT | IMPLEMENT | SCR-003 / SCR-005 | 동행 작성 동의 체크박스, 정책 페이지 |

---

## 3. Requirement 배치표 — Non-Functional (REQ-NF-001~034)

### Performance

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-NF-001 | NON_UI | IMPLEMENT | 전역 | LCP 목표(렌더링 최적화) |
| REQ-NF-002 | NON_UI | IMPLEMENT | 전역 | INP 목표(상호작용 경량화) |
| REQ-NF-003 | NON_UI | IMPLEMENT | 전역 | CLS 목표(레이아웃 고정) |
| REQ-NF-004 | NON_UI | EXCLUDED (부분) | N/A | 동시사용자 부하 측정 제외 |
| REQ-NF-005 | NON_UI | EXCLUDED (부분) | N/A | 쓰기 API 부하 측정 제외 |
| REQ-NF-006 | NON_UI | IMPLEMENT | 전역 | 이미지 lazy/priority 처리 |
| REQ-NF-007 | OPERATIONS | IMPLEMENT (간소화) | N/A | 배포 전 수동 Lighthouse 점검 |

### Reliability and Recovery

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-NF-008 | OPERATIONS | EXCLUDED | N/A | 가용성 모니터링 미구축 |
| REQ-NF-009 | OPERATIONS | EXCLUDED | N/A | 5xx 모니터링 미구축 |
| REQ-NF-010 | OPERATIONS | EXCLUDED | N/A | 자동 백업 미구축 |
| REQ-NF-011 | OPERATIONS | EXCLUDED | N/A | 외부링크 자동 점검 미구축 |

### Security and Privacy

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-NF-012 | NON_UI | IMPLEMENT | N/A | 플랫폼 기본 TLS |
| REQ-NF-013 | NON_UI | IMPLEMENT | N/A | RLS/역할 서버 검증 |
| REQ-NF-014 | NON_UI | IMPLEMENT | N/A | CSRF/SameSite |
| REQ-NF-015 | NON_UI | IMPLEMENT | N/A | 입력 검증/XSS 방지 |
| REQ-NF-016 | NON_UI | IMPLEMENT | N/A | 비밀키 환경변수 관리 |
| REQ-NF-017 | NON_UI | IMPLEMENT | N/A | 항공·호텔 입력 미보존 |
| REQ-NF-018 | UI_DIRECT | IMPLEMENT (간소화) | SCR-005 | 내 활동 탭 내보내기/탈퇴/삭제 |

### Safety and Moderation

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-NF-019 | NON_UI | IMPLEMENT | N/A | 신고 접수 응답 속도 |
| REQ-NF-020 | OPERATIONS | EXCLUDED | N/A | 1차 검토 SLA(운영 지표) |
| REQ-NF-021 | UI_STATE | IMPLEMENT (간소화) | SCR-003 / SCR-004 | 글·신고 제출 속도 제한 |
| REQ-NF-022 | OPERATIONS | EXCLUDED | N/A | Moderator 조치 감사이력 미제공 |

### Accessibility

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-NF-023 | UI_STATE | IMPLEMENT | 전역 | WCAG 2.2 AA 설계 규칙 |
| REQ-NF-024 | OPERATIONS | IMPLEMENT (간소화) | N/A | axe 수동 검사 프로세스 |
| REQ-NF-025 | OPERATIONS | IMPLEMENT | N/A | 키보드/스크린리더 수동 검사 프로세스 |

### Content, Freshness, SEO, Copyright

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-NF-026 | NON_UI | IMPLEMENT | N/A | 여행지 콘텐츠 완전성(데이터 규칙) |
| REQ-NF-027 | NON_UI | IMPLEMENT | N/A | 안전정보 커버리지(데이터 규칙) |
| REQ-NF-028 | UI_DIRECT | IMPLEMENT | SCR-001 | 안전정보 Drawer stale 계산(REQ-FUNC-050과 동일 표시) |
| REQ-NF-029 | OPERATIONS | EXCLUDED | N/A | 미디어 라이선스 메타데이터 미관리 |
| REQ-NF-030 | NON_UI | IMPLEMENT | 전역 | 페이지별 SEO 메타데이터 |

### Maintainability, Monitoring, Cost

| ID | UI 분류 | PROJECT_SCOPE | Screen | 배치 위치 |
|---|---|---|---|---|
| REQ-NF-031 | OPERATIONS | IMPLEMENT (간소화) | N/A | TS strict/lint/최소 유닛테스트 |
| REQ-NF-032 | OPERATIONS | EXCLUDED | N/A | 구조화 로깅 미구축 |
| REQ-NF-033 | OPERATIONS | EXCLUDED | N/A | 자동 오류 알림 미구축 |
| REQ-NF-034 | OPERATIONS | IMPLEMENT | N/A | 인프라 비용(Vercel+Supabase 무료/저가 tier) |

---

## 4. 집계 검증

### 4.1 총 Requirement 수

| 구분 | 개수 |
|---|---:|
| REQ-FUNC-001~080 | 80 |
| REQ-NF-001~034 | 34 |
| **합계** | **114** |

### 4.2 UI 분류별 집계

| 분류 | FUNC | NF | 합계 |
|---|---:|---:|---:|
| UI_DIRECT | 60 | 2 | 62 |
| UI_STATE | 4 | 2 | 6 |
| NON_UI | 7 | 16 | 23 |
| OPERATIONS | 9 | 14 | 23 |
| **합계** | **80** | **34** | **114** |

### 4.3 PROJECT_SCOPE 분류별 집계

| 분류 | FUNC | NF | 합계 |
|---|---:|---:|---:|
| IMPLEMENT(간소화/간단 포함) | 71 | 23 | 94 |
| EXCLUDED(부분 포함) | 9 | 11 | 20 |
| **합계** | **80** | **34** | **114** |

### 4.4 Screen별 배치 Requirement 수 (UI_DIRECT/UI_STATE, 두 Screen에 걸친 항목은 각 Screen에서 중복 계산)

| Screen | 배치된 Requirement 수 |
|---|---:|
| SCR-001 `/` | 22 |
| SCR-002 `/about` | 8 |
| SCR-003 `/travel-tools` | 20 |
| SCR-004 `/mates` | 11 |
| SCR-005 `/account` | 12 |
| 전역(5개 Screen 공통 적용) | 4 |

> 일부 Requirement(예: REQ-FUNC-027, 040, 043, 054, 057, 069, 080, REQ-NF-021)는 두 Screen에 걸쳐 있어 위 표에서 중복 계산된다. NON_UI/OPERATIONS 및 기술 Route(REQ-FUNC-078)는 디자인 Screen 배치 대상에서 제외한다.

EXCLUDED로 분류된 항목(REQ-FUNC-042/055/056/071~076, REQ-NF-004/005/008~011/020/022/029/032/033)은 `PROJECT_SCOPE.md`의 제외 사유를 그대로 유지하며, 이번 문서에서 구현 범위로 복원하지 않는다.
