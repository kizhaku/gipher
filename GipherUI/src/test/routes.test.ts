import { Component, NgModule } from "@angular/core";
import { Routes } from "@angular/router";

@Component({
  template: '<router-outlet></router-outlet>'
})
export class DashboardDummyComponent {}

@Component({
  template: 'Giph View Component'
})
export class GiphViewDummyComponent {}

@Component({
  template: 'Giph Search Component'
})
export class GiphSearchDummyComponent {}

export const routes: Routes = [
  {
    path: 'home', component: DashboardDummyComponent,
    children: [
      {path: 'view', component: GiphViewDummyComponent},
      {path: 'search/:term', component: GiphSearchDummyComponent}
    ]
  }
];