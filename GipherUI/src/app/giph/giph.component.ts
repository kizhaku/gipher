import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Giph } from '../models/giph';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { GiphService } from '../services/giph.service';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-giph',
  templateUrl: './giph.component.html',
  styleUrls: ['./giph.component.css']
})
export class GiphComponent{

  @Input()
  giph: Giph;
  @Input()
  showBookmark: boolean;

  @Output()
  delBookmark = new EventEmitter<String>();
  @Output()
  addBookmark = new EventEmitter<String>();

  constructor(private matIconRegistry: MatIconRegistry, 
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('bookmark', this.domSanitizer.bypassSecurityTrustResourceUrl(environment.bookmarkImage));
    this.matIconRegistry.addSvgIcon('delete', this.domSanitizer.bypassSecurityTrustResourceUrl(environment.deleteImage));
  }

  bookmarkGif(gifId: String) {
    this.addBookmark.emit(gifId);
  }

  deleteBookmark(gifId: String) {
    this.delBookmark.emit(gifId);
  }

}
