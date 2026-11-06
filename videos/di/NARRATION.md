# DI lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. You already moved to inject, standalone provide functions and route providers, and those mechanics still hold. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; `inject()`, `provideX()` and route `providers` as labels beside it
- c0-1b | A staff level review adds a habit. For every provider, ask how many instances exist, who can see each one, and how long it lives. | three labels from the lesson's opening paragraph: "how many instances", "who can see each one", "how long it lives"
- c0-1c | Most D I bugs are a wrong answer to one of those questions, and they compile without a warning. | the three labels stay; a green build badge in the desk app header
- c0-2 | You also grade what you find. Grade a provider defect by who pays for it, and when. A crash on first use is loud, and it blocks. | heading "Grading DI findings"; the four labels **blocking**, **should-fix**, **nit**, **question**
- c0-2b | A silently wrong instance is worse than a crash, because nobody notices. It blocks as soon as users can see the consequence. | the "Grading DI findings" list, its second item
- c0-2c | An A P I that works but is easy to misuse is usually should fix. A provider whose intent you cannot tell is a question. | same list, its last two items
- c0-3 | Angular twenty-two adds an at Service decorator. With no options it is provided in root: one instance for the app, created on first use. | table "Form / Meaning" from the lesson, the `@Service()` row
- c0-3b | With auto Provided false, it exists only where a providers array lists it, and asking elsewhere throws a Null Injector Error. | same table, the `autoProvided: false` row
- c0-4 | It cannot take constructor parameters or carry another Angular decorator. at Injectable with provided In root still works, and the same scope questions apply to both. | `@Service()` beside `@Injectable({ providedIn: 'root' })`
- c0-5 | The initializer tokens are deprecated. Use provide App Initializer and provide Environment Initializer, whose callbacks run in an injection context, so inject works inside them. | table "v17 / v22" from the lesson, rows appearing one by one
- c0-6 | make Environment Providers returns providers for bootstrap, the app config or a route. A component's providers array rejects them at compile time. | the "What stayed" list, the `makeEnvironmentProviders` item
- c0-7 | run In Injection Context serves code that must call inject later, and create Environment Injector builds an injector by hand. Then the desk opens. | same list, the next two items; the clock turns to 09:00

## Chapter 1: scope, lifetime and injection context (09:00)

- c1-1 | Nine o'clock. Members queue at the desk and the first screens load. Before adding a provider, ask whether you need an injectable at all. | clock 09:00; desk app member list
- c1-2 | D I separates creating a thing from using it, controls who shares it and for how long, and lets a test or a consumer replace it. | heading "Do you need an injectable at all?"; `{ provide: Catalogue, useValue: fake }` as a label
- c1-3 | When none of that is needed, use a plain function, or a signal in the component. A token earns its place only when a replacement really exists. | table "What you have / Simplest home / When to move up", rows appearing one by one
- c1-4 | inject looks the same whether it returns one object for the app or a fresh one per component. Get that number wrong, and it still compiles. | `inject(X)` alone on the code ground
- c1-5 | Every inject call is a question asked at a point in a tree. Angular starts at the nearest injector and climbs until one has a provider for the token. | the lesson's injector tree diagram, nodes drawing on top down
- c1-5b | Environment injectors are the root and one per route with providers. Node injectors belong to each component or directive that lists providers. | same tree, "Root environment injector" as the accent, then the first `ReviewThread` node
- c1-6 | The climb only goes up, so siblings never see each other's providers. Each review thread provides its context, and the reply box gets the nearest thread's. | the lesson's `ReviewThread` and `ReplyBox` code, band on `inject(ThreadContext)`
- c1-7 | View providers stay invisible to content projected in from outside, so that content keeps resolving from higher up. | table "Array / Visible to / Not visible to"
- c1-8 | The options of inject set the climb. self looks only here, skip Self starts at the parent, host stops at the host, and optional returns null. | table "Option / Effect / Typical use", rows appearing one by one
- c1-9 | Caches and configuration live in root. One widget's state lives in its component's providers. Scoping too narrowly is a bug as well. | table "Kind of state / Lifetime it needs / Where it is provided", rows appearing one by one
- c1-9b | Put Cover Cache in each book card's providers, and every card downloads covers another card already had. | desk app page of book cards, each with its own `CoverCache` label
- c1-10 | Component services die with their component and can clean up through Destroy Ref. A timer a root service opens runs for the whole session, unless it stops itself. | `inject(DestroyRef).onDestroy(() => …)` as a label
- c1-11 | inject works only in an injection context: field initializers, constructors, provider factories, and callbacks Angular runs on purpose, like functional guards and interceptors. | the lesson's injection context list, items appearing one by one
- c1-11b | Event handlers, subscribe callbacks, timers and code after an await all run later. inject there throws N G zero two zero three. | the paragraph after the list; `NG0203` as a label
- c1-12 | The trap often hides in a helper. inject Book Id is fine in a field, and throws after an await. Anything called inject X belongs in a field. | the lesson's `injectBookId` code, band on the `bookId` field line, then on the `const id` line
- c1-12b | run In Injection Context is the escape hatch. When you see it, ask whether a field would have done. | same code, band on `assertInInjectionContext(injectBookId)`
- c1-13 | Grading. Cover Cache per card shows nothing wrong, only duplicate downloads: should fix. A root timer nobody stops is a question first, then should fix once its cost is known. | "How bad is it?" list, both items
- c1-end | Four questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: provider recipes and feature APIs (11:30)

- c2-1 | Eleven thirty. Another team wants the library's catalogue in their own app. They know only its public function and its documentation. | clock 11:30; desk app catalogue screen, a second app window beside it
- c2-2 | They must be able to configure it, and replace its parts in a test, without reading your source. | `provideCatalogue()` as the only label
- c2-3 | A provider is a sentence: when someone asks for this token, give them that. The recipe decides what that is. | table "Recipe / Gives / Instances", header row only
- c2-3b | use Class builds a new instance, even if the class is also provided elsewhere. use Value gives the value. use Existing is an alias with no instance of its own. | same table, rows appearing one by one
- c2-4 | Try it on the lesson's notifier. Features inject Notifier, and the admin console injects Socket Notifier. How many sockets exist? When would two be right? | the lesson's `SocketNotifier` providers code, cut in whole, no line banded
- c2-5 | Provide a token twice in one injector and the last registration wins. That is how an app overrides a library's default. | heading "Replace or collect"
- c2-6 | multi true means collect. The global search gathers sources from features that do not know each other, and the array follows registration order. | the lesson's `SEARCH_SOURCES` code, band on the first `multi: true`
- c2-7 | Mixing multi and regular providers for one token throws, but only in development mode. In production, a later regular provider silently wins, and a later multi one crashes. | WARNING callout from the lesson
- c2-8 | A required Injection Token throws when nobody provides it: for a value with no sensible default, failing fast is the feature. A factory token works out of the box. | table "Shape / Nobody provides it / Good for", rows appearing one by one
- c2-8b | With optional true, the consumer gets null instead, and handles it. | same table, the `inject(SOME_TOKEN, { optional: true })` row
- c2-9 | A feature's public A P I is usually a typed provide function returning Environment Providers, which TypeScript rejects in a component's providers. | the lesson's `provideCatalogue` code, band on `makeEnvironmentProviders([`
- c2-9b | Read it from the consumer's side. Everything the feature injects has to come from somewhere the consumer will actually have. | same code, cut in whole
- c2-10 | Grading. A reminders token that defaults to disabled crashes nothing, and no member ever gets a reminder. Blocking if reminders were the point. | "How bad is it?" list, its first item
- c2-10b | A provide Catalogue that also adds an app wide interceptor changes every consumer's requests. Should fix: put it behind an option. | same list, its second item
- c2-end | Four questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: injectors in a routed, lazy application (15:00)

- c3-1 | Three o'clock. A feature moves into a lazy loaded route. That move should change when its code loads, and nothing else. | clock 15:00; desk app with an annotation tag "lazy bundle" pointing at one area, not part of the app UI
- c3-2 | A route with providers gets its own environment injector, created the first time the route matches, even if a guard then rejects. | the lesson's route tree diagram, the "members route environment injector" node as the accent
- c3-2b | Components climb their node injectors, then the route's injector, then its parents up to root. | same tree, the climb from `LoansPage` to "Root environment injector"
- c3-3 | By default that injector lives for the rest of the app, like root. Route scope decides who can see an instance. | same tree, the route node held as the accent
- c3-3b | To drop it on exit, opt in through with Auto Cleanup Injectors, stable in twenty two point two. A custom reuse strategy must also allow it in should Destroy Injector. | `provideRouter(routes, withAutoCleanupInjectors())` and `shouldDestroyInjector` as labels
- c3-4 | A class in root and listed again lower down exists twice. A lend a copy dialog lists Loan Basket and adds a book. Which basket does the opening page see? | desk app page with a "Lend a copy" dialog over it, `LoanBasket` as a label in the dialog and in root
- c3-4b | When a second instance is the intent, give the lower provider a one line comment, because the next reader cannot tell intent from accident. | same dialog, the lesson's two questions beside it
- c3-5 | provide H T T P Client in a child injector configures a new, independent client, with its own interceptor chain and backend. | heading "`HttpClient` below the root"
- c3-5b | An upload area for a separate media server may want exactly that. Other areas should add to the app's H T T P setup instead. | an upload panel in the desk app
- c3-5c | The package has a way to chain a child client to its parent. Look through its H T T P Feature functions. | the package name `@angular/common/http` alone, no function named
- c3-6 | A plugin loaded at runtime can get its own injector from create Environment Injector. Whoever creates it must destroy it. | `createEnvironmentInjector(providers, parentInjector)` and `injector.destroy()` as labels
- c3-7 | Grading. A lazy area's title strategy drops the app's title suffix: should fix. An undestroyed plugin injector is a question at one reload a day, blocking at one per navigation. | "How bad is it?" list, both items
- c3-end | Four questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare the solution's severity table with yours, then its fix. | "After the lesson" card
- c3-afterb | Write the comment in a few labelled sentences. State the impact in instances and data, and say what you checked and found fine. | "After the lesson" card, its last sentence banded
- c3-close | Six o'clock. The desk closes. | clock 18:00, desk lights down
