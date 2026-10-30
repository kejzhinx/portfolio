import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ActiveBat {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  scale: number;
  duration: number;
  bankAngle: number;
}

export default function HalloweenDecorations() {
  const [bats, setBats] = useState<ActiveBat[]>([]);
  const lastScrollY = useRef(0);
  const lastSpawnTime = useRef(0);
  const batIdCounter = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const now = Date.now();

      // Trigger bats on scroll up or scroll down
      const scrollDelta = currentScrollY - lastScrollY.current;
      if (Math.abs(scrollDelta) > 16) {
        if (now - lastSpawnTime.current > 180) {
          lastSpawnTime.current = now;
          const count = Math.abs(scrollDelta) > 35 ? 2 : 1;
          const newBats: ActiveBat[] = [];

          for (let i = 0; i < count; i++) {
            batIdCounter.current += 1;
            const fromLeft = scrollDelta < 0 ? Math.random() > 0.3 : Math.random() > 0.5; // Slightly vary direction when scrolling up
            const startX = fromLeft ? -90 : window.innerWidth + 90;
            const targetX = fromLeft ? window.innerWidth + 110 : -110;
            const startY = Math.min(window.innerHeight * 0.9, Math.max(120, Math.random() * window.innerHeight));
            const targetY = scrollDelta < 0
              ? Math.min(window.innerHeight - 80, startY + (60 + Math.random() * 200)) // Swoop downwards if scrolling up
              : Math.max(50, startY - (80 + Math.random() * 260)); // Swoop upwards if scrolling down
            const bankAngle = fromLeft ? 12 : -12;

            newBats.push({
              id: batIdCounter.current,
              startX,
              startY,
              targetX,
              targetY,
              scale: 0.75 + Math.random() * 0.5,
              duration: 1.3 + Math.random() * 0.6,
              bankAngle,
            });
          }

          setBats((prev) => [...prev.slice(-12), ...newBats]);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const removeBat = (id: number) => {
    setBats((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">

      {/* ====================================================================
          2. HANGING BATS SLEEPING FROM THE TOP EDGE / NAVBAR
          ==================================================================== */}
      {/* Upside Down Bat Left */}
      <motion.div
        animate={{ rotate: [-2, 2, -2], y: [0, 2, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-[18%] hidden md:flex flex-col items-center text-slate-900 pointer-events-none"
      >
        <div className="w-0.5 h-3 bg-white/20" />
        <svg viewBox="0 0 32 44" fill="none" className="w-7 h-10 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {/* Bat body hanging with folded wings */}
          <ellipse cx="16" cy="24" rx="8" ry="14" fill="#09090b" stroke="#27272a" strokeWidth="0.8" />
          {/* Folded Wings */}
          <path d="M 8 16 Q 3 26 8 36 Q 12 30 14 24 Z" fill="#121216" />
          <path d="M 24 16 Q 29 26 24 36 Q 20 30 18 24 Z" fill="#121216" />
          {/* Upside down Head with Pointed Ears */}
          <polygon points="12,38 10,43 14,40" fill="#09090b" />
          <polygon points="20,38 22,43 18,40" fill="#09090b" />
          <circle cx="16" cy="36" r="4.5" fill="#09090b" />
          {/* Glowing Eyes */}
          <circle cx="14.5" cy="37" r="0.8" fill="#ef4444" className="animate-pulse" />
          <circle cx="17.5" cy="37" r="0.8" fill="#ef4444" className="animate-pulse" />
          {/* Claws gripping top */}
          <line x1="14" y1="10" x2="14" y2="13" stroke="#e4e4e7" strokeWidth="1" />
          <line x1="18" y1="10" x2="18" y2="13" stroke="#e4e4e7" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* Upside Down Bat Right */}
      <motion.div
        animate={{ rotate: [2, -2, 2], y: [0, 2, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-0 right-[22%] hidden md:flex flex-col items-center text-slate-900 pointer-events-none"
      >
        <div className="w-0.5 h-4 bg-white/20" />
        <svg viewBox="0 0 32 44" fill="none" className="w-6 h-9 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <ellipse cx="16" cy="24" rx="8" ry="14" fill="#09090b" stroke="#27272a" strokeWidth="0.8" />
          <path d="M 8 16 Q 3 26 8 36 Q 12 30 14 24 Z" fill="#121216" />
          <path d="M 24 16 Q 29 26 24 36 Q 20 30 18 24 Z" fill="#121216" />
          <polygon points="12,38 10,43 14,40" fill="#09090b" />
          <polygon points="20,38 22,43 18,40" fill="#09090b" />
          <circle cx="16" cy="36" r="4.5" fill="#09090b" />
          <circle cx="14.5" cy="37" r="0.8" fill="#ef4444" className="animate-pulse" />
          <circle cx="17.5" cy="37" r="0.8" fill="#ef4444" className="animate-pulse" />
          <line x1="14" y1="10" x2="14" y2="13" stroke="#e4e4e7" strokeWidth="1" />
          <line x1="18" y1="10" x2="18" y2="13" stroke="#e4e4e7" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* ====================================================================
          3. FLOATING TRANS-DIMENSIONAL GHOSTS
          ==================================================================== */}
      {/* Floating Ghost Left */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
          x: [-4, 6, -4],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed top-1/3 left-4 hidden lg:flex flex-col items-center filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
      >
        <span className="text-3xl select-none">👻</span>
        <span className="text-[9px] font-mono font-bold text-purple-300 bg-purple-950/70 px-2 py-0.5 rounded-full border border-purple-500/40">
          Boo!
        </span>
      </motion.div>

      {/* Floating Ghost Right */}
      <motion.div
        animate={{
          y: [8, -8, 8],
          x: [4, -5, 4],
          opacity: [0.55, 0.85, 0.55],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="fixed top-2/3 right-5 hidden lg:flex flex-col items-center filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
      >
        <span className="text-3xl select-none">👻</span>
      </motion.div>

      {/* ====================================================================
          4. ANIMATED SPIDER COMING DOWN FROM HIS WEB THREAD
          ==================================================================== */}
      {/* Top-Right Hanging Animated Spider coming down on a silken web line */}
      <div className="fixed top-0 right-12 sm:right-28 pointer-events-none z-50 flex flex-col items-center">
        {/* Glowing Silken Web Thread lowering and raising */}
        <motion.div
          animate={{
            height: ['20px', '110px', '45px', '110px'],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[1.5px] bg-gradient-to-b from-orange-400/90 via-purple-300/80 to-white filter drop-shadow-[0_0_6px_rgba(249,115,22,1)]"
        />

        {/* Creepy Animating Spider Hanging at the end of the web line */}
        <motion.div
          animate={{
            rotate: [-12, 12, -12],
            scale: [0.95, 1.12, 0.95],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative -mt-1 filter drop-shadow-[0_4px_12px_rgba(249,115,22,0.95)]"
        >
          <svg viewBox="0 0 50 50" fill="none" className="w-8 h-8 sm:w-10 sm:h-10 overflow-visible">
            {/* Spider Abdomen & Thorax */}
            <ellipse cx="25" cy="28" rx="7" ry="8.5" fill="#09090b" stroke="#f97316" strokeWidth="1.2" />
            <circle cx="25" cy="17" r="5" fill="#09090b" stroke="#a855f7" strokeWidth="1.2" />

            {/* Spider Glowing Crimson Eyes */}
            <circle cx="23" cy="15.5" r="1.1" fill="#ef4444" className="animate-ping" />
            <circle cx="27" cy="15.5" r="1.1" fill="#ef4444" className="animate-ping" />

            {/* Wiggling Spider Legs - Left Side */}
            <path d="M 21 17 C 13 12, 7 14, 4 20" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 20 22 C 11 20, 6 25, 3 31" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 20 28 C 11 28, 6 34, 4 40" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 21 32 C 13 35, 8 42, 7 47" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" fill="none" />

            {/* Wiggling Spider Legs - Right Side */}
            <path d="M 29 17 C 37 12, 43 14, 46 20" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 30 22 C 39 20, 44 25, 47 31" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 30 28 C 39 28, 44 34, 46 40" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 29 32 C 37 35, 42 42, 43 47" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </motion.div>
      </div>



      {/* ====================================================================
          5. REALISTIC FLYING BATS TRIGGERED ON SCROLL DOWN
          Deep Nocturnal Charcoal Black with Glowing Crimson Eyes & Scalloped Wings
          ==================================================================== */}
      <AnimatePresence>
        {bats.map((bat) => (
          <motion.div
            key={bat.id}
            initial={{
              x: bat.startX,
              y: bat.startY,
              scale: bat.scale,
              rotate: bat.bankAngle,
              opacity: 0,
            }}
            animate={{
              x: bat.targetX,
              y: bat.targetY,
              opacity: [0, 1, 1, 0.9, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: bat.duration,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onAnimationComplete={() => removeBat(bat.id)}
            className="fixed pointer-events-none z-50 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
          >
            {/* Realistic Bat Wing Flapping Motion (No mustache squish!) */}
            <motion.div
              animate={{
                scaleY: [1, 0.42, 1],
                y: [-4, 4, -4],
              }}
              transition={{
                duration: 0.14,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '50% 45%' }}
            >
              {/* Authentic Anatomical Bat Silhouette */}
              <svg viewBox="0 0 120 70" fill="none" className="w-16 h-10 sm:w-20 sm:h-12 overflow-visible">
                {/* Midnight Charcoal Bat Body & Scalloped Wings */}
                <path
                  d="M 60 26 
                     C 56 18, 52 11, 50 6 
                     C 50 13, 54 20, 54 25 
                     C 42 16, 26 13, 6 17 
                     C 14 28, 18 38, 12 49 
                     C 20 43, 30 44, 34 54 
                     C 41 46, 51 47, 54 58 
                     C 57 65, 60 69, 60 69 
                     C 60 69, 63 65, 66 58 
                     C 69 47, 79 46, 86 54 
                     C 90 44, 100 43, 108 49 
                     C 102 38, 106 28, 114 17 
                     C 94 13, 78 16, 66 25 
                     C 66 20, 70 13, 70 6 
                     C 68 11, 64 18, 60 26 Z"
                  fill="#09090b"
                  stroke="#1c1917"
                  strokeWidth="0.8"
                />

                {/* Subtle Wing Rib Texture */}
                <path d="M 54 32 Q 34 32 12 49" stroke="#1c1917" strokeWidth="0.9" fill="none" />
                <path d="M 54 36 Q 42 42 34 54" stroke="#1c1917" strokeWidth="0.9" fill="none" />
                <path d="M 66 32 Q 86 32 108 49" stroke="#1c1917" strokeWidth="0.9" fill="none" />
                <path d="M 66 36 Q 78 42 86 54" stroke="#1c1917" strokeWidth="0.9" fill="none" />

                {/* Piercing Crimson Red Bat Eyes */}
                <circle cx="56.5" cy="27" r="1.5" fill="#ef4444" className="filter drop-shadow-[0_0_3px_#ff0000]" />
                <circle cx="63.5" cy="27" r="1.5" fill="#ef4444" className="filter drop-shadow-[0_0_3px_#ff0000]" />
              </svg>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
