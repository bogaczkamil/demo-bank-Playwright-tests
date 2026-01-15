import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payments.page';
import { PulpitPage } from '../pages/pulpit.page';
import { SideMenuComponent } from '../components/side-menu.component';

test.describe('Payment tests', () => {
  let pulpitPage: PulpitPage;
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await page.goto('/');
    pulpitPage = new PulpitPage(page);
    await loginPage.login(userId, userPassword);
    paymentPage = new PaymentPage(page);
    await pulpitPage.sideMenu.paymentButton.click();
  });

  test('Simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Tony Stark';
    const transferAccount = '12 3456 7890 1234 5678 9012 3456';
    const transferAmount = '2137';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

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
