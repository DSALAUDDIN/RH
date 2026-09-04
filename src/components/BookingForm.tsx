'use client';

import { useState, useId } from 'react';
import { BRANCHES, BRANCH_LIST, BranchId } from '@/lib/branches';
import { useBranch } from '@/components/branch/BranchProvider';
import { track } from '@/lib/analytics';
import './BookingForm.css';

/**
 * One form, two modes, driven by branch.bookingMode:
 *
 *   'slots'    (Banasree) — a requested date and time, confirmed immediately.
 *   'callback' (Banani)   — no time field; the request goes to the suite and
 *                           someone calls back to confirm.
 *
 * The branch is REQUIRED. There is no default and nothing is inferred: the
 * server rejects a submission without one, and the form will not let you send
 * one either. That is the point of the whole exercise — reception has to be able
 * to tell which clinic an enquiry is for.
 */
type State =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; ref: string; message: string }
  | { kind: 'error'; message: string; errors?: Record<string, string> };

export default function BookingForm({ lockBranch }: { lockBranch?: BranchId }) {
  const { branch: ctxBranch, setBranch } = useBranch();
  const [chosen, setChosen] = useState<BranchId | null>(lockBranch ?? ctxBranch ?? null);
  const [state, setState] = useState<State>({ kind: 'idle' });
  const uid = useId();

  const branch = lockBranch ?? chosen;
  const mode = branch ? BRANCHES[branch].bookingMode : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!branch) {
      setState({
        kind: 'error',
        message: 'Choose a branch first, so your request reaches the right reception.',
        errors: { branch: 'Required' },
      });
      return;
    }

    const fd = new FormData(e.currentTarget);
    setState({ kind: 'sending' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branch,
          name: fd.get('name'),
          phone: fd.get('phone'),
          email: fd.get('email'),
          treatment: fd.get('treatment'),
          message: fd.get('message'),
          scheduledAt: mode === 'slots' ? fd.get('scheduledAt') : undefined,
          source: 'booking_form',
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setState({
          kind: 'error',
          message: data.error ?? 'Something went wrong. Please call us instead.',
          errors: data.errors,
        });
        return;
      }

      track('booking_submit', { branch, mode: mode ?? 'callback' });
      setState({ kind: 'sent', ref: data.ref, message: data.message });
    } catch {
      setState({
        kind: 'error',
        message: 'We could not reach the server. Please call us — the number is on this page.',
      });
    }
  }

  if (state.kind === 'sent') {
    return (
      <div className="bf rh-panel bf-done" role="status" data-branch={branch ?? undefined}>
        <h3>Request received</h3>
        <p>{state.message}</p>
        <p className="bf-ref">
          Reference <strong>{state.ref}</strong>
        </p>
        <p className="bf-note">
          Quote this reference if you call — reception can find your request by it.
        </p>
      </div>
    );
  }

  return (
    <form className="bf rh-panel" onSubmit={onSubmit} data-branch={branch ?? undefined} noValidate>
      {/* ── Branch: required, no default ── */}
      {!lockBranch && (
        <fieldset className="bf-branch">
          <legend>Which branch?</legend>
          <div className="bf-branch-options">
            {BRANCH_LIST.map((b) => (
              <label key={b.id} className={`bf-branch-opt ${branch === b.id ? 'is-on' : ''}`} data-branch={b.id}>
                <input
                  type="radio"
                  name="branch"
                  value={b.id}
                  checked={branch === b.id}
                  onChange={() => {
                    setChosen(b.id);
                    setBranch(b.id, 'booking_form');
                  }}
                  required
                />
                <span className="bf-branch-name">{b.shortName}</span>
                <span className="bf-branch-tag">{b.tagline}</span>
              </label>
            ))}
          </div>
          {state.kind === 'error' && state.errors?.branch && (
            <p className="bf-err">{state.message}</p>
          )}
        </fieldset>
      )}

      {branch && (
        <p className="bf-mode">
          {mode === 'callback'
            ? `${BRANCHES[branch].shortName} is appointment-only. Send this and someone will call you back to confirm a time.`
            : `Tell us when suits and ${BRANCHES[branch].shortName} reception will confirm your slot.`}
        </p>
      )}

      <div className="bf-grid">
        <div className="bf-field">
          <label htmlFor={`${uid}-name`}>Your name</label>
          <input id={`${uid}-name`} name="name" autoComplete="name" required />
          {state.kind === 'error' && state.errors?.name && <p className="bf-err">{state.errors.name}</p>}
        </div>

        <div className="bf-field">
          <label htmlFor={`${uid}-phone`}>Mobile number</label>
          <input id={`${uid}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" required />
          {state.kind === 'error' && state.errors?.phone && <p className="bf-err">{state.errors.phone}</p>}
        </div>

        <div className="bf-field">
          <label htmlFor={`${uid}-email`}>Email <span className="bf-opt">optional</span></label>
          <input id={`${uid}-email`} name="email" type="email" autoComplete="email" />
          {state.kind === 'error' && state.errors?.email && <p className="bf-err">{state.errors.email}</p>}
        </div>

        <div className="bf-field">
          <label htmlFor={`${uid}-treatment`}>What is it about?</label>
          <select id={`${uid}-treatment`} name="treatment" defaultValue="">
            <option value="">Not sure yet</option>
            {(branch ? BRANCHES[branch].services : BRANCHES.banasree.services).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
            <option value="Pain or emergency">Pain or emergency</option>
          </select>
        </div>

        {mode === 'slots' && (
          <div className="bf-field bf-span">
            <label htmlFor={`${uid}-when`}>Preferred date and time</label>
            <input id={`${uid}-when`} name="scheduledAt" type="datetime-local" />
            <p className="bf-hint">
              We will confirm this slot or offer the nearest one.
            </p>
          </div>
        )}

        <div className="bf-field bf-span">
          <label htmlFor={`${uid}-msg`}>Anything we should know <span className="bf-opt">optional</span></label>
          <textarea id={`${uid}-msg`} name="message" rows={4} />
        </div>
      </div>

      {state.kind === 'error' && !state.errors?.branch && <p className="bf-err bf-err-top">{state.message}</p>}

      <button type="submit" className="rh-btn rh-btn-primary bf-submit" disabled={state.kind === 'sending' || !branch}>
        {state.kind === 'sending'
          ? 'Sending…'
          : mode === 'callback'
            ? 'Request a call back'
            : 'Request this appointment'}
      </button>

      <p className="bf-note">
        Your details go to the branch you chose, and nowhere else.
      </p>
    </form>
  );
}
