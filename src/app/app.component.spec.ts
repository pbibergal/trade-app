import { async, inject, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Store } from '@ngxs/store';
import { from } from 'rxjs';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let storeMock;

  beforeEach(async(() => {
    storeMock = {
      dispatch: jasmine.createSpy('dispatch'),
      pipe: jasmine.createSpy('pipe').and.returnValue(from([{
        requestTimeout: 5000,
      }])),
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: [
        {
          provide: Store,
          useValue: storeMock,
        },
        Router,
      ],
    }).compileComponents();
  }));

  it('should create the app', inject([Router], (router: Router) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));
});
