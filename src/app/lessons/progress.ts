import { Service, signal } from '@angular/core';

const STORAGE_KEY = 'review-dojo-lessons:progress';

function read(): Record<string, true> {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, true>) : {};
  } catch {
    return {};
  }
}

/** Done chapters and ticked review questions, kept in localStorage when the browser allows it. */
@Service()
export class Progress {
  private readonly marks = signal(read());

  has(key: string): boolean {
    return this.marks()[key] === true;
  }

  count(keys: readonly string[]): number {
    const marks = this.marks();
    return keys.filter((key) => marks[key]).length;
  }

  toggle(key: string): void {
    this.marks.update(({ [key]: current, ...rest }) => (current ? rest : { ...rest, [key]: true }));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.marks()));
    } catch {
      // Private mode or blocked storage: progress lives for this tab only.
    }
  }
}

export const chapterKey = (topic: string, slug: string) => `${topic}/${slug}`;
export const questionKey = (topic: string, slug: string, index: number) => `${topic}/${slug}/q${index}`;
