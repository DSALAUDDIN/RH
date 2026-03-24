'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import './VideoSection.css';

export default function VideoSection() {
  return (
    <section className="section video-highlight">
      <div className="container">
        <div className="section-title text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="subtitle"
          >
            Inside Our Clinic
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Experience Premium Care
          </motion.h2>
        </div>

        <motion.div 
          className="video-container glass"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="video-wrapper">
            {/* Placeholder video from Pexels/Unsplash or similar */}
            <video 
              className="main-video"
              autoPlay 
              muted 
              loop 
              playsInline
              poster="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patients-teeth-with-a-mirror-40243-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="video-overlay">
              <motion.button 
                className="play-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="play-icon-circle">
                  <Play size={32} fill="white" />
                </div>
                <span>Watch Tour</span>
              </motion.button>
            </div>
          </div>
          
          <div className="video-stats-overlay glass">
            <div className="v-stat">
              <h4>Advanced Tech</h4>
              <p>State-of-the-art facilities</p>
            </div>
            <div className="v-divider"></div>
            <div className="v-stat">
              <h4>Comfort First</h4>
              <p>Relaxing environment</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
