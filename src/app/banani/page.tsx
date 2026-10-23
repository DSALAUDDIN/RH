import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BRANCHES } from '@/lib/branches';
import { breadcrumbs, faqSchema } from '@/lib/seo/schema';
import { pageMeta } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';
import FAQ from '@/components/FAQ';
import TeamRoster from '@/components/TeamRoster';
import ReviewBadge from '@/components/ReviewBadge';
import BranchCTA from '@/components/branch/BranchCTA';
import bananiFaq from './faq';
import './banani.css';
import EditorialNote from '@/components/EditorialNote';
import BananiHeroVideo from '@/components/branch/BananiHeroVideo';

const b = BRANCHES.banani;

export const metadata: Metadata = pageMeta({
  title: 'Dental Clinic in Banani, Dhaka · Road 11',
  description:
    'Private appointment-only dental clinic on Road 11, Banani, Dhaka. 3D CBCT on site, executive consultation room, implants & cosmetic dentistry.',
  path: '/banani',
  image: b.ogImage,
  imageAlt: b.photos[0]?.alt,
  other: {
    'geo.region': 'BD-13',
    'geo.placename': 'Banani, Dhaka, Bangladesh',
    'geo.position': '23.7937;90.4066',
    ICBM: '23.7937, 90.4066',
  },
});

export default function BananiPage() {
  return (
    <div className="bn rh-scope" data-branch="banani">
      <JsonLd
        /*
         * The branch entity is part of the site graph (root layout);
         * breadcrumbs and branch-specific FAQs are rendered here.
         */
        nodes={[
          breadcrumbs({ name: 'Banani', path: '/banani' }),
          faqSchema(bananiFaq),
        ]}
      />

      {/* Hero */}
      <header className="bn-hero">
        <div className="bn-hero-media">
          <BananiHeroVideo
            src="/assets/videos/banani.mp4"
            poster="/assets/branches/banani/reception.webp"
            title="Banani Suite · 4K Tour"
          />
        </div>

        <div className="bn-hero-text rh-rise">
          <p className="bn-kicker">RH Dental Care · Banani, Road 11</p>
          <h1 className="bn-h1">
            Dental Clinic &amp; Private Suite in Banani, Dhaka
          </h1>
          <p className="bn-tagline" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--rh-navy-dark, #002347)', marginTop: '0.4rem', marginBottom: '0.85rem' }}>
            A dental practice that does not <em>feel</em> like one.
          </p>
          <p className="bn-lede">
            Dental anxiety does not usually start in the chair. It starts earlier — in the room
            before it. Banani is a small, appointment-only suite on the seventh floor of B&amp;B
            Empire: panelled walls, warm light, and a schedule built so that your slot is yours.
          </p>

          <div className="bn-hero-actions">
            <BranchCTA
              action="call"
              branch="banani"
              variant="primary"
              className="rh-btn rh-btn-primary"
            >
              Call {b.phoneDisplay}
            </BranchCTA>
            <BranchCTA
              action="whatsapp"
              branch="banani"
              variant="ghost"
              className="rh-btn rh-btn-ghost"
            >
              Request a time on WhatsApp
            </BranchCTA>
          </div>

          {/* Renders the real Google rating, or nothing at all. */}
          <ReviewBadge branch="banani" className="bn-review" />
        </div>
      </header>

      {/* Who it is for */}
      <section className="bn-section rh-section" aria-labelledby="bn-for">
        <div className="rh-container bn-two">
          <div>
            <h2 id="bn-for" className="bn-h2">
              Who this branch is for
            </h2>
            <p className="bn-body">{b.audience}.</p>
            <p className="bn-body">
              {b.promise} Appointments are spaced rather than stacked, so the clinician is not
              moving between chairs and you are not waiting between stages of your own treatment.
            </p>
            <p className="bn-body">
              If your case needs the in-house lab, an orthodontist, or the wider specialist team,
              that work sits at{' '}
              <Link href="/banasree" className="bn-link">
                our Banasree hospital
              </Link>{' '}
              — and we will tell you so rather than stretch it across visits here.
            </p>
          </div>

          <ul className="bn-facts">
            {b.facilities.map((f) => (
              <li key={f} className="bn-fact">
                {f}
              </li>
            ))}
            <li className="bn-fact">Appointment-only — no walk-in queue</li>
          </ul>
        </div>
      </section>

      {/* The rooms & Video Tour */}
      <section className="bn-rooms rh-section" aria-labelledby="bn-rooms-t">
        <div className="rh-container">
          <h2 id="bn-rooms-t" className="bn-h2">
            The rooms
          </h2>
          <p className="bn-body bn-rooms-lede">
            Photographed as they are, on an ordinary working day. Panelled walls, oak joinery, a
            plant in the corner and light that comes from behind everything rather than down onto
            it.
          </p>
        </div>

        <div className="rh-container bn-gallery">
          {b.photos.map((p, i) => (
            <figure key={p.src} className={`bn-figure bn-figure-${i}`}>
              <div className="bn-figure-frame">
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

      <TeamRoster
        branch="banani"
        intro="Banani runs a morning and an evening session. Who you see depends on the time you book, so the list below is worth a look before you choose a slot."
      />

      {/* Getting here / booking */}
      <section className="bn-visit rh-section" aria-labelledby="bn-visit-t" id="book">
        <div className="rh-container bn-two">
          <div>
            <h2 id="bn-visit-t" className="bn-h2">
              Booking and getting here
            </h2>
            <address className="bn-address">{b.address}</address>
            <p className="bn-body">
              Banani takes appointments only. Call or send a WhatsApp message and someone will call
              you back to confirm a time and give you a reference number.
            </p>
            {b.hoursDisplay ? (
              <p className="bn-body">
                <strong>Hours:</strong> {b.hoursDisplay}
              </p>
            ) : (
              <EditorialNote>
                <p className="bn-body bn-todo">Pending: opening days and hours.</p>
              </EditorialNote>
            )}

            <div className="bn-hero-actions">
              <BranchCTA
                action="call"
                branch="banani"
                variant="primary"
                className="rh-btn rh-btn-primary"
              >
                Call {b.phoneDisplay}
              </BranchCTA>
              <BranchCTA
                action="whatsapp"
                branch="banani"
                variant="ghost"
                className="rh-btn rh-btn-ghost"
              >
                WhatsApp
              </BranchCTA>
              <BranchCTA
                action="directions"
                branch="banani"
                variant="ghost"
                className="rh-btn rh-btn-ghost"
              >
                Directions
              </BranchCTA>
            </div>
          </div>

          <div className="rh-panel bn-map">
            <iframe
              src={b.mapEmbed}
              title={`Map showing ${b.name}, ${b.address}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <FAQ items={bananiFaq} title="Questions patients ask about Banani" id="banani-faq" />
    </div>
  );
}
