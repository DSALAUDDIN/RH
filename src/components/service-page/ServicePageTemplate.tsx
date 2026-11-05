'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Phone,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import './ServicePageTemplate.css';
import type { ServicePageData } from '@/data/servicePagesContent';

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="spt-root">
      <div className="spt-container">
        {/* Breadcrumb Navigation */}
        <nav className="spt-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className="spt-breadcrumb-sep">/</span>
          <Link href="/treatments">Treatments</Link>
          <span className="spt-breadcrumb-sep">/</span>
          <span className="spt-breadcrumb-current">{data.h1}</span>
        </nav>

        {/* Hero Section */}
        <header className="spt-hero">
          <div className="spt-badge">
            <Stethoscope size={15} />
            <span>{data.badge}</span>
          </div>
          <h1 className="spt-hero-title">{data.h1}</h1>
          <p className="spt-hero-lead">{data.overview}</p>
          <div className="spt-hero-actions">
            <a href="#appointment" className="spt-btn-primary">
              <Phone size={16} />
              <span>Book Clinical Consultation</span>
            </a>
            <a href="#procedure" className="spt-btn-outline">
              <span>View Treatment Process</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </header>

        {/* Who may be suitable? */}
        <section className="spt-section">
          <div className="spt-section-header">
            <div className="spt-section-tag">Candidate Evaluation</div>
            <h2 className="spt-section-title">Who May Be Suitable?</h2>
          </div>
          <div className="spt-suitability-grid">
            {data.suitability.map((item, idx) => (
              <div key={idx} className="spt-suitability-item">
                <CheckCircle2 size={20} className="spt-suitability-icon" />
                <span className="spt-suitability-text">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Step-by-Step Treatment Process */}
        <section className="spt-section" id="procedure">
          <div className="spt-section-header">
            <div className="spt-section-tag">Clinical Protocol</div>
            <h2 className="spt-section-title">Step-by-Step Treatment Process</h2>
          </div>
          <div className="spt-steps-flow">
            {data.treatmentProcess.map((step, idx) => (
              <div key={idx} className="spt-step-card">
                <div className="spt-step-number">{String(idx + 1).padStart(2, '0')}</div>
                <div className="spt-step-content">
                  <h3 className="spt-step-title">{step.title}</h3>
                  <p className="spt-step-desc">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* In-House Digital CAD/CAM Laboratory */}
        <section className="spt-section">
          <div className="spt-tech-box">
            <h2 className="spt-tech-title">
              <Cpu size={26} color="#38bdf8" />
              <span>Technology & In-House Digital CAD/CAM Lab</span>
            </h2>
            <p className="spt-tech-body">{data.technology}</p>
          </div>
        </section>

        {/* Clinical Team & Qualifications */}
        <section className="spt-section">
          <div className="spt-section-header">
            <div className="spt-section-tag">Doctors & Competence</div>
            <h2 className="spt-section-title">Clinical Team & Qualifications</h2>
          </div>
          <div className="spt-team-card">
            <div className="spt-team-lead">{data.clinicalTeam.lead}</div>
            <p className="spt-team-desc">{data.clinicalTeam.description}</p>
            <div className="spt-team-links">
              <Link href="/dr-hasan" className="spt-team-link">
                <span>View Dr. B.M. Rafiqul Hasan Mehedi Profile</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/dr-shimia" className="spt-team-link">
                <span>View Dr. Simia Binte Taher Profile</span>
                <ArrowRight size={14} />
              </Link>
              <Link href="/team" className="spt-team-link">
                <span>Meet the Full 16-Doctor Team</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits, Risks and Limitations */}
        <section className="spt-section">
          <div className="spt-section-header">
            <div className="spt-section-tag">Transparent Patient Information</div>
            <h2 className="spt-section-title">Benefits, Risks & Clinical Limitations</h2>
          </div>
          <div className="spt-dual-grid">
            <div className="spt-dual-col spt-col-benefits">
              <h3 className="spt-col-title">
                <ShieldCheck size={20} />
                <span>Clinical Benefits</span>
              </h3>
              <p className="spt-col-text">{data.benefitsAndRisks.benefits}</p>
            </div>
            <div className="spt-dual-col spt-col-risks">
              <h3 className="spt-col-title">
                <ShieldAlert size={20} />
                <span>Risks & Considerations</span>
              </h3>
              <p className="spt-col-text">{data.benefitsAndRisks.risks}</p>
            </div>
          </div>
        </section>

        {/* Aftercare & Follow-Up */}
        <section className="spt-section">
          <div className="spt-section-header">
            <div className="spt-section-tag">Post-Treatment Guidelines</div>
            <h2 className="spt-section-title">Aftercare & Follow-Up</h2>
          </div>
          <div className="spt-aftercare-box">
            <p>{data.aftercare}</p>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="spt-section" id="faq">
          <div className="spt-section-header">
            <div className="spt-section-tag">Patient Inquiries</div>
            <h2 className="spt-section-title">Frequently Asked Questions</h2>
          </div>
          <div className="spt-faq-list">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`spt-faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    type="button"
                    className="spt-faq-button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="spt-faq-toggle" aria-hidden="true">
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="spt-faq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Branch Consultation CTA */}
        <div className="spt-cta-banner" id="appointment">
          <h2 className="spt-cta-title">Book an Assessment Appointment</h2>
          <div className="spt-cta-sub">{data.cta.tagline}</div>
          <div className="spt-cta-grid">
            <div className="spt-branch-card">
              <div className="spt-branch-name">Banani Private Dental Suite</div>
              <div className="spt-branch-addr">
                Level 7, B&B Empire, Plot 116, Road 11, Block E, Banani, Dhaka
              </div>
              <a href={`tel:${data.cta.phoneBanani}`} className="spt-branch-phone">
                <Phone size={15} />
                <span>Call {data.cta.phoneBanani}</span>
              </a>
            </div>
            <div className="spt-branch-card">
              <div className="spt-branch-name">Banasree Flagship Dental Hospital</div>
              <div className="spt-branch-addr">
                House 42, Road 8, Block C, Banasree, Rampura, Dhaka
              </div>
              <a href={`tel:${data.cta.phoneBanasree}`} className="spt-branch-phone">
                <Phone size={15} />
                <span>Call {data.cta.phoneBanasree}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
