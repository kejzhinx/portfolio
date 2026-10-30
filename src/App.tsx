import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import DoctorStrangeWelcomePortal from './components/DoctorStrangeWelcomePortal';
import CustomCursor from './components/CustomCursor';
import FloatingCyberObjects from './components/FloatingCyberObjects';
import HalloweenTransition from './components/HalloweenTransition';
import ChristmasTransition from './components/ChristmasTransition';
import RainTransition from './components/RainTransition';
import HalloweenDecorations from './components/HalloweenDecorations';
import ChristmasDecorations from './components/ChristmasDecorations';
import RainDecorations from './components/RainDecorations';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ReloadToHome() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        window.history.replaceState(null, '', '/');
      } catch {
        // ignore
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handleBeforeUnload);
    };
  }, []);

  return null;
}

function SinglePagePortfolio() {
  const location = useLocation();
  const { isHalloween, isChristmas } = useTheme();

  useEffect(() => {
    const target = location.pathname.replace('/', '').toLowerCase();
    if (target) {
      const timer = setTimeout(() => {
        if (target === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el = document.getElementById(target);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const dividerGlow = isHalloween
    ? 'via-orange-500/30'
    : isChristmas
    ? 'via-red-500/30'
    : 'via-indigo-500/20';

  return (
    <div className="w-full flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
      {/* Home Hero Section */}
      <section id="home" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <HomePage />
      </section>

      {/* Subtle Glow Section Divider with Seasonal Accents */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-2 relative flex items-center justify-center">
        <div className={`h-[1px] w-full bg-gradient-to-r from-transparent ${dividerGlow} to-transparent`} />
        {isHalloween && (
          <span className="absolute px-3 bg-[#0A0512] text-sm select-none text-orange-400 filter drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
            🎃
          </span>
        )}
        {isChristmas && (
          <span className="absolute px-3 bg-[#051120] text-sm select-none text-red-400 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">
            🎄
          </span>
        )}
      </div>

      {/* Work Experience & About Section */}
      <section id="about" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <AboutPage />
      </section>

      {/* Subtle Glow Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-2 relative flex items-center justify-center">
        <div className={`h-[1px] w-full bg-gradient-to-r from-transparent ${
          isHalloween ? 'via-purple-500/30' : isChristmas ? 'via-emerald-500/30' : 'via-cyan-500/20'
        } to-transparent`} />
        {isHalloween && (
          <span className="absolute px-3 bg-[#0A0512] text-xs font-mono text-purple-300 select-none">
            🦇 • 🕸️
          </span>
        )}
        {isChristmas && (
          <span className="absolute px-3 bg-[#051120] text-sm select-none text-emerald-400">
            ❄️
          </span>
        )}
      </div>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <ProjectsPage />
      </section>

      {/* Subtle Glow Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-2 relative flex items-center justify-center">
        <div className={`h-[1px] w-full bg-gradient-to-r from-transparent ${
          isHalloween ? 'via-orange-500/30' : isChristmas ? 'via-amber-400/30' : 'via-violet-500/20'
        } to-transparent`} />
        {isHalloween && (
          <span className="absolute px-3 bg-[#0A0512] text-sm select-none text-orange-400">
            🎃
          </span>
        )}
        {isChristmas && (
          <span className="absolute px-3 bg-[#051120] text-sm select-none text-amber-300">
            ⭐
          </span>
        )}
      </div>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <SkillsPage />
      </section>

      {/* Subtle Glow Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8 py-2 relative flex items-center justify-center">
        <div className={`h-[1px] w-full bg-gradient-to-r from-transparent ${
          isHalloween ? 'via-amber-500/30' : isChristmas ? 'via-emerald-500/30' : 'via-emerald-500/20'
        } to-transparent`} />
        {isHalloween && (
          <span className="absolute px-3 bg-[#0A0512] text-xs font-mono text-amber-300 select-none">
            👻
          </span>
        )}
        {isChristmas && (
          <span className="absolute px-3 bg-[#051120] text-sm select-none text-red-400">
            🎁
          </span>
        )}
      </div>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <ContactPage />
      </section>
    </div>
  );
}

function MainLayout() {
  const { isDark, isHalloween, isChristmas, isRain, transitioningTheme, clearTransition } = useTheme();
  const [showPortal, setShowPortal] = useState(true);

  const handlePortalComplete = () => {
    setShowPortal(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden max-w-full w-full ${
        isRain
          ? 'bg-[#030C1A] text-white selection:bg-cyan-600/30 selection:text-cyan-200'
          : isHalloween
          ? 'bg-[#0A0512] text-white selection:bg-orange-600/30 selection:text-orange-200'
          : isChristmas
          ? 'bg-[#051120] text-white selection:bg-red-600/30 selection:text-red-200'
          : isDark
          ? 'bg-[#070B14] text-white selection:bg-indigo-600/30 selection:text-indigo-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900'
      }`}
    >
      {/* Animated Custom Mouse Cursor */}
      <CustomCursor />

      {/* Interactive Physics Floating Cyber Objects Across All Pages */}
      <FloatingCyberObjects />

      {/* Seasonal Atmospheric Overlays & Interactions */}
      {isHalloween && <HalloweenDecorations />}
      {isChristmas && <ChristmasDecorations />}
      {isRain && <RainDecorations />}

      {/* Halloween Bouncing Pumpkin Loading Screen */}
      <AnimatePresence>
        {transitioningTheme === 'halloween' && (
          <HalloweenTransition key="halloween-loading" onComplete={clearTransition} />
        )}
      </AnimatePresence>

      {/* Christmas Rolling Snowball Loading Screen */}
      <AnimatePresence>
        {transitioningTheme === 'christmas' && (
          <ChristmasTransition key="christmas-loading" onComplete={clearTransition} />
        )}
      </AnimatePresence>

      {/* Rain Water Filling & Draining Loading Screen */}
      <AnimatePresence>
        {transitioningTheme === 'rain' && (
          <RainTransition key="rain-loading" onComplete={clearTransition} />
        )}
      </AnimatePresence>

      {/* Doctor Strange Initial Welcome Portal Screen */}
      <AnimatePresence mode="wait">
        {showPortal && (
          <DoctorStrangeWelcomePortal key="welcome-portal" onComplete={handlePortalComplete} />
        )}
      </AnimatePresence>

      <Navbar />
      <main className="flex-1 flex flex-col relative z-20">
        <Routes>
          <Route path="*" element={<SinglePagePortfolio />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ReloadToHome />
        <ScrollToTop />
        <MainLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
