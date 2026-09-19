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
