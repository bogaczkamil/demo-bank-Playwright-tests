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

## Playwright Config modifications
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

  ## Visual Studio Code
  - Prewiev: for README.md
  - Autosave: in File -> Auto Save
  - Timeline: file context menu -> Open Timeline
  - Formatting: editor -> context menu -> Format document OR Shift+Alt+F

  ## Playwright snippets
  - test:
    ```javascript
    test('test description', async ({ page }) => {
    
    });
    ```
  - describe:
     ```javascript
     describe('Group description', () => {

     });
    ```

  - running one test: `test.only`
  - getting out of selected field: `await page.getByTestId("password-input").blur();`