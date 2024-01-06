import { Page } from "@playwright/test";
import { locators } from "./homepageLocators";

class Homepage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openShopPage() {
    await this.page.goto("https://iqmobile.ba/shop");
    await this.page.waitForLoadState("networkidle");
  }

  async checkSamsung() {
    const locator = `//*[@id="filter_by_brand-3"]/div/ul/li[11]/label/input`;
    await this.page.click(locator, { timeout: 1000 });
    await this.page.waitForLoadState("networkidle");
  }
}

export default Homepage;
