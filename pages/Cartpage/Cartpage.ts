import { Page } from "@playwright/test";
import { locators } from "./carpageLocators";

class Cartpage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async removeProduct() {
    await this.page.click(locators.removeProductButton);
  }

  async insertProductQuantity(quantity) {
    await this.page.fill(locators.productQuantityInput, quantity);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async getSingleProductPrice() {
    const singlePriceElement = await this.page
      .locator(locators.singlePriceElement)
      .nth(0);

    let priceText = await singlePriceElement.innerText();
    const singlePrice = getSinglePrice(priceText);

    return Number(singlePrice);
  }

  async getFinalProductPrice() {
    const finalPriceElement = await this.page
      .locator(locators.finalPriceElement)
      .nth(0);

    const priceText = await finalPriceElement.innerText();
    const finalPrice = getFinalPrice(priceText);
    return Number(finalPrice);
  }
}

const getSinglePrice = (priceText) => {
  const match = priceText.match(/(\d+),\d+\s+KM/);
  let singlePrice;
  if (match) {
    singlePrice = match[1];
    return singlePrice;
  }
};

const getFinalPrice = (priceText) => {
  const match = priceText.match(/Ukupno: (\d+),\d+ KM/);
  let finalPrice;
  if (match) {
    finalPrice = match[1];
    return finalPrice;
  }
};

export default Cartpage;
