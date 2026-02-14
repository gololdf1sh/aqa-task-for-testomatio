import { timeouts } from "../data/timeouts";
const { I, startRunModal } = inject();

class SuitePage {
  readonly moreOptionsButton: CodeceptJS.Locator = locate(".ember-basic-dropdown .md-icon-dots-horizontal");
  readonly moreOptionsMenu: CodeceptJS.Locator = locate("[data-ember-action]");
  readonly runTestsButton: CodeceptJS.Locator = locate("button").withText("Run Tests");

  async openMoreOptionsMenu() {
    I.waitForElement(this.moreOptionsButton, timeouts.SHORT);
    I.seeElement(this.moreOptionsButton);
    I.click(this.moreOptionsButton);
    I.waitForElement(this.moreOptionsMenu, timeouts.SHORT);
    I.seeElement(this.moreOptionsMenu);
  }

  async clickRunTestsButton() {
    I.waitForElement(this.runTestsButton, timeouts.SHORT);
    I.seeElement(this.runTestsButton);
    I.click(this.runTestsButton);
  }

  async runTestsAndGetRunId() {
    return await startRunModal.launchRunAndCaptureRunId();
  }
}

module.exports = new SuitePage();
module.exports.SuitePage = SuitePage;

export {};
