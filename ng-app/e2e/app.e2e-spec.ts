import { NgAppPage } from './app.po';

describe('Frunze ng-app', () => {
  let page: NgAppPage;

  beforeEach(() => {
    page = new NgAppPage();
  });

  it('should display correct control groups in Toolbox', () => {
    page.navigateTo();
    expect(page.getToolboxGroups()).toEqual(['Group #1', 'Group #2']);
  });
});
