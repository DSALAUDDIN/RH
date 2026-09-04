import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BRANCHES, SHARED_TRUST } from '@/lib/branches';
import { breadcrumbSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/metadata';
import JsonLd from '@/components/JsonLd';
import FAQ from '@/components/FAQ';
import ReviewBadge from '@/components/ReviewBadge';
import BranchCTA from '@/components/branch/BranchCTA';
import bananiFaq from './faq';
import './banani.css';

const b = BRANCHES.banani;

export const metadata: Metadata = pageMeta({
  title: 'Banani Private Dental Suite',
  description:
    'Appointment-only dental care on Road 11, Banani. 3D CBCT on site, a consultation room separate from treatment, and the same clinicians as Banasree.',
  path: '/banani',
  image: b.ogImage,
  imageAlt: b.photos[0]?.alt,
});

export default function BananiPage() {
  return (
    <div className="bn rh-scope" data-branch="banani">
      <JsonLd
        /* The branch entity itself is declared once, in the root layout's site
           graph. Re-declaring it here produced two nodes sharing one @id — the
           exact defect docs/audit-report.md P1-5 recorded. Only the breadcrumb
           is page-specific. */
        nodes={[
          breadcrumbSchema([
            { name: 'RH Dental Care', path: '/' },
            { name: 'Banani', path: '/banani' },
          ]),
        ]}
      />

      {/* ── 1. It does not look like a clinic ──────────────────────────────
          The photograph carries the claim. The headline does not oversell it,
          and it does not say "there is no waiting room" — there is one, and it
          is in the picture. See docs/audit-report.md §5. */}
      <header className="bn-hero">
        <div className="bn-hero-media">
          <Image
            src="/assets/branches/banani/reception.webp"
            alt={b.photos[0].alt}
            width={1600}
            height={1200}
            priority
            sizes="(max-width: 900px) 100vw, 58vw"
            className="bn-hero-img"
          />
        </div>

        <div className="bn-hero-text rh-rise">
          <p className="bn-kicker">RH Dental Care · Banani</p>
          <h1 className="bn-h1">
            A dental practice that does not <em>feel</em> like one.
          </h1>
          <p className="bn-lede">
            Dental anxiety does not usually start in the chair. It starts earlier —
            in the room before it. Banani is a small, appointment-only suite on the
            seventh floor of B&amp;B Empire: panelled walls, warm light, and a
            schedule built so that your slot is yours.
          </p>

          <div className="bn-hero-actions">
            <BranchCTA action="call" branch="banani" variant="primary" className="rh-btn rh-btn-primary">
              Call {b.phoneDisplay}
            </BranchCTA>
            <BranchCTA action="whatsapp" branch="banani" variant="ghost" className="rh-btn rh-btn-ghost">
              Request a time on WhatsApp
            </BranchCTA>
          </div>

          {/* Renders the real Google rating, or nothing at all. */}
          <ReviewBadge branch="banani" className="bn-review" />
        </div>
      </header>

      {/* ── 2. Who it is for ─────────────────────────────────────────────── */}
      <section className="bn-section rh-section" aria-labelledby="bn-for">
        <div className="rh-container bn-two">
          <div>
            <h2 id="bn-for" className="bn-h2">Who this branch is for</h2>
            <p className="bn-body">{b.audience}.</p>
            <p className="bn-body">
              {b.promise} Appointments are spaced rather than stacked, so the
              clinician is not moving between chairs and you are not waiting between
              stages of your own treatment.
            </p>
            <p className="bn-body">
              If your case needs the in-house lab, an orthodontist, or the wider
              specialist team, that work sits at{' '}
              <Link href="/banasree" className="bn-link">our Banasree hospital</Link>{' '}
              — and we will tell you so rather than stretch it across visits here.
            </p>
          </div>

          <ul className="bn-facts">
            {b.facilities.map((f) => (
              <li key={f} className="bn-fact">{f}</li>
            ))}
            <li className="bn-fact">Appointment-only — no walk-in queue</li>
          </ul>
        </div>
      </section>

      {/* ── 3. The rooms ─────────────────────────────────────────────────
          Four photographs of the suite, each with a caption that says what it
          shows rather than adjectives about it. The treatment-room frame is
          cropped: the full photograph has an identifiable patient under
          treatment in it and is not published without written consent. */}
      <section className="bn-rooms rh-section" aria-labelledby="bn-rooms-t">
        <div className="rh-container">
          <h2 id="bn-rooms-t" className="bn-h2">The rooms</h2>
          <p className="bn-body bn-rooms-lede">
            Photographed as they are, on an ordinary working day. Panelled walls,
            oak joinery, a plant in the corner and light that comes from behind
            everything rather than down onto it.
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

      {/* ── 4. Same care at both branches. Stated, not implied. ──────────── */}
      <section className="bn-parity rh-section" aria-labelledby="bn-parity-t">
        <div className="rh-container">
          <h2 id="bn-parity-t" className="bn-h2">The care is the same at both branches</h2>
          <p className="bn-body bn-parity-line">{SHARED_TRUST}</p>
          <p className="bn-body">
            Banani is priced above Banasree because the room is yours for the whole
            appointment — not because the dentistry differs. It does not. The same
            two clinicians, the same materials and the same sterilisation protocol
            are used at both addresses.
          </p>
          <Link href="/banasree" className="rh-btn rh-btn-ghost bn-parity-cta">
            See the Banasree hospital
          </Link>
        </div>
      </section>

      {/* ── 5. Cost ──────────────────────────────────────────────────────── */}
      <section className="bn-cost rh-section" aria-labelledby="bn-cost-t">
        <div className="rh-container">
          <h2 id="bn-cost-t" className="bn-h2">What it costs</h2>
          <p className="bn-body">
            Banani publishes a consultation fee and package ranges rather than an
            itemised list — a plan is quoted against your own examination and
            imaging, in writing, before any treatment starts.
          </p>
          <div className="rh-niche bn-cost-note">
            <p>
              <strong>TODO(client):</strong> the Banani consultation fee, whether it
              is credited against treatment, and package ranges for implants,
              veneers and orthodontics. Nothing is published here until you supply
              real figures — a wrong price on a medical site is worse than a blank.
            </p>
          </div>
          <p className="bn-body">
            The full published price list is at{' '}
            <Link href="/banasree#pricing" className="bn-link">Banasree</Link>.
          </p>
        </div>
      </section>

      {/* ── 6. Getting here / booking ────────────────────────────────────── */}
      <section className="bn-visit rh-section" aria-labelledby="bn-visit-t" id="book">
        <div className="rh-container bn-two">
          <div>
            <h2 id="bn-visit-t" className="bn-h2">Booking and getting here</h2>
            <address className="bn-address">
              {b.address}
            </address>
            <p className="bn-body">
              Banani takes appointments only. Call or send a WhatsApp message and
              someone will call you back to confirm a time and give you a reference
              number.
            </p>
            {b.hoursDisplay ? (
              <p className="bn-body"><strong>Hours:</strong> {b.hoursDisplay}</p>
            ) : (
              <p className="bn-body bn-todo">
                TODO(client): confirm opening days and hours for this branch.
              </p>
            )}

            <div className="bn-hero-actions">
              <BranchCTA action="call" branch="banani" variant="primary" className="rh-btn rh-btn-primary">
                Call {b.phoneDisplay}
              </BranchCTA>
              <BranchCTA action="whatsapp" branch="banani" variant="ghost" className="rh-btn rh-btn-ghost">
                WhatsApp
              </BranchCTA>
              <BranchCTA action="directions" branch="banani" variant="ghost" className="rh-btn rh-btn-ghost">
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
