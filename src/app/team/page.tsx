'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowUpRight, X, Users, Award, ShieldCheck, Briefcase, Download } from 'lucide-react';
import './team.css';

/* ── Asset Imports ── */
import imgMehediFlyer from '../../assets/Doctor_List/Mehedi.jpeg';
import imgMehedi from '../../assets/doctors/mehedi_clean.jpeg';
import imgShimiaFlyer from '../../assets/Doctor_List/shimia_flyer.jpeg';
import imgShimia from '../../assets/doctors/shimia_clean.jpeg';
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
    img: imgMehedi,
    flyerImg: imgMehediFlyer,
    credentials: ['BDS — Sapporo Dental College (DU)', 'MPH — City University', 'PGT (OMS & Prosthodontics) — BSM Medical University', 'Advanced Implantology Training: China, Korea & India', 'MICD Training — Nepal'],
    bmdc: '5169',
    bio: 'Founder and Managing Director of RH Dental Care. A pioneer in digital treatment planning and 3D-guided implant surgery with 12+ years of experience in complex full mouth rehabilitation. Since 2014, he has been serving as a Senior Lecturer at Saphena Women\'s Dental College and MH Samorita Medical College & Hospital, contributing to the development of future dental professionals. He is also currently practicing as a Senior Oral & Dental Surgeon at Labaid Dental Clinic, Gulshan, further extending his commitment to high-quality patient care.',
  },
  {
    name: 'Dr. Shimia Binte Taher',
    designation: 'Team Lead & Senior Doctor',
    role: 'Microscopic Endodontics & Aesthetic Dentistry',
    badge: 'Team Lead',
    img: imgShimia,
    flyerImg: imgShimiaFlyer,
    credentials: ['BDS — Pioneer Dental College', 'PGT (Oral & Maxillofacial Surgery) — Dhaka Medical College'],
    bmdc: '8496',
    bio: 'Dr. Shimia Binte Taher is a highly experienced Senior Consultant Oral & Dental Surgeon with advanced clinical expertise and strong academic involvement in dental education. She is known for her precise treatment planning, calm clinical approach, and ability to manage complex and critical dental cases with confidence.\n\nWith a special focus on endodontics, prosthodontics, minor oral surgical procedures, cosmetic dental treatments, and advanced case management, she delivers comprehensive care tailored to both functional and aesthetic needs. Her experience as a senior lecturer at MH Samorita Medical College & Dental Unit further reflects her dedication to academic excellence and evidence-based dentistry.\n\nShe is committed to providing safe, high-quality, and patient-centered dental care, ensuring comfort and trust throughout every stage of treatment.',
  },
  {
    name: 'Dr. Afzal Chowdhury',
    designation: 'Consultant — Oral Surgery',
    role: 'Oral & Dental Surgeon',
    badge: 'Oral Surgery',
    img: imgAfzal,
    flyerImg: imgAfzal,
    credentials: ['BDS', 'PGT (Oral Surgery)'],
    bmdc: 'Registered',
    bio: 'Dr. Afzal Chowdhury is a promising and dedicated Oral & Dental Surgeon known for his smart clinical approach and patient-focused care. He is committed to delivering high-quality dental treatment with precision and attention to detail.\n\nHis key areas of expertise include endodontic treatment (root canal therapy), cosmetic dental build-up, and restorative dentistry, focusing on both function and aesthetics to restore natural smiles effectively.\n\nWith a caring attitude and modern clinical mindset, he ensures comfortable treatment experiences while maintaining high standards of dental care.',
  },
  {
    name: 'Dr. Mahaesa Tamima',
    designation: 'Senior Consultant — Endodontics',
    role: 'Senior Oral & Dental Surgeon',
    badge: 'Endodontics',
    img: imgTamima,
    flyerImg: imgTamima,
    credentials: ['BDS', 'PGT (Conservative Dentistry & Endodontics)'],
    bmdc: 'Registered',
    bio: 'Dr. Mahaesa Tamima is an experienced and highly skilled Oral & Dental Surgeon with advanced training in endodontics. She is known for her strong clinical judgment, precision in diagnosis, and commitment to delivering high-quality dental care.\n\nHer areas of expertise include advanced and basic endodontic treatments (root canal therapy) and pediatric dentistry, where she provides gentle and effective care tailored to children’s needs.\n\nWith a calm, compassionate, and patient-friendly approach, she ensures a comfortable treatment experience even in complex cases. Her sharp clinical knowledge and dedication make her a trusted practitioner for both adult and pediatric patients.',
  },
  {
    name: 'Dr. Nishat Tamanna Alam',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    img: imgTamanna,
    flyerImg: imgTamanna,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'Dr. Nishat Tamanna Alam is a dedicated and compassionate dental professional known for her patient-centered approach and gentle clinical care. With a strong academic background and hands-on clinical experience, she ensures that every patient receives safe, comfortable, and effective treatment.\n\nShe has particular expertise in both surgical and non-surgical tooth extractions, along with basic endodontic procedures and pediatric dental management. Her ability to handle young patients with care and patience makes her especially trusted among families.\n\nBeyond her clinical skills, Dr. Nishat plays an important leadership role within the team, contributing to coordinated, high-quality patient care. Her calm demeanor, attention to detail, and commitment to patient comfort make her a valued and reliable clinician.',
  },
  {
    name: 'Dr. Monisha Haque Hreedy',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    img: imgHreedy,
    flyerImg: imgHreedy,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'Dr. Monisha Haque Hreedy is a skilled and dedicated dental surgeon committed to delivering high-quality, patient-focused dental care. With a strong academic foundation from Dhaka University and clinical experience in modern dental practice, she ensures precise and comfortable treatment for every patient.\n\nHer key areas of expertise include endodontic treatment (root canal therapy), restorative dentistry, and periodontal (gum) treatment. She is particularly focused on preserving natural teeth through minimally invasive and evidence-based approaches.\n\nKnown for her gentle behavior and attention to detail, she maintains a calm and reassuring environment for patients, ensuring a smooth and comfortable treatment experience.',
  },
  {
    name: 'Dr. Nabil Rahman',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    img: imgNabil,
    flyerImg: imgNabil,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'A highly experienced senior practitioner dedicated to holistic dental care, managing everything from routine diagnostics to complex restorative procedures.',
  },
  {
    name: 'Dr. Umaya Khanam',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    img: imgUmaya,
    flyerImg: imgUmaya,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'Dr. Umaya Khanam is a dedicated and compassionate Oral & Dental Surgeon committed to providing comfortable and patient-friendly dental care. She is known for her positive approach and caring behavior, helping patients feel at ease throughout their treatment journey.\n\nHer clinical expertise includes basic endodontic treatment (root canal therapy) and periodontal (gum) management, focusing on preserving oral health through conservative and effective treatment methods.\n\nWith a friendly attitude and strong commitment to patient care, she ensures a supportive and reassuring environment for individuals of all ages.',
  },
  {
    name: 'Dr. Mansura Panna',
    designation: 'Senior Consultant — Oral & Maxillofacial Surgery',
    role: 'Senior Oral & Dental Surgeon',
    badge: 'OMFS',
    img: imgPanna,
    flyerImg: imgPanna,
    credentials: ['BDS', 'PGT (OMFS)'],
    bmdc: 'Registered',
    bio: 'Dr. Mansura Panna is a highly skilled Senior Oral & Dental Surgeon dedicated to delivering precise and patient-focused dental care. With strong academic training and clinical experience, she is committed to maintaining high standards in modern dentistry.\n\nHer areas of expertise include endodontic treatment (root canal therapy) and dental surgical procedures, with a focus on accurate diagnosis, effective treatment planning, and long-term oral health outcomes.\n\nKnown for her calm clinical approach and attention to detail, she ensures comfortable and reliable treatment experiences for her patients.',
  },
  {
    name: 'Dr. Jeamima Tabassum Barsha',
    designation: 'Consultant — Orthodontics',
    role: 'Oral & Dental Surgeon',
    badge: 'Aligner & Orthodontics',
    img: imgBarsha,
    flyerImg: imgBarsha,
    credentials: ['BDS', 'PGT (Orthodontics & Dentofacial Orthopedics)'],
    bmdc: 'Registered',
    bio: 'Dr. Jeamima Tabassum Barsha is a skilled Oral & Dental Surgeon with a focused interest in modern orthodontic and digital dental solutions. She is committed to delivering precise, patient-friendly care using contemporary techniques.\n\nHer key areas of expertise include clear aligner therapy, orthodontic treatment, and 3D intraoral scanning, enabling highly accurate diagnosis and digitally guided treatment planning for improved outcomes.\n\nWith a detail-oriented and modern clinical approach, she emphasizes comfort, aesthetics, and long-term functional stability in every treatment plan.',
  },
  {
    name: 'Dr. Fariha Ferdous',
    designation: 'Consultant — General Dentistry',
    role: 'Oral & Dental Surgeon',
    badge: 'Dental Surgeon',
    img: imgFariha,
    flyerImg: imgFariha,
    credentials: ['BDS', 'PGT (General Dentistry)'],
    bmdc: 'Registered',
    bio: 'Dr. Fariha Ferdous is a skilled and dedicated Oral & Dental Surgeon with strong clinical experience in managing complex dental cases with patience and precision. She is particularly known for her ability to handle anxious, critical, and uncooperative patients with care and confidence.\n\nHer areas of expertise include advanced endodontic treatment (root canal therapy), surgical tooth extraction, and non-surgical extraction procedures, with a strong focus on patient comfort and effective pain management.\n\nWith a calm clinical approach and strong commitment to quality care, she ensures safe, smooth, and reliable treatment outcomes for her patients.',
  },
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  const handleSelectMember = (m: typeof teamMembers[0]) => {
    setSelectedMember(m);
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
                {m.flyerImg && (
                  <Image
                    src={m.flyerImg}
                    alt={m.name}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 90vw, 50vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
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
              onClick={() => { setSelectedMember(null); }}
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
              {/* Left: Full Flyer Area */}
              <div className="lightbox-image-section flyer-mode">
                {selectedMember.flyerImg && (
                  <Image
                    src={selectedMember.flyerImg}
                    alt={selectedMember.name}
                    fill
                    quality={95}
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'center',
                      background: '#020617',
                    }}
                  />
                )}
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
                    href={((selectedMember.flyerImg || selectedMember.img) as any).src || (selectedMember.flyerImg || selectedMember.img)}
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
