import Image from 'next/image';
import Link from 'next/link';
import { BRANCHES, BranchId } from '@/lib/branches';
import { teamAt, postingLabel, initials, type Clinician } from '@/lib/doctors';
import './TeamRoster.css';

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

        <ul className="tr-grid">
          {people.map((c) => (
            <li key={c.name} className="rh-panel tr-card">
              <div className="tr-portrait">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.imageAlt ?? c.name}
                    width={480}
                    height={810}
                    sizes="(max-width: 700px) 45vw, 220px"
                  />
                ) : (
                  <span className="tr-initials" aria-hidden="true">
                    {initials(c.name)}
                  </span>
                )}
              </div>

              <div className="tr-body">
                <h3 className="tr-name">
                  {c.slug ? <Link href={`/${c.slug}`}>{c.name}</Link> : c.name}
                </h3>

                {c.role && <p className="tr-role">{c.role}</p>}

                {c.qualifications.length > 0 && (
                  <p className="tr-quals">{c.qualifications.join(' · ')}</p>
                )}

                {c.bmdc && <p className="tr-bmdc">BMDC {c.bmdc}</p>}

                {c.procedures.length > 0 && (
                  <p className="tr-focus">{c.procedures[0]}</p>
                )}

                {postingLabel(c, branch) && (
                  <p className="tr-hours">{postingLabel(c, branch)}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export type { Clinician };
