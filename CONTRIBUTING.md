# Contributing

## Workflow

- Branch from `main`: `feature/<topic>`, `fix/<topic>`, `seo/<topic>`, `content/<topic>`.
- Keep pull requests focused; describe user-facing and SEO-facing changes.
- Before opening a PR: `npm run check` and `npm run build`.
- For changes that touch routes, metadata or structured data, also run
  `npm run seo:audit` against a local production build.

## Conventions

- TypeScript strict mode; avoid `any` in new code.
- Formatting is enforced by Prettier (`npm run format`); lint with ESLint.
- Path alias `@/` maps to `src/`.
- Contact details (phones, WhatsApp, addresses, hours) come from
  `src/lib/branches.ts` only. Calls and messages go through `<BranchCTA>`.
- Page metadata goes through `pageMeta()`; JSON-LD through `src/lib/seo/schema.ts`
  and `<JsonLd>`. Do not hand-write `<script type="application/ld+json">`.
- New indexable pages must be registered in `src/lib/seo/routes.ts`.
- Unconfirmed content: `pending` on FAQ items, `<EditorialNote>` in pages,
  `TODO(content)` in code. Never publish estimated prices, durations or ratings.
- Commit messages: imperative mood, e.g. `Add breadcrumb schema to blog posts`.

See [docs/seo.md](docs/seo.md) for the SEO architecture.
