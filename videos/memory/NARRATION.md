# Memory lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The circulation desk opens at nine, and its staff terminal stays open until closing time. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-1b | A test suite rarely catches a memory bug. A user always does, an hour into a session, as a tab that slows down for no visible reason. | the desk app idle, its clock still at 08:55
- c0-2 | The garbage collector frees an object when nothing reachable points to it. Reachable means a chain from a root: the window, the list of active timers, or the root injector. | the heading "What did not move: reachability", then the roots named in the lesson as labels: `window`, `document`, active timers, root injector, module-level variables
- c0-3 | A destroyed component at the end of such a chain stays in memory, view and DOM included. Every fix cuts the link where the long-lived side holds it. | chapter 1's flow diagram drawn whole, `ReadingRoom instance` as the accent; then the first arrow, out of `browser`, takes the accent
- c0-4 | A leak costs roughly the retained size of one occurrence, times the occurrences per session, times the session's length, against the memory the device can spare. | the four factors from "When a leak matters" appearing one after another on one line
- c0-5 | Two kilobytes per route change is noise on a page reloaded every few minutes. On this terminal it adds up for eight hours, and nothing resets it. | the desk app's single tab, its clock fast-forwarding from 08:55 to 17:00 while the header stays put
- c0-5b | A leak that keeps a whole view, with its DOM and its data, matters even in short sessions. | chapter 1's flow diagram, the `its view and DOM nodes` box as the accent
- c0-6 | Cleanup is for references from long-lived things to short-lived ones. A listener inside the component's own view dies with it. Before adding cleanup, ask what holds it. | the `(click)="borrow()"` row of chapter 1's "Declarative form / Who stops it" table, under the heading "When you do not need cleanup"
- c0-7 | Zoneless is the default since Angular twenty-one, and this app has no Zone dot js. Zone never prevented leaks. | the "What moved" list, the Zone.js item as the accent
- c0-7b | A leaked listener no longer triggers change detection just by firing, unless it sets a signal a template reads, or calls mark For Check. | same item, its last sentence banded
- c0-8 | An injected Destroy Ref registers cleanup in the constructor or a field, right where you create the resource. take Until Destroyed and to Signal use it to end subscriptions. | the "What moved" list, the `DestroyRef` item as the accent, then `takeUntilDestroyed()` and `toSignal()` banded
- c0-9 | The host metadata adds window and document listeners and removes them with the component. An effect gives you on Cleanup, more on that at three o'clock. | the list, the `host` item, then the `effect(fn)` item
- c0-10 | The render hooks run after rendering, in the browser only, with phases that keep DOM reads apart from DOM writes. after Render was renamed after Every Render in version twenty. | the list, the render hooks item; the rename `afterRender` → `afterEveryRender`
- c0-11 | A computed caches a derived value. With On Push as the default, a view renders again when a signal it reads changes, and every plain template method runs again. | the list, the `computed` item
- c0-12 | Some leaks can only be confirmed in Chrome DevTools, and the profiling guide next to the exercises names the exact panels. Then the desk opens. | the file name `GUIDE.md` beside the desk app; the clock turns to 09:00

## Chapter 1: everything you start has a handle (09:00)

- c1-1 | Nine o'clock. A member reads a long book in the reading-room view, closes it, and opens another. The browser does not know the view closed. | clock 09:00; desk app reading-room view with a page of a book; the view closes and another opens
- c1-2 | Listeners, timers, observers and channels keep calling you back. The browser owns them, and keeps your callback and everything it can reach until you tell it to stop. | chapter 1 flow diagram, boxes drawing on from `browser` to `its view and DOM nodes`
- c1-3 | Destroying Reading Room removes it from the view tree. It does nothing to the observer, so the chain from the browser to the component stays intact. | same flow, every arrow still drawn, `ReadingRoom instance` as the accent
- c1-4 | Each API that starts something gives you a way to stop it. Reviewing for leaks is mostly finding that handle and checking that someone uses it. | table "Started with / Handle / Stopped with", rows appearing one by one, every row styled alike with no row accented; the table is gone before the c1-end card
- c1-5 | Or let Angular hold the handle. It stops host listeners and template events itself, and to Signal and take Until Destroyed stop through Destroy Ref. | table "Declarative form / Who stops it"
- c1-6 | In the lesson's reading room, the Resize Observer is created in after Next Render, which never runs on the server, and its disconnect is registered in the same constructor. | `ReadingRoom` code from the lesson, cut in whole, band on the `afterNextRender` block
- c1-6b | A reviewer reads the constructor top to bottom and finds the start next to the stop. | same code, the band moves to `inject(DestroyRef).onDestroy(...)`
- c1-7 | To see a leak, open the Performance monitor from the DevTools command menu and watch the event listeners, the DOM nodes and the heap size. | the lesson's steps 1 and 2; the three counter names "JS event listeners", "DOM Nodes", "JS heap size"
- c1-8 | Visit the page once as a warm-up, then visit and leave it ten times. A healthy page comes back to the same numbers. | step 3 from the lesson
- c1-8b | A counter that grows by a fixed amount on every visit is a leak. | step 3's result: one counter climbing by the same step per visit; use DOM Nodes (never JS event listeners), step of 14, never 2 or 12
- c1-8c | The heap rises and falls as the collector runs. Force a collection, then compare the lowest points and ignore the peaks. | the Memory panel's trash-can button, named as in the lesson
- c1-9 | One warning. DevTools can retain what you logged, expanded or selected, and extensions add their own objects. Use an incognito window or a clean profile, and clear the console first. | WARNING callout from the lesson
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: long-lived objects that point to short-lived ones (11:30)

- c2-1 | Eleven thirty. The desk shows a list of loans, and a root service sends reminders to every row on screen. Rows come and go hundreds of times a day. | clock 11:30; desk app loans list, rows appearing and leaving
- c2-2 | A service provided In root lives as long as the application. A row lives as long as it is on screen. | chapter 2 flow diagram, the `root injector` and `ReturnReminders service` boxes drawing on
- c2-3 | When the service keeps the row in an array, a Map or a Set, the row's lifetime becomes the service's. | same flow, completed to `its view and DOM nodes`, the `Map entry` box as the accent
- c2-4 | A registry is a reasonable design with one rule. Whoever adds an entry owns its removal, and it happens when the entry's owner goes away. | same flow, the `holds in rows` edge as the accent
- c2-5 | A cache is a registry whose keys come from data. It spends memory to save time, and two questions decide whether the trade holds. | the "Caches" section's two numbered questions, question one first
- c2-6 | What is the key's domain? Book ids are bounded, but a catalog of two million books is two million entries. Search terms typed by users have no bound at all. | question one banded
- c2-7 | And what is the value? Data costs its own size. A DOM element costs everything it references, and once off the page, a cached one is a detached DOM node. | question two banded, then its detached-node sentence
- c2-8 | Sizing a cache is a measurement: the hit rate, and the keys people reuse in a session. Evict least recently used, or by time to live when entries go wrong. | the "Sizing a cache" paragraph, least recently used and time to live picked out
- c2-8b | Sometimes the answer is no cache at all, when recomputing costs less than the memory. | the same paragraph, its last sentence banded
- c2-9 | Weak Map and Weak Ref hold an object without keeping it alive. They usually hide a registry's problem: a destroyed component held weakly is called until the collector runs. | table "Tool / Right when / Limits", the `deref()` limit banded
- c2-9b | Weak Map is right for metadata on objects whose lifetime you do not control. A component's lifetime you do know, so remove it explicitly. | same table, the `WeakMap` row's "Right when" cell banded
- c2-10 | A heap snapshot shows what grows and who holds it. After a warm-up, take one, repeat the action ten times, take another, then repeat and take a third. | the lesson's snapshot steps 1 to 3
- c2-11 | A class that grows by the same amount in both comparisons is a leak. Growth in the first one only is usually a cache filling or lazy setup. | step 4, the "# Delta" column named
- c2-12 | The retainers pane walks toward a root. The first holder outside the component is the link to cut. Only the snapshot proves the component is freed. | the `Retainers of LoanRow @81423` tree from the lesson, the `value in Map entry [rows]` row as the accent; then the IMPORTANT callout from the lesson
- c2-end | Five questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: effects, template calls and layout (15:00)

- c3-1 | Three o'clock. The branch dashboard shows a third-party map of shelves, a few statistics and a search box. It gets slower the longer it is open. | clock 15:00; desk app branch dashboard with its shelf map, statistics and search box
- c3-2 | Charts, maps and editors are imperative. Setup runs once and usually adds its own listeners, update runs many times, and teardown runs once. | the dashboard's shelf map alone, framed
- c3-3 | Every Angular hook has a run count too. Match each step of the widget to a hook whose run count equals that step's. | table "Angular tool / How many times it runs", rows appearing one by one
- c3-4 | Every run of an effect starts from scratch. on Cleanup takes down what one run set up, before the next run and on destroy. | the `BroadcastChannel` effect code from the lesson, band on `onCleanup`
- c3-4b | Here the channel belongs to one branch, so one channel per run is its real lifetime. | same code, the band moves to the `new BroadcastChannel(...)` line
- c3-5 | A method called from a template runs on every render of its view. A keystroke changes the term, the view renders, and the summary runs again over the same loans. | the keystroke flow diagram from the lesson, boxes drawing on as each step is named
- c3-6 | Cheap expressions are fine. A sort or nested loop over hundreds of items is a long task per keystroke. A computed caches until a signal it read changes. | same flow, the `long task` box as the accent; then the lesson's `overdueSummary` template code and its one-line `computed` version, off screen before the c3-end card
- c3-7 | Typing is now much cheaper, though the view still renders. If the computation alone tops fifty milliseconds when data changes, move it to a Web Worker, or split it. | the Performance panel's "Main" track as named in step 2, a fifty-millisecond mark on it
- c3-8 | Reading a layout property after a style change forces the browser to compute layout first. Alternate writes and reads in a loop, and every iteration forces one. | the tooltip loop code from the lesson, band on the `getBoundingClientRect()` line
- c3-9 | Batch them, so layout runs once. The render hooks split work into phases, in a fixed order across all components: writes go in write, measurements in read. | the `afterNextRender({ write, read })` code from the lesson, band on `write:`, then on `read:`
- c3-10 | Setting a signal a template reads, from a render hook, schedules another render. Once, in after Next Render, is fine. In after Every Render it can loop without settling. | NOTE callout from the lesson
- c3-11 | A task over fifty milliseconds gets a red triangle. Many purple Layout entries in one task, from your code, are thrashing. Recent Chrome flags a forced reflow. | the lesson's Performance panel steps 2 and 4
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare your fix with its solution and repeat the chapter's measurement. The counters must stay flat, and the class must stop growing. | "After the lesson" card
- c3-afterb | Then write the two-sentence comment for the pull request. | "After the lesson" card, its last sentence banded
- c3-afterc | One trap: an effect tracks only signals it read on its last run. Optional chaining can skip that read entirely. Read signals first, then use them. | WARNING callout from "After the lesson"
- c3-close | Six o'clock. The desk closes. Tomorrow the terminal opens at nine and stays open all day. | clock 18:00, desk lights down



