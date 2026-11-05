# RxJS in modern Angular: a lesson before the exercises

You knew this once. You wrote `async` pipes, you fought `ExpressionChangedAfterItHasBeenCheckedError`, you put
`takeUntil(this.destroy$)` in every component of a v17 app. The knowledge is not gone, it is buried under a few years and a
framework that moved. This lesson digs it back up, one chapter per exercise, in the same order.

How to use it:

- Read one chapter, then do its exercise. Do not read ahead: each chapter assumes the previous exercise is done.
- The examples use a different domain (a library: books, members, loans) on purpose. The lesson gives you the pieces; the
  exercise makes you find where they are missing and assemble them yourself. That assembling is the learning.
- Every chapter ends with **review questions**. Ask them out loud while reading the exercise code. A reviewer who asks the
  right question finds the bug; one who scans for familiar shapes does not.

---

## Chapter 0: what moved since Angular 17

Before RxJS itself, recalibrate the ground it runs on. Four changes matter for every exercise.

### Zone.js is gone

In v17, Zone.js patched `setTimeout`, `addEventListener`, `XMLHttpRequest`, everything async. When any of those callbacks
finished, Zone told Angular "something may have changed" and change detection ran over the tree. That is why a plain field
assignment inside `subscribe` used to "just work".

This app is **zoneless**: `zone.js` is not even installed, and since v21 that is Angular's default, with no provider to
configure. Nobody patches the browser anymore. Angular schedules change detection only when something it understands tells it to:

- a **signal** read by a template changes,
- a template event handler (`(click)`) runs,
- an `async` pipe receives a value,
- someone calls `markForCheck()`.

A plain field assigned from an HTTP callback is none of those. The data arrives, the field changes, and the screen does not
move until something else happens to trigger a render.

### OnPush is the default

In v22 `ChangeDetectionStrategy.OnPush` is the default; the old behaviour is now called `Eager` (`Default` is a deprecated
alias). OnPush means "check me only when my inputs change by reference, when an event happens inside me, or when a signal I
read changes". Two consequences you will meet again:

- mutating an object in place is invisible: same reference, nothing to see;
- reactive state (signals) is the normal way to tell Angular that something changed.

### Signals are the state primitive

```ts
const count = signal(0);              // writable state
const double = computed(() => count() * 2); // derived, lazy, memoized
effect(() => console.log(count()));   // side effect that re-runs when what it read changes
```

A signal holds a **current value**. An observable describes **events over time**. That distinction drives every decision in
this lesson: keep values in signals, keep "things that happen" (clicks, keystrokes, server pushes, polling) in observables, and
cross the border on purpose.

### The bridge: `@angular/core/rxjs-interop`

| API | What it does |
|-----|--------------|
| `toSignal(obs$)` | Subscribes now, exposes the latest value as a signal, unsubscribes when the owner is destroyed. |
| `toObservable(sig)` | Emits the signal's value whenever it changes (asynchronously, after the change settles). |
| `takeUntilDestroyed()` | Completes a stream when the current component/service/injector is destroyed. Replaces the old `destroy$` subject. |
| `rxResource({ params, stream })` | Async state driven by signals: re-runs `stream` when `params` changes and cancels the previous run. |

Two of those, `toSignal` and `takeUntilDestroyed()` without arguments, only work in an **injection context**. Chapter 6 is
about that. For now, remember: call them in field initializers or the constructor.

---

## Chapter 1: a subscription has a lifetime (exercise 01)

### The mental model

An observable is a **function that has not run yet**. Calling `subscribe` runs it, and it gives you back a `Subscription`:
the handle that stops it. Everything else follows from that.

```text
http.get(...)        nothing happens
  .subscribe(...)    request sent; when it completes, the subscription ends on its own
interval(1000)       nothing happens
  .subscribe(...)    ticks forever, until someone calls unsubscribe()
```

So for every `subscribe` you see in a review, there are exactly two questions:

1. **Who is told when a value arrives?** In a zoneless app, if the answer is "a plain field", nobody renders it.
2. **Who ends it?** HTTP observables end themselves. Streams from a root service (`providedIn: 'root'`) live as long as the
   app. If a component subscribes to one and never unsubscribes, every visit to that page adds one more listener. They pile up.

### The tools

Let the framework own the subscription, and let the template read a signal:

```ts
@Component({
  selector: 'app-member-list',
  template: `
    @if (members(); as list) {
      @for (member of list; track member.id) { <p>{{ member.name }}</p> }
    } @else {
      <p>Loading…</p>
    }
  `,
})
export class MemberList {
  private readonly api = inject(MemberApi);

  readonly members = toSignal(this.api.list());
}
```

`toSignal` subscribes once, writes each value into a signal (so the template is notified), and unsubscribes when
`MemberList` is destroyed. Before the first value it returns `undefined`; pass `{ initialValue: [] }` if you prefer a
default.

When "load now" and "load again whenever X happens" are both needed, you do not write two subscriptions. You describe
**one stream** whose events mean "time to load", and map each event to a request:

```text
trigger$:   T----------T-------T-->      (first emission = initial load, then every X)
request:    \--res--|  \--res--|  \--res--|
result$:    ------r1----------r2--------r3-->
```

Pieces that help build `trigger$`: `startWith(value)` (emit one value first, then follow the source), `merge(a$, b$)` (one
stream with the events of both). Turning each trigger into a request is a **flattening operator**, which is the whole
subject of the next two chapters.

### Review questions

- For each `subscribe`: who renders the value, and who unsubscribes?
- Does this source outlive the component? Where is it provided?
- Are two subscriptions doing what one composed stream should do?

**Now do exercise 01.**

---

## Chapter 2: nested subscriptions and races (exercise 02)

### The problem

Here is a shape you have probably written in v12 and regretted in v14:

```ts
this.route.params.subscribe(({ id }) => {
  this.api.book(id).subscribe(book => {
    this.book = book;
    this.api.author(book.authorId).subscribe(author => (this.author = author));
  });
});
```

Navigate to book 1, then quickly to book 2. Two `book()` requests are in flight. If book 1 answers last, the page shows book 1
while the URL says book 2. Nothing cancels the first chain, because nothing knows it is obsolete. That is a **race**.

### The tool: higher-order mapping with `switchMap`

A higher-order operator maps each outer value to an inner observable and subscribes to it for you. `switchMap` adds one rule:
**when a new outer value arrives, unsubscribe from the previous inner one**. For HTTP, unsubscribing aborts the request.

```text
id$:      1-----2------------->
inner:    \--b1 (cancelled)
                \------b2--|
result$:  ---------------b2--->
```

Dependent requests chain with another flattening step; **independent** requests run in parallel with `forkJoin`, which
subscribes to all of them and emits once, with every last value, when all have completed:

```ts
forkJoin({ reviews: this.api.reviews(id), stock: this.api.stock(id) })
// -> { reviews, stock } once both are done
```

Careful: `forkJoin` waits for **completion**. Give it a stream that never completes and it never emits.

### The modern tool: `rxResource`

Since v19/v20 Angular can own the whole "re-run when this signal changes, cancel the old run" pattern:

```ts
export class BookPage {
  readonly id = input.required({ transform: numberAttribute });

  readonly book = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => this.api.book(id),
  });
}
```

The template reads `book.value()`, `book.isLoading()`, `book.error()`, or checks `book.hasValue()`. When `id` changes, the
previous `stream` subscription is unsubscribed, which aborts its request. You get `switchMap` semantics without writing the
pipeline. If `params` returns `undefined`, the resource stays idle and makes no request.

### Review questions

- When the input changes, what happens to the work started for the previous value?
- Are these requests really dependent on each other, or only written one inside the other?
- Is there a `subscribe` inside a `subscribe`? (There almost never should be.)

**Now do exercise 02.**

---

## Chapter 3: the flattening operator is a business decision (exercise 03)

### The four answers to one question

Every flattening operator answers: **"an inner request is running and a new outer event arrives. What now?"**

| Operator | Answer | Good for |
|----------|--------|----------|
| `switchMap` | Cancel the old one, start the new one. | Reads where only the latest matters: search, navigation. |
| `mergeMap` | Run both in parallel, emit results as they come. | Independent work where order does not matter (e.g. uploading separate files). |
| `concatMap` | Queue the new one until the old one completes. | Writes that must all happen, in order. |
| `exhaustMap` | Ignore the new one while the old one runs. | Actions that must happen once per intent: submit, login, "pay". |

None of them is "the right one". The ticket tells you which one, if you translate the business rule. And a wrong choice
fails in a specific, recognisable way:

- `mergeMap` on a search: late responses overwrite newer ones. The results match an old term.
- `switchMap` on a write: a second click cancels the first request **on the client**, but the server may already have
  processed it. You do not know if the write happened.
- `concatMap` on a double click: two writes, both executed. Correct for some rules, a duplicate for others.

### Shaping events before they become requests

Keystrokes are not search terms. Two operators turn the first into the second:

```ts
this.query.valueChanges.pipe(
  debounceTime(300),        // wait for a 300 ms pause before letting a value through
  distinctUntilChanged(),   // drop a value equal to the previous one
);
```

```text
keys:      b-bo-boo-------book------book-->
debounce:  -----------boo--------book------book--->
distinct:  -----------boo--------book------------->
```

Order matters: debounce first (collapse a burst into its last value), then de-duplicate what is left.

### Review questions

- For each flattening operator: what does the business want when a second event arrives during the first request?
- Is this a read or a write? Is cancelling it on the client the same as cancelling it on the server?
- How many requests does typing one word cause?

**Now do exercise 03.**

---

## Chapter 4: an error is the end of the stream (exercise 04)

### The contract

An observable may emit any number of `next` values, then **at most one** `error` **or** `complete`. After either, it is
finished. Forever. No more values, no matter what the source would have emitted.

That rule has a surprising consequence when you compose streams. Look at this:

```ts
this.selectedShelf$.pipe(
  switchMap(shelf => this.api.booksOn(shelf)),
  catchError(() => of([])),
)
```

When one request fails, the error travels **out of** the inner observable and into the outer chain. `catchError` catches it
and replaces the whole stream with `of([])`, which emits `[]` and completes. The outer chain is now finished. The subscription
to `selectedShelf$` is gone. Clicking another shelf does nothing, because nobody is listening anymore.

The fix is about **where** the error is handled: on the outer chain, an error ends everything; on the inner observable (inside
the projection function), it ends only that one request.

```text
outer:  A----B----C--->
inner:  \-ok \-ERR \-ok      handled inside:  outer keeps going
inner:  \-ok \-ERR           handled outside: outer dies at B
```

### Retrying without making things worse

`retry` resubscribes to the source when it errors. The bare form `retry(3)` resubscribes **immediately**, three times in a row.
If the server is failing because it is overloaded, you just quadrupled its load at the worst possible moment.

The config form lets you wait between attempts:

```ts
retry({
  count: 3,
  delay: (error, retryCount) => timer(1000), // wait 1 s before each retry
});
```

`delay` receives the error and the attempt number (starting at 1) and returns an observable; the retry happens when it emits.
A constant delay is better than none. A delay that **grows** with each attempt (exponential backoff) is what a struggling
server needs. You can also inspect `error` and rethrow with `throwError(() => error)` for errors that retrying cannot fix,
such as a 404.

`retry` resubscribes to what is **above** it in the pipe, so its position matters for the same reason as `catchError`'s.

### Review questions

- If this request fails, which stream ends: the request or the whole feature?
- How fast does this code hit the server again after a failure? How many times?
- After the final failure, what does the user see, and can they try again without reloading?

**Now do exercise 04.**

---

## Chapter 5: cold, hot, and shared (exercise 05)

### Cold observables run once per subscriber

Remember chapter 1: an observable is a function that has not run yet. Subscribe twice, and it runs twice. For
`http.get`, that means **two requests**. This is called a cold observable.

The `async` pipe subscribes. So does `toSignal`. So:

```html
<p>{{ (books$ | async)?.length }} books</p>
<p>{{ (books$ | async) | totalPages }} pages</p>
```

is two subscriptions, two requests. The fix is not a smarter template. Subscribe **once**, keep the value in one place, and
derive the rest from it (a `computed` from one `toSignal`, for example).

### Subjects: which one remembers?

A Subject is both an observable and the thing you push values into. They differ in what a **late** subscriber receives:

| Type | Late subscriber receives |
|------|--------------------------|
| `Subject` | Nothing. Only values pushed after it subscribed. |
| `BehaviorSubject(initial)` | The current value immediately, then future ones. Always has a value. |
| `ReplaySubject(n)` | The last `n` values, then future ones. |

If a component subscribes to "the current selection" after the selection was made, a plain `Subject` gives it nothing. For
"current state" questions, a `BehaviorSubject` or, better in modern Angular, a `signal` is the right shape.

### Sharing a source between subscribers

`shareReplay` makes one subscription to the source and hands its values to every subscriber, replaying the last ones to late
arrivals. Its config decides what happens when the subscribers leave:

```ts
source$.pipe(shareReplay({ bufferSize: 1, refCount: false })) // the default
source$.pipe(shareReplay({ bufferSize: 1, refCount: true }))
```

- `refCount: false` (the default, and what `shareReplay(1)` means): the source subscription stays alive **even when nobody is
  subscribed anymore**. For a one-shot HTTP call, harmless: it completed anyway. For a `timer` that polls every 30 s, it polls
  for the rest of the session, and the next subscriber gets the stale buffered value first.
- `refCount: true`: when the subscriber count drops to zero, unsubscribe from the source. The next subscriber starts it again.

The question is always: **is this source finite or infinite?** Infinite sources almost always want `refCount: true`.

`share()` is the variant without a replay buffer, with `refCount`-like behaviour by default.

### Review questions

- How many times is each cold observable subscribed? Count every `async` pipe and `toSignal`.
- Does a late subscriber need the current value? Does this Subject give it one?
- If every consumer leaves, does the source stop?

**Now do exercise 05.**

---

## Chapter 6: injection context, and where requests should start (exercise 06)

### Injection context

`inject()` only works while Angular is constructing something: field initializers, the constructor, a provider factory, or a
function run inside `runInInjectionContext`. That is the **injection context**. Several interop APIs rely on it to find the
owner they clean up with:

- `toSignal(obs$)` needs it to find the `DestroyRef` it unsubscribes on;
- `takeUntilDestroyed()` with no argument needs it for the same reason.

Call either one from a click handler, and the construction phase is long over. You get `NG0203` in the console
("can only be used within an injection context").

When you genuinely need them later, hand them the owner explicitly:

```ts
export class LoanPanel {
  private readonly destroyRef = inject(DestroyRef); // captured in the injection context
  private readonly injector = inject(Injector);

  watch(): void {
    this.feed.events$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => this.notify(event));
  }

  later(): void {
    const value = toSignal(this.feed.events$, { injector: this.injector });
  }
}
```

But first ask whether the code should be in a method at all. Often the better shape is reactive state declared up front, which
a click only changes (for example a signal that a resource's `params` reads, returning `undefined` until the user asks).

### `effect` is not a data-fetching tool

`effect` is for pushing signal state **out** to something non-reactive: `localStorage`, a logger, a third-party chart, the DOM
API. It is the wrong tool for:

- **deriving** state: use `computed` (or `linkedSignal` when the derived value must also be writable);
- **loading** state: use `resource` / `rxResource`.

An effect that starts a request on each run has the race from chapter 2: nothing cancels the previous run's subscription
unless you register cleanup yourself with `effect(onCleanup => …)`. And pushing results into a Subject so that a `toSignal`
can read them is a long detour around a `computed` or a resource.

### Review questions

- Is this interop call running in an injection context? If it is in a method or a callback, what owns its cleanup?
- Is this `effect` syncing to the outside world, or computing/loading state?
- When the effect's inputs change, what happens to what the previous run started?

**Now do exercise 06.**

---

## Chapter 7: combination semantics and writing your own operator (exercise 07)

### Who is allowed to cause an emission?

Three combinators, three different rules:

| Operator | Emits when | Use for |
|----------|-----------|---------|
| `combineLatest([a$, b$])` | **any** input emits (after all have emitted once) | values that are all "current state" |
| `a$.pipe(withLatestFrom(b$))` | **only** `a$` emits; `b$` is just read | an event that needs to read some state |
| `zip(a$, b$)` | each input emitted one more value; pairs them by index | rarely what you want in UI code |

Draw marbles before choosing. A click is an **event**, not state: putting it in `combineLatest` means "re-fire this click
every time anything else changes". That is how a single click becomes many actions.

### The diamond glitch

```ts
const line$ = /* emits { price, qty } */;
const price$ = line$.pipe(map(l => l.price));
const qty$ = line$.pipe(map(l => l.qty));
combineLatest([price$, qty$]).pipe(map(([p, q]) => p * q));
```

One change of `line$` makes `price$` emit, then `qty$` emit. `combineLatest` emits **twice**: first with the new price and the
old quantity (a value that never existed), then the correct one. Two views of the same source should not be recombined; map
the source once.

Signals do not have this problem: a `computed` reads all its inputs at the moment it is evaluated, so it never sees half an
update. That is one reason derived values belong in signals.

### Writing an operator

An operator is a function from observable to observable. The safest way to write one is to compose existing operators:

```ts
const nonEmpty = <T>(): MonoTypeOperatorFunction<T[]> =>
  source => source.pipe(filter(list => list.length > 0));
```

When you must write it by hand with `new Observable`, you take on the full contract that every consumer relies on:

```ts
function everyOther<T>(): MonoTypeOperatorFunction<T> {
  return source =>
    new Observable<T>(subscriber => {
      let index = 0;
      const subscription = source.subscribe({
        next: value => {
          if (index++ % 2 === 0) subscriber.next(value);
        },
        error: err => subscriber.error(err),   // forward errors
        complete: () => subscriber.complete(), // forward completion
      });
      return subscription;                     // teardown: unsubscribing from us unsubscribes from the source
    });
}
```

The checklist: forward `next` (transformed), forward `error`, forward `complete`, return the source subscription as the
teardown. Miss one and the consumer cannot stop you, or never learns that you finished or failed.

### Review questions

- For each combinator, which inputs should be allowed to trigger an emission?
- Are any two inputs of `combineLatest` derived from the same source?
- In each hand-written operator: are `error` and `complete` forwarded? Is the source subscription returned?

**Now do exercise 07.**

---

## Chapter 8: state streams and lifetimes (exercise 08)

The last exercise has no new operator. It tests whether the previous seven chapters became habits.

### `scan` as a reducer, and the reference rule

`scan` is `Array.reduce` over time: each event produces new state from the previous one.

```ts
const shelf$ = actions$.pipe(
  scan((state, action) => reduce(state, action), initialShelf),
  shareReplay({ bufferSize: 1, refCount: true }),
);
```

The reducer must return a **new** object when something changed. If it mutates `state` and returns it, the reference stays
the same, and everything downstream that compares references stops reacting: an OnPush component, a `distinctUntilChanged`,
a signal (signals compare with `Object.is` by default). Values change "in place" and the screen does not follow. Return new
objects and arrays: spread, `map`, `filter`.

### A server response describes the past

A response to a request sent at time T describes the server at time T. If the user changed something locally after T, writing
the response over local state undoes the user's change. Two common answers:

- **cancel** the in-flight request when local state changes (the `switchMap` reflex), when that is possible;
- **version** the state: increment a counter on each local change, remember the version a request started from, and drop the
  response if the state moved on.

### Optimistic updates need an undo

Updating the UI before the server confirms (optimistic update) is fine, as long as a failure **undoes** it. A failed request
with no error handler does two bad things: the UI keeps a change the server rejected, and (chapter 4) the stream that issued
it is dead. Handle errors inside the inner observable: `catchError(() => EMPTY)` to skip one failed poll, or turn the error
into a rollback action fed back into the reducer.

### Every infinite stream needs an end

A polling `timer` started in a service is infinite. Ask what ends it:

- `takeUntilDestroyed()` ties it to the injector that created it. Careful: in a `providedIn: 'root'` service that injector is
  the whole app, so "destroyed" means "never" in practice. A component, or a service provided by a component, has a shorter
  lifetime.
- `refCount: true` (chapter 5) stops it when nobody is watching.
- Page visibility: `fromEvent(document, 'visibilitychange')` emits when the tab is hidden or shown; read
  `document.visibilityState` and switch between "poll" and "do nothing" (`EMPTY`).

### Review questions

- Does every reducer branch return new references?
- Can a response overwrite a local change that happened after its request was sent?
- For every request: what happens to the UI and to the stream when it fails?
- For every infinite stream: what stops it, and does that happen when the user can no longer see it?

**Now do exercise 08.**

---

## After the lesson

When you finish an exercise, read its `SOLUTION.md` on the `solutions` branch and compare it with your fix. Then write, in
two sentences, the PR comment you would leave for the author. If you cannot write it without looking, the concept is not
yours yet: reread the chapter.
