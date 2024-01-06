import { test, expect } from "@playwright/test";

import { locators } from "../pages/ProductPurchase/ProductLocators";

import IQMobilePage from "../pages/ProductPurchase/IQMobilePage";

test("Remove product from cart", async ({ page }) => {
  const iqmobilePage = new IQMobilePage(page);

  await iqmobilePage.openIQMobilePage();
  await iqmobilePage.addProductToCart();
  await iqmobilePage.openCart();
  await iqmobilePage.removeProduct();
});

// .click() IN REMOVEPRODUCT CAUSED A TIMEOUT
