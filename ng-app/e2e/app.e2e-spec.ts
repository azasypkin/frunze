import { NgAppPage } from './app.po';

describe('Frunze ng-app', () => {
  let page: NgAppPage;

  beforeEach(() => {
    page = new NgAppPage();
  });

  it('should display correct component groups in Toolbox', () => {
    page.navigateTo();
    expect(page.getToolboxGroups()).toEqual([
      'Hardware - Connection',
      'Hardware - Switches',
      'Services - Storage',
      'Hardware - Audio'
    ]);
  });
});
