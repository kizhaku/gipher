import { Component, Input, OnInit } from '@angular/core';
import { Giph } from '../models/giph';

@Component({
  selector: 'app-giph',
  templateUrl: './giph.component.html',
  styleUrls: ['./giph.component.css']
})
export class GiphComponent implements OnInit {

  @Input()
  giph: Giph;

  constructor() {

  }

  ngOnInit() {

  }

}
