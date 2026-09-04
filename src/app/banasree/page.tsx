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
import banasreeFaq from './faq';
import './banasree.css';

const b = BRANCHES.banasree;

export const metadata: Metadata = pageMeta({
  title: 'Banasree Flagship Dental Hospital',
  description:
    'Full-service dental hospital on Block C, Banasree, Dhaka. In-house master digital lab, the full specialist team on site, published prices and 0% EMI.',
  path: '/banasree',
});

/* TODO(client): the published price list. This is the whole point of the
   Banasree positioning — "everything under one roof, prices published up front"
   — and it is the one thing the page cannot fake. Supply treatment name, price,
   and what each price includes, and this table fills itself. Nothing is invented
   in the meantime. */
const PRICE_LIST: { treatment: string; price: string; includes: string }[] = [];

export default function BanasreePage() {
  return (
    <div className="bs rh-scope" data-branch="banasree">
      <JsonLd
        /* The branch entity itself is declared once, in the root layout's site
           graph. Re-declaring it here produced two nodes sharing one @id — the
           exact defect docs/audit-report.md P1-5 recorded. Only the breadcrumb
           is page-specific. */
        nodes={[
          breadcrumbSchema([
            { name: 'RH Dental Care', path: '/' },
            { name: 'Banasree', path: '/banasree' },
          ]),
        ]}
      />

      {/* ── 1. Hero ──────────────────────────────────────────────────────
          The lead image is the team working, not an empty room: Banasree's
          promise is that the specialists are on site. Cropped — no written
          consent for identifiable patients, so no patient appears. */}
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
            Banasree is the flagship: the bigger setup, with the in-house master
            digital lab, the full specialist team on site and the published price
            list. Cases that run across several disciplines — surgery, endodontics,
            orthodontics, prosthetics — are handled here without sending you
            between addresses.
          </p>

          <div className="bs-actions">
            <BranchCTA action="call" branch="banasree" variant="primary" className="rh-btn rh-btn-primary">
              Call {b.phoneDisplay}
            </BranchCTA>
            <BranchCTA action="whatsapp" branch="banasree" variant="ghost" className="rh-btn rh-btn-ghost">
              Book on WhatsApp
            </BranchCTA>
          </div>

          <ReviewBadge branch="banasree" className="bs-review" />
        </div>
      </header>

      {/* ── 1b. The rooms ────────────────────────────────────────────────── */}
      <section className="bs-rooms rh-section" aria-labelledby="bs-rooms-t">
        <div className="rh-container">
          <h2 id="bs-rooms-t" className="bs-h2">Inside the hospital</h2>
          <p className="bs-body bs-rooms-lede">
            Photographed on working days. No patient appears in any of these —
            we do not publish a face without written consent.
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

      {/* ── 2. Who it is for ─────────────────────────────────────────────── */}
      <section className="bs-section rh-section" aria-labelledby="bs-for">
        <div className="rh-container bs-two">
          <div>
            <h2 id="bs-for" className="bs-h2">Who this branch is for</h2>
            <p className="bs-body">{b.audience}.</p>
            <p className="bs-body">
              {b.promise} A family can be seen across one afternoon rather than four
              separate trips, and a multi-stage plan can be costed in full at the
              start instead of a stage at a time.
            </p>
            <p className="bs-body">
              If what you want is an appointment-only slot with the room to yourself,
              that is the{' '}
              <Link href="/banani" className="bs-link">Banani suite</Link>.
            </p>
          </div>

          <ul className="bs-facts">
            {b.facilities.map((f) => (
              <li key={f} className="bs-fact">{f}</li>
            ))}
            <li className="bs-fact">Published price list — see below</li>
          </ul>
        </div>
      </section>

      {/* ── 3. The lab ───────────────────────────────────────────────────── */}
      <section className="bs-lab rh-section" aria-labelledby="bs-lab-t">
        <div className="rh-container">
          <h2 id="bs-lab-t" className="bs-h2">The lab is in the building</h2>
          <p className="bs-body">
            Most clinics send a crown out to a commercial laboratory and wait for it
            to come back. At Banasree the scan, the design and the milling happen on
            site, so the gap between your preparation appointment and your fitting
            appointment is a matter of the lab&rsquo;s queue rather than a courier
            round-trip — and a contact point or a shade that needs correcting can be
            adjusted while you are still in the building.
          </p>
          <p className="bs-body bs-todo">
            TODO(client): typical turnaround in days for a single crown, and the
            make of the mill and the intraoral scanner. Naming the equipment is what
            makes this section citable; &ldquo;advanced technology&rdquo; is not.
          </p>
        </div>
      </section>

      {/* ── 4. Prices ────────────────────────────────────────────────────── */}
      <section className="bs-pricing rh-section" id="pricing" aria-labelledby="bs-price-t">
        <div className="rh-container">
          <h2 id="bs-price-t" className="bs-h2">Published prices</h2>
          <p className="bs-body">
            Banasree publishes what treatments cost so you can plan before you book.
            Prices are for the treatment as described; anything your examination
            turns up that changes the plan is quoted before it is started, never
            after.
          </p>

          {PRICE_LIST.length > 0 ? (
            <div className="bs-table-wrap">
              <table className="bs-table">
                <caption className="bs-table-caption">
                  RH Dental Care Banasree — published treatment prices
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Treatment</th>
                    <th scope="col">Price</th>
                    <th scope="col">What it includes</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICE_LIST.map((r) => (
                    <tr key={r.treatment}>
                      <th scope="row">{r.treatment}</th>
                      <td className="bs-price">{r.price}</td>
                      <td>{r.includes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rh-niche bs-price-note">
              <p>
                <strong>TODO(client):</strong> the published price list. This is the
                single most important missing item on the site — it is the whole
                Banasree promise, and it is the page competitors win on. Supply
                treatment name, price and what each price includes and this table
                renders itself. No figures are invented in the meantime.
              </p>
            </div>
          )}

          <h3 className="bs-h3">0% EMI</h3>
          <p className="bs-body">
            Treatment plans can be spread over interest-free monthly instalments.
          </p>
          <p className="bs-body bs-todo">
            TODO(client): which cards or lenders the EMI runs through, the minimum
            treatment value, and the tenures available.
          </p>
        </div>
      </section>

      {/* ── 5. Parity ────────────────────────────────────────────────────── */}
      <section className="bs-parity rh-section" aria-labelledby="bs-parity-t">
        <div className="rh-container">
          <h2 id="bs-parity-t" className="bs-h2">The care is the same at both branches</h2>
          <p className="bs-body bs-parity-line">{SHARED_TRUST}</p>
          <p className="bs-body">
            Banasree is not the cut-down option. It is the bigger setup — more chairs,
            more disciplines, the lab. Banani costs more because its schedule keeps
            one room and one clinician on your appointment alone, which is a
            difference in setting, not in dentistry.
          </p>
          <Link href="/banani" className="rh-btn rh-btn-ghost bs-parity-cta">
            See the Banani suite
          </Link>
        </div>
      </section>

      {/* ── 6. Visit ─────────────────────────────────────────────────────── */}
      <section className="bs-visit rh-section" id="book" aria-labelledby="bs-visit-t">
        <div className="rh-container bs-two">
          <div>
            <h2 id="bs-visit-t" className="bs-h2">Booking and getting here</h2>
            <address className="bs-address">{b.address}</address>
            {b.hoursDisplay ? (
              <p className="bs-body"><strong>Hours:</strong> {b.hoursDisplay}</p>
            ) : (
              <p className="bs-body bs-todo">
                TODO(client): confirm opening days and hours for this branch.
              </p>
            )}

            <div className="bs-actions">
              <BranchCTA action="call" branch="banasree" variant="primary" className="rh-btn rh-btn-primary">
                Call {b.phoneDisplay}
              </BranchCTA>
              <BranchCTA action="whatsapp" branch="banasree" variant="ghost" className="rh-btn rh-btn-ghost">
                WhatsApp
              </BranchCTA>
              <BranchCTA action="directions" branch="banasree" variant="ghost" className="rh-btn rh-btn-ghost">
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
