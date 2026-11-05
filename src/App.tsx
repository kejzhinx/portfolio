import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HalloweenDecorations from './components/HalloweenDecorations';
import ChristmasDecorations from './components/ChristmasDecorations';
import HalloweenTransition from './components/HalloweenTransition';
import ChristmasTransition from './components/ChristmasTransition';
import DoctorStrangeWelcomePortal from './components/DoctorStrangeWelcomePortal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';

function PortfolioShell() {
  const { isDark, isHalloween, isChristmas, transitioningTheme, transitionId, clearTransition } = useTheme();

  useEffect(() => {
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col relative selection:bg-indigo-500/30 selection:text-indigo-200 ${
        isHalloween
          ? 'bg-[#0E0518] text-white'
          : isChristmas
          ? 'bg-[#041424] text-white'
          : isDark
          ? 'bg-[#070B14] text-white'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {isHalloween && <HalloweenDecorations />}
      {isChristmas && <ChristmasDecorations />}

      {transitioningTheme === 'portal' && (
        <DoctorStrangeWelcomePortal key={`portal-${transitionId}`} onComplete={clearTransition} />
      )}
      {transitioningTheme === 'halloween' && (
        <HalloweenTransition key={`halloween-${transitionId}`} onComplete={clearTransition} />
      )}
      {transitioningTheme === 'christmas' && (
        <ChristmasTransition key={`christmas-${transitionId}`} onComplete={clearTransition} />
      )}

      <Navbar />

      <main className="flex-1">
        <section id="home">
          <HomePage />
        </section>
        <section id="about">
          <AboutPage />
        </section>
        <section id="projects">
          <ProjectsPage />
        </section>
        <section id="skills">
          <SkillsPage />
        </section>
        <section id="contact">
          <ContactPage />
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioShell />
      </ThemeProvider>
    </BrowserRouter>
  );
}
