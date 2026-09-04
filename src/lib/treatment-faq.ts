// src/lib/treatment-faq.ts
//
// Answer-first FAQ content for the treatment pages, following the pattern in
// src/app/banani/faq.ts.
//
// Rules applied here:
//  · Name the specific system, material, duration or visit count. "Advanced
//    technology" is not an answer and cannot be cited by anything.
//  · Where the specific number is not in the repo and was not supplied,
//    TODO(client) — never a vague hedge, and never an invented figure. A wrong
//    duration or price on a medical site is worse than a blank.
//  · Durations given as ranges below are ordinary clinical ranges, stated as
//    ranges, not as promises about a particular patient.

import type { FaqItem } from '@/lib/schema';

export const implantFaq: FaqItem[] = [
  {
    q: 'How long does a dental implant take from start to finished tooth?',
    a: 'For a straightforward single implant, most cases run three to six months from placement to the final crown, because the implant needs time to integrate with bone before it can carry a load. The surgery itself is usually a single appointment of about an hour.\n\nCases needing a bone graft or a sinus lift add healing time before placement. TODO(client): confirm your typical appointment count for a single implant, so patients can plan visits rather than guess.',
  },
  {
    q: 'Is implant surgery planned from a CBCT scan?',
    a: 'Yes. A 3D CBCT scan is taken before placement so bone height, bone width and the position of the inferior alveolar nerve and the maxillary sinus are measured rather than estimated from a flat X-ray. The scan is also what makes a guided surgical stent possible, so the implant goes where it was planned to go.',
  },
  {
    q: 'Which implant system do you use?',
    a: 'Osstem, a South Korean implant system, is used for our standard implant package — the fixture named on the pricing section of this page is the Osstem SA.\n\nTODO(client): confirm whether Osstem is the only system used or whether a premium alternative is offered for particular cases, and name it. A named system a patient can research is a real differentiator; "premium international implants" is not.',
  },
  {
    q: 'Is the crown made in-house?',
    a: 'At the Banasree branch, yes — the in-house master digital lab mills and finishes crowns and bridges on site, which removes the courier round-trip to an outside lab and shortens the wait between fitting appointments. Intraoral scanning replaces the impression tray for most cases.',
  },
  {
    q: 'What does an implant cost at RH Dental Care?',
    a: 'TODO(client): confirm the published implant price list for Banasree and the package ranges for Banani. Per the positioning, Banasree publishes full prices and Banani publishes ranges plus a consultation fee.',
  },
  {
    q: 'Which branch should I go to for an implant?',
    a: 'Either — the surgery, the systems and the clinicians are the same at both. Choose Banasree if you want the published price list, the in-house lab and 0% EMI on a multi-visit plan. Choose Banani if you want an appointment-only slot with the room to yourself and CBCT read in the same visit.',
  },
];

export const rootCanalFaq: FaqItem[] = [
  {
    q: 'How many visits does a root canal take?',
    a: 'Most root canals are completed in one or two visits, and the tooth then needs a separate appointment for a crown in the majority of cases. A molar with curved or calcified canals, or a tooth with an active infection that needs dressing between visits, can take longer.\n\nTODO(client): confirm your typical visit count for anterior teeth versus molars.',
  },
  {
    q: 'Do you use a microscope for root canal treatment?',
    a: 'Yes. An endodontic operating microscope is used so canal orifices, calcified canals and fracture lines are seen rather than felt for. This matters most in molars, where a missed fourth canal is one of the commonest reasons a root canal fails and needs redoing.',
  },
  {
    q: 'Does a root canal hurt?',
    a: 'The procedure is done under local anaesthetic, so you should not feel the treatment itself. Expect some tenderness on biting for a few days afterwards as the ligament around the root settles — that is normal and usually manageable with ordinary painkillers.\n\nWe do not claim treatment is painless. If anaesthesia is not working — which happens with a hot, acutely inflamed tooth — say so during the appointment and it can be supplemented.',
  },
  {
    q: 'Does a root-canal-treated tooth always need a crown?',
    a: 'Back teeth almost always do. Removing the pulp and the access cavity leaves the tooth more likely to split under chewing load, and a crown or an onlay holds the remaining structure together. Front teeth with a small access cavity and otherwise intact walls can sometimes be restored with a filling instead.',
  },
  {
    q: 'What does a root canal cost?',
    a: 'TODO(client): confirm the current root canal price list by tooth type, and whether the crown is quoted separately. The site previously showed ৳13,000 on one page with no indication of which tooth type or whether it included the crown.',
  },
];

export const orthodonticsFaq: FaqItem[] = [
  {
    q: 'How long do braces take?',
    a: 'Fixed braces typically run 18 to 36 months depending on how far the teeth have to move, and clear aligners typically 12 to 24 months for cases within their range. Both are followed by retainers, which are not optional — teeth move back without them.\n\nTODO(client): confirm your typical treatment length for a straightforward crowding case, so the page can give a real number rather than the textbook range.',
  },
  {
    q: 'How often do I need to come in during treatment?',
    a: 'TODO(client): confirm your adjustment interval for fixed braces and your review interval for aligners. Patients budget travel and time off against this number, and it is the question that decides whether an out-of-town patient starts treatment at all.',
  },
  {
    q: 'Are clear aligners as effective as fixed braces?',
    a: 'For mild to moderate crowding and spacing, aligners achieve comparable results and are removable for eating and cleaning. Fixed braces remain more predictable for large rotations, significant bite correction and cases needing extractions. Which is appropriate is decided from records — photographs, a scan and an X-ray — not from preference alone.',
  },
  {
    q: 'Which aligner system do you provide?',
    a: 'TODO(client): name the aligner system or systems. The site currently shows an Invisalign flyer in its assets without stating whether Invisalign is actually provided.',
  },
  {
    q: 'Can adults have orthodontic treatment?',
    a: 'Yes. Tooth movement works at any age as long as the gums and bone are healthy; adult treatment is common and often uses aligners or ceramic brackets. Active gum disease has to be treated and stable before orthodontics starts, because moving teeth through inflamed tissue accelerates bone loss.',
  },
];

export const zirconiaFaq: FaqItem[] = [
  {
    q: 'How long does a zirconia crown last?',
    a: 'Zirconia crowns commonly last well over ten years when the margin fits, the bite is balanced and the gum stays healthy. What ends a crown is usually decay at the margin or a fracture in the tooth beneath it, not the ceramic failing.',
  },
  {
    q: 'How many visits does a zirconia crown take?',
    a: 'TODO(client): confirm the visit count and turnaround at Banasree, where the crown is milled in the in-house lab, versus Banani. Preparation, scanning and fitting are typically two appointments; the in-house lab is what shortens the gap between them.',
  },
  {
    q: 'Is zirconia better than a metal-ceramic crown?',
    a: 'Zirconia has no metal substructure, so there is no dark line at the gum margin as the gum recedes, and it is a better choice where appearance matters. Metal-ceramic remains a reasonable option for some posterior cases. Monolithic zirconia is the stronger choice for heavy grinders; layered zirconia looks better on front teeth.',
  },
  {
    q: 'Do you take a digital scan instead of an impression?',
    a: 'Yes, an intraoral scanner is used for most cases, which removes the impression tray and the gag reflex that comes with it, and sends the file straight to the lab. TODO(client): confirm the scanner make and model.',
  },
];

export const veneersFaq: FaqItem[] = [
  {
    q: 'How much tooth is removed for veneers?',
    a: 'TODO(client): confirm your preparation protocol — minimal-prep, conventional, or case-dependent — and the typical reduction in millimetres. This is the question that decides whether a patient goes ahead, because the reduction is irreversible.',
  },
  {
    q: 'Can I see the result before the teeth are prepared?',
    a: 'Yes. A digital smile design and a mock-up let you see and, with a trial, wear the proposed shape before anything is prepared. Anyone considering veneers should ask for this step rather than approving a plan from a photograph of somebody else.',
  },
  {
    q: 'How long do veneers last?',
    a: 'Well-made ceramic veneers commonly last ten years or more. They chip or debond most often in patients who grind, so a night guard is usually part of the plan. TODO(client): confirm whether a night guard is included in your veneer packages.',
  },
];

export const generalFaq: FaqItem[] = [
  {
    q: 'How is sterilisation handled?',
    a: 'Instruments are cleaned, pouched and autoclaved between every patient, and single-use items are used where a single-use item exists. The same protocol runs at both branches — it is not something the Banani setting changes.\n\nTODO(client): confirm the autoclave class (B/S/N) and whether cycles are logged and traceable to the appointment. A specific, verifiable answer here is worth more than any adjective.',
  },
  {
    q: 'Do you treat children and patients with special needs?',
    a: 'Yes, at the Banasree branch, where the full team is on site. TODO(client): confirm which clinicians hold paediatric dentistry qualifications, and whether treatment under general anaesthesia is arranged in-house or referred.',
  },
  {
    q: 'Is there a payment plan?',
    a: '0% EMI is available on treatment plans at Banasree. TODO(client): confirm which cards or lenders the EMI runs through, the minimum treatment value, and the available tenures.',
  },
];

export default {
  implantFaq,
  rootCanalFaq,
  orthodonticsFaq,
  zirconiaFaq,
  veneersFaq,
  generalFaq,
};
