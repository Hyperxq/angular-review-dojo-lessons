# Review: State lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 608.2 s, Kokoro af_heart.
  Chapter 0 also carries the lesson's opening sections (the ladder, "Server state is a cache", grading).
- NARRATION.md: humanizer, expert review (1 blocker: two clips merged into one line; should-fix: a component versus the URL,
  where patchState calls belong, "by default" outside the store, the grading conditions, the receipt embedding rule), one
  correction batch, recheck: approved. LESSON.md (rxResource import) and the three state tickets were aligned in the dojo.
- Scenes by three writers (c0, c1, c2-c3) who read only LESSON.md. On-screen spoiler check of all four scenes against the
  exercises and solutions: clean. Two labels reworded ("Built for server state", "Set or Map writes").
- Spoiler rules kept on screen: no cart, counter, total, product store, filter box, stock number, checkout or kiosk; the sort
  reset, optimistic shelf move and autosave stay the lesson's own library examples; the tool table keeps the `computed` row.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- Writers looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (70): every scene-local `data-start` is intended as local.
- `line_unread` (2): verbatim lesson text under shorter narration clips (the c0 service paragraph, the c1 IMPORTANT callout).
- `dead_stretch` (1): a hold on code while the voice explains it.
- `composition_file_too_large` (2).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c1: the 16-line Clock / LoanCard block runs over the SPEC's 14-line limit at 28 px.

## Delivery

- `renders/state-lesson.mp4` (gitignored; published in release `videos-batch-5`): 1920x1080, 30 fps, 10:08, about 27 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.4 LUFS integrated, true peak -1.4 dBTP, clipping count 0.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
