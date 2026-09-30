# Legacy Domain Redirect Map — RH Dental Care
**Date:** 2026-09-30

## Summary

| Domain Variant | Status | Action |
|----------------|--------|--------|
| `www.rhdentalcare.com` | ✅ Handled | 301 → `https://rhdentalcare.com` via `next.config.ts` |
| `rhdentalcare.com.bd` (apex) | ✅ Implemented in Next.js config | 301 → `https://rhdentalcare.com` (requires DNS/edge CNAME) |
| `www.rhdentalcare.com.bd` | ✅ Implemented in Next.js config | 301 → `https://rhdentalcare.com` (requires DNS/edge CNAME) |

---

## Current Redirects (Active in `next.config.ts`)

```ts
// next.config.ts → redirects()
{
  source: '/:path*',
  has: [{ type: 'host', value: 'www.rhdentalcare.com' }],
  destination: 'https://rhdentalcare.com/:path*',
  permanent: true,  // HTTP 301
},
{
  source: '/:path*',
  has: [{ type: 'host', value: 'rhdentalcare.com.bd' }],
  destination: 'https://rhdentalcare.com/:path*',
  permanent: true,  // HTTP 301
},
{
  source: '/:path*',
  has: [{ type: 'host', value: 'www.rhdentalcare.com.bd' }],
  destination: 'https://rhdentalcare.com/:path*',
  permanent: true,  // HTTP 301
},
```

---

## `.com.bd` Domain — External Access / DNS Status (`BLOCKED — EXTERNAL ACCESS`)

The application code is now fully prepared to 301 redirect any requests arriving with `host: rhdentalcare.com.bd` or `host: www.rhdentalcare.com.bd`.

**Action needed from Client / Infrastructure Admin:**
1. In DNS management for `rhdentalcare.com.bd`, point the `A` / `CNAME` records to the production hosting platform (e.g. server IP `147.93.31.71` / edge).
2. Add `rhdentalcare.com.bd` and `www.rhdentalcare.com.bd` as custom domain aliases on the hosting dashboard so SSL certificates are generated.
3. Next.js will automatically terminate the request with a permanent HTTP 301 to `https://rhdentalcare.com/:path*`.

---

## Recommended Redirect Coverage

| Source Pattern | Destination | Priority |
|---------------|------------|---------|
| `http://www.rhdentalcare.com/*` | `https://rhdentalcare.com/*` | ✅ Handled by next.config.ts |
| `https://www.rhdentalcare.com/*` | `https://rhdentalcare.com/*` | ✅ Handled by next.config.ts |
| `http://rhdentalcare.com.bd/*` | `https://rhdentalcare.com/*` | ⚠️ Unconfirmed (pending DNS alias) |
| `https://rhdentalcare.com.bd/*` | `https://rhdentalcare.com/*` | ⚠️ Unconfirmed (pending DNS alias) |

---

## Internal Link Audit for Legacy Domain References

Search performed:
```bash
grep -rn "rhdentalcare.com.bd\|http://rhdentalcare\|http://www.rhdentalcare" \
  /Users/macbookprom1/Developer/web-app/RH/src --include="*.ts" --include="*.tsx"
```

**Result:** No legacy domain references found in source code. ✅ Clean.
