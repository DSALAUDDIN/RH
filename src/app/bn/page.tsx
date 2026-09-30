import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo/metadata';
import { medicalWebPageSchema, breadcrumbs } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import { BRANCH_LIST } from '@/lib/branches';
import { getLiveBanglaAuthorityGuides } from '@/data/banglaAuthorityContent';
import {
  Sparkles,
  ShieldCheck,
  Microscope,
  Scan,
  MapPin,
  Phone,
  ArrowRight,
  BookOpen,
  Calendar,
} from 'lucide-react';
import './bn.css';

export function generateMetadata(): Metadata {
  return pageMeta({
    title: 'আরএইচ ডেন্টাল কেয়ার — বনানী ও বনশ্রী, ঢাকা',
    description: 'ঢাকায় আধুনিক ও নিরাপদ ডেন্টাল চিকিৎসা। ডেন্টাল ইমপ্লান্ট, মাইক্রোস্কোপিক রুট ক্যানেল, সিবিসিটি ৩ডি এক্স-রে ও ক্লিয়ার অ্যালাইনার। বনানী ও বনশ্রী শাখা।',
    path: '/bn',
    canonical: '/bn',
    locale: 'bn_BD',
    languages: {
      'en-BD': '/',
      'bn-BD': '/bn',
      'x-default': '/',
    },
  });
}

export default function BanglaHomePage() {
  const liveGuides = getLiveBanglaAuthorityGuides().slice(0, 6);

  const webPageNode = medicalWebPageSchema({
    path: '/bn',
    name: 'আরএইচ ডেন্টাল কেয়ার — আধুনিক ডেন্টাল ক্লিনিক ঢাকা',
    description: 'ঢাকায় বনানী ও বনশ্রী শাখায় উন্নত ও জীবাণুমুক্ত পরিবেশে আধুনিক ডেন্টাল চিকিৎসা।',
    inLanguage: 'bn-BD',
  });

  const breadcrumbsNode = breadcrumbs(
    { name: 'হোম', path: '/bn' },
  );

  return (
    <div className="bn-home-page">
      <JsonLd nodes={[webPageNode, breadcrumbsNode]} />

      {/* Hero Section */}
      <section className="bn-hero">
        <div className="bn-hero-inner">
          <div className="bn-hero-badge">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>আধুনিক প্রযুক্তি ও বিশেষজ্ঞ ডেন্টাল টিম</span>
          </div>

          <h1 className="bn-hero-title">
            আরএইচ ডেন্টাল কেয়ার
            <span className="bn-hero-subtitle">বনানী ও বনশ্রী, ঢাকা</span>
          </h1>

          <p className="bn-hero-lead">
            ইন-হাউস সিবিসিটি ৩ডি স্ক্যান, মাইক্রোস্কোপিক রুট ক্যানেল এবং ক্যাড/ক্যাম ডিজিটাল ডেন্টিস্ট্রির সমন্বয়ে আন্তর্জাতিক মানের ব্যথাহীন ও জীবাণুমুক্ত ডেন্টাল সেবা।
          </p>

          <div className="bn-hero-cta-group">
            <Link href="/book" className="bn-btn-primary">
              <Calendar className="w-4 h-4" />
              <span>অ্যাপয়েন্টমেন্ট নিন</span>
            </Link>
            <Link href="/bn/guides" className="bn-btn-secondary">
              <BookOpen className="w-4 h-4" />
              <span>বাংলা ডেন্টাল গাইডসমূহ</span>
            </Link>
          </div>

          <div className="bn-lang-pill">
            <span className="text-muted">Language:</span>
            <Link href="/" className="bn-lang-link">English</Link>
            <span className="text-muted">|</span>
            <span className="bn-lang-active">বাংলা</span>
          </div>
        </div>
      </section>

      {/* Key Clinical Capabilities */}
      <section className="bn-features-section">
        <div className="bn-section-header">
          <h2 className="bn-section-title">কেন আরএইচ ডেন্টালে চিকিৎসা নেবেন?</h2>
          <p className="bn-section-desc">সঠিক রোগ নির্ণয় ও সর্বোচ্চ জীবাণুমুক্ত পরিবেশ আমাদের চিকিৎসার মূলভিত্তি</p>
        </div>

        <div className="bn-features-grid">
          <div className="bn-feature-card">
            <div className="bn-feature-icon-wrapper">
              <Scan className="w-6 h-6 text-primary" />
            </div>
            <h3>ইন-হাউস সিবিসিটি ৩ডি এক্স-রে</h3>
            <p>আমাদের বনানী শাখায় রয়েছে নিজস্ব সিবিসিটি মেশিন। বাইরে না গিয়ে তাৎক্ষণিক ৩ডি ইমেজিংয়ের মাধ্যমে হাড় ও স্নায়ুর গভীরতা নির্ণয় সম্ভব।</p>
          </div>

          <div className="bn-feature-card">
            <div className="bn-feature-icon-wrapper">
              <Microscope className="w-6 h-6 text-primary" />
            </div>
            <h3>মাইক্রোস্কোপিক রুট ক্যানেল</h3>
            <p>ডেন্টাল অপারেটিং মাইক্রোস্কোপ ব্যবহার করে প্রাকৃতিক দাঁতের ভেতর থাকা অদৃশ্য ক্যানেল নিখুঁতভাবে পরিষ্কার করে দাঁত বাঁচানো হয়।</p>
          </div>

          <div className="bn-feature-card">
            <div className="bn-feature-icon-wrapper">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3>ইউরোপীয় ক্লাস-বি স্টেরিলাইজেশন</h3>
            <p>হেপাটাইটিস ও রক্তবাহিত রোগ প্রতিরোধে কঠোর আন্তর্জাতিক ভ্যাকুয়াম অটোক্লেভ প্রোটোকলে প্রতিটি ইনস্ট্রুমেন্ট জীবাণুমুক্ত করা হয়।</p>
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <section className="bn-branches-section">
        <div className="bn-section-header">
          <h2 className="bn-section-title">আমাদের শাখাসমূহ</h2>
          <p className="bn-section-desc">আপনার সুবিধাজনক শাখায় সরাসরি যোগাযোগ বা অ্যাপয়েন্টমেন্ট নিন</p>
        </div>

        <div className="bn-branches-grid">
          {BRANCH_LIST.map((b) => (
            <div key={b.id} className="bn-branch-card">
              <div className="bn-branch-header">
                <MapPin className="w-5 h-5 text-primary" />
                <h3>{b.id === 'banani' ? 'বনানী শাখা' : 'বনশ্রী শাখা'}</h3>
              </div>
              <p className="bn-branch-address">{b.streetAddress}, {b.addressLocality}, ঢাকা - {b.postalCode}</p>
              
              <div className="bn-branch-features">
                {b.id === 'banani' ? (
                  <>
                    <span className="bn-chip">ইন-হাউস সিবিসিটি স্ক্যান</span>
                    <span className="bn-chip">মাইক্রোস্কোপিক এন্ডোডন্টিকস</span>
                    <span className="bn-chip">পার্কিং ও লিফট সুবিধা</span>
                  </>
                ) : (
                  <>
                    <span className="bn-chip">পারিবারিক ডেন্টাল কেয়ার</span>
                    <span className="bn-chip">অর্থোডন্টিক সেন্টার</span>
                    <span className="bn-chip">ডিজিটাল এক্স-রে সুবিধা</span>
                  </>
                )}
              </div>

              <div className="bn-branch-footer">
                <a href={`tel:${b.phone}`} className="bn-branch-phone">
                  <Phone className="w-4 h-4" />
                  <span>{b.phone}</span>
                </a>
                <Link href={b.id === 'banani' ? '/bn/guides/banani-dental-clinic-visit-guide' : '/bn/guides/banasree-dental-clinic-visit-guide'} className="bn-branch-guide-link">
                  শাখা গাইড <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Bangla Patient Guides */}
      <section className="bn-guides-preview-section">
        <div className="bn-section-header">
          <h2 className="bn-section-title">প্রয়োজনীয় বাংলা ডেন্টাল গাইড</h2>
          <p className="bn-section-desc">চিকিৎসা শুরুর আগে সঠিক তথ্য ও প্রস্তুতি জেনে নিন</p>
        </div>

        <div className="bn-guides-grid">
          {liveGuides.map((guide) => (
            <Link key={guide.slug} href={`/bn/guides/${guide.slug}`} className="bn-guide-preview-card">
              <div className="bn-guide-card-header">
                <span className="bn-guide-category-badge">{guide.categoryLabel}</span>
                <span className="bn-guide-read-time">{guide.readingTimeMinutes} মিনিট পাঠ</span>
              </div>
              <h3 className="bn-guide-card-title">{guide.title}</h3>
              <p className="bn-guide-card-snippet">{guide.quickAnswer}</p>
              <div className="bn-guide-card-footer">
                <span>সম্পূর্ণ পড়ুন</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
            </Link>
          ))}
        </div>

        <div className="bn-all-guides-cta">
          <Link href="/bn/guides" className="bn-btn-secondary">
            <span>সবগুলো বাংলা গাইড দেখুন (৪০টি বিষয়ভিত্তিক গাইড)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
