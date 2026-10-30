import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import FloatingCyberObjects from '../components/FloatingCyberObjects';
import CardBorderDecoration from '../components/CardBorderDecoration';
import {
  Sparkles,
  Terminal,
  Shield,
  Palette,
  Database,
  Code2,
  Cpu,
  Radar,
  ShieldAlert,
  FolderSearch,
  Video,
  Layers,
  Network,
  Globe,
  ShieldCheck,
  Wrench,
  Smartphone,
  Keyboard,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  type LucideIcon
} from 'lucide-react';

interface SkillItem {
  name: string;
  category: 'dev' | 'security' | 'design' | 'db';
  categoryLabel: string;
  role: string;
  iconBg: string;
  textColor: string;
  iconUrl?: string;
  fallbackIcon: LucideIcon;
  description: string;
}

const SKILLS_DATA: SkillItem[] = [
  // Development Stack
  {
    name: 'Java',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'OOP & Android Core',
    iconBg: 'bg-[#EA2D2E]/10 border-[#EA2D2E]/30',
    textColor: 'text-[#EA2D2E]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg',
    fallbackIcon: Code2,
    description: 'Robust backend development, object-oriented programming, and native Android applications.'
  },
  {
    name: 'Kotlin',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Android & Jetpack',
    iconBg: 'bg-[#7F52FF]/10 border-[#7F52FF]/30',
    textColor: 'text-[#7F52FF]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    fallbackIcon: Code2,
    description: 'Modern Android architecture, Jetpack Compose UI, coroutines, and declarative design.'
  },
  {
    name: 'Android Studio',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Mobile IDE & SDK',
    iconBg: 'bg-[#3DDC84]/10 border-[#3DDC84]/30',
    textColor: 'text-[#3DDC84]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg',
    fallbackIcon: Cpu,
    description: 'Full mobile app lifecycle management, profiling, layout debugging, and APK deployment.'
  },
  {
    name: 'PHP',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Server-Side Scripting',
    iconBg: 'bg-[#777BB4]/10 border-[#777BB4]/30',
    textColor: 'text-[#777BB4]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
    fallbackIcon: Code2,
    description: 'Dynamic web backend engineering, API development, session security, and MVC architectures.'
  },
  {
    name: 'MySQL',
    category: 'db',
    categoryLabel: 'Database',
    role: 'Relational DB',
    iconBg: 'bg-[#4479A1]/10 border-[#4479A1]/30',
    textColor: 'text-[#4479A1]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
    fallbackIcon: Database,
    description: 'Relational schema design, complex query optimization, transactions, and database security.'
  },
  {
    name: 'SQLite',
    category: 'db',
    categoryLabel: 'Database',
    role: 'Embedded Relational DB',
    iconBg: 'bg-[#003B57]/10 border-[#003B57]/30',
    textColor: 'text-[#008ACF]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg',
    fallbackIcon: Database,
    description: 'Lightweight embedded database storage, mobile local persistence, and client-side structured querying.'
  },
  {
    name: 'JavaScript',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Web Scripting & ES6+',
    iconBg: 'bg-[#F7DF1E]/10 border-[#F7DF1E]/30',
    textColor: 'text-[#F7DF1E]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    fallbackIcon: Code2,
    description: 'Interactive frontends, asynchronous DOM handling, modern ES6+ paradigms, and APIs.'
  },
  {
    name: 'HTML5',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Semantic Markup',
    iconBg: 'bg-[#E34F26]/10 border-[#E34F26]/30',
    textColor: 'text-[#E34F26]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
    fallbackIcon: Code2,
    description: 'Accessible semantic structures, SEO compliance, modern web forms, and media integration.'
  },
  {
    name: 'CSS3',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Modern Layouts',
    iconBg: 'bg-[#1572B6]/10 border-[#1572B6]/30',
    textColor: 'text-[#1572B6]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
    fallbackIcon: Palette,
    description: 'Responsive flexbox/grid architectures, keyframe animations, custom properties, and UI styling.'
  },
  {
    name: 'Tailwind CSS',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Utility-First Styling',
    iconBg: 'bg-[#06B6D4]/10 border-[#06B6D4]/30',
    textColor: 'text-[#06B6D4]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
    fallbackIcon: Palette,
    description: 'Rapid, component-driven responsive interfaces with custom design systems and micro-utilities.'
  },
  {
    name: 'Git & GitHub',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Version Control',
    iconBg: 'bg-[#F05032]/10 border-[#F05032]/30',
    textColor: 'text-[#F05032]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
    fallbackIcon: Terminal,
    description: 'Branch workflows, repository management, collaborative code review, and CI/CD pipelines.'
  },
  {
    name: 'Python',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Automation & Scripts',
    iconBg: 'bg-[#3776AB]/10 border-[#3776AB]/30',
    textColor: 'text-[#3776AB]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    fallbackIcon: Code2,
    description: 'Security scripting, automated penetration testing utilities, data processing, and backends.'
  },
  {
    name: 'React',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Component UI',
    iconBg: 'bg-[#61DAFB]/10 border-[#61DAFB]/30',
    textColor: 'text-[#61DAFB]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
    fallbackIcon: Layers,
    description: 'Single-page applications, custom React hooks, declarative state orchestration, and performance.'
  },

  // Cybersecurity & Pentesting Stack
  {
    name: 'Kali Linux',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Security OS',
    iconBg: 'bg-[#557C93]/15 border-[#557C93]/40',
    textColor: 'text-[#557C93]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kalilinux/kalilinux-original.svg',
    fallbackIcon: Terminal,
    description: 'Primary operating system environment for comprehensive ethical hacking and vulnerability audits.'
  },
  {
    name: 'Burp Suite',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Web Proxy & Audit',
    iconBg: 'bg-[#FF6633]/10 border-[#FF6633]/30',
    textColor: 'text-[#FF6633]',
    iconUrl: 'https://cdn.simpleicons.org/burpsuite/FF6633',
    fallbackIcon: Shield,
    description: 'HTTP proxy interceptor, vulnerability scanning, CSRF/XSS testing, and API security auditing.'
  },
  {
    name: 'Metasploit',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Exploitation Framework',
    iconBg: 'bg-[#294E80]/10 border-[#294E80]/30',
    textColor: 'text-[#294E80]',
    iconUrl: 'https://cdn.simpleicons.org/metasploit/294E80',
    fallbackIcon: Terminal,
    description: 'Testing system resistance against known CVE vulnerabilities and payload verification.'
  },
  {
    name: 'Nmap',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Network Scanner',
    iconBg: 'bg-[#00B4D8]/10 border-[#00B4D8]/30',
    textColor: 'text-[#00B4D8]',
    iconUrl: 'https://cdn.simpleicons.org/nmap/2D5C88',
    fallbackIcon: Radar,
    description: 'Port scanning, service discovery, host detection, and network perimeter mapping.'
  },
  {
    name: 'Wireshark',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Packet Inspection',
    iconBg: 'bg-[#1679A7]/10 border-[#1679A7]/30',
    textColor: 'text-[#1679A7]',
    iconUrl: 'https://cdn.simpleicons.org/wireshark/1679A7',
    fallbackIcon: Network,
    description: 'Deep packet inspection, network protocol analysis, and unencrypted traffic detection.'
  },
  {
    name: 'SQLmap',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'SQL Injection Audit',
    iconBg: 'bg-[#E63946]/10 border-[#E63946]/30',
    textColor: 'text-[#E63946]',
    iconUrl: 'https://cdn.simpleicons.org/sqlmap/E63946',
    fallbackIcon: Database,
    description: 'Automated detection and auditing of database injection vulnerabilities across web servers.'
  },
  {
    name: 'Acunetix',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Vulnerability Scanner',
    iconBg: 'bg-[#4361EE]/10 border-[#4361EE]/30',
    textColor: 'text-[#4361EE]',
    fallbackIcon: ShieldAlert,
    description: 'Enterprise web vulnerability scanning, OWASP Top 10 compliance audits, and bug mitigation.'
  },
  {
    name: 'Gobuster',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Directory Bruteforce',
    iconBg: 'bg-[#06D6A0]/10 border-[#06D6A0]/30',
    textColor: 'text-[#06D6A0]',
    fallbackIcon: FolderSearch,
    description: 'High-speed URI and DNS subdomain enumeration to discover exposed sensitive endpoints.'
  },

  // Design & Creative Stack
  {
    name: 'Adobe Photoshop',
    category: 'design',
    categoryLabel: 'Design',
    role: 'Raster Editing & Apparel',
    iconBg: 'bg-[#31A8FF]/15 border-[#31A8FF]/40',
    textColor: 'text-[#31A8FF]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
    fallbackIcon: Palette,
    description: 'Custom anime streetwear illustrations, photo manipulation, and print-ready apparel layouts.'
  },
  {
    name: 'Canva',
    category: 'design',
    categoryLabel: 'Design',
    role: 'Layout & Marketing',
    iconBg: 'bg-[#00C4CC]/15 border-[#00C4CC]/40',
    textColor: 'text-[#00C4CC]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg',
    fallbackIcon: Palette,
    description: 'High-converting social marketing banners, corporate presentations, and quick layout prototypes.'
  },
  {
    name: 'Figma',
    category: 'design',
    categoryLabel: 'Design',
    role: 'UI/UX Prototyping',
    iconBg: 'bg-[#F24E1E]/15 border-[#F24E1E]/40',
    textColor: 'text-[#F24E1E]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
    fallbackIcon: Layers,
    description: 'Interactive wireframing, high-fidelity app interfaces, design systems, and vector components.'
  },
  {
    name: 'Filmora & After Effects',
    category: 'design',
    categoryLabel: 'Design',
    role: 'Motion & Video',
    iconBg: 'bg-[#9999FF]/15 border-[#9999FF]/40',
    textColor: 'text-[#9999FF]',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg',
    fallbackIcon: Video,
    description: 'Video editing, keyframe motion graphics, promotional showcases, and cinematic reels.'
  },
  // Technical Skillset & Hardware Capabilities
  {
    name: 'Web Development',
    category: 'dev',
    categoryLabel: 'Development',
    role: 'Full-Stack & Frontend Engineering',
    iconBg: 'bg-[#6366F1]/10 border-[#6366F1]/30',
    textColor: 'text-[#6366F1]',
    fallbackIcon: Globe,
    description: 'Building modern, responsive web applications with React, TypeScript, Tailwind CSS, and robust REST APIs.'
  },
  {
    name: 'Cybersecurity Specialist',
    category: 'security',
    categoryLabel: 'Cybersecurity',
    role: 'Penetration Testing & Security Audits',
    iconBg: 'bg-[#10B981]/10 border-[#10B981]/30',
    textColor: 'text-[#10B981]',
    fallbackIcon: ShieldCheck,
    description: 'Web application vulnerability assessments, OWASP Top 10 auditing, packet inspection, and anti-cheat validation.'
  },
  {
    name: 'Hardware / Software Troubleshooting',
    category: 'dev',
    categoryLabel: 'Hardware & Support',
    role: 'Diagnostics & System Recovery',
    iconBg: 'bg-[#3B82F6]/10 border-[#3B82F6]/30',
    textColor: 'text-[#3B82F6]',
    fallbackIcon: Cpu,
    description: 'System diagnostics, driver installation, OS recovery, component testing, and software conflict resolution.'
  },
  {
    name: 'Computer Repair',
    category: 'dev',
    categoryLabel: 'Hardware & Support',
    role: 'Desktop & Laptop Maintenance',
    iconBg: 'bg-[#14B8A6]/10 border-[#14B8A6]/30',
    textColor: 'text-[#14B8A6]',
    fallbackIcon: Wrench,
    description: 'Hardware assembly, thermal repasting, motherboard component testing, RAM/SSD upgrades, and power supply diagnostics.'
  },
  {
    name: 'Cellphone / Tablet Repair',
    category: 'dev',
    categoryLabel: 'Hardware & Support',
    role: 'Mobile Device Servicing',
    iconBg: 'bg-[#0EA5E9]/10 border-[#0EA5E9]/30',
    textColor: 'text-[#0EA5E9]',
    fallbackIcon: Smartphone,
    description: 'Mobile hardware disassembly, screen & battery replacement, charging port repair, and touch digitizer troubleshooting.'
  },
  {
    name: '60–80 WPM Typing Speed',
    category: 'dev',
    categoryLabel: 'Productivity',
    role: 'High-Speed Technical Touch Typing',
    iconBg: 'bg-[#F43F5E]/10 border-[#F43F5E]/30',
    textColor: 'text-[#F43F5E]',
    fallbackIcon: Keyboard,
    description: 'Fast, accurate touch typing for rapid code writing, terminal command execution, and structured technical data entry.'
  },
];

function SkillIconRenderer({ skill }: { skill: SkillItem }) {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = skill.fallbackIcon;

  if (skill.iconUrl && !imgError) {
    return (
      <img
        src={skill.iconUrl}
        alt={skill.name}
        className="w-full h-full object-contain filter brightness-95 group-hover:brightness-100 transition-all"
        onError={() => setImgError(true)}
      />
    );
  }

  return <FallbackIcon size={22} className={skill.textColor} />;
}

export default function SkillsPage() {
  const { isDark, isHalloween, isChristmas } = useTheme();
  const [activeTab, setActiveTab] = useState<'all' | 'dev' | 'security' | 'design' | 'db'>('all');
  const [showAll, setShowAll] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      tabsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredSkills = SKILLS_DATA.filter(
    (item) => activeTab === 'all' || item.category === activeTab
  );

  // Limit initially to 8 skills unless showAll is true
  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 8);

  const handleTabChange = (tabId: 'all' | 'dev' | 'security' | 'design' | 'db') => {
    setActiveTab(tabId);
    setShowAll(false);
  };

  return (
    <div className={`relative w-full py-16 sm:py-24 px-4 sm:px-8 overflow-hidden transition-colors duration-300 ${
      isHalloween ? 'bg-[#0A0512]' : isChristmas ? 'bg-[#051120]' : isDark ? 'bg-[#070B14]' : 'bg-[#F8FAFC]'
    }`}>
      <FloatingCyberObjects />

      <div className="max-w-7xl mx-auto w-full min-w-0 relative z-10">
      {/* Header */}
      <div className="space-y-4 mb-8 sm:mb-10 text-center sm:text-left">
        <div className={`badge-pill inline-flex items-center gap-1.5 ${
          isHalloween ? 'border-orange-500/40 bg-orange-500/10' : isChristmas ? 'border-red-500/40 bg-red-500/10' : ''
        }`}>
          {isHalloween ? (
            <span className="text-sm">🎃</span>
          ) : isChristmas ? (
            <span className="text-sm">🎄</span>
          ) : (
            <Sparkles size={14} className="text-indigo-400" />
          )}
          <span className={isHalloween ? 'text-orange-300' : isChristmas ? 'text-red-300' : ''}>
            {isHalloween ? 'Spooky Skills & Cyber Defense' : isChristmas ? 'Holiday Toolkit & Capabilities' : 'My Skills'}
          </span>
        </div>

        <h1 className={`text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight break-words ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Technologies & <span className="text-gradient">Core Capabilities</span>
        </h1>

        <p className={`text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed break-words ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          A comprehensive collection of programming languages, cybersecurity assessment tools, hardware diagnostics, and technical capabilities I utilize daily.
        </p>
      </div>

      {/* Filter Tabs Dock */}
      <div className={`flex items-center justify-between gap-2.5 sm:gap-4 mb-8 sm:mb-10 pb-6 border-b w-full min-w-0 max-w-full ${
        isHalloween ? 'border-orange-500/20' : isChristmas ? 'border-red-500/20' : isDark ? 'border-white/[0.08]' : 'border-slate-200'
      }`}>
        <button
          type="button"
          onClick={() => handleScroll('left')}
          aria-label="Scroll tabs left"
          title="Scroll options left"
          className={`shrink-0 p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-90 ${
            isHalloween
              ? 'bg-orange-950/40 hover:bg-orange-900/60 text-orange-200 border border-orange-500/30'
              : isChristmas
              ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30'
              : isDark
              ? 'bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10'
              : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 shadow-sm'
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={tabsRef}
          className={`flex items-center gap-1.5 sm:gap-2 p-1.5 pb-2.5 rounded-2xl backdrop-blur-md overflow-x-auto styled-scrollbar scroll-smooth flex-1 min-w-0 ${
            isHalloween
              ? 'bg-orange-950/30 border border-orange-500/20'
              : isChristmas
              ? 'bg-emerald-950/30 border border-emerald-500/20'
              : isDark ? 'bg-white/[0.03] border border-white/[0.08]' : 'bg-slate-100 border border-slate-200 shadow-sm'
          }`}
        >
          {[
            { id: 'all', label: 'All Skills', icon: Sparkles },
            { id: 'dev', label: 'Development & Support', icon: Code2 },
            { id: 'security', label: 'Cybersecurity & Pentest', icon: Shield },
            { id: 'design', label: 'Design & Graphics', icon: Palette },
            { id: 'db', label: 'Database & Data', icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`shrink-0 whitespace-nowrap flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer select-none active:scale-95 ${
                  isActive
                    ? isHalloween
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/40 font-bold'
                      : isChristmas
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/40 font-bold'
                      : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                    : isHalloween
                    ? 'text-orange-200 hover:text-white hover:bg-orange-900/40 bg-orange-950/20'
                    : isChristmas
                    ? 'text-emerald-200 hover:text-white hover:bg-emerald-900/40 bg-emerald-950/20'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-white/[0.06] bg-white/[0.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white bg-white/60'
                }`}
              >
                <Icon size={13} className={isActive ? 'text-white' : isHalloween ? 'text-orange-400' : isChristmas ? 'text-emerald-400' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Scroll tabs right"
          title="Scroll options right"
          className={`shrink-0 p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-90 ${
            isHalloween
              ? 'bg-orange-950/40 hover:bg-orange-900/60 text-orange-200 border border-orange-500/30'
              : isChristmas
              ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-500/30'
              : isDark
              ? 'bg-white/[0.05] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10'
              : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 shadow-sm'
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Skills Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 w-full min-w-0"
        >
          {displayedSkills.map((skill) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              key={skill.name}
              className={`relative overflow-hidden p-5 flex flex-col justify-between group hover:-translate-y-1 transition-all h-full rounded-2xl border ${
                isHalloween
                  ? 'bg-[#140A1F]/90 border-orange-500/25 hover:border-orange-500/50 shadow-xl shadow-orange-950/40'
                  : isChristmas
                  ? 'bg-[#07192B]/90 border-emerald-500/25 hover:border-emerald-500/50 shadow-xl shadow-emerald-950/40'
                  : isDark
                  ? 'bg-[#0D1424] border-white/[0.08] hover:border-indigo-500/40'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-400'
              }`}
            >
              <CardBorderDecoration />
              <div className="space-y-4">
                {/* Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 border ${
                    isDark ? skill.iconBg : 'bg-slate-50 border-slate-200'
                  } group-hover:scale-110 transition-transform`}>
                    <SkillIconRenderer skill={skill} />
                  </div>

                  <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                    isHalloween
                      ? 'text-orange-300 bg-orange-950/40 border-orange-500/30'
                      : isChristmas
                      ? 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30'
                      : isDark
                      ? 'text-slate-400 bg-white/[0.03] border-white/[0.06]'
                      : 'text-slate-600 bg-slate-100 border-slate-200'
                  }`}>
                    {skill.categoryLabel}
                  </span>
                </div>

                {/* Skill Name & Role */}
                <div>
                  <h3 className={`text-base font-bold transition-colors ${
                    isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
                  }`}>
                    {skill.name}
                  </h3>
                  <p className={`text-xs font-semibold mt-0.5 ${
                    isHalloween ? 'text-orange-400' : isChristmas ? 'text-emerald-400' : isDark ? 'text-indigo-400/90' : 'text-indigo-600 font-medium'
                  }`}>{skill.role}</p>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* View All / Show Less Toggle Button */}
      {filteredSkills.length > 8 && (
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-xl active:scale-95 ${
              isHalloween
                ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 hover:from-orange-500 hover:to-amber-500 text-white shadow-orange-600/35 border border-orange-400/40'
                : isChristmas
                ? 'bg-gradient-to-r from-red-600 via-red-500 to-emerald-600 hover:from-red-500 hover:to-emerald-500 text-white shadow-red-600/35 border border-red-400/40'
                : isDark
                ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30 border border-indigo-400/40'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25'
            }`}
          >
            <span>{showAll ? 'Show Fewer Skills' : `View All Skills (${filteredSkills.length})`}</span>
            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

