import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have the Gipher header', () => {
    page.navigateTo();
    expect(page.getHeader().getText()).toBe('Gipher');
  });
  
});
