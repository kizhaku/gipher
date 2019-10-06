import { TestBed } from "@angular/core/testing";
import { UserService } from "src/app/services/user.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { environment } from "src/environments/environment";

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;
  let userData = {userId: "admin", firstName: "foo", lastName: "bar", userPassword: "pass", userRole: "admin"};
  let apiGatewayURL = environment.apiGatewayURL;
  let apiRegisterUser = environment.apiRegisterUser;
  let registerUserResponse = {status: "true"};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });

    userService = TestBed.get(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should register user', () => {
    userService.registerUser(userData).subscribe(res => {
      expect(res).toEqual(registerUserResponse);
    });

    const httpMockReq = httpTestingController.expectOne(`${apiGatewayURL}${apiRegisterUser}`);
    httpMockReq.flush(registerUserResponse);
    expect(httpMockReq.request.method).toBe('POST');
  });
})