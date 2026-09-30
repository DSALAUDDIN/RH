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
| `SEO_TOKEN_ENCRYPTION_KEY` | No (rec) | Dedicated secret for AES-256-GCM OAuth token encryption at rest |
| `GOOGLE_CLIENT_ID`         | Admin    | Google Cloud OAuth Client ID for SEO Command Center       |
| `GOOGLE_CLIENT_SECRET`     | Admin    | Google Cloud OAuth Client Secret                          |
| `GA4_PROPERTY_ID`          | Admin    | Google Analytics 4 Property ID (e.g. `properties/123456`) |
| `CRON_SECRET`              | Admin    | Bearer token for automated daily SEO sync cron endpoint   |

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
`rhdentalcare.com`. Requests for `www.rhdentalcare.com`, `rhdentalcare.com.bd`, and
`www.rhdentalcare.com.bd` are permanently redirected (HTTP 301) to `https://rhdentalcare.com`
by the app itself.

## Database & Persistence Architecture

- **Single VPS / Persistent Container:** SQLite (`prisma/schema.prisma` targeting `DATABASE_URL="file:./dev.db"`) is suitable. Keep database files out of version control and back up regularly.
- **Serverless / Vercel Production:** Serverless execution environments have ephemeral, read-only filesystems and do not sustain local SQLite databases across invocations. For serverless hosting:
  1. Provision a managed PostgreSQL instance (Supabase, Neon, AWS RDS, or Vercel Postgres).
  2. Set `DATABASE_URL="postgres://..."` in environment variables.
  3. Generate Prisma client with the PostgreSQL schema:
     ```bash
     npm run prisma:generate:pg
     npm run prisma:db:push:pg
     ```
  4. All SEO daily snapshots, encrypted OAuth tokens, query trends, and security audit logs will persist durably in the managed database.

## Release checklist

1. `npm run check` and `npm run build` pass.
2. `npm start`, then `npm run seo:audit` reports no errors.
3. Deploy; submit a test enquiry for each branch and confirm the email arrives.
4. `npm run seo:audit -- --base=https://rhdentalcare.com`.
5. Search Console: resubmit `/sitemap.xml` if routes changed; inspect changed URLs.
6. Rich Results Test on a treatment page, a branch page and a blog post.
