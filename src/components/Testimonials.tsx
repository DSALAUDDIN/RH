'use client';

import { motion, Variants } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Patient since 2022',
    content: "The level of care at RH Dental is unprecedented. I went in for a complex procedure and felt absolutely zero pain. Dr. Richard is not just a dentist, he's an artist!",
    rating: 5,
    avatar: 'SJ',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Patient since 2021',
    content: "Finally, a dental clinic that doesn't feel like a hospital. My veneers look incredibly natural. The entire team is warm, inviting, and highly professional.",
    rating: 5,
    avatar: 'MC',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Patient since 2023',
    content: "Best pediatric dentistry experience! My kids used to be terrified of the dentist, but now they actually look forward to their appointments. Thank you, RH Dental!",
    rating: 5,
    avatar: 'ED',
  },
  {
    id: 4,
    name: 'Robert Miller',
    role: 'Patient since 2022',
    content: "Incredible attention to detail. The 3D imaging they used to plan my implants was fascinating. I couldn't be happier with my new sea blue smile.",
    rating: 5,
    avatar: 'RM',
  },
  {
    id: 5,
    name: 'Jennifer Lopez',
    role: 'Patient since 2024',
    content: "The aesthetic results exceeded my wildest expectations. If you want Hollywood-grade results in a comfortable, local setting, this is the place.",
    rating: 5,
    avatar: 'JL',
  },
  {
    id: 6,
    name: 'David Wilson',
    role: 'Patient since 2023',
    content: "Seamless emergency service. I had a dental issue late on a Saturday, and they were able to get me in and fixed up by Sunday morning. Truly exceptional.",
    rating: 5,
    avatar: 'DW',
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
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.21, 1.02, 0.47, 0.98]
    } 
  },
};

export default function Testimonials() {
  return (
    <section className="section testimonials-section bg-secondary">
      <div className="container">
        <div className="section-title">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="subtitle"
          >
            What Our Patients Say
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Trust Our Expertise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            We've helped thousands of patients achieve their dream smiles. Here are some of their stories.
          </motion.p>
        </div>

        <motion.div 
          className="testimonials-full-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              className="testimonial-premium-card glass-card"
              variants={itemVariants}
            >
              <div className="quote-icon">
                <Quote size={28} />
              </div>
              <div className="testimonial-header">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="testimonial-body">&quot;{testimonial.content}&quot;</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">
                  {testimonial.avatar}
                </div>
                <div className="testimonial-meta">
                  <h4>{testimonial.name}</h4>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
