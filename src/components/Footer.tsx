import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer className={`py-8 sm:py-9 relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'border-t border-white/[0.07] bg-[#070B14]' : 'border-t border-slate-200 bg-slate-100/90'
    }`}>
      {/* Subtle top glow line */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none ${
        isDark ? 'bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent' : 'bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          {/* Copyright Brand */}
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400 shadow-sm">
              K
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              &copy; {new Date().getFullYear()}{' '}
              <span className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>Kejzhin</span>. All rights reserved.
            </p>
          </div>

          {/* Social Icons & Signature */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
            {/* Social Icons - Hidden on mobile, shown on md+ screens */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="https://github.com/kejzhin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.08] text-slate-300 hover:text-white'
                    : 'bg-white border border-slate-300 hover:border-indigo-500 hover:bg-slate-50 text-slate-700 hover:text-indigo-600 shadow-sm'
                }`}
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.08] text-slate-300 hover:text-white'
                    : 'bg-white border border-slate-300 hover:border-indigo-500 hover:bg-slate-50 text-slate-700 hover:text-indigo-600 shadow-sm'
                }`}
              >
                <Linkedin size={15} />
              </a>
              <a
                href="mailto:kejzhin@gmail.com"
                aria-label="Email"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.08] text-slate-300 hover:text-white'
                    : 'bg-white border border-slate-300 hover:border-indigo-500 hover:bg-slate-50 text-slate-700 hover:text-indigo-600 shadow-sm'
                }`}
              >
                <Mail size={15} />
              </a>
              <span className={isDark ? 'text-slate-600 ml-1' : 'text-slate-300 ml-1'}>|</span>
            </div>

            {/* Signature Built with note */}
            <span className={`text-xs flex items-center justify-center gap-1.5 font-medium ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Built with <Heart size={13} className="text-rose-500 fill-rose-500" /> and lots of coffee
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
