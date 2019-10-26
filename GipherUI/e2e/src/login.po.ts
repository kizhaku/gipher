import { browser, ElementFinder, element, by } from "protractor";
import { By, promise } from "selenium-webdriver";

export class LoginPage {

  navigateToLogin() {
    return browser.get('/login');
  }

  getCurrentURL(): promise.Promise<String> {
    return browser.getCurrentUrl();
  }

  getUserNameInput(): ElementFinder {
    return element(By.css('.username'));
  }

  getSubmitButton(): ElementFinder {
    return element(By.css('.loginSubmit'));
  }

  getPasswordInput(): ElementFinder {
    return element(By.css('.password'));
  }

  getLogoutButton(): ElementFinder {
    return element(By.css('.btn-logout'));
  }

  getRegisterLink(): ElementFinder {
    return element(By.css('.register'))
  }

  getErrorMessage(): ElementFinder {
    return element(By.css('.error-message'));
  }

  userNameInputPresent(): promise.Promise<Boolean> {
    return this.getUserNameInput().isPresent();
  }

  passwordInputPresent(): promise.Promise<Boolean> {
    return this.getPasswordInput().isPresent();
  }

  loginSubmitPresent(): promise.Promise<Boolean> {
    return this.getSubmitButton().isPresent();
  }

  getLoginDefaultValues(): any {
    let userName, password;
    userName = this.getUserNameInput().getAttribute('value');
    password = this.getPasswordInput().getAttribute('value');

    return Promise.all([userName, password]).then( (values) => {
      return values;
    });
  }

  addLoginValues(userName, password) {
    this.getUserNameInput().sendKeys(userName);
    this.getPasswordInput().sendKeys(password);
  }

  clickLoginSubmit(): promise.Promise<void> {
    return this.getSubmitButton().submit();
  }

  clickLogout(): promise.Promise<void> {
    return this.getLogoutButton().click();
  }

  clickRegisterLink(): promise.Promise<void> {
    return this.getRegisterLink().click();
  }

}