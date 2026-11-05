# Design

A reading tool for a senior engineer coming back to Angular. People spend long stretches in it, so reading comfort
decides most things. The identity is paper and ink with one seal-red accent: a dojo's notebook, not a docs template.

## Mode

Read, in the sense the Impeccable skill uses: structure for understanding first. The one moment of motion is the marble
player, because it explains time, which static text cannot. Nothing else animates on load or on scroll.

## Colour

All tokens are in `src/styles.css` and use `light-dark()`, so one declaration covers both themes. The theme follows the
system until the reader picks one with the toggle; the choice is stored and applied before first paint by a short
script in `index.html`.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--paper` | `#f7f4ee` | `#16150f` | page ground, warm rather than white |
| `--paper-raised` | `#fffdf9` | `#1e1c16` | diagrams and the exercise panel |
| `--paper-sunk` | `#efe9de` | `#22201a` | code, inline code, hover |
| `--ink` / `--ink-2` / `--ink-3` | `#1d1b18` / `#4b463f` / `#6b6459` | `#ece6da` / `#c4bcad` / `#9d9586` | text levels; `--ink-3` stays above 4.5:1 on paper |
| `--accent` | `#b8321f` | `#f08a6c` | seal red: current chapter, primary button, playhead, keywords |
| `--note`, `--tip`, `--warning`, `--caution` | blue, green, amber, red | lighter versions | callouts and their tinted grounds |
| `--m0` … `--m5` | six hues | lighter versions | marble values; the same value keeps its colour across rows |

No violet anywhere. Callouts are a tinted surface with a 1px frame and a drawn icon, not a thick coloured left border.
Selection, focus rings, scrollbars and the range input take their colours from the palette.

## Type

| Role | Face | Size |
|------|------|------|
| Lesson text, headings | Newsreader (variable, optical sizes) | body `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)`, line height 1.65 |
| Page title | Newsreader at `opsz` 60–72 | `clamp(2rem, 1.5rem + 2vw, 3rem)`; index title up to 3.75rem |
| Interface (rail, buttons, meta) | Instrument Sans | 0.8125–0.9375rem |
| Code, stream labels, paths | JetBrains Mono, ligatures off | 0.82–0.875rem |

The reading column is `--measure: 43rem` (about 70 characters of body text). It is set in rem, not `ch`, so prose,
code blocks and diagrams share one right edge despite their different fonts. Lesson `###` headings render as `h2`
because the chapter title owns the page's only `h1`.

## Layout

- Index: one column, topics as rows grouped by Part 1 and Part 2. Each row has the topic name, the next exercise chapter,
  a tick per chapter (filled when done) and a link that resumes where the reader stopped.
- Chapter: a sticky chapter rail on the left and the article on the right. Below 60rem the rail collapses behind a
  "Chapters" button that also shows the done count. Previous and next links close every page.
- No eyebrows above headings: chapter number, exercise number and path sit on a meta line under the title.

## Motion

| Element | Rule |
|---------|------|
| Buttons | `scale(0.97)` on press, 140ms, strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` |
| Hover (links, rows, rail) | colour and background only, 160ms, behind `(hover: hover) and (pointer: fine)` |
| Marble player | the playhead moves with `requestAnimationFrame` at 4 frames per second; each marble fades and scales from 0.6 as the playhead reaches its centre (160ms opacity, 220ms scale); the live rail grows with `transform: scaleX` |
| Reduced motion | all transitions drop to near zero, and the player jumps one whole frame every 550ms instead of sliding |

Keyboard stepping in the player is instant. The diagram starts fully drawn, so a reader who never presses Play still
sees the whole picture.

## Marble player

- Rows share one time axis: a frame is the same x in every row, and a ruler marks every fifth frame.
- Values are coloured discs with their letter; `|` is an ink bar, `#` a red cross, `x` a grey slashed circle. The rail
  stops at the terminal mark and is dashed where time has not reached yet.
- Trailing `// notes` sit in italics under their row.
- Controls: Play/Pause/Replay, back and forward one frame, a scrubber, and a frame counter. Space toggles play and the
  arrow keys step when focus is inside the player.
- Screen readers get a text summary of every row and a polite announcement of what happens at each stepped frame. The
  original text block is one click away under "Text version".
- On narrow screens the stage scrolls sideways instead of shrinking marbles below a readable size.
