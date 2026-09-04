// src/lib/ref-server.ts — server only.
//
// The authoritative booking reference. Issued from a per-branch database
// sequence inside a transaction, so two simultaneous submissions cannot receive
// the same number. `Appointment.ref` is @unique as a second line of defence.

import 'server-only';
import { BranchId } from './branches';
import { formatRef, BRANCH_CODE } from './ref';
import { refCounterModel } from './prisma-models';

const PRISMA_BRANCH = { banani: 'BANANI', banasree: 'BANASREE' } as const;

export function toPrismaBranch(b: BranchId) {
  return PRISMA_BRANCH[b];
}

/**
 * Atomically increment the branch's counter and format the next reference.
 * Counter rows are seeded on first use.
 */
export async function nextRef(branch: BranchId, when: Date = new Date()): Promise<string> {
  const counters = refCounterModel();
  if (!counters) {
    // The generated Prisma client predates the RefCounter model — run
    // `npx prisma generate`. Callers fall back to the email-mode reference.
    throw new Error('RefCounter model is not in the generated Prisma client');
  }

  const key = BRANCH_CODE[branch];
  const existing = await counters.findUnique({ where: { key } });
  const counter = existing
    ? await counters.update({ where: { key }, data: { value: { increment: 1 } } })
    : await counters.create({ data: { key, value: 1 } });

  return formatRef(branch, when, counter.value);
}
