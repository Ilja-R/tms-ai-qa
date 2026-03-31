import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

export class LoginSteps {
  private readonly loginPage: LoginPage;
  private readonly productsPage: ProductsPage;

  constructor(loginPage: LoginPage, productsPage: ProductsPage) {
    this.loginPage = loginPage;
    this.productsPage = productsPage;
  }

  /**
   * Perform login with provided credentials
   */
  async login(username: string, password: string) {
    await test.step(`Login with user: "${username}"`, async () => {
      await this.loginPage.fillUsername(username);
      await this.loginPage.fillPassword(password);
      await this.loginPage.clickLoginButton();
    });
  }

  /**
   * Navigate to the base URL
   */
  async navigateToLoginPage(baseUrl: string) {
    await test.step('Navigate to login page', async () => {
      await this.loginPage.navigate(baseUrl);
    });
  }

  /**
   * Verify login success by checking Products page visibility
   */
  async verifyLoginSuccess() {
    await test.step('Verify login was successful', async () => {
      await expect(await this.productsPage.isInventoryVisible()).toBeTruthy();
    });
  }

  /**
   * Verify login error message
   */
  async verifyErrorMessage(expectedMessage: string) {
    await test.step(`Verify error message: "${expectedMessage}"`, async () => {
      const actualMessage = await this.loginPage.getErrorMessage();
      expect(actualMessage).toContain(expectedMessage);
    });
  }
}
