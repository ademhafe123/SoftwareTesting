import { test, expect } from "@playwright/test";

import PCWizard from "../pages/PCWizard/PCWizard";

test("TEST", async ({ page }) => {
  const thisPage = new PCWizard(page);

  await thisPage.gotoPage();
  await thisPage.search("Podloga za mis");
  await thisPage.pressEnter();
  await page.waitForLoadState("domcontentloaded");
  const element = await page
    .locator(`xpath=//*[@id="middle"]/div/div/div/div[1]/div/div[1]/div/a/img`)
    .nth(0);
  await expect(element).toBeVisible();
});

// TEST ON ANOTHER WEBSITE TO CHECK IF LOGIC WORKS
// WORKS PERFECTLY
