import type { AuthorityGuide } from './implantGuides.ts';

export const patientDecisionGuides: AuthorityGuide[] = [
  {
    slug: 'first-dental-visit',
    title: 'Your First Visit to RH Dental: What to Expect',
    shortTitle: 'Your First Visit Guide',
    category: 'patient-guides',
    categoryLabel: 'Patient Guides',
    primaryIntent: 'Familiarize new patients with the clinical consultation workflow, diagnostic imaging, and transparent treatment planning at RH Dental Care.',
    secondaryTopics: ['New patient registration', 'Comprehensive oral examination', 'Digital diagnostics', 'Treatment plan explanation'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon (BSMMU PGT)',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Full Treatment Catalogue', href: '/treatments' },
      { title: 'Our Services', href: '/services' },
      { title: 'Contact & Bookings', href: '/contact' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Chief Consultant' },
      { name: 'Dr. Shimia Binte Taher', href: '/dr-shimia', role: 'Consultant Endodontist' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Step-by-step overview of your first visit to RH Dental Care in Dhaka: medical history review, digital diagnostics, clinical consultation, and clear treatment options.',
    quickAnswer: 'Your first visit to RH Dental Care includes a comprehensive review of your medical and dental history, an intraoral visual and periodontal exam, targeted low-dose digital x-rays, and an unhurried discussion with our senior clinicians detailing your diagnosis, treatment options, timelines, and costs.',
    readingTimeMinutes: 6,
    sections: [
      {
        heading: 'Step 1: Patient Registration and Health History',
        paragraphs: [
          'Upon arrival at our Banani private dental suite or Banasree dental center, our patient care team welcomes you and assists with your registration.',
          'Reviewing your systemic medical background—including medications, allergies, diabetes, hypertension, and past surgeries—is essential because many systemic conditions directly influence dental health and surgical healing.',
        ],
      },
      {
        heading: 'Step 2: Comprehensive Clinical and Digital Examination',
        paragraphs: [
          'Your clinician conducts a thorough examination of teeth, periodontal gum attachments, tongue, and oral soft tissues. High-definition intraoral cameras allow you to view existing dental conditions on a chairside display screen, giving you full visual clarity.',
          'If indicated, digital periapical x-rays, panoramic radiographs, or 3D CBCT scans are captured to evaluate hidden root structures and jawbone density.',
        ],
        keyPoints: [
          'Visual camera inspection: View what the dentist sees in real-time.',
          'Periodontal probing: Evaluating gum health and early signs of bone loss.',
          'Bite alignment check: Reviewing occlusal wear, grinding patterns, and jaw joint comfort.',
        ],
      },
      {
        heading: 'Step 3: Transparent Treatment Planning Discussion',
        paragraphs: [
          'We believe in shared clinical decision-making. Your dentist explains findings in clear, everyday language, presenting treatment alternatives with their respective clinical pros, cons, and timelines.',
          'You receive a written treatment estimate detailing procedure stages before scheduling any follow-up care.',
        ],
      },
    ],
  },
  {
    slug: 'dental-emergency-dhaka',
    title: 'Dental Emergency in Dhaka: When to Seek Urgent Dental Care',
    shortTitle: 'Dental Emergency Guide',
    category: 'patient-guides',
    categoryLabel: 'Patient Guides',
    primaryIntent: 'Help patients triage severe dental symptoms, distinguish true emergencies from urgent concerns, and know immediate first-aid protocols.',
    secondaryTopics: ['Avulsed knocked-out tooth', 'Severe facial swelling', 'Uncontrolled oral bleeding', 'Cracked tooth first-aid'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Oral Surgery Services', href: '/dental-surgery' },
      { title: 'Root Canal Treatment', href: '/root-canal' },
      { title: 'Contact Information', href: '/contact' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Emergency & Oral Surgeon' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Immediate action guide for dental emergencies in Dhaka: what to do for a knocked-out tooth, rapid facial swelling, severe trauma, and persistent bleeding.',
    quickAnswer: 'True dental emergencies require immediate clinical intervention: an avulsed (knocked-out) permanent tooth within 60 minutes, rapidly progressing facial swelling that compromises breathing or swallowing, uncontrolled oral bleeding after trauma, or acute unbearable throbbing pain.',
    readingTimeMinutes: 7,
    sections: [
      {
        heading: 'How to Handle a Knocked-Out (Avulsed) Permanent Tooth',
        paragraphs: [
          'Time is critical when a permanent tooth is knocked out of its socket. The delicate periodontal ligament cells on the root surface remain viable for only 30 to 60 minutes outside the mouth.',
        ],
        keyPoints: [
          'Hold by the crown only: Never touch or scrape the root surface.',
          'Gently rinse with milk: If dirty, rinse briefly with cold milk or saline (do not scrub with soap).',
          'Store safely: Place the tooth in cold cow milk or inside the patient’s cheek pouch during transit to the dental clinic.',
        ],
      },
      {
        heading: 'Facial Swelling and Spreading Infections',
        paragraphs: [
          'A swollen cheek accompanied by high fever or difficulty opening the mouth or swallowing indicates an acute dental abscess that may be spreading into deep fascial spaces (such as Ludwig\'s angina). This requires urgent clinical debridement and antibiotic therapy.',
        ],
        callout: {
          title: 'Emergency Contact Protocol',
          text: 'If you suffer an acute dental emergency in Dhaka, call RH Dental Care immediately so our clinical team can prepare an operatory and guide you on immediate transport steps.',
          type: 'warning',
        },
      },
    ],
  },
  {
    slug: 'nrb-dental-treatment-bangladesh',
    title: 'Dental Treatment Planning for NRB Patients Visiting Bangladesh',
    shortTitle: 'Dental Care for NRB Patients',
    category: 'patient-guides',
    categoryLabel: 'Patient Guides',
    primaryIntent: 'Provide Non-Resident Bangladeshi (NRB) patients with realistic advice on planning dental care during short holidays in Dhaka.',
    secondaryTopics: ['Treatment timeline coordination', 'Remote pre-assessment', 'Implant healing schedules', 'Digital follow-up'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon (BSMMU PGT)',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Dental Tourism & Overseas Care', href: '/dental-tourism' },
      { title: 'Dental Implants', href: '/implants' },
      { title: 'Zirconia Crowns', href: '/zirconia-crown' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Clinical Director' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Practical guide for NRBs visiting Dhaka: coordinating multi-stage implant or smile design treatments within limited vacation days with digital pre-planning.',
    quickAnswer: 'Non-Resident Bangladeshis visiting Dhaka can successfully complete complex dental care by coordinating pre-travel digital consultations, scheduling initial diagnostic visits on day 1 or 2 of arrival, and structuring treatments (such as implants or crowns) within verified biological healing timelines.',
    readingTimeMinutes: 7,
    sections: [
      {
        heading: 'The Importance of Pre-Travel Digital Coordination',
        paragraphs: [
          'Many NRBs visit Bangladesh for 2 to 4 weeks, with schedules packed with family events and travel. Attempting complex dental treatments without advance coordination leads to rushed care and compromises biological healing.',
          'At RH Dental Care, overseas patients can share recent dental records or OPG panoramic x-rays via WhatsApp or email prior to booking flights, allowing our senior team to outline realistic visit schedules in advance.',
        ],
      },
      {
        heading: 'Which Treatments Fit Within a 2 to 3-Week Trip?',
        paragraphs: [
          'Certain multi-stage treatments easily fit into a standard short vacation, while others require structured multi-trip planning:',
          '1. Zirconia Crowns & Veneers: With our on-site digital scanning and CAD/CAM milling facility, full smile rehabilitations can be completed in 5 to 10 days.',
          '2. Root Canal & Crown: Microscopic endodontic therapy can be completed in 1 to 2 visits, followed by permanent crown placement a few days later.',
          '3. Dental Implants: Stage 1 (fixture placement) takes 1 visit. The implant then needs 8 to 16 weeks to osseointegrate. Many NRB patients have the implant placed during one visit and receive their final crown during their next vacation.',
        ],
        keyPoints: [
          'Book initial exam on Day 1 or 2: Leaves maximum buffer time for laboratory work before departure.',
          'Complete clinical documentation: RH Dental provides detailed treatment summaries, implant passport cards, and radiographs for your home-country dentist.',
        ],
      },
    ],
  },
  {
    slug: 'dental-treatment-bangladesh',
    title: 'Planning Dental Treatment in Bangladesh: A Patient Guide',
    shortTitle: 'Dental Treatment in Bangladesh',
    category: 'patient-guides',
    categoryLabel: 'Patient Guides',
    primaryIntent: 'Educate international and diaspora patients on logistics, clinical standards, sterilization benchmarks, and continuity of care when planning dental travel.',
    secondaryTopics: ['International sterilization standards', 'Digital dental workflow', 'Airport proximity', 'Documentation for home clinicians'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Dental Tourism Programme', href: '/dental-tourism' },
      { title: 'Dental Implants', href: '/implants' },
      { title: 'Banani Clinic Suite', href: '/banani' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Clinical Director' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Essential guide for travelers planning dental care in Dhaka: clinical standards, sterilization protocols, realistic timelines, and medical record continuity.',
    quickAnswer: 'Planning dental treatment in Bangladesh requires verifying the clinician’s BMDC credentials, ensuring the facility adheres to international Class-B autoclave sterilization, coordinating realistic biological healing timelines, and obtaining comprehensive digital records for post-care continuity.',
    readingTimeMinutes: 7,
    sections: [
      {
        heading: 'Why Patients Seek Quality Dental Care in Dhaka',
        paragraphs: [
          'Patients from North America, Europe, and the Middle East increasingly combine dental treatments with travel to Bangladesh. High-tier private clinics in Dhaka feature modern digital technologies—including 3D CBCT, operating microscopes, and on-site CAD/CAM milling—at a fraction of Western private practice fees.',
          'However, patient safety and biological care must always take precedence over convenience or speed.',
        ],
      },
      {
        heading: 'Key Verification Criteria for Traveling Patients',
        paragraphs: [
          'Before booking your flights, verify that your chosen dental provider meets critical quality standards:',
          '1. Clinician Registration: Verified registration with the Bangladesh Medical and Dental Council (BMDC).',
          '2. Infection Control: Strict hospital-grade autoclave sterilization protocols with pouch indicators.',
          '3. Traceable Implant Systems: Use of internationally documented implant brands (such as Straumann or Osstem) that can be serviced anywhere in the world.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-choose-dentist-dhaka',
    title: 'How to Choose a Dentist in Dhaka: An Educational Guide',
    shortTitle: 'Choosing a Dentist in Dhaka',
    category: 'patient-guides',
    categoryLabel: 'Patient Guides',
    primaryIntent: 'Provide an objective, educational checklist for patients evaluating dental clinics and dental surgeons in Dhaka.',
    secondaryTopics: ['BMDC registration', 'Sterilization standards', 'Clear communication', 'Specialist referrals'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Clinical Team Overview', href: '/team' },
      { title: 'About Our Practice', href: '/about' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Chief Consultant' },
      { name: 'Dr. Shimia Binte Taher', href: '/dr-shimia', role: 'Consultant Endodontist' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Objective checklist for selecting a qualified dental professional in Dhaka: BMDC verification, sterilization protocols, diagnostic technology, and transparent plans.',
    quickAnswer: 'To choose a qualified dentist in Dhaka, verify their BMDC registration number and postgraduate credentials, inspect clinic sterilization protocols, ensure modern diagnostic imaging (such as digital x-rays) is used, and look for transparent, written treatment proposals.',
    readingTimeMinutes: 7,
    sections: [
      {
        heading: '1. Verify BMDC Professional Registration',
        paragraphs: [
          'In Bangladesh, every legally qualified dentist must be registered with the Bangladesh Medical and Dental Council (BMDC) with a recognized Bachelor of Dental Surgery (BDS) degree. Reputable clinics openly publish their clinicians\' BMDC numbers on their website and prescription forms.',
        ],
      },
      {
        heading: '2. Review Post-Graduate Training in Specialized Fields',
        paragraphs: [
          'While a BDS degree qualifies a clinician for general dentistry, complex procedures such as surgical implantology, microscopic root canal retreatment, and orthodontic aligners require structured postgraduate training (such as PGT, FCPS, MS, or accredited international fellowships).',
        ],
      },
      {
        heading: '3. Inspection of Hygiene and Sterilization Protocols',
        paragraphs: [
          'Cross-infection control is non-negotiable. Quality dental facilities utilize Class-B vacuum autoclaves, individually heat-sealed sterile instrument pouches opened in front of the patient, and medical-grade surface disinfectants between every appointment.',
        ],
      },
      {
        heading: '4. Clear, Unrushed Doctor-Patient Communication',
        paragraphs: [
          'A conscientious clinician never pushes aggressive, irreversible treatments without thoroughly explaining alternative conservative options. You should feel comfortable asking questions, understanding why a procedure is necessary, and receiving a clear cost estimate.',
        ],
      },
    ],
  },
];
