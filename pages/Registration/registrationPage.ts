import { Page } from "@playwright/test";
import { locators } from "./registrationPageLocators";

class RegistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openRegistrationPage() {
    await this.page.goto("https://iqmobile.ba/my-account/");
    await this.page.waitForLoadState("networkidle");
  }

  async enterUsername(username: string) {
    await this.page.locator(locators.username).fill(username);
  }
  async enterEmail(email: string) {
    await this.page.locator(locators.email).fill(email);
  }
  async enterPassword(password: string) {
    await this.page.locator(locators.password).fill(password);
  }
  async submitRegistration() {
    await this.page.locator(locators.register).click();
    await this.page.waitForLoadState("networkidle");
  }
}

export default RegistrationPage;
