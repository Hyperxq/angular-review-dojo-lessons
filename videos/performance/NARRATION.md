# Performance lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The library desk opens at nine. In Angular seventeen, performance work meant track By functions, On Push on hot components, and run Outside Angular. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; `trackBy`, `ChangeDetectionStrategy.OnPush`, `runOutsideAngular` stacked beside it
- c0-1b | Most of that vocabulary still applies, though the defaults moved under it. | the same three names, the desk app behind them
- c0-2 | A fix you did not measure is a guess. Write down the symptom, who feels it, and a number. After the change, measure again the same way. | heading "First principle: measure before and after"; milliseconds, kilobytes, a Lighthouse metric as labels
- c0-3 | A frame at sixty hertz lasts about sixteen milliseconds. I N P, Interaction to Next Paint, measures from a click to the next frame. Two hundred or less is good. | "Numbers worth knowing": a 16 ms frame bar, then the INP item with its 200 ms threshold
- c0-3b | L C P, Largest Contentful Paint, marks when the biggest element of the first screen renders. C L S, Cumulative Layout Shift, measures how much the page jumps. | the LCP and CLS items
- c0-4 | Profile a production build, because development mode runs extra checks on purpose. And throttle the CPU, since your laptop is faster than your users' phones. | `ng build`; the Performance panel, CPU throttling set to 4x
- c0-5 | enable Profiling adds an Angular track to the Performance panel. It only works in development mode. Use it to find which components work, then time them on a production build. | `enableProfiling()` from `@angular/core`; an Angular track under the browser's timeline
- c0-6 | Zone dot js used to run change detection after almost every async callback. This app is zoneless, the default since Angular twenty-one. | heading "Who triggers a render"; `zone.js` struck through
- c0-6b | Angular now schedules a render only when something it understands says a view changed. A plain timeout changes data without telling anyone. | the lesson's list of five render triggers, appearing one by one; `setTimeout` and `window.addEventListener` set apart from it
- c0-7 | On Push is the default in version twenty-two. So ask whether a component gets told when its data changes, and how much work each check does. | heading "OnPush is the default"; the lesson's two questions under it
- c0-8 | A computed runs only when something reads it and a dependency changed. A template that reads overdue ten times per check pays for one filter. | the signals code from the lesson, band on the `computed` line
- c0-9 | The for block refuses to compile without a track expression, but choosing the key is still on you. The defer block lazy loads part of a template. | "New template syntax, new defaults": the compile error text, then `@defer`
- c0-10 | N G build prints the initial chunk files, which every visitor downloads first, and the lazy ones fetched later. Then the desk opens. | the two table names "Initial chunk files" and "Lazy chunk files"; the clock turns to 09:00

## Chapter 1: identity in lists, and work in templates (09:30)

- c1-1 | Nine thirty. A librarian types a note beside each member on a waiting list, while the list changes under them. | clock 09:30; desk app waiting list of members, a note input on each row
- c1-2 | Speed and correctness here depend on one mechanism: how Angular decides which DOM node belongs to which item. | the same list, one row's `<li>` outlined
- c1-3 | Select a row in the Elements panel, sort or filter, then run dollar zero dot is Connected. True means Angular kept the node. False means it made a new one. | "How to observe it": `$0.isConnected` in the console, with `true` and `false`
- c1-4 | Typed text in an unbound input, focus, selection and scroll position live only in the DOM. They stay with the node, wherever Angular decides it belongs. | the waiting-list `@for` code from the lesson; the DOM-only state as labels beside one `<li>`
- c1-5 | Tracking by id matches a business key and fits almost every list. Tracking by index matches a position. Tracking the object matches a reference. | table "`track` / Same row means / Fits / Goes wrong when", rows appearing one by one, no row accented
- c1-5b | Each one goes wrong in its own way, and dev mode warns when tracking by identity recreated the whole collection. | same table, the "Goes wrong when" column; then the NOTE callout with `NG0956`
- c1-6 | Every template expression runs each time Angular checks the view, and a listener marks its own view and every ancestor dirty, up to the root. | "When template expressions run": a child view, its parent and grandparent, all marked
- c1-7 | A template call costs one call, times the rows, times the checks per click. Compare that with the frame and the I N P budget. | table "Case / Per call / Rows / Checks per click / Cost per click / Verdict", rows appearing one by one, no row accented
- c1-8 | When the profile shows it, move the derivation into a computed. It runs again only when loans changes, however many checks happen in between. | the `feeRows` code from the lesson
- c1-8b | It allocates a wrapper per row and redoes every row when any loan changes. For ten thousand rows, measure. A pure pipe is the other way to memoize. | same code, band on the `map` line; `transform` as a label
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: references, OnPush inputs, and derived state (11:00)

- c2-1 | Eleven o'clock. Members check their reading lists at the desk and trust what the screen says. | clock 11:00; desk app reading list view
- c2-2 | Angular DevTools shows whether a component's data is new, and its profiler shows whether the component was checked during the click. | Angular DevTools, a component selected, its inputs and signals listed
- c2-3 | A signal compares with Object dot is by default, and notifies only on set or update with a different value. Pushing into its array never calls set. | table "Code / Consumers notified?", rows appearing one by one, the `push` row last
- c2-4 | On Push inputs compare references too. When a click in the parent checks it, a child refreshes only if its input reference, or a signal it reads, changed. | `[shelf]="shelf()"`, then the tree ShelfPage / BookList [OnPush] / ShelfStats [OnPush]
- c2-4b | Two children fed the same object can disagree, when one is refreshed for another reason. Spread, map, filter and concat give new references. Push, splice and assignment do not. | same tree, `ShelfPage` hot; then two columns: new references, same reference
- c2-5 | A getter looks like a property but runs its body on every read. This template reads it twice, so it filters twice per check. | the `overdueBooks` getter and template code, both reads banded
- c2-6 | An effect that copies derived state into a signal costs more and breaks more easily than the same value as a computed. | the `heading` code from the lesson, band on the `effect` line
- c2-6b | The copy is a separate scheduled step, the extra signal can be set wrong, and the effect runs even when nobody reads it. | same code, the band moves to the `computed` version
- c2-7 | Keep effects for work that leaves the reactive graph, like local Storage, logging or a map library. Use a linked Signal when a derived value must accept writes. | the lesson's list of effect jobs; `linkedSignal` as a label
- c2-end | Five questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: zoneless rendering, browser events, images and effect dependencies (14:00)

- c3-1 | Two o'clock. Status lines and counters report things that change without the user. People act on them, with no sign when they fall behind. | clock 14:00; desk app header with a status line beside the clock
- c3-2 | In dev mode, provide Check No Changes Config reports bindings that changed without Angular being told. Use it locally, and never ship it. | the `provideCheckNoChangesConfig({ exhaustive: true, interval: 1000 })` call from the lesson
- c3-3 | In the lesson's shelf grid, a Resize Observer sets a plain field. Zoneless, nothing renders it until something unrelated checks the view. | the `ShelfGrid` code from the lesson, band on the `this.columns` line
- c3-4 | State a template reads must be a signal, or its change must go through a notifier from chapter zero. | the five render triggers from Chapter 0; `onmessage` and `setTimeout` as labels
- c3-6 | A listener added on window or document belongs to that object. When the component is destroyed, the listener stays and keeps the dead component in memory. | "Listeners have owners": `window` holding a listener holding a component
- c3-6b | Each new instance adds another. For every listener, observer, timer or subscription, ask who removes it, and when. The Elements panel's Event Listeners tab lets you count them. | the Elements panel, "Event Listeners" tab
- c3-7 | Lighthouse and the Performance panel name the L C P element. The Network panel's priority column shows whether it was fetched as High. | the LCP marker in the Performance panel; the Network panel's "Priority" column
- c3-8 | N G Optimized Image takes over when you use N G Src. It requires width and height, or fill, so the browser reserves the space. | the `ngSrc` image code from the lesson, band on `width` and `height`
- c3-8b | Its images are lazy by default. priority gives high fetch priority. Use it on one or two images that can be the L C P; marking more makes them compete. | same code, band on `priority`
- c3-9 | An effect depends on every signal it reads while it runs, even inside a function in a service you never opened. | heading "What an effect depends on"
- c3-10 | untracked reads without depending. Here the due label follows the loan, and the team let a locale change wait for the next loan change. | the `dueLabel` code from the lesson, band on the `untracked` line
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."

## Chapter 4: what goes in the first bundle (16:00)

- c4-1 | Four o'clock. Every kilobyte in the initial bundle costs a visitor on a mid-range phone three times: download, parse and compile, then execution. | clock 16:00; the catalog page in a phone frame
- c4-2 | No unit test sees a bundle. Read the build tables, the analyzer and the Network panel. Three kilobytes will not show in a metric. Two hundred will. | "How to observe it", steps 1 to 3
- c4-3 | The bundler follows every static import from main dot ts into the initial chunks. A dynamic import is a cut. | the `main.js [initial]` tree from the lesson, drawing top-down
- c4-3b | One static import pulls a module back in. So ask who imports each file statically, and whether that importer belongs to the first screen. | same tree, all three lazy chunks shown
- c4-4 | Four tools cut the graph: load Component, load Children, the defer block, and an awaited import for code one action needs. | table "Tool / Splits off / Fetched", rows appearing one by one; then the `printReceipts` code
- c4-5 | The defer block loads on a trigger, can prefetch earlier, and covers the wait with placeholder, loading and error blocks. | the `@defer` parts table
- c4-6 | In the lesson's member page, the loan history stays out of the page's chunk until somebody clicks the button. | the `@defer (on interaction)` code from the lesson, then the states flow diagram
- c4-6b | Give the placeholder the size of what replaces it, or everything below jumps and counts against C L S. | the flow diagram, `placeholder` to `complete`
- c4-7 | The compiler defers a component only when it is standalone and used only inside defer blocks. Any other runtime reference keeps the static import. | "How the compiler decides" paragraph
- c4-8 | Content above the fold and tiny components should not be deferred. With server rendering, look at hydrate triggers instead. | the "When not to defer" list
- c4-9 | A barrel re-exporting a folder makes the bundler follow every module behind it. Tree shaking drops unused exports but keeps modules with side effects. Import from the defining file. | an `index.ts` with `export * from './...'` lines; `registerLocaleData(localeFr)` banded
- c4-10 | Preloading fetches lazy routes in the background. The router ships two strategies: nothing, or everything. Your own decides per route, and someone must keep it current. | the `PreloadingStrategy` code, then table "Strategy / Pro / Con"
- c4-end | Seven questions for exercise four. | review questions card, then "Pause here. Now do exercise 04."
- c4-after | After each exercise, compare your fix with its solution. For problems no test can catch, measure before and after your fix. | "After the lesson" card
- c4-afterb | Then write, in two sentences, the pull request comment you would leave for the author. | "After the lesson" card, its last sentence banded
- c4-close | Six o'clock. The desk closes for the day. | clock 18:00, desk lights down
