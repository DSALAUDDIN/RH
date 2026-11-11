// src/app/banani/faq.ts — answer-first, patient-focused branch FAQ.
// Editorial rules:
// - Never position Banani as clinically superior to Banasree.
// - No superlatives ("best", "luxury", "VIP").
// - Verified from RH_Dental_Care_Website_FAQ_Bank.docx.

import type { FaqItem } from '@/lib/seo/schema';
import { BRANCHES } from '@/lib/branches';

export const bananiFaq: FaqItem[] = [
  {
    q: 'What is the difference between the Banani and the Banasree branch?',
    a: 'The setting and the pace, not the clinical care. Banani is appointment-only: your slot is booked so that the room and the clinician are yours for its whole length. Banasree is the flagship hospital — a bigger setup with an in-house master digital lab, the full specialist team on site, and coordinated multidisciplinary treatment planning.\n\nSame doctors, same materials, and same European Class-B sterilisation protocol at both. If your case needs the on-site lab or a specialist based at Banasree, that is where it should be done, and we will advise you accordingly.',
  },
  {
    q: 'Do I need an appointment to visit the Banani branch?',
    a: `Yes. Banani is appointment-focused to ensure zero waiting time and dedicated one-on-one attention. Call ${BRANCHES.banani.phoneDisplay} or send a WhatsApp message to confirm a slot. If you need same-day emergency assessment, Banasree can accommodate you where clinical capacity allows.`,
  },
  {
    q: 'Is there 3D CBCT imaging at the Banani branch?',
    a: 'Yes, 3D CBCT is available on site at Banani, allowing high-resolution volumetric scans to be taken and interpreted during the same visit without referral delays. CBCT imaging is essential for precision implant planning, impacted wisdom tooth surgery, and complex root canal anatomy.',
  },
  {
    q: 'Where is RH Dental Care in Banani?',
    a: 'Our Banani clinic is on Level 7, B&B Empire, Plot 116, Road 11, Banani, Dhaka 1213. It offers convenient access for patients traveling from Banani, Gulshan 1 and 2, Baridhara, Bashundhara, Mohakhali, and Uttara.',
  },
  {
    q: 'What are the Banani branch opening hours?',
    a: 'Banani operates two sessions from Saturday to Thursday: morning from 9:00 AM to 2:00 PM and evening from 4:30 PM to 10:00 PM. Sessions are strictly by appointment.',
  },
  {
    q: 'Do the same doctors work at both branches?',
    a: 'Yes. Our senior consultants, including Dr. B.M. Rafiqul Hasan and Dr. Shimia Binte Taher, schedule clinical sessions across both branches. The diagnostic protocols, implant systems, ceramics, and sterilization standards are identical at both locations.',
  },
  {
    q: 'What should I bring to my first appointment?',
    a: 'Please bring any recent dental X-rays or CBCT scans (within the past 12 months), a list of medications you currently take, and relevant medical history details (including conditions such as diabetes, hypertension, or cardiac history).',
  },
  {
    q: 'I am travelling from abroad — can treatment be planned before I arrive?',
    a: 'Yes. Send your recent panoramic X-rays, intraoral photos, or CBCT scans via WhatsApp. Our consultants will evaluate your case and prepare a preliminary stage-by-stage plan before you fly, confirming details upon clinical examination in Dhaka.',
  },
];

export default bananiFaq;
