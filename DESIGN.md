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
| `--ink` / `--ink-2` / `--ink-3` | `#1d1b18` / `#4b463f` / `#6b6459` | `#e4ddd0` / `#c4bcad` / `#9d9586` | text levels; dark `--ink` is held back a little (13.5:1 on paper) so long reading does not glare; `--ink-3` stays above 4.5:1 |
| `--accent` | `#b8321f` | `#f08a6c` | seal red: current chapter, primary button, playhead, keywords |
| `--note`, `--tip`, `--warning`, `--caution` | blue, green, amber, red | lighter versions | callouts and their tinted grounds |
| `--m0` … `--m5` | six hues | lighter versions | marble values; the same value keeps its colour across rows |
| `--code-ground` / `--code-frame` | `--paper-raised` / 70% `--rule` | the same tokens | code blocks sit a step lighter than the page with a soft frame; the language/Copy row has a 1px rule under it |
| `--code-keyword` | `#2c5577` (7.7:1) | `#93b4d4` (7.9:1) | keywords: one muted cool hue, never red, which reads as an error |
| `--code-string` | `#3f6845` (6.3:1) | `#a9c79e` (9.2:1) | strings and regexes |
| `--code-number` | `#7d5a1f` (6.2:1) | `#d4b483` (8.6:1) | numbers and literals (`true`, `null`) |

Syntax highlighting is restrained: names, properties, parameters, types and method calls stay in plain `--ink`;
comments are `--ink-3` (5.7:1) in roman; declared functions and type names get weight 600 instead of a hue. Ratios are
against `--code-ground`. Nothing in code gets a background box.

No violet anywhere. Callouts are a tinted surface with a 1px frame and a drawn icon, not a thick coloured left border.
Selection, focus rings, scrollbars and the range input take their colours from the palette.

## Type

| Role | Face | Size |
|------|------|------|
| Lesson text, index copy | Atkinson Hyperlegible Next (variable), chosen for legibility of long technical prose | body `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)`, line height 1.65; 1.7 with `letter-spacing: 0.005em` in dark; 1.55 below 40rem |
| Headings, page title, topic names | Newsreader at `opsz` 60–72 | `clamp(2rem, 1.5rem + 2vw, 3rem)`; index title up to 3.75rem |
| Interface (rail, buttons, meta, labels) | Atkinson Hyperlegible Next too (`--font-ui` points at `--font-text`): one sans family for the whole page | 0.8125–0.9375rem; nothing smaller than 0.8125rem |
| Code, stream labels, paths | Atkinson Hyperlegible Mono, ligatures off; the mono sibling of the text face, with a real italic | code blocks at 0.875 × the body size (about 15–16.6px), line height 1.6; inline code 0.9em |

The reading column is `--measure: 41rem` (about 68 characters of body text). Code blocks, tables and diagrams may run
to `--measure-wide: 54rem`, because a line of code or a diagram needs more room than a line of prose. Both are set in
rem, not `ch`, so every block of a kind shares one right edge despite the different fonts.

Labels are sentence case at weight 500 with no tracking and no uppercase (callout labels, the code language). Comments
in code, marble notes and flow edge labels are roman, not italic. Inline code repeats its background on each line it
wraps to (`box-decoration-break: clone`); code inside a heading loses the background. Lesson `###` headings render as `h2`
because the chapter title owns the page's only `h1`.

## Layout

Header, rail and content share one frame, so their outer edges line up at every width. The tokens live in `:root`:

| Token | Value | Use |
|-------|-------|-----|
| `--gutter` | 1.5rem, 1rem below 40rem | side padding of header and pages |
| `--frame` | 72rem | content width of header, index and chapter layout |
| `--rail` / `--rail-gap` | 14rem / 4rem; 13rem / 3rem below 90rem | chapter rail column and the space after it |
| `--measure` / `--measure-wide` | 41rem / 54rem | prose / code, tables and diagrams |

| Width | Layout |
|-------|--------|
| 90rem and up | rail 14rem, gap 4rem, reading column takes the rest of the 72rem frame |
| 64–90rem | rail 13rem, gap 3rem |
| below 64rem | one column; the rail folds behind a "Chapters" button with the done count |
| below 40rem | gutter 1rem; code, tables and diagrams run edge to edge with square corners |

- Index: one column, topics as rows grouped by Part 1 and Part 2. Each row has the topic name, the next exercise
  chapter's title in sentence case (as the rail shows it, no "Chapter N:" prefix), a tick per chapter (filled when done)
  and a link that resumes where the reader stopped. The intro paragraph keeps the reading measure.
- Chapter: a sticky chapter rail on the left and the article on the right. Previous and next links close every page.
  On a phone the exercise path on the meta line takes its own row.
- No eyebrows above headings: chapter number, exercise number and path sit on a meta line under the title. The `·`
  separator trails its item, so a wrapped line never starts with one, and the path wraps only after a `/`.

## Reading mode

An explicit mode for reading without the furniture, turned on by the "Reading mode" button under the chapter title
(it shows its `R` shortcut, and `Esc` once on) or the `R` key. The choice is kept in localStorage and only chapter pages
act on it, so the index always has its header.

- Hidden: the app header and the chapter rail, including the phone "Chapters" fold-out.
- The layout becomes one centred column `--measure-wide` wide. Prose keeps `--measure`; code and diagrams use the full
  column; both share the left edge, so the text column does not widen.
- Orientation stays: the chapter title and meta line at the top, a 3px accent progress bar fixed along the top edge
  (`role="progressbar"`, labelled with the chapter title), and a small pill in the bottom-right corner with ← / →
  and the chapter number. Its links are named "Previous chapter: …" and "Next chapter: …"; `←` / `→` do the same.
  The large previous/next links still close the page.
- Keys are ignored while typing in a field, with a modifier held, and (for the arrows) when focus is in the marble
  player, which steps frames with them.
- Header and rail leave at once and fade back in over 150ms (strong ease-out); the corner pill fades in with a 4px
  rise. Reduced motion keeps the fades and drops the rise. Turning the mode on or off scrolls so the line being read
  stays where it was, and focus stays on the toggle.

## Motion

| Element | Rule |
|---------|------|
| Buttons | `scale(0.97)` on press, 140ms, strong ease-out `cubic-bezier(0.23, 1, 0.32, 1)` |
| Hover (links, rows, rail) | colour and background only, 160ms, behind `(hover: hover) and (pointer: fine)` |
| Press on full-width rows (index rows, rail links) | background turns `--paper-sunk`; no scale, a full-width row shrinking looks broken |
| Disabled buttons | `opacity: 0.45`, `cursor: not-allowed`, no hover or press |
| Marble player | the playhead moves with `requestAnimationFrame` at 4 frames per second; each marble fades and scales from 0.6 as the playhead reaches its centre (160ms opacity, 220ms scale); the live rail grows with `transform: scaleX` |
| Reduced motion | movement goes, feedback stays: no press scale, no arrow nudge, marbles appear without scaling, and the player jumps one whole frame every 550ms instead of sliding; colour and opacity fades stay (about 120ms) |

Keyboard stepping in the player is instant. The diagram starts fully drawn, so a reader who never presses Play still
sees the whole picture.

## Marble player

- Rows share one time axis: a frame is the same x in every row, and a ruler marks every fifth frame (numbers at 0.8125rem).
- Values are coloured discs with their letter; `|` is an ink bar, `#` a red cross, `x` a grey slashed circle. The rail
  stops at the terminal mark and is dashed where time has not reached yet.
- Trailing `// notes` sit under their row in roman `--ink-2`, on a paper chip so the playhead passes behind them.
- Controls: Play/Pause/Replay, back and forward one frame, a scrubber, and a frame counter. Space toggles play and the
  arrow keys step when focus is inside the player.
- Screen readers get a text summary of every row and a polite announcement of what happens at each stepped frame. The
  original text block is one click away under "Text version", a disclosure with a drawn chevron.
- On narrow screens the stage scrolls sideways instead of shrinking marbles below a readable size.

## Flow diagrams

Ranks stack top to bottom 3.5rem apart, nodes in a rank 2rem apart. An edge label sits at about 70% of the way along
its curve, towards the target, and wraps at 8rem, so edges fanning out of one node keep their labels apart.
