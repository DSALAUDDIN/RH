import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BRANCHES } from '@/lib/branches';
import { breadcrumbs } from '@/lib/seo/schema';
import { pageMeta } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import FAQ from '@/components/FAQ';
import TeamRoster from '@/components/TeamRoster';
import ReviewBadge from '@/components/ReviewBadge';
import BranchCTA from '@/components/branch/BranchCTA';
import banasreeFaq from './faq';
import './banasree.css';
import EditorialNote from '@/components/EditorialNote';

const b = BRANCHES.banasree;

export const metadata: Metadata = pageMeta({
  title: 'Banasree Flagship Dental Hospital',
  description:
    'Full-service dental hospital on Block C, Banasree, Dhaka. In-house master digital lab, the full specialist team on site, coordinated treatment planning.',
  path: '/banasree',
});

export default function BanasreePage() {
  return (
    <div className="bs rh-scope" data-branch="banasree">
      <JsonLd
        /*
         * The branch entity is part of the site graph (root layout); only the
         * breadcrumb is page-specific.
         */
        nodes={[breadcrumbs({ name: 'Banasree', path: '/banasree' })]}
      />

      {/* Hero */}
      <header className="bs-hero">
        <div className="bs-hero-media">
          <Image
            src={b.photos[0].src}
            alt={b.photos[0].alt}
            width={b.photos[0].w ?? 1600}
            height={b.photos[0].h ?? 900}
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
            className="bs-hero-img"
          />
        </div>

        <div className="bs-hero-text rh-rise">
          <p className="bs-kicker">RH Dental Care · Banasree</p>
          <h1 className="bs-h1">
            Everything a treatment plan needs, <em>in one building</em>.
          </h1>
          <p className="bs-lede">
            Banasree is the flagship: the bigger setup, with the in-house master digital lab, the
            full specialist team on site. Cases that run across several
            disciplines — surgery, endodontics, orthodontics, prosthetics — are handled here without
            sending you between addresses.
          </p>

          <div className="bs-actions">
            <BranchCTA
              action="call"
              branch="banasree"
              variant="primary"
              className="rh-btn rh-btn-primary"
            >
              Call {b.phoneDisplay}
            </BranchCTA>
            <BranchCTA
              action="whatsapp"
              branch="banasree"
              variant="ghost"
              className="rh-btn rh-btn-ghost"
            >
              Book on WhatsApp
            </BranchCTA>
          </div>

          <ReviewBadge branch="banasree" className="bs-review" />
        </div>
      </header>

      {/* The rooms */}
      <section className="bs-rooms rh-section" aria-labelledby="bs-rooms-t">
        <div className="rh-container">
          <h2 id="bs-rooms-t" className="bs-h2">
            Inside the hospital
          </h2>
          <p className="bs-body bs-rooms-lede">
            Photographed on working days. No patient appears in any of these — we do not publish a
            face without written consent.
          </p>
        </div>

        <div className="rh-container bs-gallery">
          {b.photos.slice(1).map((p, i) => (
            <figure key={p.src} className={`bs-figure bs-figure-${i}`}>
              <div className="bs-figure-frame">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={p.w ?? 1600}
                  height={p.h ?? 1200}
                  sizes="(max-width: 900px) 100vw, 46vw"
                  quality={90}
                />
              </div>
              {p.caption && <figcaption>{p.caption}</figcaption>}
            </figure>
          ))}
        </div>
      </section>

      {/* Who it is for */}
      <section className="bs-section rh-section" aria-labelledby="bs-for">
        <div className="rh-container bs-two">
          <div>
            <h2 id="bs-for" className="bs-h2">
              Who this branch is for
            </h2>
            <p className="bs-body">{b.audience}.</p>
            <p className="bs-body">
              {b.promise} A family can be seen across one afternoon rather than four separate trips,
              and each stage of a multi-visit plan can be coordinated with the same team.
            </p>
            <p className="bs-body">
              If what you want is an appointment-only slot with the room to yourself, that is the{' '}
              <Link href="/banani" className="bs-link">
                Banani suite
              </Link>
              .
            </p>
          </div>

          <ul className="bs-facts">
            {b.facilities.map((f) => (
              <li key={f} className="bs-fact">
                {f}
              </li>
            ))}

          </ul>
        </div>
      </section>

      {/* The lab */}
      <section className="bs-lab rh-section" aria-labelledby="bs-lab-t">
        <div className="rh-container">
          <h2 id="bs-lab-t" className="bs-h2">
            The lab is in the building
          </h2>
          <p className="bs-body">
            Most clinics send a crown out to a commercial laboratory and wait for it to come back.
            At Banasree the scan, the design and the milling happen on site, so the gap between your
            preparation appointment and your fitting appointment is a matter of the lab&rsquo;s
            queue rather than a courier round-trip — and a contact point or a shade that needs
            correcting can be adjusted while you are still in the building.
          </p>
          <EditorialNote>
            <p className="bs-body bs-todo">
              Pending: single-crown turnaround (days); mill and intraoral scanner models.
            </p>
          </EditorialNote>
        </div>
      </section>

      <TeamRoster
        branch="banasree"
        intro="The full team is on site through the afternoon and evening session, so a plan that crosses disciplines does not become a series of referrals."
      />

      {/* Visit */}
      <section className="bs-visit rh-section" id="book" aria-labelledby="bs-visit-t">
        <div className="rh-container bs-two">
          <div>
            <h2 id="bs-visit-t" className="bs-h2">
              Booking and getting here
            </h2>
            <address className="bs-address">{b.address}</address>
            {b.hoursDisplay ? (
              <p className="bs-body">
                <strong>Hours:</strong> {b.hoursDisplay}
              </p>
            ) : (
              <EditorialNote>
                <p className="bs-body bs-todo">Pending: opening days and hours.</p>
              </EditorialNote>
            )}

            <div className="bs-actions">
              <BranchCTA
                action="call"
                branch="banasree"
                variant="primary"
                className="rh-btn rh-btn-primary"
              >
                Call {b.phoneDisplay}
              </BranchCTA>
              <BranchCTA
                action="whatsapp"
                branch="banasree"
                variant="ghost"
                className="rh-btn rh-btn-ghost"
              >
                WhatsApp
              </BranchCTA>
              <BranchCTA
                action="directions"
                branch="banasree"
                variant="ghost"
                className="rh-btn rh-btn-ghost"
              >
                Directions
              </BranchCTA>
            </div>
          </div>

          <div className="rh-panel bs-map">
            <iframe
              src={b.mapEmbed}
              title={`Map showing ${b.name}, ${b.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <FAQ items={banasreeFaq} title="Questions patients ask about Banasree" id="banasree-faq" />
    </div>
  );
}
