# Architecture lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The library desk opens at nine. Architecture comments are the hardest to write well, because they point at a cost that has not arrived yet. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-1b | Say too little and the cost arrives. Say too much and you block every pull request on taste. This topic trains both halves. | the lesson's two halves as labels: "seeing the structural problem", "deciding how much it should weigh in this pull request"
- c0-2 | Structure answers a handful of forces: change cost, team boundaries, testability, onboarding and extraction. Conway's law says systems end up shaped like the teams that build them. | table "Force / How it shows up when ignored / What structure buys", rows appearing one by one, the "Team boundaries" row as the accent
- c0-2b | Each force has a tell, like a test that wires up half the app to check one behaviour. Until a force is real, structure is overhead. | same table held, the "Testability" row banded
- c0-3 | Then weigh what you find. Blocking is for members seeing wrong data, a change that is hard to undo, or a broken contract that another team consumes. | table "Label / Library example", the "blocking" row
- c0-3b | Should-fix is a real cost with a clear fix. A nit is a file name that does not match its class. A question is taste, or an open design choice. | same table, the "should-fix", "nit" and "question" rows one by one
- c0-4 | Now what moved. In seventeen you wrote standalone true on every component. In twenty-two point two it is the default, and most new code has no N G Module. | heading "Standalone is the default, so the public surface needs a new home"; `standalone: true` as a label
- c0-4b | N G Modules never blocked imports, but they listed what a feature exposed to templates. Without them, that public surface usually moves to an index file, enforced by tooling. | `index.ts` as a label
- c0-4c | Feature scoping moved to the router. load Children and load Component draw the lazy boundary, and a route's providers scope services to that part of the app. | `loadChildren`, `loadComponent` and route `providers` as labels
- c0-5 | Signal inputs and outputs make a component's contract readable at a glance. A computed over inputs replaces the N G On Changes that recomputed derived fields. | the lesson's `LoanRow` code, cut in whole, band on the `input.required<Loan>()` line, then on the `computed` line
- c0-6 | Twenty-two adds an at Service decorator. With no options it is provided in root. With auto Provided false, some providers array has to list it. | the lesson's `@Service()` code, band on the first line, then on `autoProvided: false`
- c0-6b | A root service is shared by the whole app. A service in a feature's route or component providers belongs to that feature. Scope states ownership. Then the desk opens. | same code held; the clock turns to 09:00

## Chapter 1: who knows what (09:00)

- c1-1 | Nine o'clock. Members queue at the desk and the first screens load. Today's first question is who knows what. | clock 09:00; desk app member list
- c1-2 | A container knows where data comes from and what happens on events. It injects services, reads the route, calls A P Is and navigates. | heading "Containers and presentational components"; the word **container** as a label
- c1-2b | A presentational component knows how things look. Data comes in through inputs, what the user did goes out through outputs, and it has no I slash O. | the word **presentational** as a label beside it
- c1-3 | The library's Book Cover once injected feature flags and analytics. Then the self-service kiosk wanted the same cover, and it may not send analytics. | the lesson's first `BookCover` code, cut in whole, band on the two `inject` lines
- c1-3b | The split moves both decisions out. Each container builds the view model from what it may read, and decides what the opened event means. | the lesson's `CoverView` and second `BookCover` code, then the lesson's tree diagram, `SearchPage` and `KioskPage` drawing on
- c1-4 | You can run the test in your head: can this render with its inputs alone? No H T T P, navigation or analytics in presentational components. | same tree, a `BookCover` node as the accent
- c1-5 | A business rule is a sentence the product owner could say, like reference books never leave the building. Each one lives once, in a plain function. | heading "One place per rule"; the three rule sentences from the lesson appearing one by one
- c1-5b | That function has no Angular in it, and a test for every case it names, plus the combinations where the order of the checks matters. | the lesson's `circulation-rules.ts` code, cut in whole, band on the `export function borrowDecision` line
- c1-6 | Duplicated rules drift, because the next change reaches only one copy. For every rule, find its single owner, then check that each screen asks that owner. | WARNING callout from the lesson
- c1-7 | Not everything splits. A leaf used once, with one trivial dependency, can stay whole. And truncating titles is presentation, not a business rule. | heading "When not to split"; the list's first two items appearing one by one
- c1-7b | A presentational component may even read a store, if a test can fake it. The rule that matters is no I slash O, not no providers. | same list, the third item
- c1-8 | If a user can already see a wrong result, correctness comes first. A cost in testing and reuse is usually should-fix. When a split buys nothing, say fine for now. | the lesson's `HoldButton` comment, the label `should-fix` as the accent
- c1-end | Three questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: boundaries you can test (11:30)

- c2-1 | Eleven thirty. The admin screens load lazily, and each team owns its own folder. Two forces meet at every feature boundary. | clock 11:30; desk app with an annotation tag "lazy" pointing at the admin area, not part of the app UI
- c2-2 | Lazy loading saves bytes only while nothing eager reaches in. A team can reshape its code only while nobody depends on the inside. The compiler enforces neither. | heading "Boundaries you can test"
- c2-3 | A feature folder holds everything it needs, and one index file naming what others may use. The shell reaches admin only through load Children and its routes file. | the lesson's tree diagram, the `index.ts [public]` nodes as the accent, then the `shell [eager]` node
- c2-4 | Keep each barrel, that index file, short and with named exports: barrels make cycles easier to create and hide real imports. Across features, the barrel is the only door. | NOTE callout from the lesson
- c2-5 | Draw the dependencies between features as arrows, imports and injections both. Lower layers know nothing of higher ones, and there are no cycles. | heading "Dependencies point one way"
- c2-5b | In an E S module cycle, top-level code can read an export before it is initialized, and which file fails depends on load order. | table "Kind / What happens", the "ES module cycle" row
- c2-5c | A D I cycle throws N G zero two zero zero when Angular resolves the inject calls. It needs the cycle in construction, not merely in imports. | same table, the "DI cycle" row
- c2-6 | The library app has a D I cycle waiting to happen. Holds asks loans whether a copy is on loan, and loans tells the next hold when a copy returns. | the lesson's first flow diagram, both arrows drawing on
- c2-7 | There are four ways out. Move the shared piece down, invert with an event, invert with a port, or merge two features that change for the same people. | table "Move / When it fits / What it costs", rows appearing one by one
- c2-7b | Each move has a price. With an event, the announcing code cannot tell you who reacts. A port adds an abstraction, and its wiring lives in providers. | same table, the "What it costs" column banded
- c2-8 | Here, loans only need to announce that a copy came back. If holds listens to a signal or an observable, the arrow from loans to holds disappears. | the lesson's second flow diagram, the single arrow as the accent
- c2-9 | A convention in people's heads is enforced by whoever reviews the P R. A fitness function is a cheap automated check that fails when the structure breaks a rule. | heading "Fitness functions"
- c2-9b | The line that matters most asserts the check found files. A check that silently finds nothing stays green forever. | the lesson's fitness test code, cut in whole, band on the `toBeGreaterThan(0)` line
- c2-9c | For a whole repository, use a ready-made tool: E S Lint boundary rules, the N X module boundary rule, dependency cruiser, or madge to list cycles. | the four tool names from the lesson as labels
- c2-10 | In a small app with one team, wait for a second team or a lazy boundary before adding barrels and boundary tests. Agree on a rule before automating it. | heading "When not to use them"; the list's first two items appearing one by one
- c2-10b | And do not invert every dependency for decoupling. Each inversion hides a call, so invert only arrows that really point the wrong way. | same list, the third item
- c2-11 | Boundary problems are cheap to fix in the P R that adds them, and expensive later. Ask whether the problem is new here, and how far it spreads. | the lesson's `features/members/index.ts` comment, the label `should-fix`
- c2-11b | When the rule is written down nowhere, the comment also asks for an automated check. | same comment, its last sentence banded
- c2-end | Three questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: changing structure without changing behaviour (15:00)

- c3-1 | Three o'clock. Every feature of the library app calls Legacy Catalog Client for anything about books. This afternoon is about reshaping code like that safely. | clock 15:00; desk app at rest; `LegacyCatalogClient` as a label
- c3-2 | Read the single responsibility principle with its author's later clarification: a module should have one reason to change, meaning one group of people asking for its changes. | heading "Reasons to change"
- c3-2b | Cohesion means a module's parts change together, for the same people. Coupling is how much a module must know about others to do its job. | the labels **cohesion** and **coupling**
- c3-3 | To find the seams, ask who requests changes to each part, and read the history. Files that always change together belong together. | heading "Finding where to cut"; the lesson's `git log` command
- c3-3b | Then look at state. Whoever writes a piece of state owns it, and code that writes state owned elsewhere is coupled to it, whatever the names say. | same heading, the third item banded
- c3-4 | Folders like services, components, models and utils say what kinds of files Angular has. They draw no boundary, and any file may import any other. | heading "Folders by kind, folders by feature"; `services`, `components`, `models` and `utils` as labels
- c3-4b | Name top folders after what the app does. That is screaming architecture: the structure shouts the domain, and every cross-feature import shows in its path. | the four labels replaced by `admin`, `loans` and `members`
- c3-4c | Folders by kind are fine in a small app with one team. Whatever the layout, a shared folder must know no feature. | `shared` as the accent
- c3-5 | Pin behaviour first, with characterization tests that record what callers see today, right or wrong. | heading "Refactoring without changing behaviour"
- c3-5b | The strangler fig grows new code beside the old. Callers move over one by one, and the old code goes when nothing calls it. | the lesson's strangler fig paragraph
- c3-5c | Watch its costs. For a while two paths do one job, so a fix may be needed in both. And a facade in front needs an end date. | the tradeoffs list, items one and two appearing one by one
- c3-5d | Characterization tests pin bugs too. Decide on purpose whether the migration keeps a bug and fixes it after, or fixes it during. | same list, item three
- c3-6 | An architecture decision record, or A D R, keeps the decision and the options that lost. Those options stop the debate reopening, until the reason they lost stops being true. | heading "Why write the decision down"; TIP callout from the lesson
- c3-7 | Do not refactor without characterization tests, and do not move everything in one change. Length is only a smoke alarm: split when a file has several reasons to change. | heading "When not to do it"; the list's items appearing one by one
- c3-8 | Weigh what the P R does to the cost. Creating a tangle earns should-fix or worse. Adding to an old one earns a comment and a ticket. | the lesson's severity paragraph, the label `should-fix`
- c3-8b | A P R that only sits next to an old problem gets a question or a nit at most. Asking it to fix that is scope creep. | the lesson's `shared/dates.ts` comment, the label `question` as the accent
- c3-end | Four questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, read its solution on the solutions branch. Study the tradeoffs, and for exercise three, compare the alternatives in its A D R with yours. | "After the lesson" card
- c3-afterb | Then write the comment you would leave, and check that it says what it costs if nobody fixes it. | same card, its last sentence banded
- c3-close | Six o'clock. The desk closes. | clock 18:00, desk lights down
