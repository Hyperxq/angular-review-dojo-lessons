import { httpResource } from '@angular/common/http';
import { Component, ElementRef, computed, effect, inject, input, signal, viewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { splitLesson } from '../lesson/parse/lesson';
import { LessonBody } from '../lesson/render/lesson-body';
import { renderInline } from '../lesson/render/segments';
import { Catalog, chapterSlug, lessonPages } from '../lessons/catalog';
import { Progress, chapterKey, questionKey } from '../lessons/progress';
import { CopyButton } from '../shared/copy-button';

@Component({
  selector: 'app-chapter-page',
  imports: [RouterLink, LessonBody, CopyButton],
  templateUrl: './chapter-page.html',
  styleUrl: './chapter-page.css',
})
export class ChapterPage {
  readonly topic = input.required<string>();
  readonly page = input.required<string>();

  private readonly catalog = inject(Catalog);
  protected readonly progress = inject(Progress);
  private readonly title = inject(Title);

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

  protected readonly railOpen = signal(false);
  private readonly heading = viewChild<ElementRef<HTMLElement>>('heading');
  private lastSlug: string | null = null;

  protected readonly inline = renderInline;
  protected readonly chapterKey = chapterKey;
  protected readonly questionKey = questionKey;
  protected readonly chapterSlug = chapterSlug;

  constructor() {
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
    });
  }
}

const stripCode = (text: string) => text.replace(/`/g, '');
