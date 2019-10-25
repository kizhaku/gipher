import { LoginPage } from "./login.po";

describe('Login', () => {
let page: LoginPage;

beforeEach(() => {
  page = new LoginPage();
});

it('should have username input', () => {
  page.navigateToLogin();
  expect(page.userNameInputPresent()).toBeTruthy();
});

it('should have password input', () => {
  expect(page.passwordInputPresent()).toBeTruthy();
});

it('should have submit button', () => {
  expect(page.loginSubmitPresent()).toBeTruthy();
});

it('should not login to application with incorrect credentials', () => {
  page.navigateToLogin();
  page.addLoginValues('admin', 'wrongpass');

  expect(page.getLoginDefaultValues()).toEqual(['admin', 'wrongpass'], 'should be able to set username and password');

  page.clickLoginSubmit().then(() => {
    expect(page.getCurrentURL()).toContain('/login', 'should redirect to dashboard home.'); 
    expect(page.getErrorMessage().getText()).toEqual('Unauthorized', 'should show error message');
  });
});

it('should be able to logout user', () => {
  page.navigateToLogin();
  page.addLoginValues('admin', 'pass');

  page.clickLoginSubmit().then(() => {
    page.clickLogout().then(() => {
      expect(page.getCurrentURL()).toContain('/login', 'should redirect user to login page.');
    });
  });
});

it('should login to application with correct credentials', () => {
  page.navigateToLogin();
  page.addLoginValues('admin', 'pass');

  expect(page.getLoginDefaultValues()).toEqual(['admin', 'pass'], 'should be able to set username and password');

  page.clickLoginSubmit().then(() => {
    expect(page.getCurrentURL()).toContain('/home/view', 'should redirect to dashboard home.'); 
  });
});

})