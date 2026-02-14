const { I } = inject();

class TestomatApi {
  private projectId: string;
  private token: string;

  constructor() {
    this.projectId = process.env.TESTOMAT_PROJECT_ID;
    this.token = '';
  }

  setToken(token: string) {
    this.token = token;
  }

  async login(generalApiToken: string, expectedStatus: number = 200) {
    const response = await I.sendPostRequest("/login", {
      api_token: generalApiToken,
    });

    if (response.status !== expectedStatus) {
      throw new Error(`Login failed. Status: ${response.status}`);
    }

    return response;
  }

  async createSuite(suiteName: string, expectedStatus: number = 200) {
    I.haveRequestHeaders({
      Authorization: this.token,
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

  async createTestCase(suiteId: string, testName: string, expectedStatus: number = 200) {
    I.haveRequestHeaders({
      Authorization: this.token,
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

  async createSettedCountOfTests(suiteId: string, countOfTestsToCreate: number, expectedStatus: number = 200) {
    const createdTests = [];

    for (let i = 0; i < countOfTestsToCreate; i++) {
      const testName = `Test_case_${i + 1}`;

      const test = await this.createTestCase(suiteId, testName, expectedStatus);

      createdTests.push(test.title);
    }

    return createdTests;
  }

  async deleteSuiteById(suiteId: string, expectedStatus: number = 200) {
    I.haveRequestHeaders({
      Authorization: this.token,
    });

    const response = await I.sendDeleteRequest(`/${this.projectId}/suites/${suiteId}`);

    if (response.status !== expectedStatus) {
      throw new Error(`Suite with ID "${suiteId}" was not deleted. Status: ${response.status}`);
    }

    return response;
  }

  async deleteRunById(runId: string, expectedStatus: number = 200) {
    I.haveRequestHeaders({
      Authorization: this.token,
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
