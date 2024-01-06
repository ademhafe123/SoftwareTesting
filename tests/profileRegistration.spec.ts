import { test, expect } from "@playwright/test";
import RegistrationPage from "../pages/Registration/registrationPage";
import { testData } from "./testData";

test("User registration test", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.openRegistrationPage();
  await registrationPage.enterUsername(testData.register.username);
  await registrationPage.enterEmail(testData.register.email);
  await registrationPage.enterPassword(testData.register.username);
  await registrationPage.submitRegistration();
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveURL(/\/my-account/); //user is navigated to their account page if registration is successful
});

//WORKING
