import type { MetadataRoute } from 'next';
import { SITE } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.shortName,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#0ea5e9',
    lang: SITE.language,
    categories: ['health', 'medical'],
    icons: [
      { src: SITE.logo.path, sizes: '192x192', type: 'image/jpeg', purpose: 'any' },
      { src: SITE.logo.path, sizes: '512x512', type: 'image/jpeg', purpose: 'any' },
    ],
    shortcuts: [
      { name: 'Book an appointment', short_name: 'Book', url: '/contact' },
      { name: 'Dental implants', short_name: 'Implants', url: '/implants' },
    ],
  };
}
