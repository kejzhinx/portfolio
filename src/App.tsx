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
import FloatingCyberObjects from './components/FloatingCyberObjects';
import HalloweenTransition from './components/HalloweenTransition';
import ChristmasTransition from './components/ChristmasTransition';
import HalloweenDecorations from './components/HalloweenDecorations';
import ChristmasDecorations from './components/ChristmasDecorations';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ReloadToHome() {
  useEffect(() => {
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';

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

  return (
    <div className="w-full flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden">
      {/* Home Hero Section */}
      <section id="home" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <HomePage />
      </section>

      {/* Work Experience & About Section */}
      <section id="about" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <AboutPage />
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <ProjectsPage />
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <SkillsPage />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <ContactPage />
      </section>
    </div>
  );
}

function MainLayout() {
  const { isDark, isHalloween, isChristmas, transitioningTheme, transitionId, clearTransition } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden max-w-full w-full ${
        isHalloween
          ? 'bg-[#0A0512] text-white selection:bg-orange-600/30 selection:text-orange-200'
          : isChristmas
          ? 'bg-[#051120] text-white selection:bg-red-600/30 selection:text-red-200'
          : isDark
          ? 'bg-[#070B14] text-white selection:bg-indigo-600/30 selection:text-indigo-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900'
      }`}
    >
      {/* Interactive Physics Floating Cyber Objects Across All Pages */}
      <FloatingCyberObjects />

      {/* Seasonal Atmospheric Overlays & Interactions */}
      {isHalloween && <HalloweenDecorations />}
      {isChristmas && <ChristmasDecorations />}

      {/* Halloween Bouncing Pumpkin Loading Screen (Plays on theme switch & browser refresh) */}
      <AnimatePresence mode="wait">
        {transitioningTheme === 'halloween' && (
          <HalloweenTransition key={`halloween-loading-${transitionId}`} onComplete={clearTransition} />
        )}
      </AnimatePresence>

      {/* Christmas Rolling Snowball Loading Screen (Plays on theme switch & browser refresh) */}
      <AnimatePresence mode="wait">
        {transitioningTheme === 'christmas' && (
          <ChristmasTransition key={`christmas-loading-${transitionId}`} onComplete={clearTransition} />
        )}
      </AnimatePresence>

      {/* Doctor Strange Welcome Portal Screen (Plays on Dark/Light initial load, refresh, or switch) */}
      <AnimatePresence mode="wait">
        {transitioningTheme === 'portal' && (
          <DoctorStrangeWelcomePortal key={`welcome-portal-${transitionId}`} onComplete={clearTransition} />
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
