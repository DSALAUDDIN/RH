import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { pageMeta } from '@/lib/seo/metadata';
import { breadcrumbs, faqSchema, medicalWebPageSchema } from '@/lib/seo/schema';
import { FAQ_CATEGORIES, ALL_FAQS } from '@/data/faqBank';
import FaqBankExplorer from '@/components/faq/FaqBankExplorer';
import { BRANCHES } from '@/lib/branches';
import './faq-page.css';

export const metadata: Metadata = pageMeta({
  title: 'Dental FAQ Bank Dhaka | RH Dental Care',
  description:
    'Explore 120 verified patient questions and answers on dental implants, root canals, clear aligners, and fees at RH Dental Care Banani and Banasree Dhaka.',
  path: '/faq',
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        nodes={[
          medicalWebPageSchema({
            name: 'Dental FAQ Bank Dhaka | RH Dental Care',
            description:
              '120 clinically verified patient questions and answers across 15 dental specialties for RH Dental Care in Banani and Banasree, Dhaka.',
            path: '/faq',
            reviewedBy: 'dr-hasan',
            lastReviewed: '2026-11-11',
          }),
          breadcrumbs({ name: 'Home', path: '/' }, { name: 'Patient FAQ Bank', path: '/faq' }),
          faqSchema(ALL_FAQS),
        ]}
      />

      <main className="rh-faq-page-main">
        {/* Breadcrumb row */}
        <div className="rh-container rh-faq-breadcrumb-container">
          <nav aria-label="Breadcrumb" className="rh-faq-breadcrumb-nav">
            <Link href="/" className="rh-faq-breadcrumb-link">
              Home
            </Link>
            <span className="rh-faq-breadcrumb-separator" aria-hidden="true">
              /
            </span>
            <span className="rh-faq-breadcrumb-current">Patient FAQ Bank</span>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="rh-faq-hero-section">
          <div className="rh-container">
            <div className="rh-faq-hero-inner">
              <span className="rh-faq-badge">CLINICAL PATIENT INFORMATION</span>
              <h1 className="rh-faq-hero-h1">Website Patient FAQ Bank</h1>
              <p className="rh-faq-hero-intro">
                120 patient questions and answers clinically verified by{' '}
                <strong>Dr. B.M. Rafiqul Hasan (Mehedi)</strong> and{' '}
                <strong>Dr. Shimia Binte Taher</strong> for RH Dental Care across our Banani private
                dental suite and Banasree flagship dental hospital in Dhaka.
              </p>

              {/* Reviewer / Authority pill */}
              <div className="rh-faq-authority-bar">
                <div className="rh-faq-authority-item">
                  <span className="rh-faq-authority-label">Reviewed By:</span>
                  <span className="rh-faq-authority-value">
                    Dr. B.M. Rafiqul Hasan (BMDC A-42352)
                  </span>
                </div>
                <div className="rh-faq-authority-divider" aria-hidden="true" />
                <div className="rh-faq-authority-item">
                  <span className="rh-faq-authority-label">Specialties Covered:</span>
                  <span className="rh-faq-authority-value">15 Clinical Domains</span>
                </div>
                <div className="rh-faq-authority-divider" aria-hidden="true" />
                <div className="rh-faq-authority-item">
                  <span className="rh-faq-authority-label">Last Updated:</span>
                  <span className="rh-faq-authority-value">November 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive FAQ Explorer */}
        <section className="rh-faq-content-section">
          <div className="rh-container">
            <FaqBankExplorer categories={FAQ_CATEGORIES} />
          </div>
        </section>

        {/* Urgent Questions & Booking CTA */}
        <section className="rh-faq-cta-section">
          <div className="rh-container">
            <div className="rh-faq-cta-card">
              <div className="rh-faq-cta-content">
                <span className="rh-faq-cta-badge">STILL HAVE QUESTIONS?</span>
                <h2 className="rh-faq-cta-title">Speak Directly with Our Dental Team</h2>
                <p className="rh-faq-cta-desc">
                  Whether you need treatment advice, want to send existing X-rays or CBCT scans, or
                  wish to reserve an appointment, our reception and clinical coordinators are here
                  to assist.
                </p>
                <div className="rh-faq-cta-buttons">
                  <a
                    href={`tel:${BRANCHES.banani.phone}`}
                    className="rh-faq-cta-btn rh-faq-cta-btn-primary"
                  >
                    <span>Banani: {BRANCHES.banani.phoneDisplay}</span>
                  </a>
                  <a
                    href={`tel:${BRANCHES.banasree.phone}`}
                    className="rh-faq-cta-btn rh-faq-cta-btn-secondary"
                  >
                    <span>Banasree: {BRANCHES.banasree.phoneDisplay}</span>
                  </a>
                  <a
                    href={`https://wa.me/${BRANCHES.banani.whatsapp}?text=${encodeURIComponent(
                      'Assalamu Alaikum. I reviewed the website FAQ bank and would like to ask a clinical question regarding treatment at RH Dental Care.',
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rh-faq-cta-btn rh-faq-cta-btn-wa"
                  >
                    <span>WhatsApp Consultation</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
