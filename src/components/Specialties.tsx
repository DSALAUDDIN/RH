'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import './Specialties.css';

import bracesImg from '../assets/specialties/braces_new.png';
import zirconiaImg from '../assets/specialties/zirconia_new.png';
import implantImg from '../assets/specialties/implant_new.png';
import rootCanalImg from '../assets/specialties/root-canal_new.png';
import gumCareImg from '../assets/specialties/gum-care_new.png';
import kidsCareImg from '../assets/specialties/kids-care.jpg';
import aestheticsImg from '../assets/specialties/aesthetic_new.png';
import dentalTourismImg from '../assets/specialties/dental_tourism.png';

const clinicsBanners = [
  {
    title: 'Clear Aligner Treatment',
    desc: 'Straighten your teeth with nearly invisible custom aligners. Modern clear aligner therapy for discreet, comfortable orthodontic correction.',
    image: bracesImg,
    category: 'Orthodontics',
    featured: true,
    slug: '/orthodontics',
  },
  {
    title: 'Advanced Implantology',
    desc: 'Long-term tooth replacement with 3D CBCT-planned, precision-guided implant surgery and high-quality prosthetic integration.',
    image: implantImg,
    category: 'Surgical Care',
    featured: false,
    slug: '/implants',
  },
  {
    title: 'Zirconia Smile Design',
    desc: 'Natural-looking zirconia crowns and veneers crafted in our on-site master digital lab — strong, biocompatible and aesthetically precise.',
    image: zirconiaImg,
    category: 'Aesthetics',
    featured: false,
    slug: '/zirconia-crown',
  },
  {
    title: 'Microscopic Endodontics',
    desc: 'Root canal treatment performed under an operating microscope — seeing the canal rather than feeling for it is what makes the difference.',
    image: rootCanalImg,
    category: 'Endodontics',
    featured: false,
    slug: '/root-canal',
  },
  {
    title: 'Orthodontic Braces',
    desc: 'Traditional and ceramic braces fitted and monitored by our consultant orthodontist. Precise, lasting correction for all ages.',
    image: bracesImg,
    category: 'Orthodontics',
    featured: false,
    slug: '/orthodontics',
  },
  {
    title: 'Healthy Gums, Healthy Smile',
    desc: 'Advanced periodontal care to treat gum diseases and protect your oral health for the long term.',
    image: gumCareImg,
    category: 'Periodontics',
    featured: false,
    slug: '/specialties/gum-care',
  },
  {
    title: 'Kids Dental Care',
    desc: 'Making dental visits gentle and reassuring for your child in a safe, friendly environment.',
    image: kidsCareImg,
    category: 'Pedodontics',
    featured: false,
    slug: '/kids-care',
  },
  {
    title: 'Zirconia Veneers',
    desc: 'Achieve a naturally beautiful, long-lasting smile with ultra-thin premium zirconia veneers, designed and milled on site.',
    image: aestheticsImg,
    category: 'Aesthetics',
    featured: true,
    slug: '/zirconia-veneers',
  },
  {
    title: 'RH Dental Tourism',
    desc: 'Treatment planned before you fly, scheduled around a short stay in Bangladesh. Airport pickup, lodging and sightseeing support arranged.',
    image: dentalTourismImg,
    category: 'Global Travel Care',
    featured: true,
    slug: '/dental-tourism',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 70, damping: 15 },
  },
};

export default function Specialties() {
  return (
    <section className="specialties-section">
      {/* Soft glow at the dark→light transition zone */}
      <div className="spec-glow" />

      <div className="specialties-inner">
        {/* Header — sits in the dark zone, uses white text */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <span className="tag">Signature Experience</span>
          <h2>Specialist Dental Care in Dhaka</h2>
          <p>
            RH Dental Care provides specialist dental treatment in Dhaka — including dental implants,
            clear aligners and microscope root canal treatment, tailored to your needs.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="specialties-showcase"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {clinicsBanners.map((card, index) => (
            <motion.div
              key={card.title}
              className={`premium-card ${card.featured ? 'featured' : 'standard'}`}
              variants={itemVariants}
            >
              {/* Image — full-width cover, part of card, subtle overlay */}
              <div className="card-img-wrapper">
                <Image
                  src={card.image}
                  alt={`${card.title} - Dental Treatment at RH Dental Care Dhaka`}
                  fill
                  loading={card.featured || index < 2 ? 'eager' : 'lazy'}
                  priority={card.featured && index === 0}
                  sizes={
                    card.featured
                      ? '(max-width: 768px) 100vw, 40vw'
                      : '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  }
                  className="card-img"
                  style={{ objectFit: 'cover' }}
                />
                <div className="card-overlay" />
              </div>

              <div className="card-body">
                <span className="card-tag">{card.category}</span>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <Link
                  href={card.slug.startsWith('/') ? card.slug : `/${card.slug}`}
                  className="view-link"
                >
                  <span>View {card.title} Details</span>
                  <ArrowRight size={16} className="arrow" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA — sits on the near-white zone */}
        <motion.div
          className="section-footer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/treatments"
            className="explore-btn"
            style={{
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            Explore All Treatments
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
