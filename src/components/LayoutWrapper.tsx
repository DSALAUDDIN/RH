'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname?.startsWith('/admin');

  return (
    <>
      {!isStandalone && <Navbar />}
      {/* id="main" is the skip-link target declared in layout.tsx. */}
      <main id="main" className="main-content" tabIndex={-1}>
        {children}
      </main>
      {!isStandalone && <FloatingWhatsApp />}
      {!isStandalone && <Footer />}
    </>
  );
}

/* NOTE: <AudioPlayer /> was previously mounted here on every route, including
   /admin, and called .play() against a 3.8 MB /sound.weba on load. Autoplay
   audio is a Lighthouse best-practices failure and the opposite of the calm the
   Banani positioning sells, so it is no longer mounted globally.
   The component is NOT deleted — per the brief's rule 4, it is flagged for your
   decision. If you want it, mount it on one specific page rather than the
   layout, and gate it behind an explicit play control. */
