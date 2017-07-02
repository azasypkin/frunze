import { NgAppPage } from './app.po';

describe('Frunze ng-app', () => {
  let page: NgAppPage;

  beforeEach(() => {
    page = new NgAppPage();
  });

  it('should display correct project names.', () => {
    page.navigateTo();
    expect(page.getProjects()).toEqual(['Frunze Project']);
  });
});
