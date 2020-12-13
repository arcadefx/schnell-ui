import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'schnell-ui'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('schnell-ui');
  });

  it('should render password with help', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#passwordHelp').textContent).toContain('Must be 8 atleast characters');
  });

  describe('gotoWebsite', () => {
    it('should open window to requested website and window name', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(window, 'open');
      app.gotoWebsite();
      const website = 'http://onecause.com';
      expect(window.open).toHaveBeenCalledWith(website, '_top')
    })
  });

  describe('getToken', () => {
    it('should return true if param passed is a valid 24hr hhmm number', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const re = /^(0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/gm
      const result = re.test(app.getToken());
      expect(result).toBeTruthy();
    });
  });

  describe('resetForm', () => {
    it('should reset all form related values', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      const event = {
        which: false,
        keyCode: 32
      }
      app.resetForm();
      // saving time by putting them all here
      expect(app.Username).toEqual('');
      expect(app.Password).toEqual('');
      expect(app.Status).toEqual('');
      expect(app.Message).toEqual('');
    });  
  });

  describe('authenticateUser', () => {
    it('should authenticate and go to the website', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(window, 'open');
      app.Username = 'user@some.com';
      app.Password = 'tetetetetet';
      app.Status = 'success'
      spyOn(app.httpService, 'sendPostRequest').and.callFake( function(): Observable<object> {
        return new Observable( observer => {
          observer.next( { Status: 'success' } )
        });
      });
      app.authenticateUser();
      const website = 'http://onecause.com';
      expect(window.open).toHaveBeenCalledWith(website, '_top')
    });

    it('should not authenticate and fail gracefully', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      spyOn(window, 'open');
      app.Status = 'failure'
      spyOn(app.httpService, 'sendPostRequest').and.callFake( function(): Observable<object> {
        return new Observable( observer => {
          observer.next( { Status: 'failure' } )
        });
      });
      app.authenticateUser();
      expect(window.open).not.toHaveBeenCalled();
    });
  });
});
