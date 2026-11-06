# RxJS lesson video: storylines

Source: `angular-review-dojo/src/app/exercises/rxjs/LESSON.md` (chapter 0 plus chapters 1-8). One scene per chapter,
45-75 s each, about 8-10 min in all. Every chapter ends on its review questions and "Now do exercise NN".

## A. One day at the library desk (recommended: it is the lesson's own world, so every example is already in the source)

- **Device / form:** a moment in someone's day; one frame that rebuilds.
- **What the viewer sees:** the library's circulation desk app, open from opening to closing time. Each chapter is a time
  of day, and the app's own events turn into the marble diagram the lesson draws: the pointer moving over members 1, 2 and 3
  emits marbles that fall into the timeline, and the preview card ends on the wrong member.
- **First two seconds:** the desk app at 09:00, a clock in the app's header, the offline banner flickering on as the network
  drops.
- **Beats:** 09:00 the app → chapter 0 what moved since v17 → one chapter per hour (leak by the afternoon, hover race, …) →
  each chapter closes on its review questions → 18:00 the tab still open, "Now do exercise 01".
- **Look:** the visual reader's own tokens: Atkinson Hyperlegible for text and UI, Newsreader for chapter titles, the reader's
  code palette, marbles drawn as the reader draws them.
- **Sound:** Kokoro narration, a quiet bed under it, soft ticks on each marble.

## B. The marble machine (the bold one)

- **Device / form:** the object is the explanation; a flight through one world.
- **What the viewer sees:** a physical marble run. A stream is a rail, a value is a marble, an operator is a station on the
  run: `switchMap` is a gate that drops the marble still rolling when a new one arrives, `concatMap` a queue, `exhaustMap` a
  gate that closes while busy. The camera travels down the machine, one station per chapter.
- **First two seconds:** a marble lands on an empty rail and rolls toward a gate that swings shut on it.
- **Beats:** the empty rail → chapter 0 builds the stations → each chapter is a stop where the lesson's example runs through
  the machine → the full machine, the review questions printed on the last station.
- **Look:** wood and brass on a light workshop ground, marbles in the reader's marble colours, labels engraved on the rails.
- **Sound:** narration over the marbles' own clicks and rolls, no music.

## C. Over the reviewer's shoulder

- **Device / form:** a real screen with the detail circled; split screen to one.
- **What the viewer sees:** the lesson's code samples in an editor, with the marble timeline drawn live under the line that
  produces it. The reviewer's questions appear as review comments on the line they are about.
- **First two seconds:** `this.api.loanCount(memberId).subscribe(…)` with a review comment opening on it: "What if the
  responses came back in reverse?"
- **Beats:** editor on the code → the timeline draws under it → the rule as one line → the review questions as comments →
  "Now do exercise NN".
- **Look:** the reader's code palette on its raised code background, Atkinson Hyperlegible Mono, one accent for the line under
  review.
- **Sound:** narration, keyboard ticks on code changes, a low bed.
