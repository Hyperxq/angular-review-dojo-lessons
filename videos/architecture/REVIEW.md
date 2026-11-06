# Review: Architecture lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 654.0 s, Kokoro af_heart.
  Chapter 0 also carries the lesson's opening sections (the forces table, the label ladder, "What moved since Angular 17").
- NARRATION.md: humanizer, expert review, one correction batch, recheck: approved; a later fix credits the SRP clarification
  to its author. LESSON.md (ladder line, SRP) and the architecture tickets were aligned in the dojo; the solutions branch
  rates 01 item 2 as should-fix and its 03 ADR no longer lists an orders panel.
- Scenes by three writers (c0, c1, c2-c3) who read only LESSON.md. On-screen spoiler check of all four scenes against the
  exercises and solutions: clean. Applied two continuity nits: the c0 desk page reads "Members", and the c3 desk uses the
  same navigation as c2.
- Spoiler rules kept on screen: no order summary, price, invoice, billing, catalog or shipping cycle, shop service or
  cart/wishlist/orders teams; the folder tree and its `internal` folders come from the lesson's own library example.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- Writers looked at one `--at` frame per shot; the two changed desk shots were snapshotted again.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (67): every scene-local `data-start` is intended as local.
- `dead_stretch` (2): label-only holds the cues ask for.
- `composition_file_too_large` (1).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c1-2: the "container" and "presentational" labels hold one layout for about 18.5 s, longer than the SPEC's 4 s rhythm.

## Delivery

- `renders/architecture-lesson.mp4` (gitignored; published in release `videos-batch-6`): 1920x1080, 30 fps, 10:54, about 30 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.4 LUFS integrated, true peak -0.6 dBTP, clipping count 0.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
