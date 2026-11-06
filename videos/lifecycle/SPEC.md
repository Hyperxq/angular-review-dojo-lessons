# SPEC: Lifecycle, one day at the library desk

GOAL:    an Angular 17 developer leaves each chapter able to ask its review questions out loud, then pauses to do the exercise.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps, one MP4, one scene file per chapter (`compositions/c0.html` … one file per chapter).
TIME:    narration-driven, length from the narration; each scene's length comes from `assets/vo/durations.json` (see "Scene clock").

## Look (the visual reader's own tokens, light theme)

- Ground `--paper #f7f4ee`; raised `--paper-raised #fffdf9`; sunk `--paper-sunk #efe9de`; rules `#ddd4c5` / strong `#c4b9a6`.
- Ink `#1d1b18`; muted ink `#5f584d`. Accent `#b8321f` on accent-soft `#f5e2d9`: rationed to ONE thing per shot (the marble
  that goes wrong, the line under review, the chapter time).
- Callout tones: note `#2a5a86`/`#e3ecf4`, tip `#356b3f`/`#e3eee0`, warning `#8a5300`/`#f6ead3`, caution `#a3222c`/`#f6dfe0`.
- Code: ground `#fffdf9`, frame `#ddd4c5` at 70%, keyword `#2c5577`, string `#3f6845`, number `#7d5a1f`, plain ink.
- Type: display Newsreader 600, chapter titles 96 px / -1.5% tracking, scene lines 64 px; text Atkinson Hyperlegible Next 400/700,
  body 40 px, labels 30 px (never under 28 px); code Atkinson Hyperlegible Mono 34 px, line height 1.5.
  Fonts are `assets/fonts/{newsreader,atkinson-next,atkinson-mono}.woff2`, declared with `@font-face` in every scene file.
- Light and depth: one shadow only, `0 1px 2px rgb(60 40 20 / .06), 0 8px 24px rgb(60 40 20 / .08)`; radius 8 px; no grain,
  no vignette, no gradients.

## Objects (shared markup in `assets/kit.css`, prefixed ids per scene)

- **Desk app** (home stage): an app window filling 1680 x 920 (120 px side margins), header 88 px with "Circulation desk" (left)
  and the clock `HH:MM` (right, Atkinson 700 40 px, tabular figures). Content area holds the chapter's real screen: member list,
  preview card, returns feed, ticket widgets, shelf map, overdue dashboard, review editor. Drawn as product UI, not icons.
- **Marble diagram** (diagram world, full frame on `--paper-sunk`): one row per stream, label column 360 px right-aligned,
  track from x=440 to x=1800; a frame is `(1800-440)/frames` px. Value = 64 px circle, ink-filled with paper letter, accent fill
  for the one marble the narration points at. `|` = 6 x 72 px ink bar. `#` = 56 px caution-red X-in-square. `x` = a 64 px
  hollow circle with a strike. `-` frames are a 2 px rule. Notes (`// …`) sit under their row in muted ink 30 px. The diagram
  text is copied verbatim from LESSON.md.
- **Code block** (code world): raised ground, 1px frame, 48 px padding, max 14 lines; the line under discussion gets a
  `--accent-soft` band; code text copied verbatim from LESSON.md.
- **Chapter card**: paper ground, time `HH:MM` in accent Atkinson 700 48 px, above it nothing; below it the chapter title in
  Newsreader 96 px, left aligned at x=200, y centred. Holds 3.0 s.
- **Questions card**: note-soft ground, heading "Review questions" Atkinson 700 36 px, each question Atkinson 400 40 px, max
  1440 px wide, verbatim from LESSON.md; questions appear one by one 0.6 s apart, then hold.
- **Tree diagram**: kit `.node` boxes (`.badge` for `[OnPush]`-style badges, `.hot` for the node the narration points at),
  joined by SVG lines in `--rule-strong`, 4 px; laid out top-down, root centred, filling at least 60% of the frame width.
- **Flow diagram**: kit `.fbox` boxes left to right with SVG arrows in ink, 4 px, each edge label as `.flabel` above its
  arrow; arrows draw on when the narration names the step.
- **Pause card**: paper ground, "Pause here." Newsreader 64 px, "Now do exercise NN." Atkinson 700 48 px in accent. Holds 3.5 s.

## Scene clock

- A scene = chapter card (3.0 s) → clips in NARRATION.md order, each starting 0.35 s after the previous ends → (exercise
  chapters) questions card → pause card. Chapter 0 has no questions or pause card; it ends 1.0 s after c0-6.
- Questions card starts with the `cN-end` clip and holds `max(8, 2.0 + 0.3 * words of all questions)` s from its start.
- Each clip is an `<audio id="vo-cN-k" class="clip" src="assets/vo/cN-k.wav" data-start=… data-duration=… data-volume="1">`
  inside its scene; durations come from `assets/vo/durations.json`.
- The visual for a clip lands on its anchor word; a new layout at least every 4 s; nothing moves while it is being read.

## Motion

- Enter: `power3.out`, 18 frames (0.6 s); move: `power2.inOut`, 24 frames; exit: `power2.in`, 12 frames. Cuts between worlds are
  hard cuts or a 12-frame crossfade, never slides.
- Marbles are printed, not slid: each appears with scale 0.6 → 1 and opacity 0 → 1 over 8 frames at its frame position, left
  to right, timed at 0.18 s per frame of the diagram. The pointed-at marble gets a single 1.0 → 1.12 → 1.0 pulse.
- Code lines type in only when the narration is about writing code; otherwise the block is cut in whole and the band moves.
- One hero move per shot; secondary moves start 0.15 s later and travel 60% as far.

## Sound

- Narration Kokoro `af_heart`, speed 1.0, volume 1.
- Music only under chapter cards and questions cards: bundled "Happy Beats / Business Moves vol 1" at 0.12, fade in 0.6 s,
  fade out 1.0 s, a different offset per chapter. No music under narration.
- Effects: none except a soft tick per marble printed in a diagram, rotated over 2 takes, 0.25 volume. Mix target -16 LUFS,
  true peak -1 dBTP.

## Shots

One line per clip lives in NARRATION.md (`what the screen shows`). Each scene file follows it in order.

## BANNED

Dark grounds; glow, particles, gradients, glass; everything centred; everything fading and sliding up; text moving while read;
bullet slides; three cards in a row; icons in circles; HUD/corner labels; a docked logo; the narrator's sentence printed on
screen; any code, symptom or fix from an exercise's TICKET, HINTS or SOLUTION; React.

## QA

- Frame 0 of each chapter: its chapter card with the time.
- Every marble diagram: matches LESSON.md character for character (frames, letters, notes).
- Every questions card: text equals LESSON.md's "Review questions" for that chapter.
- No text under 28 px; nothing outside the 90% action-safe box.
