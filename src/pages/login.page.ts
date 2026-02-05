import { timeouts } from "../data/timeouts";
import { BasePage } from "./index";

export class LoginPage extends BasePage {
  readonly emailInput: CodeceptJS.Locator = locate("#user_email");
  readonly passwordInput: CodeceptJS.Locator = locate("#user_password");
  readonly loginButton: CodeceptJS.Locator = locate("[type='submit']");

  async login(userEmail: string, userPassword: string) {
    await this.fillUserEmail(userEmail);
    await this.fillUserPassword(userPassword);
    await this.clickLoginButton();
  }

  private async fillUserEmail(userEmail: string) {
    this.I.waitForElement(this.emailInput, timeouts.SHORT);
    this.I.seeElement(this.emailInput);
    this.I.click(this.emailInput);
    this.I.type(userEmail);
  }

  private async fillUserPassword(userPassword: string) {
    this.I.waitForElement(this.passwordInput, timeouts.SHORT);
    this.I.seeElement(this.passwordInput);
    this.I.click(this.passwordInput);
    this.I.type(userPassword);
  }

  private async clickLoginButton() {
    this.I.waitForElement(this.loginButton, timeouts.SHORT);
    this.I.seeElement(this.loginButton);
    this.I.click(this.loginButton);
  }
}
