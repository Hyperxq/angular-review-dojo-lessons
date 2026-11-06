# Review: DI lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 610.2 s, Kokoro af_heart.
  Chapter 0 also carries the lesson's opening sections (the three scope questions, grading DI findings).
- NARRATION.md: humanizer, expert review (no blockers; 7 should-fix: the multi/regular provider outcome by order, route
  injector cleanup with the default reuse strategy, required tokens "for a value with no sensible default", grading tiers; the
  after-exercise clip that named the Hint 3 answer was cut), one correction batch, recheck: approved. The same errors in
  LESSON.md were fixed in the dojo, and the di/02 and di/03 tickets were aligned with their code.
- Scenes by three writers (c0, c1, c2-c3) who read only LESSON.md. On-screen spoiler check against the exercises and solutions:
  all four scenes clean; member names made consistent in c3.
- Spoiler rules kept on screen: `withRequestsMadeViaParent` appears nowhere; the Notifier and LoanBasket questions stay
  unanswered; the page behind the "Lend a copy" dialog shows no basket count.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, phone sheet; writers also looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (64): every scene-local `data-start` is intended as local.
- `line_unread` (4): verbatim lesson text under shorter narration clips (the c2 WARNING callout, a c2 "How bad is it?" item,
  the c3 "After the lesson" paragraph) and the c0 08:59 to 09:00 clock flip.
- `dead_stretch` (1): a hold on code while the voice explains it.
- `composition_file_too_large` (1).
- The c3 "Lend a copy" dialog covers the page behind it on purpose (`data-layout-allow-occlusion`).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c0-3 holds the `@Service()` table on a single highlighted row for most of its clip.

## Delivery

- `renders/di-lesson.mp4` (gitignored; published in release `videos-batch-4`): 1920x1080, 30 fps, 10:10, about 29 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.5 LUFS integrated, true peak -1.3 dBTP, clipping count 0.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
