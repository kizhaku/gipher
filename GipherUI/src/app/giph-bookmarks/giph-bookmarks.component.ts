import { Component, OnInit } from '@angular/core';
import { GiphService } from '../services/giph.service';
import { Giph } from '../models/giph';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { GiphBookmark } from '../models/giphBookmark';

@Component({
  selector: 'app-giph-bookmarks',
  templateUrl: './giph-bookmarks.component.html',
  styleUrls: ['./giph-bookmarks.component.css']
})
export class GiphBookmarksComponent implements OnInit {

  errorMessage: String;
  giphs: Array<Giph>;
  giph: Giph;
  searchTerm: String;
  userName: String;
  gifIds: Array<String>;
  showBookmark: Boolean;
  errorDisplay: String;

  constructor(private giphService: GiphService, private activatedRoute: ActivatedRoute, authService: AuthenticationService) {
    this.giph = new Giph();
    this.giphs = [];
    this.userName = authService.getUserName();
    this.giphService.fetchBookmarkedGiphs(this.userName).subscribe(data => {
      this.gifIds = data.map(item => {
        return item.gifId;
      })

      if(this.gifIds.length) {
        this.giphService.fetchGiphsById(this.gifIds.join()).subscribe(res => {
          this.giphs = res['data'];
        });
      }
      else {
        this.errorDisplay = "block";
        this.errorMessage = "No bookmark found.";
      }
    });
  }

  ngOnInit() {
    this.errorDisplay = "none";
    this.showBookmark = false;
  }

  deleteBookmark(gifId: String) {
    this.giphService.deleteBookmark(gifId, this.userName).subscribe(data => {
      if(data['status'] === "success") {
        //Remove gif from view.
        let filteredGiphs = this.giphs.filter(x => {
          if(x.id != gifId) {
            return true;
          }
        });   
        this.giphs = filteredGiphs;
      }
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

}
