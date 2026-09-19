# SEO guide

How search-related output is generated, and where to make changes. Everything
below is code-driven: there are no hand-maintained sitemaps or JSON-LD blocks.

## At a glance

| Concern                  | Source of truth                         | Output                          |
| ------------------------ | --------------------------------------- | ------------------------------- |
| Site identity            | `src/config/site.ts`                    | Titles, OG, schema, manifest    |
| Page titles/descriptions | `pageMeta()` call in each route         | `<title>`, meta, OG, Twitter    |
| Canonical + hreflang     | `pageMeta()` (`path`, `canonical`)      | `<link rel=canonical/alternate>`|
| Indexable URLs           | `src/lib/seo/routes.ts` (`ROUTES`)      | `/sitemap.xml`, `/llms.txt`     |
| Redirects                | `src/lib/seo/routes.ts` (`REDIRECTS`)   | 308 via `next.config.ts`        |
| Structured data          | `src/lib/seo/schema.ts`                 | JSON-LD `@graph` per page       |
| Branch NAP data          | `src/lib/branches.ts`                   | Pages, CTAs, `Dentist` schema   |
| Crawl rules              | `src/app/robots.ts`                     | `/robots.txt`                   |

## Metadata

Every route exports metadata through `pageMeta()`:

```ts
export const metadata = pageMeta({
  title: 'Dental Implants in Dhaka',          // brand suffix is added by the root template
  description: 'Implant treatment at ...',     // 120-155 characters
  path: '/implants',                            // canonical, self-referencing
  image: '/assets/implants/og.webp',            // optional, falls back to the site default
});
```

`pageMeta()` sets the canonical, `en-BD` and `x-default` hreflang, Open Graph
and Twitter tags in one place. The root layout deliberately sets no canonical,
so nothing is inherited by accident.

Options worth knowing:

- `canonical`: consolidate a page into another URL (used by specialty pages that
  duplicate a treatment page).
- `noindex`: keep a page out of the index while still passing link equity.
- `type: 'article'` with `publishedTime` / `modifiedTime`: used by blog posts.
- `type: 'profile'`: used by clinician pages.

Client-component pages (`'use client'`) cannot export metadata; their metadata
lives in the sibling `layout.tsx`.

## Adding a page

1. Create `src/app/<slug>/page.tsx` and export `metadata = pageMeta({...})`.
2. Add a JSON-LD breadcrumb: `<JsonLd nodes={[breadcrumbs({ name, path })]} />`.
3. Register the path in `ROUTES` (`src/lib/seo/routes.ts`). This adds it to the
   sitemap and `llms.txt`, and puts it under the audit.
4. Run `npm run build && npm start`, then `npm run seo:audit`.

Renaming or removing a URL: add a `REDIRECTS` entry (permanent) before
deleting the route.

## Structured data

All JSON-LD is built in `src/lib/seo/schema.ts` and rendered by
`<JsonLd>` as a single `@graph`. Entities reference each other by `@id`:

| Entity             | `@id`                                         | Emitted on          |
| ------------------ | --------------------------------------------- | ------------------- |
| MedicalOrganization| `https://www.rhdentalcare.com/#organization`  | every page (layout) |
| WebSite            | `https://www.rhdentalcare.com/#website`       | every page (layout) |
| Dentist (Banani)   | `https://www.rhdentalcare.com/banani#clinic`  | every page (layout) |
| Dentist (Banasree) | `https://www.rhdentalcare.com/banasree#clinic`| every page (layout) |
| Physician          | `https://www.rhdentalcare.com/<slug>#physician`| clinician pages    |
| Procedure          | `<page url>#procedure`                        | treatment pages     |
| MedicalWebPage     | `<page url>#webpage`                          | treatment pages     |
| BlogPosting        | `<page url>#article`                          | blog posts          |
| FAQPage            | n/a                                           | pages with an FAQ   |
| BreadcrumbList     | n/a                                           | all non-home pages  |

Rules:

- Opening hours and geo coordinates are only published when marked verified in
  `branches.ts` (`hoursVerified`, `geoVerified`).
- `aggregateRating` is never hardcoded. It may only come from a live Google
  Places response (`src/lib/reviews.ts`).
- FAQ answers must be visible on the page that emits the `FAQPage`. Shared FAQ
  sets render with `emitSchema={false}` everywhere except one page.
- `sameAs` (`src/config/site.ts`) should list only profiles the clinic owns.
- `MedicalWebPage.reviewedBy` / `lastReviewed` should be added only after a
  clinician has actually reviewed the page.

## Specialty pages

`/specialties/<slug>` overlaps several dedicated treatment pages. Overlapping
slugs canonicalise to the treatment page and are omitted from the sitemap
(`SPECIALTY_CANONICAL` in `routes.ts`):

| Specialty page                 | Canonical         |
| ------------------------------ | ----------------- |
| `/specialties/braces`          | `/orthodontics`   |
| `/specialties/zirconia`        | `/zirconia-crown` |
| `/specialties/root-canal`      | `/root-canal`     |
| `/specialties/kids-care`       | `/kids-care`      |
| `/specialties/implants`        | `/implants`       |
| `/specialties/dental-tourism`  | `/dental-tourism` |

To let a specialty page rank independently, remove its entry and make its
content distinct. To retire one, move it to `REDIRECTS` instead.

## Crawling and indexing

- `robots.txt` allows everything except `/api/` and `/admin`. `/_next/` stays
  crawlable so Google can render pages.
- AI search crawlers are listed explicitly in `robots.ts` so each can be allowed
  or blocked individually.
- `/llms.txt` summarises the clinics and key pages for AI assistants.
- The apex domain (`rhdentalcare.com`) redirects to `https://www.rhdentalcare.com`.
- Duplicate URLs `/team/dr-hasan` and `/team/dr-shimia` redirect to the
  clinician pages.

## Content in progress

Answers or figures the clinic has not confirmed are never published:

- FAQ items carry a `pending` note and an empty or partial `a`. Items with an
  empty answer are not rendered and are excluded from `FAQPage` markup.
- Page-level placeholders use `<EditorialNote>`, which renders in development
  only.

The full list is in [content-gaps.md](content-gaps.md).

## Audit

```bash
npm run build && npm start
npm run seo:audit                                        # local build
npm run seo:audit -- --base=https://www.rhdentalcare.com # production
```

Checks: HTTP status, canonical, hreflang, title/description length and
uniqueness, single visible H1, Open Graph/Twitter tags, `robots` meta, JSON-LD
validity and `@id` uniqueness, breadcrumbs, redirects, sitemap coverage,
visible editorial placeholders, unsupported marketing claims, image alt text
and thin content. The script exits with code 1 on any error.

External validation after deploys: Google Rich Results Test, Search Console
URL Inspection, PageSpeed Insights (mobile).

## Known technical trade-offs

- The root layout reads the branch cookie on the server so branch-specific UI
  renders without a flash. This makes routes dynamically rendered. If Core Web
  Vitals (TTFB) become a concern, move branch resolution to the client or to
  the proxy (`src/proxy.ts`) and let pages prerender.
- The dental tourism page loads its own Google Fonts stylesheet; consider moving
  those faces to `next/font` for self-hosting.
