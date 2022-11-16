import { Component, OnInit } from '@angular/core';
import { GiphService } from '../services/giph.service';
import { Giph } from '../models/giph';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-giph-view',
  templateUrl: './giph-view.component.html',
  styleUrls: ['./giph-view.component.css']
})
export class GiphViewComponent implements OnInit {

  errorMessage: String;
  giphs: Array<Giph>;
  giph: Giph;
  showBookmark: Boolean;
  userName: String;
  message: String;
  messageDisplay: String;
  errorDisplay: String;

  constructor(private giphService: GiphService, private authService: AuthenticationService) {
    this.giph = new Giph();
    this.giphs = [];
    this.showBookmark = true;
  }

  ngOnInit() {
    let resp = this.giphService.fetchGiphs().subscribe(res => {
      this.giphs = res['data'];
      let x=1;
    });

    this.userName = this.authService.getUserName();
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
