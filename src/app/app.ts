import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeToggle } from './shell/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ThemeToggle],
  template: `
    <a class="skip" href="#main">Skip to the lesson</a>
    <header class="bar">
      <a class="brand" routerLink="/">
        <span class="seal" aria-hidden="true"></span>
        <span>Review Dojo <span class="brand__sub">Lessons</span></span>
      </a>
      <app-theme-toggle />
    </header>
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      display: block;
      min-height: 100dvh;
    }
    .skip {
      position: absolute;
      left: var(--space-4);
      top: -3rem;
      padding: var(--space-2) var(--space-4);
      background: var(--ink);
      color: var(--paper);
      border-radius: var(--radius-m);
      z-index: 10;
    }
    .skip:focus {
      top: var(--space-3);
    }
    .bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      max-width: 82rem;
      margin: 0 auto;
      padding: var(--space-4) var(--space-5);
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      font: 600 var(--step-1) / 1 var(--font-text);
      text-decoration: none;
    }
    .brand__sub {
      color: var(--ink-3);
      font-weight: 400;
      font-style: italic;
    }
    .seal {
      width: 1.375rem;
      height: 1.375rem;
      border-radius: 5px;
      background: var(--accent);
      box-shadow: inset 0 0 0 3px color-mix(in oklab, var(--accent) 70%, var(--paper));
    }
    main:focus {
      outline: none;
    }
    @media (max-width: 40rem) {
      .bar {
        padding: var(--space-3) var(--space-4);
      }
    }
  `,
})
export class App {}
