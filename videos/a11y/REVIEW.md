# Review: Accessibility lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 692.0 s, Kokoro af_heart.
  Chapter 0 also carries the lesson's opening sections ("What moved since Angular 17", WCAG 2.2, the Angular tools).
- NARRATION.md: humanizer, expert review, one correction batch, recheck: approved. The a11y tickets and exercise 03's
  `routerLink="."` were aligned in the dojo.
- Scenes by three writers (c0, c1, c2-c3) who read only LESSON.md. On-screen spoiler check of all four scenes against the
  exercises and solutions: no spoilers. Applied: the tabpanel moved to the tablist's level (it read as a child of its tab),
  the dialog caption now says what "that" refers to, the desk page title reads "Members", and the chips read
  "placeholder is not a label" and `aria-hidden="true" (icon beside real text)`.
- The Angular tools table shows its first five rows through a window with a faded bottom edge; the voice does not mention
  the last two rows (`@HostListener`, `DOCUMENT`), which do not fit at 28 px.
- Spoiler rules kept on screen: no product rows, icon buttons, search box, quantity inputs, "Sort by", "Delete account",
  newsletter form, order tracker, "Help" link, "Status" filter or coloured dots; the calendar uses cell tints only.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- Writers looked at one `--at` frame per shot; the corrected shots were snapshotted again.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (70): every scene-local `data-start` is intended as local.
- `line_unread` (21): verbatim lesson paragraphs under shorter narration clips (the graded examples, the NOTE callout, the
  modal and focus paragraphs).
- `composition_file_too_large` (2): one file per chapter.
- `dead_stretch` (1).

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.
- The November calendar starts on a Saturday (2025 layout); the year is never named on screen.

## Weakest shot

- c1-9: the due-dates graded example is on screen about 6.9 s against a 15.5 s reading floor.
