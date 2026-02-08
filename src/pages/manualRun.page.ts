import { timeouts } from "../data/timeouts";

const { I } = inject();

class ManualRunPage {
  readonly passedButton: CodeceptJS.Locator = locate(".cp-Panel-toggle button").withText("Passed");
  readonly failedButton: CodeceptJS.Locator = locate(".cp-Panel-toggle button").withText("Failed");
  readonly finishRunButton: CodeceptJS.Locator = locate("button").withText("Finish Run");
  readonly statusMessageInput: CodeceptJS.Locator = locate('[placeholder="Result message"]');

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

    I.waitForElement(button, timeouts.SHORT);
    I.seeElement(button);
    I.click(button);
  }

  async openTestCase(testCaseName: string) {
    const locator = this.generateTestCaseLocator(testCaseName);
    I.waitForElement(locator, timeouts.SHORT);
    I.seeElement(locator);
    I.click(locator);
  }

  async verifyStatus(userName: string, status: string, statusMessage?: string) {
    const locator = this.generateStatusMessageLocator(
      userName,
      status,
      statusMessage,
    );
    I.waitForElement(locator, timeouts.SHORT);
    I.seeElement(locator);
  }

  async fillStatusMessage(message: string) {
    I.waitForElement(this.statusMessageInput, timeouts.SHORT);
    I.seeElement(this.statusMessageInput);
    I.fillField(this.statusMessageInput, message);
    I.pressKey("Tab");
  }

  async finishRun() {
    I.waitForElement(this.finishRunButton, timeouts.SHORT);
    I.seeElement(this.finishRunButton);
    I.click(this.finishRunButton);
  }
}

module.exports = new ManualRunPage();
module.exports.ManualRunPage = ManualRunPage;

export {};
