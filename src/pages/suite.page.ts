import { timeouts } from "../data/timeouts";
import { StartRunModal } from "../components/startRunModal";

export class SuitePage {
  private I: CodeceptJS.I;
  private projectId: string;
  readonly startRunModal: StartRunModal;
  readonly moreOptionsButton: CodeceptJS.Locator;
  readonly moreOptionsMenu: CodeceptJS.Locator;
  readonly runTestsButton: CodeceptJS.Locator;

  constructor(I: CodeceptJS.I, projectId: string) {
    this.I = I;
    this.projectId = projectId;
    this.startRunModal = new StartRunModal(I, projectId);

    this.moreOptionsButton = locate(
      ".ember-basic-dropdown .md-icon-dots-horizontal",
    );
    this.moreOptionsMenu = locate("[data-ember-action]");
    this.runTestsButton = locate("button").withText("Run Tests");
  }

  async openMoreOptionsMenu() {
    this.I.waitForElement(this.moreOptionsButton, timeouts.SHORT);
    this.I.seeElement(this.moreOptionsButton);
    this.I.click(this.moreOptionsButton);
    this.I.waitForElement(this.moreOptionsMenu, timeouts.SHORT);
    this.I.seeElement(this.moreOptionsMenu);
  }

  async clickRunTestsButton() {
    this.I.waitForElement(this.runTestsButton, timeouts.SHORT);
    this.I.seeElement(this.runTestsButton);
    this.I.click(this.runTestsButton);
  }

  async runTestsAndGetRunId() {
    return await this.startRunModal.launchRunAndCaptureRunId();
  }
}
