import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  // get header
  getHeader(): ElementFinder {
    return element(by.css('.navbar-brand'));
  }

}
