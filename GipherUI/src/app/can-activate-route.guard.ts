import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { Observable } from 'rxjs';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: RouterService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isUserAuthenticated(this.authService.getBearerToken())
      .then(res => {
        if (res === "false") {
          this.authService.logout();
          this.router.routeToLogin();
          return false;
        } else {
          return true;
        }
      });
  }
}
