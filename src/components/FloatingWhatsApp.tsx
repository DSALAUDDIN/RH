'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { BRANCHES, whatsappUrl } from '@/lib/branches';
import { makeRef } from '@/lib/ref';
import { useBranch } from './branch/BranchProvider';
import { track } from '@/lib/analytics';
import './FloatingWhatsApp.css';

/**
 * Behaviour, in order:
 *   · On a branch page → pinned to that branch. Renders a real wa.me link.
 *   · Elsewhere with a branch resolved → that branch. Real link.
 *   · No branch → a button that opens the picker, then sends the message.
 */
export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const { branch, openPicker } = useBranch();

  // Not on the admin area, and not on the contact hub
  if (pathname?.startsWith('/admin') || pathname === '/contact') return null;

  const renderTooltip = (branchId?: 'banani' | 'banasree') => (
    <span className="wa-tooltip" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', background: 'transparent', padding: 0 }}>
      <span style={{ background: 'var(--rh-paper)', color: 'var(--rh-ink)', padding: '0.4rem 0.7rem', borderRadius: '4px', fontWeight: 600 }}>WhatsApp</span>
      {branchId && (
        <span style={{ background: branchId === 'banani' ? 'var(--rh-brass)' : 'var(--rh-sage-deep)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem' }}>
          {BRANCHES[branchId].shortName}
        </span>
      )}
    </span>
  );

  return (
    <div className="wa-floating-container">
      {branch ? (
        <a
          href={whatsappUrl(BRANCHES[branch], BRANCHES[branch].waIntent)}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-whatsapp"
          data-branch={branch}
          aria-label={`WhatsApp RH Dental Care ${BRANCHES[branch].shortName}`}
          onClick={(e) => {
            e.preventDefault();
            track('cta_whatsapp', { branch, source: 'floating' });
            window.open(
              whatsappUrl(BRANCHES[branch], `${BRANCHES[branch].waIntent}\nRef: ${makeRef(branch)}`),
              '_blank',
              'noopener,noreferrer'
            );
          }}
        >
          <span className="wa-pulse-ring" aria-hidden="true" />
          <span className="wa-icon">
            <MessageCircle size={26} strokeWidth={1.75} />
          </span>
          {renderTooltip(branch)}
        </a>
      ) : (
        <button
          type="button"
          className="floating-whatsapp"
          aria-label="WhatsApp RH Dental Care"
          onClick={(e) => {
            e.preventDefault();
            openPicker((selected) => {
              track('cta_whatsapp', { branch: selected, source: 'floating' });
              window.open(
                whatsappUrl(BRANCHES[selected], `${BRANCHES[selected].waIntent}\nRef: ${makeRef(selected)}`),
                '_blank',
                'noopener,noreferrer'
              );
            });
          }}
        >
          <span className="wa-pulse-ring" aria-hidden="true" />
          <span className="wa-icon">
            <MessageCircle size={26} strokeWidth={1.75} />
          </span>
          {renderTooltip()}
        </button>
      )}
    </div>
  );
}
