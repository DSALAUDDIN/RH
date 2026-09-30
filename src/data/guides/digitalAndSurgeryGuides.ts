import type { AuthorityGuide } from './implantGuides.ts';

export const digitalAndSurgeryGuides: AuthorityGuide[] = [
  {
    slug: 'cbct-dental-scan',
    title: 'CBCT Dental Scan: When 3D Imaging May Be Used',
    shortTitle: 'CBCT 3D Dental Scanning',
    category: 'digital-dentistry',
    categoryLabel: 'Digital Dentistry & 3D Imaging',
    primaryIntent: 'Educate patients on Cone Beam Computed Tomography (CBCT), radiation safety, and clinical diagnostic indications.',
    secondaryTopics: ['Cone Beam CT', 'Radiation dose comparison', 'Implant surgical planning', 'Impacted canine localization'],
    status: 'live',
    medicallyReviewed: true,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon (BSMMU PGT)',
    reviewedAt: '2026-09-28',
    relatedTreatments: [
      { title: 'Digital Dentistry Overview', href: '/digital-dentistry' },
      { title: 'Dental Implants', href: '/implants' },
      { title: 'Oral Surgery', href: '/dental-surgery' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Implant & Oral Surgeon' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Complete guide to CBCT 3D dental scans in Dhaka: clinical indications for implants, wisdom teeth, radiation dose facts, and diagnostic safety.',
    quickAnswer: 'A CBCT (Cone Beam Computed Tomography) scan produces high-resolution 3D volumetric images of jawbones, teeth, nerve canals, and sinuses at a significantly lower radiation dose than conventional hospital medical CT scans, providing indispensable safety data for implantology and oral surgery.',
    readingTimeMinutes: 6,
    sections: [
      {
        heading: 'Why 2D X-Rays Are Sometimes Insufficient',
        paragraphs: [
          'Traditional intraoral periapical x-rays and panoramic OPGs compress three-dimensional anatomical structures into a flat two-dimensional image. This creates magnification distortion, superimposition of adjacent bone walls, and conceals the true buccolingual width of the jaw.',
          'Cone Beam CT rotates a cone-shaped x-ray beam around the patient’s head, capturing hundreds of planar projections that specialized software reconstructs into an interactive 3D volumetric model.',
        ],
        keyPoints: [
          'True 1:1 scale: Accurate sub-millimeter anatomical measurements without geometric distortion.',
          'Cross-sectional visualization: Precise evaluation of bone depth and cortical plate density.',
          'Vital landmark localization: Exact mapping of the inferior alveolar nerve canal and maxillary sinus cavities.',
        ],
      },
      {
        heading: 'Clinical Indications for a 3D Dental Scan',
        paragraphs: [
          'CBCT imaging is selectively prescribed when clinical benefit clearly outweighs radiation exposure:',
          '1. Dental Implant Placement: Measuring bone height, width, and designing digital surgical guides.',
          '2. Complex Wisdom Teeth: Determining whether impacted third molar roots wrap around or contact the sensory mandibular nerve.',
          '3. Endodontic Investigation: Detecting missed root canals, internal root resorption, or complex periapical cysts.',
          '4. Impacted Teeth: Localizing unerupted canine teeth before orthodontic traction.',
        ],
      },
      {
        heading: 'Radiation Dose and Safety Considerations',
        paragraphs: [
          'Because CBCT uses focused collimation tailored to the specific area of interest (field of view), the radiation dose is a fraction of a traditional full-body medical CT scan. Lead apron protection and modern ALARA (As Low As Reasonably Achievable) radiation protocols ensure optimal diagnostic safety.',
        ],
      },
    ],
  },
  {
    slug: 'digital-dentistry',
    title: 'Digital Dentistry: How Technology Supports Treatment Planning',
    shortTitle: 'Digital Dentistry Treatment Planning',
    category: 'digital-dentistry',
    categoryLabel: 'Digital Dentistry & 3D Imaging',
    primaryIntent: 'Explain the digital workflow at modern dental practices: intraoral scanning, digital smile design, and CAD/CAM fabrication.',
    secondaryTopics: ['Intraoral scanner', 'CAD/CAM milling', 'Surgical guide 3D printing', 'Patient communication'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Digital Dentistry Overview', href: '/digital-dentistry' },
      { title: 'Zirconia Crowns', href: '/zirconia-crown' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Clinical Director' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Discover how digital dentistry transforms patient care: optical impressions, computer-aided design, 3D surgical guides, and faster restorative timelines.',
    quickAnswer: 'Digital dentistry replaces uncomfortable physical impressions and manual trial-and-error with high-speed 3D intraoral scanners, computerized treatment planning, and automated on-site CAD/CAM milling, resulting in superior restorative fit and shorter chair time.',
    readingTimeMinutes: 6,
    sections: [
      {
        heading: 'The Move Away from Physical Impression Trays',
        paragraphs: [
          'Traditional dental impressions required trays loaded with gooey alginate or silicone paste held in the mouth for several minutes, often triggering intense gag reflexes. Digital optical wands capture thousands of surface data points per second with gentle laser and light-emitting sensors.',
        ],
      },
      {
        heading: 'Predictable Computer-Aided Manufacturing (CAD/CAM)',
        paragraphs: [
          'Digital scans are transmitted directly to computerized milling machines. High-precision diamond burs carve restorations from solid blocks of biocompatible ceramic with margin accuracy measured in microns, ensuring tight seals that resist bacterial decay.',
        ],
      },
    ],
  },
  {
    slug: 'dental-surgery-dhaka',
    title: 'Dental Surgery in Dhaka: What Patients Should Expect',
    shortTitle: 'Dental Surgery Patient Guide',
    category: 'surgery',
    categoryLabel: 'Oral & Dental Surgery',
    primaryIntent: 'Prepare patients psychologically and clinically for minor oral surgical procedures under local anesthesia.',
    secondaryTopics: ['Local anesthesia', 'Pre-op preparation', 'Aseptic protocols', 'Post-surgical home care'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Oral Surgery Overview', href: '/dental-surgery' },
      { title: 'Dental Implants', href: '/implants' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Oral & Maxillofacial Surgeon' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'What to expect during outpatient dental surgery in Dhaka: anesthesia protocols, sterile surgical fields, procedure durations, and recovery instructions.',
    quickAnswer: 'Most dental surgical procedures (such as surgical extractions, cyst enucleation, or bone grafts) are outpatient treatments performed comfortably under targeted local anesthesia. Patients remain fully awake, feel gentle pressure without sharp pain, and return home the same day.',
    readingTimeMinutes: 6,
    sections: [
      {
        heading: 'Anesthesia and Pain Control During Surgery',
        paragraphs: [
          'Many patients experience unnecessary anxiety about oral surgery because they associate surgery with pain. Modern local anesthetics thoroughly block sensory nerve impulses in the treatment area. You will perceive tactile sensations and pressure vibrations, but no sharp discomfort.',
        ],
      },
      {
        heading: 'Sterilization and Infection Control Standards',
        paragraphs: [
          'Surgical procedures at RH Dental Care follow strict hospital autoclave sterilization regimens and disposable surgical drapes to ensure zero cross-contamination and optimal healing.',
        ],
      },
    ],
  },
  {
    slug: 'wisdom-tooth-removal',
    title: 'Wisdom Tooth Removal: Assessment, Procedure & Recovery',
    shortTitle: 'Wisdom Tooth Removal Guide',
    category: 'surgery',
    categoryLabel: 'Oral & Dental Surgery',
    primaryIntent: 'Provide a comprehensive guide on impacted third molars, pericoronitis symptoms, surgical extraction, and dry socket prevention.',
    secondaryTopics: ['Impacted wisdom teeth', 'Pericoronitis', 'Dry socket prevention', 'Post-op jaw stiffness'],
    status: 'live',
    medicallyReviewed: true,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: '2026-09-28',
    relatedTreatments: [
      { title: 'Oral Surgery Overview', href: '/dental-surgery' },
      { title: 'Digital Dentistry', href: '/digital-dentistry' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Oral Surgeon' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Complete guide to wisdom tooth extraction: when impacted teeth need removal, surgical steps under local anesthesia, and tips to avoid dry socket.',
    quickAnswer: 'Wisdom tooth removal is recommended when third molars lack adequate space to erupt upright, leading to painful gum flap infections (pericoronitis), decay in adjacent second molars, or cystic formation. Recovery typically takes 3 to 5 days with appropriate post-operative care.',
    readingTimeMinutes: 7,
    sections: [
      {
        heading: 'Why Do Wisdom Teeth Cause Trouble?',
        paragraphs: [
          'Wisdom teeth are the last teeth to emerge, usually between ages 17 and 25. Due to evolutionary reductions in human jaw size, modern jaws frequently lack room for these third molars, causing them to become impacted against bone or angled against the roots of neighboring molars.',
        ],
        keyPoints: [
          'Partial impaction: A flap of gum partially covers the crown, trapping food and bacterial biofilms.',
          'Pericoronitis: Swelling, foul taste, and difficulty opening the mouth (trismus).',
          'Damage to adjacent teeth: Severe decay on the distal surface of adjacent second molars.',
        ],
      },
      {
        heading: 'Preventing Dry Socket (Alveolar Osteitis)',
        paragraphs: [
          'Dry socket occurs when the blood clot in the extraction socket dislodges prematurely, exposing bone and nerve endings. To prevent this, avoid smoking, spitting forcefully, or drinking through straws for at least 72 hours post-surgery.',
        ],
      },
    ],
  },
];
