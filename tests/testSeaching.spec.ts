import { test, expect } from "@playwright/test";
import IQMobilePage from "../pages/ProductPurchase/IQMobilePage";
import { testData } from "./testData";
import { locators } from "./testLocators";

test("Test search functionality", async ({ page }) => {
  const iqmobilePage = new IQMobilePage(page);

  await iqmobilePage.openIQMobilePage();
  await iqmobilePage.typeSearchQuery("podloga za mis");
  await iqmobilePage.pressEnter();
  await page.waitForLoadState("domcontentloaded");
  const element = await page
    .locator(`xpath=//*[@id="main"]/div[2]/ul/li[1]`)
    .nth(0);

  await expect(element).toBeVisible();
});
