import { DashBoardPage } from "./dashboard.po";

describe('Dashboard', () => {
  let dashBoardPage: DashBoardPage;

  beforeEach(() => {
    dashBoardPage = new DashBoardPage();
  })

  it('should have search input and button', () => {
      expect(dashBoardPage.getSearchButton().getText()).toEqual('Search');
      expect(dashBoardPage.getSearchInput().isPresent()).toBeTruthy();
  });

  it('should be able to search', () => {
      dashBoardPage.addSearchValue('birthday')
      dashBoardPage.clickSearch().then(() => {
        expect(dashBoardPage.getCurrentURL()).toContain('search/birthday');
      });
  });

  it('should redirect to bookmarks', () => {
    dashBoardPage.clickBookmarks().then(() => {
      expect(dashBoardPage.getCurrentURL()).toContain('/bookmarks');
    });
  });

  it('should redirect to recommended', () => {
    dashBoardPage.clickRecommended().then(() => {
      expect(dashBoardPage.getCurrentURL()).toContain('/recommended');
    });
  });

})