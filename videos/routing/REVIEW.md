# Review: Routing lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (six), 656.8 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review (no blockers; 6 should-fix on accuracy and listening: guards are not authorization,
  NG04014 only in development, NavigationCancel codes only for cancellations, the guard pipeline with canActivateChild parent
  first), one correction batch, recheck: approved. LESSON.md lines 148 and 358 were fixed in the dojo.
- Scenes by two writers (c0-c2, c3-c5) who read only LESSON.md. On-screen spoiler check of all six scenes against the
  exercises and solutions: clean. One label aligned with the narration (c1 "NG04014 (dev mode)").
- The c2 opener changes URL and book together, so the stale-page symptom of exercise 02 never appears; the c4 address bar
  shows only the lesson's URL change, with no link leading out of a feature.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, phone sheet; writers also looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (66): every scene-local `data-start` is intended as local.
- `line_unread` (7): verbatim lesson paragraphs and tables under shorter narration clips (c0 "Zoneless and OnPush", the c2
  third binding rule, the c3 Guard/Receives table, the c4 guard paragraph, the c5 Titles paragraph, the after-lesson card).
  The voice reads the banded part.
- `composition_file_too_large` c2.

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c3 "Guard / Receives" table is on screen about 2.6 s before the `hasRole` code replaces it inside one clip.
