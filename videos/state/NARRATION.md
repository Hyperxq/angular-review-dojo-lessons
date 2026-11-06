# State lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. Users describe state bugs in three words: the app lies. | desk app, clock 08:55 in its header; title "State at scale"
- c0-1b | So for every piece of state, a reviewer asks where it lives, who may change it, and how long it lives. | three labels from the lesson's opening paragraph: "where it lives", "who may change it", "how long it lives"
- c0-2 | To choose where state lives, climb a ladder one rung at a time, and stop at the first rung that works. The lowest rung derives the value. | table "Rung / Use it when / Example in the library app", the "Derive it, do not store it" row
- c0-2b | Next comes a component, when one component owns the value, or the U R L, when it should survive a shared link and the back button. | same table, the "A component, or the URL" row
- c0-2c | A service with signals fits a few components that share state. A signal Store fits state with structure, rules and several writers. | same table, the service row, then the `signalStore` row
- c0-2d | An event-driven store earns its place with an audit trail, time travel, or features reacting to each other. Every rung up adds ceremony. | same table, the last row; the whole ladder held
- c0-3 | Most of what a library app shows belongs to the server. On the client, it is a cache. How old is it, and who invalidates it? | heading "Server state is a cache"; desk app book list with an availability column; `resource`, `rxResource` and `httpResource` as labels
- c0-3b | Client state, like a draft or an open panel, has no second copy, so it never goes stale. It just has to be correct. | desk app with an open side panel and a selected row
- c0-4 | This is a part two topic, so you grade what you find. First question: can the screen show something false that users act on? | heading "Grading state findings"; the lesson's numbered list, item one as the accent
- c0-4b | Can data reach the wrong owner? A race needing two requests within milliseconds still happens daily on a busy day. And timing nobody tests comes back. | same list, items two to four
- c0-5 | An avatar cached for an hour after a change is false, but harmless and self-healing: a nit. | the lesson's first worked example; the label `nit`
- c0-5b | A lost review draft is a product decision. For a one-line comment it is should-fix. For twenty minutes of writing, it is blocking. | the lesson's second worked example; `should-fix`, then `blocking`
- c0-5c | A cached search still showing a withdrawn book sends members to an empty shelf. Should fix if it refreshes within minutes, blocking if nothing ever invalidates it. | the lesson's third worked example; `should-fix`, then `blocking` as the accent
- c0-6 | Since Angular seventeen, signals became the way Angular learns about change. The app is zoneless, and components default to On Push. | heading "What moved since Angular 17"; `zone.js` and `OnPush` as labels
- c0-6b | A component renders again when a signal its template reads changes, a template event runs, or an async pipe emits. A plain field set from a callback is invisible. | the three triggers as labels, then "a plain field" as the accent
- c0-7 | A Behavior Subject handed out as an observable becomes a signal handed out read only. A selector becomes computed, and a reducer becomes a store method. | table "v17 / v22", rows appearing one by one
- c0-8 | Two toolbox facts matter in review. Effects do not run when a signal is set. Angular runs them later, in its update cycle. | table "API / Status in v22 / Use it for" cut in whole, the `effect` row banded
- c0-8b | By default, signals compare with Object dot is, so setting a signal to the same object, even after mutating it, notifies nobody. | same table, the `signal(v)` row banded
- c0-9 | Where a service is provided decides how many exist: one for the app in root, one per route subtree, or one per component instance. | "Where a service lives" paragraph; root, route `providers` and component `providers` as labels
- c0-10 | A signal Store builds an injectable class from features. with State gives one signal per key, and with Methods is where patch State calls belong. | the lesson's `ShelfStore` code, cut in whole, band on `withState`, then on `patchState(store, { shelfName })`
- c0-10b | By default, patching the state from outside the store is a type error. The events plugin adds an event layer when you want one. Then the desk opens. | same code; `@ngrx/signals/events` as a label; the clock turns to 09:00

## Chapter 1: facts, views and copies (09:00)

- c1-1 | Nine o'clock. The first loans go out. A screen that disagrees with itself is worse than a slow one. | clock 09:00; desk app loan list
- c1-2 | Ask two questions of every piece of state. Is it a fact nobody can compute, or a view of other facts? And who may change it? | heading "The mental model: facts and views"; the lesson's two numbered questions
- c1-3 | Take a loan. When it went out and the member's tier are facts. The loan length, the due date, and whether it is overdue are views. | the lesson's `Loan` tree diagram, nodes drawing on top down
- c1-4 | Store the due date as a fact, and you keep a second truth. The member moves to a tier with longer loans, and the date stays put. | same tree, `dueOn [view of checkedOutOn and loanDays]` as the hot node
- c1-5 | computed turns a view into something that cannot drift. Here the clock is a signal that ticks every minute, so time-based values stay live. | the lesson's `Clock` and `LoanCard` code, cut in whole, band on `dueOn`, then on `this.clock.now()`
- c1-6 | A computed is only as live as its signal inputs. Read new Date inside it instead, and overdue never flips at midnight. | same code, band on the `isOverdue` line
- c1-7 | So when you review a computed, look for hidden inputs that are not signals: the current time, local Storage, a plain field, a global. | labels: the current time, `localStorage`, a plain field, a global
- c1-8 | Fact or view is a business question, so ask it. If the library fixes the due date at checkout, storing it is correct. | the lesson's IMPORTANT callout
- c1-9 | A signal read returns the value at that instant. In a template, a computed or an effect, it stays live. In a field initializer or constructor, it is copied once. | table "Where the read happens / What you get" cut in whole
- c1-10 | Sometimes a copy is right. An edit form starts from the book's data, and the server must not overwrite each keystroke. | desk app edit form for a book, with a title field
- c1-11 | linked Signal gives that draft the one link it still needs. Its source is the book's I D, so the draft resets when another book opens. | the lesson's `EditBookForm` code, band on `source: () => this.book().id`
- c1-12 | Follow the title instead, and a background refresh would wipe the typing. Which value the draft follows is a design choice, so make it on purpose. | same code, band on `computation: () => untracked(() => this.book().title)`
- c1-13 | A copy turns into a bug once the screen presents it as current, so ask which kind of read the author meant. | the read table again, the field initializer row banded
- c1-14 | A public signal on a shared service is a public setter. Hand out a read-only view, and write through the service's methods. | the lesson's two `dailyGoal` lines, band on the first, then on the second
- c1-end | Five questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: stores, references and normalized data (11:30)

- c2-1 | Eleven thirty. The shelves fill up. A store serves views that different people wrote, and each one trusts it to announce changes. | clock 11:30; desk app shelf map
- c2-2 | patch State builds the new state, then compares each top-level key with the old one by reference. Only keys with a new reference get their signal set. | heading "`patchState` compares references, one level deep"; `!==` as a label
- c2-3 | So an updater returns new references for everything it changed, at every level it changed, up to the top-level key. | the lesson's `LibraryState` tree as kit nodes, the path from a changed record up to its top-level key marked
- c2-4 | Spread, map, filter and to Spliced give you new values. Push, splice, sort, property assignment, and writes to a Set or Map change it in place. | two label groups: `...`, `map`, `filter`, `toSpliced`; then `push`, `splice`, `sort`, assignment, `Set`/`Map` `add`/`set`, the second group as the accent
- c2-5 | Deep spreads that get tiring hint that the state has the wrong shape. | heading "Normalize what is shared, embed what is historical"
- c2-6 | When one entity is embedded in several places, an update reaches one copy and the rest go stale. | same heading; one book copied in two places, only one copy updates
- c2-7 | Normalizing means one collection per kind of entity, references by I D, and views that join them. The join is a lookup. | the lesson's `LibraryState` tree, then its `loanRows` code, band on `books[loan.bookId]?.title`
- c2-8 | In a store, with Entities keeps each collection as a map by I D plus an ordered list of I Ds, and its updaters return new references. | `addEntity`, `updateEntity`, `removeEntity`, `setAllEntities` and `upsertEntity` as labels
- c2-9 | Do not normalize everything. A receipt for a paid fine is history: it keeps the title as it was on the day of payment, so embedding a copy is correct. | desk app fine receipt with a book title on it
- c2-10 | A shelf page lets the librarian sort its books, and opening another shelf should put the sort back to title order. A common first attempt uses an effect. | the lesson's `effect` reset code, typed in
- c2-11 | The shelf signal is written now. The effect is scheduled for later and writes the sort then, and the template renders after that. | the lesson's flow diagram, arrows drawing on as each step is named
- c2-12 | In that window the new shelf and the old sort coexist. A request built from both would use a combination the user never chose. | same flow, the first two arrows as the accent
- c2-14 | A value the user writes, and that resets when its source changes, is what linked Signal describes. | the lesson's `linkedSignal` sort code, cut in whole
- c2-15 | To pick a tool, ask whether users must overwrite the value, and whether it has to leave the signal graph. | table "Tool / Use it when the value / Do not use it when" cut in whole
- c2-16 | A correct effect writes to something outside, like local Storage, and nothing reads its output back into the graph. | the lesson's `localStorage.setItem` effect code
- c2-end | Four questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: optimistic updates, overlap and ownership (15:00)

- c3-1 | Three o'clock, the busiest hour at the desk. Optimistic updates make an app feel instant, and they promise that a refusal puts the screen back to the truth. | clock 15:00; desk app with a queue of members at the counter
- c3-3 | A librarian fixes a book's title, then moves it to another shelf. Both requests go out. The title request fails late, after the shelf request succeeded. | the lesson's marble diagram, printed row by row, the `#` on the `title` row as the accent
- c3-4 | An undo that puts back the whole record from before the edit also undoes the shelf move the server accepted. | same diagram, the `s` on the `shelf` row pulsing
- c3-5 | Whatever the strategy, it has to answer one question. Has anything else written this state since my request started? | table "Strategy / How it undoes / Fits when / Breaks when" cut in whole
- c3-6 | Each strategy breaks on a different kind of overlap, so match it to whatever else can write while the request is in flight. | same table, the "Breaks when" column banded
- c3-7 | The last row is a real option. An optimistic update needs a believable undo, and paying a fine has none. | same table, the "Do not be optimistic" row banded
- c3-8 | Success can be wrong too. An autosave sends Dune, then the librarian saves Dune Messiah. Both succeed, and nothing guarantees they arrive in order. | heading "Success can be wrong too"; "Dune" and "Dune Messiah" as two request labels
- c3-9 | If the autosave lands last, the server holds Dune while the screen shows Dune Messiah. | same labels, "Dune" as the accent
- c3-10 | Two ways out, both decided with the backend: send writes to one resource one at a time, or have the server reject stale writes with versions, like an E Tag. | `ETag` and "version number" as labels
- c3-11 | Every slice of state belongs to something: the app, a route parameter, a browser tab, a person. Name the owner, and check where it is written down. | heading "State has an owner"; the four owners as labels
- c3-12 | Then ask what happens to the slice when the owner changes, and to requests for the old owner whose answers are still on the way. | the lesson's ownership questions, items two and three
- c3-end | Four questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, read its solution on the solutions branch. Compare its severity table with yours first, then the fix. | "After the lesson" card
- c3-afterb | Then write the comment you would leave, and state the impact: members can reserve a withdrawn book for up to an hour, because nothing clears the search cache. | same card, the lesson's two example comments, the first as the accent
- c3-close | Six o'clock. The desk closes. | clock 18:00, desk lights down
