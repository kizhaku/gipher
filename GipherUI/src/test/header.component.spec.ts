import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterService } from 'src/app/services/router.service';
import { By } from '@angular/platform-browser';


describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let debugElement: any;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        HeaderComponent
      ],
      providers: [
        AuthenticationService,
        RouterService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have navbar gipher`, () => {
    const compiled = fixture.debugElement.query(By.css('.navbar-brand'));

    expect(compiled.nativeElement.textContent).toBe('Gipher');
  });

  it(`should have navbar bookmarks`, () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.nav-bookmarks'));
    element = debugElement.nativeElement;

    expect(element.textContent).toBe('Bookmarks');
  });

  it(`should have navbar recommended`, () => {
    component.isLoggedIn = true;
    fixture.detectChanges();
    debugElement = fixture.debugElement.query(By.css('.nav-recommended'));
    element = debugElement.nativeElement;

    expect(element.textContent).toBe('Recommended');
  });
});
