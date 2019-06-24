import { Component, OnInit } from '@angular/core';
import { GiphService } from '../services/giph.service';
import { Giph } from '../models/giph';

@Component({
  selector: 'app-giph-view',
  templateUrl: './giph-view.component.html',
  styleUrls: ['./giph-view.component.css']
})
export class GiphViewComponent implements OnInit {

  errorMessage: String;
  giphs: Array<Giph>;
  giph: Giph;

  constructor(private giphService: GiphService) {
    this.giph = new Giph();
    this.giphs = [];
  }

  ngOnInit() {
    let resp = this.giphService.fetchNotesFromServer().subscribe(res => {
      this.giphs = res['data'];
      console.log(this.giphs);
    });
  }

}
