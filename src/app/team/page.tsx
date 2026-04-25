'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, X, Users, Award, ShieldCheck, Briefcase, Download } from 'lucide-react';
import './team.css';

/* ── Asset Imports ── */
import imgMehedi from '../../assets/Doctor_List/Mehedi.jpeg';
import imgMehediClean from '../../assets/doctors/mehedi_clean.jpeg';
import imgShimia from '../../assets/Doctor_List/shimia_flyer.jpeg';
import imgShimiaClean from '../../assets/doctors/shimia_clean.jpeg';
import imgAfzal from '../../assets/Doctor_List/Afzal.jpeg';
import imgTamima from '../../assets/Doctor_List/Tamima.jpeg';
import imgTamanna from '../../assets/Doctor_List/Tamanna.jpeg';
import imgHreedy from '../../assets/Doctor_List/Hreedy.jpeg';
import imgNabil from '../../assets/Doctor_List/Nabil.jpeg';
import imgUmaya from '../../assets/Doctor_List/Umaya.jpeg';
import imgPanna from '../../assets/Doctor_List/Panna.jpeg';
import imgBarsha from '../../assets/Doctor_List/Barsha.jpeg';
import imgFariha from '../../assets/Doctor_List/Fariha.jpeg';

/* ── Team Data ── */
const teamMembers = [
  {
    name: 'Dr. B. M. Rafiqul Hasan Mehedi',
    designation: 'Managing Director & Chief Consultant',
    role: 'Oral & Maxillofacial Surgeon',
    badge: 'Managing Director',
    imgPosition: 'center 5%',
    img: imgMehedi,
    cleanImg: imgMehediClean,
    isFlyer: true,
    credentials: ['BDS — Sapporo Dental College (DU)', 'MPH — City University', 'PGT (OMS & Prosthodontics) — BSM Medical University', 'Advanced Implantology Training: China, Korea & India', 'MICD Training — Nepal'],
    bmdc: '5169',
    bio: 'Founder and Managing Director of RH Dental Care. A pioneer in digital treatment planning and 3D-guided implant surgery with 12+ years of experience in complex full mouth rehabilitation. Since 2014, he has been serving as a Senior Lecturer at Saphena Women’s Dental College and MH Samorita Medical College & Hospital, contributing to the development of future dental professionals. He is also currently practicing as a Senior Oral & Dental Surgeon at Labaid Dental Clinic, Gulshan, further extending his commitment to high-quality patient care.',
  },
  {
    name: 'Dr. Shimia Binte Taher',
    designation: 'Team Lead & Senior Doctor',
    role: 'Microscopic Endodontics & Aesthetic Dentistry',
    badge: 'Team Lead',
    imgPosition: '72% 15%',
    img: imgShimia,
    cleanImg: imgShimiaClean,
    isFlyer: true,
    credentials: ['BDS — Pioneer Dental College', 'PGT (Oral & Maxillofacial Surgery) — Dhaka Medical College'],
    bmdc: '8496',
    bio: 'A highly accomplished dental professional who combines clinical excellence with compassionate care. She leads the team with professionalism and is especially dedicated to female-oriented dental care, ensuring a respectful and comfortable environment for all patients.',
  },
  {
    name: 'Dr. Afzal Chowdhury',
    designation: 'Consultant — Oral Surgery',
    role: 'Oral & Dental Surgeon',
    badge: 'Oral Surgery',
    imgPosition: '72% 15%',
    img: imgAfzal,
    isFlyer: true,
    credentials: ['BDS', 'PGT (Oral Surgery)'],
    bmdc: 'Registered',
    bio: 'Dedicated Oral & Dental Surgeon specialising in complex tooth extractions and minor oral surgical procedures. Committed to providing safe, pain-free surgical experiences.',
  },
  {
    name: 'Dr. Mahaesa Tamima',
    designation: 'Senior Consultant — Endodontics',
    role: 'Senior Oral & Dental Surgeon',
    badge: 'Endodontics',
    imgPosition: '72% 15%',
    img: imgTamima,
    isFlyer: true,
    credentials: ['BDS', 'PGT (Conservative Dentistry & Endodontics)'],
    bmdc: 'Registered',
    bio: 'Senior surgeon with extensive experience in preserving natural teeth through advanced endodontic therapy and modern restorative techniques.',
  },
  {
    name: 'Dr. Asma Binte Faiz Tamanna',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    imgPosition: '72% 15%',
    img: imgTamanna,
    isFlyer: true,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'A meticulous dental surgeon focused on comprehensive general dentistry, preventive care, and delivering high-quality aesthetic restorations.',
  },
  {
    name: 'Dr. Monisha Haque Hreedy',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    imgPosition: '72% 15%',
    img: imgHreedy,
    isFlyer: true,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'Passionate about patient education and preventive dentistry. Provides comprehensive oral care ensuring every patient leaves with a healthy, confident smile.',
  },
  {
    name: 'Dr. Nabil Rahman',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    imgPosition: '72% 15%',
    img: imgNabil,
    isFlyer: true,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'A highly experienced senior practitioner dedicated to holistic dental care, managing everything from routine diagnostics to complex restorative procedures.',
  },
  {
    name: 'Dr. Umaya Khanam',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    imgPosition: '72% 15%',
    img: imgUmaya,
    isFlyer: true,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'Committed to delivering gentle and precise dental care. Specialises in routine dental treatments and ensuring a comfortable environment for anxious patients.',
  },
  {
    name: 'Dr. Mansura Panna',
    designation: 'Senior Consultant — Oral & Maxillofacial Surgery',
    role: 'Senior Oral & Dental Surgeon',
    badge: 'OMFS',
    imgPosition: '72% 15%',
    img: imgPanna,
    isFlyer: true,
    credentials: ['BDS', 'PGT (OMFS)'],
    bmdc: 'Registered',
    bio: 'Specialist in Oral & Maxillofacial Surgery with expertise in complex surgical extractions, jaw surgeries, and trauma management. Committed to delivering safe, precise surgical outcomes using the latest techniques.',
  },
  {
    name: 'Dr. Jeamima Tabassum Barsha',
    designation: 'Consultant — Orthodontics',
    role: 'Oral & Dental Surgeon',
    badge: 'Aligner & Orthodontics',
    imgPosition: '72% 15%',
    img: imgBarsha,
    isFlyer: true,
    credentials: ['BDS', 'PGT (Orthodontics & Dentofacial Orthopedics)'],
    bmdc: 'Registered',
    bio: 'Specialist in modern orthodontic solutions including clear aligners and traditional braces. Passionate about aligning teeth to achieve functional and perfectly straight smiles.',
  },
  {
    name: 'Dr. Fariha Ferdous',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    imgPosition: '72% 15%',
    img: imgFariha,
    isFlyer: true,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'A dedicated professional focusing on family dentistry, scaling, polishing, and composite restorations to maintain optimal oral hygiene for all age groups.',
  },
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);
  const [showFlyer, setShowFlyer] = useState(false);

  const handleSelectMember = (m: typeof teamMembers[0]) => {
    setSelectedMember(m);
    setShowFlyer(false); // always start in portrait mode
  };

  return (
    <div className="team-page">
      {/* ── Hero ── */}
      <section className="team-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="team-badge">
            <Users size={16} /> Elite Specialists
          </div>
          <h1 className="team-title">
            Meet the Masters of <br />
            <span>Modern Dentistry</span>
          </h1>
          <p className="team-desc">
            Behind every perfect smile is a team of dedicated specialists. Our highly qualified doctors bring decades of combined experience, advanced clinical training, and compassionate patient-centred care.
          </p>
        </motion.div>
      </section>

      {/* ── Grid ── */}
      <section className="team-container">
        <div className="team-grid">
          {teamMembers.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="team-card"
              onClick={() => handleSelectMember(m)}
            >
              {/* Portrait — clipped to face area to hide flyer text */}
              <div className="team-card-image-wrap">
                <div className={`team-role-badge ${m.badge === 'Team Lead' ? 'lead' : m.badge === 'Managing Director' ? 'director' : ''}`}>
                  {m.badge === 'Team Lead' && <Sparkles size={12} />}
                  {m.badge === 'Managing Director' && <Briefcase size={12} />}
                  {m.badge}
                </div>
                {m.img && (
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    quality={90}
                    sizes="(max-width: 600px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className={m.isFlyer ? 'flyer-img' : ''}
                    style={{ objectFit: 'cover', objectPosition: m.imgPosition }}
                  />
                )}
                <div className="team-card-overlay" />
              </div>

              {/* Text content */}
              <div className="team-card-content">
                {/* Designation pill */}
                <div className="team-designation">{m.designation}</div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
                <div className="team-action">
                  <span>View Full Profile</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Profile Modal ── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lightbox-overlay"
            onClick={() => setSelectedMember(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.1 }}
              onClick={() => { setSelectedMember(null); setShowFlyer(false); }}
              className="lightbox-close"
            >
              <X size={22} strokeWidth={2.5} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lightbox-content-box"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left: Portrait / Full Flyer */}
              <div className={`lightbox-image-section ${showFlyer ? 'flyer-mode' : ''}`}>
                {selectedMember.img && (
                  <Image
                    src={showFlyer ? selectedMember.img : (selectedMember.cleanImg || selectedMember.img)}
                    alt={selectedMember.name}
                    fill
                    quality={95}
                    className={(selectedMember.isFlyer && !showFlyer && !selectedMember.cleanImg) ? 'flyer-img' : ''}
                    style={{
                      objectFit: showFlyer ? 'contain' : 'cover',
                      objectPosition: showFlyer ? 'center' : (selectedMember.cleanImg ? 'center' : selectedMember.imgPosition),
                      background: showFlyer ? '#020617' : 'transparent',
                    }}
                  />
                )}
                {!showFlyer && <div className="lightbox-image-overlay" />}
                {/* Toggle button */}
                <button
                  className="flyer-toggle-btn"
                  onClick={(e) => { e.stopPropagation(); setShowFlyer(v => !v); }}
                >
                  {showFlyer ? '← Portrait' : '📄 Full Flyer'}
                </button>
              </div>

              {/* Right: Details */}
              <div className="lightbox-text-section">
                {/* Designation */}
                <div className="lightbox-designation">{selectedMember.designation}</div>

                {/* Badges row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span className="lightbox-chip lightbox-chip-specialty">
                    <Award size={13} /> {selectedMember.badge}
                  </span>
                  <span className="lightbox-chip lightbox-chip-bmdc">
                    <ShieldCheck size={13} /> BMDC: {selectedMember.bmdc}
                  </span>
                </div>

                <h2 className="lightbox-name">{selectedMember.name}</h2>
                <p className="lightbox-role">{selectedMember.role}</p>

                <div className="lightbox-divider" />

                {/* Credentials */}
                <h4 className="lightbox-section-title">Credentials & Education</h4>
                <ul className="lightbox-list">
                  {selectedMember.credentials.map((cred, idx) => (
                    <li key={idx}><span className="lightbox-bullet">•</span>{cred}</li>
                  ))}
                </ul>

                <div className="lightbox-divider" />

                {/* Bio */}
                <h4 className="lightbox-section-title">Professional Profile</h4>
                <p className="lightbox-bio">{selectedMember.bio}</p>

                <div className="lightbox-divider" />

                {/* Action buttons */}
                <div className="lightbox-actions">
                  <a
                    href="/contact"
                    className="lightbox-book-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    📅 Book Appointment
                  </a>
                  <a
                    href={typeof selectedMember.img === 'string' ? selectedMember.img : selectedMember.img.src}
                    download={`${selectedMember.name.replace(/\s+/g, '_')}_Flyer.jpg`}
                    className="lightbox-download-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Download size={15} />
                    Download Flyer
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
