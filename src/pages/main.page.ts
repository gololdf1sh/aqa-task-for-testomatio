import { timeouts } from "../data/timeouts";
import { BasePage } from "./base.page";

export class MainPage extends BasePage {
  readonly loginButton: CodeceptJS.Locator = locate(".side-menu .login-item");

  async goToLoginPage() {
    this.I.waitForElement(this.loginButton, timeouts.SHORT);
    this.I.seeElement(this.loginButton);
    this.I.click(this.loginButton);
  }
}
