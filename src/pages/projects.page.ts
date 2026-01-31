import { timeouts } from "../data/timeouts";

export class ProjectsPage {
  private I: CodeceptJS.I;
  private signedInSuccessfullyMessage: CodeceptJS.Locator;

  constructor(I: CodeceptJS.I) {
    this.I = I;
    this.signedInSuccessfullyMessage = locate(".common-flash-success").withText(
      "Signed in successfully",
    );
  }

  async checkThatSignedInSuccessfullyMessageIsVisible() {
    this.I.waitForElement(this.signedInSuccessfullyMessage, timeouts.SHORT);
    this.I.seeElement(this.signedInSuccessfullyMessage);
  }

  async generateProjectCardLocator(projectName: string) {
    return locate("a").withAttr({ title: projectName });
  }

  async openProjectByName(projectName: string) {
    const projectCard = await this.generateProjectCardLocator(projectName);

    this.I.waitForElement(projectCard, timeouts.SHORT);
    this.I.click(projectCard);
  }
}
