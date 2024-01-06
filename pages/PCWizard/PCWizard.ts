import { Page } from "@playwright/test";

class PCWizard {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoPage() {
    await this.page.goto("https://www.wizardpc.ba/");
    //await this.page.waitForLoadState("networkidle");
  }

  async search(query: string) {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.fill("#searchfor", "podloga za mis");
  }

  async pressEnter() {
    await this.page.keyboard.press("Enter");
  }
}

export default PCWizard;
