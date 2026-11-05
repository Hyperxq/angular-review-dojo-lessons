import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-copy-button',
  template: `
    <button type="button" class="button button--quiet copy" (click)="copy()" [attr.aria-label]="label()">
      @if (copied()) {
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        Copied
      } @else {
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>
        Copy
      }
    </button>
    <span class="visually-hidden" aria-live="polite">{{ copied() ? 'Copied to the clipboard' : '' }}</span>
  `,
  styles: `
    .copy {
      min-height: 2rem;
      padding: 0 var(--space-2);
      font-size: var(--step--1);
      color: var(--ink-2);
    }
  `,
})
export class CopyButton {
  readonly text = input.required<string>();
  readonly label = input('Copy');
  protected readonly copied = signal(false);
  private timer: ReturnType<typeof setTimeout> | undefined;

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.text());
      this.copied.set(true);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.copied.set(false), 1600);
    } catch {
      // Clipboard denied (insecure origin or permissions): the text stays selectable.
    }
  }
}
