import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class RouterService {

  constructor(private route: Router, private location: Location) {

  }

  routeToHome() {
    this.route.navigate(['home/view']);
  }

  routeToLogin() {
    this.route.navigate(['login']);
  }
}
