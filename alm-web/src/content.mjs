// All copy extracted from the live activelittleminds.com (Sept 2026 audit).
// Nothing here is invented except where marked draft/TODO for client review.

export const clinic = {
  name: 'Active Little Minds',
  full: 'Active Little Minds — Child Development Centre',
  promise: 'Where every child’s journey matters',
  area: 'Sector 23, Gurugram',
  address:
    'H.No. 692, Sector 23, near Ansal Plaza, Gurugram 122017, Haryana',
  // NOTE: the live site used two different numbers (93547 51149 and 8126268441).
  // Consolidated to the office line — confirm with the client before launch.
  phoneDisplay: '+91 93547 51149',
  phoneHref: 'tel:+919354751149',
  whatsappHref: 'https://wa.me/919354751149',
  email: 'activelittleminds1@gmail.com',
  mapHref:
    'https://www.google.com/maps/search/?api=1&query=Active+Little+Minds+Sector+23+Gurugram',
  social: {
    instagram: 'https://www.instagram.com/active_little_minds',
    facebook: 'https://www.facebook.com/profile.php?id=61580940359737',
    youtube: 'https://www.youtube.com/@ActiveLittleMinds',
  },
  // TODO(client): confirm opening hours. The old site referred to "normal
  // business hours" but never published them.
  hours: [
    { days: 'Monday to Saturday', time: '9:00am – 7:00pm' },
    { days: 'Sunday', time: 'Closed' },
  ],
};

export const concerns = [
  'Autism',
  'ADHD',
  'Cerebral Palsy',
  'Down Syndrome',
  'Speech and language delay',
  'Sensory processing difficulties',
  'Dyslexia and learning difficulty',
];

export const services = [
  {
    slug: 'speech-and-language-therapy',
    title: 'Speech & Language Therapy',
    tone: 'sun',
    short:
      'Communication, vocabulary, pronunciation, and the confidence to use them.',
    tagline: 'Helping your child communicate with confidence, clarity, and joy.',
    whatHeading: 'What is Speech & Language Therapy?',
    what: [
      'Speech & Language Therapy is a specialised programme designed to help children overcome challenges in communication, articulation, comprehension, and expression. Every child develops at their own pace, and therapy is tailored to meet individual needs.',
      'Children with Autism, ADHD, Down Syndrome, or other developmental differences may have difficulty speaking, forming sentences, understanding language, or expressing their thoughts. Our speech therapists work closely with parents to design personalised interventions.',
    ],
    note:
      'Early speech therapy can improve social interaction, learning, and confidence, often making a dramatic difference to a child’s overall development.',
    help: [
      'Articulation and pronunciation exercises',
      'Language comprehension and vocabulary building',
      'Social communication skills',
      'Non-verbal communication and gestures',
      'Parent training and home support strategies',
    ],
    approach:
      'Therapy should be fun, engaging, and confidence-building. Sessions often include interactive games, storytelling, songs, and role-playing to keep children motivated while they learn. Progress is monitored closely and the plan adjusts as your child changes.',
    story:
      'Aarav, diagnosed with speech delay, started expressing full sentences after six months of consistent therapy, improving his communication and confidence at school and at home.',
    close:
      'Every child deserves the chance to be heard, understood, and confident in expressing themselves.',
  },
  {
    slug: 'occupational-therapy-and-sensory-integration',
    title: 'Occupational Therapy & Sensory Integration',
    tone: 'sky',
    short:
      'Daily living skills, sensory processing, fine motor control, and coordination.',
    tagline:
      'Helping children develop essential skills for daily living, learning, and emotional regulation.',
    whatHeading: 'What is Occupational Therapy & Sensory Integration?',
    what: [
      'Occupational Therapy helps children take part fully in daily activities such as dressing, writing, eating, and playing. Sensory Integration Therapy helps children process and respond to sensory information from their environment. Together they build independence, coordination, and confidence.',
      'Many children with Autism, ADHD, Cerebral Palsy, or other developmental challenges have difficulty with fine motor skills, hand-eye coordination, balance, and sensory processing. Our therapists design individualised programmes for each child.',
    ],
    note:
      'Children who receive early occupational therapy often show improved focus, emotional regulation, and academic readiness.',
    help: [
      'Fine motor skills — grasping, writing, manipulating objects',
      'Gross motor skills — balance, coordination, strength',
      'Daily living skills — dressing, feeding, hygiene',
      'Sensory processing — tactile, vestibular, auditory, and visual',
      'Play-based therapy to encourage engagement and learning',
      'Parent coaching and home programme guidance',
    ],
    approach:
      'Therapy here is fun, engaging, and goal-oriented. We use games, obstacle courses, hands-on activities, and imaginative play so children develop skills naturally. Progress is monitored closely to ensure measurable outcomes.',
    story:
      'Riya, a child with sensory processing challenges, struggled with messy play and hand-eye coordination. After four months of targeted sessions she now enjoys painting, plays with peers, and shows improved focus in class.',
    close:
      'We want children to become confident, independent, and fully engaged in their world, with families supported every step of the way.',
  },
  {
    slug: 'neurodevelopment-therapy-and-early-intervention',
    title: 'Neurodevelopment Therapy & Early Intervention',
    tone: 'mint',
    short:
      'Early identification and intervention for cognitive, motor, and social development.',
    tagline:
      'Supporting your child’s developmental milestones through early, tailored intervention.',
    whatHeading: 'What is Neurodevelopment Therapy & Early Intervention?',
    what: [
      'Neurodevelopment Therapy supports the development of a child’s nervous system, motor skills, cognition, and social-emotional growth. Early Intervention identifies and addresses developmental delays as early as possible, so children get the best start.',
      'Children with Autism, ADHD, Cerebral Palsy, Down Syndrome, or other neurodevelopmental conditions benefit significantly from early identification and consistent therapy. Programmes are individualised to each child’s needs and developmental stage.',
    ],
    note:
      'Research shows that children who receive early support achieve better long-term outcomes in communication, motor skills, learning, and social interaction.',
    help: [
      'Monitoring developmental milestones and early detection of delays',
      'Cognitive, motor, and sensory development',
      'Social-emotional skills and peer interaction',
      'Communication, learning readiness, and independence',
      'Parent coaching for consistent practice at home',
      'Customised plans with measurable progress tracking',
    ],
    approach:
      'We combine evidence-based therapy with playful activities that make learning natural and enjoyable — games, storytelling, sensory play, and movement. The team monitors progress continuously and adapts the plan.',
    story:
      'Kabir, diagnosed with early developmental delays, achieved key motor and cognitive milestones ahead of expectations after six months in the early intervention programme.',
    close:
      'Every child deserves the opportunity to thrive and reach their full potential, with families guided along the way.',
  },
  {
    slug: 'pediatric-physiotherapy-and-sports-therapy',
    title: 'Pediatric Physiotherapy & Sports Therapy',
    tone: 'tangerine',
    short:
      'Strength, mobility, posture, and taking part in sport and play.',
    tagline:
      'Supporting your child’s strength, mobility, and active participation in play and sport.',
    whatHeading: 'What is Pediatric Physiotherapy & Sports Therapy?',
    what: [
      'Pediatric Physiotherapy helps children achieve better movement, strength, and functional independence. Sports Therapy encourages physical activity, coordination, and fitness in a safe and structured way. Together they support health, confidence, and active participation.',
      'Children with developmental delays, cerebral palsy, muscular weakness, post-injury recovery, or mobility challenges benefit from physiotherapy and sports programmes tailored to their needs.',
    ],
    note:
      'Regular pediatric physiotherapy can improve posture, coordination, and strength, and prevent future musculoskeletal problems.',
    help: [
      'Gross motor skills, balance, and coordination',
      'Strengthening muscles and joints for posture and mobility',
      'Rehabilitation after injury or surgery',
      'Sports-specific exercises for confidence and skill-building',
      'Play-based movement therapy',
      'Parent guidance for exercises and active routines at home',
    ],
    approach:
      'We combine professional physiotherapy technique with interactive, playful exercise. Children work through obstacle courses, fitness activities, and guided sports sessions to build strength, coordination, and confidence.',
    story:
      'Aarav, who struggled with balance and coordination, significantly improved his running, jumping, and sports skills after consistent physiotherapy and sports sessions.',
    close:
      'We want children to be physically confident, active, and independent, and families to have the tools to support that.',
  },
  {
    slug: 'special-education-and-remedial-classes',
    title: 'Special Education & Remedial Classes',
    tone: 'petal',
    short:
      'Learning plans that close academic gaps and rebuild confidence at school.',
    tagline:
      'Tailored educational support to help children reach their academic potential.',
    whatHeading: 'What is Special Education & Remedial Support?',
    what: [
      'Special Education creates personalised learning strategies for children with learning difficulties, developmental delays, or neurodivergent needs. Remedial classes close academic gaps, strengthen skills, and rebuild confidence.',
      'Children with Autism, ADHD, Dyslexia, or other learning challenges benefit from approaches matched to their learning style and pace. Our programmes make learning enjoyable, engaging, and effective.',
    ],
    note:
      'Early intervention in academic learning helps children overcome challenges, improve grades, and develop lifelong learning skills.',
    help: [
      'Personalised lesson plans for core subjects',
      'Remedial support in reading, writing, and maths',
      'Activities for focus, memory, and comprehension',
      'Study strategies and learning habits',
      'Inclusive classrooms with individual attention',
      'Parent guidance for home support and reinforcement',
    ],
    approach:
      'We combine structured academic work with creative, playful activity. Progress is monitored closely, methods adjust, and achievements are celebrated to build motivation and self-confidence.',
    story:
      'Anika, who struggled with reading and writing, improved markedly after three months of remedial classes and now reads fluently and excels at comprehension.',
    close:
      'Every child can reach their academic potential while building confidence, independence, and a love of learning.',
  },
  {
    slug: 'craniosacral-and-oral-placement-therapy',
    title: 'Craniosacral & Oral Placement Therapy',
    tone: 'grape',
    short:
      'Physical relaxation, oral-motor development, and sensory regulation.',
    tagline:
      'Supporting physical, neurological, and oral-motor development.',
    whatHeading: 'What is Craniosacral & Oral Placement Therapy?',
    what: [
      'Craniosacral Therapy is a gentle, hands-on approach that helps children improve nervous system function, release tension, and support physical health. Oral Placement Therapy focuses on the positioning and movement of oral structures to improve speech, feeding, and oral-motor skills.',
      'Children with speech delays, feeding challenges, sensory sensitivities, or conditions such as Autism or ADHD benefit from these therapies. Programmes are customised to each child’s needs and developmental stage.',
    ],
    note:
      'Combining craniosacral and oral placement therapy can improve coordination, speech clarity, and feeding ability.',
    help: [
      'Gentle craniosacral techniques to release tension',
      'Oral-motor exercises for speech clarity, tongue placement, and feeding',
      'Support for sensory integration and motor coordination',
      'Individualised plans based on developmental needs',
      'Parent guidance for practising exercises at home',
    ],
    approach:
      'A playful, engaging approach. Children take part in exercises and games while therapists guide the movements and technique. Progress is monitored closely to ensure measurable outcomes.',
    story:
      'Aarav, who had difficulty with speech clarity and tongue placement, improved markedly after three months of therapy and now speaks clearly and confidently.',
    close:
      'We support every child’s development, building confidence, independence, and joyful participation in daily life.',
  },
  {
    slug: 'group-and-social-therapy',
    title: 'Group & Social Therapy',
    tone: 'petal',
    short:
      'Social skills, teamwork, and friendship, practised alongside other children.',
    tagline: 'Learning to play, share, and belong — alongside other children.',
    whatHeading: 'What is Group & Social Therapy?',
    // NOTE: the old site had no detail page for this service. Copy below is
    // drafted from the service summary and the clinic's stated approach.
    what: [
      'Group and Social Therapy brings children together in small, therapist-led sessions where social skills are practised in a real setting rather than described in one. Children learn to take turns, read expressions, join a game, handle disagreement, and recover from frustration — with a therapist alongside them.',
      'Groups are formed by developmental stage rather than age alone, so every child is working at a level where taking part feels possible.',
    ],
    note:
      'Group sessions build social interaction, teamwork, and communication skills that are difficult to develop in one-to-one therapy alone.',
    help: [
      'Turn-taking, sharing, and waiting',
      'Reading facial expressions, tone, and body language',
      'Joining and sustaining play with peers',
      'Emotional regulation and recovering from frustration',
      'Teamwork through structured group activity',
      'Parent guidance for supporting friendships outside the clinic',
    ],
    approach:
      'Every group is small and therapist-led. Activities are built around play — games, shared tasks, and guided free time — so social skills are learned in the situations where children actually need them.',
    story: null,
    close:
      'Our aim is that every child finds a way into the group, and then finds a friend in it.',
    draft: true,
  },
];

export const values = [
  { title: 'Child first', body: 'Every decision revolves around what is best for the child.' },
  { title: 'Family empowerment', body: 'Parents are our partners, not just observers.' },
  { title: 'Expertise with heart', body: 'Therapists who combine skill with compassion.' },
  { title: 'Playful learning', body: 'Growth happens best when children enjoy the process.' },
];

export const whyUs = [
  {
    title: 'Every therapy under one roof',
    body: 'Occupational therapists, speech therapists, physiotherapists, and special educators work in the same building — and talk to each other about your child.',
  },
  {
    title: 'A plan built for your child',
    body: 'Therapy begins with an assessment, not a package. The plan that follows targets your child’s specific areas of concern and changes as they progress.',
  },
  {
    title: 'Parents are shown the work',
    body: 'You are guided on the exercises and strategies to practise at home, so progress continues between sessions.',
  },
  {
    title: 'Progress you can see',
    body: 'We set measurable goals and share regular updates, so you know what has changed and what comes next.',
  },
  {
    title: 'A place children want to return to',
    body: 'The centre is built to be safe, calm, and stimulating — more a home of hope than a clinic.',
  },
];

export const team = [
  { name: 'Dr. Srishti', role: 'Founder & Child Development Specialist', tone: 'sun' },
  { name: 'Sonam', role: 'Speech & Language Therapist', tone: 'sky' },
  { name: 'Harshita', role: 'Occupational Therapist', tone: 'petal' },
  { name: 'Rupal', role: 'Special Educator', tone: 'mint' },
  { name: 'Shalu', role: 'Physiotherapist', tone: 'grape' },
];

export const stories = [
  {
    quote:
      'When Aarav first joined us, he barely made eye contact and struggled with words. Today, after months of consistent speech and occupational therapy, he not only communicates in sentences but confidently plays with his peers. His laughter fills our centre daily.',
    // TODO(client): attribute to real parents where consent allows.
    source: 'From our centre',
  },
  {
    quote:
      'Meera, diagnosed with Down Syndrome, found it difficult to take part in group activities. With social therapy and patient guidance, she now loves her dance sessions and leads the group with her energy. Her parents say she finally found her wings here.',
    source: 'From our centre',
  },
  {
    quote:
      'Rohan’s ADHD once made classroom learning overwhelming. With tailored remedial education, sensory integration, and supportive educators, he has learned to focus, read, and even mentor younger children.',
    source: 'From our centre',
  },
];

export const testimonials = [
  {
    quote:
      'Best place for Autism and ADHD. My son has shown tremendous improvement in communication and behaviour.',
    source: 'Parent',
  },
  {
    quote:
      'This is a true home for our kids. Therapists treat them with love, patience, and care.',
    source: 'Parent',
  },
  {
    quote:
      'An outstanding therapy centre. The staff has transformed my child’s growth journey.',
    source: 'Parent',
  },
];

// SAMPLE / PLACEHOLDER testimonials — added purely to fill out the
// casserole layout with more variety than the three real quotes above.
// TODO(client): replace these with real parent quotes (with permission) or
// remove them before launch. Names below are placeholders, not real families.
export const sampleTestimonials = [
  {
    quote:
      'We drove past three other centres to get here, and it was worth every trip. Diya’s speech has come on more in four months than in the two years before.',
    source: 'Sample quote — replace before launch',
  },
  {
    quote:
      'The therapists actually talk to each other about Vihaan, not just to us. First place that’s felt like a team.',
    source: 'Sample quote — replace before launch',
  },
  {
    quote:
      'Saanvi used to dread appointments. Now she asks when she gets to go back.',
    source: 'Sample quote — replace before launch',
  },
  {
    quote:
      'Practical, patient, and they explain what they’re doing and why. That mattered more to us than we expected.',
    source: 'Sample quote — replace before launch',
  },
];

export const faqs = [
  {
    q: 'What types of children do you work with?',
    a: 'We work with children facing developmental challenges such as Autism, ADHD, Cerebral Palsy, Down Syndrome, speech and language delays, sensory processing difficulties, and other neurodivergent conditions. Our multidisciplinary approach means each child receives personalised care.',
  },
  {
    q: 'What therapies are offered?',
    a: 'Speech & Language Therapy, Occupational Therapy, Sensory Integration Therapy, Pediatric Physiotherapy, Neurodevelopment Therapy, Craniosacral & Oral Placement Therapy, Special Education, Early Intervention Programmes, Remedial Classes, Sports Therapy, and Group/Social Therapy.',
  },
  {
    q: 'How do I know which therapy is right for my child?',
    a: 'Our team conducts an initial assessment to understand your child’s needs. Based on that evaluation we design a personalised therapy plan targeting areas of concern and supporting overall development.',
  },
  {
    q: 'Are sessions one-to-one or in groups?',
    a: 'Both, depending on your child’s developmental needs. Group sessions build social interaction, teamwork, and communication skills alongside individual therapy.',
  },
  {
    q: 'How long does each session last?',
    a: 'Sessions usually run from 30 minutes to one hour. The duration is tailored to your child’s age, attention span, and specific therapy requirements.',
  },
  {
    q: 'Can parents take part in sessions?',
    a: 'Yes. We encourage parental involvement. Parents are guided on exercises and strategies to practise at home, which reinforces development outside the clinic.',
  },
  {
    q: 'How often should my child attend?',
    a: 'Frequency depends on the therapy and your child’s needs. Most children benefit from two to five sessions per week. Our therapists set a structured schedule after the initial assessment.',
  },
  {
    q: 'What progress can I expect?',
    a: 'Progress varies for every child, but consistent therapy typically leads to improved communication, motor skills, social interaction, independence, and emotional wellbeing. We provide regular updates against measurable goals.',
  },
  {
    q: 'Is the clinic child-friendly and safe?',
    a: 'Yes. The centre is designed to be nurturing, safe, and stimulating. All our therapists are trained professionals who look after the comfort and safety of every child.',
  },
  {
    q: 'How do I book a consultation?',
    a: 'Call or message us on WhatsApp, or send the enquiry form on this site. Our team will schedule an initial assessment and talk you through the therapy plan.',
  },
];

// TODO(client): this is placeholder copy — confirm Dr. Srishti's real
// qualifications and replace the illustrated portrait with an actual photo
// before launch. The founding story below is drawn from the real "Our
// Story" copy on the about page; the credentials list is not.
export const founder = {
  name: 'Dr. Srishti',
  role: 'Founder & Child Development Specialist',
  credentials: [
    'M.Sc. in Child Development',
    'Certified in early intervention practice',
    '10+ years working with neurodivergent children',
  ],
  bio: [
    'Dr. Srishti founded Active Little Minds after watching parents struggle to find one place where therapy, education and care came together — instead of carrying their child between three different clinics.',
    'She still works in the centre every day, alongside the therapists and families who have built it with her since the first few sessions.',
  ],
  quote:
    'Every child, regardless of their challenges, carries an infinite spark of potential. That belief is what this centre was built on, and it is what we come back to every day.',
  draft: true,
};

// Real videos from the clinic's own YouTube channel (@ActiveLittleMinds).
// TODO(client): these are general activity clips, not verified parent
// testimonials — swap in actual testimonial recordings when available.
export const videos = [
  { id: 'Qz4QT4EO3Dk', title: 'A day at Active Little Minds' },
  { id: 'sWv1fjtIrtw', title: 'Summer camp — learning through play' },
  { id: 'q8HAZaMOwJY', title: 'Fine motor skills, hand-eye coordination' },
  { id: '2uji59RdVH0', title: 'Discovering letters through play' },
  { id: 'Tg0pb3VRbiU', title: 'Group activities and teamwork' },
];

export const posts = [
  {
    slug: 'autism-spectrum-disorder-asd',
    title: 'Autism Spectrum Disorder (ASD)',
    dateLabel: '9 November 2025',
    category: 'Autism Spectrum Disorder (ASD)',
    // NOTE: the article body was missing on the live site — the URL served the
    // homepage. Client to supply the original text.
    excerpt:
      'An introduction to Autism Spectrum Disorder — what it is, how it presents in early childhood, and where therapy helps.',
    body: null,
  },
  {
    slug: 'top-8-tips-for-early-childhood-development',
    title: 'Top 8 Tips for Early Childhood Development',
    dateLabel: '6 September 2025',
    category: 'Child Development',
    excerpt:
      'Practical things parents can do at home to support communication, motor skills, and confidence in the early years.',
    body: null,
  },
];

/**
 * Per-route titles and descriptions. Kept here so the pages and the
 * prerender script (scripts/prerender.mjs) cannot drift apart.
 */
export const seo = {
  '/': {
    title: 'Child development & speech therapy in Gurugram | Active Little Minds',
    description:
      'Speech therapy, occupational therapy, physiotherapy and special education for children in Sector 23, Gurugram. Assessment-led plans, therapists under one roof, free first consultation.',
  },
  '/about': {
    title: 'About us | Active Little Minds, Gurugram',
    description:
      'Active Little Minds is a child development centre in Sector 23, Gurugram. Meet the team of therapists and special educators, and read what we believe about how children grow.',
  },
  '/services': {
    title: 'Therapies for children | Active Little Minds, Gurugram',
    description:
      'Speech and language therapy, occupational therapy and sensory integration, early intervention, pediatric physiotherapy, special education, craniosacral therapy and group therapy in Gurugram.',
  },
  '/blog': {
    title: 'Blogs | Active Little Minds',
    description:
      'Plain-language articles on autism, early childhood development and what parents can do at home, written by the team at Active Little Minds.',
  },
  '/contact': {
    title: 'Visit us | Active Little Minds, Sector 23 Gurugram',
    description: `Active Little Minds child development centre, ${clinic.address}. Call ${clinic.phoneDisplay}, message on WhatsApp, or send an enquiry to book a free first consultation.`,
  },
};

/** Title and description for one therapy page. */
export const serviceSeo = (service) => ({
  title: `${service.title} | Active Little Minds, Gurugram`,
  description: service.short,
});

/** Title and description for one blog post page. */
export const postSeo = (post) => ({
  title: `${post.title} | Active Little Minds Blog`,
  description: post.excerpt,
});

/** Every route that should exist as a real page on disk. */
export const routes = [
  ...Object.keys(seo),
  ...services.map((s) => `/services/${s.slug}`),
  ...posts.map((p) => `/blog/${p.slug}`),
];
