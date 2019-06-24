import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GiphViewComponent } from './giph-view/giph-view.component';
import { LoginComponent } from './login/login.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';

const routes: Routes = [
  {
    path: 'home', component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      {path: 'view', component: GiphViewComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/home/view', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
