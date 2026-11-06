# Security lesson video: narration

One line per voice clip, `id | spoken text | what the screen shows`. Numbers are spelled out for the voice. The screen never
repeats the spoken line word for word. Review questions are screen-only cards (verbatim from `LESSON.md`), held while the
bed plays. Each exercise chapter ends on "Pause here. Now do exercise NN." as a card, with the clip `cN-end` spoken.

## Chapter 0: what moved since Angular 17 (08:55)

- c0-1 | Eight fifty-five. The desk opens at nine. In this part two topic, every finding also gets a severity and the comment you would leave on the pull request. | desk app, clock 08:55 in its header; title "What moved since Angular 17"
- c0-1b | Ask the same thing of every value: who outside my team can influence it, and what can it reach? | the lesson's question "who outside my team can influence this value, and what can it reach?" beside the desk app
- c0-2 | Four labels sort the findings. Blocking holds the merge until it is fixed. A question is for when you cannot tell, so you ask the author why. | table "Label / Meaning / Merge?" from the lesson, rows appearing one by one, every row styled alike
- c0-3 | Three factors decide a security label. First, what the attacker gains. Running code in someone else's session is serious. Learning a version number is not. | the three numbered factors, factor one as the accent
- c0-4 | Second, who can trigger it, against whom. Any anonymous visitor against every user is worst, a member against other members close behind. Only the victim, or an admin, is narrower. | same list, factor two as the accent
- c0-5 | Third, whether another layer still holds, like a server that rejects the request, or a Content Security Policy that stops the script. The finding stays real, with smaller impact. | same list, factor three as the accent
- c0-6 | On a member's private settings page, markup in their own quote is self X S S: usually a should-fix, until others see it or an attacker can write it. | desk app, a member's profile page with a "favourite quote" field; the label `should-fix`
- c0-7 | An admin search page that reflects the term without escaping is narrow, but one crafted link runs code with admin rights. Most teams would call that blocking. | the lesson's second worked example; the label `blocking` as the accent
- c0-8 | A good comment leads with that reasoning. Saying any member can run script in every reader's session tells the author why the fix matters. | the lesson's two example comments, one above the other, the first as the accent
- c0-9 | Since version two, Angular escapes or sanitizes values bound into the DOM by default, and you opt out explicitly. The code around that model moved. | heading "What moved since Angular 17"; the "Area / Angular 17 / Angular 22.2.2" table cut in whole
- c0-10 | Functional interceptors are now the norm, X S R F protection is still on by default, and the default H T T P backend is fetch. | same table, the "HTTP setup" row banded, then the "HTTP backend" row
- c0-11 | With Trusted Types, most bypassed values get a policy of their own, so a C S P can refuse them and still allow Angular's sanitized values. | same table, the "Trusted Types" row banded; `angular` and `angular#unsafe-bypass` as labels
- c0-12 | The builder has an experimental auto C S P option, off by default, and allowed Hosts limits which hostnames the server application accepts. | same table, the "CSP" row banded, then the "SSR" row
- c0-13 | Each binding has a security context. H T M L bindings keep a safe subset and drop scripts. U R L bindings neutralize javascript colon. | table "Context / Bindings that use it / What Angular does" cut in whole, the `HTML` row banded, then the `URL` row
- c0-14 | Resource U R L bindings, like an iframe source, refuse anything not explicitly trusted. Attributes like an iframe's sandbox refuse a binding at all. | same table, the `RESOURCE_URL` row banded, then the `ATTRIBUTE_NO_BINDING` row
- c0-15 | Interpolation between tags sets a text node, never parsed as H T M L. Inside an attribute, it uses the same sanitizer as the bracket binding. Then the desk opens. | `<p>{{ value }}</p>` from the lesson, then `href="{{ url }}"` beside `[href]="url"`; the clock turns to 09:00

## Chapter 1: trust boundaries and the sanitizer (09:00)

- c1-1 | Nine o'clock. Every injection bug has the same shape. A value from a source someone else controls reaches a sink that interprets it. | clock 09:00; desk app at rest; the words **source** and **sink** as labels
- c1-2 | Whoever controls that value can act in the session of everyone who views it. The trust boundary is the line between what your team wrote and what anybody wrote. | the **source** and **sink** labels joined by a line, the label **trust boundary** on it as the accent
- c1-3 | Take a member who embeds a reading-list video on their public profile. Angular refuses the iframe source unless something vouched for it, because an iframe runs what it loads. | the lesson's flow diagram, boxes drawing on, the `refused unless something vouched for it` edge as the accent
- c1-4 | Use the least powerful binding that renders what the feature needs. For a plain-text bio, interpolation is the whole answer. Inner H T M L is for formatting you need. | the lesson's `member.bio` code, cut in whole, band on the `{{ member.bio }}` line, then on the `[innerHTML]` line
- c1-5 | The five bypass methods never look at the value. Each one marks it as vouched for, and the binding skips sanitization. | heading "`bypassSecurityTrust*`"; the five method suffixes `...Html`, `...Style`, `...Script`, `...Url`, `...ResourceUrl` as labels
- c1-6 | That promise is only true for a constant, or a string your code builds from constants and pieces it validated itself. | the five labels dimmed; the words "a constant" as the accent
- c1-7 | So the video feature vouches for a U R L the code builds: a constant host and path, and an I D checked against a strict pattern first. | the lesson's `embedUrl` code, cut in whole, band on the `VIDEO_ID.test(id)` line, then on the template-string line
- c1-8 | Never bypass anything a user, a partner or the address bar can influence. In review, ask the author who vouches, and why the value cannot change. | heading "When not to use a bypass"
- c1-9 | Decide about a U R L with the U R L class, the parser browsers use. It treats backslashes, tabs and protocol-relative addresses differently from a string check. | heading "Decide about URLs with the parser"; `URL` beside `startsWith` and a regular expression as labels
- c1-10 | The attacker picks the input where the two disagree. So parse, compare origins, and decide what it means when the U R L constructor throws. | `new URL(value)` as a label, the word "throws" as the accent
- c1-11 | The U R L sanitizer leaves a link pointing at unsafe colon. Ask which schemes a feature should support, and what it shows for anything else. | heading "Links to the outside"; `unsafe:...` as a label
- c1-12 | Current browsers apply no opener to target blank links by default, and send other sites only the origin. The rel attribute still covers old browsers and loosened referrer policies. | `rel="noopener noreferrer"` and `strict-origin-when-cross-origin` as labels
- c1-end | Four questions before exercise one. | review questions card, then "Pause here. Now do exercise 01."

## Chapter 2: credentials and what leaves the app (11:30)

- c2-1 | Eleven thirty. A credential is only as safe as the least careful place it reaches, and whoever holds a member's token can act as them until it expires. | clock 11:30; desk app at rest, a signed-in member's name in its header
- c2-2 | An interceptor runs for every request made through that client: your A P I, a C D N, a map vendor, analytics. Whatever it adds, it adds everywhere. | the lesson's interceptor flow diagram, boxes drawing on, the `whatever the interceptors add` edge as the accent
- c2-3 | So review its scope. A request I D is harmless anywhere. A credential should reach exactly the destinations that need it, decided by parsing the U R L. | same flow held, the `Every destination` box as the accent
- c2-4 | Ask what happens for a destination nobody listed yet. The with Credentials option, or credentials include, makes the browser attach that site's cookies to a cross-origin request. | `withCredentials: true` and `credentials: 'include'` from the lesson as labels
- c2-5 | Cross-site request forgery: another site makes the browser send a state-changing request to your A P I. The browser attaches cookies, never your bearer header. | heading "CSRF and the layers that stop it"; `Authorization` and `Cookie` as labels, `Cookie` as the accent
- c2-6 | The first layer is the cookie's Same Site attribute. Lax or Strict withholds it from cross-site posts, puts and deletes. Set it explicitly, because browsers differ. | the lesson's SameSite flow diagram, the first three edges drawing on
- c2-7 | The X S R F token holds where Same Site does not: cookies set with None, attackers on a sibling subdomain, and older clients. | same flow, the last edge `X-XSRF-TOKEN` drawing on as the accent
- c2-8 | Angular's side is on by default. Except for get, head, and requests to other origins, it copies the X S R F cookie into a header. | the lesson's four-item list, items appearing one by one
- c2-9 | The server compares cookie and header, and another site cannot read the cookie. The with No X S R F Protection feature removes that defence. | same list, the last item banded
- c2-10 | Whether a missing layer is blocking depends on which of the other layers this A P I actually has. | the three layers as labels: SameSite, XSRF token, the server check
- c2-11 | Logs, analytics and error reports are sinks too, copied elsewhere, kept for a long time, read by people outside the team. Name the fields that help, and send only those. | heading "Data that leaves through side doors"; the word **allowlist** as the accent
- c2-12 | Where the app stores its token trades exposure to injected script against exposure to C S R F. The answer depends on the app, so ask. | the label `question` from chapter zero's table as the accent
- c2-end | Four questions for exercise two. | review questions card, then "Pause here. Now do exercise 02."

## Chapter 3: building markup from text (15:00)

- c3-1 | Three o'clock. Some features turn a person's text into markup in code, and that markup often reaches the page through paths the template sanitizer never sees. | clock 15:00; desk app at rest
- c3-2 | Unguarded sinks include insert Adjacent H T M L, document dot write, inner H T M L set through Element Ref, or through Renderer Two set Property. | heading "The sinks Angular does not guard"; the list's items appearing one by one
- c3-3 | So are third-party widgets that take H T M L strings, and templates compiled at runtime. Each hit needs proof the string is constant or safe there. | same list, the last two items
- c3-4 | You rarely need an H T M L string. A highlight function can return data, and the template escapes every piece. Text in, data out, markup in the template. | the lesson's `splitByTerm` code, then its template code, band on the `@if (part.match)` line; the lesson's caveat about the `filter` shifting indexes as an on-screen caption
- c3-5 | When an A P I only takes H T M L strings, escape the text for its context before adding your own tags. Then the only markup is yours. | the lesson's `escapeHtml` and `tooltip` code, cut in whole, band on `escapeHtml(shelf.name)`
- c3-6 | Escape afterwards and you escape your own tags. Element content needs less than and ampersand escaped, and an attribute also needs its quote character. | same code, band on the `<b>` of the `tooltip` line
- c3-7 | A U R L needs an allowlist of schemes, because an escaped javascript colon is still javascript colon. | the lesson's "Escape for the context you write into" sentence, the URL part banded
- c3-8 | A value inside a U R L needs the tool for its position, shown here. The server has to check the same values too. | table "Where the value goes / Tool" from the lesson, cut in whole
- c3-end | Five questions for exercise three. | review questions card, then "Pause here. Now do exercise 03."
- c3-out | Some risks sit outside the sanitizer. Route guards and hidden buttons decide what the app shows. Anyone can call the A P I, so the server decides access. | heading "What Angular does not protect you from", the first item
- c3-outb | Never build templates from user input. Compiled at runtime, that data runs as template code the attacker wrote. | the second item
- c3-outc | Everything in the bundle is public, keys and admin flags included. Third-party scripts and dependencies run with the page's full privileges, so review them like your own code. | the third item, then the fourth
- c3-outd | Server rendering's transfer cache writes responses into the page. By default it skips requests with auth headers or credentials. Options that include them put private data in the page source. | the fifth item, `includeRequestsWithAuthHeaders` as a label
- c3-after | After each exercise, write your findings with a severity before you open the solutions branch. Where your label differs, find the factor you weighed differently. | "After the lesson" card
- c3-afterb | Then rewrite your comment until it states the impact, the fix, and anything you would not block on. | same card, its last sentence banded
- c3-close | Six o'clock. The desk closes. Tomorrow other people write the values it shows. | clock 18:00, desk lights down
