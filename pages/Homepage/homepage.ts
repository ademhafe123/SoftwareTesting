import { Page } from "@playwright/test";

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
}

export default Homepage;
