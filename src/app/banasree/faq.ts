// src/app/banasree/faq.ts — answer-first, patient-focused flagship branch FAQ.
// Editorial rules:
// - Never position Banani as clinically superior to Banasree.
// - No superlatives ("best", "luxury", "VIP").
// - Verified from RH_Dental_Care_Website_FAQ_Bank.docx.

import type { FaqItem } from '@/lib/seo/schema';
import { BRANCHES } from '@/lib/branches';

export const banasreeFaq: FaqItem[] = [
  {
    q: 'What is at the Banasree branch that is not at Banani?',
    a: 'The in-house master digital CAD/CAM lab, the full multidisciplinary specialist team on site, and dedicated pediatric operatories. Banasree is our flagship hospital, allowing complex cases that require surgery, microscopic endodontics, orthodontics, and prosthetics to be completed under one roof.\n\nClinical standards, materials, and European Class-B autoclave protocols are identical at both branches.',
  },
  {
    q: 'What does the in-house digital dental lab actually change for me?',
    a: 'It eliminates courier transit to outside commercial laboratories. The gap between your tooth preparation and crown fitting is substantially shorter. If a shade, contour, or bite contact requires adjustment, our lab technicians can refine it on site during your appointment.',
  },
  {
    q: 'Do I need an appointment, or can I walk in at Banasree?',
    a: 'We recommend booking in advance so a dedicated treatment room and specialist are reserved for you. Banasree can accommodate emergency and walk-in patients where clinical capacity allows, though priority is always given to scheduled bookings.',
  },
  {
    q: 'What are the Banasree opening hours?',
    a: 'Banasree operates Saturday to Thursday from 3:00 PM to 10:00 PM, and Friday from 4:30 PM to 10:00 PM. Please call or message to confirm your appointment slot.',
  },
  {
    q: 'Where is RH Dental Care in Banasree?',
    a: `Our Banasree clinic is located at ${BRANCHES.banasree.address}. It provides convenient access for patients from Banasree, Rampura, Aftabnagar, Khilgaon, Malibagh, Badda, and Motijheel.`,
  },
  {
    q: 'Is treatment at Banasree a lower standard than at Banani?',
    a: 'No. The clinicians, materials, diagnostic equipment, and hospital-grade sterilization protocols are identical at both branches. Banani offers an appointment-only private suite, while Banasree houses our master digital lab and multi-chair specialist team.',
  },
  {
    q: 'What should I bring to my first appointment at Banasree?',
    a: 'Please bring any recent dental X-rays or scans (within the past 12 months), a list of current medications, and details of any ongoing medical conditions (such as diabetes, blood pressure, or cardiac conditions).',
  },
];

export default banasreeFaq;
