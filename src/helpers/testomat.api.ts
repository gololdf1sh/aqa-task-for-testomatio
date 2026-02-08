const { I } = inject();

class TestomatApi {
  private projectId: string;

  constructor() {
    this.projectId = process.env.TESTOMAT_PROJECT_ID;
  }

  async login(generalApiToken: string, expectedStatus: number) {
    const response = await I.sendPostRequest("/login", {
      api_token: generalApiToken,
    });

    if (response.status !== expectedStatus) {
      throw new Error(`Login failed. Status: ${response.status}`);
    }

    return response;
  }

  async createSuite(token: string, suiteName: string, expectedStatus: number) {
    I.haveRequestHeaders({
      Authorization: token,
    });

    const response = await I.sendPostRequest(`/${this.projectId}/suites`, {
      data: {
        type: "suites",
        attributes: {
          title: suiteName,
          "file-type": "file",
        },
      },
    });

    if (response.status !== expectedStatus) {
      throw new Error(`Suite "${suiteName}" was not created. Status: ${response.status}`);
    }

    return response;
  }

  async createTestCase(token: string, suiteId: string, testName: string, expectedStatus: number) {
    I.haveRequestHeaders({
      Authorization: token,
    });

    const res = await I.sendPostRequest(`/${this.projectId}/tests`, {
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
    });

    if (res.status !== expectedStatus) {
      throw new Error(`Test case "${testName}" was not created. Status: ${res.status}`);
    }

    return {
      title: testName,
    };
  }

  async createSettedCountOfTests(token: string, suiteId: string, countOfTestsToCreate: number, expectedStatus: number) {
    const createdTests = [];

    for (let i = 0; i < countOfTestsToCreate; i++) {
      const testName = `Test_case_${i + 1}`;

      const test = await this.createTestCase(token, suiteId, testName, expectedStatus);

      createdTests.push(test.title);
    }

    return createdTests;
  }

  async deleteSuiteById(token: string, suiteId: string, expectedStatus: number) {
    I.haveRequestHeaders({
      Authorization: token,
    });

    const response = await I.sendDeleteRequest(`/${this.projectId}/suites/${suiteId}`);

    if (response.status !== expectedStatus) {
      throw new Error(`Suite with ID "${suiteId}" was not deleted. Status: ${response.status}`);
    }

    return response;
  }

  async deleteRunById(token: string, runId: string, expectedStatus: number) {
    I.haveRequestHeaders({
      Authorization: token,
    });

    const response = await I.sendDeleteRequest(`/${this.projectId}/runs/${runId}`);

    if (response.status !== expectedStatus) {
      throw new Error(`Test run with ID "${runId}" was not deleted. Status: ${response.status}`);
    }

    return response;
  }
}

module.exports = new TestomatApi();
module.exports.TestomatApi = TestomatApi;

export {};
