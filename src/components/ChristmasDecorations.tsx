import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  density: number;
  speed: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
}

export default function ChristmasDecorations() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High performance Canvas Snowfall for steady 60fps across all devices
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
    const flakeCount = isMobile ? 40 : 85;
    const flakes: Snowflake[] = [];

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.8 + 0.8,
        density: Math.random() * flakeCount,
        speed: Math.random() * 0.9 + 0.6,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.35,
      });
    }

    let animId: number;
    let angle = 0;

    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      angle += 0.01;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speed;
        f.x += Math.sin(angle + f.swayOffset) * 0.6;

        if (f.y > height + 5) {
          f.y = -10;
          f.x = Math.random() * width;
        }
        if (f.x > width + 5) {
          f.x = -5;
        } else if (f.x < -5) {
          f.x = width + 5;
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true);
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
      {/* 60fps Canvas Snowfall */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
      />

      {/* ====================================================================
          1. FESTIVE PINE GARLAND & TWINKLING FAIRY LIGHTS ACROSS TOP
          ==================================================================== */}
      <div className="absolute top-0 left-0 right-0 h-11 flex justify-between items-start px-2 overflow-hidden pointer-events-none z-50">
        {[...Array(28)].map((_, i) => {
          const colors = [
            'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.95)]',
            'bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.95)]',
            'bg-amber-300 shadow-[0_0_12px_rgba(252,211,77,0.95)]',
            'bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.95)]',
          ];
          const colorClass = colors[i % colors.length];
          const delay = (i % 4) * 0.35;

          return (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="w-full h-2.5 border-b border-emerald-500/40 rounded-[50%]" />
              <motion.div
                animate={{
                  opacity: [0.35, 1, 0.35],
                  scale: [0.85, 1.15, 0.85],
                }}
                transition={{
                  duration: 1.3,
                  repeat: Infinity,
                  delay,
                  ease: 'easeInOut',
                }}
                className={`w-2.5 h-3.5 rounded-full ${colorClass} mt-[-2px]`}
              />
            </div>
          );
        })}
      </div>

      {/* ====================================================================
          2. HANGING CHRISTMAS GLASS BAUBLES / ORNAMENTS (Sides)
          ==================================================================== */}
      {/* Left Hanging Red & Gold Baubles */}
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-12 left-5 hidden md:flex flex-col items-center"
      >
        <div className="w-[1px] h-20 bg-amber-400/50" />
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-700 via-red-500 to-rose-300 shadow-[0_0_12px_rgba(239,68,68,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.7)] border border-amber-300/40 relative">
          <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/70" />
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: [3, -3, 3] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-12 left-14 hidden md:flex flex-col items-center"
      >
        <div className="w-[1px] h-32 bg-amber-400/50" />
        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-700 via-emerald-500 to-teal-300 shadow-[0_0_10px_rgba(16,185,129,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.7)] border border-amber-300/40 relative">
          <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-white/70" />
        </div>
      </motion.div>

      {/* Right Hanging Gold & Blue Baubles */}
      <motion.div
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-12 right-6 hidden md:flex flex-col items-center"
      >
        <div className="w-[1px] h-24 bg-amber-400/50" />
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-100 shadow-[0_0_12px_rgba(245,158,11,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.5),inset_2px_2px_4px_rgba(255,255,255,0.8)] border border-amber-200/40 relative">
          <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/70" />
        </div>
      </motion.div>

      {/* ====================================================================
          3. HOLLY & RED BERRIES IN TOP CORNERS
          ==================================================================== */}
      <div className="absolute top-2.5 left-2 flex items-center gap-1 opacity-90 pointer-events-none">
        <span className="text-2xl select-none">🌿</span>
        <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.9)] -ml-2.5 mt-1 border border-white/30" />
        <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.9)] -ml-1 mt-2.5 border border-white/30" />
      </div>

      <div className="absolute top-2.5 right-2 flex items-center gap-1 opacity-90 pointer-events-none">
        <div className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.9)] -mr-1 mt-2.5 border border-white/30" />
        <div className="w-3 h-3 rounded-full bg-red-600 shadow-[0_0_8px_rgba(239,68,68,0.9)] -mr-2.5 mt-1 border border-white/30" />
        <span className="text-2xl select-none">🌿</span>
      </div>

      {/* ====================================================================
          4. CANDY CANES & GIFT BOXES ON SIDES
          ==================================================================== */}
      {/* Left Candy Cane */}
      <div className="fixed top-1/2 left-3 hidden lg:flex flex-col items-center select-none filter drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]">
        <span className="text-3xl">🦯</span>
      </div>

      {/* Right Gift Box */}
      <div className="fixed top-1/2 right-3 hidden lg:flex flex-col items-center select-none filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">
        <span className="text-3xl">🎁</span>
      </div>

      {/* ====================================================================
          5. FESTIVE CORNER BADGE & CHRISTMAS TREE
          ==================================================================== */}
      <motion.div
        animate={{
          y: [-3, 4, -3],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        className="fixed bottom-6 right-6 hidden sm:flex items-end gap-2 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
      >
        <span className="text-2xl select-none">🎁</span>
        <div className="flex flex-col items-center text-red-500">
          <span className="text-3xl select-none">🎄</span>
          <span className="text-[9px] font-mono font-bold text-red-200 bg-red-950/80 px-2 py-0.5 rounded-full border border-red-500/40">
            Merry Christmas
          </span>
        </div>
      </motion.div>
    </div>
  );
}
