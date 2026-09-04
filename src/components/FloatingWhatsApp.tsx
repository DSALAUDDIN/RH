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
 *
 * It never defaults to a number. That silent fallback to Banasree is the bug
 * this whole piece of work exists to fix.
 */
export default function FloatingWhatsApp() {
  const { branch, isPinned, openPicker } = useBranch();
  const pathname = usePathname();

  // Not on the admin area, and not on the contact hub, where the page itself
  // already presents both branches side by side.
  if (pathname?.startsWith('/admin') || pathname === '/contact') return null;

  const label = branch
    ? `WhatsApp RH Dental Care ${BRANCHES[branch].shortName}`
    : 'Message us on WhatsApp — choose a branch';

  const tooltip = branch
    ? `WhatsApp ${BRANCHES[branch].shortName}${isPinned ? '' : ' · change'}`
    : 'WhatsApp us';

  const inner = (
    <>
      <span className="wa-pulse-ring" aria-hidden="true" />
      <span className="wa-icon">
        <MessageCircle size={26} strokeWidth={1.75} />
      </span>
      <span className="wa-tooltip">{tooltip}</span>
    </>
  );

  if (branch) {
    const b = BRANCHES[branch];
    return (
      <a
        href={whatsappUrl(b, `${b.waIntent}\nRef: ${makeRef(branch)}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        data-branch={branch}
        aria-label={label}
        onClick={() => track('cta_whatsapp', { branch, source: 'floating' })}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="floating-whatsapp"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={() =>
        openPicker((selected) => {
          const b = BRANCHES[selected];
          track('cta_whatsapp', { branch: selected, source: 'floating_picker' });
          window.open(
            whatsappUrl(b, `${b.waIntent}\nRef: ${makeRef(selected)}`),
            '_blank',
            'noopener,noreferrer'
          );
        })
      }
    >
      {inner}
    </button>
  );
}
