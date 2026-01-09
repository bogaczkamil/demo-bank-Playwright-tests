import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payments.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  const userId = loginData.userId;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Tony Stark';
    const transferAccount = '12 3456 7890 1234 5678 9012 3456';
    const transferAmount = '2137';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;
    const paymentPage = new PaymentPage(page);
    const pulpitPage = new PulpitPage(page);
    //Act
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.receiverAccountInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);
    await paymentPage.transferButton.click();
    await paymentPage.closeButton.click();

    //Assert
    await expect(pulpitPage.actionMessage).toHaveText(expectedMessage);
  });
});
