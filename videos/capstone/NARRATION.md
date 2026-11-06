# Capstone lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: reflexes to recalibrate since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. Every other exercise hands you a ticket. The capstone hands you a pull request and a reviewer's seat. | desk app, clock 08:55 in its header; title "Capstone: a lesson before the exercises"
- c0-1b | It comes with a description written by its author and about four hundred lines of code. Nobody tells you what is wrong, or how much. | review editor in the desk app: a description panel in neutral placeholder text, "about 400 lines of code" as a label
- c0-1c | Nobody says which parts that look wrong are fine, either. You already have the Angular pieces from the other tracks. | same editor, the description panel held
- c0-2 | What turns those pieces into a review is the order you read in, how you weigh each finding, and how you write it down for the author. | three labels from the lesson's opening: "the order you read in", "what each finding is worth", "how you write it down"
- c0-3 | Read chapters zero and one, then do the exercise with a timer. The dojo suggests forty-five minutes. | "How to use the lesson" list, the first item; the desk clock with a 45-minute timer beside it
- c0-3b | Write your whole review before you open the solutions branch. The comparison only teaches you something if your review was finished first. | same list, the second item; `REVIEW.md` as a label
- c0-4 | Habits from older codebases now misfire in both directions, and false alarms cost you credibility with the author. | heading "Chapter 0: reflexes to recalibrate since Angular 17"
- c0-5 | Some habits no longer point at a finding. Standalone defaults to true, so a missing standalone flag gets no comment. | table "Habit from pre-v17 code / In 22.2.2" cut in whole, the `standalone: true` row banded
- c0-5b | On Push is the default too. An explicit Eager strategy is the thing to ask about, and Default is a deprecated alias of Eager. | same table, the `ChangeDetectionStrategy.OnPush` row banded
- c0-6 | Not every stream needs take Until. A single H T T P response completes by itself, so it has nothing to leak. | same table, the `takeUntil(this.destroy$)` row banded
- c0-6b | Timers, store selections and router events never complete, so each needs an owner that ends it. Ask whether it completes. | same row, "does this complete?" as the accent
- c0-7 | The inject function is the normal form now, and classes decorated with Service cannot use constructor injection at all. | same table, the "Inject through the constructor" row banded
- c0-7b | N G If and N G For Of are deprecated since Angular twenty. Old code the pull request does not touch gets no comment. | same table, the `*ngIf` and `*ngFor` row banded
- c0-7c | New code that uses them is should-fix, because the team pays for it at the next upgrade. | same row, `should-fix` as a label
- c0-8 | Some patterns that used to work are findings now. The app is zoneless: a plain field set in subscribe and read by the template has nothing telling Angular to render. | table "Pattern / Why it fails now" cut in whole, the first row banded
- c0-8b | On Push and signals compare by reference. Mutate an object or an array in place, and the same reference means no update. | same table, the second row banded
- c0-8c | And a resource's value throws in the error state, so check error or has Value before you read it. | same table, the third row banded
- c0-9 | Here you only need to recognise these quickly, and keep the first table out of your findings. Then the desk opens. | both tables side by side, the first one dimmed; the clock turns to 09:00

## Chapter 1: reviewing a pull request (09:00)

- c1-1 | Nine o'clock. A review can fail in two opposite ways. The fast one reads top to bottom and runs out of attention before the part that mattered. | clock 09:00; desk app review editor with a long diff of neutral placeholder lines
- c1-1b | So a security hole or a data-loss bug gets through. The thorough one leaves forty comments of equal weight, and the author cannot tell which three must be fixed. | same editor, a column of identical comment markers
- c1-2 | A review protects the people who use the feature, and the team's ability to keep changing the code. Anything that protects neither is a preference. | two labels: "the people who use the feature", "the team's ability to keep changing the code"; then "a preference" as the accent
- c1-3 | Read in the order that finds the expensive things first. Start with the ticket. What problem must this solve, and for whom? | the lesson's flow diagram, the `Ticket` box drawing on, then its arrow to `Description`
- c1-3b | Does the pull request solve that, and only that? Tidying up unrelated files makes it harder to review and to revert. | same flow held, `Ticket` as the accent
- c1-3c | Check the size too. Past about four hundred changed lines, attention drops, and asking for a split is a fair first comment. | same flow held; "about 400 changed lines" as a label
- c1-4 | Read the description as evidence. Each sentence with because, or I had to, points at the code most worth checking. | same flow, the `Claims to check` box drawing on, its edge label `every "because" and every "I had to"` as the accent
- c1-4b | Ask whether each reason is true, and whether the change answers it. Sometimes the reason holds and the fix is wrong, or the reason misreads the framework. | same flow held
- c1-4c | The How I tested section is a claim too, and a missing line is a path nobody tried. | review editor, a description panel of neutral placeholder lines; "How I tested" as a bare label, with no section content under it
- c1-5 | Then follow the main user action, like a member placing a hold, through every file it touches and every place that shows its result. | the flow again, the `One user action end to end` box drawing on
- c1-5b | Reading files in alphabetical order spreads your attention evenly. Following an action shows you the seams, and most bugs live in the seams. | review editor file list with neutral placeholder file names, then one path through several of them marked
- c1-6 | Then follow data that comes from somebody else: anything a user typed, anything from a U R L, anything another member created. Where does it end up? | the flow, the `Data from other people` box drawing on
- c1-6b | A template, a U R L, inner H T M L, a log line, a third party? This security pass is cheap for what it finds. | the lesson's sinks as labels: template interpolation, URL, `innerHTML`, log line, request to a third party
- c1-7 | Then the rubric pass, in the staff rubric's order: correctness, security, architecture and maintainability, performance, tests, style. Plus accessibility: can a keyboard or screen reader user finish the action? | the flow, the `Rubric pass` box drawing on; the rubric words as labels, then "accessibility"
- c1-7b | The order is a priority list, so keep style comments from using up the time the correctness pass needed. | same labels, "correctness" as the accent
- c1-8 | Finish with the unhappy paths. Most code is written for when everything works, and most production bugs live in the other cases. | the flow, the `Unhappy paths` box drawing on
- c1-8b | Go back to the action you traced and ask what happens when each step goes badly. | same box, its label `failure, slowness, repetition` as the accent
- c1-9 | Triage gives every finding one of four labels. Blocking is wrong behaviour, a security hole, data loss, or something expensive to undo. | table "Label / Meaning / Merge?" cut in whole, the `blocking` row banded
- c1-9b | Should-fix is a real cost with a clear fix, fixed in this pull request or a linked ticket. A nit is taste or small polish. | same table, the `should-fix` row banded, then the `nit` row
- c1-9c | A question is for when you cannot tell, and the merge depends on the answer. | same table, the `question` row banded
- c1-10 | Three habits keep the labels honest. Decide by impact. Naming the broken rule invites a debate about the rule. Stating the concrete impact ends it. | heading "Decide by impact, not by the rule that was broken."
- c1-10b | If you cannot state the impact, it is probably not blocking. If you cannot state it at all, it may be a question. | same heading; `question` as a label
- c1-11 | Ask a question when you are missing information, and mean it. Asking when you already know the answer is a disguised demand, so state the finding instead. | review editor, an inline comment in neutral placeholder text carrying the `question` label
- c1-12 | Keep nits few, since each costs attention your blocking comments need. Three per review is plenty. | review editor, three comments in neutral placeholder text carrying the `nit` label
- c1-13 | Some code looks like a classic mistake and is the correct form. Flag it, and you lose credibility for the comments that matter. | heading "Looks wrong, but is fine"
- c1-13b | So check before you comment. If it is fine, leave nothing, or one line saying so when another reader might stumble too. | review editor, the lesson's "Looked twice at `HoldRules`" comment, verbatim, ending "Fine as is."
- c1-13c | Fine applies to the line you checked. A correct A P I call can still receive the wrong stream or the wrong scope, so check those separately. | same comment held; its opening clause, "Looked twice at HoldRules…", banded; no code on screen
- c1-13d | Before you check, write down why it would be wrong. If you cannot name the failure, all you have is a shape you recognised. | the lesson's TIP callout
- c1-14 | A comment the author can act on has four parts, in this order: the label, the impact, the cause, and a suggested fix. | review editor, an inline comment; the four parts as labels appearing in order
- c1-14b | A vague comment makes the author do your investigation. A strong one shows what you saw, why it matters, and a way out. | the lesson's weak comment beside its four-part due-date comment, both verbatim, the four-part one as the accent
- c1-15 | Suggest, and leave the rewriting of their file to them. Comment on the code, never on the person. | "More habits worth keeping" list, items one and two
- c1-15b | For every blocking item, describe the test that would have caught it. A blocking fix without a test is a finding of its own. | same list, item three
- c1-15c | And say what is good, specifically, so the author knows what to keep doing. | same list, item four
- c1-16 | The summary at the top is for everyone else: the author's lead, the next reviewer, the person reading the history in a year. | review editor, the summary box above the inline comments
- c1-16b | Put the verdict first. Approve when nothing blocks. Should-fix items can wait for a follow-up ticket, as long as it is linked in the pull request. | the lesson's verdict list, the **Approve** item banded
- c1-16c | Request changes when anything blocks. Good code elsewhere does not offset a known security hole or a path to data loss. | same list, the **Request changes** item banded
- c1-16d | Comment when you only have questions and the answers decide the verdict. | same list, the **Comment** item banded
- c1-17 | Urgency in the description is about the author's schedule, and it changes no label. If something blocks, say so early and kindly, and offer to pair on the fix. | the lesson's IMPORTANT callout, its last sentence banded
- c1-18 | You do not need to find everything. Finding the expensive problems in forty-five minutes beats finding everything in a day. | heading "Timeboxing"; the desk clock
- c1-18b | When the time is up, write the summary with what you have, and say what you did not cover. | same heading; the summary box in the review editor
- c1-19 | Leave what a formatter or linter would catch to the tool. If the team has no such tool, ask for it once. | "When not to comment, and when not to block" list, item one
- c1-19b | Do not block on taste, on a refactor the pull request did not set out to do, or on a finding whose impact you cannot state. | same list, item two
- c1-19c | A second round checks the answers and new commits, not the whole pull request. If an answer cannot change your verdict, label the question so it can wait. | same list, items three and four
- c1-end | Nine questions for exercise one. | review questions card, then "Pause here. Now do exercise 01."
- c1-after | After the exercise, compare your review with the review file on the solutions branch. Start with the verdict, then the blocking items. | "After the lesson" card; `REVIEW.md` as a label
- c1-afterb | Then the looks wrong but fine list, then the rest. For each difference, write down whose reasoning is stronger, and why. | same card, the comparison order banded
- c1-afterc | Then review a real pull request from your own work, with the same steps. | same card, its last sentence banded
- c1-close | Six o'clock. The desk closes. | clock 18:00, desk lights down
