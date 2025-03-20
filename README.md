# Test Automation training

## Links

- test site https://demo-bank.vercel.app/

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://demo-bank.vercel.app/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`
- cancelling Node process  
  hit twice <kbd>Ctrl</kbd> + <kbd>C</kbd>

  ## Visual Studio Code

  ### Functions

  - Prewiev: for README.md
  - Autosave: in File -> Auto Save
  - Timeline: file context menu -> Open Timeline
  - Formatting: editor -> context menu -> Format document OR Shift+Alt+F
  - Searching: editor -> <kbd>CTRL</kbd> + <kbd>F</kbd>
  - Accept hint in editor: <kbd>Enter</kbd>
  - Comment/Uncomment: <kbd>Ctrl</kbd> + <kbd>/</kbd>
  - Duplicate line: <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>↑</kbd>
  - Use more than one terminal: <kbd>+</kbd> button in TERMINAL
  - Extract to variable: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd>
  - Move line i.e. up: <kbd>Alt</kbd> + <kbd>↑</kbd>
  - Creating a new variable: Refactor <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> -> Extract to constant in enclosing scope

  ## Plugins

  - GitLens - view details of your repository i.e. commits history

  ## Playwright

  ### Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
- add timeouts

  ```javascript
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  /**
   * Maximum time expect() should wait for the condition to be met.
   * For example in `await expect(locator).toHaveText();`
   */
  timeout: 5000,
  },
  ```

  ### Playwright snippets

  - import:
    ```typescript
    import { test, expect } from '@playwright/test';
    ```
  - test:

    ```typescript
    test('test description', async ({ page }) => {});
    ```

  - describe:

    ```typescript
    test.describe('Group description', () => {});
    ```

  - running one test: `test.only`
  - getting out of selected field: `await page.getByTestId("password-input").blur();`

  ### Locators

- `getByTestId` i.e. `getByTestId('login-input')` for element with `data-testid="login-input"`
- `getByRole` i.e. `getByRole('button', { name: 'wykonaj' })`
- `locator` i.e. `locator('#some-id')` for element with attribute `id="some-id"`, `#some-id` is `css` selector

### Updating Playwright

- check if Playwright should be updated  
  `npm outdated @playwright/test`
- update Playwright  
  `npm i @playwright/test`
- update browsers  
  `npx playwright install`
- verify Playwright version  
  `npx @playwright/test --version`

## Other

### Chrome

- use English version!
- open DevTools <kbd>F12</kbd> or right click `Inspect`
- get selector: right click on element -> Copy -> Copy selector
- testing CSS selectors in Console: `$$('selector')`

### Prettier
- install Prettier  
`npm install --save-dev --save-exact prettier`
- configure Prettier
    - exlude files in `.prettierignore`
        ```
        package-lock.json
        playwright-report

        ```
    - set rules in `.prettierrc.json`
        ```
        {
            "singleQuote": true
        }
        ```
- run Prettier  
`npx prettier --write .`
- additionaly you can install VSC extension: **Prettier**