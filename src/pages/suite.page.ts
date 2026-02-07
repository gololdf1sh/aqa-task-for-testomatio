import { timeouts } from "../data/timeouts";
import { StartRunModal } from "../components/startRunModal";
import { BasePage } from "./base.page";

export class SuitePage extends BasePage {
  private projectId: string;
  readonly startRunModal: StartRunModal;
  readonly moreOptionsButton: CodeceptJS.Locator = locate(
    ".ember-basic-dropdown .md-icon-dots-horizontal",
  );
  readonly moreOptionsMenu: CodeceptJS.Locator = locate("[data-ember-action]");
  readonly runTestsButton: CodeceptJS.Locator =
    locate("button").withText("Run Tests");

  constructor(I: CodeceptJS.I, projectId: string) {
    super(I);
    this.startRunModal = new StartRunModal(I, projectId);
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
