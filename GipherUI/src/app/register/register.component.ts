import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    userId = new FormControl();
    firstName = new FormControl();
    lastName = new FormControl();
    userPassword = new FormControl();
    registrationForm: FormGroup;
    submitMessage: String;

    constructor(public formBuilder: FormBuilder, private userService: UserService, private router: RouterService,
       private authService: AuthenticationService) {
      this.registrationForm = this.formBuilder.group({
        userId: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        userPassword: ['', [Validators.required]]
      });
    }

    register(registrationForm: FormGroup) {
      if(this.validateForm(registrationForm.value)) {
        this.userService.registerUser(registrationForm.value).subscribe(res => {
          if(res['status'] === "true") {
            this.routeToHome(this.registrationForm.value);
          }      
        },
        error => {
          if (error.status === 409) {
            this.submitMessage = 'User id already taken. Please try another one.';
          } else {
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

    routeToHome(formVal) {
      this.authService.authenticateUser(formVal).subscribe(res => {
        this.authService.setBearerToken(res['token']);
        this.router.routeToHome();
      },
      error => {
        if (error.status === 403) {
          this.submitMessage = 'Unauthorized';
        } else if (error.status === 404) {
          this.submitMessage = error.message;
        }
      });
    }
}
