import { timeouts } from "../data/timeouts";
export class ManualRunPage {
  private I: CodeceptJS.I;
  private passedButton: CodeceptJS.Locator;
  private failedButton: CodeceptJS.Locator;
  private finishRunButton: CodeceptJS.Locator;
  private statusMessageInput: CodeceptJS.Locator;

  constructor(I: CodeceptJS.I) {
    this.I = I;

    this.passedButton = locate(".cp-Panel-toggle button").withText("Passed");
    this.failedButton = locate(".cp-Panel-toggle button").withText("Failed");
    this.finishRunButton = locate("button").withText("Finish Run");
    this.statusMessageInput = locate('[placeholder="Result message"]');
  }

  generateTestCaseLocator(testCaseName: string) {
    return locate(".leading-tight").withText(testCaseName);
  }

  generateStatusMessageLocator(userName: string, status: string, statusMessage?: string) {
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

    await this.I.waitForElement(button, timeouts.SHORT);
    await this.I.seeElement(button);
    await this.I.click(button);
  }

  async openTestCase(testCaseName: string) {
    const locator = this.generateTestCaseLocator(testCaseName);
    await this.I.waitForElement(locator, timeouts.SHORT);
    await this.I.seeElement(locator);
    await this.I.click(locator);
  }

  async verifyStatus(userName: string, status: string, statusMessage?: string) {
    const locator = this.generateStatusMessageLocator(
      userName,
      status,
      statusMessage,
    );
    await this.I.waitForElement(locator, timeouts.SHORT);
    await this.I.seeElement(locator);
  }

  async fillStatusMessage(message: string) {
    await this.I.waitForElement(this.statusMessageInput, timeouts.SHORT);
    await this.I.seeElement(this.statusMessageInput);
    await this.I.fillField(this.statusMessageInput, message);
    await this.I.pressKey("Tab");
  }

  async finishRun() {
    await this.I.waitForElement(this.finishRunButton, timeouts.SHORT);
    await this.I.seeElement(this.finishRunButton);
    await this.I.click(this.finishRunButton);
  }
}
