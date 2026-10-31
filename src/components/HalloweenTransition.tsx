import { useEffect } from 'react';
import { motion } from 'motion/react';

interface HalloweenTransitionProps {
  key?: string;
  onComplete: () => void;
}

export default function HalloweenTransition({ onComplete }: HalloweenTransitionProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#07030D] overflow-hidden select-none pointer-events-auto"
    >
      {/* Eerie Spooky Fog / Aurora Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] bg-orange-600/25 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full blur-[150px] bg-purple-700/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] bg-orange-500/15" />
      </div>

      {/* Floating Bats flying across during loading */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: i % 2 === 0 ? '-10vw' : '110vw',
              y: `${18 + i * 14}vh`,
              scale: 0.6 + (i % 3) * 0.25,
              opacity: 0,
            }}
            animate={{
              x: i % 2 === 0 ? '110vw' : '-10vw',
              y: `${12 + i * 12}vh`,
              opacity: [0, 0.85, 0.85, 0],
            }}
            transition={{
              duration: 1.8 + i * 0.3,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="absolute filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
          >
            <svg viewBox="0 0 120 70" fill="none" className="w-12 h-8">
              <path
                d="M 60 26 C 56 18, 52 11, 50 6 C 50 13, 54 20, 54 25 C 42 16, 26 13, 6 17 C 14 28, 18 38, 12 49 C 20 43, 30 44, 34 54 C 41 46, 51 47, 54 58 C 57 65, 60 69, 60 69 C 60 69, 63 65, 66 58 C 69 47, 79 46, 86 54 C 90 44, 100 43, 108 49 C 102 38, 106 28, 114 17 C 94 13, 78 16, 66 25 C 66 20, 70 13, 70 6 C 68 11, 64 18, 60 26 Z"
                fill="#09090b"
                stroke="#27272a"
                strokeWidth="0.8"
              />
              <circle cx="56.5" cy="27" r="1.5" fill="#ef4444" />
              <circle cx="63.5" cy="27" r="1.5" fill="#ef4444" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Floating Glowing Embers Rising */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`ember-${i}`}
            initial={{
              x: `${35 + (i * 3.8) % 30}vw`,
              y: '65vh',
              opacity: 0,
              scale: 0.3 + (i % 4) * 0.25,
            }}
            animate={{
              y: '25vh',
              x: `${35 + (i * 3.8) % 30 + (i % 2 === 0 ? 4 : -4)}vw`,
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 1.5 + (i % 3) * 0.4,
              repeat: Infinity,
              delay: (i * 0.12) % 1.2,
              ease: 'easeOut',
            }}
            className="absolute w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b,0_0_12px_#ea580c]"
          />
        ))}
      </div>

      {/* Center Natural Bouncing Pumpkin */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Natural Pumpkin Container */}
        <motion.div
          animate={{
            y: [-120, 0, -85, 0, -40, 0],
            scaleX: [0.95, 1.25, 0.92, 1.18, 0.97, 1.1],
            scaleY: [1.12, 0.78, 1.1, 0.82, 1.04, 0.9],
            rotate: [-6, 0, 5, 0, -3, 0],
          }}
          transition={{
            duration: 1.9,
            ease: [0.33, 1, 0.68, 1],
            times: [0, 0.35, 0.6, 0.78, 0.9, 1],
          }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 filter drop-shadow-[0_0_40px_rgba(249,115,22,0.85)]"
        >
          {/* Natural Pumpkin SVG (Pure organic pumpkin with natural ribs & realistic stem) */}
          <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible drop-shadow-[0_0_35px_rgba(249,115,22,0.85)]">
            <defs>
              {/* Vibrant Orange Body Shading */}
              <radialGradient id="natPumpkinBody" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#ffb703" />
                <stop offset="35%" stopColor="#f77f00" />
                <stop offset="75%" stopColor="#d65108" />
                <stop offset="100%" stopColor="#9a3412" />
              </radialGradient>

              {/* Side Rib Lobe Gradient */}
              <radialGradient id="natSideLobe" cx="28%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#f77f00" />
                <stop offset="65%" stopColor="#d65108" />
                <stop offset="100%" stopColor="#7c2d12" />
              </radialGradient>

              {/* Center Highlight Crown */}
              <radialGradient id="natCenterHigh" cx="50%" cy="28%" r="48%">
                <stop offset="0%" stopColor="#ffe082" />
                <stop offset="30%" stopColor="#ffb703" />
                <stop offset="65%" stopColor="#f77f00" />
                <stop offset="100%" stopColor="#c54100" />
              </radialGradient>

              {/* Natural Wooden Stem */}
              <linearGradient id="natBrownStem" x1="20%" y1="0%" x2="80%" y2="100%">
                <stop offset="0%" stopColor="#8d5b4c" />
                <stop offset="35%" stopColor="#6b3a2a" />
                <stop offset="85%" stopColor="#4a2214" />
                <stop offset="100%" stopColor="#2c120a" />
              </linearGradient>

              {/* Soft Surface Light Sheen */}
              <linearGradient id="natSheen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>

              {/* Glowing Warm Fire Inner Light */}
              <radialGradient id="natFireGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#fef08a" />
                <stop offset="65%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#991b1b" />
              </radialGradient>

              {/* Carve Depth Shadow */}
              <filter id="natCarveDepth" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#270902" floodOpacity="0.95" />
              </filter>
            </defs>

            {/* Back Outer Ribs */}
            <path
              d="M 60 22 C 10 22, 2 95, 60 102 C 118 95, 110 22, 60 22 Z"
              fill="url(#natPumpkinBody)"
            />

            {/* Outer Left Lobe */}
            <path
              d="M 58 23 C 20 24, 6 44, 8 68 C 10 92, 30 101, 58 101 C 28 92, 20 46, 58 23 Z"
              fill="url(#natSideLobe)"
            />

            {/* Outer Right Lobe */}
            <path
              d="M 62 23 C 100 24, 114 44, 112 68 C 110 92, 90 101, 62 101 C 92 92, 100 46, 62 23 Z"
              fill="url(#natSideLobe)"
            />

            {/* Inner Left Rib */}
            <path
              d="M 59 22 C 34 24, 20 44, 23 68 C 26 90, 42 100, 59 101 C 36 90, 32 46, 59 22 Z"
              fill="url(#natPumpkinBody)"
            />

            {/* Inner Right Rib */}
            <path
              d="M 61 22 C 86 24, 100 44, 97 68 C 94 90, 78 100, 61 101 C 84 90, 88 46, 61 22 Z"
              fill="url(#natPumpkinBody)"
            />

            {/* Center Front Main Lobe */}
            <path
              d="M 60 22 C 40 24, 34 44, 36 68 C 38 90, 48 101, 60 102 C 72 101, 82 90, 84 68 C 86 44, 80 24, 60 22 Z"
              fill="url(#natCenterHigh)"
            />

            {/* Natural Organic Grooves & Texture Lines */}
            <path d="M 46 25 Q 36 60 48 98" fill="none" stroke="#8c2d0c" strokeWidth="1.2" opacity="0.45" />
            <path d="M 74 25 Q 84 60 72 98" fill="none" stroke="#8c2d0c" strokeWidth="1.2" opacity="0.45" />
            <path d="M 60 24 Q 60 62 60 100" fill="none" stroke="#a33a10" strokeWidth="0.8" opacity="0.3" />

            {/* Upper Surface Glow / Light Sheen */}
            <ellipse cx="60" cy="40" rx="36" ry="18" fill="url(#natSheen)" />

            {/* Top Stem Socket Depression */}
            <ellipse cx="60" cy="24" rx="13" ry="4" fill="#381308" opacity="0.85" />

            {/* Distinct Curved Natural Brown Stem */}
            <path
              d="M 54 25 C 50 12, 54 3, 44 -4 C 53 -1, 61 10, 58 24 Z"
              fill="url(#natBrownStem)"
              stroke="#1a0a05"
              strokeWidth="0.9"
            />
            {/* Stem Woody Grain Lines */}
            <path d="M 50 12 Q 47 4 45 -2" fill="none" stroke="#2c120a" strokeWidth="0.8" opacity="0.7" />
            <path d="M 53 15 Q 51 8 48 1" fill="none" stroke="#8d5b4c" strokeWidth="0.6" opacity="0.5" />

            {/* Glowing Jack-o'-lantern Carved Face */}
            <g className="animate-pulse" style={{ animationDuration: '0.85s' }}>
              {/* Left Triangular Eye */}
              <path d="M 28 44 L 52 54 L 38 60 Z" fill="#1c0501" />
              <path d="M 30 46 L 50 54 L 38 58 Z" fill="url(#natFireGlow)" filter="url(#natCarveDepth)" style={{ filter: 'drop-shadow(0 0 12px #fef08a)' }} />

              {/* Right Triangular Eye */}
              <path d="M 92 44 L 68 54 L 82 60 Z" fill="#1c0501" />
              <path d="M 90 46 L 70 54 L 82 58 Z" fill="url(#natFireGlow)" filter="url(#natCarveDepth)" style={{ filter: 'drop-shadow(0 0 12px #fef08a)' }} />

              {/* Triangular Nose */}
              <polygon points="60,54 53,64 67,64" fill="#1c0501" />
              <polygon points="60,56 55,63 65,63" fill="url(#natFireGlow)" style={{ filter: 'drop-shadow(0 0 8px #fde047)' }} />

              {/* Wide Grinning Toothy Mouth */}
              <path
                d="M 24 66 Q 60 98 96 66 Q 84 82 73 80 L 73 72 L 67 80 L 60 72 L 53 80 L 47 72 L 47 80 Q 36 82 24 66 Z"
                fill="#1c0501"
              />
              <path
                d="M 25 67 Q 60 97 95 67 Q 83 81 72 79 L 72 71 L 66 79 L 60 71 L 54 79 L 48 71 L 48 79 Q 37 81 25 67 Z"
                fill="url(#natFireGlow)"
                filter="url(#natCarveDepth)"
                style={{ filter: 'drop-shadow(0 0 16px #fef08a)' }}
              />
            </g>
          </svg>
        </motion.div>

        {/* Dynamic Squash Shadow under Pumpkin */}
        <motion.div
          animate={{
            scale: [0.35, 1.25, 0.5, 1.15, 0.7, 1.05],
            opacity: [0.2, 0.85, 0.35, 0.8, 0.5, 0.75],
          }}
          transition={{
            duration: 1.9,
            ease: [0.33, 1, 0.68, 1],
            times: [0, 0.35, 0.6, 0.78, 0.9, 1],
          }}
          className="w-32 sm:w-44 h-5 mt-2 rounded-[100%] bg-gradient-to-r from-transparent via-orange-950 to-transparent blur-md pointer-events-none"
        />

        {/* Spooky Title & Animated Loading Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-8 text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>Happy Halloween</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-orange-500 drop-shadow-[0_0_25px_rgba(249,115,22,0.7)]">
            Entering Spooky Realm...
          </h2>

          {/* Loading Progress Bar Indicator */}
          <div className="w-48 sm:w-64 h-1.5 mx-auto rounded-full bg-orange-950/60 border border-orange-500/30 overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 2.1, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-orange-600 via-amber-400 to-orange-500 rounded-full shadow-[0_0_10px_#f97316]"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
