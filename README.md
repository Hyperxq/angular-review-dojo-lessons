# Review Dojo Lessons

A reader for the lessons of the [Angular Review Dojo](../angular-review-dojo). Each topic folder in the dojo has a
`LESSON.md` to read before its exercises; this app shows one chapter at a time, draws the diagrams the lessons describe,
and remembers which chapters you finished.

The lesson text lives only in the dojo. This repo copies it at startup and never keeps its own version.

## Run it

Check out the dojo next to this folder (`../angular-review-dojo`), then:

```bash
bun install
bun run start   # syncs the lessons, then serves on http://localhost:4200
bun run test    # syncs the lessons, then runs Vitest in watch mode; add --watch=false for a single run
bun run sync    # only the copy step
```

`DOJO_ROOT=/path/to/dojo bun run sync` reads the dojo from somewhere else. A topic without a `LESSON.md` is left out of
the index; a new one shows up on the next sync with no code change.

## Keyboard shortcuts

| Key | On a chapter page |
|-----|-------------------|
| `R` | turn reading mode on or off |
| `Esc` | leave reading mode |
| `←` / `→` | previous / next chapter, in reading mode |

Reading mode hides the header and the chapter list so only the lesson is left, with a progress bar along the top and
a small previous/next control in the bottom corner. The choice is remembered. Shortcuts do nothing while you type in
a field, and the arrows stay with the marble player when focus is inside it.

## How it fits together

- `scripts/sync-lessons.ts` copies `src/app/exercises/*/LESSON.md` from the dojo to `public/lessons/<topic>.md` and writes
  `public/lessons/index.json` (topic, name, part, title, chapters with their exercise folder). Topic names, the Part 1 /
  Part 2 split and the order come from the dojo README's exercise map. `public/lessons/` is gitignored.
- `src/app/lesson/parse/` holds the pure parsers for the lesson-markup contract: the chapter splitter, ` ```marbles `,
  ` ```flow ` and ` ```tree `. The sync script imports the splitter directly through Node's type stripping, so it has no
  imports of its own.
- `src/app/lesson/render/segments.ts` turns a chapter's Markdown into segments: prose HTML (with GitHub alerts as
  callouts), highlighted code, and the three diagram kinds. A diagram that fails to parse is shown as its plain text,
  with a short warning in development builds.
- `src/app/lesson/visuals/` has the marble player, the flow diagram, the tree and the code block.
- `src/app/lessons/progress.ts` keeps done chapters and ticked review questions in `localStorage`, and keeps working in
  memory when storage is blocked.

- `src/app/lessons/catalog.ts` also loads `public/videos.json`, which lists the lesson videos (see below).

## Lesson videos

A topic's intro page plays its lesson video, and each chapter page has a "Watch this chapter" button that opens the
video cut to that chapter (a `#t=start,end` media fragment, so it starts there and stops where the next chapter
begins). Topics without a video show none. Reading mode hides it.

The mp4 files are not in git or on the Pages site. They are assets of GitHub releases of this repo, and the reader plays
each one from its release download URL (`releases/download/<release>/<file>`). To add videos:

1. Publish a release with the mp4 files as assets, for example `gh release create videos-batch-2 *.mp4`.
2. Add one entry per video to `public/videos.json` and push it to `master`:

   ```json
   { "topic": "signals", "release": "videos-batch-2", "file": "signals-lesson.mp4", "duration": 540.2,
     "chapters": [{ "number": 0, "start": 0 }, { "number": 1, "start": 92.5 }] }
   ```

   `duration` and each chapter's `start` are seconds into the video; `number` is the lesson's chapter number.

The push to `master` redeploys the site with the new `videos.json`; the release itself needs no deploy.

The exercise command on each chapter is the one from the dojo README:
`npm test -- --watch=false --include='src/app/exercises/<topic>/<NN-slug>/**/*.spec.ts'`.

## Dependencies

Besides Angular 22.2 (core, common, router, platform-browser), RxJS and tslib, which the framework needs:

| Package | Version | Why |
|---------|---------|-----|
| `marked` | 18.1.1 | GitHub-flavoured Markdown (tables, alerts in blockquotes) with a renderer that can be overridden per element. Writing a Markdown parser is not the point of this repo. |
| `highlight.js` | 11.12.0 | Syntax colours for the TypeScript, HTML, shell, JSON and CSS samples. Only the core and those five grammars are imported, so the rest of the library stays out of the bundle. |

Dev tooling is what `ng new` installs for Vitest: `@angular/build`, `@angular/cli`, `@angular/compiler-cli`, `vitest`,
`jsdom`, `typescript`, `prettier`. Every version is pinned exactly.

Fonts (Atkinson Hyperlegible Next, Newsreader, Atkinson Hyperlegible Mono) load from Google Fonts; see `DESIGN.md`.
