import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) {

  }

  registerUser(data) {
    return this.httpClient.post('http://localhost:8089/auth/api/v1/user/', data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'method': 'POST'
      })
    });
  }
}
