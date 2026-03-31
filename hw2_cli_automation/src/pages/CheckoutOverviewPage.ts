import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
  private readonly page: Page;
  private readonly finishButton: Locator;
  private readonly cancelButton: Locator;
  private readonly subtotalLabel: Locator;
  private readonly taxLabel: Locator;
  private readonly totalLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async getSubtotal(): Promise<string> {
    return await this.subtotalLabel.innerText();
  }

  async getTax(): Promise<string> {
    return await this.taxLabel.innerText();
  }

  async getTotal(): Promise<string> {
    return await this.totalLabel.innerText();
  }
}
