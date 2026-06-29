import type { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact RH Dental Care | Banasree & Banani Branches',
  description: 'Book your appointment at RH Dental Care. Visit our Rampura (Banasree) or Banani branch for world-class, painless dentistry in Dhaka.',
};

export default function ContactPage() {
  return (
    <div className="contact-root" style={{ background: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      
      {/* ── Hero Section ── */}
      <section style={{ 
        padding: 'clamp(6rem, 12vw, 10rem) 2rem 4rem', 
        background: 'linear-gradient(to bottom, #020617, #0f172a)',
        color: '#fff',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '8px', 
            background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)',
            padding: '8px 16px', borderRadius: '50px', color: '#38bdf8',
            fontWeight: 700, fontSize: '0.875rem', marginBottom: '1.5rem'
          }}>
            <Sparkles size={16} />
            <span>Two Premium Locations in Dhaka</span>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
            fontWeight: 900, 
            lineHeight: 1.1, 
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}>
            Ready for a <span style={{ color: '#0ea5e9' }}>Brighter Smile?</span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
            color: '#94a3b8', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: 1.7
          }}>
            Choose your preferred branch and schedule a consultation today. Experience painless, world-class dentistry designed around your comfort.
          </p>
        </div>
      </section>

      {/* ── Branches Grid ── */}
      <section style={{ padding: '6rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2.5rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            
            {/* Rampura Branch Card */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: '#0ea5e9' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Rampura Branch</h2>
                <div style={{ background: '#f1f5f9', padding: '6px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, color: '#64748b' }}>Main Center</div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>
                    House 42, Road 8, Block C<br/>
                    Banasree, Rampura, Dhaka-1219
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={20} color="#0ea5e9" style={{ flexShrink: 0 }} />
                  <a href="tel:+8801775227902" style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>+880 1775-227902</a>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <MessageCircle size={20} color="#25D366" style={{ flexShrink: 0 }} />
                  <a href="https://wa.me/8801775227902" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>WhatsApp Us</a>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Mail size={20} color="#64748b" style={{ flexShrink: 0 }} />
                  <a href="mailto:drhasan0712@gmail.com" style={{ color: '#475569', fontWeight: 500, textDecoration: 'none' }}>drhasan0712@gmail.com</a>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Clock size={20} color="#64748b" style={{ flexShrink: 0 }} />
                  <span style={{ color: '#475569', fontWeight: 500 }}>3:00 PM – 10:00 PM (Thu: Closed)</span>
                </li>
              </ul>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="tel:+8801775227902" style={{ flex: 1, textAlign: 'center', background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}>Call Now</a>
                <a href="https://maps.app.goo.gl/r5jG8oRxykZQZ4p56" target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', background: '#f1f5f9', color: '#0f172a', padding: '12px 24px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Navigation size={16} /> Get Directions
                </a>
              </div>
            </div>

            {/* Banani Branch Card */}
            <div style={{
              background: '#fff',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: '#8b5cf6' }} />
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Banani Branch</h2>
                <div style={{ background: '#f5f3ff', padding: '6px 12px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 700, color: '#8b5cf6' }}>Premium Center</div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#475569', lineHeight: 1.6, fontWeight: 500 }}>
                    Level 7 (B&B Empire)<br/>
                    Plot 116, Road 11, Block E<br/>
                    Banani, Dhaka-1213
                  </span>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={20} color="#8b5cf6" style={{ flexShrink: 0 }} />
                  <a href="tel:+8801721367622" style={{ color: '#0f172a', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none' }}>+880 1721-367622</a>
                </li>
                <li style={{ display: 'flex', gap: '12px', alignItems: 'center', opacity: 0.5 }}>
                  <Clock size={20} color="#64748b" style={{ flexShrink: 0 }} />
                  <span style={{ color: '#475569', fontWeight: 500 }}>By Appointment Only</span>
                </li>
              </ul>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                <a href="tel:+8801721367622" style={{ flex: 1, textAlign: 'center', background: '#0f172a', color: '#fff', padding: '12px 24px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none' }}>Call Now</a>
                <Link href="/banani" style={{ flex: 1, textAlign: 'center', background: '#f5f3ff', color: '#8b5cf6', padding: '12px 24px', borderRadius: '50px', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  Explore Branch
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Trust & Reassurance Strip ── */}
      <section style={{ padding: '4rem 0', background: '#0f172a', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={24} color="#4ade80" />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '2px' }}>Painless Guarantee</h4>
                <p style={{ fontSize: '0.9rem' }}>Advanced techniques for zero discomfort.</p>
              </div>
            </div>
            
            <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)' }} className="hidden-mobile" />

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={24} color="#fcd34d" />
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '2px' }}>Transparent Pricing</h4>
                <p style={{ fontSize: '0.9rem' }}>0% EMI available. No hidden costs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
