import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GiphBookmark } from "../models/giphBookmark";
import { GiphRecommended } from "../models/giphRecommended";
import { AuthenticationService } from "./authentication.service";
import { environment } from "src/environments/environment";

@Injectable()
export class GiphService {
  giphyApiKey: String = environment.giphyApiKey;
  giphyTrendingURL: String = environment.giphyTrendingURL;
  giphySearchURL: String = environment.giphySearchURL;
  apiGatewayURL: String = environment.apiGatewayURL;
  apiBookmark: String = environment.apiBookmark;
  apiRecommended: String = environment.apiRecommended;
  giphyFetchURL: String = environment.giphyFetchURL;
  bearerToken: String;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    
  }

  fetchGiphs() {
    return this.httpClient.get(`${this.giphyTrendingURL}&api_key=${this.giphyApiKey}`);
  }

  searchGiphs(searchTerm: String) {
    return this.httpClient.get(`${this.giphySearchURL}&api_key=${this.giphyApiKey}&q=${searchTerm}`)
  }

  bookMarkGiph(gifId: String, userName: String) {
    var data = {gifId: gifId, userName: userName};
    this.bearerToken = this.authService.getBearerToken();
    
    return this.httpClient.post(`${this.apiGatewayURL}${this.apiBookmark}`, data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'method': 'POST',
        'Authorization': `Bearer ${this.bearerToken}`
      })
    });
  }

  fetchBookmarkedGiphs(userName: String) {
    this.bearerToken = this.authService.getBearerToken();
    return this.httpClient.get<Array<GiphBookmark>>(`${this.apiGatewayURL}${this.apiBookmark}${userName}`, {
       headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
     })
  }

  fetchGiphsById(gifIds: String) {
    return this.httpClient.get(`${this.giphyFetchURL}&api_key=${this.giphyApiKey}&ids=${gifIds}`)
  }

  fetchRecommendedGiphs() {
    this.bearerToken = this.authService.getBearerToken();
    return this.httpClient.get<Array<GiphRecommended>>(`${this.apiGatewayURL}${this.apiRecommended}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

  deleteBookmark(userName: String, gifId: String) {
    this.bearerToken = this.authService.getBearerToken();
    return this.httpClient.delete(`${this.apiGatewayURL}${this.apiBookmark}${gifId}/${userName}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    })
  }

}