const { I } = inject();

class StartRunModal {
  async launchRunAndCaptureRunId() {
    let runId: string;
    const projectId = process.env.TESTOMAT_PROJECT_ID;

    await I.usePlaywrightTo("launch run and capture run id", async ({ page }) => {
      console.log(`ProjectID: ${projectId}`);
      const responsePromise = page.waitForResponse((res) => res.url().includes(`/${projectId}/runs`) && res.request().method() === "POST");

      await page.getByRole("button", { name: "Launch" }).click();

      const response = await responsePromise;
      const body = await response.json();
      runId = body.data.id;
    });

    return runId;
  }
}

module.exports = new StartRunModal();
module.exports.StartRunModal = StartRunModal;

export {};
