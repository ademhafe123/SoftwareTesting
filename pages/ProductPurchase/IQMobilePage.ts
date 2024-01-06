import { Page } from "@playwright/test";
import { locators } from "./ProductLocators";

class IQMobilePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openIQMobilePage() {
    await this.page.goto("https://iqmobile.ba/");
    await this.page.waitForLoadState("networkidle");
  }

  async addProductToCart() {
    await this.page.getByLabel(locators.productLabel).click();
    await this.page.waitForLoadState("networkidle");
    await this.page.goto("https://iqmobile.ba/");
    await this.page.waitForLoadState("networkidle");
    await this.page.getByLabel(locators.productLabel).click();
    await this.page.waitForLoadState("networkidle");
  }

  async openCart() {
    await this.page.goto("https://iqmobile.ba/cart");
    await this.page.waitForLoadState("networkidle");
  }

  async goToCheckout() {
    await this.page.goto("https://iqmobile.ba/checkout");
    await this.page.waitForLoadState("networkidle");
  }

  async enterPaymentInformation(
    name: string,
    lastname: string,
    country: string,
    street: string,
    postalCode: string,
    city: string,
    phone: string,
    email: string
  ) {
    await this.page.waitForLoadState("domcontentloaded");

    await this.page.locator(locators.shipping).isVisible();

    await this.page.locator(locators.payment).isVisible();

    await this.page.locator(locators.name).isVisible();
    await this.page.fill(locators.lastname, lastname);
    await this.page.fill(locators.country, country);
    await this.page.fill(locators.street, street);
    await this.page.fill(locators.postalCode, postalCode);
    await this.page.fill(locators.city, city);
    await this.page.fill(locators.phone, phone);

    await this.page.locator(locators.email).isVisible();
    await this.page.fill(locators.email, email);

    await this.page.check(locators.shipping);
    await this.page.check(locators.payment);
  }

  async orderProduct() {
    await this.page.click(locators.orderButton); //.click();
    await this.page.waitForLoadState("networkidle");
  }

  async addToCart() {
    await this.page.getByLabel("Dodaj u košaricu").click();
    await this.page.waitForLoadState("networkidle");
  }

  async typeSearchQuery(query: string) {
    await this.page.fill(`[type="search"]`, query);
  }

  async pressEnter() {
    await this.page.keyboard.press("Enter");
  }

  async removeProduct() {
    //
    await this.page
      .getByRole("link", { name: locators.removeProductButton })
      .click();
    await this.page.waitForLoadState("networkidle");
  }

  async validate() {
    await this.page.waitForLoadState("domcontentloaded");
    const element = await this.page.locator(
      `xpath=/html/body/div[2]/div[6]/div/div[2]/div[1]/main/div[2]/ul`
    );
    await element.isVisible();
  }
}

export default IQMobilePage;
