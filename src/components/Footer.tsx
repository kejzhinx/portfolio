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
                    ? 'bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400'
                    : 'bg-white border border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 shadow-sm'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 4 24 16">
                  <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
                </svg>
              </a>
              <a
                href="mailto:jericdelosreyes127001@gmail.com"
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
