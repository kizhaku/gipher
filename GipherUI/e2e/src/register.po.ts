import { browser, ElementFinder, element } from "protractor";
import { By, promise } from "selenium-webdriver";

export class RegisterPage {

  navigateToRegister() {
    return browser.get('/register')
  }

  getCurrentURL(): promise.Promise<String> {
    return browser.getCurrentUrl();
  }

  getInputUsername(): ElementFinder {
    return element(By.css('.username'));
  }

  getInputFirstName(): ElementFinder {
    return element(By.css('.firstName'));
  }

  getInputLastName(): ElementFinder {
    return element(By.css('.lastName'));
  }

  getInputPassword(): ElementFinder {
    return element(By.css('.password'));
  }

  getSubmitButton(): ElementFinder {
    return element(By.css('.btn-register'));
  }

  getErrorMessage(): ElementFinder {
    return element(By.css('.error-message'));
  }

  addRegistrationValue(username, firstName, lastName, password) {
    this.getInputUsername().sendKeys(username);
    this.getInputFirstName().sendKeys(firstName);
    this.getInputLastName().sendKeys(lastName);
    this.getInputPassword().sendKeys(password);
  }

  clickSubmitButton(): promise.Promise<void> {
    return this.getSubmitButton().submit();
  }

  getLogoutButton(): ElementFinder {
    return element(By.css('.btn-logout'));
  }

  clickLogout(): promise.Promise<void>{
    return this.getLogoutButton().click();
  }

}