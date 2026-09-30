# Technical Audit — RH Dental Care & Implant Center
**Audit Date:** 2026-09-30  
**Auditor:** Senior Next.js / SEO / Performance Engineer  
**Repository:** `/Users/macbookprom1/Developer/web-app/RH`  
**Live Site:** `https://rhdentalcare.com`

---

## Baseline Build Status

| Check | Result |
|-------|--------|
| `npm run typecheck` | ✅ PASS (0 errors) |
| `npm run lint` | ✅ PASS (0 warnings) |
| `npm run build` | ✅ PASS (97/97 routes) |
| Known build warning | `DATABASE_URL` not set in local env — gracefully handled by `ReviewBadge` returning null |

---

## Framework & Architecture

- **Next.js 16.2.1** (App Router) · **React 19.2.4** · **TypeScript 5** · **Turbopack**
- **Node ≥ 20.9.0** (`.nvmrc`)
- **Prisma 6.19.3** (SQLite, reviews and admin only)
- **Framer Motion 12.38.0** + **GSAP 3.12.5** (animations)
- **Cloudinary 2.10.0** (admin image uploads)
- **Nodemailer 8.0.5** (contact form)
- All routes are dynamic (`ƒ`); only `/icon.jpg`, `/llms.txt`, `/manifest.webmanifest`, `/robots.txt`, `/sitemap.xml` are statically pre-rendered

---

## Critical Issues — Remediated in This Session

### 1. Unverified Absolute Claims (Medical/Ranking)

| Location | Old Claim | Status |
|----------|-----------|--------|
| `Specialties.tsx:128` | `Top-Ranked Dental Clinic in Dhaka` | ✅ Fixed → `Specialist Dental Care in Dhaka` |
| `Specialties.tsx:19` | `90% less radiation than traditional methods` | ✅ Fixed → removed from card |
| `specialties/[slug]/page.tsx:56` | `Ultra-accurate 360° diagnostics with 90% less radiation` | ✅ Fixed → `significantly lower dose than conventional CT` |
| `specialties/[slug]/page.tsx:63` | `90% less radiation than traditional CT scans` | ✅ Fixed → `Significantly lower dose than conventional medical CT` |
| `specialties/[slug]/page.tsx:142` | `Permanent solutions that feel like natural teeth` | ✅ Fixed → `Long-term tooth replacement…` |
| `specialties/[slug]/page.tsx:149` | `Restore your smile permanently…` | ✅ Fixed → `Restore your smile with precision-guided…` |
| `specialties/[slug]/page.tsx:153` | `Functions exactly like natural teeth` | ✅ Fixed → `Designed to look, feel and function naturally` |
| `specialties/[slug]/page.tsx:165` | `Lifetime implant guarantee` | ✅ Fixed → `Ask your clinician about implant longevity` |
| `specialties/[slug]/page.tsx:135` | `10-year guarantee` (zirconia) | ✅ Fixed → `Ask your clinician about longevity expectations` |
| `specialties/[slug]/page.tsx:170` | `Painless Root Canal Therapy` (title) | ✅ Fixed → `Microscope Root Canal Treatment` |
| `specialties/[slug]/page.tsx:181` | `Completely painless with advanced anesthesia` | ✅ Fixed → `Performed under local anaesthesia for your comfort` |
| `specialties/[slug]/page.tsx:185` | `95% long-term success rate` | ✅ Fixed → `High long-term success rates when well maintained` |
| `specialties/[slug]/page.tsx:195` | `5-year success guarantee` (root canal) | ✅ Fixed → `Ask your clinician about prognosis` |
| `specialties/[slug]/page.tsx:279` | `5+ years guarantee on veneers` | ✅ Fixed → `Ask your clinician about longevity` |
| `Hero.tsx:277` | `Same Day Crowns` (marquee) | ✅ Fixed → `Zirconia Smile Design` |
| `Hero.tsx:276` | `Invisalign & Braces` (unverified brand) | ✅ Fixed → `Clear Aligners & Braces` |
| `specialties/page.tsx:34` | `Permanent, natural-looking…` (implants) | ✅ Fixed → `Long-term, natural-looking…` |
| `specialties/page.tsx:90` | `CAD/CAM same-day restorations` | ✅ Fixed → `designed and milled in our on-site lab` |
| `Footer.tsx:46` | `state-of-the-art 3,500 sq.ft facility` | ✅ Fixed → removed conflicting figure |
| `about/page.tsx:119` | `5000+ sqft Total Area` stat | ✅ Fixed → removed (conflicts with footer's 3500 sqft) |

### 2. Public TODO/Editorial Notes Visible in Production HTML

| Location | Issue | Status |
|----------|-------|--------|
| `team/page.tsx:61` | `TODO(client):` rendered in public HTML | ✅ Fixed → wrapped in `<EditorialNote>` (dev-only) |

### 3. Homepage Service Order

**Required order:** Clear Aligner → Advanced Implant → Zirconia Smile Design → Microscopic Endodontics → Orthodontic Braces

**Previous order:** 3D Imaging → Orthodontic Braces → Zirconia → Advanced Implantology → Microscope Root Canal → Gum Care → Kids Care → Veneers → Tourism

✅ Fixed — `Specialties.tsx` `clinicsBanners` array reordered to match requirement

### 4. Entity / SEO Data

| Fix | Status |
|-----|--------|
| `site.ts` `sameAs: []` populated with verified Facebook URL | ✅ Fixed |
| Banasree geo coordinates updated from verified Google Maps link | ✅ Fixed (`23.7606878, 90.4299624`, `geoVerified: true`) |
| Banasree `mapLink` updated to include exact place coordinates | ✅ Fixed |
| Banasree `mapEmbed` updated to use full business name for better place matching | ✅ Fixed |

---

## Issues Requiring Client Confirmation

> Documented in `CLIENT-CONFIRMATION.md`

1. **Banani operating days** — `hoursVerified: false`, hours display suppressed in schema
2. **Banasree email address** — `undefined`, no public email displayed
3. **Banani geo coordinates** — approximate pin, `geoVerified: false`
4. **Google Place IDs** — both branches have `placeId: null`; needed for `ReviewBadge`
5. **Year founded** — 2014 confirmed by client; active in `site.ts`, JSON-LD schema (`foundingDate: "2014"`), Hero, Navbar, Footer, and About page
6. **Clinic floor area** — 3,500 sqft (footer) vs 5,000+ sqft (about page); both removed
7. **Dr. Nabil BMDC** — `bmdc: null` with TODO comment
8. **Dr. Tonima, Dr. Noton, Dr. Mim, Dr. Nusrat** — qualifications/photos missing
9. **Dr. Hreedy branch assignment** — conflicting (flyer: Banasree; roster: Banani)
10. **Dental tourism "5.0 ★★★★★ Verified Google reviews"** — hardcoded in DentalTourism.tsx line 2313; may become stale

---

## SEO Architecture Review

### Canonical Strategy ✅ Correct
- All pages call `pageMeta()` which explicitly sets canonical per-route
- Specialty pages with dedicated treatment pages (braces → `/orthodontics`, implants → `/implants`, etc.) set canonical to the treatment page via `SPECIALTY_CANONICAL` 
- Primary domain is `https://rhdentalcare.com`; `www.rhdentalcare.com` → 301 redirected to `https://rhdentalcare.com` in `next.config.ts`

### Robots.txt ✅ Correct
- `/api/` and `/admin/` blocked for all bots
- AI crawlers (GPTBot, Claude, Google-Extended, Perplexity) get same allow/disallow rules

### Sitemap ✅ Clean
- `ROUTES` array provides all static routes with priority and changeFrequency
- Specialty pages with canonical overrides excluded from sitemap (correct)
- Blog posts and ROSTER doctor pages generated dynamically
- Team doctor pages at `/team/[slug]` are generated via `generateStaticParams` from ROSTER

### Redirects ✅ Correct
- `/team/dr-hasan` → `/dr-hasan` (301)
- `/team/dr-shimia` → `/dr-shimia` (301)

### Schema / JSON-LD ✅ Correct
- Root layout injects `Organization + WebSite + MedicalClinic + Dentist` for both branches
- `geoVerified: false` branches correctly suppress coordinates from schema
- `hoursVerified: false` branches correctly suppress hours from schema
- `aggregateRating` intentionally excluded from static data

---

## Performance Observations

- **Framer Motion + GSAP both present**: GSAP is dependency-present but only FM is used for page animations. Consider removing GSAP if unused.
- **`dental-tourism/DentalTourism.tsx`** is 137KB — a single file component; consider lazy-loading sections
- Images use `next/image` with AVIF/WebP and `quality={90}` — correct
- GA4 loaded `afterInteractive` — correct, non-blocking
- No render-blocking fonts — Bricolage/Geist/Inter/Hind Siliguri all loaded via `next/font`

---

---

## Pass 2 Remediations (Final Completion Pass)

### 1. Header Branch Selector & Mobile Navigation
- Added desktop interactive custom dropdown (`.branch-header-dropdown`) displaying Banani Branch first and Banasree Branch second with badges, sub-descriptions, checkmarks, click-outside auto-close, and `Escape` key handling.
- Added mobile branch action buttons (`.mobile-branch-section`) directly in the slide-out menu with zero layout breakage or duplicate logos.

### 2. Team Display & Autoplay Elimination
- Replaced the infinite CSS marquee on `/about` with a responsive 3-column doctor grid (`.ab-team-grid`), ensuring all 13 clinicians are simultaneously visible and link directly to `/dr-hasan`, `/dr-shimia`, or `/team/[slug]`.
- Linked Dr. Hasan and Dr. Shimia hero cards on the homepage directly to `/dr-hasan` and `/dr-shimia`.

### 3. Comprehensive Clinical Claims Cleanup (2nd Pass)
- Qualified or removed unverified claims in `/root-canal`, `/special-child`, `/treatments`, `/services`, and `/dental-tourism`.

### 4. Hub Role Differentiation & Internal Linking
- Established clear functional separation: `/services` (Service Directory & CTAs), `/treatments` (Detailed Procedure Catalogue, Pricing, Schedules), `/specialties` (Clinical Departments). Added cross-navigation headers.
- Enhanced Doctor → Treatment → Branch cross-linking in `DoctorProfile.tsx` and treatment pages.

### 5. XML Sitemap & Domain Redirects
- Filtered `sitemap.ts` to exclude canonical-redirected specialty slugs, ensuring 100% of sitemap URLs are self-canonical and indexable.
- Added HTTP 301 permanent redirects in `next.config.ts` for `www.rhdentalcare.com`, `rhdentalcare.com.bd`, and `www.rhdentalcare.com.bd` to `https://rhdentalcare.com/:path*`.

---

## Internal Linking Status ✅ Resolved

| Item | Status | Resolution |
|------|--------|------------|
| Hero doctor cards | ✅ Fixed | Wrapped in `<Link>` to `/dr-hasan` and `/dr-shimia` |
| `/about` doctor list | ✅ Fixed | Replaced marquee with grid linking each doctor to their profile |
| `/treatments` | ✅ Fixed | All links verified canonical |
| Doctor → Treatment linking | ✅ Fixed | Procedure chips in `DoctorProfile.tsx` link directly to respective treatments |
| Treatment → Doctor linking | ✅ Fixed | Lead doctors and consultants cross-linked from treatment pages |
| Hub cross-linking | ✅ Fixed | Cross-links between `/services`, `/treatments`, and `/specialties` added |

---

## Route Inventory (All Verified Present)

All 39 routes confirmed in build output. No soft-404s detected.

```
/ /banani /banasree /blog /blog/[slug] /contact /dental-surgery /dental-tourism
/digital-dentistry /dr-hasan /dr-shimia /implants /kids-care /orthodontics
/reviews /root-canal /services /special-child /specialties /specialties/[slug]
/team /team/[slug] /treatments /zirconia-crown /zirconia-veneers /about
/admin /admin/dashboard
```

API routes: `/api/auth/login` `/api/contact` `/api/reviews` `/api/reviews/[id]` `/api/upload`

---

## Legacy Domain & Host Redirects ✅ Implemented

- `www.rhdentalcare.com` → 301 redirected to `https://rhdentalcare.com/:path*` in `next.config.ts`
- `rhdentalcare.com.bd` → 301 redirected to `https://rhdentalcare.com/:path*` in `next.config.ts`
- `www.rhdentalcare.com.bd` → 301 redirected to `https://rhdentalcare.com/:path*` in `next.config.ts`
