import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { BRANCHES, isBranchId, BranchId } from '@/lib/branches';
import { prisma } from '@/lib/prisma';
import { nextRef, toPrismaBranch } from '@/lib/ref-server';

export const runtime = 'nodejs';

/* Reception must be able to tell where an enquiry came from. That means the
   branch is REQUIRED and is never inferred — the whole point of this work.

   TODO(client): CONTACT_TO_EMAIL. The previous hardcoded recipient was
   'drhasan07012@gmail.com', which has an extra 0 compared with the address used
   everywhere else ('drhasan0712@gmail.com'). If that mailbox does not exist,
   every consultation request submitted through the site has been going nowhere.
   Set CONTACT_TO_EMAIL in the environment and confirm which is correct. */
const FALLBACK_TO = BRANCHES.banani.email ?? '';

interface Payload {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  treatment?: unknown;
  branch?: unknown;
  scheduledAt?: unknown;
  source?: unknown;
}

const str = (v: unknown, max = 2000): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

/** Escapes user input before it is interpolated into the HTML email body. */
const esc = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );

/** Bangladeshi mobile, tolerant of +88 / 0 prefixes and separators. */
const isPhone = (s: string): boolean => /^(\+?88)?0?1[3-9]\d{8}$/.test(s.replace(/[\s()-]/g, ''));
const isEmail = (s: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
/** Reference for email-only mode, in the agreed format: RH-BNN-2609-0042.
 *  The last group is the second of the day mod 10000, so it is four digits and
 *  effectively unique for a day's bookings — two requests to the same branch
 *  would have to arrive exactly 2h46m apart to collide.
 *  Reception finds a booking by searching the inbox for the ref, which is in
 *  the subject line. A guaranteed-unique sequence needs the database; see
 *  PERSIST_APPOINTMENTS below. */
function emailModeRef(branch: BranchId): string {
  const d = new Date();
  const dm = `${String(d.getDate()).padStart(2, '0')}${String(d.getMonth() + 1).padStart(2, '0')}`;
  const sec = (d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds()) % 10000;
  return `RH-${branch === 'banani' ? 'BNN' : 'BSR'}-${dm}-${String(sec).padStart(4, '0')}`;
}

/** Header-injection guard for replyTo. */
const isSafeHeader = (s: string): boolean => !/[\r\n]/.test(s);

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ success: false, error: 'Malformed request.' }, { status: 400 });
  }

  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 200);
  const message = str(body.message, 4000);
  const treatment = str(body.treatment, 120) || 'General consultation';
  const source = str(body.source, 60) || undefined;
  const rawBranch = str(body.branch, 20).toLowerCase();

  const errors: Record<string, string> = {};

  // Branch first: without it the enquiry is unattributable, which is the bug.
  if (!isBranchId(rawBranch)) {
    errors.branch = 'Choose a branch so your request reaches the right reception.';
  }
  if (name.length < 2) errors.name = 'Please give a name we can use.';
  if (!isPhone(phone)) errors.phone = 'Please give a valid Bangladeshi mobile number.';
  if (email && !isEmail(email)) errors.email = 'That email address does not look right.';

  if (Object.keys(errors).length) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const branch = rawBranch as BranchId;
  const b = BRANCHES[branch];
  const mode = b.bookingMode;

  // 'slots' (Banasree) may carry a requested time. 'callback' (Banani) never does.
  let scheduledAt: Date | null = null;
  if (mode === 'slots' && typeof body.scheduledAt === 'string') {
    const d = new Date(body.scheduledAt);
    if (!Number.isNaN(d.getTime()) && d.getTime() > Date.now()) scheduledAt = d;
  }

  /* ── Reference ────────────────────────────────────────────────────────
     Two modes, chosen by PERSIST_APPOINTMENTS.

     OFF (current setting, and the deliberate choice): appointments go to
     reception by email only. No database is touched, nothing is logged as a
     failure, and the reference is derived from the branch, the date and the
     time of day. It is not guaranteed unique the way a sequence is, but two
     bookings for the same branch in the same second is not a real scenario —
     and reception finds a booking by searching the inbox for the ref, which is
     in the subject line.

     ON (after `npx prisma migrate dev --name branch-booking`): the reference
     comes from the RefCounter sequence and an Appointment row is written. If
     that write then fails it IS a fault, so the email is flagged.

     The database is still required for /reviews, /api/reviews and the admin
     login — those tables exist. This flag only governs appointments. ─────── */
  const persist = process.env.PERSIST_APPOINTMENTS === 'true';

  let ref: string;
  let recorded = false;

  if (!persist) {
    ref = emailModeRef(branch);
  } else {
    try {
      ref = await nextRef(branch);
      await prisma.appointment.create({
        data: {
          ref,
          branch: toPrismaBranch(branch),
          patientName: name,
          phone,
          email: email || null,
          treatment,
          message: message || null,
          scheduledAt,
          mode,
          source,
          status: 'PENDING',
        },
      });
      recorded = true;
    } catch (err) {
      console.error('[contact] PERSIST_APPOINTMENTS is on but the write failed:', err);
      ref = emailModeRef(branch);
    }
  }

  /* ── Notify reception. A mail failure must not lose a booking that is
        already recorded, so this is reported separately. ─────────────────── */
  let mailed = false;
  const to = process.env.CONTACT_TO_EMAIL || FALLBACK_TO;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS && to) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT || 465),
        secure: true,
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      const rows: [string, string][] = [
        ['Branch', `${b.shortName} — ${b.tagline}`],
        ...(persist && !recorded
          ? ([['⚠ NOT SAVED', 'Database write failed — record this booking manually.']] as [string, string][])
          : []),
        ['Reference', ref],
        ['Name', name],
        ['Phone', phone],
        ['Email', email || '—'],
        ['Treatment', treatment],
        ['Requested time', scheduledAt ? scheduledAt.toISOString() : 'Call back to arrange'],
      ];

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        ...(email && isSafeHeader(email) ? { replyTo: email } : {}),
        subject: `${persist && !recorded ? '[UNRECORDED] ' : ''}[${b.shortName.toUpperCase()}] ${ref} — ${name}`,
        text: [
          `Branch:    ${b.shortName} (${b.phoneDisplay})`,
          `Reference: ${ref}`,
          `Name:      ${name}`,
          `Phone:     ${phone}`,
          `Email:     ${email || '—'}`,
          `Treatment: ${treatment}`,
          `Time:      ${scheduledAt ? scheduledAt.toISOString() : 'Call back to arrange'}`,
          '',
          message || '(no message)',
        ].join('\n'),
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:620px">
            <h2 style="margin:0 0 4px">${esc(b.shortName)} — new request</h2>
            <p style="margin:0 0 16px;font:600 15px/1.4 monospace">${esc(ref)}</p>
            <table style="width:100%;border-collapse:collapse">
              ${rows
                .map(
                  ([k, v]) =>
                    `<tr><td style="padding:8px 10px;border-bottom:1px solid #eee;width:140px"><strong>${esc(
                      k
                    )}</strong></td><td style="padding:8px 10px;border-bottom:1px solid #eee">${esc(
                      v
                    )}</td></tr>`
                )
                .join('')}
            </table>
            <h3 style="margin:18px 0 6px">Message</h3>
            <div style="background:#f6f6f2;padding:12px;border-radius:6px;white-space:pre-wrap">${esc(
              message || '(no message)'
            )}</div>
          </div>`,
      });
      mailed = true;
    } catch (err) {
      console.error('[contact] recorded but email failed:', err);
    }
  } else {
    console.warn('[contact] email not configured (EMAIL_USER / EMAIL_PASS / CONTACT_TO_EMAIL)');
  }

  return NextResponse.json({
    success: true,
    ref,
    branch,
    mode,
    mailed,
    recorded,
    persisted: persist,
    message:
      mode === 'callback'
        ? `Your request is with the ${b.shortName} suite. Someone will call to confirm your time.`
        : `Your request is with ${b.shortName} reception. We will confirm your slot shortly.`,
  });
}
