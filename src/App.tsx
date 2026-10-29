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
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ReloadToHome() {
  useEffect(() => {
    // When the browser is refreshed or page unloads, prepare URL to reset to home
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
    // Check if initial load or direct path points to a specific section
    const hash = window.location.hash.replace('#', '');
    const cleanPath = location.pathname.replace(/^\/+/, '');
    const target = hash || (['about', 'skills', 'projects', 'contact', 'home'].includes(cleanPath) ? cleanPath : '');

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

      {/* Subtle Glow Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      {/* Work Experience & About Section */}
      <section id="about" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <AboutPage />
      </section>

      {/* Subtle Glow Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <ProjectsPage />
      </section>

      {/* Subtle Glow Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <SkillsPage />
      </section>

      {/* Subtle Glow Section Divider */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-8">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      </div>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 w-full">
        <ContactPage />
      </section>
    </div>
  );
}

function MainLayout() {
  const { isDark } = useTheme();
  // Always trigger the Doctor Strange portal welcome screen automatically when opened / refreshed
  const [showPortal, setShowPortal] = useState(true);

  const handlePortalComplete = () => {
    setShowPortal(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden max-w-full w-full ${
        isDark
          ? 'bg-[#070B14] text-white selection:bg-indigo-600/30 selection:text-indigo-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900'
      }`}
    >
      {/* Animated Custom Mouse Cursor */}
      <CustomCursor />

      {/* Interactive Physics Floating Cyber Objects Across All Pages */}
      <FloatingCyberObjects />

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
