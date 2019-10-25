import { ElementFinder, element, by, browser, promise } from "protractor";
import { By} from "selenium-webdriver";


export class DashBoardPage {

  navigateToLogin() {
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

  clickBookmarks(): promise.Promise<void> {
    return this.getBookmarkLink().click();
  }

  clickRecommended(): promise.Promise<void> {
    return this.getRecommendedLink().click();
  }
}