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
| T4 | S1 S2 S3 | c0 + kit inline; c1-c8 delegated, 4 parallel writers × 2 scenes | done: check ok, 0 errors; seam check = full check + review snapshot | see T5 |
| T5 | S1 | inline | done: user approved ("Si dale"); rendered 11:50, loudness normalized to -16.9 LUFS | see Log |
| T6 | S2 | inline | done: user chose "Tanda de 3 ahora (Recommended)" | |
| T9 | S1 S3 | same pipeline as T8, plus the on-screen spoiler check | in progress: batch 2 memory, directives, forms; batch 1 renders running | |
| T8 | S1 S3 | per topic: narration writer → expert review → correction → recheck; voice + timing inline; scenes by 2 parallel writers | done: three videos in preview, not rendered; each scene set passed a spoiler check (change-detection and lifecycle needed fixes) | fc1a7bd + this commit |

## Log

- L1 (2026-11-06) "puedes crear un video por cada leccion usando /brag:brag ?"
- L2 (2026-11-06) Goal answer: "Video que enseñe". Pilot answer: "Piloto rxjs (Recommended)".
- L3 (2026-11-06) Storyline answer: "A. Un día en el mostrador (Recommended)".
- L4 Route evidence T4: Writer trigger (a) parallelism. Eight scene files with disjoint edit surfaces, each 200+ lines; parent owns
  index.html, kit.css and timing.json. Kokoro needs a Python 3.14 venv (3.15 has no onnxruntime wheels).
- L5 (2026-11-06) User asked "ya hay un video para ver el resultado?" -> Studio preview started before render, per the hyperframes work loop.
- L6 (2026-11-06) "hay una voz que suene menos robotica?" -> Gemini samples; Sulafat picked, but the free tier caps gemini-3.8-flash-tts at 10 requests a day. Decision: "dejemos kokoro por el momento, quita los cambios de gemini". Narration stays Kokoro af_heart.
- L7 (2026-11-06) Render approved: "Si dale". Then "puedes ir tirando en paralelo los otros videos?" -> answer "Tanda de 3 ahora (Recommended)": rxjs-to-signals, change-detection, lifecycle, same format as the pilot.
- L8 Scene writers invent props beyond LESSON.md; invented code in change-detection c3 copied exercise 03. Every video now gets a read-only spoiler check of its on-screen text by the reviewer that read the exercises.
- L9 (2026-11-06) "Si me gustan, continuemos" -> render batch 1 (videos/scripts/render.sh) and continue in batches of 3: memory/directives/forms, routing/performance/testing, security/ssr/di, a11y/state/http-errors, architecture/capstone.
- L10 (2026-11-06) Batch 2 narrations: three expert reviews (rework: directives c2-7 "everything inside is any", forms c3-15 submit does not wait under ignoreValidators 'none', memory c1-7 "JS heap size" and c3-9 phase order) -> one correction batch each -> recheck: all approved (5669c99). The same errors sit in the dojo LESSON.md files (directives ~267, forms ~311 and ~507, memory heap label and c0-5 crash claim); not edited, user decision.
- L11 Voice runs failed at random: bare `npx hyperframes` resolved 0.9.19, whose tarball npm returned 404. Pinned `hyperframes@0.9.17` in render.sh and the voice script, which now retries and resumes. Totals: directives 596.8 s, forms 624.6 s, memory 604.4 s. Scenes: 6 parallel writers, 2 scenes each (Writer trigger (a)).
- L12 (2026-11-06) Batch 1 rendered: rxjs-to-signals 10:00 -16.4 LUFS, change-detection 8:45 -16.5, lifecycle 8:22 -16.6 (afbbd98).
