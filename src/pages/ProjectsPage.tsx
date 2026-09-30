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

  const projects: ProjectItem[] = [
    // Applications & Software
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
                {/* Project Image Preview Box */}
                <div
                  onClick={() => setSelectedProject(project)}
                  className="aspect-video w-full bg-[#080D1A] relative overflow-hidden flex items-center justify-center cursor-pointer border-b border-white/[0.06] p-4"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1424] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {project.galleryImages && project.galleryImages.length > 1 && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono font-semibold text-white border border-white/10 flex items-center gap-1">
                      <Eye size={11} />
                      <span>{project.galleryImages.length} Assets</span>
                    </span>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <h3
                      onClick={() => setSelectedProject(project)}
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
                  onClick={() => setSelectedProject(project)}
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
                {/* Modal Image Header */}
                <div className="w-full aspect-video bg-[#070B14] p-6 flex items-center justify-center relative border-b border-white/[0.08]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
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

                  {/* Gallery of multiple assets (if present) */}
                  {selectedProject.galleryImages && selectedProject.galleryImages.length > 1 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                        Design Assets & Gallery ({selectedProject.galleryImages.length} items)
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedProject.galleryImages.map((img, i) => (
                          <div
                            key={i}
                            className="aspect-square rounded-xl bg-[#070B14] p-3 flex items-center justify-center border border-white/[0.08] overflow-hidden"
                          >
                            <img
                              src={img}
                              alt={`${selectedProject.title} asset ${i + 1}`}
                              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
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
