import { useState, useEffect, useRef, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  Sparkles,
  X,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Layers,
  Zap,
  Laptop,
  ShieldCheck,
  Palette,
  Globe,
  Filter
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import FloatingCyberObjects from '../components/FloatingCyberObjects';

interface ProjectItem {
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
  videoDuration?: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  features?: string[];
  highlights?: string;
  underDevelopment?: boolean;
  developmentOngoing?: boolean;
}


// ----------------------------------------------------------------------
// Interactive 3D Holographic Card with Mouse Tilt & Specular Glare
// ----------------------------------------------------------------------
function ProjectCard3D({
  project,
  priority,
  onOpenModal,
}: {
  key?: string;
  project: ProjectItem;
  priority?: boolean;
  onOpenModal: (project: ProjectItem) => void;
}) {
  const { isDark } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [coords, setCoords] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !project.videoUrl) return;

    if (!('IntersectionObserver' in window)) {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [project.videoUrl]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth physical 3D tilt (max ~8.5 degrees)
    const rotateX = ((y - centerY) / centerY) * -8.5;
    const rotateY = ((x - centerX) / centerX) * 8.5;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setCoords({ rotateX, rotateY, glareX, glareY, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords((prev) => ({ ...prev, rotateX: 0, rotateY: 0, opacity: 0 }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="relative h-full select-none"
      style={{ perspective: 1200 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenModal(project)}
        style={{
          transform: `rotateX(${coords.rotateX}deg) rotateY(${coords.rotateY}deg) ${
            isHovered ? 'scale3d(1.025, 1.025, 1.025)' : 'scale3d(1, 1, 1)'
          }`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`relative flex flex-col justify-between h-full rounded-2xl sm:rounded-3xl border transition-all duration-300 group will-change-transform cursor-pointer overflow-hidden ${
          isDark
            ? 'bg-gradient-to-b from-[#0F1733]/95 via-[#0A1024]/95 to-[#060A17]/98 border-white/[0.12] hover:border-indigo-400/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_-15px_rgba(99,102,241,0.45)] text-white'
            : 'bg-white border-slate-300 hover:border-indigo-500/60 shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.25)] text-slate-900'
        }`}
      >
        {/* 3D Ambient Neon Underglow */}
        <div
          className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-600/30 via-violet-600/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"
          style={{ transform: 'translateZ(-20px)' }}
        />

        {/* Dynamic Specular Glare */}
        <div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none z-30 transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: coords.opacity,
            background: `radial-gradient(circle 340px at ${coords.glareX}% ${coords.glareY}%, rgba(255,255,255,${isDark ? 0.18 : 0.3}), transparent 70%)`,
          }}
        />

        <div>
          {/* 3D Elevated Screen Viewport Frame */}
          <div
            style={{ transform: 'translateZ(26px)' }}
            className={`aspect-video w-full relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl cursor-pointer group/screen border-b shadow-md ${
              isDark ? 'bg-[#030611] border-white/[0.1]' : 'bg-slate-100 border-slate-200/80'
            }`}
          >
            {/* Gloss reflection sheen */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none z-10" />

            {project.videoUrl ? (
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload={priority ? 'auto' : 'metadata'}
                  className="w-full h-full object-cover object-top group-hover/screen:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/screen:opacity-100 transition-all duration-300 scale-90 group-hover/screen:scale-100 z-20">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-indigo-500/40 blur-md animate-ping" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-[0_0_25px_rgba(99,102,241,0.8)] border border-white/30 backdrop-blur-md">
                      <Play size={18} className="ml-0.5 fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`relative w-full h-full flex items-center justify-center overflow-hidden p-3 ${
                isDark ? 'bg-gradient-to-b from-[#070D1E] to-[#030611]' : 'bg-gradient-to-b from-slate-100 to-slate-200/60'
              }`}>
                <img
                  src={project.image}
                  alt={project.title}
                  loading={priority ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-full object-contain group-hover/screen:scale-105 transition-transform duration-500 ease-out drop-shadow-md"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover/screen:opacity-100 transition-all duration-300 scale-90 group-hover/screen:scale-100 z-20">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 backdrop-blur-md border border-white/20">
                    <ArrowUpRight size={20} className="text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Floating Badges */}
            <div
              style={{ transform: 'translateZ(38px)' }}
              className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none z-20"
            >
              {project.featured ? (
                <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold shadow-md backdrop-blur-md ${
                  isDark
                    ? 'bg-indigo-950/90 border border-indigo-400/50 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                    : 'bg-indigo-600/90 border border-indigo-300/80 text-white shadow-indigo-500/30'
                }`}>
                  <Sparkles size={11} className={isDark ? 'text-indigo-400' : 'text-indigo-200'} />
                  <span>Featured</span>
                </div>
              ) : <div />}

              {(project.underDevelopment || project.developmentOngoing) && (
                <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold shadow-md backdrop-blur-md ml-auto ${
                  isDark
                    ? 'bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-emerald-600/90 border border-emerald-300/80 text-white shadow-emerald-500/30'
                }`}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Under Dev</span>
                </div>
              )}
            </div>
          </div>

          {/* Elevated Content */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="p-5 sm:p-6 pb-5 space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${
                  isDark
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300'
                    : 'text-indigo-600'
                }`}>
                  {project.categoryLabel}
                </span>
              </div>

              <h3 className={`text-base sm:text-lg font-bold transition-colors cursor-pointer mt-1 leading-snug ${
                isDark ? 'text-white group-hover:text-indigo-200' : 'text-slate-900 group-hover:text-indigo-600'
              }`}>
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2.5 items-center">
                {project.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className={`px-2 sm:px-2.5 py-0.5 rounded-lg text-[10px] font-semibold transition-all hover:-translate-y-0.5 shadow-sm ${
                      isDark
                        ? 'text-slate-300 bg-white/[0.04] hover:bg-indigo-500/20 border border-white/[0.08] hover:border-indigo-400/40'
                        : 'text-slate-700 bg-slate-100/90 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 5 && (
                  <span className={`text-[10px] font-mono ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    +{project.tags.length - 5}
                  </span>
                )}
              </div>
            </div>

            <p className={`text-xs leading-relaxed line-clamp-3 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div
          style={{ transform: 'translateZ(24px)' }}
          className={`px-5 sm:px-6 pb-5 pt-2.5 border-t flex items-center justify-between text-xs ${
            isDark ? 'border-white/[0.06]' : 'border-slate-200/80'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            className={`inline-flex items-center gap-1.5 font-semibold group/btn transition-colors cursor-pointer ${
              isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
            }`}
          >
            <span>View Details</span>
            <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1 transition-colors cursor-pointer ${
                isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe size={13} />
              <span className="text-[11px]">Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}



// ----------------------------------------------------------------------
// Main ProjectsPage Component
// ----------------------------------------------------------------------
export default function ProjectsPage() {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<'all' | 'development' | 'apps' | 'security' | 'graphics'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalMuted, setIsModalMuted] = useState(true);
  const [isModalPlaying, setIsModalPlaying] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const openProjectModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalPlaying(true);
  };

  const toggleModalPlay = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play();
        setIsModalPlaying(true);
      } else {
        modalVideoRef.current.pause();
        setIsModalPlaying(false);
      }
    }
  };

  const toggleModalMute = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = !modalVideoRef.current.muted;
      setIsModalMuted(modalVideoRef.current.muted);
    }
  };

  const toggleModalFullscreen = () => {
    if (modalVideoRef.current) {
      if (modalVideoRef.current.requestFullscreen) {
        modalVideoRef.current.requestFullscreen();
      }
    }
  };

  // Prevent background scroll on modal open
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
    // 1. Primary Featured Project
    {
      id: 'mark-aldrin-portfolio',
      title: 'Mark Aldrin Tejadilla — Executive VA & Operations Portfolio',
      subtitle: 'Aviation Rigor & Virtual Assistant Web Application',
      category: 'apps',
      categoryLabel: 'Executive VA & Operations Platform',
      featured: true,
      tags: ['Virtual Assistant', 'Operations & CRM', 'Data Entry', 'React', 'Tailwind CSS', 'Vercel'],
      description: 'An executive operations and administrative virtual assistant web platform for Mark Aldrin Balute Tejadilla, demonstrating aviation procedural rigor, CRM data logging, YouTube and social media scheduling, Canva multimedia, and flight credentials.',
      longDescription: 'Designed and engineered an executive virtual assistant portfolio and operations platform for Mark Aldrin Balute Tejadilla. Built to showcase military-grade aviation procedural discipline, CRM logging, time tracking, YouTube and social media publishing workflows, Canva multimedia assets, and interactive flight seminar certification archives.',
      image: '/image/mark_preview.png',
      videoUrl: '/assets/images/Screencast_From_2026-10-26_09-00-54_e02c80b5.mp4',
      videoDuration: '0:26',
      liveUrl: 'https://markaldrintejadilla.vercel.app',
      githubUrl: 'https://github.com/kejzhin/mark-aldrin-portfolio',
      features: [
        'Live system walkthrough showcasing responsive navigation and interactive operations',
        'Aviation Rigor & Procedural Discipline operational framework applied to executive virtual tasks',
        'CRM & Data Entry operations showcase with verified task completion metrics and time logs',
        'YouTube & Social Media multi-channel scheduling, metadata optimization, and calendar management',
        'Canva multimedia design asset library featuring high-impact visual banners and thumbnails',
        'Verified Flight Seminars, technical aviation certificates, and academic credentials database'
      ],
      highlights: 'Executive VA & Aviation Operations Platform • Live on Vercel'
    },

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
      videoUrl: '/assets/images/jamesbroker.mp4',
      liveUrl: 'https://jamesbroker.vercel.app/',
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
      videoUrl: '/assets/images/hookverse.mp4',
      liveUrl: 'https://hookverse.vercel.app/',
      features: [
        'Interactive coaching platform catalog with client scheduling and program dashboards',
        'Modular React component architecture with TypeScript and Tailwind CSS styling',
        'Responsive layout optimized for web and mobile client onboarding',
        'Live production deployment on Vercel'
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
      longDescription: 'Designed and developed an executive virtual assistant and accounts receivable portfolio for Valerie Cacananta. Features end-to-end billing workflows, client follow-up protocols, ACH/wire payment postings, payroll and statutory filings (SSS, Pag-IBIG, PhilHealth), and verified corporate track records across international education and enterprise management.',
      image: '/image/val1.png',
      videoUrl: '/assets/images/valerie.mp4',
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
      videoUrl: '/assets/images/ivysayongan.mp4',
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
      videoUrl: '/assets/images/mariabernadette.mp4',
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
      videoUrl: '/assets/images/katrinaregalado.mp4',
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
      videoUrl: '/assets/images/jwwebmail.mp4',
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
      videoUrl: '/assets/images/serenaheart.mp4',
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



  const categorySections = [
    {
      id: 'apps',
      title: 'Web Development & Applications',
      subtitle: 'Executive virtual assistant platforms, real estate applications, webmail servers, and enterprise software.',
      icon: Laptop,
      gradient: 'from-indigo-500 via-indigo-600 to-cyan-500',
      badgeBg: isDark ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-100 text-indigo-800 border-indigo-200',
      projects: projects.filter((p) => p.category === 'apps'),
    },
    {
      id: 'security',
      title: 'Cybersecurity & IT Infrastructure',
      subtitle: 'Information security consulting, web application penetration testing, and blockchain system audits.',
      icon: ShieldCheck,
      gradient: 'from-emerald-500 via-teal-600 to-cyan-500',
      badgeBg: isDark ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'bg-emerald-100 text-emerald-800 border-emerald-200',
      projects: projects.filter((p) => p.category === 'security'),
    },
    {
      id: 'graphics',
      title: 'Graphics Design & Visual Media',
      subtitle: 'Brand identity design, streetwear apparel art, editorial publication layouts, and e-commerce visual assets.',
      icon: Palette,
      gradient: 'from-violet-500 via-purple-600 to-fuchsia-500',
      badgeBg: isDark ? 'bg-violet-500/10 text-violet-300 border-violet-500/20' : 'bg-violet-100 text-violet-800 border-violet-200',
      projects: projects.filter((p) => p.category === 'graphics'),
    },
  ];

  const displayedSections = activeFilter === 'all'
    ? categorySections
    : activeFilter === 'development'
    ? [
        {
          id: 'development',
          title: 'Under Development Projects',
          subtitle: 'Active software initiatives currently in development with live previews.',
          icon: Zap,
          gradient: 'from-amber-500 via-orange-600 to-yellow-500',
          badgeBg: isDark ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 'bg-amber-100 text-amber-800 border-amber-200',
          projects: projects.filter((p) => p.underDevelopment || p.developmentOngoing),
        },
      ]
    : categorySections.filter((s) => s.id === activeFilter);

  return (
    <div className={`relative w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#070B14]' : 'bg-[#F8FAFC]'
    }`}>
      <FloatingCyberObjects />

      <div className="max-w-7xl mx-auto relative z-10">
      {/* Header Section */}
      <div className="space-y-3 mb-8 text-center sm:text-left">
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Featured <span className="text-gradient">Projects & Works</span>
        </h1>
        <p className={`text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed mt-2 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          An interactive 3D showcase of web applications, cybersecurity audits, and digital creations.
        </p>
      </div>

      {/* Interactive Filter Dock */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <div className={`relative inline-flex items-center gap-1.5 p-1.5 rounded-2xl backdrop-blur-xl border overflow-x-auto styled-scrollbar max-w-full ${
          isDark
            ? 'bg-[#090F21]/90 border-white/[0.12] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7)]'
            : 'bg-slate-100/90 border-slate-200/90 shadow-md'
        }`}>
          {[
            { id: 'all', label: 'All Projects', icon: Layers },
            {
              id: 'development',
              label: 'Under Development',
              icon: Zap,
              highlight: true,
            },
            {
              id: 'apps',
              label: 'Web Development',
              icon: Laptop,
            },
            {
              id: 'security',
              label: 'Cybersecurity',
              icon: ShieldCheck,
            },
            {
              id: 'graphics',
              label: 'Graphics Design',
              icon: Palette,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`relative px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-2 select-none active:scale-95 shrink-0 z-10 ${
                  isActive
                    ? 'text-white font-bold'
                    : isDark
                    ? 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter3DPills"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-[0_0_20px_rgba(99,102,241,0.55)] border border-indigo-300/40 -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon
                  size={14}
                  className={
                    isActive
                      ? 'text-white drop-shadow'
                      : tab.highlight
                      ? 'text-amber-500'
                      : 'text-indigo-500'
                  }
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped Category Sections */}
      <AnimatePresence mode="popLayout">
        <motion.div layout className="space-y-16">
          {displayedSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <section key={section.id} id={section.id} className="space-y-6">
                {/* Category Section Header */}
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                  isDark ? 'border-white/[0.1]' : 'border-slate-200'
                }`}>
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${section.gradient} text-white shadow-lg shadow-indigo-500/20 shrink-0`}>
                      <SectionIcon size={24} />
                    </div>
                    <div>
                      <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {section.title}
                      </h2>
                      <p className={`text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section Cards Grid */}
                {section.projects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {section.projects.map((project, idx) => (
                      <ProjectCard3D
                        key={project.id}
                        project={project}
                        priority={idx < 3}
                        onOpenModal={openProjectModal}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={`py-8 text-center rounded-2xl p-6 border ${
                    isDark ? 'bg-[#070D1E]/40 border-white/5 text-slate-400' : 'bg-white/80 border-slate-200 text-slate-600 shadow-sm'
                  }`}>
                    <p className="text-xs">No projects currently available in this category.</p>
                  </div>
                )}
              </section>
            );
          })}
        </motion.div>
      </AnimatePresence>
      </div>

      {/* Project Video & Image Theater Modal */}
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
                  className={`fixed inset-0 backdrop-blur-md z-0 ${
                    isDark ? 'bg-black/90' : 'bg-slate-900/60'
                  }`}
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 16 }}
                  transition={{ duration: 0.25 }}
                  className={`relative w-full max-w-3xl lg:max-w-4xl rounded-2xl shadow-2xl z-10 my-auto max-h-[90vh] flex flex-col overflow-hidden border ${
                    isDark
                      ? 'bg-[#090E1C] border-white/[0.14] text-white shadow-black/90'
                      : 'bg-white border-slate-200 text-slate-900 shadow-xl'
                  }`}
                >
                  {/* Modal Header Bar */}
                  <div className={`min-h-12 border-b px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 shrink-0 z-30 ${
                    isDark ? 'bg-[#0D1527] border-white/[0.08]' : 'bg-slate-100 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-xs sm:text-sm font-bold tracking-wide truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {selectedProject.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-md ${
                          isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        }`}
                        aria-label="Close modal"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Content */}
                  <div className="overflow-y-auto flex-1">
                    {/* VIDEO THEATER SCREEN */}
                    <div className={`w-full relative flex flex-col items-center justify-center border-b ${
                      isDark ? 'bg-black border-white/[0.08]' : 'bg-slate-950 border-slate-200'
                    }`}>
                      {selectedProject.videoUrl ? (
                        <div className="relative w-full aspect-video max-h-[56vh] bg-black flex items-center justify-center">
                          <video
                            ref={modalVideoRef}
                            src={selectedProject.videoUrl}
                            autoPlay
                            loop
                            playsInline
                            controls
                            controlsList="nodownload"
                            className="w-full h-full object-contain bg-black"
                            onPlay={() => setIsModalPlaying(true)}
                            onPause={() => setIsModalPlaying(false)}
                          />
                        </div>
                      ) : (
                        <div className={`relative w-full aspect-video max-h-[50vh] flex items-center justify-center overflow-hidden p-4 ${
                          isDark ? 'bg-[#050813]' : 'bg-slate-100'
                        }`}>
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="max-h-full max-w-full w-auto object-contain mx-auto rounded-lg shadow-2xl"
                          />
                        </div>
                      )}
                    </div>

                    {/* Quick Video Controls Bar */}
                    {selectedProject.videoUrl && (
                      <div className={`border-b px-4 sm:px-6 py-2 flex items-center justify-between text-xs ${
                        isDark
                          ? 'bg-[#0A1021] border-white/[0.06] text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={toggleModalPlay}
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${
                              isDark ? 'hover:text-white' : 'hover:text-slate-900'
                            }`}
                          >
                            {isModalPlaying ? <Pause size={14} /> : <Play size={14} />}
                            <span className="font-mono text-[11px]">{isModalPlaying ? 'Pause' : 'Play'}</span>
                          </button>
                          <button
                            onClick={toggleModalMute}
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${
                              isDark ? 'hover:text-white' : 'hover:text-slate-900'
                            }`}
                          >
                            {isModalMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            <span className="font-mono text-[11px]">{isModalMuted ? 'Unmute' : 'Mute'}</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={toggleModalFullscreen}
                            className="hover:text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer text-indigo-500 font-semibold"
                            title="Fullscreen"
                          >
                            <Maximize2 size={14} />
                            <span className="hidden sm:inline font-mono text-[11px]">Fullscreen</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Modal Details & Technical Narrative */}
                    <div className="p-5 sm:p-7 space-y-5">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-2 items-center">
                          {selectedProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-semibold border ${
                                isDark
                                  ? 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20'
                                  : 'text-indigo-800 bg-indigo-100/90 border-indigo-200'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <h2 className={`text-xl sm:text-2xl font-bold ${
                          isDark ? 'text-white' : 'text-slate-900'
                        }`}>
                          {selectedProject.title}
                        </h2>
                        {selectedProject.subtitle && (
                          <p className={`text-sm font-medium mt-0.5 ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                          }`}>
                            {selectedProject.subtitle}
                          </p>
                        )}
                      </div>

                      <p className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {selectedProject.longDescription}
                      </p>

                      {/* Key Highlights & Features */}
                      {selectedProject.features && selectedProject.features.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <h4 className={`text-xs font-bold uppercase tracking-wider ${
                            isDark ? 'text-indigo-400' : 'text-indigo-600'
                          }`}>
                            Key Features & Technical Breakdown
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {selectedProject.features.map((feat, i) => (
                              <div
                                key={i}
                                className={`flex items-start gap-2.5 text-xs p-2.5 rounded-xl border ${
                                  isDark
                                    ? 'text-slate-300 bg-white/[0.02] border-white/[0.05]'
                                    : 'text-slate-700 bg-slate-50 border-slate-200'
                                }`}
                              >
                                <CheckCircle2 size={15} className={`shrink-0 mt-0.5 ${
                                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                                }`} />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Modal Action Links */}
                      {(selectedProject.liveUrl || selectedProject.githubUrl || selectedProject.playStoreUrl) && (
                        <div className={`pt-4 border-t flex flex-wrap items-center gap-3 ${
                          isDark ? 'border-white/[0.08]' : 'border-slate-200'
                        }`}>
                          {selectedProject.liveUrl && (
                            <a
                              href={selectedProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <span>Visit Live Platform</span>
                              <ExternalLink size={14} />
                            </a>
                          )}
                          {selectedProject.githubUrl && (
                            <a
                              href={selectedProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 border font-medium text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                                isDark
                                  ? 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border-white/10'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                              }`}
                            >
                              <Github size={14} />
                              <span>View Source on GitHub</span>
                            </a>
                          )}
                          {selectedProject.playStoreUrl && (
                            <a
                              href={selectedProject.playStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 border font-medium text-xs px-4 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                                isDark
                                  ? 'bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border-white/10'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                              }`}
                            >
                              <Play size={14} />
                              <span>Google Play Store</span>
                            </a>
                          )}
                        </div>
                      )}

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
