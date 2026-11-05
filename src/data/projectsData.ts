export interface ShowcaseProject {
  id: string;
  title: string;
  subtitle?: string;
  category: 'apps' | 'security' | 'graphics';
  categoryLabel: string;
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  videoUrl?: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  features?: string[];
  highlights?: string;
  underDevelopment?: boolean;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'mark-aldrin-portfolio',
    title: 'Mark Aldrin Tejadilla — Executive VA & Operations Portfolio',
    subtitle: 'Aviation Rigor & Virtual Assistant Web Application',
    category: 'apps',
    categoryLabel: 'Executive VA & Operations Platform',
    featured: true,
    tags: ['Virtual Assistant', 'Operations & CRM', 'Data Entry', 'React', 'Tailwind CSS', 'Vercel'],
    description:
      'An executive operations and administrative virtual assistant web platform for Mark Aldrin Balute Tejadilla, demonstrating aviation procedural rigor, CRM data logging, YouTube and social media scheduling, Canva multimedia, and flight credentials.',
    longDescription:
      'Designed and engineered an executive virtual assistant portfolio and operations platform for Mark Aldrin Balute Tejadilla. Built to showcase military-grade aviation procedural discipline, CRM logging, time tracking, YouTube and social media publishing workflows, Canva multimedia assets, and interactive flight seminar certification archives.',
    image: '/image/mark_preview.png',
    videoUrl: '/assets/images/Screencast_From_2026-10-26_09-00-54_e02c80b5.mp4',
    liveUrl: 'https://markaldrintejadilla.vercel.app',
    githubUrl: 'https://github.com/kejzhin/mark-aldrin-portfolio',
    features: [
      'Live system walkthrough showcasing responsive navigation and interactive operations',
      'Aviation Rigor & Procedural Discipline operational framework applied to executive virtual tasks',
      'CRM & Data Entry operations showcase with verified task completion metrics and time logs',
      'YouTube & Social Media multi-channel scheduling, metadata optimization, and calendar management',
    ],
    highlights: 'Executive Operations & Virtual Assistant Platform • Live Video Walkthrough',
  },
  {
    id: 'allan-vincent-portfolio',
    title: 'Allan Vincent Balasbas — Healthcare BPO & Real Estate VA',
    subtitle: 'US Healthcare Claims, Medical Records & Real Estate Sales',
    category: 'apps',
    categoryLabel: 'Healthcare BPO & VA Platform',
    tags: ['Healthcare BPO', 'Virtual Assistant', 'Medical Records', 'Claims Processing', 'Real Estate', 'React'],
    description:
      'An executive portfolio platform for Allan Vincent (Cindy) Balasbas highlighting 5+ years handling US Healthcare BPO operations, Medical Records Retrieval (MRR), appointment scheduling, and multi-million peso real estate sales.',
    longDescription:
      'Engineered a high-converting virtual assistant portfolio for Allan Vincent Balasbas. Showcases specialized experience in US Healthcare BPO (Medical Records Retrieval, claims processing, patient appointment coordination) alongside proven real estate sales leadership.',
    image: '/image/allan_preview.png',
    videoUrl: '/assets/images/allan.mp4',
    features: [
      'Specialized US Healthcare BPO showcase covering Medical Records Retrieval (MRR) and claims processing',
      'High-volume appointment scheduling and patient intake coordination workflows',
      'Proven track record in multi-million peso real estate sales and client negotiations',
      'Interactive single-page portfolio with responsive mobile-first typography and dark/light support',
    ],
    highlights: 'Healthcare BPO Specialist & Real Estate VA • Production Video Mockup',
  },
  {
    id: 'jessa-delacerna-portfolio',
    title: 'Jessa Dela Cerna — Administrative VA & Operations Platform',
    subtitle: 'Reliable Business Support & Structured Data Management',
    category: 'apps',
    categoryLabel: 'Administrative VA & Operations',
    tags: ['Administrative VA', 'Data Entry', 'Calendar Management', 'Magna Cum Laude', 'Licensed Professional Teacher', 'React'],
    description:
      'An executive administrative virtual assistant portfolio for Jessa C. Dela Cerna (Magna Cum Laude & LPT), highlighting structured business records, high-accuracy data entry, document preparation, and executive calendar management.',
    longDescription:
      'Designed and developed a specialized administrative virtual assistant platform for Jessa C. Dela Cerna. Highlights academic excellence (Magna Cum Laude & Licensed Professional Teacher), transferable pedagogical precision, executive calendar coordination, inbox organization, research synthesis, and business operations support.',
    image: '/image/erna_preview.png',
    videoUrl: '/assets/images/erna.mp4',
    features: [
      'Classroom-to-corporate transferable organizational rigor and administrative discipline',
      'High-accuracy data entry, document preparation, and business filing workflows',
      'Executive inbox zero management, calendar scheduling, and meeting buffer coordination',
      'Comprehensive qualifications archive and interactive direct contact hub',
    ],
    highlights: 'Administrative Virtual Assistant Portfolio • Magna Cum Laude & LPT • Live Video Mockup',
  },
  {
    id: 'joan-saluta-portfolio',
    title: 'Joan Saluta — Administrative Executive & VA Portfolio',
    subtitle: 'Executive Assistant, E-Commerce Support & SOPs',
    category: 'apps',
    categoryLabel: 'Executive Assistant & VA Platform',
    tags: ['Executive Assistant', 'Inbox Zero', 'Calendar Scheduling', 'Shopify Operations', 'SOPs', 'React'],
    description:
      'A high-impact executive virtual assistant portfolio for Joan Saluta, demonstrating 15+ hours/week saved for business leaders through proactive inbox management, calendar logistics, customer care ticketing, and Shopify store administration.',
    longDescription:
      'Engineered a sleek, modern executive virtual assistant and administrative portfolio for Joan Saluta. Built to highlight measurable business impact (saving founders 15+ hours weekly), multi-timezone appointment coordination, VIP communication triage, SOP documentation, and e-commerce support across global client retainers.',
    image: '/image/joan_hero.png',
    videoUrl: '/assets/images/joan.mp4',
    features: [
      'Executive support workflows saving clients 15+ hours per week of operational overhead',
      'Multi-timezone calendar scheduling (US, UK, AU, and Asian time zones) with Zoom & Google Meet integrations',
      'Shopify e-commerce support, customer ticket resolution, and SOP documentation',
      'Human-centered aesthetic with interactive client testimonials and direct WhatsApp/Email inquiry',
    ],
    highlights: 'Administrative Executive Portfolio • 15+ Hours Saved Weekly • Live Video Mockup',
  },
  {
    id: 'lerizza-jimenez-portfolio',
    title: 'Lerriza Jimenez — Shopify Operations & Administrative VA',
    subtitle: 'E-Commerce Product Listings, CRM & Lead Generation',
    category: 'apps',
    categoryLabel: 'E-Commerce VA & Lead Gen',
    tags: ['Shopify VA', 'Product Listing', 'GoHighLevel CRM', 'Canva Graphics', 'Instagram Outreach', 'React'],
    description:
      'A dynamic virtual assistant and e-commerce operations platform for Lerriza Jimenez, showcasing 9 years of teaching and administrative discipline, Shopify SKU listings, GoHighLevel CRM pipelines, and Instagram cold outreach.',
    longDescription:
      'Designed and developed a results-driven virtual assistant portfolio for Lerriza Jimenez. Showcases 9 years of educational and organizational discipline merged with hands-on e-commerce operations, Shopify product listings, SKU variants, GoHighLevel CRM lead funnels, Canva marketing graphics, and client outreach.',
    image: '/image/lerizza_hero.png',
    videoUrl: '/assets/images/lerizza.mp4',
    features: [
      'Shopify e-commerce product listings, variant structuring, and inventory coordination',
      'GoHighLevel CRM customer pipeline tracking, automated follow-ups, and lead capture',
      'Targeted Instagram cold outreach, personalized DM scripting, and prospect research',
      'Visual asset generation using Canva for marketing graphics and product mockups',
    ],
    highlights: 'Shopify Operations & E-Commerce VA Platform • Video Mockup',
  },
  {
    id: 'diane-abella-portfolio',
    title: 'Diane Abella — Service Desk & IT Support Portfolio',
    subtitle: 'Front-Line Technical Administration & Customer Operations',
    category: 'apps',
    categoryLabel: 'IT Service Desk & Support',
    tags: ['Service Desk', 'Ticketing Systems', 'IT Support', 'Verizon Customer Care', 'Account Provisioning', 'React'],
    description:
      'A modern IT service desk and customer support portfolio for Diane B. Abella, highlighting front-line technical administration for hotel hospitality systems and Verizon customer service, credential resets, and incident escalation.',
    longDescription:
      'Engineered a high-precision IT service desk portfolio website for Diane B. Abella. Highlights front-line technical administration across hotel enterprise networks in Cebu, Philippines and Verizon customer service, covering identity access provisioning, incident ticketing, credential recovery, and SLA compliance.',
    image: '/image/diane_hero.png',
    videoUrl: '/assets/images/diane.mp4',
    features: [
      'Front-line enterprise service desk administration and incident ticketing workflows',
      'Account lifecycle management, user onboarding, password resets, and access requests',
      'Telecommunications customer care experience supporting Verizon account inquiries',
      'Direct contact hub with live local time zone synchronization (PHT)',
    ],
    highlights: 'IT Service Desk & Support Portfolio • Hotel Operations & Verizon • Video Mockup',
  },
  {
    id: 'cheela-felix-portfolio',
    title: 'Cheela Mae Felix — Retail POS & Customer Care Portfolio',
    subtitle: 'Customer Service, Cashier Operations & POS Management',
    category: 'apps',
    categoryLabel: 'Customer Support & POS Operations',
    tags: ['Customer Service', 'POS Systems', 'Cash Handling', 'Retail Operations', 'Conflict Resolution', 'React'],
    description:
      'A clean, professional customer support portfolio for Cheela Mae Felix showcasing 3+ years of front-line customer service, high-accuracy POS money transactions, inventory monitoring, and rapid conflict resolution.',
    longDescription:
      'Designed and developed an elegant professional portfolio for Cheela Mae Felix. Showcases over 3 years of dedicated customer service, retail point-of-sale (POS) terminal management, accurate financial balancing, inventory tracking, and friendly customer problem resolution.',
    image: '/image/chela_preview.png',
    videoUrl: '/assets/images/chela.mp4',
    features: [
      'Over 3 years of hands-on point-of-sale (POS) cashiering and cash register balancing',
      'Customer service excellence, customer onboarding, and prompt problem escalation',
      'Clean typography with downloadable resume modal and fast direct communication channels',
      'Responsive layout optimized across desktop, tablet, and mobile devices',
    ],
    highlights: 'Customer Service & Retail POS Specialist • Video Mockup',
  },
  {
    id: 'real-estate-portfolio',
    title: 'Real Estate Portfolio+Listings',
    category: 'apps',
    categoryLabel: 'Real Estate Web App',
    underDevelopment: true,
    tags: ['Real Estate', 'Property Listings', 'React', 'Tailwind CSS', 'Vercel'],
    description:
      'A modern real estate portfolio and property listing web application featuring advanced property search, interactive maps, agent profile, and client inquiry workflows.',
    longDescription:
      'Designed and developed a comprehensive real estate portfolio and property listing platform. Features dynamic property cards, advanced filtering by location and price, property detail modals, mortgage calculator, agent bio, and direct tour scheduling.',
    image: '/image/axl1.png',
    videoUrl: '/assets/images/jamesbroker.mp4',
    liveUrl: 'https://jamesbroker.vercel.app/',
    features: [
      'Interactive real estate property catalog with high-resolution image galleries',
      'Advanced location, price range, and property type filtering',
      'Detailed property view with mortgage calculation tools and agent contact form',
      'Responsive mobile-first design optimized for property buyers and sellers',
    ],
    highlights: 'Real Estate Portfolio + Listings • Web Application • Live Platform',
  },
  {
    id: 'hook-project',
    title: 'Coaching Website',
    category: 'apps',
    categoryLabel: 'Coaching Web Application',
    underDevelopment: true,
    tags: ['Coaching Website', 'Coaching', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    description:
      'A cutting-edge coaching web platform featuring modern UI components, real-time client scheduling, and responsive architecture.',
    longDescription:
      'A dynamic, feature-rich coaching web application. Features a modular component architecture, responsive layouts, interactive scheduling flows, client resource libraries, and dedicated coaching program dashboards.',
    image: '/image/hook1.png',
    videoUrl: '/assets/images/hookverse.mp4',
    liveUrl: 'https://hookverse.vercel.app/',
    features: [
      'Interactive coaching platform catalog with client scheduling and program dashboards',
      'Modular React component architecture with TypeScript and Tailwind CSS styling',
      'Responsive layout optimized for web and mobile client onboarding',
      'Live production deployment on Vercel',
    ],
    highlights: 'Coaching Website • Coaching Platform • Live Platform',
  },
  {
    id: 'valerie-cacananta-portfolio',
    title: 'Valerie Cacananta VA Portfolio',
    category: 'apps',
    categoryLabel: 'Virtual Assistant & A/R Portfolio',
    tags: ['Virtual Assistant', 'Accounts Receivable', 'Invoicing & Billing', 'Payroll Management', 'Bank Reconciliation', 'React', 'Tailwind CSS', 'Vercel'],
    description:
      'A comprehensive virtual assistant and accounts receivable specialist portfolio for Valerie Cacananta, showcasing 15+ years of billing, payroll administration, ledger reconciliation, and administrative operations.',
    longDescription:
      'Designed and developed an executive virtual assistant and accounts receivable portfolio for Valerie Cacananta. Features end-to-end billing workflows, client follow-up protocols, ACH/wire payment postings, payroll and statutory filings (SSS, Pag-IBIG, PhilHealth), and verified corporate track records across international education and enterprise management.',
    image: '/image/val1.png',
    videoUrl: '/assets/images/valerie.mp4',
    githubUrl: 'https://github.com/kejzhin/Valerie-Portfolio',
    liveUrl: 'https://valeriecacananta.vercel.app/',
    features: [
      'Interactive single-page portfolio built with React, TypeScript, Tailwind CSS, and Motion, deployed on Vercel',
      'Specialized Accounts Receivable (A/R) & Billing showcase covering invoice generation, aging tracking, and dispute management',
      'Demonstrated corporate experience across international institutions and 15+ years of administrative management',
      'Core accounting competencies in bank reconciliation, payroll computation, and statutory compliance',
    ],
    highlights: 'Virtual Assistant & A/R Specialist Portfolio • Live on Vercel • Open Source on GitHub',
  },
  {
    id: 'ivy-sayongan-portfolio',
    title: 'Ivy Sayongan VA Portfolio',
    category: 'apps',
    categoryLabel: 'Web Admin & VA Portfolio',
    tags: ['Virtual Assistant', 'Web Administration', 'Technical Support', 'cPanel & WHM', 'WordPress CMS', 'DNS Management', 'React', 'Tailwind CSS', 'Vercel'],
    description:
      'A modern, high-precision executive portfolio for Ivy A. Sayongan highlighting 6+ years of web hosting administration, DNS management, WordPress CMS troubleshooting, customer care, and executive assistance.',
    longDescription:
      'Designed and engineered an executive web administrator and virtual assistant portfolio for Ivy A. Sayongan. Features modern typographic hierarchy, responsive layouts, smooth parallax and motion animations, comprehensive technical specializations (cPanel/WHM, DNS routing, email deliverability, WordPress diagnostics), verified track record across Concentrix and Alorica, and direct booking hub.',
    image: '/image/ivy_1_home.webp',
    videoUrl: '/assets/images/ivysayongan.mp4',
    githubUrl: 'https://github.com/kejzhin/ivyportfolio',
    liveUrl: 'https://ivysayongan.vercel.app',
    features: [
      'Single-page architecture built with React, TypeScript, Tailwind CSS, and Motion, deployed on Vercel',
      'Interactive technical specializations covering cPanel & WHM, DNS Zone Editor (A, CNAME, MX, TXT, SPF, DKIM), and WordPress CMS',
      'Verified corporate track record across Concentrix (Web Advisor & Travel Advisor) and Alorica with 95% CSAT resolution metrics',
      'Systems & toolset showcase featuring MySQL/phpMyAdmin, Google Workspace, Microsoft 365, and Zendesk CRM',
    ],
    highlights: 'Web Administrator & Virtual Assistant Portfolio • Live on Vercel • Open Source on GitHub',
  },
  {
    id: 'maria-bernadette-portfolio',
    title: 'Maria Bernadette VA Portfolio',
    category: 'apps',
    categoryLabel: 'Healthcare VA Portfolio',
    tags: ['Virtual Assistant', 'Healthcare VA', 'Prior Authorization', 'React', 'Vercel', 'HIPAA Compliant', 'AdvancedMD EHR'],
    description:
      'A modern, professional healthcare virtual assistant portfolio for Maria Bernadette Estrada, highlighting 4+ years of U.S. clinical support, prior authorization, and EHR administration.',
    longDescription:
      'Designed and developed a specialized healthcare virtual assistant portfolio for Maria Bernadette Estrada. Showcases over 4 years of clinical support experience in ENT and Allergy, HIPAA compliance certification, real-time insurance eligibility (270/271), Electronic Health Records (AdvancedMD), Nextiva VoIP phone triage, and interactive services breakdown.',
    image: '/image/maria_1_home.webp',
    videoUrl: '/assets/images/mariabernadette.mp4',
    githubUrl: 'https://github.com/kejzhin/maria',
    liveUrl: 'https://mariabernadette.vercel.app/',
    features: [
      'Responsive single-page application built with React, Tailwind CSS, and Motion, deployed on Vercel',
      'Official HIPAA Awareness Certificate preview with interactive modal enlargement',
      'Comprehensive clinical services catalog covering Prior Authorization, Patient Intake, and A/R Follow-ups',
      'Interactive showcase of specialized EHR systems (AdvancedMD) and insurance clearinghouses',
    ],
    highlights: 'Healthcare Virtual Assistant Portfolio • Live on Vercel • Open Source on GitHub',
  },
  {
    id: 'katrina-regalado-portfolio',
    title: 'Katrina VA Portfolio',
    category: 'apps',
    categoryLabel: 'Portfolio Website',
    tags: ['Virtual Assistant', 'Portfolio Website', 'React', 'Vercel', 'Responsive UI', 'Executive Support'],
    description:
      'A modern, responsive virtual assistant and executive support portfolio showcasing administrative expertise, client services, and case studies.',
    longDescription:
      'Designed and engineered an executive portfolio website for Katrina Regalado, featuring modern typographic hierarchy, smooth animations, interactive case study showcases, responsive mobile layout, and direct client inquiry integration.',
    image: '/image/katrina_screenshot.webp',
    videoUrl: '/assets/images/katrinaregalado.mp4',
    liveUrl: 'https://katrinaregalado.vercel.app/',
    features: [
      'Responsive single-page architecture deployed on Vercel',
      'Clean typographic styling, interactive contact channels, and portfolio showcase',
      'Mobile-first responsive layouts optimized for fast load performance',
      'Executive support capabilities, client reviews, and services breakdown',
    ],
    highlights: 'Virtual Assistant Portfolio Website • Deployed on Vercel',
  },
  {
    id: 'jw-webmail',
    title: 'JW Summit Mail Server',
    category: 'apps',
    categoryLabel: 'Webmail & Server',
    tags: ['Webmail Client', 'Corporate Mail', 'TypeScript', 'Dark & Light Mode', 'IMAP/SMTP'],
    description:
      'Secure corporate webmail client and mail server portal for JW Summit Group Inc. featuring responsive authentication, team chat, admin console, and dark mode.',
    longDescription:
      'Designed and developed an enterprise webmail client and administrative portal for JW Summit Group Inc. Engineered with end-to-end TLS handling, inbox filters, real-time message synchronization, corporate messaging room, dark/light theme switching, and multi-user storage quota management.',
    image: '/image/jw_login.svg',
    videoUrl: '/assets/images/jwwebmail.mp4',
    githubUrl: 'https://github.com/kejzhin/Jw-Webmail',
    liveUrl: 'https://github.com/kejzhin/Jw-Webmail',
    features: [
      'Responsive dark & light mode corporate authentication portal',
      'Multi-pane webmail inbox, message reader, and quick response composer',
      'JW Messenger team channels with real-time company room broadcasts',
      'Enterprise Admin Console for mailbox provisioning and storage allocation (2.0 GB quota)',
    ],
    highlights: 'Enterprise Webmail Client & Admin Console • Dark & Light Themes',
  },
  {
    id: 'serena-heart-crystals',
    title: 'Serena Heart Crystals',
    category: 'apps',
    categoryLabel: 'E-Commerce Studio',
    tags: ['E-Commerce', 'GCash & Bank Transfer', 'Admin Studio', 'TypeScript'],
    description:
      'Serena Heart Crystals e-commerce studio featuring handcrafted stone and sculptural homewares with custom checkout and complete Admin Studio.',
    longDescription:
      'A full-fledged luxury homewares e-commerce experience. Includes dynamic product catalog, shopping bag state management, GCash and bank transfer manual payment proof verification, and an administrative order management studio.',
    image: '/image/serena_homepage.svg',
    videoUrl: '/assets/images/serenaheart.mp4',
    githubUrl: 'https://github.com/kejzhin/Serena-Heart-Crystals',
    liveUrl: 'https://serena-heart-crystals.vercel.app',
    features: [
      'Sculptural stone homewares product catalog with multi-angle galleries',
      'Seamless checkout flow with local Philippine payment gateways (GCash & BDO/BPI)',
      'Complete administrative studio for inventory and order fulfillment',
      'Responsive luxury aesthetics and high-performance asset loading',
    ],
    highlights: 'Luxury Homewares E-Commerce Studio • Live Store & Admin',
  },
  {
    id: 'stakecube',
    title: 'Stakecube.net',
    category: 'security',
    categoryLabel: 'Crypto Ecosystem & Security',
    tags: ['Security Audit', 'Staking', 'API Pentest'],
    description:
      'Automated staking, masternode hosting, and integrated crypto exchange security assessment.',
    longDescription:
      'Served as an Information Security Consultant and Web Penetration Tester for Stakecube. Conducted deep vulnerability scanning on trading API endpoints, cold storage gateway routines, and web transaction safety.',
    image: '/image/sc.webp',
    liveUrl: 'https://stakecube.net',
    features: [
      'Comprehensive Web Application Penetration Testing (OWASP Top 10)',
      'Exchange order-book API race condition & concurrency auditing',
      'Masternode hosting endpoint security review and hardening',
    ],
    highlights: 'Crypto Financial Ecosystem Security Audit',
  },
];
