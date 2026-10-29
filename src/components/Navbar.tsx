import { NavLink, Link, useLocation } from 'react-router-dom';
import { Github, Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Experience', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Contact', id: 'contact' },
  ];

  // Smooth scroll to a target section
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        window.history.pushState(null, '', '#home');
      } catch {
        // ignore
      }
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      try {
        window.history.pushState(null, '', `#${id}`);
      } catch {
        // ignore
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // If scrolled near very bottom, highlight 'contact'
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
        return;
      }

      // Check section offsets
      const sectionIds = ['home', 'projects', 'skills', 'contact'];
      let current = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of section is within upper viewport
          if (rect.top <= window.innerHeight * 0.4) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#070B14]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/20'
            : 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3.5 shadow-md shadow-slate-200/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group cursor-pointer text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
            K
          </div>
          <span className={`text-lg font-bold tracking-tight transition-colors ${
            isDark ? 'text-white group-hover:text-indigo-400' : 'text-slate-900 group-hover:text-indigo-600'
          }`}>
            Kejzhin
          </span>
        </button>

        {/* Center Desktop Navigation */}
        <nav className={`hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors ${
          isDark 
            ? 'bg-white/[0.03] border border-white/[0.06]' 
            : 'bg-slate-100/80 border border-slate-200/80'
        }`}>
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 cursor-pointer focus:outline-none ${
                  isActive
                    ? isDark ? 'text-white' : 'text-indigo-700'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    className={`absolute inset-0 rounded-full ${
                      isDark 
                        ? 'bg-gradient-to-r from-indigo-600/40 via-violet-600/35 to-cyan-500/25 border border-indigo-400/50 shadow-md shadow-indigo-500/25' 
                        : 'bg-white border border-slate-300 shadow-sm shadow-indigo-950/10'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isDark
                ? 'bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] text-amber-300 hover:text-amber-200 hover:bg-white/[0.08]'
                : 'bg-slate-100 border border-slate-300 hover:border-indigo-400 text-indigo-600 hover:text-indigo-700 hover:bg-slate-200/70 shadow-sm'
            }`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={17} className="transition-transform hover:rotate-45" /> : <Moon size={17} className="transition-transform hover:-rotate-12" />}
          </button>

          {/* GitHub CTA Button */}
          <a
            href="https://github.com/kejzhin"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all shadow-sm group ${
              isDark
                ? 'text-slate-200 bg-white/[0.04] border border-white/[0.12] hover:border-indigo-500/50 hover:bg-white/[0.08] hover:text-white'
                : 'text-slate-700 bg-white border border-slate-300 hover:border-indigo-500 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            <Github size={15} className="group-hover:text-indigo-400 transition-colors" />
            <span>View GitHub</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/[0.04] border border-white/[0.08] text-slate-200 hover:text-white'
                : 'bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ y: -12, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-full left-4 right-4 mt-2 p-3.5 rounded-2xl shadow-2xl z-50 md:hidden border backdrop-blur-2xl ${
                isDark
                  ? 'bg-[#0D1424]/95 border-white/[0.1] text-white shadow-black/60'
                  : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/60'
              }`}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? isDark 
                            ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30'
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : isDark
                            ? 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={`text-xs transition-transform ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        ↓
                      </span>
                    </button>
                  );
                })}

                <div className="pt-2 mt-1 border-t border-slate-200/60 dark:border-white/[0.08] flex flex-col gap-1.5">
                  <a
                    href="https://github.com/kejzhin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                      isDark
                        ? 'bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 border border-white/[0.1] hover:text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <Github size={15} />
                    <span>View GitHub Profile</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
