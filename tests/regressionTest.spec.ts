import { test, expect } from "@playwright/test";
import PCWizard from "../pages/PCWizard/PCWizard";
import { locators } from "./testLocators";
import Homepage from "../pages/Homepage/homepage";
import { testData } from "./testData";
import PurchasePage from "../pages/ProductPurchase/PurchasePage";
import Cartpage from "../pages/Cartpage/Cartpage";
import Loginpage from "../pages/Loginpage/Loginpage";
import RegistrationPage from "../pages/Registration/registrationPage";

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
  test.slow();
  const pcPage = new PCWizard(page);

  await pcPage.gotoPage();
  await pcPage.search("#1fa2g");
  await page.waitForLoadState("domcontentloaded");
  const title = await page.locator(`xpath=//*[@id="middle"]/div/div/div/h4`);
  await expect(title).toContainText("Rezultati pretrage");
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

//#7
test("Verify that user cant login in with wrong password", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const homepage = new Homepage(page);
  const loginpage = new Loginpage(page);

  await pcPage.gotoPage();
  await homepage.gotoLoginPage();

  //LISTEN FOR ALERT DIALOG
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Pogresan password ili username");
    await dialog.accept();
  });

  await loginpage.enterUsername(testData.loginUsername);
  await loginpage.enterPassword("asd");
  await loginpage.login();
  await page.waitForEvent("dialog");
});

//#8
test("Verify that user cant login with invalid username", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const homepage = new Homepage(page);
  const loginpage = new Loginpage(page);

  await pcPage.gotoPage();
  await homepage.gotoLoginPage();

  //LISTEN FOR ALERT DIALOG
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Pogresan password ili username");
    await dialog.accept();
  });

  await loginpage.enterUsername("someUsername");
  await loginpage.enterPassword(testData.password);
  await loginpage.login();
  await page.waitForEvent("dialog");
});

// #9
test("Verify that user cant register without accepting terms of use", async ({
  page,
}) => {
  const pcPage = new PCWizard(page);
  const registerPage = new RegistrationPage(page);

  await pcPage.gotoPage();
  await registerPage.goToRegistrationPage();

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Niste prihvatili uvjete koristenja");
    await dialog.accept();
  });

  await registerPage.registerUser();
});

// #10
test("Verify that confirm password must be the same when registering", async ({
  page,
}) => {
  const pcPage = new PCWizard(page);
  const registerPage = new RegistrationPage(page);

  await pcPage.gotoPage();
  await registerPage.goToRegistrationPage();

  await registerPage.enterRegistrationInformation(
    testData.email,
    testData.username,
    testData.password,
    testData.wrongConfPassword,
    testData.fullname,
    testData.address,
    testData.postCode,
    testData.city,
    testData.phone
  );

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Password-i se ne poklapaju");
    await dialog.accept();
  });

  await registerPage.registerUser();
});

// #11
test("Verify access to services page and valid info", async ({ page }) => {
  const pcPage = new PCWizard(page);
  const homepage = new Homepage(page);

  await pcPage.gotoPage();
  await homepage.gotoServicesPage();

  const title = await page.getByText(locators.servicesTitle).nth(0);
  await expect(title).toBeVisible();
});

// #12
test("Verify that user cant register with no shipping information", async ({
  page,
}) => {
  const pcPage = new PCWizard(page);
  const registerPage = new RegistrationPage(page);

  await pcPage.gotoPage();
  await registerPage.goToRegistrationPage();
  await registerPage.enterPartialRegistrationInformation(
    testData.email,
    testData.username,
    testData.password,
    testData.confirmPassword
  );

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Neko od polja je prazno");
    await dialog.accept();
  });

  await registerPage.registerUser();
  await page.waitForEvent("dialog");
});

// #13
test("Verify that user must enter a valid email when registering", async ({
  page,
}) => {
  const pcPage = new PCWizard(page);
  const registerPage = new RegistrationPage(page);

  await pcPage.gotoPage();
  await registerPage.goToRegistrationPage();

  await registerPage.enterRegistrationInformation(
    "invalidEmail",
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
    expect(dialog.message()).toContain("E-mail nije validan");
    await dialog.accept();
  });

  await registerPage.registerUser();
  await page.waitForEvent("dialog");
});

// #14
test("Verify that user cant enter just empty space when registering", async ({
  page,
}) => {
  const pcPage = new PCWizard(page);
  const registerPage = new RegistrationPage(page);

  await pcPage.gotoPage();
  await registerPage.goToRegistrationPage();

  await registerPage.enterRegistrationInformation(
    testData.email,
    "    ",
    testData.password,
    testData.confirmPassword,
    testData.fullname,
    testData.address,
    testData.postCode,
    testData.city,
    testData.phone
  );

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Neko od polja je prazno");
    await dialog.accept();
  });

  await registerPage.registerUser();
  await page.waitForEvent("dialog");
});

// #15
test("Verify that name must contain non-digit characters when registering", async ({
  page,
}) => {
  const pcPage = new PCWizard(page);
  const registerPage = new RegistrationPage(page);

  await pcPage.gotoPage();
  await registerPage.goToRegistrationPage();

  await registerPage.enterRegistrationInformation(
    testData.email,
    testData.username,
    testData.password,
    testData.confirmPassword,
    "123",
    testData.address,
    testData.postCode,
    testData.city,
    testData.phone
  );

  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toContain("Neko od polja je prazno");
    await dialog.accept();
  });

  await registerPage.registerUser();
  await page.waitForEvent("dialog");
});
