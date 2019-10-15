import { LoginComponent } from "src/app/login/login.component";
import { fakeAsync, ComponentFixture, async, TestBed, tick } from "@angular/core/testing";
import { AuthenticationService } from "src/app/services/authentication.service";
import { RouterService } from "src/app/services/router.service";
import { UserService } from "src/app/services/user.service";
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatIconModule, MatTabsModule } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Observable, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let authenticationService: AuthenticationService;
  let routerService: RouterService;
  let debugElement: any;
  let element: any;
  let spyAutheticateUser: any;
  let spySetBearerToken: any;
  let spyValidateForm: any;
  let spyRouteToHome: any;
  let errorMessage: any;
  let testData = {
    token : 'bearertoken',
    invalidAuth: {
      error: {message: 'Unauthorized', status: 401},
      status: 401,
      message: 'Unauthorized'
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTabsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AuthenticationService,
        RouterService,
        UserService
      ],
      declarations: [
        LoginComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    routerService = fixture.debugElement.injector.get(RouterService);

    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should handle incorrect login and password', fakeAsync(() => {
    errorMessage = testData.invalidAuth;
    fixture.detectChanges();
    spyValidateForm = spyOn(component, 'validateForm').and.returnValue(true);
    spyAutheticateUser = spyOn(authenticationService, 'authenticateUser').and.returnValue(throwError(errorMessage));
    debugElement = fixture.debugElement.query(By.css('.error-message'));

    component.loginSubmit();

    if(debugElement !== null) {
      fixture.detectChanges();
      expect(debugElement.nativeElement.textContent).toBe(testData.invalidAuth.message, 'Unauthorized error message is displayed.'); 
    }
  }));

  it('should handle login to system', fakeAsync(() => {
    spyValidateForm = spyOn(component, 'validateForm').and.returnValue(true);
    spyAutheticateUser = spyOn(authenticationService, 'authenticateUser').and.returnValue(of(testData.token));
    spySetBearerToken = spyOn(authenticationService, 'setBearerToken').and.callFake(function() {
      localStorage.setItem('bearerToken', testData.token);
    });  
    spyRouteToHome = spyOn(routerService, 'routeToHome').and.callFake(function(){});

    component.loginSubmit();
    expect(localStorage.getItem('bearerToken')).toBe(testData.token, 'token has been set in local storage.');
  }));
});