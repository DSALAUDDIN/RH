// src/lib/ref.ts
//
// CLIENT-SIDE reference generator — for WhatsApp deep links ONLY.
//
// The ref that goes in a wa.me message exists so reception can say "I have your
// message" and so the branch is legible in the chat thread. It is NOT the
// booking reference: it is generated in the browser, it is not unique, and
// nothing is stored against it.
//
// The authoritative reference is issued server-side by nextRef() in
// src/lib/ref-server.ts, from a database sequence, and is what appears on a
// confirmed appointment. Never present a client ref as a booking number.

import { BranchId } from './branches';

export const BRANCH_CODE: Record<BranchId, string> = {
  banani: 'BNN',
  banasree: 'BSR',
};

/** RH-BNN-2609-0042 — date is DDMM. */
export function formatRef(branch: BranchId, date: Date, seq: number): string {
  const dm = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}`;
  return `RH-${BRANCH_CODE[branch]}-${dm}-${String(seq % 10000).padStart(4, '0')}`;
}

/** Deep-link ref. Not unique, not stored. See the note above. */
export function makeRef(branch: BranchId, _service?: string): string {
  return formatRef(branch, new Date(), Math.floor(Math.random() * 9000 + 1000));
}

const REF_PATTERN = /^RH-(BNN|BSR)-(\d{4})-(\d{4})$/;

export function isRef(value: string): boolean {
  return REF_PATTERN.test(value);
}

export function branchFromRef(value: string): BranchId | null {
  const m = REF_PATTERN.exec(value);
  if (!m) return null;
  return m[1] === 'BNN' ? 'banani' : 'banasree';
}
