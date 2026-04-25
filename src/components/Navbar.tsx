'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import logo from '../assets/rhlogo.jpeg';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Our Team', path: '/team' },
    { name: 'Specialties', path: '/specialties' },
    { name: 'Implants', path: '/implants' },
    { name: 'Treatments', path: '/treatments' },
    { name: 'Blog', path: '/blog' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar glass-modern">
        <Link href="/" className="logo">
          <Image
            src={logo}
            alt="RH Dental Care logo"
            width={36}
            height={36}
            style={{ borderRadius: '50%', objectFit: 'contain', background: '#fff' }}
            priority
          />
          <span className="logo-text">RH Dental</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.path} 
                  className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <motion.div 
                      layoutId="nav-indicator" 
                      className="nav-indicator"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/contact" className="btn-book">
            <Phone size={16} />
            <span>Book Now</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mobile-nav glass-modern"
          >
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className={`mobile-nav-link ${pathname === link.path ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="btn-book mobile-book-btn" onClick={() => setMobileMenuOpen(false)}>
                  <Phone size={18} />
                  Book Appointment
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
