# Lesson videos

Objective: a teaching video per dojo lesson, piloted on `rxjs` before the other 17. Branch: `feat/lesson-videos` in this repo.
Delivery: ask-on-risk. Runner: `npx hyperframes check --json` and `snapshot --review` (no unit tests for compositions).

## Specs

- **S1 Teaching video per lesson.** "puedes crear un video por cada leccion usando /brag:brag ?" / goal answer: "Video que
  enseñe". `/brag` caps a video at 25 s and is a launch format, so the videos are built with Hyperframes directly (the engine
  `/brag` uses), one scene per lesson chapter.
- **S2 Pilot first.** Answer: "Piloto rxjs (Recommended)". Build `rxjs` only; the other 17 wait for the user's decision after
  watching it.
- **S3 (assumption) Same rules as the lessons.** English narration and copy; no spoilers (teach rules at Hint 2 level, never
  the exercise's defect or fix); the `LESSON.md` is the only source; every narration script goes through humanizer and one
  domain-expert reviewer (the lessons' S5 and S8).
- **S4 (assumption) Storyline picked by the user.** Three storylines in `videos/rxjs/STORYLINES.md`; build only the picked one.

## Tasks

| ID | Specs | Route | Status | Commit |
|----|-------|-------|--------|--------|
| T1 | S4 | inline | done: user picked "A. Un día en el mostrador (Recommended)" | 6f587d3 |
| T2 | S1 S3 | inline | done: SPEC.md, NARRATION.md; humanizer; expert review rework (1 blocker c7 contract, 8 should-fix) → 1 correction batch → recheck: all 21 fixed | 6f587d3 |
| T3 | S1 | inline | done: 63 clips (wav gitignored), durations.json, timing.json via videos/scripts/timing.py; 710 s total | 6f587d3 |
| T4 | S1 S2 S3 | c0 + kit inline; c1-c8 delegated, 4 parallel writers × 2 scenes | in progress | |
| T5 | S1 | inline | pending: check, snapshot review, Studio preview, render after approval | |
| T6 | S2 | inline | pending: user decides the other 17 | |

## Log

- L1 (2026-11-06) "puedes crear un video por cada leccion usando /brag:brag ?"
- L2 (2026-11-06) Goal answer: "Video que enseñe". Pilot answer: "Piloto rxjs (Recommended)".
- L3 (2026-11-06) Storyline answer: "A. Un día en el mostrador (Recommended)".
- L4 Route evidence T4: Writer trigger (a) parallelism. Eight scene files with disjoint edit surfaces, each 200+ lines; parent owns
  index.html, kit.css and timing.json. Kokoro needs a Python 3.14 venv (3.15 has no onnxruntime wheels).
