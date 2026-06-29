import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, HeartPulse, Sparkles, Smile, CheckCircle2, ShieldCheck, Stethoscope } from 'lucide-react';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: 'Kids Care & Pediatric Dentistry | RH Dental Care',
  description: 'Painless, friendly, and expert dental care for children in Dhaka. We make your child\'s smile our top priority in a fear-free environment.',
};

export default function KidsCarePage() {
  return (
    <div className="kids-care-root" style={{ background: '#f8fafc', color: '#0f172a' }}>
      
      {/* 1. Hero Section (Emotion & Reassurance) */}
      <section style={{ 
        position: 'relative', 
        padding: 'clamp(8rem, 15vw, 12rem) 2rem clamp(4rem, 10vw, 8rem)', 
        background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
        color: '#fff',
        overflow: 'hidden',
        textAlign: 'center'
      }}>
        {/* Subtle background decorations for a child-friendly feel */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', opacity: 0.1 }}><Smile size={120} /></div>
        <div style={{ position: 'absolute', bottom: '15%', right: '15%', opacity: 0.1 }}><Sparkles size={100} /></div>

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '50px', 
            fontWeight: 700, fontSize: '0.875rem', marginBottom: '1.5rem', backdropFilter: 'blur(10px)'
          }}>
            <HeartPulse size={16} fill="#fff" />
            <span>Gentle, Fear-Free Pediatric Care</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
            textShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            Healthy Smiles Start <br/>With <span style={{ color: '#fbbf24' }}>Happy Kids</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
            opacity: 0.9, 
            marginBottom: '2.5rem',
            lineHeight: 1.6
          }}>
            We turn dental visits into fun adventures. Our expert pediatric team ensures a tear-free, painless experience for your little ones, building a lifetime of healthy dental habits.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ 
              background: '#fff', color: '#0ea5e9', padding: '16px 32px', borderRadius: '50px', 
              fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)', transition: 'transform 0.2s'
            }}>
              <Phone size={20} />
              Book a Happy Visit
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Why Choose Us for Kids (Logic & Trust) */}
      <section style={{ padding: '6rem 0', background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>Why Parents <span style={{ color: '#0ea5e9' }}>Trust Us</span></h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '1rem' }}>We understand children, and we understand parents' concerns.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <ShieldCheck size={32} color="#0ea5e9" />, title: 'Painless Procedures', desc: 'Advanced techniques ensuring zero pain or discomfort for your child.' },
              { icon: <Smile size={32} color="#f59e0b" />, title: 'Child-Friendly Environment', desc: 'A welcoming, colorful, and engaging clinic space that kids actually love visiting.' },
              { icon: <Stethoscope size={32} color="#10b981" />, title: 'Expert Pediatricians', desc: 'BMDC certified specialists trained specifically in managing children\'s dental anxiety.' }
            ].map((feature, idx) => (
              <div key={idx} style={{ 
                padding: '2.5rem', background: '#f8fafc', borderRadius: '24px', 
                border: '1px solid #e2e8f0', transition: 'all 0.3s'
              }}>
                <div style={{ 
                  width: '64px', height: '64px', borderRadius: '16px', 
                  background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.5rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.7 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Our Pediatric Services */}
      <section style={{ padding: '6rem 0', background: '#f1f5f9' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <img src="/assets/dr_shimia_no_text.png" alt="Kids Dental Care" style={{ width: '100%', borderRadius: '24px', objectFit: 'cover', background: '#0f172a', aspectRatio: '4/5' }} />
          </div>
          
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Comprehensive Care for <span style={{ color: '#0ea5e9' }}>Growing Smiles</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              From the first baby tooth to full teenage braces, we provide end-to-end dental care tailored for every stage of your child's development.
            </p>
            
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {[
                'Preventive Care & Fluoride Treatments',
                'Painless Cavity Fillings',
                'Early Orthodontic Assessment (Braces)',
                'Habit Breaking Appliances (Thumb Sucking)',
                'Dental Emergency & Trauma Care'
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>
                  <CheckCircle2 color="#0ea5e9" size={24} /> {item}
                </li>
              ))}
            </ul>

            <Link href="/contact" style={{ 
              background: '#0f172a', color: '#fff', padding: '16px 32px', borderRadius: '50px', 
              fontWeight: 700, fontSize: '1.1rem', display: 'inline-block'
            }}>
              Schedule a Consultation
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Testimonials (Social Proof) */}
      <Testimonials />

    </div>
  );
}
