import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GiphBookmark } from "../models/giphBookmark";
import { GiphRecommended } from "../models/giphRecommended";
import { AuthenticationService } from "./authentication.service";
import { map } from "rxjs/operators";

@Injectable()
export class GiphService {
  apiKey: String;
  bearerToken: String;

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) {
    this.apiKey = "DVa67iQKqrw6hJFfW7VslcCCQ6dSAn3q";
    this.bearerToken = this.authService.getBearerToken();
  }

  fetchGiphs() {
    return this.httpClient.get('http://api.giphy.com/v1/gifs/trending?limit=20&rating=PG&lang=en&api_key='+ this.apiKey)
  }

  searchGiphs(searchTerm: String) {
    return this.httpClient.get('http://api.giphy.com/v1/gifs/search?limit=20&rating=PG&lang=en&api_key='+ this.apiKey + '&q='+ searchTerm)
  }

  bookMarkGiph(gifId: String, userName: String) {
    var data = {gifId: gifId, userName: userName};
    
    return this.httpClient.post('http://localhost:9100/giphermanager/api/v1/bookmark', data, {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'method': 'POST'
      })
    });
  }

  fetchBookmarkedGiphs(userName: String) {
    return this.httpClient.get<Array<GiphBookmark>>('http://localhost:9100/giphermanager/api/v1/bookmark/'+userName, {
       headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
     })
  }

  fetchGiphsById(gifIds: String) {
    return this.httpClient.get('http://api.giphy.com/v1/gifs?limit=20&rating=PG&lang=en&api_key='+ this.apiKey + '&ids='+ gifIds)
  }

  fetchRecommendedGiphs() {
    return this.httpClient.get<Array<GiphRecommended>>('http://localhost:9200/gipherrecommender/api/v1/giphs', {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

  deleteBookmark(userName: String, gifId: String) {
    return this.httpClient.delete('http://localhost:9100/giphermanager/api/v1/bookmark/'+ gifId +'/'+ userName, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.bearerToken}`)
    })
  }

}