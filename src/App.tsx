import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div className="w-full flex-1">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Redirect /developed directly to /projects */}
        <Route path="/developed" element={<Navigate to="/projects" replace />} />
        <Route path="/project" element={<Navigate to="/projects" replace />} />
        <Route path="/resume" element={<Navigate to="/about" replace />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
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
      className={`min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden ${
        isDark
          ? 'bg-[#070B14] text-white selection:bg-indigo-600/30 selection:text-indigo-200'
          : 'bg-[#F8FAFC] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900'
      }`}
    >
      {/* Doctor Strange Initial Welcome Portal Screen */}
      <AnimatePresence mode="wait">
        {showPortal && (
          <DoctorStrangeWelcomePortal key="welcome-portal" onComplete={handlePortalComplete} />
        )}
      </AnimatePresence>

      {/* Dynamic ambient background glows */}
      <div className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] lg:w-[600px] h-[280px] sm:h-[500px] lg:h-[600px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none ${
        isDark ? 'bg-indigo-600/10' : 'bg-indigo-500/15'
      }`} />
      <div className={`absolute top-1/3 right-1/4 w-[300px] sm:w-[550px] lg:w-[650px] h-[300px] sm:h-[550px] lg:h-[650px] rounded-full blur-[100px] sm:blur-[150px] pointer-events-none ${
        isDark ? 'bg-violet-600/15' : 'bg-violet-500/15'
      }`} />
      <div className={`absolute bottom-5 left-1/2 -translate-x-1/2 w-[380px] sm:w-[700px] lg:w-[800px] h-[160px] sm:h-[260px] rounded-full blur-[110px] sm:blur-[160px] pointer-events-none ${
        isDark ? 'bg-blue-600/5' : 'bg-blue-500/10'
      }`} />

      {/* Subtle background tech grid */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark ? 'opacity-[0.025]' : 'opacity-[0.04]'
        }`}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <Navbar />
      <main className="flex-1 flex flex-col relative z-10">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
