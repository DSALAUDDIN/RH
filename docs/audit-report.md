# RH Dental Care — Phase 1 Audit

**Date:** 2026-09-04
**Repo:** `J:\RH` · Next.js 16.2.1 (App Router, Turbopack) · React 19.2.4
**Scope:** Read-only. **No repository file was modified.**

---

## 0. How this audit was run, and what that limits

`npm run build` **cannot complete on the machine that holds the repo**. The
sandboxed Linux shell attached to `J:\RH` has no route to `fonts.googleapis.com`
(HTTP 403 at the egress proxy), and `layout.tsx` imports three fonts through
`next/font/google`, which fetches at build time. The build hangs there.

To produce real output rather than estimates, the repository **source** (all of
`src/`, `public/`, `prisma/`, config — 496 KB, no binaries) was copied to a clean
Linux container, `npm install` run fresh, and the build and production server run
there. Three substitutions were required to get past environment-only blockers.
None of them touch the code paths this audit reports on:

| Substitution | Why | Affects findings? |
|---|---|---|
| `next/font/google` replaced with a no-op | fonts.googleapis.com blocked | No. Does not change HTML body, metadata, or JSON-LD. |
| `src/lib/prisma.ts` replaced with a stub | `binaries.prisma.sh` blocked (403), `prisma generate` cannot download its engine | Only `/reviews`, which reads the DB. That route's 500 below is **inconclusive**. |
| Binary image assets replaced with 64×64 placeholders | 566 MB of media not transferred | No. Affects only measured image weight, which is reported separately from the real files. |

Everything else — every route, every `<title>`, every canonical, every JSON-LD
block, every H1 — is the real application output. `scripts/seo-audit.mjs` does
not exist (see §7), so a bespoke crawler was written against the running server.

**All shell output quoted below is verbatim.**

---

## SEVERITY P0 — the site is telling Google not to index itself

### P0-1. 12 routes declare the homepage as their canonical URL

This is the finding. It outranks everything else in the brief, and it is a
complete explanation for problem #3 ("invisible to search").

`src/app/layout.tsx:104` sets `alternates: { canonical: '/' }` on the root
metadata object. In the App Router, `alternates` is **inherited** by any route
that does not declare its own. Eight routes declare one. The rest inherit `/`.

```
route              status  canonical emitted
/                  ok      https://www.rhdentalcare.com
/about             ok      https://www.rhdentalcare.com/about
/team              ok      https://www.rhdentalcare.com/team
/team/dr-hasan     WRONG   https://www.rhdentalcare.com/team
/team/dr-shimia    WRONG   https://www.rhdentalcare.com/team
/dr-hasan          WRONG   https://www.rhdentalcare.com
/dr-shimia         WRONG   https://www.rhdentalcare.com
/banani            WRONG   https://www.rhdentalcare.com
/banasree          WRONG   https://www.rhdentalcare.com
/contact           ok      https://www.rhdentalcare.com/contact
/services          ok      https://www.rhdentalcare.com/services
/specialties       WRONG   https://www.rhdentalcare.com
/treatments        ok      https://www.rhdentalcare.com/treatments
/implants          ok      https://www.rhdentalcare.com/implants
/orthodontics      ok      https://www.rhdentalcare.com/orthodontics
/root-canal        ok      https://www.rhdentalcare.com/root-canal
/dental-surgery    WRONG   https://www.rhdentalcare.com
/digital-dentistry WRONG   https://www.rhdentalcare.com
/zirconia-crown    WRONG   https://www.rhdentalcare.com
/zirconia-veneers  WRONG   https://www.rhdentalcare.com
/kids-care         WRONG   https://www.rhdentalcare.com
/special-child     WRONG   https://www.rhdentalcare.com
/blog              ok      https://www.rhdentalcare.com/blog
/dental-tourism    WRONG   https://www.rhdentalcare.com
```

A `rel=canonical` pointing elsewhere is a direct instruction to Google: *this URL
is a duplicate, index the other one instead*. `/banani` — the page the entire
Banani positioning depends on — is currently asking to be dropped from the index
in favour of the homepage. So are both doctor pages, four treatment pages, and
the dental-tourism page.

**Fix:** delete `canonical: '/'` from the root layout's `alternates` and set an
explicit canonical on every route. Never rely on inheritance for canonicals.

### P0-2. The branch pages are also missing from the sitemap

`sitemap.ts` is a hand-maintained array. It lists 21 URLs plus blog posts.
Absent:

```
/banani            /dr-hasan          /zirconia-crown
/banasree          /dr-shimia         /zirconia-veneers
/dental-surgery    /team/dr-hasan     /kids-care
/digital-dentistry /team/dr-shimia    /special-child
```

Both branch pages and both doctor pages are simultaneously canonicalised away
**and** omitted from the sitemap. There is no path by which Google discovers
them as independent entities. Combined with P0-1, this is the whole of problem #3.

`/reviews` is listed in the sitemap but currently returns 500 (see P1-6).

**Fix:** derive the sitemap from a route manifest, not a hand-written list, so a
new page cannot be forgotten.

### P0-3. A fabricated `aggregateRating` is in the source

`src/app/reviews/page.tsx:21-24`

```
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '200',
      },
```

Hardcoded, not from any API. `5.0` from `200` reviews is not what either Google
listing shows. This is exactly the structured-data-policy violation the brief
names, and it puts every rich result the site could earn at risk. It must come
out before anything else ships. It is the only `aggregateRating` in the repo.

### P0-4. Six named patient testimonials appear to be written, not collected

`src/components/Testimonials.tsx:23-70+` contains six review objects with full
names (Sayed Anwar, Farzana Rahman, Rakibul Islam, Tasnim Akter, Mahadi Hasan,
Nusrat Jahan), 5-star ratings, "Local Guide · 32 reviews" credibility badges,
relative timestamps ("2 weeks ago"), and a rendered Google logo. The component
ends at line 144 with *"Read all 500+ Reviews on Google"*.

`src/app/dental-tourism/DentalTourism.tsx:1349` and `:1355` carry two pull-quotes
both attributed to *"— Walid M. · London · verified Google review"*.

If these are real reviews copied from a live listing, that needs to be stated and
sourced. If they were written for the site, this is fabricated social proof
attributed to named individuals presented as verified Google reviews — the most
serious exposure on the site, well beyond an SEO problem.

**This is a decision for you, not a code change I will make unilaterally.**
I need a yes/no per testimonial: real, or written? Anything not verifiable
against a live listing has to be removed, not softened.

### P0-5. The contact form emails an address that looks like a typo

`src/app/api/contact/route.ts:30`

```
      to: 'drhasan07012@gmail.com', // Sending the form to the main clinic email
```

The address given in the brief and used throughout `branches.ts` is
`drhasan0712@gmail.com`. The route sends to `drhasan**07012**@gmail.com` — an
extra `0`. If that mailbox does not exist, **every consultation request submitted
through the website has been bouncing or vanishing.** Please confirm which
address is correct before anything else. This is a revenue bug, not an SEO one.

### P0-6. A placeholder phone number is live on the About page

`src/app/about/page.tsx:225` and `:659`

```
            <a href="tel:+8801234567890" className="ab-btn-glass">
```

`+8801234567890` is a template placeholder. Two "Call Now" buttons on the About
page dial it.

---

## SEVERITY P1 — structural

### P1-1. Server rendering is **fine**. The brief's stated cause is not what is happening.

The brief predicted content missing from initial HTML because of a `'use client'`
boundary too high in the tree. **That is not the case here, and I want to be
direct about it rather than confirm it politely.**

`'use client'` does not remove a component from the server-rendered HTML. Next.js
still SSRs client components on first request. Content only goes missing when
something defers rendering to the browser — `dynamic(..., { ssr: false })`, a
`mounted` state gate, or render-on-intersect. Grepping for all three:

```
===== dynamic ssr:false =====
(no matches)
===== mounted/hydration gates =====
./components/branch/BranchProvider.tsx:45:    if (typeof window !== 'undefined') {
./components/branch/BranchProvider.tsx:59:    if (typeof window !== 'undefined') {
```

Both matches are inside event callbacks, not render paths. And the HTML confirms
it — every route ships its body text:

```
route              titleLen descLen canon  og  h1  words
/                        56     281     Y  11   1   1336
/about                   81     163     Y   7   1   2023
/team                    95     182     Y   7   1    447
/banani                  79      79     Y  11   1    280
/banasree                84     139     Y  11   1    351
/contact                 76     122     Y   7   1    256
/implants                96     243     Y   7   1   1338
/orthodontics            89     226     Y   7   1    981
/root-canal             107     206     Y   7   1   1050
/treatments              72     176     Y   7   1    738
/dr-hasan                74     108     Y  11   1    473
/dr-shimia               66      62     Y  11   1    374
/dental-tourism          70     212     Y   3   1   3808
/reviews                ERR HTTP 500
```

`words` is text extracted from the initial HTML with scripts and styles stripped.
A crawler that executes no JavaScript reads all of it.

**There is a real rendering problem, but it is a different one — see P1-2.**

### P1-2. Two H1s render at `opacity: 0` in the initial HTML

```
== /implants
<h1 class="imp-hero-title" style="opacity:0;transform:translateY(40px)">Dental
== /about
<h1 class="ab-hero-title" style="opacity:0;transform:translateY(40px)">Your Smile is
```

Framer Motion writes its initial state inline. Googlebot renders JS and will see
these, but it is a genuine risk with AI answer engines and non-rendering
crawlers, and it is an unambiguous LCP penalty — the largest text block on the
page paints only after hydration. The pattern is broad: `whileInView` /
`IntersectionObserver` appears in 20 files.

**Fix:** animate from `opacity: 0.001` upward, or gate the entrance animation on
`prefers-reduced-motion` and let the hero render solid. Never hide an H1.

### P1-3. Every route is dynamically rendered. Nothing prerenders.

```
Route (app)
┌ ƒ /
├ ƒ /about
├ ƒ /banani
├ ƒ /banasree
...
○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

Only `/robots.txt`, `/sitemap.xml` and `/icon.jpg` are static. Every content page
is `ƒ`.

The cause is `await cookies()` in the root layout (`layout.tsx:451`) — reading a
cookie in the root opts the entire application out of static generation. That is
the direct consequence of the branch-cookie design in the brief, and it is worth
naming as a trade-off rather than a bug: it buys a correct no-flash first paint
and costs CDN caching and TTFB on every request for every page, including pages
that have nothing to do with branch.

**Recommendation for Phase 2:** keep the server cookie read, but move it out of
the root layout into a small `<Suspense>`-wrapped server component that only the
branch-sensitive parts consume, so the static shell of each page can still
prerender. If that proves awkward, the fallback is to accept dynamic rendering
and add explicit `revalidate` on the pages that do not depend on branch. I would
like your call on this before Phase 2.

### P1-4. Six routes share the homepage's title and description verbatim

```
/                    <title>RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh
/dental-surgery      <title>RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh
/digital-dentistry   <title>RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh
/zirconia-crown      <title>RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh
/zirconia-veneers    <title>RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh
/special-child       <title>RH Dental Care | Best Dental Clinic in Dhaka, Bangladesh
```

Same inheritance mechanism as P0-1: these five pages export no `metadata` at all,
so they take the root default (title 56 chars, description 281 chars). The
description is also 281 characters — 126 over the ~155 that gets displayed.

Other length problems: `/root-canal` title is 107 chars, `/services` 104,
`/implants` 96, `/team` 95 — all truncated in results. `/team/dr-shimia` and
`/dr-shimia` have 62-character descriptions, which is thin.

### P1-5. The structured data describes the branches twice, inconsistently

Every page emits the same 6-node `@graph` from `layout.tsx` (Organization,
Banasree, Banani, WebSite, Physician, FAQPage). The branches *are* separately
identified — `@id` `/banasree#clinic` and `/banani#clinic`, distinct addresses,
phones, geo and `priceRange` (`৳৳` vs `৳৳৳`). That part is sound.

The problems are duplication and drift:

1. **`src/components/JsonLd.tsx` is dead code.** It builds a near-identical
   dual-clinic graph and is imported by nothing. It also disagrees with the live
   graph — different `@type` arrays, different Banani longitude.
2. **`/banasree` emits a second `Dentist` node** (`banasree/page.tsx:31-54`)
   reusing the same `@id` as the layout's node, with a *different* longitude and
   a different opening-hours format. Two nodes, one `@id`, conflicting data.
3. **Banani's longitude differs between the three sources:** `90.4066`
   (`branches.ts:44`), `90.4046` (`layout.tsx`), `90.4066` again (`JsonLd.tsx`).
   At least one is wrong. Neither has been verified against the real listing.
4. **Banani's address differs:** `branches.ts` says "Level 7, B&B Empire, Plot
   116, Road 11, Banani" — matching your brief. `layout.tsx` says "Level 7 (B&B
   Empire), Plot 116, Road 11, **Block E**, Banani". "Block E" appears nowhere in
   the brief and looks invented.
5. **Opening hours are almost certainly invented.** `layout.tsx` gives Banani
   Sa–Th 15:00–22:00; `branches.ts:50` gives Banani Sa–Th **10:00–20:00**. Two
   different sets of hours for the same clinic in the same repo. Banasree's
   `dayOfWeek` array lists Saturday–Wednesday **and Friday** but omits Thursday,
   while the FAQ text says "Thu closed" — consistent, but I have no source for
   any of it.
6. **`sameAs` lists five social profiles** (`facebook.com/rhdentalcare`,
   `instagram.com/rhdentalcare`, `linkedin.com/company/rhdentalcare`,
   `youtube.com/@rhdentalcare`, `g.page/rhdentalcare`). If any of those handles
   is not actually yours, the schema is claiming an entity you do not control.
7. **`FAQPage` is emitted on every single route.** Ten questions, identical
   markup, on 24 pages. Google expects FAQPage on the page whose visible content
   answers those questions. It is also where two of the worst claims live
   (`layout.tsx:374`, and the phone numbers hardcoded at `:390`).

`/banasree` therefore emits 7 schema nodes with an internal `@id` collision;
every other page emits 6.

### P1-6. `/reviews` returns HTTP 500 — cause unconfirmed

```
===== /reviews error =====
500
⨯ TypeError: d.review.findMany is not a function
```

`d.review.findMany` is the stubbed Prisma client from §0, so **this failure is an
artefact of my environment, not proof the route is broken in production.** I am
flagging it rather than ignoring it because the route is in the sitemap, and if
the production SQLite database is empty or unreachable the same 500 would appear
for real. Please confirm `/reviews` loads on the live site.

---

## SEVERITY P2 — contact details, claims, performance

### P2-1. Hardcoded phone numbers and WhatsApp links outside `branches.ts`

Acceptance target for Phase 2 is
`grep -rn "01721\|01775\|wa.me" src/` matching only `branches.ts`. Current state:

| File | Line | Content |
|---|---|---|
| `app/about/page.tsx` | 225, 659 | `tel:+8801234567890` — **placeholder, see P0-6** |
| `app/contact/page.tsx` | 93, 110 | `tel:+8801775227902` |
| `app/contact/page.tsx` | 97 | `wa.me/8801775227902?text=…` |
| `app/contact/page.tsx` | 145, 162 | `tel:+8801721367622` |
| `app/contact/page.tsx` | 149 | `wa.me/8801721367622?text=…` |
| `app/layout.tsx` | 250 | `telephone: '+8801775227902'` (schema) |
| `app/layout.tsx` | 288 | `telephone: '+8801721367622'` (schema) |
| `app/layout.tsx` | 390 | both numbers + hours inside FAQ answer text |
| `app/treatments/page.tsx` | 615 | `01721-367622` |
| `app/treatments/page.tsx` | 639 | `01775-227902` |
| `app/banasree/page.tsx` | 78 | `Call 01775-227902` (display string) |
| `app/banasree/page.tsx` | 156 | `01775-227902` (display string) |
| `components/Footer.tsx` | 94 | `tel:+8801775227902` |
| `components/Footer.tsx` | 129 | `tel:+8801721367622` |

Fourteen call sites, three files that reception cannot attribute.
`components/branch/BranchChooser.tsx` and `app/banasree/page.tsx` build their
`tel:`/`wa.me` URLs *from* `branches.ts`, which is correct — they just do it with
raw anchors instead of `BranchCTA`, so they emit no analytics event.

**Good news on the "no fallback" rule:** `BranchCTA.tsx:69-76` and
`FloatingWhatsApp.tsx:23-32` both already open the picker when no branch is
resolved. Neither silently routes to Banasree. The bug in the brief's problem #1
exists only in the *static anchors* listed above, not in the new components.

### P2-2. Unsupported claims — full inventory with proposed rewrites

**Not changed. Your decision on each.** The two patient-count figures contradict
each other inside the same site (13k+ vs 5,000+), which is worse than either
number alone.

| File:line | Current | Proposed |
|---|---|---|
| `layout.tsx:41` | `RH Dental Care \| Best Dental Clinic in Dhaka, Bangladesh` | `RH Dental Care — Dental Clinic in Banani & Banasree, Dhaka` |
| `layout.tsx:47` | `…the #1 dental clinic in Dhaka… 13k+ happy patients. Book a free consultation today.` | `Two clinics in Dhaka: an appointment-only private suite in Banani and a full-service hospital in Banasree. Implants, orthodontics, endodontics and oral surgery by BMDC-registered specialists.` |
| `layout.tsx:126` | `#1 Dental Clinic in Dhaka, Bangladesh` (OG) | `Dental Care in Banani & Banasree, Dhaka` |
| `layout.tsx:146` | `The #1 dental clinic in Dhaka.` (Twitter) | mirror the OG line |
| `layout.tsx:374` | FAQ: `consistently rated as one of the top dental clinics… 13,000+ happy patients, a 5-star rating` | Replace the question. `"Is RH Dental Care the best dental clinic in Dhaka?"` is unanswerable and invites the comparison you lose. Use `"What is the difference between the Banani and Banasree branches?"` and answer it with the positioning. |
| `layout.tsx:58,65,94` | keywords `best dental clinic in Dhaka`, `best dental clinic in Banasree`, `best dental clinic in Bangladesh` | Delete the `keywords` array entirely — Google has ignored it since 2009, and it is the only place "best" survives as a machine-readable claim. |
| `about/layout.tsx:17` | `Dhaka's #1 dental clinic… 12+ years experience, 13k+ patients` | `Chief Consultant at RH Dental Care, Dhaka. BDS, MPH, BMDC Reg. 5169.` |
| `about/layout.tsx:20` | keyword `best oral surgeon Dhaka Bangladesh` | delete |
| `about/layout.tsx:30` | `About RH Dental Care \| #1 Dental Clinic in Dhaka` | `About RH Dental Care — Banani & Banasree, Dhaka` |
| `about/layout.tsx:32` | `12+ years, 13k+ happy patients` | `Two branches, one clinical team.` |
| `about/page.tsx:475` | stat card `5000+ Happy Patients` | Remove, or replace with something you can evidence: `TODO(client)` — do you have a patient-record count you are willing to stand behind? |
| `about/page.tsx:72` | stat `5000+ Happy Smiles` | same |
| `about/page.tsx:664` | `5,000+ Happy Patients` | same |
| `about/page.tsx:75,478,521` | `5,000+ sq ft` / `Total Area` | `TODO(client)` — real combined floor area, or delete |
| `banasree/page.tsx:123` | `across 5,000+ sq.ft of clinic space` | same |
| `dr-hasan/page.tsx:41`, `team/dr-hasan/page.tsx:41` | `5,000+ Smiles Restored` | `TODO(client)` or delete |
| `FamilyTrustSection.tsx:36` | `13k+` | delete the stat tile |
| `about/page.tsx:139` | `Pain-Free Guarantee` — *"we guarantee it"* | A guarantee of a clinical outcome is a claim you cannot honour and may not be permitted to make. `Comfort-focused protocols` + a factual description of the anaesthesia and sedation actually used. |
| `about/page.tsx:662`, `implants/page.tsx:565`, `contact/page.tsx:182`, `page.tsx:53` | `Painless Guarantee` badges (4 more) | same |
| `about/page.tsx:216,412,524` · `banani/page.tsx:8,22` · `contact/page.tsx:7,50` · `implants/page.tsx:338,435` · `digital-dentistry/page.tsx:365` · `dental-tourism/page.tsx:7` | `world-class` ×11 | Delete. It is filler and it is a superiority claim. Replace with the specific: name the system, the material, the visit count. |
| `implants/layout.tsx:12` | keyword `best dental implant clinic Dhaka` | delete |
| `implants/page.tsx:348` | package tag `Best Value` | `Most chosen`, or drop the tag |
| `DentalTourism.tsx:192,1093` | counters `13000+` `Happy patients` / `Patients treated` | delete |
| `DentalTourism.tsx:195` | `4.9 ★ Google rating` | `<ReviewBadge branch={…} />` — real value or nothing |
| `DentalTourism.tsx:575,1544,1569` | `★ 4.9 · 500+ Google reviews`, `500+ verified reviews`, `Read all 500+ Google reviews` | same. The link text must not state a count. |
| `DentalTourism.tsx:1349,1355` | two quotes, both `— Walid M. · London · verified Google review` | See P0-4. Remove unless verifiable. |
| `DentalTourism.tsx:251,259` | price comparison `$25,000 → $4,200`, `$65,000 → $9,800` | `TODO(client)` — where do the UK/US figures come from, and are the RH figures real quotes? |
| `DentalTourism.tsx:705` | `the same digital workflows as the best clinics in London or Zurich` | Name the workflow instead. |
| `DentalTourism.tsx:720` | `systems backed by 30+ years of clinical data` | `TODO(client)` — name the implant system and cite its own literature, or cut. |
| `Testimonials.tsx:144` | `Read all 500+ Reviews on Google` | `Read our Google reviews` |
| `reviews/page.tsx:21-24` | `aggregateRating 5.0 / 200` | **delete — P0-3** |
| `reviews/page.tsx:35,58` | `13,000+ happy patients… Dhaka's best dental clinic` | rewrite around what the listing actually shows |
| `team/layout.tsx:17` | `13k+ patients` | delete |
| `banani/page.tsx:19` | badge `Premium Dental Facility` | `Appointment-only · one patient at a time` |
| `banani/page.tsx:25` | `completely painless laser treatments, and a luxurious VIP environment` | violates the brief's own copy rules — "luxury", and an absolute painlessness claim |
| `banani/page.tsx:56` | facility `VIP Patient Lounge` | see §5 — the photographs contradict the framing |
| `banani/page.tsx:105` | `High Demand: Limited Slots Available` + pulsing dot | Manufactured scarcity. On a medical site this reads as pressure selling and undercuts the premium positioning it is meant to support. Delete. |
| `banani/page.tsx:49` | `100% infection control protocol` | No protocol is 100%. `Class-B autoclave sterilisation, single-use instrumentation where applicable` |
| `page.tsx:39,43` | `Stop Letting Dental Pain Hold You Back` / `Delaying treatment only makes it more painful and expensive` | Fear-based. Also the homepage's only CTA is a generic `/contact` link — no branch. |
| `kids-care/page.tsx:83` | `Expert Pediatricians` | Dentists, not pediatricians. Different profession — this is a factual error about credentials. `Paediatric dentistry specialists` |

Also `layout.tsx:47`, `:128` and `:438` advertise a **"free consultation"**. Your brief
says Banani charges a consultation fee. Three places on the site promise free.

### P2-3. Performance

Measured on the running production server (homepage):

```
13 script tags, uncompressed total: 873 KB
html size: 189 KB

largest built chunks:
       243 KB  .next/static/chunks/0t79qzy0qan4q.js
       221 KB  .next/static/chunks/0mmjnexqowcsm.js
       133 KB  .next/static/chunks/0o59ac8426icc.js
       119 KB  .next/static/chunks/01rtml.2zbrsk.js
       110 KB  .next/static/chunks/03~yq9q893hmn.js
```

- **189 KB of HTML on the homepage** is very heavy for 1,336 words. The cause is
  inline `style={{…}}` objects — `page.tsx` alone has ~40 — which cannot be
  cached, deduplicated, or minified across requests. This is also why the design
  tokens in the brief cannot currently take effect: the colours are inline
  literals (`#0ea5e9`, `#0f172a`, `#38bdf8`) that no CSS variable can override.
- **873 KB of uncompressed JS** on a page that is largely static text. Framer
  Motion, GSAP **and** `lucide-react` all ship; GSAP and Framer Motion overlap
  heavily in purpose.
- **23 raw `<img>` tags** across 8 files bypass `next/image` — no responsive
  `srcset`, no AVIF/WebP, no lazy loading, no dimensions (CLS). Both branch pages
  and all four doctor pages are in this list:
  `banani`, `banasree`, `dr-hasan`, `dr-shimia`, `team/dr-hasan`,
  `team/dr-shimia`, `kids-care`, `DentalTourism`. 20 other files do use
  `next/image` correctly.
- **Unoptimised source images.** `public/assets/tourism/img.png` is **13.8 MB**,
  `team.png` 8.4 MB, `dr_shaheen_nobg.png` 7.6 MB. `src/assets/Doctor_List/`
  holds several 8.6 MB PNGs, and several are **byte-identical duplicates** of
  files in `src/assets/doctors/` (37 MB + 38 MB, largely the same images).
- **`src/assets/Video/` is 449 MB** (`aboutScreen.mp4` 411 MB, `homeScreen.mp4`
  59 MB) and is referenced by nothing — all video now streams from Cloudinary.
  `public/*.mp4` (32 MB) and `public/sound.weba` (3.8 MB) are likewise unused or
  near-unused. This is dead weight in the repo and in every deploy.
- **Fonts:** three Google families (`Bricolage_Grotesque` with 5 weights,
  `Geist`, `Inter`). `display: 'swap'` is set correctly and there is a
  `preconnect` to googletagmanager but **not to `fonts.gstatic.com`**.
- **`AudioPlayer` renders on every page** (`LayoutWrapper.tsx:21`, outside the
  `isStandalone` guard, so it loads even on `/admin`) and calls
  `.play()` at `AudioPlayer.tsx:46` against a 3.8 MB `/sound.weba`.
  Autoplay audio on a medical site is a Lighthouse best-practices failure and,
  more to the point, is the opposite of the calm the Banani positioning sells.

### P2-4. Duplicate content: doctor pages exist twice

`/dr-hasan` (9,571 B) and `/team/dr-hasan` (9,566 B) are near-identical, as are
`/dr-shimia` and `/team/dr-shimia`. All four have wrong canonicals (P0-1), so
Google sees four URLs, none of which claims to be itself. Pick one pair, 301 the
other. **Flagging, not deleting — per rule 4.**

### P2-5. `ReelsGallery.tsx` is stock footage of other clinics

Four `mixkit.co` stock dental videos with Unsplash posters, presented as a reels
gallery. **It is imported by no page**, so it is not live. It should be deleted
rather than left as a temptation — but flagging first. It would also be blocked
by your own CSP (`media-src` does not allow `assets.mixkit.co`).

### P2-6. Security notes found along the way

- `middleware.ts:5` — `process.env.JWT_SECRET || 'fallback_secret_key_for_dev'`.
  If `JWT_SECRET` is unset in production, admin auth is signed with a secret
  that is in the public repo.
- `api/contact/route.ts:74` — user `message` is interpolated raw into the HTML
  email body, and `replyTo: email` is unvalidated.
- `api/contact/route.ts` — **no branch validation** (`branch` may be undefined
  and becomes `'Unspecified'`), **nothing is written to the database** despite
  the `Appointment` model existing, and **no server-side ref is generated**.
  Phase 4 will need all three.
- `middleware.ts` — Next 16 build warns: *"The `middleware` file convention is
  deprecated. Please use `proxy` instead."*

---

## 3. Crawlability — the one thing that is already correct

```
User-Agent: *
Allow: /
Disallow: /private/
Disallow: /api/
Disallow: /_next/

Host: https://www.rhdentalcare.com
Sitemap: https://www.rhdentalcare.com/sitemap.xml
```

No `noindex` anywhere in the codebase; root `robots` metadata sets
`index: true, follow: true` with `max-snippet: -1` and `max-image-preview: large`.
Google Search Console verification file present.

Two gaps: `Disallow: /_next/` blocks the JS and CSS Google needs to render the
page — it should be removed. And the brief says AI crawlers are explicitly
allowed; the current file has one wildcard rule and **no named rules for
`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended` or `OAI-SearchBot`**.
The wildcard permits them by default, but naming them is what makes the intent
legible. `/admin` and `/admin/dashboard` are not disallowed.

---

## 4. Files the brief says are in the repo but are not

Section 4 of the master prompt lists these as "already in the repo — wire these
in, do not rewrite". **Seven do not exist.** I assume a previous session was
interrupted partway.

| Path | Status |
|---|---|
| `src/lib/branches.ts` | **exists** — complete and good |
| `src/lib/branch-cookie.ts` | **exists** |
| `src/lib/reviews.ts` | **MISSING** — no live Google Places integration anywhere |
| `src/lib/schema.ts` | **MISSING** — schema is inline in `layout.tsx` |
| `src/app/robots.ts` | **exists** |
| `src/app/sitemap.ts` | **exists** |
| `src/app/tokens.css` | **MISSING** — see §5 |
| `src/app/banani/faq.ts` | **MISSING** |
| `src/components/JsonLd.tsx` | **exists but unused and divergent** (P1-5) |
| `src/components/ReviewBadge.tsx` | **MISSING** |
| `src/components/FAQ.tsx` | **MISSING** |
| `src/components/branch/BranchProvider.tsx` | **exists** — already wired in `layout.tsx` |
| `src/components/branch/BranchCTA.tsx` | **exists** — correctly opens picker, no fallback |
| `scripts/seo-audit.mjs` | **MISSING** — no `scripts/` directory |
| `public/assets/branches/banani/*.webp` | **MISSING** — no branch photography in the repo at all |
| `docs/banani-design-reference.html` | **MISSING** — no `docs/` directory |

Also already done, ahead of the plan: `BranchPickerSheet.tsx`,
`BranchChooser.tsx`, `FloatingWhatsApp` rewritten to use the picker, the Prisma
`Branch` enum + unique `ref` on `Appointment`, and the two branch CTAs in the
hero. Phase 2 is perhaps 60% complete already; Phase 4's schema work is done.

**The blocker for Phase 3 is `docs/banani-design-reference.html`.** It is the
stated source of truth for the Banani page structure. `identity-hub_8.html`
(139 KB) sits at the repo root — is that it under another name? Please confirm or
send the file.

---

## 5. Visual direction — where the code and the photographs disagree with the brief

**The design system described in §3 of the brief does not exist in the code.**

`src/app/tokens.css` is absent. `globals.css` defines a **clinical blue** ramp
(`--blue-500: #008cff` … `--primary: var(--blue-600)`) plus exactly two branch
accents:

```
  --rh-banani: #d97706; /* champagne / warm gold */
  --rh-banasree: #0284c7; /* teal / clinical blue */
```

None of `--rh-paper`, `--rh-ink`, `--rh-sage`, `--rh-brass` or `--rh-oak` exist.
Fonts are Bricolage Grotesque / Geist / Inter, not Newsreader / Karla / Hind
Siliguri — and there is **no Bengali font loaded at all**, although the schema
declares `আরএইচ ডেন্টাল কেয়ার` as an `alternateName`. Every page is currently
built on the blue system, much of it inline (P2-3), so introducing tokens is a
real refactor, not a variable swap. I need your go-ahead on scope before Phase 3.

### What the photographs actually show — three places the brief needs correcting

You asked me to tell you if the images contradict the description. They do, in
three ways, and the third matters most.

**1. The palette is warmer and more yellow than "sage".** The walls read as
pistachio/chartreuse under warm 2700–3000K LED, not the grey-green of
`--rh-sage #B4D1A8`. Metal is bright polished brass (table frames, sofa legs,
the ring pendant), not "muted olive-brass". Upholstery is two different
families — cool grey-blue in the panelled lounge, cream/beige in reception. The
tokens as written will render cooler and greyer than the actual rooms.

**2. The backlighting note is correct and if anything understated.** Cove strips
run the full ceiling perimeter in every room; the reception desk is under-lit;
the glass display shelves are edge-lit; the slatted oak columns have LED strips
buried in the reveals. "Elevation is a warm glow, never a grey drop shadow" is
exactly right, and it is the one instruction from §3 I would keep verbatim.

**3. The photographs do not support "no waiting hall", and the treatment room
does not show one patient at a time.**

- The reception photo shows a **three-seat sofa and two armchairs** facing the
  desk — that is a waiting area.
- One photo is a **separate panelled lounge with four armchairs** around a coffee
  table — that is also a waiting area, and a rather good one.
- The treatment room photo shows **two dental chairs in one room**, a patient
  under treatment, **and a second seating group with what appears to be another
  person waiting inside the same room.**

So the brief's strongest line — *"dental anxiety starts in the waiting room, and
there isn't one"* — is not true of the space as photographed, and `banani/page.tsx`
already advertises a "VIP Patient Lounge … while you wait", which contradicts it
from the other direction. Publishing "there is no waiting room" alongside a
photograph of the waiting room is the same failure mode as the 500+ reviews: any
patient who looks discounts everything else.

There is a true version of the same promise that is *better*, and the photographs
support it fully: **it does not look like a clinic.** Panelled walls, a table
lamp, a marble coffee table, a plant, a residential sofa — the reception could be
an apartment. That is credible, visible in the images, and does not depend on
operational claims I cannot verify.

**What I need from you:**
- Is Banani genuinely one-patient-at-a-time? The treatment room has two chairs.
- Is the second room a shared lounge, or private to one patient at a time?
- **The treatment-room photo contains an identifiable patient.** Do you have
  written consent to publish it? If not it should not go on the site, and I will
  not use it. It also shows an unmasked bystander in the operatory, which is a
  poor advertisement for infection control regardless of consent.

---

## 6. Consolidated `TODO(client)`

**Prices**
- Banani consultation fee, and package ranges for implants / veneers / ortho
- Banasree full published price list (currently only `/implants` and
  `/root-canal` carry prices; `/root-canal:411` shows `৳13,000`)
- `DentalTourism.tsx:251,259` — sources for the `$25,000 → $4,200` and
  `$65,000 → $9,800` comparisons
- Confirm: is a consultation free? Two places say so; the brief says Banani charges.

**Hours**
- Real opening hours for both branches. Currently three conflicting sets:
  `branches.ts:50` Banani Sa–Th 10:00–20:00; `layout.tsx` Banani Sa–Th
  15:00–22:00; FAQ text says Banasree 15:00–22:00 "Thu closed".

**Coordinates & address**
- Verified lat/lng for both branches. Banani has two different longitudes in the
  repo (`90.4066` vs `90.4046`).
- Confirm Banani address: is it "Block E"? That appears in `layout.tsx` only.
- Confirm Banasree email: `info@rhdentalcare.com` is used in schema and
  `branches.ts` but was not in your brief.
- **Confirm the contact-form recipient: `drhasan0712@` or `drhasan07012@`?** (P0-5)

**Credentials**
- Dr. B.M. Rafiqul Hasan: repo already carries BMDC Reg. 5169, BDS Sapporo Dental
  College, MPH City University, implant training in China/Korea/India, "12+
  years". Confirm each, and confirm we may publish the registration number.
- **Dr. Shimia Binte Taher has no qualifications anywhere in the repo.** Her page
  is 374 words with no BMDC number, degrees, or memberships.
- `kids-care:83` calls the team "Expert Pediatricians" — they are dentists.
  Confirm the correct specialty wording.
- Are the five `sameAs` social profiles in `layout.tsx` genuinely yours?

**Claim decisions** *(each needs a yes/no from you)*
- The six named testimonials in `Testimonials.tsx` and the two "Walid M." quotes
  in `DentalTourism.tsx` — **real or written?** (P0-4)
- Patient count: is there any number you can evidence? If not, all of `13k+`,
  `13,000+` and `5,000+` come out.
- Combined floor area: is `5,000+ sq ft` real?
- May I delete the `aggregateRating` block outright? (P0-3 — I recommend yes,
  today, ahead of everything else.)
- May I remove all five "Painless / Pain-Free Guarantee" badges?
- Do you have a Google Places API key for `ReviewBadge`? Without one it renders
  nothing, which is the correct behaviour but means the site shows no rating at
  all until the key exists.

---

## 7. Things in the brief I disagree with

**1. The stated cause of the SSR problem is wrong, and the real problem is
worse.** Content is *not* missing from the initial HTML, and `'use client'` was
never going to cause that (§P1-1). Meanwhile the actual reason the site is
invisible — twelve routes canonicalised to the homepage, both branch pages among
them, and neither in the sitemap — is not mentioned in the brief at all. If we
had spent Phase 1 hoisting `'use client'` boundaries we would have shipped a
refactor that changed nothing and left the canonical bug in place.

**2. "Content a crawler cannot read does not exist" is the right principle
pointed at the wrong target.** The version that bites here is: *a page Google is
told not to index does not exist.* I would reorder Phase 1's severity list to put
canonicals and sitemap coverage above server rendering.

**3. `scripts/seo-audit.mjs` should be built before Phase 2, not assumed.** It is
listed as existing and it does not. Every finding above came from a throwaway
script. Given the canonical bug was a one-line inheritance mistake that survived
into production, the audit script has more long-term value than most of Phase 3 —
it is what stops this recurring. I would like to write it as the first commit.

**4. The Phase 2 cookie design has a cost the brief does not price in.** Reading
the branch cookie in the root layout is what makes every route dynamic (§P1-3).
It is defensible, but it should be a decision you make knowingly, not a side
effect. My recommendation is in P1-3.

**5. "It does not feel like a clinic" is a better line than the brief's own
reasoning for it.** The brief justifies it with "there isn't a waiting room",
which the photographs contradict (§5). The claim survives; the justification has
to change, and it is stronger for it.

**6. Phase 4's booking work is partly built already** — the `Branch` enum and
unique `ref` are in `schema.prisma`. But `api/contact/route.ts` writes nothing to
the database at all. Worth confirming whether appointments were ever meant to
persist, or whether email is the whole system today.

---

## 8. Recommended order for what comes next

Nothing below has been done. Phase 2 does not start until you say so.

1. **Today, independent of any phase** — delete the `aggregateRating` (P0-3), fix
   or confirm the contact-form email address (P0-5), remove the
   `tel:+8801234567890` placeholder (P0-6). Three small commits, no design
   decisions, each reversible.
2. **Canonicals and sitemap** (P0-1, P0-2). One commit each. This is the highest
   ratio of search impact to effort in the entire brief.
3. **`scripts/seo-audit.mjs`**, asserting canonical-per-route, one H1, no
   `aggregateRating`, no hardcoded phone numbers, sitemap covers all routes. Wire
   it into `npm run build` so none of the above can regress.
4. **Your decisions on §6 and on the testimonials in P0-4**, which gate the copy
   work.
5. **Then Phase 2** as written, with the P1-3 question settled first.

---

*Audit performed against commit state of 2026-09-04. No repository file was
modified. One temporary archive, `J:\RH\.rh-code.tgz` (496 KB), was created to
transfer source to the build container — I do not have delete permission on that
folder, so please remove it, or say the word and I will request permission.*
