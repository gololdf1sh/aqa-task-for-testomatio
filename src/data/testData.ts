export const createTestData = () => ({
  suiteName: `Test_suite_${Date.now()}`,
  countOfTestsToCreate: 2,
  statusMessage: "Test Message",
  createdTestCasesNames: [] as string[],
  failedStatus: "failed",
  passedStatus: "passed",
});
