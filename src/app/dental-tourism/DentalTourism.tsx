/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

/**
 * RH Dental Care — International Dental Tourism page
 *
 * Drop-in client component for Next.js app router.
 * - Loads GSAP + ScrollTrigger + MotionPathPlugin via next/script (CDN)
 * - Loads /image-slot.js (web component) for drag-drop image placeholders
 * - All animations + interactions live in useDentalTourismEffects()
 *
 * Integration:
 *   1. Copy this folder to app/dental-tourism/
 *   2. Copy public/image-slot.js to your project's public/
 *   3. Copy assets referenced (assets/heroprofile.png, herobanner.webp)
 *      into your project's public/assets/
 *   4. Visit /dental-tourism
 *
 * The host site's Navbar/Footer wrap this — no chrome is included here.
 */

import { useEffect, useState } from 'react';
import Script from 'next/script';
import './tourism.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import BranchCTA from '@/components/branch/BranchCTA';
import { BRANCHES } from '@/lib/branches';

/* eslint-disable @next/next/no-img-element */

export default function DentalTourism() {
  const [formData, setFormData] = useState({ name: '', country: '', phone: '', treatment: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: `${formData.phone.replace(/[^0-9]/g, '')}@whatsapp.com`,
          phone: formData.phone,
          message: `[Dental Tourism Request]\nCountry: ${formData.country}\nTreatment: ${formData.treatment}\n\n${formData.message}`
        }),
      });

      const data = await res.json();

      if (data.success) {
        setFormSubmitted(true);
        setFormData({ name: '', country: '', phone: '', treatment: '', message: '' });
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to send request. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context>;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        initDentalTourism();
      });
    }, 100);
    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div className="rh-tourism-root">
      {/* GSAP imported via npm instead of CDN */}
      {/* Web component script removed */}

      {/* Font preconnect — drop into <head> via metadata if you prefer */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* ────────── INTRO LOADER ────────── */}
      <div className="loader" id="loader">
        <div className="loader-inner">
          <span className="loader-mark">RH</span>
          <span className="loader-line"></span>
          <span className="loader-text">Dental Care · Dhaka · Bangladesh</span>
        </div>
        <div className="loader-wipe"></div>
      </div>

      {/* ────────── SCROLL PROGRESS ────────── */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* ────────── CUSTOM CURSOR ────────── */}
      <div className="cursor" id="cursor" aria-hidden="true">
        <div className="cursor-ring"></div>
        <div className="cursor-dot"></div>
        <div className="cursor-label" id="cursorLabel"></div>
      </div>

      {/* ────────── CHAPTER SPINE (right-edge nav) ────────── */}
      <aside className="spine" id="chapterSpine" aria-hidden="true">
        <ol>
          <li><a href="#hero" data-anchor="hero"><span className="sp-dot"></span><span className="sp-label">Welcome</span></a></li>
          <li><a href="#savings" data-anchor="savings"><span className="sp-dot"></span><span className="sp-label">The advantage</span></a></li>
          <li><a href="#why" data-anchor="why"><span className="sp-dot"></span><span className="sp-label">Why Bangladesh</span></a></li>
          <li><a href="#standards" data-anchor="standards"><span className="sp-dot"></span><span className="sp-label">Standards</span></a></li>
          <li><a href="#treatments" data-anchor="treatments"><span className="sp-dot"></span><span className="sp-label">Treatments</span></a></li>
          <li><a href="#journey" data-anchor="journey"><span className="sp-dot"></span><span className="sp-label">Your journey</span></a></li>
          <li><a href="#dayone" data-anchor="dayone"><span className="sp-dot"></span><span className="sp-label">Day one</span></a></li>
          <li><a href="#team" data-anchor="team"><span className="sp-dot"></span><span className="sp-label">Specialists</span></a></li>
          <li><a href="#beyond" data-anchor="beyond"><span className="sp-dot"></span><span className="sp-label">Beyond the chair</span></a></li>
          <li><a href="#faq" data-anchor="faq"><span className="sp-dot"></span><span className="sp-label">FAQ</span></a></li>
          <li><a href="#contact" data-anchor="contact"><span className="sp-dot"></span><span className="sp-label">Book</span></a></li>
        </ol>
      </aside>

      {/* ────────── STICKY BOTTOM CTA ────────── */}
      <a href="#contact" className="sticky-cta" id="stickyCta" data-cursor="Book">
        <span className="sc-dot"></span>
        <span className="sc-label">Free consultation</span>
        <span className="sc-arrow">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </a>

      {/* Header (Navbar) is rendered by the existing Next.js site layout — not included here. */}

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg">
          <div className="hero-bg-img"></div>
          <div className="hero-bg-fallback"></div>
          <div className="hero-scrim"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-eyebrow" data-anim="kicker">
            <span className="kicker-line"></span>
            <span>International Dental Tourism Program</span>
            <span className="kicker-bd">🇧🇩 Bangladesh</span>
          </div>

          <h1 className="tm-title" data-anim="title">
            <span className="line"><span className="w">World&#8209;class</span></span>
            <span className="line"><span className="w">dentistry,</span> <span className="w">in</span> <span className="w">the</span></span>
            <span className="line"><span className="w it">heart of Dhaka.</span></span>
          </h1>

          <p className="tm-sub" data-anim="fade">
            Internationally-trained specialists. 3D digital workflows.
            A premium 3,500 sq.ft clinic — at a fraction of Western prices.
            Built for visiting patients who refuse to compromise.
          </p>

          <div className="tm-actions" data-anim="fade">
            <a className="tm-btn tm-btn-primary magnetic" href="#contact" data-cursor="Book">
              Start my treatment plan
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
            <a className="tm-btn tm-btn-ghost magnetic" href="#treatments" data-cursor="View">
              View treatments
            </a>
          </div>

          {/* floating cred card removed: doctor lives in the Specialists section */}
        </div>

        {/* hero stats marquee */}
        <div className="hero-stats" id="heroStats">
          <div className="container hero-stats-inner">
            {/* REMOVED: a 13,000+ patient counter. Unevidenced. docs/audit-report.md P2-2 */}
            <div className="stat"><div className="stat-num" data-count="12" data-suffix="+">0</div><div className="stat-lab">Years of practice</div></div>
            <div className="stat"><div className="stat-num"><span data-count="82" data-suffix="">0</span><span className="unit">%</span></div><div className="stat-lab">Avg. savings vs UK/US</div></div>
            <div className="stat"><div className="stat-num">4.9<span className="unit">★</span></div><div className="stat-lab">Google rating</div></div>
            <div className="stat"><div className="stat-num"><span data-count="500">0</span><span className="unit">+</span></div><div className="stat-lab">5-star reviews</div></div>
          </div>
        </div>

        <div className="scroll-hint" data-anim="fade">
          <span>Scroll</span>
          <span className="hint-line"></span>
        </div>
      </section>

      {/* ─────────────────────── SAVINGS COMPARISON ─────────────────────── */}
      <section className="savings" id="savings">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><span className="kicker-line"></span>The Bangladesh advantage</span>
            <h2 className="display">
              Premium care.<br />
              <em>Exceptional savings.</em>
            </h2>
            <p className="lead">
              The same procedure. The same materials. The same standard.
              Quoted upfront, with zero hidden costs.
            </p>
          </div>

          <div className="cmp-table" id="cmpTable">
            <div className="cmp-row cmp-head">
              <div className="cmp-col">Procedure</div>
              <div className="cmp-col cmp-c">UK 🇬🇧</div>
              <div className="cmp-col cmp-c">USA 🇺🇸</div>
              <div className="cmp-col cmp-c">EU 🇪🇺</div>
              <div className="cmp-col cmp-c highlight">Bangladesh 🇧🇩</div>
              <div className="cmp-col cmp-c">You save</div>
            </div>
            <div className="cmp-row" data-row>
              <div className="cmp-col cmp-name">Single dental implant<small>incl. titanium fixture + crown</small></div>
              <div className="cmp-col cmp-c">$ 3,800</div>
              <div className="cmp-col cmp-c">$ 4,500</div>
              <div className="cmp-col cmp-c">$ 2,700</div>
              <div className="cmp-col cmp-c highlight"><span className="cmp-price" data-from="4500" data-to="650" data-prefix="$ ">$ 0</span></div>
              <div className="cmp-col cmp-c save-col"><span data-savings="82">0</span>%</div>
            </div>
            <div className="cmp-row" data-row>
              <div className="cmp-col cmp-name">Zirconia crown<small>per unit, in-house lab</small></div>
              <div className="cmp-col cmp-c">$ 1,150</div>
              <div className="cmp-col cmp-c">$ 1,700</div>
              <div className="cmp-col cmp-c">$ 760</div>
              <div className="cmp-col cmp-c highlight"><span className="cmp-price" data-from="1700" data-to="280" data-prefix="$ ">$ 0</span></div>
              <div className="cmp-col cmp-c save-col"><span data-savings="76">0</span>%</div>
            </div>
            <div className="cmp-row" data-row>
              <div className="cmp-col cmp-name">Full smile makeover<small>10 e.max veneers + whitening</small></div>
              <div className="cmp-col cmp-c">$ 22,800</div>
              <div className="cmp-col cmp-c">$ 25,000</div>
              <div className="cmp-col cmp-c">$ 15,200</div>
              <div className="cmp-col cmp-c highlight"><span className="cmp-price" data-from="25000" data-to="4200" data-prefix="$ ">$ 0</span></div>
              <div className="cmp-col cmp-c save-col"><span data-savings="80">0</span>%</div>
            </div>
            <div className="cmp-row" data-row>
              <div className="cmp-col cmp-name">Full mouth rehabilitation<small>incl. 6+ implants &amp; full arch prosthetics</small></div>
              <div className="cmp-col cmp-c">$ 57,000</div>
              <div className="cmp-col cmp-c">$ 65,000</div>
              <div className="cmp-col cmp-c">$ 41,000</div>
              <div className="cmp-col cmp-c highlight"><span className="cmp-price" data-from="65000" data-to="9800" data-prefix="$ ">$ 0</span></div>
              <div className="cmp-col cmp-c save-col"><span data-savings="82">0</span>%</div>
            </div>
          </div>

          <div className="cmp-foot">
            <p className="fineprint">
              Indicative median prices at premium private clinics, 2025. <b>All figures in USD</b>
              for direct comparison. UK = central London private; USA = premium urban (NYC/LA/SF);
              EU = Germany &amp; France average. Personalised quote provided after a free
              WhatsApp consultation.
            </p>
            <a href="#contact" className="tm-btn tm-btn-primary magnetic" data-cursor="Quote">
              Get my free quote
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── WHY BANGLADESH ─────────────────────────── */}
      <section className="bd-why" id="why">

        {/* Chapter rule + Section opener */}
        <div className="container">
          <div className="chapter" data-reveal>
            <span className="ch-num">CHAPTER 01</span>
            <span className="ch-line"></span>
            <span className="ch-title">Why Bangladesh</span>
          </div>

          <div className="bd-open">
            <h2 className="bd-headline">
              <span className="line"><span className="w">A direct flight</span></span>
              <span className="line"><span className="w it">to considered</span></span>
              <span className="line"><span className="w">dentistry.</span></span>
            </h2>

            <div className="bd-lede-wrap">
              <p className="bd-lede">
                Eight reasons international patients are quietly choosing Dhaka over
                London, New York or Dubai — and why most of them come back.
              </p>
              <svg className="bd-map" viewBox="0 0 120 140" fill="none" aria-hidden="true">
                {/* abstract outline of Bangladesh */}
                <path d="M30 8 Q 50 4 65 10 Q 78 16 80 28 Q 88 32 92 42 Q 96 56 88 64 Q 96 72 90 84 Q 84 96 78 100 Q 86 110 78 120 Q 70 128 56 126 Q 44 132 30 126 Q 22 118 24 108 Q 14 100 18 88 Q 14 76 22 68 Q 16 56 24 48 Q 18 34 28 24 Q 24 14 30 8 Z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="56" cy="60" r="2.5" fill="currentColor" className="bd-map-pin"/>
                <circle cx="56" cy="60" r="6" stroke="currentColor" strokeWidth=".5" fill="none" className="bd-map-ring"/>
                <text x="62" y="62" fontFamily="JetBrains Mono, monospace" fontSize="5" fill="currentColor">DHAKA</text>
              </svg>
            </div>
          </div>
        </div>

        {/* ───── Eight reasons as alternating editorial spreads ───── */}
        <div className="container bd-reasons">

          {/* 01 — Geography */}
          <article className="reason" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">01</span>
              <span className="reason-tag">Geography & access</span>
            </header>
            <div className="reason-grid">
              <div className="reason-copy">
                <h3>At the centre of the<br /><em>Asian air map.</em></h3>
                <p>Dhaka has daily direct flights from London, Dubai, Doha, Singapore, Bangkok, Istanbul, Kuala Lumpur and Riyadh — and the major Indian metros are short hops away. Wherever you are, you're closer than you think.</p>
                <div className="reason-stats">
                  <div><b>18+</b><span>Direct international cities</span></div>
                  <div><b>9h</b><span>From London</span></div>
                  <div><b>4h</b><span>From Dubai</span></div>
                </div>
              </div>
              <div className="reason-art art-flights">
                <svg viewBox="0 0 400 400" aria-hidden="true">
                  <defs>
                    <radialGradient id="dhaka-glow">
                      <stop offset="0%" stopColor="#0073e6" stopOpacity=".5"/>
                      <stop offset="100%" stopColor="#0073e6" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  {/* compass rose background */}
                  <circle cx="200" cy="200" r="170" stroke="rgba(216,205,180,.5)" strokeWidth="1" fill="none" strokeDasharray="2 4"/>
                  <circle cx="200" cy="200" r="120" stroke="rgba(216,205,180,.4)" strokeWidth="1" fill="none"/>
                  <circle cx="200" cy="200" r="70" stroke="rgba(216,205,180,.3)" strokeWidth="1" fill="none"/>
                  {/* city dots + arcs */}
                  <g className="rt-flights" stroke="#0073e6" strokeWidth="1.4" fill="none">
                    <path d="M 200 200 Q 100 50 60 90"/>     {/* London */}
                    <path d="M 200 200 Q 280 120 330 100"/>  {/* Dubai */}
                    <path d="M 200 200 Q 320 300 350 340"/>  {/* Singapore */}
                    <path d="M 200 200 Q 80 280 50 320"/>    {/* Doha */}
                    <path d="M 200 200 Q 320 60 360 60"/>    {/* Istanbul */}
                    <path d="M 200 200 Q 280 360 320 380"/>  {/* KL */}
                    <path d="M 200 200 Q 80 100 30 60"/>     {/* Riyadh */}
                    <path d="M 200 200 Q 360 240 380 270"/>  {/* Bangkok */}
                  </g>
                  {/* city labels */}
                  <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#5a6878">
                    <text x="56" y="80" textAnchor="end">London</text>
                    <text x="334" y="92">Dubai</text>
                    <text x="354" y="350">Singapore</text>
                    <text x="46" y="338">Doha</text>
                    <text x="364" y="52">Istanbul</text>
                    <text x="324" y="392">Kuala Lumpur</text>
                    <text x="26" y="52" textAnchor="end">Riyadh</text>
                    <text x="384" y="282">Bangkok</text>
                  </g>
                  {/* dots */}
                  <g fill="#0073e6">
                    <circle cx="60" cy="90" r="3"/>
                    <circle cx="330" cy="100" r="3"/>
                    <circle cx="350" cy="340" r="3"/>
                    <circle cx="50" cy="320" r="3"/>
                    <circle cx="360" cy="60" r="3"/>
                    <circle cx="320" cy="380" r="3"/>
                    <circle cx="30" cy="60" r="3"/>
                    <circle cx="380" cy="270" r="3"/>
                  </g>
                  {/* Dhaka center */}
                  <circle cx="200" cy="200" r="40" fill="url(#dhaka-glow)"/>
                  <circle cx="200" cy="200" r="6" fill="#c97b2d"/>
                  <text x="210" y="204" fontFamily="JetBrains Mono, monospace" fontSize="11" fontWeight="600" fill="#0a1729">DHAKA</text>
                </svg>
              </div>
            </div>
          </article>

          {/* 02 — Language */}
          <article className="reason rev" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">02</span>
              <span className="reason-tag">Language</span>
            </header>
            <div className="reason-grid">
              <div className="reason-art art-lang">
                <div className="lang-stack">
                  <div className="lang-line">Hello.</div>
                  <div className="lang-line it">নমস্কার</div>
                  <div className="lang-line">As-salāmu ʿalaykum.</div>
                  <div className="lang-line it">আদাব</div>
                  <div className="lang-line">Bonjour.</div>
                  <div className="lang-line it big">English<br />spoken here.</div>
                </div>
              </div>
              <div className="reason-copy">
                <h3>Treatment in<br /><em>fluent medical English.</em></h3>
                <p>Bangladesh has among the highest English proficiency rates in non‑anglophone Asia. Every doctor, every coordinator, every receptionist at RH Dental works in English by default. No translation app. No "let me get someone."</p>
                <div className="reason-stats">
                  <div><b>EF 60</b><span>EF EPI Asia 2024</span></div>
                  <div><b>100%</b><span>English-speaking staff</span></div>
                  <div><b>4 langs</b><span>On call: EN · BN · HI · AR</span></div>
                </div>
              </div>
            </div>
          </article>

          {/* 03 — Cost of stay */}
          <article className="reason" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">03</span>
              <span className="reason-tag">Cost of stay</span>
            </header>
            <div className="reason-grid">
              <div className="reason-copy">
                <h3>Seventy dollars buys<br />a <em>five‑star night.</em></h3>
                <p>The same money that gets you a Premier Inn in West London buys a top‑floor suite at the Westin Dhaka with chauffeur service to the clinic. Food, transport, guides — all proportionally affordable.</p>
                <div className="reason-stats">
                  <div><b>$60–120</b><span>Top hotel / night</span></div>
                  <div><b>$8–15</b><span>Fine‑dining meal</span></div>
                  <div><b>$40</b><span>Private driver / day</span></div>
                </div>
              </div>
              <div className="reason-art art-receipt">
                <div className="rcpt">
                  <div className="rcpt-head">
                    <span>HOTEL & EXTRAS</span>
                    <span>DHAKA · 7 NIGHTS</span>
                  </div>
                  <div className="rcpt-row"><span>Suite, 5-star × 7</span><b>$ 700</b></div>
                  <div className="rcpt-row"><span>Airport transfer ×2</span><b>$ 60</b></div>
                  <div className="rcpt-row"><span>Private driver / week</span><b>$ 250</b></div>
                  <div className="rcpt-row"><span>Dinners (avg)</span><b>$ 140</b></div>
                  <div className="rcpt-row"><span>Concierge / guide</span><b>$ 120</b></div>
                  <div className="rcpt-sep"></div>
                  <div className="rcpt-row total"><span>Subtotal</span><b>$ 1,270</b></div>
                  <div className="rcpt-foot">UK equivalent: ≈ $ 5,400</div>
                </div>
              </div>
            </div>
          </article>

          {/* 04 — Climate */}
          <article className="reason rev" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">04</span>
              <span className="reason-tag">Climate window</span>
            </header>
            <div className="reason-grid">
              <div className="reason-art art-climate">
                <div className="climate-band">
                  <div className="cb-grid">
                    <div className="cb-month"><span>J</span><div className="bar" style={{ '--h': '.45' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>F</span><div className="bar" style={{ '--h': '.5' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>M</span><div className="bar" style={{ '--h': '.6' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>A</span><div className="bar" style={{ '--h': '.78' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>M</span><div className="bar warn" style={{ '--h': '.88' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>J</span><div className="bar warn" style={{ '--h': '.92' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>J</span><div className="bar wet" style={{ '--h': '.95' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>A</span><div className="bar wet" style={{ '--h': '.92' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>S</span><div className="bar wet" style={{ '--h': '.85' } as React.CSSProperties}></div></div>
                    <div className="cb-month"><span>O</span><div className="bar" style={{ '--h': '.7' } as React.CSSProperties}></div></div>
                    <div className="cb-month ideal"><span>N</span><div className="bar ideal" style={{ '--h': '.55' } as React.CSSProperties}></div></div>
                    <div className="cb-month ideal"><span>D</span><div className="bar ideal" style={{ '--h': '.42' } as React.CSSProperties}></div></div>
                  </div>
                  <div className="cb-window">Nov — Mar · ideal window</div>
                  <div className="cb-meta">
                    <span>Avg <b>24°C</b> · 75°F</span>
                    <span className="dot">·</span>
                    <span>Humidity <b>55%</b></span>
                    <span className="dot">·</span>
                    <span><b>Dry</b> season</span>
                  </div>
                </div>
              </div>
              <div className="reason-copy">
                <h3>The dry season is<br /><em>genuinely perfect.</em></h3>
                <p>November through March: blue-sky days, low humidity, 21–28°C / 70–82°F. Soft enough for outdoor recovery walks, cool enough for proper sleep. The rest of the year stays warm; only July–August are properly wet.</p>
                <div className="reason-stats">
                  <div><b>Nov–Mar</b><span>Ideal travel window</span></div>
                  <div><b>24°C</b><span>Avg winter day</span></div>
                  <div><b>9/10</b><span>Sunny days, dry season</span></div>
                </div>
              </div>
            </div>
          </article>

          {/* 05 — Time zone */}
          <article className="reason" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">05</span>
              <span className="reason-tag">Time zone</span>
            </header>
            <div className="reason-grid">
              <div className="reason-copy">
                <h3>Bridges Middle East,<br /><em>Europe and Asia.</em></h3>
                <p>UTC+6 sits between Europe and East Asia — easy half-day video consults from London, Dubai, Singapore or Mumbai. Pre-treatment reviews happen during your working day, not yours and ours.</p>
                <div className="reason-stats">
                  <div><b>UTC+6</b><span>Bangladesh standard</span></div>
                  <div><b>5h</b><span>Ahead of London</span></div>
                  <div><b>2h</b><span>Behind Singapore</span></div>
                </div>
              </div>
              <div className="reason-art art-tz">
                <div className="clocks">
                  <div className="clock"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="1.4"/><circle cx="50" cy="50" r="2" fill="currentColor"/></svg><b>09:00</b><span>LONDON</span></div>
                  <div className="clock primary"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="50" y1="50" x2="50" y2="22" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="50" x2="72" y2="35" stroke="currentColor" strokeWidth="1.4"/><circle cx="50" cy="50" r="2" fill="currentColor"/></svg><b>14:00</b><span>DHAKA</span></div>
                  <div className="clock"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="1.5" fill="none"/><line x1="50" y1="50" x2="65" y2="20" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="50" x2="72" y2="55" stroke="currentColor" strokeWidth="1.4"/><circle cx="50" cy="50" r="2" fill="currentColor"/></svg><b>16:00</b><span>SINGAPORE</span></div>
                </div>
              </div>
            </div>
          </article>

          {/* 06 — Visa */}
          <article className="reason rev" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">06</span>
              <span className="reason-tag">Visa simplicity</span>
            </header>
            <div className="reason-grid">
              <div className="reason-art art-visa">
                <div className="passport">
                  <div className="pp-top">
                    <span className="pp-crest">★</span>
                    <span className="pp-issuer">PEOPLE'S REPUBLIC OF BANGLADESH</span>
                    <span className="pp-type">MEDICAL VISA · MV</span>
                  </div>
                  <div className="pp-stamp">
                    <div className="ps-frame">
                      <div className="ps-text">APPROVED</div>
                      <div className="ps-date">VALID 30 DAYS</div>
                    </div>
                  </div>
                  <div className="pp-meta">
                    <div><span>NAME</span><b>VISITING PATIENT</b></div>
                    <div><span>PURPOSE</span><b>DENTAL TREATMENT</b></div>
                    <div><span>VOA</span><b>ELIGIBLE · 67 COUNTRIES</b></div>
                  </div>
                </div>
              </div>
              <div className="reason-copy">
                <h3>Visa on arrival<br /><em>for medical travel.</em></h3>
                <p>Most Western passport holders qualify for a medical visa on arrival or 30-day e-visa issued same week. Our coordinators handle the paperwork — you arrive, hand over your passport, and walk through.</p>
                <div className="reason-stats">
                  <div><b>30 days</b><span>Standard medical visa</span></div>
                  <div><b>3–5 days</b><span>e-Visa turnaround</span></div>
                  <div><b>67</b><span>VOA-eligible nationalities</span></div>
                </div>
              </div>
            </div>
          </article>

          {/* 07 — Hospitality */}
          <article className="reason" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">07</span>
              <span className="reason-tag">Hospitality</span>
            </header>
            <div className="reason-grid">
              <div className="reason-copy">
                <h3>You'll feel it<br />within an <em>hour of landing.</em></h3>
                <p>The hotel doorman, the rickshaw-wallah, the tea-stall owner — a national instinct to look after a visitor. Our coordinators speak English, Bangla, Hindi and Arabic, and your needs are usually met before you've thought to ask.</p>
                <div className="reason-stats">
                  <div><b>4 langs</b><span>Spoken at the clinic</span></div>
                  <div><b>24/7</b><span>WhatsApp concierge</span></div>
                  <div><b>★ 4.9</b><span>Google reviews</span></div>
                </div>
              </div>
              <div className="reason-art art-host">
                <div className="host-quote">
                  <span className="hq-mark">✦</span>
                  <span className="hq-bn">স্বাগতম।</span>
                  <span className="hq-en">Swagatam.</span>
                  <span className="hq-tr">Welcome — spoken on first sight, meant on every visit.</span>
                  <span className="hq-src">A Bangla greeting · the most-used word in Dhaka</span>
                </div>
              </div>
            </div>
          </article>

          {/* 08 — Heritage & cuisine */}
          <article className="reason rev" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">08</span>
              <span className="reason-tag">Heritage & cuisine</span>
            </header>
            <div className="reason-grid">
              <div className="reason-art art-jamdani">
                <svg viewBox="0 0 400 400" aria-hidden="true">
                  <defs>
                    <pattern id="jamdani" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1.5" fill="#c97b2d"/>
                      <path d="M 10 20 L 20 10 L 30 20 L 20 30 Z" stroke="#7a3f0e" strokeWidth=".7" fill="none"/>
                      <path d="M 0 20 L 40 20 M 20 0 L 20 40" stroke="#c97b2d" strokeWidth=".3" opacity=".5"/>
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="#f6f1e8"/>
                  <rect width="400" height="400" fill="url(#jamdani)" opacity=".7"/>
                  {/* central medallion */}
                  <g transform="translate(200 200)">
                    <circle r="80" stroke="#7a3f0e" strokeWidth="1.5" fill="none"/>
                    <circle r="60" stroke="#7a3f0e" strokeWidth=".8" fill="none"/>
                    <path d="M -80 0 L -60 0 M 60 0 L 80 0 M 0 -80 L 0 -60 M 0 60 L 0 80" stroke="#7a3f0e" strokeWidth="1.5"/>
                    <path d="M 0 -50 Q 30 -30 0 0 Q -30 -30 0 -50 Z" fill="#c97b2d"/>
                    <path d="M 0 50 Q 30 30 0 0 Q -30 30 0 50 Z" fill="#c97b2d"/>
                    <path d="M -50 0 Q -30 30 0 0 Q -30 -30 -50 0 Z" fill="#c97b2d" opacity=".7"/>
                    <path d="M 50 0 Q 30 30 0 0 Q 30 -30 50 0 Z" fill="#c97b2d" opacity=".7"/>
                    <circle r="6" fill="#7a3f0e"/>
                  </g>
                </svg>
                <div className="jamdani-label">JAMDANI · UNESCO INTANGIBLE HERITAGE</div>
              </div>
              <div className="reason-copy">
                <h3>The world's most<br /><em>underrated food country.</em></h3>
                <p>Hilsa fish, kacchi biryani, fish-head curry, mishti doi, seven-layer tea. UNESCO-protected Jamdani weaving. Mughal-era forts. A four-thousand-year-old riverine culture that has been quietly perfecting itself while the rest of the world wasn't looking.</p>
                <div className="reason-stats">
                  <div><b>3</b><span>UNESCO heritage sites</span></div>
                  <div><b>5</b><span>Major culinary traditions</span></div>
                  <div><b>1</b><span>Royal Bengal Tiger habitat</span></div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* ───── Trip math closer ───── */}
        <div className="container bd-tripmath">
          <div className="chapter" data-reveal>
            <span className="ch-num">CHAPTER 01 · CLOSE</span>
            <span className="ch-line"></span>
            <span className="ch-title">The Bangladesh advantage, in one calculation</span>
          </div>
          <h3 className="tm-headline" data-reveal>
            What <em>$5,000</em> actually buys you.
          </h3>

          <div className="tm-compare">
            <div className="tm-side">
              <div className="tm-flag">🇬🇧</div>
              <h4>$5,000 in London</h4>
              <ul className="tm-list">
                <li><span className="tm-item">One zirconia crown</span><b>$1,800</b></li>
                <li><span className="tm-item">One dental implant</span><b>$2,800</b></li>
                <li><span className="tm-item">Consultation × 2</span><b>$300</b></li>
                <li><span className="tm-item">Total spent</span><b>$4,900</b></li>
              </ul>
              <div className="tm-out">Just a fraction of the work. Nothing left for the rest.</div>
            </div>

            <div className="tm-vs" aria-hidden="true">
              <span className="vs-x">×</span>
              <span className="vs-lab">VS</span>
            </div>

            <div className="tm-side primary">
              <div className="tm-flag">🇧🇩</div>
              <h4>$5,000 in Bangladesh</h4>
              <ul className="tm-list">
                <li><span className="tm-item">Full smile makeover · 10 units</span><b>$2,800</b></li>
                <li><span className="tm-item">5★ hotel · 7 nights</span><b>$700</b></li>
                <li><span className="tm-item">Business‑class return flight</span><b>$900</b></li>
                <li><span className="tm-item">Concierge · driver · tours</span><b>$400</b></li>
              </ul>
              <div className="tm-out primary">The whole trip. The whole smile. Money to spare.</div>
            </div>
          </div>

          <div className="tm-foot" data-reveal>
            <p>Indicative figures based on premium private clinics, January 2025. Your personalised quote is provided after a free 24-hour WhatsApp consultation.</p>
            <a href="#contact" className="tm-btn tm-btn-primary magnetic" data-cursor="Quote">
              Get my personalised quote
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── STANDARDS & SAFETY ─────────────────────────── */}
      <section className="standards" id="standards">
        <div className="container">
          <div className="chapter" data-reveal>
            <span className="ch-num">CHAPTER 02</span>
            <span className="ch-line"></span>
            <span className="ch-title">Standards & Safety</span>
          </div>

          <div className="std-head">
            <h2 className="display" data-reveal>
              International standards.<br />
              <em>Local rates.</em>
            </h2>
            <p className="lead" data-reveal>
              We use the same premium implant systems, the same B-class sterilisation,
              the same digital workflows as the best clinics in London or Zurich.
              The only thing different is the price tag.
            </p>
          </div>

          {/* Material spec rows */}
          <div className="std-list">
            <article className="spec" data-reveal>
              <header className="spec-head">
                <span className="spec-num">A · Implants</span>
                <span className="spec-tag tag-eu">EU & Swiss-made</span>
              </header>
              <div className="spec-grid">
                <div className="spec-copy">
                  <h3>Premium implant systems<br /><em>only.</em></h3>
                  <p>We work exclusively with the systems backed by 30+ years of clinical data and the strongest osseointegration outcomes. Generic implants stay in their boxes.</p>
                </div>
                <ul className="brand-list">
                  <li><b>Straumann</b><span>Switzerland · Roxolid®</span></li>
                  <li><b>Nobel Biocare</b><span>Sweden · TiUnite® surface</span></li>
                  <li><b>Osstem</b><span>Korea · TS III SA</span></li>
                  <li><b>Dentium</b><span>Korea · SuperLine</span></li>
                </ul>
              </div>
            </article>

            <article className="spec" data-reveal>
              <header className="spec-head">
                <span className="spec-num">B · Restorations</span>
                <span className="spec-tag tag-lab">In-house lab</span>
              </header>
              <div className="spec-grid">
                <div className="spec-copy">
                  <h3>Veneers and crowns,<br /><em>milled on site.</em></h3>
                  <p>Our CAD/CAM lab uses German and Liechtenstein ceramics. Faster turnarounds, tighter quality control, no shipping delays — and crucially, no surprise generics.</p>
                </div>
                <ul className="brand-list">
                  <li><b>Ivoclar</b><span>Liechtenstein · e.max® Press</span></li>
                  <li><b>VITA</b><span>Germany · Suprinity ZLS</span></li>
                  <li><b>Upcera</b><span>Multilayer zirconia</span></li>
                  <li><b>3M Filtek</b><span>Composite & bonding</span></li>
                </ul>
              </div>
            </article>

            <article className="spec" data-reveal>
              <header className="spec-head">
                <span className="spec-num">C · Sterilisation</span>
                <span className="spec-tag tag-safety">Hospital-grade</span>
              </header>
              <div className="spec-grid">
                <div className="spec-copy">
                  <h3>The same B-class autoclave<br /><em>as a London hospital.</em></h3>
                  <p>EN-13060 compliant Class-B steam sterilisation, single-use disposables for all invasive procedures, and a separate decontamination room. Every load is logged with a timestamp and operator signature.</p>
                </div>
                <ul className="brand-list">
                  <li><b>Class B autoclave</b><span>EN 13060 · 134°C / 18 min</span></li>
                  <li><b>Single-use protocol</b><span>Bibs · gloves · burs · syringes</span></li>
                  <li><b>Cold sterilisation</b><span>Glutaraldehyde for handpieces</span></li>
                  <li><b>HEPA filtration</b><span>In every treatment room</span></li>
                </ul>
              </div>
            </article>

            <article className="spec" data-reveal>
              <header className="spec-head">
                <span className="spec-num">D · Aftercare</span>
                <span className="spec-tag tag-care">Permanent</span>
              </header>
              <div className="spec-grid">
                <div className="spec-copy">
                  <h3>The work doesn't end<br />at <em>departure.</em></h3>
                  <p>Every restoration carries the manufacturer's warranty — typically 5–10 years on implants, lifetime on Straumann fixtures. We carry that warranty for you, with a written record of every fixture used.</p>
                </div>
                <ul className="brand-list">
                  <li><b>Implant warranty</b><span>5–lifetime, by brand</span></li>
                  <li><b>Crown warranty</b><span>5 years on zirconia</span></li>
                  <li><b>Digital records</b><span>Released to you, encrypted</span></li>
                  <li><b>Emergency line</b><span>WhatsApp · 24/7 · 7 days</span></li>
                </ul>
              </div>
            </article>
          </div>

          {/* Trust marks row */}
          <div className="std-trust" data-reveal>
            <div className="trust-mark">
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 5 L 50 18 L 50 36 Q 50 50 30 56 Q 10 50 10 36 L 10 18 Z"/>
                <path d="M22 30 L 28 36 L 40 22"/>
              </svg>
              <div><b>BMDC certified</b><span>Bangladesh Medical & Dental Council</span></div>
            </div>
            <div className="trust-mark">
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="30" cy="30" r="22"/>
                <path d="M30 12v18l12 6"/>
              </svg>
              <div><b>EN 13060</b><span>Class B autoclave standard</span></div>
            </div>
            <div className="trust-mark">
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="10" y="10" width="40" height="40" rx="3"/>
                <path d="M18 22h24M18 30h24M18 38h16"/>
              </svg>
              <div><b>ISO 13485</b><span>Medical device QMS lab partner</span></div>
            </div>
            <div className="trust-mark">
              <svg viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M30 8 L 36 22 L 52 24 L 40 35 L 44 50 L 30 42 L 16 50 L 20 35 L 8 24 L 24 22 Z"/>
              </svg>
              <div><b>FDS RCPS</b><span>Glasgow fellowship · clinical advisor</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TREATMENTS ─────────────────────────── */}
      <section className="treatments" id="treatments">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><span className="kicker-line"></span>Comprehensive treatments</span>
            <h2 className="display">
              Everything<br />under <em>one roof.</em>
            </h2>
            <p className="lead">
              From cosmetic smile makeovers to complex full‑mouth rehabilitation — delivered in a single, advanced facility with an in-house lab and digital workflow.
            </p>
          </div>

          <div className="treat-list" id="treatList">
            <a href="#contact" key="0" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">01 —</div>
              <div className="treat-title"><span className="glyph">🦷</span>Dental Implants</div>
              <div className="treat-desc">Single, multiple and full-arch implants. Premium systems, 3D guided surgery, same-day loading where indicated.</div>
              <div className="treat-badge">Most popular</div>
            </a>
            <a href="#contact" key="1" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">02 —</div>
              <div className="treat-title"><span className="glyph">✨</span>Smile Makeover</div>
              <div className="treat-desc">Digital smile design, zirconia veneers, whitening and composite bonding for a complete aesthetic transformation.</div>
              <div className="treat-badge">High demand</div>
            </a>
            <a href="#contact" key="2" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">03 —</div>
              <div className="treat-title"><span className="glyph">🔩</span>Zirconia Crowns & Veneers</div>
              <div className="treat-desc">Ultra-thin, metal-free ceramic restorations crafted in our in-house lab for natural aesthetics and superior durability.</div>
              <div className="treat-badge">In-house lab</div>
            </a>
            <a href="#contact" key="3" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">04 —</div>
              <div className="treat-title"><span className="glyph">🦴</span>Full Mouth Rehabilitation</div>
              <div className="treat-desc">Comprehensive digital treatment planning that restores function and aesthetics — tailored to international timelines.</div>
              <div className="treat-badge">Complex cases</div>
            </a>
            <a href="#contact" key="4" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">05 —</div>
              <div className="treat-title"><span className="glyph">📐</span>Orthodontics & Aligners</div>
              <div className="treat-desc">Invisalign-style clear aligners and modern ceramic braces. Remote monitoring available for international follow-up.</div>
              <div className="treat-badge">All ages</div>
            </a>
            <a href="#contact" key="5" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">06 —</div>
              <div className="treat-title"><span className="glyph">🔬</span>Microscopic Root Canal</div>
              <div className="treat-desc">Single-visit endodontic therapy under local anaesthetic, using an operating microscope so canals are seen rather than felt for.</div>
              <div className="treat-badge">Microscope</div>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── JOURNEY ─────────────────────────── */}
      <section className="journey" id="journey">
        <div className="container">
          <div className="section-head two-col">
            <div>
              <span className="eyebrow"><span className="kicker-line"></span>Your seamless journey</span>
              <h2 className="display">
                From abroad,<br />
                <em>to a finished smile.</em>
              </h2>
            </div>
            <p className="lead">
              Four phases. Most international files run six to ten days on the ground — booked
              with enough margin for you to enjoy Bangladesh between appointments.
            </p>
          </div>

          <div className="journey-wrap">
            <svg className="journey-path" viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true">
              <path id="planePath" d="M 30 180 Q 280 30 600 130 T 1170 80" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="6 8" />
              <g id="planeIcon">
                <path d="M -14 -2 L 14 -2 L 8 -10 L 10 -10 L 18 -2 L 22 -2 L 22 2 L 18 2 L 10 10 L 8 10 L 14 2 L -14 2 Z" fill="currentColor" />
              </g>
            </svg>

            <ol className="steps">
              <li className="step" data-step>
                <div className="step-num">01</div>
                <div className="step-time">Before you fly</div>
                <h4>Remote consultation</h4>
                <p>Share dental records over WhatsApp or email. Receive a full treatment plan, costed and dated, before you book a flight.</p>
              </li>
              <li className="step" data-step>
                <div className="step-num">02</div>
                <div className="step-time">Day 1</div>
                <h4>Arrival & assessment</h4>
                <p>Fast-track 3D CBCT scan and intraoral examination on landing day. Treatment plan confirmed in person, with zero surprises.</p>
              </li>
              <li className="step" data-step>
                <div className="step-num">03</div>
                <div className="step-time">Days 2–8</div>
                <h4>Expert treatment</h4>
                <p>BMDC-certified specialists perform procedures in efficient, calm sessions. One clinician per chair, never overbooked.</p>
              </li>
              <li className="step" data-step>
                <div className="step-num">04</div>
                <div className="step-time">After you return</div>
                <h4>Aftercare & follow-up</h4>
                <p>Encrypted digital file, written home-care, and scheduled remote check-ins keep your outcome on track long after you're home.</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── DAY ONE TIMELINE ─────────────────────────── */}
      <section className="dayone" id="dayone">
        <div className="container">
          <div className="chapter alt" data-reveal>
            <span className="ch-num">CHAPTER 03</span>
            <span className="ch-line"></span>
            <span className="ch-title">Day one, hour by hour</span>
          </div>

          <div className="d1-head">
            <h2 className="display" data-reveal>
              The day you land,<br />
              <em>in real time.</em>
            </h2>
            <p className="lead" data-reveal>
              We've removed every obvious source of anxiety. Here is what a typical
              arrival day looks like — for a patient flying in from London on a Tuesday
              morning. Most leave the clinic by sunset, with a written plan for the rest of the week.
            </p>
          </div>

          <ol className="d1-timeline" id="d1Timeline">
            <li className="d1-step" data-d1>
              <div className="d1-time">07:50</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Touchdown</span>
                <h4>Hazrat Shahjalal International, Dhaka.</h4>
                <p>Our coordinator meets you at the immigration desk with a printed welcome and your medical-visa paperwork already endorsed. Average time through arrivals: <b>22 minutes.</b></p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">08:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Transfer</span>
                <h4>Air-conditioned car to your hotel.</h4>
                <p>Forty minutes to Banasree, with a quiet coffee stop on request. Driver knows the routes that avoid morning school traffic. Your suite is pre-checked-in — no front desk.</p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">10:00</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Rest</span>
                <h4>Two hours to actually sleep.</h4>
                <p>You arrive jet-lagged; we know it. Treatment never starts the same morning you land. Blackout curtains, a real bed, and a deliberate silence while you reset.</p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">12:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Lunch</span>
                <h4>A light meal, in the room or downstairs.</h4>
                <p>Dietary preferences — vegetarian, halal, no-spice — are recorded with your booking. The hotel kitchen has your sheet before you land.</p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">14:00</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Clinic arrival</span>
                <h4>Twelve minutes from hotel to chair.</h4>
                <p>You're greeted by your patient coordinator, not a receptionist. Paperwork was completed remotely; you sign two pages and walk straight in.</p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">14:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">3D scan</span>
                <h4>CBCT scan + intraoral.</h4>
                <p>A six-minute cone-beam scan and a full intraoral with our wand scanner. By the time you stand up, the radiologist is already annotating the images.</p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">15:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Treatment review</span>
                <h4>The plan, on a screen, in plain English.</h4>
                <p>Dr. Hasan walks you through what he sees — every implant site, every margin, every material option. You decide. You take the file home with you.</p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">17:00</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Back to base</span>
                <h4>Driver waiting. Hotel. Real food.</h4>
                <p>Some patients want to walk; others want to nap. Either way, your schedule for the rest of the week is on your phone and printed for the bedside.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ─────────────────────────── SPECIALISTS ─────────────────────────── */}
      <section className="team" id="team">
        <div className="container">
          <div className="section-head two-col">
            <div>
              <span className="eyebrow"><span className="kicker-line"></span>Meet the specialists</span>
              <h2 className="display">
                A small team,<br />
                <em>international training,</em><br />
                professor-level oversight.
              </h2>
            </div>
            <p className="lead">
              Three clinicians who set the standard for advanced dental care in Bangladesh.
              Led by a Chief Consultant with implantology training across China, Korea and India,
              and overseen by a Glasgow-fellowship prosthodontic professor.
            </p>
          </div>

          {/* ── Team Photo ── */}
          <div className="team-photo-container" style={{
            marginTop: '60px',
            marginBottom: '80px',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            aspectRatio: '16/7',
            position: 'relative'
          }}>
            <img 
              src="/assets/tourism/team.png" 
              alt="The RH Dental Care Team" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          <article className="doctor-feature" data-reveal>
            <div className="doctor-portrait">
              <img src="/assets/tourism/dr_mehedi_nobg.jpeg" id="dr-hasan-portrait" className="doctor-slot" alt="Dr. Hasan" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px'}} />
              <div className="portrait-tag">
                <span className="pip"></span>
                On call · Banasree clinic
              </div>
            </div>
            <div className="doctor-body">
              <div className="doctor-role">Chief Consultant & Founder · BMDC 5169</div>
              <h3 className="doctor-name">
                Dr. B.M. <em>Rafiqul Hasan</em>
              </h3>
              <p className="doctor-blurb">
                A distinguished Oral & Dental Surgeon renowned for precision and advanced clinical
                expertise. Specialised implantology training in <strong>China, Korea and India,</strong>
                alongside Minimally Invasive Cosmetic Dentistry (MICD) training in Nepal.
                Practises also at Labaid Dental Clinic, Gulshan, and lectures at Saphena Women's Dental College.
              </p>

              <div className="cred-grid">
                <div className="cred-cell"><span className="k">Degree</span><span className="v">BDS — Sapporo Dental College (DU)</span></div>
                <div className="cred-cell"><span className="k">Postgrad</span><span className="v">MPH — City University</span></div>
                <div className="cred-cell"><span className="k">PGT</span><span className="v">OMS & Prosthodontics, BSMMU</span></div>
                <div className="cred-cell"><span className="k">Adv.</span><span className="v">MICD, Nepal</span></div>
              </div>

              <div className="doctor-stats">
                <div><b data-count="13000" data-suffix="+">0</b><span>Patients treated</span></div>
                <div><b data-count="12" data-suffix="+">0</b><span>Years in practice</span></div>
                <div><b data-count="4" data-suffix="">0</b><span>Countries trained in</span></div>
              </div>

              <div className="tag-row">
                <span className="tag">3D guided implantology</span>
                <span className="tag">Full mouth rehab</span>
                <span className="tag">Digital smile design</span>
                <span className="tag">CAD/CAM prosthetics</span>
                <span className="tag">Bone augmentation</span>
              </div>
            </div>
          </article>

          <div className="doctor-pair">
            <article className="doctor-card" data-reveal data-tilt>
              <div className="doctor-card-img">
                <img src="/assets/tourism/dr_shimia_nobg.jpg" id="dr-shimia-portrait" className="doctor-slot" alt="Dr. Shimia" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px'}} />
              </div>
              <div className="doctor-card-body">
                <div className="role-line">Senior Doctor & Team Lead · BMDC 8496</div>
                <h3>Dr. Shimia <em>Binte Taher</em></h3>
                <p>Highly accomplished clinician combining surgical precision with patient-centred care. Leads the team day-to-day and provides specialised care for female patients. Expert in microscopic endodontics, aesthetic restorations and complex extractions.</p>
                <div className="cred-grid two">
                  <div className="cred-cell"><span className="k">Degree</span><span className="v">BDS — Pioneer Dental College</span></div>
                  <div className="cred-cell"><span className="k">PGT</span><span className="v">Oral & Maxillofacial Surgery, DMC</span></div>
                  <div className="cred-cell"><span className="k">Faculty</span><span className="v">Senior Lecturer, MH Samorita (since '15)</span></div>
                </div>
                <div className="tag-row sm">
                  <span className="tag">Microscopic endodontics</span>
                  <span className="tag">Zirconia veneers</span>
                  <span className="tag">Female-centred care</span>
                </div>
              </div>
            </article>

            <article className="doctor-card advisor" data-reveal data-tilt>
              <div className="doctor-card-img">
                <img src="/assets/tourism/dr_shaheen_nobg.png" id="dr-shaheen-portrait" className="doctor-slot" alt="Prof. Shaheen" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px'}} />
              </div>
              <div className="doctor-card-body">
                <div className="role-line">Clinical Advisor & On-Call Specialist</div>
                <h3>Prof. Dr. <em>Md. Shahidul Islam Shaheen</em></h3>
                <p>Renowned dental academician and prosthodontic specialist. Holds the prestigious <strong>FDS RCPS from Glasgow</strong> with advanced training in Korea, India and Dubai. Currently a PhD candidate in oral cancer research. Guides RH Dental Care's most complex prosthodontic and surgical cases.</p>
                <div className="cred-grid two">
                  <div className="cred-cell"><span className="k">Quals.</span><span className="v">BDS · MS · FDS RCPS (Glasgow, UK)</span></div>
                  <div className="cred-cell"><span className="k">PhD</span><span className="v">Oral Cancer Research candidate</span></div>
                  <div className="cred-cell"><span className="k">Training</span><span className="v">Korea · India · Dubai</span></div>
                </div>
                <div className="tag-row sm">
                  <span className="tag">Prosthodontics</span>
                  <span className="tag">Maxillofacial rehab</span>
                  <span className="tag">Digital dentistry</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── BEYOND THE CHAIR ─────────────────────────── */}
      <section className="beyond" id="beyond">
        <div className="container">
          <div className="section-head two-col">
            <div>
              <span className="eyebrow"><span className="kicker-line"></span>Beyond the chair</span>
              <h2 className="display">
                You came<br />for a smile.<br />
                <em>Stay for the country.</em>
              </h2>
            </div>
            <p className="lead">
              Most international files leave 2–4 days of rest between appointments. With a
              little planning, that is more than enough time to see why nearly anyone who
              visits Bangladesh comes back. Our coordinators help arrange the trip — drivers, guides, the lot.
            </p>
          </div>

          <div className="beyond-grid">
            <article className="bg-card sundarbans" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img src="/assets/tourism/sundarbans.png" id="bg-sundarbans" className="bg-photo" alt="Sundarbans photo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#274a3b"/>
                      <stop offset="100%" stopColor="#0e2a23"/>
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g1)"/>
                  {/* moon */}
                  <circle className="sb-moon" cx="250" cy="50" r="22" fill="#e8d8b3" opacity=".7"/>
                  {/* reflection */}
                  <ellipse className="sb-water" cx="250" cy="180" rx="18" ry="3" fill="#e8d8b3" opacity=".3"/>
                  {/* mangrove silhouettes */}
                  <path d="M0 160 Q 30 130 40 145 Q 55 110 75 138 Q 95 100 115 138 Q 135 120 155 142 L 155 220 L 0 220 Z" fill="#0a1f17"/>
                  <path d="M155 150 Q 180 115 200 142 Q 225 125 245 145 Q 270 120 295 142 Q 310 130 320 145 L 320 220 L 155 220 Z" fill="#091813"/>
                  {/* tiger eyes hint */}
                  <circle className="sb-eye" cx="80" cy="155" r="1.5" fill="#e8a838"/>
                  <circle className="sb-eye2" cx="86" cy="155" r="1.5" fill="#e8a838"/>
                  {/* water shimmer */}
                  <path className="sb-water" d="M0 200 L 320 200" stroke="#274a3b" strokeWidth=".6" opacity=".5"/>
                  <path className="sb-water" d="M0 210 L 320 210" stroke="#274a3b" strokeWidth=".6" opacity=".3"/>
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">UNESCO · Mangrove</div>
                <h3>The Sundarbans</h3>
                <p>The world's largest mangrove forest, and the only one home to the Royal Bengal tiger. Three-day river cruises depart from Khulna.</p>
                <div className="bg-meta">
                  <span><b>~6h</b> Dhaka → Khulna</span>
                  <span><b>3 days</b> cruise</span>
                </div>
              </div>
            </article>

            <article className="bg-card coxs" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img src="/assets/tourism/coxs_bazar.png" id="bg-coxs" className="bg-photo" alt="Coxs Bazar photo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f3b061"/>
                      <stop offset="55%" stopColor="#d97f3d"/>
                      <stop offset="100%" stopColor="#2a4a6a"/>
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g2)"/>
                  {/* sun */}
                  <circle className="cb-sun" cx="160" cy="110" r="36" fill="#fff" opacity=".85"/>
                  {/* horizon */}
                  <line x1="0" y1="125" x2="320" y2="125" stroke="#1a3050" strokeWidth=".5" opacity=".6"/>
                  {/* waves */}
                  <path className="cb-wave1" d="M-20 145 Q 80 138 160 145 T 340 145 L 340 220 L -20 220 Z" fill="#1a3550" opacity=".85"/>
                  <path className="cb-wave2" d="M-20 170 Q 80 162 160 170 T 340 170 L 340 220 L -20 220 Z" fill="#0e253c"/>
                  {/* sun reflection */}
                  <rect className="cb-sun" x="155" y="130" width="10" height="40" fill="#fff" opacity=".25"/>
                  {/* birds */}
                  <path className="cb-bird1" d="M70 70 q 5 -5 10 0 q 5 -5 10 0" fill="none" stroke="#1a3050" strokeWidth="1.2"/>
                  <path className="cb-bird2" d="M210 55 q 4 -4 8 0 q 4 -4 8 0" fill="none" stroke="#1a3050" strokeWidth="1.2"/>
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">120 km · World's longest</div>
                <h3>Cox's Bazar</h3>
                <p>The longest natural sea beach on earth. A one-hour direct flight from Dhaka, then sunset walks that genuinely seem to never end.</p>
                <div className="bg-meta">
                  <span><b>~1h</b> direct flight</span>
                  <span><b>2–3 days</b> ideal</span>
                </div>
              </div>
            </article>

            <article className="bg-card olddhaka" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img src="/assets/tourism/old_dhaka.png" id="bg-olddhaka" className="bg-photo" alt="Old Dhaka photo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e9c598"/>
                      <stop offset="100%" stopColor="#c97b2d"/>
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g3)"/>
                  {/* Lalbagh-style fort silhouette */}
                  <path d="M0 220 L 0 150 L 30 150 L 30 130 L 50 130 L 50 120 L 70 120 L 70 105 Q 80 92 90 105 L 90 130 L 110 130 L 110 145 L 130 145 L 130 110 Q 145 90 160 110 L 160 145 L 180 145 L 180 130 L 200 130 L 200 105 Q 210 92 220 105 L 220 130 L 250 130 L 250 145 L 280 145 L 280 130 L 320 130 L 320 220 Z" fill="#7a3f0e"/>
                  {/* dome */}
                  <ellipse cx="145" cy="108" rx="15" ry="10" fill="#5a2e0a"/>
                  <ellipse cx="85" cy="103" rx="6" ry="4" fill="#5a2e0a"/>
                  <ellipse cx="215" cy="103" rx="6" ry="4" fill="#5a2e0a"/>
                  {/* windows */}
                  <rect className="od-window" x="40" y="160" width="6" height="14" fill="#3a1c08"/>
                  <rect className="od-window" x="75" y="160" width="6" height="14" fill="#3a1c08"/>
                  <rect className="od-window" x="140" y="170" width="10" height="20" fill="#3a1c08"/>
                  <rect className="od-window" x="195" y="160" width="6" height="14" fill="#3a1c08"/>
                  <rect className="od-window" x="260" y="170" width="6" height="14" fill="#3a1c08"/>
                  {/* rickshaw on street */}
                  <g className="od-rickshaw">
                    <circle cx="0" cy="8" r="6" fill="#3a1c08"/>
                    <circle cx="14" cy="8" r="6" fill="#3a1c08"/>
                    <rect x="-4" y="-6" width="20" height="10" fill="#c97b2d" stroke="#3a1c08" strokeWidth="1"/>
                    <path d="M-4 -6 L -10 4" stroke="#3a1c08" strokeWidth="1.5"/>
                  </g>
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">Heritage · River city</div>
                <h3>Old Dhaka</h3>
                <p>17th-century Mughal forts, the Pink Palace, the Buriganga riverfront, rickshaw-art alleys — and the country's most ferocious biryani.</p>
                <div className="bg-meta">
                  <span><b>25 min</b> from clinic</span>
                  <span><b>Half day</b> walking</span>
                </div>
              </div>
            </article>

            <article className="bg-card srimangal" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img src="/assets/tourism/srimangal.png" id="bg-srimangal" className="bg-photo" alt="Srimangal photo" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a8c89a"/>
                      <stop offset="100%" stopColor="#3d6b4a"/>
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g4)"/>
                  {/* distant hills */}
                  <path d="M0 100 Q 60 70 120 95 Q 180 75 240 95 Q 280 80 320 100 L 320 220 L 0 220 Z" fill="#2f5a3d" opacity=".6"/>
                  {/* tea garden rows */}
                  <path d="M0 130 Q 60 122 120 130 T 320 130 L 320 145 L 0 145 Z" fill="#356844"/>
                  <path d="M0 150 Q 60 142 120 150 T 320 150 L 320 165 L 0 165 Z" fill="#2c5a3a"/>
                  <path d="M0 170 Q 60 162 120 170 T 320 170 L 320 185 L 0 185 Z" fill="#234c30"/>
                  <path d="M0 190 Q 60 182 120 190 T 320 190 L 320 220 L 0 220 Z" fill="#1a3c25"/>
                  {/* tea bushes texture */}
                  <g fill="#4a7d56">
                    <circle className="sm-bush" cx="40" cy="135" r="2"/><circle className="sm-bush" cx="120" cy="138" r="2"/><circle className="sm-bush" cx="220" cy="135" r="2"/>
                    <circle className="sm-bush" cx="60" cy="155" r="2"/><circle className="sm-bush" cx="180" cy="158" r="2"/><circle className="sm-bush" cx="280" cy="155" r="2"/>
                  </g>
                  {/* person picking */}
                  <g className="sm-picker" transform="translate(220 168)">
                    <circle cx="0" cy="-6" r="3" fill="#c97b2d"/>
                    <rect x="-2" y="-3" width="4" height="8" fill="#a85e1c"/>
                  </g>
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">Tea capital · Hills</div>
                <h3>Srimangal</h3>
                <p>Rolling tea estates, the famous seven-layer tea, rainforest reserves and the slowest, quietest mornings in Bangladesh.</p>
                <div className="bg-meta">
                  <span><b>~4h</b> by train</span>
                  <span><b>2 days</b> ideal</span>
                </div>
              </div>
            </article>
          </div>

          <div className="beyond-foot">
            <div className="bdg">
              <svg viewBox="0 0 32 32" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 4l4 8 9 1-6.5 6 1.5 9-8-4-8 4 1.5-9L3 13l9-1z" strokeLinejoin="round"/></svg>
              <span>Concierge handles drivers, flights, hotels and guides — usually arranged within 24h of your treatment plan being confirmed.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── PULL QUOTE ─────────────────────────── */}
      <section className="pullquote" id="pullquote">
        <div className="pq-band">
          <div className="pq-track" id="pqTrack">
            <span className="pq-line">
              <span className="pq-mark">"</span>
              I was anxious flying in. By day two I was relaxed. By the time I left,
              <em>I was already planning the next trip.</em>
              <span className="pq-author">— Walid M. · London · verified Google review</span>
            </span>
            <span className="pq-line" aria-hidden="true">
              <span className="pq-mark">"</span>
              I was anxious flying in. By day two I was relaxed. By the time I left,
              <em>I was already planning the next trip.</em>
              <span className="pq-author">— Walid M. · London · verified Google review</span>
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── BANGLADESH IN REAL LIFE (DA VINCI) ─────────────────────────── */}
      <section className="footage dv-section" id="footage">
        <div className="dv-bg-lines"></div>
        <div className="container">
          <div className="chapter dv-chapter" data-reveal>
            <span className="ch-num">CHAPTER 03 · INTERLUDE</span>
            <span className="ch-line"></span>
            <span className="ch-title">Bangladesh, in real life</span>
          </div>

          <div className="ft-head dv-head">
            <h2 className="display" data-reveal>
              Photographs<br />
              <em>of a country</em><br />
              you'll quietly fall for.
            </h2>
            <p className="lead" data-reveal>
              Embark on a dental journey that extends far beyond the clinic doors. Experience
              warm Bengali hospitality, breathtaking natural wonders, and rich heritage sites,
              all while receiving international-standard clinical care at RH Dental Care.
            </p>
          </div>

          <div className="dv-grid" data-reveal>
            {/* FIG 01 */}
            <figure className="dv-figure dv-pos-1">
              <div className="dv-frame">
                <div className="dv-matting">
                  <img src="/assets/tourism/coxs_bazar.png" id="ft-coxs" alt="Coxs Bazar" />
                </div>
              </div>
              <figcaption className="dv-caption">
                <span className="dv-fig-num">FIG. 01</span>
                <span className="dv-fig-title">COX'S BAZAR</span>
                <span className="dv-fig-desc">Sunset over 120 km of golden sandy beach.</span>
              </figcaption>
            </figure>

            {/* FIG 02 */}
            <figure className="dv-figure dv-pos-2">
              <div className="dv-frame">
                <div className="dv-matting">
                  <img src="/assets/tourism/sundarbans.png" id="ft-sundarbans" alt="Sundarbans" />
                </div>
              </div>
              <figcaption className="dv-caption">
                <span className="dv-fig-num">FIG. 02</span>
                <span className="dv-fig-title">SUNDARBANS</span>
                <span className="dv-fig-desc">The world's largest UNESCO mangrove forest.</span>
              </figcaption>
            </figure>

            {/* FIG 03 */}
            <figure className="dv-figure dv-pos-3">
              <div className="dv-frame">
                <div className="dv-matting">
                  <img src="/assets/tourism/old_dhaka.png" id="ft-dhaka" alt="Dhaka" />
                </div>
              </div>
              <figcaption className="dv-caption">
                <span className="dv-fig-num">FIG. 03</span>
                <span className="dv-fig-title">HISTORIC LALBAGH FORT</span>
                <span className="dv-fig-desc">Moghal architecture in Old Dhaka.</span>
              </figcaption>
            </figure>

            {/* FIG 04 */}
            <figure className="dv-figure dv-pos-4">
              <div className="dv-frame">
                <div className="dv-matting">
                  <img src="/assets/tourism/rickshaw.png" id="ft-rickshaw" alt="Rickshaw art" />
                </div>
              </div>
              <figcaption className="dv-caption">
                <span className="dv-fig-num">FIG. 04</span>
                <span className="dv-fig-title">RICKSHAW PAINTING</span>
                <span className="dv-fig-desc">UNESCO intangible heritage art.</span>
              </figcaption>
            </figure>

            {/* FIG 05 */}
            <figure className="dv-figure dv-pos-5">
              <div className="dv-frame">
                <div className="dv-matting">
                  <img src="/assets/tourism/srimangal.png" id="ft-tea" alt="Tea estates" />
                </div>
              </div>
              <figcaption className="dv-caption">
                <span className="dv-fig-num">FIG. 05</span>
                <span className="dv-fig-title">SRIMANGAL</span>
                <span className="dv-fig-desc">Lush green rolling tea estates.</span>
              </figcaption>
            </figure>

            {/* FIG 06 */}
            <figure className="dv-figure dv-pos-6">
              <div className="dv-frame">
                <div className="dv-matting">
                  <img src="/assets/tourism/food.png" id="ft-food" alt="Food" />
                </div>
              </div>
              <figcaption className="dv-caption">
                <span className="dv-fig-num">FIG. 06</span>
                <span className="dv-fig-title">CULINARY LEGACY</span>
                <span className="dv-fig-desc">Rich traditional Kacchi & local delicacies.</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TECHNOLOGY MARQUEE ─────────────────────────── */}
      <section className="tech" id="tech">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow"><span className="kicker-line"></span>Advanced technology</span>
            <h2 className="display">
              Precision tools.<br />
              <em>Predictable results.</em>
            </h2>
          </div>

          <div className="tech-grid">
            <div className="tech-card" data-reveal>
              <div className="tech-meta">01 · Imaging</div>
              <h4>3D CBCT scanner</h4>
              <p>360° bone analysis with up to 90% less radiation than legacy panoramic X-rays.</p>
            </div>
            <div className="tech-card" data-reveal>
              <div className="tech-meta">02 · Digital</div>
              <h4>Intraoral scanning</h4>
              <p>Precise digital impressions in minutes — no uncomfortable putty trays.</p>
            </div>
            <div className="tech-card" data-reveal>
              <div className="tech-meta">03 · Lab</div>
              <h4>3D dental printing</h4>
              <p>In-house surgical guides, models and same-day restorations.</p>
            </div>
            <div className="tech-card" data-reveal>
              <div className="tech-meta">04 · Soft tissue</div>
              <h4>Diode laser</h4>
              <p>Minimally invasive periodontal procedures with faster healing.</p>
            </div>
            <div className="tech-card" data-reveal>
              <div className="tech-meta">05 · Endodontics</div>
              <h4>Endo microscope</h4>
              <p>Magnified root canal therapy for maximum precision and comfort.</p>
            </div>
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            <span>3D CBCT Imaging</span><span>•</span>
            <span>Digital Smile Design</span><span>•</span>
            <span>Same-Day Crowns</span><span>•</span>
            <span>Guided Implantology</span><span>•</span>
            <span>Microscopic Endodontics</span><span>•</span>
            <span>Sterilisation B-class autoclave</span><span>•</span>
            <span>3D CBCT Imaging</span><span>•</span>
            <span>Digital Smile Design</span><span>•</span>
            <span>Same-Day Crowns</span><span>•</span>
            <span>Guided Implantology</span><span>•</span>
            <span>Microscopic Endodontics</span><span>•</span>
            <span>Sterilisation B-class autoclave</span><span>•</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── REVIEWS ─────────────────────────── */}
      <section className="reviews" id="reviews">
        <div className="container">
          <div className="section-head two-col">
            <div>
              <span className="eyebrow"><span className="kicker-line"></span>Verified Google reviews</span>
              <h2 className="display">
                Trusted by thousands<br />
                <em>across Dhaka & beyond.</em>
              </h2>
            </div>
            <div className="gscore-big">
              <div className="gscore-num">5.0</div>
              <div className="gscore-stars">★★★★★</div>
              <div className="gscore-sub">Verified Google reviews</div>
            </div>
          </div>

          <div className="reviews-grid">
            <article className="rev" data-reveal data-tilt>
              <div className="rev-source"><span className="g-badge">G</span> Google · ★★★★★</div>
              <p className="rev-body">"The entire root canal was done under local anaesthetic and I felt nothing during it. The clinic environment is very clean. Highly impressed."</p>
              <div className="rev-author"><b>Sayed Anwar</b><span>Local Guide · Bangladesh</span></div>
            </article>
            <article className="rev" data-reveal data-tilt>
              <div className="rev-source"><span className="g-badge">G</span> Google · ★★★★★</div>
              <p className="rev-body">"My mother received dental implants here. Dr. Shimia and Dr. Hasan were very caring. Their diagnosis and technology are top notch."</p>
              <div className="rev-author"><b>Farzana Rahman</b><span>Verified patient · Dhaka</span></div>
            </article>
            <article className="rev" data-reveal data-tilt>
              <div className="rev-source"><span className="g-badge">G</span> Google · ★★★★★</div>
              <p className="rev-body">"Extremely professional. Doctors take time to explain the exact problem through X-rays and screens before any treatment. Very confident."</p>
              <div className="rev-author"><b>Mahadi Hasan</b><span>Local Guide · 32 reviews</span></div>
            </article>
          </div>

          <div className="reviews-foot">
            <a href="https://g.page/r/CRH-dental" target="_blank" rel="noopener noreferrer" className="tm-btn tm-btn-secondary magnetic">
              <span className="g-badge">G</span>
              Read all Google reviews
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── FAQ ─────────────────────────── */}
      <section className="faq" id="faq">
        <div className="container">
          <div className="chapter" data-reveal>
            <span className="ch-num">CHAPTER 04</span>
            <span className="ch-line"></span>
            <span className="ch-title">Questions, answered</span>
          </div>

          <div className="faq-head">
            <h2 className="display" data-reveal>
              Every question<br />
              <em>international patients ask.</em>
            </h2>
            <p className="lead" data-reveal>
              These are the questions that arrive in our inbox most often, with the
              answers we'd give you on a 10-minute WhatsApp call.
            </p>
          </div>

          <ul className="faq-list" id="faqList">
            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">01</span>
                <span className="faq-text">Is the treatment actually safe? I've heard mixed things about medical tourism.</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>The risk in medical tourism is not the country — it's the clinic. We use the same Swiss and Swedish implants, the same Liechtenstein ceramics and the same B-class sterilisation as a private clinic in London. Our chief consultant is BMDC-certified with international training; our advisor holds the FDS RCPS from Glasgow. You're not getting a cheap copy; you're getting the same procedure at honest local rates.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">02</span>
                <span className="faq-text">How long do I need to stay?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>It depends on the procedure. A single crown or veneer set: <b>3–5 days</b>. A full smile makeover with veneers: <b>5–8 days</b>. Implants with same-day temporary loading: <b>7–10 days</b>; with delayed loading (the safer, slower path): one short visit for surgery, then a second 4–6 months later for the permanent crowns. We build the schedule around <em>your</em> calendar, not ours.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">03</span>
                <span className="faq-text">What if something goes wrong after I return home?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>Every implant carries the manufacturer's warranty (5 years to lifetime, depending on brand) and we hold the documentation for you. If you have an issue, you contact us on WhatsApp; we coordinate with your local dentist, send your full digital file and X-rays, and — where the issue is on us — cover the repair work. Roughly 0.3% of our international files have required a return trip.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">04</span>
                <span className="faq-text">Can I claim this on my private health insurance?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>Most policies that cover dental work overseas will accept our paperwork — itemised invoice, treatment records, prescription summary, and the practitioner's BMDC number. We've successfully filed with Bupa, Cigna Global, Allianz Care and AXA. Your coordinator will hand you the file your insurer needs before you board the return flight.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">05</span>
                <span className="faq-text">How and when do I pay?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>Half on arrival, after the 3D scan confirms the plan; the rest on completion. We accept international card payments (Visa / Mastercard / Amex) in USD, GBP or EUR, and bank transfer in any major currency. No prepayment required to book — the WhatsApp consultation is free and non-binding.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">06</span>
                <span className="faq-text">Do I need a special visa for medical treatment?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>For most Western passports: no. A standard tourist visa (e-visa or visa-on-arrival) covers a dental treatment trip up to 30 days. If your treatment runs longer or you'd like the formal protection, we'll issue a medical-visa invitation letter and brief you on the paperwork — processed in 3–5 working days through the Bangladeshi mission in your country.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">07</span>
                <span className="faq-text">Is it safe to travel while recovering from dental surgery?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>For minor work — fillings, crowns, single extractions, basic implants — you can fly the day after with no restrictions. For complex surgical work (sinus lifts, bone grafts, multiple implants), we recommend a 3-day window before flying to allow swelling to peak and recede. We schedule major work earlier in your trip and lighter work toward the end specifically for this reason.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">08</span>
                <span className="faq-text">Will the doctors actually speak fluent English?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>Yes. Bangladesh has one of the highest English proficiency rates in non-anglophone Asia, and our entire clinical and coordination team works in English by default. Our chief consultant has trained internationally and lectures in English; our advisor holds a Glasgow fellowship. No translation app, no awkward intermediation — you ask your question, you get a direct answer.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">09</span>
                <span className="faq-text">Can I bring a friend or family member?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>Strongly encouraged. Our coordinators handle their travel arrangements alongside yours — same hotel, same driver, same restaurant bookings. A companion fee covers nothing clinical but everything logistical; budget about $40/day on top of your trip cost. They are welcome in the consultation room at any point you'd like them there.</p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">10</span>
                <span className="faq-text">What's the worst-case scenario you've actually seen?</span>
                <span className="faq-toggle" aria-hidden="true">+</span>
              </button>
              <div className="faq-a">
                <p>An honest one: a patient who landed with a fractured temporary crown after a long flight. We saw her within two hours, milled a replacement that afternoon, and rebooked her connecting flight. She left on time. Most "worst cases" are logistics, not clinical — and we've designed the whole process around catching them before they catch you.</p>
              </div>
            </li>
          </ul>

          <div className="faq-foot" data-reveal>
            <p>Still have a question? WhatsApp us — our branch coordinator replies, usually within an hour.</p>
            <BranchCTA action="whatsapp" className="tm-btn tm-btn-primary magnetic" data-cursor="WhatsApp">
              Message us on WhatsApp
              <span className="arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </BranchCTA>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CONTACT ─────────────────────────── */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
              <span className="eyebrow"><span className="kicker-line"></span>Begin your journey</span>
              <h2 className="display">
                Share your concerns.<br />
                <em>Get a plan</em><br />before you fly.
              </h2>
              <p className="lead">
                Send a few photos and your dental history over WhatsApp. Within 24 hours
                our coordinator returns a full, costed treatment plan — and an itinerary
                for the rest of your trip.
              </p>

              <div className="contact-meta">
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 .5C5.6.5.4 5.6.4 12c0 2 .5 4 1.5 5.7L0 24l6.5-1.8c1.7.9 3.6 1.4 5.5 1.4 6.4 0 11.6-5.1 11.6-11.5C23.6 5.6 18.4.5 12 .5zm6.7 16.4c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.1-2.1-.1-.5-.1-1.1-.3-1.9-.7-3.3-1.4-5.5-4.8-5.7-5-.2-.2-1.4-1.8-1.4-3.5s.9-2.5 1.2-2.8c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.5.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.5-.2.2-.4.4-.2.7.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1.2-.3.9-1.1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2 1 2.3 1.1.3.2.6.2.6.4.2.1.2.8-.1 1.6z"/></svg>
                  </div>
                  <div>
                    <b>WhatsApp Coordinator</b>
                    <span>
                      <BranchCTA action="whatsapp" style={{ background: 'transparent', border: 'none', color: '#25D366', fontWeight: 700, padding: 0, font: 'inherit', cursor: 'pointer', textDecoration: 'underline' }}>
                        Chat with Banani or Banasree
                      </BranchCTA>
                    </span>
                  </div>
                </div>
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div><b>Email</b><span><a href="mailto:drhasan0712@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>drhasan0712@gmail.com</a></span></div>
                </div>
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z"/><circle cx="12" cy="9" r="3"/></svg>
                  </div>
                  <div><b>Locations</b><span>Banani Private Suite &amp; Banasree Flagship Hospital</span></div>
                </div>
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                  </div>
                  <div><b>Hours</b><span>3:00 PM – 10:00 PM (Banani: Sun–Thu | Banasree: Fri–Wed)</span></div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-head">
                <span>FORM 01</span>
                <span>Free consultation request</span>
              </div>

              <div className="field">
                <label>01 · Full name</label>
                <input type="text" placeholder="Your full name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>02 · Country</label>
                  <input type="text" placeholder="United Kingdom" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} />
                </div>
                <div className="field">
                  <label>03 · WhatsApp</label>
                  <input type="tel" placeholder="+44 7… " required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
              </div>
              <div className="field">
                <label>04 · Treatment of interest</label>
                <select required value={formData.treatment} onChange={e => setFormData({...formData, treatment: e.target.value})}>
                  <option value="" disabled>Select a treatment…</option>
                  <option value="Dental implants">Dental implants</option>
                  <option value="Full mouth rehabilitation">Full mouth rehabilitation</option>
                  <option value="Smile makeover">Smile makeover</option>
                  <option value="Zirconia crowns & veneers">Zirconia crowns & veneers</option>
                  <option value="Orthodontics & aligners">Orthodontics & aligners</option>
                  <option value="Root canal">Root canal</option>
                  <option value="Not sure — please advise">Not sure — please advise</option>
                </select>
              </div>
              <div className="field">
                <label>05 · Tell us briefly</label>
                <textarea rows={3} placeholder="Pain, broken tooth, cosmetic concern, current dental records you can share…" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
              </div>

              {error && <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}

              <button type="submit" className="tm-btn tm-btn-primary block magnetic" data-cursor="Send" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending...' : 'Send my request'}
                <span className="arrow" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </button>

              <div className="form-foot">
                We reply within 24 hours. No spam, ever. Your records stay private and encrypted.
              </div>

              <div className={`form-success${formSubmitted ? ' show' : ''}`}>
                <div className="ok-tick">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 13l4 4L20 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <b>Request received.</b>
                <span>Our coordinator will WhatsApp you within 24 hours with a personalised plan.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer is rendered by the existing Next.js site layout — not included here. */}

    </div>
  );
}

/* ========================================================================
   ALL INTERACTIONS — extracted from tourism.js
   GSAP timelines + scroll-trigger reveals + custom cursor + loader
   + chapter spine + FAQ accordion + 3D tilt + magnetic CTAs.
   ======================================================================== */

function initDentalTourism() {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader = document.getElementById('loader');

  /* ── Loader intro ── */
  document.documentElement.style.overflow = 'hidden';
  const wipeLoader = () => {
    if (!loader) return Promise.resolve();
    const mark = loader.querySelector('.loader-mark');
    const line = loader.querySelector('.loader-line');
    const text = loader.querySelector('.loader-text');
    const wipe = loader.querySelector('.loader-wipe');
    return new Promise<void>((resolve) => {
      const tl = gsap.timeline({
        onComplete: () => {
          loader.classList.add('hidden');
          gsap.set(loader, { display: 'none' });
          resolve();
        },
      });
      tl.to(mark, { opacity: 1, duration: 0.55, ease: 'expo.out' })
        .to(line, { width: 48, duration: 0.5, ease: 'expo.out' }, '-=0.2')
        .to(text, { opacity: 1, duration: 0.45 }, '-=0.25')
        .to({}, { duration: 0.35 })
        .to([mark, line, text], { opacity: 0, y: -10, duration: 0.4, ease: 'power2.in', stagger: 0.04 })
        .to(wipe, { height: '100%', duration: 0.8, ease: 'expo.inOut' }, '-=0.2')
        .set(loader, { y: '-100%' });
    });
  };
  wipeLoader().then(() => { document.documentElement.style.overflow = ''; });
  setTimeout(() => { document.documentElement.style.overflow = ''; }, 3500);

  /* ── Hero entrance ── */
  if (!prefersReducedMotion) {
    const words = document.querySelectorAll('.tm-title .w');
    gsap.set(words, { yPercent: 110, opacity: 0, rotateX: -25, transformOrigin: '0% 100%' });
    gsap.set('.hero-eyebrow', { y: 20, opacity: 0 });
    gsap.set('.tm-sub, .tm-actions, .scroll-hint', { y: 30, opacity: 0 });
    gsap.set('#heroStats', { y: 60, opacity: 0 });

    const heroDelay = loader ? 1.5 : 0.1;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: heroDelay });
    tl.to('.hero-eyebrow', { y: 0, opacity: 1, duration: 0.9 }, 0)
      .to(words, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.08 }, 0.15)
      .to('.tm-sub', { y: 0, opacity: 1, duration: 0.9 }, '-=0.5')
      .to('.tm-actions', { y: 0, opacity: 1, duration: 0.8 }, '-=0.65')
      .to('.scroll-hint', { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
      .to('#heroStats', { y: 0, opacity: 1, duration: 1.0 }, '-=0.6');
  } else {
    gsap.set('.tm-title .w, .hero-eyebrow, .tm-sub, .tm-actions, .scroll-hint, #heroStats', {
      yPercent: 0, y: 0, opacity: 1, rotateX: 0, scale: 1,
    });
  }

  /* ── Parallax + Ken Burns ── */
  if (!prefersReducedMotion) {
    // 1. Hero background deep scrub (parallax only, no scale to prevent conflict)
    gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    }).fromTo('.hero-bg-img', { yPercent: 0 }, {
      yPercent: 25, ease: 'none'
    });
    // 2. Hero content opposing scrub (creates deep 3D separation)
    gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    }).to('.hero-content', {
      yPercent: -15, opacity: 0, ease: 'none'
    });
    // 3. Gentle ambient breathing for the hero image (Scale only!)
    gsap.to('.hero-bg-img', { scale: 1.05, duration: 18, ease: 'sine.inOut', yoyo: true, repeat: -1 });

    // 4. Parallax on all reason art containers
    document.querySelectorAll<HTMLElement>('.reason-art').forEach((el) => {
      gsap.fromTo(el,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
    
    // 5. Parallax on doctor portraits
    document.querySelectorAll<HTMLElement>('.doctor-slot').forEach((el) => {
      gsap.fromTo(el,
        { y: 15, scale: 1.02 },
        {
          y: -15, scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.doctor-card') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    });
  }

  /* ── Counters ── */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    }).to(obj, {
      v: target, duration: 2.2, ease: 'expo.out',
      onUpdate: () => {
        const v = Math.round(obj.v);
        el.textContent = (v >= 1000 ? v.toLocaleString() : v.toString()) + suffix;
      },
    });
  });

  /* ── Comparison morphing prices ── */
  document.querySelectorAll<HTMLElement>('.cmp-price').forEach((el) => {
    const from = parseFloat(el.dataset.from || '0');
    const to = parseFloat(el.dataset.to || '0');
    const prefix = el.dataset.prefix || '';
    el.textContent = prefix + from.toLocaleString();
    const obj = { v: from };
    gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    }).to(obj, {
      v: to, duration: 2.5, ease: 'expo.inOut',
      onUpdate: () => { el.textContent = prefix + Math.round(obj.v).toLocaleString(); },
    });
  });
  document.querySelectorAll<HTMLElement>('[data-savings]').forEach((el) => {
    const target = parseInt(el.dataset.savings || '0', 10);
    const obj = { v: 0 };
    gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    }).to(obj, {
      v: target, duration: 2, ease: 'expo.out',
      onUpdate: () => { el.textContent = String(Math.round(obj.v)); },
    });
  });

  /* ── Generic reveal ── */
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => el.classList.add('in-view'),
      }
    }).from(el, {
      y: 60, opacity: 0, duration: 1.1, ease: 'expo.out', delay: (i % 3) * 0.05
    });
  });

  /* ── Reason cards: clip-path art reveals ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.reason').forEach((reason) => {
      const art = reason.querySelector('.reason-art');
      const copy = reason.querySelector('.reason-copy');
      const num = reason.querySelector('.reason-num');
      const tag = reason.querySelector('.reason-tag');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: reason, start: 'top 78%', once: true,
          onEnter: () => reason.classList.add('in-view') },
      });
      if (num) tl.from(num, { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0);
      if (tag) tl.from(tag, { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0.1);
      if (art) tl.from(art, { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'expo.out' }, 0.05);
      if (copy) tl.from(copy.querySelectorAll('h3, p, .reason-stats'), {
        y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out',
      }, 0.25);
    });
  }

  /* ── BD opener headline ── */
  if (!prefersReducedMotion) {
    const bdWords = document.querySelectorAll('.bd-headline .w');
    if (bdWords.length) {
      gsap.set(bdWords, { yPercent: 110, opacity: 0, rotateX: -20, transformOrigin: '0% 100%' });
      gsap.timeline({
        scrollTrigger: { trigger: '.bd-headline', start: 'top 80%', once: true }
      }).to(bdWords, {
        yPercent: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.08, ease: 'expo.out'
      });
    }
    gsap.timeline({
      scrollTrigger: { trigger: '.bd-map', start: 'top 85%', once: true }
    }).from('.bd-map', {
      opacity: 0, scale: 0.7, rotate: -10, duration: 1.4, ease: 'expo.out'
    });
    gsap.timeline({
      scrollTrigger: { trigger: '.bd-lede', start: 'top 85%', once: true }
    }).from('.bd-lede', {
      y: 30, opacity: 0, duration: 1, ease: 'expo.out'
    });
  }

  /* ── Trip math ── */
  if (!prefersReducedMotion) {
    gsap.timeline({
      scrollTrigger: { trigger: '.tm-compare', start: 'top 80%', once: true }
    }).from('.tm-side', {
      y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'expo.out'
    });
    gsap.timeline({
      scrollTrigger: { trigger: '.tm-compare', start: 'top 80%', once: true }
    }).from('.tm-vs', {
      scale: 0.4, opacity: 0, duration: 1.4, ease: 'elastic.out(1, .5)', delay: 0.4
    });
  }

  /* ── Section headlines (whole-block fade) ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.section-head .display').forEach((h) => {
      gsap.timeline({
        scrollTrigger: { trigger: h, start: 'top 85%', once: true }
      }).from(h, {
        y: 50, opacity: 0, duration: 1.1, ease: 'expo.out'
      });
    });
  }

  /* ── Journey plane path ── */
  if (!prefersReducedMotion && MotionPathPlugin) {
    gsap.set('#planeIcon', { transformOrigin: '50% 50%' });
    gsap.timeline({
      scrollTrigger: { trigger: '.journey', start: 'top 65%', end: 'bottom 50%', scrub: 1.2 }
    }).to('#planeIcon', {
      motionPath: { path: '#planePath', align: '#planePath', autoRotate: true, alignOrigin: [0.5, 0.5] },
      ease: 'power1.inOut', duration: 4
    });
    const path = document.getElementById('planePath') as unknown as SVGPathElement | null;
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      gsap.timeline({
        scrollTrigger: { trigger: '.journey', start: 'top 65%', end: 'bottom 50%', scrub: 1.2 }
      }).to(path, {
        strokeDashoffset: 0, ease: 'none'
      });
    }
  }

  /* ── Journey steps ── */
  if (!prefersReducedMotion) {
    gsap.timeline({
      scrollTrigger: { trigger: '.steps', start: 'top 80%', once: true }
    }).from('[data-step]', {
      y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out'
    });
  }

  /* ── Beyond the chair: SVG parallax ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.bg-card').forEach((card) => {
      const art = card.querySelector('.bg-art svg');
      if (!art) return;
      gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true }
      }).fromTo(art,
        { yPercent: -6, scale: 1.08 },
        { yPercent: 6, scale: 1.08, ease: 'none' }
      );
    });
  }

  /* ── Pull quote: scroll-driven horizontal ── */
  const pqTrack = document.getElementById('pqTrack');
  if (pqTrack) {
    gsap.timeline({
      scrollTrigger: { trigger: '.pullquote', start: 'top bottom', end: 'bottom top', scrub: 1.2 }
    }).fromTo(pqTrack, { x: '5%' }, {
      x: '-55%', ease: 'none'
    });
  }

  /* ── Day One steps ── */
  if (!prefersReducedMotion) {
    gsap.timeline({
      scrollTrigger: { trigger: '.d1-timeline', start: 'top 80%', once: true }
    }).from('[data-d1]', {
      x: -30, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out'
    });
  }

  /* ── Standards spec rows ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.spec').forEach((spec) => {
      const head = spec.querySelector('.spec-head');
      const copy = spec.querySelector('.spec-copy');
      const brands = spec.querySelectorAll('.brand-list li');
      const tl = gsap.timeline({ scrollTrigger: { trigger: spec, start: 'top 80%', once: true } });
      if (head) tl.from(head, { y: 24, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0);
      if (copy) tl.from(copy.children, { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' }, 0.1);
      if (brands.length) tl.from(brands, { x: 30, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'expo.out' }, 0.2);
    });
  }

  /* ── Trust marks ── */
  if (!prefersReducedMotion) {
    gsap.timeline({
      scrollTrigger: { trigger: '.std-trust', start: 'top 88%', once: true }
    }).from('.trust-mark', {
      y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out'
    });
  }

  /* ── Magnetic CTAs ── */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('.magnetic').forEach((buttonEl) => {
      const strength = 16;
      buttonEl.addEventListener('mousemove', (e) => {
        const r = buttonEl.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        gsap.to(buttonEl, { x: (x / r.width) * strength, y: (y / r.height) * strength, duration: 0.4, ease: 'power3.out' });
      });
      buttonEl.addEventListener('mouseleave', () => gsap.to(buttonEl, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }));
    });
  }

  /* ── 3D tilt ── */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
      const max = 7;
      let frame: number | null = null;
      card.style.transformStyle = 'preserve-3d';
      card.style.willChange = 'transform';
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          card.style.transform = `perspective(1100px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(-4px)`;
        });
      });
      card.addEventListener('mouseleave', () => {
        if (frame) cancelAnimationFrame(frame);
        card.style.transform = '';
      });
    });
  }

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach((o) => {
        o.classList.remove('open');
        o.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ── Chapter spine ── */
  const spine = document.getElementById('chapterSpine');
  if (spine) {
    const links = Array.from(spine.querySelectorAll<HTMLAnchorElement>('a[data-anchor]'));
    const anchors = links
      .map((a) => ({ link: a, target: document.getElementById(a.dataset.anchor || '') }))
      .filter((x): x is { link: HTMLAnchorElement; target: HTMLElement } => !!x.target);
    const updSpine = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let active = anchors[0];
      for (const a of anchors) if (a.target.offsetTop <= y) active = a;
      links.forEach((l) => l.classList.toggle('active', l === active.link));
    };
    window.addEventListener('scroll', updSpine, { passive: true });
    window.addEventListener('resize', updSpine);
    updSpine();
    const heroEl = document.getElementById('hero');
    const updVis = () => {
      if (!heroEl) { spine.classList.add('ready'); return; }
      spine.classList.toggle('ready', window.scrollY > heroEl.offsetHeight * 0.6);
    };
    window.addEventListener('scroll', updVis, { passive: true });
    updVis();
  }

  /* ── Scroll progress ── */
  const sp = document.getElementById('scrollProgress');
  const updScrollProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (sp) sp.style.width = pct + '%';
  };
  window.addEventListener('scroll', updScrollProgress, { passive: true });
  window.addEventListener('resize', updScrollProgress);
  updScrollProgress();

  /* ── Sticky CTA ── */
  const stickyCta = document.getElementById('stickyCta');
  const heroEl = document.getElementById('hero');
  const contactEl = document.getElementById('contact');
  const updSticky = () => {
    if (!stickyCta || !heroEl) return;
    const inHero = window.scrollY < heroEl.offsetHeight - 200;
    const inContact = !!(contactEl && window.scrollY + window.innerHeight > contactEl.offsetTop + 200);
    stickyCta.classList.toggle('show', !inHero && !inContact);
  };
  window.addEventListener('scroll', updSticky, { passive: true });
  window.addEventListener('resize', updSticky);
  updSticky();

  /* ── Custom cursor ── */
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  if (cursor && window.matchMedia('(hover: hover)').matches && window.innerWidth > 900) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const ring = cursor.querySelector<HTMLElement>('.cursor-ring');
    const dot = cursor.querySelector<HTMLElement>('.cursor-dot');
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      if (!cursor.classList.contains('ready')) cursor.classList.add('ready');
    });
    window.addEventListener('mouseleave', () => cursor.classList.remove('ready'));
    window.addEventListener('mouseenter', () => cursor.classList.add('ready'));
    const raf = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (cursorLabel) cursorLabel.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    };
    raf();
    const HOVERABLE = 'a, button, [data-cursor], .treat-row, .why-card, .bg-card, .rev, .doctor-card, input, select, textarea, .tag, .stat, .step';
    document.addEventListener('mouseover', (e) => {
      const t = (e.target as HTMLElement)?.closest?.(HOVERABLE) as HTMLElement | null;
      if (!t) return;
      const label = t.dataset.cursor || '';
      cursor.classList.add('hover');
      if (label) { if (cursorLabel) cursorLabel.textContent = label; cursor.classList.add('has-label'); }
      else { cursor.classList.remove('has-label'); }
    });
    document.addEventListener('mouseout', (e) => {
      const t = (e.target as HTMLElement)?.closest?.(HOVERABLE);
      if (!t) return;
      cursor.classList.remove('hover', 'has-label');
    });
  }

  if (prefersReducedMotion) {
    if (loader) loader.style.display = 'none';
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((c) => { c.style.transform = ''; });
    if (cursor) cursor.style.display = 'none';
  }
}

function initFallback() {
  document.documentElement.style.overflow = '';
  document.querySelectorAll<HTMLElement>('[data-reveal], .tm-title .w, .hero-eyebrow, .tm-sub, .tm-actions, .scroll-hint')
    .forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const t = parseInt(el.dataset.count || '0', 10);
    el.textContent = (t >= 1000 ? t.toLocaleString() : String(t)) + (el.dataset.suffix || '');
  });
  document.querySelectorAll<HTMLElement>('[data-savings]').forEach((el) => { el.textContent = el.dataset.savings || ''; });
  document.querySelectorAll<HTMLElement>('.cmp-price').forEach((el) => {
    el.textContent = (el.dataset.prefix || '') + parseInt(el.dataset.to || '0', 10).toLocaleString();
  });
  const loader = document.getElementById('loader');
  if (loader) loader.style.display = 'none';
}
