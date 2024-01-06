import { test, expect } from "@playwright/test";
import IQMobilePage from "../pages/ProductPurchase/IQMobilePage";
import { testData } from "./testData";

test("Product purchase from homepage", async ({ page }) => {
  const iqmobilePage = new IQMobilePage(page);

  await iqmobilePage.openIQMobilePage();
  await iqmobilePage.addProductToCart();
  await iqmobilePage.openCart();
  await iqmobilePage.goToCheckout();
  await iqmobilePage.enterPaymentInformation(
    testData.name,
    testData.lastname,
    testData.coutry,
    testData.street,
    testData.postalCode,
    testData.city,
    testData.phone,
    testData.email
  );
  await iqmobilePage.orderProduct();
});

// NOT WORKING, ACTIONS CAUSE TIMEOUT
