# Review: Capstone lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, 555.5 s, Kokoro af_heart. The capstone has two chapters, so
  two scenes: c0 (the opening sections and "Reflexes to recalibrate since Angular 17") and c1 (reviewing a pull request,
  with the questions card, the pause card, the after-exercise card and the 18:00 close).
- NARRATION.md: humanizer, expert review, one correction batch, recheck: approved. The capstone wiring was fixed in the dojo
  (the demo backend now answers root and route clients), and its PR.md, HINTS and REVIEW.md were updated.
- Scenes by two writers (c0, c1) who read only LESSON.md. On-screen spoiler check of both scenes against the exercise,
  PR.md and REVIEW.md: clean, no changes.
- Every pull request on screen is drawn as grey placeholder bars; no alert, badge, search, notes field, retry or PR text.
- The nine-step review flow runs top to bottom, with steps not yet named at 30% opacity, so it always shows its full outline.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- Writers looked at one `--at` frame per shot; the nine-question card was snapshotted again and fits the safe box.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (67): every scene-local `data-start` is intended as local.
- `text_occluded` (17, info): editor shots cut over the long-lived flow diagram on purpose.
- `line_unread` (1): the 62-word due-date comment under a 7.5 s clip.
- `composition_file_too_large` (1), `dead_stretch` (1).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c0-9: the side-by-side recap shows only the first column of the habits table, because both tables do not fit at 28 px.

## Delivery

- `renders/capstone-lesson.mp4` (gitignored; published in release `videos-batch-6`): 1920x1080, 30 fps, 9:15, about 24 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.3 LUFS integrated, true peak -1.4 dBTP, clipping count 0.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
