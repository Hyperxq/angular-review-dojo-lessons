# SSR lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. Server-side rendering runs one piece of code in two places, the server and the reader's browser. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-1b | The server renders H T M L for a fast first paint. The browser then hydrates it, adopting that DOM instead of building it again. | the lesson's opening paragraph, the word **hydrates** as the accent
- c0-2 | Most S S R bugs come from forgetting the first place. Most hydration bugs come from making the two places disagree. | same paragraph, its last sentence banded
- c0-3 | It buys a faster first paint on slow devices, and content for crawlers and link previews that run no JavaScript. | heading "Why render on the server, and when not to"; the "What SSR buys" list
- c0-4 | It costs a Node runtime for every request, and code that works in two environments. Hydration still runs the app's JavaScript. | the "What it costs" list, items appearing one by one; then table "Rendering mode / Good for / Moves mostly"
- c0-6 | This is a Part Two topic. Besides finding each defect, decide how bad it is and what you would write on the pull request. | heading "How bad is an SSR finding?"; table "Axis / Ask", rows appearing one by one
- c0-7 | With Zone dot J S, a set Interval clock in a constructor keeps the server app unstable, so every request to that page hangs until it times out. | the lesson's first example, "Reach: every request to that page" banded
- c0-9 | A member's private loan history lands in transfer state, and a C D N caches that page for everyone. Few may see it, but it cannot be recalled. | the lesson's third example, "not reversible" as the accent
- c0-10 | Many S S R defects are invisible in unit tests. Say in the comment what you would need to prove the finding. | the lesson's quoted comment "this shows up as NG0500 in the browser console of a real SSR build"
- c0-11 | This repo has no S S R packages. Spec helpers set the platform I D to server, set the server mode global, and hide window and storage. | heading "How the dojo simulates a server"; `SERVER_PLATFORM`, `enterServerMode()`, `stubBrowserGlobals()` as labels
- c0-12 | That catches browser globals touched too early and first renders that are not deterministic. A real hydration mismatch stays out of its reach. | same labels; the lesson's "It cannot show a real hydration mismatch" banded
- c0-13 | Since Angular seventeen, provide Client Hydration still turns on DOM hydration and the H T T P transfer cache, and now also incremental hydration, with event replay. | table "Area / Angular 17 / Angular 22.2.2", the `provideClientHydration()` row banded, then the incremental hydration row
- c0-15 | The hook after Render was renamed after Every Render. It and after Next Render run only in the browser, with phases that keep DOM reads apart from writes. | same table, the render hooks row
- c0-16 | Platform I D still exists, but the render hooks and the transfer cache read the N G server mode global. DOCUMENT is now exported from Angular core. | same table, the "Am I on the server?" row, then the `DOCUMENT` and request-data rows
- c0-18 | Recent versions of Angular S S R let one app choose the mode per route, so whether a page should be server-rendered becomes a decision per route. | heading "Choosing the mode per route"; `RenderMode.Server`, `RenderMode.Prerender`, `RenderMode.Client` as labels; the clock turns to 09:00

## Chapter 1: code that runs on both platforms (09:00)

- c1-1 | Nine o'clock. Server rendering serves the visitors who wait longest, and the crawlers that decide how a page ranks. | clock 09:00; desk app book page, half loaded
- c1-2 | The server builds the component tree in Node and sends H T M L. The browser builds the same tree again and adopts that DOM. | the lesson's flow diagram, arrows drawing on as each step is named
- c1-3 | So constructors, initializers, N G on Init and the first render run twice. Event handlers never fire on the server, and render hooks are skipped there. | table "Code / Server / Browser", rows appearing one by one
- c1-5 | Node has no window and no local Storage. Inject DOCUMENT for the document, and use Title and Meta, which the server writes into the page. | `window`, `localStorage`, `matchMedia`, `navigator` as labels; then table "You need / Use / Why", the first two rows
- c1-7 | Use is Platform Browser for a choice made before anything renders, often in a provider factory. Inject REQUEST for the server's request; it is null in the browser. | same table, the last two rows
- c1-8 | The library keeps a member's recently viewed books in local Storage. On the server there is no storage at all. | the lesson's `KeyValueStore` code, cut in whole
- c1-9 | So provide one abstraction and choose its implementation once. Components inject Key Value Store instead of a global, and the server no longer crashes. | same code, band on the `useFactory` line
- c1-10 | The factory leaves one problem. On the server get returns null, in the browser the list. If the first render shows it, the renders differ. | same code, band on the `MemoryStore` `get` line
- c1-12 | The usual answer is a neutral first render, filled in afterwards. That late update can shift layout, or replace the largest element after it painted. | heading "The first render should be the same on both sides"; "Cumulative Layout Shift" and "Largest Contentful Paint" as labels
- c1-13 | Reserving space for the late value avoids the shift. Letting the server know the value, from the request, avoids the late update. | same heading, the paragraph's last sentence banded
- c1-end | Four questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: hydration matches by structure (11:30)

- c2-1 | Eleven thirty. Hydration adopts the server's H T M L instead of rebuilding it. | clock 11:30; desk app shelf page
- c2-2 | It walks the server DOM beside the component tree, claiming existing nodes. It checks each node's type, and for elements, the tag name. | heading "What hydration checks"
- c2-3 | When the DOM has a different shape, Angular throws from the N G zero five zero zero family and does not recover that view. | `NG0500` and "Expected DOM node did not match the server-rendered DOM" as labels
- c2-4 | Text is not compared. Ten o'clock on the server and eleven in the browser still match, and the text changes when the binding updates. | "10:00" and "11:00" side by side, the second as the accent
- c2-5 | Structure is compared. An if that flips, or a for with a different number of items, meets a node the walk did not expect, and throws. | `@if` and `@for` as labels
- c2-6 | Three families of cause produce these differences. First, values that differ between renders: the clock, randomness, the time zone, storage. | heading "1. Values that differ between the two renders"
- c2-7 | Take an open now badge. The server runs in U T C, the reader in local time, so near closing time one render may show it and the other not. | desk app header with an "Open now" badge; "UTC" and "local time" as labels
- c2-8 | Choose one source both renders use: a fixed time zone in Date Pipe, data both sides receive, or a browser update after hydration. | the paragraph's three options appearing one by one
- c2-9 | Second, H T M L that the parser reshapes. The browser repairs markup that breaks its content rules, and Angular's template compiler does not. | heading "2. HTML that the parser reshapes"; the lesson's `<p>` and `<button>` code, cut in whole
- c2-10 | A list cannot live inside a paragraph, nor a button inside a button, so the parser closes the outer element early. A validator catches it. | same code, band on each `parsed as` comment in turn
- c2-11 | Third, DOM changed behind Angular's back: a directive moving its host into the body, a script inserting a banner, a widget rewriting markup. | heading "3. DOM changes behind Angular's back"
- c2-12 | Keep markup in templates, and start browser-only DOM work in after Next Render. These changes are hard to catch: J S dom accepts them, so unit tests pass. | same heading; `afterNextRender` as a label
- c2-13 | The server serializes the page once the app is stable, with no pending tasks. H T T P Client requests are pending tasks, so the render includes their data. | heading "Stability: when the server is done"; `PendingTasks` as a label
- c2-14 | With Zone dot J S, an interval or a polling loop started on the server holds the render until it times out. Ask where it starts, and what stops it. | same heading; `NG0506` as a label captioned "browser, dev mode"
- c2-15 | Without the transfer cache, data is fetched on the server, then again in the browser at startup. The cache answers the second request from the page. | the lesson's transfer cache flow diagram, arrows drawing on as each step is named
- c2-16 | It answers only until the browser app first becomes stable. A later request, from a timer or after a click, goes to the network. | the cache rules list, the first item banded
- c2-17 | By default it caches GET and HEAD. Unless you opt in, it skips auth and cookie headers, credentials, and requests marked no store, private or no cache. | same list, the remaining items appearing one by one
- c2-18 | Opting in to the authenticated cases writes those responses into the page source, which matters when pages are cached. | same list, its closing sentence banded
- c2-end | Six questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: deciding when each part hydrates (15:00)

- c3-1 | Three o'clock. Full hydration runs the whole page's code before any of it responds. Incremental hydration lets each region pay when it is needed. | clock 15:00; desk app book page, long, its regions outlined
- c3-2 | A plain defer renders its placeholder on the server. A defer with a hydrate trigger renders its main content, which stays dehydrated until the trigger fires. | heading "`@defer` on the server"; "placeholder" and "main content" as labels
- c3-3 | Dehydrated means visible, but without JavaScript, listeners or bindings. | same heading, "dehydrated" as the accent
- c3-4 | Hydrate triggers apply only to the first, server-rendered load. After a client-side navigation, the ordinary triggers decide. | `@defer (on viewport; hydrate on idle)`, band on `on viewport`, then on `hydrate on idle`
- c3-5 | Triggers name moments: idle, the viewport, interaction, hover including keyboard focus, a timer, a condition. hydrate never keeps the block static. | table "Trigger / Hydrates when", rows appearing one by one
- c3-6 | A book page ends with a comments widget. Its rich-text editor is large, and most readers never scroll that far. | heading "A worked choice"; desk app book page scrolled to its comments widget
- c3-7 | On idle downloads the code on every visit. On viewport downloads it only for readers who scroll there, though a fast scroller may wait. For this widget, viewport fits. | table "Option / What it costs / When it fits", rows appearing one by one, the `hydrate on viewport` row as the accent
- c3-8 | With hydrate never, a region costs no JavaScript, a real gain for a long synopsis or a footer, and never gets listeners or reactive bindings. | the `hydrate never` paragraph
- c3-10 | Before a region hydrates, it has no Angular listeners. Event replay records events on it and replays them once the code is there. | heading "Event replay"
- c3-11 | Whoever triggered it still waits for the download, which counts against Interaction to Next Paint. Keep likely interactions away from slow triggers. | same heading; "Interaction to Next Paint" as a label
- c3-12 | N G Skip Hydration on a host makes Angular discard the subtree's server DOM and render it again. It suits a wrapper around a library that rewrites its DOM. | heading "`ngSkipHydration` is for code you do not control"
- c3-13 | On your own component, it usually silences the console errors while the cause stays. The subtree is still rebuilt, and that region loses the benefit of S S R. | same heading, its second paragraph banded
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, write your findings with a severity each, and whether a unit test here can prove them. Then compare with the solution. | "After the lesson" card
- c3-close | Six o'clock. The desk closes. | clock 18:00, desk lights down
