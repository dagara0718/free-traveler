import { test, expect } from "@playwright/test";

/**
 * Chromium 공개 Smoke — 로그인 없이 접근 가능한 흐름만 다룬다(E2E-001~005).
 * PROJECT_SCOPE.md §6 / TASKS/TASK-E2E-PUBLIC-SMOKE.md / TASKS/TASK-E2E-TRAVEL-TOOLS.md 대응.
 *
 * Selector 우선순위: role > label > test id (텍스트 위치/CSS 구조 금지).
 * 아직 구현되지 않은 요소는 아래 test id 계약을 사용한다 — 해당 Component Task
 * (COMPONENT-SC001-DESTINATION-GRID / COMPONENT-SC001-MATE-TEASER /
 * COMPONENT-SC001-ABOUT-TEASER / COMPONENT-SC003-FLIGHT-FORM /
 * COMPONENT-SC003-HOTEL-FORM / COMPONENT-SC003-MATE-WRITE) 구현 시 그대로 부여할 것:
 *   - [data-testid="destination-card"]      : SCR-001 국내/해외 여행지 카드 (12개 고정)
 *   - [data-testid="mate-section-cta"]      : SCR-001 동행글 섹션 CTA (href=/mates)
 *   - [data-testid="about-section-cta"]     : SCR-001 대표소개 섹션 CTA (href=/about)
 *   - [data-testid="flight-form-submit"]    : 항공 Form 요약 표시 버튼
 *   - [data-testid="flight-external-link"]  : 항공 요약의 외부 이동 링크
 *   - [data-testid="hotel-form-submit"]     : 숙소 Form 요약 표시 버튼
 *   - [data-testid="hotel-external-link"]   : 숙소 요약의 외부 이동 링크
 * Tab 이름("항공편"/"숙소"/"동행 구하기")은 design-reference/UI_CONTRACT.md SCR-003
 * "주요 Component" 행에 고정된 문구를 그대로 쓴다.
 */

test.describe("E2E-001 메인 페이지 추천 여행지·주요 CTA", () => {
  test("국내/해외 여행지 카드와 Hero CTA가 노출된다", async ({ page }) => {
    await page.goto("/");

    // Functional AC: 국내 6 + 해외 6 = 12개 카드 고정(TASKS/00_TASK_LIST.md PAGE-SCR001).
    await expect(page.getByTestId("destination-card")).toHaveCount(12);

    // SCREEN_ROUTE_CONTRACT.json required_navigation: SCR-001 -> SCR-003 트리거 고정 문구.
    const heroCta = page.getByRole("link", { name: "항공·숙소 조건 정리하기" });
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toHaveAttribute("href", "/travel-tools");

    const mateCta = page.getByTestId("mate-section-cta");
    await expect(mateCta).toHaveAttribute("href", "/mates");

    const aboutCta = page.getByTestId("about-section-cta");
    await expect(aboutCta).toHaveAttribute("href", "/about");
  });
});

test.describe("E2E-002 대표 소개 free_traveler 지표", () => {
  test("free_traveler 소개와 50+/30+ 지표가 노출된다", async ({ page }) => {
    await page.goto("/about");

    // DATA-REPRESENTATIVE AC: `50+ Trips`/`30+ Countries` 단일 소스 고정 문구.
    await expect(
      page.getByRole("heading", { name: /free_traveler/i }),
    ).toBeVisible();
    await expect(page.getByText(/50\+/)).toBeVisible();
    await expect(page.getByText(/30\+/)).toBeVisible();
  });
});

test.describe("E2E-003 항공 외부 이동 안내", () => {
  test("항공 조건 입력 후 비전달 고지와 외부 이동 링크를 보여준다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");

    await page.getByRole("tab", { name: "항공편" }).click();
    await page.getByLabel("국가").fill("일본");
    await page.getByLabel("지역").fill("도쿄");
    await page.getByLabel("출발일").fill("2027-01-10");
    await page.getByLabel("귀국일").fill("2027-01-15");
    await page.getByTestId("flight-form-submit").click();

    // REQ-FUNC-015 고정 문구 — 입력값이 서버로 전달되지 않는다는 고지.
    await expect(
      page.getByText("입력값은 외부로 전달되지 않습니다"),
    ).toBeVisible();

    const externalLink = page.getByTestId("flight-external-link");
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await expect(externalLink).toHaveAttribute("rel", /noopener/);
    await expect(externalLink).toHaveAttribute("rel", /noreferrer/);
    await expect(externalLink).toHaveAttribute("href", /.+/);
    // 외부 사이트 자체는 열거나 그 내용을 검사하지 않는다 — href/속성만 확인.
  });
});

test.describe("E2E-004 숙소 외부 이동 안내", () => {
  test("숙소 조건 입력 후 비전달 고지와 외부 이동 링크를 보여준다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");

    await page.getByRole("tab", { name: "숙소" }).click();
    await page.getByLabel("국가").fill("일본");
    await page.getByLabel("지역").fill("오사카");
    await page.getByLabel("체크인").fill("2027-01-10");
    await page.getByLabel("체크아웃").fill("2027-01-12");
    await page.getByTestId("hotel-form-submit").click();

    await expect(
      page.getByText("입력값은 외부로 전달되지 않습니다"),
    ).toBeVisible();

    const externalLink = page.getByTestId("hotel-external-link");
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await expect(externalLink).toHaveAttribute("rel", /noopener/);
    await expect(externalLink).toHaveAttribute("rel", /noreferrer/);
    await expect(externalLink).toHaveAttribute("href", /.+/);
  });
});

test.describe("E2E-005 비로그인 동행글 작성 로그인 안내", () => {
  test("비로그인 상태에서 동행 탭은 로그인 안내로 대체된다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");

    await page.getByRole("tab", { name: "동행 구하기" }).click();

    // SCREEN_ROUTE_CONTRACT.json required_navigation: SCR-003 -> SCR-005 "동행 탭 로그인 안내".
    const loginPrompt = page.getByRole("link", { name: /로그인/ });
    await expect(loginPrompt).toBeVisible();
    await expect(loginPrompt).toHaveAttribute("href", "/account");

    // 동행글 작성 Form 자체는 비로그인 상태에서 렌더링되지 않는다.
    await expect(page.getByTestId("mate-write-form")).toHaveCount(0);
  });
});
