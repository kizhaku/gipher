import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/header/header.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterService } from 'src/app/services/router.service';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        AuthenticationService,
        RouterService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GipherUI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.title).toEqual('GipherUI');
  });
  
});
