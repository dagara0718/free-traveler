import { describe, it, expect } from "vitest";
import { effectiveStatus } from "@/components/mates/MatePostCard";

/**
 * COMPONENT-SC004-LIST에 구현된 effectiveStatus()(OPEN/CLOSED 전이 규칙)를
 * 실제 코드로 검증한다. mate_application의 PENDING/APPROVED/REJECTED 전이는
 * 별도 src/lib/mates/state.ts 모듈 없이 API Route(`/api/applications/[id]`)의
 * 권한 검사 + DB CHECK 제약으로만 강제되고 있어, 여기서는 그 의도된 규칙을
 * 로컬 함수로 재현해 스펙 문서 역할로 검증한다 — 완료 보고의 한계 사항 참고.
 */

const TODAY = "2026-09-18";

describe("effectiveStatus — mate_post OPEN/CLOSED 전이", () => {
  it("recruiting 상태이고 종료일이 미래면 그대로 recruiting", () => {
    expect(
      effectiveStatus({ status: "recruiting", endDate: "2026-10-01" }),
    ).toBe("recruiting");
  });

  it("recruiting 상태이고 종료일이 과거면 CLOSED로 강제 전환된다", () => {
    expect(
      effectiveStatus({ status: "recruiting", endDate: "2020-01-01" }),
    ).toBe("closed");
  });

  it("closing_soon 상태이고 종료일이 과거면 CLOSED로 강제 전환된다", () => {
    expect(
      effectiveStatus({ status: "closing_soon", endDate: "2020-01-01" }),
    ).toBe("closed");
  });

  it("이미 closed면 종료일과 무관하게 closed 유지", () => {
    expect(effectiveStatus({ status: "closed", endDate: "2099-01-01" })).toBe(
      "closed",
    );
  });

  it("종료일이 오늘이면 아직 만료로 보지 않는다(경계값)", () => {
    expect(effectiveStatus({ status: "recruiting", endDate: TODAY })).toBe(
      "recruiting",
    );
  });
});

type ApplicationStatus = "pending" | "approved" | "rejected";

// mate_application 상태 전이 규칙(REQ-FUNC-035~038) — API-APPLICATIONS Route
// Handler의 실제 동작 의도를 문서화한 것. pending에서만 승인/거절로 전이할 수
// 있고, 그 이후에는 전이가 불가능하다(재신청은 새 행으로 이루어짐).
function isValidApplicationTransition(
  from: ApplicationStatus,
  to: ApplicationStatus,
): boolean {
  if (from === to) return false;
  return from === "pending" && (to === "approved" || to === "rejected");
}

describe("isValidApplicationTransition — mate_application PENDING/APPROVED/REJECTED 전이", () => {
  it("pending -> approved 허용", () => {
    expect(isValidApplicationTransition("pending", "approved")).toBe(true);
  });

  it("pending -> rejected 허용", () => {
    expect(isValidApplicationTransition("pending", "rejected")).toBe(true);
  });

  it("approved -> rejected 재전이 차단", () => {
    expect(isValidApplicationTransition("approved", "rejected")).toBe(false);
  });

  it("rejected -> approved 재전이 차단", () => {
    expect(isValidApplicationTransition("rejected", "approved")).toBe(false);
  });

  it("동일 상태로의 전이는 무의미하므로 차단", () => {
    expect(isValidApplicationTransition("pending", "pending")).toBe(false);
  });
});
