import rxjsLesson from './fixtures/rxjs-lesson.md' with { loader: 'text' };
import { splitLesson } from './lesson';

const small = `# Forms in modern Angular: a lesson before the exercises

An intro paragraph.

---

## Chapter 0: what moved since Angular 17

Typed forms are the default.

---

## Chapter 1: typed controls (exercise 01)

Body of chapter one.

### The tools

More text.

### Review questions

- Who owns the value?
- Is the control
  nullable?

**Now do exercise 01.**

---

## Chapter 2: arrays (exercise 02)

Body two.

**Now do exercise 02.**

## After the lesson

Compare with the solution.
`;

describe('splitLesson', () => {
  it('reads the H1 title and the intro, without separators', () => {
    const lesson = splitLesson(small);

    expect(lesson.title).toBe('Forms in modern Angular: a lesson before the exercises');
    expect(lesson.intro).toBe('An intro paragraph.');
  });

  it('reads Chapter 0 as a chapter without an exercise', () => {
    const [zero] = splitLesson(small).chapters;

    expect(zero).toMatchObject({
      number: 0,
      title: 'what moved since Angular 17',
      exercise: null,
      body: 'Typed forms are the default.',
      reviewQuestions: [],
    });
  });

  it('reads the exercise number from the chapter heading', () => {
    const chapters = splitLesson(small).chapters;

    expect(chapters.map((chapter) => [chapter.number, chapter.title, chapter.exercise])).toEqual([
      [0, 'what moved since Angular 17', null],
      [1, 'typed controls', '01'],
      [2, 'arrays', '02'],
    ]);
  });

  it('moves review questions out of the body, joining wrapped bullets', () => {
    const one = splitLesson(small).chapters[1];

    expect(one.reviewQuestions).toEqual(['Who owns the value?', 'Is the control nullable?']);
    expect(one.body).toBe('Body of chapter one.\n\n### The tools\n\nMore text.');
  });

  it('moves the "Now do exercise NN." line out of the body', () => {
    const [, one, two] = splitLesson(small).chapters;

    expect(one.nowDo).toBe('01');
    expect(two.nowDo).toBe('02');
    expect(two.body).toBe('Body two.');
  });

  it('keeps non-chapter sections after the chapters as closing sections', () => {
    expect(splitLesson(small).closing).toEqual([
      { title: 'After the lesson', body: 'Compare with the solution.' },
    ]);
  });

  it('does not treat a ## line inside a fenced code block as a heading', () => {
    const lesson = splitLesson('# T\n\n## Chapter 1: a (exercise 01)\n\n```md\n## not a heading\n```\n');

    expect(lesson.chapters).toHaveLength(1);
    expect(lesson.chapters[0].body).toContain('## not a heading');
  });

  it('splits the real RxJS lesson into its nine chapters', () => {
    const lesson = splitLesson(rxjsLesson);

    expect(lesson.title).toBe('RxJS in modern Angular: a lesson before the exercises');
    expect(lesson.chapters.map((chapter) => chapter.number)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    expect(lesson.chapters.slice(1).map((chapter) => chapter.exercise)).toEqual([
      '01', '02', '03', '04', '05', '06', '07', '08',
    ]);
    for (const chapter of lesson.chapters.slice(1)) {
      expect(chapter.reviewQuestions.length).toBeGreaterThanOrEqual(3);
      expect(chapter.nowDo).toBe(chapter.exercise);
      expect(chapter.body).not.toContain('Review questions');
      expect(chapter.body).not.toContain('Now do exercise');
    }
    expect(lesson.closing.map((section) => section.title)).toEqual(['After the lesson']);
  });
});
