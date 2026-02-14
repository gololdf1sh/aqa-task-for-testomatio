import { timeouts } from "../data/timeouts";

const { I } = inject();

class ProjectsPage {
  readonly signedInSuccessfullyMessage: CodeceptJS.Locator = locate(".common-flash-success").withText("Signed in successfully");

  async checkThatSignedInSuccessfullyMessageIsVisible() {
    I.waitForElement(this.signedInSuccessfullyMessage, timeouts.SHORT);
    I.seeElement(this.signedInSuccessfullyMessage);
  }

  private generateProjectCardLocator(projectName: string) {
    return locate("a").withAttr({ title: projectName });
  }

  async openProjectByName(projectName: string) {
    const projectCard = this.generateProjectCardLocator(projectName);

    I.waitForElement(projectCard, timeouts.SHORT);
    I.click(projectCard);
  }
}

module.exports = new ProjectsPage();
module.exports.ProjectsPage = ProjectsPage;

export {};
