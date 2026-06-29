'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import AudioPlayer from './AudioPlayer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Only the admin dashboard is truly standalone without the public navbar
  const isStandalone = pathname?.startsWith('/admin');

  return (
    <>
      {!isStandalone && <Navbar />}
      <main className="main-content">
        {children}
      </main>
      <AudioPlayer />
      {!isStandalone && <FloatingWhatsApp />}
      {!isStandalone && <Footer />}
    </>
  );
}
