# Review: SSR lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 611.2 s, Kokoro af_heart.
  Chapter 0 also carries the lesson's opening sections (why SSR, how bad an SSR finding is, how the dojo simulates a server).
- NARRATION.md: humanizer, expert review (2 blockers: a setInterval or polling loop holds the server render only with Zone.js,
  since Angular 22 is zoneless by default; the websocket claim was dropped), 8 should-fix, nits and cuts toward 10 minutes, one
  correction batch, recheck: approved. LESSON.md lines 52-54 and 264-266 were fixed in the dojo, and the ssr/01 ticket and
  ssr/03 hint were aligned with their code.
- Scenes by three writers (c0-c1, c2, c3) who read only LESSON.md. On-screen spoiler check of all four scenes against the
  exercises and solutions: clean.
- Spoiler rules kept on screen: no preferences page or theme toggle, no product list, promo banner or "New" badge, no article
  with a reaction bar or dated comments; the transfer cache example uses the lesson's `/api/shelves`; the comments widget is
  grey bars only.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- Writers looked at one `--at` frame per shot; c0-c1 visuals were timed to word anchors from a local whisper pass.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (63): every scene-local `data-start` is intended as local.
- `line_unread` (15): verbatim lesson lists, tables and paragraphs under shorter narration clips (c0 costs list, rendering-mode
  table, dojo paragraph; c1 flow labels; c2 option list; c3 `hydrate never` row and paragraph, "After the lesson").
- `dead_stretch` (4): holds on tables and code while the voice explains them.
- `composition_file_too_large` (1).

## Not checked

- Sound was not heard; loudness is measured after render. "DOCUMENT" in capitals was not listened to.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.
- "The default since v21" for zoneless comes from the lesson; the installed 22.2.2 package confirms the default today only.

## Weakest shot

- c0 opening sections: the "What it costs" third item and the rendering-mode table each stay up about 2-3 s before the voice
  moves on.

## Delivery

- `renders/ssr-lesson.mp4` (gitignored; published in release `videos-batch-4`): 1920x1080, 30 fps, 10:11, about 31 MB.
- Mix normalized with ffmpeg `loudnorm` (I=-16, TP=-1.5): -16.4 LUFS integrated, true peak -1.4 dBTP, clipping count 0.
- Frame 0 is chapter 0's card, which serves as the thumbnail.
