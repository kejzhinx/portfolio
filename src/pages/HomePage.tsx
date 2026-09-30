import { motion } from 'motion/react';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex items-center justify-center pt-24 sm:pt-28 lg:pt-0 pb-12 lg:pb-0 px-4 sm:px-6 lg:px-10 overflow-x-hidden bg-[#070B14]">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] lg:w-[600px] h-[280px] sm:h-[500px] lg:h-[600px] bg-indigo-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] sm:w-[550px] lg:w-[650px] h-[300px] sm:h-[550px] lg:h-[650px] bg-violet-600/15 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[380px] sm:w-[700px] lg:w-[800px] h-[160px] sm:h-[260px] bg-blue-600/5 rounded-full blur-[110px] sm:blur-[160px] pointer-events-none" />

      {/* Subtle background tech grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center relative z-10 py-6 lg:py-12">
        {/* Left Column: Text & Call-To-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-6 w-full order-2 lg:order-1"
        >
          {/* Greeting Badge */}
          <div className="badge-pill">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 font-semibold tracking-wide text-xs sm:text-sm">Hello, I'm</span>
          </div>

          {/* Headline & Title */}
          <div className="space-y-2 w-full">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Jeric M. De Los Reyes
            </h1>
            <p className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-200 leading-snug">
              <span className="text-gradient">Penetration Tester</span> &{' '}
              <span className="text-gradient">Graphics Designer</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl font-normal text-center lg:text-left">
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
              <Mail size={16} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
              <span>Contact Me</span>
            </Link>
          </div>

          {/* Social Links Row */}
          <div className="flex items-center justify-center lg:justify-start gap-4 pt-5 border-t border-white/[0.08] w-full max-w-xl">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/kejzhin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/60 hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/60 hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:kejzhin@gmail.com"
                aria-label="Email"
                className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/60 hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all hover:scale-105"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Visual with Balanced Desktop Aura, Cutout, and Floating Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center w-full order-1 lg:order-2"
        >
          {/* Main Visual Frame */}
          <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[460px] xl:max-w-[500px] aspect-[4/5] lg:aspect-[3/4] flex items-center justify-center mx-auto">
            {/* Outer Glow Halo */}
            <div className="absolute w-[92%] h-[88%] rounded-full bg-indigo-600/25 blur-[45px] pointer-events-none" />

            {/* Glowing Backdrop Circle */}
            <div
              className="absolute w-[84%] h-[84%] rounded-full bg-gradient-to-tr from-[#2C2475] via-[#4338CA] to-[#6366F1] opacity-95 pointer-events-none border border-indigo-400/25"
              style={{
                boxShadow: '0 0 70px rgba(99, 102, 241, 0.45)',
              }}
            />

            {/* Inner subtle highlight ring */}
            <div className="absolute w-[78%] h-[78%] rounded-full bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />

            {/* Grounding Floor Shadow */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-black/60 blur-md rounded-full pointer-events-none z-0" />

            {/* Cutout Portrait Image */}
            <div className="relative z-10 w-full h-full flex items-end justify-center overflow-visible">
              <img
                src="/profile.png"
                alt="Jeric M. De Los Reyes"
                className="w-full h-full object-contain object-bottom select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                referrerPolicy="no-referrer"
              />

              {/* Floating "Available for Work" Status Badge on Picture */}
              <div className="absolute bottom-6 sm:bottom-8 left-1 sm:-left-3 lg:-left-6 z-20 flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0D1424]/90 backdrop-blur-md border border-emerald-500/30 shadow-2xl shadow-black/80 text-[11px] sm:text-xs font-semibold text-emerald-400 select-none hover:scale-105 transition-all">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500"></span>
                </span>
                <span>Available for Work</span>
              </div>

              {/* Handwritten Floating Text Badge */}
              <div className="absolute top-1 sm:top-3 right-0 sm:right-2 lg:-right-2 z-20 pointer-events-none select-none text-right">
                <div className="flex flex-col items-end rotate-6">
                  <span className="font-['Caveat',cursive] text-2xl sm:text-4xl lg:text-5xl font-bold text-indigo-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] tracking-wide">
                    Code
                  </span>
                  <span className="font-['Caveat',cursive] text-2xl sm:text-4xl lg:text-5xl font-bold text-violet-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] -mt-1 sm:-mt-2 tracking-wide">
                    Design
                  </span>
                  <span className="font-['Caveat',cursive] text-2xl sm:text-4xl lg:text-5xl font-bold text-blue-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] -mt-1 sm:-mt-2 tracking-wide">
                    Build
                  </span>
                  <svg className="w-14 sm:w-20 lg:w-24 h-3 sm:h-4 text-indigo-400 mt-0.5 sm:mt-1" viewBox="0 0 100 20" fill="none">
                    <path d="M5 10 Q 50 18, 95 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
