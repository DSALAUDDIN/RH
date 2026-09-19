# Deployment

## Environment variables

Set these on the host (see `.env.example` for the full list).

| Variable                   | Required | Purpose                                                   |
| -------------------------- | -------- | --------------------------------------------------------- |
| `JWT_SECRET`               | Yes      | Signs admin sessions. Admin routes are disabled without it |
| `EMAIL_USER`, `EMAIL_PASS` | Yes      | Enquiry delivery (Gmail app password or SMTP account)     |
| `CONTACT_TO_EMAIL`         | Yes      | Mailbox that receives enquiries                           |
| `DATABASE_URL`             | Admin    | Prisma database (reviews, admin, optional appointments)   |
| `NEXT_PUBLIC_GA_ID`        | No       | GA4 measurement ID (a default is configured)              |
| `GOOGLE_PLACES_API_KEY`    | No       | Live Google ratings (also needs `placeId` per branch)     |
| `CLOUDINARY_*`             | Admin    | Video uploads from the admin dashboard                    |
| `PERSIST_APPOINTMENTS`     | No       | `true` to store bookings in the database as well as email |

Generate a secret:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

## Build and run

```bash
npm ci
npm run build
npm start            # or run under a process manager such as PM2
```

The app expects to sit behind a reverse proxy that terminates TLS for
`www.rhdentalcare.com`. Requests for the apex domain are redirected to `www`
by the app itself.

## Database

SQLite (`prisma/dev.db`) is suitable for a single VPS. It is not suitable for
serverless platforms with a read-only filesystem; use a hosted database there.
Keep database files out of version control.

## Release checklist

1. `npm run check` and `npm run build` pass.
2. `npm start`, then `npm run seo:audit` reports no errors.
3. Deploy; submit a test enquiry for each branch and confirm the email arrives.
4. `npm run seo:audit -- --base=https://www.rhdentalcare.com`.
5. Search Console: resubmit `/sitemap.xml` if routes changed; inspect changed URLs.
6. Rich Results Test on a treatment page, a branch page and a blog post.
