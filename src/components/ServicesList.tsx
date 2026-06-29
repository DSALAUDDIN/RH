'use client';

import { motion } from 'framer-motion';
import { Sparkles, HeartPulse, Activity, Smile, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import './ServicesList.css';

const services = [
  {
    id: 'aesthetic',
    title: 'Aesthetic Dentistry',
    description: 'Enhance your smile with our premium aesthetic services including veneers, bonding, and total smile makeovers.',
    icon: Sparkles,
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description: 'Achieve perfect alignment with modern clear aligners and traditional braces tailored to your needs.',
    icon: Activity,
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Restore missing teeth with durable, natural-looking implants that function just like your real teeth.',
    icon: HeartPulse,
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    description: 'Brighten your smile dramatically with our safe, effective professional teeth whitening treatments.',
    icon: Smile,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesList({ limit = services.length }: { limit?: number }) {
  const displayedServices = services.slice(0, limit);

  return (
    <section className="services">
      <div className="container">
        <div className="section-title">
          <div className="sl-title-tag"><Sparkles size={14} /> Our Premium Services</div>
          <h2>Exceptional Dental Treatments in Dhaka</h2>
          <p>We combine advanced technology with artistic expertise to deliver world-class dental implants, orthodontics, and cosmetic dentistry in Bangladesh.</p>
        </div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedServices.map((service) => (
            <motion.div key={service.id} className="service-card" variants={itemVariants}>
              <div className="service-icon-wrapper">
                <service.icon size={32} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <Link href={`/services#${service.id}`} className="service-link">
                Learn more about {service.title} <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {limit < services.length && (
          <div className="services-action">
            <Link href="/services" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', borderRadius: '100px', fontSize: '1rem', fontWeight: 800 }}>
              View All Dental Services
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
