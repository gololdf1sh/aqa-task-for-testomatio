import {
  MainPage,
  LoginPage,
  ProjectsPage,
  ProjectPage,
  SuitePage,
  ManualRunPage,
  ManualRunResultsPage,
} from "./pages/index";

export class Application {
  I: CodeceptJS.I;
  mainPage: MainPage;
  loginPage: LoginPage;
  projectsPage: ProjectsPage;
  projectPage: ProjectPage;
  suitePage: SuitePage;
  manualRunPage: ManualRunPage;
  manualRunResultsPage: ManualRunResultsPage;

  constructor(I: CodeceptJS.I, projectId: string) {
    this.I = I;
    this.mainPage = new MainPage(I);
    this.loginPage = new LoginPage(I);
    this.projectsPage = new ProjectsPage(I);
    this.projectPage = new ProjectPage(I);
    this.suitePage = new SuitePage(I, projectId);
    this.manualRunPage = new ManualRunPage(I);
    this.manualRunResultsPage = new ManualRunResultsPage(I);
  }
}
