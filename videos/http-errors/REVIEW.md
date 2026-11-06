# Review: HTTP errors lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 630.2 s, Kokoro af_heart.
  Chapter 0 also carries the lesson's opening sections ("What moved since Angular 17").
- NARRATION.md: humanizer, expert review, one correction batch, recheck: approved. The http-errors tickets and exercise 02's
  hint 3 were aligned in the dojo.
- Scenes by three writers (c0, c1, c2-c3) who read only LESSON.md. On-screen spoiler check of all four scenes against the
  exercises and solutions: clean, no changes.
- Spoiler rules kept on screen: no catalog page, empty state, error-tracking tool, orders, payments, toast list, deleted-product
  404, three-way dashboard or sign-out during a refresh; the desk props are members, loans and an idle shared terminal.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- Writers looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (68): every scene-local `data-start` is intended as local.
- `line_unread` (5): verbatim lesson text under shorter narration clips (the c1 `/api/holds` review comment, two list items
  in c2 and c3, the c3 "After the lesson" paragraph).
- `dead_stretch` (2): single-label holds the cues ask for (`RFC 9110`, `Idempotency-Key`).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c1-16: the 55-word should-fix comment is on screen 8.2 s against a 12.75 s reading floor; the questions card starts at a
  fixed time right after it.
