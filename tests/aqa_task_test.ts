import { config } from '../src/config/env';
import { createTestData } from '../src/data/testData';

let suiteId: string;
let runId: string;
let testData: ReturnType<typeof createTestData>;

//TODO: Global or Local inject?

Feature("AQA test task");

Before(async ({ I, testomatApi }) => {
  testData = createTestData();
  const login = await testomatApi.login(config.generalApiToken);
  const token = `Bearer ${login.data.jwt}`;
  testomatApi.setToken(token);

  const createSuite = await testomatApi.createSuite(testData.suiteName);
  suiteId = createSuite.data.data.id;

  testData.createdTestCasesNames = await testomatApi.createSettedCountOfTests(suiteId, testData.countOfTestsToCreate);

  I.amOnPage("/");
});

Scenario("Test task scenario", async ({ mainPage, loginPage, projectsPage, projectPage, suitePage, manualRunPage, manualRunResultsPage }) => {
  await mainPage.goToLoginPage();

  await loginPage.login(config.userEmail, config.userPassword);

  await projectsPage.checkThatSignedInSuccessfullyMessageIsVisible();
  await projectsPage.openProjectByName(config.projectName);
  await projectPage.openSuiteByName(testData.suiteName);

  await suitePage.openMoreOptionsMenu();
  await suitePage.clickRunTestsButton();
  runId = await suitePage.runTestsAndGetRunId();

  await manualRunPage.selectStatus(testData.passedStatus);
  await manualRunPage.verifyStatus(config.userName, testData.passedStatus);
  await manualRunPage.openTestCase(testData.createdTestCasesNames[1]);
  await manualRunPage.selectStatus(testData.failedStatus);
  await manualRunPage.fillStatusMessage(testData.statusMessage);
  await manualRunPage.verifyStatus(config.userName, testData.failedStatus, testData.statusMessage);
  await manualRunPage.finishRun();

  await manualRunResultsPage.verifyFailedStatusIsVisible();
  await manualRunResultsPage.verifyPieChartIsVisible();
});

After(async ({ testomatApi }) => {
  if (!suiteId) return;

  await testomatApi.deleteSuiteById(suiteId);

  if (runId) {
    await testomatApi.deleteRunById(runId);
  }
});
