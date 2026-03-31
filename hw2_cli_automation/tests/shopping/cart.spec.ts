import { test } from '../../src/fixtures/fixtures';

test.describe('Shopping Cart Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to inventory after being logged in via storageState
    await page.goto('/inventory.html');
  });

  test('Add a single item to the cart', async ({ cartFlow }) => {
    await cartFlow.addItemsToCart(['Sauce Labs Backpack']);
    await cartFlow.verifyCartBadgeCount('1');
    
    await cartFlow.openCart();
    await cartFlow.verifyItemInCart('Sauce Labs Backpack');
  });

  test('Add multiple items to the cart', async ({ cartFlow }) => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    await cartFlow.addItemsToCart(items);
    await cartFlow.verifyCartBadgeCount('3');
    
    await cartFlow.openCart();
    for (const item of items) {
      await cartFlow.verifyItemInCart(item);
    }
  });

  test('Remove an item from the cart on Products page', async ({ cartFlow }) => {
    await cartFlow.addItemsToCart(['Sauce Labs Backpack']);
    await cartFlow.verifyCartBadgeCount('1');
    
    await cartFlow.removeItemFromProductsPage('Sauce Labs Backpack');
    await cartFlow.verifyCartBadgeCount('0');
  });

  test('Remove an item from the cart on Cart page', async ({ cartFlow }) => {
    await cartFlow.addItemsToCart(['Sauce Labs Backpack']);
    await cartFlow.openCart();
    await cartFlow.verifyItemInCart('Sauce Labs Backpack');
    
    await cartFlow.removeItemFromCartPage('Sauce Labs Backpack');
    await cartFlow.verifyCartItemsCount(0);
  });

  test('Verify cart content correctness', async ({ cartFlow }) => {
    const items = ['Sauce Labs Backpack', 'Sauce Labs Onesie'];
    await cartFlow.addItemsToCart(items);
    await cartFlow.openCart();
    
    await cartFlow.verifyCartItemsCount(2);
    await cartFlow.verifyItemInCart('Sauce Labs Backpack');
    await cartFlow.verifyItemInCart('Sauce Labs Onesie');
    await cartFlow.verifyItemInCart('Sauce Labs Bike Light', false); // Negative check
  });

  test.skip('Failing cart test for video demonstration', async ({ cartFlow }) => {
    await cartFlow.addItemsToCart(['Sauce Labs Backpack']);
    // This will fail because badge should be '1'
    await cartFlow.verifyCartBadgeCount('999');
  });
});
