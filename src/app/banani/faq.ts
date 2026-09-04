// src/app/banani/faq.ts
//
// Answer-first. The first sentence answers the question outright; everything
// after it is supporting detail. This is the shape Google lifts into a snippet
// and an AI assistant quotes with attribution.
//
// Rules applied here:
//  · Never claim Banani is clinically better than Banasree. It is not, and the
//    page says so explicitly.
//  · Price is a consequence of the room and the schedule, never the difference.
//  · No "luxury", no "VIP", no "best", no superiority claims.
//  · Where a number is unknown, TODO(client) — not a vague hedge.

import type { FaqItem } from '@/lib/schema';
import { BRANCHES } from '@/lib/branches';

export const bananiFaq: FaqItem[] = [
  {
    q: 'What is the difference between the Banani and the Banasree branch?',
    a: 'The setting and the pace, not the clinical care. Banani is appointment-only: your slot is booked so that the room and the clinician are yours for its whole length. Banasree is the flagship hospital — a bigger setup with an in-house master digital lab, the full specialist team on site, a published price list and 0% EMI.\n\nSame doctors, same materials, same sterilisation protocol at both. If your case needs the lab or a specialist who sits at Banasree, that is where it should be done, and we will say so.',
  },
  {
    q: 'Why is treatment at Banani priced above Banasree?',
    a: 'Because the room is yours for the whole appointment. Banani runs on an appointment-only schedule rather than a rolling queue, which means fewer patients per day and no overlap. You are paying for the time and the privacy, not for different dentistry — the clinical work, the materials and the sterilisation protocol are identical at both branches.',
  },
  {
    q: 'Do I need an appointment to visit the Banani branch?',
    a: `Yes. Banani does not take walk-ins. Call ${BRANCHES.banani.phoneDisplay} or send a WhatsApp message and someone will call back to confirm a time; you will get a reference number for the booking. If you need to be seen the same day, say so — Banasree runs a longer daily session and may be able to take you sooner.`,
  },
  {
    q: 'Is there 3D CBCT imaging at the Banani branch?',
    a: 'Yes, CBCT is on site at Banani, so a scan is taken and read in the same visit rather than sending you elsewhere and booking a second appointment. CBCT is what makes implant placement, impacted third molars and complex root canal anatomy plannable in three dimensions instead of guessed at from a flat X-ray.',
  },
  {
    q: 'Where exactly is the Banani branch, and is there parking?',
    a: 'RH Dental Care Banani is on Level 7 of B&B Empire, Plot 116, Road 11, Banani, Dhaka 1213. TODO(client): confirm parking arrangements at B&B Empire — whether the building has visitor parking, and roughly how many spaces.',
  },
  {
    q: 'What are the Banani branch opening hours?',
    a: 'TODO(client): confirm the Banani opening days and hours. The site previously carried two different sets and neither was sourced, so nothing is published here until you confirm. Appointments are arranged by phone or WhatsApp in the meantime.',
  },
  {
    q: 'Do the same doctors work at both branches?',
    a: 'Yes. Dr. B.M. Rafiqul Hasan and Dr. Shimia Binte Taher see patients at both branches. The instruments, the implant systems, the ceramics and the sterilisation cycle are the same at both sites — there is no "Banani version" of a treatment.',
  },
  {
    q: 'Can I get a treatment plan and a cost before committing?',
    a: 'Yes. A first appointment at Banani is a consultation: examination, any imaging your case needs, and a written plan with a cost against it before any treatment begins. TODO(client): confirm the Banani consultation fee and whether it is credited against treatment if you proceed.',
  },
  {
    q: 'What does a course of implant treatment at Banani cost?',
    a: 'TODO(client): confirm the Banani implant package ranges. Per the positioning, Banani publishes ranges and a consultation fee rather than an itemised list; Banasree publishes the full price list.',
  },
  {
    q: 'I am travelling from abroad — can treatment be planned before I arrive?',
    a: 'Yes. Send existing X-rays or a CBCT by WhatsApp and a provisional plan and cost range can be prepared before you fly, then confirmed against a fresh examination when you arrive. TODO(client): confirm the minimum number of days on the ground needed for a single implant case and for a full-arch case, so patients can book flights against a real number.',
  },
];

export default bananiFaq;
