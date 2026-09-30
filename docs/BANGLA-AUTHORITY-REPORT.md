# RH Dental Bangla Authority Program — Implementation Report

**Domain:** `https://rhdentalcare.com`  
**Bangla Root:** `https://rhdentalcare.com/bn/`  
**Hub URL:** `https://rhdentalcare.com/bn/guides`  
**Assets Delivered:** 40 Native Bangla Authority Guides (Combined with 40 English Guides = 80 Total Pages)  
**Initial Indexing Batch:** 12 Live Guides (in `sitemap.xml`) · 28 Review Guides (`noindex, follow`)  
**Language Specification:** `inLanguage: "bn-BD"`, `lang="bn-BD"`, font: Hind Siliguri (`--font-bn`)  
**Verification Date:** 2026-09-30  

---

## 1. Executive Summary

As requested, we have established the second authority layer: the **RH Dental Bangla Authority Program**.
This introduces **40 native, medically sound Bangla patient guides** authored specifically for Bangladesh-based dental search intent.

Crucially:
- **No Machine Translation:** The guides are written in high-quality, professional, empathetic Bengali with clear medical explanations.
- **Slug Consistency:** All slugs use clean Roman characters matching the English authority program 1-to-1 (e.g. `/bn/guides/dental-implant-cost-dhaka`).
- **Deterministic Hreflang Pairing:** Bidirectional `en-BD` and `bn-BD` alternates connect every Bangla guide to its English sibling.
- **Strict Self-Canonicals:** Every `/bn/...` page points strictly to itself as canonical on `https://rhdentalcare.com/bn/...`.
- **Claim Safety Compliance:** Zero prohibited marketing claims (no "১০০%", "গ্যারান্টি", "নিশ্চয়তা", "সম্পূর্ণ ব্যথামুক্ত", "আজীবন", "স্থায়ী সমাধান", "সেরা").
- **Staged Indexing Engine:** Exactly 12 high-priority guides are `live` and submitted in `sitemap.xml`. The remaining 28 guides are accessible for internal and doctor review via `noindex, follow` tags.

---

## 2. Technical SEO Architecture

### 2.1 Canonical & Alternates
```html
<link rel="canonical" href="https://rhdentalcare.com/bn/guides/dental-implant-cost-dhaka" />
<link rel="alternate" hreflang="en-BD" href="https://rhdentalcare.com/guides/dental-implant-cost-dhaka" />
<link rel="alternate" hreflang="bn-BD" href="https://rhdentalcare.com/bn/guides/dental-implant-cost-dhaka" />
<link rel="alternate" hreflang="x-default" href="https://rhdentalcare.com/guides/dental-implant-cost-dhaka" />
```

### 2.2 Schema.org JSON-LD
Every guide renders valid JSON-LD graph objects:
- `BreadcrumbList`: `হোম` (`/bn`) -> `ডেন্টাল গাইড` (`/bn/guides`) -> `ক্যাটাগরি` -> `গাইড নাম`
- `BlogPosting` / `MedicalWebPage`: Includes `inLanguage: "bn-BD"`, `headline`, `author` (referencing `#physician` entity for Dr. Md. Salahuddin), `datePublished`, and `dateModified`.

### 2.3 Staging Status Breakdown
- **Combined Authority Program:** 80 total pages (40 English + 40 Bangla)
- **Live (Indexable & in Sitemap):** 24 pages (12 English + 12 Bangla)
- **In Review (Client Preview, noindex):** 56 pages (28 English + 28 Bangla)
- **Unified Client Dashboard:** Live at `/seo-progress` with instant language filtering (All, English, বাংলা).

---

## 3. The 12 Live Bangla Launch Guides

1. `/bn/guides/dental-implant-cost-dhaka` — ঢাকায় ডেন্টাল ইমপ্লান্ট খরচ: কোন কোন বিষয়ের ওপর নির্ভর করে?
2. `/bn/guides/dental-implant-process` — ডেন্টাল ইমপ্লান্ট চিকিৎসা কীভাবে হয়: ধাপ ও সময়কাল
3. `/bn/guides/root-canal-cost-dhaka` — ঢাকায় রুট ক্যানেল চিকিৎসার খরচ: কোন বিষয়গুলো বিবেচনায় রাখবেন?
4. `/bn/guides/microscopic-root-canal` — মাইক্রোস্কোপিক রুট ক্যানেল: সুবিধা ও নির্ভুলতার গুরুত্ব
5. `/bn/guides/root-canal-vs-tooth-extraction` — রুট ক্যানেল নাকি দাঁত ফেলা: কীভাবে সঠিক সিদ্ধান্ত নেবেন?
6. `/bn/guides/clear-aligner-vs-braces` — ক্লিয়ার অ্যালাইনার নাকি ব্রেসেস: আপনার জন্য কোনটি উপযুক্ত?
7. `/bn/guides/zirconia-crown-vs-veneer` — জিরকোনিয়া ক্রাউন নাকি ভিনিয়ার: কোনটি আপনার জন্য সঠিক?
8. `/bn/guides/zirconia-crown-cost-dhaka` — ঢাকায় জিরকোনিয়া ক্রাউন খরচ: টেকসই ও নান্দনিক সমাধানের গাইড
9. `/bn/guides/cbct-dental-scan` — ডেন্টাল সিবিসিটি (CBCT 3D Scan): কেন প্রয়োজন ও কী কী দেখা যায়?
10. `/bn/guides/wisdom-tooth-removal` — আক্কেল দাঁতের সমস্যা ও তোলার সঠিক সময়
11. `/bn/guides/banani-dental-clinic-visit-guide` — আরএইচ ডেন্টাল বনানী শাখা: কীভাবে যাবেন, অ্যাপয়েন্টমেন্ট ও সুবিধা
12. `/bn/guides/banasree-dental-clinic-visit-guide` — আরএইচ ডেন্টাল বনশ্রী শাখা: অবস্থান, সেবা ও অ্যাপয়েন্টমেন্ট গাইড

---

## 4. Next Steps
- Conduct medical review with the clinical team for Batches 2–4.
- As each batch passes clinical sign-off, change `status: 'live'` in `src/data/bnGuides/*.ts`.
- The sitemap and robots directives update automatically without any code refactoring.
