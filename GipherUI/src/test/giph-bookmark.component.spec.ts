import { fakeAsync, ComponentFixture, async, TestBed, tick } from "@angular/core/testing";
import { FormsModule, FormGroup, ReactiveFormsModule, FormControl } from "@angular/forms";
import { BrowserModule, By } from "@angular/platform-browser";
import { MatFormFieldModule, MatInputModule, MatCardModule, MatToolbarModule, MatIconModule, MatTabsModule } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { of, Observable, throwError } from 'rxjs';
import { GiphService } from "src/app/services/giph.service";
import { GiphComponent } from "src/app/giph/giph.component";
import { Giph } from "src/app/models/giph";
import { GiphBookmarksComponent } from "src/app/giph-bookmarks/giph-bookmarks.component";
import { GiphBookmark } from "src/app/models/giphBookmark";
import { AuthenticationService } from "src/app/services/authentication.service";

describe('GiphBookmarksComponent', () => {
  let fixture: ComponentFixture<GiphBookmarksComponent>;
  let component: GiphBookmarksComponent;
  let giphService: GiphService;
  let debugElement: any;
  let element: any;
  let errorMessage: any;
  let spyFetchBookmarkedGifs: any;
  let spyBookmarkGif: any;
  let spyFetchGifs: any;
  let giph: Giph;
  let giphs: Array<Giph>;
  let bookmarkedGif: GiphBookmark;
  let bookmarkedGifs: Array<GiphBookmark>;
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
        RouterTestingModule
      ],
      providers: [
        GiphService,
        AuthenticationService
      ],
      declarations: [
        GiphBookmarksComponent,
        GiphComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    giphService = TestBed.get(GiphService);

    bookmarkedGif = new GiphBookmark();
    bookmarkedGifs = new Array<GiphBookmark>();
    bookmarkedGif = testData.bookmarkedGif;
    bookmarkedGifs.push(bookmarkedGif);

    giph = new Giph();
    giphs = new Array<Giph>();
    giph.id = testData.giphs[0].id;
    giph.type = testData.giphs[0].type;
    giph.images = testData.giphs[0].images;
    giphs.push(giph);

    spyFetchBookmarkedGifs = spyOn(giphService, 'fetchBookmarkedGiphs').and.returnValue(of(bookmarkedGifs));
    spyFetchGifs = spyOn(giphService, 'fetchGiphsById').and.returnValue(of({data: giphs}));

    fixture = TestBed.createComponent(GiphBookmarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recommended gifs on load', fakeAsync(() => {
    fixture.detectChanges();

    expect(component.giphs).toBe(giphs);
  }));

  it('it should delete bookmark', fakeAsync(() => {
    spyBookmarkGif = spyOn(giphService, 'deleteBookmark').and.returnValue(of(testData.deleteBookmarkResponse));

    component.deleteBookmark('123');
    fixture.detectChanges();

    expect(component.giphs.length).toBe(0, 'the giph should be removed from the list');
  }));

  it('it should show error message for delete bookmark failure', fakeAsync(() => {
    spyBookmarkGif = spyOn(giphService, 'deleteBookmark').and.returnValue(throwError(testData.errorMessage));
    debugElement = fixture.debugElement.query(By.css('.alert-danger'));

    component.deleteBookmark('123');
    fixture.detectChanges();

    expect(debugElement.nativeElement.textContent).toContain(testData.errorMessage.error.message, 'bookmark delete failure message displayed.')
    expect(component.giphs.length).toBe(1, 'the giph should not be removed from the list');
  }));
  
});