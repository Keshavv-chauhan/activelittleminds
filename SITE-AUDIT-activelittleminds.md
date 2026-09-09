# Active Little Minds — Site Audit & Content Extraction

Source: https://activelittleminds.com/ · Captured 2026-09-09
Platform: **GoDaddy Website Builder 8.0.0000** (Starfield Technologies)
Managed by: Purple People International Pvt Ltd

---

## 1. Business facts

| Field | Value |
|---|---|
| Name | Active Little Minds – Child Development Centre |
| Tagline | "Your Speech Therapy Partner in Palam Vihar." |
| Address | H.No. 692, Sector 23, Active Little Minds Clinic, near Ansal Plaza, Gurugram 122017, Haryana, India |
| Phone (office) | +91 93547 51149 |
| Phone / WhatsApp | 8126268441 |
| WhatsApp link | https://wa.me/919354751149 |
| Email | activelittleminds1@gmail.com |
| Instagram | https://www.instagram.com/active_little_minds |
| Facebook | https://www.facebook.com/profile.php?id=61580940359737 |
| YouTube | https://www.youtube.com/@ActiveLittleMinds |
| Locale | en_IN |
| Google site verification | AMmt9ig1C2dYuZpx0CvwhLLrMIkk8nqw74t3EhgCxeY |

> ⚠️ **Two different phone numbers** are used across the site (93547 51149 vs 8126268441), and one appears with and without the +91 prefix. Needs consolidating in the redesign.

---

## 2. Site map

| URL | Title | Actual state |
|---|---|---|
| `/` | Expert Pediatric Therapy for Kids \| Active Little Minds | Hero + keyword list + 7 embeds **clipped to 150px** |
| `/about-us` | About Us \| Active Little Minds | Full content, inside one HTML embed |
| `/services` | Services *(no suffix — inconsistent)* | 2 embeds **clipped to 150px** — page looks blank |
| `/blog` | Blog \| Active Little Minds | Actually contains the 6 **service detail pages**, not blog posts |
| `/contact` | Contact \| Active Little Minds | Hiring form + address block |
| `/f/autism-spectrum-disorder-asd` | Autism Spectrum Disorder (ASD) | **Renders the homepage** — post body missing |
| `/f/top-8-tips-for-early-childhood-development-...` | Top 8 Tips for Early Childhood Development | **Renders the homepage** — post body missing |

Blog categories in use: `Autism Spectrum Disorder (ASD)`, `Child Development`.
Nav: Home · About Us · Services · Blog · Contact · **GET IN TOUCH** (→ `/contact`).

---

## 3. Critical defects found

1. **Content is invisible.** All body content lives in GoDaddy "custom HTML" `srcdoc` iframes. On `/` and `/services` those iframes are locked at **150px tall**, so ~14,000 characters of good copy are cut off. The Services page renders as a near-blank white page.
2. **Blog is broken.** Both `/f/...` post URLs serve the homepage instead of the article. The `/blog` page serves service pages.
3. **Information architecture is scrambled** — service detail content sits on `/blog`; `/services` holds only an overview + FAQ.
4. **No SEO value from embeds.** Server HTML for `/about-us`, `/services`, `/contact` contains no body copy — crawlers see an empty shell. Only `/` has server-rendered text.
5. **Homepage body copy is a raw keyword dump** (10 stacked SEO phrases), not human copy.
6. **Duplicate/looping blog carousel** repeats the same 2 posts 3× ("1 / 2" pager).
7. **Font stack is broken** — `body` computes to `Times New Roman` (fallback fired), while headings use Playfair Display.
8. **Contact page leads with a hiring form**, not a booking/enquiry form. No business hours listed despite copy saying "visit during normal business hours."
9. **Missing service detail page** for Group / Social Therapy (the other 6 have one).
10. **No map embed** despite a "GET DIRECTIONS" button.
11. Emoji used as functional icons throughout (🗣️ 🖐️ 🧠 💪 🎓 🧘 🤝) — renders inconsistently, poor a11y.

---

## 4. Current design tokens

**Fonts**
- Headings: `"Playfair Display", Georgia, serif` — H1 = 36px / 39.6px
- UI/body intended: `"Source Sans Pro", arial, sans-serif`
- Body actual computed: `16px "Times New Roman"` ← bug

**Colours**
| Swatch | Hex | Role |
|---|---|---|
| `rgb(243, 210, 73)` | **#F3D249** | Brand yellow — header bar, accents |
| `rgb(22, 22, 22)` | #161616 | Near-black — buttons, footer |
| `rgb(255, 255, 255)` | #FFFFFF | Page background |
| `rgb(246, 246, 246)` | #F6F6F6 | Section tint |
| `rgb(111, 111, 111)` | #6F6F6F | `theme-color` meta / muted |
| `rgb(94, 94, 94)` | #5E5E5E | Body text grey |
| `rgb(62, 59, 49)` | #3E3B31 | Warm dark text |
| `rgb(226, 226, 226)` | #E2E2E2 | Borders |

Embedded pages additionally use pastel pink→lavender→mint gradient hero backgrounds (About Us, Services) that clash with the yellow/black shell.

**Assets**
- Logo: `https://img1.wsimg.com/isteam/ip/6416694b-fb90-41d4-97ff-c789b47f639a/Logo_ALM.jpeg` (JPEG, not transparent PNG/SVG)
- OG image: `https://img1.wsimg.com/isteam/getty/2169950751`
- All photography is stock Getty via `img1.wsimg.com/isteam/getty/…` — IDs: 1400106552, 2169043866, 1127705002, 2184947927, 1492356350, 2169950751; stock: yrrGkGx, Y8Er3Nx, NeVyaAm
- **No real clinic or team photography anywhere on the site.**

---

## 5. Extracted copy

### 5.1 Meta

- **Title (home):** Expert Pediatric Therapy for Kids | Active Little Minds
- **Description:** Discover specialized speech therapy for kids at Active Little Minds. Our experienced speech therapists help children communicate effectively.
- **OG title:** Active Little Minds
- **Twitter description:** Active Little Minds – Child Development Centre speech therapy for kids

### 5.2 Homepage (visible)

- H1: Active Little Minds – Child Development Centre speech therapy for kids
- H2: Active Little Minds – Child Development Centre
- "Your Speech Therapy Partner in Palam Vihar."
- H2: Transform Your Communication with Active Little Minds
- CTA: **FIND OUT MORE**
- H2: Follow us on social for updates.

Keyword block (currently rendered as visible body copy):
Speech therapist Palam Vihar Gurgaon · Speech therapy centre Palam Vihar · Best speech therapist Gurugram · Speech therapy for kids Palam Vihar · Adult speech therapy Gurgaon · Language therapy Palam Vihar · Stuttering therapy Gurgaon · Fluency therapy Palam Vihar · Voice therapy Gurgaon · Speech therapy at home Palam Vihar

Footer: `Copyright © 2025 Active Little Minds - All Rights Reserved.` · `Managed by Purple People International Pvt Ltd`

Cookie banner: "This website uses cookies. We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data." → ACCEPT

### 5.3 Homepage hidden embed — landing block

**💡 Empowering Neurodivergent Children to Thrive**

At Active Little Minds Clinic, we believe every child deserves the chance to grow, learn, and shine in their own unique way. Through holistic therapies, expert care, and unconditional love, we help children unlock their full potential.

CTAs: 📞 Call Us Today · 📅 Book a Consultation

**About Us** — We are a team of passionate therapists and educators dedicated to supporting children with Autism, ADHD, Cerebral Palsy, Down Syndrome, and other developmental challenges. Our multidisciplinary approach ensures personalized therapy plans, nurturing environments, and measurable growth.

**Why Choose Us**
- ✔️ **Child-Centered Approach:** Every child is valued for who they are, not just their progress.
- ✔️ **Multidisciplinary Expertise:** Occupational, Speech, Physio & Educators under one roof.
- ✔️ **Holistic Development:** Communication, independence, learning & well-being.
- ✔️ **Family Empowerment:** Parents guided & supported throughout.
- ✔️ **Safe & Nurturing Space:** More than a clinic – a home of hope.

**Parent Testimonials**
- 💬 "Best place for Autism and ADHD… my son has shown tremendous improvement in communication and behavior."
- 💬 "This is a true home for our kids… therapists treat them with love, patience, and care."
- 💬 "ALM is an outstanding therapy center… the staff has transformed my child's growth journey."

### 5.4 About Us

**About Us** — Active Little Minds – Child Development Centre is more than a clinic; it's a home of growth, hope, and transformation for children and families.

**🌱 Our Story**

Active Little Minds was founded with one powerful belief: **every child, regardless of their challenges, carries an infinite spark of potential.** We saw how parents struggled to find a place where therapy, love, and education could come together. That inspired us to create a centre that doesn't just "treat" but embraces every child as family.

From humble beginnings with a few therapists and children, we have grown into a vibrant community of professionals, families, and most importantly, children who remind us every day what resilience, joy, and growth look like.

**💖 Stories That Inspire Us**

> "When Aarav first joined us, he barely made eye contact and struggled with words. Today, after months of consistent speech and occupational therapy, Aarav not only communicates in sentences but also confidently plays with his peers. His laughter fills our centre daily."

> "Meera, diagnosed with Down Syndrome, found it difficult to participate in group activities. With social therapy and patient guidance, she now loves her dance sessions and leads the group with her vibrant energy. Her parents often say, 'She finally found her wings here.'"

> "Rohan's ADHD once made classroom learning overwhelming. With tailored remedial education, sensory integration, and supportive educators, he has learned to focus, read, and even mentor younger kids. His journey reminds us why we do what we do."

**🌟 Our Values**
- 💡 **Child First:** Every decision revolves around what's best for the child.
- 🤝 **Family Empowerment:** Parents are our partners, not just observers.
- 🧑‍⚕️ **Expertise with Heart:** Therapists who combine skill with compassion.
- 🎨 **Playful Learning:** Growth happens best when children enjoy the process.

**👩‍⚕️ Meet Our Team**

| Name | Role |
|---|---|
| Dr. Srishti | Founder & Child Development Specialist |
| Sonam | Speech & Language Therapist |
| Harshita | Occupational Therapist |
| Rupal | Special Educator |
| Shalu | Physiotherapist |

Footer line: © 2025 Active Little Minds – Child Development Centre | Where Every Child's Journey Matters

### 5.5 Services — overview

**Our Services** — At Active Little Minds – Child Development Centre, we provide a wide range of therapies and programs designed to nurture your child's growth, independence, and confidence.

**Comprehensive Therapies & Programs**

| Icon | Service | Blurb |
|---|---|---|
| 🗣️ | Speech & Language Therapy | Improving communication skills, vocabulary, pronunciation, and confidence in expression for children with language challenges. |
| 🖐️ | Occupational Therapy & Sensory Integration | Enhancing daily living skills, sensory processing, fine motor control, and coordination for overall functional independence. |
| 🧠 | Neurodevelopment Therapy & Early Intervention | Personalized programs for early identification and intervention to support cognitive, motor, and social development. |
| 💪 | Pediatric Physiotherapy & Sports Therapy | Improving physical strength, mobility, posture, and participation in sports and play activities with targeted interventions. |
| 🎓 | Special Education & Remedial Classes | Custom-tailored learning plans to address academic gaps, promote independence, and build confidence in school performance. |
| 🧘 | Craniosacral & Oral Placement Therapy | Supporting physical relaxation, oral-motor development, and sensory regulation for overall wellbeing and learning readiness. |
| 🤝 | Group / Social Therapy | Building social skills, teamwork, emotional intelligence, and peer interactions through guided group activities and play. |

CTAs: 📞 Book a Free Consultation Call · 💬 WhatsApp Us

### 5.6 FAQ (10 questions — currently on /services, clipped)

**1. What types of children do you work with?**
We work with children facing developmental challenges such as Autism, ADHD, Cerebral Palsy, Down Syndrome, speech and language delays, sensory processing difficulties, and other neurodivergent conditions. Our multidisciplinary approach ensures each child receives personalized care.

**2. What therapies are offered at Active Little Minds Clinic?**
Our services include Speech & Language Therapy, Occupational Therapy, Sensory Integration Therapy, Pediatric Physiotherapy, Neurodevelopment Therapy, Craniosacral & Oral Placement Therapy, Special Education, Early Intervention Programs, Remedial Classes, Sports Therapy, and Group/Social Therapy.

**3. How do I know which therapy is suitable for my child?**
Our team conducts an initial assessment to understand your child's unique needs. Based on the evaluation, we design a personalized therapy plan that targets areas of concern and supports overall development.

**4. Are therapy sessions conducted individually or in groups?**
We provide both one-on-one therapy sessions and group/social therapy, depending on your child's developmental needs. Group sessions promote social interaction, teamwork, and communication skills.

**5. How long does each therapy session last?**
Therapy sessions usually range from 30 minutes to 1 hour. The duration is tailored according to the child's age, attention span, and specific therapy requirements.

**6. Can parents participate in therapy sessions?**
Yes! We encourage parental involvement. Parents are guided on exercises and strategies to practice at home, creating continuity and reinforcing the child's development outside the clinic.

**7. How frequently should my child attend therapy?**
Frequency depends on the therapy type and your child's needs. Most children benefit from 2–5 sessions per week. Our therapists provide a structured schedule based on the initial assessment.

**8. What progress can I expect from therapy?**
Each child's progress varies, but consistent therapy typically leads to improved communication, motor skills, social interaction, independence, and emotional well-being. We provide regular progress updates and measurable goals.

**9. Is your clinic child-friendly and safe?**
Absolutely. Active Little Minds Clinic is designed to be a nurturing, safe, and stimulating environment. All our therapists are trained professionals who ensure the comfort and safety of every child.

**10. How do I book a consultation or therapy session?**
You can call us at 8126268441, WhatsApp us at the same number, or use the "Book a Consultation" button on our website. Our team will schedule an initial assessment and guide you through the therapy plan.

---

## 6. Service detail pages (currently living on /blog)

Each follows the same template: **Title → subtitle → "What is…" → "How We Help" (bullets) → "Our Approach" → Success Story → CTAs**.

### 6.1 Speech & Language Therapy
*Helping your child communicate with confidence, clarity, and joy.*

**What is it?** Speech & Language Therapy is a specialized program designed to help children overcome challenges in communication, articulation, comprehension, and expression. At Active Little Minds – Child Development Centre, we understand that every child develops at their own pace, and our therapy is tailored to meet individual needs.

Children with Autism, ADHD, Down Syndrome, or other developmental differences may experience difficulties in speaking, forming sentences, understanding language, or expressing their thoughts effectively. Our speech therapists work closely with parents to design personalized interventions.

💡 *Did you know?* Early speech therapy can improve social interaction, learning, and confidence, often making a dramatic difference in a child's overall development.

**How We Help**
- Articulation & Pronunciation exercises
- Language comprehension & vocabulary building
- Social communication skills
- Non-verbal communication & gestures
- Parent training and home support strategies

**Our Approach** — We believe therapy should be fun, engaging, and confidence-building. Our sessions often include interactive games, storytelling, songs, and role-playing to keep children motivated while learning. Progress is monitored closely, and adjustments are made continuously to suit each child's unique needs.

❤️ *Success Story:* Aarav, diagnosed with speech delay, started expressing full sentences after 6 months of consistent therapy, enhancing his communication and confidence in school and home environments.

Our goal is simple: every child deserves the chance to be heard, understood, and confident in expressing themselves.

### 6.2 Occupational Therapy & Sensory Integration
*Helping children develop essential skills for daily living, learning, and emotional regulation.*

**What is it?** Occupational Therapy (OT) focuses on helping children participate fully in daily activities such as dressing, writing, eating, and playing. Sensory Integration Therapy is a specialized approach that helps children process and respond to sensory information from their environment. Together, these therapies enhance independence, coordination, and confidence.

Many children with Autism, ADHD, Cerebral Palsy, or other developmental challenges face difficulties in fine motor skills, hand-eye coordination, balance, and sensory processing. Our therapists design individualized programs to address each child's unique needs.

💡 *Did you know?* Children who receive early occupational therapy often show improved focus, emotional regulation, and academic readiness.

**How We Help**
- Fine motor skill development (grasping, writing, manipulating objects)
- Gross motor skill improvement (balance, coordination, strength)
- Daily living skills training (dressing, feeding, hygiene)
- Sensory processing support (tactile, vestibular, auditory, and visual)
- Play-based therapy to encourage engagement and learning
- Parent coaching and home program guidance

**Our Approach** — Therapy at Active Little Minds is designed to be fun, engaging, and goal-oriented. We use games, obstacle courses, hands-on activities, and imaginative play to help children develop skills naturally and joyfully. Progress is monitored closely to ensure measurable outcomes and continuous improvement.

❤️ *Success Story:* Riya, a child with sensory processing challenges, struggled with messy play and hand-eye coordination. After 4 months of targeted OT and sensory integration sessions, she now enjoys painting, playing with peers, and shows improved focus in class.

Our mission is to empower children to become confident, independent, and fully engaged in their world, while supporting families every step of the way.

### 6.3 Neurodevelopment Therapy & Early Intervention
*Supporting your child's developmental milestones through early and tailored interventions.*

**What is it?** Neurodevelopment Therapy focuses on understanding and supporting the development of a child's nervous system, motor skills, cognition, and social-emotional growth. Early Intervention Programs are designed to identify and address developmental delays as early as possible, ensuring children have the best start in life.

Children with conditions such as Autism, ADHD, Cerebral Palsy, Down Syndrome, or other neurodevelopmental challenges often benefit significantly from early identification and consistent therapy. Our programs are individualized to meet each child's unique needs and developmental stage.

💡 *Why Early Intervention Matters:* Research shows that children who receive early support achieve better long-term outcomes in communication, motor skills, learning, and social interactions.

**How We Help**
- Monitoring developmental milestones and early detection of delays
- Enhancing cognitive, motor, and sensory development
- Promoting social-emotional skills and peer interaction
- Supporting communication, learning readiness, and independence
- Parent coaching for consistent practice at home
- Customized developmental plans with measurable progress tracking

**Our Approach** — We combine evidence-based therapies with playful, engaging activities that make learning natural and enjoyable. Sessions include games, storytelling, sensory play, and movement exercises. Our team continuously monitors progress and adapts interventions to maximize outcomes.

❤️ *Success Story:* Kabir, diagnosed with early developmental delays, was able to achieve key motor and cognitive milestones ahead of expectations after 6 months of Neurodevelopment Therapy and Early Intervention Programs.

Our mission is to give every child the opportunity to thrive, grow confidently, and reach their full potential, while empowering families with guidance and support.

### 6.4 Pediatric Physiotherapy & Sports Therapy
*Supporting your child's physical development, strength, mobility, and active participation in play and sports.*

**What is it?** Pediatric Physiotherapy focuses on helping children achieve optimal movement, strength, and functional independence. Sports Therapy encourages physical activity, coordination, and fitness in a safe and structured way. Together, these therapies promote overall health, confidence, and active participation in daily and recreational activities.

Children with developmental delays, cerebral palsy, muscular weakness, post-injury recovery, or mobility challenges benefit greatly from targeted physiotherapy and sports programs tailored to their individual needs.

💡 *Did you know?* Regular pediatric physiotherapy can improve posture, coordination, strength, and prevent future musculoskeletal issues.

**How We Help**
- Improving gross motor skills, balance, and coordination
- Strengthening muscles and joints for better posture and mobility
- Rehabilitation after injury or surgery
- Sports-specific exercises for confidence and skill-building
- Play-based movement therapy to encourage engagement and fun
- Parent guidance for exercises and active routines at home

**Our Approach** — We combine professional physiotherapy techniques with interactive, playful exercises. Children engage in obstacle courses, fun fitness activities, and guided sports sessions to develop strength, coordination, and confidence naturally. Progress is continuously monitored and customized for each child.

❤️ *Success Story:* Aarav, who struggled with balance and coordination, improved his running, jumping, and sports skills significantly after consistent physiotherapy and sports sessions.

Our mission is to help children become physically confident, active, and independent, while providing families with the tools to support their child's growth.

### 6.5 Special Education & Remedial Classes
*Providing tailored educational support to help children achieve their academic and developmental potential.*

**What is it?** Special Education focuses on creating personalized learning strategies for children with learning difficulties, developmental delays, or neurodivergent needs. Remedial classes provide targeted support to address academic gaps, strengthen skills, and build confidence.

Children with Autism, ADHD, Dyslexia, or other learning challenges benefit from individualized approaches that cater to their unique learning styles and pace. Our programs aim to make learning enjoyable, engaging, and effective.

💡 *Did you know?* Early intervention in academic learning can help children overcome challenges, improve grades, and develop lifelong learning skills.

**How We Help**
- Personalized lesson plans for core subjects
- Remedial support in reading, writing, and math
- Skill-building activities for focus, memory, and comprehension
- Study strategies and learning habit development
- Inclusive classrooms with individual attention
- Parent guidance for home support and reinforcement

**Our Approach** — We combine structured academic exercises with creative and playful activities to engage children effectively. We closely monitor progress, adjust methods, and celebrate achievements to foster motivation and self-confidence.

❤️ *Success Story:* Anika, who struggled with reading and writing, showed remarkable improvement after 3 months of remedial classes, now reading fluently and excelling in comprehension tasks.

Our mission is to help every child reach their academic potential while building confidence, independence, and a love for learning.

### 6.6 Craniosacral Therapy & Oral Placement Therapy
*Enhancing physical, neurological, and oral motor development for children to reach their full potential.*

**What is it?** Craniosacral Therapy is a gentle, hands-on approach to help children improve nervous system function, reduce tension, and enhance overall physical health. Oral Placement Therapy focuses on the proper positioning and movement of oral structures to improve speech, feeding, and oral-motor skills.

Children with speech delays, feeding challenges, sensory sensitivities, or developmental disorders such as Autism or ADHD benefit from these therapies. Our programs are customized to each child's needs and developmental stage.

💡 *Did you know?* Combining craniosacral and oral placement therapies can significantly improve coordination, speech clarity, and feeding abilities in children.

**How We Help**
- Gentle craniosacral techniques to release tension and improve neurological function
- Oral-motor exercises for speech clarity, tongue placement, and feeding skills
- Support for sensory integration and improved motor coordination
- Individualized therapy plans based on developmental needs
- Parent guidance for practicing exercises at home

**Our Approach** — We use a playful and engaging approach to therapy. Children participate in fun exercises and games while therapists guide proper movements and techniques. Progress is monitored closely to ensure measurable outcomes and continuous improvement.

❤️ *Success Story:* Aarav, who had difficulty with speech clarity and tongue placement, showed remarkable improvement after 3 months of craniosacral and oral placement therapy, now speaking clearly and confidently.

Our mission is to enhance every child's development, promoting confidence, independence, and joyful participation in daily life.

### 6.7 Group / Social Therapy
**⚠️ No detail page exists.** Only the overview blurb (see §5.5). Needs writing for the redesign.

---

## 7. Contact page (as built)

**We're Hiring! — Join Our Team**
"If you're interested in one of our open positions, start by applying here and attaching your resume." → **Apply Now**

Form fields: Name · Phone · Email* · Message (textarea) · Attach Resume (file) → **SUBMIT APPLICATION**
Protected by reCAPTCHA (Google Privacy Policy + Terms apply).

**Contact Us — Better yet, see us in person!**
"We love our customers, so feel free to visit during normal business hours."
→ Message us on WhatsApp
→ Address + phone (see §1) → **GET DIRECTIONS**

---

## 8. Blog inventory

| Date | Title | Category | Status |
|---|---|---|---|
| 9 November 2025 | Autism Spectrum Disorder (ASD) | Autism Spectrum Disorder (ASD) | Body missing — URL serves homepage |
| 6 September 2025 | Top 8 Tips for Early Childhood Development \| Active Little Minds | Child Development | Body missing — URL serves homepage |

---

## 9. Redesign recommendations

**Structure**
- Rebuild off GoDaddy's HTML-embed pattern — move to real pages so content is crawlable and responsive.
- Correct IA: `/` → `/about` → `/services` (hub) → `/services/<slug>` (7 detail pages) → `/blog` → `/contact`.
- Move the 6 service detail pages off `/blog`. Write the 7th (Group / Social Therapy).
- Give FAQ its own `/faq` page **and** an accordion on `/services`, with FAQPage schema.

**Content**
- Replace the homepage keyword dump with real copy; move the location keywords into title/meta/H2s and a proper "Speech therapy in Palam Vihar, Gurugram" section.
- Consolidate to one phone number; add business hours; add a Google Map embed.
- Split the contact page: enquiry/booking form primary, careers secondary or its own `/careers`.
- Replace the three anonymous testimonials with attributed ones (first name + child's age) if the clinic can supply them.

**Design**
- Keep #F3D249 yellow + near-black as the brand base; resolve the clash with the pastel gradients — pick one system.
- Fix the font loading (Source Sans Pro never loads → Times New Roman).
- Replace emoji icons with a proper SVG icon set.
- Replace stock Getty imagery with real clinic and team photography; get a transparent-background logo (SVG or PNG) to replace the JPEG.

**Technical**
- Per-page titles and meta descriptions (`/services` currently titled just "Services").
- Add LocalBusiness / MedicalClinic schema with address, phone, hours, geo.
- Sticky mobile call + WhatsApp bar.
- Accessibility pass: contrast on yellow, focus states, alt text, heading order.
