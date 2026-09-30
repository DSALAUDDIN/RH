import { bnImplantGuides } from './bnGuides/bnImplantGuides.ts';
import { bnEndodonticGuides } from './bnGuides/bnEndodonticGuides.ts';
import { bnOrthodonticGuides } from './bnGuides/bnOrthodonticGuides.ts';
import { bnZirconiaGuides } from './bnGuides/bnZirconiaGuides.ts';
import { bnDigitalAndSurgeryGuides } from './bnGuides/bnDigitalAndSurgeryGuides.ts';
import { bnPatientDecisionGuides } from './bnGuides/bnPatientDecisionGuides.ts';
import { bnBranchUtilityGuides } from './bnGuides/bnBranchUtilityGuides.ts';
import { bnGeneralCareGuides } from './bnGuides/bnGeneralCareGuides.ts';

import type { AuthorityGuide, AuthorityCategory } from './guides/implantGuides.ts';

export type {
  AuthorityGuide,
  AuthorityCategory,
  ContentStatus,
  GuideSection,
  GuideFaq,
} from './guides/implantGuides.ts';

/**
 * Complete master registry of all 40 RH Dental Bangla authority content guides.
 */
export const BANGLA_AUTHORITY_GUIDES: AuthorityGuide[] = [
  ...bnImplantGuides,
  ...bnEndodonticGuides,
  ...bnOrthodonticGuides,
  ...bnZirconiaGuides,
  ...bnDigitalAndSurgeryGuides,
  ...bnPatientDecisionGuides,
  ...bnBranchUtilityGuides,
  ...bnGeneralCareGuides,
];

/**
 * Get all 40 Bangla guides regardless of status.
 */
export function getAllBanglaAuthorityGuides(): AuthorityGuide[] {
  return BANGLA_AUTHORITY_GUIDES;
}

/**
 * Get only indexable 'live' Bangla guides (for public sitemap and search indexing).
 */
export function getLiveBanglaAuthorityGuides(): AuthorityGuide[] {
  return BANGLA_AUTHORITY_GUIDES.filter((g) => g.status === 'live');
}

/**
 * Find a specific Bangla guide by its slug.
 */
export function getBanglaAuthorityGuide(slug: string): AuthorityGuide | undefined {
  return BANGLA_AUTHORITY_GUIDES.find((g) => g.slug === slug);
}

/**
 * Filter Bangla guides by cluster category.
 */
export function getBanglaAuthorityGuidesByCategory(category: AuthorityCategory): AuthorityGuide[] {
  return BANGLA_AUTHORITY_GUIDES.filter((g) => g.category === category);
}

/**
 * Calculate progress statistics for Bangla content program.
 */
export function getBanglaAuthorityStats() {
  const total = BANGLA_AUTHORITY_GUIDES.length;
  const live = BANGLA_AUTHORITY_GUIDES.filter((g) => g.status === 'live').length;
  const review = BANGLA_AUTHORITY_GUIDES.filter((g) => g.status === 'review').length;
  const draft = BANGLA_AUTHORITY_GUIDES.filter((g) => g.status === 'draft').length;
  const medicallyReviewed = BANGLA_AUTHORITY_GUIDES.filter((g) => g.medicallyReviewed).length;
  const readyToPublish = BANGLA_AUTHORITY_GUIDES.filter((g) => g.status === 'live' || g.medicallyReviewed).length;

  return {
    total,
    live,
    review,
    draft,
    medicallyReviewed,
    readyToPublish,
  };
}

export const BANGLA_CATEGORY_DESCRIPTIONS: Record<AuthorityCategory, { label: string; description: string }> = {
  implants: {
    label: 'ডেন্টাল ইমপ্লান্ট',
    description: 'দাঁত প্রতিস্থাপন, বোন গ্রাফটিং, খরচ ও ইমপ্লান্টের যত্ন সম্পর্কিত নির্ভরযোগ্য গাইড।',
  },
  endodontics: {
    label: 'রুট ক্যানেল ও এন্ডোডন্টিকস',
    description: 'মাইক্রোস্কোপিক রুট ক্যানেল, দাঁত বাঁচানোর উপায় ও রুট ক্যানেলের পরবর্তী যত্ন।',
  },
  orthodontics: {
    label: 'ক্লিয়ার অ্যালাইনার ও অর্থোডন্টিকস',
    description: 'অদৃশ্য অ্যালাইনার বনাম ব্রেসেস, খরচ, ব্যবহারের নিয়মাবলী ও রিটেইনার।',
  },
  zirconia: {
    label: 'জিরকোনিয়া ও স্মাইল ডিজাইন',
    description: 'প্রাকৃতিক হাসির রূপান্তর: জিরকোনিয়া ক্রাউন, কসমেটিক ভিনিয়ার ও ক্যাড-ক্যাম প্রযুক্তি।',
  },
  'digital-dentistry': {
    label: 'ডিজিটাল ডেন্টিস্ট্রি',
    description: 'সিবিসিটি থ্রিডি স্ক্যান, ইন্ট্রাওরাল থ্রিডি ক্যামেরা ও আধুনিক ব্যথাহীন চিকিৎসার সুবিধা।',
  },
  surgery: {
    label: 'ওরাল সার্জারি',
    description: 'আক্কেল দাঁতের সমস্যা, সার্জিক্যাল এক্সট্রাকশন এবং অস্ত্রোপচার পরবর্তী দ্রুত সুস্থতা।',
  },
  'patient-guides': {
    label: 'রোগীর সিদ্ধান্ত ও সচেতনতা',
    description: 'প্রথম ডেন্টাল ভিজিট, জরুরি দাঁতের সমস্যা, প্রবাসীদের ডেন্টাল চিকিৎসা ও ডেন্টিস্ট নির্বাচন।',
  },
  'branch-guides': {
    label: 'শাখা ও লোকেশন গাইড',
    description: 'আরএইচ ডেন্টাল বনানী ও বনশ্রী শাখার ঠিকানা, যাতায়াত সুবিধা ও অ্যাপয়েন্টমেন্ট গাইড।',
  },
  'general-care': {
    label: 'সাধারণ ডেন্টাল কেয়ার',
    description: 'টিথ হোয়াইটেনিং, মাড়ির রোগ, শিশুর দাঁতের যত্ন ও ডেন্টাল খরচের স্বচ্ছ ধারণা।',
  },
};
