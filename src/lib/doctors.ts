// src/lib/doctors.ts
//
// The clinicians, as facts. These pages are what Google builds a knowledge panel
// from and what an AI assistant quotes when asked "who does implants in Dhaka",
// so a wrong credential here is worse than a missing one.
//
// CORRECTION TO docs/audit-report.md §6: the audit flagged BMDC 5169 and 8496 as
// two conflicting numbers for Dr. Hasan. They are not — 5169 is Dr. Hasan and
// 8496 is Dr. Shimia, consistently, in src/components/Hero.tsx and
// src/app/team/page.tsx. The real defect was narrower and worse: the OLD
// /dr-hasan page printed "BMDC Verified Specialist (8496)" under Dr. Hasan's
// name, i.e. it published another clinician's registration number as his. That
// is fixed here; both numbers below are the ones the repo consistently gives.
//
// TODO(client): confirm both registration numbers against the BMDC register
// before this goes live. Everything else below is taken from existing site copy
// (src/app/team/page.tsx), not from a certificate.

import type { BranchId } from './branches';

export interface Doctor {
  slug: string;
  name: string;
  fullName: string;
  role: string;
  /** BMDC registration. null → not published. Never guessed. */
  bmdc: string | null;
  qualifications: string[];
  training: string[];
  appointments: string[];
  procedures: string[];
  bio: string[];
  image: string;
  imageAlt: string;
  worksAt: BranchId[];
}

export const DOCTORS: Record<string, Doctor> = {
  'dr-hasan': {
    slug: 'dr-hasan',
    name: 'Dr. B.M. Rafiqul Hasan',
    fullName: 'Dr. B.M. Rafiqul Hasan (Mehedi)',
    role: 'Chief Consultant, Oral & Dental Surgeon',
    bmdc: '5169',

    qualifications: [
      'BDS — Sapporo Dental College, University of Dhaka',
      'MPH — City University',
      'PGT (Oral & Maxillofacial Surgery and Prosthodontics) — Bangabandhu Sheikh Mujib Medical University, Dhaka',
    ],
    training: [
      'Advanced implantology training in China, Korea and India',
    ],
    appointments: [
      'Senior Lecturer, MH Samorita Medical College & Hospital',
    ],
    procedures: [
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
      // TODO(client): year of first BMDC registration. The site said "12+ years"
      // with no start date, which needs editing every year to stay true. A year
      // does not.
    ],
    image: '/assets/dr_hasan_office_notext.png',
    imageAlt:
      'Dr. B.M. Rafiqul Hasan, Chief Consultant Oral and Dental Surgeon at RH Dental Care, in a white clinical coat.',
    worksAt: ['banani', 'banasree'],
  },

  'dr-shimia': {
    slug: 'dr-shimia',
    name: 'Dr. Shimia Binte Taher',
    fullName: 'Dr. Shimia Binte Taher',
    role: 'Senior Dental Surgeon — Microscopic Endodontics & Aesthetic Dentistry',
    bmdc: '8496',

    qualifications: [
      'BDS — Pioneer Dental College',
      'PGT (Oral & Maxillofacial Surgery) — Dhaka Medical College',
    ],
    training: [],
    appointments: [
      'Senior Lecturer, MH Samorita Medical College & Dental Unit',
    ],
    procedures: [
      'Microscope-assisted root canal treatment',
      'Exodontia, including surgical extractions',
      'Aesthetic and cosmetic dentistry',
      'Prosthodontics — crowns, bridges and dentures',
      'Minor oral surgical procedures',
    ],
    bio: [
      'Dr. Shimia Binte Taher sees patients at both RH Dental Care branches and leads the clinical team at Banani.',
      'Her clinical focus is endodontics done under an operating microscope — the discipline where seeing a canal rather than feeling for it is what separates a root canal that lasts from one that has to be redone — alongside aesthetic dentistry, prosthodontics and minor oral surgery.',
      'She is a Senior Lecturer at MH Samorita Medical College & Dental Unit.',
    ],
    image: '/assets/dr_shimia_no_text.png',
    imageAlt: 'Dr. Shimia Binte Taher, Senior Dental Surgeon at RH Dental Care, in a white clinical coat.',
    worksAt: ['banani', 'banasree'],
  },
};

export const DOCTOR_LIST = Object.values(DOCTORS);
