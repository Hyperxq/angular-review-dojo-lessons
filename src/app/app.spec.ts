import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { ReadingMode } from './shell/reading-mode';

describe('App', () => {
  beforeEach(() => localStorage.clear());

  it('hides the header while reading mode is on for a chapter', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('header.bar')).not.toBeNull();

    const mode = TestBed.inject(ReadingMode);
    mode.available.set(true);
    mode.set(true);
    fixture.detectChanges();
    expect(el.querySelector('header.bar')).toBeNull();

    mode.set(false);
    fixture.detectChanges();
    expect(el.querySelector('header.bar')).not.toBeNull();
  });
});
