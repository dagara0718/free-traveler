# Free Traveler — Design Manifest

| 항목 | 값 |
|---|---|
| **Active Design Version** | D-001 |
| **Status** | LOCKED |
| **Active File** | `design-reference/D-001/DESIGN.md` |
| **Vendor Reference** | `design-reference/vendor/airbnb/DESIGN.md` (참고용 — 색상·서체·상표 요소 미차용) |
| **Stitch Project ID** | `16469497853150235274` |
| **Approved Screens** | SCR-001, SCR-002, SCR-003, SCR-004, SCR-005 |
| **Mobile Variants** | SCR-001, SCR-003 |

## 승인 근거

- 설계 원안: `docs/04_UIUX_PLAN.md`
- 검증 기록: `docs/STITCH_VALIDATION_REPORT.md` (Desktop 5개 화면 전부 PASS)
- 확정 판정: `STITCH_VALIDATION_NEEDS_HUMAN` — Mobile 변형(SCR-001, SCR-003) 및 중복 스크린 정리는 사람이 마무리해야 함(아래 미해결 항목 참고)

## Approved Screen ID (Desktop, canonical)

| Screen | Screen ID |
|---|---|
| SCR-001 `/` | `c683c3c0c2554f148b7f9e127ea45b68` |
| SCR-002 `/about` | `8c6d8f1824b44746826b723a3a9e2da9` |
| SCR-003 `/travel-tools` | `df8effc7ed084a57aa224430247ae2a3` |
| SCR-004 `/mates` | `a78a54f733e64af4ac6a309b6c3875b2` |
| SCR-005 `/account` | `0b6a9f10d15a43aa859354e73bd1508b` |

## Mobile Variants 상태

SCR-001, SCR-003의 Mobile(390px) 변형은 **아직 Stitch 프로젝트에 생성되지 않았다.** `STITCH_VALIDATION_REPORT.md`에서 BLOCKED로 기록됨. D-001 DESIGN.md의 Desktop·Mobile 규칙(Section 9)을 그대로 적용해 생성해야 하며, 생성 후 이 Manifest의 "Approved Screen ID" 표에 Mobile ID를 추가한다.

## 변경 관리

- D-001은 **LOCKED** 상태다. 색상·타이포·간격 등 토큰을 바꾸려면 새 버전(D-002)을 만들고 이 Manifest의 Active Design Version을 갱신한다. D-001 파일을 직접 덮어쓰지 않는다.
- 신규 화면·컴포넌트는 D-001의 토큰과 Do/Do Not 규칙을 그대로 따른다. 규칙에 없는 색상·서체·컴포넌트가 필요하면 D-001을 개정(버전 증가)한 뒤 적용한다.
- Vendor Reference(Airbnb DESIGN.md)는 읽기 전용 참고 자료이며, 이 프로젝트의 실제 디자인 토큰 소스는 항상 Active File이다.

## 금지 사항 (D-001 Do Not과 동일, 요약)

- Airbnb 상표 요소(로고·워드마크·브랜드 색) 사용 금지
- 구매·예약·결제·체크아웃 UI 추가 금지
- Proprietary 폰트 파일 포함 금지 (Inter + 시스템 한글 폰트만 사용)
- D-001에 정의되지 않은 임의 색상 토큰 추가 금지
