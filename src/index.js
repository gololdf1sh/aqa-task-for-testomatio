import {
  MainPage,
  LoginPage,
  ProjectsPage,
  ProjectPage,
  SuitePage,
  ManualRunPage,
  ManualRunResultsPage,
} from "../src/pages/index.js";

export class Application {
  constructor(I, projectId) {
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