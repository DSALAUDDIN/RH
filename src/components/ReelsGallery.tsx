'use client';

import { motion } from 'framer-motion';
import { Play, Heart, MessageCircle } from 'lucide-react';
import './ReelsGallery.css';

const InstagramIcon = ({ size = 20, className = '' }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const reels = [
  {
    id: 1,
    title: 'Modern Aesthetic Dentistry',
    views: '12k',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-examining-a-patient-s-teeth-31464-large.mp4',
    poster: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    title: 'Transform Your Smile',
    views: '24k',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patients-teeth-with-a-mirror-40243-large.mp4',
    poster: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    title: 'Painless Care Experience',
    views: '8k',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-examining-a-patient-s-teeth-in-his-clinic-31465-large.mp4',
    poster: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    title: 'Patient Transformation Story',
    views: '45k',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dentist-checking-a-patient-s-teeth-31463-large.mp4',
    poster: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400',
  },
];

export default function ReelsGallery() {
  return (
    <section className="section reels-gallery">
      <div className="container">
        <div className="section-title text-center">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="subtitle"
          >
            Trending News
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Watch Our Reels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Stay updated with our latest patient transformations and clinical breakthroughs in short, engaging videos.
          </motion.p>
        </div>

        <div className="reels-grid">
          {reels.map((reel, index) => (
            <motion.div 
              key={reel.id}
              className="reel-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="reel-video-wrapper">
                <video 
                  className="reel-video"
                  loop 
                  muted 
                  playsInline
                  poster={reel.poster}
                  onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                  onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                >
                  <source src={reel.videoUrl} type="video/mp4" />
                </video>
                
                <div className="reel-overlay">
                  <div className="reel-top">
                    <span className="reel-views"><Play size={14} className="mr-1" style={{ marginRight: '4px' }} /> {reel.views}</span>
                    <InstagramIcon size={20} className="reel-insta" />
                  </div>
                  
                  <div className="reel-bottom">
                    <h4 className="reel-title">{reel.title}</h4>
                    <div className="reel-actions">
                      <span className="r-action"><Heart size={18} /></span>
                      <span className="r-action"><MessageCircle size={18} /></span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
