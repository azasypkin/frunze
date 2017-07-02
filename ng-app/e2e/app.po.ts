import { browser, element, by } from 'protractor';

export class NgAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getToolboxGroups(): any {
    return element.all(by.css('.expandable-group__header')).getText();
  }

  getProjects(): any {
    return element.all(by.css('.frunze-projects-view-item-description')).getText();
  }
}
