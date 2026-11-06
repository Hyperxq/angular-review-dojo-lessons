# Review: Performance lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (five), 653.5 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review (1 accuracy blocker: c3-3 claimed Zone.js updated the ResizeObserver grid, while default
  Zone.js does not patch ResizeObserver; 8 should-fix, nits), one correction batch, recheck: approved. LESSON.md lines 56, 351
  and 555 were fixed in the dojo.
- Scenes by two writers (c0-c1, c2-c4) who read only LESSON.md. On-screen spoiler check of all five scenes against the
  exercises and solutions: clean.
- Spoiler rules kept on screen: the waiting list never moves and nothing is typed; the reading list shows no counter; the
  status line is static; the `track` and cost tables accent no row; the "Getting a callback into Angular" table is absent.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, phone sheet; writers also looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (66): every scene-local `data-start` is intended as local.
- `line_unread` (9): verbatim lesson text under shorter narration clips (c2 linkedSignal, c3 Event Listeners sentence, c4
  observe steps, compiler paragraph, server-rendering bullet, barrel sentences). The voice reads the banded part.
- `composition_file_too_large` c4.

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.
- The c2-2 DevTools panel lists the invented `expanded` signal under a "Signals" heading; the real panel may group it under
  Properties. Not verified against a screenshot.

## Weakest shot

- c3-7 holds the Performance and Network panels with placeholder bars and no timing numbers, by design, so the shot reads as
  a diagram more than a real trace.
