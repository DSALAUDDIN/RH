// Client-side reference for WhatsApp deep links only.
//
// Not unique and not persisted; it only helps reception identify the branch in a
// chat thread. Confirmed bookings use nextRef() from ref-server.ts.

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

/** Deep-link ref. Not unique, not stored. */
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
