import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(data) {
    return this.httpClient.post('http://localhost:8089/auth/api/v1/login/', data, {
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
    return this.httpClient.get('http://localhost:8089/auth/api/v1/isauthenticated', {
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
