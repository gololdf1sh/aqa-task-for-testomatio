import { timeouts } from "../data/timeouts";

const { I } = inject();

class MainPage {
  readonly loginButton: CodeceptJS.Locator = locate(".side-menu .login-item");

  async goToLoginPage() {
    I.waitForElement(this.loginButton, timeouts.SHORT);
    I.seeElement(this.loginButton);
    I.click(this.loginButton);
  }
}

module.exports = new MainPage();
module.exports.MainPage = MainPage;

export {};
