export interface TreatmentStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePageData {
  slug: string;
  url: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  badge: string;
  overview: string;
  suitability: string[];
  treatmentProcess: TreatmentStep[];
  technology: string;
  clinicalTeam: {
    lead: string;
    description: string;
  };
  benefitsAndRisks: {
    benefits: string;
    risks: string;
  };
  aftercare: string;
  faqs: ServiceFaq[];
  cta: {
    phoneBanani: string;
    phoneBanasree: string;
    tagline: string;
  };
}

export const SERVICE_PAGES: Record<string, ServicePageData> = {
  'dental-implant-dhaka': {
    slug: 'dental-implant-dhaka',
    url: '/dental-implant-dhaka',
    seoTitle: 'Dental Implant in Dhaka | RH Dental Care',
    metaDescription:
      'Dental implant consultation and restoration in Dhaka at RH Dental Care. Learn about implant surgery, in-house CAD/CAM prosthetics, suitability, recovery and aftercare.',
    h1: 'Dental Implant in Dhaka',
    badge: 'Advanced Implantology · Dhaka Flagship & Banani Suite',
    overview:
      'Dental implants can replace one or more missing teeth and support fixed restorations. RH Dental Care provides individualized implant assessment, surgical placement, and restorative coordination across its Dhaka branches, with an integrated digital laboratory workflow.',
    suitability: [
      'Adults with one or more missing teeth and completed jaw growth.',
      'Patients seeking a fixed alternative to removable tooth replacement.',
      'Patients with controlled periodontal disease, satisfactory oral hygiene, and suitable medical status.',
      'Patients requiring bone augmentation or staged treatment, after assessment.',
    ],
    treatmentProcess: [
      {
        title: 'Assessment',
        description:
          'Review medical history, periodontal condition, bite, bone availability, restorative space, and relevant dental imaging.',
      },
      {
        title: 'Planning',
        description:
          'Select an appropriate implant design and prosthetic plan. RH Dental Care uses implant products sourced from different countries, selected according to clinical suitability and verified components.',
      },
      {
        title: 'Surgery',
        description:
          'Place the implant under local anesthesia. Immediate placement, grafting, socket preservation, PRF, or sinus augmentation may be considered where indicated.',
      },
      {
        title: 'Healing',
        description:
          'Monitor healing and osseointegration; definitive loading is determined by stability and clinical findings.',
      },
      {
        title: 'Prosthetics',
        description:
          'Use digital impressions and the in-house CAD/CAM-supported laboratory for suitable zirconia restorations, followed by clinical fit and bite verification.',
      },
    ],
    technology:
      'RH Dental Care has its own digital CAD/CAM-supported dental laboratory, focused on zirconia-related prosthetic work. In-house digital scanning, design coordination, and laboratory fabrication help shorten communication and turnaround for suitable crowns, bridges, and implant-supported prosthetic components. This can allow selected prosthetic stages to be completed in a comparatively short time and reduce dependence on external laboratories. Actual delivery time depends on case complexity, materials, component compatibility, clinical verification, and workload. Not every implant system or prosthetic component is automatically compatible; suitability is checked before fabrication.',
    clinicalTeam: {
      lead: 'Dr. B.M. Rafiqul Hasan Mehedi & Dr. Simia Binte Taher',
      description:
        'Dr. B.M. Rafiqul Hasan Mehedi holds BDS and MPH qualifications, postgraduate training in Oral & Maxillofacial Surgery and Prosthodontics, and additional training in implantology, digital implantology, sinus grafting, orthodontics, and laser dentistry. Dr. Simia Binte Taher serves as Chief Consultant (Oral & Dental Surgery), with BDS and postgraduate dental training. Clinical responsibilities are allocated according to the required procedure, qualifications, and case needs. Approximately 16 doctors collectively provide patient care across the two branches.',
    },
    benefitsAndRisks: {
      benefits:
        'Implants can improve chewing, appearance, and support for fixed teeth without routinely preparing neighboring healthy teeth.',
      risks:
        'Risks include infection, implant failure, peri-implant disease, nerve or sinus complications, and prosthetic maintenance. No lifetime outcome can be guaranteed.',
    },
    aftercare:
      'Follow postoperative instructions, avoid smoking, maintain oral hygiene, and attend professional implant reviews. Seek urgent assessment for increasing swelling, fever, persistent bleeding, or implant mobility.',
    faqs: [
      {
        q: 'What is a dental implant?',
        a: 'A biocompatible fixture placed in jawbone to support a crown, bridge, or other dental prosthesis.',
      },
      {
        q: 'Is surgery painful?',
        a: 'Local anesthesia is used; temporary soreness or swelling can occur afterward.',
      },
      {
        q: 'Can an implant be placed immediately after extraction?',
        a: 'Sometimes, if bone, infection control, and primary stability are suitable.',
      },
      {
        q: 'How long does treatment take?',
        a: 'Surgery may take one visit, but healing and definitive restoration often require months.',
      },
      {
        q: 'Do you use international implant systems?',
        a: 'Yes. Implant products sourced from different countries are selected according to clinical needs and compatible restorative components.',
      },
      {
        q: 'Can your laboratory make my implant crown quickly?',
        a: 'For suitable cases, the in-house CAD/CAM workflow can shorten prosthetic turnaround; timing is case-dependent.',
      },
      {
        q: 'Do I always need a bone graft?',
        a: 'No. Grafting is considered only when clinically necessary.',
      },
      {
        q: 'Can diabetes patients receive implants?',
        a: 'Many patients with well-controlled diabetes can be considered after assessment.',
      },
      {
        q: 'How long do implants last?',
        a: 'Many function for years, but outcomes depend on health, hygiene, bite, and maintenance.',
      },
      {
        q: 'What determines the price?',
        a: 'Implant type, surgery, grafting, abutment, prosthetic material, and complexity. A written estimate follows consultation.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },

  'dental-implant-banani': {
    slug: 'dental-implant-banani',
    url: '/dental-implant-banani',
    seoTitle: 'Dental Implant in Banani | RH Dental Care',
    metaDescription:
      'Dental implants in Banani, Dhaka at RH Dental Care. Surgical and restorative planning with coordinated in-house CAD/CAM laboratory support.',
    h1: 'Dental Implant in Banani',
    badge: 'Private Dental Suite · Road 11, Banani',
    overview:
      'RH Dental Care Banani provides implant consultation and coordinated surgical and restorative care for missing teeth. The Banani clinical team works with the Banasree branch and the RH digital dental laboratory to plan appropriate implant-supported restorations.',
    suitability: [
      'Banani-area patients with a single missing tooth or multiple missing teeth.',
      'Patients who struggle with removable dentures and prefer to explore fixed solutions.',
      'Patients considering full-arch implant-supported rehabilitation.',
      'Overseas patients who can accommodate the necessary healing and follow-up schedule.',
    ],
    treatmentProcess: [
      {
        title: 'Consultation',
        description:
          'Examine gums, bite, remaining teeth, medical factors, and restorative expectations.',
      },
      {
        title: 'Case planning',
        description:
          'Assess radiographs or additional imaging obtained as indicated; choose an appropriate international-source implant system and prosthetic components.',
      },
      {
        title: 'Placement',
        description:
          'Carry out conventional or selected immediate placement, with adjunctive procedures when needed.',
      },
      {
        title: 'Healing and reviews',
        description:
          'Monitor tissue healing and implant stability before deciding the loading schedule.',
      },
      {
        title: 'Restoration',
        description:
          'Coordinate intraoral scanning, CAD/CAM design, zirconia prosthetic work, fit checks, and maintenance with the RH laboratory.',
      },
    ],
    technology:
      'RH Dental Care has its own digital CAD/CAM-supported dental laboratory, focused on zirconia-related prosthetic work. In-house digital scanning, design coordination, and laboratory fabrication help shorten communication and turnaround for suitable crowns, bridges, and implant-supported prosthetic components. This can allow selected prosthetic stages to be completed in a comparatively short time and reduce dependence on external laboratories. Actual delivery time depends on case complexity, materials, component compatibility, clinical verification, and workload. Not every implant system or prosthetic component is automatically compatible; suitability is checked before fabrication.',
    clinicalTeam: {
      lead: 'Dr. B.M. Rafiqul Hasan Mehedi & Dr. Simia Binte Taher',
      description:
        'Dr. B.M. Rafiqul Hasan Mehedi holds BDS and MPH qualifications, postgraduate training in Oral & Maxillofacial Surgery and Prosthodontics, and additional training in implantology, digital implantology, sinus grafting, orthodontics, and laser dentistry. Dr. Simia Binte Taher serves as Chief Consultant (Oral & Dental Surgery), with BDS and postgraduate dental training. Clinical responsibilities are allocated according to the required procedure, qualifications, and case needs.',
    },
    benefitsAndRisks: {
      benefits:
        'The integrated two-branch clinical and in-house laboratory workflow can streamline communication and selected restorative stages.',
      risks:
        'It does not eliminate surgical risks, healing time, or the need for verification. Infection, implant failure, and prosthetic complications remain possible.',
    },
    aftercare:
      'Regular maintenance, careful cleaning around implants, and follow-up appointments are essential. Treatment schedules for travelers should include contingency time.',
    faqs: [
      {
        q: 'Where is the Banani branch?',
        a: 'B&B Empire, Level 7, Plot 116, Road 11, Block E, Banani, Dhaka 1213.',
      },
      {
        q: 'Can I book an implant consultation in Banani?',
        a: 'Yes, subject to appointment availability.',
      },
      {
        q: 'Do you replace a single tooth?',
        a: 'Yes, if implant treatment is suitable.',
      },
      {
        q: 'Can multiple teeth be replaced?',
        a: 'Yes, through multiple implants or implant-supported bridges as indicated.',
      },
      {
        q: 'Is immediate implant placement available?',
        a: 'It may be offered in selected clinically suitable cases.',
      },
      {
        q: 'Can I receive a zirconia implant crown?',
        a: 'Zirconia-based restorations are available for appropriate designs.',
      },
      {
        q: 'Is your dental lab in-house?',
        a: 'Yes. RH Dental Care has its own CAD/CAM-supported zirconia laboratory.',
      },
      {
        q: 'Can the lab support any implant brand?',
        a: 'Compatibility must be verified for the implant platform, components, and restorative design.',
      },
      {
        q: 'How many visits will I need?',
        a: 'Consultation, surgery, healing checks, and restoration typically require multiple visits.',
      },
      {
        q: 'How do I contact Banani?',
        a: 'Call 01721367622 to request an appointment.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },

  'clear-aligner-treatment-dhaka': {
    slug: 'clear-aligner-treatment-dhaka',
    url: '/clear-aligner-treatment-dhaka',
    seoTitle: 'Clear Aligner Treatment in Dhaka | RH Dental Care',
    metaDescription:
      'Clear aligner treatment in Dhaka with digital intraoral scanning, personalized orthodontic planning, follow-up and retention at RH Dental Care.',
    h1: 'Clear Aligner Treatment in Dhaka',
    badge: 'Invisible Orthodontics · Digital 3D Scanning',
    overview:
      'Clear aligners are transparent, removable orthodontic trays designed to move teeth gradually. RH Dental Care offers digital intraoral scanning, alignment assessment, and individualized planning for patients who may prefer an alternative to fixed braces.',
    suitability: [
      'Patients with selected spacing, mild-to-moderate crowding, or minor relapse.',
      'Adults and suitable adolescents able to follow wear instructions.',
      'Patients with stable gums and treated caries before orthodontics.',
      'Patients with complex bite problems who may need another orthodontic approach after assessment.',
    ],
    treatmentProcess: [
      {
        title: 'Orthodontic evaluation',
        description:
          'Assess teeth, gum health, bite, radiographs where indicated, and treatment objectives.',
      },
      {
        title: 'Digital records',
        description: 'Capture intraoral scans and clinical records for treatment planning.',
      },
      {
        title: 'Movement plan',
        description:
          'Evaluate proposed movements, attachments, possible interproximal reduction, and expected treatment stages.',
      },
      {
        title: 'Aligner wear',
        description:
          'Wear trays as directed, commonly around 20-22 hours per day, removing them for meals and cleaning.',
      },
      {
        title: 'Review and retention',
        description:
          'Monitor tracking, provide refinements if needed, and prescribe long-term retention.',
      },
    ],
    technology:
      'RH Dental Care integrates clinical assessment with available digital intraoral scanning and coordinated laboratory support when appropriate. The in-house CAD/CAM laboratory focuses on zirconia-related prosthetics and is not necessary for every procedure.',
    clinicalTeam: {
      lead: 'Dr. B.M. Rafiqul Hasan Mehedi & Specialist Orthodontic Team',
      description:
        'Dr. B.M. Rafiqul Hasan Mehedi holds BDS and MPH qualifications with specialized postgraduate training in orthodontics and digital dentistry. The broader orthodontic and restorative team reviews digital setup models and oversees ongoing tracking.',
    },
    benefitsAndRisks: {
      benefits:
        'Aligners are discreet and removable, facilitating brushing and eating. Success depends on consistent wear and appropriate case selection.',
      risks:
        'Risks include discomfort, incomplete tracking, root resorption, gum changes, and relapse.',
    },
    aftercare:
      'Clean aligners according to instructions, avoid hot water, brush before reinsertion, and use prescribed retainers after treatment.',
    faqs: [
      {
        q: 'Are clear aligners effective?',
        a: 'Yes for appropriately selected cases and with good wear-time compliance.',
      },
      {
        q: 'How many hours daily?',
        a: 'Usually about 20-22 hours, unless your clinician instructs otherwise.',
      },
      {
        q: 'Can they close gaps?',
        a: 'Many spacing problems can be treated; diagnosis determines suitability.',
      },
      {
        q: 'Can they correct severe crowding?',
        a: 'Some complex cases need fixed braces or additional procedures.',
      },
      {
        q: 'Do aligners hurt?',
        a: 'Mild pressure is common after tray changes.',
      },
      {
        q: 'Can I eat with them?',
        a: 'They are normally removed for eating.',
      },
      {
        q: 'How long is treatment?',
        a: 'From several months to more than a year depending on complexity.',
      },
      {
        q: 'Do you use digital scans?',
        a: 'Yes, digital intraoral scanning is available for suitable cases.',
      },
      {
        q: 'Are retainers necessary?',
        a: 'Yes, retention is important to reduce relapse.',
      },
      {
        q: 'What is the cost?',
        a: 'It depends on case complexity, aligner quantity, and refinements.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },

  'smile-designing-bangladesh': {
    slug: 'smile-designing-bangladesh',
    url: '/smile-designing-bangladesh',
    seoTitle: 'Smile Designing in Bangladesh | RH Dental Care',
    metaDescription:
      'Smile designing in Bangladesh with veneers, composite bonding, whitening, zirconia restorations and digital dental workflows at RH Dental Care.',
    h1: 'Smile Designing in Bangladesh',
    badge: 'Aesthetic Dentistry · Digital Smile Makeover',
    overview:
      'Smile designing evaluates tooth shape, shade, proportions, gum line, alignment, and bite together. RH Dental Care provides tailored cosmetic and restorative options that aim for a natural appearance while respecting tooth health and function.',
    suitability: [
      'Patients with chipped, stained, uneven, or worn anterior teeth.',
      'Patients with gaps or minor cosmetic alignment concerns.',
      'Patients with old restorations requiring aesthetic review.',
      'Patients whose gums, caries, or bite require stabilization before cosmetic work.',
    ],
    treatmentProcess: [
      {
        title: 'Smile consultation',
        description: 'Discuss goals and assess tooth display, facial harmony, gum line, and bite.',
      },
      {
        title: 'Records',
        description: 'Obtain photographs and digital scans when useful.',
      },
      {
        title: 'Option selection',
        description:
          'Compare whitening, bonding, orthodontics, veneers, crowns, and gum treatment.',
      },
      {
        title: 'Preparation and design',
        description:
          'Use conservative preparation where appropriate and coordinate suitable zirconia restorative work through the RH laboratory.',
      },
      {
        title: 'Try-in and finishing',
        description:
          'Check shade, contour, contacts, bite, and patient comfort before finalization.',
      },
    ],
    technology:
      'RH Dental Care has its own digital CAD/CAM-supported dental laboratory, focused on zirconia-related prosthetic work. In-house digital scanning, design coordination, and laboratory fabrication help shorten communication and turnaround for suitable crowns, bridges, and implant-supported prosthetic components. This can allow selected prosthetic stages to be completed in a comparatively short time and reduce dependence on external laboratories. Actual delivery time depends on case complexity, materials, component compatibility, clinical verification, and workload. Not every implant system or prosthetic component is automatically compatible; suitability is checked before fabrication.',
    clinicalTeam: {
      lead: 'Dr. B.M. Rafiqul Hasan Mehedi & Aesthetic Restorative Team',
      description:
        'Dr. B.M. Rafiqul Hasan Mehedi has extensive postgraduate training in prosthodontics, aesthetic restorations, and CAD/CAM zirconia workflows. Together with Dr. Simia Binte Taher and the master ceramists, each smile design is clinically planned for long-term health and aesthetics.',
    },
    benefitsAndRisks: {
      benefits:
        'Aesthetic dentistry may improve tooth appearance and confidence. Healthy tooth preservation is prioritized.',
      risks:
        'Veneers and crowns have limitations, may require tooth reduction, and can chip or need replacement.',
    },
    aftercare:
      'Maintain hygiene, avoid damaging habits, and attend review visits. Night guards may be advised for bruxism.',
    faqs: [
      {
        q: 'What is smile designing?',
        a: 'A personalized plan combining appropriate cosmetic, orthodontic, and restorative procedures.',
      },
      {
        q: 'Does everyone need veneers?',
        a: 'No; bonding, whitening, or alignment may be enough.',
      },
      {
        q: 'Can gaps be closed?',
        a: 'Often through bonding, orthodontics, or veneers depending on the case.',
      },
      {
        q: 'Do you provide zirconia crowns?',
        a: 'Yes, suitable zirconia prostheses can be coordinated with the in-house laboratory.',
      },
      {
        q: 'Can veneers be made without drilling?',
        a: 'Only selected cases are suitable for minimal- or no-preparation approaches.',
      },
      {
        q: 'How is the final shade chosen?',
        a: 'With patient input and assessment of adjacent teeth and facial harmony.',
      },
      {
        q: 'Does smile designing hurt?',
        a: 'It depends on the procedures; anesthesia may be used when indicated.',
      },
      {
        q: 'How long does it take?',
        a: 'Simple cases may need few visits; complex cases can take longer.',
      },
      {
        q: 'Can digital scans help?',
        a: 'Yes, for suitable restorative planning and laboratory communication.',
      },
      {
        q: 'How much does it cost?',
        a: 'It depends on procedures, materials, and the number of teeth.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },

  'root-canal-treatment-dhaka': {
    slug: 'root-canal-treatment-dhaka',
    url: '/root-canal-treatment-dhaka',
    seoTitle: 'Root Canal Treatment in Dhaka | RH Dental Care',
    metaDescription:
      'Root canal treatment in Dhaka including microscopic endodontics, selected single-visit RCT, retreatment and digital crown restoration at RH Dental Care.',
    h1: 'Root Canal Treatment in Dhaka',
    badge: 'Microscopic Endodontics · Gentle Pain Relief',
    overview:
      'Root canal treatment removes inflamed or infected pulp tissue and aims to preserve a restorable natural tooth. RH Dental Care provides endodontic assessment, selected microscopic treatment, retreatment, and restorative planning.',
    suitability: [
      'Patients with irreversible pulpitis or pulp necrosis.',
      'Patients with deep caries, traumatic pulp exposure, or selected dental abscesses.',
      'Patients with previously treated teeth needing reassessment.',
      'Patients whose teeth remain structurally restorable and periodontally supportable.',
    ],
    treatmentProcess: [
      {
        title: 'Diagnosis',
        description:
          'Review pain, clinical tests, radiographs, periodontal health, and restorability.',
      },
      {
        title: 'Anesthesia and isolation',
        description: 'Use appropriate local anesthesia and isolation, preferably a rubber dam.',
      },
      {
        title: 'Canal treatment',
        description: 'Locate canals, clean, shape, irrigate, and disinfect the canal system.',
      },
      {
        title: 'Sealing',
        description:
          'Obturate canals when clinically appropriate; use additional visits if necessary.',
      },
      {
        title: 'Restoration',
        description:
          'Provide a definitive filling or cuspal-protective restoration, with in-house digital CAD/CAM zirconia support where suitable.',
      },
    ],
    technology:
      'RH Dental Care has its own digital CAD/CAM-supported dental laboratory, focused on zirconia-related prosthetic work. In-house digital scanning, design coordination, and laboratory fabrication help shorten communication and turnaround for suitable crowns, bridges, and implant-supported prosthetic components. This can allow selected prosthetic stages to be completed in a comparatively short time and reduce dependence on external laboratories. Actual delivery time depends on case complexity, materials, component compatibility, clinical verification, and workload. Not every implant system or prosthetic component is automatically compatible; suitability is checked before fabrication.',
    clinicalTeam: {
      lead: 'Dr. B.M. Rafiqul Hasan Mehedi & Endodontic Specialist Team',
      description:
        'Our clinical endodontic team uses surgical operating loupes and microscopes for intricate canal negotiation, calcified anatomy, and retreatments. Chief Consultants oversee both clinical disinfection and final structural restoration.',
    },
    benefitsAndRisks: {
      benefits:
        'RCT can preserve natural teeth and relieve pulpal disease-related pain. A crown is indicated according to remaining structure and load.',
      risks:
        'Risks include persistent infection, missed anatomy, instrument separation, perforation, and fracture.',
    },
    aftercare:
      'Avoid heavy chewing until definitive restoration, maintain hygiene, and return for persistent pain, swelling, or bite problems.',
    faqs: [
      {
        q: 'Is root canal treatment painful?',
        a: 'Local anesthesia generally controls procedural pain; temporary soreness may follow.',
      },
      {
        q: 'Can it be done in one visit?',
        a: 'Selected cases can; others require staged treatment.',
      },
      {
        q: 'What is microscopic endodontics?',
        a: 'Treatment assisted by an operating microscope for improved visualization.',
      },
      {
        q: 'Will I need a crown?',
        a: 'It depends on tooth structure, location, and fracture risk.',
      },
      {
        q: 'Can failed RCT be repeated?',
        a: 'Some teeth are suitable for retreatment after assessment.',
      },
      {
        q: 'Are antibiotics always needed?',
        a: 'No, antibiotics are not routinely required for uncomplicated RCT.',
      },
      {
        q: 'Why might a treated tooth still hurt?',
        a: 'Possible infection, fracture, bite problems, or periodontal disease require assessment.',
      },
      {
        q: 'Can a crown be made quickly?',
        a: 'Selected crowns can have shortened laboratory turnaround through the RH CAD/CAM workflow.',
      },
      {
        q: 'How long does a treated tooth last?',
        a: 'Many function for years with good treatment, restoration, and maintenance.',
      },
      {
        q: 'What affects cost?',
        a: 'Tooth type, canal anatomy, retreatment complexity, and restoration.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },

  'laser-dentistry-dhaka': {
    slug: 'laser-dentistry-dhaka',
    url: '/laser-dentistry-dhaka',
    seoTitle: 'Laser Dentistry in Dhaka | RH Dental Care',
    metaDescription:
      'Diode laser dentistry in Dhaka for selected soft-tissue and periodontal procedures at RH Dental Care. Learn about indications, safety and aftercare.',
    h1: 'Laser Dentistry in Dhaka',
    badge: 'Minimally Invasive · Diode Laser Technology',
    overview:
      'RH Dental Care uses diode laser technology as an adjunct for selected soft-tissue and periodontal procedures. Laser dentistry is a clinical tool, not a substitute for diagnosis or all conventional dental techniques.',
    suitability: [
      'Patients needing selected gingival contouring or soft-tissue management.',
      'Patients receiving indicated adjunctive periodontal treatment.',
      'Patients whose restorative care requires selected soft-tissue access or hemostasis.',
      'Patients who have undergone assessment to exclude suspicious lesions requiring biopsy.',
    ],
    treatmentProcess: [
      {
        title: 'Assessment',
        description: 'Determine diagnosis and whether a diode laser offers an appropriate option.',
      },
      {
        title: 'Consent and safety',
        description: 'Explain alternatives, possible risks, and eye protection requirements.',
      },
      {
        title: 'Procedure',
        description: 'Use clinically appropriate settings and anesthesia when indicated.',
      },
      {
        title: 'Review',
        description: 'Provide hygiene, diet, and healing instructions and schedule follow-up.',
      },
    ],
    technology:
      'RH Dental Care integrates clinical assessment with available digital intraoral scanning and coordinated laboratory support when appropriate. The in-house CAD/CAM laboratory focuses on zirconia-related prosthetics and is not necessary for every procedure.',
    clinicalTeam: {
      lead: 'Dr. B.M. Rafiqul Hasan Mehedi & Dr. Simia Binte Taher',
      description:
        'Dr. B.M. Rafiqul Hasan Mehedi has trained in laser dentistry applications for soft-tissue sculpting, periodontal decontamination, and aesthetic gingivectomy. All procedures follow strict laser safety protocols.',
    },
    benefitsAndRisks: {
      benefits:
        'Diode lasers may assist with precise soft-tissue management and hemostasis. They do not routinely replace scaling, root surface debridement, or hard-tissue instruments.',
      risks: 'Risks include thermal injury, pain, and delayed healing.',
    },
    aftercare:
      'Follow procedure-specific instructions, avoid irritating treated tissue, and report worsening pain, bleeding, or swelling.',
    faqs: [
      {
        q: 'What kind of laser is available?',
        a: 'Diode laser technology for selected dental applications.',
      },
      {
        q: 'Can laser cure gum disease alone?',
        a: 'No; periodontal care also requires mechanical therapy, plaque control, and maintenance.',
      },
      {
        q: 'Is it painless?',
        a: 'Not always; anesthesia may still be needed.',
      },
      {
        q: 'Can it reduce bleeding?',
        a: 'It may help with hemostasis in selected soft-tissue procedures.',
      },
      {
        q: 'Can it cut enamel?',
        a: 'The available diode laser is not a substitute for conventional hard-tissue preparation.',
      },
      {
        q: 'Is it safe?',
        a: 'It can be safe with trained operators, correct settings, and protective measures.',
      },
      {
        q: 'Can it reshape gums?',
        a: 'Selected gingival contour issues may be treated after assessment.',
      },
      {
        q: 'Can suspicious lesions be lasered off?',
        a: 'Suspicious lesions require appropriate diagnosis and often biopsy before definitive treatment.',
      },
      {
        q: 'How long is healing?',
        a: 'It depends on tissue, procedure, and patient factors.',
      },
      {
        q: 'What is the cost?',
        a: 'It varies by indication, area treated, and number of sessions.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },

  'pediatric-dentistry-dhaka': {
    slug: 'pediatric-dentistry-dhaka',
    url: '/pediatric-dentistry-dhaka',
    seoTitle: 'Pediatric Dentistry in Dhaka | RH Dental Care',
    metaDescription:
      'Pediatric dental care in Dhaka at RH Dental Care: prevention, fillings, pulp therapy, trauma care and selected general anesthesia cases.',
    h1: 'Pediatric Dentistry in Dhaka',
    badge: 'Child Dental Care · Gentle & Special Needs Support',
    overview:
      'RH Dental Care provides preventive and restorative dental care for children, including selected complex cases and children with special healthcare needs. Care is tailored to age, development, behavior, medical history, and treatment requirements.',
    suitability: [
      'Infants and children needing early oral health guidance.',
      'Children with caries, pain, dental trauma, or eruption concerns.',
      'Children requiring primary tooth pulp therapy, crowns, or space maintenance.',
      'Selected children whose extensive treatment or care needs may justify general anesthesia after assessment.',
    ],
    treatmentProcess: [
      {
        title: 'Child-centered assessment',
        description:
          'Review development, dental needs, medical history, behavior, and caries risk.',
      },
      {
        title: 'Prevention',
        description:
          'Provide brushing, fluoride, diet, and recall guidance; sealants when indicated.',
      },
      {
        title: 'Treatment',
        description:
          'Offer fillings, pulp therapy, crowns, extractions, or space maintenance as appropriate.',
      },
      {
        title: 'Complex cases',
        description:
          'For selected general anesthesia cases, arrange qualified anesthesia assessment, consent, monitoring, recovery, and follow-up.',
      },
      {
        title: 'Maintenance',
        description: 'Reassess eruption, hygiene, restorations, and future dental development.',
      },
    ],
    technology:
      'RH Dental Care integrates clinical assessment with child-friendly techniques, digital low-radiation radiography, and coordinated laboratory support when appropriate. The in-house CAD/CAM laboratory focuses on zirconia-related prosthetics and is not necessary for every pediatric procedure.',
    clinicalTeam: {
      lead: 'Dr. Simia Binte Taher & Paediatric Dental Team',
      description:
        'Dr. Simia Binte Taher serves as Chief Consultant (Oral & Dental Surgery) with dedicated focus on gentle pediatric care and child behavioral management. Our Banasree hospital features facilities for comprehensive child dental treatment.',
    },
    benefitsAndRisks: {
      benefits: 'Early treatment reduces pain and infection risk and supports healthy development.',
      risks:
        'General anesthesia is not routine and has additional risks requiring appropriate facilities and anesthesia professionals.',
    },
    aftercare:
      'Parents should supervise brushing, follow dietary guidance, attend recalls, and seek urgent care after dental trauma or spreading infection.',
    faqs: [
      {
        q: 'When is the first dental visit?',
        a: 'By the first birthday or within six months of the first tooth erupting.',
      },
      {
        q: 'Do baby teeth need treatment?',
        a: 'Yes; they support chewing, speech, comfort, and eruption guidance.',
      },
      {
        q: 'Can baby teeth receive pulp treatment?',
        a: 'Yes, pulpotomy or pulpectomy may be appropriate in selected cases.',
      },
      {
        q: 'Do you offer preventive fluoride care?',
        a: 'Yes, according to age and caries risk.',
      },
      {
        q: 'Can children with special healthcare needs be treated?',
        a: 'Care is individualized; some require additional support or anesthesia assessment.',
      },
      {
        q: 'Is general anesthesia routine?',
        a: 'No. It is reserved for appropriately selected cases.',
      },
      {
        q: 'Can several teeth be treated under one anesthetic?',
        a: 'Sometimes, when medically and dentally appropriate.',
      },
      {
        q: 'Who manages anesthesia?',
        a: 'Qualified anesthesia professionals should assess, administer, and monitor anesthesia.',
      },
      {
        q: 'What if a permanent tooth is knocked out?',
        a: 'Seek emergency care immediately; hold by crown and store in milk if not reinserted.',
      },
      {
        q: 'How often are checkups needed?',
        a: 'Based on risk, often about every six months or more frequently.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },

  'full-mouth-rehabilitation-bangladesh': {
    slug: 'full-mouth-rehabilitation-bangladesh',
    url: '/full-mouth-rehabilitation-bangladesh',
    seoTitle: 'Full Mouth Rehabilitation in Bangladesh | RH Dental Care',
    metaDescription:
      'Full mouth rehabilitation in Bangladesh with dental implants, zirconia crowns, bridges, digital scanning and in-house CAD/CAM laboratory at RH Dental Care.',
    h1: 'Full Mouth Rehabilitation in Bangladesh',
    badge: 'Complex Restorative · Digital CAD/CAM Workflow',
    overview:
      'Full mouth rehabilitation addresses extensive tooth loss, worn or damaged dentition, and complex functional or aesthetic problems. RH Dental Care coordinates clinical and prosthetic stages across two branches and its own digital CAD/CAM-supported zirconia laboratory.',
    suitability: [
      'Patients with many missing or non-restorable teeth.',
      'Patients with severe wear, fractured teeth, or failing restorations.',
      'Patients with compromised chewing or unstable occlusion.',
      'Older adults and overseas patients whose medical status and schedules permit staged treatment.',
    ],
    treatmentProcess: [
      {
        title: 'Comprehensive examination',
        description:
          'Assess medical factors, gums, teeth, bite, restorative space, and appropriate imaging.',
      },
      {
        title: 'Tooth-by-tooth prognosis',
        description: 'Decide which teeth can be preserved and which may need extraction.',
      },
      {
        title: 'Disease control',
        description: 'Treat periodontal disease, caries, infection, and necessary root canals.',
      },
      {
        title: 'Surgical and restorative planning',
        description:
          'Plan implants, crowns, bridges, removable options, or combined tooth-implant solutions. Implant products may be sourced from different countries, with compatibility verified.',
      },
      {
        title: 'Provisional and definitive prosthetics',
        description:
          'Coordinate digital scans, CAD/CAM design, and in-house zirconia fabrication for suitable restorations; check fit, contacts, occlusion, and hygiene access.',
      },
      {
        title: 'Maintenance',
        description:
          'Schedule periodic examinations and professional cleaning of teeth and prostheses.',
      },
    ],
    technology:
      'RH Dental Care has its own digital CAD/CAM-supported dental laboratory, focused on zirconia-related prosthetic work. In-house digital scanning, design coordination, and laboratory fabrication help shorten communication and turnaround for suitable crowns, bridges, and implant-supported prosthetic components. This can allow selected prosthetic stages to be completed in a comparatively short time and reduce dependence on external laboratories. Actual delivery time depends on case complexity, materials, component compatibility, clinical verification, and workload. Not every implant system or prosthetic component is automatically compatible; suitability is checked before fabrication.',
    clinicalTeam: {
      lead: 'Dr. B.M. Rafiqul Hasan Mehedi & Multidisciplinary Team',
      description:
        'Full mouth reconstructions are led personally by Dr. B.M. Rafiqul Hasan Mehedi (Prosthodontics & Oral Surgery) and Dr. Simia Binte Taher, in direct collaboration with our master laboratory technicians to reconstruct chewing function, vertical dimension, and natural aesthetics.',
    },
    benefitsAndRisks: {
      benefits:
        'An integrated clinical and in-house laboratory workflow can facilitate rapid communication and comparatively short fabrication times for suitable prosthetic work.',
      risks:
        'Full-arch implant treatment still requires adequate healing, compatible components, and careful verification. Risks include implant loss, prosthetic fracture, screw loosening, infection, and future maintenance.',
    },
    aftercare:
      'Clean under bridges and around implants daily using recommended tools, avoid damaging habits, and attend regular professional maintenance.',
    faqs: [
      {
        q: 'What is full mouth rehabilitation?',
        a: 'Comprehensive restoration of oral function and aesthetics involving several teeth or both arches.',
      },
      {
        q: 'Must all teeth be extracted?',
        a: 'No; restorable teeth should be preserved when appropriate.',
      },
      {
        q: 'How many implants are needed?',
        a: 'The number depends on anatomy, load, prosthetic design, and clinical planning.',
      },
      {
        q: 'Can you provide fixed full-arch teeth?',
        a: 'Yes for suitable patients after comprehensive assessment.',
      },
      {
        q: 'Can treatment be completed in one day?',
        a: 'Selected stages or provisional restorations may be rapid, but definitive rehabilitation commonly requires longer.',
      },
      {
        q: 'How does your own lab help?',
        a: 'It supports direct clinician-technician communication and faster fabrication of suitable zirconia prostheses.',
      },
      {
        q: 'Can you work with any implant system?',
        a: 'Only where appropriate compatible components and verified restorative workflows are available.',
      },
      {
        q: 'Are zirconia prostheses available?',
        a: 'Yes, zirconia-related prosthetic fabrication is a core capability of the RH laboratory.',
      },
      {
        q: 'Can older adults receive treatment?',
        a: 'Age alone is not a contraindication; medical and oral health factors matter.',
      },
      {
        q: 'Can overseas patients plan treatment?',
        a: 'Yes, but multiple visits and healing intervals may be required.',
      },
      {
        q: 'Are dentures an alternative?',
        a: 'Yes, removable options may be appropriate for some patients.',
      },
      {
        q: 'What affects cost?',
        a: 'The number of implants, surgery, restorations, materials, and overall complexity.',
      },
    ],
    cta: {
      phoneBanani: '01721367622',
      phoneBanasree: '01775227902',
      tagline: 'Your Smile, Our Happiness',
    },
  },
};
