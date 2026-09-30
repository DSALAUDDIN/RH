import { implantGuides } from './guides/implantGuides.ts';
import { endodonticGuides } from './guides/endodonticGuides.ts';
import { orthodonticGuides } from './guides/orthodonticGuides.ts';
import { zirconiaGuides } from './guides/zirconiaGuides.ts';
import { digitalAndSurgeryGuides } from './guides/digitalAndSurgeryGuides.ts';
import { patientDecisionGuides } from './guides/patientDecisionGuides.ts';
import { branchUtilityGuides } from './guides/branchUtilityGuides.ts';
import { generalCareGuides } from './guides/generalCareGuides.ts';

export type {
  AuthorityGuide,
  AuthorityCategory,
  ContentStatus,
  GuideSection,
  GuideFaq,
} from './guides/implantGuides.ts';

import type { AuthorityGuide, AuthorityCategory } from './guides/implantGuides.ts';

/**
 * Complete master registry of all 40 RH Dental authority content guides.
 */
export const AUTHORITY_GUIDES: AuthorityGuide[] = [
  ...implantGuides,
  ...endodonticGuides,
  ...orthodonticGuides,
  ...zirconiaGuides,
  ...digitalAndSurgeryGuides,
  ...patientDecisionGuides,
  ...branchUtilityGuides,
  ...generalCareGuides,
];

/**
 * Get all 40 guides regardless of status.
 */
export function getAllAuthorityGuides(): AuthorityGuide[] {
  return AUTHORITY_GUIDES;
}

/**
 * Get only indexable 'live' guides (for public sitemap and primary search indexing).
 */
export function getLiveAuthorityGuides(): AuthorityGuide[] {
  return AUTHORITY_GUIDES.filter((g) => g.status === 'live');
}

/**
 * Find a specific guide by its unique slug.
 */
export function getAuthorityGuide(slug: string): AuthorityGuide | undefined {
  return AUTHORITY_GUIDES.find((g) => g.slug === slug);
}

/**
 * Filter guides by cluster category.
 */
export function getAuthorityGuidesByCategory(category: AuthorityCategory): AuthorityGuide[] {
  return AUTHORITY_GUIDES.filter((g) => g.category === category);
}

/**
 * Calculate progress statistics for the /seo-progress client dashboard.
 */
export function getAuthorityStats() {
  const total = AUTHORITY_GUIDES.length;
  const live = AUTHORITY_GUIDES.filter((g) => g.status === 'live').length;
  const review = AUTHORITY_GUIDES.filter((g) => g.status === 'review').length;
  const draft = AUTHORITY_GUIDES.filter((g) => g.status === 'draft').length;
  const medicallyReviewed = AUTHORITY_GUIDES.filter((g) => g.medicallyReviewed).length;
  const readyToPublish = AUTHORITY_GUIDES.filter((g) => g.status === 'live' || g.medicallyReviewed).length;

  return {
    total,
    live,
    review,
    draft,
    medicallyReviewed,
    readyToPublish,
  };
}

export const CATEGORY_DESCRIPTIONS: Record<AuthorityCategory, { label: string; description: string }> = {
  implants: {
    label: 'Dental Implants',
    description: 'Evidence-based patient guides on single tooth replacement, bone grafting, costs, and surgical osseointegration.',
  },
  endodontics: {
    label: 'Root Canal & Endodontics',
    description: 'Specialist insights on microscopic root canal treatment, retreatment, saving natural teeth, and recovery protocols.',
  },
  orthodontics: {
    label: 'Clear Aligners & Orthodontics',
    description: 'Comprehensive comparisons between clear aligners and fixed braces, treatment stages, costs, and retainers.',
  },
  zirconia: {
    label: 'Zirconia & Smile Design',
    description: 'Modern cosmetic restorative dentistry: crowns vs veneers, CAD/CAM milling, and digital smile design planning.',
  },
  'digital-dentistry': {
    label: 'Digital Dentistry & 3D Imaging',
    description: 'Low-dose Cone Beam CT (CBCT) 3D scanning, computer-guided surgery, and digital impression accuracy.',
  },
  surgery: {
    label: 'Oral & Dental Surgery',
    description: 'Patient expectations for outpatient dental surgery, impacted wisdom tooth extraction, and post-operative safety.',
  },
  'patient-guides': {
    label: 'Patient Guides & Decision Support',
    description: 'First dental visit walkthroughs, emergency protocols, NRB dental holiday planning, and choosing a qualified dentist.',
  },
  'branch-guides': {
    label: 'Branch & Visit Logistics',
    description: 'Detailed arrival directions, appointment scheduling, and facility overviews for Banani and Banasree clinics.',
  },
  'general-care': {
    label: 'General Oral Care & Treatment Support',
    description: 'Professional teeth whitening, gum disease therapy, pediatric care, oral hygiene, and dental second opinions.',
  },
};
