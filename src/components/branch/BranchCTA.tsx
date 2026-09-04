'use client';

import React from 'react';
import { BranchId, BRANCHES, whatsappUrl, telUrl } from '@/lib/branches';
import { makeRef } from '@/lib/ref';
import { useBranch } from './BranchProvider';
import { track } from '@/lib/analytics';

export type BranchCTAAction = 'call' | 'whatsapp' | 'book' | 'directions';

export interface BranchCTAProps {
  action: BranchCTAAction;
  /** Explicit override. On a branch page, always pass this. */
  branch?: BranchId;
  service?: string;
  variant?: 'primary' | 'ghost' | 'inline';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
}

/**
 * The only way the site offers to call, message, book or navigate.
 *
 * Two renderings, deliberately:
 *
 *  · Branch known (prop or context) → a real <a href="tel:…"> / <a href="wa.me/…">.
 *    A crawler can read the number, the OS can offer it to a long-press, and
 *    assistive tech announces it as a link. The old version was always a
 *    <button>, so no phone number on the site was machine-readable at all.
 *
 *  · Branch not known → a <button> that opens the picker and completes the
 *    original intent once a branch is chosen. It NEVER falls back to a number.
 *    Routing an unattributed enquiry to Banasree is the bug this work exists to
 *    fix, so there is no default anywhere in this file.
 */
export default function BranchCTA({
  action,
  branch: propBranch,
  service,
  variant = 'primary',
  className = '',
  style,
  children,
  onClick,
}: BranchCTAProps) {
  const { branch: ctxBranch, openPicker } = useBranch();
  const activeBranch = propBranch ?? ctxBranch;

  const hrefFor = (id: BranchId): string => {
    const b = BRANCHES[id];
    switch (action) {
      case 'call':
        return telUrl(b);
      case 'whatsapp':
        return whatsappUrl(
          b,
          `${b.waIntent}${service ? `\nTreatment: ${service}` : ''}\nRef: ${makeRef(id, service)}`
        );
      case 'directions':
        return b.mapLink;
      case 'book':
        return `${b.href}#book`;
    }
  };

  const eventFor = (): string =>
    action === 'call' ? 'cta_call'
    : action === 'whatsapp' ? 'cta_whatsapp'
    : action === 'book' ? 'booking_start'
    : 'cta_directions';

  const perform = (id: BranchId) => {
    track(eventFor(), { branch: id, service, action });
    const href = hrefFor(id);
    if (action === 'whatsapp' || action === 'directions') {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = href;
    }
  };

  const cls = `branch-cta branch-cta-${variant} ${className}`.trim();

  /* ── Branch known: a real link. ── */
  if (activeBranch) {
    const external = action === 'whatsapp' || action === 'directions';
    return (
      <a
        href={hrefFor(activeBranch)}
        className={cls}
        style={style}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={() => {
          onClick?.();
          track(eventFor(), { branch: activeBranch, service, action });
        }}
      >
        {children}
      </a>
    );
  }

  /* ── No branch resolved: open the picker, then complete the intent. ── */
  return (
    <button
      type="button"
      className={cls}
      style={style}
      aria-haspopup="dialog"
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        openPicker((selected) => perform(selected));
      }}
    >
      {children}
    </button>
  );
}
