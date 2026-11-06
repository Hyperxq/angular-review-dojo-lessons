# Review: Testing lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 635.3 s, Kokoro af_heart.
  Chapter 0 (196 s) also carries the lesson's opening sections (what tests are for, test levels, solitary and sociable).
- NARRATION.md: humanizer, expert review (2 blockers: Vitest 5 fake Date starts at the real now, not 1970; the "three or more"
  edge is between two and three), one correction batch, recheck: approved. Checked against Vitest 5.0.3 and Angular 22.2.2.
  The same errors in LESSON.md were fixed in the dojo.
- Scenes by three writers (c0, c1-c2, c3) who read only LESSON.md. On-screen spoiler check against the exercises and solutions:
  no spoilers. Fixes applied: the spec badge reads "All passed" (a count matched an exercise), the factory heading reads "A fresh
  object for every test", the c3-10c label reads "fake timers (chapter 0)", loan rows made consistent across scenes, the edge
  labels read "last without" and "first with".
- Spoiler rules kept on screen: no float or money value, no `persist`, no `vi.fn()` order object, no HttpTestingController
  row held longer than the others.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, phone sheet; writers also looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (70): every scene-local `data-start` is intended as local.
- `dead_stretch` (5): holds on tables and code while the voice explains them.
- `line_unread` (1): the "After the lesson" paragraph, 12.6 s against a 12.75 s floor; the card length is fixed by timing.
- `composition_file_too_large` (c0, c2, c3).

## Not checked

- Sound was not heard; loudness is measured after render. "Vee test" and "J S dom" were not listened to.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c2-9 opens on the HttpTestingController table header for about 1.3 s before its first row appears (around 391 s).

## Delivery

- `renders/testing-lesson.mp4` (gitignored; published in release `videos-batch-3`): 1920x1080, 30 fps, 10:35, about 28 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.3 LUFS integrated, true peak -1.4 dBTP, clipping count 0.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
