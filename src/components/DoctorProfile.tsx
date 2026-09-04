import Image from 'next/image';
import Link from 'next/link';
import { BRANCHES } from '@/lib/branches';
import type { Doctor } from '@/lib/doctors';
import BranchCTA from '@/components/branch/BranchCTA';
import './DoctorProfile.css';

/**
 * Shared clinician profile. Renders only sections that have real content — an
 * empty memberships array produces no "Memberships" heading, rather than a
 * heading over filler. Anything unconfirmed shows as an explicit TODO(client)
 * note so it is visible in review rather than quietly absent.
 */
export default function DoctorProfile({ doctor: d }: { doctor: Doctor }) {
  const todos: string[] = [];
  if (!d.bmdc) todos.push('BMDC registration number');
  if (!d.appointments.length) todos.push('academic or hospital appointments');
  if (!d.procedures.length) todos.push('clinical focus and procedures');

  return (
    <article className="dp rh-scope">
      <header className="dp-hero">
        <div className="dp-hero-text">
          <p className="dp-kicker">RH Dental Care</p>
          <h1 className="dp-name">{d.name}</h1>
          <p className="dp-role">{d.role}</p>

          {d.bmdc && <p className="dp-bmdc">BMDC registration {d.bmdc}</p>}

          {d.qualifications.length > 0 && (
            <ul className="dp-quals">
              {d.qualifications.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ul>
          )}

          <div className="dp-actions">
            <BranchCTA action="book" variant="primary" className="rh-btn rh-btn-primary">
              Request an appointment
            </BranchCTA>
          </div>
        </div>

        <div className="dp-portrait">
          <Image
            src={d.image}
            alt={d.imageAlt}
            width={720}
            height={900}
            priority
            sizes="(max-width: 900px) 60vw, 34vw"
          />
        </div>
      </header>

      {d.bio.length > 0 && (
        <section className="dp-section rh-section" aria-labelledby="dp-about">
          <div className="rh-container">
            <h2 id="dp-about" className="dp-h2">About</h2>
            {d.bio.map((p, i) => (
              <p key={i} className="dp-body">{p}</p>
            ))}
          </div>
        </section>
      )}

      {d.procedures.length > 0 && (
        <section className="dp-section rh-section" aria-labelledby="dp-proc">
          <div className="rh-container">
            <h2 id="dp-proc" className="dp-h2">Procedures</h2>
            <ul className="dp-list">
              {d.procedures.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(d.training.length > 0 || d.appointments.length > 0) && (
        <section className="dp-section rh-section" aria-labelledby="dp-train">
          <div className="rh-container dp-cols">
            {d.training.length > 0 && (
              <div>
                <h2 id="dp-train" className="dp-h2">Training</h2>
                <ul className="dp-list">
                  {d.training.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
            {d.appointments.length > 0 && (
              <div>
                <h2 className="dp-h2">Academic appointments</h2>
                <ul className="dp-list">
                  {d.appointments.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="dp-section rh-section" aria-labelledby="dp-where">
        <div className="rh-container">
          <h2 id="dp-where" className="dp-h2">Where {d.name.split(' ').slice(0, 2).join(' ')} sees patients</h2>
          <div className="dp-branches">
            {d.worksAt.map((id) => {
              const b = BRANCHES[id];
              return (
                <div key={id} className="rh-panel dp-branch" data-branch={id}>
                  <h3>{b.shortName}</h3>
                  <p className="dp-branch-tag">{b.tagline}</p>
                  <p className="dp-branch-addr">{b.address}</p>
                  <div className="dp-branch-actions">
                    <BranchCTA action="call" branch={id} className="rh-btn rh-btn-ghost">
                      Call {b.phoneDisplay}
                    </BranchCTA>
                    <Link href={b.href} className="rh-btn rh-btn-ghost">
                      About this branch
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {todos.length > 0 && (
        <section className="rh-section" aria-label="Outstanding information">
          <div className="rh-container">
            <div className="rh-niche dp-todo">
              <p>
                <strong>TODO(client):</strong> {todos.join(', ')} for {d.name}. These
                are what a knowledge panel is built from and what an AI assistant
                cites — the page is thin without them, and nothing here is guessed.
              </p>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
