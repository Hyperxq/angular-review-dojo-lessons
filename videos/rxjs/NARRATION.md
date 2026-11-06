# RxJS lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The circulation desk opens at nine, and the app behind it runs on Angular twenty-two. If you stopped at seventeen, four things moved. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-2 | Zone.js is gone. Nobody patches the browser anymore, so Angular checks the screen only when something it understands tells it to. | a `setTimeout` callback writes a plain field; no check happens
- c0-3 | There are four common ways to tell Angular, and a few rarer ones. A change that reaches none of them schedules nothing, so when you read code, ask which one each change uses. | four inputs light a "check" lamp: signal read by a template, template event, async pipe, markForCheck()
- c0-4 | OnPush is the default now. A component is checked when an input gets a new reference, an event fires inside it, or a signal it reads changes. | component tree with `[OnPush]` badges; an object mutated in place, nothing lights
- c0-5 | A signal is a value you hold. An observable is things happening over time. Keep each on its own side, and cross on purpose. | `signal(0)` box vs a marble line of clicks
- c0-6 | The bridge has four pieces, and every chapter leans on them. Then the desk opens. | table: toSignal, toObservable, takeUntilDestroyed, rxResource

## Chapter 1: a subscription has a lifetime (09:00)

- c1-1 | Nine o'clock. The staff open this tab, and they keep it open until closing time. By the afternoon, it is slower than it was this morning. | clock 09:00; "later that day…" fast-forward with a frame-time meter creeping up (the clock itself stays at 09:00)
- c1-2 | Nothing crashed. A heap snapshot shows screens that closed hours ago, still in memory. Something started, and nothing owns its end. | heap snapshot rows: detached components
- c1-3 | An observable is a function that has not run yet. Subscribing runs it. Some finish on their own. Some never do. | marbles: http.get completes, interval never does
- c1-4 | So compare two lifetimes. When the source outlives the component that subscribed, it keeps that component in memory, and keeps calling it after its screen is gone. | window / root service / timer bars longer than the component bar
- c1-5 | Pick the smallest tool. The offline banner needs no stream at all, and Angular removes the listener with the component. | `ConnectionBanner` with host `(window:offline)` code
- c1-6 | When you do need operators, give the stream an owner, so it ends with the screen and not with the window. | `fromEvent(window, 'resize')` code with `takeUntilDestroyed()`
- c1-7 | Even a request that ends on its own can land after its screen is gone. Owning it also cancels it. | an HTTP response arriving at an empty, destroyed view
- c1-8 | One caution. A signal keeps only the latest value, so two events in the same tick become one. | two events collapse into one signal value
- c1-end | Three questions before the exercise. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: races (10:30)

- c2-1 | Ten thirty. The member list shows a preview card with the loan count of whoever is under the pointer. | member list, pointer, preview card
- c2-2 | The pointer crosses three members. Three requests leave, and the network sends them back in whatever order it likes. | marbles: hover$, count 1, count 2, count 3
- c2-3 | The card settles on the first member while the pointer rests on the third. Nothing throws or logs, and every test on a fast machine passes. | preview row of the marbles lands on `a`; card shows member 1 under member 3
- c2-4 | The people who hit it are on slow connections, and what they see looks right. They have no reason to doubt it, and that is what makes it expensive. | a slow-connection indicator; the plausible wrong card
- c2-5 | Two rules cover most of it. Work for something the user stopped looking at must stop, or at least never reach the screen. | rule 1 as one line
- c2-6 | And sequence only what depends. A step that does not need another step's result should not wait for it. | rule 2 as one line
- c2-7 | Some work should finish anyway. A write can still land on the server, a prefetch fills a cache, and analytics should report. | three "do not cancel" cases
- c2-end | Before you open the exercise, ask these. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: the flattening operator is a business decision (11:45)

- c3-1 | Eleven forty-five. Four operators share one signature and compile in the same places. Choosing one looks like a detail. It is a product decision, and since demos rarely overlap events, it is usually made by accident. | four operator names on one signature line
- c3-2 | Each one answers the same question. A job is running and a second event arrives. What now? | a running job bar, a second event marble arriving
- c3-3 | Cancel the old job. Run both. Queue the new one. Or ignore it. | the four answers with their library cases (table from the lesson)
- c3-4 | Say the business rule out loud for the overlap, then pick the operator whose answer is the same sentence. | a sentence "If a second save starts while one is running, …" with a blank
- c3-5 | Then check the bill. A queue has no upper bound, and running side by side with no limit starts one job per event. | queue growing; parallel jobs multiplying
- c3-6 | Shape events before they become work. A reading-progress slider fires dozens of values per drag, and only the last one is worth saving. | marbles: slider, save (debounce)
- c3-7 | Waiting costs latency on every value, though. When the first one matters, like feedback on a press, keep the first. | press → instant feedback
- c3-end | Questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."

## Chapter 4: an error is the end of the stream (13:00)

- c4-1 | One o'clock. The returns desk shows books coming back, pushed over a WebSocket. | returns feed rows arriving
- c4-2 | A malformed message arrives. The parser throws, and the feed stops for the rest of the afternoon. | marbles: messages$, returns$ ending in `#`
- c4-3 | That is the contract. Any number of values, then at most one error or one completion. After either, the stream is finished for good. | the contract as three marks: values, `#`, `|`
- c4-4 | One bad message should end that message, not the feed. Here the plainest answer is to stop treating it as an exception. | marbles: z dropped, feed goes on; `tryParseReturn` code
- c4-5 | For every error, follow it from where it is thrown, operator by operator, until something handles it. Every subscription it passes on the way is over. | an error marker travelling down a pipe, each operator it passes going dark
- c4-6 | Retry is for failures that can heal, like a dropped connection. Wait between attempts, let the wait grow, and cap it, so a struggling server is not hammered by every open tab at once. | backoff bars growing to a ceiling; many tabs hitting one server
- c4-7 | Before you add it, ask what resubscribing does to every source above it, not only the one that failed. | pipe with sources above `retry` highlighted
- c4-end | Ask these before exercise four. | review questions card, then "Pause here. Now do exercise 04."

## Chapter 5: cold, hot, and shared (14:00)

- c5-1 | Two o'clock. Two widgets on the desk show the queue ticket, and they show two different numbers. | two widgets: ticket a and ticket b
- c5-2 | A cold observable runs once per subscriber. Every async pipe and every toSignal counts as a subscriber. Count them. | marbles: widget 1, widget 2
- c5-3 | Subjects differ in what a late subscriber gets: nothing, the current value, or a short history. Events want the first. Current state wants the second. | Subject / BehaviorSubject / ReplaySubject table
- c5-4 | A notification panel that opens late should show what happens next, not an old toast again. | marbles: toasts$, panel (Subject), panel (Replay)
- c5-5 | Sharing gives everyone one subscription. The real choice comes when the last subscriber leaves. Does the source keep running, or stop? | the two refCount diagrams side by side
- c5-6 | Neither choice is the safe default. Ask what the source costs while nobody watches, and what a latecomer should receive. The branch list and the position watch answer differently. Decide which, and why. | branch list and position watch, each with a "?"
- c5-end | Three questions for exercise five. | review questions card, then "Pause here. Now do exercise 05."

## Chapter 6: injection context, and the job of an effect (15:00)

- c6-1 | Three o'clock. Yesterday someone moved one line into a callback, and today the shelf map throws N G zero two zero three. | error banner NG0203 over the shelf map
- c6-2 | inject works only while Angular is constructing something: a field initializer, the constructor, a provider factory. Every helper built on it inherits that rule. | `injectBranchId` code: field fine, after `await` fails
- c6-3 | APIs that clean up after themselves use the same rule. Do the work at construction, or hand them an owner. | toSignal, takeUntilDestroyed, effect pointing at an owner
- c6-4 | The quieter trap is an effect that sends the page number back to one when the shelf changes. For a moment, the new shelf and the old page number live together. | shelf and page signals; a frame where shelf=new, page=old
- c6-5 | An effect is for leaving the signal graph: local storage, the document title, a chart. Deriving state is a job for computed or linkedSignal, and loading it is a job for a resource. | effect arrows leaving the graph to storage, title, chart
- c6-end | Before exercise six. | review questions card, then "Pause here. Now do exercise 06."

## Chapter 7: combination semantics and writing your own operator (16:00)

- c7-1 | Four o'clock. The overdue dashboard stays blank until something becomes overdue. | blank dashboard
- c7-2 | Combinators differ in two things: which inputs are allowed to trigger an emission, and what they wait for before the first one. | combineLatest / withLatestFrom diagram from chapter 0
- c7-3 | combineLatest waits until every input has emitted once. Give the slow one a starting value, or hold it in a signal, which always has one. | marbles: members$, overdue$, view
- c7-4 | Every combination makes a claim: these values belong together, right now. When a request sits between two of them, ask what the screen shows while it is in flight. | marbles: term$, results$, view; "frame 9?" marker
- c7-5 | Writing your own operator? Compose existing ones when you can. By hand, you owe the consumer four things: every value goes out or is dropped on purpose, errors reach it, completion reaches it, and unsubscribing stops everything you started. | the four-line contract checklist
- c7-6 | Don't check that by reading. TestScheduler runs marbles in virtual time and shows when your operator let go of its source. | TestScheduler test code; `^--!`
- c7-end | Questions for exercise seven. | review questions card, then "Pause here. Now do exercise 07."

## Chapter 8: state streams and lifetimes (17:30)

- c8-1 | Five thirty. Everything on the screen is a copy of the server, and copies drift. When they disagree, people stop trusting the screen. | screen and server side by side, values drifting apart
- c8-2 | A member is writing a book review, and the draft autosaves while they type. | review text box, "saving…"
- c8-3 | The save answers with the text as it was. Write that answer back into the box, and it erases what the member typed in between. | marbles: draft, save b, textbox
- c8-4 | Ask who owns each field, and what moment a response describes. The member owns the text. The server owns the time it was saved. | text field owned by member, "saved at" owned by server
- c8-5 | Anything that compares references notices only a new object. Push into the same array, and nothing downstream sees it. | `list.push` vs `[...list, book]`
- c8-6 | Updating first and telling the server after feels instant. Decide at the same time what the member sees if the server says no. | reading list reordered by drag, a server reply pending
- c8-7 | Every infinite stream needs an end. In a root service, the owner is the whole app, so until destroyed means never, in practice. Pick the shortest lifetime that still works. | lifetime bars: root, route, component
- c8-end | The last questions, for exercise eight. | review questions card, then "Pause here. Now do exercise 08."
- c8-after | When you finish, compare your fix with the solution, and write the two-sentence review comment you would leave. If you cannot, reread the chapter. | "After the lesson" card
- c8-close | Six o'clock. The desk closes. Tomorrow the same tab opens again. | clock 18:00, desk lights down
