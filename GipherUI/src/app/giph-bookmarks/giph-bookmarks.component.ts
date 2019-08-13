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

  constructor(private giphService: GiphService, private activatedRoute: ActivatedRoute, authService: AuthenticationService) {
    this.giph = new Giph();
    this.giphs = [];
    this.showBookmark = false;
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
    });
  }

  ngOnInit() {
  }

}
