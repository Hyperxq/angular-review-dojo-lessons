import { Component, DestroyRef, computed, inject, input, linkedSignal, signal } from '@angular/core';
import type { MarbleDiagram, MarbleEvent, MarbleKind, MarbleRow } from '../parse/marbles';

/** Frames per second while playing; slow enough to read each emission. */
const FPS = 4;
/** With reduced motion the playhead jumps one whole frame at this interval. */
const STEP_MS = 550;

const KIND_TEXT: Record<MarbleKind, string> = {
  value: 'emits',
  complete: 'completes',
  error: 'errors',
  cancel: 'is cancelled',
};

@Component({
  selector: 'app-marbles-player',
  host: { '(keydown)': 'onKey($event)' },
  template: `
    <figure class="player" [attr.aria-labelledby]="captionId">
      <figcaption [id]="captionId" class="visually-hidden">
        Marble diagram with {{ diagram().rows.length }} streams over {{ frames() }} frames.
      </figcaption>

      <div class="stage">
        <div class="grid" [style.--frames]="frames()" [style.--rows]="diagram().rows.length">
          @for (row of diagram().rows; track $index; let i = $index) {
            <div class="label" [style.grid-row]="i + 1">{{ row.label }}</div>
            <div class="lane" [style.grid-row]="i + 1">
              <div class="axis">
                <span class="rail" [style.left]="pos(row.start, 0)" [style.width]="span(row)"></span>
                <span
                  class="rail rail--live"
                  [style.left]="pos(row.start, 0)"
                  [style.width]="span(row)"
                  [style.transform]="'scaleX(' + progress(row) + ')'"
                ></span>
                @for (event of row.events; track event.frame) {
                  <span
                    class="mark"
                    [class]="'mark mark--' + event.kind"
                    [class.is-on]="event.frame + 0.5 <= time()"
                    [style.left]="pos(event.frame)"
                    [style.--tone]="event.value ? tone(event.value) : null"
                    aria-hidden="true"
                  >
                    @switch (event.kind) {
                      @case ('value') { {{ event.value }} }
                      @case ('error') {
                        <svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7 7 17" /></svg>
                      }
                      @case ('cancel') {
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M6.5 17.5l11-11" /></svg>
                      }
                    }
                  </span>
                }
              </div>
              @if (row.note) {
                <p class="note">{{ row.note }}</p>
              }
            </div>
          }
          <div class="ruler" [style.grid-row]="diagram().rows.length + 1" aria-hidden="true">
            <div class="axis">
              @for (tick of ticks(); track tick) {
                <span class="tick" [class.tick--major]="tick % 5 === 0" [style.left]="pos(tick)">
                  @if (tick % 5 === 0) {
                    <span>{{ tick }}</span>
                  }
                </span>
              }
            </div>
          </div>
          <div class="head-lane" aria-hidden="true">
            <div class="axis">
              <span class="head" [style.left]="pos(time(), 0)"></span>
            </div>
          </div>
        </div>
      </div>

      <div class="controls">
        <button type="button" class="button button--primary play" (click)="toggle()">
          @if (playing()) {
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg>
            Pause
          } @else {
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" /></svg>
            {{ time() >= frames() ? 'Replay' : 'Play' }}
          }
        </button>
        <button type="button" class="button button--quiet" (click)="step(-1)" [disabled]="time() <= 0" aria-label="Back one frame">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
        </button>
        <button type="button" class="button button--quiet" (click)="step(1)" [disabled]="time() >= frames()" aria-label="Forward one frame">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
        </button>
        <input
          class="scrub"
          type="range"
          min="0"
          [max]="frames()"
          step="1"
          [value]="frame()"
          (input)="seek($any($event.target).valueAsNumber)"
          aria-label="Time"
          [attr.aria-valuetext]="'Frame ' + frame() + ' of ' + frames()"
        />
        <output class="clock" aria-hidden="true">{{ frame() }}<span>/{{ frames() }}</span></output>
      </div>

      <div class="foot">
        <ul class="legend" aria-label="Legend">
          @for (kind of kinds(); track kind) {
            <li><span [class]="'mark mark--' + kind + ' is-on'" aria-hidden="true">
              @switch (kind) {
                @case ('value') { a }
                @case ('error') { <svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7 7 17" /></svg> }
                @case ('cancel') { <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /><path d="M6.5 17.5l11-11" /></svg> }
              }
            </span>{{ legend[kind] }}</li>
          }
        </ul>
        @if (source()) {
          <details class="source">
            <summary>Text version</summary>
            <pre>{{ source() }}</pre>
          </details>
        }
      </div>

      <ul class="visually-hidden">
        @for (row of diagram().rows; track $index) {
          <li>{{ describeRow(row) }}</li>
        }
      </ul>
      <p class="visually-hidden" aria-live="polite">{{ announcement() }}</p>
    </figure>
  `,
  styleUrl: './marbles-player.css',
})
export class MarblesPlayer {
  readonly diagram = input.required<MarbleDiagram>();
  readonly source = input('');

  protected readonly captionId = `marbles-${Math.random().toString(36).slice(2, 8)}`;
  protected readonly legend = { value: 'value', complete: 'complete', error: 'error', cancel: 'cancelled' };

  protected readonly frames = computed(() => this.diagram().frames);
  /** Playhead position in frames. Starts at the end so the whole diagram is readable before playing. */
  readonly time = linkedSignal(() => this.frames());
  readonly playing = signal(false);
  readonly frame = computed(() => Math.floor(this.time()));
  protected readonly announcement = signal('');

  protected readonly ticks = computed(() => Array.from({ length: this.frames() }, (_, i) => i));
  protected readonly kinds = computed(() => {
    const present = new Set(this.diagram().rows.flatMap((row) => row.events.map((event) => event.kind)));
    return (['value', 'complete', 'error', 'cancel'] as const).filter((kind) => present.has(kind));
  });
  private readonly tones = computed(() => {
    const values = this.diagram().rows.flatMap((row) =>
      row.events.flatMap((event) => (event.value === undefined ? [] : [event.value])),
    );
    return new Map([...new Set(values)].map((value, i) => [value, `var(--m${i % 6})`]));
  });

  private readonly reducedMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  private cancelTick: (() => void) | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.pause());
  }

  protected pos(frame: number, centre = 0.5): string {
    return `${((frame + centre) / this.frames()) * 100}%`;
  }

  protected span(row: MarbleRow): string {
    return `${((this.lineEnd(row) - row.start) / this.frames()) * 100}%`;
  }

  protected progress(row: MarbleRow): number {
    const length = this.lineEnd(row) - row.start;
    return length <= 0 ? 0 : Math.min(Math.max((this.time() - row.start) / length, 0), 1);
  }

  protected tone(value: string): string {
    return this.tones().get(value) ?? 'var(--m0)';
  }

  toggle(): void {
    if (this.playing()) this.pause();
    else this.play();
  }

  play(): void {
    if (this.time() >= this.frames()) this.time.set(0);
    this.announcement.set('');
    this.playing.set(true);
    if (this.reducedMotion) {
      const id = setInterval(() => this.advance(1), STEP_MS);
      this.cancelTick = () => clearInterval(id);
      return;
    }
    let last = performance.now();
    let id = 0;
    const tick = (now: number) => {
      this.advance(((now - last) / 1000) * FPS);
      last = now;
      if (this.playing()) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    this.cancelTick = () => cancelAnimationFrame(id);
  }

  pause(): void {
    this.cancelTick?.();
    this.cancelTick = null;
    this.playing.set(false);
  }

  step(direction: 1 | -1): void {
    this.pause();
    const time = this.time();
    const next = direction === 1 ? Math.floor(time) + 1 : Math.ceil(time) - 1;
    this.seek(next);
  }

  seek(frame: number): void {
    this.pause();
    const clamped = Math.min(Math.max(Math.round(frame), 0), this.frames());
    this.time.set(clamped);
    this.announcement.set(this.describeFrame(clamped - 1));
  }

  protected onKey(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (target.closest('summary, pre, input')) return;
    if (event.key === ' ' && target.tagName !== 'BUTTON') {
      event.preventDefault();
      this.toggle();
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this.step(event.key === 'ArrowRight' ? 1 : -1);
    }
  }

  protected describeRow(row: MarbleRow): string {
    const parts = row.events.map((event) => `${this.describeEvent(event)} at frame ${event.frame}`);
    const start = row.start > 0 ? ` (starts at frame ${row.start})` : '';
    const note = row.note ? `. Note: ${row.note}` : '';
    return `${row.label}${start}: ${parts.join(', ') || 'nothing happens'}${note}.`;
  }

  private describeFrame(frame: number): string {
    if (frame < 0) return 'Start of the timeline.';
    const happenings = this.diagram().rows.flatMap((row) =>
      row.events.filter((event) => event.frame === frame).map((event) => `${row.label} ${this.describeEvent(event)}`),
    );
    return `Frame ${frame}: ${happenings.join('; ') || 'nothing happens'}.`;
  }

  private describeEvent(event: MarbleEvent): string {
    return event.value === undefined ? KIND_TEXT[event.kind] : `${KIND_TEXT.value} ${event.value}`;
  }

  private advance(frames: number): void {
    const next = this.reducedMotion ? Math.floor(this.time()) + frames : this.time() + frames;
    if (next >= this.frames()) {
      this.time.set(this.frames());
      this.pause();
    } else {
      this.time.set(next);
    }
  }

  private lineEnd(row: MarbleRow): number {
    const last = row.events.at(-1);
    return last && last.kind !== 'value' ? last.frame + 0.5 : row.end;
  }
}
