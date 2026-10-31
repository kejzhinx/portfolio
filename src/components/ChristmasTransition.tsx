import { useEffect } from 'react';
import { motion } from 'motion/react';

interface ChristmasTransitionProps {
  key?: string;
  onComplete: () => void;
}

export default function ChristmasTransition({ onComplete }: ChristmasTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#051329] overflow-hidden select-none pointer-events-auto"
    >
      {/* Festive Winter Aurora Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] rounded-full blur-[150px] bg-emerald-600/20" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] bg-red-600/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-[160px] bg-blue-500/15" />
      </div>

      {/* Swirling Falling Snowflakes during transition */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: '-10vh',
              x: `${(i * 2.5) + Math.random() * 5}vw`,
              opacity: 0,
              scale: 0.4 + Math.random() * 0.9,
            }}
            animate={{
              y: '110vh',
              x: `${(i * 2.5) + Math.sin(i) * 8}vw`,
              opacity: [0, 0.9, 0.9, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 1.8 + Math.random() * 1.4,
              repeat: Infinity,
              ease: 'linear',
              delay: (i % 10) * 0.15,
            }}
            className="absolute text-white/90 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          >
            {i % 3 === 0 ? '❄' : i % 3 === 1 ? '❅' : '•'}
          </motion.div>
        ))}
      </div>

      {/* Rolling Snowball from left to right */}
      <div className="absolute bottom-[22%] sm:bottom-[28%] left-0 right-0 pointer-events-none overflow-hidden h-48 flex items-center">
        {/* Snowy Ground Trail */}
        <div className="absolute bottom-6 left-0 right-0 h-1.5 bg-gradient-to-r from-white/40 via-cyan-200/50 to-white/40 blur-[1px]" />

        {/* Rolling Snowball */}
        <motion.div
          initial={{ x: '-220px' }}
          animate={{ x: 'calc(100vw + 220px)' }}
          transition={{
            duration: 2.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="relative flex items-center justify-center"
        >
          {/* Snowball Sphere with Rolling Rotation */}
          <motion.div
            animate={{ rotate: 1440 }}
            transition={{
              duration: 2.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-cyan-100 via-white to-blue-50 shadow-[0_0_35px_rgba(224,242,254,0.9),inset_-10px_-10px_20px_rgba(186,230,253,0.8),inset_8px_8px_15px_rgba(255,255,255,1)]"
          >
            {/* Textured Snow Specks on the ball */}
            <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-cyan-200/60" />
            <div className="absolute top-12 right-5 w-4 h-4 rounded-full bg-sky-200/50" />
            <div className="absolute bottom-6 left-10 w-3.5 h-3.5 rounded-full bg-cyan-300/40" />
            <div className="absolute bottom-10 right-10 w-2.5 h-2.5 rounded-full bg-sky-100" />
          </motion.div>

          {/* Flying Snow Dust trailing behind the rolling snowball */}
          <div className="absolute -left-12 bottom-3 flex gap-1 pointer-events-none">
            <span className="text-white/80 text-xl animate-ping">❄</span>
            <span className="text-cyan-200/80 text-sm animate-pulse">❅</span>
          </div>
        </motion.div>
      </div>

      {/* Center Welcome Greetings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="relative z-20 text-center space-y-3 px-4"
      >
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-600/20 border border-red-500/40 text-red-200 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-red-900/30">
          <span>🎄 Merry Christmas</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-200 to-emerald-400 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">
          Entering Winter Wonderland...
        </h2>

        <p className="text-xs sm:text-sm text-cyan-200/80 font-mono tracking-wider">
          Let it snow • Holiday joy
        </p>
      </motion.div>
    </motion.div>
  );
}
