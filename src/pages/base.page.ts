export abstract class BasePage {
  protected I: CodeceptJS.I;

  constructor(I: CodeceptJS.I) {
    this.I = I;
  }
}
