import { timeouts } from "../data/timeouts";

export class ProjectPage {
  private I: CodeceptJS.I;

  constructor(I: CodeceptJS.I) {
    this.I = I;
  }

  private async generateSuiteLocator(suiteName: string) {
    return locate("span").withText(`${suiteName}`);
  }

  async openSuiteByName(suiteName: string) {
    let suiteLocator = await this.generateSuiteLocator(suiteName);

    this.I.waitForElement(suiteLocator, timeouts.SHORT);
    this.I.seeElement(suiteLocator);
    this.I.click(suiteLocator);
  }
}
