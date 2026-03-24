import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about RH Dental Clinic, our experienced team of doctors, and our commitment to premium dental care in a comfortable environment.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div className="section-title text-center mb-16" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ color: 'hsl(var(--primary))', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>About RH Dental Clinic</h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
            We believe that a beautiful smile is a powerful asset. Our clinic combines cutting-edge technology with compassionate care.
          </p>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
          <div className="about-image-wrapper p-8" style={{ background: 'linear-gradient(135deg, hsl(var(--blue-100)), hsl(var(--blue-200)))', borderRadius: '2rem', padding: '2rem', aspectRatio: '4/3' }}>
            <div style={{ width: '100%', height: '100%', borderRadius: '1rem', background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem', color: 'hsl(var(--primary))', fontWeight: 'bold' }}>Our State-of-the-Art Clinic</span>
            </div>
          </div>
          
          <div className="about-content">
            <h2 style={{ marginBottom: '1.5rem' }}>Our Mission</h2>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.125rem', lineHeight: '1.7' }}>
              At RH Dental, our mission is to redefine the dental experience. We understand that visiting the dentist can be stressful for many, which is why we've designed our clinic and our processes to be entirely patient-centric, focusing on comfort, transparency, and outstanding clinical results.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7' }}>
              Led by Dr. Richard, our team consists of specialists across various dental disciplines, ensuring that you receive comprehensive care under one roof without the need for external referrals.
            </p>
          </div>
        </div>

        {/* Our Team */}
        <div className="team-section">
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Meet Our Experts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {/* Team Member 1 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'hsl(var(--blue-300))', margin: '0 auto 1.5rem' }}></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Dr. Richard Harrison</h3>
              <p style={{ color: 'hsl(var(--primary))', fontWeight: 'bold', marginBottom: '1rem' }}>Lead Cosmetic Dentist</p>
              <p style={{ fontSize: '0.9rem' }}>15+ years of experience specializing in full mouth restorations and smile design.</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'hsl(var(--blue-400))', margin: '0 auto 1.5rem' }}></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Dr. Emily Watson</h3>
              <p style={{ color: 'hsl(var(--primary))', fontWeight: 'bold', marginBottom: '1rem' }}>Orthodontist</p>
              <p style={{ fontSize: '0.9rem' }}>Expert in modern aligner therapies and pediatric orthodontic treatments.</p>
            </div>

            {/* Team Member 3 */}
            <div className="glass" style={{ padding: '2rem', borderRadius: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'hsl(var(--blue-200))', margin: '0 auto 1.5rem' }}></div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Dr. James Chen</h3>
              <p style={{ color: 'hsl(var(--primary))', fontWeight: 'bold', marginBottom: '1rem' }}>Oral Surgeon</p>
              <p style={{ fontSize: '0.9rem' }}>Focuses on painless extractions, implantology, and advanced bone grafting.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
