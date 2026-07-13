import Hero from '@/components/Hero';
import ServicesList from '@/components/ServicesList';
import Specialties from '@/components/Specialties';
import Testimonials from '@/components/Testimonials';
import VideoSection from '@/components/VideoSection';
import ClinicGallery from '@/components/ClinicGallery';
import PromoModal from '@/components/PromoModal';
import BeforeAfter from '@/components/BeforeAfter';
import { ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <VideoSection />
      <ClinicGallery />
      <PromoModal />
      <ServicesList limit={4} />
      <BeforeAfter />
      <Testimonials />
      
      {/* Call to Action Section (Neuromarketing Optimized) */}
      <section className="section bg-primary text-white text-center" style={{ backgroundColor: '#0f172a', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="max-w-3xl mx-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Sparkles size={16} color="#38bdf8" />
              <span style={{ color: '#e2e8f0' }}>Your Journey to a Perfect Smile Starts Here</span>
            </div>

            <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Stop Letting Dental Pain <br/>Hold You Back.
            </h2>
            
            <p style={{ color: '#94a3b8', marginBottom: '2.5rem', fontSize: '1.25rem', lineHeight: 1.6 }}>
              Delaying treatment only makes it more painful and expensive. Claim your consultation today and experience world-class, painless dentistry.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <a href="/contact" className="btn-cta-hover" style={{ backgroundColor: '#0ea5e9', color: 'white', padding: '1.2rem 3rem', fontSize: '1.15rem', fontWeight: 800, borderRadius: '100px', boxShadow: '0 10px 30px rgba(14,165,233,0.3)', transition: 'transform 0.2s', textDecoration: 'none' }}>
                Claim Your Consultation Now
              </a>
              
              <div style={{ display: 'flex', gap: '2rem', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={18} color="#4ade80" /> Painless Guarantee
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
