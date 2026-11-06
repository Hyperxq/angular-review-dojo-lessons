# Review: Directives lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter, 596.8 s, Kokoro af_heart.
- NARRATION.md: humanizer, expert review (1 accuracy blocker: c2-7 "everything inside is any"; 9 should-fix, 5 nits), one
  correction batch, recheck: approved. LESSON.md line 267 had the same error and was fixed in the dojo.
- Scenes by two writers (c0-c1, c2-c3) who read only LESSON.md. On-screen spoiler check of all four scenes against the
  exercises and solutions: clean; one label aligned with the narration (c3 "can't write it without looking?").
- Spoiler rules kept on screen: the c0-7 `host` object is banded as one block; c3-7 marks only the MediaQueryList `apply`
  listener (the lesson's `matchMedia` line is dimmed); c3-9 shows the lesson paragraph, with no panel or Tab-key replay.
- Code blocks longer than 14 lines show through a moving 14-line window (c1 LazyCover); 97-110 character lesson lines are set
  at 28 px with tightened letter-spacing or trimmed alignment spaces, characters unchanged.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- `snapshot --review`: each scene's start and middle, phone sheet; writers also looked at one `--at` frame per shot.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (65): every scene-local `data-start` is intended as local.
- `line_unread`: c0 "Zoneless, again" paragraph (104 words, 15.9 s) and the c3-9 focus paragraph (73 words, 9.2 s). Both are
  verbatim lesson text; the voice reads the banded sentences while they are up.
- `dead_stretch` (5, 4-10 s, in c2 and c3): holds on code and the focus paragraph while the voice explains them.
- `composition_file_too_large` c3.

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c2 at 368-378 s holds one code frame for about 10 s while the narration covers the context guard.

## Delivery

- `renders/directives-lesson.mp4` (gitignored; published in release `videos-batch-2`): 1920x1080, 30 fps, 9:57, about 28 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.4 LUFS integrated, true peak -1.5 dBTP, no clipping.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
