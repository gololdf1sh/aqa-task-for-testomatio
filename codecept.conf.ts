import * as dotenv from "dotenv";
dotenv.config();

export const config: CodeceptJS.MainConfig = {
  tests: "tests/*_test.ts",
  output: "./output",
  include: {
    I: "./steps_file.ts",
    mainPage: "./src/pages/main.page.ts",
    loginPage: "./src/pages/login.page.ts",
    projectsPage: "./src/pages/projects.page.ts",
    projectPage: "./src/pages/project.page.ts",
    suitePage: "./src/pages/suite.page.ts",
    manualRunPage: "./src/pages/manualRun.page.ts",
    manualRunResultsPage: "./src/pages/manualRunResults.page.ts",
    testomatApi: "./src/helpers/testomat.api.ts",
    startRunModal: "./src/components/startRunModal.ts",
  },
  helpers: {
    Playwright: {
      browser: "chromium",
      url: process.env.BASE_URL,
      show: true,
      trace: false,
      waitForNavigation: "load",
      waitForAction: 500,
    },
    REST: {
      endpoint: process.env.API_BASE_URL,
    },
  },
  plugins: {
    htmlReporter: {
      enabled: true,
    },
  },
  name: "aqa-task-for-testomatio",
  require: ["tsx/cjs"],
};
