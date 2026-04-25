import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, X } from 'lucide-react';
import './FamilyTrustSection.css';
import familyImg from '../assets/history/family/56.jpeg';

export default function FamilyTrustSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section className="fts-section">
      <div className="fts-container">
        <div className="fts-content-grid">
          
          {/* Text Content */}
          <div className="fts-text">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="fts-kicker">
                <Heart size={14} className="fts-heart-icon" /> Trust Across Generations
              </div>
              <h2 className="fts-title">
                Not Just Patients, <br/>We Are <span className="fts-highlight">A Family</span>
              </h2>
              <p className="fts-desc">
                When an entire family trusts us with their smiles, we know we are doing something right. At RH Dental Care, our greatest achievement isn't just clinical excellence—it's the generational trust we've built. We don't just treat teeth; we build lifelong relationships focused on your family's complete oral well-being.
              </p>
              
              <div className="fts-stats">
                <div className="fts-stat-item">
                  <div className="fts-stat-num">13k+</div>
                  <div className="fts-stat-label">Happy Patients</div>
                </div>
                <div className="fts-divider"></div>
                <div className="fts-stat-item">
                  <div className="fts-stat-num">12+</div>
                  <div className="fts-stat-label">Years of Trust</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Highlighted Image */}
          <div className="fts-image-side">
            <motion.div
              className="fts-image-wrapper"
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            >
              <div className="fts-image-glow"></div>
              <Image 
                src={familyImg} 
                alt="A whole family visiting RH Dental Care" 
                fill 
                className="fts-image fts-clickable-img"
                sizes="(max-width: 900px) 100vw, 50vw"
                onClick={() => setLightboxOpen(true)}
              />
              
              {/* Floating Badge */}
              <motion.div 
                className="fts-badge"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', damping: 15 }}
                viewport={{ once: true }}
              >
                <div className="fts-badge-icon-wrap">
                  <Users size={18} />
                </div>
                <div className="fts-badge-text">
                  <strong>Trusted</strong>
                  <span>by Families</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            className="fts-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button className="fts-lightbox-close" onClick={() => setLightboxOpen(false)}>
              <X size={24} />
            </button>
            <motion.div 
              className="fts-lightbox-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={familyImg} 
                alt="Family Patient Details" 
                fill
                sizes="100vw"
                className="fts-lightbox-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
