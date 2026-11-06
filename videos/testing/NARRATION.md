# Testing lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. In Angular seventeen you ran N G test, Karma opened a browser, and green dots meant the feature worked. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; a column of green dots beside it
- c0-1b | These exercises start from the opposite case: a green build, a broken feature. The code has bugs too, but first explain why the tests let them through. | the green dots stay; the word **tests** from the lesson's opening paragraph as the accent
- c0-2 | A suite buys the confidence to change code, and an early warning of regressions. It also costs something: every test is code to maintain. | heading "What tests are for, and what they cost"; two labels "confidence to change code" and "early warning"
- c0-2b | A test is worth writing when the behaviour it protects would hurt someone if it broke, and is likely to be touched again. | the lesson's "What tests are for" paragraph, its "worth writing" sentence banded
- c0-3 | Coverage counts the lines that ran. It cannot tell whether anything was checked. The classic should create test proves only that the constructor does not throw. | the lesson's two bold words **ran** and **checked**, "checked" in accent; then `it('should create')`
- c0-4 | Pick the cheapest test that can see the risk. A fee rule needs no Test Bed. A flow across pages or a real server needs an end to end test. | table "What can break / Cheapest test that can see it", rows appearing one by one
- c0-5 | Component tests can be solitary, with every collaborator replaced, or sociable, replacing only the outside world. Solitary ones break when internals move. Most Angular teams lean sociable. | two columns "solitary" and "sociable", each one's tradeoff filling in
- c0-6 | Here, Karma and Jasmine are gone. The Angular builder compiles the specs like the app, and hands them to Vee test, running in J S dom. | heading "Karma and Jasmine are gone; Vitest runs through the Angular builder"; `@angular/build:unit-test` as a label
- c0-7 | Two runner defaults matter. Globals are on, so describe and expect need no imports. Isolate is false, so spec files share one environment per worker. | runner defaults table, the `globals: true` row banded, then the `isolate: false` row
- c0-7b | A value left in local Storage, a cookie or a stubbed global can reach the next file, not only the next test. | same table, "next **file**" in the `isolate: false` row as the accent
- c0-8 | The Test Bed is reset around every test, but only for what the test gets from it. Spies are restored after each file. Nothing restores fake timers. | same table, the "TestBed cleanup hooks" row, then the "Mocks between files" row banded
- c0-9 | Most Jasmine habits have a direct Vee test form. The done callback does not: Vee test throws on it, so write an async test instead. | dictionary table "Jasmine (v17) / Vitest (now)", rows appearing one by one, the last row banded
- c0-10 | Two additions. expect dot assertions fails a test unless exactly that many assertions ran, and an expect on resolves that nobody awaits is now an error. | `expect.assertions(n)` from the lesson; then `expect(...).resolves` as a label
- c0-10c | One limit: this builder cannot mock relative imports, so you replace dependencies through D I providers. | `vi.mock` struck through; the word "providers" beside it
- c0-11 | Fake timers replace the clock for the whole environment, and that environment outlives the file. Leave them on, and a test far away times out, or sees a stopped clock. | heading "Fake timers: spies are cleaned up between files, clocks are not"; `vi.useFakeTimers()`; a column of test rows, one far down turning red with the label "timeout"
- c0-11c | Tie the undo to the test, so it runs even when the test fails. | the lesson's `onTestFinished` code, band on the `onTestFinished` line
- c0-12 | The tests are zoneless too. fake Async and tick need Zone dot js, so time is controlled with Vee test's fake timers. | heading "Zoneless TestBed"; `fakeAsync`, `tick`, `flush` struck through
- c0-12b | Rendering is scheduled, as in the app. Set an input or a signal, and the DOM updates a moment later, so await when Stable before you assert. | the lesson's flow diagram drawing on arrow by arrow, the `await fixture.whenStable` arrow as the accent
- c0-13 | Under fake timers, rendering waits until you move the clock, and when Stable can wait too. Render with detect Changes, or fake only what you need, like Date. | tool table "Tool / Use it when", the `fixture.detectChanges()` row banded; then `vi.useFakeTimers({ toFake: ['Date'] })`
- c0-14 | Signal inputs are read-only from outside. A test sets them the way a parent template would, with set Input on the component ref. | the lesson's `LoanCard` code, band on the `setInput` line
- c0-14b | For HTTP, the testing module is deprecated. The modern setup is two providers, the real client and the testing backend. Then the desk opens. | the lesson's `provideHttpClient(), provideHttpClientTesting()` line; the clock turns to 09:00

## Chapter 1: a test that cannot fail (09:30)

- c1-1 | Nine thirty. The release manager ships the desk app because the build passed. The next developer refactors because the tests will catch a mistake. | clock 09:30; desk app with a green build badge in its header
- c1-2 | The reviewer skims the spec because it exists. Each of them is let down by a test that would still pass if the feature were deleted. | a spec tab beside the desk app, still green, while the feature's panel goes empty
- c1-4 | A test is a claim: if this behaviour broke, I would turn red. The only way to check the claim is to break the code and watch. | heading "The method: break one line, see what goes red"
- c1-5 | Pick one line and change it: flip a comparison, return a constant, delete a branch. Run the suite and note what fails. | the lesson's three changes "flip a comparison", "return a constant", "delete a branch" appearing one by one
- c1-5b | A line whose change turns nothing red is unprotected, whatever the coverage report says. Mutation testing tools like Stryker do this for every line. | the word "unprotected" as the accent; "Stryker" as a label
- c1-6 | In a review you do it in your head. Then run the method on the test: what is the most wrong behaviour that would still pass it? | the method's heading, the word "test" banded
- c1-7 | Tests that make no claim come from three places: a matcher that accepts almost anything, a read before the result exists, and an assertion that gets skipped. | three labels "the matcher", "the timing", "the control flow"
- c1-8 | Here is one of the last kind. Renew is called inside a try, and the message is checked in the catch. | the lesson's `try`/`catch` code, cut in whole, band on the `catch` block
- c1-8b | If renew stops throwing, the catch never runs, no assertion runs, and the test passes. | same code, the band moves to `renew(loanAtLimit);`
- c1-9 | The direct form expects the call to throw, and fails when it does not. Where a skipped path is hard to avoid, expect dot assertions catches it. | `expect(() => renew(loanAtLimit)).toThrow(/limit/)`; then `expect.assertions(n)`
- c1-10 | Rules have edges. Members with three or more late returns pay a deposit, and off by one bugs live on that edge. | desk app member list, a "late returns" column with values 2, 3 and 4
- c1-11 | A value from the middle proves the rule exists. Only two and three, the last value without a deposit and the first with one, prove where the edge is. | a number line of late returns, the edge drawn between 2 and 3, 2 and 3 banded, 4 dimmed
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: test doubles and where to put them (12:00)

- c2-1 | Twelve o'clock. The desk app reads today's date for its due labels, and asks a catalog server for every book a member looks up. | clock 12:00; desk app with a "due today" label and a catalog search box
- c2-2 | The bugs that cost the most sit in the seams: between your code and a library, a component and its services, the app and the network. | three seams marked on the desk app as thin accent lines, one at a time
- c2-3 | Doubles range from a dummy that fills a parameter to a fake that really works. Each removes real behaviour, so keep the behaviour under test real. | doubles table "Double / What it does / Example", rows appearing one by one, then the "What it does" column banded
- c2-4 | In Angular, the place to swap a collaborator is the injector. A due today label that reads new Date depends on the day the test runs. | heading "Angular's seams are providers"; the desk app's "due today" label
- c2-5 | Inject a clock, and time becomes an input. The test provides one that always returns the same Friday morning. | the lesson's `CLOCK` code, band on `inject(CLOCK)`, then on the `useValue` line
- c2-6 | Stub a store you own, and the test is solitary, fine when the store has its own tests. Keep it real, and it is sociable. | the "solitary" and "sociable" columns from chapter 0, a store box under each
- c2-7 | Only mock types you own. A hand-written double of Http Client or the Router copies behaviour you will get wrong, in exactly the cases you did not think of. | heading "Don't hand-roll fakes of types you don't own"; `HttpClient`, `Router` as labels; beside them a plain box labelled "hand-written HttpClient", struck through
- c2-8 | When the owner ships a fake, use it. provide Http Client Testing keeps the real client, its interceptors and your operators, and replaces only the network. | the lesson's flow diagram, arrows drawing on as each step is named, `HttpTestingController` as the accent
- c2-9 | Its Http Testing Controller lets the test inspect and answer each request. Which of its methods a suite uses, and where, decides what it can notice. | method table "Method / What it gives you", rows appearing one by one
- c2-9b | expect One asserts exactly one match. expect None asserts no matching request was made. match returns them all without asserting. verify asserts nothing is left outstanding. | same table, each row shown as it is named, none of them held or banded
- c2-11 | A selector like card title large ties a test to the stylesheet. A redesign breaks it, yet it misses a heading that lost its text. | `.card > .title-lg` from the lesson
- c2-12 | Query by role and accessible name: the heading named Dune, the button named Reserve. Users and assistive technology rely on those contracts. | desk app book card, its "Dune" heading and "Reserve" button outlined
- c2-12b | The dojo's get By Role helper throws unless exactly one match exists, and lists the names it found. For decorative details, a rare data test id is fine. | `getByRole(root, 'heading', { name: 'Dune' })` from the lesson
- c2-end | Four questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: suites that pass only in order (15:00)

- c3-1 | Three o'clock. The build goes red, someone spends the afternoon on it, and the fault turns out to be in the suite. | clock 15:00; desk app with a red build badge in its header
- c3-2 | After a few of those, people stop believing red builds, and that is how real regressions get merged. | a merge marker passing the red badge, which is waved away
- c3-3 | A spec file has several lifetimes, and each piece of test state should come from the shortest one that works. | the lesson's tree diagram, nodes drawing on top down
- c3-5 | The Test Bed resets Angular's injector around every test. It resets nothing else. Here is a leak with no Angular in it. | the lesson's tree diagram, `[fresh TestBed injector]` banded on both `it` nodes; then the lesson's `dune` code cut in whole
- c3-6 | Dune is one object at module scope. The first test lends a copy. The second expects two copies, and sees one if the first test ran before it. | the `dune` code, band on `const dune`, then on the `'2 copies'` line
- c3-7 | A factory gives every test its own fresh book object, with only the fields that matter spelled out. | the lesson's `aBook` factory line
- c3-8 | The same holds for everything a test can change and the next can read: module objects, caches, browser globals, the clock. Each test starts from a known state. | four labels "objects at module scope", "caches", "browser globals", "the clock"
- c3-9 | Two habits catch order dependence before a colleague does. Run each test alone, with include and filter. And shuffle a block with describe dot shuffle. | the "Prove independence" list, both items
- c3-9c | Treat passes only in sequence as a bug in the suite, the way you treat a race as a bug in the code. | the "Prove independence" list, its last sentence banded
- c3-10 | For each matcher, invent a wrong result that still passes it. If that is easy, ask whether the test needed the looseness or only tolerated it. | heading "Every assertion should be able to say no"
- c3-10b | Sometimes the looseness is needed: a generated id is never the same twice. Often it is only tolerated, because nobody knew the exact value. | the "a generated id" label only
- c3-10c | Waiting is no different. A test that waits on real time is slow on every run, and flaky on a slower machine. Fake timers make the clock an input. | a clock face beside a slow test row
- c3-11 | A test that reaches into private members, casts to any, or checks the order of internal calls describes how the code is written today. | heading "Test what someone outside can observe"
- c3-11b | Rename a field and it breaks, although nothing changed for anyone. Break the behaviour, keep the internals, and it still passes. | the heading stays; a field is renamed and the test row turns red; then the behaviour breaks and the row stays green
- c3-12 | Assert what a user, a caller or the outside world can see: what is rendered, emitted, sent or stored. Give inputs their values the way a parent does. | four labels "rendered", "emitted", "sent", "stored"; then `setInput` from chapter 0
- c3-end | Four questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare the solution's table of why each test could not fail with your own notes. | "After the lesson" card
- c3-afterb | Then write the comment you would leave on the test file, naming each weakness with what would make the test able to fail. | "After the lesson" card, its last sentence banded
- c3-close | Six o'clock. The desk closes. Tomorrow the suite runs again, and a red build will mean something. | clock 18:00, desk lights down
