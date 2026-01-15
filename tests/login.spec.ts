import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('successful login with valid credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';
    const pulpitPage = new PulpitPage(page);

    //Act
    await loginPage.login(userId, userPassword);

    //Assert
    await expect(pulpitPage.userName).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const invalidUserId = 'tester1';
    const userIdValidationMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await loginPage.loginInput.fill(invalidUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.loginErrorId).toHaveText(userIdValidationMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const invalidPassword = '1234';
    const userPasswordValidationMessage = 'hasło ma min. 8 znaków';

    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(invalidPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.loginErrorPassword).toHaveText(
      userPasswordValidationMessage,
    );
  });
});
