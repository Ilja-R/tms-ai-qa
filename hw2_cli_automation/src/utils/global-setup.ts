import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';

dotenv.config();

async function globalSetup(config: FullConfig) {
  const { storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  const baseUrl = process.env.BASE_URL || 'https://www.saucedemo.com/';
  const username = process.env.SAUCE_USERNAME || 'standard_user';
  const password = process.env.SAUCE_PASSWORD || 'secret_sauce';

  await loginPage.navigate(baseUrl);
  await loginPage.fillUsername(username);
  await loginPage.fillPassword(password);
  await loginPage.clickLoginButton();

  // Ensure login is successful before saving state
  await page.waitForURL(/.*inventory.html/);

  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
