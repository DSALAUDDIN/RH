import Link from 'next/link';
import { SHARED_TRUST } from '@/lib/branches';
import { TEAM } from '@/lib/doctors';
import { physicianSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';
import TeamRoster from '@/components/TeamRoster';
import './team.css';
import EditorialNote from '@/components/EditorialNote';

/* Metadata and the breadcrumb live in team/layout.tsx. */

export default function TeamPage() {
  /* One Physician node per clinician, limited to verified fields. */
  const nodes = TEAM.map((c) =>
    physicianSchema({
      slug:
        c.slug ??
        c.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
      name: c.fullName,
      jobTitle: c.role ?? 'Dental Surgeon',
      description: c.bio[0] ?? `${c.role ?? 'Dental surgeon'} at RH Dental Care, Dhaka.`,
      image: c.image ?? undefined,
      credentials: [...c.qualifications, ...(c.bmdc ? [`BMDC Reg. ${c.bmdc}`] : [])],
      knowsAbout: c.procedures.length ? c.procedures : undefined,
      worksAt: c.postings.map((p) => p.branch),
      hasProfilePage: Boolean(c.slug),
    }),
  );

  return (
    <div className="team-page rh-scope">
      <JsonLd nodes={nodes} />

      <header className="team-hero">
        <div className="rh-container">
          <h1 className="team-h1">The clinical team</h1>
          <p className="team-lede">
            Fifteen clinicians across two addresses. Where someone works, on which days, and what
            they are registered to do — set out so you can see who you will actually be seen by.
          </p>
          <p className="team-trust">{SHARED_TRUST}</p>
        </div>
      </header>

      <TeamRoster
        branch="banasree"
        title="At Banasree"
        intro="The flagship hospital runs an afternoon and evening session with the full specialist team on site."
      />

      <TeamRoster
        branch="banani"
        title="At Banani"
        intro="The Banani suite runs a morning and an evening session, by appointment only."
      />

      <EditorialNote>
        <section className="rh-section team-note">
          <div className="rh-container">
            <div className="rh-niche team-note-inner">
              <p>
                <strong>Pending:</strong> qualifications, BMDC registration and portraits for Dr.
                Tonima, Dr. Noton, Dr. Mim and Dr. Nusrat; BMDC number for Dr. Nabil. See
                docs/content-gaps.md.
              </p>
            </div>
            <p className="team-cta-line">
              <Link href="/contact">Choose a branch and book</Link>
            </p>
          </div>
        </section>
      </EditorialNote>
    </div>
  );
}
