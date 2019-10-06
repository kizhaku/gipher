import { TestBed } from "@angular/core/testing";
import { AuthenticationService } from "src/app/services/authentication.service";
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';


describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let httpTestingController: HttpTestingController;
  let loginSuccessResponse = {"isAuthenticated":"true"};
  let loginFailureResponse = {"isAuthenticated":"false"};
  let authUserData = {"userId":"admin","userPassword":"pass"};
  let authUserUrl = "http://localhost:8765/accountmanager/auth/api/v1/login/";
  let authTokenUrl = "http://localhost:8765/accountmanager/auth/api/v1/isauthenticated/"

  beforeEach(() => {
    TestBed.configureTestingModule( {
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService]
    });

    authenticationService = TestBed.get(AuthenticationService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('should authenticate user success', () => {
    authenticationService.authenticateUser(authUserData).subscribe(res => {
      expect(res).toEqual(loginSuccessResponse);
    });

    const httpMockReq = httpTestingController.expectOne(authUserUrl);
    expect(httpMockReq.request.method).toBe('POST');
    httpMockReq.flush(loginSuccessResponse);
  });

  it('should authenticate user failure', () => {
    authenticationService.authenticateUser(authUserData).subscribe(res => {
      expect(res).toEqual(loginFailureResponse);
    });

    const httpMockReq = httpTestingController.expectOne(authUserUrl);
    expect(httpMockReq.request.method).toBe('POST');
    httpMockReq.flush(loginFailureResponse);
  });

  it('it should authenticate token success', () => {
    authenticationService.isUserAuthenticated("a token").then(res => {
      expect(res).toEqual("true");
    });

    const httpMockReq = httpTestingController.expectOne(authTokenUrl);
    expect(httpMockReq.request.method).toBe('GET');
    httpMockReq.flush({"isAuthenticated":"true"});
  });

  it('it should authenticate token failure', () => {
    authenticationService.isUserAuthenticated("a token").then(res => {
      expect(res).toEqual("false");
    });

    const httpMockReq = httpTestingController.expectOne(authTokenUrl);
    expect(httpMockReq.request.method).toBe('GET');
    httpMockReq.flush({"isAuthenticated":"false"});
  });
});