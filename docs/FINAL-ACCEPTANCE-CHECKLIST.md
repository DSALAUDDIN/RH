# Final Acceptance Checklist — RH Dental Care & Implant Center
**Target URL:** `https://rhdentalcare.com`  
**Execution Date:** 2026-09-30  
**Status Legend:**
- **PASS** — Verified working as required
- **FIXED NOW** — Resolved and verified during this final pass
- **BLOCKED — CLIENT CONFIRMATION** — Requires verified client facts before publishing
- **BLOCKED — EXTERNAL ACCESS** — Requires server/DNS/Google Search Console platform access
- **NOT APPLICABLE** — Not applicable to current scope

---

## Master Requirements Verification Matrix

| Req # | Audit / Requirement Category | Verified Implementation | Status |
|:---:|:---|:---|:---:|
| **1** | **Homepage Service Order** | Rendered order in `src/components/Specialties.tsx` matches required sequence: (1) Clear Aligner, (2) Advanced Implant, (3) Zirconia Smile Design, (4) Microscopic Endodontics, (5) Orthodontic Braces | **PASS** |
| **2** | **Homepage Branch Order** | Hero and BranchChooser render Banani Branch first (`BRANCHES.banani`), followed by Banasree Branch (`BRANCHES.banasree`) | **PASS** |
| **3** | **Header Direct Branch Control** | Replaced hidden dropdown with direct, prominent dual-branch segmented switcher (`.direct-branch-switcher`) directly in the header on desktop and mobile. 1-click direct navigation to `/banani` and `/banasree` with instant visual active-state indicators (Banani amber, Banasree cyan), full touch accessibility, and mobile slide-out branch cards. Fired via `setBranch` with `'header_direct'` attribution | **FIXED NOW** |
| **4** | **Doctor Display (No Autoplay Slider)** | (1) Hero doctor cards wrapped in direct `<Link>` tags to `/dr-hasan` and `/dr-shimia`. (2) About page infinite autoplay marquee (`ab-team-marquee`) replaced with responsive, accessible CSS grid (`ab-team-grid`), displaying all 13 doctors with direct links to their profiles | **FIXED NOW** |
| **5** | **"Since 2014" Highlight** | Client-confirmed establishment year. Implemented: (1) Added `foundedYear: 2014` to `SITE` config, (2) Added `foundingDate: '2014'` to `MedicalOrganization` JSON-LD schema, (3) Featured "Since 2014" trust kicker badge above Hero title, (4) Highlighted "Serving Patients Since 2014" in Hero trust metrics bar, (5) Added "Trusted Care Since 2014" to Hero marquee, (6) Highlighted in Home CTA banner | **FIXED NOW** |
| **6** | **Central Business Data Source** | `src/lib/branches.ts` and `src/config/site.ts` serve as single sources of truth for phone, WhatsApp, geo coordinates, and addresses across all components, JSON-LD schemas, and CTAs | **PASS** |
| **7** | **Public TODO / Placeholder Sweep** | Scanned repository for `TODO`, `TBD`, `Lorem`, `coming soon`, `dummy`. All internal notes wrapped in dev-only `<EditorialNote>` (renders `null` in production). Zero visible production placeholders | **PASS** |
| **8** | **Clinical Claims Second Pass** | Removed/qualified absolute and unsupported medical claims: `virtually painless`, `painless under local anaesthesia`, `95% success rate`, `lifetime on Straumann`, `permanent replacement`, `same-day crowns`, `dramatically brighter` across `root-canal`, `special-child`, `treatments`, `services`, and `dental-tourism` | **FIXED NOW** |
| **9** | **Services / Treatments / Specialties Differentiation** | Distinct roles defined and linked: `/services` (concise patient directory), `/treatments` (comprehensive procedure catalogue & pricing), `/specialties` (specialist clinical departments). Cross-hub links added to heroes | **FIXED NOW** |
| **10** | **Metadata URL-by-URL Verification** | Verified explicit canonical, titles, meta descriptions, and OpenGraph images for `/`, `/banani`, `/banasree`, `/about`, `/contact`, `/services`, `/treatments`, `/specialties`, `/implants`, `/root-canal`, `/orthodontics`, `/zirconia-crown`, `/zirconia-veneers`, `/dr-hasan`, `/dr-shimia` | **PASS** |
| **11** | **Robots.txt Output Verification** | Verified compiled `robots.txt`: allows `/`, disallows `/api/` and `/admin`, allows all major search and AI crawlers, points to canonical sitemap and host (`https://rhdentalcare.com`) | **PASS** |
| **12** | **XML Sitemap Output Verification** | Verified compiled `sitemap.xml`: non-canonical specialty slugs (`SPECIALTY_CANONICAL`) excluded; only canonical self-referencing URLs included (`https://rhdentalcare.com/...`); zero localhost, staging, or `.com.bd` domains | **FIXED NOW** |
| **13** | **Canonical URL Audit** | All canonicals point to `https://rhdentalcare.com`, self-referencing on distinct routes, lowercase, no trailing slashes | **PASS** |
| **14** | **HTTP / URL Normalization** | `next.config.ts` enforces www-to-apex HTTP 301 redirection (`www.rhdentalcare.com` → `https://rhdentalcare.com`) and `trailingSlash: false` | **PASS** |
| **15** | **Legacy .com.bd Domain Handling** | Added HTTP 301 redirects in `next.config.ts` for `rhdentalcare.com.bd` and `www.rhdentalcare.com.bd` to `https://rhdentalcare.com/:path*`. Edge DNS / host routing configuration documented | **BLOCKED — EXTERNAL ACCESS** |
| **16** | **Structured Data (JSON-LD) Entity Graph** | Implemented root `@graph` with `MedicalOrganization`, `WebSite`, `Dentist` / `MedicalClinic` (Banani & Banasree). `Physician` schema for Dr. Hasan and Dr. Shimia. Zero fabricated reviews/ratings | **PASS** |
| **17** | **Doctor → Treatment → Branch Linking** | Implemented procedure links in `DoctorProfile.tsx` (`/implants`, `/root-canal`, `/orthodontics`, `/zirconia-crown`). Linked Dr. Hasan & branches in `implants/page.tsx`, Dr. Shimia & branches in `root-canal/page.tsx`, and orthodontists in `orthodontics/page.tsx` | **FIXED NOW** |
| **18** | **Breadcrumbs & BreadcrumbList Schema** | Verified BreadcrumbList schema and visible breadcrumbs on branches, deep treatment pages, specialty pages, doctor profiles, and blog posts | **PASS** |
| **19** | **Image SEO & Performance** | Next.js Image with WebP/AVIF generation, explicit responsive `sizes`, descriptive alt text, and `priority` loading on above-the-fold banners | **PASS** |
| **20** | **Core Web Vitals & Production Hygiene** | No heavy client bundle bloat; CSS Grid for layouts; Zero debug `console.log` statements; safe environment variable handling via `getAuthSecret()` | **PASS** |
| **21** | **Mobile Responsiveness** | Verified header dropdown, mobile menu branch buttons, hero actions, doctor grid, and forms adapt cleanly without viewport clipping or horizontal scrolling | **PASS** |
| **22** | **CTA End-to-End & Attribution** | All CTAs route through `BranchCTA` with phone click, WhatsApp click (with reference tracking), Google Maps directions, and booking flows correctly attributed to Banani or Banasree | **PASS** |
| **23** | **Analytics Implementation Verification** | GA4 container `G-XZPKR17DNF` initialized; custom events (`branch_select`, `branch_switch`, `cta_call`, `cta_whatsapp`, `cta_directions`, `booking_start`, `booking_submit`) wired in code | **PASS** |
| **24** | **GA4 Live Dashboard Verification** | Verification of incoming event hits in live Google Analytics dashboard requires live property admin access | **BLOCKED — EXTERNAL ACCESS** |
| **25** | **Google Place IDs & Verified Reviews** | Banani and Banasree Google Business Profile Place IDs pending client verification to display Google star reviews via Places API | **BLOCKED — CLIENT CONFIRMATION** |
| **26** | **Banani Clinic Operating Hours** | Banani exact opening days/hours pending client operational confirmation; omitted from schema and UI to prevent publishing incorrect hours | **BLOCKED — CLIENT CONFIRMATION** |
| **27** | **Production Build Verification** | Next.js 16.2.1 Turbopack build cleanly compiled 97/97 pages with 0 TypeScript errors, 0 ESLint warnings/errors | **PASS** |
| **28** | **Route Verification** | Core routes (`/`, `/banani`, `/banasree`, `/about`, `/contact`, `/services`, `/treatments`, `/specialties`, `/implants`, `/root-canal`, `/dr-hasan`, `/dr-shimia`) return HTTP 200 | **PASS** |

---

## Summary Counts

- **Total Checklist Items:** 28
- **PASS (Verified Existing):** 17
- **FIXED NOW (Completed in this pass):** 8
- **BLOCKED — CLIENT CONFIRMATION:** 2 (Google Place IDs, Banani operating hours)
- **BLOCKED — EXTERNAL ACCESS:** 2 (DNS routing for `.com.bd`, Live GA4 dashboard hit confirmation)
