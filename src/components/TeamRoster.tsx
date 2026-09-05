import Image from 'next/image';
import Link from 'next/link';
import { BRANCHES, BranchId } from '@/lib/branches';
import { teamAt, postingLabel, initials, type Clinician } from '@/lib/doctors';
import './TeamRoster.css';

/** The other branch(es) a doctor is also posted to, formatted for the badge. */
function alsoAt(c: Clinician, thisBranch: BranchId): string | null {
  const others = c.postings
    .filter((p) => p.branch !== thisBranch)
    .map((p) => BRANCHES[p.branch].shortName);
  return others.length ? `Also at ${others.join(' & ')}` : null;
}

/**
 * The clinical roster for one branch.
 *
 * Every row shows only what is confirmed. A clinician with no BMDC number shows
 * no BMDC line; one with no qualifications shows no qualifications line; one
 * with no photograph shows an initial rather than a stock portrait. Nothing is
 * padded out to make the grid look even.
 */
export default function TeamRoster({
  branch,
  title,
  intro,
}: {
  branch: BranchId;
  title?: string;
  intro?: string;
}) {
  const b = BRANCHES[branch];
  const people = teamAt(branch);
  if (!people.length) return null;

  return (
    <section className="tr rh-section" data-branch={branch} aria-labelledby={`tr-${branch}`}>
      <div className="rh-container">
        <h2 id={`tr-${branch}`} className="tr-title">
          {title ?? `The team at ${b.shortName}`}
        </h2>
        {intro && <p className="tr-intro">{intro}</p>}

        {/* Branch-specific info: address, hours, link to branch page. */}
        <div className="tr-branch-bar">
          <div className="tr-branch-meta">
            <span className="tr-branch-address">{b.address}</span>
            {b.hoursDisplay && (
              <span className="tr-branch-hours">{b.hoursDisplay}</span>
            )}
          </div>
          <Link href={b.href} className="tr-branch-link">
            About {b.shortName} →
          </Link>
        </div>

        <ul className="tr-grid">
          {people.map((c) => (
            <li key={c.name} className="tr-card-dark">
              <div className="tr-banner">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.imageAlt ?? c.name}
                    width={600}
                    height={338}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                    sizes="(max-width: 700px) 90vw, 400px"
                  />
                ) : (
                  <span className="tr-initials" aria-hidden="true">
                    {initials(c.name)}
                  </span>
                )}
              </div>

              <div className="tr-body-dark">
                {c.role && <p className="tr-role-dark">{c.role.toUpperCase()}</p>}
                
                <h3 className="tr-name-dark">
                  <Link href={`/${c.slug ?? 'team/' + c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`}>
                    {c.name}
                  </Link>
                </h3>

                {c.procedures.length > 0 && (
                  <p className="tr-focus-dark">{c.procedures[0]}</p>
                )}
                
                {alsoAt(c, branch) && (
                  <span className="tr-also-at-dark">{alsoAt(c, branch)}</span>
                )}

                {c.bmdc && (
                  <p className="tr-bmdc-dark">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '6px', opacity: 0.7}}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    BMDC: {c.bmdc}
                  </p>
                )}

                <div className="tr-footer-dark">
                  <Link 
                    href={`/${c.slug ?? 'team/' + c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`} 
                    className="tr-link-dark"
                  >
                    View Full Profile
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: 'auto'}}>
                      <line x1="5" y1="19" x2="19" y2="5" />
                      <polyline points="10 5 19 5 19 14" />
                    </svg>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type { Clinician };
