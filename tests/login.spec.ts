import { test, expect } from "@playwright/test";

test.describe("User login to Demobank", () => {
  test("successful login with valid credentials", async ({ page }) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("asdf4561");
    await page.getByTestId("login-button").click();
    await page.getByTestId("user-name").click();

    await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
  });

  test("unsuccessful login with invalid username", async ({page,}) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("tester1");
    await page.getByTestId("password-input").click();
    await page.getByTestId("error-login-id").click();

    await expect(page.getByTestId("error-login-id")).toHaveText("identyfikator ma min. 8 znaków");
  });

  test("unsuccessful login with too short password", async ({page,}) => {
    await page.goto("https://demo-bank.vercel.app/index.html");
    await page.getByTestId("login-input").click();
    await page.getByTestId("login-input").fill("tester12");
    await page.getByTestId("password-input").click();
    await page.getByTestId("password-input").fill("1234");
    await page.getByTestId("password-input").blur();

    await expect(page.getByTestId("error-login-password")).toHaveText("hasło ma min. 8 znaków");
  });
});
