import { useEffect } from 'react';
import { motion } from 'motion/react';

interface RainTransitionProps {
  key?: string;
  onComplete: () => void;
}

export default function RainTransition({ onComplete }: RainTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#030C1A] overflow-hidden select-none pointer-events-auto"
    >
      {/* Background Rainy Atmosphere caustics */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] bg-cyan-600/20" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full blur-[150px] bg-blue-700/25" />
      </div>

      {/* Raining Downward Streaks Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`rain-streak-${i}`}
            initial={{
              y: '-20vh',
              x: `${(i * 3.3) % 100}vw`,
              opacity: 0,
            }}
            animate={{
              y: '120vh',
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: 0.8 + (i % 4) * 0.2,
              repeat: Infinity,
              delay: (i * 0.08) % 1,
              ease: 'linear',
            }}
            className="absolute w-[1.5px] h-16 bg-gradient-to-b from-transparent via-cyan-300/80 to-blue-400"
          />
        ))}
      </div>

      {/* Screen Water Fill & Slow Drain Animation Container */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{
          // Stage 1 (0% -> 30%): Fills screen rapidly from bottom to top (y: '0%')
          // Stage 2 (30% -> 42%): Holds full screen water level
          // Stage 3 (42% -> 100%): Slowly drains down (y: '100%'), revealing home screen!
          y: ['100%', '0%', '0%', '100%'],
        }}
        transition={{
          duration: 2.7,
          ease: [0.22, 1, 0.36, 1],
          times: [0, 0.3, 0.42, 1],
        }}
        className="absolute inset-0 z-10 bg-gradient-to-b from-sky-600/90 via-blue-700/95 to-slate-950 backdrop-blur-md shadow-[0_0_80px_rgba(14,165,233,0.8)]"
      >
        {/* Animated Water Crest Surface Wave at top of rising/draining water */}
        <div className="absolute -top-12 left-0 right-0 h-16 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-[200%] h-full text-sky-500/90 fill-current animate-pulse"
          >
            <path d="M0,0 C150,90 350,-40 500,50 C650,120 900,10 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>

        {/* Rising Underwater Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              initial={{
                y: '100%',
                x: `${(i * 5) % 100}vw`,
                scale: 0.3 + (i % 3) * 0.3,
                opacity: 0.2,
              }}
              animate={{
                y: '-20%',
                opacity: [0.2, 0.9, 0],
                x: `${(i * 5) % 100 + Math.sin(i) * 3}vw`,
              }}
              transition={{
                duration: 1.5 + (i % 3) * 0.4,
                repeat: Infinity,
                delay: (i * 0.1) % 0.8,
                ease: 'easeOut',
              }}
              className="absolute w-4 h-4 rounded-full border border-cyan-200/80 bg-white/20 backdrop-blur-sm"
            />
          ))}
        </div>

        {/* Water Surface Light Caustics */}
        <div className="absolute inset-0 bg-radial from-cyan-300/20 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Central Storm Badge & Water Drainage Status */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="relative z-20 text-center space-y-3 px-6 pointer-events-none"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-cyan-950/50">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>🌧️ Heavy Rain Transition</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.7)]">
          Draining Water... Entering Storm Realm
        </h2>

        {/* Water Ripple Pulse Line */}
        <div className="w-52 sm:w-64 h-1.5 mx-auto rounded-full bg-cyan-950/80 border border-cyan-400/40 overflow-hidden relative">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 2.6, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-sky-500 via-cyan-300 to-blue-500 rounded-full shadow-[0_0_12px_#38bdf8]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
