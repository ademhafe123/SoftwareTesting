import { Page } from "@playwright/test";
import { locators } from "./homapageLocators";

class Homepage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoContactPage() {
    await this.page.getByText("Kontakt").click();
    await this.page.waitForLoadState("networkidle");
  }

  async gotoAboutUs() {
    await this.page.getByText("O nama").click();
    await this.page.waitForLoadState("networkidle");
  }

  async gotoServicesPage() {
    await this.page.click(locators.serivces);
    await this.page.waitForLoadState("networkidle");
  }

  async gotoLoginPage() {
    await this.page.getByText("Logovanje").click();
    await this.page.waitForLoadState("networkidle");
  }

  async getFacebookLink() {
    //
  }
}

export default Homepage;
