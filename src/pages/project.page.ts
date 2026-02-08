import { timeouts } from "../data/timeouts";

const { I } = inject();

class ProjectPage {
  private generateSuiteLocator(suiteName: string) {
    return locate("span").withText(`${suiteName}`);
  }

  async openSuiteByName(suiteName: string) {
    const suiteLocator = this.generateSuiteLocator(suiteName);

    I.waitForElement(suiteLocator, timeouts.SHORT);
    I.seeElement(suiteLocator);
    I.click(suiteLocator);
  }
}

module.exports = new ProjectPage();
module.exports.ProjectPage = ProjectPage;

export {};
