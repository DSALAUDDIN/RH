// Answer-first FAQ content for treatment and specialty pages.
// Sourced and verified from the 120-item master FAQ bank (RH_Dental_Care_Website_FAQ_Bank.docx)
// overseen by Dr. B.M. Rafiqul Hasan (Mehedi).
//
// - Specific systems, materials, duration and visit counts named where clinically applicable.
// - Compliant with medical guidelines and zero unsubstantiated claims.

import type { FaqItem } from '@/lib/seo/schema';
import {
  ALL_FAQS,
  ALL_IMPLANT_FAQS,
  ALL_KIDS_CARE_FAQS,
  APPOINTMENTS_BRANCHES_FAQS,
  CHECKUPS_PREVENTION_FAQS,
  CLEAR_ALIGNERS_BRACES_FAQS,
  CROWNS_DIGITAL_LAB_FAQS,
  DENTAL_EMERGENCIES_FAQS,
  ESTIMATES_OVERSEAS_FAQS,
  EXTRACTIONS_ORAL_SURGERY_FAQS,
  FULL_MOUTH_REHAB_FAQS,
  IMPLANT_HEALING_FAQS,
  IMPLANT_PLANNING_FAQS,
  MICROSCOPE_ROOT_CANAL_FAQS,
  SCALING_LASER_GUM_FAQS,
  SMILE_DESIGN_VENEERS_FAQS,
} from '@/data/faqBank';

export {
  ALL_FAQS,
  ALL_IMPLANT_FAQS,
  ALL_KIDS_CARE_FAQS,
  APPOINTMENTS_BRANCHES_FAQS,
  CHECKUPS_PREVENTION_FAQS,
  CLEAR_ALIGNERS_BRACES_FAQS,
  CROWNS_DIGITAL_LAB_FAQS,
  DENTAL_EMERGENCIES_FAQS,
  ESTIMATES_OVERSEAS_FAQS,
  EXTRACTIONS_ORAL_SURGERY_FAQS,
  FULL_MOUTH_REHAB_FAQS,
  IMPLANT_HEALING_FAQS,
  IMPLANT_PLANNING_FAQS,
  MICROSCOPE_ROOT_CANAL_FAQS,
  SCALING_LASER_GUM_FAQS,
  SMILE_DESIGN_VENEERS_FAQS,
};

/** Dental implants FAQ (combining planning, surgery, healing and branch lab context). */
export const implantFaq: FaqItem[] = [
  ...IMPLANT_PLANNING_FAQS,
  ...IMPLANT_HEALING_FAQS,
  {
    q: 'Which implant system do you use at RH Dental Care?',
    a: 'We use internationally documented titanium implant systems including Osstem (South Korea) as our standard system, alongside premium options tailored to bone density and anatomical requirements. Every fixture is surgically placed using 3D CBCT guided planning.',
  },
  {
    q: 'Is the implant crown made in-house?',
    a: 'At our Banasree flagship hospital, the in-house master digital CAD/CAM laboratory designs and mills precision Zirconia crowns and customized abutments on site, eliminating third-party turnaround delays.',
  },
  {
    q: 'Which branch should I go to for an implant in Dhaka?',
    a: 'Both Banani and Banasree provide identical surgical standards, clinicians and materials. Banani offers an appointment-only private suite with immediate 3D CBCT imaging. Banasree provides our on-site digital milling lab and multi-disciplinary surgical suites.',
  },
];

/** Microscope-assisted Root Canal Treatment FAQ. */
export const rootCanalFaq: FaqItem[] = [
  ...MICROSCOPE_ROOT_CANAL_FAQS,
  {
    q: 'How many visits does a root canal take?',
    a: 'Most straightforward root canals are completed in a single visit or two appointments. A molar with severe curvature, calcified canals or acute infection may require a dressing visit between sessions before final obturation and crown placement.',
  },
  {
    q: 'Does a root canal hurt?',
    a: 'Root canal treatment is performed under profound local anaesthesia, so you should feel pressure but no sharp pain during the procedure. Mild post-operative tenderness on biting for 2-3 days is common and managed with prescribed analgesics.',
  },
  {
    q: 'What is the cost of Root Canal Treatment (RCT cost) in Dhaka?',
    a: 'RCT cost in Dhaka depends on the tooth position (anterior, premolar, or multi-rooted molar) and whether microscope negotiation or retreat is required. At RH Dental Care Banasree and Banani, costs are itemised transparently following clinical and radiographic examination.',
  },
];

/** Clear aligners and orthodontic treatment FAQ. */
export const orthodonticsFaq: FaqItem[] = [
  ...CLEAR_ALIGNERS_BRACES_FAQS,
  {
    q: 'How long do braces or clear aligners take?',
    a: 'Treatment duration typically ranges from 6 to 18 months for mild to moderate clear aligner cases, and 18 to 36 months for comprehensive fixed bracket therapy, depending on biological response and case complexity.',
  },
  {
    q: 'Can adults have orthodontic treatment in Dhaka?',
    a: 'Yes. Teeth can be moved at any age provided the supporting bone and gums are healthy. Adult orthodontic treatment is common and frequently utilizes discreet clear aligners or ceramic braces.',
  },
];

/** Zirconia crowns and digital dental lab FAQ. */
export const zirconiaFaq: FaqItem[] = [
  ...CROWNS_DIGITAL_LAB_FAQS,
  {
    q: 'How long does a zirconia crown last?',
    a: 'Zirconia crowns routinely last over 10 to 15 years when margins fit precisely, the bite is balanced, and oral hygiene is maintained with regular 6-month checkups.',
  },
  {
    q: 'Is zirconia better than a metal-ceramic (PFM) crown?',
    a: 'Zirconia contains zero metal, preventing dark gumline margins over time. Monolithic zirconia offers exceptional fracture resistance for grinders, while multi-layered zirconia matches natural tooth translucency.',
  },
];

/** Smile design, veneers and cosmetic dentistry FAQ. */
export const veneersFaq: FaqItem[] = [
  ...SMILE_DESIGN_VENEERS_FAQS,
  {
    q: 'How much tooth structure is removed for porcelain veneers?',
    a: 'Conservative preparations typically reduce 0.3 mm to 0.7 mm of facial enamel, preserving as much natural tooth structure as possible. In selected cases, minimal-prep or no-prep veneers can be placed.',
  },
  {
    q: 'How long do porcelain veneers last?',
    a: 'High-strength ceramic veneers generally last 10 to 15 years with proper care. A protective night guard is recommended for patients with nocturnal clenching or grinding habits.',
  },
];

/** General clinic care, hygiene and sterilization FAQ. */
export const generalFaq: FaqItem[] = [
  ...CHECKUPS_PREVENTION_FAQS,
  {
    q: 'How is clinical sterilisation handled at RH Dental Care?',
    a: 'We operate Class-B hospital-grade fractional vacuum autoclaves conforming to European EN 13060 standards. All reusable instruments are ultrasonic-cleaned, pouched in color-change indicator packs, and unsealed directly in front of the patient.',
  },
  {
    q: 'Do you treat children and patients with additional needs?',
    a: 'Yes. Our Banasree flagship hospital features dedicated paediatric dental operatories and clinical protocols designed for children and patients with sensory sensitivities, autism, or dental anxiety.',
  },
];

/** Overseas patients and dental tourism FAQ. */
export const dentalTourismFaq: FaqItem[] = [
  ...ESTIMATES_OVERSEAS_FAQS,
  {
    q: 'Is dental treatment in Bangladesh safe for overseas patients?',
    a: 'Yes. At RH Dental Care, overseas patients receive treatment using internationally certified European/US/Korean dental systems, Class-B sterilization, and BMDC-certified clinicians with international training.',
  },
  {
    q: 'How long do I need to stay in Dhaka for dental treatment?',
    a: 'Single crowns, veneers, or cleanings typically require 3 to 5 days. Full-mouth rehabilitation or implant surgery can be planned across short visits, coordinated around your international flight schedule.',
  },
  {
    q: 'Can I send my X-rays or CBCT scans before travelling?',
    a: 'Yes. You can share digital panoramic X-rays, intraoral photos, or CBCT DICOM files via WhatsApp or email for a preliminary clinical review and estimated timeframe before booking your flights.',
  },
];

/** Laser dentistry and gum care FAQ. */
export const laserFaq: FaqItem[] = SCALING_LASER_GUM_FAQS;

/** Paediatric and special child care FAQ. */
export const kidsCareFaq: FaqItem[] = ALL_KIDS_CARE_FAQS;

/** Oral surgery and extractions FAQ. */
export const surgeryFaq: FaqItem[] = EXTRACTIONS_ORAL_SURGERY_FAQS;

/** Emergency dental care FAQ. */
export const emergencyFaq: FaqItem[] = DENTAL_EMERGENCIES_FAQS;

/** Full-mouth rehabilitation FAQ. */
export const fullMouthFaq: FaqItem[] = FULL_MOUTH_REHAB_FAQS;
