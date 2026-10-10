import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, X, ArrowUpRight, Play, CheckCircle2 } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'apps' | 'security' | 'graphics';
  categoryLabel: string;
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  galleryImages?: string[];
  galleryLabels?: string[];
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  features?: string[];
  highlights?: string;
  underDevelopment?: boolean;
  developmentOngoing?: boolean;
}

function CardImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="aspect-[16/10] w-full relative overflow-hidden bg-[#080D1A] flex items-center justify-center p-2">
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'low'}
        decoding="async"
        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        referrerPolicy="no-referrer"
        onError={(e) => {
          (e.target as HTMLElement).style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'development' | 'apps' | 'security' | 'graphics'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setActiveModalImage(project.image);
  };

  // Lock body scroll and allow ESC key to close modal
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setSelectedProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [selectedProject]);

  const projects: ProjectItem[] = [
    // Applications & Software
    {
      id: 'real-estate-portfolio',
      title: 'Real Estate Portfolio+Listings',
      category: 'apps',
      categoryLabel: 'Real Estate Web App',
      underDevelopment: true,
      developmentOngoing: true,
      tags: ['Real Estate', 'Property Listings', 'React', 'Tailwind CSS', 'Vercel'],
      description: 'A modern real estate portfolio and property listing web application featuring advanced property search, interactive maps, agent profile, and client inquiry workflows.',
      longDescription: 'Designed and developed a comprehensive real estate portfolio and property listing platform. Features dynamic property cards, advanced filtering by location and price, property detail modals, mortgage calculator, agent bio, and direct tour scheduling.',
      image: '/image/axl1.png',
      liveUrl: 'https://jamesbroker.vercel.app/',
      galleryImages: [
        '/image/axl1.png',
        '/image/axl2.png',
        '/image/axl3.png',
        '/image/axl4.png',
        '/image/axl5.png',
        '/image/axl6.png',
        '/image/axl7.png',
        '/image/axl8.png',
        '/image/axl9.png'
      ],
      galleryLabels: [
        'Homepage Hero',
        'Property Listings',
        'Search & Filter',
        'Property Details',
        'Agent Profile',
        'Mortgage Calculator',
        'Client Reviews',
        'Neighborhood Guide',
        'Contact Hub'
      ],
      features: [
        'Interactive real estate property catalog with high-resolution image galleries',
        'Advanced location, price range, and property type filtering',
        'Detailed property view with mortgage calculation tools and agent contact form',
        'Responsive mobile-first design optimized for property buyers and sellers'
      ],
      highlights: 'Real Estate Portfolio + Listings • Web Application • Live Platform'
    },
    {
      id: 'hook-project',
      title: 'Coaching Website',
      category: 'apps',
      categoryLabel: 'Coaching Web Application',
      underDevelopment: true,
      developmentOngoing: true,
      tags: ['Coaching Website', 'Coaching', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      description: 'A cutting-edge coaching web platform featuring modern UI components, real-time client scheduling, and responsive architecture.',
      longDescription: 'A dynamic, feature-rich coaching web application. Features a modular component architecture, responsive layouts, interactive scheduling flows, client resource libraries, and dedicated coaching program dashboards.',
      image: '/image/hook1.png',
      liveUrl: 'https://hookverse.vercel.app/',
      galleryImages: [
        '/image/hook1.png',
        '/image/hook2.png',
        '/image/hook3.png',
        '/image/hook4.png',
        '/image/hook5.png',
        '/image/hook6.png',
        '/image/hook7.png',
        '/image/hook8.png'
      ],
      galleryLabels: [
        'Dashboard Home',
        'Analytics View',
        'User Management',
        'Workflow Builder',
        'Settings & Config',
        'Integration Hub',
        'Reports & Logs',
        'Support Portal'
      ],
      highlights: 'Coaching Website • Coaching Platform • Live Platform'
    },
    {
      id: 'valerie-cacananta-portfolio',
      title: 'Valerie Cacananta VA Portfolio',
      category: 'apps',
      categoryLabel: 'Virtual Assistant & A/R Portfolio',
      tags: ['Virtual Assistant', 'Accounts Receivable', 'Invoicing & Billing', 'Payroll Management', 'Bank Reconciliation', 'React', 'Tailwind CSS', 'Vercel'],
      description: 'A comprehensive virtual assistant and accounts receivable specialist portfolio for Valerie Cacananta, showcasing 15+ years of billing, payroll administration, ledger reconciliation, and administrative operations.',
      longDescription: 'Designed and developed an executive virtual assistant and accounts receivable portfolio for Valerie Cacananta. Features end-to-end billing workflows, client follow-up protocols, ACH/wire payment postings, payroll and statutory filings (SSS, Pag-IBIG, PhilHealth), and verified corporate track records across international education (Happy Family School Singapore) and enterprise management.',
      image: '/image/val1.png',
      galleryImages: [
        '/image/val1.png',
        '/image/val2.png',
        '/image/val3.png',
        '/image/val4.png',
        '/image/val5.png',
        '/image/val6.png',
        '/image/val7.png',
        '/image/val8.png',
        '/image/val9.png',
        '/image/val10.png'
      ],
      galleryLabels: [
        'Homepage Hero',
        'About & Bio',
        'Certifications',
        'Services Provided',
        'Experience & Career',
        'Skills & Education',
        'References',
        'Resume & PDF',
        'Services Details',
        'Contact Hub'
      ],
      githubUrl: 'https://github.com/kejzhin/Valerie-Portfolio',
      liveUrl: 'https://valeriecacananta.vercel.app/',
      features: [
        'Interactive single-page portfolio built with React, TypeScript, Tailwind CSS, and Motion, deployed on Vercel',
        'Specialized Accounts Receivable (A/R) & Billing showcase covering invoice generation, aging tracking, and dispute management',
        'Demonstrated corporate experience across international institutions and 15+ years of administrative management',
        'Core accounting competencies in bank reconciliation, payroll computation, and statutory compliance',
        'Dynamic resume PDF generator and direct client inquiry hub'
      ],
      highlights: 'Virtual Assistant & A/R Specialist Portfolio • Live on Vercel • Open Source on GitHub'
    },
    {
      id: 'ivy-sayongan-portfolio',
      title: 'Ivy Sayongan VA Portfolio',
      category: 'apps',
      categoryLabel: 'Web Admin & VA Portfolio',
      tags: ['Virtual Assistant', 'Web Administration', 'Technical Support', 'cPanel & WHM', 'WordPress CMS', 'DNS Management', 'React', 'Tailwind CSS', 'Vercel'],
      description: 'A modern, high-precision executive portfolio for Ivy A. Sayongan highlighting 6+ years of web hosting administration, DNS management, WordPress CMS troubleshooting, customer care, and executive assistance.',
      longDescription: 'Designed and engineered an executive web administrator and virtual assistant portfolio for Ivy A. Sayongan. Features modern typographic hierarchy, responsive layouts, smooth parallax and motion animations, comprehensive technical specializations (cPanel/WHM, DNS routing, email deliverability, WordPress diagnostics), verified track record across Concentrix and Alorica, and direct booking hub.',
      image: '/image/ivy_1_home.webp',
      galleryImages: [
        '/image/ivy_1_home.webp',
        '/image/ivy1.png',
        '/image/ivy2.png',
        '/image/ivy3.png',
        '/image/ivy5.png',
        '/image/ivy6.png'
      ],
      galleryLabels: [
        'Homepage Hero',
        'Overview & About',
        'Specializations',
        'Experience',
        'Education',
        'Contact Hub'
      ],
      githubUrl: 'https://github.com/kejzhin/ivyportfolio',
      liveUrl: 'https://ivysayongan.vercel.app',
      features: [
        'Single-page architecture built with React, TypeScript, Tailwind CSS, and Motion, deployed on Vercel',
        'Interactive technical specializations covering cPanel & WHM, DNS Zone Editor (A, CNAME, MX, TXT, SPF, DKIM), and WordPress CMS',
        'Verified corporate track record across Concentrix (Web Advisor & Travel Advisor) and Alorica with 95% CSAT resolution metrics',
        'Systems & toolset showcase featuring MySQL/phpMyAdmin, Google Workspace, Microsoft 365, and Zendesk CRM',
        'Direct consultation booking hub, downloadable CV modal, and mobile-first responsive layout'
      ],
      highlights: 'Web Administrator & Virtual Assistant Portfolio • Live on Vercel • Open Source on GitHub'
    },
    {
      id: 'maria-bernadette-portfolio',
      title: 'Maria Bernadette VA Portfolio',
      category: 'apps',
      categoryLabel: 'Healthcare VA Portfolio',
      tags: ['Virtual Assistant', 'Healthcare VA', 'Prior Authorization', 'React', 'Vercel', 'HIPAA Compliant', 'AdvancedMD EHR'],
      description: 'A modern, professional healthcare virtual assistant portfolio for Maria Bernadette Estrada, highlighting 4+ years of U.S. clinical support, prior authorization, and EHR administration.',
      longDescription: 'Designed and developed a specialized healthcare virtual assistant portfolio for Maria Bernadette Estrada. Showcases over 4 years of clinical support experience in ENT and Allergy, HIPAA compliance certification, real-time insurance eligibility (270/271), Electronic Health Records (AdvancedMD), Nextiva VoIP phone triage, and interactive services breakdown.',
      image: '/image/maria_1_home.webp',
      galleryImages: [
        '/image/maria_1_home.webp',
        '/image/maria_2_about.webp',
        '/image/maria_3_background.svg',
        '/image/maria_4_skills.svg',
        '/image/maria_5_services.svg',
        '/image/maria_6_contact.svg'
      ],
      galleryLabels: [
        'Homepage Hero',
        'About & Bio',
        'Background & Clinics',
        'Skills & Portals',
        'Services Provided',
        'Contact & Footer'
      ],
      githubUrl: 'https://github.com/kejzhin/maria',
      liveUrl: 'https://mariabernadette.vercel.app/',
      features: [
        'Responsive single-page application built with React, Tailwind CSS, and Motion, deployed on Vercel',
        'Official HIPAA Awareness Certificate preview with interactive modal enlargement',
        'Comprehensive clinical services catalog covering Prior Authorization, Patient Intake, and A/R Follow-ups',
        'Interactive showcase of specialized EHR systems (AdvancedMD) and insurance clearinghouses (Availity, Medi-Cal, Medicare, Optum)',
        'Direct consultation booking and modern healthcare aesthetic optimized for U.S. medical practices'
      ],
      highlights: 'Healthcare Virtual Assistant Portfolio • Live on Vercel • Open Source on GitHub'
    },
    {
      id: 'katrina-regalado-portfolio',
      title: 'Katrina VA Portfolio',
      category: 'apps',
      categoryLabel: 'Portfolio Website',
      tags: ['Virtual Assistant', 'Portfolio Website', 'React', 'Vercel', 'Responsive UI', 'Executive Support'],
      description: 'A modern, responsive virtual assistant and executive support portfolio showcasing administrative expertise, client services, and case studies.',
      longDescription: 'Designed and engineered an executive portfolio website for Katrina Regalado, featuring modern typographic hierarchy, smooth animations, interactive case study showcases, responsive mobile layout, and direct client inquiry integration.',
      image: '/image/katrina_screenshot.webp',
      galleryImages: [
        '/image/katrina_screenshot.webp',
        '/image/katrina_about.svg',
        '/image/katrina_skills.svg',
        '/image/katrina_experience.svg',
        '/image/katrina_tools.svg',
        '/image/katrina_contact.svg'
      ],
      galleryLabels: [
        'Homepage Hero',
        'About Me',
        'Core Skills',
        'Experience',
        'Tools & Stack',
        'Contact Info'
      ],
      liveUrl: 'https://katrinaregalado.vercel.app/',
      features: [
        'Responsive single-page architecture deployed on Vercel',
        'Clean typographic styling, interactive contact channels, and portfolio showcase',
        'Mobile-first responsive layouts optimized for fast load performance',
        'Executive support capabilities, client reviews, and services breakdown'
      ],
      highlights: 'Virtual Assistant Portfolio Website • Deployed on Vercel'
    },
    {
      id: 'jw-webmail',
      title: 'JW Summit Mail Server',
      category: 'apps',
      categoryLabel: 'Webmail & Server',
      tags: ['Webmail Client', 'Corporate Mail', 'TypeScript', 'Dark & Light Mode', 'IMAP/SMTP'],
      description: 'Secure corporate webmail client and mail server portal for JW Summit Group Inc. featuring responsive authentication, team chat, admin console, and dark mode.',
      longDescription: 'Designed and developed an enterprise webmail client and administrative portal for JW Summit Group Inc. Engineered with end-to-end TLS handling, inbox filters, real-time message synchronization, corporate messaging room, dark/light theme switching, and multi-user storage quota management.',
      image: '/image/jw_login.svg',
      galleryImages: [
        '/image/jw_login.svg',
        '/image/jw_dark_login.svg',
        '/image/jw_inbox.svg',
        '/image/jw_chat.svg',
        '/image/jw_admin.svg',
        '/image/jw_dark_inbox.svg'
      ],
      githubUrl: 'https://github.com/kejzhin/Jw-Webmail',
      liveUrl: 'https://github.com/kejzhin/Jw-Webmail',
      features: [
        'Responsive dark & light mode corporate authentication portal',
        'Multi-pane webmail inbox, message reader, and quick response composer',
        'JW Messenger team channels with real-time company room broadcasts',
        'Enterprise Admin Console for mailbox provisioning and storage allocation (2.0 GB quota)',
        'Custom IMAP and SMTP mail server TLS 1.3 encrypted protocol support'
      ],
      highlights: 'Enterprise Webmail Client & Admin Console • Dark & Light Themes'
    },
    {
      id: 'serena-heart-crystals',
      title: 'Serena Heart Crystals',
      category: 'apps',
      categoryLabel: 'E-Commerce Studio',
      tags: ['E-Commerce', 'GCash & Bank Transfer', 'Admin Studio', 'TypeScript'],
      description: 'Serena Heart Crystals e-commerce studio featuring handcrafted stone and sculptural homewares with custom checkout and complete Admin Studio.',
      longDescription: 'A full-fledged luxury homewares e-commerce experience. Includes dynamic product catalog, shopping bag state management, GCash and bank transfer manual payment proof verification, and an administrative order management studio.',
      image: '/image/serena_homepage.svg',
      galleryImages: [
        '/image/serena_homepage.svg',
        '/image/serena_catalog.webp',
        '/image/serena_bag.svg',
        '/image/serena_checkout.svg',
        '/image/serena_admin.svg',
        '/image/serena_orders.svg',
        '/image/serena_payments.svg'
      ],
      githubUrl: 'https://github.com/kejzhin/Serena-Heart-Crystals',
      liveUrl: 'https://serena-heart-crystals.vercel.app',
      features: [
        'Sculptural stone homewares product catalog with multi-angle galleries',
        'Seamless checkout flow with local Philippine payment gateways (GCash & BDO/BPI)',
        'Complete administrative studio for inventory and order fulfillment',
        'Responsive luxury aesthetics and high-performance asset loading'
      ],
      highlights: 'Luxury Homewares E-Commerce Studio • Live Store & Admin'
    },
    {
      id: 'mocamesh',
      title: 'Mocamesh Paystack Voucher Gateway',
      category: 'apps',
      categoryLabel: 'Payment Gateway',
      tags: ['Payment Gateway', 'Paystack API', 'PHP', 'MySQL'],
      description: 'An automated Paystack payment gateway integration and voucher code distribution system built with PHP and MySQL.',
      longDescription: 'Engineered an automated voucher issuance system interfacing with the Paystack payment gateway. Upon verified transaction callbacks, system automatically generates, stores, and sends digital voucher codes with webhook validation.',
      image: '/image/mocamesh_homepage.svg',
      galleryImages: [
        '/image/mocamesh_homepage.svg',
        '/image/mocamesh_voucher_success.svg'
      ],
      githubUrl: 'https://github.com/kejzhin/Mocamesh',
      liveUrl: 'https://github.com/kejzhin/Mocamesh',
      features: [
        'Automated Paystack transaction callback and webhook verification',
        'Secure voucher database schema with transaction logging and unique token generation',
        'Error-handling routines for failed or pending payment states',
        'Lightweight PHP backend designed for rapid deployment'
      ],
      highlights: 'Automated Payment & Voucher Gateway • GitHub Repository'
    },

    // Graphics & Visual Design
    {
      id: 'streetwear-collection',
      title: 'Zoro & Luffy Anime Streetwear Collection',
      category: 'graphics',
      categoryLabel: 'Merchandise & Apparel',
      tags: ['Apparel Design', 'Streetwear', 'Vector Illustration'],
      description: 'High-impact anime-inspired illustrations, custom apparel concepts, and vector streetwear graphics engineered for screen printing.',
      longDescription: 'A complete graphic apparel line combining high-contrast monochrome and neon manga aesthetics. Prepared production-ready vector color separations for silk-screen garment printing.',
      image: '/image/zoro-t.webp',
      galleryImages: [
        '/image/zoro-t.webp',
        '/image/luffy-t.webp',
        '/image/vs.webp',
        '/image/ng.webp',
        '/image/shanks.webp'
      ],
      features: [
        'Original vector character illustrations optimized for apparel print',
        'Multiple garment colorway mockups and sleeve typography treatments',
        'High-density screen printing color separation templates'
      ],
      highlights: 'Screen-Printed Streetwear Apparel'
    },
    {
      id: 'gaming-logo-design',
      title: '3D Metallic Gaming & Esports Logo',
      category: 'graphics',
      categoryLabel: 'Gaming & Identity',
      tags: ['Gaming Logo', '3D Design', 'Esports Branding', 'Typography'],
      description: 'Custom 3D metallic blue gaming insignia, geometric monogram emblem, and futuristic typography tailored for gaming clans, esports teams, and content creators.',
      longDescription: 'Designed a high-impact 3D metallic blue gaming logo and custom geometric monogram. Features clean metallic facets, studio lighting highlights, and futuristic typography optimized for streaming overlays, team jerseys, avatars, and community merchandise.',
      image: '/image/logo.webp',
      galleryImages: [
        '/image/logo.webp',
        '/image/db.webp'
      ],
      features: [
        '3D metallic chrome finish with precision bevels and studio lighting accents',
        'Custom geometric monogram emblem paired with futuristic bevel typography',
        'Scalable across stream overlays, esports jerseys, avatars, and merchandise'
      ],
      highlights: '3D Metallic Gaming & Esports Logo Design'
    },
    {
      id: 'editorial-publications',
      title: 'Technical E-Book Publications & Layouts',
      category: 'graphics',
      categoryLabel: 'Editorial Design',
      tags: ['Editorial', 'Cover Art', 'Digital Books'],
      description: 'Digital publication cover art, technical typography systems, and editorial layout designs for manuals and e-books.',
      longDescription: 'Engineered visually compelling book cover art and layout structures tailored for tech and security documentation, prioritizing legibility and visual rhythm.',
      image: '/image/chester.webp',
      galleryImages: [
        '/image/chester.webp',
        '/image/duck.webp'
      ],
      features: [
        'Dynamic digital cover art designed for high-resolution distribution',
        'Typographic grids and balanced visual hierarchy for technical readers',
        'Digital storefront mockups and thumbnail rendering'
      ],
      highlights: 'Technical Publication & Cover Design'
    },
    {
      id: 'corporate-accessories',
      title: 'Conference ID Lanyards & Event Merchandise',
      category: 'graphics',
      categoryLabel: 'Merchandise Design',
      tags: ['Print Design', 'Merchandise', 'Event Branding'],
      description: 'Custom event credentials, lanyard typography, and corporate identity accessories created for tech summits.',
      longDescription: 'Created physical event merchandise, sublimated woven lanyard patterns, and badge credentials ensuring maximum durability and brand visibility.',
      image: '/image/lace.webp',
      galleryImages: [
        '/image/lace.webp'
      ],
      features: [
        'Sublimated textile pattern design for wearable credentials',
        'High-durability color fastness specifications for conference production'
      ],
      highlights: 'Wearable Event Merchandise'
    },
    {
      id: 'ecommerce-branding',
      title: 'E-Commerce Storefront Visual Assets',
      category: 'graphics',
      categoryLabel: 'Digital Storefront',
      tags: ['E-Commerce', 'Promotional Graphics', 'Visual Assets'],
      description: 'Digital storefront visual assets, promotional graphics, and conversion-focused product merchandising.',
      longDescription: 'Designed high-converting banner placements, hero banners, and promotional product tiles engineered to increase engagement and brand recognition.',
      image: '/image/nec.webp',
      galleryImages: [
        '/image/nec.webp'
      ],
      features: [
        'High-resolution promotional banners optimized for web loading speed',
        'Product category badges and campaign promotional creatives'
      ],
      highlights: 'E-Commerce Visual Merchandising'
    },

    // Cybersecurity & Audits
    {
      id: 'stakecube',
      title: 'Stakecube.net',
      category: 'security',
      categoryLabel: 'Crypto Ecosystem & Security',
      tags: ['Security Audit', 'Staking', 'API Pentest'],
      description: 'Automated staking, masternode hosting, and integrated crypto exchange security assessment.',
      longDescription: 'Served as an Information Security Consultant and Web Penetration Tester for Stakecube. Conducted deep vulnerability scanning on trading API endpoints, cold storage gateway routines, and web transaction safety.',
      image: '/image/sc.webp',
      liveUrl: 'https://stakecube.net',
      features: [
        'Comprehensive Web Application Penetration Testing (OWASP Top 10)',
        'Exchange order-book API race condition & concurrency auditing',
        'Masternode hosting endpoint security review and hardening'
      ],
      highlights: 'Crypto Financial Ecosystem Security Audit'
    },
    {
      id: 'socialsend',
      title: 'Socialsend.io',
      category: 'security',
      categoryLabel: 'Blockchain Payment Gateway',
      tags: ['InfoSec Analyst', 'Crypto', 'Web Security'],
      description: 'Performed pre-deployment security testing to prevent malicious exploits and secure social transaction channels.',
      longDescription: 'Information Security Analyzer (2019–2022). Tested all website deployments, patched business logic vulnerabilities, and verified API cryptographic authentication.',
      image: '/image/ss.webp',
      liveUrl: 'https://socialsend.io',
      features: [
        'Pre-production automated and manual vulnerability assessment',
        'Authentication bypass and CSRF defense evaluation',
        'Securing crypto tipping bot interfaces and payment gateways'
      ],
      highlights: '3-Year Security Analyzer Engagement'
    },
    {
      id: 'aercrypt',
      title: 'Aercrypt.net',
      category: 'security',
      categoryLabel: 'Encryption Hub',
      tags: ['Encryption', 'End-to-End', 'Penetration Testing'],
      description: 'Security testing for Aercrypt end-to-end encrypted messaging services and confidential communication hubs.',
      longDescription: 'Audited end-to-end cryptographic handshakes, TLS session parameters, and server-side ephemeral message deletion routines.',
      image: '/image/aer.webp',
      liveUrl: 'https://aercrypt.net',
      features: [
        'Cryptographic protocol audit and eavesdropping prevention',
        'Server-side memory leak and persistent storage inspection'
      ],
      highlights: 'Encrypted Communication Penetration Test'
    },

    // Cybersecurity & Audits
    {
      id: 'vitae-token',
      title: 'Vitae Token Platform',
      category: 'security',
      categoryLabel: 'Security Audit',
      tags: ['Penetration Testing', 'Web3 Security', 'Auditing'],
      description: 'Social Rewards Blockchain Platform security audits and system vulnerability assessments.',
      longDescription: 'Conducted penetration testing on social reward distribution contracts and user portal frontends to prevent automated reward exploitation.',
      image: '/image/vitae.webp',
      liveUrl: 'https://vitae.co',
      features: [
        'Auditing social reward claim endpoints against sybil attacks',
        'Frontend web penetration testing and session validation'
      ],
      highlights: 'Decentralized Social Rewards Audit'
    },
    {
      id: 'metrixcoin',
      title: 'Metrixcoin.com',
      category: 'security',
      categoryLabel: 'Security Audit',
      tags: ['PoS Currency', 'Infosec', 'Penetration Testing'],
      description: 'Penetration Tester and Information Security advisor for Proof-of-Stake cryptocurrency platform.',
      longDescription: 'Conducted web penetration testing on wallet download portals, explorer APIs, and governance voting interfaces to guarantee platform integrity.',
      image: '/image/metrix.webp',
      liveUrl: 'https://metrixcoin.com',
      features: [
        'Explorer API stress testing and SQL injection prevention',
        'Securing official wallet binary release channels'
      ],
      highlights: 'Proof-of-Stake Security Assessment'
    },
    {
      id: 'pepecoin',
      title: 'Pepecoin.org',
      category: 'security',
      categoryLabel: 'Security Audit',
      tags: ['Floppygame PEPE', 'Vulnerability Assessment'],
      description: 'Performed penetration testing and vulnerability assessments for the Floppygame PEPE ecosystem.',
      longDescription: 'Evaluated web game client-server communication security to prevent score manipulation, token theft, and leaderboard spoofing.',
      image: '/image/pepe.webp',
      liveUrl: 'https://pepecoin.org',
      features: [
        'Game client websocket packet inspection and validation',
        'Leaderboard anti-tampering verification'
      ],
      highlights: 'Web3 Gaming Security Audit'
    }
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'development') return Boolean(p.underDevelopment || p.developmentOngoing);
    return p.category === activeFilter;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-4 mb-8 sm:mb-10 text-center sm:text-left">
        <div className="badge-pill self-center sm:self-start">
          <Sparkles size={14} className="text-indigo-400" />
          <span>My Projects</span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Featured <span className="text-gradient">Projects & Works</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed mt-2 mx-auto sm:mx-0">
            A comprehensive showcase of applications, cybersecurity audits, and creative graphics & design assets.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-10 pb-4 border-b border-white/[0.08]">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'development', label: '⚡ Under Development' },
          { id: 'apps', label: 'Apps & Software' },
          { id: 'security', label: 'Cybersecurity & Audits' },
          { id: 'graphics', label: 'Graphics & Design' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
              activeFilter === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={project.id}
            className="card-surface overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-950/40 transition-all duration-300 h-full"
          >
              <div>
                {/* Project Image Preview */}
                <div
                  onClick={() => openProjectModal(project)}
                  className="w-full bg-[#080D1A] relative overflow-hidden cursor-pointer border-b border-white/[0.08] flex flex-col group/thumb"
                >
                  {/* Browser Header Bar */}
                  <div className="h-6 bg-[#0E1628] border-b border-white/[0.06] px-3 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF5F56]/80" />
                      <span className="w-2 h-2 rounded-full bg-[#FFBD2E]/80" />
                      <span className="w-2 h-2 rounded-full bg-[#27C93F]/80" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[200px] bg-slate-950/70 px-2 py-0.5 rounded border border-white/5">
                      {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${project.id.replace(/-/g, '')}.app`}
                    </span>
                    <div className="w-6" />
                  </div>

                  {/* Card Image Display */}
                  <CardImage src={project.image} alt={project.title} priority={idx < 3} />
                  {(project.underDevelopment || project.developmentOngoing) && (
                    <div className="absolute top-8 right-3 z-20 flex items-center gap-1.5 bg-emerald-950/95 border border-emerald-500/60 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-300 shadow-lg shadow-emerald-950/50 backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Under Development</span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <h3
                      onClick={() => openProjectModal(project)}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 items-center">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 sm:px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with Action Links */}
              <div className="p-5 sm:p-6 pt-0 border-t border-white/[0.04] mt-2 flex items-center justify-between text-xs font-semibold">
                <button
                  onClick={() => openProjectModal(project)}
                  className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowUpRight size={14} />
                </button>

                <div className="flex items-center gap-3 text-slate-400">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="GitHub Repository"
                    >
                      <Github size={15} />
                      <span className="hidden sm:inline text-[11px]">GitHub</span>
                    </a>
                  )}

                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="Google Play Store"
                    >
                      <Play size={13} />
                      <span className="hidden sm:inline text-[11px]">Play Store</span>
                    </a>
                  )}

                  {project.liveUrl && !project.playStoreUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1"
                      title="Live Platform"
                    >
                      <ExternalLink size={13} />
                      <span className="hidden sm:inline text-[11px]">Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Project Details Modal rendered directly to document.body via Portal to escape all stacking contexts */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl lg:max-w-[680px] bg-[#0D1424] border border-white/[0.12] rounded-2xl shadow-2xl shadow-black/80 z-10 my-auto max-h-[82vh] flex flex-col overflow-hidden"
            >
              <div className="overflow-y-auto flex-1 rounded-2xl">
                {/* Modal Image Header with Clean Browser Mockup Frame */}
                <div className="w-full bg-[#080D1A] border-b border-white/[0.08] flex flex-col">
                  {/* Sticky Browser Chrome Bar */}
                  <div className="sticky top-0 min-h-9 bg-[#0D1527]/95 backdrop-blur-md border-b border-white/[0.08] px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 shrink-0 z-30">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#080D1A] border border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-slate-300 min-w-0 max-w-[140px] sm:max-w-[280px] shadow-inner truncate">
                      <span className="text-emerald-400 text-[9px] shrink-0">🔒</span>
                      <span className="truncate">{selectedProject.liveUrl ? selectedProject.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `${selectedProject.id}.app`}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-indigo-300 text-slate-300 hover:bg-white/[0.08] px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-sans font-semibold transition-colors whitespace-nowrap"
                        >
                          <span className="hidden sm:inline">Visit Site</span>
                          <span className="sm:hidden text-[10px]">Open</span>
                          <ExternalLink size={11} className="shrink-0" />
                        </a>
                      )}
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                        aria-label="Close modal"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Viewport Canvas */}
                  <div className="w-full min-h-[180px] sm:min-h-[220px] max-h-[30vh] sm:max-h-[34vh] bg-[#070B14] flex items-center justify-center relative overflow-hidden p-2.5 sm:p-4">
                    {(selectedProject.underDevelopment || selectedProject.developmentOngoing) && (
                      <div className="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 z-20 flex items-center gap-1.5 bg-emerald-950/95 border border-emerald-500/60 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold text-emerald-300 shadow-xl backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span>Under Development</span>
                      </div>
                    )}
                    <motion.img
                      key={activeModalImage || selectedProject.image}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      src={activeModalImage || selectedProject.image}
                      alt={selectedProject.title}
                      decoding="async"
                      className="max-h-[26vh] sm:max-h-[30vh] max-w-full w-auto object-contain mx-auto rounded-lg shadow-xl transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-1.5 items-center">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Gallery */}
                  {selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                          Developed Site Screenshots & Views ({selectedProject.galleryImages.length} screens)
                        </h4>
                        <span className="text-[11px] text-slate-400">Click any thumbnail below to preview it above</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
                        {selectedProject.galleryImages.map((img, i) => {
                          const isVal1 = img.includes('val1');
                          const isVal2 = img.includes('val2');
                          const isVal3 = img.includes('val3');
                          const isVal4 = img.includes('val4');
                          const isVal5 = img.includes('val5');
                          const isVal6 = img.includes('val6');
                          const isVal7 = img.includes('val7');
                          const isVal8 = img.includes('val8');
                          const isVal9 = img.includes('val9');
                          const isVal10 = img.includes('val10');

                          const isIvyHome = img.includes('ivy_1_home');
                          const isIvy1 = img.includes('ivy1.png') || img.includes('ivy_2_specializations');
                          const isIvy2 = img.includes('ivy2.png') || img.includes('ivy_3_experience');
                          const isIvy3 = img.includes('ivy3.png') || img.includes('ivy_4_tools');
                          const isIvy5 = img.includes('ivy5.png') || img.includes('ivy_5_education');
                          const isIvy6 = img.includes('ivy6.png') || img.includes('ivy_6_contact');

                          const isMariaHome = img.includes('maria_1_home') || img.includes('maria_homepage');
                          const isMariaAbout = img.includes('maria_2_about') || img.includes('maria_about');
                          const isMariaBackground = img.includes('maria_3_background');
                          const isMariaSkills = img.includes('maria_4_skills');
                          const isMariaServices = img.includes('maria_5_services');
                          const isMariaContact = img.includes('maria_6_contact');

                          const isKatrinaHome = img.includes('katrina_screenshot');
                          const isKatrinaAbout = img.includes('katrina_about');
                          const isKatrinaSkills = img.includes('katrina_skills');
                          const isKatrinaExp = img.includes('katrina_experience');
                          const isKatrinaTools = img.includes('katrina_tools');
                          const isKatrinaContact = img.includes('katrina_contact');

                          const isSerenaHome = img.includes('serena_homepage');
                          const isSerenaCatalog = img.includes('serena_catalog');
                          const isSerenaBag = img.includes('serena_bag');
                          const isSerenaCheckout = img.includes('serena_checkout');
                          const isSerenaAdmin = img.includes('serena_admin');
                          const isSerenaOrders = img.includes('serena_orders');
                          const isSerenaPayments = img.includes('serena_payments');

                          const isDarkLogin = img.includes('dark_login');
                          const isDarkInbox = img.includes('dark_inbox');
                          const isLogin = img.includes('jw_login');
                          const isInbox = img.includes('inbox') && !img.includes('dark');
                          const isChat = img.includes('chat');
                          const isAdmin = img.includes('admin');
                          const isDark = isDarkLogin || isDarkInbox || img.includes('dark');

                          const label = selectedProject.galleryLabels && selectedProject.galleryLabels[i]
                            ? selectedProject.galleryLabels[i]
                            : isVal1
                            ? 'Homepage Hero'
                            : isVal2
                            ? 'About & Bio'
                            : isVal3
                            ? 'Core A/R & Billing'
                            : isVal4
                            ? 'Experience & Career'
                            : isVal5
                            ? 'Skills & Tools'
                            : isVal6
                            ? 'Education & Certs'
                            : isVal7
                            ? 'References'
                            : isVal8
                            ? 'Resume & PDF'
                            : isVal9
                            ? 'Services Details'
                            : isVal10
                            ? 'Contact Hub'
                            : isIvyHome
                            ? 'Homepage Hero'
                            : isIvy1
                            ? 'Overview & About'
                            : isIvy2
                            ? 'Specializations'
                            : isIvy3
                            ? 'Experience'
                            : isIvy5
                            ? 'Education'
                            : isIvy6
                            ? 'Contact Hub'
                            : isMariaHome
                            ? 'Homepage Hero'
                            : isMariaAbout
                            ? 'About & Bio'
                            : isMariaBackground
                            ? 'Background & Clinics'
                            : isMariaSkills
                            ? 'Skills & Portals'
                            : isMariaServices
                            ? 'Services Provided'
                            : isMariaContact
                            ? 'Contact & Footer'
                            : isKatrinaHome
                            ? 'Homepage Hero'
                            : isKatrinaAbout
                            ? 'About Me'
                            : isKatrinaSkills
                            ? 'Core Skills'
                            : isKatrinaExp
                            ? 'Experience'
                            : isKatrinaTools
                            ? 'Tools & Stack'
                            : isKatrinaContact
                            ? 'Contact Info'
                            : isSerenaHome
                            ? 'Storefront'
                            : isSerenaCatalog
                            ? 'Collection'
                            : isSerenaBag
                            ? 'Shopping Bag'
                            : isSerenaCheckout
                            ? 'Checkout'
                            : isSerenaAdmin
                            ? 'Admin Dashboard'
                            : isSerenaOrders
                            ? 'Orders & Status'
                            : isSerenaPayments
                            ? 'Payment Config'
                            : isDarkLogin
                            ? 'Dark Sign In'
                            : isDarkInbox
                            ? 'Dark Inbox'
                            : isLogin
                            ? 'Light Sign In'
                            : isInbox
                            ? 'Webmail Inbox'
                            : isChat
                            ? 'Messenger'
                            : isAdmin
                            ? 'Admin Console'
                            : `View ${i + 1}`;

                          const isCurrent = (activeModalImage || selectedProject.image) === img;

                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setActiveModalImage(img)}
                              className={`group relative aspect-video rounded-xl bg-[#070B14] p-1 flex flex-col items-center justify-center border transition-all cursor-pointer overflow-hidden ${
                                isCurrent
                                  ? 'border-indigo-400 ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/25'
                                  : 'border-white/[0.08] hover:border-white/30'
                              }`}
                            >
                              <img
                                src={img}
                                alt={label}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-contain p-0.5 rounded-lg group-hover:scale-105 transition-transform duration-300"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-3 pb-1 px-1 text-center">
                                <span className={`text-[10px] font-semibold block truncate ${isDark ? 'text-amber-300' : 'text-slate-200'}`}>
                                  {isDark ? '🌙 ' + label : label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Key Features */}
                  {selectedProject.features && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Key Highlights & Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedProject.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2 size={15} className="text-indigo-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                      >
                        <ExternalLink size={16} />
                        <span>Visit Live Platform</span>
                      </a>
                    )}

                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <Github size={16} />
                        <span>View Source on GitHub</span>
                      </a>
                    )}

                    {selectedProject.playStoreUrl && (
                      <a
                        href={selectedProject.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                      >
                        <Play size={16} />
                        <span>Google Play Store</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </div>
  );
}
