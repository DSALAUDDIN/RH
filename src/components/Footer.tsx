import Link from 'next/link';
import { CircleCheck, MapPin, Phone, Mail } from 'lucide-react';
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
              <CircleCheck className="logo-icon accent-blue" size={28} />
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
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Our Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-links">
            <h3>Our Services</h3>
            <ul>
              <li><Link href="/services#aesthetic">Aesthetic Dentistry</Link></li>
              <li><Link href="/services#orthodontics">Orthodontics</Link></li>
              <li><Link href="/services#implants">Dental Implants</Link></li>
              <li><Link href="/services#whitening">Teeth Whitening</Link></li>
              <li><Link href="/services#pediatric">Pediatric Dentistry</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <MapPin size={20} className="contact-icon" />
                <span>123 Ocean View Drive, Suite 400<br/>Blue Bay, CA 90210</span>
              </li>
              <li>
                <Phone size={20} className="contact-icon" />
                <span><a href="tel:+1234567890">(123) 456-7890</a></span>
              </li>
              <li>
                <Mail size={20} className="contact-icon" />
                <span><a href="mailto:info@rhdentalclinic.com">info@rhdentalclinic.com</a></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RH Dental Clinic. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
