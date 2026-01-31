import { timeouts } from "../data/timeouts";

export class MainPage {
  private I: CodeceptJS.I;
  private loginButton: CodeceptJS.Locator;

  constructor(I: CodeceptJS.I) {
    this.I = I;
    this.loginButton = locate(".side-menu .login-item");
  }

  async goToLoginPage() {
    this.I.waitForElement(this.loginButton, timeouts.SHORT);
    this.I.seeElement(this.loginButton);
    this.I.click(this.loginButton);
  }
}
