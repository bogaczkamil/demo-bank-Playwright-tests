import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });
  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessage = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;
    const pulpitPage = new PulpitPage(page);
    //Act
    await pulpitPage.transferReceiver.selectOption(receiverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);

    await pulpitPage.transferButton.click();
    await pulpitPage.closeButton.click();

    //Assert
    await expect(pulpitPage.actionMessage).toHaveText(expectedMessage);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiverNumber = '500 xxx xxx';
    const topupAmount = '50';
    const expectedMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiverNumber}`;
    const pulpitPage = new PulpitPage(page);
    // Act

    await pulpitPage.topupReceiverInput.selectOption(topupReceiverNumber);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.closeButton.click();

    await expect(pulpitPage.actionMessage).toHaveText(expectedMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const topupReceiverNumber = '500 xxx xxx';
    const topupAmount = '50';
    const integer = await pulpitPage.integer.innerText();
    const decimal = await pulpitPage.decimal.innerText();
    const initialBalance = Number(`${integer}.${decimal}`);
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act
    await pulpitPage.topupReceiverInput.selectOption(topupReceiverNumber);
    await pulpitPage.topupAmountInput.fill(topupAmount);
    await pulpitPage.topupAgreementCheckbox.click();
    await pulpitPage.topupExecuteButton.click();
    await pulpitPage.closeButton.click();

    //Assert
    const newValue = await pulpitPage.integer.innerText();
    const newDecimal = await pulpitPage.decimal.innerText();
    const uiBalance = Number(`${newValue}.${newDecimal}`);

    expect(uiBalance).toBeCloseTo(expectedBalance, 2);
  });
});
