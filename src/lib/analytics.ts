// GA4 event helpers. Every branch-relevant event carries a `branch` param so
// enquiries can be attributed per clinic.
//
// Events: branch_select, branch_switch, cta_call, cta_whatsapp, cta_directions,
// booking_start, booking_submit.

export type BranchEvent =
  | 'branch_select'
  | 'branch_switch'
  | 'cta_call'
  | 'cta_whatsapp'
  | 'cta_directions'
  | 'booking_start'
  | 'booking_submit';

type Params = Record<string, string | number | boolean | undefined>;

export function track(event: BranchEvent | string, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;
  try {
    gtag(
      'event',
      event,
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined)),
    );
  } catch {
    /* Analytics failures must never block the CTA. */
  }
}
