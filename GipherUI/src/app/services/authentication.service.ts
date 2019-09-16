import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  apiGatewayURL: String = environment.apiGatewayURL;
  apiLogin: String = environment.apiLogin;
  apiAuthenticateToken: String = environment.apiAuthenticateToken;

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data) {
    return this.httpClient.post(`${this.apiGatewayURL}${this.apiLogin}`, data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'method': 'POST'
      })
    });
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  isUserAuthenticated(token){
    return this.httpClient.get(`${this.apiGatewayURL}${this.apiAuthenticateToken}`, {
       headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
     })
     .pipe(
        map((res) => {
          return res['isAuthenticated'];
        })
     )
    .toPromise();
   }

   logout() {
     localStorage.removeItem('bearerToken');
     localStorage.removeItem('username');
   }

  setUserName(userName) {
    localStorage.setItem('username', userName);
  }

  getUserName() {
    return localStorage.getItem("username");
  }
}
