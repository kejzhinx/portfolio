import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#070B14] py-8 sm:py-9 relative overflow-hidden">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          {/* Copyright Brand */}
          <div className="flex items-center justify-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-400 shadow-sm">
              K
            </div>
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()}{' '}
              <span className="text-slate-200 font-semibold">Kejzhin</span>. All rights reserved.
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
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Github size={15} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="mailto:kejzhin@gmail.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-indigo-500/50 hover:bg-white/[0.08] text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Mail size={15} />
              </a>
              <span className="text-slate-600 ml-1">|</span>
            </div>

            {/* Signature Built with note */}
            <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
              Built with <Heart size={13} className="text-rose-500 fill-rose-500" /> and lots of coffee
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
