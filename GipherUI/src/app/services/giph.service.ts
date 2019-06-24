import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class GiphService {

  constructor(private httpClient: HttpClient) {
  }

  fetchNotesFromServer() {
    return this.httpClient.get('http://api.giphy.com/v1/gifs/trending?api_key=DVa67iQKqrw6hJFfW7VslcCCQ6dSAn3q&limit=15&rating=PG-13')
  }

}