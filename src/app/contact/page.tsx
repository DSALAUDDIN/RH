'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 1000); // Simulate API call
  };

  return (
    <div className="pt-24 pb-16" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div className="section-title text-center mb-16" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ color: 'hsl(var(--primary))', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Contact Us</h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
            Ready to book your appointment or have questions? Get in touch with our friendly team.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          {/* Contact Form */}
          <div className="glass" style={{ padding: '3rem', borderRadius: '1.5rem' }}>
            <h2 style={{ marginBottom: '2rem' }}>Send a Message</h2>
            
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
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))' }}
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
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))' }}
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
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))' }}
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
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid hsl(var(--border))', outline: 'none', resize: 'vertical', background: 'hsl(var(--surface))', color: 'hsl(var(--foreground))' }}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact Information */}
          <div>
            <div className="glass" style={{ padding: '3rem', borderRadius: '1.5rem', marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '2rem' }}>Clinic Information</h2>
              
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '1rem', borderRadius: '50%', color: 'hsl(var(--primary))' }}>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Our Location</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: '1.6' }}>House: 42, Road: 8, Block: C<br/>Banasree, Rampura<br/>Dhaka - 1219, Bangladesh</p>
                  </div>
                </li>
                
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '1rem', borderRadius: '50%', color: 'hsl(var(--primary))' }}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Phone</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))' }}><a href="tel:+8801775227902" style={{ color: 'inherit' }}>01775-227902</a></p>
                    <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.875rem', marginTop: '0.25rem' }}>Call us for appointments</p>
                  </div>
                </li>
                
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '1rem', borderRadius: '50%', color: 'hsl(var(--primary))' }}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Email</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))' }}><a href="mailto:drhasan07012@gmail.com" style={{ color: 'inherit' }}>drhasan07012@gmail.com</a></p>
                  </div>
                </li>
                
                <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(var(--primary), 0.1)', padding: '1rem', borderRadius: '50%', color: 'hsl(var(--primary))' }}>
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Working Hours</h3>
                    <p style={{ color: 'hsl(var(--muted-foreground))', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Mon - Fri</span> <span>8:00 AM - 7:00 PM</span></p>
                    <p style={{ color: 'hsl(var(--muted-foreground))', display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}><span>Saturday</span> <span>9:00 AM - 4:00 PM</span></p>
                    <p style={{ color: 'hsl(var(--muted-foreground))', display: 'flex', justifyContent: 'space-between' }}><span>Sunday</span> <span>Closed</span></p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Interactive Location Map */}
            <div className="glass" style={{ height: '300px', borderRadius: '1.5rem', overflow: 'hidden', position: 'relative', border: '1px solid hsl(var(--border))' }}>
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
