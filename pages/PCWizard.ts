import { Page } from "@playwright/test";

class PCWizard {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoPage() {
    await this.page.goto("https://www.wizardpc.ba/");
    await this.page.waitForLoadState("networkidle");
  }

  async gotoProductPage() {
    await this.page.goto("https://www.wizardpc.ba/search.php?CatID=6");
    await this.page.waitForLoadState("networkidle");
  }

  async openCart() {
    await this.page.goto("https://www.wizardpc.ba/cart.php");
    await this.page.waitForLoadState("networkidle");
  }

  async search(query: string) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.fill("#searchfor", query);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }
}

export default PCWizard;
