'use client';

import { motion, Variants } from 'framer-motion';
import { Star } from 'lucide-react';
import './Testimonials.css';

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const getAvatarColor = (id: number) => {
  const colors = ['#e11d48', '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];
  return colors[(id - 1) % colors.length];
};

const testimonials = [
  {
    id: 1,
    name: 'Sayed Anwar',
    role: 'Local Guide',
    content: "Alhamdulillah, Dr. Rafiqul Hasan Mehedi is an excellent dentist. I did my root canal from RH Dental Care Banasree branch. The whole process was completely painless and the clinic environment is very premium and clean.",
    rating: 5,
    avatar: 'S',
    time: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Farzana Rahman',
    role: '2 reviews',
    content: "Best dental clinic in Rampura and Banasree area. My mother recently got dental implants here. Dr. Shimia and Dr. Hasan were very caring. Their diagnosis, technology and treatment plan are top notch.",
    rating: 5,
    avatar: 'F',
    time: '1 month ago'
  },
  {
    id: 3,
    name: 'Rakibul Islam',
    role: 'Local Guide · 15 reviews',
    content: "I had a severe toothache and visited them late evening. They attended me very professionally. Their machinery is very modern and the doctors are well-behaved. Would definitely recommend to anyone.",
    rating: 5,
    avatar: 'R',
    time: '3 months ago'
  },
  {
    id: 4,
    name: 'Tasnim Akter',
    role: '1 review',
    content: "The sterilization process here is impressive. Taking care of hygiene is their first priority. I did cosmetic scaling and filling. Very satisfied with the service and the overall cost is also very reasonable.",
    rating: 5,
    avatar: 'T',
    time: '4 months ago'
  },
  {
    id: 5,
    name: 'Mahadi Hasan',
    role: 'Local Guide · 32 reviews',
    content: "Extremely professional dental care center. The doctors take time to explain the exact problem through X-rays and screens before starting any treatment. It gives you a lot of confidence. Highly recommended!",
    rating: 5,
    avatar: 'M',
    time: '6 months ago'
  },
  {
    id: 6,
    name: 'Nusrat Jahan',
    role: '5 reviews',
    content: "I have been visiting them for my cosmetic aligners and can already see massive improvements. Very supportive staff, completely hassle-free appointment system, and no long waiting times like other places.",
    rating: 5,
    avatar: 'N',
    time: '8 months ago'
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
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      type: "spring", stiffness: 100, damping: 20
    } 
  },
};

export default function Testimonials() {
  return (
    <section className="tm-section">
      <div className="container">
        
        <div className="tm-header">
           <span className="tm-tag">Authentic Google Reviews</span>
           <h2 className="tm-title">Why Our Patients <span className="tm-highlight">Love Us</span></h2>
           <p className="tm-subtitle">Don&apos;t just take our word for it. Read the experiences of thousands of satisfied patients who trusted us with their smiles.</p>
        </div>

        <motion.div 
          className="tm-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((t) => (
            <motion.div key={t.id} variants={itemVariants} className="tm-card">
              <div className="tm-card-header">
                <div className="tm-avatar" style={{ backgroundColor: getAvatarColor(t.id) }}>{t.avatar}</div>
                <div className="tm-author">
                  <p className="tm-author-name">{t.name}</p>
                  <span>{t.role}</span>
                </div>
                <div className="tm-google-icon"><GoogleLogo /></div>
              </div>
              <div className="tm-rating">
                <div className="tm-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" stroke="none" />
                  ))}
                </div>
                <span className="tm-time">{t.time}</span>
              </div>
              <p className="tm-content">{t.content}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="tm-more-action">
           <a href="https://www.google.com/maps/place/RH+Dental+Care+and+Implant+Center/@23.7606927,90.4273875,17z/data=!4m16!1m7!3m6!1s0x3755b8754cadaa87:0x9db1359510cadcfd!2sRH+Dental+Care+and+Implant+Center!8m2!3d23.7606878!4d90.4299624!16s%2Fg%2F11b5pjywjt!3m7!1s0x3755b8754cadaa87:0x9db1359510cadcfd!8m2!3d23.7606878!4d90.4299624!9m1!1b1!16s%2Fg%2F11b5pjywjt?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ borderRadius: '999px', padding: '1rem 2rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
             <GoogleLogo />
             Read all 500+ Reviews on Google
           </a>
        </div>
      </div>
    </section>
  );
}
