import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Exact 3D Purple Bat with glowing golden-yellow eyes, pointed ears, fangs, and purple wings
// Directly matching the user reference image: image_50db643c.png
export function PurpleBat({
  size = 54,
  className = '',
  flapping = true,
}: {
  size?: number;
  className?: string;
  flapping?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative inline-block select-none pointer-events-none ${className}`}
      style={{
        width: size,
        height: Math.round((size * 43) / 53),
      }}
    >
      {!imgError ? (
        <motion.div
          animate={
            flapping
              ? {
                  scaleY: [1, 0.42, 1],
                  y: [0, -3.5, 0],
                }
              : {}
          }
          transition={{
            duration: 0.14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ transformOrigin: '50% 50%' }}
          className="w-full h-full"
        >
          <img
            src="/assets/halloween-bat-character.png"
            alt="Halloween 3D Purple Bat"
            className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(250,204,21,0.7)] drop-shadow-[0_4px_14px_rgba(88,28,135,0.8)]"
            draggable={false}
            onError={() => setImgError(true)}
          />
        </motion.div>
      ) : (
        // High fidelity vector backup matching image_50db643c.png if image is ever unavailable
        <motion.svg
          viewBox="0 0 100 80"
          className="w-full h-full"
          animate={
            flapping
              ? {
                  scaleY: [1, 0.42, 1],
                  y: [0, -3, 0],
                }
              : {}
          }
          transition={{ duration: 0.14, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '50% 45%' }}
        >
          <defs>
            <radialGradient id="batHeadGrad" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#8A42B5" />
              <stop offset="40%" stopColor="#5E248C" />
              <stop offset="80%" stopColor="#350E57" />
              <stop offset="100%" stopColor="#1B042E" />
            </radialGradient>
            <linearGradient id="batWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#752FA3" />
              <stop offset="50%" stopColor="#4A1970" />
              <stop offset="100%" stopColor="#25083B" />
            </linearGradient>
            <radialGradient id="batEyeGlow" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="30%" stopColor="#FFF59D" />
              <stop offset="70%" stopColor="#FFD600" />
              <stop offset="100%" stopColor="#FF9100" />
            </radialGradient>
          </defs>
          {/* Wings */}
          <path
            d="M 40 45 C 28 36, 12 32, 1 40 C 5 50, 9 58, 6 70 C 15 62, 23 60, 27 65 C 33 58, 39 56, 42 53 Z"
            fill="url(#batWingGrad)"
            stroke="#1B042E"
            strokeWidth="0.8"
          />
          <path
            d="M 60 45 C 72 36, 88 32, 99 40 C 95 50, 91 58, 94 70 C 85 62, 77 60, 73 65 C 67 58, 61 56, 58 53 Z"
            fill="url(#batWingGrad)"
            stroke="#1B042E"
            strokeWidth="0.8"
          />
          {/* Ears */}
          <polygon points="36,36 29,12 47,26" fill="url(#batHeadGrad)" />
          <polygon points="36,33 31,16 44,26" fill="#D98A8E" />
          <polygon points="64,36 71,12 53,26" fill="url(#batHeadGrad)" />
          <polygon points="64,33 69,16 56,26" fill="#D98A8E" />
          {/* Body & Head */}
          <ellipse cx="50" cy="52" rx="14" ry="12" fill="url(#batHeadGrad)" />
          <circle cx="50" cy="38" r="15" fill="url(#batHeadGrad)" />
          {/* Fangs */}
          <polygon points="48,44 49,48 50,44" fill="#FFFFFF" />
          <polygon points="50,44 51,48 52,44" fill="#FFFFFF" />
          {/* Glowing Golden Eyes */}
          <ellipse cx="44" cy="37" rx="4.5" ry="5" fill="url(#batEyeGlow)" />
          <ellipse cx="56" cy="37" rx="4.5" ry="5" fill="url(#batEyeGlow)" />
          <circle cx="43" cy="35" r="1.3" fill="#FFFFFF" />
          <circle cx="55" cy="35" r="1.3" fill="#FFFFFF" />
        </motion.svg>
      )}
    </div>
  );
}

interface Ember {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxLife: number;
  life: number;
}

interface ScrollBat {
  id: number;
  direction: 'right' | 'left';
  startY: number;
  midY: number;
  endY: number;
  scale: number;
  duration: number;
  delay: number;
  size: number;
  tiltAngle: number;
}

export default function HalloweenDecorations() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeScrollBats, setActiveScrollBats] = useState<ScrollBat[]>([]);
  const lastScrollY = useRef(0);
  const lastSpawnTime = useRef(0);
  const batCounter = useRef(0);

  // Scroll & Wheel Listener: Spawns flying bats EVERYWHERE across the viewport ONLY when user scrolls UP or DOWN
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const triggerBats = (delta: number) => {
      const now = performance.now();
      // Responsive trigger threshold; throttled so bursts look organic without overwhelming
      if (Math.abs(delta) > 4 && now - lastSpawnTime.current > 260) {
        lastSpawnTime.current = now;
        const isScrollingDown = delta > 0;
        const vh = window.innerHeight;

        // Distribute bats EVERYWHERE across vertical height lanes (not in a single line!)
        // Lanes: 1. Top sky (6-22%), 2. Upper-mid (24-42%), 3. Center (45-63%), 4. Lower-mid (65-82%), 5. Bottom (84-95%)
        const verticalLanes = [
          { min: 0.06, max: 0.22 },
          { min: 0.24, max: 0.42 },
          { min: 0.45, max: 0.63 },
          { min: 0.65, max: 0.82 },
          { min: 0.84, max: 0.95 },
        ];

        // Pick 3 to 5 lanes across the screen for this scroll event
        const shuffledLanes = [...verticalLanes].sort(() => 0.5 - Math.random());
        const batCount = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5 bats everywhere
        const selectedLanes = shuffledLanes.slice(0, batCount);

        const newBats: ScrollBat[] = selectedLanes.map((lane, index) => {
          const laneHeightRange = lane.max - lane.min;
          const startY = (lane.min + Math.random() * laneHeightRange) * vh;

          // Parabolic swoop path: down on scroll-down, up on scroll-up
          const swoopOffset = isScrollingDown
            ? 70 + Math.random() * 80
            : -(70 + Math.random() * 80);
          const midY = startY + swoopOffset;
          const endY = startY + swoopOffset * 0.4;

          // Alternate / mix flight directions so bats cross each other across the screen
          const flyToRight = index % 2 === 0 ? Math.random() > 0.4 : Math.random() > 0.6;
          const duration = 1.3 + Math.random() * 0.6; // 1.3s to 1.9s fast swoops
          const delay = index * 0.06 + Math.random() * 0.08; // staggered organic burst

          return {
            id: ++batCounter.current,
            direction: flyToRight ? 'right' : 'left',
            startY,
            midY,
            endY,
            scale: 0.85 + Math.random() * 0.4, // varied sizes: 0.85 to 1.25
            duration,
            delay,
            size: 46 + Math.random() * 20, // 46px to 66px
            tiltAngle: isScrollingDown
              ? (flyToRight ? 15 : -15) + (Math.random() * 6 - 3)
              : (flyToRight ? -15 : 15) + (Math.random() * 6 - 3),
          };
        });

        setActiveScrollBats((prev) => [...prev.slice(-12), ...newBats]);

        // Clean up completed bats when their animation finishes
        const maxDuration = Math.max(...newBats.map((b) => b.duration + b.delay));
        setTimeout(() => {
          setActiveScrollBats((prev) =>
            prev.filter((b) => !newBats.some((nb) => nb.id === b.id))
          );
        }, (maxDuration + 0.3) * 1000);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;
      triggerBats(delta);
    };

    const handleWheel = (e: WheelEvent) => {
      triggerBats(e.deltaY);
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const delta = touchStartY - e.touches[0].clientY;
        touchStartY = e.touches[0].clientY;
        triggerBats(delta * 2);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // 60fps Ambient Glowing Embers Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const emberCount = isMobile ? 25 : 50;
    const embers: Ember[] = [];

    const createEmber = (): Ember => ({
      x: Math.random() * width,
      y: height + Math.random() * 20,
      size: Math.random() * 2.5 + 1,
      speedY: -(Math.random() * 0.9 + 0.4),
      speedX: (Math.random() - 0.5) * 0.6,
      opacity: Math.random() * 0.7 + 0.3,
      maxLife: Math.random() * 120 + 80,
      life: 0,
    });

    for (let i = 0; i < emberCount; i++) {
      const ember = createEmber();
      ember.y = Math.random() * height;
      ember.life = Math.random() * ember.maxLife;
      embers.push(ember);
    }

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.speedY;
        e.x += e.speedX;
        e.life++;

        const progress = e.life / e.maxLife;
        const currentOpacity = e.opacity * (1 - progress);

        if (e.y < -10 || e.life >= e.maxLife) {
          embers[i] = createEmber();
          continue;
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 2);
        gradient.addColorStop(0, `rgba(251, 146, 60, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(234, 88, 12, ${currentOpacity * 0.6})`);
        gradient.addColorStop(1, 'rgba(154, 52, 18, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(e.x, e.y, e.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none">
      {/* 60fps Floating Embers Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
      />

      {/* ====================================================================
          SCROLL-ONLY FLYING BATS: ONLY APPEARS WHEN SCROLLING UP OR DOWN.
          NO BATS FLY WHILE IDLE. THEY FLY ACROSS EVERYWHERE ON THE SCREEN.
          ==================================================================== */}
      <AnimatePresence>
        {activeScrollBats.map((bat) => {
          const isRight = bat.direction === 'right';

          return (
            <motion.div
              key={bat.id}
              initial={{
                x: isRight ? '-16vw' : '116vw',
                y: bat.startY,
                scaleX: isRight ? bat.scale : -bat.scale,
                scaleY: bat.scale,
                rotate: bat.tiltAngle,
                opacity: 0,
              }}
              animate={{
                x: isRight ? '116vw' : '-16vw',
                y: [bat.startY, bat.midY, bat.endY],
                rotate: isRight ? [bat.tiltAngle, -8, 12] : [-bat.tiltAngle, 8, -12],
                opacity: [0, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: bat.duration,
                delay: bat.delay,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="fixed z-50 pointer-events-none select-none filter drop-shadow-[0_6px_22px_rgba(0,0,0,0.95)]"
            >
              <PurpleBat size={bat.size} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Spiderwebs in top corners */}
      <div className="absolute top-2 left-2 text-2xl opacity-75 pointer-events-none select-none filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
        🕸️
      </div>
      <div className="absolute top-2 right-2 text-2xl opacity-75 pointer-events-none select-none filter drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
        🕸️
      </div>

      {/* Subtle festive corner badge with pumpkin */}
      <motion.div
        animate={{ y: [-2, 3, -2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed bottom-6 right-6 hidden sm:flex items-end gap-2 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] pointer-events-none"
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl select-none">🎃</span>
          <span className="text-[9px] font-mono font-bold text-orange-200 bg-orange-950/80 px-2 py-0.5 rounded-full border border-orange-500/40">
            Happy Halloween
          </span>
        </div>
      </motion.div>
    </div>
  );
}
