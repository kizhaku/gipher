import { ElementFinder, element, by, browser, promise } from "protractor";
import { By} from "selenium-webdriver";


export class DashBoardPage {

  navigateToDashboard() {
    return browser.get('/home/view');
  }

  getCurrentURL(): promise.Promise<String> {
    return browser.getCurrentUrl();
  }

  getSearchButton(): ElementFinder {
    return element(By.css('.btn-search'));
  }

  getSearchInput(): ElementFinder {
    return element(By.css('input'))
  }

  getBookmarkLink(): ElementFinder {
    return element(By.css('.nav-bookmarks'))
  }

  getRecommendedLink(): ElementFinder {
    return element(By.css('.nav-recommended'))
  }

  addSearchValue(searchTerm) {
    this.getSearchInput().sendKeys(searchTerm);
  }

  clickSearch(): promise.Promise<void> {
    return this.getSearchButton().submit();
  }

  getLogoutButton(): ElementFinder {
    return element(By.css('.btn-logout'));
  }

  clickBookmarks(): promise.Promise<void> {
    return this.getBookmarkLink().click();
  }

  clickRecommended(): promise.Promise<void> {
    return this.getRecommendedLink().click();
  }

  clickLogout(): promise.Promise<void>{
    return this.getLogoutButton().click();
  }
}