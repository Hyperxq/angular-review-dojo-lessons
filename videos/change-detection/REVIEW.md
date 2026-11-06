# Review: Change detection lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter, 525 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review, one correction batch, recheck with every finding fixed.
- Scene spoiler check of all on-screen text against the exercises and solutions found invented content too close to the
  exercises: c3-3 showed exercise 03's own `zone.runOutsideAngular` / `zone.run` callback skeleton, and c0-4 a `setTimeout` writing `this.status` that retold a ticket symptom. Both were replaced (two `fn()` rows; `this.queueLength = 4` with `Queue: 0`).

## Measured

- `npx hyperframes check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, the seams, phone sheet; spot frames on every spoiler fix.

## Warnings kept on purpose

- `dead_stretch` (5, each about 3 s): holds on diagrams while the voice explains them.
- `line_unread` c3 window header (dimmed on purpose as the display closes).
- `text_below_floor` c3: a marble at 26 px during its scale-in only.
- `gsap_repeated_fromto_without_baseline` c0: the lamp pulse always starts from its resting scale.
- `composition_file_too_large` (c1, c3).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Delivery

- `renders/change-detection-lesson.mp4` (gitignored): 1920x1080, 30 fps, 8:45, about 25 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.5 LUFS integrated, true peak -1.4 dBTP, no clipping.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
