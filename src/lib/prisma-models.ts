// Typed accessors for optional Prisma models (Appointment, RefCounter).
//
// These resolve to undefined when the generated client predates the model, so
// the app still type-checks and falls back to the email-only booking path.
// Run `npx prisma generate` after schema changes.

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
