import { describe, it, expect } from "vitest";
import { detectContactInfo } from "@/components/travel-tools/MateWriteForm";

// COMPONENT-SC003-MATE-WRITE에 구현된 연락처 탐지 함수를 그대로 검증한다.
// (별도 src/lib/validation/contactDetection.ts 모듈은 존재하지 않음 — 아래
// 완료 보고의 한계 사항 참고.)

describe("detectContactInfo — 전화번호", () => {
  it.each([
    "010-1234-5678로 연락주세요",
    "01012345678 문자주세요",
    "010.1234.5678",
  ])("탐지됨: %s", (text) => {
    expect(detectContactInfo(text)).toBe(true);
  });

  it("일반 전화번호가 아닌 숫자는 탐지되지 않는다", () => {
    expect(detectContactInfo("3박4일 일정입니다")).toBe(false);
  });
});

describe("detectContactInfo — 이메일", () => {
  it.each(["mail@example.com으로 연락주세요", "test.user+1@sub.domain.co.kr"])(
    "탐지됨: %s",
    (text) => {
      expect(detectContactInfo(text)).toBe(true);
    },
  );

  it("@ 없는 일반 텍스트는 탐지되지 않는다", () => {
    expect(detectContactInfo("함께 여행하고 싶어요")).toBe(false);
  });
});

describe("detectContactInfo — 메신저 ID", () => {
  it.each([
    "카카오톡 아이디: travel2027",
    "카톡 travel2027",
    "텔레그램: @traveluser",
    "line id: travelko",
  ])("탐지됨: %s", (text) => {
    expect(detectContactInfo(text)).toBe(true);
  });
});

describe("detectContactInfo — 정상 케이스(오탐 없음)", () => {
  it.each([
    "오사카 3박 4일 같이 다니실 분",
    "먹방, 쇼핑 위주로 여유롭게 다닐 동행을 찾습니다.",
    "인원 3명, 20대 위주로 구성하고 싶어요.",
    "숙소는 신사이바시 근처로 예약할 예정입니다.",
  ])("오탐 없음: %s", (text) => {
    expect(detectContactInfo(text)).toBe(false);
  });
});
