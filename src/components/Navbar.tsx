'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';
import logo from '../assets/rhlogo.jpeg';
import { useBranch } from './branch/BranchProvider';
import BranchCTA from './branch/BranchCTA';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { branch, setBranch } = useBranch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'About',
      path: '/about',
      dropdown: [
        { name: 'About Us', path: '/about', icon: '🏥', desc: 'Our history & mission' },
        { name: 'Banani Branch', path: '/banani', icon: '🌟', desc: 'Premium Care at Banani' },
        { name: 'Banasree Branch', path: '/banasree', icon: '📍', desc: 'Our Flagship Hospital' },
      ],
    },
    { name: 'Our Team', path: '/team' },
    {
      name: 'Specialties',
      path: '/specialties',
      dropdown: [
        { name: 'Implants', path: '/implants', icon: '🦷', desc: 'Permanent tooth replacement' },
        {
          name: 'Orthodontics',
          path: '/orthodontics',
          icon: '✨',
          desc: 'Braces & clear aligners',
        },
        {
          name: 'Root Canal',
          path: '/root-canal',
          icon: '🔬',
          desc: 'Single-visit precision care',
        },
        {
          name: 'Zirconia Crown',
          path: '/zirconia-crown',
          icon: '👑',
          desc: 'Premium smile restoration',
        },
        {
          name: 'Zirconia Veneers',
          path: '/zirconia-veneers',
          icon: '💎',
          desc: 'Flawless smile transformation',
        },
        {
          name: 'Kids Care (Pediatric)',
          path: '/kids-care',
          icon: '🧸',
          desc: 'Dentistry for children',
        },
        {
          name: 'Dental Surgery',
          path: '/dental-surgery',
          icon: '🔴',
          desc: 'Advanced oral surgical care',
        },
        {
          name: 'Digital Dentistry',
          path: '/digital-dentistry',
          icon: '🔵',
          desc: '3D scanning & CAD/CAM',
        },
        {
          name: 'RH Dental Tourism',
          path: '/dental-tourism',
          icon: '✈️',
          desc: 'Planning treatment from abroad',
        },
        { name: 'View All Specialties', path: '/specialties', icon: '→', desc: '' },
      ],
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
          <div className="logo-text-group">
            <span className="logo-text">RH Dental</span>
            <span className="logo-est">Since 2014</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isDropdownActive =
                link.dropdown && link.dropdown.some((sub) => pathname === sub.path);
              const isActive =
                pathname === link.path ||
                (isDropdownActive && link.name === 'Specialties') ||
                (isDropdownActive && link.name === 'About');
              return (
                <li
                  key={link.name}
                  className={link.dropdown ? 'has-dropdown' : ''}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                >
                  <Link href={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
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
                                {'icon' in sublink &&
                                  (sublink as { icon: string }).icon !== '→' && (
                                    <span className="dropdown-item-icon">
                                      {(sublink as { icon: string }).icon}
                                    </span>
                                  )}
                                <span className="dropdown-item-text">
                                  <span className="dropdown-item-name">{sublink.name}</span>
                                  {'desc' in sublink && (sublink as { desc: string }).desc && (
                                    <span className="dropdown-item-desc">
                                      {(sublink as { desc: string }).desc}
                                    </span>
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
          {/* Direct Dual-Branch Switcher */}
          <div className="direct-branch-switcher" role="radiogroup" aria-label="Select Clinic Branch">
            <Link
              href="/banani"
              onClick={() => setBranch('banani', 'header_direct')}
              className={`direct-branch-btn ${branch === 'banani' ? 'active-banani' : ''}`}
              aria-label="Banani Branch — Private Dental Suite, Road 11"
              aria-checked={branch === 'banani'}
              role="radio"
              title="Banani Branch — Private Dental Suite (Road 11)"
            >
              <span className="direct-branch-dot banani-dot" />
              <span className="direct-branch-name">Banani</span>
              {branch === 'banani' && <CheckCircle2 size={11} className="direct-branch-check" />}
            </Link>

            <Link
              href="/banasree"
              onClick={() => setBranch('banasree', 'header_direct')}
              className={`direct-branch-btn ${branch === 'banasree' ? 'active-banasree' : ''}`}
              aria-label="Banasree Branch — Flagship Dental Hospital, Block C"
              aria-checked={branch === 'banasree'}
              role="radio"
              title="Banasree Branch — Flagship Dental Hospital (Block C)"
            >
              <span className="direct-branch-dot banasree-dot" />
              <span className="direct-branch-name">Banasree</span>
              {branch === 'banasree' && <CheckCircle2 size={11} className="direct-branch-check" />}
            </Link>
          </div>


          <BranchCTA action="book" className="btn-book">
            <Phone size={16} aria-hidden="true" />
            <span>Book</span>
          </BranchCTA>

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
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mobile-nav glass-modern"
          >
            <ul className="mobile-nav-links">
              <li className="mobile-branch-section">
                <p className="mobile-branch-label">Choose Branch</p>
                <div className="mobile-branch-buttons">
                  <Link
                    href="/banani"
                    onClick={() => {
                      setBranch('banani', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                    className={`mobile-branch-btn ${branch === 'banani' ? 'active-banani' : ''}`}
                  >
                    <div className="mobile-branch-btn-inner">
                      <span className="mobile-branch-name">Banani Branch</span>
                      <span className="mobile-branch-tag">Private Dental Suite</span>
                    </div>
                    <ArrowRight size={15} />
                  </Link>

                  <Link
                    href="/banasree"
                    onClick={() => {
                      setBranch('banasree', 'mobile_menu');
                      setMobileMenuOpen(false);
                    }}
                    className={`mobile-branch-btn ${branch === 'banasree' ? 'active-banasree' : ''}`}
                  >
                    <div className="mobile-branch-btn-inner">
                      <span className="mobile-branch-name">Banasree Branch</span>
                      <span className="mobile-branch-tag">Flagship Dental Hospital</span>
                    </div>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </li>
              {navLinks.map((link) => {
                const isDropdownActive =
                  link.dropdown && link.dropdown.some((sub) => pathname === sub.path);
                const isActive =
                  pathname === link.path ||
                  (isDropdownActive && link.name === 'Specialties') ||
                  (isDropdownActive && link.name === 'About');
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
                          onClick={() =>
                            setActiveDropdown(activeDropdown === link.name ? null : link.name)
                          }
                        >
                          <ChevronDown
                            size={20}
                            style={{
                              transform: activeDropdown === link.name ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.2s',
                            }}
                          />
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
                              {link.dropdown.map((sublink) => (
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
                <BranchCTA
                  action="book"
                  className="btn-book mobile-book-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone size={18} />
                  Book an appointment
                </BranchCTA>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
