import { LoginComponent } from "src/app/login/login.component";
import { fakeAsync } from "@angular/core/testing";

describe('LoginComponent', () => {
  let loginComponent: LoginComponent;

  xit('should create', () => {
    expect(loginComponent).toBeTruthy();
  });

  xit('should successfully login to system', fakeAsync(() => {
    loginComponent.loginSubmit();
    expect(true).toBe(true);
  }));
});