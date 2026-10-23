/**
 * 1,000 Real-World Patient Search Query Audit & Coverage Verification
 * 
 * Tests whether every possible search query patients in Dhaka use:
 * - Brand & Branch intent (Banasree, Banani, Rampura, Khilgaon, Aftabnagar, Gulshan)
 * - Implants & Missing Teeth (Single, Full-mouth, All-on-4, Osstem, 3D CBCT, Bone Graft)
 * - Root Canal Treatment (Microscopic, Single-visit, Tooth pain, Cap after RCT)
 * - Orthodontics & Braces (Braces, Aligners, Invisible braces, Overbite, Crowding)
 * - Crowns & Veneers (Zirconia, CAD/CAM, Emax, Smile makeover, Hollywood smile)
 * - Oral Surgery (Wisdom tooth, Impacted molar, Surgical extraction)
 * - Pediatric & Special Needs (Kids dentist, Child filling, Special child autism care)
 * - General & Aesthetic (Scaling, Whitening, Gum disease, Deep cleaning)
 * - Doctor credentials (Dr. Hasan, Dr. Shimia, BMDC certified dental surgeons)
 * - Bangla Search Queries (দাঁতের ডাক্তার, রুট ক্যানেল, ইমপ্লান্ট, ক্যাপ, আক্কেল দাঁত, etc.)
 * 
 * Verifies that the website provides relevant, indexable landing pages and content for each query.
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Define the comprehensive generator for 1,000 real-world search query test cases
export function generate1000SearchQueries() {
  const queries = [];

  // 1. Local & Clinic Variations (150 queries)
  const clinicTypes = ['dental clinic', 'dental care', 'dentist', 'dental hospital', 'dental chamber', 'dental doctor', 'oral surgeon', 'dental specialist'];
  const locations = [
    'banasree', 'banasree dhaka', 'block c banasree', 'rampura', 'aftabnagar', 
    'khilgaon', 'malibagh', 'badda', 'banani', 'banani road 11', 'banani dhaka', 
    'gulshan', 'gulshan 1', 'gulshan 2', 'baridhara', 'mohakhali', 'dohs', 'dhaka'
  ];
  for (const c of clinicTypes) {
    for (const l of locations) {
      queries.push({ query: `${c} in ${l}`, category: 'local-discovery' });
      queries.push({ query: `best ${c} ${l}`, category: 'local-discovery' });
    }
  }

  // 2. Dental Implants (120 queries)
  const implantTerms = [
    'dental implant', 'tooth implant', 'teeth implant', 'permanent tooth replacement', 
    'single tooth implant', 'full mouth dental implant', 'all on 4 dental implants', 
    'osstem implant', 'cbct guided implant', 'bone grafting for dental implant', 
    'sinus lift implant', 'dental implant cost', 'implant tooth price', 'dental implant process',
    'front tooth replacement implant', 'molar tooth implant', 'dental implant surgery'
  ];
  const implantLocations = ['in dhaka', 'in banasree', 'in banani', 'in bangladesh', 'dhaka', 'bangladesh', ''];
  for (const t of implantTerms) {
    for (const l of implantLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'implants' });
    }
  }

  // 3. Root Canal Treatment (120 queries)
  const rctTerms = [
    'root canal treatment', 'rct treatment', 'microscopic root canal', 'single visit root canal',
    'root canal cost', 'rct cost', 'pulp infection treatment', 'severe toothache treatment',
    'tooth pain relief root canal', 'crown after root canal', 'cap after root canal',
    'root canal vs extraction', 'save tooth with root canal', 'molar root canal'
  ];
  const rctLocations = ['in dhaka', 'in banasree', 'in banani', 'dhaka', 'bangladesh', 'near me', ''];
  for (const t of rctTerms) {
    for (const l of rctLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'root-canal' });
    }
  }

  // 4. Braces & Clear Aligners (120 queries)
  const orthoTerms = [
    'teeth braces', 'clear aligners', 'invisible aligners', 'metal braces',
    'ceramic braces', 'self ligating braces', 'braces cost', 'aligners cost',
    'teeth braces price', 'crooked teeth correction', 'gap teeth treatment',
    'overbite correction', 'retainer after braces', 'adult orthodontics',
    'teeth straightening without braces', 'orthodontist specialist'
  ];
  const orthoLocations = ['in dhaka', 'in banasree', 'in banani', 'bangladesh', 'dhaka', ''];
  for (const t of orthoTerms) {
    for (const l of orthoLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'orthodontics' });
    }
  }

  // 5. Zirconia Crowns, Veneers & Smile Design (120 queries)
  const crownTerms = [
    'zirconia crown', 'zirconia teeth cap', 'cad cam zirconia crown', 'upcera zirconia crown',
    'xtcera zirconia crown', 'in house dental lab crown', 'zirconia crown cost', 'crown price',
    'porcelain veneers', 'zirconia veneers', 'dental veneers cost', 'smile makeover',
    'digital smile design dsd', 'broken tooth restoration crown', 'front teeth cosmetic veneers'
  ];
  const crownLocations = ['in dhaka', 'in banasree', 'in banani', 'bangladesh', 'dhaka', ''];
  for (const t of crownTerms) {
    for (const l of crownLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'crowns-veneers' });
    }
  }

  // 6. Oral Surgery & Wisdom Teeth (100 queries)
  const surgeryTerms = [
    'wisdom tooth extraction', 'wisdom tooth removal cost', 'impacted wisdom tooth surgery',
    'surgical tooth extraction', 'oral surgery specialist', 'minor oral surgery clinic',
    'swollen cheek wisdom tooth', 'horizontal wisdom tooth removal', 'general anesthesia dental surgery'
  ];
  const surgeryLocations = ['in dhaka', 'in banasree', 'in banani', 'bangladesh', 'dhaka', 'near me', ''];
  for (const t of surgeryTerms) {
    for (const l of surgeryLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'dental-surgery' });
    }
  }

  // 7. Pediatric & Special Child Dentistry (100 queries)
  const pediaTerms = [
    'pediatric dentist', 'kids dental care', 'child dental clinic', 'children teeth doctor',
    'milk tooth filling', 'child tooth decay treatment', 'kids teeth extraction',
    'fear free kids dentistry', 'special child dental care', 'autism dental clinic',
    'down syndrome child dental treatment', 'gentle dentist for special needs child'
  ];
  const pediaLocations = ['in dhaka', 'in banasree', 'in banani', 'bangladesh', 'dhaka', ''];
  for (const t of pediaTerms) {
    for (const l of pediaLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'kids-special-child' });
    }
  }

  // 8. General Care, Scaling, Whitening & Diagnostics (90 queries)
  const genTerms = [
    'teeth scaling and polishing', 'ultrasonic teeth cleaning', 'teeth whitening cost',
    'laser teeth whitening', 'bleeding gum treatment', 'periodontal deep scaling',
    'cbct 3d dental scan', 'digital intraoral 3d scanner', 'bad breath treatment halitosis',
    'dental cavity filling cost', 'composite tooth filling'
  ];
  const genLocations = ['in dhaka', 'in banasree', 'in banani', 'bangladesh', 'dhaka', ''];
  for (const t of genTerms) {
    for (const l of genLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'general-aesthetic' });
    }
  }

  // 9. Doctors & Brand Trust (80 queries)
  const docTerms = [
    'dr bm rafiqul hasan', 'dr rafiqul hasan mehedi', 'dr hasan dentist',
    'dr shimia binte taher', 'dr shimia dental surgeon', 'rh dental care',
    'rh dental clinic', 'rh dental banani', 'rh dental banasree',
    'bmdc certified dental surgeon dhaka', 'bsmmu trained oral surgeon dhaka',
    'experienced implantologist in dhaka', 'best dentist in banasree', 'best dentist in banani'
  ];
  const docLocations = ['dhaka', 'bangladesh', 'contact number', 'appointment', 'review', ''];
  for (const t of docTerms) {
    for (const l of docLocations) {
      queries.push({ query: `${t} ${l}`.trim(), category: 'doctors-brand' });
    }
  }

  // 10. Bangla & Conversational Queries (100 queries)
  const banglaQueries = [
    'দাঁতের ডাক্তার বনশ্রী', 'বনশ্রী ডেন্টাল ক্লিনিক', 'বনানী ডেন্টাল কেয়ার', 'দাঁতের ডাক্তার ঢাকা',
    'ডেন্টাল ইমপ্লান্ট খরচ কত', 'দাঁত বাঁধানোর খরচ ঢাকা', 'রুট ক্যানেল করতে কত টাকা লাগে',
    'মাইক্রোস্কোপিক রুট ক্যানেল ঢাকা', 'দাঁতে তার লাগানোর খরচ', 'ক্লিয়ার অ্যালাইনার খরচ',
    'আক্কেল দাঁত তোলার খরচ', 'আক্কেল দাঁতের অপারেশন ঢাকা', 'দাঁতে ক্যাপ লাগানোর খরচ',
    'জিরকোনিয়া ক্যাপ এর দাম কত', 'দাঁত সাদা করার খরচ', 'দাঁতের স্কেলিং ও পলিশিং খরচ',
    'বাচ্চাদের দাঁতের ডাক্তার বনশ্রী', 'বিশেষ শিশুদের ডেন্টাল চিকিৎসা', 'সিবিসিটি ৩ডি এক্সরে ঢাকা',
    'আরএইচ ডেন্টাল কেয়ার বনশ্রী', 'আরএইচ ডেন্টাল কেয়ার বনানী', 'ডঃ রফিকুল হাসান ডেন্টিস্ট',
    'ডঃ শিমিয়া বিনতে তাহের', 'দাঁতের ব্যথা উপশম', 'দাঁতের মাড়ি দিয়ে রক্ত পড়া বন্ধের উপায়',
    'দাঁতের ক্যাভিটি ফিলিং খরচ', 'দাঁত তোলার পর করণীয়', 'প্রবাসী ডেন্টাল চিকিৎসা বাংলাদেশ',
    'ইন-হাউস ডিজিটাল ল্যাব ঢাকা', 'আধুনিক ডেন্টাল হাসপাতাল বনশ্রী'
  ];
  for (const bq of banglaQueries) {
    queries.push({ query: bq, category: 'bangla-queries' });
    queries.push({ query: `${bq} যোগাযোগ`, category: 'bangla-queries' });
    queries.push({ query: `${bq} সিরিয়াল`, category: 'bangla-queries' });
  }

  // Deduplicate and trim to exactly 1,000 cases or more
  const uniqueMap = new Map();
  for (const q of queries) {
    const normalized = q.query.toLowerCase().replace(/\s+/g, ' ').trim();
    if (!uniqueMap.has(normalized)) {
      uniqueMap.set(normalized, { query: normalized, category: q.category });
    }
  }

  return Array.from(uniqueMap.values());
}

// Function to collect all site content and metadata for search testing
export async function auditSiteCoverage(queries, baseUrl = 'https://rhdentalcare.com') {
  console.log(`Starting coverage audit for ${queries.length} search queries against ${baseUrl}...`);

  // Fetch all main pages to build the keyword search corpus
  const routesToFetch = [
    '/', '/banasree', '/banani', '/implants', '/root-canal', '/orthodontics',
    '/zirconia-crown', '/zirconia-veneers', '/dental-surgery', '/digital-dentistry',
    '/kids-care', '/special-child', '/dr-hasan', '/dr-shimia', '/treatments',
    '/services', '/specialties', '/team', '/about', '/contact', '/dental-tourism',
    '/reviews', '/guides', '/bn', '/bn/guides',
    '/guides/dental-implant-cost-dhaka', '/guides/microscopic-root-canal',
    '/guides/braces-cost-dhaka', '/guides/clear-aligner-cost-dhaka',
    '/guides/zirconia-crown-cost-dhaka', '/guides/wisdom-tooth-removal',
    '/guides/banasree-dental-clinic-visit-guide', '/guides/banani-dental-clinic-visit-guide',
    '/bn/guides/dental-implant-cost-dhaka', '/bn/guides/microscopic-root-canal',
    '/bn/guides/braces-cost-dhaka', '/bn/guides/zirconia-crown-cost-dhaka'
  ];

  const siteCorpus = [];
  for (const r of routesToFetch) {
    try {
      const res = await fetch(`${baseUrl}${r}`);
      if (res.ok) {
        const html = await res.text();
        const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
        const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
        const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        
        // Strip tags
        const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').toLowerCase();
        siteCorpus.push({
          route: r,
          title: (titleMatch ? titleMatch[1] : '').toLowerCase(),
          desc: (descMatch ? descMatch[1] : '').toLowerCase(),
          h1: (h1Match ? h1Match[1].replace(/<[^>]+>/g, ' ') : '').toLowerCase(),
          body: text
        });
      }
    } catch (e) {
      console.warn(`Could not fetch ${r}:`, e.message);
    }
  }

  // Audit each query
  let matched = 0;
  let strongMatch = 0; // Matched in Title, H1 or Meta Description
  const unmatched = [];
  const categoryStats = {};

  for (const q of queries) {
    categoryStats[q.category] = categoryStats[q.category] || { total: 0, matched: 0, strong: 0 };
    categoryStats[q.category].total++;

    const words = q.query.split(' ').filter(w => w.length > 2);
    let foundInSite = false;
    let foundInMetaOrH1 = false;
    let bestRoute = null;

    for (const page of siteCorpus) {
      // Check for exact substring match
      if (page.title.includes(q.query) || page.h1.includes(q.query) || page.desc.includes(q.query)) {
        foundInSite = true;
        foundInMetaOrH1 = true;
        bestRoute = page.route;
        break;
      }
      
      // Check if majority of keywords exist on this page
      const titleH1Words = (page.title + ' ' + page.h1 + ' ' + page.desc);
      const allWordsInMeta = words.every(w => titleH1Words.includes(w));
      if (allWordsInMeta) {
        foundInSite = true;
        foundInMetaOrH1 = true;
        bestRoute = page.route;
        break;
      }

      const allWordsInBody = words.every(w => page.body.includes(w));
      if (allWordsInBody) {
        foundInSite = true;
        bestRoute = page.route;
      }
    }

    if (foundInSite) {
      matched++;
      categoryStats[q.category].matched++;
      if (foundInMetaOrH1) {
        strongMatch++;
        categoryStats[q.category].strong++;
      }
    } else {
      unmatched.push(q);
    }
  }

  return {
    totalQueries: queries.length,
    matched,
    strongMatch,
    coveragePercent: ((matched / queries.length) * 100).toFixed(1),
    strongCoveragePercent: ((strongMatch / queries.length) * 100).toFixed(1),
    categoryStats,
    unmatched
  };
}

// Self-executing runner
if (process.argv[1]?.endsWith('1000-search-queries-audit.mjs')) {
  const queries = generate1000SearchQueries();
  console.log(`Generated ${queries.length} unique patient search queries.`);
  
  const targetUrl = process.argv[2] || 'https://rhdentalcare.com';
  auditSiteCoverage(queries, targetUrl).then(results => {
    console.log('\n======================================================');
    console.log('       1,000 PATIENT SEARCH QUERY AUDIT RESULTS');
    console.log('======================================================');
    console.log(`Total Search Queries Evaluated : ${results.totalQueries}`);
    console.log(`Queries with Relevant Match   : ${results.matched} (${results.coveragePercent}%)`);
    console.log(`Strong Meta/H1/Title Matches   : ${results.strongMatch} (${results.strongCoveragePercent}%)`);
    console.log('\nBreakdown by Search Intent:');
    for (const [cat, stat] of Object.entries(results.categoryStats)) {
      const pct = ((stat.matched / stat.total) * 100).toFixed(1);
      const strongPct = ((stat.strong / stat.total) * 100).toFixed(1);
      console.log(`  - ${cat.padEnd(20)}: ${stat.matched}/${stat.total} matched (${pct}%), Strong: ${strongPct}%`);
    }
    
    if (results.unmatched.length > 0) {
      console.log(`\nSample Unmatched Queries (${results.unmatched.length}):`);
      results.unmatched.slice(0, 15).forEach(u => console.log(`  * [${u.category}] ${u.query}`));
    }
    console.log('======================================================\n');
  }).catch(err => {
    console.error('Audit failed:', err);
  });
}
