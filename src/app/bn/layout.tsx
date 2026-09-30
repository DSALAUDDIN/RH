import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Inherit base title from root layout, but establish locale context
};

export default function BanglaLayout({ children }: { children: ReactNode }) {
  return (
    <div lang="bn-BD" className="bangla-layout-root" style={{ fontFamily: 'var(--font-bn), sans-serif' }}>
      {children}
    </div>
  );
}
