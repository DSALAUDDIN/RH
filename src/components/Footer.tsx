import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '../assets/rhlogo.jpeg';
import './Footer.css';

// SVG components for social icons
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
    <footer className="footer section bg-secondary">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
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
              Experience premium dental care at RH Dental Care. We offer advanced aesthetic dentistry, oral surgery, and implants in a state-of-the-art facility.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-link"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter" className="social-link"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram" className="social-link"><Instagram size={20} /></a>
              <a href="#" aria-label="LinkedIn" className="social-link"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Dental Services in Dhaka</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Our Clinic</Link></li>
              <li><Link href="/services">Dental Treatments</Link></li>
              <li><Link href="/contact">Book Appointment</Link></li>
              <li><Link href="/faq">Dental FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h3>Specialized Treatments</h3>
            <ul>
              <li><Link href="/services#implants">Dental Implants Dhaka</Link></li>
              <li><Link href="/services#orthodontics">Braces & Aligners</Link></li>
              <li><Link href="/services#root-canal">Painless Root Canal</Link></li>
              <li><Link href="/services#aesthetic">Smile Design & Veneers</Link></li>
              <li><Link href="/services#whitening">Teeth Whitening</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <MapPin size={20} className="contact-icon" style={{ flexShrink: 0, marginTop: '4px' }} />
                <span>House: 42, Road: 8, Block: C<br/>Banasree, Rampura<br/>Dhaka - 1219, Bangladesh</span>
              </li>
              <li>
                <Phone size={20} className="contact-icon" style={{ flexShrink: 0 }} />
                <span><a href="tel:+8801775227902">01775-227902</a></span>
              </li>
              <li>
                <Mail size={20} className="contact-icon" style={{ flexShrink: 0 }} />
                <span><a href="mailto:drhasan07012@gmail.com">drhasan07012@gmail.com</a></span>
              </li>
            </ul>
            
            <div style={{ marginTop: '1.5rem', height: '150px', borderRadius: '1rem', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative' }}>
              <iframe 
                src="https://www.google.com/maps?q=RH+Dental+Care+and+Implant+Center&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RH Dental Clinic - Best Dentist in Dhaka, Bangladesh. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
