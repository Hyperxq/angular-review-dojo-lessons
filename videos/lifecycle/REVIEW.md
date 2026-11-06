# Review: Lifecycle lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter, 502 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review, one correction batch, recheck with every finding fixed.
- Scene spoiler check of all on-screen text against the exercises and solutions found invented content too close to the
  exercises: c2 named `ngOnInit` over a query read inside `@if` (exercise 02's defect), c2's server log gave the tooltip's cause, and c3 listed `ngOnChanges reads ''` (exercise 03's ticket symptom). Replaced with "earlier code", "ERROR in SpineTooltip during server render" and "code right after the input is set reads ''".

## Measured

- `npx hyperframes check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, the seams, phone sheet; spot frames on every spoiler fix.

## Warnings kept on purpose

- `dead_stretch` (4, each about 3 s): holds on diagrams while the voice explains them.
- `line_unread` c0 "New tools" table cells: 3.6 s for 14-word cells; the voice summarises the table.
- `text_below_floor` c1: a marble at 27 px during its scale-in only.
- `composition_file_too_large` (c2, c3).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Delivery

- `renders/lifecycle-lesson.mp4` (gitignored): 1920x1080, 30 fps, 8:22, about 24 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.6 LUFS integrated, true peak -1.4 dBTP, no clipping.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
