import { test, expect } from "@playwright/test";

test.describe('Pulpit tests', () => {
test('quick payment with correct data', async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/index.html");
  await page.getByTestId("login-input").fill("tester12");
  await page.getByTestId("password-input").fill("password");
  await page.getByTestId("login-button").click();

  await page.locator('#widget_1_transfer_receiver').selectOption('2');
  await page.locator('#widget_1_transfer_amount').fill('150');
  await page.locator('#widget_1_transfer_title').fill('pizza');
  await page.locator('#execute_btn').click();
  await page.getByRole('button', { name: 'wykonaj' }).click();
  // await page.getByTestId('close-button').click();

  await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza');
});
});