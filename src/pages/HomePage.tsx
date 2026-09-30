import { motion } from 'motion/react';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function HomePage() {
  const { isDark } = useTheme();

  return (
    <div className={`relative min-h-[calc(100vh-76px)] flex items-center justify-center pt-24 sm:pt-28 lg:pt-0 pb-12 lg:pb-0 px-4 sm:px-6 lg:px-10 overflow-x-hidden transition-colors duration-300 ${
      isDark ? 'bg-[#070B14]' : 'bg-[#F8FAFC]'
    }`}>
      {/* Dynamic ambient background glows */}
      <div className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] lg:w-[600px] h-[280px] sm:h-[500px] lg:h-[600px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none ${
        isDark ? 'bg-indigo-600/10' : 'bg-indigo-500/15'
      }`} />
      <div className={`absolute top-1/3 right-1/4 w-[300px] sm:w-[550px] lg:w-[650px] h-[300px] sm:h-[550px] lg:h-[650px] rounded-full blur-[100px] sm:blur-[150px] pointer-events-none ${
        isDark ? 'bg-violet-600/15' : 'bg-violet-500/15'
      }`} />
      <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-[380px] sm:w-[700px] lg:w-[800px] h-[160px] sm:h-[260px] rounded-full blur-[110px] sm:blur-[160px] pointer-events-none ${
        isDark ? 'bg-blue-600/5' : 'bg-blue-500/10'
      }`} />

      {/* Subtle background tech grid */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark ? 'opacity-[0.025]' : 'opacity-[0.04]'
        }`}
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
              <span className="text-gradient">Penetration Tester</span> &{' '}
              <span className="text-gradient">Graphics Designer</span>
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
            {/* Outer Ambient Glow Capsule */}
            <div
              className={`absolute w-[88%] h-[92%] rounded-[140px] sm:rounded-[190px] lg:rounded-[210px] pointer-events-none transition-all duration-300 blur-[35px] ${
                isDark
                  ? 'bg-gradient-to-b from-indigo-500/35 via-violet-600/30 to-indigo-500/35'
                  : 'bg-gradient-to-b from-indigo-500/50 via-violet-500/45 to-indigo-600/45'
              }`}
            />

            {/* Glowing Backdrop Capsule Shape */}
            <div
              className={`absolute w-[80%] sm:w-[78%] h-[88%] sm:h-[86%] rounded-[130px] sm:rounded-[170px] lg:rounded-[190px] pointer-events-none transition-all duration-300 overflow-hidden ${
                isDark
                  ? 'bg-gradient-to-b from-[#3730A3] via-[#4338CA] to-[#2C2475] border-2 border-indigo-400/50'
                  : 'bg-gradient-to-b from-[#4338CA] via-[#4F46E5] to-[#3730A3] border-2 border-indigo-300/80 ring-1 ring-white/60'
              }`}
              style={{
                boxShadow: isDark
                  ? '0 0 60px rgba(99, 102, 241, 0.5), 0 0 100px rgba(139, 92, 246, 0.3), inset 0 0 30px rgba(165, 180, 252, 0.35)'
                  : '0 0 45px rgba(99, 102, 241, 0.65), 0 20px 50px -10px rgba(30, 27, 75, 0.45), 0 0 80px rgba(129, 140, 248, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.5), inset 0 0 50px rgba(99, 102, 241, 0.3)',
              }}
            >
              {/* Inner Gradient Lighting & Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-white/20 pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Grounding Floor Shadow */}
            <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-3/4 h-6 blur-md rounded-full pointer-events-none z-0 ${
              isDark ? 'bg-black/60' : 'bg-slate-900/30'
            }`} />

            {/* Cutout Portrait Image */}
            <div className="relative z-10 w-full h-full flex items-end justify-center overflow-visible">
              <img
                src="/profile.png"
                alt="Jeric M. De Los Reyes"
                className={`w-full h-full object-contain object-bottom select-none ${
                  isDark ? 'drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)]' : 'drop-shadow-[0_20px_35px_rgba(30,27,75,0.4)]'
                }`}
                referrerPolicy="no-referrer"
              />

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
              <div className="absolute top-1 sm:top-3 right-0 sm:right-2 lg:-right-2 z-20 pointer-events-none select-none text-right">
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
        </motion.div>
      </div>
    </div>
  );
}
