import { Page } from "@playwright/test";
import { locators } from "./registrationLocators";

class RegistrationPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goToRegistrationPage() {
    await this.page.getByText(locators.goToRegisterButton).click();
    await this.page.waitForLoadState("networkidle");
  }

  async enterRegistrationInformation(
    email,
    username,
    password,
    confirmPassword,
    fullname,
    address,
    postCode,
    city,
    phone
  ) {
    //ENTER email
    await this.page.fill(locators.email, email);
    //ENTER username
    await this.page.fill(locators.username, username);
    //ENTER password
    await this.page.fill(locators.password, password);
    //ENTER confirmPassword
    await this.page.fill(locators.confirmPassword, confirmPassword);
    //ACCEPT TERMS OF USE
    await this.page.check(locators.termsCheckbox);
    //ENTER fullname
    await this.page.fill(locators.fullname, fullname);
    //ENTER address
    await this.page.fill(locators.address, address);
    //ENTER postCode
    await this.page.fill(locators.postCode, postCode);
    //ENTER city
    await this.page.fill(locators.city, city);
    //ENTER phone
    await this.page.fill(locators.phone, phone);
  }

  async registerUser() {
    await this.page.click(locators.registerButton);
  }
}

export default RegistrationPage;
