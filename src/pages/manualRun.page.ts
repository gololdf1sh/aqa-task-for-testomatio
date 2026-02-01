import { timeouts } from "../data/timeouts";
import { BasePage } from "./base.page";

export class ManualRunPage extends BasePage {
  readonly passedButton: CodeceptJS.ILocator = locate(".cp-Panel-toggle button").withText("Passed");
  readonly failedButton: CodeceptJS.ILocator = locate(".cp-Panel-toggle button").withText("Failed");
  readonly finishRunButton: CodeceptJS.ILocator = locate("button").withText("Finish Run");
  readonly statusMessageInput: CodeceptJS.ILocator = locate('[placeholder="Result message"]');

  private generateTestCaseLocator(testCaseName: string) {
    return locate(".leading-tight").withText(testCaseName);
  }

  private generateStatusMessageLocator(
    userName: string,
    status: string,
    statusMessage?: string,
  ) {
    let locator = locate("li")
      .withText(status)
      .withText("by")
      .withText(userName);

    if (statusMessage) {
      locator = locator.withText("with").withText(statusMessage);
    }

    return locator;
  }

  async selectStatus(status: string) {
    const button = status === "passed" ? this.passedButton : this.failedButton;

    this.I.waitForElement(button, timeouts.SHORT);
    this.I.seeElement(button);
    this.I.click(button);
  }

  async openTestCase(testCaseName: string) {
    const locator = this.generateTestCaseLocator(testCaseName);
    this.I.waitForElement(locator, timeouts.SHORT);
    this.I.seeElement(locator);
    this.I.click(locator);
  }

  async verifyStatus(userName: string, status: string, statusMessage?: string) {
    const locator = this.generateStatusMessageLocator(
      userName,
      status,
      statusMessage,
    );
    this.I.waitForElement(locator, timeouts.SHORT);
    this.I.seeElement(locator);
  }

  async fillStatusMessage(message: string) {
    this.I.waitForElement(this.statusMessageInput, timeouts.SHORT);
    this.I.seeElement(this.statusMessageInput);
    this.I.fillField(this.statusMessageInput, message);
    this.I.pressKey("Tab");
  }

  async finishRun() {
    this.I.waitForElement(this.finishRunButton, timeouts.SHORT);
    this.I.seeElement(this.finishRunButton);
    this.I.click(this.finishRunButton);
  }
}
