import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import type { LessonEntry, VideoIndex } from '../lessons/catalog';
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

const VIDEOS: VideoIndex = {
  videos: [
    {
      topic: 'forms',
      release: 'videos-batch-1',
      file: 'forms-lesson.mp4',
      duration: 190.4,
      chapters: [
        { number: 1, start: 65.2 },
        { number: 2, start: 130 },
      ],
    },
  ],
};

async function render(page: string, videos: VideoIndex = VIDEOS) {
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
  http.match('videos.json').forEach((req) => req.flush(videos));
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

  describe('lesson video', () => {
    it('plays the whole lesson on the intro page', async () => {
      const { el } = await render('intro');
      const video = el.querySelector<HTMLVideoElement>('.watch video')!;

      expect(el.querySelector('.watch h2')!.textContent).toBe('Watch the lesson');
      expect(video.getAttribute('src')).toBe('https://github.com/Hyperxq/angular-review-dojo-lessons/releases/download/videos-batch-1/forms-lesson.mp4');
      expect(video.getAttribute('aria-label')).toBe('Forms lesson video');
      expect(video.controls).toBe(true);
      expect(video.getAttribute('preload')).toBe('metadata');
      expect(video.autoplay).toBe(false);
      expect(el.querySelector('.watch')!.textContent).toContain('3:10');
    });

    it('shows nothing for a topic without a video', async () => {
      const { el } = await render('intro', { videos: [] });

      expect(el.querySelector('.watch')).toBeNull();
      expect(el.querySelector('video')).toBeNull();
    });

    it('opens the video at the start of the chapter and stops where the next one begins', async () => {
      const { el, fixture } = await render('chapter-1');
      const button = el.querySelector<HTMLButtonElement>('.watch button')!;
      expect(button.textContent).toContain('Watch this chapter (1:05)');
      expect(button.getAttribute('aria-expanded')).toBe('false');
      expect(el.querySelector('video')).toBeNull();

      button.click();
      fixture.detectChanges();
      const video = el.querySelector<HTMLVideoElement>('.watch video')!;
      expect(button.getAttribute('aria-expanded')).toBe('true');
      expect(video.getAttribute('src')).toBe('https://github.com/Hyperxq/angular-review-dojo-lessons/releases/download/videos-batch-1/forms-lesson.mp4#t=65.2,130');
      expect(video.getAttribute('aria-label')).toBe('Forms lesson video, chapter 1');
    });

    it('plays the last chapter to the end of the video', async () => {
      const { el, fixture } = await render('chapter-2');
      el.querySelector<HTMLButtonElement>('.watch button')!.click();
      fixture.detectChanges();

      expect(el.querySelector('.watch video')!.getAttribute('src')).toBe('https://github.com/Hyperxq/angular-review-dojo-lessons/releases/download/videos-batch-1/forms-lesson.mp4#t=130');
    });

    it('is hidden in reading mode', async () => {
      const { el, fixture } = await render('intro');
      el.querySelector<HTMLButtonElement>('.reading-toggle')!.click();
      fixture.detectChanges();

      expect(el.querySelector('.watch')).toBeNull();
    });
  });

  describe('reading mode', () => {
    const press = (key: string, target: EventTarget = document.body) =>
      target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    const toggle = (el: HTMLElement) => el.querySelector<HTMLButtonElement>('.reading-toggle')!;

    it('turns on from its button, hides the rail and remembers the choice', async () => {
      const { el, fixture } = await render('chapter-1');
      expect(toggle(el).getAttribute('aria-pressed')).toBe('false');
      expect(toggle(el).textContent).toContain('Reading mode');

      toggle(el).click();
      fixture.detectChanges();
      expect(toggle(el).getAttribute('aria-pressed')).toBe('true');
      expect(toggle(el).textContent).toContain('Exit reading mode');
      expect(el.querySelector('nav.rail')).toBeNull();
      expect(el.querySelector('.layout')!.classList).toContain('is-reading');
      expect(el.querySelector('.reading-toggle')!.closest('.page__head')).not.toBeNull();
      expect(localStorage.getItem('review-dojo-lessons:reading')).toBe('on');

      TestBed.resetTestingModule();
      const again = await render('chapter-1');
      expect(again.el.querySelector('nav.rail')).toBeNull();
    });

    it('toggles with R and exits with Escape, but not while typing', async () => {
      const { el, fixture } = await render('chapter-1');
      press('r');
      fixture.detectChanges();
      expect(el.querySelector('nav.rail')).toBeNull();

      const input = el.querySelector<HTMLInputElement>('.review input')!;
      press('Escape', input);
      fixture.detectChanges();
      expect(el.querySelector('nav.rail')).toBeNull();

      press('Escape');
      fixture.detectChanges();
      expect(el.querySelector('nav.rail')).not.toBeNull();
    });

    it('keeps previous and next in reach with named links and the arrow keys', async () => {
      const { el, fixture } = await render('chapter-1');
      const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
      press('ArrowRight');
      expect(navigate).not.toHaveBeenCalled();

      toggle(el).click();
      fixture.detectChanges();
      const links = [...el.querySelectorAll<HTMLAnchorElement>('.reading-nav a')];
      expect(links.map((a) => a.getAttribute('aria-label'))).toEqual([
        'Previous chapter: Before you start',
        'Next chapter: Arrays',
      ]);
      expect(links.map((a) => a.getAttribute('href'))).toEqual(['/forms/intro', '/forms/chapter-2']);
      expect(el.querySelector('.pager')).not.toBeNull();

      press('ArrowRight');
      expect(navigate).toHaveBeenLastCalledWith(['/', 'forms', 'chapter-2']);
      press('ArrowLeft');
      expect(navigate).toHaveBeenLastCalledWith(['/', 'forms', 'intro']);

      navigate.mockClear();
      press('ArrowRight', el.querySelector('app-marbles-player button')!);
      press('ArrowRight', el.querySelector('.review input')!);
      expect(navigate).not.toHaveBeenCalled();
    });

    it('shows reading progress through the chapter', async () => {
      const { el, fixture } = await render('chapter-1');
      expect(el.querySelector('[role=progressbar]')).toBeNull();

      toggle(el).click();
      fixture.detectChanges();
      const bar = el.querySelector('[role=progressbar]')!;
      expect(bar.getAttribute('aria-label')).toBe('Reading progress: Typed controls');
      expect(bar.getAttribute('aria-valuenow')).toBe('0');
    });
  });

  it('explains when the page does not exist', async () => {
    const { el } = await render('chapter-9');

    expect(el.querySelector('h1')!.textContent).toContain('No page called');
  });
});
