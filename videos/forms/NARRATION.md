# Forms lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. You built a lot of forms in Angular seventeen, and most of that still works. | desk app, clock 08:55 in its header; title "What moved since Angular 17"; `FormGroup`, `formControlName`, `Validators.required` stacked beside it
- c0-2 | Reactive forms grew a few new tools, and Angular twenty-two ships a second system, Signal Forms, as stable API. Exercises one and two use reactive forms. Three uses Signal Forms. | two columns "Reactive forms" and "Signal Forms"; exercise 01 and 02 under the first, 03 under the second
- c0-3 | Every form serves three parties. The person filling it in must keep their input, know what is wrong and when, and never submit twice. | three columns: person, business, server; the person's three needs fill in
- c0-3b | The business needs a complete, valid payload. And the server must not be flooded with checks nobody needed. | the business and server columns fill in; all three stay up
- c0-4 | Input is usually lost on navigation: a librarian halfway through a loan form clicks another menu item. The dirty flag shows a change, and a Can Deactivate guard can ask. | desk app: loan form half filled, pointer on another menu item; `form.dirty` and a `CanDeactivate` route guard as labels
- c0-5 | Double submits are the other need. Signal Forms refuses a second submit while the first one runs. Reactive forms have nothing built in, so you track it yourself. | Signal Forms column: `submitting()` lit, a second `submit()` returning `false`; reactive forms column: an empty slot
- c0-6 | Typed forms are the normal case. Untyped Form Group is literally Form Group of any, kept for migration. In new code it switches the compiler off: anything you emit type-checks. | `UntypedFormGroup` = `FormGroup<any>`; then `form.value: any` and an emit line with a green check mark next to it
- c0-7 | The usual builder is the Non Nullable Form Builder. Its days control is a Form Control of number with no null, and reset returns to the starting values. | lesson's `NonNullableFormBuilder` code, band on the two comment lines
- c0-9 | Signal Forms is a different model. You own the data in a writable signal, and the form function builds a tree of fields around it. | table "Reactive forms / Signal Forms" from the lesson, rows appearing one by one
- c0-10 | Migration can happen gradually. form Field still binds to value accessor components, so libraries like Angular Material keep working, and a compat package mixes both models. | `[formField]` → `NG_VALUE_ACCESSOR`; `@angular/forms/signals/compat` with `compatForm` and `SignalFormControl`
- c0-11 | Reactive forms suit existing code, and forms built on value accessor components. Signal Forms suit new forms that start from a data model, especially with rules across fields. | the lesson's "When to choose which" list
- c0-11b | Template-driven forms are for trivial ones. Do not rewrite a working reactive form only to use signals. You will review both kinds for years. | the list's third item; a working reactive form tagged "keep"

## Chapter 1: what a form group contains, and what it reports (09:30)

- c1-1 | Nine thirty. A librarian renews a member's card with a queue behind them, trusting the form to pass on what they typed. | clock 09:30; card renewal form at the desk, members queueing beside it
- c1-2 | The server trusts it to pass on only valid data. When either trust is misplaced, the error surfaces days later in a member's record, and nobody remembers the input. | a member record dated days later, one row with a question mark; the renewal screen long closed
- c1-3 | A form group answers two questions with two accessors. value holds only the enabled controls, with every key optional. get Raw Value holds every control, typed as the full object. | accessor table from the lesson
- c1-4 | Disabling a control is one way to say: show this, but don't let the user change it. A disabled control also drops out of value, and out of validation. | lesson's `renewal` code, band on the two result comment lines
- c1-5 | With typed forms the compiler sees it, because value has a partial type. An untyped form compiles, then fails at runtime, in the backend, in someone else's log. | `{ cardNumber?: string; years?: number }`; a backend log line far from the desk
- c1-6 | Before you pick an accessor, ask whether the value belongs in the submission at all. If the server already knows it, sending it back adds nothing and invites tampering. | the card number sitting in the URL and the session; an arrow sending it back, struck through
- c1-7 | If it belongs, choose how to show it. A disabled control leaves value, validation and the tab order. A read-only input keeps all three and stays readable. | "disabled control vs readonly input" table from the lesson
- c1-8 | Each built-in validator checks one kind of value. Only required fails on empty. Min and max parse the value as a number, and min Length lets an empty value through. | validator table from the lesson, the "Checks" column banded
- c1-8b | Applied to the wrong kind of value, a validator returns null, which means valid, and nobody gets an error. | the table's "Note" column; a `null` result labelled "valid"
- c1-9 | Showing errors once a field is touched keeps an empty form from opening in red. The gap: a field nobody visited never becomes touched, so its error never shows. | interaction-state table; then the lesson's `renewal` tree, `years [touched: false, errors: min]` banded
- c1-10 | mark All As Touched treats every field as visited. A loan desk might call it in a review step. Call it on load, and the form opens red again. | lesson's `review()` code, band on `markAllAsTouched()`; then an empty form opening with every field in red
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: custom controls, async validators, and rules across controls (12:00)

- c2-1 | Twelve o'clock. The returns desk scans thirty I S B N codes a minute, and each check that a book exists and is not lost costs a catalog call. | clock 12:00; returns desk, ISBN rows arriving; one catalog-service call per row
- c2-2 | A custom control is a component that registers as N G Value Accessor. The form talks to it through four methods, and the conversation goes both ways. | the lesson's four-arrow flow diagram, drawing on
- c2-3 | write Value is the form telling your component what to show. The two register methods hand you functions to store and call when the user changes the value or leaves. | flow diagram: `writeValue` arrow first, then the `onChange` and `onTouched` arrows
- c2-4 | set Disabled State is optional in the interface, which is exactly why it gets forgotten. Without it, disabling the control has no effect on your component. | flow diagram: the `setDisabledState` arrow is the accent
- c2-5 | Take the star rating for book reviews. Its rate method updates the display and tells the form. Skip telling the form, and screen and model disagree without any warning. | lesson's `StarRating` code, band on `rate`
- c2-6 | An async validator runs whenever the value changes, once the sync validators pass. When a new value arrives mid-check, Angular unsubscribes from the old check. | marbles: isbn, check(a), check(b), check(c)
- c2-7 | That is cleanup on the client. A request that already left cannot be recalled, so the server still received a and b. | same marbles, the `check(a)` and `check(b)` rows banded
- c2-8 | The observable must also complete. Angular joins a control's async validators with fork Join, so a stream that never completes leaves the control pending forever. | `forkJoin` waiting on a source with no `|`; a status label stuck on `PENDING`
- c2-9 | When is a check worth paying for? Often, when the librarian leaves the field. With update On blur, the value and every validator wait. Fewer calls, later feedback. | lesson's `updateOn: 'blur'` code, that line banded
- c2-10 | While an async validator runs, the status is pending, a third state. In that window, valid and invalid are both false. | status marbles from the lesson, the `p` frames banded
- c2-10b | So a guard before submitting picks one getter, and the two behave differently while the form is checking. Which does yours test, and is that the rule you mean? | the `valid` and `invalid` rows side by side, a "?" over the pending window
- c2-11 | A validator sees only its own control. A rule about two dates, or every line in a list, goes on the group or array that holds them all. | lesson's `loan` tree, the `dates` and `books` nodes hot
- c2-11b | Type what it reads, so the body uses named fields, not guesses. | lesson's `returnAfterPickup` code, band on the typed `getRawValue()` line
- c2-11c | The error lives on the group and does not turn the due input red, so place the message deliberately. | `loan.controls.dates.hasError('dueBeforePickup')` from the lesson
- c2-end | Five questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: Signal Forms (15:00)

- c3-1 | Three o'clock. A member signs up online. Children under sixteen need a guardian, family plans are not offered to children, and the rules change as they type their age. | clock 15:00; an online sign-up page beside the desk app, with name, age, guardian and plan
- c3-2 | You start from data. The model is your own signal, and the form never copies it. Typing writes to the model, and setting the model updates the fields. | lesson's `Membership` and `form()` code, band on the `model` line
- c3-3 | Call any node of the field tree and you get its state, a bag of signals. One rule carries over from chapter two: valid is not the opposite of invalid. | FieldState table from the lesson, the `valid()` / `invalid()` / `pending()` row banded
- c3-4 | errors holds the current errors from the moment the form exists, whether or not anyone looked. | lesson's `[formField]` template snippet, band on the `@for` over `errors()`
- c3-4b | When to show them is your call, with the same touched and dirty signals as chapter one. | the FieldState table, the `touched()` / `dirty()` row banded
- c3-5 | Role alert on every message makes a screen reader interrupt while the user types. Keep it for a summary after submitting, and link field messages with aria described by. | same snippet, band on `role="alert"`; `aria-describedby` and `aria-invalid` as labels
- c3-6 | The whole API rests on one rule. The schema function runs once, when the form is created. It receives paths, not values, and registers rules on them. | lesson's flow diagram, the first two arrows drawing on
- c3-7 | The functions you pass to those rules receive a field context, and run again whenever a signal they read changes. | flow diagram, the last two arrows drawing on
- c3-8 | So whatever the schema body reads is a snapshot of that first moment. Read through the context, with value, value Of or state Of, and it stays current. | `value()`, `valueOf(path.other)`, `stateOf(path.other)` from the lesson
- c3-9 | Take a day limit that depends on the plan. Read the model in the schema body, and it type-checks but freezes the plan the member had when the page opened. | lesson's `loanModel` code, band on the `// read once` line, then on `// read on every run`
- c3-10 | Most built-in rules accept a when condition, and rules like hidden and disabled exist to express conditions. | lesson's conditional rules code
- c3-11 | The hidden rule changes state, not the DOM. The form's valid, touched and dirty skip a hidden field, but the template renders it until an if block wraps it. | IMPORTANT callout from the lesson
- c3-12 | A plain submit handler on the form element runs whether the form is valid or not, unless you check. Signal Forms has a submission flow that does the checking. | `(submit)="save($event)"`; then the lesson's `submission` options code
- c3-13 | Submit marks every field touched and runs the action only if the check passes. While it runs, submitting is true, and a second submit is refused. | the lesson's four numbered steps, appearing one by one
- c3-14 | First warning. form Root always prevents the native submit, but it calls submit only when the form has submission options. Without them, the submit vanishes silently. | first WARNING callout from the lesson
- c3-15 | Second warning. The default check is not invalid, so a pending async validator does not block the action. | second WARNING callout; `ignoreValidators: 'pending'` banded
- c3-15b | Set ignore Validators to none, and the action needs valid. It does not wait: while a check is pending, submit calls on Invalid instead, so tell the user. | same callout, band moves to `ignoreValidators: 'none'`; `onInvalid` from the lesson's `submission` code
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-after | After each exercise, compare your fix with its solution, and write the two-sentence comment you would leave on the pull request. If you cannot, reread the chapter. | "After the lesson" card
- c3-close | Six o'clock. The desk closes. Tomorrow the same forms open again. | clock 18:00, desk lights down
