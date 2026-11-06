# Directives lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. A directive adds behaviour to an element someone else owns, like a cover image in the catalog. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; a catalog row of book covers, one `<img>` outlined as the consumer's element
- c0-2 | In seventeen, the bugs you caught in review were mostly about lifetime. Something the directive started outlived it, or something it showed stopped following its inputs. | `@Input()`, `@HostListener`, `ngOnInit` stacked beside the catalog row, then replaced by signal inputs, `host`, `DestroyRef`, render hooks and `effect`
- c0-3 | Try the cheaper answers first. Plain HTML and CSS cover a lot: a class binding, the title attribute, popover, anchor positioning, and the native dialog. | "Before you write a directive" list, the plain HTML and CSS item banded
- c0-3b | If you build DOM by hand inside a directive, you probably wanted a component. For overlays and focus trapping, which are hard to get right, try the Angular C D K. | same list, the band moves to the component item, then to the CDK item
- c0-4 | Write your own when the behaviour is small, specific to your domain, and attached to elements you do not control. | the three cheaper answers greyed; the section's last sentence underlined
- c0-5 | Inputs, outputs and models are functions now, and you read a signal input by calling it. Angular sets inputs after the constructor. | `ShelfLabel` code, the `code` line banded
- c0-6 | In the constructor, an optional input returns its default, and a required one throws N G zero nine five zero. | same code, the band on `input.required` with `NG0950` beside it
- c0-6b | Read inputs in a template, host binding, computed or effect, which follow every change. From N G on Init onward, a one-off read gets that moment's value. | the paragraph below the code, "reactive contexts" marked
- c0-7 | The Angular guide recommends the host property over Host Listener and Host Binding. Angular adds its listeners when it creates the directive, and removes them when it destroys it. | `appBookCard` code, the whole `host` object banded as one block
- c0-8 | Inject Destroy Ref and register cleanup right next to the code that starts something, so a reviewer sees the start and the stop together. | `inject(DestroyRef).onDestroy(fn)` on one line
- c0-9 | after Next Render runs once, after the next render, in the browser only, for code that needs the element or browser APIs. | "Render hooks and effects" list, first item; rename `afterRender` → `afterEveryRender`
- c0-9b | An effect re-runs whenever a signal it read changes. | same list, the band moves to the `effect(fn)` item
- c0-10 | Zoneless is the default since Angular twenty-one. A directive that writes to the native element in its own code is doing work Angular does not track. | "Zoneless, again" paragraph, the `nativeElement` sentence marked
- c0-10b | That was true in seventeen too. Zone never re-ran a write you made once in N G on Init. | same paragraph, the band moves to the Zone sentence

## Chapter 1: what a directive starts, it stops (09:30)

- c1-1 | Nine thirty. The catalog page shows rows of book covers, and each cover loads when it scrolls into view. | clock 09:30; catalog page, covers above the fold loaded, the ones below still grey
- c1-2 | A directive lives exactly as long as its host element is in a view. When the view goes, Angular destroys it, with its listeners and bindings. | the lesson's tree diagram, `CatalogPage`, `img` and `LazyCover` nodes lit
- c1-3 | Angular knows nothing about what the directive created through browser APIs. The browser keeps an observer alive while it observes, and the document keeps every node it contains. | same tree, the `IntersectionObserver` and `document.body` branches outlined, apart from `CatalogPage`
- c1-3b | Each of those needs explicit cleanup from the directive that made it. | same tree, the `div [appended by hand, outside any view]` node is the accent
- c1-4 | Read the lazy cover directive for its pairs. The observer starts in after Next Render, because it is a browser API and the element must exist. | `LazyCover` code, the `afterNextRender` block banded
- c1-4b | Disconnect is the handle that stops it, registered in the same constructor. | same code, the band moves to the `onDestroy` line
- c1-5 | The source follows the input and the visibility through a host binding, so a new U R L needs no extra code. | same code, the band moves to the `host` line and the `src` computed
- c1-6 | An image with loading set to lazy does this natively in most cases. The directive earns its place only when you need the visibility signal elsewhere. | `<img loading="lazy">` beside the `LazyCover` selector
- c1-7 | In a template, interpolation is escaped and inner H T M L is sanitized. Once you write to an element yourself, neither protection applies. | `{{ title }}` tagged "escaped", `[innerHTML]` tagged "sanitized"; a bare `el` below with no tag
- c1-8 | Given a title with a hidden S V G, text Content shows the characters. Inner H T M L parses them, creates the S V G, and runs its handler. | the lesson's table with `'Dune <svg onload="steal(document.cookie)">'`, the `innerHTML` row is the accent
- c1-8b | When code builds DOM by hand from data, the default is text Content. Markup goes through a template or a reviewed sanitizer decision. | same table, the `textContent` row banded
- c1-9 | An attribute written once in N G on Init keeps its first value when the shelf code changes, because nothing reactive read it. | the lesson's `ngOnInit` `setAttribute` snippet, its comment banded
- c1-9b | In a host binding, Angular records that the expression read the shelf code, and updates the attribute when it changes. | the lesson's `'[attr.aria-label]'` host expression
- c1-10 | For floating text, try title, popover or anchor positioning, then the C D K connected overlay. Hand-built nodes in the document body cost the most. | "When you would not write this" list, first item
- c1-11 | For screen readers, use Live Announcer, or one live region already in the page. A region created and filled in the same tick is often not announced. | same list, second item
- c1-11b | And if you touch the document, inject the Document token instead of the global, so the code still works under server rendering. | same list, `inject(DOCUMENT)` banded
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: structural directives own a view container (12:00)

- c2-1 | Twelve o'clock. A book page lists each physical copy as its own row. Most templates like it need no structural directive since if and for blocks arrived. | clock 12:00; a book page in the desk app with rows "Copy 1", "Copy 2", "Copy 3"; `*ngIf`, `*ngFor` struck through beside `@if`, `@for`
- c2-2 | A custom one earns its place when the same rule repeats across many templates, or when it computes variables the template uses. | two cases as two short lines
- c2-3 | It has costs. Readers must look up what the star does, and type narrowing works only if you write template guards. | the star in `*appCopies` circled, with a question mark
- c2-4 | The star is sugar. The expression before the first semicolon binds to the input that carries the selector's name. | the lesson's two `appCopies` templates, `book.copies` linked to `[appCopies]`
- c2-4b | Each key after it adds a capitalised suffix, so the key max binds to app Copies Max. Each let reads a variable from the view's context. | same pair, `max 5` linked to `[appCopiesMax]="5"`, then `let n = index` to `let-n="index"`
- c2-5 | The directive injects Template Ref, which is what to stamp, and View Container Ref, which is where to stamp it. | the lesson's tree under `ng-template [appCopies]`, the two embedded views below
- c2-6 | The container is a list. Create Embedded View appends, clear destroys every view, remove destroys one, and length counts what is there now. | the lesson's container table, rows lit in turn
- c2-6b | The container does what each call says and nothing more. Whatever the directive wants on screen, it reaches through these calls. | same table, all four rows lit
- c2-7 | N G Template Context Guard types the let variables, and a template guard narrows types the way if does. Without them, let variables are any and nothing narrows. | `Copies` code, `ngTemplateContextGuard` banded; the name `ngTemplateGuard_appCopies` set beside it
- c2-8 | Turning state into views is imperative code, and imperative code that must follow signals belongs in an effect. Here one keeps the page title in step with the open book. | the lesson's page-title `effect` code
- c2-9 | untracked runs a function without recording what it reads. The reads that should trigger a re-run go outside it, and the imperative work inside. | same code, band on the `const title` line, then on the `untracked` block
- c2-9b | Otherwise any signal the imperative part happens to read becomes a trigger, and the effect re-runs for reasons nobody intended. | same code, `this.library.name()` marked inside the block
- c2-10 | For a condition in one template, write an if block. Hiding UI by role is a convenience for the user, never authorization. | "When you would not write this" list, both items
- c2-10b | The server must reject the request no matter what the template showed. | same list, the second item banded
- c2-end | Before exercise two, ask these. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: composing directives, effects that listen, and focus (15:00)

- c3-1 | Three o'clock. A design-system team builds the shelf panel out of small behaviours. The teams that use it get whatever the composition exposes, including inputs they never asked for. | clock 15:00; a shelf panel in the desk app, open, with a drag handle and a keyboard focus ring on its first control
- c3-2 | With host Directives, a component applies standalone directives to its own host. Only what you list is visible. An entry can rename, inner name colon public name. | `ShelfPanel` code, the `hostDirectives` array banded; then the `'locked: dragLocked'` entry is the accent, beside the lesson's tree
- c3-3 | Treat that list as public API, because it is one. For each name, ask which directives receive it when you bind it. | the lesson's `<app-shelf-panel [open]=… [dragLocked]=… (moved)=…>` line
- c3-4 | Host directives are always created, so none can be conditional. They are created before the host, run their hooks first, and their selectors are ignored. | the lesson's costs list, first three items lit in turn
- c3-5 | The alternatives cost too. A base class turns fragile once two subclasses need different things. A wrapper component adds an element that can break layout and the accessibility tree. | the "alternatives" paragraph, its two sentences marked in turn
- c3-6 | An effect starts from scratch on every run. Whatever one run sets up, the on Cleanup callback takes down, before the next run and on destroy. | the lesson's colour-scheme `effect` code, `onCleanup` line banded
- c3-7 | Add Event Listener drops a duplicate only for the same function object, and a new arrow function is a new object. Remove Event Listener needs that same object back. | same code, the lesson's `apply` marked where it is declared, then in `query.addEventListener` and `query.removeEventListener`
- c3-8 | Focus is state the user owns. A panel that takes focus gives it back when it closes, to the element the user was on. | the lesson's flow diagram, open button to panel, then the arrow back
- c3-9 | A panel that keeps focus inside works on the elements present at the key press. A list of elements taken earlier goes stale once content changes. | the lesson's "Focus is state the user owns" paragraph, its last sentence marked
- c3-10 | If you write focus code by hand, the selector needs more than buttons and inputs: select, text area, content editable, and summary inside details. | the lesson's sentence listing `select`, `textarea`, `[contenteditable]` and `details > summary`
- c3-10b | An element you remembered may have left the page. Check is Connected before you focus it. | `isConnected` and `focus()` from the lesson's text
- c3-11 | For a modal, the native dialog with show Modal traps focus, makes the rest of the page inert, and restores focus on close. | "When you would not write this" list, the `showModal()` item
- c3-11b | To trap focus in a non-modal panel, the C D K focus trap handles the edge cases. | same list, the `cdkTrapFocus` item
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare your fix with its solution, and write the two-sentence comment you would leave on the pull request. If you cannot without looking, reread the chapter. | "After the lesson" card
- c3-close | Six o'clock. The desk closes. Tomorrow the same panels open again. | clock 18:00, desk lights down
