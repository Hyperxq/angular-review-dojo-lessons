# Review: RxJS to signals lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter, 600 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review (4 accuracy blockers: output() is not a signal, takeUntilDestroyed() context,
  signal coalescing qualifier, the experimental debounced()), one correction batch, recheck: all 19 findings fixed.
- Spoken names: linkedSignal, rxResource and computed are said aloud (each is its lesson chapter's heading); operator
  names never sit next to a "latest answer" case (exercise 04).
- Scene spoiler check of all on-screen text against the exercises and solutions: clean. One screen line was aligned with
  the corrected narration (c1 "plan it as a change of its own").

## Measured

- `npx hyperframes check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, 4 seams, phone sheet.

## Warnings kept on purpose

- `dead_stretch` (4, each 3.0 s, at the 3 s floor): holds on code or diagrams while the voice explains them.
- `line_unread`: c3 router-config labels (1 s), the c3-7 WARNING callout (24 words, 5 s) and the c4-5c IMPORTANT callout
  (33 words, 5 s). The voice states each rule while it is on screen; the callout text is verbatim from LESSON.md.
- `text_below_floor` (c0, c4): marbles measured at 26-27 px during their 0.27 s scale-in only.
- `composition_file_too_large` (c0, c3, c4): tick `<audio>` lines written out per marble.

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 30-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- Scenes open on paper for about 0.2 s while their first objects enter (for example c0-5 at 48.4 s).
