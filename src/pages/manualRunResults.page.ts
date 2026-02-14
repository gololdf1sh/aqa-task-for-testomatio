import { timeouts } from "../data/timeouts";

const { I } = inject();

class ManualRunResultsPage {
  readonly runStatusFailed: CodeceptJS.Locator = locate(".run-status.failed").withText("failed");
  readonly pieChart: CodeceptJS.Locator = locate(".apexcharts-pie");

  async verifyFailedStatusIsVisible() {
    I.waitForElement(this.runStatusFailed, timeouts.SHORT);
    I.seeElement(this.runStatusFailed);
  }

  async verifyPieChartIsVisible() {
    I.waitForElement(this.pieChart, timeouts.SHORT);
    I.seeElement(this.pieChart);
  }
}

module.exports = new ManualRunResultsPage();
module.exports.ManualRunResultsPage = ManualRunResultsPage;

export {};
