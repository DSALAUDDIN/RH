# Content gaps

Information still needed from the clinic. Until each item is supplied, the
related field stays unpublished (no estimates are shown to patients or emitted
in structured data). Search the code for `TODO(content)` and `pending:` to find
every placeholder.

## Blocking local SEO

| Item                                   | Where it goes                         | Effect once supplied                          |
| -------------------------------------- | ------------------------------------- | --------------------------------------------- |
| Google Place ID, both branches         | `src/lib/branches.ts` → `placeId`     | Live rating badge; review data                |
| Verified map pins (lat/lng), both      | `branches.ts` → `geo`, `geoVerified`  | `GeoCoordinates` in `Dentist` schema          |
| Banani operating days                  | `branches.ts` → `hours`               | `openingHoursSpecification`; hours on pages   |
| Banasree reception hours (if different)| `branches.ts` → `hours`               | Accurate hours in schema and GBP              |
| Official social profiles               | `src/config/site.ts` → `sameAs`       | Entity reconciliation in the knowledge graph  |
| Public email per branch                | `branches.ts` → `email`               | Contact details in schema                     |
| Banasree floor/locality confirmation   | `branches.ts` → `address`             | Consistent NAP across site and listings       |

## Pricing

- Banasree published price list (treatment, price, inclusions). The pricing
  table on `/banasree` renders automatically once `PRICES` is populated.
- Banani consultation fee, whether it is credited to treatment, and package
  ranges for implants, veneers and orthodontics.
- Root canal pricing by tooth type; whether the crown is quoted separately.
- 0% EMI: partner banks or cards, minimum treatment value, tenures.

## Clinical detail (FAQ answers)

- Single implant: typical appointment count; implant systems offered besides Osstem.
- Root canal: typical visits for anterior teeth versus molars.
- Orthodontics: typical length for a straightforward crowding case; adjustment
  and review intervals; aligner system(s) provided.
- Crowns: visit count and turnaround, Banasree lab versus Banani.
- Intraoral scanner and mill make/model.
- Veneers: preparation protocol and typical reduction; whether a night guard is included.
- Sterilisation: autoclave class and cycle traceability.
- Paediatrics: clinicians with paediatric qualifications; GA in-house or referred.
- Overseas patients: minimum days in Dhaka for a single implant and a full arch.
- Parking and landmarks for both branches; Banasree walk-in policy.

## Clinical team

- Dr. Tonima, Dr. Noton, Dr. Mim, Dr. Nusrat: qualifications, BMDC numbers, portraits.
- Dr. Nabil: BMDC number and a headshot (current image is a booking card).
- Dr. Hreedy and Dr. Barsha: branch assignment (flyers say Banasree, roster says Banani).
- "Dr. Nishat" and "Dr. Tamanna": one person (Dr. Nishat Tamanna Alam) or two?
- Dr. Asma and Prof. Dr. Md. Shahidul Islam Shaheen: still with the practice?
- Verify every roster BMDC number against the BMDC register.
- Year of first BMDC registration for the lead clinicians (to state years in practice).

## Claims to verify before promoting

These appear on live pages and should be backed by evidence or reworded:

- Home page "Real Results" section (`src/components/BeforeAfter.tsx`): the
  images are not patient photographs. Replace with consented patient cases, or
  label the section as illustrative.
- Dental tourism page: hardcoded "4.9" Google rating and "12+ years of practice".
- Specialty pages (`src/app/specialties/[slug]/page.tsx`): "10-year guarantee",
  "Lifetime implant guarantee", guarantee on veneers.
- Patient testimonials: only reviews with a live Google review URL may be added
  to `src/components/Testimonials.tsx`.
