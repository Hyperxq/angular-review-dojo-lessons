# Review: Forms lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter, 624.6 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review (1 accuracy blocker: c3-15, submit does not wait under `ignoreValidators: 'none'`,
  checked against the installed @angular/forms 22.2.2; 4 should-fix, nits, 3 cuts), one correction batch, recheck: approved.
  LESSON.md lines ~311 and ~507 had the same errors and were fixed in the dojo.
- Scenes by two writers (c0-c1, c2-c3) who read only LESSON.md. On-screen spoiler check against the exercises and solutions:
  c0 and c2 clean. Fixes applied: the c1-10 form that opens red is captioned with its cause (`markAllAsTouched()` on load) and
  has three fields; the c3-1 sign-up page shows one consistent state (age 12, guardian shown, plan disabled); member names made
  consistent (Grace).
- Wrong lesson sentences never reach the screen: the c3-15 callout elides the "wait" clause, and the compiler-checks-the-shape
  sentence is not shown. `markAllAsDirty` does not appear.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, phone sheet; writers also looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (72): every scene-local `data-start` is intended as local.
- `composition_file_too_large` (c2, c3).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c0-6 opens on an empty paper frame for about 1.5 s (61.3-62.8 s) before `UntypedFormGroup` types in. With more time: land
  the first token on the cut.

## Delivery

- `renders/forms-lesson.mp4` (gitignored; published in release `videos-batch-2`): 1920x1080, 30 fps, 10:25, about 27 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.4 LUFS integrated, true peak -1.3 dBTP, no clipping.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
