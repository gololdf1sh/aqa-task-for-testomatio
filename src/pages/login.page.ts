import { timeouts } from "../data/timeouts";

export class LoginPage {
  private I: CodeceptJS.I;
  private emailInput: CodeceptJS.Locator;
  private passwordInput: CodeceptJS.Locator;
  private loginButton: CodeceptJS.Locator;

  constructor(I: CodeceptJS.I) {
    this.I = I;
    this.emailInput = locate("#user_email");
    this.passwordInput = locate("#user_password");
    this.loginButton = locate("[type='submit']");
  }

  async login(userEmail: string, userPassword: string) {
    await this.fillUserEmail(userEmail);
    await this.fillUserPassword(userPassword);
    await this.clickLoginButton();
  }

  async fillUserEmail(userEmail: string) {
    this.I.waitForElement(this.emailInput, timeouts.SHORT);
    this.I.seeElement(this.emailInput);
    this.I.click(this.emailInput);
    this.I.type(userEmail);
  }

  async fillUserPassword(userPassword: string) {
    this.I.waitForElement(this.passwordInput, timeouts.SHORT);
    this.I.seeElement(this.passwordInput);
    this.I.click(this.passwordInput);
    this.I.type(userPassword);
  }

  async clickLoginButton() {
    this.I.waitForElement(this.loginButton, timeouts.SHORT);
    this.I.seeElement(this.loginButton);
    this.I.click(this.loginButton);
  }
}
