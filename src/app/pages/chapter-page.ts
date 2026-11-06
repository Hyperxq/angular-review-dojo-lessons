import { httpResource } from '@angular/common/http';
import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { splitLesson } from '../lesson/parse/lesson';
import { LessonBody } from '../lesson/render/lesson-body';
import { renderInline } from '../lesson/render/segments';
import { Catalog, chapterSlug, clock, lessonPages } from '../lessons/catalog';
import { Progress, chapterKey, questionKey } from '../lessons/progress';
import { CopyButton } from '../shared/copy-button';
import { ReadingMode, readingCommand } from '../shell/reading-mode';

@Component({
  selector: 'app-chapter-page',
  imports: [RouterLink, LessonBody, CopyButton],
  templateUrl: './chapter-page.html',
  styleUrl: './chapter-page.css',
  host: { '(document:keydown)': 'onKey($event)', '(window:scroll)': 'measureProgress()' },
})
export class ChapterPage {
  readonly topic = input.required<string>();
  readonly page = input.required<string>();

  private readonly catalog = inject(Catalog);
  protected readonly progress = inject(Progress);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private readonly injector = inject(Injector);
  protected readonly reading = inject(ReadingMode);

  protected readonly source = httpResource.text(() => `lessons/${this.topic()}.md`);
  protected readonly lesson = computed(() => (this.source.hasValue() ? splitLesson(this.source.value()) : null));
  protected readonly pages = computed(() => {
    const lesson = this.lesson();
    return lesson ? lessonPages(lesson) : [];
  });
  protected readonly index = computed(() => this.pages().findIndex((page) => page.slug === this.page()));
  protected readonly current = computed(() => this.pages()[this.index()]);
  protected readonly previous = computed(() => this.pages()[this.index() - 1]);
  protected readonly next = computed(() => this.pages()[this.index() + 1]);
  protected readonly entry = computed(() => this.catalog.entry(this.topic()));
  protected readonly name = computed(() => this.entry()?.name ?? this.lesson()?.title.split(':')[0] ?? this.topic());

  protected readonly exercise = computed(() => {
    const chapter = this.current()?.chapter;
    if (!chapter?.exercise) return null;
    const folder = this.entry()?.chapters.find((c) => c.number === chapter.number)?.exercise?.folder;
    const path = `src/app/exercises/${this.topic()}/${folder ?? `${chapter.exercise}-…`}/`;
    return {
      number: chapter.exercise,
      path,
      command: `npm test -- --watch=false --include='${path}**/*.spec.ts'`,
    };
  });

  protected readonly doneCount = computed(() =>
    this.progress.count(this.pages().filter((page) => page.chapter).map((page) => chapterKey(this.topic(), page.slug))),
  );
  protected readonly chapterCount = computed(() => this.pages().filter((page) => page.chapter).length);

  /**
   * The intro plays the whole lesson; a chapter page opens it on request, cut to that chapter with a media fragment
   * (#t=start,end) so the browser seeks and stops at the next chapter by itself.
   */
  protected readonly video = computed(() => {
    const video = this.catalog.video(this.topic());
    const page = this.current();
    if (!video || !page) return null;
    const src = `videos/${video.file}`;
    const label = `${this.name()} lesson video`;
    if (page.slug === 'intro') return { src, label, length: clock(video.duration), start: null };
    const i = video.chapters.findIndex((c) => c.number === page.chapter?.number);
    if (i < 0) return null;
    const { start } = video.chapters[i];
    const end = video.chapters[i + 1]?.start;
    return {
      src: `${src}#t=${start}${end === undefined ? '' : `,${end}`}`,
      label: `${label}, chapter ${page.chapter!.number}`,
      length: null,
      start: clock(start),
    };
  });
  protected readonly watching = signal(false);

  protected readonly railOpen = signal(false);
  /** Percent of the page scrolled, for the reading-mode progress bar. */
  protected readonly readProgress = signal(0);
  private readonly heading = viewChild<ElementRef<HTMLElement>>('heading');
  private lastSlug: string | null = null;

  protected readonly inline = renderInline;
  protected readonly chapterKey = chapterKey;
  protected readonly questionKey = questionKey;
  protected readonly chapterSlug = chapterSlug;

  constructor() {
    this.reading.available.set(true);
    inject(DestroyRef).onDestroy(() => this.reading.available.set(false));
    effect(() => {
      const page = this.current();
      this.title.setTitle(page ? `${stripCode(page.title)} · ${this.name()} · Review Dojo Lessons` : 'Review Dojo Lessons');
    });
    // After moving between pages, put focus on the new heading so screen readers start there.
    effect(() => {
      const slug = this.page();
      const heading = this.heading();
      if (!heading) return;
      if (this.lastSlug !== null && this.lastSlug !== slug) heading.nativeElement.focus({ preventScroll: true });
      this.lastSlug = slug;
      this.railOpen.set(false);
      this.watching.set(false);
    });
  }

  /** Splits after each slash so a long path wraps between folders, never inside a name. */
  protected pathParts(path: string): string[] {
    return path.split(/(?<=\/)/);
  }

  protected pageLabel(page: { readonly slug: string; readonly title: string }): string {
    return stripCode(page.title);
  }

  protected toggleReading(anchor?: Element): void {
    this.keepPlace(() => this.reading.toggle(), anchor);
  }

  protected onKey(event: KeyboardEvent): void {
    const command = readingCommand(event, this.reading.on());
    if (!command || !this.current()) return;
    if (command === 'toggle') this.toggleReading();
    else if (command === 'exit') this.keepPlace(() => this.reading.set(false));
    else {
      const target = command === 'previous' ? this.previous() : this.next();
      if (!target) return;
      void this.router.navigate(['/', this.topic(), target.slug]);
    }
    event.preventDefault();
  }

  protected measureProgress(): void {
    const root = document.documentElement;
    const room = root.scrollHeight - root.clientHeight;
    this.readProgress.set(room > 0 ? Math.round(Math.min(1, Math.max(0, root.scrollTop / room)) * 100) : 0);
  }

  /** Header and rail come and go above the text; scroll so the line being read stays where it was. */
  private keepPlace(change: () => void, anchor?: Element): void {
    const target =
      anchor ?? document.elementFromPoint?.(innerWidth / 2, innerHeight / 3)?.closest('.page *') ?? this.heading()?.nativeElement;
    const before = target?.getBoundingClientRect().top;
    change();
    afterNextRender(
      () => {
        if (!target?.isConnected || before === undefined) return;
        const delta = target.getBoundingClientRect().top - before;
        if (delta !== 0) window.scrollBy(0, delta);
        this.measureProgress();
      },
      { injector: this.injector },
    );
  }
}

const stripCode = (text: string) => text.replace(/`/g, '');
