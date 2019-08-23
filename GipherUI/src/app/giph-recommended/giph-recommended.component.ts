import { Component, OnInit } from '@angular/core';
import { GiphService } from '../services/giph.service';
import { Giph } from '../models/giph';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { GiphBookmark } from '../models/giphBookmark';

@Component({
  selector: 'app-giph-recommended',
  templateUrl: './giph-recommended.component.html',
  styleUrls: ['./giph-recommended.component.css']
})
export class GiphRecommendedComponent implements OnInit {

  errorMessage: String;
  giphs: Array<Giph>;
  giph: Giph;
  searchTerm: String;
  userName: String;
  gifIds: Array<String>;
  showBookmark: Boolean;
  message: String;
  messageDisplay: String;
  errorDisplay: String;

  constructor(private giphService: GiphService, private activatedRoute: ActivatedRoute, authService: AuthenticationService) {
    this.giph = new Giph();
    this.giphs = [];
    this.showBookmark = true;
    this.userName = authService.getUserName();
    this.giphService.fetchRecommendedGiphs().subscribe(data => {
      this.gifIds = data.map(item => {
        return item.gifId;
      })

      if(this.gifIds.length) {
        this.giphService.fetchGiphsById(this.gifIds.join()).subscribe(res => {
          this.giphs = res['data'];
        });
      }
    });
  }

  ngOnInit() {
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

}
