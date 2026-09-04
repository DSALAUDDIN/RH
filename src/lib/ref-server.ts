// src/lib/ref-server.ts — server only.
//
// The authoritative booking reference. Issued from a per-branch database
// sequence inside a transaction, so two simultaneous submissions cannot receive
// the same number. `Appointment.ref` is @unique as a second line of defence.

import 'server-only';
import { prisma } from './prisma';
import { BranchId } from './branches';
import { formatRef, BRANCH_CODE } from './ref';

const PRISMA_BRANCH = { banani: 'BANANI', banasree: 'BANASREE' } as const;

export function toPrismaBranch(b: BranchId) {
  return PRISMA_BRANCH[b];
}

/**
 * Atomically increment the branch's counter and format the next reference.
 * Counter rows are seeded on first use.
 */
export async function nextRef(branch: BranchId, when: Date = new Date()): Promise<string> {
  const key = BRANCH_CODE[branch];

  const counter = await prisma.$transaction(async (tx: typeof prisma) => {
    const existing = await tx.refCounter.findUnique({ where: { key } });
    if (!existing) {
      return tx.refCounter.create({ data: { key, value: 1 } });
    }
    return tx.refCounter.update({
      where: { key },
      data: { value: { increment: 1 } },
    });
  });

  return formatRef(branch, when, counter.value);
}
