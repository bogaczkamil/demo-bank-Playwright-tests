import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login to Demobank', () => {
  const userId = loginData.userId;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with valid credentials', async ({ page }) => {
    // Arrange
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';
    const loginPage = new LoginPage(page);

    //Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const invalidUserId = 'tester1';
    const userIdValidationMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(invalidUserId);
    await page.getByTestId('password-input').click();

    // Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      userIdValidationMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const invalidPassword = '1234';
    const userPasswordasswordValidationMessage = 'hasło ma min. 8 znaków';

    // Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(invalidPassword);
    await page.getByTestId('password-input').blur();

    // Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      userPasswordasswordValidationMessage,
    );
  });
});
