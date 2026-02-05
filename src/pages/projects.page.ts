import { timeouts } from "../data/timeouts";
import { BasePage } from "./base.page";

export class ProjectsPage extends BasePage {
  readonly signedInSuccessfullyMessage: CodeceptJS.Locator = locate(".common-flash-success").withText(
      "Signed in successfully",
    );;

  async checkThatSignedInSuccessfullyMessageIsVisible() {
    this.I.waitForElement(this.signedInSuccessfullyMessage, timeouts.SHORT);
    this.I.seeElement(this.signedInSuccessfullyMessage);
  }

  private generateProjectCardLocator(projectName: string) {
    return locate("a").withAttr({ title: projectName });
  }

  async openProjectByName(projectName: string) {
    const projectCard = this.generateProjectCardLocator(projectName);

    this.I.waitForElement(projectCard, timeouts.SHORT);
    this.I.click(projectCard);
  }
}
