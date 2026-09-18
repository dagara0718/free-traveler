import { describe, it, expect } from "vitest";
import { isValidFlightDateRange } from "@/components/travel-tools/FlightForm";
import { isValidHotelDateRange } from "@/components/travel-tools/HotelForm";

// COMPONENT-SC003-FLIGHT-FORM/HOTEL-FORM에 구현된 날짜 검증 함수를 그대로
// 검증한다. (별도 src/lib/validation/travelDates.ts 모듈은 존재하지 않음 —
// 완료 보고의 한계 사항 참고.)

const TODAY = "2026-09-18";

describe("isValidFlightDateRange", () => {
  it("과거 출발일은 차단된다", () => {
    expect(isValidFlightDateRange("2026-09-17", "2026-09-20", TODAY)).toMatch(
      /출발일은 오늘 이후/,
    );
  });

  it("출발일이 오늘이면 통과한다(경계값)", () => {
    expect(isValidFlightDateRange(TODAY, "2026-09-20", TODAY)).toBeNull();
  });

  it("귀국일이 출발일보다 이전이면 차단된다(역전)", () => {
    expect(isValidFlightDateRange("2026-10-10", "2026-10-05", TODAY)).toMatch(
      /귀국일은 출발일 이후/,
    );
  });

  it("귀국일과 출발일이 같으면 통과한다(경계값)", () => {
    expect(
      isValidFlightDateRange("2026-10-10", "2026-10-10", TODAY),
    ).toBeNull();
  });

  it("정상 범위는 통과한다", () => {
    expect(
      isValidFlightDateRange("2026-10-10", "2026-10-15", TODAY),
    ).toBeNull();
  });

  it("필드가 비어 있으면 차단된다", () => {
    expect(isValidFlightDateRange("", "2026-10-15", TODAY)).toMatch(
      /입력해 주세요/,
    );
  });
});

describe("isValidHotelDateRange", () => {
  it("과거 체크인은 차단된다", () => {
    expect(isValidHotelDateRange("2026-09-17", "2026-09-20", TODAY)).toMatch(
      /체크인은 오늘 이후/,
    );
  });

  it("체크인이 오늘이면 통과한다(경계값)", () => {
    expect(isValidHotelDateRange(TODAY, "2026-09-20", TODAY)).toBeNull();
  });

  it("체크아웃이 체크인보다 이전이면 차단된다(역전)", () => {
    expect(isValidHotelDateRange("2026-10-10", "2026-10-05", TODAY)).toMatch(
      /체크아웃은 체크인 이후/,
    );
  });

  it("체크아웃과 체크인이 같으면 차단된다(동일일)", () => {
    expect(isValidHotelDateRange("2026-10-10", "2026-10-10", TODAY)).toMatch(
      /체크아웃은 체크인 이후/,
    );
  });

  it("체크아웃이 체크인 다음날이면 통과한다(경계값)", () => {
    expect(isValidHotelDateRange("2026-10-10", "2026-10-11", TODAY)).toBeNull();
  });

  it("필드가 비어 있으면 차단된다", () => {
    expect(isValidHotelDateRange("2026-10-10", "", TODAY)).toMatch(
      /입력해 주세요/,
    );
  });
});
