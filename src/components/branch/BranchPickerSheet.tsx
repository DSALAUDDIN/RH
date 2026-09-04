'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { BRANCH_LIST, SHARED_TRUST } from '@/lib/branches';
import { useBranch } from './BranchProvider';
import './BranchPickerSheet.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function BranchPickerSheet() {
  const { isPickerOpen, closePicker, executePendingAction, branch } = useBranch();
  const modalRef = useRef<HTMLDivElement>(null);
  const firstOptionRef = useRef<HTMLButtonElement>(null);
  /** The element that opened the sheet, so focus can go back to it. */
  const triggerRef = useRef<HTMLElement | null>(null);

  /* Capture the trigger before the overlay steals focus. */
  useEffect(() => {
    if (isPickerOpen) {
      triggerRef.current = document.activeElement as HTMLElement | null;
    }
  }, [isPickerOpen]);

  const dismiss = useCallback(() => {
    closePicker();
    // Return focus to whatever opened the sheet. WCAG 2.4.3.
    requestAnimationFrame(() => triggerRef.current?.focus?.());
  }, [closePicker]);

  /* Focus trap + Escape. */
  useEffect(() => {
    if (!isPickerOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the sheet.
    requestAnimationFrame(() => firstOptionRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        dismiss();
        return;
      }
      if (e.key !== 'Tab') return;

      const root = modalRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && (active === first || !root.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [isPickerOpen, dismiss]);

  const choose = (id: (typeof BRANCH_LIST)[number]['id']) => {
    // Completes the original intent — the call, message or booking the visitor
    // was already trying to make — then returns focus.
    executePendingAction(id);
    requestAnimationFrame(() => triggerRef.current?.focus?.());
  };

  return (
    <AnimatePresence>
      {isPickerOpen && (
        <div className="branch-sheet-overlay" onClick={dismiss}>
          <motion.div
            className="branch-sheet-modal"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="branch-sheet-title"
            aria-describedby="branch-sheet-desc"
          >
            <button className="branch-sheet-close" onClick={dismiss} aria-label="Close">
              <X size={18} />
            </button>

            <div className="branch-sheet-header">
              <h2 id="branch-sheet-title" className="branch-sheet-title">
                Which branch?
              </h2>
              <p id="branch-sheet-desc" className="branch-sheet-desc">
                So your call reaches the right reception — and so we can tell you what
                to expect when you arrive.
              </p>
            </div>

            <div className="branch-sheet-options">
              {BRANCH_LIST.map((b, i) => (
                <button
                  key={b.id}
                  ref={i === 0 ? firstOptionRef : undefined}
                  type="button"
                  className={`branch-option ${branch === b.id ? 'is-active' : ''}`}
                  data-branch={b.id}
                  onClick={() => choose(b.id)}
                >
                  <span className="branch-option-head">
                    <span className="branch-option-name">{b.shortName}</span>
                    <span className="branch-option-tag">{b.tagline}</span>
                  </span>
                  <span className="branch-option-audience">{b.audience}</span>
                  <span className="branch-option-meta">{b.address}</span>
                </button>
              ))}
            </div>

            <p className="branch-sheet-trust">{SHARED_TRUST}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
