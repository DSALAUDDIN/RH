'use client';

/**
 * Dental tourism landing page (client component).
 * GSAP timelines, scroll-triggered reveals and cursor effects are set up in
 * useDentalTourismEffects(). Navbar and footer come from the root layout.
 */

import { useEffect, useState } from 'react';
import './tourism.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import BranchCTA from '@/components/branch/BranchCTA';

/* eslint-disable @next/next/no-img-element */

export default function DentalTourism() {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    phone: '',
    treatment: '',
    message: '',
  });
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
          message: `[Dental Tourism Request]\nCountry: ${formData.country}\nTreatment: ${formData.treatment}\n\n${formData.message}`,
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
      {/* Page-specific display fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Intro loader */}
      <div className="loader" id="loader">
        <div className="loader-inner">
          <span className="loader-mark">RH</span>
          <span className="loader-line"></span>
          <span className="loader-text">Dental Care · Dhaka · Bangladesh</span>
        </div>
        <div className="loader-wipe"></div>
      </div>

      {/* Scroll progress */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Custom cursor */}
      <div className="cursor" id="cursor" aria-hidden="true">
        <div className="cursor-ring"></div>
        <div className="cursor-dot"></div>
        <div className="cursor-label" id="cursorLabel"></div>
      </div>

      {/* Chapter spine */}
      <aside className="spine" id="chapterSpine" aria-hidden="true">
        <ol>
          <li>
            <a href="#hero" data-anchor="hero">
              <span className="sp-dot"></span>
              <span className="sp-label">Welcome</span>
            </a>
          </li>
          <li>
            <a href="#partnership" data-anchor="partnership">
              <span className="sp-dot"></span>
              <span className="sp-label">RH × Alif Tours</span>
            </a>
          </li>
          <li>
            <a href="#why" data-anchor="why">
              <span className="sp-dot"></span>
              <span className="sp-label">Why Bangladesh</span>
            </a>
          </li>
          <li>
            <a href="#standards" data-anchor="standards">
              <span className="sp-dot"></span>
              <span className="sp-label">Standards</span>
            </a>
          </li>
          <li>
            <a href="#treatments" data-anchor="treatments">
              <span className="sp-dot"></span>
              <span className="sp-label">Treatments</span>
            </a>
          </li>
          <li>
            <a href="#cases" data-anchor="cases">
              <span className="sp-dot"></span>
              <span className="sp-label">Smile Gallery</span>
            </a>
          </li>
          <li>
            <a href="#journey" data-anchor="journey">
              <span className="sp-dot"></span>
              <span className="sp-label">7-Step Journey</span>
            </a>
          </li>
          <li>
            <a href="#booking-options" data-anchor="booking-options">
              <span className="sp-dot"></span>
              <span className="sp-label">2 Ways to Book</span>
            </a>
          </li>
          <li>
            <a href="#campaign-video" data-anchor="campaign-video">
              <span className="sp-dot"></span>
              <span className="sp-label">Campaign Film</span>
            </a>
          </li>
          <li>
            <a href="#team" data-anchor="team">
              <span className="sp-dot"></span>
              <span className="sp-label">Specialists</span>
            </a>
          </li>
          <li>
            <a href="#beyond" data-anchor="beyond">
              <span className="sp-dot"></span>
              <span className="sp-label">Beyond Dhaka</span>
            </a>
          </li>
          <li>
            <a href="#faq" data-anchor="faq">
              <span className="sp-dot"></span>
              <span className="sp-label">FAQ</span>
            </a>
          </li>
          <li>
            <a href="#contact" data-anchor="contact">
              <span className="sp-dot"></span>
              <span className="sp-label">Book</span>
            </a>
          </li>
        </ol>
      </aside>

      {/* Sticky bottom CTA */}
      <a href="#contact" className="sticky-cta" id="stickyCta" data-cursor="Book">
        <span className="sc-dot"></span>
        <span className="sc-label">Free consultation</span>
        <span className="sc-arrow">
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
          >
            <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
          <div className="hero-partnership-badge" data-anim="kicker">
            <span className="badge-pill">RH DENTAL CARE</span>
            <span className="badge-x">×</span>
            <span className="badge-pill partner">ALIF GLOBAL TOURS &amp; TRAVELS</span>
          </div>

          <div className="hero-eyebrow" data-anim="kicker">
            <span className="kicker-line"></span>
            <span>DENTAL TOURISM IN BANGLADESH · One Seamless Journey</span>
            <span className="kicker-bd">🇧🇩</span>
          </div>

          <h1 className="tm-title" data-anim="title">
            <span className="line">
              <span className="w">Specialist</span>
            </span>
            <span className="line">
              <span className="w">dentistry,</span> <span className="w">in</span>{' '}
              <span className="w">the</span>
            </span>
            <span className="line">
              <span className="w it">heart of Dhaka.</span>
            </span>
          </h1>

          <p className="tm-sub" data-anim="fade">
            Internationally-trained specialists. 3D digital workflows. A premium 3,500 sq.ft clinic
            — with coordinated care for visiting patients.
          </p>

          <div className="tm-actions" data-anim="fade">
            <a className="tm-btn tm-btn-primary magnetic" href="#contact" data-cursor="Book">
              Start my treatment plan
              <span className="arrow" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a className="tm-btn tm-btn-ghost magnetic" href="#treatments" data-cursor="View">
              View treatments
            </a>
          </div>
        </div>

        {/* hero stats marquee */}
        <div className="hero-stats" id="heroStats">
          <div className="container hero-stats-inner">
            <div className="stat">
              <div className="stat-num" data-count="12" data-suffix="+">
                0
              </div>
              <div className="stat-lab">Years of practice</div>
            </div>

            <div className="stat">
              <div className="stat-num">
                4.9<span className="unit">★</span>
              </div>
              <div className="stat-lab">Google rating</div>
            </div>
            <div className="stat">
              <div className="stat-num">
                <span data-count="500">0</span>
                <span className="unit">+</span>
              </div>
              <div className="stat-lab">5-star reviews</div>
            </div>
          </div>
        </div>

        <div className="scroll-hint" data-anim="fade">
          <span>Scroll</span>
          <span className="hint-line"></span>
        </div>
      </section>

      {/* Why Bangladesh */}
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
              <span className="line">
                <span className="w">A direct flight</span>
              </span>
              <span className="line">
                <span className="w it">to considered</span>
              </span>
              <span className="line">
                <span className="w">dentistry.</span>
              </span>
            </h2>

            <div className="bd-lede-wrap">
              <p className="bd-lede">
                Eight reasons international patients are quietly choosing Dhaka over London, New
                York or Dubai — and why most of them come back.
              </p>
              <svg className="bd-map" viewBox="0 0 120 140" fill="none" aria-hidden="true">
                {/* abstract outline of Bangladesh */}
                <path
                  d="M30 8 Q 50 4 65 10 Q 78 16 80 28 Q 88 32 92 42 Q 96 56 88 64 Q 96 72 90 84 Q 84 96 78 100 Q 86 110 78 120 Q 70 128 56 126 Q 44 132 30 126 Q 22 118 24 108 Q 14 100 18 88 Q 14 76 22 68 Q 16 56 24 48 Q 18 34 28 24 Q 24 14 30 8 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle cx="56" cy="60" r="2.5" fill="currentColor" className="bd-map-pin" />
                <circle
                  cx="56"
                  cy="60"
                  r="6"
                  stroke="currentColor"
                  strokeWidth=".5"
                  fill="none"
                  className="bd-map-ring"
                />
                <text
                  x="62"
                  y="62"
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="5"
                  fill="currentColor"
                >
                  DHAKA
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Eight reasons as alternating editorial spreads */}
        <div className="container bd-reasons">
          {/* 01 — Geography */}
          <article className="reason" data-reason data-reveal>
            <header className="reason-head">
              <span className="reason-num">01</span>
              <span className="reason-tag">Geography & access</span>
            </header>
            <div className="reason-grid">
              <div className="reason-copy">
                <h3>
                  At the centre of the
                  <br />
                  <em>Asian air map.</em>
                </h3>
                <p>
                  Dhaka has daily direct flights from London, Dubai, Doha, Singapore, Bangkok,
                  Istanbul, Kuala Lumpur and Riyadh — and the major Indian metros are short hops
                  away. Wherever you are, you're closer than you think.
                </p>
                <div className="reason-stats">
                  <div>
                    <b>18+</b>
                    <span>Direct international cities</span>
                  </div>
                  <div>
                    <b>9h</b>
                    <span>From London</span>
                  </div>
                  <div>
                    <b>4h</b>
                    <span>From Dubai</span>
                  </div>
                </div>
              </div>
              <div className="reason-art art-flights">
                <svg viewBox="0 0 400 400" aria-hidden="true">
                  <defs>
                    <radialGradient id="dhaka-glow">
                      <stop offset="0%" stopColor="#0073e6" stopOpacity=".5" />
                      <stop offset="100%" stopColor="#0073e6" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* compass rose background */}
                  <circle
                    cx="200"
                    cy="200"
                    r="170"
                    stroke="rgba(216,205,180,.5)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="2 4"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="120"
                    stroke="rgba(216,205,180,.4)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="70"
                    stroke="rgba(216,205,180,.3)"
                    strokeWidth="1"
                    fill="none"
                  />
                  {/* city dots + arcs */}
                  <g className="rt-flights" stroke="#0073e6" strokeWidth="1.4" fill="none">
                    <path d="M 200 200 Q 100 50 60 90" /> {/* London */}
                    <path d="M 200 200 Q 280 120 330 100" /> {/* Dubai */}
                    <path d="M 200 200 Q 320 300 350 340" /> {/* Singapore */}
                    <path d="M 200 200 Q 80 280 50 320" /> {/* Doha */}
                    <path d="M 200 200 Q 320 60 360 60" /> {/* Istanbul */}
                    <path d="M 200 200 Q 280 360 320 380" /> {/* KL */}
                    <path d="M 200 200 Q 80 100 30 60" /> {/* Riyadh */}
                    <path d="M 200 200 Q 360 240 380 270" /> {/* Bangkok */}
                  </g>
                  {/* city labels */}
                  <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#5a6878">
                    <text x="56" y="80" textAnchor="end">
                      London
                    </text>
                    <text x="334" y="92">
                      Dubai
                    </text>
                    <text x="354" y="350">
                      Singapore
                    </text>
                    <text x="46" y="338">
                      Doha
                    </text>
                    <text x="364" y="52">
                      Istanbul
                    </text>
                    <text x="324" y="392">
                      Kuala Lumpur
                    </text>
                    <text x="26" y="52" textAnchor="end">
                      Riyadh
                    </text>
                    <text x="384" y="282">
                      Bangkok
                    </text>
                  </g>
                  {/* dots */}
                  <g fill="#0073e6">
                    <circle cx="60" cy="90" r="3" />
                    <circle cx="330" cy="100" r="3" />
                    <circle cx="350" cy="340" r="3" />
                    <circle cx="50" cy="320" r="3" />
                    <circle cx="360" cy="60" r="3" />
                    <circle cx="320" cy="380" r="3" />
                    <circle cx="30" cy="60" r="3" />
                    <circle cx="380" cy="270" r="3" />
                  </g>
                  {/* Dhaka center */}
                  <circle cx="200" cy="200" r="40" fill="url(#dhaka-glow)" />
                  <circle cx="200" cy="200" r="6" fill="#c97b2d" />
                  <text
                    x="210"
                    y="204"
                    fontFamily="JetBrains Mono, monospace"
                    fontSize="11"
                    fontWeight="600"
                    fill="#0a1729"
                  >
                    DHAKA
                  </text>
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
                  <div className="lang-line it big">
                    English
                    <br />
                    spoken here.
                  </div>
                </div>
              </div>
              <div className="reason-copy">
                <h3>
                  Treatment in
                  <br />
                  <em>fluent medical English.</em>
                </h3>
                <p>
                  Bangladesh has among the highest English proficiency rates in non‑anglophone Asia.
                  Every doctor, every coordinator, every receptionist at RH Dental works in English
                  by default. No translation app. No "let me get someone."
                </p>
                <div className="reason-stats">
                  <div>
                    <b>EF 60</b>
                    <span>EF EPI Asia 2024</span>
                  </div>
                  <div>
                    <b>100%</b>
                    <span>English-speaking staff</span>
                  </div>
                  <div>
                    <b>4 langs</b>
                    <span>On call: EN · BN · HI · AR</span>
                  </div>
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
                    <div className="cb-month">
                      <span>J</span>
                      <div className="bar" style={{ '--h': '.45' } as React.CSSProperties}></div>
                    </div>
                    <div className="cb-month">
                      <span>F</span>
                      <div className="bar" style={{ '--h': '.5' } as React.CSSProperties}></div>
                    </div>
                    <div className="cb-month">
                      <span>M</span>
                      <div className="bar" style={{ '--h': '.6' } as React.CSSProperties}></div>
                    </div>
                    <div className="cb-month">
                      <span>A</span>
                      <div className="bar" style={{ '--h': '.78' } as React.CSSProperties}></div>
                    </div>
                    <div className="cb-month">
                      <span>M</span>
                      <div
                        className="bar warn"
                        style={{ '--h': '.88' } as React.CSSProperties}
                      ></div>
                    </div>
                    <div className="cb-month">
                      <span>J</span>
                      <div
                        className="bar warn"
                        style={{ '--h': '.92' } as React.CSSProperties}
                      ></div>
                    </div>
                    <div className="cb-month">
                      <span>J</span>
                      <div
                        className="bar wet"
                        style={{ '--h': '.95' } as React.CSSProperties}
                      ></div>
                    </div>
                    <div className="cb-month">
                      <span>A</span>
                      <div
                        className="bar wet"
                        style={{ '--h': '.92' } as React.CSSProperties}
                      ></div>
                    </div>
                    <div className="cb-month">
                      <span>S</span>
                      <div
                        className="bar wet"
                        style={{ '--h': '.85' } as React.CSSProperties}
                      ></div>
                    </div>
                    <div className="cb-month">
                      <span>O</span>
                      <div className="bar" style={{ '--h': '.7' } as React.CSSProperties}></div>
                    </div>
                    <div className="cb-month ideal">
                      <span>N</span>
                      <div
                        className="bar ideal"
                        style={{ '--h': '.55' } as React.CSSProperties}
                      ></div>
                    </div>
                    <div className="cb-month ideal">
                      <span>D</span>
                      <div
                        className="bar ideal"
                        style={{ '--h': '.42' } as React.CSSProperties}
                      ></div>
                    </div>
                  </div>
                  <div className="cb-window">Nov — Mar · ideal window</div>
                  <div className="cb-meta">
                    <span>
                      Avg <b>24°C</b> · 75°F
                    </span>
                    <span className="dot">·</span>
                    <span>
                      Humidity <b>55%</b>
                    </span>
                    <span className="dot">·</span>
                    <span>
                      <b>Dry</b> season
                    </span>
                  </div>
                </div>
              </div>
              <div className="reason-copy">
                <h3>
                  The dry season is
                  <br />
                  <em>genuinely perfect.</em>
                </h3>
                <p>
                  November through March: blue-sky days, low humidity, 21–28°C / 70–82°F. Soft
                  enough for outdoor recovery walks, cool enough for proper sleep. The rest of the
                  year stays warm; only July–August are properly wet.
                </p>
                <div className="reason-stats">
                  <div>
                    <b>Nov–Mar</b>
                    <span>Ideal travel window</span>
                  </div>
                  <div>
                    <b>24°C</b>
                    <span>Avg winter day</span>
                  </div>
                  <div>
                    <b>9/10</b>
                    <span>Sunny days, dry season</span>
                  </div>
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
                <h3>
                  Bridges Middle East,
                  <br />
                  <em>Europe and Asia.</em>
                </h3>
                <p>
                  UTC+6 sits between Europe and East Asia — easy half-day video consults from
                  London, Dubai, Singapore or Mumbai. Pre-treatment reviews happen during your
                  working day, not yours and ours.
                </p>
                <div className="reason-stats">
                  <div>
                    <b>UTC+6</b>
                    <span>Bangladesh standard</span>
                  </div>
                  <div>
                    <b>5h</b>
                    <span>Ahead of London</span>
                  </div>
                  <div>
                    <b>2h</b>
                    <span>Behind Singapore</span>
                  </div>
                </div>
              </div>
              <div className="reason-art art-tz">
                <div className="clocks">
                  <div className="clock">
                    <svg viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" strokeWidth="2" />
                      <line
                        x1="50"
                        y1="50"
                        x2="70"
                        y2="50"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <circle cx="50" cy="50" r="2" fill="currentColor" />
                    </svg>
                    <b>09:00</b>
                    <span>LONDON</span>
                  </div>
                  <div className="clock primary">
                    <svg viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <line x1="50" y1="50" x2="50" y2="22" stroke="currentColor" strokeWidth="2" />
                      <line
                        x1="50"
                        y1="50"
                        x2="72"
                        y2="35"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <circle cx="50" cy="50" r="2" fill="currentColor" />
                    </svg>
                    <b>14:00</b>
                    <span>DHAKA</span>
                  </div>
                  <div className="clock">
                    <svg viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <line x1="50" y1="50" x2="65" y2="20" stroke="currentColor" strokeWidth="2" />
                      <line
                        x1="50"
                        y1="50"
                        x2="72"
                        y2="55"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <circle cx="50" cy="50" r="2" fill="currentColor" />
                    </svg>
                    <b>16:00</b>
                    <span>SINGAPORE</span>
                  </div>
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
                    <div>
                      <span>NAME</span>
                      <b>VISITING PATIENT</b>
                    </div>
                    <div>
                      <span>PURPOSE</span>
                      <b>DENTAL TREATMENT</b>
                    </div>
                    <div>
                      <span>VOA</span>
                      <b>ELIGIBLE · 67 COUNTRIES</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reason-copy">
                <h3>
                  Visa on arrival
                  <br />
                  <em>for medical travel.</em>
                </h3>
                <p>
                  Most Western passport holders qualify for a medical visa on arrival or 30-day
                  e-visa issued same week. Our coordinators handle the paperwork — you arrive, hand
                  over your passport, and walk through.
                </p>
                <div className="reason-stats">
                  <div>
                    <b>30 days</b>
                    <span>Standard medical visa</span>
                  </div>
                  <div>
                    <b>3–5 days</b>
                    <span>e-Visa turnaround</span>
                  </div>
                  <div>
                    <b>67</b>
                    <span>VOA-eligible nationalities</span>
                  </div>
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
                <h3>
                  You'll feel it
                  <br />
                  within an <em>hour of landing.</em>
                </h3>
                <p>
                  The hotel doorman, the rickshaw-wallah, the tea-stall owner — a national instinct
                  to look after a visitor. Our coordinators speak English, Bangla, Hindi and Arabic,
                  and your needs are usually met before you've thought to ask.
                </p>
                <div className="reason-stats">
                  <div>
                    <b>4 langs</b>
                    <span>Spoken at the clinic</span>
                  </div>
                  <div>
                    <b>24/7</b>
                    <span>WhatsApp concierge</span>
                  </div>
                  <div>
                    <b>★ 4.9</b>
                    <span>Google reviews</span>
                  </div>
                </div>
              </div>
              <div className="reason-art art-host">
                <div className="host-quote">
                  <span className="hq-mark">✦</span>
                  <span className="hq-bn">স্বাগতম।</span>
                  <span className="hq-en">Swagatam.</span>
                  <span className="hq-tr">
                    Welcome — spoken on first sight, meant on every visit.
                  </span>
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
                    <pattern
                      id="jamdani"
                      x="0"
                      y="0"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="20" cy="20" r="1.5" fill="#c97b2d" />
                      <path
                        d="M 10 20 L 20 10 L 30 20 L 20 30 Z"
                        stroke="#7a3f0e"
                        strokeWidth=".7"
                        fill="none"
                      />
                      <path
                        d="M 0 20 L 40 20 M 20 0 L 20 40"
                        stroke="#c97b2d"
                        strokeWidth=".3"
                        opacity=".5"
                      />
                    </pattern>
                  </defs>
                  <rect width="400" height="400" fill="#f6f1e8" />
                  <rect width="400" height="400" fill="url(#jamdani)" opacity=".7" />
                  {/* central medallion */}
                  <g transform="translate(200 200)">
                    <circle r="80" stroke="#7a3f0e" strokeWidth="1.5" fill="none" />
                    <circle r="60" stroke="#7a3f0e" strokeWidth=".8" fill="none" />
                    <path
                      d="M -80 0 L -60 0 M 60 0 L 80 0 M 0 -80 L 0 -60 M 0 60 L 0 80"
                      stroke="#7a3f0e"
                      strokeWidth="1.5"
                    />
                    <path d="M 0 -50 Q 30 -30 0 0 Q -30 -30 0 -50 Z" fill="#c97b2d" />
                    <path d="M 0 50 Q 30 30 0 0 Q -30 30 0 50 Z" fill="#c97b2d" />
                    <path d="M -50 0 Q -30 30 0 0 Q -30 -30 -50 0 Z" fill="#c97b2d" opacity=".7" />
                    <path d="M 50 0 Q 30 30 0 0 Q 30 -30 50 0 Z" fill="#c97b2d" opacity=".7" />
                    <circle r="6" fill="#7a3f0e" />
                  </g>
                </svg>
                <div className="jamdani-label">JAMDANI · UNESCO INTANGIBLE HERITAGE</div>
              </div>
              <div className="reason-copy">
                <h3>
                  The world's most
                  <br />
                  <em>underrated food country.</em>
                </h3>
                <p>
                  Hilsa fish, kacchi biryani, fish-head curry, mishti doi, seven-layer tea.
                  UNESCO-protected Jamdani weaving. Mughal-era forts. A four-thousand-year-old
                  riverine culture that has been quietly perfecting itself while the rest of the
                  world wasn't looking.
                </p>
                <div className="reason-stats">
                  <div>
                    <b>3</b>
                    <span>UNESCO heritage sites</span>
                  </div>
                  <div>
                    <b>5</b>
                    <span>Major culinary traditions</span>
                  </div>
                  <div>
                    <b>1</b>
                    <span>Royal Bengal Tiger habitat</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

      </section>

      {/* ─────────────────────────── STRATEGIC PARTNERSHIP: RH × ALIF TOURS ─────────────────────────── */}
      <section className="partnership-section" id="partnership">
        <div className="partner-bg-glow"></div>
        <div className="container">
          <div className="partner-header" data-reveal>
            <span className="eyebrow">
              <span className="kicker-line"></span>Strategic Partnership · Dental Tourism in Bangladesh
            </span>
            <h2 className="partner-main-title">
              RH Dental Care <em>×</em> Alif Global Tours &amp; Travels
            </h2>
            <p className="partner-lead">
              Quality Dental Care. Complete Travel Support. One Seamless Journey. To make your dental
              tourism experience effortless, RH Dental Care has officially partnered with Alif Global
              Tours &amp; Travels to support international patients throughout their journey.
            </p>
          </div>

          <div className="partner-synergy-grid" data-reveal>
            {/* LEFT: RH DENTAL CARE */}
            <article className="partner-card rh-side">
              <span className="partner-card-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Clinical Excellence
              </span>
              <h3 className="partner-card-title">RH Dental Care</h3>
              <div className="partner-card-role">Comprehensive Dental Treatment in Dhaka</div>
              <ul className="partner-feature-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Experienced Dental Professionals:</b> Multi-specialty team for advanced clinical procedures.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Modern Technology:</b> 3D CBCT, digital intraoral scanning, lasers &amp; in-house CAD/CAM.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Multidisciplinary Care:</b> Implants, aligners, cosmetic smile aesthetics, oral surgery &amp; full rehabilitation.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Personalized Treatment Planning:</b> Custom timeline coordinated around your travel schedule.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Two Modern Clinics:</b> State-of-the-art facilities in Banani and Banasree, Dhaka.</span>
                </li>
              </ul>
              <a href="#treatments" className="choice-btn primary">
                Explore Dental Services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>

            {/* RIGHT: ALIF GLOBAL TOURS & TRAVELS */}
            <article className="partner-card alif-side">
              <span className="partner-card-tag">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Travel &amp; Hospitality
              </span>
              <h3 className="partner-card-title">Alif Global Tours &amp; Travels</h3>
              <div className="partner-card-role">Dedicated Travel Support &amp; Concierge</div>
              <ul className="partner-feature-list">
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Visa Assistance:</b> Smooth visa documentation &amp; arrival guidance for international travelers.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Travel Coordination:</b> Flight bookings and itinerary mapped to your clinical visits.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Airport VIP Transfers:</b> Chauffeur greeting upon arrival at Dhaka International Airport (DAC).</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Hotel Accommodation:</b> Handpicked premium hotels near Banani and Banasree branches.</span>
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span><b>Local Transportation:</b> Air-conditioned private rides for clinic sessions and city tours.</span>
                </li>
              </ul>
              <a href="#booking-options" className="choice-btn outline">
                View Full Package Options
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </article>
          </div>

          {/* 6 Core Travel Support Pillars */}
          <div className="travel-support-grid" data-reveal>
            <div className="support-pill-card">
              <div className="support-pill-icon">🛂</div>
              <div>
                <h5>Visa Assistance</h5>
                <p>Guidance with entry requirements and medical travel documentation.</p>
              </div>
            </div>
            <div className="support-pill-card">
              <div className="support-pill-icon">✈️</div>
              <div>
                <h5>Travel Coordination</h5>
                <p>Flight booking and schedule optimization aligned with treatment milestones.</p>
              </div>
            </div>
            <div className="support-pill-card">
              <div className="support-pill-icon">🚘</div>
              <div>
                <h5>Airport Transfers</h5>
                <p>Private chauffeur greeting upon landing in Dhaka and seamless drop-off.</p>
              </div>
            </div>
            <div className="support-pill-card">
              <div className="support-pill-icon">🏨</div>
              <div>
                <h5>Hotel Accommodation</h5>
                <p>Partner boutique &amp; 5-star hotel options within minutes of the clinic.</p>
              </div>
            </div>
            <div className="support-pill-card">
              <div className="support-pill-icon">🚗</div>
              <div>
                <h5>Local Transportation</h5>
                <p>Comfortable, air-conditioned transport for every clinic consultation.</p>
              </div>
            </div>
            <div className="support-pill-card">
              <div className="support-pill-icon">🗓️</div>
              <div>
                <h5>Appointment Sync</h5>
                <p>Direct priority scheduling so you never experience waiting times.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standards & safety */}
      <section className="standards" id="standards">
        <div className="container">
          <div className="chapter" data-reveal>
            <span className="ch-num">CHAPTER 02</span>
            <span className="ch-line"></span>
            <span className="ch-title">Standards & Safety</span>
          </div>

          <div className="std-head">
            <h2 className="display" data-reveal>
              International standards.
              <br />
              <em>Personal care.</em>
            </h2>
            <p className="lead" data-reveal>
              Our team combines established implant systems, sterilisation protocols and digital planning with personal support throughout your visit.
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
                  <h3>
                    Premium implant systems
                    <br />
                    <em>only.</em>
                  </h3>
                  <p>
                    We work exclusively with the systems backed by 30+ years of clinical data and
                    the strongest osseointegration outcomes. Generic implants stay in their boxes.
                  </p>
                </div>
                <ul className="brand-list">
                  <li>
                    <b>Straumann</b>
                    <span>Switzerland · Roxolid®</span>
                  </li>
                  <li>
                    <b>Nobel Biocare</b>
                    <span>Sweden · TiUnite® surface</span>
                  </li>
                  <li>
                    <b>Osstem</b>
                    <span>Korea · TS III SA</span>
                  </li>
                  <li>
                    <b>Dentium</b>
                    <span>Korea · SuperLine</span>
                  </li>
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
                  <h3>
                    Veneers and crowns,
                    <br />
                    <em>milled on site.</em>
                  </h3>
                  <p>
                    Our CAD/CAM lab uses German and Liechtenstein ceramics. Faster turnarounds,
                    tighter quality control, no shipping delays — and crucially, no surprise
                    generics.
                  </p>
                </div>
                <ul className="brand-list">
                  <li>
                    <b>Ivoclar</b>
                    <span>Liechtenstein · e.max® Press</span>
                  </li>
                  <li>
                    <b>VITA</b>
                    <span>Germany · Suprinity ZLS</span>
                  </li>
                  <li>
                    <b>Upcera</b>
                    <span>Multilayer zirconia</span>
                  </li>
                  <li>
                    <b>3M Filtek</b>
                    <span>Composite & bonding</span>
                  </li>
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
                  <h3>
                    The same B-class autoclave
                    <br />
                    <em>as a London hospital.</em>
                  </h3>
                  <p>
                    EN-13060 compliant Class-B steam sterilisation, single-use disposables for all
                    invasive procedures, and a separate decontamination room. Every load is logged
                    with a timestamp and operator signature.
                  </p>
                </div>
                <ul className="brand-list">
                  <li>
                    <b>Class B autoclave</b>
                    <span>EN 13060 · 134°C / 18 min</span>
                  </li>
                  <li>
                    <b>Single-use protocol</b>
                    <span>Bibs · gloves · burs · syringes</span>
                  </li>
                  <li>
                    <b>Cold sterilisation</b>
                    <span>Glutaraldehyde for handpieces</span>
                  </li>
                  <li>
                    <b>HEPA filtration</b>
                    <span>In every treatment room</span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="spec" data-reveal>
              <header className="spec-head">
                <span className="spec-num">D · Aftercare</span>
                <span className="spec-tag tag-care">Follow-up</span>
              </header>
              <div className="spec-grid">
                <div className="spec-copy">
                  <h3>
                    The work doesn't end
                    <br />
                    at <em>departure.</em>
                  </h3>
                  <p>
                    Every restoration carries the manufacturer's warranty options as specified by
                    the implant maker. We carry that documentation for you, with a
                    written record of every fixture used.
                  </p>
                </div>
                <ul className="brand-list">
                  <li>
                    <b>Implant warranty</b>
                    <span>Manufacturer-backed (by brand)</span>
                  </li>
                  <li>
                    <b>Crown warranty</b>
                    <span>Longevity guidance on zirconia</span>
                  </li>
                  <li>
                    <b>Digital records</b>
                    <span>Released to you, encrypted</span>
                  </li>
                  <li>
                    <b>Emergency line</b>
                    <span>WhatsApp · 24/7 · 7 days</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>

          {/* Trust marks row */}
          <div className="std-trust" data-reveal>
            <div className="trust-mark">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M30 5 L 50 18 L 50 36 Q 50 50 30 56 Q 10 50 10 36 L 10 18 Z" />
                <path d="M22 30 L 28 36 L 40 22" />
              </svg>
              <div>
                <b>BMDC certified</b>
                <span>Bangladesh Medical & Dental Council</span>
              </div>
            </div>
            <div className="trust-mark">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="30" cy="30" r="22" />
                <path d="M30 12v18l12 6" />
              </svg>
              <div>
                <b>EN 13060</b>
                <span>Class B autoclave standard</span>
              </div>
            </div>
            <div className="trust-mark">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="10" y="10" width="40" height="40" rx="3" />
                <path d="M18 22h24M18 30h24M18 38h16" />
              </svg>
              <div>
                <b>ISO 13485</b>
                <span>Medical device QMS lab partner</span>
              </div>
            </div>
            <div className="trust-mark">
              <svg
                viewBox="0 0 60 60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M30 8 L 36 22 L 52 24 L 40 35 L 44 50 L 30 42 L 16 50 L 20 35 L 8 24 L 24 22 Z" />
              </svg>
              <div>
                <b>FDS RCPS</b>
                <span>Glasgow fellowship · clinical advisor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="treatments" id="treatments">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              <span className="kicker-line"></span>Comprehensive treatments
            </span>
            <h2 className="display">
              Everything
              <br />
              under <em>one roof.</em>
            </h2>
            <p className="lead">
              From cosmetic smile makeovers to complex full‑mouth rehabilitation — delivered in a
              single, advanced facility with an in-house lab and digital workflow.
            </p>
          </div>

          <div className="treat-list" id="treatList">
            <a href="#contact" key="0" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">01 —</div>
              <div className="treat-title">
                <span className="glyph">🦷</span>Dental Implants
              </div>
              <div className="treat-desc">
                Single, multiple and full-arch implants. Premium systems, 3D guided surgery,
                same-day loading where indicated.
              </div>
              <div className="treat-badge">Most popular</div>
            </a>
            <a href="#contact" key="1" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">02 —</div>
              <div className="treat-title">
                <span className="glyph">✨</span>Smile Makeover
              </div>
              <div className="treat-desc">
                Digital smile design, zirconia veneers, whitening and composite bonding for a
                complete aesthetic transformation.
              </div>
              <div className="treat-badge">High demand</div>
            </a>
            <a href="#contact" key="2" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">03 —</div>
              <div className="treat-title">
                <span className="glyph">🔩</span>Zirconia Crowns & Veneers
              </div>
              <div className="treat-desc">
                Ultra-thin, metal-free ceramic restorations crafted in our in-house lab for natural
                aesthetics and superior durability.
              </div>
              <div className="treat-badge">In-house lab</div>
            </a>
            <a href="#contact" key="3" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">04 —</div>
              <div className="treat-title">
                <span className="glyph">🦴</span>Full Mouth Rehabilitation
              </div>
              <div className="treat-desc">
                Comprehensive digital treatment planning that restores function and aesthetics —
                tailored to international timelines.
              </div>
              <div className="treat-badge">Complex cases</div>
            </a>
            <a href="#contact" key="4" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">05 —</div>
              <div className="treat-title">
                <span className="glyph">📐</span>Orthodontics & Aligners
              </div>
              <div className="treat-desc">
                Invisalign-style clear aligners and modern ceramic braces. Remote monitoring
                available for international follow-up.
              </div>
              <div className="treat-badge">All ages</div>
            </a>
            <a href="#contact" key="5" className="treat-row" data-reveal data-cursor="View">
              <div className="treat-num">06 —</div>
              <div className="treat-title">
                <span className="glyph">🔬</span>Microscopic Root Canal
              </div>
              <div className="treat-desc">
                Single-visit endodontic therapy under local anaesthetic, using an operating
                microscope so canals are seen rather than felt for.
              </div>
              <div className="treat-badge">Microscope</div>
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── CLINICAL CASES & SMILE GALLERY ─────────────────────────── */}
      <section className="cases-section" id="cases">
        <div className="container">
          <div className="cases-header" data-reveal>
            <span className="eyebrow">
              <span className="kicker-line"></span>Real Clinical Cases · Dhaka Branches
            </span>
            <h2>
              Real Transformations, <em>Proven Outcomes.</em>
            </h2>
            <p>
              Explore actual clinical cases performed by our specialist dental surgeons across our
              Banani and Banasree branches. From subtle aesthetic alignments to complete functional
              smile rehabilitations.
            </p>
          </div>

          <div className="cases-grid" data-reveal>
            {/* Case 01: Composite Restoration */}
            <article className="case-card">
              <div className="case-image-frame">
                <img
                  src="/assets/cases/composite-restoration.png"
                  alt="Composite Restoration - Before and After - RH Dental Care"
                  loading="lazy"
                />
                <span className="case-branch-badge">Banasree &amp; Banani</span>
              </div>
              <div className="case-info">
                <span className="case-category">Restorative Dentistry</span>
                <h4 className="case-title">Composite Restoration</h4>
                <p className="case-desc">
                  Conservative rebuild of worn and fractured incisal enamel using advanced nanohybrid
                  composite layering to recreate natural light reflection and dental strength.
                </p>
                <div className="case-highlights">
                  <span className="case-highlight-tag">Natural Aesthetics</span>
                  <span className="case-highlight-tag">Strength &amp; Durability</span>
                  <span className="case-highlight-tag">Minimally Invasive</span>
                </div>
              </div>
            </article>

            {/* Case 02: Midline Diastema Closure */}
            <article className="case-card">
              <div className="case-image-frame">
                <img
                  src="/assets/cases/midline-diastema-closure.png"
                  alt="Midline Diastema Closer - Before and After - RH Dental Care"
                  loading="lazy"
                />
                <span className="case-branch-badge">Cosmetic Smile Care</span>
              </div>
              <div className="case-info">
                <span className="case-category">Cosmetic Dentistry</span>
                <h4 className="case-title">Midline Diastema Closure</h4>
                <p className="case-desc">
                  Seamless gap closure preserving original healthy tooth structure. Restores harmonious
                  smile symmetry and natural proportions in just one coordinated appointment.
                </p>
                <div className="case-highlights">
                  <span className="case-highlight-tag">Better Alignment</span>
                  <span className="case-highlight-tag">Zero Drill</span>
                  <span className="case-highlight-tag">Immediate Confidence</span>
                </div>
              </div>
            </article>

            {/* Case 03: Professional Teeth Whitening */}
            <article className="case-card">
              <div className="case-image-frame">
                <img
                  src="/assets/cases/professional-teeth-whitening.png"
                  alt="Professional Teeth Whitening - Before and After - RH Dental Care"
                  loading="lazy"
                />
                <span className="case-branch-badge">Banasree &amp; Banani</span>
              </div>
              <div className="case-info">
                <span className="case-category">Aesthetic Dentistry</span>
                <h4 className="case-title">In-Office Teeth Whitening</h4>
                <p className="case-desc">
                  Clinical-grade light-activated whitening system lifting years of deep intrinsic
                  staining while safeguarding enamel and maintaining zero post-operative sensitivity.
                </p>
                <div className="case-highlights">
                  <span className="case-highlight-tag">Brighter &amp; Whiter</span>
                  <span className="case-highlight-tag">Safe &amp; Effective</span>
                  <span className="case-highlight-tag">Radiant Glow</span>
                </div>
              </div>
            </article>

            {/* Case 04: 10+ Years Old Build-up Rehabilitation */}
            <article className="case-card">
              <div className="case-image-frame">
                <img
                  src="/assets/cases/restoration-old-buildup.png"
                  alt="Old build-up restoration - Before and After - RH Dental Care"
                  loading="lazy"
                />
                <span className="case-branch-badge">Full Rehabilitation</span>
              </div>
              <div className="case-info">
                <span className="case-category">Full-Mouth Rehabilitation</span>
                <h4 className="case-title">Complex Build-Up Reconstruction</h4>
                <p className="case-desc">
                  Revision of 10+ year old, discolored, and failing broken fillings. Rebuilt to correct
                  bite relationship, lifelike shade harmony, and long-term biological function.
                </p>
                <div className="case-highlights">
                  <span className="case-highlight-tag">Restored Function</span>
                  <span className="case-highlight-tag">Natural Appearance</span>
                  <span className="case-highlight-tag">Permanent Solution</span>
                </div>
              </div>
            </article>

            {/* Case 05: Teeth Whitening Radiant Polish */}
            <article className="case-card">
              <div className="case-image-frame">
                <img
                  src="/assets/cases/teeth-whitening-bright.png"
                  alt="Teeth Whitening Bright - Before and After - RH Dental Care"
                  loading="lazy"
                />
                <span className="case-branch-badge">Aesthetic Care</span>
              </div>
              <div className="case-info">
                <span className="case-category">Enamel Rejuvenation</span>
                <h4 className="case-title">Brighter Smile, Lasting Confidence</h4>
                <p className="case-desc">
                  Gentle yet potent whitening protocol removing stubborn nicotine, tea, and coffee
                  stains for an instantly refreshed, photogenic smile.
                </p>
                <div className="case-highlights">
                  <span className="case-highlight-tag">Whiter Teeth</span>
                  <span className="case-highlight-tag">Deep Cleaning</span>
                  <span className="case-highlight-tag">Long-Lasting Results</span>
                </div>
              </div>
            </article>

            {/* Case 06: Dark Luxury Whitening Experience */}
            <article className="case-card">
              <div className="case-image-frame">
                <img
                  src="/assets/cases/teeth-whitening-dark.png"
                  alt="Teeth Whitening Luxury - Before and After - RH Dental Care"
                  loading="lazy"
                />
                <span className="case-branch-badge">Specialist Monitored</span>
              </div>
              <div className="case-info">
                <span className="case-category">Gingival Shielding</span>
                <h4 className="case-title">Medical Barrier Whitening</h4>
                <p className="case-desc">
                  Medical dam protection isolating soft tissues followed by high-potency peroxide
                  gel application for patients seeking executive-level smile clarity.
                </p>
                <div className="case-highlights">
                  <span className="case-highlight-tag">Gingival Safety</span>
                  <span className="case-highlight-tag">Maximum Brightness</span>
                  <span className="case-highlight-tag">Expert Supervision</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── 7-STEP SIMPLIFIED JOURNEY ─────────────────────────── */}
      <section className="journey" id="journey">
        <div className="container">
          <div className="section-head two-col">
            <div>
              <span className="eyebrow">
                <span className="kicker-line"></span>Your Journey, Simplified
              </span>
              <h2 className="display">
                HOME <em>→</em> DHAKA <em>→</em> RH DENTAL CARE <em>→</em> HOME
              </h2>
            </div>
            <p className="lead">
              Your journey starts from home. Seven clearly coordinated milestones designed to take you
              from initial assessment to finished clinical outcome and a safe journey back.
            </p>
          </div>

          <div className="journey-wrap">
            <svg
              className="journey-path"
              viewBox="0 0 1200 240"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                id="planePath"
                d="M 30 180 Q 280 30 600 130 T 1170 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeDasharray="6 8"
              />
              <g id="planeIcon">
                <path
                  d="M -14 -2 L 14 -2 L 8 -10 L 10 -10 L 18 -2 L 22 -2 L 22 2 L 18 2 L 10 10 L 8 10 L 14 2 L -14 2 Z"
                  fill="currentColor"
                />
              </g>
            </svg>

            <ol className="steps" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              <li className="step" data-step>
                <div className="step-num">01</div>
                <div className="step-time">First Contact</div>
                <h4>1. Enquire</h4>
                <p>
                  Reach out through WhatsApp, email, or our web portal to discuss your dental goals
                  and travel window.
                </p>
              </li>
              <li className="step" data-step>
                <div className="step-num">02</div>
                <div className="step-time">Records</div>
                <h4>2. Share Your Records</h4>
                <p>
                  Send existing dental X-rays, OPG scans, clinical photos, or medical notes for our
                  clinical panel to review.
                </p>
              </li>
              <li className="step" data-step>
                <div className="step-num">03</div>
                <div className="step-time">Assessment</div>
                <h4>3. Treatment Assessment</h4>
                <p>
                  Receive a clear clinical assessment, procedure breakdown, estimated appointments,
                  and fixed transparent quote.
                </p>
              </li>
              <li className="step" data-step>
                <div className="step-num">04</div>
                <div className="step-time">Logistics</div>
                <h4>4. Plan Your Visit</h4>
                <p>
                  Coordinate flight schedules and hotel stays with Alif Global Tours &amp; Travels,
                  locking in priority clinic chair times.
                </p>
              </li>
              <li className="step" data-step>
                <div className="step-num">05</div>
                <div className="step-time">Arrival</div>
                <h4>5. Travel to Bangladesh</h4>
                <p>
                  Land at Dhaka (DAC) with dedicated chauffeur airport pickup arranged, checking in
                  comfortably at your hotel.
                </p>
              </li>
              <li className="step" data-step>
                <div className="step-num">06</div>
                <div className="step-time">Clinical Care</div>
                <h4>6. Receive Treatment</h4>
                <p>
                  Experience gentle, high-tech dentistry under BMDC-certified specialists with zero
                  delays or rushed appointments.
                </p>
              </li>
              <li className="step" data-step>
                <div className="step-num">07</div>
                <div className="step-time">Post-Op</div>
                <h4>7. Follow-Up &amp; Return Home</h4>
                <p>
                  Return home safely with complete digital records, warranty certification, and
                  scheduled remote follow-up care.
                </p>
              </li>
            </ol>
          </div>

          {/* ─────────────────────────── TWO WAYS TO BOOK ─────────────────────────── */}
          <div className="two-ways-to-book" id="booking-options" data-reveal style={{ marginTop: '60px' }}>
            <div className="two-ways-head">
              <span className="eyebrow" style={{ color: '#38bdf8' }}>SCENE 08 · FLEXIBLE BOOKING</span>
              <h3>Two Ways to Book Your Journey</h3>
              <p style={{ color: 'rgba(246, 241, 232, 0.75)', margin: 0 }}>
                Whether you prefer arranging your own travel or want a fully turnkey medical tourism
                package, we have tailored pathways for you.
              </p>
            </div>

            <div className="two-ways-grid">
              {/* CARD 01 */}
              <div className="booking-choice-card">
                <span className="booking-choice-num">CARD 01 · DIRECT DENTAL ROUTE</span>
                <h4>Book Directly with RH Dental Care</h4>
                <p>
                  Ideal for visitors and expatriates who already have travel or accommodation in Dhaka.
                  Discuss your dental needs, send your records directly to our clinical team, and schedule
                  your treatment dates.
                </p>
                <a href="#contact" className="choice-btn primary">
                  Plan Your Dental Treatment
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* CARD 02 */}
              <div className="booking-choice-card" style={{ borderColor: 'rgba(56, 189, 248, 0.4)' }}>
                <span className="booking-choice-num" style={{ color: '#38bdf8' }}>CARD 02 · FULL TOURISM PACKAGE</span>
                <h4>Book Through Alif Global Tours &amp; Travels</h4>
                <p>
                  All-inclusive Dental Tourism journey. Complete travel coordination + hotel accommodations
                  + airport transfers + local transportation + guaranteed priority dental appointments.
                </p>
                <BranchCTA
                  action="whatsapp"
                  branch="banani"
                  className="choice-btn outline"
                >
                  Book Your Dental Tourism Journey
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </BranchCTA>
              </div>
            </div>

            {/* Treatment Planning Around Your Trip Banner (Scene 09) */}
            <div className="trip-planning-banner" style={{ marginTop: '36px' }}>
              <div className="trip-planning-head">
                <h4>Planned Around Your Journey</h4>
                <span className="trip-planning-badge">SCENE 09 · CLINICAL INTEGRITY</span>
              </div>
              <div className="trip-factors-list">
                <span className="trip-factor-item">✓ Clinical Needs</span>
                <span className="trip-factor-item">✓ Travel Dates</span>
                <span className="trip-factor-item">✓ Treatment Duration</span>
                <span className="trip-factor-item">✓ Number of Visits</span>
                <span className="trip-factor-item">✓ Healing Periods</span>
              </div>
              <p>
                “Where clinically appropriate, your treatment schedule can be planned around your travel
                dates, available time and clinical requirements. <b>Patient safety and appropriate clinical care always remain our priority.</b>”
              </p>
            </div>
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
              The day you land,
              <br />
              <em>in real time.</em>
            </h2>
            <p className="lead" data-reveal>
              We've removed every obvious source of anxiety. Here is what a typical arrival day
              looks like — for a patient flying in from London on a Tuesday morning. Most leave the
              clinic by sunset, with a written plan for the rest of the week.
            </p>
          </div>

          <ol className="d1-timeline" id="d1Timeline">
            <li className="d1-step" data-d1>
              <div className="d1-time">07:50</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Touchdown</span>
                <h4>Hazrat Shahjalal International, Dhaka.</h4>
                <p>
                  Our coordinator meets you at the immigration desk with a printed welcome and your
                  medical-visa paperwork already endorsed. Average time through arrivals:{' '}
                  <b>22 minutes.</b>
                </p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">08:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Transfer</span>
                <h4>Air-conditioned car to your hotel.</h4>
                <p>
                  Forty minutes to Banasree, with a quiet coffee stop on request. Driver knows the
                  routes that avoid morning school traffic. Your suite is pre-checked-in — no front
                  desk.
                </p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">10:00</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Rest</span>
                <h4>Two hours to actually sleep.</h4>
                <p>
                  You arrive jet-lagged; we know it. Treatment never starts the same morning you
                  land. Blackout curtains, a real bed, and a deliberate silence while you reset.
                </p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">12:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Lunch</span>
                <h4>A light meal, in the room or downstairs.</h4>
                <p>
                  Dietary preferences — vegetarian, halal, no-spice — are recorded with your
                  booking. The hotel kitchen has your sheet before you land.
                </p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">14:00</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Clinic arrival</span>
                <h4>Twelve minutes from hotel to chair.</h4>
                <p>
                  You're greeted by your patient coordinator, not a receptionist. Paperwork was
                  completed remotely; you sign two pages and walk straight in.
                </p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">14:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">3D scan</span>
                <h4>CBCT scan + intraoral.</h4>
                <p>
                  A six-minute cone-beam scan and a full intraoral with our wand scanner. By the
                  time you stand up, the radiologist is already annotating the images.
                </p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">15:30</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Treatment review</span>
                <h4>The plan, on a screen, in plain English.</h4>
                <p>
                  Dr. Hasan walks you through what he sees — every implant site, every margin, every
                  material option. You decide. You take the file home with you.
                </p>
              </div>
            </li>
            <li className="d1-step" data-d1>
              <div className="d1-time">17:00</div>
              <div className="d1-rule"></div>
              <div className="d1-body">
                <span className="d1-tag">Back to base</span>
                <h4>Driver waiting. Hotel. Real food.</h4>
                <p>
                  Some patients want to walk; others want to nap. Either way, your schedule for the
                  rest of the week is on your phone and printed for the bedside.
                </p>
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
              <span className="eyebrow">
                <span className="kicker-line"></span>Meet the specialists
              </span>
              <h2 className="display">
                A small team,
                <br />
                <em>international training,</em>
                <br />
                professor-level oversight.
              </h2>
            </div>
            <p className="lead">
              Three clinicians who set the standard for advanced dental care in Bangladesh. Led by a
              Chief Consultant with implantology training across China, Korea and India, and
              overseen by a Glasgow-fellowship prosthodontic professor.
            </p>
          </div>

          {/* ── Team Photo ── */}
          <div
            className="team-photo-container"
            style={{
              marginTop: '60px',
              marginBottom: '80px',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              aspectRatio: '16/7',
              position: 'relative',
            }}
          >
            <img
              src="/assets/tourism/team.png"
              alt="The RH Dental Care Team"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <article className="doctor-feature" data-reveal>
            <div className="doctor-portrait">
              <img
                src="/assets/tourism/dr_mehedi_nobg.jpeg"
                id="dr-hasan-portrait"
                className="doctor-slot"
                alt="Dr. Hasan"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px' }}
              />
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
                expertise. Specialised implantology training in{' '}
                <strong>China, Korea and India,</strong>
                alongside Minimally Invasive Cosmetic Dentistry (MICD) training in Nepal. Practises
                also at Labaid Dental Clinic, Gulshan, and lectures at Saphena Women's Dental
                College.
              </p>

              <div className="cred-grid">
                <div className="cred-cell">
                  <span className="k">Degree</span>
                  <span className="v">BDS — Sapporo Dental College (DU)</span>
                </div>
                <div className="cred-cell">
                  <span className="k">Postgrad</span>
                  <span className="v">MPH — City University</span>
                </div>
                <div className="cred-cell">
                  <span className="k">PGT</span>
                  <span className="v">OMS & Prosthodontics, BSMMU</span>
                </div>
                <div className="cred-cell">
                  <span className="k">Adv.</span>
                  <span className="v">MICD, Nepal</span>
                </div>
              </div>

              <div className="doctor-stats">
                <div>
                  <b data-count="13000" data-suffix="+">
                    0
                  </b>
                  <span>Patients treated</span>
                </div>
                <div>
                  <b data-count="12" data-suffix="+">
                    0
                  </b>
                  <span>Years in practice</span>
                </div>
                <div>
                  <b data-count="4" data-suffix="">
                    0
                  </b>
                  <span>Countries trained in</span>
                </div>
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
                <img
                  src="/assets/tourism/dr_shimia_nobg.jpg"
                  id="dr-shimia-portrait"
                  className="doctor-slot"
                  alt="Dr. Shimia"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                />
              </div>
              <div className="doctor-card-body">
                <div className="role-line">Senior Doctor & Team Lead · BMDC 8496</div>
                <h3>
                  Dr. Shimia <em>Binte Taher</em>
                </h3>
                <p>
                  Highly accomplished clinician combining surgical precision with patient-centred
                  care. Leads the team day-to-day and provides specialised care for female patients.
                  Expert in microscopic endodontics, aesthetic restorations and complex extractions.
                </p>
                <div className="cred-grid two">
                  <div className="cred-cell">
                    <span className="k">Degree</span>
                    <span className="v">BDS — Pioneer Dental College</span>
                  </div>
                  <div className="cred-cell">
                    <span className="k">PGT</span>
                    <span className="v">Oral & Maxillofacial Surgery, DMC</span>
                  </div>
                  <div className="cred-cell">
                    <span className="k">Faculty</span>
                    <span className="v">Senior Lecturer, MH Samorita (since '15)</span>
                  </div>
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
                <img
                  src="/assets/tourism/dr_shaheen_nobg.png"
                  id="dr-shaheen-portrait"
                  className="doctor-slot"
                  alt="Prof. Shaheen"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px',
                  }}
                />
              </div>
              <div className="doctor-card-body">
                <div className="role-line">Clinical Advisor & On-Call Specialist</div>
                <h3>
                  Prof. Dr. <em>Md. Shahidul Islam Shaheen</em>
                </h3>
                <p>
                  Renowned dental academician and prosthodontic specialist. Holds the prestigious{' '}
                  <strong>FDS RCPS from Glasgow</strong> with advanced training in Korea, India and
                  Dubai. Currently a PhD candidate in oral cancer research. Guides RH Dental Care's
                  most complex prosthodontic and surgical cases.
                </p>
                <div className="cred-grid two">
                  <div className="cred-cell">
                    <span className="k">Quals.</span>
                    <span className="v">BDS · MS · FDS RCPS (Glasgow, UK)</span>
                  </div>
                  <div className="cred-cell">
                    <span className="k">PhD</span>
                    <span className="v">Oral Cancer Research candidate</span>
                  </div>
                  <div className="cred-cell">
                    <span className="k">Training</span>
                    <span className="v">Korea · India · Dubai</span>
                  </div>
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

      {/* Beyond the chair */}
      <section className="beyond" id="beyond">
        <div className="container">
          <div className="section-head two-col">
            <div>
              <span className="eyebrow">
                <span className="kicker-line"></span>Beyond the chair
              </span>
              <h2 className="display">
                You came
                <br />
                for a smile.
                <br />
                <em>Stay for the country.</em>
              </h2>
            </div>
            <p className="lead">
              Most international files leave 2–4 days of rest between appointments. With a little
              planning, that is more than enough time to see why nearly anyone who visits Bangladesh
              comes back. Our coordinators help arrange the trip — drivers, guides, the lot.
            </p>
          </div>

          <div className="beyond-grid">
            <article className="bg-card sundarbans" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img
                  src="/assets/tourism/sundarbans.png"
                  id="bg-sundarbans"
                  className="bg-photo"
                  alt="Sundarbans photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#274a3b" />
                      <stop offset="100%" stopColor="#0e2a23" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g1)" />
                  {/* moon */}
                  <circle className="sb-moon" cx="250" cy="50" r="22" fill="#e8d8b3" opacity=".7" />
                  {/* reflection */}
                  <ellipse
                    className="sb-water"
                    cx="250"
                    cy="180"
                    rx="18"
                    ry="3"
                    fill="#e8d8b3"
                    opacity=".3"
                  />
                  {/* mangrove silhouettes */}
                  <path
                    d="M0 160 Q 30 130 40 145 Q 55 110 75 138 Q 95 100 115 138 Q 135 120 155 142 L 155 220 L 0 220 Z"
                    fill="#0a1f17"
                  />
                  <path
                    d="M155 150 Q 180 115 200 142 Q 225 125 245 145 Q 270 120 295 142 Q 310 130 320 145 L 320 220 L 155 220 Z"
                    fill="#091813"
                  />
                  {/* tiger eyes hint */}
                  <circle className="sb-eye" cx="80" cy="155" r="1.5" fill="#e8a838" />
                  <circle className="sb-eye2" cx="86" cy="155" r="1.5" fill="#e8a838" />
                  {/* water shimmer */}
                  <path
                    className="sb-water"
                    d="M0 200 L 320 200"
                    stroke="#274a3b"
                    strokeWidth=".6"
                    opacity=".5"
                  />
                  <path
                    className="sb-water"
                    d="M0 210 L 320 210"
                    stroke="#274a3b"
                    strokeWidth=".6"
                    opacity=".3"
                  />
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">UNESCO · Mangrove</div>
                <h3>The Sundarbans</h3>
                <p>
                  The world's largest mangrove forest, and the only one home to the Royal Bengal
                  tiger. Three-day river cruises depart from Khulna.
                </p>
                <div className="bg-meta">
                  <span>
                    <b>~6h</b> Dhaka → Khulna
                  </span>
                  <span>
                    <b>3 days</b> cruise
                  </span>
                </div>
              </div>
            </article>

            <article className="bg-card coxs" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img
                  src="/assets/tourism/coxs_bazar.png"
                  id="bg-coxs"
                  className="bg-photo"
                  alt="Coxs Bazar photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f3b061" />
                      <stop offset="55%" stopColor="#d97f3d" />
                      <stop offset="100%" stopColor="#2a4a6a" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g2)" />
                  {/* sun */}
                  <circle className="cb-sun" cx="160" cy="110" r="36" fill="#fff" opacity=".85" />
                  {/* horizon */}
                  <line
                    x1="0"
                    y1="125"
                    x2="320"
                    y2="125"
                    stroke="#1a3050"
                    strokeWidth=".5"
                    opacity=".6"
                  />
                  {/* waves */}
                  <path
                    className="cb-wave1"
                    d="M-20 145 Q 80 138 160 145 T 340 145 L 340 220 L -20 220 Z"
                    fill="#1a3550"
                    opacity=".85"
                  />
                  <path
                    className="cb-wave2"
                    d="M-20 170 Q 80 162 160 170 T 340 170 L 340 220 L -20 220 Z"
                    fill="#0e253c"
                  />
                  {/* sun reflection */}
                  <rect
                    className="cb-sun"
                    x="155"
                    y="130"
                    width="10"
                    height="40"
                    fill="#fff"
                    opacity=".25"
                  />
                  {/* birds */}
                  <path
                    className="cb-bird1"
                    d="M70 70 q 5 -5 10 0 q 5 -5 10 0"
                    fill="none"
                    stroke="#1a3050"
                    strokeWidth="1.2"
                  />
                  <path
                    className="cb-bird2"
                    d="M210 55 q 4 -4 8 0 q 4 -4 8 0"
                    fill="none"
                    stroke="#1a3050"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">120 km · World's longest</div>
                <h3>Cox's Bazar</h3>
                <p>
                  The longest natural sea beach on earth. A one-hour direct flight from Dhaka, then
                  sunset walks that genuinely seem to never end.
                </p>
                <div className="bg-meta">
                  <span>
                    <b>~1h</b> direct flight
                  </span>
                  <span>
                    <b>2–3 days</b> ideal
                  </span>
                </div>
              </div>
            </article>

            <article className="bg-card olddhaka" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img
                  src="/assets/tourism/old_dhaka.png"
                  id="bg-olddhaka"
                  className="bg-photo"
                  alt="Old Dhaka photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e9c598" />
                      <stop offset="100%" stopColor="#c97b2d" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g3)" />
                  {/* Lalbagh-style fort silhouette */}
                  <path
                    d="M0 220 L 0 150 L 30 150 L 30 130 L 50 130 L 50 120 L 70 120 L 70 105 Q 80 92 90 105 L 90 130 L 110 130 L 110 145 L 130 145 L 130 110 Q 145 90 160 110 L 160 145 L 180 145 L 180 130 L 200 130 L 200 105 Q 210 92 220 105 L 220 130 L 250 130 L 250 145 L 280 145 L 280 130 L 320 130 L 320 220 Z"
                    fill="#7a3f0e"
                  />
                  {/* dome */}
                  <ellipse cx="145" cy="108" rx="15" ry="10" fill="#5a2e0a" />
                  <ellipse cx="85" cy="103" rx="6" ry="4" fill="#5a2e0a" />
                  <ellipse cx="215" cy="103" rx="6" ry="4" fill="#5a2e0a" />
                  {/* windows */}
                  <rect className="od-window" x="40" y="160" width="6" height="14" fill="#3a1c08" />
                  <rect className="od-window" x="75" y="160" width="6" height="14" fill="#3a1c08" />
                  <rect
                    className="od-window"
                    x="140"
                    y="170"
                    width="10"
                    height="20"
                    fill="#3a1c08"
                  />
                  <rect
                    className="od-window"
                    x="195"
                    y="160"
                    width="6"
                    height="14"
                    fill="#3a1c08"
                  />
                  <rect
                    className="od-window"
                    x="260"
                    y="170"
                    width="6"
                    height="14"
                    fill="#3a1c08"
                  />
                  {/* rickshaw on street */}
                  <g className="od-rickshaw">
                    <circle cx="0" cy="8" r="6" fill="#3a1c08" />
                    <circle cx="14" cy="8" r="6" fill="#3a1c08" />
                    <rect
                      x="-4"
                      y="-6"
                      width="20"
                      height="10"
                      fill="#c97b2d"
                      stroke="#3a1c08"
                      strokeWidth="1"
                    />
                    <path d="M-4 -6 L -10 4" stroke="#3a1c08" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">Heritage · River city</div>
                <h3>Old Dhaka</h3>
                <p>
                  17th-century Mughal forts, the Pink Palace, the Buriganga riverfront, rickshaw-art
                  alleys — and the country's most ferocious biryani.
                </p>
                <div className="bg-meta">
                  <span>
                    <b>25 min</b> from clinic
                  </span>
                  <span>
                    <b>Half day</b> walking
                  </span>
                </div>
              </div>
            </article>

            <article className="bg-card srimangal" data-reveal data-tilt data-cursor="Explore">
              <div className="bg-art" aria-hidden="true">
                <img
                  src="/assets/tourism/srimangal.png"
                  id="bg-srimangal"
                  className="bg-photo"
                  alt="Srimangal photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#a8c89a" />
                      <stop offset="100%" stopColor="#3d6b4a" />
                    </linearGradient>
                  </defs>
                  <rect width="320" height="220" fill="url(#g4)" />
                  {/* distant hills */}
                  <path
                    d="M0 100 Q 60 70 120 95 Q 180 75 240 95 Q 280 80 320 100 L 320 220 L 0 220 Z"
                    fill="#2f5a3d"
                    opacity=".6"
                  />
                  {/* tea garden rows */}
                  <path d="M0 130 Q 60 122 120 130 T 320 130 L 320 145 L 0 145 Z" fill="#356844" />
                  <path d="M0 150 Q 60 142 120 150 T 320 150 L 320 165 L 0 165 Z" fill="#2c5a3a" />
                  <path d="M0 170 Q 60 162 120 170 T 320 170 L 320 185 L 0 185 Z" fill="#234c30" />
                  <path d="M0 190 Q 60 182 120 190 T 320 190 L 320 220 L 0 220 Z" fill="#1a3c25" />
                  {/* tea bushes texture */}
                  <g fill="#4a7d56">
                    <circle className="sm-bush" cx="40" cy="135" r="2" />
                    <circle className="sm-bush" cx="120" cy="138" r="2" />
                    <circle className="sm-bush" cx="220" cy="135" r="2" />
                    <circle className="sm-bush" cx="60" cy="155" r="2" />
                    <circle className="sm-bush" cx="180" cy="158" r="2" />
                    <circle className="sm-bush" cx="280" cy="155" r="2" />
                  </g>
                  {/* person picking */}
                  <g className="sm-picker" transform="translate(220 168)">
                    <circle cx="0" cy="-6" r="3" fill="#c97b2d" />
                    <rect x="-2" y="-3" width="4" height="8" fill="#a85e1c" />
                  </g>
                </svg>
              </div>
              <div className="bg-body">
                <div className="bg-label">Tea capital · Hills</div>
                <h3>Srimangal</h3>
                <p>
                  Rolling tea estates, the famous seven-layer tea, rainforest reserves and the
                  slowest, quietest mornings in Bangladesh.
                </p>
                <div className="bg-meta">
                  <span>
                    <b>~4h</b> by train
                  </span>
                  <span>
                    <b>2 days</b> ideal
                  </span>
                </div>
              </div>
            </article>
          </div>

          <div className="beyond-foot">
            <div className="bdg">
              <svg
                viewBox="0 0 32 32"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path
                  d="M16 4l4 8 9 1-6.5 6 1.5 9-8-4-8 4 1.5-9L3 13l9-1z"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                Concierge handles drivers, flights, hotels and guides — usually arranged within 24h
                of your treatment plan being confirmed.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="pullquote" id="pullquote">
        <div className="pq-band">
          <div className="pq-track" id="pqTrack">
            <span className="pq-line">
              <span className="pq-mark">"</span>I was anxious flying in. By day two I was relaxed.
              By the time I left,
              <em>I was already planning the next trip.</em>
              <span className="pq-author">— Walid M. · London · verified Google review</span>
            </span>
            <span className="pq-line" aria-hidden="true">
              <span className="pq-mark">"</span>I was anxious flying in. By day two I was relaxed.
              By the time I left,
              <em>I was already planning the next trip.</em>
              <span className="pq-author">— Walid M. · London · verified Google review</span>
            </span>
          </div>
        </div>
      </section>

      {/* Bangladesh in real life */}
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
              Photographs
              <br />
              <em>of a country</em>
              <br />
              you'll quietly fall for.
            </h2>
            <p className="lead" data-reveal>
              Embark on a dental journey that extends far beyond the clinic doors. Experience warm
              Bengali hospitality, breathtaking natural wonders, and rich heritage sites, all while
              receiving international-standard clinical care at RH Dental Care.
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

      {/* ─────────────────────────── CAMPAIGN VIDEO & STORYBOARD THEATER ─────────────────────────── */}
      <section className="video-theater-section" id="campaign-video">
        <div className="container">
          <div className="theater-header" data-reveal>
            <span className="eyebrow">
              <span className="kicker-line"></span>Official Campaign Film · 4K Clinic Showcase
            </span>
            <h2>
              Dental Tourism in Bangladesh <em>Film &amp; Storyboard</em>
            </h2>
            <p style={{ color: 'rgba(246, 241, 232, 0.75)' }}>
              Take a cinematic preview of the patient journey at RH Dental Care. Watch our facility
              walkthrough, clinical technology, and coordinated travel workflow with Alif Global Tours &amp; Travels.
            </p>
          </div>

          {/* 4K Video Player */}
          <div className="video-player-container" data-reveal>
            <video
              src="/assets/videos/banani.mp4"
              controls
              poster="/assets/tourism/clinic_reception.png"
              playsInline
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* 10-Scene Storyboard & Script Breakdown */}
          <div className="storyboard-timeline" data-reveal>
            <div className="storyboard-head">
              <h4>Promotional Film Script &amp; Visual Storyboard</h4>
              <span className="specs">Duration: 90–120s · 16:9 4K &amp; 9:16 Reels · RH × Alif Global</span>
            </div>

            <div className="storyboard-scenes-grid">
              {/* Scene 01 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 01 · OPENING</span>
                  <span className="scene-duration">0–8s</span>
                </div>
                <div className="scene-title">Welcome to Bangladesh</div>
                <div className="scene-vo">
                  “Looking for quality dental treatment while travelling to Bangladesh? Welcome to RH Dental Care.”
                </div>
                <div className="scene-visual">
                  Visual: Aerial shots of modern Dhaka → transition to premium clinic operatory.
                </div>
              </div>

              {/* Scene 02 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 02 · INTRODUCTION</span>
                  <span className="scene-duration">8–18s</span>
                </div>
                <div className="scene-title">Introducing RH Dental Care</div>
                <div className="scene-vo">
                  “RH Dental Care welcomes international patients with comprehensive dental services, experienced dental professionals, modern technology and personalized treatment planning.”
                </div>
                <div className="scene-visual">
                  Visual: Exterior/interior of RH Dental Care, reception, specialist team &amp; consultations.
                </div>
              </div>

              {/* Scene 03 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 03 · DENTISTRY</span>
                  <span className="scene-duration">18–32s</span>
                </div>
                <div className="scene-title">Comprehensive Clinical Care</div>
                <div className="scene-vo">
                  “From preventive and restorative dentistry to root canal, implants, cosmetic dentistry, orthodontics, oral surgery, pediatric care and full-mouth rehabilitation...”
                </div>
                <div className="scene-visual">
                  Visual: Fast elegant sequence of procedures &amp; digital workflow under one network.
                </div>
              </div>

              {/* Scene 04 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 04 · WHY RH?</span>
                  <span className="scene-duration">32–43s</span>
                </div>
                <div className="scene-title">Why RH Dental Care?</div>
                <div className="scene-vo">
                  “Our focus goes beyond treatment. We combine clinical expertise, modern technology and multidisciplinary care to create a personalized treatment journey for every patient.”
                </div>
                <div className="scene-visual">
                  Visual: Dentists analyzing 3D scans, diagnostic digital screens, and patient consultation.
                </div>
              </div>

              {/* Scene 05 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 05 · ROADMAP</span>
                  <span className="scene-duration">43–56s</span>
                </div>
                <div className="scene-title">The Patient Journey</div>
                <div className="scene-vo">
                  “Your journey starts from home. Share your dental records with us, receive an initial assessment, plan your visit, travel to Bangladesh, receive your treatment and return home.”
                </div>
                <div className="scene-visual">
                  Visual: Animated international route (Home → Dhaka → RH Dental Care → Home).
                </div>
              </div>

              {/* Scene 06 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 06 · PARTNERSHIP</span>
                  <span className="scene-duration">56–70s</span>
                </div>
                <div className="scene-title">RH × Alif Global Tours</div>
                <div className="scene-vo">
                  “To make the experience even easier, RH Dental Care has partnered with Alif Global Tours &amp; Travels to support international patients throughout their travel and treatment journey.”
                </div>
                <div className="scene-visual">
                  Visual: Split-screen (Dental Treatment on Left + Travel Support on Right) with joint logos.
                </div>
              </div>

              {/* Scene 07 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 07 · LOGISTICS</span>
                  <span className="scene-duration">70–82s</span>
                </div>
                <div className="scene-title">Full Travel Support</div>
                <div className="scene-vo">
                  “Through Alif Global Tours &amp; Travels, patients can receive assistance with visa support, travel coordination, airport transfers, hotel accommodation, local transportation and appointments.”
                </div>
                <div className="scene-visual">
                  Visual: Passport, visa, flight, airport chauffeur pickup, boutique hotel &amp; clinic arrival.
                </div>
              </div>

              {/* Scene 08 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 08 · BOOKING</span>
                  <span className="scene-duration">82–96s</span>
                </div>
                <div className="scene-title">Two Ways to Book</div>
                <div className="scene-vo">
                  “You can start your journey directly with RH Dental Care—or contact Alif Global Tours &amp; Travels to arrange your travel and Dental Tourism experience with us.”
                </div>
                <div className="scene-visual">
                  Visual: Card 01 (Direct Dental Treatment) and Card 02 (Turnkey Tourism Package).
                </div>
              </div>

              {/* Scene 09 */}
              <div className="storyboard-card">
                <div className="scene-badge-row">
                  <span className="scene-num">SCENE 09 · PLANNING</span>
                  <span className="scene-duration">96–106s</span>
                </div>
                <div className="scene-title">Planned Around Your Trip</div>
                <div className="scene-vo">
                  “Where clinically appropriate, your treatment schedule can be planned around your travel dates, available time and clinical requirements. Patient safety always remains our priority.”
                </div>
                <div className="scene-visual">
                  Visual: Treatment calendar, flight dates alignment, healing intervals &amp; safe recovery.
                </div>
              </div>

              {/* Scene 10 & Final Frame */}
              <div className="storyboard-card" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', background: 'rgba(14, 165, 233, 0.08)' }}>
                <div className="scene-badge-row">
                  <span className="scene-num" style={{ color: '#7dd3fc' }}>SCENE 10 · CLOSING</span>
                  <span className="scene-duration">106–120s</span>
                </div>
                <div className="scene-title">Your Smile, Our Happiness</div>
                <div className="scene-vo">
                  “From your first enquiry to your treatment and journey home, we are here to make Dental Tourism in Bangladesh simpler, more comfortable and professionally coordinated.”
                </div>
                <div className="scene-visual" style={{ color: '#fff' }}>
                  Websites: <b>rhdentalcare.com</b> · <b>alifglobaltours.com</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── TECHNOLOGY MARQUEE ─────────────────────────── */}
      <section className="tech" id="tech">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">
              <span className="kicker-line"></span>Advanced technology
            </span>
            <h2 className="display">
              Precision tools.
              <br />
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
              <p>In-house surgical guides, models and precision CAD/CAM restorations.</p>
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
            <span>3D CBCT Imaging</span>
            <span>•</span>
            <span>Digital Smile Design</span>
            <span>•</span>
            <span>On-Site Milled Crowns</span>
            <span>•</span>
            <span>Guided Implantology</span>
            <span>•</span>
            <span>Microscopic Endodontics</span>
            <span>•</span>
            <span>Sterilisation B-class autoclave</span>
            <span>•</span>
            <span>3D CBCT Imaging</span>
            <span>•</span>
            <span>Digital Smile Design</span>
            <span>•</span>
            <span>On-Site Milled Crowns</span>
            <span>•</span>
            <span>Guided Implantology</span>
            <span>•</span>
            <span>Microscopic Endodontics</span>
            <span>•</span>
            <span>Sterilisation B-class autoclave</span>
            <span>•</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────── REVIEWS ─────────────────────────── */}
      <section className="reviews" id="reviews">
        <div className="container">
          <div className="section-head two-col">
            <div>
              <span className="eyebrow">
                <span className="kicker-line"></span>Verified Google reviews
              </span>
              <h2 className="display">
                Trusted by thousands
                <br />
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
              <div className="rev-source">
                <span className="g-badge">G</span> Google · ★★★★★
              </div>
              <p className="rev-body">
                "The entire root canal was done under local anaesthetic and I felt nothing during
                it. The clinic environment is very clean. Highly impressed."
              </p>
              <div className="rev-author">
                <b>Sayed Anwar</b>
                <span>Local Guide · Bangladesh</span>
              </div>
            </article>
            <article className="rev" data-reveal data-tilt>
              <div className="rev-source">
                <span className="g-badge">G</span> Google · ★★★★★
              </div>
              <p className="rev-body">
                "My mother received dental implants here. Dr. Shimia and Dr. Hasan were very caring.
                Their diagnosis and technology are top notch."
              </p>
              <div className="rev-author">
                <b>Farzana Rahman</b>
                <span>Verified patient · Dhaka</span>
              </div>
            </article>
            <article className="rev" data-reveal data-tilt>
              <div className="rev-source">
                <span className="g-badge">G</span> Google · ★★★★★
              </div>
              <p className="rev-body">
                "Extremely professional. Doctors take time to explain the exact problem through
                X-rays and screens before any treatment. Very confident."
              </p>
              <div className="rev-author">
                <b>Mahadi Hasan</b>
                <span>Local Guide · 32 reviews</span>
              </div>
            </article>
          </div>

          <div className="reviews-foot">
            <a
              href="https://g.page/r/CRH-dental"
              target="_blank"
              rel="noopener noreferrer"
              className="tm-btn tm-btn-secondary magnetic"
            >
              <span className="g-badge">G</span>
              Read all Google reviews
              <span className="arrow" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
              Every question
              <br />
              <em>international patients ask.</em>
            </h2>
            <p className="lead" data-reveal>
              These are the questions that arrive in our inbox most often, with the answers we'd
              give you on a 10-minute WhatsApp call.
            </p>
          </div>

          <ul className="faq-list" id="faqList">
            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">01</span>
                <span className="faq-text">
                  Is the treatment actually safe? I've heard mixed things about medical tourism.
                </span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  The risk in medical tourism is not the country — it's the clinic. We use the same
                  Swiss and Swedish implants, the same Liechtenstein ceramics and the same B-class
                  sterilisation as a private clinic in London. Our chief consultant is
                  BMDC-certified with international training; our advisor holds the FDS RCPS from
                  Glasgow. You're not getting a cheap copy; you're getting the same procedure at
                  honest local rates.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">02</span>
                <span className="faq-text">How long do I need to stay?</span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  It depends on the procedure. A single crown or veneer set: <b>3–5 days</b>. A full
                  smile makeover with veneers: <b>5–8 days</b>. Implants with immediate provisional
                  loading: <b>7–10 days</b>; with delayed loading (the safer, standard protocol): one
                  short visit for surgery, then a second visit 4–6 months later for the final crowns.
                  We build the schedule around <em>your</em> calendar, not ours.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">03</span>
                <span className="faq-text">What if something goes wrong after I return home?</span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  Every implant carries the manufacturer's warranty documentation (depending
                  on brand) and we hold the documentation for you. If you have an issue, you contact
                  us on WhatsApp; we coordinate with your local dentist, send your full digital file
                  and X-rays, and provide support for any follow-up care needed.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">04</span>
                <span className="faq-text">Can I claim this on my private health insurance?</span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  Most policies that cover dental work overseas will accept our paperwork — itemised
                  invoice, treatment records, prescription summary, and the practitioner's BMDC
                  number. We've successfully filed with Bupa, Cigna Global, Allianz Care and AXA.
                  Your coordinator will hand you the file your insurer needs before you board the
                  return flight.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">05</span>
                <span className="faq-text">How and when do I pay?</span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  Half on arrival, after the 3D scan confirms the plan; the rest on completion. We
                  accept international card payments (Visa / Mastercard / Amex) in USD, GBP or EUR,
                  and bank transfer in any major currency. No prepayment required to book — the
                  WhatsApp consultation is free and non-binding.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">06</span>
                <span className="faq-text">Do I need a special visa for medical treatment?</span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  For most Western passports: no. A standard tourist visa (e-visa or
                  visa-on-arrival) covers a dental treatment trip up to 30 days. If your treatment
                  runs longer or you'd like the formal protection, we'll issue a medical-visa
                  invitation letter and brief you on the paperwork — processed in 3–5 working days
                  through the Bangladeshi mission in your country.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">07</span>
                <span className="faq-text">
                  Is it safe to travel while recovering from dental surgery?
                </span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  For minor work — fillings, crowns, single extractions, basic implants — you can
                  fly the day after with no restrictions. For complex surgical work (sinus lifts,
                  bone grafts, multiple implants), we recommend a 3-day window before flying to
                  allow swelling to peak and recede. We schedule major work earlier in your trip and
                  lighter work toward the end specifically for this reason.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">08</span>
                <span className="faq-text">Will the doctors actually speak fluent English?</span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  Yes. Bangladesh has one of the highest English proficiency rates in non-anglophone
                  Asia, and our entire clinical and coordination team works in English by default.
                  Our chief consultant has trained internationally and lectures in English; our
                  advisor holds a Glasgow fellowship. No translation app, no awkward intermediation
                  — you ask your question, you get a direct answer.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">09</span>
                <span className="faq-text">Can I bring a friend or family member?</span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  Strongly encouraged. Our coordinators handle their travel arrangements alongside
                  yours — same hotel, same driver, same restaurant bookings. We can coordinate their stay alongside yours. They are welcome in the consultation room at any point you'd like them
                  there.
                </p>
              </div>
            </li>

            <li className="faq-item" data-faq>
              <button className="faq-q" type="button" aria-expanded="false">
                <span className="faq-num">10</span>
                <span className="faq-text">
                  What's the worst-case scenario you've actually seen?
                </span>
                <span className="faq-toggle" aria-hidden="true">
                  +
                </span>
              </button>
              <div className="faq-a">
                <p>
                  An honest one: a patient who landed with a fractured temporary crown after a long
                  flight. We saw her within two hours, milled a replacement that afternoon, and
                  rebooked her connecting flight. She left on time. Most "worst cases" are
                  logistics, not clinical — and we've designed the whole process around catching
                  them before they catch you.
                </p>
              </div>
            </li>
          </ul>

          <div className="faq-foot" data-reveal>
            <p>
              Still have a question? WhatsApp us — our branch coordinator replies, usually within an
              hour.
            </p>
            <BranchCTA
              action="whatsapp"
              className="tm-btn tm-btn-primary magnetic"
              data-cursor="WhatsApp"
            >
              Message us on WhatsApp
              <span className="arrow" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
              <span className="eyebrow">
                <span className="kicker-line"></span>Begin your journey
              </span>
              <h2 className="display">
                Share your concerns.
                <br />
                <em>Get a plan</em>
                <br />
                before you fly.
              </h2>
              <p className="lead">
                Send a few photos and your dental history over WhatsApp. Within 24 hours our
                coordinator returns a full treatment plan — and an itinerary for the rest of
                your trip.
              </p>

              <div className="contact-meta">
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 .5C5.6.5.4 5.6.4 12c0 2 .5 4 1.5 5.7L0 24l6.5-1.8c1.7.9 3.6 1.4 5.5 1.4 6.4 0 11.6-5.1 11.6-11.5C23.6 5.6 18.4.5 12 .5zm6.7 16.4c-.3.8-1.6 1.5-2.3 1.6-.6.1-1.3.1-2.1-.1-.5-.1-1.1-.3-1.9-.7-3.3-1.4-5.5-4.8-5.7-5-.2-.2-1.4-1.8-1.4-3.5s.9-2.5 1.2-2.8c.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.5.1.2.1.4 0 .6-.1.2-.2.4-.4.6-.2.2-.4.4-.5.5-.2.2-.4.4-.2.7.2.4.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.8.4.2.6.1.8-.1.2-.3.9-1.1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2 1 2.3 1.1.3.2.6.2.6.4.2.1.2.8-.1 1.6z" />
                    </svg>
                  </div>
                  <div>
                    <b>WhatsApp Coordinator</b>
                    <span>
                      <BranchCTA
                        action="whatsapp"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#25D366',
                          fontWeight: 700,
                          padding: 0,
                          font: 'inherit',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                        }}
                      >
                        Chat with Banani or Banasree
                      </BranchCTA>
                    </span>
                  </div>
                </div>
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <b>Email</b>
                    <span>
                      <a
                        href="mailto:drhasan0712@gmail.com"
                        style={{ color: 'inherit', textDecoration: 'none' }}
                      >
                        drhasan0712@gmail.com
                      </a>
                    </span>
                  </div>
                </div>
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13z" />
                      <circle cx="12" cy="9" r="3" />
                    </svg>
                  </div>
                  <div>
                    <b>Locations</b>
                    <span>Banani Private Suite &amp; Banasree Flagship Hospital</span>
                  </div>
                </div>
                <div className="cm-row">
                  <div className="cm-icon">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </div>
                  <div>
                    <b>Hours</b>
                    <span>3:00 PM – 10:00 PM (Banani: Sun–Thu | Banasree: Fri–Wed)</span>
                  </div>
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
                <input
                  type="text"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label>02 · Country</label>
                  <input
                    type="text"
                    placeholder="United Kingdom"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>03 · WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+44 7… "
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="field">
                <label>04 · Treatment of interest</label>
                <select
                  required
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                >
                  <option value="" disabled>
                    Select a treatment…
                  </option>
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
                <textarea
                  rows={3}
                  placeholder="Pain, broken tooth, cosmetic concern, current dental records you can share…"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              {error && (
                <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="tm-btn tm-btn-primary block magnetic"
                data-cursor="Send"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending...' : 'Send my request'}
                <span className="arrow" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>

              <div className="form-foot">
                We reply within 24 hours. No spam, ever. Your records stay private and encrypted.
              </div>

              <div className={`form-success${formSubmitted ? ' show' : ''}`}>
                <div className="ok-tick">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                  >
                    <path d="M5 13l4 4L20 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <b>Request received.</b>
                <span>
                  Our coordinator will WhatsApp you within 24 hours with a personalised plan.
                </span>
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
        .to([mark, line, text], {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: 'power2.in',
          stagger: 0.04,
        })
        .to(wipe, { height: '100%', duration: 0.8, ease: 'expo.inOut' }, '-=0.2')
        .set(loader, { y: '-100%' });
    });
  };
  wipeLoader().then(() => {
    document.documentElement.style.overflow = '';
  });
  setTimeout(() => {
    document.documentElement.style.overflow = '';
  }, 3500);

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
      yPercent: 0,
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
    });
  }

  /* ── Parallax + Ken Burns ── */
  if (!prefersReducedMotion) {
    // 1. Hero background deep scrub (parallax only, no scale to prevent conflict)
    gsap
      .timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      .fromTo(
        '.hero-bg-img',
        { yPercent: 0 },
        {
          yPercent: 25,
          ease: 'none',
        },
      );
    // 2. Hero content opposing scrub (creates deep 3D separation)
    gsap
      .timeline({
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      .to('.hero-content', {
        yPercent: -15,
        opacity: 0,
        ease: 'none',
      });
    // 3. Gentle ambient breathing for the hero image (Scale only!)
    gsap.to('.hero-bg-img', {
      scale: 1.05,
      duration: 18,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    });

    // 4. Parallax on all reason art containers
    document.querySelectorAll<HTMLElement>('.reason-art').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 40 },
        {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });

    // 5. Parallax on doctor portraits
    document.querySelectorAll<HTMLElement>('.doctor-slot').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 15, scale: 1.02 },
        {
          y: -15,
          scale: 1.0,
          ease: 'none',
          scrollTrigger: {
            trigger: el.closest('.doctor-card') || el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });
  }

  /* ── Counters ── */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count || '0');
    const suffix = el.dataset.suffix || '';
    const obj = { v: 0 };
    gsap
      .timeline({
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
      .to(obj, {
        v: target,
        duration: 2.2,
        ease: 'expo.out',
        onUpdate: () => {
          const v = Math.round(obj.v);
          el.textContent = (v >= 1000 ? v.toLocaleString() : v.toString()) + suffix;
        },
      });
  });

  /* ── Generic reveal ── */
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el, i) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => el.classList.add('in-view'),
        },
      })
      .from(el, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
        delay: (i % 3) * 0.05,
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
        scrollTrigger: {
          trigger: reason,
          start: 'top 78%',
          once: true,
          onEnter: () => reason.classList.add('in-view'),
        },
      });
      if (num) tl.from(num, { y: 40, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0);
      if (tag) tl.from(tag, { y: 20, opacity: 0, duration: 0.8, ease: 'expo.out' }, 0.1);
      if (art)
        tl.from(art, { clipPath: 'inset(0 100% 0 0)', duration: 1.2, ease: 'expo.out' }, 0.05);
      if (copy)
        tl.from(
          copy.querySelectorAll('h3, p, .reason-stats'),
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: 'expo.out',
          },
          0.25,
        );
    });
  }

  /* ── BD opener headline ── */
  if (!prefersReducedMotion) {
    const bdWords = document.querySelectorAll('.bd-headline .w');
    if (bdWords.length) {
      gsap.set(bdWords, { yPercent: 110, opacity: 0, rotateX: -20, transformOrigin: '0% 100%' });
      gsap
        .timeline({
          scrollTrigger: { trigger: '.bd-headline', start: 'top 80%', once: true },
        })
        .to(bdWords, {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'expo.out',
        });
    }
    gsap
      .timeline({
        scrollTrigger: { trigger: '.bd-map', start: 'top 85%', once: true },
      })
      .from('.bd-map', {
        opacity: 0,
        scale: 0.7,
        rotate: -10,
        duration: 1.4,
        ease: 'expo.out',
      });
    gsap
      .timeline({
        scrollTrigger: { trigger: '.bd-lede', start: 'top 85%', once: true },
      })
      .from('.bd-lede', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
      });
  }

  /* ── Section headlines (whole-block fade) ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.section-head .display').forEach((h) => {
      gsap
        .timeline({
          scrollTrigger: { trigger: h, start: 'top 85%', once: true },
        })
        .from(h, {
          y: 50,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
        });
    });
  }

  /* ── Journey plane path ── */
  if (!prefersReducedMotion && MotionPathPlugin) {
    gsap.set('#planeIcon', { transformOrigin: '50% 50%' });
    gsap
      .timeline({
        scrollTrigger: { trigger: '.journey', start: 'top 65%', end: 'bottom 50%', scrub: 1.2 },
      })
      .to('#planeIcon', {
        motionPath: {
          path: '#planePath',
          align: '#planePath',
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        ease: 'power1.inOut',
        duration: 4,
      });
    const path = document.getElementById('planePath') as unknown as SVGPathElement | null;
    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      gsap
        .timeline({
          scrollTrigger: { trigger: '.journey', start: 'top 65%', end: 'bottom 50%', scrub: 1.2 },
        })
        .to(path, {
          strokeDashoffset: 0,
          ease: 'none',
        });
    }
  }

  /* ── Journey steps ── */
  if (!prefersReducedMotion) {
    gsap
      .timeline({
        scrollTrigger: { trigger: '.steps', start: 'top 80%', once: true },
      })
      .from('[data-step]', {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'expo.out',
      });
  }

  /* ── Beyond the chair: SVG parallax ── */
  if (!prefersReducedMotion) {
    document.querySelectorAll('.bg-card').forEach((card) => {
      const art = card.querySelector('.bg-art svg');
      if (!art) return;
      gsap
        .timeline({
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
        })
        .fromTo(art, { yPercent: -6, scale: 1.08 }, { yPercent: 6, scale: 1.08, ease: 'none' });
    });
  }

  /* ── Pull quote: scroll-driven horizontal ── */
  const pqTrack = document.getElementById('pqTrack');
  if (pqTrack) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.pullquote',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
      .fromTo(
        pqTrack,
        { x: '5%' },
        {
          x: '-55%',
          ease: 'none',
        },
      );
  }

  /* ── Day One steps ── */
  if (!prefersReducedMotion) {
    gsap
      .timeline({
        scrollTrigger: { trigger: '.d1-timeline', start: 'top 80%', once: true },
      })
      .from('[data-d1]', {
        x: -30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'expo.out',
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
      if (copy)
        tl.from(
          copy.children,
          { y: 24, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out' },
          0.1,
        );
      if (brands.length)
        tl.from(brands, { x: 30, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'expo.out' }, 0.2);
    });
  }

  /* ── Trust marks ── */
  if (!prefersReducedMotion) {
    gsap
      .timeline({
        scrollTrigger: { trigger: '.std-trust', start: 'top 88%', once: true },
      })
      .from('.trust-mark', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'expo.out',
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
        gsap.to(buttonEl, {
          x: (x / r.width) * strength,
          y: (y / r.height) * strength,
          duration: 0.4,
          ease: 'power3.out',
        });
      });
      buttonEl.addEventListener('mouseleave', () =>
        gsap.to(buttonEl, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' }),
      );
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
      if (!heroEl) {
        spine.classList.add('ready');
        return;
      }
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
    const inContact = !!(
      contactEl && window.scrollY + window.innerHeight > contactEl.offsetTop + 200
    );
    stickyCta.classList.toggle('show', !inHero && !inContact);
  };
  window.addEventListener('scroll', updSticky, { passive: true });
  window.addEventListener('resize', updSticky);
  updSticky();

  /* ── Custom cursor ── */
  const cursor = document.getElementById('cursor');
  const cursorLabel = document.getElementById('cursorLabel');
  if (cursor && window.matchMedia('(hover: hover)').matches && window.innerWidth > 900) {
    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2;
    let rx = mx,
      ry = my;
    const ring = cursor.querySelector<HTMLElement>('.cursor-ring');
    const dot = cursor.querySelector<HTMLElement>('.cursor-dot');
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!cursor.classList.contains('ready')) cursor.classList.add('ready');
    });
    window.addEventListener('mouseleave', () => cursor.classList.remove('ready'));
    window.addEventListener('mouseenter', () => cursor.classList.add('ready'));
    const raf = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      if (dot) dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      if (cursorLabel)
        cursorLabel.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(raf);
    };
    raf();
    const HOVERABLE =
      'a, button, [data-cursor], .treat-row, .why-card, .bg-card, .rev, .doctor-card, input, select, textarea, .tag, .stat, .step';
    document.addEventListener('mouseover', (e) => {
      const t = (e.target as HTMLElement)?.closest?.(HOVERABLE) as HTMLElement | null;
      if (!t) return;
      const label = t.dataset.cursor || '';
      cursor.classList.add('hover');
      if (label) {
        if (cursorLabel) cursorLabel.textContent = label;
        cursor.classList.add('has-label');
      } else {
        cursor.classList.remove('has-label');
      }
    });
    document.addEventListener('mouseout', (e) => {
      const t = (e.target as HTMLElement)?.closest?.(HOVERABLE);
      if (!t) return;
      cursor.classList.remove('hover', 'has-label');
    });
  }

  if (prefersReducedMotion) {
    if (loader) loader.style.display = 'none';
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((c) => {
      c.style.transform = '';
    });
    if (cursor) cursor.style.display = 'none';
  }
}
