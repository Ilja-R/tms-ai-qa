import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';

export class CartSteps {
  private readonly productsPage: ProductsPage;
  private readonly cartPage: CartPage;

  constructor(productsPage: ProductsPage, cartPage: CartPage) {
    this.productsPage = productsPage;
    this.cartPage = cartPage;
  }

  /**
   * Add multiple items to the cart
   */
  async addItemsToCart(itemNames: string[]) {
    for (const itemName of itemNames) {
      await test.step(`Add item "${itemName}" to cart`, async () => {
        await this.productsPage.addItemToCart(itemName);
      });
    }
  }

  /**
   * Remove item from the cart on Products page
   */
  async removeItemFromProductsPage(itemName: string) {
    await test.step(`Remove item "${itemName}" on Products page`, async () => {
      await this.productsPage.removeItemFromCart(itemName);
    });
  }

  /**
   * Remove item from the cart on Cart page
   */
  async removeItemFromCartPage(itemName: string) {
    await test.step(`Remove item "${itemName}" on Cart page`, async () => {
      await this.cartPage.removeItemFromCart(itemName);
    });
  }

  /**
   * Verify cart badge count
   */
  async verifyCartBadgeCount(expectedCount: string) {
    await test.step(`Verify cart badge shows "${expectedCount}"`, async () => {
      const actualCount = await this.productsPage.getCartCount();
      expect(actualCount).toBe(expectedCount);
    });
  }

  /**
   * Navigate to the Cart page
   */
  async openCart() {
    await test.step('Open the shopping cart', async () => {
      await this.productsPage.clickShoppingCart();
    });
  }

  /**
   * Verify if item is in the cart
   */
  async verifyItemInCart(itemName: string, expected: boolean = true) {
    await test.step(`Verify item "${itemName}" is ${expected ? '' : 'NOT '}in cart`, async () => {
      const exists = await this.cartPage.isItemInCart(itemName);
      expect(exists).toBe(expected);
    });
  }

  /**
   * Verify items count on Cart page
   */
  async verifyCartItemsCount(expectedCount: number) {
    await test.step(`Verify cart contains ${expectedCount} items`, async () => {
      const actualCount = await this.cartPage.getItemsCount();
      expect(actualCount).toBe(expectedCount);
    });
  }

  /**
   * Start checkout process
   */
  async proceedToCheckout() {
    await test.step('Proceed to checkout', async () => {
      await this.cartPage.clickCheckout();
    });
  }
}
