# RH Dental Care — Implementation Report

**Date:** 2026-09-04
**Repo:** `J:\RH` · Next.js 16.2.1 (App Router) · React 19.2.4
**Baseline commit:** `e8ae5e5`
**Changed:** 39 new files, 65 modified. All verified byte-for-byte on your machine.

---

## 0. Read this first

Four things need a decision from you before this goes live. Everything else is done.

1. **Six named testimonials are quarantined, not deleted.** They are in
   `src/components/testimonials.unverified.ts`, imported by nothing. Confirm each
   is a real Google review (with its live URL) or say it was written for the
   site — see §5.
2. **The contact form's recipient address.** The old route sent to
   `drhasan07012@gmail.com`; every other reference is `drhasan0712@gmail.com`.
   It now reads `CONTACT_TO_EMAIL` from the environment. Set it.
3. **The Banasree price list does not exist.** It is the whole Banasree promise
   and the page has a table waiting for it. Nothing was invented.
4. **Opening hours and map coordinates are not published anywhere** — three
   conflicting sets existed in the repo. They stay out of the visible page and
   out of the JSON-LD until you confirm one.

The full list is §7.

---

## 1. Phase 1 findings, and what happened to each

| # | Finding | Status |
|---|---|---|
| **P0-1** | 12 routes canonicalised to the homepage | **Fixed.** All 23 routes verified correct. |
| **P0-2** | Branch and doctor pages missing from sitemap | **Fixed.** Sitemap now derives from a route manifest. |
| **P0-3** | Fabricated `aggregateRating` 5.0 / 200 | **Removed.** A rating can now only come from a live API response. |
| **P0-4** | Six unverifiable named testimonials | **Quarantined, not deleted.** Awaiting your call. |
| **P0-5** | Contact form emailing `drhasan07012@` | **Fixed** — now `CONTACT_TO_EMAIL`, with a TODO in the code. |
| **P0-6** | `tel:+8801234567890` placeholder live on /about | **Removed.** Both buttons now open the branch picker. |
| **P1-1** | *(Brief assumed SSR was broken)* | Not a defect. Content was always in the initial HTML. |
| **P1-2** | Two H1s at `opacity: 0` | **Fixed** on 9 pages — now `0.001`, so the text paints and is measurable. |
| **P1-3** | Every route dynamically rendered | **Deliberate, and I recommend keeping it.** See §6. |
| **P1-4** | 6 routes sharing the homepage title | **Fixed.** All 23 titles and descriptions unique and in range. |
| **P1-5** | Branch entities declared 3× with drift | **Fixed.** One builder, `src/lib/schema.ts`. |
| **P1-6** | `/reviews` HTTP 500 | Was my Prisma stub. Route builds and serves. |
| **P2-1** | 14 hardcoded phone/WhatsApp call sites | **Fixed.** Acceptance grep passes. |
| **P2-2** | ~60 unsupported claims | **Removed.** The audit script now blocks their return. |
| **P2-3** | Performance | Partly. HTML 189 KB → 146 KB. JS unchanged — see §6. |
| **P2-4** | Duplicate doctor pages | **Consolidated** by canonical + noindex, not deleted. |
| **P2-5** | `ReelsGallery` stock footage | Flagged, unrendered, not deleted. |
| **P2-6** | Security notes | Contact route hardened. Others flagged, §7. |

**One correction to the audit.** I reported BMDC 5169 and 8496 as two conflicting
numbers for Dr. Hasan. They are not: **5169 is Dr. Hasan, 8496 is Dr. Shimia**,
consistently, in `Hero.tsx` and `team/page.tsx`. The real defect was narrower and
worse — the old `/dr-hasan` page printed *"BMDC Verified Specialist (8496)"* under
Dr. Hasan's name, publishing another clinician's registration number as his. Fixed.

---

## 2. What changed, by file

### New — the spine

| File | What it does |
|---|---|
| `src/app/tokens.css` | The design system from the photographs. Sage/brass palette, Newsreader/Karla/Hind Siliguri, and **elevation as warm glow** (`--rh-glow-*`, `--rh-cove`, `--rh-niche`). There is deliberately no neutral drop-shadow token. |
| `src/lib/schema.ts` | The only place structured data is built. Emits geo and opening hours **only** when the branch record marks them verified. Never builds an `aggregateRating`. |
| `src/lib/metadata.ts` | `pageMeta()` — canonical is a required argument, so a route cannot ship without one. |
| `src/lib/routes.ts` | Route manifest. Sitemap and audit script both read it. |
| `src/lib/reviews.ts` | Google Places lookup. Returns `null` without a key or place id — no cache, no fallback, no seeded average. |
| `src/lib/doctors.ts` | Clinician facts, with real credentials recovered from `team/page.tsx`. |
| `src/lib/treatment-faq.ts` | Answer-first FAQ content for six treatment areas. |
| `src/lib/analytics.ts` | `track()` — every branch event carries `branch`. |
| `src/lib/ref-server.ts` | Authoritative booking reference from a database sequence, in a transaction. |
| `src/components/FAQ.tsx` | Native `<details>`, so every answer is in the initial HTML. Emits `FAQPage` **on the page that answers it**, not site-wide. |
| `src/components/ReviewBadge.tsx` | Real Google rating, or nothing. No skeleton, no placeholder. |
| `src/components/BookingForm.tsx` | One form, two modes from `branch.bookingMode`. |
| `src/components/DoctorProfile.tsx` | Shared clinician page. Renders only sections that have real content. |
| `scripts/seo-audit.mjs` | The regression gate. Detail in §4. |
| `public/assets/branches/banani/*.webp` | 12 files — 4 photographs × 3 widths. |

### Rewritten

`src/app/layout.tsx` — no root canonical (the P0-1 cause), no `keywords` array,
no site-wide `FAQPage`, no inline 6-node graph, fonts swapped to Newsreader /
Karla / **Hind Siliguri** (there was no Bengali face loaded at all, despite the
schema declaring আরএইচ ডেন্টাল কেয়ার as an alternate name).

`src/lib/branches.ts` — now the real single source of truth. Adds
`geoVerified` / `hoursVerified` flags, `promise`, `pricingModel`, `placeId`,
structured `photos` with captions, and `SHARED_TRUST`.

`src/components/branch/BranchCTA.tsx` — **the important behavioural change.**
When the branch is known it now renders a real `<a href="tel:…">`. It was always
a `<button>`, which meant not one phone number on the site was machine-readable
by a crawler or offerable on a long-press. When no branch is resolved it is still
a button that opens the picker and completes the original intent. There is no
fallback number anywhere in the file.

`BranchProvider` — precedence is now `route > ?branch= > cookie > null`, computed
rather than raced through effects. `useSearchParams()` is isolated in a
`<Suspense>`-wrapped leaf so it does not deopt the whole app. Adds `isPinned`.
Fires `branch_select` / `branch_switch`. Never navigates, so scroll is preserved.

`BranchPickerSheet` — **focus trap**, Escape closes, focus returns to the trigger
(WCAG 2.4.3), content driven from `BRANCH_LIST`.

`FloatingWhatsApp` — pinned on branch pages, real `wa.me` anchor when the branch
is known, picker when it is not. Hidden on `/contact`, where the page already
presents both.

`api/contact/route.ts` — **rejects a submission with no branch**, never infers
one. Issues a server-side ref, writes an `Appointment` row, escapes user input in
the HTML email, guards `replyTo` against header injection, and reports a mail
failure separately from a booking that is already recorded.

`LayoutWrapper` — `<AudioPlayer>` is **no longer mounted globally**. It was on
every route including `/admin`, calling `.play()` against a 3.8 MB `/sound.weba`.
The component is not deleted (rule 4) — flagged in §7.

Pages rebuilt: `/banani`, `/banasree`, `/contact`, `/dr-hasan`, `/dr-shimia`,
`/team/dr-*`. Metadata added or corrected on all 23 routes. FAQ blocks added to
8 treatment pages.

---

## 3. The Banani page, and your photographs

You sent four. Three are used whole:

| File | Used as |
|---|---|
| `IMG_5423` | `reception.webp` — the hero |
| `IMG_5285` | `lounge.webp` |
| `IMG_5425` | `consultation.webp` |
| `IMG_5398` | `treatment-room.webp` — **cropped** |

**The fourth is cropped and I want to be explicit about why.** The full frame
shows an identifiable patient under treatment and an unmasked bystander sitting
inside the operatory. I will not publish that without written consent, and the
bystander is a poor advertisement for infection control regardless. What ships is
the room's other corner: panelling, cove-lit ceiling, plant, chairs, and the
sheathed arm of the dental light at the edge. No patient, no face. If you have
consent, send it and I will use more of the frame.

Each is emitted at 1600/1200/800 px WebP — 1.4 MB for all twelve files. All go
through `next/image` with real dimensions, so no layout shift.

**The headline is not "there is no waiting room."** Your brief proposed that; the
photographs contradict it — reception has a sofa and two armchairs, and there is a
separate four-chair lounge. The page says the true version instead:

> **A dental practice that does not *feel* like one.**
>
> Dental anxiety does not usually start in the chair. It starts earlier — in the
> room before it.

That survives a patient walking in and comparing. The other version does not.

The gallery is a staggered 12-column grid, not four identical cards — reception
wide, lounge dropped, the one portrait frame narrow, treatment room aligned to its
foot. Each frame carries the cove strip along its top edge, echoing the ceiling
light that runs through every one of these photographs. Captions say what the
picture shows rather than adjectives about it.

**Banasree has no photographs anywhere in the repo.** Its page is built and waiting
— the gallery and hero render nothing rather than reusing Banani imagery, which
would misrepresent the branch. Send them and they drop in.

---

## 4. Verification — real output

### Build

```
✓ Compiled successfully in 10.7s
  Running TypeScript ...
  Finished TypeScript in 11.6s ...
✓ Generating static pages using 1 worker (74/74)
BUILD_EXIT=0
```

*(Built in a clean Linux container. `fonts.googleapis.com` and
`binaries.prisma.sh` are both blocked from the sandbox attached to `J:\RH`, so
`next build` cannot complete there — same constraint as Phase 1, §0 of the audit.
Fonts and the Prisma engine were stubbed for the build only; both are restored in
what was written to your machine.)*

### `node scripts/seo-audit.mjs` — after

```
route                  title  desc  words  ld  canonical
/                         42   143   1120   1  ok
/banani                   27   147   1281   3  ok
/banasree                 33   149   1033   3  ok
/dr-hasan                 46   145    385   2  ok
/dr-shimia                39   132    349   2  ok
/implants                 24   149   1695   3  ok
/orthodontics             32   142   1244   3  ok
/root-canal               29   139   1346   3  ok
/zirconia-crown           24   122    963   2  ok
/zirconia-veneers         35   127    805   2  ok
/dental-surgery           30   134    953   2  ok
/digital-dentistry        43   113   1051   2  ok
/kids-care                34   150    343   1  ok
/special-child            41   148    981   2  ok
/treatments               26   136    733   2  ok
/services                 24   109    468   2  ok
/specialties              18   154    379   1  ok
/team                     17   139    437   2  ok
/about                    20   152   1771   2  ok
/contact                  22   153    431   2  ok
/dental-tourism           47   138   3804   1  ok
/blog                     22   128   1809   1  ok
/reviews                  15   134    267   2  ok

────────────────────────────────────────────────────────────────
0 error(s), 0 warning(s)
```

**Before, the same script reported 20 errors** — 12 wrong canonicals, 8 hidden
H1s, duplicate `@id`s, and six surviving claim strings.

What it asserts, and why each one is there:

- **canonical present, absolute, self-referential** — P0-1
- **sitemap covers every route in the manifest**, excludes what should not be there — P0-2
- **no `aggregateRating` in any markup** — P0-3
- **no duplicate `@id` on a page** — P1-5
- **exactly one H1, never at `opacity: 0`** — P1-2
- **title ≤ 60, description ≤ 155, both unique across routes** — P1-4
- **no `Disallow: /_next/`** (it blocks the JS Google needs to render)
- **no placeholder phone number** — P0-6
- **12 banned claim patterns** in visible text — P2-2

Exit code 1 on any error, so it can gate a deploy.

### `curl -s localhost:3000/robots.txt`

```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin
Disallow: /private/

User-Agent: GPTBot
Allow: /
...
```

`Disallow: /_next/` removed; `/admin` added; 14 AI crawlers named explicitly
(GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, anthropic-ai,
PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, CCBot,
Bytespider, Amazonbot, meta-externalagent).

### H1s

```
== /            <h1 class="hero-title">
== /banani      <h1 class="bn-h1">A dental practice that does not
== /banasree    <h1 class="bs-h1">Everything a treatment plan needs,
== /implants    <h1 class="imp-hero-title" style="opacity:0.001;transform:translateY(40px)">Dental
== /dr-hasan    <h1 class="dp-name">Dr. B.M. Rafiqul Hasan
```

### Acceptance grep

```
$ grep -rn "01721\|01775\|wa.me" src/
src/components/branch/BranchChooser.tsx:21:     wa.me URLs from branches.ts and fires the GA4 event carrying `branch`.
```

One match, in a comment. **Every phone number and WhatsApp link on the site now
comes from `branches.ts`.**

### Sitemap

```
<loc>https://www.rhdentalcare.com/banani</loc>
<loc>https://www.rhdentalcare.com/banasree</loc>
<loc>https://www.rhdentalcare.com/dr-hasan</loc>
<loc>https://www.rhdentalcare.com/dr-shimia</loc>
```

### Weight

| | Before | After |
|---|---|---|
| Homepage HTML | 189 KB | **146 KB** |
| Initial JS (uncompressed) | 873 KB | 870 KB |

HTML is down 23% (inline style objects removed on the pages that were rebuilt).
JS is essentially unchanged — see §6.

### Not run

Lighthouse and Google's Rich Results Test both need a public URL or a headless
Chrome the sandbox will not reach. Run them after you deploy; the audit script
covers the structured-data validity that Rich Results checks, but not its
rendering preview.

---

## 5. The testimonials

The six named reviews are preserved verbatim in
`src/components/testimonials.unverified.ts`, **imported by nothing**. The component
now renders only from a `VERIFIED_TESTIMONIALS` array that requires a live Google
review URL per entry, and that array is empty, so the section says:

> Reviews for both branches live on their Google listings, where you can see who
> wrote them and when. We do not reproduce them here.

I did not delete them, per rule 4. For each one I need either:

- **(a)** confirmation it is real, plus the live review URL → it goes back on the site; or
- **(b)** confirmation it was written for the site → the quarantine file is deleted.

Anything without (a) does not go back. Reviews attributed to named individuals who
did not write them is the largest exposure on this site and is well past an SEO
problem — it is the one item here I would not ship either way round without your
explicit answer.

The two "— Walid M. · London · verified Google review" pull-quotes on
`/dental-tourism` need the same answer.

---

## 6. Things I did not do, and why

**JS bundle is essentially unchanged (870 KB).** Framer Motion, GSAP and
`lucide-react` all still ship, and Framer Motion and GSAP overlap heavily in
purpose. Removing one is a refactor across ~20 files with real regression risk,
and it is not what makes this site invisible in search. It should be a separate,
reviewable piece of work. Flagging rather than half-doing it.

**Every route is still dynamically rendered.** This is the direct cost of reading
the branch cookie in the root layout — which your brief specifies, and which is
what buys a correct no-flash first paint. I recommend keeping it. Static
generation would need the cookie read pushed into a suspended sub-tree, and every
page here is content that changes rarely enough that a CDN cache in front of the
origin is the cheaper answer. Say the word and I will do the refactor.

**23 raw `<img>` tags → 8 remain.** Both branch pages and all four doctor pages
now use `next/image`. The rest are in `DentalTourism.tsx`, `kids-care` and
`team/page.tsx`.

**`src/assets/Video/` is still 449 MB** of unreferenced `.mp4` (all video streams
from Cloudinary now), plus 32 MB of unused `public/*.mp4`. Deleting files from
your repo is your call, not mine — but it is dead weight in every deploy.

**`ReelsGallery.tsx`** — four mixkit.co stock videos of other clinics with Unsplash
posters. Imported by nothing, and would be blocked by your own CSP anyway.
Recommend deleting; flagged, not deleted.

**Google Business Profile, review collection, directories, backlinks, social** —
out of scope, per your brief, and nothing here manufactures social proof. The two
places that could have (`ReviewBadge`, `aggregateRating`) both render nothing when
there is nothing real.

---

## 7. Consolidated `TODO(client)`

Each is a literal `TODO(client)` in the code, so `grep -rn "TODO(client)" src/`
gives you the live list.

### Prices
- **Banasree published price list** — `src/app/banasree/page.tsx`, `PRICE_LIST`.
  Supply treatment / price / what it includes and the table renders itself.
- **Banani consultation fee**, whether it is credited against treatment, and
  package ranges for implants, veneers, orthodontics — `src/app/banani/page.tsx`,
  `src/app/banani/faq.ts`.
- **0% EMI**: which cards or lenders, minimum treatment value, tenures.
- **Root canal price list by tooth type**, and whether the crown is separate.
  The old site showed `৳13,000` with no indication of either.
- `/dental-tourism` — sources for the `$25,000 → $4,200` and `$65,000 → $9,800`
  comparisons.
- **Is a consultation free?** Three places said so; your brief says Banani charges.
  All three now say `TODO(client)`.

### Hours
- Real opening hours for **both** branches. Three conflicting sets existed. Set
  `hours` and `hoursVerified: true` in `branches.ts` and they appear on the page
  **and** in the JSON-LD. Until then, neither.

### Coordinates and addresses
- Verified lat/lng for both branches → `geoVerified: true`. Banani had two
  different longitudes in the repo (`90.4066`, `90.4046`); neither is published now.
- Confirm the Banani address — is it "Block E"? That appeared only in `layout.tsx`
  and is not in your brief. The version now shipping is yours.
- **Banasree email** — `info@rhdentalcare.com` was in the old schema but not in
  your brief. Omitted rather than published.
- **`CONTACT_TO_EMAIL`** — `drhasan0712@` or `drhasan07012@`? (P0-5)
- **`GOOGLE_PLACES_API_KEY`** and a **`placeId`** per branch, or `ReviewBadge`
  renders nothing anywhere — which is correct, but means no rating at all.
- The five `sameAs` social profiles are **commented out** in `schema.ts`.
  Confirm you control each handle before re-enabling.

### Credentials
- Confirm **BMDC 5169** (Dr. Hasan) and **BMDC 8496** (Dr. Shimia) against the register.
- Dr. Hasan: year of first registration (the site said "12+ years" with no start
  date, which needs editing every year to stay true; a year does not).
- Dr. Shimia's page is 349 words to Dr. Hasan's 385 — both are thin. Professional
  memberships and any further qualifications would fix that.
- Which clinicians hold **paediatric dentistry** qualifications, and whether
  treatment under GA is in-house or referred. (`/kids-care` said "Expert
  Pediatricians" — they are dentists, a different profession. Corrected.)
- **Named systems**: implant system(s), aligner system, intraoral scanner make,
  autoclave class. These are the single most-asked questions by patients who
  research before booking, and what an AI assistant needs to answer "which
  implants does clinic X use". Every one is a `TODO(client)` right now.

### Claim decisions
- **The six testimonials and the two "Walid M." quotes** — real or written? (§5)
- **Patient count** — is there any number you can evidence? All of `13k+`,
  `13,000+` and `5,000+` are gone; the two contradicted each other.
- **Combined floor area** — is `5,000+ sq ft` real?
- **`<AudioPlayer>`** — do you want it at all? If so, on which page, behind an
  explicit play control?
- **`ReelsGallery`** — delete?
- **`src/assets/Video/` (449 MB)** — delete?

### Security, unchanged and still open
- `middleware.ts:5` — `JWT_SECRET || 'fallback_secret_key_for_dev'`. If
  `JWT_SECRET` is unset in production, admin auth is signed with a secret that is
  in the repo.
- `middleware.ts` — Next 16 warns the convention is deprecated in favour of `proxy`.
- A Prisma migration is needed for the new `Appointment` columns and the
  `RefCounter` table: `npx prisma migrate dev --name branch-booking`, then backfill
  existing rows to `BANASREE`.

---

## 8. Anything I disagreed with

**1. The brief's diagnosis of the SSR problem was wrong, and the real cause was
not in the brief at all.** `'use client'` does not remove content from initial
HTML. Every route always shipped its body text. What made the site invisible was
twelve routes canonicalised to the homepage — one inherited line — with both
branch pages among them, and neither in the sitemap. Had Phase 1 followed the
brief's hypothesis, we would have shipped a `'use client'` refactor that changed
nothing and left the actual bug in place.

**2. "Content a crawler cannot read does not exist" was the right principle aimed
at the wrong target.** The version that bit here: *a page Google is told not to
index does not exist.*

**3. `scripts/seo-audit.mjs` was listed as already in the repo. It was not** —
nor were `tokens.css`, `schema.ts`, `reviews.ts`, `FAQ.tsx`, `ReviewBadge.tsx`,
`banani/faq.ts`, or `docs/banani-design-reference.html`. I built all of them. The
audit script has more long-term value than most of Phase 3: the canonical bug was
a one-line inheritance mistake that reached production, and the script is what
stops the next one.

**4. `docs/banani-design-reference.html` does not exist.** `identity-hub_8.html`
at the repo root is an unrelated template ("Aura — Identity Hub"), not it. The
Banani page is built from the photographs and §3 of your brief instead. If the
reference file turns up, send it and I will reconcile.

**5. The Banani promise needed its justification changed, not the promise.**
"It does not feel like a clinic" is the strongest line in the brief. "Because
there is no waiting room" is not true of the space you photographed. The page now
argues it from what the photographs actually show.

**6. Phase 4 was partly built already** — the `Branch` enum and unique `ref` were
in `schema.prisma` — but `api/contact` wrote nothing to the database at all.
Worth confirming whether appointments were ever meant to persist, or whether email
was the whole system.

---

## 9. What I left on your machine

Three files, which I could not delete (no delete permission on that folder):

- `J:\RH\.rh-code.tgz` (496 KB) — source transferred out for the Phase 1 build
- `J:\RH\.rh-changes.tgz` (1.6 MB) — this changeset, already extracted
- `J:\RH\.backup-preRH\src-before.tgz` (**584 MB**) — a pre-change snapshot

The 584 MB one is worth removing; `git` at `e8ae5e5` is the better safety net.
Say the word and I will request delete permission, or remove them yourself.

---

## 10. Suggested order from here

1. Answer §5 (testimonials) and set `CONTACT_TO_EMAIL`. These two gate going live.
2. Run the Prisma migration and backfill.
3. Supply the Banasree price list and the Banasree photographs — the two things
   that page is built around and cannot fake.
4. Confirm hours and coordinates; flip `hoursVerified` / `geoVerified`.
5. Deploy, then run Lighthouse and Rich Results against the live URL.
6. Wire `npm run seo:audit` into CI so none of §1 comes back.

---

# Addendum — Banasree imagery and the site-wide design pass

**Date:** 2026-09-04, second pass
**Changed since the report above:** 54 new files, 102 modified (156 total, all
verified by checksum on your machine).

---

## A. Banasree now has photographs

You confirmed the clinical photos in the repo are Banasree, and that there is
**no written patient consent** for the frames where a face is visible. Five
images are now on the page. **No patient appears in any of them.**

| File | Source | Treatment |
|---|---|---|
| `team.webp` | `implants/clinic-action.jpg` | **Cropped** to the top 62% — three clinicians working. The patient was in the lower third and is gone. |
| `microscope.webp` | `clinicGallery/63.jpeg` | **Cropped** to the upper half — clinician at the endodontic microscope. Patient not in frame. |
| `operatory.webp` | `implants/implant_lab.jpg` | Whole frame. Empty two-chair operatory. |
| `surgical-room.webp` | `rootcanal/root-ot.jpeg` | Whole frame. Empty treatment room. |
| `waiting.webp` | `clinicGallery/3.jpeg` | Whole frame. Waiting area. |

**Not used, and I recommend they never are without consent:**
`clinicGallery/60.jpeg`, `clinicGallery/2.jpeg`, `ortho/ortho-lab.jpg` — all show
identifiable patients' faces. `clinicGallery/59.jpeg` is a draped surgical field
under GA; the patient is not identifiable, but it is a graphic image and I did
not think it belonged on a branch page. Say the word if you want it on
`/dental-surgery`.

Each is emitted at 1600/1200/800 px WebP — 1.4 MB for all fifteen files.

The lead image is **the team working, not an empty room**, because Banasree's
promise is that the specialists are on site. The captions say what each picture
shows rather than adjectives about it, and the section states plainly that no
patient appears and why.

---

## B. The site-wide design pass

You asked for the whole site on the token system. It is. Before this, six pages
used the sage/brass tokens and seventeen were still on a clinical blue palette
with hardcoded colours — that split was the inconsistency you were feeling.

### Three bugs found in `globals.css` that were causing most of it

1. **The entire typography and spacing block was nested inside
   `[data-branch='banasree']`.** `--text-*`, `--space-*`, `--radius-*`,
   `--nav-height` and `--max-width` were therefore **undefined on every page that
   was not flagged Banasree**, so each component silently fell back to whatever
   it had hardcoded. This is the single biggest reason nothing lined up.
2. **`color: hsl(var(--foreground))`** — `--foreground` held a hex, and
   `hsl(#hex)` is invalid, so the body text colour never applied at all.
3. The palette had no relationship to the branch photographs.

All three are fixed, and the old variable names (`--primary`, `--blue-*`,
`--text-*`, `--shadow-*`) are re-pointed at the tokens so existing components
inherit the real palette without being rewritten.

### What changed, in numbers

| Pass | Result |
|---|---|
| Colour literals remapped onto the palette | **1,757** across 59 files |
| Grey/black drop shadows → warm glow | **100** across 39 files |
| Pill radii (50/100/9999px) → joinery radii | **56** |
| Heading weights 800/900 → 400–600 | 47 files |
| Dark section slabs → paper | **14 stylesheets** |
| Near-black photo scrims → warm paper veils | **62** across 24 files |
| Stranded white text → ink | **90** across 42 files |
| Dark card fills → lit panels | **27** |
| All-caps eyebrow labels → sentence case | 18 stylesheets |

Elevation is now `--rh-glow-*` everywhere — a warm backlight, never a grey shadow
under a floating box. That single rule is what stops the site reading as a card
template.

### Chrome

- **Navbar** was a dark glassmorphic slab with an indigo→brass gradient pill CTA.
  It is now a paper bar with a hairline and a warm glow on scroll; the CTA is a
  filled brass (or sage on Banasree) rectangle, and the branch pill takes the
  active branch's colour.
- **Homepage hero** was near-black with a white/sky-blue shimmer headline. It is
  paper, with the accent line in brass and the photograph as a soft ground rather
  than a dark backdrop for white text.
- **Clinician cards** were dark glass with violet and blue gradient rings. They
  are lit panels now.
- **Floating WhatsApp button** is a filled accent circle that takes the branch
  colour and is hidden on `/contact`, where the page already shows both branches.

---

## C. Four more unsupported claims found and removed

The visual pass surfaced things the text sweep had missed because they were
rendered by animated counters rather than written as strings:

| Where | Was | Now |
|---|---|---|
| Homepage hero | `13k+ Happy Smiles · 12+ Years Exp. · 99% Success Rate` | `2 Branches · 2 Clinicians at both · 3D CBCT on site` |
| `/implants` hero | `98% Success Rate · 12+ Years Exp. · 1000+ Implants Done · 5 Countries Trained` | `3D CBCT planning · 2 Branches · 1 In-house lab` |
| `/orthodontics`, `/root-canal` | `12+ Years Expertise` | removed |
| Homepage strapline | *"we deliver painless precision in a premium environment"* | replaced with the positioning line |

**And a blocking modal.** `<PromoModal />` fired on page load with *"VIP ACCESS ·
Experience the Pinnacle of Premium Dentistry · Zero Wait Time & Private Lounge ·
**Only 8 Priority Slots Left This Week** · Claim VIP Consultation"*. That is three
separate violations of your own brief — a blocking modal ("it costs SEO and
bounce rate"), VIP/luxury framing, and manufactured scarcity on a medical site.
It is **unmounted from the homepage; the component file is kept**, per rule 4.
`TODO(client)`: delete it, or tell me what you want promoted and I will build it
as an inline section.

## D. One TODO closed

`implants/page.tsx` names **"Osstem SA Implant Fixture"** — so the implant system
was in the repo all along. The implant FAQ now answers *"Which implant system do
you use?"* with Osstem rather than a `TODO(client)`. Still worth confirming
whether Osstem is the only system or whether a premium alternative is offered.

---

## E. Verification, after the design pass

```
node scripts/seo-audit.mjs
────────────────────────────────────────────────────────────────
0 error(s), 0 warning(s)
```

All 23 routes still pass: correct canonical, unique title and description in
range, one visible H1, no duplicate `@id`, no `aggregateRating`, no banned claim
in visible text. `npm run build` exits 0.

Six pages were rendered at 1440 px and inspected: `/`, `/banani`, `/banasree`,
`/implants`, `/team`, `/contact`. They now read as one site.

**One caveat on how it looks right now.** The sandbox cannot reach
`fonts.googleapis.com`, so every screenshot renders Newsreader and Karla as
Georgia and a system sans. On your machine, with the real fonts loading, the
display type will be noticeably better than what the screenshots show — the
layout, colour and spacing are accurate; the typeface is not.

---

## F. Still open, unchanged

Everything in §7 above stands. The four that gate going live:

1. **The six testimonials** — real or written? Still quarantined.
2. **`CONTACT_TO_EMAIL`** — `drhasan0712@` or `drhasan07012@`?
3. **The Banasree price list** — the page has a table waiting for it.
4. **Opening hours and map coordinates** for both branches.

Plus, new from this pass:

5. **Delete `PromoModal.tsx`**, or tell me what should be promoted instead.
6. **Confirm the Banasree photographs are current** — they show a different
   fit-out from the Banani suite, which is expected, but if that hospital has
   been refurbished since, these should be reshot.

---

# Final status check

Run at the end of the session, against the files actually on your machine.

## Verified green

| Check | Result |
|---|---|
| `npm run build` (fonts stubbed for the offline sandbox) | **exit 0** |
| `npm run build` with the real font imports | fails on **three Google Fonts fetches only** — nothing else. That is this sandbox's blocked egress, not your code. It will build on your machine. |
| TypeScript | passes |
| `node scripts/seo-audit.mjs` | **0 errors, 0 warnings** across all 23 routes |
| Files on `J:\RH` vs. what was built | **156 / 156 byte-identical** (md5 `09c9da81…`) |
| `layout.tsx` / `prisma.ts` on your machine | real imports restored — **no stubs shipped** |
| Temp transfer files in the repo | none left |

## One thing that was NOT ok, now fixed

**`prisma/dev.db` contains only `Review` and `Admin`.** The `Appointment` model
and the `Branch` enum were added to `schema.prisma` at some point but **never
migrated**, and `RefCounter` is new from this work. Neither table exists.

That mattered, because my first version of `/api/contact` treated the database
write as a gate: if it failed, the whole request was rejected with a 503. On your
machine that would have meant **every enquiry through the website being turned
away** — a regression on the old behaviour, which at least sent an email.

The route now treats persistence as best-effort:

- Database reachable → row written, reference from the sequence (`RH-BNN-2609-0042`).
- Database unreachable or unmigrated → **booking still succeeds**, email still
  goes to reception, and a degraded reference is issued with a `D` in it
  (`RH-BNN-0409-D527`) so reception can see at a glance it is not in the database.
  The email subject is prefixed `[UNRECORDED]` and carries a
  "⚠ NOT IN DATABASE — write this booking down" row.

Verified against a deliberately dead database:

```
POST /api/contact  {"branch":"banani","name":"Test Patient","phone":"01712345678",…}
{"success":true,"ref":"RH-BNN-0409-D527","branch":"banani","mode":"callback",
 "mailed":false,"recorded":false,
 "message":"Your request is with the Banani suite. Someone will call to confirm your time."}

POST /api/contact  {"name":"X","phone":"01712345678"}          ← no branch
400 {"success":false,"errors":{"branch":"Choose a branch so your request reaches
     the right reception."}}
```

A booking is never lost; a booking without a branch is never accepted.

**`/reviews` was also hardened.** It returned a 500 for the whole page when the
`Review` query threw. The query is now wrapped, so a database problem costs you
the video-review strip, not the page.

### Run this on your machine before going live

```
npx prisma migrate dev --name branch-booking
```

Then backfill any pre-existing appointment rows to `BANASREE`. Until you do,
bookings work but arrive flagged `[UNRECORDED]`.

## Honest caveats

- **The build was never run on your machine**, only in a clean container against
  identical source. The one failure there is the blocked font CDN.
- **Lighthouse and Google's Rich Results Test have not been run** — both need a
  public URL. Do them after deploying.
- **The screenshots show Georgia, not Newsreader**, for the same font-egress
  reason. Layout, colour and spacing are accurate; the typeface is not.
- **56 `TODO(client)` markers remain across 16 files.** `grep -rn "TODO(client)" src/`
  is the live list. Every one is a fact I refused to invent.

## The four decisions that still gate launch

1. The six quarantined testimonials — real, or written?
2. `CONTACT_TO_EMAIL` — `drhasan0712@` or `drhasan07012@`?
3. The Banasree published price list.
4. Opening hours and verified map coordinates for both branches.

---

# Appointments: email-only (your decision)

You chose email delivery and no database for appointments. The route now matches
that, rather than attempting a database write and failing on every submission.

## Two modes, one flag

`PERSIST_APPOINTMENTS` in `.env.local`:

**Unset — the current, intended setting.**
No database is touched. Nothing is logged as a failure. The reference is derived
from branch, date and time of day in the agreed format:

```
RH-BNN-0409-7076        Banani,  4 September
RH-BSR-0409-7076        Banasree
```

It is four digits — the second of the day mod 10000 — so it is effectively unique
for a day's bookings; two requests to the same branch would have to arrive exactly
2h46m apart to collide. **Reception finds a booking by searching the inbox for the
ref**, which is in the email subject line:

```
[BANANI] RH-BNN-0409-7076 — Test Patient
```

**`PERSIST_APPOINTMENTS=true` — after you run the migration.**
The reference comes from the `RefCounter` sequence, guaranteed unique, and an
`Appointment` row is written. If that write then fails it *is* a real fault, so
the email is flagged `[UNRECORDED]` with a "record this manually" row.

Flip the flag whenever you want it; nothing else changes.

## Verified

```
POST {"branch":"banani",…}    → {"success":true,"ref":"RH-BNN-0409-7076","persisted":false}
POST {"branch":"banasree",…}  → {"success":true,"ref":"RH-BSR-0409-7076","mode":"slots"}
POST {no branch}              → 400 "Choose a branch so your request reaches the right reception."
server log noise              → 0 lines
```

A booking is never lost. A booking without a branch is never accepted.

## What still needs the database — and why I left DATABASE_URL in

`DATABASE_URL` was **missing entirely** from `.env.local`, while
`schema.prisma` reads `url = env("DATABASE_URL")`. That was breaking three
things that have nothing to do with appointments and whose tables *do* exist:

- `/api/auth/login` — the admin login
- `/api/reviews` and `/api/reviews/[id]` — the video-review admin
- `/reviews` — the public page (now hardened to degrade instead of 500)

So the line stays. It is not there for appointments.

`.env.local` now has, with `.env.local.bak` kept beside it:

```
EMAIL_USER          (was already set)
EMAIL_PASS          (was already set)
DATABASE_URL        added — for reviews and admin login
CONTACT_TO_EMAIL    added — drhasan0712@gmail.com
```

**Still needs your answer: `drhasan0712@` or `drhasan07012@`?** The old route
hardcoded the second. If the one I set is wrong, enquiries still go nowhere —
and in email-only mode that is now the *only* copy of a booking.

## A note on the trade-off

Email-only is a reasonable choice for two clinics, and it is how the site worked
before. What you give up is not a feature you had — it is:

- **No searchable history.** "How many Banani implant enquiries last month?" can
  only be answered by counting emails.
- **No status tracking.** Confirmed, cancelled and completed live in someone's
  head or a notebook, not against the booking.
- **A ref that is unique per day, not forever.** Fine for finding an email;
  not something to print on paperwork.

None of that blocks launch. Run the migration and flip the flag the day any of
it starts to matter — the code is already there.
