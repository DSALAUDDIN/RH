import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, MessageCircle, Clock, Shield } from 'lucide-react';
import logo from '../assets/rhlogo.jpeg';
import './Footer.css';
import { BRANCHES } from '@/lib/branches';

// SVG social icons
const Facebook = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const Twitter = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const Instagram = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Linkedin = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* ── Brand ── */}
          <div className="footer-brand">
            <div className="footer-tagline">
              <Shield size={12} /> BMDC Certified Specialists
            </div>
            <Link href="/" className="logo">
              <Image
                src={logo}
                alt="RH Dental Care logo"
                width={44}
                height={44}
                style={{ borderRadius: '50%', objectFit: 'contain', background: '#fff' }}
              />
              <span className="logo-text">RH Dental Care</span>
            </Link>
            <p className="footer-desc">
              Experience premium dental care in Dhaka. Advanced aesthetics, oral surgery, digital dentistry & implants in a state-of-the-art 3,500 sq.ft facility.
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/share/18YJPadCbX/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link"><Facebook size={18} /></a>
              <a href="#" aria-label="Twitter" className="social-link"><Twitter size={18} /></a>
              <a href="#" aria-label="Instagram" className="social-link"><Instagram size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="social-link"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* ── Links & Specialties ── */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul style={{ marginBottom: '2rem' }}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Our Clinic</Link></li>
              <li><Link href="/banani">Banani VIP Suite</Link></li>
              <li><Link href="/banasree">Banasree Flagship Hospital</Link></li>
              <li><Link href="/treatments">Treatments</Link></li>
              <li><Link href="/contact">Contact Hub</Link></li>
            </ul>

            <h3>Specialties</h3>
            <ul>
              <li><Link href="/implants">Dental Implants</Link></li>
              <li><Link href="/braces">Braces & Aligners</Link></li>
              <li><Link href="/root-canal">Root Canal</Link></li>
              <li><Link href="/digital-dentistry">Digital Dentistry</Link></li>
            </ul>
          </div>

          {/* ── Banasree Branch Card ── */}
          <div className="location-card">
            <div className="location-map-wrap">
              <iframe
                title="Banasree Branch Map"
                src="https://maps.google.com/maps?q=RH%20Dental%20Care,%20House%2042,%20Road%208,%20Block%20C,%20Banasree,%20Dhaka&t=&z=15&ie=UTF8&iwloc=&output=embed"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="location-content">
              <h4><MapPin size={18} /> Banasree Branch (Flagship)</h4>
              <ul>
                <li>
                  <MapPin size={16} className="contact-icon" style={{ marginTop: '2px' }} />
                  <span>House 42, Road 8, Block C<br/>Banasree, Dhaka</span>
                </li>
                <li>
                  <Phone size={16} className="contact-icon" /> 
                  <a href={`tel:${BRANCHES.banasree.phone}`} style={{ fontWeight: 600, color: '#E4E0D2' }}>{BRANCHES.banasree.phoneDisplay}</a>
                </li>
                <li>
                  <Clock size={16} className="contact-icon" />
                  <span>3:00 PM – 10:00 PM (Thu: Closed)</span>
                </li>
              </ul>
              <div style={{ marginTop: '10px' }}>
                <Link href="/banasree" style={{ fontSize: '0.82rem', color: 'var(--rh-brass)', textDecoration: 'none', fontWeight: 600 }}>
                  Explore Flagship Hospital →
                </Link>
              </div>
            </div>
          </div>

          {/* ── Banani Branch Card ── */}
          <div className="location-card">
            <div className="location-map-wrap">
              <iframe
                title="Banani Branch Map"
                src="https://maps.google.com/maps?q=Plot%20116,%20Road%2011,%20Banani,%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="location-content">
              <h4><MapPin size={18} /> Banani Branch (Private Suite)</h4>
              <ul>
                <li>
                  <MapPin size={16} className="contact-icon" style={{ marginTop: '2px' }} />
                  <span>Level 7 (B&B Empire)<br/>Plot 116, Road 11, Banani</span>
                </li>
                <li>
                  <Phone size={16} className="contact-icon" /> 
                  <a href={`tel:${BRANCHES.banani.phone}`} style={{ fontWeight: 600, color: '#E4E0D2' }}>{BRANCHES.banani.phoneDisplay}</a>
                </li>
                <li>
                  <Mail size={16} className="contact-icon" />
                  <span><a href="mailto:drhasan0712@gmail.com">drhasan0712@gmail.com</a></span>
                </li>
              </ul>
              <div style={{ marginTop: '10px' }}>
                <Link href="/banani" style={{ fontSize: '0.82rem', color: 'var(--rh-brass)', textDecoration: 'none', fontWeight: 600 }}>
                  Explore Private Suite →
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ── Payment Methods ── */}
        <div className="footer-payments">
          <div className="footer-payments-inner">
            <h3>We Accept</h3>
            <div className="payment-icons">
              {/* Visa */}
              <div className="pay-badge" style={{ backgroundColor: '#fff', border: '1px solid #E4E0D2' }}>
                <span style={{ color: '#1434CB', fontStyle: 'italic', fontWeight: 600, fontSize: '18px', letterSpacing: '-0.5px' }}>VISA</span>
              </div>
              {/* Mastercard */}
              <div className="pay-badge" style={{ backgroundColor: '#fff', border: '1px solid #E4E0D2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#EB001B', position: 'relative', zIndex: 1 }}></div>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#F79E1B', marginLeft: '-8px', position: 'relative', zIndex: 0 }}></div>
              </div>
              {/* Amex */}
              <div className="pay-badge" style={{ backgroundColor: '#006FCF' }}>
                <span style={{ color: 'var(--rh-ink)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', lineHeight: 1.1, textAlign: 'center', letterSpacing: '0.5px' }}>AMEX</span>
              </div>
              {/* Nexus */}
              <div className="pay-badge" style={{ backgroundColor: '#fff', border: '1px solid #E4E0D2' }}>
                <span style={{ color: '#005BBB', fontWeight: 600, fontSize: '15px', fontStyle: 'italic' }}>Nexus</span>
              </div>
              {/* bKash */}
              <div className="pay-badge" style={{ backgroundColor: '#DF146E' }}>
                <span style={{ color: 'var(--rh-ink)', fontWeight: 700, fontSize: '16px' }}>bKash</span>
              </div>
              {/* NPSB */}
              <div className="pay-badge" style={{ backgroundColor: '#fff', border: '1px solid #E4E0D2' }}>
                <span style={{ color: '#008C44', fontWeight: 600, fontSize: '15px' }}>NPSB</span>
              </div>
              {/* Google Pay */}
              <div className="pay-badge" style={{ backgroundColor: '#fff', border: '1px solid #E4E0D2', gap: '4px' }}>
                <span style={{ color: '#4285F4', fontWeight: 700, fontSize: '16px' }}>G</span>
                <span style={{ color: '#5F6368', fontWeight: 500, fontSize: '16px' }}>Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} RH Dental Care & Implant Center — Banasree, Dhaka. All Rights Reserved.
            <span style={{ margin: '0 8px', opacity: 0.5 }}>|</span>
            Powered by <a href="https://www.zitra.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>www.zitra.org</a>
          </p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
