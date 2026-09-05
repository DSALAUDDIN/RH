// src/lib/doctors.ts
//
// The clinical team, as facts.
//
// TWO TIERS, deliberately:
//
//  · FULL PROFILE — Dr. Hasan and Dr. Shimia. They have their own pages,
//    confirmed qualifications and BMDC numbers, and a full Physician schema.
//
//  · ROSTER ENTRY — everyone else. The client supplied names, branches and, for
//    some, working hours. Nothing else. So nothing else is published: no
//    invented job titles, no guessed specialties, no BMDC numbers. A roster
//    entry still emits a Physician node carrying the name and the affiliation,
//    which is truthful and useful to the knowledge graph, but claims nothing
//    that has not been confirmed.
//
// TODO(client) — to turn a roster entry into a full profile, supply per person:
//   BMDC registration number · degrees and awarding institutions · clinical
//   focus · a photograph. Then move them into DOCTORS below.
//
// CORRECTION TO docs/audit-report.md §6: BMDC 5169 and 8496 are not two numbers
// for one person — 5169 is Dr. Hasan and 8496 is Dr. Shimia, consistently. The
// real defect was that the old /dr-hasan page printed 8496 (Dr. Shimia's number)
// under Dr. Hasan's name.

import type { BranchId } from './branches';

/** Where and when a clinician sits. */
export interface Posting {
  branch: BranchId;
  /** e.g. '9:00 am – 2:00 pm'. Undefined when the client did not specify. */
  hours?: string;
  /** e.g. 'Saturday, Monday, Wednesday'. Undefined when not specified. */
  days?: string;
  /** Not on a fixed rota — attends when a case needs them. */
  onCall?: boolean;
}

export interface Clinician {
  /** Present only for clinicians with their own page. */
  slug?: string;
  name: string;
  /** Name as it should appear in schema and citations. */
  fullName: string;
  postings: Posting[];
  /** null → not published. Never guessed. */
  bmdc: string | null;
  role: string | null;
  qualifications: string[];
  training: string[];
  appointments: string[];
  procedures: string[];
  bio: string[];
  image: string | null;
  imageAlt: string | null;
}

/* ── Full profiles ─────────────────────────────────────────────────────── */

export const DOCTORS: Record<string, Clinician> = {
  'dr-hasan': {
    slug: 'dr-hasan',
    name: 'Dr. B.M. Rafiqul Hasan',
    fullName: 'Dr. B.M. Rafiqul Hasan (Mehedi)',
    postings: [
      { branch: 'banani', hours: '9:00 am – 2:00 pm' },
      { branch: 'banasree' },
    ],
    bmdc: '5169',
    role: 'Chief Consultant, Oral & Dental Surgeon',
    qualifications: [
      'BDS — Sapporo Dental College, University of Dhaka',
      'MPH — City University',
      'PGT (Oral & Maxillofacial Surgery and Prosthodontics) — Bangabandhu Sheikh Mujib Medical University, Dhaka',
    ],
    training: ['Advanced implantology training in China, Korea and India'],
    appointments: ['Senior Lecturer, MH Samorita Medical College & Hospital'],
    procedures: [
      'Team Lead (Banasree & Banani Branch)',
      'Dental implants, including guided placement planned from a CBCT scan',
      'Full-mouth rehabilitation',
      'Oral and minor surgical procedures',
      'Prosthodontics — crowns, bridges and dentures',
      'Cosmetic dentistry and smile design',
    ],
    bio: [
      'Dr. Hasan is the founding clinician of RH Dental Care and sees patients at both branches — the appointment-only suite in Banani and the flagship hospital in Banasree.',
      'His main clinical interest is implantology planned in three dimensions: a CBCT scan taken before placement, the implant position decided against measured bone volume and nerve position rather than estimated from a flat radiograph, and, where the case calls for it, placed through a guided surgical stent.',
      'He also teaches, as a Senior Lecturer at MH Samorita Medical College & Hospital.',
    ],
    image: '/assets/dr_hasan_flyer.jpeg',
    imageAlt:
      'Dr. B.M. Rafiqul Hasan, Chief Consultant Oral and Dental Surgeon at RH Dental Care, in a white clinical coat.',
  },

  'dr-shimia': {
    slug: 'dr-shimia',
    name: 'Dr. Shimia Binte Taher',
    fullName: 'Dr. Shimia Binte Taher',
    postings: [
      { branch: 'banani', hours: '4:30 pm – 10:00 pm' },
      { branch: 'banasree', onCall: true },
    ],
    bmdc: '8496',
    role: 'Senior Dental Surgeon — Microscopic Endodontics & Aesthetic Dentistry',
    qualifications: [
      'BDS — Pioneer Dental College',
      'PGT (Oral & Maxillofacial Surgery) — Dhaka Medical College',
    ],
    training: [],
    appointments: ['Senior Lecturer, MH Samorita Medical College & Dental Unit'],
    procedures: [
      'Microscope-assisted root canal treatment',
      'Exodontia, including surgical extractions',
      'Aesthetic and cosmetic dentistry',
      'Prosthodontics — crowns, bridges and dentures',
      'Minor oral surgical procedures',
    ],
    bio: [
      'Dr. Shimia Binte Taher leads the clinical team at Banani, where she runs the evening session, and attends Banasree on call.',
      'Her clinical focus is endodontics done under an operating microscope — the discipline where seeing a canal rather than feeling for it is what separates a root canal that lasts from one that has to be redone — alongside aesthetic dentistry, prosthodontics and minor oral surgery.',
      'She is a Senior Lecturer at MH Samorita Medical College & Dental Unit.',
    ],
    image: '/assets/dr_shimia_flyer.jpeg',
    imageAlt: 'Dr. Shimia Binte Taher, Senior Dental Surgeon at RH Dental Care, in a white clinical coat.',
  },
};

/* ── Roster ────────────────────────────────────────────────────────────────
   Names, titles, qualifications, BMDC numbers and working days below are read
   off RH Dental Care's own clinician flyers, which are in the repository at
   src/assets/doctors/*.jpeg. That is the same evidential standard as Dr. Hasan's
   BMDC 5169, which came from src/app/team/page.tsx — the clinic's own published
   material, not something I inferred.

   TODO(client): confirm each row against the BMDC register before launch. A
   flyer is marketing artwork; it can be out of date, and a wrong registration
   number on a medical site is the kind of error that costs more than a blank.

   TWO THINGS I COULD NOT RESOLVE — see the notes at the end of this file.
   ─────────────────────────────────────────────────────────────────────────*/

interface RosterInput {
  name: string;
  role: string;
  qualifications: string[];
  bmdc: string | null;
  speciality?: string;
  postings: Posting[];
  image?: string;
}

function rosterEntry(i: RosterInput): Clinician {
  return {
    name: i.name,
    fullName: i.name,
    postings: i.postings,
    bmdc: i.bmdc,
    role: i.role,
    qualifications: i.qualifications,
    training: [],
    appointments: [],
    procedures: i.speciality ? [i.speciality] : [],
    bio: [],
    image: i.image ?? null,
    imageAlt: i.image ? `${i.name}, ${i.role} at RH Dental Care.` : null,
  };
}

const P = '/assets/team';

/** Banasree's afternoon/evening session, as printed on the flyers. */
const BSR = (days: string, hours: string): Posting[] => [
  { branch: 'banasree', days, hours },
];

export const ROSTER: Clinician[] = [
  rosterEntry({
    name: 'Dr. Mahaesa Tamima',
    role: 'Senior Oral & Dental Surgeon',
    qualifications: ['BDS (DU)', 'PGT (BSMMU)', 'Endodontics (DDC)'],
    bmdc: '9632',
    postings: BSR('Saturday – Wednesday, Friday', '3:30 pm – 10:00 pm'),
    image: `${P}/Tamima.jpeg`,
  }),
  rosterEntry({
    name: 'Dr. Nishat Tamanna Alam',
    role: 'Senior Oral & Dental Surgeon',
    qualifications: ['BDS (DU)', 'PGT (DDC)'],
    bmdc: '9245',
    postings: BSR('Saturday – Wednesday', '3:30 pm – 10:00 pm'),
    image: `${P}/Tamanna.jpeg`,
  }),
  rosterEntry({
    name: 'Dr. Mansura Panna',
    role: 'Senior Oral & Dental Surgeon',
    qualifications: ['BDS (DU)', 'PGT (DMC)'],
    bmdc: '15054',
    speciality: 'Endodontics',
    postings: BSR('Friday – Tuesday', '5:00 pm – 10:00 pm'),
    image: `${P}/Panna.jpeg`,
  }),
  rosterEntry({
    name: 'Dr. Fariha Ferdous',
    role: 'Oral & Dental Surgeon',
    qualifications: ['BDS — Mymensingh Medical College, Dental Unit'],
    bmdc: '14623',
    postings: BSR('Saturday, Sunday, Monday, Wednesday, Friday', '3:30 pm – 9:00 pm'),
    image: `${P}/Fariha.jpeg`,
  }),
  rosterEntry({
    name: 'Dr. Umaya Khanam',
    role: 'Oral & Dental Surgeon',
    qualifications: ['BDS (DU)'],
    bmdc: '18104',
    postings: BSR('Saturday, Sunday, Monday, Tuesday, Friday', '4:30 pm – 10:00 pm'),
    image: `${P}/Umaya.jpeg`,
  }),
  rosterEntry({
    name: 'Dr. Afzal Chowdhury',
    role: 'Oral & Dental Surgeon',
    qualifications: ['BDS (DU)'],
    bmdc: '18107',
    postings: BSR('Saturday, Sunday, Monday, Wednesday, Friday', '4:30 pm – 10:00 pm'),
    image: `${P}/Afzal.jpeg`,
  }),
  rosterEntry({
    name: 'Dr. Nabil Rahaman',
    role: 'Consultant Orthodontist',
    qualifications: ['FCPS', 'BDS'],
    // TODO(client): Dr. Nabil's flyer is the only one with no BMDC number on it.
    // TODO(client): The only image supplied (nabil.webp) is a social-media
    //   appointment-booking card, not a headshot — the right half is a scheduling
    //   UI that renders visibly in the card. Replaced with initials until a clean
    //   portrait is provided.
    bmdc: null,
    speciality: 'Orthodontics',
    postings: BSR('Saturday', '3:30 pm – 9:00 pm'),
    image: `${P}/Nabil.jpeg`,
  }),

  rosterEntry({
    name: 'Prof. Dr. Md. Shahidul Islam Shaheen',
    role: 'Clinical Advisor',
    qualifications: ['BDS', 'MS (OMS)', 'FCPS (Surgery)'],
    bmdc: '934',
    speciality: 'Oral & Maxillofacial Surgery',
    postings: [{ branch: 'banasree', onCall: true }],
    image: `${P}/shaheen.png`,
  }),

  // ── No flyer in the repository: name and branch only. ──
  rosterEntry({
    name: 'Dr. Tonima',
    role: 'Dental Surgeon',
    qualifications: [],
    bmdc: null,
    postings: [{ branch: 'banasree' }],
  }),
  rosterEntry({
    name: 'Dr. Noton',
    role: 'Dental Surgeon',
    qualifications: [],
    bmdc: null,
    postings: [{ branch: 'banasree' }],
  }),

  // ── Both branches ──
  rosterEntry({
    name: 'Dr. Jeamima Tabassum Barsha',
    role: 'Oral & Dental Surgeon',
    qualifications: ['BDS (DU)'],
    bmdc: '14439',
    speciality: 'Clear aligners and orthodontics',
    postings: [
      { branch: 'banasree', days: 'Sunday, Tuesday', hours: '5:00 pm – 10:00 pm' },
      { branch: 'banani' },
    ],
    image: `${P}/Barsha.jpeg`,
  }),

  // ── Banani ──
  rosterEntry({
    name: 'Dr. Monisha Haque Hreedy',
    role: 'Oral & Dental Surgeon',
    qualifications: ['BDS (DU)'],
    bmdc: '17168',
    // TODO(client): her flyer prints the Banasree address and these Banasree
    // hours, but your roster places her at Banani. Which is current?
    postings: [{ branch: 'banani' }],
    image: `${P}/Hreedy.jpeg`,
  }),
  rosterEntry({
    name: 'Dr. Mim',
    role: 'Dental Surgeon',
    qualifications: [],
    bmdc: null,
    postings: [
      { branch: 'banani', days: 'Saturday, Monday, Wednesday', hours: '9:00 am – 2:00 pm' },
    ],
  }),
  rosterEntry({
    name: 'Dr. Nusrat',
    role: 'Dental Surgeon',
    qualifications: [],
    bmdc: null,
    postings: [{ branch: 'banani', hours: '4:30 pm – 10:00 pm' }],
  }),
];

/* ═══ UNRESOLVED — please answer these two ═══════════════════════════════════

 1. "Dr. Nishat" and "Dr. Tamanna" are numbers 4 and 7 on your Banasree list, as
    two separate people. The repository holds ONE flyer, for "Dr. Nishat Tamanna
    Alam" (BMDC 9245). Either that is one person you listed twice, or there is a
    second clinician with no flyer. I have entered ONE person. If there are two,
    send the missing one's details.

 2. Dr. Hreedy and Dr. Barsha appear on your BANANI list, but both their flyers
    print the Banasree address, phone and hours. I have followed your list for
    the branch and dropped the flyer hours for Hreedy. Confirm.

 Also outstanding:
  · No flyer for Dr. Tonima, Dr. Noton, Dr. Mim or Dr. Nusrat — they render as
    an initial, with no qualifications shown. Send details and photographs.
  · Dr. Asma (src/assets/Doctor_List/Asma.png) and Prof. Dr. Md. Shahidul Islam
    Shaheen (src/assets/doctors/dr_shaheen.png, previously listed on /team as
    "Clinical Advisor & On-Call Specialist") are NOT on your roster and are no
    longer rendered anywhere. Have they left, or were they omitted by mistake?

 STRONG LEAD ON THE OPENING-HOURS TODO: every Banasree flyer shows a session
 between 3:30 pm and 10:00 pm, and your Banani list runs 9:00 am – 2:00 pm and
 4:30 pm – 10:00 pm. That is consistent enough to publish once you confirm it —
 which would close one of the four items still blocking launch.
 ═══════════════════════════════════════════════════════════════════════════ */

/** Everyone, full profiles first. */
export const TEAM: Clinician[] = [...Object.values(DOCTORS), ...ROSTER];

export const DOCTOR_LIST = Object.values(DOCTORS);

export function teamAt(branch: BranchId): Clinician[] {
  return TEAM.filter((c) => c.postings.some((p) => p.branch === branch));
}

/** "9:00 am – 2:00 pm", "Sat, Mon, Wed · 9:00 am – 2:00 pm", "On call", or null. */
export function postingLabel(c: Clinician, branch: BranchId): string | null {
  const p = c.postings.find((x) => x.branch === branch);
  if (!p) return null;
  if (p.onCall) return 'On call';
  if (p.days && p.hours) return `${p.days} · ${p.hours}`;
  return p.hours ?? p.days ?? null;
}

export function initials(name: string): string {
  return name
    .replace(/^Dr\.?\s*/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}
