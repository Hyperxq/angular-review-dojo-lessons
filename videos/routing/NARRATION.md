# Routing lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. The router concepts you remember still hold. What changed is how you write them, and a few defaults. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; `RouterModule.forRoot(routes)`, `implements CanActivate`, `this.route.params.subscribe(...)` stacked beside it
- c0-2 | Guards and resolvers are plain functions that call inject. Passing a class or a token instead is deprecated, and so is can Load, which can Match replaces. | lesson's `isLibrarian` and `bookResolver` code, cut in whole; `DeprecatedGuard` as a label
- c0-3 | They run in an injection context, but only synchronously. Inject first, then do the async work. | same code, band on `inject(BookApi)`; `NG0203` as a label
- c0-4 | A guard may return a boolean, a U R L Tree or a Redirect Command, which wraps a tree plus navigation options. Resolvers may return a Redirect Command too. | table "Type / Shape" from the lesson, rows appearing one by one; then `new RedirectCommand(tree, { replaceUrl: true })`
- c0-5 | with Component Input Binding writes route values into the routed component's inputs. With signal inputs, a page often needs no Activated Route at all. | lesson's `BookPage` code, band on the `input.required<string>()` line
- c0-6 | params Inheritance Strategy now defaults to always, so a child route sees all of its parents' params. Old code walks route dot parent because of the old default. | "Defaults that changed" list, the first item; the other two items below it
- c0-7 | Angular twenty-two point two adds router resources as developer previews. None of the exercises use them. | NOTE callout from the lesson
- c0-8 | This app is zoneless and On Push. Inputs the router sets mark the view for check. A plain field set from a router callback does not. | heading "Zoneless and OnPush"; `Eager` as a label for the old strategy
- c0-9 | Router bugs rarely throw. You find them by navigating and watching what happens. Then the desk opens. | desk app; the clock turns to 09:00

## Chapter 1: how the router matches a URL (09:00)

- c1-1 | Nine o'clock. A route config bug gives no build error and no console warning. Finding one takes a tool. | clock 09:00; desk app at rest, an empty console beside it
- c1-2 | Angular walks the Routes array from the top and stops at the first entry that matches. The order of the array is part of the program's behaviour. | lesson's `LIBRARY_ROUTES` code, cut in whole, the band stepping down the entries
- c1-3 | A param segment matches any one segment, whatever its text, so books slash search matches books slash colon I S B N. Double star matches every URL. | table "Path segment / Matches" from the lesson; `isbn = 'search'` as a label
- c1-4 | The tool is a walk by hand. For books slash search, the empty path needs an empty URL, books leaves a segment over, and Search Page matches. | lesson's flow diagram, arrows drawing on as each entry is named; `SearchPage` as the accent
- c1-5 | Do that walk for every URL a user can reach, bookmarks and links in emails included. An entry that no URL can reach is a silent bug. | `LIBRARY_ROUTES` again, the walk's question beside it
- c1-6 | An empty path with prefix matching matches the start of every URL. So an empty redirect needs path Match full. In development, Angular throws when it processes the config. | `{ path: '', redirectTo: 'books' }` struck through; `pathMatch: 'full'` and `NG04014` as labels
- c1-7 | A redirect with a non-empty path keeps prefix matching, and carries the rest of the URL along. | `{ path: 'catalogue', redirectTo: 'books' }`; `/catalogue/42` → `/books/42`
- c1-8 | A guard's answer tells the router what to do. True continues. False cancels, and on a first load from a bookmark, the user sees an empty outlet. | table "Guard returns / The router / The user sees", the first two rows
- c1-9 | A U R L Tree cancels and starts a navigation to the tree. When users can arrive directly, decide where they should land and return that tree. | same table, the third row; then the lesson's `hasLibraryCard` code
- c1-end | Three questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: the router reuses your component (10:30)

- c2-1 | Ten thirty. A member browses from one book to the next. Every screen they see has to describe the book in the URL. | clock 10:30; desk app book page, the URL in the address bar
- c2-2 | Books slash one and books slash two match the same Route object, so the router keeps the Book Page on screen. No new constructor, no new N G on Init. | lesson's flow diagram, arrows drawing on; `BookPage reused` as the accent
- c2-3 | The same happens when only the query string changes. Whatever the component reads once, it reads once for the life of the instance. | same flow, the `?view=copies` arrow drawing on
- c2-4 | The snapshot is a photo of one moment. Observables follow later URLs while subscribed, and bound inputs always do. | table "Source / What it gives you / Follows later URLs?", rows appearing one by one
- c2-5 | Inputs are bound from query params, path and matrix params, static data, then resolver results. When two share a key, the later one in that list wins. | "The rules of input binding" list, the first two items
- c2-6 | By default, an input with no matching key in the current route is set to undefined, so a value from a previous URL is never kept. | same list, the third item, `'alwaysUndefined'` banded
- c2-7 | A resolver makes the navigation wait. Loading in the page shows the new page at once. rx Resource reruns when I S B N changes, and cancels the previous request. | lesson's `BookPage` code with `rxResource`, band on `params: () => this.isbn()`; then table "Resolver / Load in the page"
- c2-8 | A resolver reruns only when run Guards And Resolvers says so. By default, that means path or matrix params change. | table "Value / Reruns guards and resolvers when", the `'paramsChange'` row banded
- c2-9 | If a resolver errors, the navigation fails and the old page stays. If it completes with no value, the navigation is cancelled. | lesson's resolver flow diagram, its three branches drawing on
- c2-10 | The answer for missing data lives in each resolver, or once in the navigation error handler. A resolver can also return a Redirect Command before it asks the server. | the lesson's two-item design choice list; then its `bookResolver` code with `ISBN`, band on `return new RedirectCommand(...)`
- c2-end | Five questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: when each guard runs, and lazy loading (12:00)

- c3-1 | Twelve o'clock. Guards in the browser decide what users see and download. They are not authorization. Anyone can change JavaScript, so the API must check the role on every request. | clock 12:00; IMPORTANT callout from the lesson
- c3-2 | Each guard runs at a fixed point. can Match runs while the URL is recognized, and load Children runs only for a route that matched. | lesson's navigation pipeline flow, arrows drawing on to `loadChildren`
- c3-3 | Then can Deactivate on the routes being left, can Activate Child and can Activate on the routes being entered, parent first, then resolvers, then load Component. | same flow, the remaining arrows drawing on to `NavigationEnd`
- c3-4 | For each guard in a config, ask one question. At the step where it runs, has the route's lazy code already been requested? | the full pipeline held
- c3-5 | When can Match returns false, the router tries the next entries, and the URL may end at not found. Return a U R L Tree when you want a redirect. | "Facts about `canMatch`" list, the second item
- c3-6 | can Match does not stop preloading. The preloader skips lazy children only when can Load is defined. | same list, the third item
- c3-7 | A guard runs only when a navigation happens. State that changes while the user sits on a page waits for the next navigation. | same list, the fourth item
- c3-8 | When a navigation is cancelled, the Navigation Cancel event carries a code saying why. Analytics and tests read it, so a redirect should be reported as a redirect. | table `NavigationCancellationCode` / Meaning, the `Redirect` row banded
- c3-9 | A guard receives everything about the target, and route data lets one guard serve several routes. | table "Guard / Receives"; then the lesson's `hasRole` code, band on `route.data['role']`
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."

## Chapter 4: nested routes and relative navigation (14:00)

- c4-1 | Two o'clock. The library opens branches. A feature that knows its own prefix breaks the day it is mounted somewhere else. | clock 14:00; the address bar showing `/members/12`, then `/branches/3/members/12`
- c4-2 | A route with children describes a component tree. Each level with a component renders the next one inside its own router outlet. | lesson's route tree diagram, `MemberLayout`, `LoansPage`, `LoanDetail` taking the accent one by one
- c4-3 | router Link and router navigate both take commands, and a leading slash starts from the root. Without it, they differ. | table "API / Relative to" from the lesson
- c4-4 | router Link is relative to the route of its component. The Router is a root service, so navigate starts from the root unless you pass relative To. | same table, the `[routerLink]` row, then the two `router.navigate` rows
- c4-5 | The commands read like a file system. When a link can do the job, prefer it: it is relative by default, and accessible. | lesson's commands code, band on `[routerLink]="['../profile']"`
- c4-6 | With params inheritance set to always, a child's input receives its parent's member id. Walking route dot parent belongs to the old default. | `readonly memberId = input<string>()` from the lesson; `route.parent` as a label
- c4-7 | A parent stays active between its children. can Activate runs when the parent is entered. can Activate Child runs before every child is entered, moves between them included. | table "Guard on the parent / Runs", rows appearing one by one
- c4-8 | So ask what can change during the visit. A rule that can stop holding mid-visit needs a check on every move. | the paragraph after the table, the suspension sentence banded
- c4-end | Four questions for exercise four. | review questions card, then "Pause here. Now do exercise 04."

## Chapter 5: route providers, leave guards, named outlets and titles (16:00)

- c5-1 | Four o'clock. Four small topics. First, providers on a route, because where an instance lives decides who shares it, and for how long. | clock 16:00; the four headings: Providers on a route, Leave guards, Named outlets, Titles
- c5-2 | Route providers create an injector for the route and its children. A lookup climbs toward the root, and never goes across to a sibling. | lesson's injector tree diagram, the climb from `ProfilePage` to `root injector`
- c5-3 | Each route that lists a provider gets its own instance, kept for later visits, and cleanup is opt-in. Pick by lifetime first. | table "Where / Shared by / Lives", rows appearing one by one
- c5-4 | Leave guards. can Deactivate receives the component being left and the destination, so it can treat destinations differently. | lesson's `stayInCirculation` code, band on `nextState.url.startsWith('/circulation')`
- c5-5 | It covers router navigations only, so a reload or a closed tab needs before unload. A guard can return an observable, so an app dialog works too. | "Limits to know" list, both items
- c5-6 | A named outlet shows a route next to the primary one. The benefit is a shareable URL. The cost is URLs and links that are harder to build. | lesson's named outlet link, outlet and route code; `/books(notes:history)`
- c5-7 | A panel nobody needs to link to can be a plain signal and an if block. | `{ outlets: { notes: null } }`; `@if` as a label
- c5-8 | A title is a string or a resolver, and the deepest primary route with one wins. Extend Title Strategy to change how titles are built. | the "Titles" paragraph; `TitleStrategy`, `updateTitle(snapshot)`, `buildTitle(snapshot)`
- c5-9 | Screen readers announce the new title after a navigation. For a blind user, it is often the only sign that the page changed. | the browser's tab strip, one tab title as the accent
- c5-end | Four questions for exercise five. | review questions card, then "Pause here. Now do exercise 05."
- c5-after | After each exercise, compare your fix with its solution, and write the two-sentence comment you would leave on the pull request. If you cannot, reread the chapter. | "After the lesson" card
- c5-close | Six o'clock. The desk closes. Tomorrow the members come back through the same bookmarks. | clock 18:00, desk lights down
