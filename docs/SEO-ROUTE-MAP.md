# SEO Route Map — RH Dental Care & Implant Center
**Date:** 2026-09-30  
**Canonical Host:** `https://rhdentalcare.com`

This is the authoritative map of all indexable routes, their target search intent, and canonical rules.

---

## Primary Routes

| Route | Target Intent | Title Pattern | Priority | Notes |
|-------|--------------|---------------|----------|-------|
| `/` | Dental Clinic in Dhaka | RH Dental Care & Implant Center | 1.0 | Homepage |
| `/banani` | Dentist / Dental Clinic in Banani, Dhaka | Banani Private Dental Suite | 0.95 | Branch page |
| `/banasree` | Dentist / Dental Clinic in Banasree, Dhaka | Banasree Flagship Dental Hospital | 0.95 | Branch page |

## Treatment / Service Routes

| Route | Target Intent | Priority | Canonical | Notes |
|-------|--------------|----------|-----------|-------|
| `/implants` | Dental Implant in Dhaka | 0.95 | Self | Primary treatment page |
| `/orthodontics` | Orthodontist / Braces / Clear Aligner Dhaka | 0.90 | Self | Covers braces + aligners |
| `/root-canal` | Root Canal Treatment in Dhaka | 0.90 | Self | Microscope endodontics |
| `/zirconia-crown` | Zirconia Crown Dhaka / Cosmetic Dentistry | 0.85 | Self | |
| `/zirconia-veneers` | Zirconia Veneers Dhaka | 0.85 | Self | |
| `/dental-surgery` | Oral Surgery Dhaka | 0.85 | Self | |
| `/digital-dentistry` | 3D CBCT Dental Imaging Dhaka | 0.85 | Self | |
| `/kids-care` | Kids Dentist Dhaka / Pediatric Dentistry | 0.80 | Self | |
| `/special-child` | Special Needs Dentistry Dhaka | 0.80 | Self | |

## Hub Routes & Differentiation

| Route | Role & Content Focus | Priority | Canonical | Inter-Hub Cross-Linking |
|-------|----------------------|----------|-----------|--------------------------|
| `/services` | **Patient Service Directory**: Concise, patient-friendly overview of core services with key benefits, fast-reading highlights, and direct appointment hooks | 0.80 | Self (`/services`) | Hero cross-links to `/treatments` (pricing & packages) and `/specialties` (departments) |
| `/treatments` | **Treatment Catalogue & Decision Hub**: Deep procedure-by-procedure breakdown with packages, multi-visit schedules, recovery times, and search filter by patient concern | 0.85 | Self (`/treatments`) | Hero cross-links to `/services` (directory) and `/specialties` (departments) |
| `/specialties` | **Clinical Departments Hub**: Academic and discipline-based overview of clinic departments (Implantology, Endodontics, Orthodontics, Prosthodontics, etc.) | 0.80 | Self (`/specialties`) | Hero cross-links to `/treatments` (catalogue) and `/services` (directory) |
| `/team` | Clinical team listing | 0.85 | Self | All doctors + roster entries |
| `/about` | About clinic philosophy & technology | 0.85 | Self | Features full specialist grid linking to profiles |
| `/contact` | Dual-branch contact & appointment booking | 0.85 | Self | Branch-attributed booking form |
| `/dental-tourism` | International patient guide & travel coordination | 0.80 | Self | Overseas patient audience |
| `/blog` | Patient education articles & clinical insights | 0.75 | Self | Regular medical articles |
| `/reviews` | Verified patient feedback & ratings | 0.70 | Self | |

## Clinician Routes

| Route | Doctor | Priority |
|-------|--------|---------|
| `/dr-hasan` | Dr. B.M. Rafiqul Hasan (Chief Consultant) | 0.90 |
| `/dr-shimia` | Dr. Shimia Binte Taher (Senior Dental Surgeon) | 0.90 |
| `/team/[slug]` | All other roster doctors | — (generated) |

## Specialty Detail Pages (Canonicalized)

These pages exist at `/specialties/[slug]` but canonicalize to their primary treatment page:

| Specialty Slug | Canonical URL | Included in Sitemap? |
|---------------|--------------|---------------------|
| `/specialties/braces` | `/orthodontics` | ❌ No |
| `/specialties/zirconia` | `/zirconia-crown` | ❌ No |
| `/specialties/root-canal` | `/root-canal` | ❌ No |
| `/specialties/kids-care` | `/kids-care` | ❌ No |
| `/specialties/implants` | `/implants` | ❌ No |
| `/specialties/dental-tourism` | `/dental-tourism` | ❌ No |
| `/specialties/3d-imaging` | Self | ✅ Yes |
| `/specialties/gum-care` | Self | ✅ Yes |
| `/specialties/aesthetics` | Self | ✅ Yes |

## Excluded Routes (Not Indexed)

| Route | Reason |
|-------|--------|
| `/admin` | Admin panel — blocked in `robots.txt` and `noindex` |
| `/admin/dashboard` | Admin panel |
| `/api/*` | API routes — blocked in `robots.txt` |
| `/icon.jpg` | Static asset |

## Redirect Rules

| Source | Destination | Type |
|--------|------------|------|
| `www.rhdentalcare.com/*` | `https://rhdentalcare.com/*` | 301 |
| `rhdentalcare.com.bd/*` | `https://rhdentalcare.com/*` | 301 |
| `www.rhdentalcare.com.bd/*` | `https://rhdentalcare.com/*` | 301 |
| `/team/dr-hasan` | `/dr-hasan` | 301 |
| `/team/dr-shimia` | `/dr-shimia` | 301 |

---

## Local SEO Intent Mapping

| Geographic Target | Primary Route | Schema Type |
|------------------|--------------|-------------|
| Dhaka (broad) | `/` | `Organization + MedicalClinic` |
| Banani, Dhaka | `/banani` | `Dentist + MedicalClinic` |
| Banasree, Dhaka | `/banasree` | `Dentist + MedicalClinic` |

---

## Content Duplication Risk Areas

| Routes | Overlap Risk | Recommendation |
|--------|-------------|----------------|
| `/services` + `/treatments` | High — similar content hubs | Audit content; consider 301 from `/services` → `/treatments` or differentiate clearly |
| `/specialties` + `/treatments` | Medium — aggregator overlap | Differentiate: `/specialties` = disciplines, `/treatments` = procedures |
| `/specialties/[slug]` canons | Managed — canonical set | Already handled via `SPECIALTY_CANONICAL` map |
