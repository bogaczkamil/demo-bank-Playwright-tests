import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);

    await loginPage.login(userId, userPassword);
    pulpitPage = new PulpitPage(page);
  });
  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;
    //Act
    await pulpitPage.makeQuickTransfer(
      receiverId,
      transferAmount,
      transferTitle,
    );

    //Assert
    await expect(pulpitPage.actionMessage).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiverNumber = '500 xxx xxx';
    const topupAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiverNumber}`;
    // Act

    await pulpitPage.makeMobileTopup(topupReceiverNumber, topupAmount);

    //Assert
    await expect(pulpitPage.actionMessage).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiverNumber = '500 xxx xxx';
    const topupAmount = '50';
    const integer = await pulpitPage.integer.innerText();
    const decimal = await pulpitPage.decimal.innerText();
    const initialBalance = Number(`${integer}.${decimal}`);
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act
    await pulpitPage.makeMobileTopup(topupReceiverNumber, topupAmount);

    //Assert
    const newValue = await pulpitPage.integer.innerText();
    const newDecimal = await pulpitPage.decimal.innerText();
    const uiBalance = Number(`${newValue}.${newDecimal}`);

    expect(uiBalance).toBeCloseTo(expectedBalance, 2);
  });
});
