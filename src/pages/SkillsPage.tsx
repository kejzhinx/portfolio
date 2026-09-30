import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Terminal,
  Shield,
  Palette,
  Database,
  Code2,
  Cpu,
  Search,
  Radar,
  ShieldAlert,
  FolderSearch,
  Video,
  Layers,
  Network,
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
  const [activeTab, setActiveTab] = useState<'all' | 'dev' | 'security' | 'design' | 'db'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const skills: SkillItem[] = [
    // Development Stack
    {
      name: 'Java',
      category: 'dev',
      categoryLabel: 'Development',
      role: 'OOP & Android Core',
      iconBg: 'bg-[#EA2D2E]/10 border-[#EA2D2E]/30',
      textColor: 'text-[#EA2D2E]',
      iconUrl: 'https://cdn.simpleicons.org/openjdk/white',
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
      iconUrl: 'https://cdn.simpleicons.org/kotlin/white',
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
      iconUrl: 'https://cdn.simpleicons.org/androidstudio/white',
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
      iconUrl: 'https://cdn.simpleicons.org/php/white',
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
      iconUrl: 'https://cdn.simpleicons.org/mysql/white',
      fallbackIcon: Database,
      description: 'Relational schema design, complex query optimization, transactions, and database security.'
    },
    {
      name: 'JavaScript',
      category: 'dev',
      categoryLabel: 'Development',
      role: 'Web Scripting & ES6+',
      iconBg: 'bg-[#F7DF1E]/10 border-[#F7DF1E]/30',
      textColor: 'text-[#F7DF1E]',
      iconUrl: 'https://cdn.simpleicons.org/javascript/white',
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
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain.svg',
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
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain.svg',
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
      iconUrl: 'https://cdn.simpleicons.org/tailwindcss/white',
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
      iconUrl: 'https://cdn.simpleicons.org/git/white',
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
      iconUrl: 'https://cdn.simpleicons.org/python/white',
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
      iconUrl: 'https://cdn.simpleicons.org/react/white',
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
      iconUrl: 'https://cdn.simpleicons.org/burpsuite/white',
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
      iconUrl: 'https://cdn.simpleicons.org/metasploit/white',
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
      iconUrl: 'https://cdn.simpleicons.org/wireshark/white',
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
  ];

  const filteredSkills = skills.filter((item) => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-4 mb-10"
      >
        <div className="badge-pill">
          <Sparkles size={14} className="text-indigo-400" />
          <span>My Skills</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Technologies I <span className="text-gradient">Work With</span>
        </h1>

        <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          A combination of modern programming languages, security assessment utilities, and creative design tools to build responsive, secure, and visually appealing applications.
        </p>
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.08]">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
          {[
            { id: 'all', label: 'All Skills' },
            { id: 'dev', label: 'Development' },
            { id: 'security', label: 'Cybersecurity & Pentest' },
            { id: 'design', label: 'Design & Graphics' },
            { id: 'db', label: 'Database & Data' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-indigo-500/50 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              className="card-surface p-5 flex flex-col justify-between group hover:border-indigo-500/40 hover:-translate-y-1 transition-all h-full"
            >
              <div className="space-y-4">
                {/* Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center p-2.5 border ${skill.iconBg} group-hover:scale-110 transition-transform`}>
                    <SkillIconRenderer skill={skill} />
                  </div>

                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 bg-white/[0.03] px-2.5 py-1 rounded-md border border-white/[0.06]">
                    {skill.categoryLabel}
                  </span>
                </div>

                {/* Skill Name & Role */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400/90 mt-0.5">{skill.role}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed">{skill.description}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
