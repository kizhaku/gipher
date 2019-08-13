import { Component, Input, OnInit } from '@angular/core';
import { Giph } from '../models/giph';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { GiphService } from '../services/giph.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-giph',
  templateUrl: './giph.component.html',
  styleUrls: ['./giph.component.css']
})
export class GiphComponent implements OnInit {

  @Input()
  giph: Giph;
  @Input()
  showBookmark: boolean;

  constructor(private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer, 
    private giphService: GiphService,
    private authService: AuthenticationService) {
    this.matIconRegistry.addSvgIcon('bookmark', this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/baseline-bookmark-24px.svg'))
  }

  ngOnInit() {

  }

  bookmarkGif(id) {
    console.log(id);
    let userName = this.authService.getUserName();

    this.giphService.bookMarkGiph(id, userName).subscribe(res => {

    });
  }

}
