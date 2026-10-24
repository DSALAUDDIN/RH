#!/usr/bin/env node
/**
 * Instant Search Engine Submission via IndexNow (Bing, Yandex, Seznam, Naver)
 * 
 * Fetches all URLs from the live sitemap and submits them directly to the
 * IndexNow API for immediate search engine crawling and ranking.
 */

const INDEXNOW_KEY = '68f89c4d21e04a7b931e5c2d8b4a0f6e';
const HOST = 'rhdentalcare.com';
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function main() {
  console.log(`[IndexNow] Fetching sitemap from ${SITEMAP_URL}...`);
  const sitemapRes = await fetch(SITEMAP_URL);
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapRes.status} ${sitemapRes.statusText}`);
  }

  const xml = await sitemapRes.text();
  const urlMatches = xml.matchAll(/<loc>([^<]+)<\/loc>/g);
  const urlList = Array.from(urlMatches, m => m[1].trim());

  console.log(`[IndexNow] Found ${urlList.length} URLs in sitemap.`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urlList
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`[IndexNow] Submitting ${urlList.length} URLs to ${endpoint}...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`[IndexNow] Response from ${endpoint}: ${res.status} ${res.statusText}`);
      if (res.status === 200 || res.status === 202) {
        console.log(`[IndexNow] ✅ Successfully submitted ${urlList.length} URLs to ${endpoint}!`);
      } else {
        const text = await res.text();
        console.warn(`[IndexNow] Note: ${endpoint} returned:`, text);
      }
    } catch (err) {
      console.error(`[IndexNow] ❌ Error submitting to ${endpoint}:`, err.message);
    }
  }
}

main().catch(err => {
  console.error('[IndexNow] Fatal error:', err);
  process.exit(1);
});
