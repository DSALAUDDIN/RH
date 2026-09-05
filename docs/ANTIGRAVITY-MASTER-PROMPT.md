# RH Dental Care — Master Prompt

**Paste this whole file as the task. Read all of it before touching a file.**

You are working on the RH Dental Care website: a Next.js 16 App Router project
(React 19, TypeScript, Turbopack, Prisma + SQLite) at `J:\RH`, deployed to a VPS
at `/var/www/rhdentalcare/RH`. Repo: `github.com/DSALAUDDIN/RH`.

---

## 0. THE ONE CONSTRAINT ABOVE EVERYTHING

**Do not change the visual theme.** The site is dark navy with a sea-blue accent
ramp, blue gradient CTAs, glass cards, and the fonts Bricolage Grotesque
(display) / Geist (body) / Inter (UI). That look is final. Specifically:

- Do **not** edit colour values, gradients, shadows, border-radii or font-weights
  in any existing `.css` file or in any existing inline `style={{ }}` object.
- Do **not** swap fonts, add a font, or change `layout.tsx`'s font block.
- Do **not** introduce a new palette, a light mode, or a "design refresh".
- Any **new** component you write must be styled only with the existing design
  tokens (`--rh-*` in `src/app/tokens.css`, `--blue-*` / `--radius-*` /
  `--text-*` in `src/app/globals.css`). No new raw hex values.
- If you think something must change visually to fix a real defect (overlap,
  unreadable contrast, broken layout), **say so and ask first**. Do not decide
  on your own.

Everything below is content, structure, correctness, security and SEO. None of
it requires a visual redesign, and a visual redesign is not wanted.

---

## 1. THE BUSINESS

Two clinics in Dhaka, one clinical team.

**Banani — the private suite.** Level 7, B&B Empire, Plot 116, Road 11, Banani,
Dhaka 1213. Phone `01721-367622` (`+8801721367622`). Appointment-only, no
walk-ins. Priced above Banasree. Two sessions: morning 9:00 am – 2:00 pm,
evening 4:30 pm – 10:00 pm. **Which days it opens is not known — mark
`TODO(client)`, and do not put unverified days into JSON-LD.**

**Banasree — the flagship hospital.** 1st floor, House 42, Road 8, Block C,
Banasree, Rampura, Dhaka 1219. Phone `01775-227902` (`+8801775227902`).
In-house master digital lab, full specialist team on site, published price list,
0% EMI. Hours: **Saturday to Wednesday and Friday, 3:30 pm – 10:00 pm; Thursday
closed** — these are confirmed and may go into JSON-LD.

Enquiry email: `drhasan0712@gmail.com`.

### Positioning rules — these are not style preferences

1. Frame the two branches by **audience and setting**, never by price tier.
2. **Never** call Banasree "standard", "affordable", "budget", "basic" or
   "economy". It is the **flagship / full-service / the bigger setup**.
3. **Never** imply Banani is clinically better. Same doctors, same materials,
   same sterilisation protocol at both. What differs is the setting and the pace.
4. **"Price is a consequence, never the difference."** Banani costs more because
   the room and the clinician are yours for the whole slot — fewer patients per
   day, no overlap. Say that, not "premium".
5. Banani's real promise, in the client's own words: **"IT DOES NOT FEEL LIKE A
   CLINIC."** Dental anxiety starts in the room before the chair.
6. Never use "luxury", "VIP", "best", "No. 1", "world-class", "#1".

---

## 2. HARD RULES — violating any of these is worse than not doing the task

1. **NEVER INVENT A FACT.** Prices, hours, coordinates, patient counts,
   qualifications, registration numbers — if it is not already in the repo or
   given above, write `TODO(client): <the exact question>`. A wrong price or an
   invented credential on a medical site is worse than a blank.
2. **NEVER FABRICATE** reviews, testimonials, ratings, or `aggregateRating`
   schema. Marking up a rating that does not exist on a live listing violates
   Google's structured-data policy and can get the whole site's rich results
   suppressed. `aggregateRating` may only ever be rendered from a live API
   response — never from a constant.
3. **NO FALLBACK PHONE NUMBER.** When no branch has been resolved, the CTA opens
   the branch picker. It must never silently route to Banasree (or anywhere).
4. **Do not delete existing content to tidy up.** Flag it, ask, then act.
   (Removing the specific unsupported claims listed in §5 is explicitly
   authorised — that is not "tidying up".)
5. **Small, reviewable commits.** One concern per commit. If you disagree with
   an instruction here, say so in the commit message or the report — do not
   silently override it.
6. **If you find yourself building something that manufactures social proof,
   stop and flag it.**

---

## 3. THE FOUR PROBLEMS TO SOLVE

1. The site behaves like one clinic. Two branches exist but nothing routes a
   visitor to the right one, and phone numbers are hardcoded in several places
   and have drifted out of sync.
2. It makes claims it cannot support — "13k+ happy patients", "500+ reviews"
   (the real listings have about a dozen), "98% success rate", "99% pain-free",
   "Pain-Free Guarantee", "world-class", "No. 1".
3. It is close to invisible to search and to AI assistants.
4. Strong clinical capability (CBCT, operating microscope, in-house digital lab,
   BMDC-registered specialists) with almost no online proof of it.

---

## 4. WHAT IS ACTUALLY BROKEN — findings to fix

Verify each of these against the current code before fixing; they were found by
audit, and some may already be partly addressed.

### P0 — the reason the site is invisible

**`alternates: { canonical: '/' }` is set on the root layout.** In the App
Router, metadata cascades: every route that does not declare its own canonical
inherits it. Twelve routes — `/banani` and `/banasree` among them — were telling
Google they were the homepage. This, not rendering, was the cause of the
invisibility.

Fix:

- Remove `alternates` **and** `keywords` from the root layout entirely.
  (`keywords` has been ignored by Google since 2009 and was the last
  machine-readable place the superlative claims survived.)
- Create `src/lib/metadata.ts` exporting `BASE_URL` and a `pageMeta()` helper
  whose `path` argument is **required**, so no route can ship without a
  canonical. Every page's `export const metadata` goes through it.
- Create `src/lib/routes.ts` — a single route manifest. `src/app/sitemap.ts` and
  the audit script both read it, so a new route cannot be missing from the
  sitemap.
- Add `layout.tsx` metadata files for any route that has none
  (`/dental-surgery`, `/digital-dentistry`, `/special-child`,
  `/zirconia-crown`, `/zirconia-veneers`, `/contact`, `/team`, `/about`,
  `/treatments`, `/implants`, `/orthodontics`, `/root-canal`, …).

### P1

- **Hidden `<h1>`s.** Several heroes animate from `initial={{ opacity: 0 }}`. A
  hero heading that paints at opacity 0 is an LCP and SEO defect. Change every
  such hero `<h1>` (and only the `<h1>`) to `initial={{ opacity: 0.001 }}` —
  visually identical, but the text is painted and measurable.
- **`aggregateRating` in JSON-LD with a hardcoded rating and review count.**
  Delete it. Build `src/lib/reviews.ts` that fetches from the Google Places API
  and returns `null` when there is no API key or no `placeId`; a rating renders
  only from that live response.
- **Duplicate `@id`s in JSON-LD.** Every node needs a unique, stable `@id`.

### P2 — unsupported claims (remove all of these)

`13k+ Happy Smiles` · `13,000+` · `5,000+ Happy Patients` · `500+ Google
reviews` (×3) · `98% Success Rate` · `99% Pain-Free Rate` · `1000+ Implants
Done` · `5 Countries Trained` · `12+ Years Exp.` / `12+ Years Experience` /
`12+ Years Expertise` (unevidenced — ask for the year of first BMDC registration
instead, which stays true without editing) · `Pain-Free Guarantee` ·
`Painless Guarantee` · `world-class` (about a dozen occurrences) · `#1` /
`No. 1` / `best dental clinic` · `luxury` · `VIP` (including "Banani VIP Suite"
in the footer and "VIP lounge amenities" on `/treatments`) · `Limited Slots
Available Today` · `painless` wherever it is used as a promise rather than as a
description of anaesthesia.

Replace with something checkable, not with a vaguer adjective:

| Instead of | Write |
|---|---|
| `13k+ Happy Smiles` | `2 Branches in Dhaka` |
| `99% Success Rate` | `3D CBCT on site` |
| `98% Success Rate` | `CBCT-planned placement` |
| `Pain-Free Guarantee` | `Comfort-focused care` |
| `painless root canal` | `single-visit root canal under local anaesthetic, using an operating microscope` |
| `world-class implant systems` | `named implant systems` (and name them) |
| `Best Value` (pricing tag) | `Most chosen` |
| `High Global Success Rate` | `Manufacturer-published survival data` |
| `BMDC Certified — Reg. 5169` used site-wide | `BMDC registered` (5169 belongs on Dr. Hasan's own page only) |
| `Limited Slots Available Today` | `Two branches, one clinical team` |

**Do not "fix" a claim by pasting a replacement phrase mechanically.** Read the
sentence. "The procedure is performed under local anesthesia and is carried out
under local anaesthetic" is what happens when you don't. Rewrite the sentence.

Quarantine the existing testimonials into `src/components/testimonials.unverified.ts`
and do not render them until the client confirms they are real. Leave a comment
saying exactly that.

### Security — five real issues

1. **`process.env.JWT_SECRET || 'fallback_secret_key_for_dev'`** appears in five
   files. Anyone reading the public repo can mint an admin token. Create
   `src/lib/auth-secret.ts` with a single `getAuthSecret()`; in production with
   no `JWT_SECRET` it returns `null` and **every admin route denies** — fail
   closed, never fall back.
2. **`prisma/dev.db` is tracked in git.** `git rm --cached prisma/dev.db` and
   add it to `.gitignore`.
3. **A hardcoded `admin` / `admin123` bootstrap** in the login route. Replace
   with an explicit `ADMIN_BOOTSTRAP=true` + `ADMIN_BOOTSTRAP_PASSWORD`
   (minimum 12 characters) path that has to be deliberately switched on.
4. **`DATABASE_URL` missing** from the environment.
5. **Unescaped user input in the enquiry email body**, and an unvalidated
   `replyTo` (header-injection). HTML-escape every interpolated field and
   validate the reply-to address.

### Build resilience

`npm run build` on the server failed with
`Property 'appointment' does not exist on type 'PrismaClient<...>'` — the
generated Prisma client on the server was older than the schema. Add
`src/lib/prisma-models.ts` with narrow delegate accessors
(`appointmentModel()`, `refCounterModel()`) that cast through a `MaybeModels`
interface, so compile-time no longer depends on the generated artefact and a
stale client degrades at runtime instead of breaking the build.

---

## 5. WHAT TO BUILD

### Branch routing (fixes problem 1)

- `src/lib/branches.ts` is the **single source of truth** for both branches:
  name, short name, address, phone, phone display, WhatsApp number and intent
  text, promise, pricing model, hours, `hoursDisplay`, photos with captions and
  dimensions, plus explicit `geoVerified` and `hoursVerified` booleans.
  Coordinates and opening hours are emitted into JSON-LD **only** when their
  verified flag is true.
- Nothing anywhere else may construct a `tel:` or `wa.me` URL or print a phone
  number. Every call / WhatsApp / book action goes through `<BranchCTA>`, which
  builds the URL from `branches.ts` and fires the GA4 event carrying `branch`.
  With no branch resolved it opens the picker (hard rule 3).
- Branch precedence: **route > `?branch=` > cookie > null**. Read the cookie
  server-side in the root layout so pricing, metadata and JSON-LD render
  correctly with no hydration flash. Set `data-branch` on `<html>`.
- Sweep the codebase for hardcoded numbers — `Footer.tsx`, `/treatments`,
  `about/page.tsx` (which contained a placeholder `tel:+8801234567890`) — and
  wire them to `BRANCHES` or `<BranchCTA>`.

### Structured data (fixes problems 3 and 4)

`src/lib/schema.ts`, one `@graph` per page, every node with a unique `@id`:

- `Organization` and `WebSite` site-wide.
- One `Dentist` / `MedicalClinic` node per branch, with `openingHoursSpecification`
  and `geo` gated on the verified flags.
- `Physician` node per clinician, carrying **only confirmed fields** — a
  clinician with no BMDC number and no listed degrees still gets a truthful node
  with their name and affiliation; nothing is invented to fill it out.
- `FAQPage` rendered on the page whose visible content answers the questions —
  never site-wide from the layout.
- `BreadcrumbList` per route, `MedicalProcedure` on the treatment pages.
- Put a comment at the top of the file: **"HARD RULE: no aggregateRating is ever
  built here."**

### Answer-first FAQ content (this is what AI assistants quote)

`src/app/banani/faq.ts`, `src/app/banasree/faq.ts`, `src/lib/treatment-faq.ts`,
rendered by a `<FAQ>` component and mirrored into `FAQPage` JSON-LD.

Rules: the **first sentence answers the question outright**; everything after is
supporting detail. Name the specific system, material, visit count or duration —
"advanced technology" is not an answer and nothing can cite it. Where the number
is unknown, `TODO(client)`, never a hedge. Cover, at minimum: the difference
between the branches; why Banani is priced above; whether you need an
appointment; CBCT; opening hours; parking; whether the same doctors work at both
(yes); implant timelines and system (Osstem SA for the standard package); root
canal visit count and the operating microscope; braces and aligner durations;
zirconia; veneer preparation; sterilisation; children and special-needs
patients; EMI.

Include, verbatim in substance, the answer to *"Is treatment at Banasree a lower
standard than at Banani?"* — **No. The clinicians, the materials, the instruments
and the sterilisation protocol are identical at both branches. Banani costs more
because it runs an appointment-only schedule that keeps the room and the
clinician yours for the whole slot — that is a difference in setting and pace,
not in dentistry.**

### The team (fixes problem 4)

`src/lib/doctors.ts`, two tiers:

- **Full profiles** — Dr. B.M. Rafiqul Hasan (BMDC 5169, Chief Consultant, Oral
  & Dental Surgeon; Banani 9:00 am – 2:00 pm, also Banasree) and Dr. Shimia
  Binte Taher (BMDC 8496, Senior Dental Surgeon — Microscopic Endodontics &
  Aesthetic Dentistry; Banani 4:30 pm – 10:00 pm, Banasree on call).
- **Roster** — name, role, BMDC number where known, and per-branch postings:

  | Name | BMDC | Branch · days · hours |
  |---|---|---|
  | Dr. Mahaesa Tamima | 9632 | Banasree · Sat–Wed, Fri · 3:30–10:00 pm |
  | Dr. Nishat Tamanna Alam | 9245 | Banasree · Sat–Wed · 3:30–10:00 pm |
  | Dr. Mansura Panna (Endodontics) | 15054 | Banasree · Fri–Tue · 5:00–10:00 pm |
  | Dr. Fariha Ferdous | 14623 | Banasree · Sat, Sun, Mon, Wed, Fri · 3:30–9:00 pm |
  | Dr. Umaya Khanam | 18104 | Banasree · Sat, Sun, Mon, Tue, Fri · 4:30–10:00 pm |
  | Dr. Afzal Chowdhury | 18107 | Banasree · Sat, Sun, Mon, Wed, Fri · 4:30–10:00 pm |
  | Dr. Nabil Rahaman (Consultant Orthodontist, FCPS) | *none on flyer* | Banasree · Sat · 3:30–9:00 pm |
  | Dr. Tonima | — | Banasree |
  | Dr. Noton | — | Banasree |
  | Dr. Jeamima Tabassum Barsha (Aligner & Orthodontics) | 14439 | Banasree · Sun, Tue · 5:00–10:00 pm; also Banani |
  | Dr. Monisha Haque Hreedy | 17168 | Banani |
  | Dr. Mim | — | Banani · Sat, Mon, Wed · 9:00 am – 2:00 pm |
  | Dr. Nusrat | — | Banani · 4:30–10:00 pm |

  A clinician with no photograph gets their **initial**, not a stock portrait.
  Render only the fields that are confirmed.

  Leave an `UNRESOLVED` comment block in the file flagging: whether "Dr. Nishat"
  and "Dr. Tamanna" are one person or two, and whether Hreedy and Barsha are at
  Banani or Banasree — the client's list and the flyers disagree.

### Appointments

Email-only, no database write by default. `src/app/api/contact/route.ts`:

- `branch` is **required** — return 400 if absent. Never infer it.
- Two modes behind `PERSIST_APPOINTMENTS`; the default sends email only.
- Generate a human-quotable reference like `RH-BNN-0409-7076`
  (branch code · date · second-of-day mod 10000).
- HTML-escape the body; guard `replyTo` against header injection.
- Send to `CONTACT_TO_EMAIL`.

### Verification script — build this and keep it green

`scripts/seo-audit.mjs`, run against a running production build. It must assert,
for every route in `src/lib/routes.ts`:

- canonical present, absolute, and pointing at **that** URL;
- title present and within length; description present; both unique across routes;
- exactly one `<h1>`, and it is not hidden;
- **no `aggregateRating` anywhere in the HTML**;
- no duplicate JSON-LD `@id`;
- sitemap coverage;
- **no match for any of these 12 banned patterns in visible text:**
  `13,000+` · `13k+` · `500+ reviews` · `happy patients` · `#1` · `no. 1` ·
  `best dental clinic` · `world-class` · `painless guarantee` ·
  `pain-free guarantee` · `98% success` · `luxur` · `limited slots`.

Exit 1 on any error. **The task is not done until this prints
`0 error(s), 0 warning(s)`.**

---

## 6. LAYOUT TRAPS ALREADY KNOWN IN THIS CODEBASE

- `globals.css` has a rule
  `body:has(.hero-v5, .ab-hero, .team-hero, .imp-hero, …) .main-content { padding-top: 0 }`
  because those pages used to draw their own full-bleed hero. If you rewrite one
  of those pages without a full-bleed hero, its `<h1>` will slide under the fixed
  navbar. Give the new hero its own navbar clearance
  (`calc(72px + …)`, 60px under 480px).
- The navbar is a three-column grid (`auto 1fr auto`) with `white-space: nowrap`
  on the logo text. Do not change it to `space-between` — the brand wraps onto
  the first nav pill.
- `globals.css` has a **pre-existing brace defect**: the typography and system
  tokens (`--font-family-base`, `--font-family-header`, `--font-family-ui`, the
  `--text-*` scale, the `--radius-*` scale, `--nav-height`, the `--space-*`
  scale, `--max-width`) sit **inside** the `[data-branch='banasree']` block, so
  they are undefined whenever no branch is set. Moving the closing brace up two
  lines fixes it — **but it changes how the site looks, so report it and wait
  for a decision. Do not fix it unilaterally.**
- `tokens.css` and `globals.css` both declare `--rh-accent`. Keep the values
  identical in both (Banani `#d97706`, Banasree `#0284c7`) so load order cannot
  change the outcome.

---

## 7. HOW TO VERIFY BEFORE YOU SAY IT IS DONE

```
npx next build                       # must compile and type-check clean
npx next start -p 3000
node scripts/seo-audit.mjs           # must print 0 error(s), 0 warning(s)
```

Then, with a real browser or Playwright at 1440×1000 and again at 390×844,
screenshot at least `/`, `/banani`, `/banasree`, `/contact`, `/team`, `/about`,
`/implants` and **look at them**. Check specifically that:

- nothing sits under the fixed navbar;
- the theme is unchanged from before your work — same navy, same blue gradient
  buttons, same fonts, same card treatment;
- every call/book button either dials the right branch or opens the picker;
- no removed claim has reappeared.

Also grep the whole `src/` tree for `01721-367622`, `01775-227902`,
`+8801721367622`, `+8801775227902` and `+8801234567890`. The only file that may
contain a phone number is `src/lib/branches.ts`.

---

## 8. DELIVERABLES

1. The code changes, in small reviewable commits.
2. `docs/audit-report.md` — what you found, by severity, with file and line.
3. `docs/implementation-report.md` — what you changed and why, the verification
   output pasted in, every disagreement you had with this prompt, and a single
   consolidated list of every `TODO(client)` marker you left, grouped by what
   you need from the client to close it.
4. `docs/go-live-checklist.md` — environment variables, the `git rm --cached`
   step, and the post-deploy checks.

---

## 9. WHAT THE CLIENT STILL OWES YOU

Leave these as `TODO(client)` and list them in the report. Do not guess any of
them:

- Are the existing testimonials real, or were they written for the site?
- The Banasree price list — treatment name, price, and what each price includes.
- Which **days** the Banani suite opens.
- Are "Dr. Nishat" and "Dr. Tamanna" one person or two?
- Are Dr. Hreedy and Dr. Barsha at Banani or Banasree?
- Status of Dr. Asma and Prof. Dr. Shaheen (in the repo's assets, not on the
  client's roster).
- Year of first BMDC registration (replaces the removed "12+ years" counters).
- Combined floor area — `/about` still shows `5000+ sqft Total Area`.
- Autoclave class (B/S/N) and whether cycles are logged and traceable.
- Which cards or lenders the 0% EMI runs through, minimum value, tenures.
- Parking at both addresses.
- The aligner system actually provided (an Invisalign flyer is in the assets
  without confirmation that Invisalign is offered).
- Typical turnaround for a single crown at Banasree, in days.
- Banani consultation fee, and whether it is credited against treatment.

---

## 10. OUT OF SCOPE — do not do these

Google Business Profile listings, review collection, directory submissions,
backlink building, social media. And again: **if you find yourself building
something that manufactures social proof, stop and flag it.**
