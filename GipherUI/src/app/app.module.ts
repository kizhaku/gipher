import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule, MatToolbarRow} from '@angular/material/toolbar';
import { GiphViewComponent } from './giph-view/giph-view.component';
import { GiphComponent } from './giph/giph.component';
import { GiphService } from './services/giph.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    GiphViewComponent,
    GiphComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [
    GiphService,
    AuthenticationService,
    RouterService,
    CanActivateRouteGuard,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
