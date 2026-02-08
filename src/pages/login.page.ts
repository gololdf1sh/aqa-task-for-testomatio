import { timeouts } from "../data/timeouts";

const { I } = inject();

class LoginPage {
  readonly emailInput: CodeceptJS.Locator = locate("#user_email");
  readonly passwordInput: CodeceptJS.Locator = locate("#user_password");
  readonly loginButton: CodeceptJS.Locator = locate("[type='submit']");

  async login(userEmail: string, userPassword: string) {
    await this.fillUserEmail(userEmail);
    await this.fillUserPassword(userPassword);
    await this.clickLoginButton();
  }

  private async fillUserEmail(userEmail: string) {
    I.waitForElement(this.emailInput, timeouts.SHORT);
    I.seeElement(this.emailInput);
    I.click(this.emailInput);
    I.type(userEmail);
  }

  private async fillUserPassword(userPassword: string) {
    I.waitForElement(this.passwordInput, timeouts.SHORT);
    I.seeElement(this.passwordInput);
    I.click(this.passwordInput);
    I.type(userPassword);
  }

  private async clickLoginButton() {
    I.waitForElement(this.loginButton, timeouts.SHORT);
    I.seeElement(this.loginButton);
    I.click(this.loginButton);
  }
}

module.exports = new LoginPage();
module.exports.LoginPage = LoginPage;

export {};
