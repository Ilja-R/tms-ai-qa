import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { LoginSteps } from '../steps/LoginSteps';
import { CartSteps } from '../steps/CartSteps';
import { CheckoutSteps } from '../steps/CheckoutSteps';

type MyFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutInformationPage: CheckoutInformationPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  loginFlow: LoginSteps;
  cartFlow: CartSteps;
  checkoutFlow: CheckoutSteps;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInformationPage: async ({ page }, use) => {
    await use(new CheckoutInformationPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  loginFlow: async ({ loginPage, productsPage }, use) => {
    await use(new LoginSteps(loginPage, productsPage));
  },
  cartFlow: async ({ productsPage, cartPage }, use) => {
    await use(new CartSteps(productsPage, cartPage));
  },
  checkoutFlow: async (
    { checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage },
    use
  ) => {
    await use(
      new CheckoutSteps(
        checkoutInformationPage,
        checkoutOverviewPage,
        checkoutCompletePage
      )
    );
  },
});

export { expect } from '@playwright/test';
