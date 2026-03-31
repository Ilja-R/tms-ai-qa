import { Page, Locator } from '@playwright/test';

export class ProductsPage {
  private readonly page: Page;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;
  private readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.shoppingCartLink = page.locator('.shopping_cart_link');
  }

  /**
   * Add item to cart by its name
   */
  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button[id^="add-to-cart"]').click();
  }

  /**
   * Remove item from cart by its name
   */
  async removeItemFromCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
    await item.locator('button[id^="remove"]').click();
  }

  /**
   * Get cart badge count
   */
  async getCartCount(): Promise<string> {
    if (await this.cartBadge.isVisible()) {
      return await this.cartBadge.innerText();
    }
    return '0';
  }

  /**
   * Navigate to the shopping cart
   */
  async clickShoppingCart() {
    await this.shoppingCartLink.click();
  }

  /**
   * Is Products page visible
   */
  async isInventoryVisible(): Promise<boolean> {
    return await this.page.locator('.inventory_list').isVisible();
  }
}
