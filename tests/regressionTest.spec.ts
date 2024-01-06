import { test, expect } from "@playwright/test";
import PCWizard from "../pages/PCWizard";
import { locators } from "./testLocators";
import Homepage from "../pages/Homepage/homepage";
import { testData } from "./testData";
import PurchasePage from "../pages/ProductPurchase/PurchasePage";
import Cartpage from "../pages/Cartpage/Cartpage";

// #1
test("Verify valid search result", async ({ page }) => {
  const pcPage = new PCWizard(page);

  await pcPage.gotoPage();
  await pcPage.search(testData.searchQuery);
  await page.waitForLoadState("domcontentloaded");
  const element = await page.locator(locators.validSearch);
  await expect(element).toContainText("Podloga");
});

// #2
test("Verify valid search result for invalid input", async ({ page }) => {
  const pcPage = new PCWizard(page);

  await pcPage.gotoPage();
  await pcPage.search("#1fa2g");
  await page.waitForLoadState("domcontentloaded");
  let element;
  try {
    element = await page.locator(locators.validSearch);
  } catch (error) {
    await expect(element).not.toBeVisible();
  }
});

// #3
test("Verify contact page access and valid information", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const homepage = new Homepage(page);

  await pcPage.gotoPage();
  await homepage.gotoContactPage();

  const address = await page.getByText(testData.validAddress);
  await page.waitForLoadState("domcontentloaded");
  await expect(address).toBeVisible();
});

// #4
test("Verify access to about us page and valid info", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const homepage = new Homepage(page);

  await pcPage.gotoPage();
  await homepage.gotoAboutUs();

  const title = await page.getByText(locators.aboutUsTitle);
  await expect(title).toBeVisible();
});

// #5
test("Verify remove from cart functionality", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const purchasePage = new PurchasePage(page);
  const cartPage = new Cartpage(page);

  await pcPage.gotoPage();
  await purchasePage.addHomepageProductToCart();
  await pcPage.openCart();

  await page.waitForLoadState("domcontentloaded");
  await cartPage.removeProduct();

  await page.waitForLoadState("domcontentloaded");
  const text = await page.locator(locators.noProductsInCart);

  await expect(text).toBeVisible();
});

// #6
test("Verify quantity change functionality and according price updates", async ({
  page,
}) => {
  const pcPage = new PCWizard(page);
  const purchasePage = new PurchasePage(page);
  const cartPage = new Cartpage(page);

  await pcPage.gotoPage();
  await purchasePage.addHomepageProductToCart();
  await pcPage.openCart();
  await cartPage.insertProductQuantity(
    testData.productQuantityEntry.toString()
  );
  await page.waitForLoadState("domcontentloaded");
  const singlePrice = await cartPage.getSingleProductPrice();

  await page.waitForLoadState("domcontentloaded");
  const finalPrice = await cartPage.getFinalProductPrice();

  await page.waitForLoadState("domcontentloaded");
  //CHECK IF FINAL PRICE IS EQUAL TO SINGLE PRICE TIMES QUANTITY OF PRODUCT EX:
  await expect(finalPrice).toEqual(testData.productQuantityEntry * singlePrice);
});
