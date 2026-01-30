import { TestomatApi } from "../src/helpers/testomat.api.js";
import { Application } from "../src/index.js";

Feature("AQA test task");

let testomatApi;
let app;

let suiteId;
let token;
let runId;

let generalApiToken = process.env.TESTOMAT_GENERAL_API_TOKEN;
let userEmail = process.env.USER_EMAIL;
let userPassword = process.env.USER_PASSWORD;
let userName = process.env.USER_NAME;
let projectName = process.env.TESTOMAT_PROJECT_NAME;
let projectId = process.env.TESTOMAT_PROJECT_ID;

let suiteName = `Test_suite_${Date.now()}`;
let countOfTestsToCreate = 2;
let statusMessage = "Test Message";
let expectedStatus = 200;
let createdTestCasesNames = [];

Before(async ({ I }) => {
  testomatApi = new TestomatApi(I, token, projectId);
  app = new Application(I, projectId);

  const login = await testomatApi.login(generalApiToken, expectedStatus);
  testomatApi.token = `Bearer ${login.data.jwt}`;

  const createSuite = await testomatApi.createSuite(suiteName, expectedStatus);
  suiteId = createSuite.data.data.id;

  createdTestCasesNames = await testomatApi.createSettedCountOfTests(
    suiteId,
    countOfTestsToCreate,
    expectedStatus,
  );
});

Scenario("Test task scenario", async ({ I }) => {
  I.amOnPage("/");
  await app.mainPage.goToLoginPage();

  // TODO: Need to ask: How to verify that input contains expected value?
  // TODO: Why loginButton marked as input in DOM?
  await app.loginPage.login(userEmail, userPassword);
  // TODO: Rename ProjectsPage to DashboardPage
  await app.projectsPage.checkThatSignedInSuccessfullyMessageIsVisible();
  await app.projectsPage.openProjectByName(projectName);
  await app.projectPage.openSuiteByName(suiteName);

  await app.suitePage.openMoreOptionsMenu();
  await app.suitePage.clickRunTestsButton();

  runId = await app.suitePage.runTestsAndGetRunId();
  await app.manualRunPage.selectStatus("passed");
  await app.manualRunPage.verifyStatus(userName, "passed");

  await app.manualRunPage.openTestCase(createdTestCasesNames[1]);
  await app.manualRunPage.selectStatus("failed");
  await app.manualRunPage.fillStatusMessage(statusMessage);
  await app.manualRunPage.verifyStatus(userName, "failed", statusMessage);

  await app.manualRunPage.finishRun();
  //TODO: Figure out how to catch this flash popup
  // I.seeElement(locate("h2").withText("This run has finished!"));

  await app.manualRunResultsPage.verifyFailedStatusIsVisible();
  await app.manualRunResultsPage.verifyPieChartIsVisible();
});

After(async () => {
  if (!suiteId) return;

  await testomatApi.deleteSuiteById(suiteId, expectedStatus);

  if (runId) {
    await testomatApi.deleteRunById(runId, expectedStatus);
  }
});
