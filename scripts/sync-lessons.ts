// Copies every LESSON.md from the dojo into public/lessons and writes public/lessons/index.json.
// Runs before `start` and `test`. DOJO_ROOT overrides the default sibling checkout.
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { splitLesson } from '../src/app/lesson/parse/lesson.ts';

const root = resolve(import.meta.dirname, '..');
const dojo = resolve(root, process.env['DOJO_ROOT'] ?? '../angular-review-dojo');
const exercises = join(dojo, 'src/app/exercises');
const out = join(root, 'public/lessons');

interface TopicMeta {
  name: string;
  part: number;
  order: number;
}

/** Topic names, parts and order come from the dojo README's exercise map. */
function readTopics(readme: string): Map<string, TopicMeta> {
  const topics = new Map<string, TopicMeta>();
  let part = 0;
  for (const line of readme.split('\n')) {
    const partHeading = /^## Map of the exercises: Part (\d+)/.exec(line);
    if (partHeading) part = Number(partHeading[1]);
    else if (/^## /.test(line)) part = 0;
    const topic = /^### (.+?) \(`([^`]+)`\)/.exec(line);
    if (topic && part > 0) topics.set(topic[2], { name: topic[1], part, order: topics.size });
  }
  return topics;
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

if (!existsSync(exercises)) {
  writeFileSync(join(out, 'index.json'), '[]\n');
  console.warn(`sync-lessons: no dojo at ${dojo}; wrote an empty index.`);
  process.exit(0);
}

const readmePath = join(dojo, 'README.md');
const topics = readTopics(existsSync(readmePath) ? readFileSync(readmePath, 'utf8') : '');

const index = readdirSync(exercises, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(join(exercises, entry.name, 'LESSON.md')))
  .map((entry) => {
    const topic = entry.name;
    const source = readFileSync(join(exercises, topic, 'LESSON.md'), 'utf8');
    writeFileSync(join(out, `${topic}.md`), source);

    const folders = readdirSync(join(exercises, topic), { withFileTypes: true })
      .filter((child) => child.isDirectory())
      .map((child) => child.name);
    const lesson = splitLesson(source);
    const meta = topics.get(topic);

    return {
      topic,
      name: meta?.name ?? topic,
      part: meta?.part ?? null,
      order: meta?.order ?? Number.MAX_SAFE_INTEGER,
      title: lesson.title,
      chapters: lesson.chapters.map((chapter) => ({
        number: chapter.number,
        title: chapter.title,
        exercise: chapter.exercise && {
          number: chapter.exercise,
          folder: folders.find((name) => name.startsWith(`${chapter.exercise}-`)) ?? null,
        },
      })),
    };
  })
  .sort((a, b) => a.order - b.order || a.topic.localeCompare(b.topic))
  .map(({ order, ...entry }) => entry);

writeFileSync(join(out, 'index.json'), `${JSON.stringify(index, null, 2)}\n`);
console.log(`sync-lessons: indexed ${index.length} lesson(s): ${index.map((e) => e.topic).join(', ')}`);
