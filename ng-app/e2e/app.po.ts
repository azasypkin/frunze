import { browser, element, by } from 'protractor';

export class NgAppPage {
  navigateTo() {
    return browser.get('/');
  }

  getToolboxGroups(): any {
    return element.all(by.css('.expandable-group__header')).getText();
  }
}
