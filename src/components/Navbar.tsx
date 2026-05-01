'use client';

import React from 'react';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import logo from '../assets/rhlogo.jpeg';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
    { 
      name: 'Specialties', 
      path: '/specialties',
      dropdown: [
        { name: 'Implants', path: '/implants', icon: '🦷', desc: 'Permanent tooth replacement' },
        { name: 'Orthodontics', path: '/orthodontics', icon: '✨', desc: 'Braces & clear aligners' },
        { name: 'Root Canal', path: '/root-canal', icon: '🔬', desc: 'Single-visit precision care' },
        { name: 'View All Specialties', path: '/specialties', icon: '→', desc: '' },
      ]
    },
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
            {navLinks.map((link) => {
              const isActive = pathname === link.path || (link.dropdown && link.dropdown.some(sub => pathname === sub.path) && link.name === 'Specialties');
              return (
                <li 
                  key={link.name} 
                  className={link.dropdown ? 'has-dropdown' : ''}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  <Link 
                    href={link.path} 
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} className="dropdown-icon" />}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-indicator" 
                        className="nav-indicator"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>

                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="dropdown-menu"
                        >
                          {link.dropdown.map((sublink, idx) => (
                            <React.Fragment key={sublink.name}>
                              {idx === link.dropdown!.length - 1 && (
                                <div className="dropdown-separator" />
                              )}
                              <Link 
                                href={sublink.path} 
                                className={`dropdown-item ${pathname === sublink.path ? 'active' : ''} ${idx === link.dropdown!.length - 1 ? 'dropdown-item-all' : ''}`}
                                onClick={() => setActiveDropdown(null)}
                              >
                                {'icon' in sublink && (sublink as {icon: string}).icon !== '→' && (
                                  <span className="dropdown-item-icon">{(sublink as {icon: string}).icon}</span>
                                )}
                                <span className="dropdown-item-text">
                                  <span className="dropdown-item-name">{sublink.name}</span>
                                  {'desc' in sublink && (sublink as {desc: string}).desc && (
                                    <span className="dropdown-item-desc">{(sublink as {desc: string}).desc}</span>
                                  )}
                                </span>
                                {idx === link.dropdown!.length - 1 && (
                                  <span className="dropdown-item-arrow">→</span>
                                )}
                              </Link>
                            </React.Fragment>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-actions">
          <Link href="/contact" className="btn-book" aria-label="Book Now">
            <Phone size={16} aria-hidden="true" />
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
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.dropdown && link.dropdown.some(sub => pathname === sub.path) && link.name === 'Specialties');
                return (
                  <li key={link.name} className={link.dropdown ? 'mobile-has-dropdown' : ''}>
                    <div className="mobile-link-wrapper">
                      <Link 
                        href={link.path} 
                        className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                      {link.dropdown && (
                        <button 
                          className="mobile-dropdown-toggle"
                          onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                        >
                          <ChevronDown size={20} style={{ transform: activeDropdown === link.name ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                        </button>
                      )}
                    </div>
                    {link.dropdown && (
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mobile-dropdown-menu"
                            style={{ overflow: 'hidden' }}
                          >
                            <div className="mobile-dropdown-inner">
                              {link.dropdown.map(sublink => (
                                <Link 
                                  key={sublink.name} 
                                  href={sublink.path}
                                  className={`mobile-dropdown-item ${pathname === sublink.path ? 'active' : ''}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sublink.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
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
