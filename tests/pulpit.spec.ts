import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = 'tester12';
    const userPassword = 'asdf4561';

    await page.goto('/');
    await page.getByTestId('login-input').fill('tester12');
    await page.getByTestId('password-input').fill('password');
    await page.getByTestId('login-button').click();
  });
  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiverNumber = '500 xxx xxx';
    const topupAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiverNumber}`;

    // Act
    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(topupReceiverNumber);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiverNumber = '500 xxx xxx';
    const topupAmount = '50';
    const value = await page.locator('#money_value').innerText();
    const decimal = await page.locator('#decimal_value').innerText();
    const initialBalance = Number(`${value}.${decimal}`);
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act
    await page
      .locator('#widget_1_topup_receiver')
      .selectOption(topupReceiverNumber);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    const newValue = await page.locator('#money_value').innerText();
    const newDecimal = await page.locator('#decimal_value').innerText();
    const uiBalance = Number(`${newValue}.${newDecimal}`);

    expect(uiBalance).toBeCloseTo(expectedBalance, 2);
  });
});
