import { Page } from "@playwright/test";
import { locators } from "./ProductLocators";

class PurchasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addHomepageProductToCart() {
    await this.page.locator(locators.homepageProduct).first().click();
  }

  async addSearchProductToCart() {
    await this.page.locator(locators.searchProduct).nth(0).click();
  }

  async addProductPageProductToCart() {
    await this.page.locator(locators.productPageProduct).nth(0).click();
  }

  async goToPayment() {
    await this.page.goto("https://www.wizardpc.ba/checkout.php");
    //await this.page.getByText(locators.finishPurchase).click();
    await this.page.waitForLoadState("networkidle");
  }

  async login(username, password) {
    await this.page.fill(locators.username, username);
    await this.page.fill(locators.password, password);
    await this.page.click(locators.loginButton);
    await this.page.waitForLoadState("networkidle");
  }

  async orderProduct() {
    await this.page
      .locator('input[type="submit"].to-checkout.button')
      .first()
      .click();
    await this.page.waitForLoadState("networkidle");
  }
}

export default PurchasePage;
