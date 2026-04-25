import React, { useRef, useState, JSX } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, useInView, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { Calendar, Building, Rocket, Zap, Microscope, Star, ArrowUpRight, CheckCircle, TrendingUp, X, Sparkles } from 'lucide-react';
import './EvolutionTimeline.css';

// 2014
import img14a from '../assets/history/2014/6.jpeg';
import img14b from '../assets/history/2014/7.jpeg';
import img14c from '../assets/history/2014/8.jpeg';

// 2015
import img15a from '../assets/history/2015/10.jpeg';
import img15b from '../assets/history/2015/12.jpeg';
import img15c from '../assets/history/2015/14.jpeg';

// 2019
import img19a from '../assets/history/2019/15.jpeg';
import img19b from '../assets/history/2019/16.jpeg';
import img19c from '../assets/history/2019/18.jpeg';

// 2021
import img21a from '../assets/history/2021/19.jpeg';
import img21b from '../assets/history/2021/20.jpeg';
import img21c from '../assets/history/2021/21.jpeg';

// 2022
import img22a from '../assets/history/2022/22.jpeg';
import img22b from '../assets/history/2022/23.jpeg';
import img22c from '../assets/history/2022/25.jpeg';

// 2024
import img24a from '../assets/history/2024/26.jpeg';
import img24b from '../assets/history/2024/27.jpeg';
import img24c from '../assets/history/2024/34.jpeg';

// 2025
import img25a from '../assets/history/2025/35.jpeg';
import img25b from '../assets/history/2025/36.jpeg';
import img25c from '../assets/history/2025/38.jpeg';

// 2026
import img26a from '../assets/history/2026/52.jpeg';
import img26b from '../assets/history/2026/53.jpeg';
import img26c from '../assets/history/2026/54.jpeg';

interface TimelineItemData {
  year: string;
  title: string;
  subtitle: string;
  desc: string;
  images: StaticImageData[];
  icon: JSX.Element;
  color: string;
}

const timelineData: TimelineItemData[] = [
  {
    year: '2014',
    title: 'The Inception',
    subtitle: 'Where it all began',
    desc: 'With a strong vision and a commitment to patient-centered care, we laid the foundation of RH Dental Care. Our focus was on providing honest, effective, and ethical dental treatments from day one.',
    images: [img14a, img14b, img14c],
    icon: <Calendar size={20} />,
    color: '#94a3b8'
  },
  {
    year: '2015',
    title: 'Gaining Trust',
    subtitle: 'Building a patient family',
    desc: 'As our reputation grew, so did our patient base. We started expanding our basic clinical facilities to accommodate more patients, always prioritizing quality and hygiene.',
    images: [img15a, img15b, img15c],
    icon: <Building size={20} />,
    color: '#64748b'
  },
  {
    year: '2019',
    title: 'Clinical Upgrade',
    subtitle: 'Elevating standards',
    desc: 'A significant milestone in upgrading our clinical infrastructure. We brought in new-generation dental chairs and improved our sterilization protocols to meet international standards.',
    images: [img19a, img19b, img19c],
    icon: <Rocket size={20} />,
    color: '#0ea5e9'
  },
  {
    year: '2021',
    title: 'Post-Pandemic Resilience',
    subtitle: 'Safety-first dentistry',
    desc: 'Adapting to the new normal, we transformed our clinic with hospital-grade sterilization protocols and specialized air filtration, ensuring an absolutely safe environment for every patient.',
    images: [img21a, img21b, img21c],
    icon: <CheckCircle size={20} />,
    color: '#10b981'
  },
  {
    year: '2022',
    title: 'Digital Transformation',
    subtitle: 'Entering the digital era',
    desc: 'We fully integrated digital workflows into our practice. From digital x-rays to intraoral cameras, we began diagnosing with unprecedented clarity and precision.',
    images: [img22a, img22b, img22c],
    icon: <Zap size={20} />,
    color: '#8b5cf6'
  },
  {
    year: '2024',
    title: 'Advanced Surgical Hub',
    subtitle: 'Expanding our expertise',
    desc: 'Our transition to a multi-specialty center. We established dedicated operating theaters for complex procedures like dental implants, oral surgeries, and full-mouth rehabilitations.',
    images: [img24a, img24b, img24c],
    icon: <Microscope size={20} />,
    color: '#eab308'
  },
  {
    year: '2025',
    title: 'In-House Laboratory',
    subtitle: 'Precision at speed',
    desc: 'To offer the highest quality prosthetics with minimal waiting times, we launched our own advanced in-house dental laboratory, giving us total control over aesthetic outcomes.',
    images: [img25a, img25b, img25c],
    icon: <Star size={20} />,
    color: '#f43f5e'
  },
  {
    year: '2026',
    title: 'State-of-the-Art Excellence',
    subtitle: 'A premier dental destination',
    desc: 'Today, RH Dental Care stands as a 3,500 sq.ft state-of-the-art facility. Featuring GA OT, 3D imaging, and a team of specialists — we are setting new benchmarks in modern dentistry.',
    images: [img26a, img26b, img26c],
    icon: <ArrowUpRight size={20} />,
    color: '#0284c7'
  }
];

export default function EvolutionTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<StaticImageData | null>(null);

  // Advanced scroll progress tracking for the connecting line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="et-section" id="our-history">
      {/* Background Orbs for Cinematic feel */}
      <div className="et-bg-orb et-orb-1"></div>
      <div className="et-bg-orb et-orb-2"></div>
      
      <div className="et-container">
        
        {/* Header */}
        <div className="et-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="et-kicker">
              <Sparkles size={14} /> 12+ Years of Growth
            </span>
            <h2 className="et-title">
              Our Journey of <span className="et-highlight">Evolution</span>
            </h2>
            <p className="et-subtitle">
              Take a walk through time. From 2014 to today, witness how RH Dental Care continuously evolved its facility, technology, and expertise to deliver world-class care.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="et-timeline-wrapper" ref={containerRef}>
          {/* Base muted line */}
          <div className="et-line-base"></div>
          
          {/* Animated glowing progress line */}
          <motion.div 
            className="et-line-progress" 
            style={{ scaleY, transformOrigin: 'top' }}
          ></motion.div>

          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <TimelineItem 
                key={item.year} 
                item={item} 
                isEven={isEven} 
                index={index} 
                onImageClick={(img) => setActiveImage(img)}
              />
            );
          })}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            className="et-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <button className="et-lightbox-close" onClick={() => setActiveImage(null)}>
              <X size={24} />
            </button>
            <motion.div 
              className="et-lightbox-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={activeImage} 
                alt="Clinic Evolution Details" 
                fill
                sizes="100vw"
                className="et-lightbox-img"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TimelineItem({ item, isEven, index, onImageClick }: { item: TimelineItemData, isEven: boolean, index: number, onImageClick: (img: StaticImageData) => void }) {
  const ref = useRef(null);
  // Trigger animation slightly before it reaches the center for better flow
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' });

  // Stagger variants for the images
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 } as any
    }
  };

  return (
    <div className={`et-item ${isEven ? 'et-item-left' : 'et-item-right'}`} ref={ref}>
      
      {/* Center Marker - Pulsing when in view */}
      <motion.div 
        className="et-marker"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', damping: 12, delay: 0.1 }}
        style={{ borderColor: item.color, boxShadow: inView ? `0 0 20px ${item.color}60` : 'none' }}
      >
        <div className="et-marker-icon" style={{ color: item.color }}>
          {item.icon}
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div 
        className="et-content"
        initial={{ opacity: 0, x: isEven ? 60 : -60 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="et-card">
          <motion.div 
            className="et-card-year" 
            style={{ color: item.color }}
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {item.year}
          </motion.div>
          <motion.h3 
            className="et-card-title"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {item.title}
          </motion.h3>
          <motion.div 
            className="et-card-subtitle" 
            style={{ color: item.color }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {item.subtitle}
          </motion.div>
          <motion.p 
            className="et-card-desc"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {item.desc}
          </motion.p>
        </div>
      </motion.div>

      {/* Image Side (Staggered Bento Cluster) */}
      <div className="et-visual">
        <motion.div 
          className="et-image-cluster"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div className="et-cluster-main" variants={itemVariants} onClick={() => onImageClick(item.images[0])}>
            <Image src={item.images[0]} alt={`RH Dental Care ${item.year}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="et-img" />
            <div className="et-image-overlay" style={{ background: `linear-gradient(to top right, ${item.color}40, transparent)` }}></div>
          </motion.div>
          
          <div className="et-cluster-side">
            <motion.div className="et-cluster-sub" variants={itemVariants} onClick={() => onImageClick(item.images[1])}>
              <Image src={item.images[1]} alt={`RH Dental Care ${item.year} details`} fill sizes="(max-width: 768px) 50vw, 25vw" className="et-img" />
            </motion.div>
            <motion.div className="et-cluster-sub" variants={itemVariants} onClick={() => onImageClick(item.images[2])}>
              <Image src={item.images[2]} alt={`RH Dental Care ${item.year} details`} fill sizes="(max-width: 768px) 50vw, 25vw" className="et-img" />
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
