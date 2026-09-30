# Technical Fix Report — RH Dental Care & Implant Center
**Date:** 2026-09-30  
**Status:** COMPLETE (session 1 of 1)  
**TypeScript:** ✅ PASS · **Lint:** ✅ PASS · **Build:** ✅ PASS (97 routes)

All changes are minimal, targeted, and production-safe. No visual identity was altered. No new routes were created. No business data was fabricated.

---

## Summary of All Changes

### FIX-001 — `src/components/Specialties.tsx`
**Type:** Content / SEO / Claim qualification  
**Severity:** Critical

**Changes:**
1. **Line 128 (h2):** `Top-Ranked Dental Clinic in Dhaka` → `Specialist Dental Care in Dhaka`  
   *Reason: Absolute unverified superlative claim with no evidence in codebase.*
2. **Lines 19-92 (clinicsBanners):** Reordered service cards to match required homepage priority order:
   - Old order: 3D Imaging, Orthodontic Braces, Zirconia, Implants, Root Canal, Gum Care, Kids, Veneers, Tourism
   - New order: **Clear Aligner, Advanced Implant, Zirconia Smile Design, Microscopic Endodontics, Orthodontic Braces**, Gum Care, Kids, Veneers, Tourism
3. Slug paths fixed from relative `'root-canal'` to absolute `'/root-canal'` etc.
4. Removed `imagingImg` import (unused after 3D Imaging card removed from homepage carousel)
5. Minor copy improvements: qualified descriptions for new lead cards

---

### FIX-002 — `src/app/specialties/[slug]/page.tsx`
**Type:** Medical claim qualification  
**Severity:** Critical

All specialty card data (`specialtiesData`) revised:

| Entry | Changes |
|-------|---------|
| `3d-imaging` | Tagline: `90% less radiation` → `significantly lower dose than conventional CT`; benefit: same |
| `braces` | Tagline clarified; warranty `Retainer guarantee` → `Retainer included` |
| `zirconia` | Tagline: `gold standard in flawless crowns` → factual; description de-superlativized; warranty `10-year guarantee` → `Ask your clinician` |
| `implants` | Tagline: `Permanent solutions that feel like natural teeth` → `Long-term tooth replacement…`; description qualified; benefit `Functions exactly like natural teeth` → `Designed to look, feel and function naturally`; warranty `Lifetime implant guarantee` → `Ask your clinician` |
| `root-canal` | Title: `Painless Root Canal Therapy` → `Microscope Root Canal Treatment`; benefit `Completely painless` → `Performed under local anaesthesia for your comfort`; removed `95% long-term success rate`; warranty `5-year success guarantee` → `Ask your clinician` |
| `gum-care` | Minor copy softening; warranty changed to programme language |
| `kids-care` | `anxiety-free` → `comfortable`; `Fun introduction` → `Friendly introduction` |
| `aesthetics` | Description: `porcelain veneers` → `zirconia veneers` (matching actual service); benefit updated; warranty `5+ years guarantee` → `Ask your clinician` |
| `dental-tourism` | Description de-hyped; `Private VIP airport pickup` → `Private airport pickup`; `global warranty` removed |

---

### FIX-003 — `src/components/Hero.tsx`
**Type:** Content / Claim qualification  
**Severity:** High

Hero marquee strip updated:
- `Invisalign & Braces` → `Clear Aligners & Braces` *(Invisalign is a brand not confirmed as a specific product offering)*
- `Aesthetic Veneers` → `Zirconia Smile Design` *(matches actual signature service)*
- `Same Day Crowns` → `Digital Lab On Site` *(removes unverified same-day guarantee claim)*

---

### FIX-004 — `src/app/team/page.tsx`
**Type:** Editorial content / Production safety  
**Severity:** High

- Added `import EditorialNote` 
- Wrapped the `TODO(client):` note in `<EditorialNote>` component, which returns `null` in production
- Changed internal language from `TODO(client):` to `REQUIRES CLIENT CONFIRMATION:` for clarity

*Result: The editorial note is now invisible to all users and search bots in production.*

---

### FIX-005 — `src/app/about/page.tsx`
**Type:** Conflicting unverified data  
**Severity:** High

- Removed `{ val: 5000, suf: '+ sqft', label: 'Total Area' }` from `heroStats`
- *Reason: Conflicts with footer's "3,500 sq.ft" figure; neither is verified; both removed*
- Changed internal code comment from `TODO(content)` to `REQUIRES CLIENT CONFIRMATION` for clarity

---

### FIX-006 — `src/components/Footer.tsx`
**Type:** Conflicting unverified data  
**Severity:** High

- Replaced footer description: `"Advanced aesthetics, oral surgery, digital dentistry & implants in a state-of-the-art 3,500 sq.ft facility."` 
- New copy: `"Specialist dental care in Dhaka — dental implants, microscope root canals, clear aligners and zirconia restorations at two branches staffed by the same clinical team."`
- *Reason: The 3,500 sq.ft figure conflicts with the about page's 5,000+ sq.ft; accurate floor area unknown*

---

### FIX-007 — `src/config/site.ts`
**Type:** SEO / Entity reconciliation  
**Severity:** Medium

- `sameAs: []` → `sameAs: ['https://www.facebook.com/share/18YJPadCbX/']`
- *Reason: The Facebook URL was already in Footer.tsx, confirming it's a controlled, real page. Adding it to sameAs improves entity reconciliation in Google's Knowledge Graph.*

---

### FIX-008 — `src/lib/branches.ts`
**Type:** SEO / Structured data  
**Severity:** Medium

- Updated Banasree `geo` coordinates from approximate `{ lat: 23.7634, lng: 90.4321 }` to verified `{ lat: 23.7606878, lng: 90.4299624 }`
- Set `geoVerified: true` *(source: Google Maps place link extracted from `/reviews/page.tsx`)*
- Updated `mapLink` to use the full Google Maps place URL with coordinates
- Updated `mapEmbed` to use full business name "RH Dental Care and Implant Center" for better Google place matching

*Result: Banasree branch will now have geo coordinates published in its `MedicalClinic/Dentist` JSON-LD schema.*

---

### FIX-009 — `src/app/specialties/page.tsx`
**Type:** Content / Claim qualification  
**Severity:** Medium

- Implants description: `Permanent, natural-looking…` → `Long-term, natural-looking…`
- Digital dentistry: `CAD/CAM same-day restorations` → `CAD/CAM restorations designed and milled in our on-site lab`

---

### FIX-010 — `src/components/Navbar.tsx` & `src/components/Navbar.css`
**Type:** Accessibility / UX / Navigation  
**Severity:** Critical  
- Added desktop custom accessible dropdown menu (`#branch-header-dropdown`) showing Banani Branch (`/banani`) first and Banasree Branch (`/banasree`) second with badges, subheadings, and checkmark indicators.
- Added pointer click-outside detection and `Escape` keyboard dismissal.
- Added direct touch-friendly action links on mobile navigation (`.mobile-branch-buttons`) with clear descriptions.
- Preserved cookie persistence and branch context synchronization without duplicate logos.

---

### FIX-011 — `src/components/Hero.tsx`
**Type:** UX / Internal Linking  
**Severity:** High  
- Converted Dr. Hasan and Dr. Shimia hero cards from unlinked divs into Next.js `<Link>` components targeting `/dr-hasan` and `/dr-shimia`.

---

### FIX-012 — `src/app/about/page.tsx` & `src/app/about/about.css`
**Type:** SEO / UX / Doctor Display (No Autoplay Slider)  
**Severity:** Critical  
- Replaced the infinite autoplay marquee (`ab-team-marquee-container`) with a responsive CSS Grid (`ab-team-grid`).
- All 13 clinical specialists are now immediately visible at once without being hidden in an animation.
- Each specialist card has an explicit `href` linking directly to their profile (`/dr-hasan`, `/dr-shimia`, `/team/[slug]`).

---

### FIX-013 — Clinical Claims Second Pass (`root-canal`, `special-child`, `treatments`, `services`, `dental-tourism`)
**Type:** Medical & Regulatory Compliance  
**Severity:** Critical  
- `src/app/root-canal/page.tsx`: Qualified "virtually painless" → "profound local anaesthesia for your comfort"; "can last a lifetime" → "long-lasting function"; removed unverified "95% success rate"; "Painless Under Local Anaesthesia" → "Comfort Under Local Anaesthesia"; "not just pain-free" → "gentle, comfort-focused".
- `src/app/special-child/page.tsx`: "Pain-free and stress-free treatment" → "Comfort-focused and stress-free treatment".
- `src/app/treatments/page.tsx`: "Advanced permanent tooth replacement" → "Advanced long-term tooth replacement"; "Same-day implant placement" → "Immediate implant placement and provisional attachment where clinically indicated".
- `src/app/services/page.tsx`: "Replace missing teeth permanently" → "Replace missing teeth with long-term implant solutions"; "deliver dramatically brighter results" → "deliver visibly brighter results".
- `src/app/dental-tourism/DentalTourism.tsx`: "Permanent" aftercare tag → "Follow-up"; "lifetime on Straumann" → "warranty options as specified by the implant maker"; "Same-Day Crowns" → "On-Site Milled Crowns"; "same-day restorations" → "precision CAD/CAM restorations".

---

### FIX-014 — Doctor → Treatment → Branch Contextual Linking
**Type:** SEO / Information Architecture / Internal PageRank  
**Severity:** High  
- `src/components/DoctorProfile.tsx`: Added `getProcedureHref()` helper; procedure tags now link directly to `/implants`, `/root-canal`, `/orthodontics`, `/zirconia-crown`, `/zirconia-veneers`, `/kids-care`, `/dental-surgery`, `/digital-dentistry`.
- `src/app/implants/page.tsx`: Linked Dr. Hasan (`/dr-hasan`) and branch availability (`/banani`, `/banasree`).
- `src/app/root-canal/page.tsx`: Linked Dr. Shimia (`/dr-shimia`) and branch availability (`/banani`, `/banasree`).
- `src/app/orthodontics/page.tsx`: Linked consultant orthodontists (`/team/dr-jeamima-tabassum-barsha`, `/team/dr-nishat-tamanna-alam`, `/team/dr-nabil-rahman`) and branch availability.

---

### FIX-015 — Services / Treatments / Specialties Differentiation
**Type:** Technical SEO / IA / Canonical Protection  
**Severity:** High  
- Defined clear conceptual roles:
  - `/services`: Patient Service Directory (concise overview, key highlights, quick booking).
  - `/treatments`: Detailed Treatment Catalogue & Decision Hub (pricing, multi-visit schedules, concerns filter).
  - `/specialties`: Specialist Clinical Departments Hub (department overviews).
- Added bidirectional cross-navigation in the hero sections of all three hubs.

---

### FIX-016 — `src/app/sitemap.ts` & `next.config.ts`
**Type:** Technical SEO / Indexation  
**Severity:** Critical  
- Filtered `SPECIALTY_SLUGS` in `sitemap.ts` to exclude all slugs present in `SPECIALTY_CANONICAL`. Non-canonical pages (`/specialties/implants`, etc.) are now completely omitted from `sitemap.xml`.
- Added HTTP 301 redirect handlers in `next.config.ts` for `www.rhdentalcare.com`, `rhdentalcare.com.bd`, and `www.rhdentalcare.com.bd` pointing to `https://rhdentalcare.com/:path*`.

---

## Files Changed Across Passes (Complete List)

| File | Change Type |
|------|-------------|
| `src/components/Specialties.tsx` | Service order + heading claim + copy |
| `src/app/specialties/[slug]/page.tsx` | All specialty medical claims |
| `src/components/Hero.tsx` | Marquee claims + doctor card links |
| `src/app/team/page.tsx` | TODO wrapped in EditorialNote |
| `src/app/about/page.tsx` | Conflicting sqft removed + doctor marquee replaced with grid |
| `src/app/about/about.css` | `.ab-team-grid` responsive styles |
| `src/components/Footer.tsx` | Conflicting sqft claim removed |
| `src/config/site.ts` | sameAs populated |
| `src/lib/branches.ts` | Banasree geo verified + map links |
| `src/app/specialties/page.tsx` | Claim qualifications + cross-hub links |
| `src/components/Navbar.tsx` | Accessible Choose Branch dropdown + mobile links |
| `src/components/Navbar.css` | Header branch dropdown & mobile styles |
| `src/components/DoctorProfile.tsx` | Procedure links to treatment pages |
| `src/app/implants/page.tsx` | Doctor & branch links |
| `src/app/root-canal/page.tsx` | Claims qualified + doctor & branch links |
| `src/app/orthodontics/page.tsx` | Orthodontist & branch links |
| `src/app/services/page.tsx` | Claims qualified + metadata & cross-hub links |
| `src/app/treatments/page.tsx` | Claims qualified + cross-hub links |
| `src/app/dental-tourism/DentalTourism.tsx` | Claims qualified (warranty, CAD/CAM crowns) |
| `src/app/special-child/page.tsx` | Claim qualified (comfort-focused) |
| `src/app/sitemap.ts` | Exclude canonicalized specialty pages from sitemap |
| `next.config.ts` | Added `.com.bd` 301 redirects |

---

## Verification After Final Pass

```
npm run typecheck  →  0 errors ✅
npm run lint       →  0 errors, 0 warnings ✅
npm run build      →  97 routes, build success ✅
```
