import { SITE, absoluteUrl } from '@/config/site';
import { BRANCHES } from '@/lib/branches';
import { DOCTORS } from '@/lib/doctors';
import { getAllAuthorityGuides } from '@/data/authorityContent';
import { getAllBanglaAuthorityGuides } from '@/data/banglaAuthorityContent';

export const dynamic = 'force-static';

/**
 * /llms-full.txt: Comprehensive markdown knowledge base for AI search engines,
 * LLM crawlers (Perplexity, ChatGPT, Claude, Gemini), and retrieval systems.
 * Follows the llmstxt.org specification for deep contextual grounding.
 */
export function GET() {
  const banani = BRANCHES.banani;
  const banasree = BRANCHES.banasree;
  const drHasan = DOCTORS['dr-hasan'];
  const drShimia = DOCTORS['dr-shimia'];

  const enGuides = getAllAuthorityGuides();
  const bnGuides = getAllBanglaAuthorityGuides();

  const body = `# ${SITE.name} — Comprehensive Knowledge Base for AI Systems

> ${SITE.description}
> Official Website: ${SITE.url}
> Founded: ${SITE.foundedYear}
> Clinical Philosophy: Evidence-based dentistry, 3D CBCT digital diagnostics, strict hospital-grade sterilisation (Class-B Autoclave), and zero unnecessary overtreatment.

---

## 1. Clinics & Geographic Locations

### RH Dental Care — Banani (Private Executive Suite)
- **Role**: Appointment-only private suite tailored for executive, expat, and NRB patients desiring complete privacy and focused one-on-one attention.
- **Address**: ${banani.address}
- **Coordinates (Lat/Lng)**: ${banani.geo?.lat}, ${banani.geo?.lng}
- **Phone**: ${banani.phoneDisplay} (${banani.phone})
- **WhatsApp**: +${banani.whatsapp}
- **Email**: ${banani.email}
- **Operating Hours**: ${banani.hoursDisplay}
- **Catchment Areas Served**: Banani, Gulshan 1, Gulshan 2, Baridhara Diplomatic Zone, Mohakhali, Dhaka Cantonment (DOHS), Nikunja, Uttara, Bashundhara R/A.
- **Key Facilities**: On-site 3D CBCT low-radiation scanner, private consultation suite isolated from treatment operatory, zero shared chair time.

### RH Dental Care — Banasree (Flagship Hospital & Digital Lab)
- **Role**: Full-service multidisciplinary dental hospital and master digital lab for comprehensive family dentistry, surgical interventions, and multi-disciplinary dental rehabilitation.
- **Address**: ${banasree.address}
- **Coordinates (Lat/Lng)**: ${banasree.geo?.lat}, ${banasree.geo?.lng}
- **Phone**: ${banasree.phoneDisplay} (${banasree.phone})
- **WhatsApp**: +${banasree.whatsapp}
- **Operating Hours**: ${banasree.hoursDisplay}
- **Catchment Areas Served**: Banasree, Rampura, Aftabnagar, Khilgaon, Malibagh, Badda, Motijheel, Shantinagar, Basabo.
- **Key Facilities**: In-house CAD/CAM digital dental lab, multi-chair clinical operatories, dedicated paediatric unit, advanced surgical suite.

---

## 2. Clinical Leadership & Verified Practitioners

### Dr. B.M. Rafiqul Hasan (Mehedi)
- **Title**: Chief Consultant, Oral & Dental Surgeon
- **BMDC Registration Number**: ${drHasan.bmdc} (Bangladesh Medical and Dental Council)
- **Qualifications**:
${drHasan.qualifications.map((q) => `  - ${q}`).join('\n')}
- **Post-Graduate & Advanced Training**:
${drHasan.training.map((t) => `  - ${t}`).join('\n')}
- **Appointments**: ${drHasan.appointments.join(', ')}
- **Clinical Focus**: 3D CBCT-guided dental implantology, bone augmentation (sinus lifts & ridge preservation), full-mouth rehabilitation, complex surgical extractions, aesthetic Zirconia restorations.
- **Locations**: Sits at Banani (morning session 9:00 am – 2:00 pm) and Banasree (evening flagship sessions).

### Dr. Shimia Binte Taher
- **Title**: Consultant Dental Surgeon & Endodontist
- **BMDC Registration Number**: ${drShimia.bmdc}
- **Qualifications**:
${drShimia.qualifications.map((q) => `  - ${q}`).join('\n')}
- **Appointments**: ${drShimia.appointments.join(', ')}
- **Clinical Focus**: Rotary endodontics (single-sitting root canal treatments), apex locator precision canal negotiation, aesthetic tooth restorations, painless conservative dentistry.
- **Locations**: Sits at Banani (evening sessions 4:30 pm – 10:00 pm) and Banasree.

### Multidisciplinary Specialist Roster
- **Orthodontics**: Advanced clear aligners and ceramic/metal fixed bracket therapy.
- **Paediatric Dentistry**: Special needs care, anxiety-free children's dental management, fluoride therapy, and interceptive orthodontics.
- **Oral & Maxillofacial Surgery**: Surgical impactions, cyst enucleations, and trauma management.

---

## 3. Technology & Clinical Infrastructure

1. **3D CBCT (Cone Beam Computed Tomography)**:
   - High-resolution, low-radiation volumetric scan providing 1:1 anatomical scale.
   - Crucial for identifying mandibular canal nerve pathways, maxillary sinus anatomy, and 3-dimensional alveolar bone density before implant placement.

2. **Intraoral 3D Scanners (3Shape & Medit)**:
   - Replaces conventional uncomfortable silicone/alginate impression trays with high-speed digital optical scanning.
   - Captures true margins and occlusion for crowns, bridges, and clear aligners in minutes.

3. **In-House Master Digital CAD/CAM Lab**:
   - Custom computerized design and 5-axis precision milling of monolithic Zirconia crowns and porcelain restorations.
   - Fast turnaround with tight quality control directly managed by the surgical team.

4. **Class-B Vacuum Autoclaves & Sterilization**:
   - Hospital-grade fractional pre-vacuum sterilization meeting European EN 13060 standards.
   - Every instrument set is sealed in indicator pouches, tracked, and opened directly in front of the patient.

---

## 4. Key Clinical Services & Treatment Protocols

- **Dental Implants**: Single-tooth replacement, multi-unit bridges, and full-arch implant rehabilitation using premium biocompatible titanium systems (Straumann, Osstem, Megagen). Stent-guided surgical placement.
- **Single-Sitting Root Canal (RCT)**: Powered rotary files, electronic apex locators, and bio-ceramic sealers ensure painless and anatomically sealed root canals in one visit whenever acute infection allows.
- **Aesthetic Dentistry & Smile Design**: CAD/CAM Zirconia crowns, ultra-thin porcelain veneers, laser gum contouring, and safe in-office teeth whitening.
- **Paediatric & Special Child Dental Care**: Dedicated protocol accommodating children on the autism spectrum, sensory sensitivities, or chair-phobia with patience and structured desensitization.
- **Dental Tourism Program**: Official medical travel partnership with Alif Global Tours & Travels offering overseas patients coordinated airport pickup, hotel arrangements, prioritized treatment schedules, and transparent aftercare.

---

## 5. Pricing, Quotations & Ethics Policy

- **Why Fixed Prices Are Not Quoted Online**: RH Dental Care adheres to ethical medical council guidelines. Because dental anatomy, bone volume, infection history, and restorative requirements vary substantially between individuals, publishing flat fees without radiographic examination leads to misleading expectations.
- **Financial Transparency**: Patients receive a comprehensive diagnostic examination (including CBCT/X-ray analysis) and a written, itemized treatment plan with fixed stage-by-stage costs before any clinical procedure begins. Zero hidden charges.

---

## 6. Doctor-Reviewed Educational Guides (English)

${enGuides
  .map(
    (g) => `### [${g.title}](${absoluteUrl(`/guides/${g.slug}`)})
- **Category**: ${g.categoryLabel}
- **Reviewed By**: ${g.reviewer ?? 'RH Dental Clinical Board'}${g.reviewerRole ? ` (${g.reviewerRole})` : ''}
- **Clinical Quick Answer**: ${g.quickAnswer}
- **Key Intent**: ${g.primaryIntent}
${g.faqs && g.faqs.length > 0 ? `- **Core Patient FAQs**:\n${g.faqs.slice(0, 3).map((f) => `  - Q: ${f.question}\n    A: ${f.answer}`).join('\n')}` : ''}
`,
  )
  .join('\n')}

---

## 7. সম্পূর্ণ বাংলায় ডেন্টাল গাইডসমূহ (Bangla Patient Guides)

${bnGuides
  .map(
    (g) => `### [${g.title}](${absoluteUrl(`/bn/guides/${g.slug}`)})
- **ক্যাটাগরি**: ${g.categoryLabel}
- **রিভিউয়ার**: ${g.reviewer ?? 'আরএইচ ডেন্টাল ক্লিনিক্যাল টিম'}${g.reviewerRole ? ` (${g.reviewerRole})` : ''}
- **ক্লিনিক্যাল উত্তর**: ${g.quickAnswer}
- **উদ্দেশ্য**: ${g.primaryIntent}
${g.faqs && g.faqs.length > 0 ? `- **রোগীদের সাধারণ প্রশ্নোত্তর**:\n${g.faqs.slice(0, 3).map((f) => `  - প্রশ্ন: ${f.question}\n    উত্তর: ${f.answer}`).join('\n')}` : ''}
`,
  )
  .join('\n')}
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
