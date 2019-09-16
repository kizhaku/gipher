import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class UserService {
  giphyApiKey: String = environment.giphyApiKey;   
  apiGatewayURL: String = environment.apiGatewayURL;
  apiRegisterUser: String = environment.apiRegisterUser;

  constructor(private httpClient: HttpClient) {

  }

  registerUser(data) {
    return this.httpClient.post(`${this.apiGatewayURL}${this.apiRegisterUser}`, data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'method': 'POST'
      })
    });
  }
}
