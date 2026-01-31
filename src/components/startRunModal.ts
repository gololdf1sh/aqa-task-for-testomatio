export class StartRunModal {
  private I: CodeceptJS.I;
  private projectId: string;
  private launchButton: CodeceptJS.Locator;

  constructor(I: CodeceptJS.I, projectId: string) {
    this.I = I;
    this.projectId = projectId;

    this.launchButton = locate("button").withText("Launch");
  }

  async launchRunAndCaptureRunId() {
    let runId: string;

    await this.I.usePlaywrightTo(
      "launch run and capture run id",
      async ({ page }) => {
        console.log(`ProjectID: ${this.projectId}`);
        const responsePromise = page.waitForResponse(
          (res) =>
            res.url().includes(`/${this.projectId}/runs`) &&
            res.request().method() === "POST",
        );

        await page.getByRole("button", { name: "Launch" }).click();

        const response = await responsePromise;
        const body = await response.json();
        runId = body.data.id;
      },
    );

    return runId;
  }
}
