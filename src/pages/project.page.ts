import { timeouts } from "../data/timeouts";
import { BasePage } from "./base.page";

export class ProjectPage extends BasePage {

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
