'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, MapPin, CheckCircle2, ArrowRight, Sparkles, Building2, ShieldCheck, Award } from 'lucide-react';
import { BRANCHES } from '@/lib/branches';
import { useBranch } from './BranchProvider';
import BranchCTA from './BranchCTA';
import './BranchChooser.css';

export default function BranchChooser() {
  const { branch, setBranch, clearBranch } = useBranch();

  const handleSelect = (id: 'banani' | 'banasree') => {
    setBranch(id);
  };

  /* Every call and message goes through <BranchCTA>, which builds the tel: and
     wa.me URLs from branches.ts and fires the GA4 event carrying `branch`.
     Nothing here constructs a link itself — that is how the numbers drifted
     out of sync in the first place. */

  return (
    <section className="branch-chooser-section" id="choose-branch">
      <div className="branch-chooser-container">
        
        {/* Header */}
        <div className="branch-chooser-header">
          <div className="branch-chooser-badge">
            <Sparkles size={14} /> Two clinics in Dhaka
          </div>
          <h2 className="branch-chooser-title">
            Which branch suits you?
          </h2>
          <p className="branch-chooser-subtitle">
            Whether you seek a private, appointment-only executive suite or our full-service flagship hospital, our certified specialists are ready for you.
          </p>

          {branch && (
            <div className="branch-active-banner">
              <span>Current selection: <strong>{BRANCHES[branch].name}</strong></span>
              <span>•</span>
              <button
                type="button"
                className="branch-change-link"
                onClick={clearBranch}
              >
                Change branch
              </button>
            </div>
          )}
        </div>

        {/* Dual Branch Cards */}
        <div className="branch-grid">
          
          {/* Banani Card */}
          <div className={`branch-card card-banani ${branch === 'banani' ? 'is-active' : ''}`}>
            <div className="branch-card-media">
              <img
                src={BRANCHES.banani.heroImage}
                alt="Banani Private Dental Suite"
                className="branch-card-img"
              />
              <div className="branch-card-overlay" />
              <div className="branch-card-tag">Private Suite</div>
              <div className="branch-card-status">
                <h3>Banani Branch</h3>
                <p>{BRANCHES.banani.tagline}</p>
              </div>
            </div>

            <div className="branch-card-body">
              <div className="branch-audience-box">
                <span className="branch-audience-label">Designed for</span>
                <p className="branch-audience-text">{BRANCHES.banani.audience}</p>
              </div>

              <ul className="branch-facilities-list">
                {BRANCHES.banani.facilities.map((fac, i) => (
                  <li key={i}>
                    <CheckCircle2 size={18} className="facility-icon" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>

              <div className="branch-location-meta">
                <MapPin size={16} />
                <span>{BRANCHES.banani.address}</span>
              </div>

              <div className="branch-card-actions">
                <BranchCTA
                  action="call"
                  branch="banani"
                  className="btn-card-action btn-card-call"
                  onClick={() => handleSelect('banani')}
                >
                  <Phone size={16} /> Call Banani
                </BranchCTA>
                <BranchCTA
                  action="whatsapp"
                  branch="banani"
                  className="btn-card-action btn-card-wa"
                  onClick={() => handleSelect('banani')}
                >
                  <MessageCircle size={16} /> WhatsApp
                </BranchCTA>
              </div>

              <Link
                href="/banani"
                className="btn-card-explore"
                onClick={() => handleSelect('banani')}
              >
                Explore the Private Suite <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Banasree Card */}
          <div className={`branch-card card-banasree ${branch === 'banasree' ? 'is-active' : ''}`}>
            <div className="branch-card-media">
              <img
                src={BRANCHES.banasree.heroImage}
                alt="Banasree Flagship Dental Hospital"
                className="branch-card-img"
              />
              <div className="branch-card-overlay" />
              <div className="branch-card-tag">Flagship Hospital</div>
              <div className="branch-card-status">
                <h3>Banasree Branch</h3>
                <p>{BRANCHES.banasree.tagline}</p>
              </div>
            </div>

            <div className="branch-card-body">
              <div className="branch-audience-box">
                <span className="branch-audience-label">Designed for</span>
                <p className="branch-audience-text">{BRANCHES.banasree.audience}</p>
              </div>

              <ul className="branch-facilities-list">
                {BRANCHES.banasree.facilities.map((fac, i) => (
                  <li key={i}>
                    <CheckCircle2 size={18} className="facility-icon" />
                    <span>{fac}</span>
                  </li>
                ))}
              </ul>

              <div className="branch-location-meta">
                <MapPin size={16} />
                <span>{BRANCHES.banasree.address}</span>
              </div>

              <div className="branch-card-actions">
                <BranchCTA
                  action="call"
                  branch="banasree"
                  className="btn-card-action btn-card-call"
                  onClick={() => handleSelect('banasree')}
                >
                  <Phone size={16} /> Call Banasree
                </BranchCTA>
                <BranchCTA
                  action="whatsapp"
                  branch="banasree"
                  className="btn-card-action btn-card-wa"
                  onClick={() => handleSelect('banasree')}
                >
                  <MessageCircle size={16} /> WhatsApp
                </BranchCTA>
              </div>

              <Link
                href="/banasree"
                className="btn-card-explore"
                onClick={() => handleSelect('banasree')}
              >
                Explore the Flagship Hospital <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>

        {/* Shared Trust Bar */}
        <div className="branch-shared-trust">
          <div className="trust-pillar">
            <Award size={18} color="#CDAE51" />
            <span>Same BMDC Certified Specialist Doctors</span>
          </div>
          <div className="trust-pillar-dot" />
          <div className="trust-pillar">
            <ShieldCheck size={18} color="#B4D1A8" />
            <span>Same Hospital-Grade Sterilization Protocols</span>
          </div>
          <div className="trust-pillar-dot" />
          <div className="trust-pillar">
            <Sparkles size={18} color="#CDAE51" />
            <span>Same Considered German & Swiss Implant Systems</span>
          </div>
        </div>

      </div>
    </section>
  );
}
