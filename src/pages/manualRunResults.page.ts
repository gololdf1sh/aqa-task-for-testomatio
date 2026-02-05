import { timeouts } from "../data/timeouts";
import { BasePage } from "./base.page";

export class ManualRunResultsPage extends BasePage {
  readonly runStatusFailed: CodeceptJS.Locator = locate(".run-status.failed").withText("failed");
  readonly pieChart: CodeceptJS.Locator = locate(".apexcharts-pie");

  async verifyFailedStatusIsVisible() {
    this.I.waitForElement(this.runStatusFailed, timeouts.SHORT);
    this.I.seeElement(this.runStatusFailed);
  }

  async verifyPieChartIsVisible() {
    this.I.waitForElement(this.pieChart, timeouts.SHORT);
    this.I.seeElement(this.pieChart);
  }
}
