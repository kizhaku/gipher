import { Component, OnInit, OnChanges, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterContentChecked {
  isLoggedIn: Boolean = false;
  userName: String;

  constructor(private authService: AuthenticationService, private routerService: RouterService) {

  }

  ngAfterContentChecked() {
    let bearerToken: String = this.authService.getBearerToken();
    if(bearerToken != null) {
      this.isLoggedIn = true;
      this.userName = this.authService.getUserName();
    }
  }

  logoutUser() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.routerService.routeToLogin();
  }
}
