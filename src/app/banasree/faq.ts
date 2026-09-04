// src/app/banasree/faq.ts — answer-first, same rules as banani/faq.ts.

import type { FaqItem } from '@/lib/schema';

export const banasreeFaq: FaqItem[] = [
  {
    q: 'What is at the Banasree branch that is not at Banani?',
    a: 'The in-house master digital lab, the full specialist team on site, the published price list and 0% EMI. Banasree is the bigger setup, so a case that needs several disciplines — surgery, endodontics, orthodontics and prosthetics — can be handled in one building without referring you out between stages.\n\nThe clinical care itself is the same at both branches: same doctors, same materials, same sterilisation protocol.',
  },
  {
    q: 'What does the in-house digital lab actually change for me?',
    a: 'It removes the courier round-trip to an outside lab, so the gap between your preparation appointment and your fitting appointment is shorter, and a shade or contact point that needs adjusting can be corrected while you wait rather than at another visit. Crowns, bridges and veneers are scanned, designed and milled on site.\n\nTODO(client): confirm the typical turnaround for a single crown at Banasree, in days, so this page can give a number.',
  },
  {
    q: 'Are prices published?',
    a: 'Yes. Banasree publishes its price list up front so you can see what a treatment costs before you book. TODO(client): supply the current price list — treatment name, price, and what each price includes.',
  },
  {
    q: 'How does the 0% EMI work?',
    a: '0% EMI spreads the cost of a treatment plan over monthly instalments with no interest added. TODO(client): confirm which cards or lenders it runs through, the minimum treatment value that qualifies, and the tenures available.',
  },
  {
    q: 'Do I need an appointment, or can I walk in?',
    a: 'TODO(client): confirm whether Banasree accepts walk-ins and, if so, during which hours. Booking ahead is always faster, and booking online gives you a reference number reception can find.',
  },
  {
    q: 'What are the Banasree opening hours?',
    a: 'TODO(client): confirm the opening days and hours. The site previously carried three inconsistent versions, so nothing is published here until you confirm one.',
  },
  {
    q: 'Where is the Banasree branch?',
    a: 'RH Dental Care Banasree is at House 42, Road 8, Block C, Banasree, Dhaka 1219. TODO(client): confirm parking and the nearest landmark for directions.',
  },
  {
    q: 'Is treatment at Banasree a lower standard than at Banani?',
    a: 'No. The clinicians, the materials, the instruments and the sterilisation protocol are identical at both branches. Banani costs more because it runs an appointment-only schedule that keeps the room and the clinician yours for the whole slot — that is a difference in setting and pace, not in dentistry.',
  },
];

export default banasreeFaq;
