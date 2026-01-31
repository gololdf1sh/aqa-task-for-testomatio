import { timeouts } from "../data/timeouts";
export class ManualRunPage {
  private I: CodeceptJS.I;
  readonly passedButton: CodeceptJS.ILocator;
  readonly failedButton: CodeceptJS.ILocator;
  readonly finishRunButton: CodeceptJS.ILocator;
  readonly statusMessageInput: CodeceptJS.ILocator;

  constructor(I: CodeceptJS.I) {
    this.I = I;

    this.passedButton = locate(".cp-Panel-toggle button").withText("Passed");
    this.failedButton = locate(".cp-Panel-toggle button").withText("Failed");
    this.finishRunButton = locate("button").withText("Finish Run");
    this.statusMessageInput = locate('[placeholder="Result message"]');
  }

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
