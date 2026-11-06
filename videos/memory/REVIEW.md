# Review: Memory lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter, 604.4 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review (2 blockers: the Chrome "JS heap size" label and the c3-9 phase order heard against
  the screen; 13 should-fix, 7 nits), one correction batch, recheck: approved. The same errors in LESSON.md were fixed in the
  dojo.
- Scenes by two writers (c0-c1, c2-c3) who read only LESSON.md. On-screen spoiler check against the exercises and solutions:
  no spoilers. Fixes applied: "JS heap size" on screen, the c1-8c heap chart labelled, the DOM Nodes step changed to 14 (12
  echoed an exercise ticket), the c3-6 `overdueSummary` code held 7 s, a red triangle on the c3-7 long task.
- Spoiler rules kept on screen: the c1-4 handle table has no accented row and clears before the c1-end card; the c3-6 code
  clears before the c3-end card; no exercise names (stats, series, statsService).

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, phone sheet; writers also looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (63): every scene-local `data-start` is intended as local.
- `line_unread` (8): verbatim lesson callouts and paragraphs (DevTools WARNING, cache sizing, snapshot steps, IMPORTANT,
  Performance panel step, after-the-lesson text, the c3 WARNING) under shorter narration clips. The voice reads the banded part.
  The c3-7 Web Worker line now shows 2.5 s because the summary code holds longer.
- `dead_stretch` (6, 3-6 s): holds on tables and code while the voice explains them.
- `composition_file_too_large` c3.

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c0 at 70.6-76.7 s holds the "When you do not need cleanup" table for 6 s with a single row on screen.

## Delivery

- `renders/memory-lesson.mp4` (gitignored; published in release `videos-batch-2`): 1920x1080, 30 fps, 10:05, about 28 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.4 LUFS integrated, true peak -1.2 dBTP, no clipping.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
