# Accessibility lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. Some of your dropdowns and dialogs worked with a keyboard and a screen reader. Some only looked right. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-1b | Accessibility review tells those two apart from the code, before an auditor or a customer does. | desk app, the member list at rest
- c0-2 | Each group meets a different failure first. Teams forget people with cognitive and learning disabilities, and several W C A G two point two criteria were written for them. | table "People / How they use the app / Failures they hit first" from the lesson, cut in whole, then the last row banded
- c0-3 | Every finding also gets a grade: blocking, should-fix, nit or question. If some group cannot finish the task at all, it blocks, however small the fix. | the four labels **blocking**, **should-fix**, **nit**, **question**, `blocking` as the accent
- c0-4 | Then ask who is slowed down, in which task, whether they can find a workaround, and which criterion and level. Audits and laws measure levels single A and double A. | the lesson's four numbered questions, appearing one by one
- c0-5 | W C A G two point two, from October twenty twenty-three, added nine success criteria and removed Parsing, which modern browsers made obsolete. | heading "WCAG 2.2"; table "Criterion / Level / What it asks" cut in whole
- c0-6 | Focus is never entirely hidden. Dragging also works with clicks or taps. Pointer targets are twenty-four pixels square, or spaced out. Help sits in the same place across pages. | same table, the rows banded one by one from `2.4.11` to `3.2.6`
- c0-7 | Within one process, nobody retypes what they already gave. Logging in needs no memory or transcription test, unless paste or a password manager gets people past it. | same table, the `3.3.7` row, then the `3.3.8` row
- c0-8 | In Angular, the element you focus is a signal from view Child. after Next Render replaces set Timeout, and in its phased form, a focus call is a write. | table "You wrote in v17 / You read in v22 / Why it matters" cut in whole, the `viewChild` row banded, then the two `afterNextRender` rows
- c0-9 | This app is zoneless, so a set Timeout no longer schedules a render by itself. And an if block adds and removes DOM, taking focus with it. | the lesson's two consequences, one after the other; `@if` as a label
- c0-10 | The C D K and Angular aria are not installed here, so the lesson teaches the rules by hand. | NOTE callout from the lesson
- c0-11 | The exercise specs find elements by role and name. That simplified model cannot judge contrast, target size, or how a real screen reader sounds. | `src/app/core/a11y-queries.ts` as a label
- c0-12 | Put the mouse away and tab through. Open the accessibility tree. Listen with VoiceOver or N V D A, screen curtain on. | TIP callout from the lesson, its first three items
- c0-13 | Automated tools like axe catch roughly a third of issues, so a clean report is no verdict. Zoom to four hundred percent, try a Contrast theme, emulate reduced motion. | same callout, its last three items; then the clock turns to 09:00 and the desk opens

## Chapter 1: roles, names and focus (09:00)

- c1-1 | Nine o'clock. Next to the DOM, the browser builds a second tree, and assistive technology reads that one. | clock 09:00; desk app search results with a pagination bar
- c1-2 | Each node has a role, a name and states, such as expanded or current. How it looks gives no role, so a clickable span styled as a link is text. | the words **role**, **name** and **states** as labels beside the desk app
- c1-3 | Here is the pagination bar on page two, built well, as a screen reader meets it. Every line of that tree comes from a choice in the template. | the lesson's `navigation "Search results pages"` tree, then its template code, cut in whole
- c1-4 | The nav element gives the landmark, and its label names it. Each link's text is its name, and aria current marks the page. | same code, band on `<nav aria-label="Search results pages">`, then on the `[attr.aria-current]` line
- c1-5 | A native element brings its role, keys and focus. Rebuilding a button means a role, a tab index, key handlers, and the details people forget. | heading "Native elements carry the contract"
- c1-6 | If activating it changes the U R L, it is a link. If it acts on this page, it is a button of type button. | table "If activating it... / Use / Because" cut in whole
- c1-7 | An aria role on the wrong element changes what is announced and leaves the behaviour as it was. | `role="button"` and `role="link"` as labels
- c1-8 | In a simplified order, the name comes from aria labelled by, aria label, the native label, text content, then title. A placeholder is only a fallback, never a label. | the lesson's five-item name list, items appearing one by one; `placeholder` as a label
- c1-9 | When visible text exists, let it be the name, because voice users say what they see. And each name should make sense read alone, in a list of links. | `2.5.3 Label in Name` as a label; then desk app with a screen reader's list of links over it, library links only
- c1-10 | A book cover that fills a link names it through its alt. A decorative image takes an empty alt, and an icon beside real text takes aria hidden. | the lesson's book cover code, band on `[alt]="book.title"`
- c1-11 | Keyboard users follow the focus indicator like a pointer. A sticky header can cover the focused element. Scroll padding top tells the browser to leave room. | heading "Focus must be visible, and on screen"; then the lesson's `scroll-padding-top` code, cut in whole
- c1-12 | For custom styles, use focus visible. In a diff, look for the default indicator removed with nothing in its place. | `:focus-visible` as a label
- c1-13 | Text needs at least four and a half to one contrast, or three to one when large. Input borders, meaningful icons and focus indicators need three to one. | heading "Contrast is an AA requirement"; `4.5:1` and `3:1` as labels
- c1-14 | Measure with a tool, then grade by impact. A library card login that blocks pasting stops password manager users at the door. It fails Accessible Authentication, so it blocks. | the lesson's first graded example; the label `blocking` as the accent
- c1-15 | Due dates in light grey fail contrast, but zoom helps some, and the reminder email has the date. Should-fix. | the lesson's second graded example; the label `should-fix`
- c1-16 | Whatever the grade, name the person and the task in your comment. | the lesson's two phrases, "a keyboard user cannot open a search result" as the accent
- c1-end | Five questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: widget contracts (11:00)

- c2-1 | Eleven o'clock. A widget that looks like a familiar control makes a promise about keys, focus and announcements. | clock 11:00; desk app book page at rest
- c2-2 | The Authoring Practices Guide writes each promise as a pattern: roles and states in the markup, the keys it handles, and where focus goes. | the lesson's three-part list, items appearing one by one
- c2-3 | A native element keeps that contract for you, and a maintained library keeps most of it. A hand-rolled widget keeps only what someone wrote. | the lesson's ladder table, cut in whole
- c2-4 | So ask why a custom widget is not one rung higher. A design that no native element can meet is a real reason to climb down. | same table, the "Native element" column banded
- c2-5 | The book page has three tabs. Each tab carries aria selected and aria controls, and the panel is labelled by its tab. | the lesson's `tablist "Book details"` tree
- c2-6 | Arrow keys move between tabs and wrap. Only the selected tab is reachable with Tab. With a roving tab index, arrows carry focus and tab index zero together. | the lesson's keys table, then its `onKeydown` code, cut in whole, band on the `focus()` line
- c2-7 | Moving to a tab shows its panel at once. When that is slow, such as a panel loading data, the guide recommends manual activation: Enter or Space shows it. | same code, band on the `this.selected.set(next)` line; the words "manual activation" as a label
- c2-8 | Other patterns keep real focus on one element and point at the active item with aria active descendant. Both work. Mixing them, or using neither, breaks. | `aria-activedescendant` as a label
- c2-9 | When a widget removes the focused element, or shows something the user must handle first, the code decides where focus goes. Otherwise it falls back to the body. | heading "Focus is something you move on purpose"
- c2-10 | Edit title swaps the title for an input and moves focus into it. Enter saves, Escape cancels, and either way focus goes back to the button. | the lesson's flow diagram, arrows drawing on
- c2-11 | The button sits inside an if block, so only the next render creates it. after Next Render waits for it. Called from a click handler, it needs an injector. | the lesson's `stopEditing` code, band on the `afterNextRender` line
- c2-12 | A modal dialog owes the whole contract: a role, aria modal, a name, focus inside, Tab kept in, Escape to close, and focus returned. | the lesson's modal paragraph, its contract sentence banded
- c2-13 | Show Modal on a native dialog covers most of that and restores focus on close. You still name it and pick where focus starts. A hand-rolled modal owes every line. | `<dialog>` and `showModal()` as labels
- c2-13b | With Show Modal, Tab can reach the browser's own toolbar. That is acceptable, so do not ask for a hand-rolled trap on top. | `showModal()` held; the browser's own toolbar above the page
- c2-13c | Before reviewing any modal, ask whether the step should block the page. An inline confirmation or an Undo message is often kinder. | desk app with an "Undo" message at the foot of the screen, staying until dismissed (no auto-dismiss)
- c2-14 | Aria described by points at extra text read after the name, like a format hint. Set aria invalid only once the value has been checked. | heading "Descriptions, validity and announcements"; then the lesson's ISBN code, band on `aria-describedby="isbn-hint"`
- c2-15 | A screen reader misses new text unless it sits in a live region. Status is polite, and is reliable only when it exists before its text changes. | `status` and `alert` as labels, `status` as the accent
- c2-15b | Alert is assertive and interrupts. Inserted together with its text, an alert is usually announced, which is part of why it exists. | same labels, `alert` as the accent
- c2-16 | A shelf display rearranged only by drag and drop leaves a keyboard-using librarian no way through their main task. It fails Dragging Movements, so it blocks. | the lesson's first graded example; the label `blocking` as the accent
- c2-17 | A Book reserved message that vanishes after three seconds misses magnifier users and slow readers. My loans shows the reservation, so should-fix, or ask why it vanishes. | the lesson's second graded example; the labels `should-fix` and `question`
- c2-end | Five questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: changes without a page load (14:00)

- c3-1 | Two o'clock. A full page load tells people what they are looking at and where they are, and nobody writes code for it. | clock 14:00; desk app at rest
- c3-2 | A single-page app replaces content without the browser's help. When the main content changes, ask what the browser did that the app now has to do. | heading "what is this, and where am I?"
- c3-3 | Titles are a router concern. The Title Strategy writes the document title after each navigation. Check which strategy the app uses, and what it does per route. | `TitleStrategy` as a label
- c3-4 | Not every change deserves a focus move. A Draft saved message should be heard without pulling the user out of the field they type in. | the lesson's `form "Write a review"` tree
- c3-5 | Pick the politeness by what the user loses if the message waits. Nothing, for a saved draft. Something real, for a failed payment. | same tree, the `status` node as the accent
- c3-6 | Announcing every keystroke, or every percent of an upload, makes the screen reader unusable. Ask what is worth hearing, and how often. | heading "Live regions, in depth"
- c3-7 | Information carried by colour needs a second channel. Overdue days marked only in red are lost to colour-blind, Contrast theme and screen reader users. | heading "Colour cannot be the only channel"; desk app due-date calendar, overdue days in red, overdue day cells tinted red; no status dots
- c3-8 | That channel can be text, a shape, a pattern or a position. Pick by the space, by what survives a Contrast theme, and by what a screen reader can read. | the lesson's four-item list, items appearing one by one
- c3-9 | An infinite scroll that keeps the only Contact a librarian link out of reach leaves people without help where they need it most. On the catalogue, that is blocking. | the lesson's first graded example; the label `blocking` as the accent
- c3-10 | A rotating banner with no pause is optional browsing, and the New arrivals page lists the same books. Should-fix, and name that page in the comment. | the lesson's second graded example; the label `should-fix`
- c3-11 | Screen readers differ here, so say what you checked by hand and what you could not. | desk app at rest
- c3-end | Four questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare the solution's severity table with yours before the fixes. Disagreeing about whether something blocks is the most useful disagreement. | "After the lesson" card
- c3-afterb | Then write the comment in two or three sentences, each with its label, naming who gets stuck and the task they cannot finish. | same card, its last sentence banded
- c3-close | Six o'clock. The desk closes. Tomorrow someone reaches it with only a keyboard. | clock 18:00, desk lights down
