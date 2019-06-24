import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Form } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

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

    constructor(public formBuilder: FormBuilder, private authService: AuthenticationService, private router: RouterService) {
      this.loginForm = this.formBuilder.group({
        userId: [],
        userPassword: []
      });
    }

    loginSubmit() {
      this.authService.authenticateUser(this.loginForm.value).subscribe(res => {
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
