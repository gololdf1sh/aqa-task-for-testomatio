/// <reference types='codeceptjs' />

type MainPage = import("./src/pages/main.page");
type LoginPage = import("./src/pages/login.page");
type ProjectsPage = import("./src/pages/projects.page");
type ProjectPage = import("./src/pages/project.page");
type SuitePage = import("./src/pages/suite.page");
type ManualRunPage = import("./src/pages/manualRun.page");
type ManualRunResultsPage = import("./src/pages/manualRunResults.page");
type TestomatApi = import("./src/helpers/testomat.api");
type StartRunModal = import("./src/components/startRunModal.ts");

declare namespace CodeceptJS {
  interface SupportObject {
    I: I;
    mainPage: MainPage;
    loginPage: LoginPage;
    projectsPage: ProjectsPage;
    projectPage: ProjectPage;
    suitePage: SuitePage;
    manualRunPage: ManualRunPage;
    manualRunResultsPage: ManualRunResultsPage;
    testomatApi: TestomatApi;
    startRunModal: StartRunModal;
  }

  interface Methods extends Playwright, REST {}
  interface I extends WithTranslation<Methods> {}
}
