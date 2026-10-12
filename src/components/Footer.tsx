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
                href="https://www.fiverr.com/kejzhin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fiverr"
                title="Fiverr @kejzhin"
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isDark
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-[#1DBF73]/50 hover:bg-[#1DBF73]/10 text-slate-300 hover:text-[#1DBF73]'
                    : 'bg-white border border-slate-300 hover:border-[#1DBF73] hover:bg-emerald-50 text-slate-700 hover:text-[#1DBF73] shadow-sm'
                }`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M23.003 13.568c0-.44-.038-.868-.112-1.285h-6.843v2.433h3.901c-.168.905-.678 1.672-1.442 2.185v1.815h2.336c1.367-1.258 2.16-3.111 2.16-5.148zM16.048 20.648c2.029 0 3.73-.672 4.973-1.817l-2.336-1.815c-.673.451-1.534.718-2.637.718-2.027 0-3.743-1.369-4.356-3.212H9.278v1.874c1.238 2.458 3.774 4.252 6.77 4.252zm-4.356-7.868c-.156-.468-.244-.967-.244-1.48s.088-1.012.244-1.48V7.946H9.278C8.777 8.94 8.491 10.065 8.491 11.3s.286 2.36.787 3.354l2.414-1.874zm4.356-4.57c1.104 0 2.096.38 2.876 1.127l2.157-2.157C19.774 5.98 18.073 5.3 16.048 5.3c-2.996 0-5.532 1.794-6.77 4.252l2.414 1.874c.613-1.843 2.329-3.216 4.356-3.216z" />
                </svg>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jericdelosreyes127001@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                title="Send Email to jericdelosreyes127001@gmail.com"
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
