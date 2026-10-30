import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function RainDecorations() {
  const [lightning, setLightning] = useState(false);
  const [strikePath, setStrikePath] = useState<'left' | 'center' | 'right'>('center');

  // Realistic and visible thunder lightning bolt strikes
  useEffect(() => {
    const triggerLightning = () => {
      const paths: ('left' | 'center' | 'right')[] = ['left', 'center', 'right'];
      setStrikePath(paths[Math.floor(Math.random() * paths.length)]);
      setLightning(true);

      // Flash sequence
      setTimeout(() => {
        setLightning(false);
        setTimeout(() => {
          if (Math.random() > 0.3) {
            setLightning(true);
            setTimeout(() => setLightning(false), 120);
          }
        }, 100);
      }, 220);
    };

    const interval = setInterval(() => {
      triggerLightning();
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Heavy Storm Thunder Lightning Bolt & Screen Flash */}
      {lightning && (
        <>
          {/* Full Screen Flash */}
          <div className="absolute inset-0 bg-cyan-100/35 backdrop-blur-[1px] z-20" />

          {/* Realistic SVG Lightning Bolt Strike */}
          <svg
            className={`absolute top-0 w-64 sm:w-96 h-full z-30 opacity-95 filter drop-shadow-[0_0_25px_#38bdf8] ${
              strikePath === 'left' ? 'left-12 sm:left-24' : strikePath === 'right' ? 'right-12 sm:right-24' : 'left-1/2 -translate-x-1/2'
            }`}
            viewBox="0 0 100 800"
            preserveAspectRatio="none"
          >
            <path
              d="M 50 0 L 35 220 L 65 240 L 40 460 L 70 480 L 25 750 L 55 520 L 30 500 L 55 260 L 35 240 Z"
              fill="#ffffff"
              stroke="#38bdf8"
              strokeWidth="3"
            />
          </svg>
        </>
      )}

      {/* Atmospheric Storm Dark Forest Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[500px] bg-cyan-700/15 rounded-full blur-[160px]" />
      <div className="absolute bottom-0 right-1/4 w-[750px] h-[550px] bg-emerald-900/20 rounded-full blur-[180px]" />

      {/* Heavy Downpour Rain Streaks (Dense and fast) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(90)].map((_, i) => (
          <motion.div
            key={`heavy-drop-${i}`}
            initial={{
              y: '-15vh',
              x: `${(i * 1.1 + (i % 7) * 2.3) % 100}vw`,
              opacity: 0,
            }}
            animate={{
              y: '115vh',
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: 0.35 + (i % 4) * 0.12,
              repeat: Infinity,
              ease: 'linear',
              delay: (i * 0.025) % 1,
            }}
            className="absolute w-[1.8px] h-20 sm:h-28 bg-gradient-to-b from-transparent via-cyan-100/90 to-blue-400/95 shadow-[0_0_8px_rgba(56,189,248,0.8)] transform -rotate-12"
          />
        ))}
      </div>

      {/* Screen Water Droplet Condensation & Ripples on Edges */}
      <div className="absolute top-4 left-4 flex gap-2 opacity-70">
        <span className="text-cyan-300 text-sm">💧</span>
        <span className="text-sky-200 text-xs">💧</span>
      </div>
      <div className="absolute bottom-6 right-8 flex gap-2 opacity-70">
        <span className="text-sky-300 text-base">💧</span>
        <span className="text-cyan-200 text-sm">💧</span>
      </div>
    </div>
  );
}
