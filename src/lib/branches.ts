// Branch registry: the single source of truth for phone numbers, WhatsApp
// links, addresses and opening hours. No other module may hardcode these.
//
// Positioning: branches are distinguished by audience, never by price tier or
// clinical quality. Banasree is the full-service flagship; Banani is the
// appointment-only private suite. Clinical standards are identical.

export type BranchId = 'banani' | 'banasree';

export interface OpeningHours {
  /** schema.org day names */
  days: string[];
  opens: string;
  closes: string;
}

export interface Branch {
  id: BranchId;
  name: string;
  shortName: string;
  tagline: string;

  /** One line: who this branch is for. Audience, not price. */
  audience: string;
  /** The promise, in the patient's terms. */
  promise: string;

  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  email?: string;

  /** Full one-line address for display. */
  address: string;
  streetAddress: string;
  addressLocality: string;
  postalCode: string;

  geo?: { lat: number; lng: number };
  /** Coordinates go into JSON-LD only when this is true. */
  geoVerified: boolean;

  hours?: OpeningHours[];
  /** Opening hours go into JSON-LD only when this is true. */
  hoursVerified: boolean;
  /** Human-readable hours line, or null while unconfirmed. */
  hoursDisplay: string | null;

  mapEmbed: string;
  mapLink: string;
  href: string;

  /** CSS custom property carrying this branch's accent (defined in tokens.css). */
  accent: string;
  waIntent: string;
  bookingMode: 'callback' | 'slots';

  /** Three signature items for the chooser card. Facts, not adjectives. */
  facilities: string[];
  services: string[];

  paymentAccepted: string;

  schemaDescription: string;
  heroImage: string;
  /** Image for the branch card on the home page. */
  cardImage: string;
  ogImage: string;
  photos: { src: string; alt: string; caption?: string; w?: number; h?: number }[];

  /** Google Place ID, for live review data. Null → ReviewBadge renders nothing. */
  placeId: string | null;
}

export const BRANCHES: Record<BranchId, Branch> = {
  banani: {
    id: 'banani',
    name: 'RH Dental Care — Banani',
    shortName: 'Banani',
    tagline: 'Private dental suite, by appointment',

    audience: 'For executives, expat and NRB patients — anyone buying privacy and time',
    promise: 'Seen on your schedule, in a room that is yours for the whole appointment.',

    phone: '+8801721367622',
    phoneDisplay: '01721-367622',
    whatsapp: '8801721367622',
    email: 'drhasan0712@gmail.com',

    address: 'Level 7, B&B Empire, Plot 116, Road 11, Banani, Dhaka 1213',
    streetAddress: 'Level 7, B&B Empire, Plot 116, Road 11, Banani',
    addressLocality: 'Dhaka',
    postalCode: '1213',

    // TODO(content): approximate pin. Verify against the Google Business Profile,
    // then set geoVerified: true.
    geo: { lat: 23.7937, lng: 90.4066 },
    geoVerified: false,

    /*
     * Morning (9:00-14:00) and evening (16:30-22:00) sessions. Operating days
     * are unconfirmed, so structured hours stay unpublished (schema.org
     * openingHoursSpecification requires days).
     * TODO(content): confirm Banani operating days, then populate `hours`.
     */
    hours: undefined,
    hoursVerified: false,
    hoursDisplay: 'Morning 9:00 am – 2:00 pm · Evening 4:30 pm – 10:00 pm, by appointment',

    mapEmbed:
      'https://maps.google.com/maps?q=B%26B%20Empire%2C%20Plot%20116%2C%20Road%2011%2C%20Banani%2C%20Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapLink: 'https://maps.google.com/?q=B%26B+Empire,+Plot+116,+Road+11,+Banani,+Dhaka+1213',
    href: '/banani',

    accent: '--rh-brass',
    waIntent: 'Assalamu Alaikum. I would like to request an appointment at RH Dental Care, Banani.',
    bookingMode: 'callback',

    facilities: [
      'One appointment at a time — no shared chair time',
      '3D CBCT imaging on site',
      'Consultation room separate from the treatment room',
    ],
    services: [
      'Dental Implants',
      'Root Canal Treatment',
      'Cosmetic Dentistry',
      'Oral Surgery',
      'CBCT Imaging',
    ],

    paymentAccepted: 'Cash, Card, bKash',

    schemaDescription:
      'Appointment-only private dental suite in Banani, Dhaka. 3D CBCT imaging on site and a consultation room separate from the treatment room. Same clinicians, materials and sterilisation protocol as RH Dental Care Banasree.',
    heroImage: '/assets/branches/banani/reception.webp',
    cardImage: '/assets/branches/banani/reception.webp',
    ogImage: '/assets/branches/banani/reception.webp',
    photos: [
      {
        src: '/assets/branches/banani/reception.webp',
        alt: 'Reception at RH Dental Care Banani: a pale oak desk lit from beneath, cream seating, panelled sage-green walls and a full-height window looking out over Banani.',
        caption:
          'Reception. The desk is lit from underneath and the shelving from behind — nothing in the suite is lit from directly overhead.',
        w: 1600,
        h: 1200,
      },
      {
        src: '/assets/branches/banani/lounge.webp',
        alt: 'A panelled room at RH Dental Care Banani with four grey armchairs around a brass and marble table, lit by a cove strip running the ceiling perimeter.',
        caption:
          'A quiet room off the corridor. Four chairs, a low table, a plant — closer to a sitting room than a waiting hall.',
        w: 1600,
        h: 1200,
      },
      {
        src: '/assets/branches/banani/consultation.webp',
        alt: 'Consultation room at RH Dental Care Banani: a stone desk with two chairs facing it, beside backlit glass display shelves set into an oak slat wall.',
        caption:
          'Consulting happens here, at a desk, before anyone reclines. Your treatment plan is discussed here before care begins.',
        w: 1200,
        h: 1600,
      },
      {
        src: '/assets/branches/banani/treatment-room.webp',
        alt: 'A clinician treating a patient in the dental chair at RH Dental Care Banani, with the operating light overhead and the panelled lounge corner behind.',
        caption:
          'The treatment room. The dental chair sits in the same panelled, cove-lit space as the rest of the suite.',
        w: 1600,
        h: 1200,
      },
    ],

    // TODO(content): Google Place ID. ReviewBadge renders nothing until set.
    placeId: null,
  },

  banasree: {
    id: 'banasree',
    name: 'RH Dental Care — Banasree',
    shortName: 'Banasree',
    tagline: 'Flagship dental hospital',

    audience: 'For families, multi-visit plans and comprehensive cases',
    promise: 'Everything under one roof, with coordinated care at each stage.',

    phone: '+8801775227902',
    phoneDisplay: '01775-227902',
    whatsapp: '8801775227902',
    // TODO(content): confirm a public branch email (info@rhdentalcare.com?).
    email: undefined,

    // TODO(content): confirm floor and locality ('1st floor … Rampura' per flyers).
    address: '1st floor, House 42, Road 8, Block C, Banasree, Rampura, Dhaka 1219',
    streetAddress: '1st floor, House 42, Road 8, Block C, Banasree, Rampura',
    addressLocality: 'Dhaka',
    postalCode: '1219',

    // TODO(content): approximate pin; verify, then set geoVerified: true.
    geo: { lat: 23.7634, lng: 90.4321 },
    geoVerified: false,

    /*
     * Clinical session hours, consistent across all Banasree clinician flyers
     * (closed Thursday). TODO(content): add reception hours if they differ.
     */
    hours: [
      {
        days: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday'],
        opens: '15:30',
        closes: '22:00',
      },
    ],
    hoursVerified: true,
    hoursDisplay: 'Saturday to Wednesday and Friday, 3:30 pm – 10:00 pm · Thursday closed',

    mapEmbed:
      'https://maps.google.com/maps?q=RH%20Dental%20Care%2C%20House%2042%2C%20Road%208%2C%20Block%20C%2C%20Banasree%2C%20Dhaka&t=&z=16&ie=UTF8&iwloc=&output=embed',
    mapLink:
      'https://maps.google.com/?q=RH+Dental+Care,+House+42,+Road+8,+Block+C,+Banasree,+Dhaka+1219',
    href: '/banasree',

    accent: '--rh-sage-deep',
    waIntent: 'Assalamu Alaikum. I would like to book an appointment at RH Dental Care, Banasree.',
    bookingMode: 'slots',

    facilities: [
      'In-house master digital lab',
      'Full specialist team on site',
    ],
    services: [
      'Dental Implants',
      'Orthodontics',
      'Root Canal Treatment',
      'Paediatric Dentistry',
      'Oral Surgery',
      'Prosthodontics',
    ],

    paymentAccepted: 'Cash, Card, bKash',

    schemaDescription:
      'Full-service dental hospital in Banasree, Dhaka. In-house master digital lab, a full specialist team on site, coordinated treatment planning. Same clinicians, materials and sterilisation protocol as RH Dental Care Banani.',
    heroImage: '/assets/branches/banasree/team.webp',
    cardImage: '/assets/branches/banasree/reception-new.jpg',
    ogImage: '/assets/branches/banasree/team.webp',
    photos: [
      {
        src: '/assets/branches/banasree/team.webp',
        alt: 'Three clinicians working together around a chair at RH Dental Care Banasree, with the operating light, a vitality monitor and the delivery unit around them.',
        caption:
          'Three clinicians on one case. The specialist team is on site, so a plan that crosses disciplines does not become a series of referrals.',
        w: 1024,
        h: 476,
      },
      {
        src: '/assets/branches/banasree/operatory.webp',
        alt: 'A two-chair operatory at RH Dental Care Banasree with delivery units, overhead lights and a clinician workstation between the chairs.',
        caption:
          'A two-chair operatory. Banasree is the bigger setup — more chairs, more disciplines, and the lab in the same building.',
        w: 1024,
        h: 746,
      },
      {
        src: '/assets/branches/banasree/microscope.webp',
        alt: 'A clinician at an endodontic operating microscope at RH Dental Care Banasree, beneath the operating light.',
        caption:
          'The endodontic microscope. In a molar, seeing a canal rather than feeling for it is what separates a root canal that lasts from one that has to be redone.',
        w: 883,
        h: 615,
      },
      {
        src: '/assets/branches/banasree/surgical-room.webp',
        alt: 'A treatment room at RH Dental Care Banasree with two dental chairs, instrument trolleys, overhead lights and a wall-mounted screen.',
        caption:
          'Set up between patients. Instruments are pouched and autoclaved for each appointment — the same protocol runs at both branches.',
        w: 1600,
        h: 824,
      },
      {
        src: '/assets/branches/banasree/waiting.webp',
        alt: 'The waiting area at RH Dental Care Banasree: a long sofa, a low table, a wall-mounted screen and lit display shelving.',
        caption:
          'Reception at Banasree. A family can be seen across one afternoon here rather than four separate trips.',
        w: 1600,
        h: 1200,
      },
    ],

    // TODO(content): Google Place ID.
    placeId: null,
  },
};

export const BRANCH_LIST: Branch[] = [BRANCHES.banani, BRANCHES.banasree];

/** Never silently default. When no branch is resolved, the UI opens the picker. */
export const DEFAULT_BRANCH: BranchId | null = null;

export const isBranchId = (v: unknown): v is BranchId => v === 'banani' || v === 'banasree';

/** Shared trust line. Identical clinical quality is stated, not implied. */
export const SHARED_TRUST =
  'Same doctors, same materials, same sterilisation protocol at both branches. What differs is the setting and the pace.';

export function whatsappUrl(b: Branch, text: string): string {
  return `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function telUrl(b: Branch): string {
  return `tel:${b.phone}`;
}
