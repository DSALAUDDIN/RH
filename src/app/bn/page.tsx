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
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>আধুনিক প্রযুক্তি ও বিশেষজ্ঞ ডেন্টাল টিম</span>
          </div>

          <h1 className="bn-hero-title">
            আরএইচ ডেন্টাল কেয়ার
            <span className="bn-hero-subtitle">বনানী ও বনশ্রী, ঢাকা — আধুনিক ডেন্টাল ক্লিনিক ও হাসপাতাল</span>
          </h1>

          <p className="bn-hero-lead">
            ইন-হাউস সিবিসিটি ৩ডি স্ক্যান, মাইক্রোস্কোপিক রুট ক্যানেল এবং ক্যাড/ক্যাম ডিজিটাল ডেন্টিস্ট্রির সমন্বয়ে উন্নত ও জীবাণুমুক্ত ডেন্টাল সেবা।
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

      {/* Bangla Patient Consultation, Serial & Common Queries FAQ Section */}
      <section className="bn-faq-section" style={{ padding: '4rem 1.5rem', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="bn-section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="bn-section-title" style={{ fontSize: '2rem', fontWeight: 800, color: '#002347' }}>
              রোগীদের সাধারণ জিজ্ঞাসা ও সিরিয়াল সংক্রান্ত তথ্য
            </h2>
            <p className="bn-section-desc" style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '0.5rem' }}>
              আরএইচ ডেন্টাল কেয়ার বনশ্রী ও বনানী শাখায় চিকিৎসা, খরচ ও সিরিয়াল সংক্রান্ত বিস্তারিত বিবরণ
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                ডাক্তারের সিরিয়াল ও সরাসরি যোগাযোগ
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                <strong>দাঁতের ডাক্তার বনশ্রী</strong> ও <strong>বনশ্রী ডেন্টাল ক্লিনিক সিরিয়াল</strong> নিতে কল করুন ০১৯০২-৯৯৭০৭০ নম্বরে। <strong>বনানী ডেন্টাল কেয়ার সিরিয়াল</strong> ও <strong>দাঁতের ডাক্তার ঢাকা যোগাযোগ</strong> করতে কল করুন ০১৭১১-৯৪৫১৯১ নম্বরে অথবা আমাদের হোয়াটসঅ্যাপে বার্তা পাঠান। <strong>আরএইচ ডেন্টাল কেয়ার বনশ্রী সিরিয়াল</strong> ও <strong>আরএইচ ডেন্টাল কেয়ার বনানী সিরিয়াল</strong> নিশ্চিত করতে একজন সমন্বয়ক আপনাকে সময় ও রেফারেন্স নম্বর জানিয়ে দেবেন। <strong>আধুনিক ডেন্টাল হাসপাতাল বনশ্রী সিরিয়াল</strong> সেবা প্রতিদিন খোলা থাকে।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                ডেন্টাল ইমপ্লান্ট ও দাঁত বাঁধানোর খরচ কত?
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                <strong>ডেন্টাল ইমপ্লান্ট খরচ কত</strong> ও <strong>দাঁত বাঁধানোর খরচ ঢাকা যোগাযোগ</strong> এবং <strong>ডেন্টাল ইমপ্লান্ট খরচ কত সিরিয়াল</strong> বুকিংয়ের জন্য আমাদের ক্লিনিক্যাল সমন্বয়কের সাথে কথা বলুন। <strong>দাঁত বাঁধানোর খরচ ঢাকা সিরিয়াল</strong> নির্ধারণ হয় ৩ডি সিবিসিটি স্ক্যানের মাধ্যমে হাড়ের পরিমাপ ও অস্টেয়োইনটিগ্রেশনের উপর ভিত্তি করে। আমাদের <strong>ইন-হাউস ডিজিটাল ল্যাব ঢাকা সিরিয়াল</strong> এবং <strong>ইন-হাউস ডিজিটাল ল্যাব ঢাকা যোগাযোগ</strong> ব্যবস্থার মাধ্যমে দ্রুত ফিক্সড দাঁত সংযোজন সম্পন্ন হয়।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                রুট ক্যানেল করতে কত টাকা লাগে ও মাইক্রোস্কোপিক রুট ক্যানেল
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                <strong>রুট ক্যানেল করতে কত টাকা লাগে</strong>? দাঁতের অবস্থান (সামনের দাঁত বা পেছনের মোলার) ও ক্যানেলের জটিলতার ওপর খরচ নির্ভর করে। <strong>রুট ক্যানেল করতে কত টাকা লাগে যোগাযোগ</strong> ও <strong>রুট ক্যানেল করতে কত টাকা লাগে সিরিয়াল</strong> নিতে আমাদের সাথে কথা বলুন। আমরা জার্মান ডেন্টাল মাইক্রোস্কোপ দিয়ে সিঙ্গেল-ভিজিট চিকিৎসা করি, তাই <strong>মাইক্রোস্কোপিক রুট ক্যানেল ঢাকা সিরিয়াল</strong> নেওয়া রোগীদের ব্যথামুক্ত উপশম নিশ্চিত হয়।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                দাঁতে তার লাগানো ও ক্লিয়ার অ্যালাইনার খরচ
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                বাঁকা ও ফাঁকা দাঁত সোজা করতে <strong>দাঁতে তার লাগানোর খরচ</strong>, <strong>দাঁতে তার লাগানোর খরচ যোগাযোগ</strong> ও <strong>দাঁতে তার লাগানোর খরচ সিরিয়াল</strong> আমাদের বনশ্রী সেন্টারে নির্ধারিত হয়। অদৃশ্যভাবে দাঁত সাজাতে <strong>ক্লিয়ার অ্যালাইনার খরচ সিরিয়াল</strong> নিতে ৩ডি ইন্ট্রাওরাল স্ক্যান দ্বারা চিকিৎসা পরিকল্পনা তৈরি করা হয়।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                আক্কেল দাঁতের অপারেশন ও আক্কেল দাঁত তোলার খরচ
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                হাড়ের নিচে বাঁকা হয়ে থাকা দাঁতের জন্য <strong>আক্কেল দাঁতের অপারেশন ঢাকা</strong>, <strong>আক্কেল দাঁতের অপারেশন ঢাকা যোগাযোগ</strong> ও <strong>আক্কেল দাঁতের অপারেশন ঢাকা সিরিয়াল</strong> দিন। জটিলতার মাত্রা ভেদে <strong>আক্কেল দাঁত তোলার খরচ যোগাযোগ</strong> ও <strong>আক্কেল দাঁত তোলার খরচ সিরিয়াল</strong> ৩ডি সিবিসিটি নার্ভ ম্যাপিংয়ের পর নির্ধারণ করা হয়।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                দাঁতে ক্যাপ লাগানোর খরচ ও জিরকোনিয়া ক্যাপ এর দাম কত
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                প্রাকৃতিক দাঁতের রঙের দীর্ঘস্থায়ী ক্যাপের জন্য <strong>দাঁতে ক্যাপ লাগানোর খরচ</strong>, <strong>দাঁতে ক্যাপ লাগানোর খরচ যোগাযোগ</strong> ও <strong>দাঁতে ক্যাপ লাগানোর খরচ সিরিয়াল</strong> জানতে আমাদের ল্যাব প্রোটোকল দেখুন। ক্যাড/ক্যাম প্রযুক্তির <strong>জিরকোনিয়া ক্যাপ এর দাম কত</strong>, <strong>জিরকোনিয়া ক্যাপ এর দাম কত যোগাযোগ</strong> ও <strong>জিরকোনিয়া ক্যাপ এর দাম কত সিরিয়াল</strong> বনশ্রী ইন-হাউস মিলিং সেন্টারে সরাসরি যাচাই করা যায়।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                দাঁতের স্কেলিং ও পলিশিং ও দাঁত সাদা করার খরচ
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                মাড়ির পাথর ও দাগ দূর করতে <strong>দাঁতের স্কেলিং ও পলিশিং খরচ</strong>, <strong>দাঁতের স্কেলিং ও পলিশিং খরচ যোগাযোগ</strong> ও <strong>দাঁতের স্কেলিং ও পলিশিং খরচ সিরিয়াল</strong> বুক করুন। উজ্জ্বল হাসির জন্য লেজার <strong>দাঁত সাদা করার খরচ যোগাযোগ</strong> ও <strong>দাঁত সাদা করার খরচ সিরিয়াল</strong> আমাদের বনানী ও বনশ্রী উভয় শাখায় উপলব্ধ।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                বাচ্চাদের ও বিশেষ শিশুদের ডেন্টাল চিকিৎসা
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                শিশুদের ভীতিমুক্ত চিকিৎসার জন্য <strong>বাচ্চাদের দাঁতের ডাক্তার বনশ্রী</strong>, <strong>বাচ্চাদের দাঁতের ডাক্তার বনশ্রী যোগাযোগ</strong> ও <strong>বাচ্চাদের দাঁতের ডাক্তার বনশ্রী সিরিয়াল</strong> নিতে আমাদের পেডিয়াট্রিক ডেন্টিস্টদের সাথে কথা বলুন। অটিজম বা বিশেষ চাহিদাসম্পন্ন শিশুদের জন্য <strong>বিশেষ শিশুদের ডেন্টাল চিকিৎসা</strong>, <strong>বিশেষ শিশুদের ডেন্টাল চিকিৎসা যোগাযোগ</strong> ও <strong>বিশেষ শিশুদের ডেন্টাল চিকিৎসা সিরিয়াল</strong> জেনারেল অ্যানেস্থেসিয়ার (GA) অধীনে নিরাপদ পরিবেশে প্রদান করা হয়।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                সিবিসিটি ৩ডি এক্সরে ও বিশেষজ্ঞ ডেন্টাল সার্জন
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                সঠিক ডায়াগনস্টিকের জন্য <strong>সিবিসিটি ৩ডি এক্সরে ঢাকা</strong>, <strong>সিবিসিটি ৩ডি এক্সরে ঢাকা যোগাযোগ</strong> ও <strong>সিবিসিটি ৩ডি এক্সরে ঢাকা সিরিয়াল</strong> আমাদের বনানী সেন্টারে সম্পন্ন হয়। বিএমডিসি নিবন্ধিত চিফ কনসালট্যান্ট <strong>ডঃ রফিকুল হাসান ডেন্টিস্ট</strong> (<strong>ডঃ রফিকুল হাসান ডেন্টিস্ট যোগাযোগ</strong>, <strong>ডঃ রফিকুল হাসান ডেন্টিস্ট সিরিয়াল</strong>) এবং ওরাল সার্জন <strong>ডঃ শিমিয়া বিনতে তাহের</strong> (<strong>ডঃ শিমিয়া বিনতে তাহের যোগাযোগ</strong>, <strong>ডঃ শিমিয়া বিনতে তাহের সিরিয়াল</strong>) নিয়মিত রোগী দেখেন।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                ব্যথা উপশম, মাড়ির রক্তপাত ও ক্যাভিটি ফিলিং
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                তীব্র <strong>দাঁতের ব্যথা উপশম</strong>, <strong>দাঁতের ব্যথা উপশম যোগাযোগ</strong> ও <strong>দাঁতের ব্যথা উপশম সিরিয়াল</strong> দিতে আমরা তাৎক্ষণিক এন্ডোডন্টিক সেবা দিই। <strong>দাঁতের মাড়ি দিয়ে রক্ত পড়া বন্ধের উপায়</strong>, <strong>দাঁতের মাড়ি দিয়ে রক্ত পড়া বন্ধের উপায় যোগাযোগ</strong> ও <strong>দাঁতের মাড়ি দিয়ে রক্ত পড়া বন্ধের উপায় সিরিয়াল</strong> নির্ধারণে পেরিওডন্টাল থেরাপি করা হয়। ক্ষয়রোধে <strong>দাঁতের ক্যাভিটি ফিলিং খরচ</strong>, <strong>দাঁতের ক্যাভিটি ফিলিং খরচ যোগাযোগ</strong> ও <strong>দাঁতের ক্যাভিটি ফিলিং খরচ সিরিয়াল</strong> জেনে নান্দনিক কম্পোজিট ফিলিং করিয়ে নিন।
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '1.75rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#002347', marginBottom: '0.75rem' }}>
                দাঁত তোলার পর করণীয় ও প্রবাসী চিকিৎসা
              </h3>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                সার্জারির পর দ্রুত আরোগ্যের জন্য <strong>দাঁত তোলার পর করণীয়</strong>, <strong>দাঁত তোলার পর করণীয় যোগাযোগ</strong> ও <strong>দাঁত তোলার পর করণীয় সিরিয়াল</strong> ফলো-আপ নিশ্চিত করা হয়। ছুটি চলাকালীন দ্রুত সম্পূর্ণ ডেন্টাল পুনর্বাসনে <strong>প্রবাসী ডেন্টাল চিকিৎসা বাংলাদেশ যোগাযোগ</strong> ও <strong>প্রবাসী ডেন্টাল চিকিৎসা বাংলাদেশ সিরিয়াল</strong> এর মাধ্যমে নির্ধারিত প্রি-অ্যারাইভাল শিডিউলে সেবা প্রদান করা হয়।
              </p>
            </div>
          </div>
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
