import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Sparkles, X, Shield, ArrowUpRight, Play, Palette, CheckCircle2, Eye } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'apps' | 'security' | 'graphics' | 'web3';
  categoryLabel: string;
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  galleryImages?: string[];
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  features?: string[];
  highlights?: string;
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'apps' | 'security' | 'graphics' | 'web3'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setActiveModalImage(project.image);
  };

  const projects: ProjectItem[] = [
    // Applications & Software
    {
      id: 'katrina-regalado-portfolio',
      title: 'Katrina Portfolio',
      category: 'apps',
      categoryLabel: 'Portfolio Website',
      tags: ['Portfolio Website', 'React', 'Vercel', 'Responsive UI', 'Executive Support'],
      description: 'A modern, responsive virtual assistant and executive support portfolio showcasing administrative expertise, client services, and case studies.',
      longDescription: 'Designed and engineered an executive portfolio website for Katrina Regalado, featuring modern typographic hierarchy, smooth animations, interactive case study showcases, responsive mobile layout, and direct client inquiry integration.',
      image: '/image/katrina_screenshot.png',
      galleryImages: [
        '/image/katrina_screenshot.png',
        '/image/katrina_about.svg',
        '/image/katrina_skills.svg',
        '/image/katrina_experience.svg',
        '/image/katrina_tools.svg',
        '/image/katrina_contact.svg'
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
      id: 'riaminder',
      title: 'Riaminder',
      category: 'apps',
      categoryLabel: 'Productivity App',
      tags: ['Reminder App', 'React', 'Desktop Notifications', 'Vercel'],
      description: 'An elegant mobile-first reminder application for birthdays and life milestones with desktop push notifications and real-time syncing.',
      longDescription: 'A sleek, mobile-optimized birthday and anniversary tracker built with modern React. Features custom notification scheduling, offline support, category filters, and calendar export capabilities.',
      image: '/image/riaminder.png',
      githubUrl: 'https://github.com/kejzhin/riaminder',
      liveUrl: 'https://github.com/kejzhin/riaminder',
      features: [
        'Mobile-first responsive interface with birthday countdown timers',
        'System desktop push notifications for upcoming events',
        'Offline data persistence and quick entry modal',
        'Interactive event categorization and search'
      ],
      highlights: 'Mobile-First Event & Birthday Tracker • GitHub Repository'
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
        '/image/serena_catalog.svg',
        '/image/serena_detail.svg',
        '/image/serena_checkout.svg',
        '/image/serena_admin.svg'
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
      image: '/image/mocamesh.png',
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
    {
      id: 'calendar-journal',
      title: 'Calendar Journal',
      category: 'apps',
      categoryLabel: 'Mobile Application',
      tags: ['Android App', 'Java', 'Firebase'],
      description: 'A journal and calendar app to help users track their mood and daily activities with automated cloud backups.',
      longDescription: 'Built with native Java on Android Studio with Firebase Realtime Database integration. Features daily emotion logging, visual calendar summaries, biometric lock protection, and exportable weekly mood insights.',
      image: '/src/assets/images/project_calendar_journal_1790673946235.jpg',
      githubUrl: 'https://github.com/kejzhin',
      liveUrl: 'https://github.com/kejzhin',
      playStoreUrl: 'https://play.google.com',
      features: [
        'Interactive calendar interface with color-coded mood indicators',
        'Firebase Realtime Database synchronization and offline caching',
        'Secure user authentication and encrypted note storage',
        'Automated monthly emotional well-being analytics charts'
      ],
      highlights: 'Native Java & Firebase Realtime Cloud Sync'
    },
    {
      id: 'inventory-system',
      title: 'Inventory Management System',
      category: 'apps',
      categoryLabel: 'Full-Stack Web App',
      tags: ['Web App', 'PHP', 'MySQL'],
      description: 'A web-based system for managing inventory, products, and sales with an easy-to-use interface and reporting.',
      longDescription: 'Engineered a full-featured PHP and MySQL inventory control suite for retail businesses. Includes barcode scanning integration, automated low-stock warnings, multi-tier user permissions, and CSV ledger reporting.',
      image: '/src/assets/images/project_inventory_system_1790673963029.jpg',
      githubUrl: 'https://github.com/kejzhin',
      liveUrl: 'https://github.com/kejzhin',
      features: [
        'Real-time stock level monitoring with automatic threshold alerts',
        'Comprehensive sales ledger, invoicing, and PDF report generator',
        'Role-Based Access Control (Admin, Warehouse Manager, Cashier)',
        'Optimized MySQL queries handling tens of thousands of SKU records'
      ],
      highlights: 'Enterprise PHP MVC & MySQL Transactions'
    },
    {
      id: 'mood-tracker',
      title: 'Mood Tracker',
      category: 'apps',
      categoryLabel: 'Mobile Application',
      tags: ['Android App', 'Kotlin', 'Jetpack Compose'],
      description: 'A simple and clean mood tracking app to help you understand your emotions through intuitive daily check-ins.',
      longDescription: 'Designed from the ground up utilizing Kotlin and Jetpack Compose. Boasts smooth Material 3 animations, customized wellness streaks, journaling prompts, and privacy-first local storage architecture.',
      image: '/src/assets/images/project_mood_tracker_1790673978055.jpg',
      githubUrl: 'https://github.com/kejzhin',
      liveUrl: 'https://github.com/kejzhin',
      playStoreUrl: 'https://play.google.com',
      features: [
        'Declarative modern UI built exclusively with Jetpack Compose',
        'Local SQLite / Room Database ensuring 100% user privacy',
        'Custom interactive mood graphs and streak tracking',
        'Dark and Light theme support with dynamic accent palettes'
      ],
      highlights: 'Modern Android Kotlin & Jetpack Compose'
    },
    {
      id: 'portfolio-website',
      title: 'Portfolio Website',
      category: 'apps',
      categoryLabel: 'Full-Stack Web App',
      tags: ['React 19', 'Vite', 'TypeScript', 'Tailwind'],
      description: 'A high-performance modern portfolio featuring dark aesthetic, interactive project showcases, and responsive design.',
      longDescription: 'Custom-built responsive single page application showcasing penetration testing and graphic design deliverables. Features client-side routing, touch-friendly mobile layouts, and responsive media galleries.',
      image: '/public/image/cs.png',
      githubUrl: 'https://github.com/kejzhin/portfolio',
      liveUrl: 'https://github.com/kejzhin',
      features: [
        'Responsive layout optimized for smartphones, tablets, and desktops',
        'Modular filterable project and security audit directory',
        'Interactive graphics preview gallery modal with zero layout shift'
      ],
      highlights: 'Modern React SPA with Tailwind CSS'
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
      image: '/image/zoro-t.jpg',
      galleryImages: [
        '/image/zoro-t.jpg',
        '/image/luffy-t.png',
        '/image/zoro-t.png',
        '/image/vs.png',
        '/image/ng.png',
        '/image/shanks.png'
      ],
      features: [
        'Original vector character illustrations optimized for apparel print',
        'Multiple garment colorway mockups and sleeve typography treatments',
        'High-density screen printing color separation templates'
      ],
      highlights: 'Screen-Printed Streetwear Apparel'
    },
    {
      id: 'brand-identity-systems',
      title: 'Blockchain & Tech Startup Logo Systems',
      category: 'graphics',
      categoryLabel: 'Brand Identity',
      tags: ['Brand Identity', 'Vector Emblems', 'Typography'],
      description: 'Minimalist, memorable visual identities, geometric emblems, and brand guidelines for Web3 protocols and tech startups.',
      longDescription: 'Conceptualized and rendered versatile vector brand marks, corporate typography hierarchies, and complete design asset kits across dark and light surfaces.',
      image: '/image/logo.png',
      galleryImages: [
        '/image/logo.png',
        '/image/db.png'
      ],
      features: [
        'Geometric vector marks scalable from 16px favicons to billboard prints',
        'Digital brand guideline documentation with exact RGB/CMYK values',
        'Comprehensive asset kits including social banners and app icons'
      ],
      highlights: 'Modern Tech & Web3 Brand Identity'
    },
    {
      id: 'editorial-publications',
      title: 'Technical E-Book Publications & Layouts',
      category: 'graphics',
      categoryLabel: 'Editorial Design',
      tags: ['Editorial', 'Cover Art', 'Digital Books'],
      description: 'Digital publication cover art, technical typography systems, and editorial layout designs for manuals and e-books.',
      longDescription: 'Engineered visually compelling book cover art and layout structures tailored for tech and security documentation, prioritizing legibility and visual rhythm.',
      image: '/image/chester.png',
      galleryImages: [
        '/image/chester.png',
        '/image/duck.png'
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
      image: '/image/lace.png',
      galleryImages: [
        '/image/lace.png'
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
      image: '/image/nec.jpg',
      galleryImages: [
        '/image/nec.jpg'
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
      image: '/image/sc.png',
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
      image: '/image/ss.png',
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
      image: '/image/aer.jpg',
      liveUrl: 'https://aercrypt.net',
      features: [
        'Cryptographic protocol audit and eavesdropping prevention',
        'Server-side memory leak and persistent storage inspection'
      ],
      highlights: 'Encrypted Communication Penetration Test'
    },

    // Blockchain & Web3
    {
      id: 'vitae-token',
      title: 'Vitae Token Platform',
      category: 'web3',
      categoryLabel: 'Rewards Platform',
      tags: ['Penetration Testing', 'Web3', 'Security'],
      description: 'Social Rewards Blockchain Platform security audits and system vulnerability assessments.',
      longDescription: 'Conducted penetration testing on social reward distribution contracts and user portal frontends to prevent automated reward exploitation.',
      image: '/image/vitae.png',
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
      category: 'web3',
      categoryLabel: 'Digital Currency',
      tags: ['PoS Currency', 'Infosec', 'Penetration Testing'],
      description: 'Penetration Tester and Information Security advisor for Proof-of-Stake cryptocurrency platform.',
      longDescription: 'Conducted web penetration testing on wallet download portals, explorer APIs, and governance voting interfaces to guarantee platform integrity.',
      image: '/image/metrix.png',
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
      category: 'web3',
      categoryLabel: 'Meme Ecosystem',
      tags: ['Floppygame PEPE', 'Vulnerability Assessment'],
      description: 'Performed penetration testing and vulnerability assessments for the Floppygame PEPE ecosystem.',
      longDescription: 'Evaluated web game client-server communication security to prevent score manipulation, token theft, and leaderboard spoofing.',
      image: '/image/pepe.png',
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
    return p.category === activeFilter;
  });

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 mb-8 sm:mb-10 text-center sm:text-left"
      >
        <div className="badge-pill self-center sm:self-start">
          <Sparkles size={14} className="text-indigo-400" />
          <span>My Projects</span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Featured <span className="text-gradient">Projects & Works</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed mt-2 mx-auto sm:mx-0">
            A comprehensive showcase of applications, cybersecurity audits, web3 platforms, and creative apparel design assets.
          </p>
        </div>
      </motion.div>

      {/* Filter Tabs - Responsive wrapping and clean pill styling */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-10 pb-4 border-b border-white/[0.08]">
        {[
          { id: 'all', label: 'All Projects' },
          { id: 'apps', label: 'Apps & Software' },
          { id: 'security', label: 'Cybersecurity & Audits' },
          { id: 'graphics', label: 'Graphics & Design' },
          { id: 'web3', label: 'Blockchain & Web3' },
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
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              className="card-surface overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-950/40 transition-all duration-300 h-full"
            >
              <div>
                {/* Project Image Preview Box - Clean Browser Mockup Frame */}
                <div
                  onClick={() => openProjectModal(project)}
                  className="w-full bg-[#080D1A] relative overflow-hidden cursor-pointer border-b border-white/[0.08] flex flex-col group/thumb"
                >
                  {/* Browser Mockup Header Bar for Web & App Projects */}
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

                  {/* Full Bleed Homepage Mockup Display */}
                  <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-950 flex items-start justify-center">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full ${
                        project.category === 'apps' || project.category === 'security'
                          ? 'object-cover object-top'
                          : 'object-contain p-2'
                      } group-hover:scale-105 transition-transform duration-500`}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    {project.galleryImages && project.galleryImages.length > 1 && (
                      <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono font-semibold text-white border border-white/10 flex items-center gap-1 shadow-lg z-20">
                        <Eye size={11} />
                        <span>{project.galleryImages.length} Screens</span>
                      </span>
                    )}
                  </div>
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
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
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
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-[#0D1424] border border-white/[0.12] rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="overflow-y-auto flex-1">
                {/* Modal Image Header with Clean Browser Mockup Frame */}
                <div className="w-full bg-[#080D1A] border-b border-white/[0.08] flex flex-col">
                  {/* Browser Chrome Bar */}
                  <div className="h-8 bg-[#0D1527] border-b border-white/[0.08] px-4 flex items-center justify-between shrink-0 z-10">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                      <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                      <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#080D1A] border border-white/[0.08] text-xs font-mono text-slate-300 max-w-[340px] truncate shadow-inner">
                      <span className="text-emerald-400 text-[10px]">🔒</span>
                      <span className="truncate">{selectedProject.liveUrl || `https://${selectedProject.id}.app`}</span>
                    </div>
                    <div>
                      {selectedProject.liveUrl ? (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-indigo-300 text-slate-400 flex items-center gap-1 text-[11px] font-sans font-semibold transition-colors"
                        >
                          <span>Visit Site</span>
                          <ExternalLink size={12} />
                        </a>
                      ) : (
                        <div className="w-12" />
                      )}
                    </div>
                  </div>

                  {/* Viewport Canvas */}
                  <div className="w-full aspect-[16/10] sm:aspect-video bg-[#070B14] flex items-start justify-center relative overflow-hidden">
                    <motion.img
                      key={activeModalImage || selectedProject.image}
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      src={activeModalImage || selectedProject.image}
                      alt={selectedProject.title}
                      className={`w-full h-full ${
                        selectedProject.category === 'apps' || selectedProject.category === 'security'
                          ? 'object-cover object-top'
                          : 'object-contain p-4'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    {((activeModalImage || selectedProject.image) === '/image/katrina_screenshot.png') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        ✦ Portfolio Homepage Hero
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('katrina_about') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        ✦ A Little About Me
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('katrina_skills') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        📁 Core Skills & Capabilities
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('katrina_experience') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        💼 Work Experience & Career Milestones
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('katrina_tools') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        📊 Tech & Software Stack
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('katrina_contact') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        ✉ Contact & Direct Inquiries
                      </span>
                    )}
                    {((activeModalImage || selectedProject.image) === '/image/serena_homepage.svg') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-amber-950/90 text-amber-200 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        ✦ Storefront Homepage (Sculptural Stone Architecture)
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('serena_catalog') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        🛍 Curated Collection & Category Tabs
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('serena_detail') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        🔎 Product Detail & Raw Stone Specs
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('serena_checkout') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-sky-950/90 text-sky-300 border border-sky-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        💳 Bag & GCash / BPI Checkout
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('serena_admin') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-stone-900/90 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        ⚙️ Admin Studio & Order Pipeline
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('jw_dark_login') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-slate-950/90 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        🌙 Dark Mode Sign In
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('jw_dark_inbox') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-slate-950/90 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                        🌙 Dark Mode Inbox
                      </span>
                    )}
                    {((activeModalImage || selectedProject.image) === '/image/jw_login.svg') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-slate-950/90 text-orange-300 border border-orange-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                        ☀️ Webmail Portal (Light Mode)
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('inbox') && !(activeModalImage || selectedProject.image).includes('dark') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-slate-950/90 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                        📬 Corporate Webmail Inbox
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('chat') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-slate-950/90 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                        💬 Messenger & Company Chat
                      </span>
                    )}
                    {(activeModalImage || selectedProject.image).includes('admin') && (
                      <span className="absolute top-4 left-4 text-xs font-mono font-bold bg-slate-950/90 text-violet-300 border border-violet-500/30 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
                        ⚙️ Enterprise Admin Console
                      </span>
                    )}
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                      {selectedProject.title}
                    </h2>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedProject.longDescription}
                  </p>

                  {/* Gallery of developed site screenshots (with dark mode and developed pages) */}
                  {selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                          Developed Site Screenshots & Views ({selectedProject.galleryImages.length} screens)
                        </h4>
                        <span className="text-[11px] text-slate-400">Click any thumbnail below to preview it above</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                        {selectedProject.galleryImages.map((img, i) => {
                          const isKatrinaHome = img.includes('katrina_screenshot');
                          const isKatrinaAbout = img.includes('katrina_about');
                          const isKatrinaSkills = img.includes('katrina_skills');
                          const isKatrinaExp = img.includes('katrina_experience');
                          const isKatrinaTools = img.includes('katrina_tools');
                          const isKatrinaContact = img.includes('katrina_contact');

                          const isSerenaHome = img.includes('serena_homepage');
                          const isSerenaCatalog = img.includes('serena_catalog');
                          const isSerenaDetail = img.includes('serena_detail');
                          const isSerenaCheckout = img.includes('serena_checkout');
                          const isSerenaAdmin = img.includes('serena_admin');

                          const isDarkLogin = img.includes('dark_login');
                          const isDarkInbox = img.includes('dark_inbox');
                          const isLogin = img.includes('jw_login');
                          const isInbox = img.includes('inbox') && !img.includes('dark');
                          const isChat = img.includes('chat');
                          const isAdmin = img.includes('admin');
                          const isDark = isDarkLogin || isDarkInbox || img.includes('dark');

                          const label = isKatrinaHome
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
                            ? 'Storefront Hero'
                            : isSerenaCatalog
                            ? 'Collection Grid'
                            : isSerenaDetail
                            ? 'Product Specs'
                            : isSerenaCheckout
                            ? 'GCash Checkout'
                            : isSerenaAdmin
                            ? 'Admin Studio'
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
                                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
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
      </AnimatePresence>
    </div>
  );
}
