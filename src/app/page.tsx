import Hero from '@/components/Hero';
import ServicesList from '@/components/ServicesList';
import Specialties from '@/components/Specialties';
import Testimonials from '@/components/Testimonials';
import VideoSection from '@/components/VideoSection';
import ReelsGallery from '@/components/ReelsGallery';

export default function Home() {
  return (
    <>
      <Hero />
      <Specialties />
      <VideoSection />
      <ServicesList limit={4} />
      <ReelsGallery />
      <Testimonials />
      
      {/* Call to Action Section */}
      <section className="section bg-primary text-white text-center" style={{ backgroundColor: 'hsl(var(--primary))', color: 'white' }}>
        <div className="container">
          <div className="max-w-3xl mx-auto" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready for a Brighter Smile?</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', fontSize: '1.25rem' }}>
              Schedule your consultation today and take the first step towards perfect oral health.
            </p>
            <a href="/contact" className="btn" style={{ backgroundColor: 'white', color: 'hsl(var(--primary))', padding: '1rem 2.5rem', fontSize: '1.125rem' }}>
              Book an Appointment
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
