# RH Dental SEO Command Center — Architecture & Integration Guide
**Primary Production Domain:** `https://rhdentalcare.com`  
**Command Center Route:** `/admin/seo` (Protected, `noindex, nofollow`)  
**Status:** Production Hardened & Validated  

---

## 1. Executive Overview

The **RH Dental SEO Command Center** is a private, first-party intelligence dashboard built directly into the RH Dental Care web application. It bridges the entire 80-asset authority content architecture (40 English + 40 Native বাংলা guides) with official Google APIs to provide actionable, factual search visibility and conversion intelligence over time.

### Core Principles
1. **Zero Vanity Ranking Scoring:** There is no official Google "SEO score". Our internal metric is strictly labeled **RH SEO Health Score** (`Internal diagnostic score — not a Google ranking score`).
2. **First-Party Data Honesty:** When Google accounts are disconnected, the dashboard displays clear **Not Connected** states with connection prompts instead of fabricating simulated demo statistics.
3. **Dual-Language Parity:** Tracks both English (`/guides/...`) and বাংলা (`/bn/guides/...`) authority assets with query language classification and 1-to-1 slug equivalence.
4. **Local Operational Focus:** Compares Banani and Banasree branch operational interactions (calls, website clicks, directions) without creating an artificial "which branch is better" ranking.
5. **Least-Privilege & Application-Level Encryption:** All tokens, OAuth secrets, and client secrets remain strictly server-side. Refresh tokens and access tokens are encrypted at rest using AES-256-GCM. No API keys or tokens are ever exposed to the client browser or written to server logs.
6. **Current Core Web Vitals Standards:** Adheres to Google's official Core Web Vitals framework: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Legacy FID is marked as deprecated (replaced by INP in March 2024).

---

## 2. Architecture & Data Persistence

```
┌────────────────────────────────────────────────────────────────────────┐
│                   RH DENTAL SEO COMMAND CENTER (/admin/seo)             │
│        [ Client Summary View ]   │   [ Technical & Deep Dive View ]   │
└────────────────────────────────────────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
   /api/admin/seo/data                              /api/admin/seo/sync
 (Authenticated Session)                           (Admin or Cron Token)
           │                                                 │
           ├────────────────────────┬────────────────────────┤
           ▼                        ▼                        ▼
  Google Search Console        Google Analytics 4    Google Business Profile
  (Search Analytics API)        (Data API v1beta)       (Performance API)
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    ▼
                         PageSpeed Insights API v5
                                    ▼
                         Internal SEO Audit Engine
                         (npm run seo:audit specs)
                                    ▼
                         Durable Database Layer
    [ GoogleIntegration · SeoDailySnapshot · SeoQuerySnapshot · SeoAuditResult ]
```

### Database Durability Architecture
- **Development & Single-Node VPS:** Uses SQLite (`prisma/schema.prisma` targeting `DATABASE_URL="file:./dev.db"`).
- **Serverless / Managed Cloud Hosting (Vercel, Supabase, Neon, AWS RDS):** SQLite is read-only and ephemeral in serverless execution runtimes. For production on serverless, the repository provides `prisma/schema.postgresql.prisma` configured for PostgreSQL:
  ```bash
  # Generate client for PostgreSQL
  npm run prisma:generate:pg

  # Deploy or push schema to managed PostgreSQL
  npm run prisma:db:push:pg
  ```
- **Persisted Data Models:**
  - `GoogleIntegration`: Encrypted tokens, token expiry, site/property/location IDs, sync timestamps.
  - `SeoDailySnapshot`: Daily aggregated historical snapshots for trends across health score, search metrics, traffic, conversions, and audit results.
  - `SeoQuerySnapshot`: Top 100+ Search Console queries with clicks, impressions, CTR, position, language, and clinical category cluster.
  - `SeoPageSnapshot`: Landing page metrics, organic sessions, leads, and indexing status.
  - `SeoAuditResult`: Historical technical audit summaries with critical error and warning counts.
  - `SeoSecurityLog`: Timestamped audit trail of connects, disconnects, sync runs, and errors.

---

## 3. Google OAuth 2.0 & API Scopes

Authentication utilizes Google's standard server-side Web Application OAuth 2.0 flow with offline refresh capability.

### Requested Scopes & Permissions
| Scope | Service | Purpose | Permission Level & Behavior |
|:---|:---|:---|:---:|
| `https://www.googleapis.com/auth/webmasters.readonly` | Search Console | Query clicks, impressions, CTR, average search position, URL inspection | Read-only |
| `https://www.googleapis.com/auth/analytics.readonly` | Google Analytics 4 | Organic traffic sessions, engagement, and conversion event tracking | Read-only |
| `https://www.googleapis.com/auth/business.manage` | Business Profile | Banani and Banasree call clicks, directions, and website actions via Performance API | Management-capable scope required by Google for Performance API access; **dashboard operates strictly read-only by behavior** (no business information updates, post publishing, or review replies) |

> [!NOTE]
> Google does not offer an isolated read-only scope for the Google Business Profile Performance API. The `business.manage` scope is required by Google's API gateway to query location interaction metrics. The RH Dental Command Center code strictly consumes read methods (`locations.getDailyMetricsTimeSeries`, `locations.fetchMultiDailyMetricsTimeSeries`) and has zero mutation logic.

### Application-Level Token Encryption at Rest
- **Encryption Algorithm:** AES-256-GCM authenticated encryption (`crypto.createCipheriv('aes-256-gcm', key, iv)`).
- **Encryption Key:** Derived via SHA-256 from `SEO_TOKEN_ENCRYPTION_KEY` (with fallback to `JWT_SECRET`). Key is never exposed to the client or logged.
- **Storage Format:** Ciphertext strings stored in `GoogleIntegration` are prefixed: `enc:v1:<iv_hex>:<auth_tag_hex>:<ciphertext_hex>`.
- **Automatic Token Decryption:** Decrypted in-memory on demand when interacting with Google API endpoints.
- **CSRF Protection via Signed State:** The OAuth consent URL includes a state parameter generated as a cryptographically signed JWT (via `jose`) with a 15-minute expiration, containing a unique cryptographic nonce and admin identity. The callback route (`/api/admin/seo/auth/google/callback`) strictly verifies this JWT before exchanging the authorization code.
- **Safe Revocation & Disconnection:** When an admin clicks Disconnect, the application executes a POST to Google's revocation endpoint (`https://oauth2.googleapis.com/revoke`), nullifies all database token fields, and records a security audit log event.

---

## 4. RH SEO Health Score Formula

The **RH SEO Health Score** is an internal, transparent diagnostic index out of 100 points.

$$\text{RH SEO Health} = \text{Technical} (30) + \text{Content} (20) + \text{Visibility} (20) + \text{Performance} (15) + \text{Local} (15)$$

### Detailed Component Weights

#### 1. Technical Health (Max: 30 Points)
- **Zero Critical Errors (15 pts):** Derived from `npm run seo:audit`. Any critical error reduces score by 5 points.
- **Audit Warnings $\le 1$ (5 pts):** Rewards zero or minimal content warnings.
- **URL & Architecture Validity (10 pts):** Verified canonical correctness, sitemap parity, and zero hreflang/schema conflicts.

#### 2. Content Architecture & Bilingual Coverage (Max: 20 Points)
- **Live Authority Guides (10 pts):** Scaled against the 24 live targets (12 English + 12 বাংলা).
- **Review Pipeline (5 pts):** Scaled against the 56 unindexed review targets.
- **1-to-1 Bilingual Equivalence (5 pts):** Rewards exact parallel alignment between English and Bengali clusters.

#### 3. Search Visibility & Query Footprint (Max: 20 Points)
- **Search Console Connection (5 pts):** Verification of live property access.
- **Search Impressions Active (5 pts):** Google indexing and displaying pages in SERPs.
- **Organic Clicks & CTR (5 pts):** Traffic entering via organic search queries.
- **Top-10 Queries Footprint (5 pts):** Verified queries averaging positions 1 through 10.
- *Note:* If Search Console is disconnected, the score calculates available dimensions and states: `Score adjusted — GSC pending`.

#### 4. Mobile PageSpeed & User Experience (Max: 15 Points)
- **Lighthouse Performance Score $\ge 90$ (10 pts):** Average mobile performance across monitored core routes.
- **Passing Core Web Vitals (5 pts):** LCP $< 2.5s$, INP $< 200ms$, CLS $< 0.1$.
  *(INP is Google's official responsiveness metric; legacy FID is deprecated).*

#### 5. Dual-Branch Local Optimization (Max: 15 Points)
- **Dual Branch Verification (8 pts):** Both Banani and Banasree branch landing pages and structured schemas active.
- **Google Business Profile Integration (7 pts):** Performance API tracking calls, directions, and local search views.

---

## 5. Feature Highlights

### Query Opportunity Engine
1. **Striking Distance (Positions 4–15):** High-impression keywords on page 2 or lower page 1 flagged for internal linking reinforcement.
2. **High Impression / Low CTR:** Queries with high search visibility but CTR $< 1.5\%$ flagged for snippet/title optimization.
3. **Position Improving / Declining:** Trend tracking comparing current period vs previous period with minimum volume thresholds.

### Conversion Funnel & Lead Tracking
Aggregates actual GA4 custom events configured on RH Dental:
- `phone_click`: Direct phone call dials
- `whatsapp_click`: WhatsApp consultation starts
- `appointment_start`: Booking modal or form opened
- `appointment_submit`: Confirmed appointment booking sent
- `map_click`: Directions or branch map interaction

### Banani vs Banasree Local Performance
Tracks separate operational data for each clinic:
- **Search Impressions:** Direct and discovery searches on Google Search.
- **Maps Impressions:** Views inside Google Maps app and web.
- **Patient Actions:** Website visits, phone calls, and direction requests.
- **Disclaimer:** Prominently clarifies that exact geo-grid map rankings require specialized grid rank tools and are not inferred from GBP Performance data.

---

## 6. Admin Setup & Connection Checklist

To connect live production Google accounts to the Command Center:

- [ ] **Step 1: Google Cloud Project**  
  Select or create a Google Cloud Project in [Google Cloud Console](https://console.cloud.google.com).
- [ ] **Step 2: Enable Required APIs**  
  In **APIs & Services → Library**, enable:
  - Google Search Console API
  - Google Analytics Data API
  - Google Business Profile Performance API
  - PageSpeed Insights API (optional, for higher quota)
- [ ] **Step 3: Configure OAuth Consent Screen**  
  - User Type: External
  - App Name: RH Dental Care Command Center
  - Scopes: `webmasters.readonly`, `analytics.readonly`, `business.manage`
- [ ] **Step 4: Create OAuth 2.0 Client ID**  
  - Application Type: **Web application**
  - Name: RH Dental Web Server
  - Authorized Redirect URI: `https://rhdentalcare.com/api/admin/seo/auth/google/callback`
- [ ] **Step 5: Set Environment Variables in Production**  
  Configure the following variables in Vercel / server environment:
  ```bash
  GOOGLE_CLIENT_ID="<your-google-client-id>.apps.googleusercontent.com"
  GOOGLE_CLIENT_SECRET="<your-google-client-secret>"
  GOOGLE_REDIRECT_URI="https://rhdentalcare.com/api/admin/seo/auth/google/callback"
  SEO_TOKEN_ENCRYPTION_KEY="<random-32-byte-hex-or-base64-secret>"
  GSC_SITE_URL="sc-domain:rhdentalcare.com"
  GA4_PROPERTY_ID="properties/<your-ga4-numeric-id>"
  GBP_BANANI_LOCATION_ID="locations/<banani-location-id>"
  GBP_BANASREE_LOCATION_ID="locations/<banasree-location-id>"
  CRON_SECRET="<random-secure-cron-token>"
  ```
- [ ] **Step 6: Authorize Connection**  
  Log in to `/admin` → Click **SEO Command Center** → Click **Connect Google Account** → Grant authorization.
- [ ] **Step 7: Perform Initial Sync**  
  Click **Sync Now** to pull the first batch of live search analytics and generate the baseline snapshot.

---

## 7. Known Limitations & Technical Realities

1. **Search Console Average Position:** Average position is a weighted aggregate across varying user locations, devices, and search query variants. It is not an exact manual rank tracker.
2. **Google Business Profile Performance:** Reflects aggregated customer actions on Google Maps/Search. It does not provide rank coordinates on a 13x13 geographic grid.
3. **GA4 Reporting Freshness:** GA4 Data API `runReport` provides the *latest available GA4 reporting data*, but standard GA4 processing latency is 24 to 48 hours. Intra-day figures may be incomplete or pending final attribution.
4. **Search Console Reporting Latency:** Google Search Console data typically has a 48 to 72-hour reporting delay from Google's ingestion pipeline. The Command Center structures comparative date ranges accordingly.
5. **Business Profile API Approval:** In some Google Cloud accounts, the Business Profile Performance API requires quota request approval. The dashboard gracefully handles this state with a `Pending Access` indicator.
6. **Core Web Vitals Metrics:** Interaction to Next Paint (INP) is the official responsiveness metric as of March 12, 2024. Legacy First Input Delay (FID) is obsolete and maintained only for historical reference where relevant.
