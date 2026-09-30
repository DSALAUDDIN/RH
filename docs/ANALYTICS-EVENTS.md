# Analytics Events — RH Dental Care & Implant Center
**Date:** 2026-09-30  
**GA4 Measurement ID:** `G-XZPKR17DNF` (from `NEXT_PUBLIC_GA_ID`)

---

## Current Implementation Status

Analytics is implemented via `src/lib/analytics.ts` — a thin GA4 wrapper — and `src/components/analytics/GoogleAnalytics.tsx` which loads GA4 via `gtag.js` after hydration (`strategy="afterInteractive"`).

The `track()` function is called from `BranchCTA` on every CTA interaction.

---

## Implemented & Active Events

All these events are implemented and actively fire in the codebase:

| Event Name | Trigger Location | Parameters | Notes |
|-----------|-----------------|------------|-------|
| `cta_call` | `BranchCTA.tsx` | `branch`, `action` | Click on "Call" CTA |
| `cta_whatsapp` | `BranchCTA.tsx` | `branch`, `action`, `service?` | Click on WhatsApp CTA |
| `cta_directions` | `BranchCTA.tsx` | `branch`, `action` | Click on "Directions" / Maps link |
| `booking_start` | `BranchCTA.tsx` | `branch`, `action` | Click on "Book" CTA |
| `booking_submit` | `BookingForm.tsx` | `branch`, `mode` | Successful submission of appointment booking form |
| `branch_select` | `BranchProvider.tsx` / `Navbar.tsx` | `branch`, `source` | Initial branch selection from header dropdown or picker |
| `branch_switch` | `BranchProvider.tsx` / `Navbar.tsx` | `branch`, `from`, `source` | User switches branch preference |

**All branch-related events carry a `branch` parameter** (`'banani'` or `'banasree'`) so enquiries can be attributed per clinic in GA4.

---

## Conversion Verification Status

| Event | Status | Rationale |
|-------|--------|-----------|
| `cta_call` | ✅ Fired in code (`BranchCTA.tsx`) | Direct phone consultation request |
| `cta_whatsapp` | ✅ Fired in code (`BranchCTA.tsx`) | WhatsApp chat initiation |
| `booking_submit` | ✅ Fired in code (`BookingForm.tsx`) | Completed booking request |
| `branch_select` | ✅ Fired in code (`BranchProvider.tsx`) | Intent signal & attribution |
| `branch_switch` | ✅ Fired in code (`BranchProvider.tsx`) | Cross-branch navigation |

---

## Recommended Additional Events

These events would improve conversion analytics without requiring major code changes:

### 1. `contact_form_submit`
**Where:** `src/app/api/contact/route.ts` or the form submit handler  
**Parameters:** `{ branch, form_type: 'contact' }`  
**Rationale:** Track successful contact form submissions separately from call/WhatsApp CTAs

### 2. `video_play`
**Where:** Video components in `/implants`, `/orthodontics`, `/specialties/[slug]`  
**Parameters:** `{ treatment, branch? }`  
**Rationale:** Treatment engagement signals

### 3. `faq_expand`
**Where:** `FAQ` component `<details>` open event  
**Parameters:** `{ question, page }`  
**Rationale:** Intent signals — which questions patients ask most

### 4. `gallery_view`
**Where:** `ClinicGallery`, `BeforeAfter` components  
**Parameters:** `{ branch, image_index }`  
**Rationale:** Understand which visual content drives decisions

### 5. `doctor_profile_view`
**Where:** `/dr-hasan`, `/dr-shimia` page loads  
**Parameters:** `{ doctor_slug }`  
**Rationale:** Which doctor profiles are most visited

---

## GA4 Conversion Events

These events should be marked as **conversions** in the GA4 dashboard:

| Event | Why |
|-------|-----|
| `cta_call` | Phone call = high-intent conversion |
| `cta_whatsapp` | WhatsApp = primary booking channel |
| `booking_submit` | Direct booking = highest-value conversion |

**To mark as conversion in GA4:**  
Admin → Events → Toggle "Mark as conversion" on each event

---

## How to Add a New Event

```ts
// In any 'use client' component:
import { track } from '@/lib/analytics';

// Fire a typed event:
track('cta_call', { branch: 'banani' });

// Fire a custom event (string):
track('faq_expand', { question: 'How long does an implant take?' });
```

The `track()` function is safe to call server-side (it checks `typeof window`) and never throws — analytics failures never block CTAs.

---

## Event Naming Convention

Follow GA4 snake_case naming. All custom events use the pattern:

```
{category}_{action}
```

Examples:
- `cta_call` — CTA category, call action
- `booking_submit` — booking category, submit action  
- `branch_select` — branch category, select action
- `video_play` — video category, play action

**Do not use hyphens or spaces in event names.**
