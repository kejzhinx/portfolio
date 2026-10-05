import { motion } from 'motion/react';
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
  Globe,
  Terminal,
  Smartphone,
  Cpu,
  Wrench,
  Keyboard,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function AboutPage() {
  const { isDark } = useTheme();

  const resumeSkills = [
    { name: 'Web Development', icon: Globe, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20' },
    { name: 'Cybersecurity Specialist', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Creative Technology', icon: Palette, color: 'text-violet-400 bg-violet-500/10 border-violet-500/20' },
    { name: 'Linux', icon: Terminal, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { name: 'Hardware / Software Troubleshooting', icon: Cpu, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { name: 'Computer Repair', icon: Wrench, color: 'text-teal-400 bg-teal-500/10 border-teal-500/20' },
    { name: 'Cellphone / Tablet Repair', icon: Smartphone, color: 'text-sky-400 bg-sky-500/10 border-sky-500/20' },
    { name: '60–80 WPM Typing Speed', icon: Keyboard, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  ];

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
    <div className="pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-16">
      {/* Top Banner / Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4"
      >
        <div className="badge-pill">
          <Sparkles size={14} className="text-indigo-400" />
          <span>About Me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Turning ideas into <span className="text-gradient">functional digital solutions.</span>
            </h1>

            <p className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              I'm a dedicated <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Cybersecurity & Creative Technology Specialist</span> with over 8 years of hands-on experience in vulnerability assessment, web security audits, and visual brand identity. I specialize in protecting digital infrastructures while crafting compelling, high-converting digital designs.
            </p>

            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              From auditing cryptocurrency exchanges and blockchain platforms to engineering native mobile applications and streetwear apparel graphics, I combine rigorous technical defense with creative visual precision.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/Jeric.pdf"
                download="Jeric_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Download size={16} />
                <span>Download Resume CV</span>
              </a>

              <Link to="/contact" className="btn-secondary">
                <span>Get In Touch</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Bento Skillset Card */}
          <div className={`lg:col-span-5 p-5 sm:p-6 space-y-4 rounded-3xl border transition-all ${
            isDark ? 'bg-[#0D1424] border-white/[0.08]' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3.5 ${
              isDark ? 'border-white/[0.08]' : 'border-slate-100'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h2 className={`text-base sm:text-lg font-bold ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Technical Skillset
                  </h2>
                  <span className={`text-[11px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Core proficiencies & hands-on capabilities
                  </span>
                </div>
              </div>
            </div>

            {/* Skill Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {resumeSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.25 }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all group ${
                      isDark
                        ? 'bg-[#080D1A]/80 border-white/[0.06] hover:bg-[#0B1224] hover:border-indigo-500/40'
                        : 'bg-slate-50/80 border-slate-200/80 hover:bg-white hover:border-indigo-300 shadow-2xs hover:shadow-sm'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-110 ${skill.color}`}>
                      <Icon size={16} />
                    </div>
                    <span className={`text-xs font-semibold leading-tight transition-colors ${
                      isDark ? 'text-slate-200 group-hover:text-white' : 'text-slate-800 group-hover:text-indigo-600'
                    }`}>
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Experience Section */}
      <section className="space-y-8">
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
          isDark ? 'border-white/[0.08]' : 'border-slate-200'
        }`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
                <Briefcase size={18} />
              </div>
              <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Experience & Career</h2>
            </div>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Professional positions, penetration testing audits, and technical systems administration
            </p>
          </div>

          <span className={`text-xs font-mono px-3.5 py-1.5 rounded-full self-start sm:self-auto border ${
            isDark ? 'text-slate-400 bg-white/[0.03] border-white/[0.08]' : 'text-slate-600 bg-slate-100 border-slate-200'
          }`}>
            {workExperience.length} Milestones • 2019 - Present
          </span>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-0 sm:pl-4 space-y-6">
          {/* Subtle vertical connection beam on desktop/tablet */}
          <div className="hidden sm:block absolute left-9 top-8 bottom-8 w-0.5 bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-indigo-500/10 pointer-events-none" />

          {workExperience.map((exp, idx) => {
            const IconComponent = exp.icon;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 group"
              >
                {/* Timeline Node Badge */}
                <div className={`hidden sm:flex relative z-10 shrink-0 w-11 h-11 rounded-2xl border group-hover:border-indigo-400/60 items-center justify-center transition-all duration-300 ${
                  isDark
                    ? 'bg-[#0B1120] border-white/[0.12] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]'
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
                <div className={`p-4 sm:p-7 flex-1 w-full space-y-5 rounded-3xl border transition-all ${
                  isDark
                    ? 'bg-[#0D1424] border-white/[0.08] group-hover:border-indigo-500/40'
                    : 'bg-white border-slate-200 shadow-sm group-hover:border-indigo-400 group-hover:shadow-md'
                }`}>
                  {/* Card Header */}
                  <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b pb-4 ${
                    isDark ? 'border-white/[0.06]' : 'border-slate-100'
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

                    {/* Period & Category Badges */}
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
                    </div>
                  </div>

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
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Education Record Section */}
      <section className="space-y-8">
        <div className={`flex items-center justify-between pb-3 border-b ${
          isDark ? 'border-white/[0.08]' : 'border-slate-200'
        }`}>
          <div className="space-y-1">
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Education History</h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Academic journey and foundational learning</p>
          </div>
          <GraduationCap className="text-indigo-500" size={24} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationRecords.map((edu, idx) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`p-6 flex flex-col justify-between group rounded-3xl border transition-all h-full ${
                isDark
                  ? 'bg-[#0D1424] border-white/[0.08] hover:border-indigo-500/40'
                  : 'bg-white border-slate-200 shadow-sm hover:border-indigo-400 hover:shadow-md'
              }`}
            >
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
  );
}
