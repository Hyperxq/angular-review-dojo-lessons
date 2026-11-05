import { Service, computed, signal } from '@angular/core';

const STORAGE_KEY = 'review-dojo-lessons:reading';

function read(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'on';
  } catch {
    return false;
  }
}

/** The reader's choice to hide the header and the chapter rail; only chapter pages act on it. */
@Service()
export class ReadingMode {
  readonly on = signal(read());
  /** Set by the chapter page while it is shown, so the index never loses its header. */
  readonly available = signal(false);
  readonly hidesChrome = computed(() => this.on() && this.available());

  toggle(): void {
    this.set(!this.on());
  }

  set(on: boolean): void {
    this.on.set(on);
    try {
      localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off');
    } catch {
      // Storage blocked: the choice lasts until reload.
    }
  }
}

export type ReadingCommand = 'toggle' | 'exit' | 'previous' | 'next';

/** Maps a document keydown to a reading-mode action, or null when the key belongs to something else. */
export function readingCommand(event: KeyboardEvent, reading: boolean): ReadingCommand | null {
  if (event.metaKey || event.ctrlKey || event.altKey) return null;
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"])')) return null;

  if (event.key === 'r' || event.key === 'R') return 'toggle';
  if (!reading) return null;
  if (event.key === 'Escape') return 'exit';
  // The marble player steps frames with the arrows.
  if (target?.closest('app-marbles-player')) return null;
  if (event.key === 'ArrowLeft') return 'previous';
  if (event.key === 'ArrowRight') return 'next';
  return null;
}
