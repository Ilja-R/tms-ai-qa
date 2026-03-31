import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
  private readonly page: Page;
  private readonly header: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator('.complete-header');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getHeaderText(): Promise<string> {
    return await this.header.innerText();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}
