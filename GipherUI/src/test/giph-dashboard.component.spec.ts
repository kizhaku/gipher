import { fakeAsync, ComponentFixture, async, TestBed, tick } from "@angular/core/testing";
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatIconModule, MatTabsModule } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { DashboardComponent } from "src/app/dashboard/dashboard.component";
import { RouterService } from "src/app/services/router.service";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { routes } from "src/app/app-routing.module";
import { GiphViewComponent } from "src/app/giph-view/giph-view.component";
import { GiphSearchComponent } from "src/app/giph-search/giph-search.component";
import { GiphBookmarksComponent } from "src/app/giph-bookmarks/giph-bookmarks.component";
import { GiphRecommendedComponent } from "src/app/giph-recommended/giph-recommended.component";
import { LoginComponent } from "src/app/login/login.component";
import { RegisterComponent } from "src/app/register/register.component";
import { GiphComponent } from "src/app/giph/giph.component";
import { CanActivateRouteGuard } from "src/app/can-activate-route.guard";
import { AuthenticationService } from "src/app/services/authentication.service";

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;
  let location: Location;
  let debugElement: any;
  let element: any;
  let router: Router;
  let searchTerm: FormControl;
  let searchForm: FormGroup;
  let routerService: RouterService;
  let spyRouteToSearch: any;

  let testData = {
    giphs: [
      {type: 'gif',
        id: '123',
        images: {
          fixed_width_downsampled: {
            url: 'https://giphy.com/embed/rT3Nqse3Lmj5u'
          }
        }
      },
    ],
    bookmarkResponse: {},
    bookmarkMessage: 'Bookmark added',
    errorMessage: {
      error: {
        message: 'Error deleting bookmark'
      }
    },
    bookmarkedGif: {
      id: '1',
      gifId: '123',
      userName: 'admin'
    },
    deleteBookmarkResponse: {
      status: 'success'
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatToolbarModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule,
        MatTabsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        RouterService,
        CanActivateRouteGuard,
        AuthenticationService
      ],
      declarations: [
        DashboardComponent,
        GiphViewComponent,
        GiphSearchComponent,
        GiphBookmarksComponent,
        GiphRecommendedComponent,
        LoginComponent,
        RegisterComponent,
        GiphComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(DashboardComponent);
    routerService = fixture.debugElement.injector.get(RouterService);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

   it('should contain search', () => {
    debugElement = fixture.debugElement.query(By.css('.btn'));
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toBe('Search');
  });
  
});