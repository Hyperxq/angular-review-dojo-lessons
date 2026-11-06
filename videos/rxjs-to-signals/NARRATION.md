# RxJS to signals lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine, and its app mixes two worlds: signals in some places, observables in others. This lesson is about the border between them. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-2a | First, the app is zoneless. | `zone.js` struck from the dependency list
- c0-2b | Angular renders when a signal that a template reads changes, when a template event runs, when an async pipe gets a value, or when someone calls markForCheck. | four inputs light a "render" lamp: signal read by a template, template event handler, `async` pipe, `markForCheck()`
- c0-3a | Second, OnPush is the default in version twenty-two. The old behaviour is now called Eager. | label `ChangeDetectionStrategy.Eager` (`Default` = deprecated alias) for the old behaviour
- c0-3b | An OnPush view is checked for a new input reference, an event inside it, or a signal it reads. | tree diagram with `[OnPush]` badges; the three triggers light one node at a time
- c0-4 | Since seventeen, signals spread into inputs, queries, routing and data loading. Every row of that table is stable now, toSignal and toObservable included. | "The signal toolbox, then and now" table, rows appearing top to bottom
- c0-5 | A signal holds what is true right now, like the member who is signed in. An observable describes things that happen over time, like a keystroke or a server push. | a signal box "signed-in member" beside a marble line of keystrokes, pushes, ticks
- c0-6 | Most review findings in these exercises come from putting one kind of thing in the other kind of container. | a keystroke marble dropped into the signal box, accent on it
- c0-7 | Cross the border once in each direction: toObservable when a value needs time-based operators, toSignal when the result has to reach a template. | flow diagram from the lesson: event → observable pipeline → toSignal → signal graph → template, and back through toObservable
- c0-8a | Those two, along with effect, must run in an injection context, and so must takeUntilDestroyed when you call it without arguments. | NOTE callout: field initializer, constructor, factory
- c0-8b | To use them later, pass an injector, or a DestroyRef for takeUntilDestroyed. | the same callout, band on its `injector` / `DestroyRef` sentence
- c0-9 | And toSignal subscribes the moment it is called, then holds on until its context is destroyed. For a root service, that means the whole session. | WARNING callout: lifetime bars for component vs `providedIn: 'root'`; the three return types `Signal<T | undefined>`, `initialValue`, `requireSync: true`

## Chapter 1: state that is read in two ways (09:00)

- c1-1 | Nine o'clock. Most screens at the desk read the same shared loans. The first decision is which container holds them, and the answer depends on who reads them. | desk app, clock 09:00; a store box with arrows to "template", "computed" and "polling loop"
- c1-2 | The store has two kinds of readers. A template or a click handler wants the current value now. A polling loop wants to hear about changes over time. | two reader groups: template / computed / click handler vs polling loop / websocket merge
- c1-3a | A BehaviorSubject serves pipelines directly. Templates have to subscribe, or reach into its value, which is a back door. | BehaviorSubject column: pipelines wired directly, templates via a subscription, `subject.value` marked as the back door
- c1-3b | A signal is the reverse: templates read it directly, and pipelines go through toObservable. | signal column beside it: templates wired directly, pipelines via `toObservable`
- c1-4 | So ask who reads the store most, and how. When most readers are templates and derived values, a signal is the simpler container. | `LoanStore` code block from the lesson
- c1-5 | Expose it with asReadonly, and consumers get a signal they can read but never set. Only the store writes. | same code, band on `readonly loans = this.state.asReadonly();`
- c1-6a | Keep it observable when most consumers are pipelines, when you migrate gradually with toSignal at the edge, or when what you store is a stream of events. | "Keep it observable when" list from the lesson
- c1-6b | Moving a store changes every consumer's API, so plan it as a change of its own. | `loans$` → `loans()` repeated across several consumer files
- c1-7a | A signal decides whether it changed with Object dot is, and so do signal inputs and OnPush. | `Object.is` beside three users: signal, signal input, OnPush input binding
- c1-7b | Push a book into the array a signal holds, and as far as it knows, nothing happened. | shelf code block, band on `shelf().push(someBook);`
- c1-8 | Setting the same array again notifies nobody either. A new reference does. So build a new array, and a new object for each item you changed. | band moves to `shelf.set(shelf());`, then to the `update` line
- c1-9 | Recombine two streams from one member, and for a moment you get a name that never existed. Computed reads both fields from the same value, so it cannot. | marble diagram member$ / first$ / last$ / fullName$, accent on `c`; then the `computed` line beside it
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: local state that belongs to something else (11:00)

- c2-1 | Eleven o'clock. A member browses science fiction on the catalogue screen, twenty books a page, and reaches page four. Then they pick poetry, which has two pages. | desk app, clock 11:00; genre shelf "Science fiction", page 4; the genre picker switching to "Poetry"
- c2-2 | If the page index survives the change, they land on an empty page four. The user moves that index, yet it only makes sense for one genre. | empty page 4 under "Poetry", page indicator in accent
- c2-3 | In seventeen you reset it in ngOnChanges or a subscription, and every reset was one more place to forget. Inputs are signals now, so you declare it once. | `ngOnChanges` struck out, then the `GenreShelf` code block
- c2-4 | Anything purely derived from the inputs, like the matching books and the page count, belongs in computed and nowhere else. | `GenreShelf` code, band on the `matching` and `pageCount` lines
- c2-5 | For state the user writes that needs a reset rule, there is linkedSignal. It acts like any writable signal until its source notifies, then runs its computation again. | `linkedSignal` code block; flow diagram: genre (input) → page, user clicks next → page, page → template
- c2-6 | The computation also receives the new source and the previous value, so it can keep a page that is still valid. | band on `computation: (genre, previous) => …`
- c2-7a | The reset fires only when the source notifies, so it is exactly as precise as the source's equality. | genre source with an `Object.is` / `equal` tag
- c2-7b | Decide which outside change should throw the local state away, and make sure the source notifies for that change alone. | a reset arrow from the source to `page`, firing once
- c2-8 | When the state is never written locally, it is a computed. When it must survive every change of its input, it is a plain signal. | "When not to use it" card: two rows, `computed` and `signal`
- c2-end | Before exercise two, ask these. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: async state as one value (13:00)

- c3-1 | One o'clock. A librarian picks a member and a year, and the panel loads that member's loan history from the server. | desk app, clock 13:00; member picker, year 2026, history panel
- c3-2 | A load has several moments: before the request, while it runs, after it succeeds or fails, and again when the user asks for something else. | a timeline with those moments marked along it
- c3-3 | Give each moment its own field, and every callback must update every field. A resource describes the request once and derives the rest. | a grid of separate fields and their combinations, collapsing into one `history` box
- c3-4a | Reading the route used to mean subscribing to its params and cleaning up. Now the router can hand them to inputs. | `route.paramMap.pipe(switchMap(...))` struck, then the `withComponentInputBinding()` label
- c3-4b | When a key is missing, it sets the input to undefined, which overwrites a plain default, so put the default in the transform. | `ShelfPage` code block, band on the `transform` line
- c3-5 | Here, params returns undefined until a member is picked. The resource stays idle and never calls the server. | `LoanHistory` code block, band on `params`
- c3-6 | When the member or the year changes, the resource unsubscribes from the running stream, which aborts the request, and starts a new one. | marble diagram params / run 1 / run 2 / run 3 / status
- c3-7 | Its status is one value, and loading, error and value are all read from it, so they cannot disagree. In the error state, reading the value throws. | the status row of the diagram in accent; WARNING callout with `hasValue()`
- c3-8a | When params change, the value goes blank until the next one arrives, so member A's history never appears under member B's name. | two history panels: blank under member B, and the stale one struck out
- c3-8b | If the screen must not flicker, keep the last value yourself in a linked signal, or keep that part in RxJS. | a table holding its last resolved rows, labelled `linkedSignal` / RxJS
- c3-9a | Plain GET requests take httpResource, observable loaders take rxResource, and promises take resource. | "Which resource" list from the lesson
- c3-9b | Writes don't belong in any of them: call them from an event handler, then reload the resource. Polling and streams stay in RxJS. | "When not to use any of them" list; event handler → `POST` → `reload()` arrow
- c3-end | Questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."

## Chapter 4: when the problem is time (15:30)

- c4-1 | Half past three. At the returns desk, a librarian scans barcodes, and each scan starts a lookup that takes a while. | desk app, clock 15:30; barcode scanner, returns rows arriving
- c4-2a | Signals are built for state, and they coalesce. If a signal changes five times before anyone reads it, a computed or an effect sees only the last value. | five writes collapsing into one signal value
- c4-2b | For state, that is right. For events, the ones in between are gone. | the four lost intermediate values fading out of an event row
- c4-3 | They have no clock, either. Stable signals have no way to wait three hundred milliseconds, or to drop an answer once a newer one arrives. | a clock beside a signal box, the two missing behaviours listed and struck
- c4-4 | An effect that starts a request on every run adds a third problem. Responses come back in whatever order the server sends them, and an older answer can land last. | marble diagram term / request 3 / request 4 / results, accent on the late `y`
- c4-5a | Its cleanup can cancel the previous run, which fixes the order. | `onCleanup` cancelling the previous run's request
- c4-5b | You still have no waiting and no de-duplication, and every piece you rebuild by hand is an operator RxJS already has. | hand-written pieces on the left, each paired with an RxJS operator on the right
- c4-5c | And an effect writing state usually means a missing computed, linked signal or resource. | IMPORTANT callout from the lesson: effects push state out to storage, logging, a third-party widget
- c4-6 | Learn each operator as one decision. debounceTime waits until the scanner goes quiet, then acts on the last scan. distinctUntilChanged drops a double scan of the same barcode. | marble diagrams scans / debounced, then scans / distinct
- c4-7a | The flattening operator decides what happens to a lookup still running when the next scan arrives. | flattening marble diagram: scans, lookup 1, lookup 2
- c4-7b | Every scan here is a return, so none may be lost: mergeMap keeps them all, concatMap keeps their order, and switchMap would drop returns. | switchMap and mergeMap rows printed, accent on the cancelled lookup 1
- c4-7c | When only the latest answer matters, the choice flips. The business rule tells you which case you are in. | a read lookup beside the returns lookup, each tagged with its business rule in words ("every scan counts", "only the latest answer matters"), never an operator name
- c4-8 | Keep the input a signal, since templates and handlers like signals. Cross to a stream for the operators, and bring the result back for the template. | flow: signal → toObservable → operators → toSignal → template
- c4-9 | toObservable emits after its internal effect runs, so several quick writes can reach the pipeline as one. When every event matters, start from an observable source. | quick writes merging at the `toObservable` edge; `fromEvent` and `Subject` as the alternative sources
- c4-10 | Angular twenty-two also ships a debounced function for signals, but it is experimental, so weigh that before production code depends on it. | the `@experimental 22.0` tag on `debounced(source, wait)`
- c4-end | The last questions, for exercise four. | review questions card, then "Pause here. Now do exercise 04."
- c4-after | When you finish an exercise, compare your fix with its solution, then write the two-sentence PR comment you would leave. If you cannot write it without looking, reread the chapter. | "After the lesson" card
- c4-close | Six o'clock. The desk closes. Tomorrow the same app opens, with both worlds still in it. | clock 18:00, desk lights down
