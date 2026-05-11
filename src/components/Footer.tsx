import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, MessageCircle, Clock, Shield } from 'lucide-react';
import logo from '../assets/rhlogo.jpeg';
import './Footer.css';

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

          {/* ── Quick Links ── */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Our Clinic</Link></li>
              <li><Link href="/our-team">Our Team</Link></li>
              <li><Link href="/treatments">Treatments & Pricing</Link></li>
              <li><Link href="/blog">Dental Blog</Link></li>
              <li><Link href="/contact">Book Appointment</Link></li>
            </ul>
          </div>

          {/* ── Specialties ── */}
          <div className="footer-links">
            <h3>Specialties</h3>
            <ul>
              <li><Link href="/implants">Dental Implants</Link></li>
              <li><Link href="/braces">Braces & Aligners</Link></li>
              <li><Link href="/root-canal">Root Canal</Link></li>
              <li><Link href="/zirconia-crown">Zirconia Crowns</Link></li>
              <li><Link href="/zirconia-veneers">Zirconia Veneers</Link></li>
              <li><Link href="/digital-dentistry">Digital Dentistry</Link></li>
            </ul>
          </div>

          {/* ── Contact + Map ── */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>House 42, Road 8, Block C<br />Banasree, Rampura<br />Dhaka - 1219, Bangladesh</span>
              </li>
              <li>
                <Phone size={16} className="contact-icon" />
                <span><a href="tel:+8801775227902">01775-227902</a></span>
              </li>
              <li>
                <MessageCircle size={16} className="contact-icon" style={{ color: '#25D366' }} />
                <span><a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer">WhatsApp Us</a></span>
              </li>
              <li>
                <Mail size={16} className="contact-icon" />
                <span><a href="mailto:drhasan0712@gmail.com">drhasan0712@gmail.com</a></span>
              </li>
              <li>
                <Clock size={16} className="contact-icon" />
                <span>Sat–Thu: 8am–7pm &nbsp;|&nbsp; Fri: Closed</span>
              </li>
            </ul>

            {/* Fixed Google Maps embed */}
            <div className="footer-map-wrap">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.1836565707977!2d90.43294!3d23.7476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b0a0b0b0b1%3A0x1!2sRH+Dental+Care+and+Implant+Center%2C+House+42%2C+Road+8%2C+Block+C%2C+Banasree%2C+Rampura%2C+Dhaka+1219!5e0!3m2!1sen!2sbd!4v1700000000000"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RH Dental Care location on Google Maps"
              ></iframe>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RH Dental Care & Implant Center — Banasree, Dhaka. All Rights Reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
