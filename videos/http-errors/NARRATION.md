# HTTP errors lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. Every failure travels from the network to a person, and at each step some code decides what to do with it. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; the lesson's four verbs as labels: "pass it on", "translate it", "show it", "drop it"
- c0-1b | Most incidents here are one of those decisions made in the wrong place. Every finding also gets a severity and a pull request comment. | the four labels **blocking**, **should-fix**, **nit**, **question**
- c0-2 | Fetch is now the default backend, so with Fetch is deprecated as no longer needed. For upload progress, which fetch cannot report, there is with X H R. | heading "Fetch is the default backend"; the lesson's `provideHttpClient(withInterceptors([...]))` code, cut in whole; `withXhr()` as a label
- c0-3 | Server X H R is deprecated, due for removal in Angular twenty three, so with X H R in an S S R server config is a finding. | NOTE callout from the lesson
- c0-4 | In Angular twenty two, interceptors are usually plain functions that take the request and next, the rest of the chain. Angular runs them in an injection context, so inject works. | heading "Interceptors are functions"; the lesson's `requestIdInterceptor` code, cut in whole, band on the `next(req.clone(...))` line
- c0-5 | An I D made in an interceptor follows the request, not the intent. An I D for one borrow click is created where the click happens, and passed down. | same code, band on `crypto.randomUUID()`; `HttpContext` and `traceparent` as labels
- c0-6 | Class interceptors still run through with Interceptors From D I. When one app has both styles, ask which runs first. | `withInterceptorsFromDi()` beside `withInterceptors([...])` as labels
- c0-7 | H T T P Resource builds a get request from a U R L that a signal drives, and holds loading, error and value for you. | heading "Resources hold the three states for you"; the lesson's `MemberPage` code, band on the `httpResource<Member>` line; then table "Member / Meaning", cut in whole
- c0-8 | Reading value throws in the error state. A template that reads it before checking error or has Value turns a failed request into a rendering error. | same table, the `value()` row banded; then the WARNING callout from the lesson
- c0-9 | Requests now take a timeout. Without one, a request to a server that never answers keeps its spinner turning as long as the browser allows. | the lesson's `this.http.get<Branch[]>('/api/branches', { timeout: 8000 })` code; `TimeoutError` and `HttpErrorResponse` as labels
- c0-10 | provide Browser Global Error Listeners forwards the window's error and unhandled rejection events to Error Handler, so errors that would only reach the console arrive there too. | heading "Errors that nobody caught"; `provideBrowserGlobalErrorListeners()` and `ErrorHandler` as labels
- c0-11 | The app is zoneless, so no Zone catches async errors for Angular. Those listeners are how they reach you. Then the desk opens. | desk app; the clock turns to 09:00

## Chapter 1: an error is information (09:00)

- c1-1 | Nine o'clock. Every error path has three audiences. The member needs to know what happened and what to do next. | clock 09:00; three labels: "member", "desk staff", "on-call engineer", "member" as the accent
- c1-2 | The desk staff need to understand what the member is looking at. The on-call engineer needs to learn that something broke, with enough detail to find it. | same labels, "desk staff" as the accent, then "on-call engineer"
- c1-3 | Walk one failure up the layers, from the H T T P client to the template. Each layer has four honest moves. | heading "Four honest moves"; the lesson's six layers as labels, bottom to top: HTTP client, interceptors, service, store or resource, component, template
- c1-4 | Pass it on when the layer has nothing to add. Translate it when the layer can give it a better meaning. | table "Move / When it is right / Library example" from the lesson, cut in whole, the `Pass it on` row banded, then `Translate it`
- c1-5 | Show it when the layer owns a screen. Recover only with a fallback that is true, and labelled as such. | same table, the `Show it` row banded, then `Recover`
- c1-6 | Anything else drops the error. The test for a fallback: would a user who sees it believe something false? | same table, the sentence "Anything else is dropping the error." beneath it as the accent
- c1-7 | Reviewers should ask for translation more. Here a four oh four on a book becomes Book Withdrawn, and every other error passes on unchanged. | the lesson's `book(id)` code, cut in whole, band on the `new BookWithdrawn(id)` line, then on the `throwError(() => error)` line
- c1-8 | An expected failure is part of the feature, like a dropped network or a slow server. Only the screen that asked knows what the user was trying to do. | heading "Expected failures and unexpected ones"; `status()`, `error()`, `hasValue()`, `reload()` as labels
- c1-9 | Give requests a timeout too. A spinner with no end is the most dishonest state, because it promises an answer that is not coming. | `{ timeout: 8000 }` as a label
- c1-10 | An unexpected failure is a bug, like a Type Error in an event handler. Where it ends up depends on where it happens. | table "Where the error happens / Where it ends up" from the lesson, cut in whole; `TypeError` as a label
- c1-11 | An error report is a message to the on-call engineer. It ties the failure to a deploy, a route, a user action and the server side. | heading "What makes an error report useful"; table "A report must carry / A report must never carry", cut in whole, the "must carry" column banded
- c1-12 | It never carries credentials, personal data, or request and response bodies. | same table, the "must never carry" column banded
- c1-13 | Report H T T P failures once, at the transport edge, where an interceptor sees them all. A screen that also reports creates duplicates. | the sentence "Report HTTP failures once, at the transport edge" as a label
- c1-14 | A catch Error that logs and rethrows in every service is noise. Reporting every expected four oh four as a crash teaches people to stop looking. | heading "When not to catch", the first item, then the second
- c1-15 | In review, ask what a user believes while the server is down, and who finds out. A false screen or an unseen incident is blocking territory. | heading "Saying it in a review"; the label `blocking`
- c1-16 | Noise that hides real incidents is usually should fix. Friendlier wording is a nit, and a product owner's choice is a question. | the lesson's should-fix comment about `/api/holds`, cut in whole; the labels `should-fix`, `nit`, `question`
- c1-end | Four questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: the interceptor chain is an onion (11:30)

- c2-1 | Eleven thirty. Interceptors are policy nobody sees at the call site, and the server team receives traffic no user asked for. | clock 11:30; desk app at rest; `this.http.get('/api/loans')` as a label
- c2-2 | with Interceptors builds the chain in array order. A request goes through each interceptor in turn, and the response comes back the other way. | the lesson's flow diagram, arrows drawing on, the request edges first, then the response edges
- c2-3 | From inside one interceptor, everything below it is a single observable returned by next. So the order decides what each layer observes. | same flow, the `b` box as the accent
- c2-4 | With timing before cache, cache hits look like very fast requests. With cache first, timing sees only the network, which the latency dashboard wants. | `[timing, cache]` and `[cache, timing]` as labels, each as the accent in turn
- c2-5 | Neither order is wrong in general. Write the decision down where the array is. | `withInterceptors([a, b, c])` from the lesson as a label
- c2-6 | A function returning an observable can work when called, or when subscribed. Built once, of Date now keeps one time; defer reads the clock on every subscription. | heading "Eager and lazy work"; the lesson's marble diagram, rows printing on, the `c` marble as the accent
- c2-7 | When you read such a function, sort its work into those two moments. | same diagram held
- c2-8 | A retry is a second request nobody asked for, sent while the server is already struggling. When the second copy lands, who pays? | heading "A retry is a request nobody asked for"; the question "who pays?" as the accent
- c2-9 | For a read, usually nobody. A write may change data again, and the member pays with two loans or two fines. | the lesson's two-item list, the first item, then the second
- c2-10 | Methods and status codes are defined by what they promise, in R F C ninety-one ten. Work out from those promises which requests are harmless twice. | `RFC 9110` as a label
- c2-11 | Even some server errors never go away on their own. Five oh one and five oh five give the same answer on every attempt. | `501 Not Implemented` and `505 HTTP Version Not Supported` as labels
- c2-12 | When a write must be repeatable, the usual tool is an idempotency key: one I D per intent, and the server returns the first result for any repeat. | `Idempotency-Key` as a label
- c2-13 | During an outage, every client retries at once. Three attempts per request means three times the traffic, at a server already failing. | heading "Retries multiply load"
- c2-14 | Jitter spreads clients apart. Retry After says how long to wait. A retry budget caps retries at a small share of traffic, so failures end fast instead of flooding. | the lesson's three-item list, items appearing one by one
- c2-15 | A policy that differs per call belongs at the call site. When interceptor order matters, write down why, or add a test. | heading "When not to use an interceptor", both items
- c2-16 | In review, anything that can change data twice, or show a member something that did not happen, is blocking territory. | heading "Saying it in a review"; the label `blocking`
- c2-17 | Describe what the member sees first, and the fix second, especially for ordering problems. Here a failed request leaves the loading bar spinning. | the lesson's should-fix comment, cut in whole
- c2-end | Three questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: shared work and the session boundary (15:00)

- c3-1 | Three o'clock. Some work outlives the code that started it. Shared work decides server load, and what callers see when it fails. Work tied to a session decides privacy. | clock 15:00; desk app, a signed-in member's name in its header
- c3-2 | When several callers need the same async work, there are several ways to run it once. They differ on late callers, errors and cancellation. | table "Option / What it shares / Watch out for" from the lesson, cut in whole
- c3-3 | Share Replay is a cache, so decide how long its value stays true. A memoized promise cannot be cancelled, and a rejected one stays rejected until you clear it. | same table, the `shareReplay` row banded, then the memoized promise row
- c3-4 | exhaust Map drops triggers that arrive during a run, and those callers get nothing. A lock across tabs works only when every tab agrees on its name. | same table, the `exhaustMap` row banded, then the lock row
- c3-5 | None of these is the default. Ask which callers exist, when they arrive, and what each must see on failure. | same table held
- c3-6 | The session is a security boundary. At sign out, requests in flight, polling, web sockets and timers must stop, and everything stored for that member must be cleared. | heading "The session is a security boundary"; the two lists "What must stop" and "What must be cleared"
- c3-7 | A response that lands after sign out can refill a store that was just emptied. On a shared terminal, that shows one member another's loans. | desk app, a shared terminal at the desk
- c3-8 | So ask what makes a new feature's state die at sign out next year: the structure, or the author's memory? | the lesson's question as a label
- c3-9 | An injector that lives from sign in to sign out makes cleanup structural, but must be designed in early. A page reload is crude, yet often honest on public terminals. | the lesson's two structural answers, the first, then the second
- c3-10 | H T T P Context carries one request's intent through interceptors. It suits behaviour flags, like a cache lifetime. Requests that never set the token get its default, here zero. | heading "Behaviour flags and credentials are different things"; the lesson's `CACHE_TTL_MS` code, cut in whole, band on `() => 0`
- c3-11 | Credentials are different. An interceptor that attaches one must decide by an allow list of origins. With an opt out, every request nobody thought about carries it, third parties included. | the word **allow-list** as the accent, **opt-out** beside it, struck through
- c3-12 | Keep work separate when its callers need independent results, and prefer one structure that ends all session state over clearing stores one by one. | heading "When not to use them", its three items
- c3-13 | Concurrency findings hide in a diff, so put the timeline in the comment: three components ask at once, and the server sees three calls. | heading "Saying it in a review"; the lesson's timeline sentence as a label
- c3-14 | Data reaching the wrong person, lost work, or unbounded load are blocking. A unit spec cannot prove problems across tabs, so raise them anyway, and say so. | the label `blocking`
- c3-end | Four questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare your severities with the solution's table, and defend any disagreement in writing. | "After the lesson" card
- c3-afterb | If your comment names a rule where it could name an impact, rewrite it. | same card, its last sentence banded
- c3-close | Six o'clock. The desk closes. | clock 18:00, desk lights down
