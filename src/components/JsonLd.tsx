const BASE_URL = 'https://www.rhdentalcare.com';

export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Dentist', 'LocalBusiness', 'MedicalOrganization'],
    '@id': `${BASE_URL}/#dentist`,
    name: 'RH Dental Care',
    alternateName: ['RH Dental', 'RH Dental Clinic', 'আরএইচ ডেন্টাল কেয়ার'],
    description:
      'RH Dental Care is the #1 dental clinic in Dhaka, Bangladesh, specializing in dental implants, orthodontics, painless root canal, and cosmetic dentistry.',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/rhlogo.jpeg`,
      width: 200,
      height: 200,
    },
    image: `${BASE_URL}/rhlogo.jpeg`,
    telephone: '+8801775227902',
    email: 'info@rhdentalcare.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'House: 42, Road: 8, Block: C, Banasree, Rampura',
      addressLocality: 'Dhaka',
      addressRegion: 'Dhaka Division',
      postalCode: '1219',
      addressCountry: 'BD',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 23.7634,
      longitude: 90.4321,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday'],
        opens: '14:00',
        closes: '21:00',
      },
    ],
    priceRange: '৳৳',
    currenciesAccepted: 'BDT',
    paymentAccepted: 'Cash, Card',
    hasMap: 'https://maps.google.com/?q=RH+Dental+Care+Banasree+Dhaka',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '200',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/rhdentalcare',
      'https://www.instagram.com/rhdentalcare',
      'https://www.linkedin.com/company/rhdentalcare',
      'https://www.youtube.com/@rhdentalcare',
    ],
    medicalSpecialty: [
      'Dentistry',
      'Orthodontics',
      'OralSurgery',
      'Endodontics',
      'PediatricDentistry',
      'Prosthodontics',
      'Implantology',
      'CosmeticDentistry',
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'Bangladesh Medical & Dental Council (BMDC)',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
}