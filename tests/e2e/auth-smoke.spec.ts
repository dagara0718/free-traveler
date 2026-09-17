import { test, expect } from "@playwright/test";

/**
 * Chromium 인증 Smoke 골격 — 로그인 사용자 흐름(E2E-006~007).
 * TASKS/TASK-E2E-MATE-AUTH.md 대응. 지금 단계는 골격만 작성한다 — 각 단계의
 * 정확한 selector는 COMPONENT-SC003-MATE-WRITE / COMPONENT-SC004-* /
 * COMPONENT-SC005-* 구현 시 아래 test id 계약에 맞춰 채운다:
 *   - [data-testid="mate-write-form"]        : 동행 작성 Form 컨테이너
 *   - [data-testid="mate-write-submit"]      : 동행 작성 제출 버튼
 *   - [data-testid="mate-post-card"]         : /mates 목록 카드
 *   - [data-testid="mate-detail-panel"]      : /mates 상세 패널
 *   - [data-testid="mate-apply-message"]     : 참가 메시지 입력
 *   - [data-testid="mate-apply-submit"]      : 참가 신청 제출 버튼
 *   - [data-testid="my-activity-tab"]        : /account 내 활동 Tab
 *
 * 인증 테스트 계정 환경변수(E2E_TEST_USER_EMAIL/E2E_TEST_USER_PASSWORD)가 없으면
 * 이 파일의 모든 테스트를 명시적으로 skip한다 — public-smoke는 이 조건과 무관하게
 * 항상 실행된다.
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
  await page.getByRole("button", { name: "로그인" }).click();
}

test.describe("E2E-006 로그인 사용자 동행글 작성과 목록·상세 확인", () => {
  test("동행글을 작성하면 목록과 상세에서 확인된다", async ({ page }) => {
    test.skip(!hasAuthEnv, SKIP_REASON);

    await login(page);

    await page.goto("/travel-tools");
    await page.getByRole("tab", { name: "동행 구하기" }).click();

    const writeForm = page.getByTestId("mate-write-form");
    await expect(writeForm).toBeVisible();

    // TODO(COMPONENT-SC003-MATE-WRITE 구현 시 채움): 제목/국가/지역/기간/인원/스타일/설명 입력
    // + 안전수칙 동의 체크박스 확인 후 제출.
    await page.getByTestId("mate-write-submit").click();

    // SCREEN_ROUTE_CONTRACT.json required_navigation: 동행글 작성 완료 -> /mates(해당 글 상세).
    await expect(page).toHaveURL(/\/mates/);
    await expect(page.getByTestId("mate-detail-panel")).toBeVisible();

    await page.goto("/mates");
    await expect(page.getByTestId("mate-post-card").first()).toBeVisible();
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
    await page.getByTestId("my-activity-tab").click();
    // TODO(COMPONENT-SC005-MY-ACTIVITY 구현 시 채움): 받은 요청/신청 목록에 해당 항목 노출 확인.
  });
});
