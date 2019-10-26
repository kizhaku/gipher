import { RegisterPage } from "./register.po";

describe('Register', () => {
  let registerPage: RegisterPage;

  beforeEach(() => {
    registerPage = new RegisterPage();
  });

  it('should have username, firstname, lastname and password input', () => {
    registerPage.navigateToRegister();
    expect(registerPage.getInputFirstName().isPresent()).toBeTruthy('should have user name input');
    expect(registerPage.getInputFirstName().isPresent()).toBeTruthy('should have first name input');
    expect(registerPage.getInputLastName().isPresent()).toBeTruthy('should have last name input');
    expect(registerPage.getInputPassword().isPresent()).toBeTruthy('should have password input');
  });

  it('should successfully register new user', () => {
    registerPage.navigateToRegister();
    registerPage.addRegistrationValue('testadmin', 'E2E_Test', 'Admin', 'pass');
    registerPage.clickSubmitButton().then(() => {
      expect(registerPage.getCurrentURL()).toContain('/home/view', 'should redirect to dashboard');
    });

    registerPage.clickLogout();
  });

  it('should show error if user already exists', () => {
    registerPage.navigateToRegister();
    registerPage.addRegistrationValue('testadmin', 'E2E_Test', 'Admin', 'pass');
    registerPage.clickSubmitButton().then(() => {
      expect(registerPage.getCurrentURL()).toContain('/register', 'should stay in register page.');
      expect(registerPage.getErrorMessage().getText()).toBe('Username is already taken. Please try another one.', 'should display error message.');
    });
  });
})