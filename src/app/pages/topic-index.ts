import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { renderInline } from '../lesson/render/segments';
import { Catalog, capitalize, chapterSlug, type LessonEntry } from '../lessons/catalog';
import { Progress, chapterKey } from '../lessons/progress';

const PART_NAMES: Record<string, string> = {
  1: 'Part 1: framework mechanics',
  2: 'Part 2: staff level',
  null: 'Other topics',
};

@Component({
  selector: 'app-topic-index',
  imports: [RouterLink],
  templateUrl: './topic-index.html',
  styleUrl: './topic-index.css',
})
export class TopicIndex {
  protected readonly catalog = inject(Catalog);
  private readonly progress = inject(Progress);
  protected readonly partNames = PART_NAMES;
  protected readonly inline = renderInline;

  protected done(entry: LessonEntry, number: number): boolean {
    return this.progress.has(chapterKey(entry.topic, chapterSlug({ number })));
  }

  protected doneCount(entry: LessonEntry): number {
    return entry.chapters.filter((chapter) => this.done(entry, chapter.number)).length;
  }

  /** The first chapter not marked done, or the intro when nothing is done yet. */
  protected resume(entry: LessonEntry): { slug: string; label: string; next: string } {
    const next = entry.chapters.find((chapter) => !this.done(entry, chapter.number));
    // Every lesson opens with the same Chapter 0, so the row names the next exercise chapter instead.
    const shown = entry.chapters.find((chapter) => chapter.exercise && !this.done(entry, chapter.number)) ?? next;
    const nextTitle = shown ? capitalize(shown.title) : 'Every chapter is done';
    if (this.doneCount(entry) === 0) return { slug: 'intro', label: 'Start reading', next: nextTitle };
    return next
      ? { slug: chapterSlug(next), label: `Continue with chapter ${next.number}`, next: nextTitle }
      : { slug: 'intro', label: 'Read it again', next: nextTitle };
  }
}
