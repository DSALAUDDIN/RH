import type { AuthorityGuide } from './implantGuides.ts';

export const generalCareGuides: AuthorityGuide[] = [
  {
    slug: 'teeth-whitening',
    title: 'Professional Teeth Whitening: Suitability, Process & Expectations',
    shortTitle: 'Professional Teeth Whitening',
    category: 'general-care',
    categoryLabel: 'General Oral Care',
    primaryIntent: 'Set realistic expectations regarding professional teeth whitening, shade assessment, sensitivity management, and longevity.',
    secondaryTopics: ['In-office bleaching', 'Intrinsic vs extrinsic stains', 'Transient dentin sensitivity', 'Maintenance protocols'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Veneers & Aesthetics', href: '/zirconia-veneers' },
      { title: 'Zirconia Smile Design', href: '/zirconia-crown' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Aesthetic Surgeon' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Complete guide to in-office professional teeth whitening in Dhaka: how it works, managing transient sensitivity, dietary rules, and realistic shade expectations.',
    quickAnswer: 'Professional in-office teeth whitening uses medically calibrated hydrogen or carbamide peroxide gels under gingival barrier protection to oxidize deep extrinsic stains from tea, coffee, and tobacco, safely lifting tooth shade by several levels in a single 60-minute session.',
    readingTimeMinutes: 6,
    sections: [
      {
        heading: 'How Professional Whitening Differs from Over-the-Counter Products',
        paragraphs: [
          'Commercial whitening toothpastes and charcoal powders work primarily through physical abrasion, which can wear down protective enamel without bleaching deep internal discoloration.',
          'Professional dental whitening uses safe, medically approved oxidizing chemistry that penetrates the porous enamel prism structure to dissolve complex chromogen molecules without scratching or thinning the enamel layer.',
        ],
      },
      {
        heading: 'Managing Transient Tooth Sensitivity',
        paragraphs: [
          'Some patients experience temporary sensitivity to cold foods for 24 to 48 hours following treatment. Applying desensitizing pastes containing potassium nitrate or amorphous calcium phosphate (ACP) rapidly soothes the dental tubules.',
        ],
      },
    ],
  },
  {
    slug: 'gum-disease-treatment',
    title: 'Gum Disease: Assessment, Treatment & Maintenance',
    shortTitle: 'Gum Disease Treatment Guide',
    category: 'general-care',
    categoryLabel: 'General Oral Care',
    primaryIntent: 'Educate patients on the stages of periodontal disease, scaling and root planing, and long-term tooth preservation.',
    secondaryTopics: ['Gingivitis vs periodontitis', 'Periodontal pocketing', 'Deep ultrasonic scaling', 'Bone loss prevention'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Oral Surgery Services', href: '/dental-surgery' },
      { title: 'Dental Implants', href: '/implants' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Periodontal & Dental Surgeon' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Understanding gum disease from bleeding gingivitis to destructive periodontitis: symptoms, deep ultrasonic scaling, and saving loose teeth.',
    quickAnswer: 'Gum disease begins as reversible gingivitis (red, bleeding gums) caused by plaque buildup. Left untreated, it advances to periodontitis, where bacterial toxins destroy the bone supporting tooth roots. Treatment involves deep ultrasonic scaling and root planing.',
    readingTimeMinutes: 7,
    sections: [
      {
        heading: 'Gingivitis vs. Periodontitis: What Is the Difference?',
        paragraphs: [
          'Gingivitis is the early, superficial inflammation of the gingival margin. Gums bleed when brushing or flossing, but the underlying alveolar bone remains intact. With professional scaling and improved home hygiene, gingivitis is completely reversible.',
          'Periodontitis occurs when inflammation migrates deeper, creating subgingival pockets and irreversibly eroding the alveolar bone holding teeth in place. It is the leading cause of tooth loss in adults worldwide.',
        ],
        keyPoints: [
          'Gingivitis: Bleeding gums without bone loss; fully reversible.',
          'Periodontitis: Formation of deep pockets (>4mm), bone recession, and tooth mobility; requires active periodontal maintenance.',
        ],
      },
      {
        heading: 'Deep Cleaning: Scaling and Root Planing (SRP)',
        paragraphs: [
          'Standard teeth cleaning polishes the crowns of teeth above the gumline. Scaling and root planing is a therapeutic deep cleaning performed under local anesthesia to remove calcified calculus (tartar) and bacterial biofilms from deep root surfaces, smoothing the root so gums can reattach.',
        ],
      },
    ],
  },
  {
    slug: 'child-first-dental-visit',
    title: 'A Child\'s First Dental Visit: A Parent\'s Guide',
    shortTitle: 'Child First Dental Visit Guide',
    category: 'general-care',
    categoryLabel: 'General Oral Care',
    primaryIntent: 'Help parents introduce their young children to the dental clinic positively and prevent early childhood caries.',
    secondaryTopics: ['First dental visit timing', 'Tell-Show-Do technique', 'Milk tooth cavity prevention', 'Fluoride varnish'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. Shimia Binte Taher',
    reviewerSlug: 'dr-shimia',
    reviewerRole: 'Consultant Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Children\'s Dentistry', href: '/kids-care' },
      { title: 'Special Child Dental Care', href: '/special-child' },
    ],
    relatedDoctors: [
      { name: 'Dr. Shimia Binte Taher', href: '/dr-shimia', role: 'Pediatric & Endodontic Consultant' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Parenting guide to preparing children for their first dental appointment: ideal timing, creating a fear-free experience, and early cavity prevention.',
    quickAnswer: 'A child should have their first dental visit by their first birthday or within six months of their first baby tooth erupting. The goal is to establish a friendly "dental home", check early jaw development, and guide parents on bottle caries prevention.',
    readingTimeMinutes: 6,
    sections: [
      {
        heading: 'Why Early Visits Matter for Milk Teeth',
        paragraphs: [
          'Many parents mistakenly assume baby teeth do not matter because they eventually fall out. In reality, milk teeth hold vital space for permanent teeth, guide jaw growth, and facilitate proper speech and nutrition.',
          'Early checkups detect night-bottle caries, tongue ties, and developmental enamel defects long before they cause toothache or infection.',
        ],
      },
      {
        heading: 'The "Tell-Show-Do" Approach for Kids',
        paragraphs: [
          'At RH Dental Care Banasree and Banani, our pediatric team uses the gentle "Tell-Show-Do" methodology: first explaining dental instruments with friendly words (e.g. "tooth counter", "water whistle"), demonstrating on a finger or toy, and only then gently examining the child.',
        ],
      },
    ],
  },
  {
    slug: 'oral-hygiene-after-dental-treatment',
    title: 'Oral Hygiene After Dental Treatment: A Recovery & Care Guide',
    shortTitle: 'Oral Hygiene After Treatment',
    category: 'general-care',
    categoryLabel: 'General Oral Care',
    primaryIntent: 'Provide precise daily hygiene instructions for patients with new crowns, bridges, implants, or post-surgical sutures.',
    secondaryTopics: ['Flossing under bridges', 'Super-floss for implants', 'Chlorhexidine rinse use', 'Electric toothbrush benefits'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. Shimia Binte Taher',
    reviewerSlug: 'dr-shimia',
    reviewerRole: 'Consultant Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Root Canal Treatment', href: '/root-canal' },
      { title: 'Dental Implants', href: '/implants' },
      { title: 'Zirconia Crowns', href: '/zirconia-crown' },
    ],
    relatedDoctors: [
      { name: 'Dr. Shimia Binte Taher', href: '/dr-shimia', role: 'Consultant' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Essential oral hygiene protocols following dental procedures: brushing around new crowns, flossing under bridges, and caring for healing surgical sites.',
    quickAnswer: 'Maintaining oral hygiene after treatment requires gentle brushing with a soft-bristled toothbrush, using specialized super-floss or interdental brushes under bridges and around implants, and short-term warm saline or chlorhexidine rinses for healing gums.',
    readingTimeMinutes: 5,
    sections: [
      {
        heading: 'Hygiene for Dental Crowns and Bridges',
        paragraphs: [
          'While a ceramic crown cannot decay, the natural tooth margin where the crown meets the root remains vulnerable to plaque accumulation and margin caries. Clean the margin thoroughly twice daily using non-abrasive fluoride toothpaste.',
          'For dental bridges, use a floss threader or specialized sponge-end super-floss to sweep under the suspended fake tooth (pontic) where food particles collect.',
        ],
      },
    ],
  },
  {
    slug: 'dental-treatment-cost-factors',
    title: 'How Dental Treatment Cost Is Estimated: Clinical Variables Explained',
    shortTitle: 'How Dental Costs Are Estimated',
    category: 'general-care',
    categoryLabel: 'General Oral Care',
    primaryIntent: 'Demystify dental fee calculations by explaining the legitimate clinical, technological, and diagnostic factors that shape comprehensive treatment estimates.',
    secondaryTopics: ['Diagnosis and radiography', 'Biomaterial grades', 'Laboratory craftsmanship', 'Specialist chair time'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. B.M. Rafiqul Hasan',
    reviewerSlug: 'dr-hasan',
    reviewerRole: 'Chief Consultant, Oral & Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Treatments Catalogue', href: '/treatments' },
      { title: 'Dental Services', href: '/services' },
    ],
    relatedDoctors: [
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Chief Consultant' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'Learn how dental treatment estimates are formulated: diagnostic imaging, procedure complexity, biomaterial quality, dental lab work, and clinical expertise.',
    quickAnswer: 'Dental treatment cost estimates reflect five core clinical variables: diagnostic imaging requirements (2D vs 3D CBCT), case anatomical complexity, the grade of biocompatible restorative materials used, laboratory craftsmanship, and the clinician\'s specialist training.',
    readingTimeMinutes: 6,
    sections: [
      {
        heading: '1. Diagnostic Imaging and Treatment Planning',
        paragraphs: [
          'Formulating a safe, predictable treatment plan requires high-definition diagnostics. Digital periapical sensors, panoramic x-rays, or cross-sectional CBCT scans ensure accurate measurements before surgery or root canal therapy.',
        ],
      },
      {
        heading: '2. Restorative Biomaterial Grades',
        paragraphs: [
          'The quality of materials directly influences biological longevity. Internationally documented titanium implant systems, multilayered aesthetic zirconia blanks, and high-purity bioceramic root canal sealers cost more than generic, uncertified alternatives but provide superior biocompatibility.',
        ],
      },
      {
        heading: '3. Technical Skill and Laboratory Craftsmanship',
        paragraphs: [
          'Whether your restoration is milled in a high-precision computer-guided dental milling unit with custom ceramic characterization or cast in a manual mold determines margin fit, aesthetics, and resistance to bacterial leakage.',
        ],
      },
    ],
  },
  {
    slug: 'dental-second-opinion',
    title: 'When Should You Consider a Dental Second Opinion?',
    shortTitle: 'Dental Second Opinion Guide',
    category: 'general-care',
    categoryLabel: 'General Oral Care',
    primaryIntent: 'Offer balanced, patient-first advice on when and why seeking a second clinical opinion is wise before major irreversible dental procedures.',
    secondaryTopics: ['Irreversible treatments', 'Conflicting diagnoses', 'Full mouth rehabilitation', 'Patient comfort'],
    status: 'review',
    medicallyReviewed: false,
    reviewer: 'Dr. Shimia Binte Taher',
    reviewerSlug: 'dr-shimia',
    reviewerRole: 'Consultant Dental Surgeon',
    reviewedAt: undefined,
    relatedTreatments: [
      { title: 'Clinical Team', href: '/team' },
      { title: 'Contact & Consultations', href: '/contact' },
    ],
    relatedDoctors: [
      { name: 'Dr. Shimia Binte Taher', href: '/dr-shimia', role: 'Consultant' },
      { name: 'Dr. B.M. Rafiqul Hasan', href: '/dr-hasan', role: 'Chief Consultant' },
    ],
    relatedBranches: ['banani', 'banasree'],
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-30',
    metaDescription: 'When to seek a second dental opinion: invasive extraction recommendations, extensive cosmetic plans, unclear diagnosis, or complex surgery decisions.',
    quickAnswer: 'Seeking a second dental opinion is recommended before undergoing irreversible or extensive procedures—such as extracting a tooth that might be savable, invasive full-mouth smile reconstructions, or complex surgical bone grafts. A second consultation offers clarity and peace of mind.',
    readingTimeMinutes: 5,
    sections: [
      {
        heading: 'When Is a Second Opinion Clinically Advisable?',
        paragraphs: [
          'Ethical clinicians support a patient’s right to seek confirmation before embarking on complex, irreversible dental treatments. Scenarios where a second perspective is valuable include:',
        ],
        keyPoints: [
          'Proposed extraction of a natural tooth that you hope to preserve.',
          'Large, invasive treatment plans with multiple crowns when you experienced no symptoms.',
          'Complex oral surgery involving nerves, sinus cavities, or extensive bone augmentation.',
          'Unresolved dental pain where initial diagnostic tests were inconclusive.',
        ],
      },
      {
        heading: 'What to Bring to a Second Opinion Consultation',
        paragraphs: [
          'To maximize the value of your second consultation, bring all recent digital radiographs, CBCT scans, photographs, and written proposals from your previous examination. This avoids duplicate radiation exposure and gives the consulting specialist a complete clinical history.',
        ],
      },
    ],
  },
];
