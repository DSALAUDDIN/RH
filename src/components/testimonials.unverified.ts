// src/components/testimonials.unverified.ts
//
// QUARANTINE — NOT RENDERED ANYWHERE.
//
// These six testimonials were hardcoded in Testimonials.tsx and presented as
// verified Google reviews: full names, five stars, "Local Guide · 32 reviews"
// credibility badges, relative timestamps and a rendered Google logo, under a
// link reading "Read all 500+ Reviews on Google". The Banani listing shows
// roughly twelve reviews.
//
// They are preserved here rather than deleted (brief rule 4 — flag, ask, then
// act), and they are not imported by anything.
//
// TODO(client): for EACH entry below, one of:
//   (a) confirm it is a real review and give the live Google review URL, in
//       which case move it into VERIFIED_TESTIMONIALS in Testimonials.tsx; or
//   (b) confirm it was written for the site, in which case delete this file.
//
// Nothing here goes back on the site without (a). Reviews attributed to named
// individuals that were not written by them are the single largest exposure on
// this site, and well beyond an SEO problem.

export const UNVERIFIED_TESTIMONIALS = [
  {
    id: 1,
    name: 'Sayed Anwar',
    role: 'Local Guide',
    content: "Alhamdulillah, Dr. Rafiqul Hasan Mehedi is an excellent dentist. I did my root canal from RH Dental Care Banasree branch. The whole process was carried out under local anaesthetic and the clinic environment is very premium and clean.",
    rating: 5,
    avatar: 'S',
    time: '2 weeks ago'
  },
  {
    id: 2,
    name: 'Farzana Rahman',
    role: '2 reviews',
    content: "A dental clinic in the Banasree area. My mother recently got dental implants here. Dr. Shimia and Dr. Hasan were very caring. Their diagnosis, technology and treatment plan are top notch.",
    rating: 5,
    avatar: 'F',
    time: '1 month ago'
  },
  {
    id: 3,
    name: 'Rakibul Islam',
    role: 'Local Guide · 15 reviews',
    content: "I had a severe toothache and visited them late evening. They attended me very professionally. Their machinery is very modern and the doctors are well-behaved. Would definitely recommend to anyone.",
    rating: 5,
    avatar: 'R',
    time: '3 months ago'
  },
  {
    id: 4,
    name: 'Tasnim Akter',
    role: '1 review',
    content: "The sterilization process here is impressive. Taking care of hygiene is their first priority. I did cosmetic scaling and filling. Very satisfied with the service and the overall cost is also very reasonable.",
    rating: 5,
    avatar: 'T',
    time: '4 months ago'
  },
  {
    id: 5,
    name: 'Mahadi Hasan',
    role: 'Local Guide · 32 reviews',
    content: "Extremely professional dental care center. The doctors take time to explain the exact problem through X-rays and screens before starting any treatment. It gives you a lot of confidence. Highly recommended!",
    rating: 5,
    avatar: 'M',
    time: '6 months ago'
  },
  {
    id: 6,
    name: 'Nusrat Jahan',
    role: '5 reviews',
    content: "I have been visiting them for my cosmetic aligners and can already see massive improvements. Very supportive staff, completely hassle-free appointment system, and no long waiting times like other places.",
    rating: 5,
    avatar: 'N',
    time: '8 months ago'
  },
];
