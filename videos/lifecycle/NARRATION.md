# Lifecycle lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. You still know the hooks by heart, and they all still work in Angular twenty-two. Many of their jobs have moved, though. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; the hook names `ngOnChanges`, `ngOnInit`, `ngDoCheck`, the four `After...` hooks, `ngOnDestroy` stacked beside it
- c0-2 | A hook tells you what moment it is in a component's life. A signal-based API tells you what a value depends on. | left: a component timeline with a "now" marker; right: one value with arrows to the signals it reads
- c0-3 | Most lifecycle bugs come from code that asked about the moment when it needed to ask about the dependency. | the "now" marker dims; the dependency arrows stay lit
- c0-4 | The order of the hooks is the same as in seventeen. What is new is where component effects and render callbacks sit in it. | flow diagram "The timeline of one component", boxes drawing on left to right; the "component effects" box is the accent
- c0-4b | And most old habits now have a tool that follows the data. | table "New tools, and the hook each one replaces", rows appearing one by one
- c0-5 | The Init hooks run once. N G on Changes runs each time an input binding receives a new value. | flow diagram: `ngOnInit` and the `...Init` boxes marked "once", `ngOnChanges` marked "new value (Object.is)"
- c0-6 | N G Do Check and the Checked hooks run every time the parent view is checked, whatever caused the check. A check and a data change are two different events. | flow diagram: `ngDoCheck` and the `...Checked` boxes marked "parent checked"; a data change beside them with no arrow
- c0-7 | The render callbacks run after the whole application has rendered, and only in the browser. One rename: the preview after Render is now after Every Render. | flow diagram: the `afterNextRender and afterEveryRender callbacks` box with a "browser only" tag; rename `afterRender` → `afterEveryRender`
- c0-9 | A required signal input throws if you read it before Angular sets it, and the constructor is always too early. A plain input returns its default, which hides that. | error text "Input is required but no value is available yet" with `NG0950`; a non-required `input()` quietly returning its default
- c0-10 | Hooks keep real jobs. N G on Init suits one-off work on the first input values, and N G on Changes hands you the previous value beside the current one. | "When hooks are still the right tool" list: `ngOnInit`, `ngOnDestroy` / `DestroyRef`, `ngDoCheck`, `ngOnChanges`

## Chapter 1: when an input exists, and how often you hear about it (09:00)

- c1-1 | Nine o'clock. At the loans desk, a librarian picks a member, and a banner shows that member's overdue fines. | clock 09:00; member picker on member a; fines banner for member a
- c1-2 | She switches to another member. The banner still shows the first member's fines, and nothing anywhere reports an error. | picker moves to member b; the banner, unchanged, is the accent
- c1-3 | Angular creates the instance first and writes the inputs after. In the constructor, a decorator input still holds its starting value, so anything derived there comes from nothing. | chapter 0 flow, `constructor` and `first input values set` boxes only; an `@Input()` field reading `undefined` inside the constructor box
- c1-4 | N G on Init is the first moment the inputs exist, and it runs once. Its result describes the first member, while a computed follows every new one. | marbles: member input, ngOnInit (its `a` is the accent), computed
- c1-5 | N G on Changes hears only about new references. A parent that edits a property of an object it already passed sends the same reference, and the child hears nothing. | parent holding an object, one property edited in place, the same reference arrow to the child; the child's `ngOnChanges` lamp stays dark
- c1-6 | And with OnPush, now the default, the child is not refreshed either, unless something else marks it dirty. The update is lost, with no error. | the child badged `[OnPush]` keeps its old render; an empty console
- c1-7 | So ask what each value is. Nobody writes the fines. They are derived, so they belong in a computed, recalculated when the member changes and someone reads them. | `LoanForm` code, `fines` line banded
- c1-8 | The return date is a suggestion the librarian may overwrite. The linked Signal starts over for another member or another day, and keeps her edit otherwise. | same code, the band moves to `returnDate`
- c1-9 | One question decides it: does anything write this value? If not, a computed. If it starts over when its inputs change, a linked Signal. If it survives them, a plain signal. | a three-way decision: nobody writes → `computed`; written, resets → `linkedSignal`; written, survives → `signal`
- c1-end | Five questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: views, queries and the DOM (11:30)

- c2-1 | Eleven thirty. Hover a book spine and a tooltip shows the title. | clock 11:30; shelf map, pointer on a spine; tooltip appearing
- c2-1b | The first time it sits in the top left corner, it lands only on the next hover, and the server-rendered page logs an error. | tooltip pinned at the map's top left; second hover, tooltip beside the spine; a server log line with an error marker
- c2-3 | A query holds what exists right now. Before the first render there is no view, so in the constructor and in N G on Init a dynamic query is undefined. | chapter 0 flow with `constructor` and `ngOnInit` boxes tagged `undefined`, the `own view created or refreshed` box still empty
- c2-3b | A decorator query marked static is ready earlier, but only for elements outside if and for blocks. | `@ViewChild(..., { static: true })` resolving before `ngOnInit`; an element inside `@if` crossed out for it
- c2-4 | An element inside an if block exists only while the block shows it. When it appears later, the query points at it, but code that ran earlier stays done. | an `@if` block toggling an element on; the query arrow re-pointing at it; an earlier hook greyed out
- c2-5 | view Child is a signal, so a template, a computed or an effect that reads it runs again when the element comes or goes. | `ShelfSearch` code, `viewChild` line banded
- c2-5b | DOM work belongs in a render hook, because the server skips those. | same code, the band moves to the `afterRenderEffect` block
- c2-6 | Before reaching for a query, check whether a binding would do. Class, style, attribute and disabled bindings need no timing, since Angular applies them every time it renders the element. | the bindings `[class.x]`, `[style.top.px]`, `[attr.data-shelf]`, `[disabled]` on one element
- c2-7 | When you do need a measurement, the phase form keeps reads apart from writes. The early read measures the anchor, and the write phase places the tip without another render. | `SpineTooltip` code, band on `earlyRead`, then on `write`
- c2-8 | Writing a signal from a render hook schedules another pass. Once is fine. In after Every Render it can loop until dev mode stops it with N G zero one zero three. | a render loop arrow circling; `NG0103` stamped on it
- c2-9 | Render hooks run only after Angular renders, so a window resize alone never reaches them. Let CSS do the layout where it can. | the hook table "When / How often / Server"; then a resizing window with the measurement going stale
- c2-9b | If you must measure resizes, start a Resize Observer after the first render and disconnect it on destroy. | a `ResizeObserver` started in `afterNextRender`, disconnected by `inject(DestroyRef).onDestroy(...)`
- c2-10 | A calculation in a Checked hook runs on every check, whatever caused it. Ask how often the result can really change, and attach the work to that. | a generic `expensive()` call ticking on every check (labelled "any per-check hook"), beside a counter that ticks only when its input changes
- c2-end | Before exercise two, ask these. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: half-migrated components (14:30)

- c3-1 | Two thirty. The catalog team moved its shelf widgets to signals one file at a time. Each file now mixes two timing models, and each mismatch fails differently. | clock 14:30; shelf widgets on the desk, each tagged "hooks" or "signals" or both
- c3-2 | A hook is an ordinary method. If a subclass defines N G on Init too, only the subclass's version runs, unless it calls super. | tree diagram `ShelfWidgetBase` with its three subclasses; only the base node is `.hot`, no subclass is animated failing
- c3-2b | The override keyword checks only the name, and neither the compiler nor Angular warns. | the `override` keyword as a label; a compiler lamp and an Angular lamp, both dark
- c3-4 | Composition removes the question: an injected service, a host directive, or Destroy Ref in the class that owns the resource. | the tree with the base node split in two: "types and helpers" and "hooks that must run"
- c3-4b | A base class that shares only types or pure helpers is harmless. One that relies on its hooks running is a contract any subclass can break, silently. | the "types and helpers" half stays; the "hooks that must run" half is the accent
- c3-5 | Angular ignores the promise a hook returns. An async N G on Init returns at its first await, and the first render uses whatever the fields hold at that moment. | flow: `ngOnInit` → `await` (the line breaks) → first render with empty fields
- c3-6 | A rejected promise goes nowhere the template can see. In this app, the global error listeners pass it to the error handler, which logs it. | a rejection travelling through `provideBrowserGlobalErrorListeners()` to `ErrorHandler` and a log line
- c3-6b | And the screen never learns that loading failed. Async state needs a way to say not yet, and failed. | the screen untouched; two empty state slots, "not yet" and "failed"
- c3-7 | Copies have their own timing. An effect that builds a greeting from the member runs during change detection, so anything that reads the greeting earlier sees the old value. | "Derive before you copy" code, the `effect` line banded
- c3-8 | Angular's guidance is direct: do not use an effect to copy state from one signal to another. A computed is current whenever anyone reads it. | the greeting signal with two readers before the effect runs, both holding the old value
- c3-9 | For DOM work, ask whether what it depends on can change after the first render. If it can, a one-shot hook gives you a value that was correct once. | `afterNextRender` (one render) beside `afterRenderEffect` (re-runs when dirty)
- c3-10 | One warning. An after Render Effect, an effect or a computed tracks only the signals it actually read on that run. | WARNING callout from the lesson
- c3-10b | A read skipped by an early return, or by an optional chain that stops short, is not tracked, so its changes never re-run it. | WARNING callout, the early `return` and the short-circuiting `?.` marked
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | When you finish an exercise, compare your fix with its solution, and write the two-sentence review comment you would leave. If you cannot, reread the chapter. | "After the lesson" card
- c3-close | Six o'clock. The desk closes. Tomorrow the same components start their lives again. | clock 18:00, desk lights down
