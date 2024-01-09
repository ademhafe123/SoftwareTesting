import { test, expect } from "@playwright/test";
import PCWizard from "../pages/PCWizard/PCWizard";
import RegistrationPage from "../pages/Registration/registrationPage";
import { testData } from "./testData";
import PurchasePage from "../pages/ProductPurchase/PurchasePage";

test("Test user registration proccess", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const registerPage = new RegistrationPage(page);

  await pcPage.gotoPage();
  await registerPage.goToRegistrationPage();
  await registerPage.enterRegistrationInformation(
    testData.email,
    testData.username,
    testData.password,
    testData.confirmPassword,
    testData.fullname,
    testData.address,
    testData.postCode,
    testData.city,
    testData.phone
  );

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Uspjesno ste se registrovali");
    await dialog.accept();
  });

  await registerPage.registerUser();
  await page.waitForEvent("dialog");
});

test("Product purchase from homepage", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const purchasePage = new PurchasePage(page);

  await pcPage.gotoPage();
  await purchasePage.addHomepageProductToCart();

  await purchasePage.goToPayment();
  await purchasePage.login(testData.loginUsername, testData.password);
  await purchasePage.orderProduct();

  await expect(page).toHaveURL(/\/finishorder/);
  const message = await page.getByText(
    "Vaša narudžba je zaprimljena. Naši operateri će Vas kontaktirati u roku od 24 sata."
  );
  await expect(message).toBeVisible();
});

test("Product purchase from searchbar", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const purchasePage = new PurchasePage(page);

  await pcPage.gotoPage();
  await pcPage.search(testData.searchQuery);
  await purchasePage.addSearchProductToCart();

  await purchasePage.goToPayment();
  await purchasePage.login(testData.loginUsername, testData.password);
  await purchasePage.orderProduct();

  await expect(page).toHaveURL(/\/finishorder/);
  const message = await page.getByText(
    "Vaša narudžba je zaprimljena. Naši operateri će Vas kontaktirati u roku od 24 sata."
  );
  await expect(message).toBeVisible();
});

test("Test product purchase from product page ", async ({ page }) => {
  test.slow();
  const pcPage = new PCWizard(page);
  const purchasePage = new PurchasePage(page);

  await pcPage.gotoPage();
  await pcPage.gotoProductPage();
  await purchasePage.addProductPageProductToCart();
  await purchasePage.goToPayment();
  await purchasePage.login(testData.loginUsername, testData.password);
  await purchasePage.orderProduct();

  await expect(page).toHaveURL(/\/finishorder/);
  const message = await page.getByText(
    "Vaša narudžba je zaprimljena. Naši operateri će Vas kontaktirati u roku od 24 sata."
  );
  await expect(message).toBeVisible();
});
