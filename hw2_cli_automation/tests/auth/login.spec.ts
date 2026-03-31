import { test } from '../../src/fixtures/fixtures';
import * as dotenv from 'dotenv';

dotenv.config();

test.describe('Login Flow', () => {
  // Reset storage state for login tests to test the actual login process
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ loginFlow }) => {
    await loginFlow.navigateToLoginPage(process.env.BASE_URL!);
  });

  test('Successful login with valid credentials', async ({ loginFlow }) => {
    await loginFlow.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    await loginFlow.verifyLoginSuccess();
  });

  test('Login failure with invalid username', async ({ loginFlow }) => {
    await loginFlow.login('invalid_user', process.env.SAUCE_PASSWORD!);
    await loginFlow.verifyErrorMessage('Username and password do not match any user in this service');
  });

  test('Login failure with invalid password', async ({ loginFlow }) => {
    await loginFlow.login(process.env.SAUCE_USERNAME!, 'wrong_password');
    await loginFlow.verifyErrorMessage('Username and password do not match any user in this service');
  });

  test('Login failure with locked out user', async ({ loginFlow }) => {
    await loginFlow.login('locked_out_user', process.env.SAUCE_PASSWORD!);
    await loginFlow.verifyErrorMessage('Sorry, this user has been locked out');
  });

  test('Login failure with empty credentials', async ({ loginFlow }) => {
    await loginFlow.login('', '');
    await loginFlow.verifyErrorMessage('Username is required');
  });

  test.skip('Failing login test for video demonstration', async ({ loginFlow }) => {
    await loginFlow.login(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);
    // This will fail because no error message is expected on successful login
    await loginFlow.verifyErrorMessage('This error should not appear, making the test fail');
  });
});
