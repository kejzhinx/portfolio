import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function HomePage() {
  const { isDark } = useTheme();
  const [activeClickId, setActiveClickId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickFeedback, setClickFeedback] = useState<{ id: string; text: string } | null>(null);

  // Synthesized delightful pop sound using Web Audio API
  const playPopSound = (pitch = 440) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.55, ctx.currentTime + 0.11);
      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
      setTimeout(() => {
        try {
          ctx.close().catch(() => {});
        } catch {
          // ignore
        }
      }, 250);
    } catch {
      // AudioContext unavailable or muted - safely ignore
    }
  };

  const handleIconClick = (
    e: MouseEvent,
    id: string,
    actionLabel: string,
    pitch: number,
    href?: string
  ) => {
    playPopSound(pitch);
    setActiveClickId(id);
    setClickFeedback({ id, text: actionLabel });

    if (id === 'discord') {
      try {
        navigator.clipboard?.writeText('kejzhin');
      } catch {
        // clipboard fallback
      }
    }

    if (id === 'gmail') {
      e.preventDefault();
      try {
        navigator.clipboard?.writeText('jericdelosreyes127001@gmail.com');
      } catch {
        // clipboard fallback
      }
      setTimeout(() => {
        if (href) {
          window.location.href = href;
        }
      }, 650);
    }

    setTimeout(() => {
      setActiveClickId((prev) => (prev === id ? null : prev));
    }, 800);

    setTimeout(() => {
      setClickFeedback((prev) => (prev?.id === id ? null : prev));
    }, 2400);
  };

  return (
    <div className={`relative min-h-[calc(100vh-76px)] flex items-center justify-center pt-24 sm:pt-28 lg:pt-0 pb-12 lg:pb-0 px-4 sm:px-6 lg:px-10 overflow-x-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#070B14]' : 'bg-[#F8FAFC]'
    }`}>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center relative z-10 py-6 lg:py-12">
        {/* Left Column: Text & Call-To-Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 w-full order-2 lg:order-1">
          {/* Greeting Badge */}
          <div className="badge-pill">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-600 dark:text-indigo-300 font-semibold tracking-wide text-xs sm:text-sm">Hello, I'm</span>
          </div>

          {/* Headline & Title */}
          <div className="space-y-2 w-full">
            <h1 className={`text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12] ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Jeric M. De Los Reyes
            </h1>
            <p className={`text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight leading-snug ${
              isDark ? 'text-slate-200' : 'text-slate-800'
            }`}>
              <span className="text-gradient">Cybersecurity</span> &{' '}
              <span className="text-gradient">Creative Technology Specialist</span>
            </p>
          </div>

          {/* Description */}
          <p className={`text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal text-center lg:text-left ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            I build digital solutions and create meaningful experiences through code, design, and technology. Specializing in Web Penetration Testing, Full-Stack Development, and Visual Brand Design.
          </p>

          {/* Call to Actions - Responsive side-by-side on desktop */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 w-full sm:w-auto">
            <Link
              to="/projects"
              className="btn-primary group w-full sm:w-auto px-7 py-3 text-center justify-center"
            >
              <span>View My Projects</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="btn-secondary group w-full sm:w-auto px-7 py-3 text-center justify-center"
            >
              <Mail size={16} className="text-indigo-500 group-hover:text-indigo-600 dark:text-indigo-400 dark:group-hover:text-indigo-300 transition-colors" />
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Social Links Row */}
          <div className={`flex items-center justify-center lg:justify-start gap-4 pt-5 border-t w-full max-w-xl ${
            isDark ? 'border-white/[0.08]' : 'border-slate-200'
          }`}>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/kejzhin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/60 hover:bg-white/[0.08] text-slate-300 hover:text-white'
                    : 'bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 shadow-sm'
                }`}
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/60 hover:bg-white/[0.08] text-slate-300 hover:text-white'
                    : 'bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 shadow-sm'
                }`}
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:jericdelosreyes127001@gmail.com"
                aria-label="Email"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/60 hover:bg-white/[0.08] text-slate-300 hover:text-white'
                    : 'bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 shadow-sm'
                }`}
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center w-full order-1 lg:order-2">
          {/* Main Visual Frame */}
          <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[460px] xl:max-w-[500px] aspect-[4/5] lg:aspect-[3/4] flex items-center justify-center mx-auto">
            {/* Electric Blue Mystical Portal Outer Radiance */}
            <div
              className="absolute w-[86%] sm:w-[84%] h-[92%] sm:h-[90%] rounded-[140px] sm:rounded-[185px] lg:rounded-[205px] pointer-events-none blur-[28px] sm:blur-[38px] opacity-85 z-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.3) 0%, rgba(99, 102, 241, 0.55) 60%, rgba(59, 130, 246, 0.7) 100%)',
              }}
            />

            {/* Electric Blue Portal Rim (Whole perimeter continuous glowing mystical energy) */}
            <div
              className="absolute w-[80%] sm:w-[78%] h-[88%] sm:h-[86%] rounded-[130px] sm:rounded-[170px] lg:rounded-[190px] pointer-events-none p-[3px] sm:p-[3.5px] overflow-hidden z-0"
              style={{
                boxShadow: '0 0 30px rgba(0, 240, 255, 0.8), 0 0 65px rgba(99, 102, 241, 0.6), 0 0 95px rgba(59, 130, 246, 0.4), inset 0 0 25px rgba(99, 102, 241, 0.5)',
              }}
            >
              {/* Electric Plasma Layer 1: Clockwise Swirling Cyan & Indigo Energy */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-160%] pointer-events-none"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  background: `conic-gradient(
                    from 0deg,
                    #00F0FF 0deg,
                    #3B82F6 25deg,
                    #E0E7FF 50deg,
                    #6366F1 75deg,
                    #38BDF8 100deg,
                    #818CF8 130deg,
                    #FFFFFF 160deg,
                    #2563EB 190deg,
                    #00F0FF 220deg,
                    #6366F1 250deg,
                    #E0F2FE 280deg,
                    #1D4ED8 310deg,
                    #38BDF8 335deg,
                    #00F0FF 360deg
                  )`,
                  opacity: 0.95,
                }}
              />

              {/* Electric Plasma Layer 2: Counter-Clockwise Crackling White-Hot Lightning Arcs */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-[-160%] pointer-events-none mix-blend-screen"
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                  background: `conic-gradient(
                    from 30deg,
                    #FFFFFF 0deg,
                    rgba(0, 240, 255, 0.3) 25deg,
                    #6366F1 55deg,
                    #FFFFFF 85deg,
                    rgba(59, 130, 246, 0.25) 115deg,
                    #00F0FF 145deg,
                    #818CF8 175deg,
                    #FFFFFF 205deg,
                    rgba(147, 197, 253, 0.25) 235deg,
                    #38BDF8 265deg,
                    #FFFFFF 295deg,
                    #6366F1 325deg,
                    #FFFFFF 360deg
                  )`,
                  opacity: 0.9,
                }}
              />

              {/* Inner Portal Gateway (Deep Theme Navy/Indigo Chamber) */}
              <div
                className={`relative w-full h-full rounded-[127px] sm:rounded-[167px] lg:rounded-[187px] overflow-hidden ${
                  isDark
                    ? 'bg-gradient-to-b from-[#1E1B4B] via-[#2E2875] to-[#17133D]'
                    : 'bg-gradient-to-b from-[#312E81] via-[#3730A3] to-[#1E1B4B]'
                }`}
                style={{
                  boxShadow: 'inset 0 0 35px rgba(0, 240, 255, 0.4), inset 0 0 70px rgba(99, 102, 241, 0.35)',
                }}
              >
                {/* Inner Ambient Glow & Cosmic Light */}
                <div className="absolute inset-0 bg-radial from-cyan-400/15 via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-200/[0.08] to-indigo-400/20 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-cyan-300/15 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Circling Electric Doctor Strange Spark Animation */}
            <svg
              className="absolute w-[80%] sm:w-[78%] h-[88%] sm:h-[86%] pointer-events-none overflow-visible z-20"
              viewBox="0 0 300 380"
              preserveAspectRatio="none"
              style={{
                willChange: 'transform',
                transform: 'translateZ(0)',
              }}
            >
              <defs>
                {/* Optimized Electric Spark Glow Filter */}
                <filter id="portalSparkGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Circling Spark - Wide Cyan Diffuse Energy Aura */}
              <motion.rect
                x="3"
                y="3"
                width="294"
                height="374"
                rx="130"
                ry="130"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="7"
                strokeLinecap="round"
                strokeOpacity="0.45"
                pathLength="100"
                strokeDasharray="22 78"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
              />

              {/* Circling Spark - Electric Blue Comet Tail */}
              <motion.rect
                x="3"
                y="3"
                width="294"
                height="374"
                rx="130"
                ry="130"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="16 84"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                filter="url(#portalSparkGlow)"
              />

              {/* Circling Spark - White-Hot Blazing Spark Core */}
              <motion.rect
                x="3"
                y="3"
                width="294"
                height="374"
                rx="130"
                ry="130"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="5 95"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                filter="url(#portalSparkGlow)"
              />

              {/* Trailing Crackling Spark Ember (Secondary sparklet chasing closely behind) */}
              <motion.rect
                x="3"
                y="3"
                width="294"
                height="374"
                rx="130"
                ry="130"
                fill="none"
                stroke="#00F0FF"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="2 98"
                animate={{ strokeDashoffset: [7, -93] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
                filter="url(#portalSparkGlow)"
              />
            </svg>

            {/* Grounding Floor Shadow */}
            <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-6 blur-md rounded-full pointer-events-none z-0 ${
              isDark ? 'bg-black/60' : 'bg-slate-900/30'
            }`} />

            {/* Cutout Portrait Image */}
            <div
              className="absolute inset-0 z-10 flex items-end justify-center overflow-visible pointer-events-none"
              style={{
                transform: 'translateZ(0)',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <img
                src="/profile.webp"
                alt="Jeric M. De Los Reyes"
                fetchPriority="high"
                decoding="sync"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.retried) {
                    target.dataset.retried = 'true';
                    target.src = '/profile.webp?retry=' + Date.now();
                  }
                }}
                className={`w-full h-full object-contain object-bottom select-none pointer-events-none ${
                  isDark ? 'drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]' : 'drop-shadow-[0_20px_35px_rgba(30,27,75,0.4)]'
                }`}
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              />

              {/* Floating Social Media & Tech Icons Scattered (Sabog-Sabog) Organic Constellation */}
              {[
                {
                  id: 'discord',
                  name: 'Discord',
                  actionLabel: '💬 Discord @kejzhin Copied!',
                  category: 'Community',
                  x: '2%',
                  y: '68%',
                  rot: -7,
                  floatY: 5,
                  floatX: 3,
                  duration: 5.2,
                  delay: 0.1,
                  pitch: 340,
                  accentColor: '#5865F2',
                  bg: 'bg-[#5865F2]',
                  border: 'border border-[#7289DA]/50',
                  rounded: 'rounded-2xl',
                  icon: (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  ),
                },
                {
                  id: 'github',
                  name: 'GitHub',
                  actionLabel: '🚀 Opening GitHub @kejzhin...',
                  category: 'Code',
                  href: 'https://github.com/kejzhin',
                  x: '10%',
                  y: '44%',
                  rot: 5,
                  floatY: 4,
                  floatX: 2,
                  duration: 4.1,
                  delay: 0.6,
                  pitch: 390,
                  accentColor: '#E6EDF3',
                  bg: 'bg-[#181717]',
                  border: 'border border-white/20',
                  rounded: 'rounded-full',
                  icon: (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017C2 16.446 4.87 20.198 8.84 21.52C9.34 21.61 9.53 21.3 9.53 21.03C9.53 20.79 9.52 19.99 9.52 19.14C6.73 19.75 6.14 17.8 6.14 17.8C5.68 16.64 5.03 16.33 5.03 16.33C4.12 15.71 5.1 15.72 5.1 15.72C6.1 15.79 6.63 16.76 6.63 16.76C7.52 18.29 8.97 17.85 9.54 17.59C9.63 16.94 9.89 16.5 10.18 16.25C7.95 16 5.6 15.14 5.6 11.31C5.6 10.22 5.99 9.32 6.63 8.63C6.53 8.38 6.18 7.36 6.73 5.99C6.73 5.99 7.57 5.72 9.48 7.01C10.28 6.79 11.13 6.68 11.98 6.68C12.83 6.68 13.68 6.79 14.48 7.01C16.39 5.72 17.23 5.99 17.23 5.99C17.78 7.36 17.43 8.38 17.33 8.63C17.97 9.32 18.36 10.22 18.36 11.31C18.36 15.15 16 16 13.77 16.25C14.13 16.56 14.46 17.18 14.46 18.13C14.46 19.49 14.45 20.59 14.45 20.92C14.45 21.19 14.64 21.51 15.15 21.41C19.13 20.08 22 16.34 22 11.917C22 6.484 17.522 2 12 2Z" />
                    </svg>
                  ),
                },
                {
                  id: 'upwork',
                  name: 'Upwork',
                  actionLabel: '💼 Upwork • Hire @kejzhin',
                  category: 'Freelance',
                  href: 'https://www.upwork.com',
                  x: '2%',
                  y: '20%',
                  rot: -4,
                  floatY: 6,
                  floatX: 3,
                  duration: 5.4,
                  delay: 1.0,
                  pitch: 440,
                  accentColor: '#14A800',
                  bg: 'bg-[#14A800]',
                  border: 'border border-emerald-400/40',
                  rounded: 'rounded-xl',
                  icon: (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white">
                      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-3.13 0-5.467 2.122-6.284 5.372-1.745-2.28-2.617-4.887-2.923-7.39H6.35c.348 3.526 1.635 6.953 3.791 9.771l-1.396 6.578H5.74V7h-3v12.35h3.004l1.196-5.636c1.17 1.054 2.61 1.768 4.225 1.954l-1.29 6.074h3.053l1.248-5.882c.983.313 2.052.484 3.197.484 3.737 0 6.776-3.04 6.776-6.776 0-3.734-3.04-6.748-6.776-6.748z" />
                    </svg>
                  ),
                },
                {
                  id: 'fiverr',
                  name: 'Fiverr',
                  actionLabel: '✨ Fiverr • Order Gigs @kejzhin',
                  category: 'Freelance',
                  href: 'https://www.fiverr.com',
                  x: '28%',
                  y: '7%',
                  rot: 6,
                  floatY: 5,
                  floatX: 2,
                  duration: 4.4,
                  delay: 0.3,
                  pitch: 490,
                  accentColor: '#1DBF73',
                  bg: 'bg-[#1DBF73]',
                  border: 'border border-emerald-300/40',
                  rounded: 'rounded-xl',
                  icon: (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white">
                      <path d="M4 11.5h2.5V8.5h3v3h2.5v2.5H9.5V20H6.5v-6H4v-2.5z" />
                      <circle cx="8" cy="5.5" r="1.5" />
                      <path d="M19 14h-4.5c0 1.2.7 1.8 1.8 1.8.8 0 1.4-.4 1.7-.9h1.9c-.4 1.6-1.8 2.6-3.6 2.6-2.4 0-3.8-1.6-3.8-4.2s1.4-4.3 3.8-4.3c2.3 0 3.7 1.7 3.7 4.2v.8zm-2-1.5c0-1-.6-1.6-1.6-1.6s-1.6.6-1.6 1.6h3.2z" />
                      <circle cx="21" cy="17" r="1.2" />
                    </svg>
                  ),
                },
                {
                  id: 'linkedin',
                  name: 'LinkedIn',
                  actionLabel: '💼 Opening LinkedIn Profile...',
                  category: 'Career',
                  href: 'https://linkedin.com',
                  x: '72%',
                  y: '7%',
                  rot: 5,
                  floatY: 5,
                  floatX: 2,
                  duration: 4.2,
                  delay: 0.4,
                  pitch: 590,
                  accentColor: '#0A66C2',
                  bg: 'bg-[#0A66C2]',
                  rounded: 'rounded-xl',
                  icon: (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white">
                      <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2C18.5 10.62 17.11 9.42 15.27 9.42C13.79 9.42 13.13 10.23 12.76 10.8V9.63H10.08V18.5H12.76V13.88C12.76 12.66 13 11.48 14.5 11.48C16 11.48 16.03 12.87 16.03 13.96V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V9.63H5.49V18.5H8.27Z" />
                    </svg>
                  ),
                },
                {
                  id: 'gmail',
                  name: 'Gmail',
                  actionLabel: '📋 Email Copied! Opening Mail...',
                  category: 'Contact',
                  href: 'mailto:jericdelosreyes127001@gmail.com',
                  x: '94%',
                  y: '22%',
                  rot: -5,
                  floatY: 6,
                  floatX: 3,
                  duration: 5.3,
                  delay: 0.8,
                  pitch: 650,
                  accentColor: '#EA4335',
                  bg: 'bg-white',
                  border: 'border border-slate-200/90',
                  rounded: 'rounded-full',
                  icon: (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 48 48">
                      <path fill="#4caf50" d="M45,16.2l-5,2.75v19.05c0,2.21-1.79,4-4,4h-4V22.5L45,16.2z" />
                      <path fill="#1e88e5" d="M3,16.2l5,2.75v19.05c0,2.21,1.79,4,4,4h4V22.5L3,16.2z" />
                      <path fill="#e53935" d="M35,11.2l-11,8.3l-11-8.3v-2.7c0-2.21,1.79-4,4-4h14c2.21,0,4,1.79,4,4V11.2z" />
                      <path fill="#c62828" d="M35,8.5v2.7l10,5V11.2c0-2.21-1.79-4-4-4h-6" />
                      <path fill="#fbc02d" d="M13,8.5v2.7l-10,5V11.2c0-2.21,1.79-4,4-4h6" />
                    </svg>
                  ),
                },
                {
                  id: 'facebook',
                  name: 'Facebook',
                  actionLabel: '🌐 Opening Facebook @kejzhin...',
                  category: 'Social',
                  href: 'https://facebook.com/kejzhin',
                  x: '96%',
                  y: '68%',
                  rot: -6,
                  floatY: 5,
                  floatX: 3,
                  duration: 4.8,
                  delay: 0.5,
                  pitch: 780,
                  accentColor: '#1877F2',
                  bg: 'bg-[#1877F2]',
                  rounded: 'rounded-full',
                  icon: (
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="white">
                      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.413C10.125 6.387 11.917 4.715 14.658 4.715C15.97 4.715 17.344 4.952 17.344 4.952V7.931H15.83C14.34 7.931 13.875 8.863 13.875 9.821V12.073H17.203L16.671 15.563H13.875V24C19.612 23.094 24 18.1 24 12.073Z" />
                    </svg>
                  ),
                },
              ].map((item) => {
                const isClicked = activeClickId === item.id;
                const isHovered = hoveredId === item.id;
                const Component = item.href ? motion.a : motion.button;
                const componentProps = item.href
                  ? {
                      href: item.href,
                      target: item.id === 'gmail' ? undefined : '_blank',
                      rel: item.id === 'gmail' ? undefined : 'noopener noreferrer',
                    }
                  : {
                      type: 'button' as const,
                    };

                return (
                  <Component
                    key={item.id}
                    {...componentProps}
                    style={{
                      left: item.x,
                      top: item.y,
                      willChange: 'transform',
                      transform: 'translateZ(0)',
                      boxShadow: isClicked
                        ? `0 0 28px ${item.accentColor}, 0 10px 24px rgba(0,0,0,0.5)`
                        : isHovered
                        ? `0 12px 28px -4px ${item.accentColor}90, 0 0 20px ${item.accentColor}60`
                        : undefined,
                    }}
                    animate={
                      isClicked
                        ? {
                            scale: [1, 0.85, 1.22, 1],
                            rotate: [item.rot, item.rot - 12, item.rot + 8, item.rot],
                          }
                        : isHovered
                        ? {
                            scale: 1.18,
                            y: -8,
                            rotate: item.rot,
                          }
                        : {
                            scale: 1,
                            y: [-item.floatY, item.floatY, -item.floatY],
                            x: [-item.floatX, item.floatX, -item.floatX],
                            rotate: [item.rot - 1.5, item.rot + 1.5, item.rot - 1.5],
                          }
                    }
                    transition={
                      isClicked
                        ? { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }
                        : isHovered
                        ? { type: 'spring', stiffness: 450, damping: 18 }
                        : { duration: item.duration, repeat: Infinity, ease: 'easeInOut', delay: item.delay }
                    }
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId((prev) => (prev === item.id ? null : prev))}
                    onClick={(e) => handleIconClick(e, item.id, item.actionLabel, item.pitch, item.href)}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-11 sm:h-11 ${item.rounded} ${item.bg} ${item.border || ''} shadow-lg shadow-black/40 cursor-pointer select-none pointer-events-auto transition-shadow`}
                    aria-label={item.name}
                  >
                    {/* Expanding Ripple Shockwave on Click */}
                    {isClicked && (
                      <motion.span
                        key="click-ripple"
                        initial={{ scale: 0.8, opacity: 0.85 }}
                        animate={{ scale: 2.2, opacity: 0 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        style={{ borderColor: item.accentColor }}
                        className={`absolute inset-0 ${item.rounded} border-2 pointer-events-none`}
                      />
                    )}

                    {/* Smooth Radiant Aura on Hover (Replaces the distracting dashed border) */}
                    {isHovered && !isClicked && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1.12 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background: `radial-gradient(circle, ${item.accentColor}40 0%, transparent 75%)`,
                          boxShadow: `0 0 20px ${item.accentColor}60`,
                        }}
                        className={`absolute -inset-1.5 ${item.rounded} pointer-events-none`}
                      />
                    )}

                    {/* Icon SVG with real authentic colors */}
                    <span className="relative z-10 flex items-center justify-center">
                      {item.icon}
                    </span>

                    {/* Hover Tooltip (when not clicked) */}
                    {!isClicked && (
                      <div className={`absolute ${
                        parseInt(item.y) <= 12 ? 'top-full mt-2.5' : 'bottom-full mb-2.5'
                      } left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none shadow-2xl bg-slate-950/95 text-white border border-white/10 z-40 flex items-center gap-1.5`}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.accentColor }} />
                        <span>{item.name}</span>
                      </div>
                    )}

                    {/* Click Feedback Toast Chip */}
                    <AnimatePresence>
                      {clickFeedback?.id === item.id && (
                        <motion.div
                          initial={{ opacity: 0, y: parseInt(item.y) <= 12 ? -6 : 6, scale: 0.9 }}
                          animate={{ opacity: 1, y: parseInt(item.y) <= 12 ? 14 : -14, scale: 1 }}
                          exit={{ opacity: 0, y: parseInt(item.y) <= 12 ? 20 : -20, scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                          style={{
                            top: parseInt(item.y) <= 12 ? '100%' : undefined,
                            bottom: parseInt(item.y) <= 12 ? undefined : '100%',
                          }}
                          className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/95 text-white text-[10px] sm:text-xs font-bold shadow-2xl border border-indigo-400/60 whitespace-nowrap z-50 flex items-center gap-1.5 pointer-events-none"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          {clickFeedback.text}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Component>
                );
              })}

              {/* Floating "Available for Work" Status Badge on Picture */}
              <div className={`absolute bottom-6 sm:bottom-8 left-1 sm:-left-3 lg:-left-6 z-20 flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full backdrop-blur-md border text-[11px] sm:text-xs font-semibold select-none hover:scale-105 transition-all ${
                isDark
                  ? 'bg-[#0D1424]/90 border-emerald-500/30 text-emerald-400 shadow-2xl shadow-black/80'
                  : 'bg-white/95 border-emerald-500/40 text-emerald-600 shadow-xl shadow-indigo-900/10'
              }`}>
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
                </span>
                <span>Available for Work</span>
              </div>

              {/* Handwritten Floating Text Badge */}
              <div className="absolute -top-4 sm:-top-6 right-[-2px] sm:right-[-6px] lg:right-[-10px] z-10 pointer-events-none select-none text-right">
                <div className="flex flex-col items-end rotate-6">
                  <span className={`font-['Caveat',cursive] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-wide ${
                    isDark
                      ? 'text-indigo-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]'
                      : 'text-indigo-600 drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]'
                  }`}>
                    Code
                  </span>
                  <span className={`font-['Caveat',cursive] text-2xl sm:text-4xl lg:text-5xl font-bold -mt-1 sm:-mt-2 tracking-wide ${
                    isDark
                      ? 'text-violet-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]'
                      : 'text-violet-600 drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]'
                  }`}>
                    Design
                  </span>
                  <span className={`font-['Caveat',cursive] text-2xl sm:text-4xl lg:text-5xl font-bold -mt-1 sm:-mt-2 tracking-wide ${
                    isDark
                      ? 'text-blue-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]'
                      : 'text-blue-600 drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)]'
                  }`}>
                    Build
                  </span>
                  <svg className={`w-14 sm:w-20 lg:w-24 h-3 sm:h-4 mt-0.5 sm:mt-1 ${
                    isDark ? 'text-indigo-400' : 'text-indigo-600'
                  }`} viewBox="0 0 100 20" fill="none">
                    <path d="M5 10 Q 50 18, 95 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
