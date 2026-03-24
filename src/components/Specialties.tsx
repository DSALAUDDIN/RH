'use client';

import { motion, Variants } from 'framer-motion';
import { 
  Dna, 
  Microscope, 
  Radiation, 
  Baby, 
  ShieldCheck, 
  Thermometer 
} from 'lucide-react';
import './Specialties.css';

const specialties = [
  {
    title: 'Oral Surgery',
    desc: 'Expert surgical procedures including extractions and reconstructive surgery.',
    icon: Microscope,
  },
  {
    title: 'Periodontology',
    desc: 'Advanced care for gums and supporting structures of the teeth.',
    icon: Dna,
  },
  {
    title: 'Endodontics',
    desc: 'Precise root canal therapy to save your natural teeth.',
    icon: Radiation,
  },
  {
    title: 'Pediatric Dentistry',
    desc: 'Gentle, specialized dental care for our youngest patients.',
    icon: Baby,
  },
  {
    title: 'Preventive Care',
    desc: 'Regular check-ups and cleanings to prevent future issues.',
    icon: ShieldCheck,
  },
  {
    title: 'Diagnostic Imaging',
    desc: 'State-of-the-art 3D imaging for accurate diagnosis and planning.',
    icon: Thermometer,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Specialties() {
  return (
    <section className="section specialties-section">
      <div className="container">
        <div className="section-title">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="subtitle"
          >
            Clinical Excellence
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Our Core Specialties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Precision meets care. Our specialists use the latest medical breakthroughs to provide unparalleled clinical outcomes.
          </motion.p>
        </div>

        <motion.div 
          className="specialties-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {specialties.map((spec, index) => (
            <motion.div 
              key={spec.title} 
              className="specialty-card glass-card"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(0, 115, 230, 0.15)"
              }}
            >
              <div className="spec-icon-box">
                <spec.icon size={32} strokeWidth={1.5} />
              </div>
              <h3>{spec.title}</h3>
              <p>{spec.desc}</p>
              <div className="card-bg-gradient"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
