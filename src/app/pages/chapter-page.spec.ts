import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { LessonEntry } from '../lessons/catalog';
import { ChapterPage } from './chapter-page';

const LESSON = `# Forms in modern Angular: a lesson before the exercises

Intro.

## Chapter 1: typed controls (exercise 01)

Text with a marble diagram:

\`\`\`marbles
a: -1-|
\`\`\`

### Review questions

- Who owns the \`value\`?
- Is it nullable?

**Now do exercise 01.**

## Chapter 2: arrays (exercise 02)

Two.
`;

const INDEX: LessonEntry[] = [
  {
    topic: 'forms',
    name: 'Forms',
    part: 1,
    title: 'Forms in modern Angular: a lesson before the exercises',
    chapters: [
      { number: 1, title: 'typed controls', exercise: { number: '01', folder: '01-profile-form' } },
      { number: 2, title: 'arrays', exercise: { number: '02', folder: '02-order-form' } },
    ],
  },
];

async function render(page: string) {
  TestBed.configureTestingModule({
    providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
  });
  const fixture = TestBed.createComponent(ChapterPage);
  fixture.componentRef.setInput('topic', 'forms');
  fixture.componentRef.setInput('page', page);
  fixture.detectChanges();
  const http = TestBed.inject(HttpTestingController);
  http.expectOne('lessons/forms.md').flush(LESSON);
  http.match('lessons/index.json').forEach((req) => req.flush(INDEX));
  await fixture.whenStable();
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  const doneButton = () => el.querySelector<HTMLButtonElement>('.done button')!;
  return { fixture, el, doneButton };
}

describe('ChapterPage', () => {
  beforeEach(() => localStorage.clear());

  it('renders one chapter with its exercise path, test command and marble diagram', async () => {
    const { el } = await render('chapter-1');

    expect(el.querySelector('h1')!.textContent).toBe('Typed controls');
    expect(el.querySelector('.page__meta')!.textContent).toContain('src/app/exercises/forms/01-profile-form/');
    expect(el.querySelector('.command code')!.textContent).toBe(
      "npm test -- --watch=false --include='src/app/exercises/forms/01-profile-form/**/*.spec.ts'",
    );
    expect(el.querySelector('app-marbles-player')).not.toBeNull();
    expect(el.querySelector('.prose')!.textContent).not.toContain('Review questions');
  });

  it('renders the review questions as a checklist that remembers ticks', async () => {
    const { el, fixture } = await render('chapter-1');
    const boxes = el.querySelectorAll<HTMLInputElement>('.review input[type=checkbox]');

    expect(boxes).toHaveLength(2);
    expect(el.querySelector('.review label code')!.textContent).toBe('value');
    boxes[1].click();
    fixture.detectChanges();
    expect(JSON.parse(localStorage.getItem('review-dojo-lessons:progress')!)).toEqual({ 'forms/chapter-1/q1': true });
  });

  it('persists the done state of a chapter across visits', async () => {
    const first = await render('chapter-1');
    expect(first.doneButton().getAttribute('aria-pressed')).toBe('false');

    first.doneButton().click();
    first.fixture.detectChanges();
    expect(first.doneButton().getAttribute('aria-pressed')).toBe('true');
    expect(first.el.querySelector('.rail__list a.is-done')!.textContent).toContain('Typed controls');

    TestBed.resetTestingModule();
    const second = await render('chapter-1');
    expect(second.doneButton().getAttribute('aria-pressed')).toBe('true');
  });

  it('links to the previous and next pages', async () => {
    const { el } = await render('chapter-1');
    const links = [...el.querySelectorAll<HTMLAnchorElement>('.pager a')].map((a) => a.getAttribute('href'));

    expect(links).toEqual(['/forms/intro', '/forms/chapter-2']);
  });

  it('explains when the page does not exist', async () => {
    const { el } = await render('chapter-9');

    expect(el.querySelector('h1')!.textContent).toContain('No page called');
  });
});
