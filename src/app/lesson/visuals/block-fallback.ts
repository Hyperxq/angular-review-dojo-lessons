import { Component, input, isDevMode } from '@angular/core';

/** Shows a visual block that failed to parse as the plain text it already is on GitHub. */
@Component({
  selector: 'app-block-fallback',
  template: `
    <pre tabindex="0">{{ source() }}</pre>
    @if (dev) {
      <p class="warning" role="note">
        This {{ kind() }} block did not parse (line {{ line() }}): {{ error() }} It is shown as plain text.
      </p>
    }
  `,
  styles: `
    :host {
      display: block;
      margin: 0 0 var(--space-5);
      max-width: var(--measure);
    }
    pre {
      margin: 0;
      padding: var(--space-4);
      border-radius: var(--radius-m);
      background: var(--paper-sunk);
      overflow-x: auto;
      font-size: 0.875rem;
      line-height: 1.6;
    }
    .warning {
      margin: var(--space-2) 0 0;
      font-size: var(--step--1);
      color: var(--warning);
    }
  `,
})
export class BlockFallback {
  readonly kind = input.required<string>();
  readonly source = input.required<string>();
  readonly error = input.required<string>();
  readonly line = input.required<number>();
  protected readonly dev = isDevMode();
}
