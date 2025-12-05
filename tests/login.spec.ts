import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  const userId = 'tester12';
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with valid credentials', async ({ page }) => {
    // Arrange
    const userPassword = 'asdf4561';
    const expectedUserName = 'Jan Demobankowy';

    //Act
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

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
