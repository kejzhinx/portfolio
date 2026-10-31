import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme, Theme } from '../context/ThemeContext';
import { Sun, Moon, Sparkles, Check } from 'lucide-react';

interface ThemeOption {
  id: Theme;
  label: string;
  description: string;
  icon: string | ReactNode;
  activeBorder: string;
}

export default function ThemeSwitcher() {
  const { theme, setTheme, isDark, isHalloween, isChristmas } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const themeOptions: ThemeOption[] = [
    {
      id: 'dark',
      label: 'Dark Mode',
      description: 'Futuristic deep navy & cosmic blue portal',
      icon: <Moon size={16} className="text-indigo-400" />,
      activeBorder: 'border-indigo-500/50 bg-indigo-500/10 text-indigo-300',
    },
    {
      id: 'light',
      label: 'Light Mode',
      description: 'Crisp bright aesthetic & subtle pastel aurora',
      icon: <Sun size={16} className="text-amber-500" />,
      activeBorder: 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-300',
    },
    {
      id: 'halloween',
      label: 'Halloween',
      description: 'Spooky jack-o\'-lanterns, eerie aurora & flying bats',
      icon: '🎃',
      activeBorder: 'border-orange-500/60 bg-orange-500/15 text-orange-400',
    },
    {
      id: 'christmas',
      label: 'Christmas',
      description: 'Rolling snowball, falling snowflakes & fairy lights',
      icon: '🎄',
      activeBorder: 'border-red-500/60 bg-red-500/15 text-red-400',
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  const currentThemeObj = themeOptions.find((t) => t.id === theme) || themeOptions[0];

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Theme Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change theme"
        className={`h-9 px-3 rounded-full flex items-center gap-2 transition-all cursor-pointer select-none focus:outline-none ${
          isHalloween
            ? 'bg-orange-950/70 border border-orange-500/50 text-orange-200 shadow-[0_0_12px_rgba(249,115,22,0.4)] hover:bg-orange-900/80'
            : isChristmas
            ? 'bg-red-950/70 border border-red-500/50 text-red-200 shadow-[0_0_12px_rgba(239,68,68,0.4)] hover:bg-red-900/80'
            : isDark
            ? 'bg-white/[0.04] border border-white/[0.12] text-slate-200 hover:text-white hover:bg-white/[0.08] hover:border-indigo-500/40'
            : 'bg-white border border-slate-300 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 shadow-sm'
        }`}
        title={`Current Theme: ${currentThemeObj.label}. Click to switch theme!`}
      >
        <span className="text-base flex items-center justify-center">
          {typeof currentThemeObj.icon === 'string' ? currentThemeObj.icon : currentThemeObj.icon}
        </span>
        <span className="text-xs font-semibold hidden sm:inline-block">
          {currentThemeObj.label}
        </span>
        <span className="text-[10px] opacity-60">▾</span>
      </button>

      {/* Floating Dropdown Selector */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl p-2 z-50 shadow-2xl backdrop-blur-2xl border ${
              isHalloween
                ? 'bg-[#140A1F]/95 border-orange-500/30 text-white shadow-orange-950/50'
                : isChristmas
                ? 'bg-[#07172B]/95 border-red-500/30 text-white shadow-red-950/50'
                : isDark
                ? 'bg-[#0B1220]/95 border-white/[0.1] text-white shadow-black/60'
                : 'bg-white/95 border-slate-200 text-slate-900 shadow-slate-300/60'
            }`}
          >
            <div className="px-3 py-2 border-b border-white/[0.06] mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold opacity-60">
                Choose Theme Experience
              </span>
              <Sparkles size={12} className="text-indigo-400" />
            </div>

            <div className="space-y-1">
              {themeOptions.map((opt) => {
                const isSelected = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectTheme(opt.id)}
                    type="button"
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                      isSelected
                        ? opt.activeBorder
                        : isDark
                        ? 'hover:bg-white/[0.05] text-slate-300 hover:text-white'
                        : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <div className="text-xl sm:text-2xl mt-0.5 shrink-0 flex items-center justify-center w-7 h-7">
                      {typeof opt.icon === 'string' ? opt.icon : opt.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold">{opt.label}</span>
                      </div>
                      <p className={`text-[11px] leading-snug mt-0.5 line-clamp-1 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {opt.description}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="mt-1 shrink-0 text-orange-400">
                        <Check size={14} className="stroke-[2.5]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
