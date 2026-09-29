import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Terminal } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'PROJECT', href: '/project' },
    { label: 'RESUME', href: '/resume' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-8 transition-all duration-300 md:px-16 lg:px-24 ${
        isScrolled ? 'py-4 bg-bg-dark/80 backdrop-blur-md md:backdrop-blur-lg border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <NavLink to="/" className="flex items-center gap-4 z-[110] relative hover:opacity-80 transition-opacity">
        <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800">
          <Terminal size={20} className="text-brand-purple" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white italic">Jeric<span className="text-brand-purple">.</span></span>
      </NavLink>

      <div className="hidden md:flex items-center gap-8 lg:gap-12 z-[110] relative">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            className={({ isActive }) => 
              `group relative text-[11px] font-bold transition-all tracking-widest px-2 py-1 ${
                isActive ? 'text-brand-purple' : 'text-white/60 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-purple blur-[1px]"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden z-[110] relative p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-xl border border-white/10 transition-all shadow-lg backdrop-blur-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] md:hidden"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-bg-card border-l border-white/10 z-[90] flex flex-col p-6 pt-20 md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.1 }}
                  >
                    <NavLink 
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) => 
                        `flex items-center justify-between p-4 rounded-2xl transition-all ${
                          isActive 
                            ? 'bg-brand-purple/10 text-brand-purple' 
                            : 'text-zinc-500 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span className="text-[10px] font-bold tracking-widest">{item.label}</span>
                          <div className={`w-1 h-1 rounded-full transition-all ${isActive ? 'bg-brand-purple shadow-[0_0_12px_rgba(0,229,255,0.5)] scale-125' : 'bg-transparent'}`} />
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
