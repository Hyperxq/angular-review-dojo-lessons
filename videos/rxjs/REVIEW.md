# Review: RxJS lesson video

## Creative calls

- Storyline A, "One day at the library desk", picked by the user. Not built: B "The marble machine", C "Over the reviewer's
  shoulder" (see STORYLINES.md).
- One scene per lesson chapter, 710 s in all. The narration (NARRATION.md) passed humanizer and one expert review
  (1 blocker, 20 other findings, all fixed on recheck). Every diagram, table, code block and review question is copied from
  LESSON.md; no exercise, TICKET, HINTS or SOLUTION file was read by the scene writers.
- Code blocks drop to 28-32 px where a verbatim lesson line would leave the action-safe box (c6, c7 TestScheduler).
- Invented desk-app details (member names, book titles, counts, heap rows) fill the product screens; none relates to an
  exercise.

## Measured

- `npx hyperframes check --json`: ok, 0 errors.
- `snapshot --review`: every scene's start and middle, the 8 seams, phone sheets. Spot frames at 333-339 s and 659-665 s.

## Not checked

- Sound was measured by duration only, never heard. Loudness of the final mix is checked after render with
  `npx hyperframes audio`.
- The phone sheet: code at 28-34 px is not readable at 360 px. The video targets a desktop screen, like the reader.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (175): every scene-local `data-start` is intended as local.
- `line_unread` c2 rule 2 (5.7 s for 30 words): the narrator reads it aloud while it is up.
- `line_unread` c3-3 table (6 cells): the clip is 3.9 s; the next shot (c3-4) keeps the four answers on screen 6 s more.
  Fix with more time: a longer gap after c3-3 in `videos/scripts/timing.py`, then retime c3.
- `composition_file_too_large` c4 (312 lines).

## Weakest shot

- c4-6 opens on an empty paper frame for about 0.3 s while the backoff chart builds (t=332.9 s). With more time: land the
  `retry` heading and the axis on the cut.
