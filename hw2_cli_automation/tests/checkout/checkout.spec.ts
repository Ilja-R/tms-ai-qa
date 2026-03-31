import { test } from '../../src/fixtures/fixtures';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ page, cartFlow }) => {
    // Start with items in cart for checkout tests
    await page.goto('/inventory.html');
    await cartFlow.addItemsToCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await cartFlow.openCart();
    await cartFlow.proceedToCheckout();
  });

  test('Full end-to-end checkout flow', async ({ checkoutFlow }) => {
    await checkoutFlow.fillInformation('John', 'Doe', '12345');
    await checkoutFlow.verifyPrices('39.98', '3.20', '43.18');
    await checkoutFlow.finishCheckout();
    await checkoutFlow.verifyOrderSuccess();
  });

  test('Cancel checkout at Information stage', async ({ checkoutFlow, cartFlow }) => {
    await checkoutFlow.cancelAtInformation();
    // Should return back to cart
    await cartFlow.verifyCartItemsCount(2);
  });

  test('Cancel checkout at Overview stage', async ({ checkoutFlow, productsPage }) => {
    await checkoutFlow.fillInformation('John', 'Doe', '12345');
    await checkoutFlow.cancelAtOverview();
    // Should return back to products page
    await productsPage.isInventoryVisible();
  });

  test('Validation error for missing information', async ({ checkoutFlow }) => {
    await checkoutFlow.fillInformation('', '', '');
    await checkoutFlow.verifyInfoErrorMessage('First Name is required');
  });

  test('Verify total price calculation correctness', async ({ checkoutFlow }) => {
    // Backpack (29.99) + Bike Light (9.99) = 39.98
    // Tax (8%) = 3.1984 -> rounded to 3.20
    // Total = 43.18
    await checkoutFlow.fillInformation('John', 'Doe', '12345');
    await checkoutFlow.verifyPrices('39.98', '3.20', '43.18');
  });

  test.skip('Failing checkout test for video demonstration', async ({ checkoutFlow }) => {
    await checkoutFlow.fillInformation('John', 'Doe', '12345');
    // This will fail because price is actually 43.18
    await checkoutFlow.verifyPrices('100.00', '10.00', '110.00');
  });
});
