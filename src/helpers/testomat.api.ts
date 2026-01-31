export class TestomatApi {
  constructor(
    private I: CodeceptJS.I,
    public token: string,
    private projectId: string,
  ) {}

  async login(generalApiToken: string, expectedStatus: number) {
    const response = await this.I.sendPostRequest("/login", {
      api_token: generalApiToken,
    }) as any;

    if (response.status !== expectedStatus) {
      throw new Error(`Login failed. Status: ${response.status}`);
    }

    return response;
  }

  async createSuite(suiteName: string, expectedStatus: number) {
    this.I.haveRequestHeaders({
      Authorization: this.token,
    });

    const response = await this.I.sendPostRequest(
      `/${this.projectId}/suites`,
      {
        data: {
          type: "suites",
          attributes: {
            title: suiteName,
            "file-type": "file",
          },
        },
      },
    ) as any;

    if (response.status !== expectedStatus) {
      throw new Error(
        `Suite "${suiteName}" was not created. Status: ${response.status}`,
      );
    }

    return response;
  }

  async createTestCase(
    suiteId: string,
    testName: string,
    expectedStatus: number,
  ) {
    this.I.haveRequestHeaders({
      Authorization: this.token,
    });

    const res = await this.I.sendPostRequest(`/${this.projectId}/tests`, {
      data: {
        type: "tests",
        attributes: {
          title: testName,
          sync: true,
        },
        relationships: {
          suite: {
            data: {
              type: "suites",
              id: suiteId,
            },
          },
        },
      },
    }) as any;

    if (res.status !== expectedStatus) {
      throw new Error(
        `Test case "${testName}" was not created. Status: ${res.status}`,
      );
    }

    return {
      title: testName,
    };
  }

  async createSettedCountOfTests(
    suiteId: string,
    countOfTestsToCreate: number,
    expectedStatus: number,
  ) {
    const createdTests = [];

    for (let i = 0; i < countOfTestsToCreate; i++) {
      const testName = `Test_case_${i + 1}`;

      const test = await this.createTestCase(suiteId, testName, expectedStatus);

      createdTests.push(test.title);
    }

    return createdTests;
  }

  async deleteSuiteById(suiteId: string, expectedStatus: number) {
    this.I.haveRequestHeaders({
      Authorization: this.token,
    });

    const response = await this.I.sendDeleteRequest(
      `/${this.projectId}/suites/${suiteId}`,
    ) as any;

    if (response.status !== expectedStatus) {
      throw new Error(
        `Suite with ID "${suiteId}" was not deleted. Status: ${response.status}`,
      );
    }

    return response;
  }

  async deleteRunById(runId: string, expectedStatus: number) {
    this.I.haveRequestHeaders({
      Authorization: this.token,
    });

    const response = await this.I.sendDeleteRequest(
      `/${this.projectId}/runs/${runId}`,
    ) as any;

    if (response.status !== expectedStatus) {
      throw new Error(
        `Test run with ID "${runId}" was not deleted. Status: ${response.status}`,
      );
    }

    return response;
  }
}
