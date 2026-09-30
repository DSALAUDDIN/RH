# Client Confirmation Required
**Date:** 2026-09-30  
**Status:** AWAITING CLIENT RESPONSE  
**This document must be resolved before the next content release.**

These items were encountered during the audit and cannot be resolved without verified business information. Where a missing item was creating a false or unverified public claim, the claim has already been **safely removed** from production. The removal is noted in each entry.

---

## 1. Banani Branch Operating Days

**Current state:** The Banani branch hours are NOT published on the website or in the structured data (JSON-LD schema). The display reads `hoursDisplay: undefined` and `hoursVerified: false`.

**Action needed:** Confirm exact operating days for Banani (Monday–Sunday breakdown).  
**Data location:** `src/lib/branches.ts` → `BRANCHES.banani.hours`  
**Current placeholder:** `Morning 9:00 am – 2:00 pm · Evening 4:30 pm – 10:00 pm, by appointment` (days not specified)

> [!IMPORTANT]
> Until confirmed, the hours section on the `/banani` page shows an editorial note only visible in development — nothing is shown to patients.

---

## 2. Banasree Branch Public Email

**Current state:** Banasree has no confirmed public email.  
**Data location:** `src/lib/branches.ts` → `BRANCHES.banasree.email`  

**Action needed:** Confirm a public email for the Banasree branch (e.g. `info@rhdentalcare.com`).

---

## 3. Banani Branch Geo Coordinates

**Current state:** `geoVerified: false`. Coordinates are approximate and NOT published in JSON-LD schema.  
**Approximate pin:** `{ lat: 23.7937, lng: 90.4066 }`  
**Data location:** `src/lib/branches.ts` → `BRANCHES.banani.geo`

**Action needed:** Verify the exact pin location against the Google Business Profile for Banani (B&B Empire, Level 7, Plot 116, Road 11). Once confirmed, set `geoVerified: true`.

---

## 4. Google Place IDs (Both Branches)

**Current state:** Both branches have `placeId: null`. This means `ReviewBadge` renders nothing — no live review score is shown anywhere on the site.

**Data location:** `src/lib/branches.ts` → `BRANCHES.banani.placeId` and `BRANCHES.banasree.placeId`

**Action needed:**
1. Go to [Google Business Profile](https://business.google.com)
2. Find the Place ID for each branch
3. Update both `placeId` values in `branches.ts`

> [!NOTE]
> Banasree's coordinates are now verified (`23.7606878, 90.4299624`). The Google Maps URL from `/reviews/page.tsx` contains the place reference `/g/11b5pjywjt` — the full Place ID should be obtainable from the Google Business Profile dashboard.

---

## 5. Year Founded / "Since 2014" [✅ CONFIRMED BY CLIENT]

**Current state:** 2014 is confirmed by client as the founding year.  
**Implementation:**
- Added `foundedYear: 2014` to `src/config/site.ts`
- Added `foundingDate: "2014"` to `MedicalOrganization` JSON-LD schema in `src/lib/seo/schema.ts`
- "Since 2014" badge featured in Navbar, Hero section, Homepage badges, About page stats, Footer, and Branch Chooser.

---

## 6. Clinic Floor Area (Conflicting Data)

**Current state:** Two conflicting figures existed in the codebase:
- `Footer.tsx` said: "3,500 sq.ft facility"
- `about/page.tsx` said: "5,000+ sqft Total Area"

**Action taken:** Both figures have been removed from public rendering.

**Action needed:** Confirm the actual floor area for each branch separately, or for the combined footprint. Once verified, the figure can be restored.

---

## 7. Dr. Nabil Rahman — BMDC Registration

**Current state:** `bmdc: null` in `src/lib/doctors.ts`. His profile renders without a BMDC number.

**Action needed:** Provide Dr. Nabil's BMDC registration number.

---

## 8. Roster Doctors Without Qualifications or Photos

The following doctors in `ROSTER` have no qualifications, BMDC number, or photo confirmed:
- **Dr. Tonima** 
- **Dr. Noton**
- **Dr. Mim**
- **Dr. Nusrat**

They render on `/team` and relevant branch pages with name and role only (no fabrication). Once qualifications and a headshot are provided, update `src/lib/doctors.ts`.

---

## 9. Dr. Hreedy — Branch Assignment Conflict

**Current state:** Marketing flyer says Banasree; roster data says Banani.  
**Data location:** `src/lib/doctors.ts` → `dr-hreedy` entry  

**Action needed:** Confirm which branch Dr. Monisha Haque Hreedy is currently posted to.

---

## 10. Social Media Profiles (Missing from sameAs)

**Current state:** Only Facebook (`https://www.facebook.com/share/18YJPadCbX/`) is in the `sameAs` array. Instagram, YouTube, and Google Business Profile are not linked.

**Action needed:** Provide official, clinic-controlled profile URLs for:
- Instagram: `@rhdentalcare_official` or similar
- YouTube channel URL
- Google Business Profile direct URL (both branches)

Once provided, these should be added to `src/config/site.ts → SITE.sameAs[]`.

---

## 11. Dental Tourism — Hardcoded Rating

**Current state:** `dental-tourism/DentalTourism.tsx` line 2313 shows a hardcoded `5.0 ★★★★★ Verified Google reviews`.

**Action needed:** Confirm this is still the current rating. If the live Google rating changes, this hardcoded figure will become stale. Consider replacing with `<ReviewBadge>` once Place IDs are configured (see item 4).

---

## Resolution Process

For each item, provide the confirmed data and we will update the relevant source file. No guessing — only verified information will be published.

**Contacts for this document:** Site editor / clinic management
