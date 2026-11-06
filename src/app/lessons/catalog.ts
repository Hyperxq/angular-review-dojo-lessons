import { httpResource } from '@angular/common/http';
import { computed, Service } from '@angular/core';
import type { Lesson, LessonChapter } from '../lesson/parse/lesson';

/** One entry of public/lessons/index.json, written by scripts/sync-lessons.ts. */
export interface LessonEntry {
  readonly topic: string;
  readonly name: string;
  readonly part: number | null;
  readonly title: string;
  readonly chapters: readonly {
    readonly number: number;
    readonly title: string;
    readonly exercise: { readonly number: string; readonly folder: string | null } | null;
  }[];
}

/** public/videos.json: each lesson video is an asset of a GitHub release, downloaded into videos/ at deploy time. */
export interface VideoIndex {
  readonly videos: readonly LessonVideo[];
}

export interface LessonVideo {
  readonly topic: string;
  readonly release: string;
  readonly file: string;
  /** Seconds. */
  readonly duration: number;
  /** Second at which each lesson chapter starts in the video. */
  readonly chapters: readonly { readonly number: number; readonly start: number }[];
}

export interface LessonPage {
  readonly slug: string;
  readonly title: string;
  readonly body: string;
  readonly chapter: LessonChapter | null;
}

@Service()
export class Catalog {
  readonly index = httpResource<LessonEntry[]>(() => 'lessons/index.json', { defaultValue: [] });

  readonly videos = httpResource<VideoIndex>(() => 'videos.json', { defaultValue: { videos: [] } });

  readonly parts = computed(() => {
    const entries = this.index.hasValue() ? this.index.value() : [];
    return [1, 2, null]
      .map((part) => ({ part, entries: entries.filter((entry) => entry.part === part) }))
      .filter((group) => group.entries.length > 0);
  });

  entry(topic: string): LessonEntry | undefined {
    return this.index.hasValue() ? this.index.value().find((entry) => entry.topic === topic) : undefined;
  }

  video(topic: string): LessonVideo | undefined {
    return this.videos.hasValue() ? this.videos.value().videos.find((video) => video.topic === topic) : undefined;
  }
}

/** 190.4 → "3:10". */
export const clock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export const chapterSlug = (chapter: { readonly number: number }) => `chapter-${chapter.number}`;

export function lessonPages(lesson: Lesson): LessonPage[] {
  const pages: LessonPage[] = [];
  if (lesson.intro) {
    pages.push({ slug: 'intro', title: 'Before you start', body: lesson.intro, chapter: null });
  }
  for (const chapter of lesson.chapters) {
    pages.push({
      slug: chapterSlug(chapter),
      title: capitalize(chapter.title),
      body: chapter.body,
      chapter,
    });
  }
  if (lesson.closing.length > 0) {
    pages.push({
      slug: 'after',
      title: lesson.closing[0].title,
      body: lesson.closing
        .map((section, i) => (i === 0 ? section.body : `### ${section.title}\n\n${section.body}`))
        .join('\n\n'),
      chapter: null,
    });
  }
  return pages;
}

/** Lesson chapter titles are written in sentence case without the first capital ("a subscription has..."). */
export const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
