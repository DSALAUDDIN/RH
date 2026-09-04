# RH Dental Care — before you push and go live

Two things I found while checking, both fixed in the code. One thing I could not
fix for you, because it is a hosting decision.

---

## Fixed: a public secret was guarding the admin panel

Five files carried this:

```
process.env.JWT_SECRET || 'fallback_secret_key_for_dev'
```

`src/middleware.ts`, `src/app/api/auth/login/route.ts`,
`src/app/api/reviews/route.ts`, `src/app/api/reviews/[id]/route.ts`,
`src/app/api/upload/route.ts`.

Your repo is `github.com/DSALAUDDIN/RH`. That fallback string goes to GitHub with
it. The moment you deploy without setting `JWT_SECRET`, **anyone who can read the
repository can sign their own `admin_token` cookie and walk into
`/admin/dashboard`** — no password needed.

It is now one module, `src/lib/auth-secret.ts`:

- **Production with `JWT_SECRET` set** → normal.
- **Production without it** → `getAuthSecret()` returns `null`, every admin
  route rejects, the login endpoint returns 503, and the middleware redirects to
  the login page. It fails closed. The public site is unaffected.
- **Development** → a clearly-labelled local secret, so `npm run dev` needs no setup.

**You must still set `JWT_SECRET` in Vercel.** Generate one:

```
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

## Fixed: the SQLite database was tracked in git

`prisma/dev.db` is committed. It holds the `Admin` table — username `admin` and a
bcrypt hash. In a public repo that hash can be brute-forced offline at leisure.

`.gitignore` now excludes `prisma/*.db`. **Run this once before you push:**

```
git rm --cached prisma/dev.db
```

The file stays on your disk; git stops tracking it. Note this does not erase it
from past commits — if the repo is public, treat the admin password as exposed
and change it.

---

## Not fixed, because it is your call: SQLite will not work on Vercel

You deploy to Vercel (there is a `.vercel` folder). Vercel's filesystem is
read-only and ephemeral, so `DATABASE_URL="file:./prisma/dev.db"` cannot work in
production. Writes fail and the file resets on every deploy.

**What this does and does not affect:**

| | Production impact |
|---|---|
| **Appointments** | **None.** Email-only, no database. Works. |
| Public site — all 23 pages | **None.** No database involved. |
| `/reviews` page | Degrades gracefully — loses the video strip, page still renders (I hardened this). |
| Admin login `/admin` | **Broken** |
| Video-review admin | **Broken** |

So the website works and takes bookings. The admin panel does not.

Three options:

1. **Ship as is.** The admin panel only manages video reviews, and there are
   none on the site right now. Fix it when you need it.
2. **Move to a hosted database.** Vercel Postgres or Turso (Turso is SQLite, so
   `schema.prisma` barely changes). Swap `DATABASE_URL`, run the migration, done.
3. **Drop the admin panel** from the deploy for now.

I would ship as is and do (2) when you want the review manager back.

---

## Vercel environment variables

Set these in **Settings → Environment Variables** (Production). They are in your
local `.env.local`, which is correctly gitignored — so Vercel will not get them
unless you add them by hand.

| Variable | Value | Needed for |
|---|---|---|
| `EMAIL_USER` | your Gmail address | sending enquiries |
| `EMAIL_PASS` | Gmail **app password**, not the account password | sending enquiries |
| `CONTACT_TO_EMAIL` | `drhasan0712@gmail.com` | where enquiries land |
| `JWT_SECRET` | a fresh random string | admin auth — **required** |
| `NEXT_PUBLIC_GA_ID` | your GA4 id (optional; defaults to `G-XZPKR17DNF`) | analytics |
| `DATABASE_URL` | only if you do option 2 above | reviews + admin |
| `PERSIST_APPOINTMENTS` | leave unset | appointments stay email-only |

**Send yourself a test enquiry from the live site before you announce it.** In
email-only mode the email is the only copy of a booking — if the address or the
app password is wrong, enquiries vanish silently.

---

## After deploying

1. Google Search Console → submit `https://www.rhdentalcare.com/sitemap.xml`.
   Twelve pages were canonicalised to the homepage until now; the branch and
   doctor pages have never been crawlable as themselves.
2. Request indexing for `/banani` and `/banasree` specifically.
3. Run Lighthouse (mobile) and Google's Rich Results Test on the live URL — both
   need a public address, so neither could be run from here.
4. `npm run seo:audit` against the live site:
   `node scripts/seo-audit.mjs --base=https://www.rhdentalcare.com`

---

## Still outstanding — not blockers, but they are visible on the live site

- **The six testimonials** are quarantined; the section renders an honest empty
  state pointing to the Google listings. Confirm real-or-written.
- **The Banasree price list** — the page has a table waiting and currently shows
  a TODO note. This is the biggest content gap.
- **Opening hours** are not published for either branch — three conflicting sets
  existed, so nothing is shown until you confirm.
- **`ReviewBadge` renders nothing** anywhere until you supply
  `GOOGLE_PLACES_API_KEY` and a `placeId` per branch. That is correct behaviour,
  but it means no rating appears on the site at all.
- **56 `TODO(client)` markers** — `grep -rn "TODO(client)" src/`
