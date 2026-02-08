let suiteId: string;
let token: string;
let runId: string;

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

//TODO: Global or Local inject? And why?

Feature("AQA test task");

Before(async ({ I, testomatApi }) => {
  const login = await testomatApi.login(generalApiToken, expectedStatus);
  token = `Bearer ${login.data.jwt}`;

  const createSuite = await testomatApi.createSuite(
    token,
    suiteName,
    expectedStatus,
  );
  suiteId = createSuite.data.data.id;

  createdTestCasesNames = await testomatApi.createSettedCountOfTests(
    token,
    suiteId,
    countOfTestsToCreate,
    expectedStatus,
  );

  I.amOnPage("/");
});

Scenario("Test task scenario", async ({
  mainPage,
  loginPage,
  projectsPage,
  projectPage,
  suitePage,
  manualRunPage,
  manualRunResultsPage,
}) => {
  await mainPage.goToLoginPage();

  // TODO: Need to ask: How to verify that input contains expected value?
  // TODO: Why loginButton marked as input in DOM?
  await loginPage.login(userEmail, userPassword);

  // TODO: Rename ProjectsPage to DashboardPage
  await projectsPage.checkThatSignedInSuccessfullyMessageIsVisible();
  await projectsPage.openProjectByName(projectName);
  await projectPage.openSuiteByName(suiteName);

  await suitePage.openMoreOptionsMenu();
  await suitePage.clickRunTestsButton();
  runId = await suitePage.runTestsAndGetRunId();

  await manualRunPage.selectStatus("passed");
  await manualRunPage.verifyStatus(userName, "passed");
  await manualRunPage.openTestCase(createdTestCasesNames[1]);
  await manualRunPage.selectStatus("failed");
  await manualRunPage.fillStatusMessage(statusMessage);
  await manualRunPage.verifyStatus(userName, "failed", statusMessage);
  await manualRunPage.finishRun();
  //TODO: Figure out how to catch this flash popup
  // I.seeElement(locate("h2").withText("This run has finished!"));

  await manualRunResultsPage.verifyFailedStatusIsVisible();
  await manualRunResultsPage.verifyPieChartIsVisible();
});

After(async ({ testomatApi }) => {
  if (!suiteId) return;

  await testomatApi.deleteSuiteById(token, suiteId, expectedStatus);

  if (runId) {
    await testomatApi.deleteRunById(token, runId, expectedStatus);
  }
});
