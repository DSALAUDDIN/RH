'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Failed to send message. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 'clamp(5rem, 12vw, 8rem)', paddingBottom: 'clamp(2rem, 6vw, 4rem)' }}>
      <div className="container">
        <div className="section-title text-center" style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <h1 style={{ color: 'hsl(var(--primary))', fontSize: 'clamp(2rem, 7vw, 4rem)' }}>Contact Us</h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
            Ready to book your appointment or have questions? Get in touch with our friendly team.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(1.5rem, 4vw, 4rem)' }}>
          {/* Contact Form */}
          <div className="glass" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1.5rem' }}>
            <h2 style={{ marginBottom: 'clamp(1.25rem, 3vw, 2rem)', fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>Send a Message</h2>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: '2rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '1rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ marginBottom: '0.5rem' }}>Message Sent Successfully</h3>
                <p>Our team will contact you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn btn-outline"
                  style={{ marginTop: '1.5rem' }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))', fontSize: '1rem' }}
                  />
                </div>
                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>How can we help?</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', resize: 'vertical', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))', fontSize: '1rem' }}
                  ></textarea>
                </div>
                
                {error && (
                  <div style={{ color: '#ef4444', fontSize: '0.9rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '0.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    ⚠️ {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ marginTop: '0.75rem', width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                  disabled={loading}
                >
                  {loading ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="glass" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '1.5rem', marginBottom: '1.5rem' }}>
              <h2 style={{ marginBottom: 'clamp(1.25rem, 3vw, 2rem)', fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>Clinic Information</h2>
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '0.875rem', borderRadius: '50%', color: 'hsl(var(--primary))', flexShrink: 0 }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '0.5rem' }}>Our Location</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: '1.6', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>House: 42, Road: 8, Block: C<br/>Banasree, Rampura<br/>Dhaka - 1219, Bangladesh</p>
                  </div>
                </li>
                
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '0.875rem', borderRadius: '50%', color: 'hsl(var(--primary))', flexShrink: 0 }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '0.5rem' }}>Phone</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}><a href="tel:+8801775227902" style={{ color: 'inherit' }}>01775-227902</a></p>
                    <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', marginTop: '0.25rem' }}>Call us for appointments</p>
                  </div>
                </li>
                
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '0.875rem', borderRadius: '50%', color: 'hsl(var(--primary))', flexShrink: 0 }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '0.5rem' }}>Email</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: 'clamp(0.875rem, 2vw, 1rem)', wordBreak: 'break-all' }}><a href="mailto:drhasan07012@gmail.com" style={{ color: 'inherit' }}>drhasan07012@gmail.com</a></p>
                  </div>
                </li>
                
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '0.875rem', borderRadius: '50%', color: 'hsl(var(--primary))', flexShrink: 0 }}>
                    <Clock size={22} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', marginBottom: '0.5rem' }}>Working Hours</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', gap: '0.5rem', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}><span>Mon - Fri</span> <span>8:00 AM - 7:00 PM</span></p>
                    <p style={{ color: 'hsl(var(--muted-foreground))', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', gap: '0.5rem', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}><span>Saturday</span> <span>9:00 AM - 4:00 PM</span></p>
                    <p style={{ color: 'hsl(var(--muted-foreground))', display: 'flex', justifyContent: 'space-between', gap: '0.5rem', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}><span>Sunday</span> <span>Closed</span></p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Interactive Location Map */}
            <div className="glass" style={{ height: 'clamp(220px, 40vw, 300px)', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', border: '1px solid hsl(var(--border))' }}>
              <iframe 
                src="https://www.google.com/maps?q=RH+Dental+Care+and+Implant+Center&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
