export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "RH Dental Care",
    "alternateName": "RH Dental Care and Implant Center",
    "description": "RH Dental Care is the #1 dental clinic in Dhaka, Bangladesh, specializing in dental implants, orthodontics, root canal, and cosmetic dentistry.",
    "url": "https://www.rhdentalcare.com",
    "logo": "https://www.rhdentalcare.com/logo.jpeg",
    "image": "https://www.rhdentalcare.com/og-image.jpg",
    "telephone": "+8801775227902",
    "email": "drhasan07012@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "House: 42, Road: 8, Block: C, Banasree, Rampura",
      "addressLocality": "Dhaka",
      "postalCode": "1219",
      "addressCountry": "BD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.7634,
      "longitude": 90.4321
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "22:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/rhdentalcare",
      "https://www.instagram.com/rhdentalcare",
      "https://www.linkedin.com/company/rhdentalcare"
    ],
    "priceRange": "$$",
    "medicalSpecialty": [
      "Dentistry",
      "Orthodontics",
      "OralSurgery",
      "Endodontics",
      "PediatricDentistry",
      "Prosthodontics"
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Bangladesh Medical & Dental Council (BMDC)"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
