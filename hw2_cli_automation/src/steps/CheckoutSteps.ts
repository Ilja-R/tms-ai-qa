import { test, expect } from '@playwright/test';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

export class CheckoutSteps {
  private readonly infoPage: CheckoutInformationPage;
  private readonly overviewPage: CheckoutOverviewPage;
  private readonly completePage: CheckoutCompletePage;

  constructor(
    infoPage: CheckoutInformationPage,
    overviewPage: CheckoutOverviewPage,
    completePage: CheckoutCompletePage
  ) {
    this.infoPage = infoPage;
    this.overviewPage = overviewPage;
    this.completePage = completePage;
  }

  /**
   * Fill information and continue
   */
  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await test.step(`Fill checkout information: "${firstName} ${lastName}, ${postalCode}"`, async () => {
      await this.infoPage.fillFirstName(firstName);
      await this.infoPage.fillLastName(lastName);
      await this.infoPage.fillPostalCode(postalCode);
      await this.infoPage.clickContinue();
    });
  }

  /**
   * Cancel at information step
   */
  async cancelAtInformation() {
    await test.step('Cancel checkout at information step', async () => {
      await this.infoPage.clickCancel();
    });
  }

  /**
   * Cancel at overview step
   */
  async cancelAtOverview() {
    await test.step('Cancel checkout at overview step', async () => {
      await this.overviewPage.clickCancel();
    });
  }

  /**
   * Verify total price and finish
   */
  async finishCheckout() {
    await test.step('Finish the checkout', async () => {
      await this.overviewPage.clickFinish();
    });
  }

  /**
   * Verify subtotal, tax and total
   */
  async verifyPrices(expectedSubtotal: string, expectedTax: string, expectedTotal: string) {
    await test.step(`Verify prices - Subtotal: ${expectedSubtotal}, Tax: ${expectedTax}, Total: ${expectedTotal}`, async () => {
      expect(await this.overviewPage.getSubtotal()).toContain(expectedSubtotal);
      expect(await this.overviewPage.getTax()).toContain(expectedTax);
      expect(await this.overviewPage.getTotal()).toContain(expectedTotal);
    });
  }

  /**
   * Verify order completion
   */
  async verifyOrderSuccess() {
    await test.step('Verify order success message', async () => {
      const headerText = await this.completePage.getHeaderText();
      expect(headerText).toBe('Thank you for your order!');
    });
  }

  /**
   * Verify error message at information step
   */
  async verifyInfoErrorMessage(expectedMessage: string) {
    await test.step(`Verify information error message: "${expectedMessage}"`, async () => {
      const actualMessage = await this.infoPage.getErrorMessage();
      expect(actualMessage).toContain(expectedMessage);
    });
  }
}
