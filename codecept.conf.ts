import * as dotenv from "dotenv";

dotenv.config();

export const config: CodeceptJS.MainConfig = {
  tests: "tests/*_test.ts",
  output: "./output",
  helpers: {
    Playwright: {
      browser: "chromium",
      url: process.env.BASE_URL || "https://testomat.io",
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
