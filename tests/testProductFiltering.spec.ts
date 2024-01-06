import { test, expect } from "@playwright/test";
import Homepage from "../pages/Homepage/homepage";

test("Test product filtering", async ({ page }) => {
  const homepage = new Homepage(page);

  await homepage.openShopPage();
  await homepage.checkSamsung();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\=samsung/);
});

// WORKS
