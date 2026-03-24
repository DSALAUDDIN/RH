import { Metadata } from 'next';
import ServicesList from '@/components/ServicesList';

export const metadata: Metadata = {
  title: 'Our Services | RH Dental Clinic',
  description: 'Comprehensive dental services including aesthetic dentistry, orthodontics, implants, whitening, and pediatric care.',
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-16" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="container">
        <div className="section-title text-center mb-16" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ color: 'hsl(var(--primary))', fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Premium Dental Services</h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.25rem' }}>
            We provide a full spectrum of dental treatments tailored to give you the perfect sea blue smile. Explore our specialties below.
          </p>
        </div>

        {/* Since ServicesList takes limit, we can show all by not passing a limit. Wait, the array in ServicesList has 4 items. Let's pass limit={10} */}
        <div style={{ marginTop: '-4rem' }}>
          <ServicesList limit={10} />
        </div>

        {/* Detailed Service Sections */}
        <div style={{ marginTop: '4rem' }}>
          <div id="aesthetic" style={{ scrollMarginTop: '6rem', marginBottom: '6rem', padding: '3rem', borderRadius: '1.5rem' }} className="glass">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'hsl(var(--primary))' }}>Aesthetic Dentistry</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Your smile is your signature. Our aesthetic dentistry services aim to perfect the appearance of your teeth using minimally invasive techniques. We offer custom porcelain veneers, cosmetic bonding, and complete smile makeovers designed mathematically to suit your facial proportions.
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', lineHeight: '2' }}>
              <li>Porcelain & Composite Veneers</li>
              <li>Gum Contouring</li>
              <li>Cosmetic Bonding</li>
              <li>Digital Smile Design (DSD)</li>
            </ul>
          </div>

          <div id="orthodontics" style={{ scrollMarginTop: '6rem', marginBottom: '6rem', padding: '3rem', borderRadius: '1.5rem' }} className="glass">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'hsl(var(--primary))' }}>Orthodontics</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Straight teeth not only look better but are easier to keep clean, reducing the risk of decay and gum disease. We provide modern orthodontic solutions that fit your lifestyle, prioritizing aesthetics without compromising on results.
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', lineHeight: '2' }}>
              <li>Invisalign & Clear Aligners</li>
              <li>Ceramic Braces</li>
              <li>Lingual Braces</li>
              <li>Early Interceptive Orthodontics</li>
            </ul>
          </div>

          <div id="implants" style={{ scrollMarginTop: '6rem', marginBottom: '6rem', padding: '3rem', borderRadius: '1.5rem' }} className="glass">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'hsl(var(--primary))' }}>Dental Implants</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Replace missing teeth permanently. Implants are the gold standard for tooth replacement, offering a foundation that looks, feels, and functions like natural teeth.
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', lineHeight: '2' }}>
              <li>Single Tooth Implants</li>
              <li>All-on-4® Treatment Concept</li>
              <li>Implant-Supported Bridges</li>
              <li>Bone Grafting & Sinus Lifts</li>
            </ul>
          </div>
          
          <div id="whitening" style={{ scrollMarginTop: '6rem', padding: '3rem', borderRadius: '1.5rem' }} className="glass">
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'hsl(var(--primary))' }}>Professional Teeth Whitening</h2>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
              Over time, teeth can become stained by coffee, tea, wine, and aging. Our professional whitening treatments are safe, fast, and deliver dramatically brighter results than over-the-counter options.
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', lineHeight: '2' }}>
              <li>In-Office Laser Whitening (1 hour)</li>
              <li>Custom Take-Home Whitening Kits</li>
              <li>Internal Bleaching for Single Discolored Teeth</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
