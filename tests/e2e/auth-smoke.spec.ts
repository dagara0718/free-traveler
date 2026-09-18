import { test, expect } from "@playwright/test";

/**
 * Chromium 인증 Smoke — 가입~동행~신고 흐름(E2E-006~007, TASK-E2E-MATE-AUTH 대응).
 * 실제 Supabase 프로젝트와 시드 계정(supabase/seed.sql의 seed-member@example.com)이
 * 필요하므로, 인증 테스트 계정 환경변수(E2E_TEST_USER_EMAIL/E2E_TEST_USER_PASSWORD)가
 * 없으면 이 파일의 모든 테스트를 명시적으로 skip한다 — public-smoke는 이 조건과
 * 무관하게 항상 실행된다.
 */

const TEST_USER_EMAIL = process.env.E2E_TEST_USER_EMAIL;
const TEST_USER_PASSWORD = process.env.E2E_TEST_USER_PASSWORD;
const hasAuthEnv = Boolean(TEST_USER_EMAIL && TEST_USER_PASSWORD);
const SKIP_REASON =
  "E2E_TEST_USER_EMAIL/E2E_TEST_USER_PASSWORD 환경변수 없음 — 인증 테스트 계정 미설정으로 auth-smoke만 skip";

async function login(page: import("@playwright/test").Page) {
  await page.goto("/account");
  await page.getByLabel("이메일").fill(TEST_USER_EMAIL!);
  await page.getByLabel("비밀번호").fill(TEST_USER_PASSWORD!);
  await page.getByRole("button", { name: "로그인", exact: true }).click();
  await expect(page.getByRole("button", { name: "프로필" })).toBeVisible();
}

test.describe("E2E-006 로그인 사용자 동행글 작성과 목록·상세 확인", () => {
  test("동행글을 작성하면 목록에서 확인된다", async ({ page }) => {
    test.skip(!hasAuthEnv, SKIP_REASON);

    await login(page);

    await page.goto("/travel-tools");
    await page.getByRole("tab", { name: "동행 구하기" }).click();

    const writeForm = page.getByTestId("mate-write-form");
    await expect(writeForm).toBeVisible();

    const title = `E2E 테스트 동행 ${Date.now()}`;
    await writeForm.getByLabel("제목").fill(title);
    await writeForm.getByLabel("국가 코드").fill("JP");
    await writeForm.getByLabel("지역").fill("도쿄");
    await writeForm.getByLabel("시작일").fill("2027-02-01");
    await writeForm.getByLabel("종료일").fill("2027-02-05");
    await writeForm
      .getByLabel("설명")
      .fill("함께 도쿄를 여행할 동행을 구합니다.");
    await writeForm.getByRole("checkbox").check();
    await page.getByTestId("mate-write-submit").click();

    // COMPONENT-SC003-MATE-WRITE: 서버 응답 성공 시 인라인 접수 메시지로 대체(REQ-FUNC-043).
    await expect(page.getByRole("status")).toBeVisible();

    await page.goto("/mates");
    await expect(page.getByText(title)).toBeVisible();
  });
});

test.describe("E2E-007 동행글 신청과 내 활동 확인", () => {
  test("참가 신청 후 계정 화면 내 활동에서 확인된다", async ({ page }) => {
    test.skip(!hasAuthEnv, SKIP_REASON);

    await login(page);

    await page.goto("/mates");
    await page.getByTestId("mate-post-card").first().click();

    const applyMessage = page.getByTestId("mate-apply-message");
    await expect(applyMessage).toBeVisible();
    await applyMessage.fill("함께 여행하고 싶어요.");
    await page.getByTestId("mate-apply-submit").click();

    // REQ-FUNC-043: 실제 이메일 대신 Toast/화면 상태로 접수 확인.
    await expect(page.getByRole("status")).toContainText(/신청/);

    await page.goto("/account");
    await page.getByRole("button", { name: "내 활동" }).click();
    await expect(
      page.getByRole("heading", { name: "받은 요청" }),
    ).toBeVisible();
  });
});
