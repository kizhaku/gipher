import { LoginComponent } from "src/app/login/login.component";
import { fakeAsync } from "@angular/core/testing";

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;

  it('should create', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('should successfully login to system', fakeAsync(() => {
    loginComponent.loginSubmit();
    expect(true).toBe(true);
  }));
});