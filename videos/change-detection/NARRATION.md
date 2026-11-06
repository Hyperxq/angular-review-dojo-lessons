# Change detection lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. In seventeen, Zone.js noticed every timer and promise, and change detection happened to you. In twenty-two, the same code can render nothing. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-2 | This app has no Zone.js, and zoneless is the default since Angular twenty-one. Angular renders only when something tells it that state may have changed. | `zone.js` absent from the app; a "render" lamp that stays dark until a notification arrives
- c0-3 | In daily code, the news comes from a signal a template reads, a listener in a template or host, markForCheck, setInput from a test, or a view being attached. | the lesson's five notifications as a list, each lighting the lamp in turn (the `async` pipe shown under `markForCheck()`)
- c0-4 | A plain field written from a timer, a promise, a socket or a third-party library is not on that list. The value changes in memory and the screen stays put. | `setTimeout` writing a plain field; the value in memory flips, the desk screen does not
- c0-5 | The plainest code from seventeen is the first to go quiet. The response arrives, the field changes, and nobody is told. The async pipe, toSignal and resources all tell Angular. | code block `this.http.get<Book[]>('/api/books').subscribe((books) => (this.books = books));`, band on the assignment; then the three bridges as labels
- c0-6 | NgZone still exists, so old code compiles. Without Zone.js it is a no-op zone, where run and runOutsideAngular just call your function and render nothing. | `NoopNgZone` box: `run(fn)` and `runOutsideAngular(fn)` both arrowing straight into `fn`
- c0-7 | You get OnPush by writing nothing. The old Default is now called Eager, so a Default you find in any file today is an opt-out to ask the author about. | the lesson's v17 / v22.2 table
- c0-8 | A notification reaches the scheduler, which runs a tick, and the tick refreshes the dirty views. Each binding is compared with Object.is, and only a difference touches the DOM. | flow diagram "notification -> scheduler -> ApplicationRef.tick -> refresh views marked dirty -> afterRender hooks -> dev mode checkNoChanges pass", arrows drawing on
- c0-9 | An OnPush view refreshes only when it is dirty. A signal write marks the views that read it, and Angular walks through their ancestors without running their templates. | tree LoanDesk / MemberHeader / LoanList / LoanRow / LoanRow / LoanTotals with badges; first `LoanRow` `.hot`, its ancestors outlined only
- c0-10 | Click a button in the loan desk. The desk refreshes, the Eager totals refresh with it, and the OnPush children are skipped unless they are dirty. | same tree: `LoanDesk` and `LoanTotals [Eager]` lit, OnPush nodes greyed
- c0-10b | Then open the playground, and predict each counter before you click. | the playground cards with their run counters, each showing a "?" before the click

## Chapter 1: references, and who gets told (10:00)

- c1-1 | Ten o'clock. A librarian renews a loan. The row shows the new due date, but the totals still count the old one, and the sorted list is out of order. | desk app loan list: renewed row updated, totals line unchanged, rows out of date order
- c1-2 | Nothing threw an error. Some views heard about the change and some did not, so she reloads the page to trust what she sees. | a tree where some nodes lit up and others stayed dark; then a page reload
- c1-3 | Checking a view costs time per binding, and an Eager tree checks all of them on every tick. OnPush lets Angular skip a whole subtree unless something says it changed. | an Eager tree fully lit on a tick, then the same tree with one OnPush subtree greyed out
- c1-4 | The price is a contract: something has to say it changed. A new reference, an event inside the view, markForCheck, or a signal it reads. | the four ways to mark an OnPush view dirty, as four labelled arrows into one OnPush node
- c1-4b | For inputs, Angular asks Object.is, and a change made in place keeps the same reference. | code block `shelf.sort(byTitle);` / `Object.assign(member, { phone: '555' });` / `holds.set(bookId, hold);`, band stepping down the three lines
- c1-5 | The rule holds for arrays, objects and maps alike. Once a view has the value, a change needs a new reference, whether the owner made it or a child did. | one rule line; the same object pointer held by owner and child, both editing it, an OnPush view beside them unlit
- c1-6 | One place owns each piece of state and is the only one that changes it. Views get values and send intentions back through outputs, so everyone learns through one path. | data down, events up flow diagram: owner, child A, child B, output event, arrows drawing on
- c1-7 | New objects need stable keys. Tracked by identity, each new object looks like a new row, so its DOM is rebuilt and focus, typing and scroll are lost. | `@for` rows: `track book` destroys and recreates a row with a cursor in it; `track book.isbn` keeps the row
- c1-8 | They differ in reach. detectChanges renders this view now and tells nobody else. | the chapter 0 tree: one node lit, its parent and siblings dark
- c1-8b | markForCheck marks the path from this view up to the root for the next tick. A signal marks exactly the views that read it. | the same tree twice: a path to the root lit, then only the reading nodes lit
- c1-9 | Copies allocate. For a huge collection changed many times a second, measure it, and consider paging or a store keyed by id. | a cost meter over a long list; the list split into pages beside a store keyed by id
- c1-9b | Eager can be a short step for a leaf with third-party data, if someone owns removing it. | a leaf node with an `[Eager]` badge and an owner tag
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: the order of a pass, and the dev-mode second look (13:00)

- c2-1 | One o'clock. On first load, the reading room header says zero books open, although three are open. | desk app reading-room page, header "0 books open" above three open books
- c2-2 | A teammate sees an expression changed error in the console on one page, and none on another page with the same problem. This chapter explains both. | two consoles side by side: `ExpressionChangedAfterItHasBeenCheckedError` on one, empty on the other
- c2-3 | Angular runs a template top to bottom. When it reaches a child, the child's ngOnChanges, ngOnInit and ngDoCheck run right there, after the parent bindings above it. | the lesson's pass flow diagram, first two arrows drawing on
- c2-4 | Content hooks follow, then the child's view and its view hooks. Data flows down, so a value written after its reader rendered stays stale for the rest of the pass. | the rest of the pass flow diagram drawing on; a late write arrow landing behind a reader that already rendered
- c2-5 | Projection splits the DOM tree from the change detection tree. A projected component belongs to the template that declared it, and its hooks run with that template. | tree ReadingRoom / ShelfLayout / ShelfHeader / BookOfTheWeek, `BookOfTheWeek` `.hot`; its DOM position inside `ShelfLayout` ghosted beside it
- c2-6 | Bindings must give the same value when nothing changed. A template method that filters into a new array is a different value for Object.is on every evaluation. | code `<app-book-grid [books]="overdue()" />` and the `overdue()` method, band on the `filter` line
- c2-7 | An OnPush child gets marked on every check, and the dev-mode recheck can throw N G zero one zero zero. A computed keeps the same array until the books change. | the binding with a dirty flag flashing on every check; then `NG0100`
- c2-8 | A shelf that measures itself and reports the number upward from ngAfterViewInit reports too late. The parent already rendered its own bindings in this pass. | the lesson's `fitted` output code, band on `emit`; parent header still showing the old number
- c2-9 | There are three ways out, and each has a cost. Read the DOM in afterNextRender and write the result into a signal, at the price of one more refresh round. | the three options from the lesson as a list; the first one lit, its cost under it
- c2-9b | Publish the value earlier, which only helps readers that refresh later in the pass. Or let the parent derive it with a computed, and no hook is needed. | the same list; the second and third options lit in turn, each with its cost under it
- c2-10 | The dev-mode second look rechecks Eager views and skips OnPush ones. With OnPush as the default, a quiet console proves little. Turn on the exhaustive check in development and tests. | checkNoChanges sweeping a tree and passing over OnPush nodes; then `provideCheckNoChangesConfig({ exhaustive: true })`
- c2-end | Ask these before exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: migrating a component to zoneless (16:00)

- c3-1 | Four o'clock. After the zoneless migration, the wall display at the returns desk freezes. Returns keep arriving, and the list moves only when someone clicks elsewhere. | wall display list standing still while returns queue up beside it
- c3-2 | Opening and closing the display a few times also slows the tab down, because the old instances keep running. | the display opened and closed three times; faded instances still ticking behind it
- c3-3 | A third-party client's plain callback used to run inside the zone. Some teams ran it outside Angular, then ran the assignment back inside. Today both are plain function calls. | `runOutsideAngular` and `run` wrappers dissolving into bare calls around one field assignment
- c3-4 | Nobody hears about that assignment. The screen catches up only when something unrelated renders. | marble diagram feed / clicks / screen from the lesson, the `b` marble on the screen row accented
- c3-5 | Go through the template and name, for every binding, what tells Angular it changed. In zoneless code, the answer should almost always be a signal. | the display's bindings in a column, each with an empty "notifier" tag beside it
- c3-6 | The first notification schedules a tick, later ones join it, so fifty signal writes in one frame cost one render. Each message still costs the work you do in it. | fifty writes funnelling into a single tick
- c3-7 | When a feed is very high frequency, sample or throttle it at the edge, and keep in signals only the state the screen shows. | a dense marble row thinned at an edge gate before it reaches the view
- c3-8 | ngDoCheck runs when the parent is checked, and zoneless may make that rare. A value derived there follows the parent's schedule. A computed follows the data. | two timelines: parent refreshes sparse, data changes dense; the `ngDoCheck` value tracking the sparse one
- c3-9 | A client provided in root lives as long as the app. A handler registered on it and never removed keeps its whole component alive, and still runs on every message. | tree ReturnsFeed with three handlers, two marked `[destroyed, still referenced]`
- c3-10 | Whatever a component starts, it also stops: a handler, a listener, a connection, a timer. Register the cleanup right next to the start. | start and stop drawn as one pair for each of the four resources
- c3-11 | In tests, prefer waiting for stability and real notifications. A test that forces a render after every step passes even when the component never tells Angular anything. | `await fixture.whenStable()` with a click, against a test calling `fixture.detectChanges()` after every line, both green
- c3-end | Five questions for the last exercise. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare your fix with the solution, and write the two-sentence review comment you would leave. If you cannot, reread the chapter. | "After the lesson" card
- c3-close | Six o'clock. The desk closes, and the wall display goes dark with it. | clock 18:00, desk lights down
