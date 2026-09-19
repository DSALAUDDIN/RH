# RH Dental Care

Website for RH Dental Care, a two-branch dental practice in Dhaka (Banani and Banasree).
Production: <https://www.rhdentalcare.com>

## Stack

- Next.js 16 (App Router, React 19, TypeScript, Turbopack)
- Prisma with SQLite (admin, video reviews, optional appointment persistence)
- Nodemailer for enquiry delivery
- GSAP and Framer Motion for animation
- Cloudinary for video hosting

## Getting started

Requirements: Node.js 20.9 or later (see `.nvmrc`).

```bash
cp .env.example .env.local   # fill in the values you need
npm ci                       # also runs `prisma generate`
npm run dev                  # http://localhost:3000
```

## Scripts

| Command                 | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `npm run dev`           | Development server                                   |
| `npm run build`         | Production build                                     |
| `npm start`             | Serve the production build                           |
| `npm run typecheck`     | TypeScript, no emit                                  |
| `npm run lint`          | ESLint (Next.js core-web-vitals + TypeScript rules)  |
| `npm run format`        | Prettier, write                                      |
| `npm run check`         | Typecheck, lint and format check                     |
| `npm run seo:audit`     | Technical SEO audit against a running build          |

## Project structure

```
src/
  app/                  Routes (App Router). One folder per URL.
    sitemap.ts          /sitemap.xml, generated from the route manifest
    robots.ts           /robots.txt
    manifest.ts         /manifest.webmanifest
    llms.txt/route.ts   /llms.txt, generated from the route manifest
  components/           Shared UI
    seo/JsonLd.tsx      The only component that renders JSON-LD
    branch/             Branch context, picker and call/WhatsApp CTAs
  config/site.ts        Site identity: name, canonical origin, locale, IDs
  lib/
    seo/metadata.ts     pageMeta(): canonical, hreflang, Open Graph, Twitter
    seo/schema.ts       schema.org builders with stable @ids
    seo/routes.ts       Route manifest, redirects, specialty canonicals
    branches.ts         Branch registry (addresses, phones, hours)
    doctors.ts          Clinical team
    treatment-faq.ts    FAQ content for treatment pages
scripts/seo-audit.mjs   Crawl-based SEO checks, exits non-zero on errors
docs/                   SEO guide, content gaps, deployment notes
```

## Documentation

- [docs/seo.md](docs/seo.md): how SEO is wired and how to add or change pages
- [docs/content-gaps.md](docs/content-gaps.md): information still needed from the clinic
- [docs/deployment.md](docs/deployment.md): environment variables and release checklist
- [CONTRIBUTING.md](CONTRIBUTING.md): conventions for changes
