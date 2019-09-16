import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    userId = new FormControl();
    userPassword = new FormControl();
    loginForm: FormGroup;
    submitMessage: String;

    constructor(public formBuilder: FormBuilder, private authService: AuthenticationService, private routerService: RouterService,
        private userService: UserService) {
      this.loginForm = this.formBuilder.group({
        userId:['', [Validators.required]],
        userPassword: ['', [Validators.required]]
      });
    }

    loginSubmit() {
      if(this.validateForm(this.loginForm.value)) {
        this.authService.authenticateUser(this.loginForm.value).subscribe(res => {
          this.authService.setBearerToken(res['token']);
          this.authService.setUserName(this.loginForm.value.userId);
          this.routerService.routeToHome();
        },
        error => {
          if (error.status === 401) {
            this.submitMessage = 'Unauthorized';
          } else if (error.status === 404) {
            this.submitMessage = error.message;
          }
        });
      }
    }

    validateForm(formObj: Object) {
      let isValid = true;

      for(let formItem in formObj) {
        if(formObj[formItem] === "") {
          isValid = false;
          break;
        }
      }

      return isValid;
    }

    gotoRegistration() {
      this.routerService.routeToRegistration();
    }
}
