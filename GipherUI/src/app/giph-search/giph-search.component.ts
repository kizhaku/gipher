import { Component, OnInit } from '@angular/core';
import { GiphService } from '../services/giph.service';
import { Giph } from '../models/giph';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-giph-view',
  templateUrl: './giph-search.component.html',
  styleUrls: ['./giph-search.component.css']
})
export class GiphSearchComponent implements OnInit {

  errorMessage: String;
  giphs: Array<Giph>;
  giph: Giph;
  searchTerm: String;
  showBookmark: Boolean;
  userName: String;
  message: String;
  messageDisplay: String;
  errorDisplay: String;

  constructor(private giphService: GiphService, private activatedRoute: ActivatedRoute, private authService: AuthenticationService) {
    this.giph = new Giph();
    this.giphs = [];
    this.activatedRoute.params.subscribe(param => {
      this.searchTerm = param.term;

      let resp = this.giphService.searchGiphs(this.searchTerm).subscribe(res => {
        this.giphs = res['data'];
      });
    });
  }

  ngOnInit() {
    this.userName = this.authService.getUserName();
    this.showBookmark = true;
    this.messageDisplay = "none";
    this.errorDisplay = "none";
  }

  bookmarkGif(gifId: String) {
    this.messageDisplay = "none";
    this.errorDisplay = "none";

    this.giphService.bookMarkGiph(gifId, this.userName).subscribe(res => {
      this.messageDisplay = "block";
      this.message = "Bookmark added";
    },
      error => {
        this.errorMessage = error.error.message;
        this.errorDisplay = "block";
      }
    );
  }

  hideError() {
    this.errorDisplay = "none";
  }

  hideMessage() {
    this.messageDisplay = "none";
  }

}
