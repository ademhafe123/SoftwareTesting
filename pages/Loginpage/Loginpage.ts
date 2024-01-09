import { Page } from "@playwright/test";
import { locators } from "./loginpageLocators";

class Loginpage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async enterUsername(username) {
    await this.page.fill(locators.username, username);
  }

  async enterPassword(password) {
    await this.page.fill(locators.password, password);
  }

  async login() {
    await this.page.click(locators.loginButton);
  }
}

export default Loginpage;
