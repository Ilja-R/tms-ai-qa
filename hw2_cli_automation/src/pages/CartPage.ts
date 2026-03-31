import { Page, Locator } from '@playwright/test';

export class CartPage {
  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /**
   * Get items count in cart
   */
  async getItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Remove item from cart by its name
   */
  async removeItemFromCart(itemName: string) {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.locator('button[id^="remove"]').click();
  }

  /**
   * Navigate to checkout step one
   */
  async clickCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Check if item is in cart
   */
  async isItemInCart(itemName: string): Promise<boolean> {
    return (await this.cartItems.filter({ hasText: itemName }).count()) > 0;
  }
}
