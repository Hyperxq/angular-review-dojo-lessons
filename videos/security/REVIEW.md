# Review: Security lesson video

## Creative calls

- Same format as the rxjs pilot: one day at the library desk, one scene per lesson chapter (four), 617.7 s, Kokoro af_heart.
  Chapter 0 also carries the lesson's opening sections (the four labels, the three factors, the worked examples); chapter 3
  ends with "What Angular does not protect you from" and "After the lesson".
- NARRATION.md: humanizer, expert review (1 accuracy blocker: withCredentials attaches the destination site's cookies, not
  your users' cookies; 10 should-fix: Trusted Types bypass policies, Renderer2 setProperty only for innerHTML, "often", the
  transfer cache defaults, XSRF already on by default), one correction batch, recheck: approved. LESSON.md lines 59, 63,
  207-208 and 270 were fixed in the dojo, and the security/03 ticket was aligned with its code.
- Scenes by three writers (c0, c1, c2-c3) who read only LESSON.md. On-screen spoiler check of all four scenes against the
  exercises and solutions: clean. Fixes applied: the XSRF row says "as it was in 17", the desk nav says "Catalog".
- Spoiler rules kept on screen: no sign-in page or returnUrl, no bio or website field, no API client or token store, no
  markdown preview, no attachments list, no "shared with you" banner; c3-7 names no URL scheme.

## Measured

- `npx --yes hyperframes@0.9.17 check --json`: ok, 0 errors.
- Writers looked at one `--at` frame per shot; the c0 table was rechecked after the XSRF wording change.

## Warnings kept on purpose

- `nested_media_start_basis_ambiguous` (61): every scene-local `data-start` is intended as local.
- `line_unread` (10): verbatim lesson paragraphs and worked examples under shorter narration clips. The voice reads the
  banded part.
- `dead_stretch` (1): a hold on code while the voice explains it.

## Not checked

- Sound was not heard; loudness is measured after render.
- Code at 28-34 px is not readable at phone width; the video targets a desktop screen.

## Weakest shot

- c0-9 to c0-11: the seven-row "What moved since Angular 17" table does not fit, so it shows rows 1-5 and then scrolls once
  to rows 3-7.
