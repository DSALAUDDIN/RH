// src/lib/prisma-models.ts
//
// Narrow, hand-written accessors for the Prisma models that may not exist in
// the GENERATED client yet.
//
// Why this exists: `npx prisma generate` produces the client's TypeScript types
// from schema.prisma. If the schema gains a model but generate has not been re-run
// on that machine, `prisma.appointment` does not exist as a TYPE and the build
// fails at type-check — even though the code never runs that branch. That is
// what broke the build on the server:
//
//   Type error: Property 'appointment' does not exist on type 'PrismaClient'
//
// Appointments are email-only by default (PERSIST_APPOINTMENTS unset), so the
// application must not fail to COMPILE over a table it is not using. These
// accessors return undefined when the model is absent from the generated client,
// and every caller already handles that by falling back to the email path.
//
// Run `npx prisma generate` and they resolve normally.

import { prisma } from './prisma';

interface AppointmentDelegate {
  create(args: { data: Record<string, unknown> }): Promise<{ id: string }>;
}

interface RefCounterDelegate {
  findUnique(args: { where: { key: string } }): Promise<{ key: string; value: number } | null>;
  create(args: { data: { key: string; value: number } }): Promise<{ key: string; value: number }>;
  update(args: {
    where: { key: string };
    data: { value: { increment: number } };
  }): Promise<{ key: string; value: number }>;
}

type MaybeModels = {
  appointment?: AppointmentDelegate;
  refCounter?: RefCounterDelegate;
  $transaction?: <T>(fn: (tx: MaybeModels) => Promise<T>) => Promise<T>;
};

const client = prisma as unknown as MaybeModels;

/** The Appointment delegate, or undefined if the client predates the model. */
export function appointmentModel(): AppointmentDelegate | undefined {
  return client.appointment;
}

/** The RefCounter delegate, or undefined if the client predates the model. */
export function refCounterModel(): RefCounterDelegate | undefined {
  return client.refCounter;
}

export function transaction(): MaybeModels['$transaction'] {
  return client.$transaction?.bind(client);
}

export type { AppointmentDelegate, RefCounterDelegate };
