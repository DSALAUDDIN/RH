// Master clinical FAQ bank for RH Dental Care (Banani & Banasree, Dhaka)
// 120 verified patient questions and answers across 15 clinical categories.
// Source: RH_Dental_Care_Website_FAQ_Bank.docx verified by Dr. B.M. Rafiqul Hasan.

export interface FaqItem {
  q: string;
  a: string;
  pending?: string;
}

export interface FaqCategory {
  id: number;
  title: string;
  slug: string;
  faqs: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 1,
    title: 'Appointments and branches',
    slug: 'appointments-and-branches',
    faqs: [
      {
        q: 'Where is RH Dental Care in Banani?',
        a: 'Our Banani clinic is on Level 7, B&B Empire, Plot 116, Road 11, Banani, Dhaka 1213. The branch sees patients by appointment. Call 01721-367622 to arrange your visit.',
      },
      {
        q: 'Where is RH Dental Care in Banasree?',
        a: 'Our Banasree clinic is on the 1st floor, House 42, Road 8, Block C, Banasree, Rampura, Dhaka 1219. Call 01775-227902 to book or ask for directions.',
      },
      {
        q: 'How do I book a dental appointment?',
        a: 'Call your preferred branch or submit a request through the website’s Contact page. Tell reception the reason for your visit and whether you need a particular dentist. Reception will confirm your appointment time.',
      },
      {
        q: 'What time is the clinic open?',
        a: 'The Banasree branch lists Saturday to Wednesday and Friday, 3:30 PM to 10:00 PM, with Thursday closed. Banani schedules morning and evening appointments. Please confirm your slot with the branch before travelling.',
      },
      {
        q: 'Can I choose which dentist I see?',
        a: 'Yes. Ask for your preferred dentist when you book. Reception can confirm the branch and session, or help you book with a dentist who handles your particular concern.',
      },
      {
        q: 'What should I bring to my first dental visit?',
        a: 'Bring any recent dental X-rays, treatment records, and a list of medicines and allergies. Tell your dentist about medical conditions, previous surgery, pregnancy, or any concerns about dental treatment.',
      },
      {
        q: 'What happens at my first consultation?',
        a: 'We ask what is bothering you, review your health history, and examine your teeth, gums and bite as needed. If imaging would help, your dentist will explain why and discuss what the findings mean for your treatment options.',
      },
      {
        q: 'Can I get a second opinion before starting treatment?',
        a: 'Yes. Bring any X-rays, photos, or treatment estimate you already have. Your dentist can review them alongside a fresh examination and discuss the options, timing and expected costs.',
      },
    ],
  },
  {
    id: 2,
    title: 'Checkups, fillings and prevention',
    slug: 'checkups-fillings-and-prevention',
    faqs: [
      {
        q: 'How often should I have a dental checkup?',
        a: 'Your dentist will suggest a recall interval based on your risk of cavities and gum disease, your health and any ongoing treatment. Contact us sooner if you notice pain, bleeding or a change in your mouth.',
      },
      {
        q: 'Can I have a cavity without toothache?',
        a: 'Yes. Early decay can be painless. An examination and, when appropriate, X-rays can help detect decay between teeth or under an existing filling before symptoms develop.',
      },
      {
        q: 'What is a tooth-coloured filling?',
        a: 'A tooth-coloured composite filling repairs a cavity or a small chip using a resin matched to the tooth. Your dentist will assess how much tooth is left and whether a filling or a stronger restoration is more suitable.',
      },
      {
        q: 'Why does my tooth hurt when I drink cold water?',
        a: 'Cold sensitivity can come from exposed roots, decay, a crack or a leaking filling. Tell your dentist how long the pain lasts and whether it also occurs when biting or without any trigger.',
      },
      {
        q: 'Why does my new filling feel high when I bite?',
        a: 'The filling may be touching before your other teeth do. Contact the clinic for a bite check if a tooth feels high or hurts when you chew after a filling.',
      },
      {
        q: 'Can I have dental treatment while pregnant?',
        a: 'Preventive, diagnostic and necessary dental care can generally be provided during pregnancy. Tell your dentist how far along you are and share any complications or medicines so the team can plan your care.',
      },
      {
        q: 'Is an X-ray needed at every checkup?',
        a: 'Your dentist recommends dental X-rays based on your symptoms, examination, risk and previous images. An X-ray may help assess areas that are hard to see directly, such as between teeth or around a root.',
      },
      {
        q: 'How can I reduce my risk of cavities?',
        a: 'Brush twice a day with fluoride toothpaste, clean between your teeth daily, and limit how often you have sugary snacks and drinks. Ask your dentist whether your cavity risk calls for extra fluoride or closer follow-up.',
      },
    ],
  },
  {
    id: 3,
    title: 'Scaling, gum disease and laser dentistry',
    slug: 'scaling-gum-disease-and-laser-dentistry',
    faqs: [
      {
        q: 'Why do my gums bleed when I brush?',
        a: 'Bleeding can be a sign of gum inflammation. If it keeps happening, have your gums checked so your dentist can assess plaque, tartar and the support around your teeth.',
      },
      {
        q: 'What is the difference between scaling and polishing?',
        a: 'Scaling removes hardened deposits from the teeth. Polishing can remove some surface stains and smooth the tooth surface where appropriate.',
      },
      {
        q: 'Does scaling make teeth loose?',
        a: 'Scaling removes deposits from around your teeth. If a tooth already feels loose or gaps become more noticeable after cleaning, your dentist can check for gum disease and loss of supporting bone.',
      },
      {
        q: 'What is deep cleaning for gum disease?',
        a: 'Scaling and root planing cleans below the gumline and along root surfaces. Your dentist measures the gum pockets and reviews your response before recommending further care.',
      },
      {
        q: 'Can laser treatment replace deep cleaning?',
        a: 'A dental laser may be used for selected procedures. For gum disease, cleaning the tooth and root surfaces, good daily plaque control and follow-up remain central to treatment.',
      },
      {
        q: 'Can a laser reshape my gumline?',
        a: 'A soft-tissue laser may be an option for selected gum reshaping procedures. Your dentist first assesses the cause of the uneven gumline and checks whether reshaping is appropriate.',
      },
      {
        q: 'Will scaling make my teeth sensitive?',
        a: 'Some patients notice temporary sensitivity, especially around exposed roots. Tell your dentist if sensitivity is severe, lasts longer than expected or occurs mainly in one tooth.',
      },
      {
        q: 'Why does my breath still smell after brushing?',
        a: 'Persistent bad breath can be linked to tongue coating, gum disease, decay or dry mouth. A dental checkup can look for oral causes and help you decide whether further assessment is needed.',
      },
    ],
  },
  {
    id: 4,
    title: 'Microscope-assisted root canal treatment',
    slug: 'microscope-assisted-root-canal-treatment',
    faqs: [
      {
        q: 'How do I know if I need a root canal?',
        a: 'Lingering sensitivity, pain on biting, swelling or a recurring gum bump can prompt a root canal assessment. Your dentist uses an examination and tests, with X-rays as needed, to decide whether the pulp is inflamed or infected.',
      },
      {
        q: 'What happens during root canal treatment?',
        a: 'Your dentist removes inflamed or infected tissue from inside the tooth, cleans and seals the root canals, and restores the tooth. A filling, onlay or crown may be needed to protect it afterward.',
      },
      {
        q: 'Why use a microscope during a root canal?',
        a: 'Magnification and lighting help your dentist see fine details inside the tooth. This can be useful for finding small canals or examining complex anatomy during initial treatment or retreatment.',
      },
      {
        q: 'Can I have a root canal and crown on the same day?',
        a: 'Some teeth can be treated in one root canal visit. Crown timing is decided separately based on the tooth’s condition, whether a temporary restoration is needed, and the time required to make and fit the final crown.',
      },
      {
        q: 'Does every root canal-treated tooth need a crown?',
        a: 'It depends on which tooth was treated, how much healthy structure remains, and how much force it takes when you bite. Back teeth often benefit from a restoration that covers and protects their chewing cusps.',
      },
      {
        q: 'Can an old root canal be treated again?',
        a: 'Sometimes. Your dentist will assess whether retreatment, root-end surgery or extraction is appropriate based on the cause, the tooth’s condition and whether it can be restored.',
      },
      {
        q: 'Can antibiotics replace root canal treatment?',
        a: 'Most tooth pain caused by an inflamed or infected pulp needs dental treatment to address the source. Your dentist may prescribe antibiotics when findings such as fever or spreading infection indicate a need.',
      },
      {
        q: 'When should I call after a root canal?',
        a: 'Some tenderness can occur for a few days. Call if pain worsens, swelling develops, your bite feels high, or your temporary filling comes out.',
      },
    ],
  },
  {
    id: 5,
    title: 'Dental implant suitability and planning',
    slug: 'dental-implant-suitability-and-planning',
    faqs: [
      {
        q: 'What is a dental implant?',
        a: 'A dental implant is a fixture placed in the jawbone to support a replacement tooth or teeth. Depending on the plan, it can support a crown, a bridge or a denture.',
      },
      {
        q: 'Am I suitable for a dental implant?',
        a: 'We assess your gums, bone, bite, medical history, medications and ability to clean around the future implant. These findings help us decide whether an implant, a bridge or a denture is appropriate.',
      },
      {
        q: 'Can I have implants if I have diabetes?',
        a: 'Many people with well-managed diabetes can be considered. Your dentist reviews your recent glucose control, gum health and healing risks, and may coordinate with your physician before surgery.',
      },
      {
        q: 'Can I get an implant if I smoke?',
        a: 'Smoking can raise the risk of healing problems and implant failure. Tell your dentist what you use and how often so the team can discuss your risks and plan surgery and follow-up with you.',
      },
      {
        q: 'Do I need a 3D CBCT scan for an implant?',
        a: 'Your dentist may recommend CBCT to assess available bone and the position of nearby nerves or sinuses. Bring previous scans if you have them and ask reception where any additional imaging will be arranged.',
      },
      {
        q: 'What is digitally guided implant surgery?',
        a: 'A digital plan uses imaging and, in suitable cases, a scan of your teeth to plan implant position. A custom surgical guide can then help the dentist transfer the plan to your mouth.',
      },
      {
        q: 'When is a bone graft or sinus lift needed?',
        a: 'A bone graft may be considered when there is too little bone to support an implant in the planned position. In the back of the upper jaw, a sinus lift may be an option when the available bone height is limited.',
      },
      {
        q: 'Can an implant be placed on the day a tooth is removed?',
        a: 'Some patients qualify for immediate placement after extraction. Your dentist considers the condition of the socket, the surrounding bone and gums, and whether the implant can be placed with adequate initial stability.',
      },
    ],
  },
  {
    id: 6,
    title: 'Implant healing, teeth and maintenance',
    slug: 'implant-healing-teeth-and-maintenance',
    faqs: [
      {
        q: 'Will I have a tooth during implant healing?',
        a: 'A temporary tooth may be possible. The type of temporary restoration depends on where the tooth is missing, the bite and how much pressure the implant site can safely tolerate while it heals.',
      },
      {
        q: 'Is a same-day implant the same as a same-day tooth?',
        a: 'Immediate placement means putting in the implant on the day of extraction. Immediate loading means attaching a restoration soon after placement. Eligibility for each is assessed separately.',
      },
      {
        q: 'How long before I can get my final implant crown?',
        a: 'Healing and integration often take several months. The timing of your final crown depends on implant stability, tissue healing, any grafting and how your bite will be restored.',
      },
      {
        q: 'Can implants replace several missing teeth?',
        a: 'Yes. Depending on the pattern of missing teeth and the available bone, implants can support individual crowns, a bridge or a denture. A bridge can replace several teeth using fewer implants than the number of missing teeth.',
      },
      {
        q: 'What is an implant abutment?',
        a: 'An abutment is the connector between an implant and its restoration. The choice of a standard or custom abutment depends on the implant system, gum shape and position of the replacement tooth.',
      },
      {
        q: 'How do I clean around my dental implant?',
        a: 'Brush around the implant restoration daily and use the interdental aid your dentist demonstrates. Keep your maintenance visits so the team can check the gums, bite and stability of the restoration.',
      },
      {
        q: 'What if my implant crown feels loose?',
        a: 'Contact the clinic promptly and avoid chewing on that side. Your dentist can check whether the crown, connector or implant itself is moving and decide what needs attention.',
      },
      {
        q: 'What is included in the price of a dental implant?',
        a: 'Ask for an itemised estimate covering imaging, implant placement, the abutment and final crown. The estimate should also clarify whether a graft, a temporary tooth or any additional visits are included.',
      },
    ],
  },
  {
    id: 7,
    title: 'Clear aligners and braces',
    slug: 'clear-aligners-and-braces',
    faqs: [
      {
        q: 'How do I choose between clear aligners and braces?',
        a: 'Your dentist assesses crowding, spacing, bite and the types of movement needed. Aligners are removable and depend on consistent wear. Fixed braces may suit some movements or patients who prefer an appliance that stays in place.',
      },
      {
        q: 'How many hours a day should I wear my aligners?',
        a: 'Follow your prescribed schedule. Most full-time aligner plans call for about 22 hours of wear each day, with time out for meals and cleaning.',
      },
      {
        q: 'Can I eat or drink with aligners in?',
        a: 'Remove your aligners to eat and for drinks other than plain water, unless your clinician gives you different instructions. Clean your teeth and trays before putting the aligners back in.',
      },
      {
        q: 'What are the small bumps on my teeth during aligner treatment?',
        a: 'These are tooth-coloured attachments. They give the aligners extra grip to guide specific tooth movements and are removed when they are no longer needed.',
      },
      {
        q: 'What if I lose an aligner or my new tray does not fit?',
        a: 'Call the clinic for instructions before moving to another tray. Tell us your tray number, when you started wearing it, and where you notice a gap or poor fit.',
      },
      {
        q: 'Will I need extra trays at the end of aligner treatment?',
        a: 'Sometimes teeth need additional movement after the first set of trays. Your dentist may take a new scan and prescribe refinement trays to improve alignment or the way your teeth meet.',
      },
      {
        q: 'Can adults get orthodontic treatment if they have crowns or implants?',
        a: 'Often, after an examination of the gums, restorations and bite. Natural teeth can move under orthodontic force, while an integrated implant stays in place. The treatment plan takes both into account.',
      },
      {
        q: 'Why do I need retainers after braces or aligners?',
        a: 'Teeth can shift after active treatment. Wear and clean your retainers as directed, and contact the clinic if one is lost, damaged or suddenly feels tight.',
      },
    ],
  },
  {
    id: 8,
    title: 'Smile design, veneers and whitening',
    slug: 'smile-design-veneers-and-whitening',
    faqs: [
      {
        q: 'What does smile designing involve?',
        a: 'We look at tooth shape, colour, spacing, the gumline and how your teeth meet. Your plan may involve one treatment or a combination, depending on what you want to change and what is healthy for your teeth.',
      },
      {
        q: 'Can I see a preview before treatment?',
        a: 'For some cases, photos, digital scans or a temporary mock-up can help you discuss tooth shape and proportions with your dentist. A preview helps guide planning, while the final appearance is checked during treatment.',
      },
      {
        q: 'Can a gap between my front teeth be closed without veneers?',
        a: 'Options may include orthodontics or composite bonding. The best choice depends on the size and cause of the gap, the shape of the teeth and how your bite fits together.',
      },
      {
        q: 'What is the difference between a veneer and a crown?',
        a: 'A veneer covers mainly the front surface of a tooth. A crown covers the visible part of the tooth more extensively and may be recommended when the tooth needs greater structural support.',
      },
      {
        q: 'Can veneers be done without removing enamel?',
        a: 'Some cases allow minimal preparation. The amount of enamel needed depends on how the tooth sits, its colour, the available space and the type of veneer. Ask what would be involved before you decide.',
      },
      {
        q: 'Will whitening change the colour of my crowns or fillings?',
        a: 'Whitening lightens natural teeth. Existing crowns, veneers and fillings generally keep their original shade, so your dentist can help you plan how to match visible restorations after whitening.',
      },
      {
        q: 'Will teeth whitening cause sensitivity?',
        a: 'Temporary tooth sensitivity or gum irritation can occur. Tell your dentist about existing sensitivity, exposed roots, cavities or gum problems so they can advise when and how to whiten.',
      },
      {
        q: 'Should I whiten my teeth before getting front crowns or bonding?',
        a: 'If you plan to whiten, discuss the order with your dentist before selecting a restoration shade. Your dentist can schedule the shade match after whitening when the colour is ready to be assessed.',
      },
    ],
  },
  {
    id: 9,
    title: 'Crowns, bridges and the digital dental lab',
    slug: 'crowns-bridges-and-digital-dental-lab',
    faqs: [
      {
        q: 'What is a digital dental scan?',
        a: 'An intraoral scanner captures a 3D model of your teeth and gums. It can be used for suitable crowns, bridges, aligners and other restorations. Some cases still call for a conventional impression.',
      },
      {
        q: 'What does RH Dental Care’s in-house CAD/CAM lab do?',
        a: 'Our digital dental lab in Banasree designs and makes suitable zirconia restorations, such as crowns and bridges. The dental and lab teams can coordinate details such as shape, shade and fit directly.',
      },
      {
        q: 'What is a zirconia crown?',
        a: 'Zirconia is a dental ceramic used for crowns and some bridges. Your dentist considers tooth position, bite forces, available space and appearance when discussing the material for your restoration.',
      },
      {
        q: 'Can the lab make a crown for an implant placed elsewhere?',
        a: 'In some cases. Bring your implant card and any surgical or restorative records. Your dentist needs to identify the implant connection and check that suitable components are available before planning a crown.',
      },
      {
        q: 'Can I get a permanent crown on the same day?',
        a: 'Ask your dentist whether this is possible for your tooth. The timing depends on preparation, scan quality, the chosen material, lab scheduling and clinical checks for fit and bite. A temporary crown may be used between visits.',
      },
      {
        q: 'What should I do if my temporary crown comes off?',
        a: 'Keep the crown and call the clinic for advice. Avoid chewing on that tooth while you wait and bring the temporary crown with you if the clinic asks you to come in.',
      },
      {
        q: 'How do I clean under a fixed dental bridge?',
        a: 'Your dentist can show you how to clean beneath the replacement tooth with a floss threader, an interdental brush or another suitable aid. Clean the supporting teeth and gumline every day.',
      },
      {
        q: 'Why do I need a bite check when my crown is fitted?',
        a: 'Your dentist checks how the crown meets the opposing teeth during biting and chewing movements. If it feels high or uncomfortable after fitting, contact the clinic for an adjustment check.',
      },
    ],
  },
  {
    id: 10,
    title: 'Children’s dentistry',
    slug: 'childrens-dentistry',
    faqs: [
      {
        q: 'When should my child first see a dentist?',
        a: 'Book the first dental visit when the first tooth appears, or by the first birthday, whichever comes first. The visit can cover brushing, feeding habits, fluoride and your child’s risk of cavities.',
      },
      {
        q: 'Why treat a cavity in a baby tooth?',
        a: 'Baby teeth help children eat and hold space for adult teeth. Depending on the tooth and when it is due to fall out, treating decay can help prevent pain, infection and early tooth loss.',
      },
      {
        q: 'What are dental sealants for children?',
        a: 'Sealants cover deep grooves in the chewing surfaces of suitable back teeth. They can help prevent decay in grooves that are difficult to clean with a toothbrush.',
      },
      {
        q: 'When might my child need fluoride varnish?',
        a: 'A dentist may recommend fluoride varnish based on your child’s age and risk of cavities. The visit is also a chance to check that your child is using the right amount of fluoride toothpaste at home.',
      },
      {
        q: 'Can a baby tooth have pulp treatment?',
        a: 'Yes, some baby teeth can be treated when decay reaches the tissue inside. The dentist considers the extent of infection, whether the tooth can be restored and how soon it is expected to fall out.',
      },
      {
        q: 'What is a space maintainer?',
        a: 'A space maintainer may be used after a baby tooth is lost early to help hold space for the adult tooth. The dentist checks your child’s bite and the adult tooth’s development before recommending one.',
      },
      {
        q: 'How can I prepare my child for the first dental visit?',
        a: 'Use simple words such as “the dentist will count your teeth.” Bring a comfort item if it helps and tell us about previous dental experiences or anything that makes your child anxious.',
      },
      {
        q: 'What should I do if my child knocks out a baby tooth?',
        a: 'Contact a dentist promptly to assess the injury and nearby teeth. Leave the baby tooth out because reinserting it can harm the developing adult tooth underneath.',
      },
    ],
  },
  {
    id: 11,
    title: 'Care for children with additional needs and anesthesia',
    slug: 'special-needs-and-anesthesia',
    faqs: [
      {
        q: 'Can RH Dental Care see children with sensory or communication needs?',
        a: 'Yes. Tell reception about your child’s sensory preferences, communication style, medical needs and what helps them feel comfortable. We can discuss an appropriate visit and confirm where it can be arranged.',
      },
      {
        q: 'Can we arrange a short visit to help my child get used to the clinic?',
        a: 'Ask reception about an introductory appointment. If your child’s dental needs allow, a short visit can help the team learn which sounds, routines or approaches make care easier for them.',
      },
      {
        q: 'What records should I bring for my child’s assessment?',
        a: 'Bring a current medicine list, allergy information, relevant medical reports, and any previous dental or anesthesia records. Let us know about breathing problems, sleep concerns and past reactions to medicines or anesthesia.',
      },
      {
        q: 'When might dental treatment under general anesthesia be considered?',
        a: 'It may be considered when a child needs extensive or urgent care, has significant difficulty tolerating treatment while awake, or has particular medical or developmental needs. The dental and anesthesia teams assess the safest suitable approach.',
      },
      {
        q: 'Can several teeth be treated during one general anesthesia session?',
        a: 'That may be possible if the care is planned and clinically appropriate. The dental and anesthesia teams review the expected treatment time, the child’s medical needs and what can be completed safely in the session.',
      },
      {
        q: 'Who will review my child before general anesthesia?',
        a: 'The dental team reviews the proposed treatment and coordinates an anesthesia assessment. The anesthesia team reviews health history, medications and fasting instructions and explains the monitoring and recovery plan.',
      },
      {
        q: 'Can my child eat or drink before dental treatment under anesthesia?',
        a: 'Follow the specific fasting instructions from the anesthesia team. If your child eats or drinks outside those instructions, tell the team before the procedure so they can decide how to proceed safely.',
      },
      {
        q: 'What should I expect after my child’s anesthesia appointment?',
        a: 'The team monitors your child during recovery and provides instructions on eating, medicines, supervision and when to call. Review those instructions before leaving and contact the team if you have concerns.',
      },
    ],
  },
  {
    id: 12,
    title: 'Extractions, wisdom teeth and oral surgery',
    slug: 'extractions-wisdom-teeth-and-oral-surgery',
    faqs: [
      {
        q: 'Can a badly damaged tooth be saved instead of extracted?',
        a: 'Sometimes. Your dentist assesses the remaining tooth, roots, gum support and any infection or fracture. If the tooth can be restored, your dentist will explain what treatment and follow-up would involve.',
      },
      {
        q: 'Does every impacted wisdom tooth need to come out?',
        a: 'Your dentist considers pain, repeated infection, decay, damage to nearby teeth and how the tooth sits on imaging. A wisdom tooth that is causing no disease may be monitored after assessment.',
      },
      {
        q: 'Why might I need 3D imaging before wisdom tooth surgery?',
        a: 'If a lower wisdom tooth appears close to the nerve, your dentist may recommend CBCT when a 3D view could change the surgical plan. The scan can show the relationship between the roots and the nerve more clearly.',
      },
      {
        q: 'Can I eat before a tooth extraction?',
        a: 'Ask the clinic when you book. For local anesthesia alone, a normal meal is usually fine unless your dentist advises otherwise. If sedation or general anesthesia is planned, follow the fasting instructions from the anesthesia team.',
      },
      {
        q: 'Should I stop my blood thinner before an extraction?',
        a: 'Keep taking your prescribed medicine unless the dentist and prescribing clinician advise a change. Share the medicine name, dose and reason for taking it before the procedure so the team can plan how to manage bleeding.',
      },
      {
        q: 'Why might bone grafting be suggested after extraction?',
        a: 'Socket preservation may be considered to help maintain bone shape for a future implant or restoration. It depends on the location, the condition of the socket and your plans for replacing the tooth.',
      },
      {
        q: 'What can I do to protect the extraction site?',
        a: 'Follow the written instructions from your dentist. Protect the blood clot by avoiding vigorous rinsing and spitting during the first 24 hours, and avoid smoking as directed during healing.',
      },
      {
        q: 'What is dry socket and when should I call?',
        a: 'Dry socket can cause strong or worsening pain a few days after extraction, sometimes with a bad taste or pain that spreads toward the ear. Contact the clinic for assessment and care.',
      },
    ],
  },
  {
    id: 13,
    title: 'Dental emergencies',
    slug: 'dental-emergencies',
    faqs: [
      {
        q: 'What should I do if toothache is keeping me awake?',
        a: 'Call for an urgent dental appointment, especially if the pain is persistent or worsening. Tell reception if you have swelling, fever or pain when you bite so the team can advise on timing.',
      },
      {
        q: 'What should I do if my face is swelling from a tooth infection?',
        a: 'Seek urgent dental assessment for facial swelling. Go to the nearest hospital emergency department immediately if you have trouble breathing or swallowing, swelling near your eye or neck, or rapidly increasing swelling.',
      },
      {
        q: 'What should I do if a permanent tooth is knocked out?',
        a: 'Hold the tooth by the crown and avoid touching or scrubbing the root. If it is dirty, rinse it gently with milk or saline. Reinsert it gently if possible. Otherwise keep it in milk and seek emergency dental care immediately.',
      },
      {
        q: 'What if my mouth keeps bleeding after an extraction?',
        a: 'Bite firmly on clean gauze placed over the socket as directed by your dentist. If bleeding continues despite firm pressure, contact the clinic urgently. Seek emergency care if bleeding is heavy or you feel faint.',
      },
      {
        q: 'What should I do if I chip a tooth?',
        a: 'Rinse gently, save any tooth fragments, and avoid chewing on the injured side. Arrange a dental assessment, particularly if the tooth is painful, loose or has a large piece missing.',
      },
      {
        q: 'Can a dental abscess go away if the swelling drains?',
        a: 'An abscess can drain and feel better while the source of infection remains. Arrange urgent dental care so the dentist can assess whether drainage, root canal treatment or extraction is needed.',
      },
      {
        q: 'What if a wire from my braces is poking my cheek?',
        a: 'Orthodontic wax can cover the sharp end temporarily. Call the clinic for instructions, especially if a wire or bracket has come loose or is causing a sore.',
      },
      {
        q: 'When should a mouth ulcer or unusual patch be checked?',
        a: 'Book an assessment if an ulcer lasts two weeks or an unusual red or white patch or lump persists, grows, or changes. Your dentist can examine the area and discuss whether further tests or referral are needed.',
      },
    ],
  },
  {
    id: 14,
    title: 'Full-mouth rehabilitation and missing teeth',
    slug: 'full-mouth-rehabilitation-and-missing-teeth',
    faqs: [
      {
        q: 'What is full-mouth rehabilitation?',
        a: 'It is a coordinated plan to restore comfort, chewing, bite and appearance when several teeth are worn, broken or missing. It may combine gum care, restorations and tooth replacement over several stages.',
      },
      {
        q: 'Does full-mouth rehabilitation mean all my teeth will be removed?',
        a: 'We assess each tooth and discuss which can be kept and restored. Extraction is considered for teeth with a poor outlook or when it is clinically appropriate as part of a wider plan.',
      },
      {
        q: 'Can badly worn teeth be rebuilt?',
        a: 'It may be possible to rebuild worn teeth with bonding, onlays, crowns or a combination. Your dentist also checks factors that can contribute to wear, such as grinding or repeated acid exposure.',
      },
      {
        q: 'What is the difference between full-arch implants and a removable denture?',
        a: 'A fixed full-arch bridge is attached to implants and stays in the mouth during daily use. A removable denture comes out for cleaning and may rest on the gums or attach to implants for extra stability.',
      },
      {
        q: 'How many implants are needed for a full arch of teeth?',
        a: 'The number depends on bone, jaw shape, bite, the design of the replacement teeth and how they will be cleaned. Your dentist recommends a plan after examination and imaging.',
      },
      {
        q: 'Can I get fixed teeth on the day of full-arch surgery?',
        a: 'A temporary fixed bridge may be possible if the implants have enough initial stability and the bite can be managed safely. Your dentist will discuss a temporary plan for both possibilities before surgery.',
      },
      {
        q: 'Why might I wear temporary teeth before the final bridge or crowns?',
        a: 'Temporary restorations can help you and your dentist assess bite, speech and appearance while healing or before the final teeth are made. The team can use that feedback to refine the design.',
      },
      {
        q: 'What maintenance is needed after full-mouth rehabilitation?',
        a: 'The schedule depends on your restorations and oral health. Follow the cleaning routine your dentist demonstrates and attend reviews for gum health, bite, wear and the condition of crowns, bridges or implants.',
      },
    ],
  },
  {
    id: 15,
    title: 'Estimates, follow-up and overseas patients',
    slug: 'estimates-follow-up-and-overseas-patients',
    faqs: [
      {
        q: 'Can I get an itemised estimate before treatment?',
        a: 'Yes. After your examination, ask for an estimate showing the proposed procedures, materials and treatment stages. For multi-visit care, ask which items are included and what may change if the dentist finds something new.',
      },
      {
        q: 'Can my dental treatment be divided into stages?',
        a: 'Often. Your dentist can explain which problems need attention first and which treatments can be scheduled later. For example, pain or active disease may need to be addressed before planning cosmetic or restorative work.',
      },
      {
        q: 'Is the final cost the same as a quote given by phone?',
        a: 'A phone estimate is an initial guide. The cost can be confirmed after the dentist has examined you and assessed any necessary imaging, materials and treatment stages.',
      },
      {
        q: 'Can I send X-rays before travelling to Dhaka?',
        a: 'Yes. Contact your preferred branch to ask how to send recent X-rays, CBCT files and treatment records. The team can review what you have and discuss a provisional plan, which is confirmed after an in-person examination.',
      },
      {
        q: 'How long should I stay in Dhaka for dental treatment?',
        a: 'Share your arrival and departure dates before booking travel around treatment. The required time depends on the procedures, lab work and post-treatment checks. Implant treatment may involve a return visit after healing.',
      },
      {
        q: 'What records should I request before returning abroad?',
        a: 'Ask for a treatment summary, relevant images, implant component details if applicable, and follow-up instructions. These can help a dentist near home continue your care if needed.',
      },
      {
        q: 'Can I have a follow-up at the other RH Dental Care branch?',
        a: 'Ask reception whether your planned follow-up can be arranged at the other branch. The right appointment depends on the procedure, the clinician who needs to see you and the equipment required.',
      },
      {
        q: 'Who should I call if I have a problem after treatment?',
        a: 'Call the branch where you were treated and describe when the symptoms started and whether they are getting worse. For breathing or swallowing difficulty, rapidly spreading swelling or heavy uncontrolled bleeding, go to a hospital emergency department immediately.',
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.faqs);

export const APPOINTMENTS_BRANCHES_FAQS = FAQ_CATEGORIES[0].faqs;
export const CHECKUPS_PREVENTION_FAQS = FAQ_CATEGORIES[1].faqs;
export const SCALING_LASER_GUM_FAQS = FAQ_CATEGORIES[2].faqs;
export const MICROSCOPE_ROOT_CANAL_FAQS = FAQ_CATEGORIES[3].faqs;
export const IMPLANT_PLANNING_FAQS = FAQ_CATEGORIES[4].faqs;
export const IMPLANT_HEALING_FAQS = FAQ_CATEGORIES[5].faqs;
export const ALL_IMPLANT_FAQS = [...IMPLANT_PLANNING_FAQS, ...IMPLANT_HEALING_FAQS];
export const CLEAR_ALIGNERS_BRACES_FAQS = FAQ_CATEGORIES[6].faqs;
export const SMILE_DESIGN_VENEERS_FAQS = FAQ_CATEGORIES[7].faqs;
export const CROWNS_DIGITAL_LAB_FAQS = FAQ_CATEGORIES[8].faqs;
export const CHILDREN_DENTISTRY_FAQS = FAQ_CATEGORIES[9].faqs;
export const SPECIAL_NEEDS_ANESTHESIA_FAQS = FAQ_CATEGORIES[10].faqs;
export const ALL_KIDS_CARE_FAQS = [...CHILDREN_DENTISTRY_FAQS, ...SPECIAL_NEEDS_ANESTHESIA_FAQS];
export const EXTRACTIONS_ORAL_SURGERY_FAQS = FAQ_CATEGORIES[11].faqs;
export const DENTAL_EMERGENCIES_FAQS = FAQ_CATEGORIES[12].faqs;
export const FULL_MOUTH_REHAB_FAQS = FAQ_CATEGORIES[13].faqs;
export const ESTIMATES_OVERSEAS_FAQS = FAQ_CATEGORIES[14].faqs;
