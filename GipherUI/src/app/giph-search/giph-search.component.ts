import { Component, OnInit } from '@angular/core';
import { GiphService } from '../services/giph.service';
import { Giph } from '../models/giph';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private giphService: GiphService, private activatedRoute: ActivatedRoute) {
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
  }

}
