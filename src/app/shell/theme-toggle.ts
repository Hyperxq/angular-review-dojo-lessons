import { Component, DOCUMENT, computed, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'review-dojo-lessons:theme';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button type="button" class="button button--quiet" (click)="toggle()" [attr.aria-label]="label()">
      @if (effective() === 'dark') {
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      } @else {
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
      }
      <span class="text">{{ effective() === 'dark' ? 'Light' : 'Dark' }}</span>
    </button>
  `,
  styles: `
    @media (max-width: 30rem) {
      .text {
        display: none;
      }
    }
  `,
})
export class ThemeToggle {
  private readonly root = inject(DOCUMENT).documentElement;
  private readonly media = globalThis.matchMedia?.('(prefers-color-scheme: dark)');
  private readonly chosen = signal<Theme | null>((this.root.dataset['theme'] as Theme) ?? null);

  protected readonly effective = computed<Theme>(
    () => this.chosen() ?? (this.media?.matches ? 'dark' : 'light'),
  );
  protected readonly label = computed(() =>
    this.effective() === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme',
  );

  protected toggle(): void {
    const next: Theme = this.effective() === 'dark' ? 'light' : 'dark';
    this.chosen.set(next);
    this.root.dataset['theme'] = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the choice lasts until reload.
    }
  }
}
