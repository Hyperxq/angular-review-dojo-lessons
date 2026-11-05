/*
 * Splits a LESSON.md that follows the dojo's lesson-markup contract.
 * Self-contained on purpose: scripts/sync-lessons.ts imports it directly with Node's type stripping.
 */

export interface LessonChapter {
  readonly number: number;
  readonly title: string;
  /** Exercise number as written in the heading ("01"), or null for chapters without one. */
  readonly exercise: string | null;
  readonly body: string;
  readonly reviewQuestions: readonly string[];
  readonly nowDo: string | null;
}

export interface LessonSection {
  readonly title: string;
  readonly body: string;
}

export interface Lesson {
  readonly title: string;
  readonly intro: string;
  readonly chapters: readonly LessonChapter[];
  readonly closing: readonly LessonSection[];
}

const CHAPTER = /^## Chapter (\d+): (.+?)(?: \(exercise (\d+)\))?\s*$/;
const NOW_DO = /^\*\*Now do exercise (\d+)\.\*\*\s*$/;
const REVIEW = /^### Review questions\s*$/;
const FENCE = /^\s*(```|~~~)/;

interface Block {
  heading: string | null;
  lines: string[];
}

export function splitLesson(source: string): Lesson {
  let title = '';
  const blocks: Block[] = [{ heading: null, lines: [] }];
  let fence: string | null = null;

  for (const line of source.replace(/\r\n?/g, '\n').split('\n')) {
    const fenceMatch = FENCE.exec(line);
    if (fenceMatch) {
      if (fence === null) fence = fenceMatch[1];
      else if (fenceMatch[1] === fence) fence = null;
    }
    const current = blocks[blocks.length - 1];
    if (fence === null && !fenceMatch && /^# /.test(line) && title === '') {
      title = line.slice(2).trim();
    } else if (fence === null && !fenceMatch && /^## /.test(line)) {
      blocks.push({ heading: line, lines: [] });
    } else {
      current.lines.push(line);
    }
  }

  const introParts = [tidy(blocks[0].lines)];
  const chapters: LessonChapter[] = [];
  const closing: LessonSection[] = [];

  for (const block of blocks.slice(1)) {
    const chapter = CHAPTER.exec(block.heading!);
    if (chapter) {
      chapters.push(readChapter(chapter, block.lines));
    } else if (chapters.length === 0) {
      introParts.push(`${block.heading}\n\n${tidy(block.lines)}`);
    } else {
      closing.push({ title: block.heading!.slice(3).trim(), body: tidy(block.lines) });
    }
  }

  return { title, intro: introParts.filter(Boolean).join('\n\n'), chapters, closing };
}

function readChapter(heading: RegExpExecArray, lines: string[]): LessonChapter {
  const body: string[] = [];
  const reviewQuestions: string[] = [];
  let nowDo: string | null = null;
  let inReview = false;
  let fenced = false;

  for (const line of lines) {
    if (FENCE.test(line)) fenced = !fenced;
    const now = fenced ? null : NOW_DO.exec(line);
    if (now) {
      nowDo = now[1];
      inReview = false;
    } else if (!fenced && REVIEW.test(line)) {
      inReview = true;
    } else if (inReview && /^#{1,6} /.test(line)) {
      inReview = false;
      body.push(line);
    } else if (inReview) {
      const bullet = /^\s*[-*] (.*)$/.exec(line);
      if (bullet) reviewQuestions.push(bullet[1].trim());
      else if (line.trim() !== '' && reviewQuestions.length > 0) {
        reviewQuestions[reviewQuestions.length - 1] += ` ${line.trim()}`;
      }
    } else {
      body.push(line);
    }
  }

  return {
    number: Number(heading[1]),
    title: heading[2].trim(),
    exercise: heading[3] ?? null,
    body: tidy(body),
    reviewQuestions,
    nowDo,
  };
}

/** Trims blank lines and the `---` separators the lessons put between chapters. */
function tidy(lines: string[]): string {
  const copy = [...lines];
  const isEdge = (line: string | undefined) => line !== undefined && /^\s*(-{3,})?\s*$/.test(line);
  while (copy.length && isEdge(copy[0])) copy.shift();
  while (copy.length && isEdge(copy[copy.length - 1])) copy.pop();
  return copy.join('\n');
}
