import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  GraduationCap,
  ArrowRight,
  Download,
  Briefcase,
  Sparkles,
  Building2,
  Calendar,
  ShieldCheck,
  Database,
  Server,
  Palette,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import FloatingCyberObjects from '../components/FloatingCyberObjects';
import CardBorderDecoration from '../components/CardBorderDecoration';

export default function AboutPage() {
  const { isDark, isHalloween, isChristmas } = useTheme();
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

  const toggleRole = (company: string) => {
    setExpandedRoles((prev) => ({
      ...prev,
      [company]: !prev[company],
    }));
  };

  const educationRecords = [
    {
      institution: 'AMA University & College',
      period: '2020 - 2021',
      degree: 'BS Computer Science / Information Technology',
      logo: '/image/ama.webp',
      notes: 'Focused on algorithms, software engineering, databases, and network fundamentals.',
    },
    {
      institution: 'Carlos L. Albert High School',
      period: '2018 - 2020',
      degree: 'Information & Communications Technology Strand',
      logo: '/image/carlos.webp',
      notes: 'Graduated with honors in technical computer hardware and programming fundamentals.',
    },
    {
      institution: 'Aurora A. Elementary',
      period: '2007 - 2014',
      degree: 'Primary Education',
      logo: '/image/auro.webp',
      notes: 'Early passion for computing, logic puzzles, and visual arts.',
    },
  ];

  const workExperience = [
    {
      company: 'American Technologies Inc.',
      role: 'Data Management Staff',
      period: '2025',
      isCurrent: true,
      employmentType: 'Enterprise Contract',
      badge: 'Database & Scripting',
      badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25',
      icon: Database,
      iconColor: 'text-indigo-400',
      iconBg: 'bg-indigo-500/10 border-indigo-500/30',
      description: 'Reviewing and managing incoming enterprise assets using M-Files, Oracle database encoding, and developing Python scripts for automated data validation.',
      responsibilities: [
        'Automated enterprise data ingestion workflows using custom Python validation scripts',
        'Managed structured asset registries and digital archives via M-Files enterprise software',
        'Executed secure data entry, query verification, and record reconciliation in Oracle DB'
      ],
      technologies: ['Python', 'Oracle DB', 'M-Files', 'Data Validation', 'Enterprise Archiving']
    },
    {
      company: 'Gentech IT Solutions Corp.',
      role: 'I.T Technician & Web Administrator',
      period: '2023 - 2025',
      isCurrent: false,
      employmentType: 'Full-Time Position',
      badge: 'Infrastructure & Support',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
      icon: Server,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10 border-blue-500/30',
      description: 'Web administration, online technical support, graphic design for marketing, and hardware technical maintenance including network setup and system configuration.',
      responsibilities: [
        'Maintained web portals, server uptime, DNS configurations, and customer support channels',
        'Installed and configured enterprise networking hardware, workstations, and security switches',
        'Produced high-resolution digital marketing collateral and technical documentation'
      ],
      technologies: ['Web Administration', 'Network Routing', 'Hardware Diagnostics', 'Technical Support', 'Graphic Design']
    },
    {
      company: 'Pepecoin.org (Remote)',
      role: 'Penetration Tester',
      period: '2023 - 2024',
      isCurrent: false,
      employmentType: 'Cybersecurity Engagement',
      badge: 'Cybersecurity Audit',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Performed penetration testing, client-server websocket inspection, and vulnerability assessments for the Floppygame PEPE ecosystem.',
      responsibilities: [
        'Evaluated web game client-server websocket packet flows to prevent score manipulation and token theft',
        'Conducted leaderboard anti-tampering verification and cryptographic payload signing checks',
        'Triaged potential injection vectors and authored vulnerability mitigation guides'
      ],
      technologies: ['WebSocket Auditing', 'Packet Inspection', 'Anti-Cheat Defense', 'Vulnerability Assessment']
    },
    {
      company: 'Stakecube.net (Remote)',
      role: 'Information Security & Pentester',
      period: '2020 - 2023',
      isCurrent: false,
      employmentType: 'Cybersecurity Engagement',
      badge: 'Cybersecurity Audit',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Conducted comprehensive security audits and vulnerability assessments across exchange order-book APIs, staking nodes, and cold storage gateway routines.',
      responsibilities: [
        'Audited exchange order-book API endpoints against race condition, concurrency, and replay attacks',
        'Executed deep web penetration testing on masternode hosting and wallet download interfaces (OWASP Top 10)',
        'Delivered detailed remediation reports with proof-of-concept exploits for developer mitigation'
      ],
      technologies: ['API Pentesting', 'OWASP Top 10', 'Burp Suite', 'Crypto Exchange Security', 'Masternode Hardening']
    },
    {
      company: 'Aercrypt.net (Remote)',
      role: 'Penetration Tester',
      period: '2021 - 2023',
      isCurrent: false,
      employmentType: 'Cybersecurity Engagement',
      badge: 'Cybersecurity Audit',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Security testing and penetration auditing for Aercrypt end-to-end encrypted messaging services and confidential communication hubs.',
      responsibilities: [
        'Audited end-to-end cryptographic handshakes, TLS session parameters, and message deletion routines',
        'Evaluated communication channels against eavesdropping, MITM attacks, and metadata leakage',
        'Conducted server-side memory leak inspection and persistent storage security analysis'
      ],
      technologies: ['End-to-End Encryption', 'Cryptographic Auditing', 'TLS Security', 'Penetration Testing']
    },
    {
      company: 'Vitae Token Platform (Remote)',
      role: 'Web3 Security Auditor & Pentester',
      period: '2020 - 2022',
      isCurrent: false,
      employmentType: 'Cybersecurity Engagement',
      badge: 'Cybersecurity Audit',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Social Rewards Blockchain Platform security audits and system vulnerability assessments.',
      responsibilities: [
        'Audited social reward claim endpoints against sybil attacks, bot spoofing, and automated exploitation',
        'Conducted frontend web penetration testing and secure session validation across user portals',
        'Delivered vulnerability assessment reports and hardening recommendations'
      ],
      technologies: ['Web3 Security', 'Penetration Testing', 'API Security', 'Vulnerability Assessment']
    },
    {
      company: 'Socialsend.net (Remote)',
      role: 'Information Security / Vulnerability Analyst',
      period: '2019 - 2022',
      isCurrent: false,
      employmentType: 'Cybersecurity Engagement',
      badge: 'Cybersecurity Audit',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Performing comprehensive penetration tests on production websites, analyzing potential attack vectors, and securing cryptocurrency transaction infrastructure.',
      responsibilities: [
        'Executed black-box and grey-box web application penetration tests against OWASP Top 10 vectors',
        'Inspected crypto transaction APIs and authentication flows for token leakage and race conditions',
        'Authored remediation reports with reproducible proof-of-concept exploits for developer mitigation'
      ],
      technologies: ['Kali Linux', 'Burp Suite', 'OWASP Top 10', 'Penetration Testing', 'Cryptocurrency Security', 'Vulnerability Assessment']
    },
    {
      company: 'Metrixcoin.com (Remote)',
      role: 'Information Security & Pentester',
      period: '2019 - 2022',
      isCurrent: false,
      employmentType: 'Cybersecurity Engagement',
      badge: 'Cybersecurity Audit',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/30',
      description: 'Penetration Tester and Information Security advisor for Proof-of-Stake cryptocurrency platform.',
      responsibilities: [
        'Conducted web penetration testing on wallet download portals, explorer APIs, and governance voting interfaces',
        'Performed explorer API stress testing and SQL injection prevention assessments',
        'Secured official wallet binary release channels against supply-chain tampering'
      ],
      technologies: ['PoS Blockchain', 'API Pentest', 'SQL Injection Mitigation', 'Infosec Advising']
    },
    {
      company: 'Jaslink Trading',
      role: 'Graphics Designer & E-Commerce Lead',
      period: '2023',
      isCurrent: false,
      employmentType: 'Creative & Operations',
      badge: 'Branding & E-Commerce',
      badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
      icon: Palette,
      iconColor: 'text-violet-400',
      iconBg: 'bg-violet-500/10 border-violet-500/30',
      description: 'Creating high-impact advertising layouts, managing e-commerce storefronts (Lazada/Shopee), and designing custom promotional merchandise.',
      responsibilities: [
        'Designed high-converting store banners, product hero mockups, and promotional apparel',
        'Managed product catalog listings, inventory synchronization, and customer fulfillment campaigns',
        'Engineered visual branding assets for physical merchandise and packaging'
      ],
      technologies: ['Adobe Photoshop', 'Canva', 'E-Commerce (Lazada/Shopee)', 'Print Apparel', 'Brand Identity']
    },
  ];

  return (
    <div className={`relative w-full py-16 sm:py-24 px-4 sm:px-8 overflow-hidden transition-colors duration-300 ${
      isHalloween ? 'bg-[#0A0512]' : isChristmas ? 'bg-[#051120]' : isDark ? 'bg-[#070B14]' : 'bg-[#F8FAFC]'
    }`}>
      <FloatingCyberObjects />
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
      {/* Top Banner / Intro */}
      <div className="space-y-4">
        <div className="max-w-4xl space-y-6">
          <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Turning ideas into <span className="text-gradient">functional digital solutions</span>.
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            I'm a dedicated <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Cybersecurity & Web Specialist</span> with over 8 years of hands-on experience in vulnerability assessment, web security audits, and technical systems administration. I specialize in protecting digital infrastructures while engineering robust web solutions.
          </p>

          <p className={`text-sm sm:text-base leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            From auditing cryptocurrency exchanges and blockchain platforms to engineering native mobile applications and technical system diagnostics, I combine rigorous technical defense with analytical precision.
          </p>
        </div>
      </div>

      {/* Experience Section */}
      <section className="space-y-8">
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
          isHalloween ? 'border-orange-500/20' : isChristmas ? 'border-red-500/20' : isDark ? 'border-white/[0.08]' : 'border-slate-200'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isHalloween
                  ? 'bg-orange-500/15 border border-orange-500/30 text-orange-400'
                  : isChristmas
                  ? 'bg-red-500/15 border border-red-500/30 text-red-400'
                  : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-500'
              }`}>
                <Briefcase size={18} />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {isHalloween ? '🦇 Experience & Career 🎃' : isChristmas ? '🎁 Experience & Career 🎄' : 'Experience & Career'}
              </h2>
            </div>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Professional positions, penetration testing audits, and technical systems administration
            </p>
          </div>

          {/* Expand All / Collapse All Toggle Button */}
          <button
            type="button"
            onClick={() => {
              const allExpanded = workExperience.every((exp) => expandedRoles[exp.company]);
              if (allExpanded) {
                setExpandedRoles({});
              } else {
                const all: Record<string, boolean> = {};
                workExperience.forEach((exp) => {
                  all[exp.company] = true;
                });
                setExpandedRoles(all);
              }
            }}
            className={`self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 shadow-sm ${
              isHalloween
                ? 'bg-orange-500/15 hover:bg-orange-500/25 text-orange-300 border border-orange-500/30'
                : isChristmas
                ? 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30'
                : isDark
                ? 'bg-indigo-600/15 hover:bg-indigo-600/25 text-indigo-300 border border-indigo-500/30'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200'
            }`}
          >
            <span>{workExperience.every((exp) => expandedRoles[exp.company]) ? 'Collapse All Details' : 'Expand All Details'}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${workExperience.every((exp) => expandedRoles[exp.company]) ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-0 sm:pl-4 space-y-6">
          {/* Subtle vertical connection beam on desktop/tablet */}
          <div className={`hidden sm:block absolute left-9 top-8 bottom-8 w-0.5 pointer-events-none ${
            isHalloween
              ? 'bg-gradient-to-b from-orange-500/50 via-purple-500/30 to-orange-500/10'
              : isChristmas
              ? 'bg-gradient-to-b from-red-500/50 via-emerald-500/30 to-red-500/10'
              : 'bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-indigo-500/10'
          }`} />

          {workExperience.map((exp, idx) => {
            const IconComponent = exp.icon;
            const isRoleExpanded = !!expandedRoles[exp.company];

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.4 }}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group"
              >
                {/* Timeline Node Badge */}
                <div className={`hidden sm:flex relative z-10 shrink-0 w-11 h-11 rounded-2xl border items-center justify-center transition-all duration-300 ${
                  isHalloween
                    ? 'bg-[#180A26] border-orange-500/40 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                    : isChristmas
                    ? 'bg-[#082035] border-emerald-500/40 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    : isDark
                    ? 'bg-[#0B1120] border-white/[0.12] group-hover:border-indigo-400/60 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                    : 'bg-white border-slate-300 shadow-sm'
                }`}>
                  <IconComponent size={20} className={exp.iconColor} />
                  {exp.isCurrent && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </div>

                {/* Experience Card */}
                <div className={`relative overflow-hidden p-4 sm:p-7 flex-1 w-full space-y-4 rounded-3xl border transition-all ${
                  isHalloween
                    ? 'bg-[#140A1F]/90 border-orange-500/25 group-hover:border-orange-500/50 shadow-xl shadow-orange-950/40'
                    : isChristmas
                    ? 'bg-[#07192B]/90 border-emerald-500/25 group-hover:border-emerald-500/50 shadow-xl shadow-emerald-950/40'
                    : isDark
                    ? 'bg-[#0D1424] border-white/[0.08] group-hover:border-indigo-500/40'
                    : 'bg-white border-slate-200 shadow-sm group-hover:border-indigo-400 group-hover:shadow-md'
                }`}>
                  <CardBorderDecoration />
                  {/* Card Header (Role, Company, Badges, and Expand Details Button) */}
                  <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 ${
                    isRoleExpanded ? (isDark ? 'border-b border-white/[0.06] pb-4' : 'border-b border-slate-100 pb-4') : ''
                  }`}>
                    <div className="space-y-1.5 w-full lg:w-auto">
                      <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-2.5">
                        <h3 className={`text-[15px] sm:text-xl font-bold transition-colors leading-snug ${
                          isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                        }`}>
                          {exp.role}
                        </h3>
                        {exp.isCurrent && (
                          <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                            Recent
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 text-xs sm:text-sm font-medium">
                        <span className={`flex items-center gap-1.5 font-semibold ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`}>
                          <Building2 size={14} className="hidden sm:inline-block text-indigo-500 shrink-0" />
                          <span>{exp.company}</span>
                          <Building2 size={13} className="sm:hidden text-indigo-400 shrink-0" />
                        </span>
                        <span className={`hidden sm:inline ${isDark ? 'text-slate-600' : 'text-slate-300'}`}>•</span>
                        <span className={`text-[11px] sm:text-xs font-normal sm:font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {exp.employmentType}
                        </span>
                      </div>
                    </div>

                    {/* Period & Category Badges + Interactive Expand Details Button */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5 sm:pt-0 self-start lg:self-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-mono px-3 py-1 rounded-full border ${
                        isDark ? 'text-slate-300 bg-white/[0.05] border-white/[0.08]' : 'text-slate-700 bg-slate-100 border-slate-200'
                      }`}>
                        <Calendar size={13} className="text-indigo-500" />
                        {exp.period}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${exp.badgeColor}`}>
                        {exp.badge}
                      </span>

                      {/* Expand / Collapse Button */}
                      <button
                        type="button"
                        onClick={() => toggleRole(exp.company)}
                        aria-expanded={isRoleExpanded}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer select-none active:scale-95 shadow-sm ${
                          isHalloween
                            ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40'
                            : isChristmas
                            ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40'
                            : isDark
                            ? 'bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200'
                        }`}
                      >
                        <span>{isRoleExpanded ? 'Hide Details' : 'Expand Details'}</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isRoleExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Extra Details: Expandable Section */}
                  <AnimatePresence>
                    {isRoleExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="space-y-5 overflow-hidden pt-1"
                      >
                        {/* Summary Description */}
                        <p className={`text-sm sm:text-base leading-relaxed ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          {exp.description}
                        </p>

                        {/* Responsibilities Bullets */}
                        <div className="space-y-2 pt-1">
                          <span className={`text-[11px] font-mono uppercase tracking-wider font-semibold block ${
                            isDark ? 'text-slate-400' : 'text-slate-500'
                          }`}>
                            Key Highlights & Impact:
                          </span>
                          <ul className="space-y-1.5">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                                isDark ? 'text-slate-400' : 'text-slate-600'
                              }`}>
                                <CheckCircle2 size={15} className="text-indigo-500 shrink-0 mt-0.5" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Tech Stack Tags */}
                        <div className="pt-2 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={`text-[11px] font-medium border px-2.5 py-1.5 sm:py-0.5 rounded-lg sm:rounded-md transition-colors flex items-center justify-center text-center last:odd:col-span-2 sm:last:odd:col-span-1 min-h-[30px] sm:min-h-0 sm:w-auto leading-tight ${
                                isDark
                                  ? 'text-slate-300 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white border-white/[0.06]'
                                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Education Record Section */}
      <section className="space-y-8">
        <div className={`flex items-center justify-between pb-3 border-b ${
          isHalloween ? 'border-orange-500/20' : isChristmas ? 'border-emerald-500/20' : isDark ? 'border-white/[0.08]' : 'border-slate-200'
        }`}>
          <div className="space-y-1">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isHalloween ? '🕷️ Education History 🎃' : isChristmas ? '🔔 Education History ❄️' : 'Education History'}
            </h2>
            <p className={`text-xs ${isHalloween ? 'text-orange-200/60' : isChristmas ? 'text-emerald-200/60' : isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Academic journey and foundational learning
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationRecords.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden p-6 flex flex-col justify-between group rounded-3xl border transition-all h-full ${
                isHalloween
                  ? 'bg-[#140A1F]/90 border-orange-500/25 hover:border-orange-500/50 shadow-xl shadow-orange-950/40'
                  : isChristmas
                  ? 'bg-[#07192B]/90 border-emerald-500/25 hover:border-emerald-500/50 shadow-xl shadow-emerald-950/40'
                  : isDark
                  ? 'bg-[#0D1424] border-white/[0.08] hover:border-indigo-500/40'
                  : 'bg-white border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md'
              }`}
            >
              <CardBorderDecoration />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                    isDark ? 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' : 'text-indigo-600 bg-indigo-50 border-indigo-200'
                  }`}>
                    {edu.period}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-md border border-slate-100">
                    <img
                      src={edu.logo}
                      alt={edu.institution}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-bold transition-colors ${
                    isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                  }`}>
                    {edu.institution}
                  </h3>
                  <p className={`text-xs font-medium mt-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>{edu.degree}</p>
                </div>

                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>{edu.notes}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      </div>
    </div>
  );
}
