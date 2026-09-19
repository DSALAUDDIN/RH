# RH Dental Care — audit, 19 September 2026

## Verdict
The clinic photography, doctor identity, and clear Banani/Banasree positioning are strong foundations. The site does not yet feel like one consistently premium clinic brand: dark glass panels, bright multi-colour treatment themes, white generic card sections, and the serif tourism page compete with each other.

## Changes completed at your request
Restored the previous flyer images in the doctor registry, two-column desktop roster and one-column small-mobile roster, original card spacing, and RH/ST hero initials. Kept the existing protection against links to nonexistent doctor profiles. No other design changes or deployment performed.

## Priority findings
| Priority | Finding | Evidence / action |
|---|---|---|
| P0 | Booking can claim receipt when nothing was delivered or saved | src/app/api/contact/route.ts always returns success:true even when mailed:false and recorded:false. Return failure when both fail; verify reception delivery before release. Code-confirmed; no real patient enquiry sent. |
| P0 | AI illustrations presented as real patient results | src/components/BeforeAfter.tsx imports ai_implants.png and ai_veneers.png beneath “Real Results”, with patient outcome text. Use consented documented cases or clearly label illustrations and remove patient-specific claims. |
| P1 | Inconsistent brand design | About/Blog are light; branch/doctor pages are dark; surgery CTA red, digital purple, crowns green, other CTAs blue. Use one typography, spacing and button system; retain restrained branch accents. |
| P1 | Treatment hero text competes with busy photos | Orthodontics and root canal desktop captures show text over detailed chair/equipment photography. Improve text backdrop and image crop; reduce badges and decorative elements. |
| P1 | Price promise is not fulfilled | Banasree says “Published prices”, but PRICES is empty and visitors must ask on WhatsApp. Banani fee/ranges are also missing. Publish approved prices or change the promise. Development-only Pending notes are not a production leak: EditorialNote hides them in production. |
| P1 | Conflicting practical information | Footer says Banasree opens 3:00 PM; branch registry says 3:30 PM. About says 5,000+ total sq.ft; footer/tourism say 3,500 without consistently clarifying scope. Free consultation wording conflicts with an unconfirmed Banani consultation fee. |
| P1 | Reviews experience is thin and repetitive | Empty VERIFIED_TESTIMONIALS and null branch Place IDs. /reviews repeats “What patients say”; fallback sends people to Contact instead of directly to a review listing. Add verified reviews and direct branch review links. |
| P1 | Mobile Banasree overflow needs a focused fix | 390px recovered browser check reports horizontal overflow. Other completed 390px route checks did not report overflow. Root cause not isolated in this fast audit. |
| P2 | Long repetitive pages dilute the clinical story | About repeats area/branch stats, service cards and broad promises. Blog is a long grid of near-identical text cards. Shorten repeated sections and make the most useful patient information easier to find. |
| P2 | Tourism looks like a separate site | Its serif typography and warm paper palette are calmer, but differ sharply from the main site. Bring its spacing and hierarchy into the shared system; shorten travel content before clinical evidence and booking. |
| P2 | Team information is incomplete | Missing qualifications/BMDC/photos for several doctors; branch assignment verification remains pending in content-gaps.md. Flyers are retained per your preference. Check small flyer text at mobile size and provide qualifications/hours as readable page text. |
| P2 | Clinical claims need an evidence pass | Tourism hardcodes 4.9 and years/pricing figures. Specialty data contains lifetime/10-year/5-year guarantees. This audit did not validate those claims externally. |

## Recommended order
1. Booking reliability and truthful results/claims.
2. Correct hours, fee wording, actual pricing, team data and reviews.
3. Fix mobile overflow and busy hero readability.
4. Unify buttons, fonts, colour accents and spacing; reduce glow and repeated cards.

Direction: retain your flyers and actual clinic photography. Use calm layouts, clear doctor credentials and practical information to express quality. The current repeated “premium”, gradients and badges do not substitute for that evidence.

## Verification and limits
- Inventoried 23 public static routes; recovered browser sweep attempted desktop 1440px and mobile 390px. 45/46 checks returned 200; Banasree desktop was interrupted by navigation during preview reload (it had rendered successfully in the earlier original-preview pass).
- Reviewed full-page captures for representative main/branch/content/treatment pages and a desktop overview of all captured static pages. Dynamic blog articles and specialty detail URLs were not individually browser-tested; source checks covered claim strings there.
- Original localhost preview stalled compiling /dr-hasan. Recovered with an isolated preview; Google Font downloads were restricted, so recovered captures use fallback fonts. Do not treat this as a production typography or performance measurement. Embedded maps/media loading cannot be concluded from restricted local networking.
- Changed-file ESLint passed. Project typecheck failed on stale .next/types/validator.ts references to removed /team/dr-hasan and /team/dr-shimia routes; no full clean build was completed.
- Booking delivery was reviewed in server/client code; end-to-end delivery was not verified.
- No email, WhatsApp message, booking, commit or deployment was sent.
