import Link from 'next/link';
import Image from 'next/image';
import { BRANCH_LIST, SHARED_TRUST } from '@/lib/branches';
import BranchCTA from '@/components/branch/BranchCTA';
import BookingForm from '@/components/BookingForm';
import ReviewBadge from '@/components/ReviewBadge';
import './contact.css';
import EditorialNote from '@/components/EditorialNote';

/*
 * /contact routes visitors to a branch and takes a branch-attributed booking.
 * All contact details come from src/lib/branches.ts.
 */
export default function ContactPage() {
  return (
    <div className="ct rh-scope">
      <header className="ct-hero">
        <div className="rh-container">
          <h1 className="ct-h1">Two clinics. Choose the one that suits you.</h1>
          <p className="ct-lede">
            Choose an appointment-only private suite in Banani or a full-service hospital in Banasree, both run by the same clinical team.
          </p>
          <p className="ct-trust">{SHARED_TRUST}</p>
        </div>
      </header>

      <section className="ct-branches rh-section" aria-labelledby="ct-branches-t">
        <div className="rh-container">
          <h2 id="ct-branches-t" className="ct-h2">
            The branches
          </h2>

          <div className="ct-grid">
            {BRANCH_LIST.map((b) => (
              <article key={b.id} className="rh-panel ct-card" data-branch={b.id}>
                {b.photos[0] ? (
                  <Image
                    className="ct-card-img"
                    src={b.photos[0].src}
                    alt={b.photos[0].alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 900px) 100vw, 46vw"
                  />
                ) : (
                  <div className="ct-card-noimg">
                    <span>{b.shortName}</span>
                  </div>
                )}

                <div className="ct-card-body">
                  <h3 className="ct-card-name">
                    <Link href={b.href}>{b.shortName}</Link>
                  </h3>
                  <p className="ct-card-tag">{b.tagline}</p>
                  <p className="ct-card-audience">{b.audience}</p>

                  <ul className="ct-card-facts">
                    {b.facilities.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>

                  <address className="ct-card-addr">{b.address}</address>
                  {b.hoursDisplay ? (
                    <p className="ct-card-hours">{b.hoursDisplay}</p>
                  ) : (
                    <EditorialNote>
                      <p className="ct-card-todo">Pending: opening hours.</p>
                    </EditorialNote>
                  )}

                  <ReviewBadge branch={b.id} className="ct-card-review" />

                  <div className="ct-card-actions">
                    <BranchCTA action="call" branch={b.id} className="rh-btn rh-btn-primary">
                      Call {b.phoneDisplay}
                    </BranchCTA>
                    <BranchCTA action="whatsapp" branch={b.id} className="rh-btn rh-btn-ghost">
                      WhatsApp
                    </BranchCTA>
                    <BranchCTA action="directions" branch={b.id} className="rh-btn rh-btn-ghost">
                      Directions
                    </BranchCTA>
                  </div>

                  <Link href={b.href} className="ct-card-more">
                    More about {b.shortName}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ct-book rh-section" id="book" aria-labelledby="ct-book-t">
        <div className="rh-container ct-book-inner">
          <div>
            <h2 id="ct-book-t" className="ct-h2">
              Or send a request
            </h2>
            <p className="ct-body">
              Pick a branch and tell us what it is about. Banasree takes a requested time and
              confirms it; Banani takes the request and calls you back. Either way you get a
              reference number, and your details go to that branch only.
            </p>
          </div>
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
