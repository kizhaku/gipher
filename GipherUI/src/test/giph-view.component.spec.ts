import { LoginComponent } from "src/app/login/login.component";
import { fakeAsync, ComponentFixture, async, TestBed, tick } from "@angular/core/testing";
import { AuthenticationService } from "src/app/services/authentication.service";
import { RouterService } from "src/app/services/router.service";
import { UserService } from "src/app/services/user.service";
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatIconModule, MatTabsModule } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Observable, throwError } from 'rxjs';
import { GiphViewComponent } from "src/app/giph-view/giph-view.component";
import { GiphService } from "src/app/services/giph.service";
import { GiphComponent } from "src/app/giph/giph.component";
import { Giph } from "src/app/models/giph";

describe('GiphViewComponent', () => {
  let fixture: ComponentFixture<GiphViewComponent>;
  let component: GiphViewComponent;
  let authenticationService: AuthenticationService;
  let routerService: RouterService;
  let giphService: GiphService;
  let debugElement: any;
  let element: any;
  let errorMessage: any;
  let spyFetchGifs: any;
  let spyBookmarkGif: any;
  let giph: Giph;
  let giphs: Array<Giph>;
  let testData = {
    giphs: [
      {type: 'gif',
        id: '1',
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
        message: 'Error adding bookmark'
      }
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
        RouterTestingModule
      ],
      providers: [
        AuthenticationService,
        GiphService
      ],
      declarations: [
        GiphViewComponent,
        GiphComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphViewComponent);
    authenticationService = fixture.debugElement.injector.get(AuthenticationService);
    giphService = fixture.debugElement.injector.get(GiphService);

    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('it should bookmark gif', fakeAsync(() => {
    giph = new Giph();
    giphs = new Array<Giph>();
    giph.id = 'testData.giphs[0].id';
    giph.type = testData.giphs[0].type;
    giph.images = testData.giphs[0].images;
    giphs.push(giph);

    component.giphs = giphs;
    component.userName = 'admin';
    spyBookmarkGif = spyOn(giphService, 'bookMarkGiph').and.returnValue(of(testData.bookmarkResponse));
    debugElement = fixture.debugElement.query(By.css('.alert-success'));

    component.bookmarkGif('1');
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(testData.bookmarkMessage, 'bookmark added message displayed.');
  }));

  it('it should show error message of bookmark failure', fakeAsync(() => {
    component.userName = 'admin';
    spyBookmarkGif = spyOn(giphService, 'bookMarkGiph').and.returnValue(throwError(testData.errorMessage));
    debugElement = fixture.debugElement.query(By.css('.alert-danger'));

    component.bookmarkGif('1');
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(testData.errorMessage.error.message, 'bookmark add failure message displayed.')
  }));
  
});