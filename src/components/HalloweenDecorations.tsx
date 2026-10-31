import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

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

export default function HalloweenDecorations() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High performance Canvas Embers for steady 60fps across all devices
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
    const emberCount = isMobile ? 25 : 55;
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
      {/* 60fps Floating Embers */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none w-full h-full"
      />

      {/* Spiderwebs in top corners */}
      <div className="absolute top-2 left-2 text-2xl opacity-75 pointer-events-none select-none filter drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
        🕸️
      </div>
      <div className="absolute top-2 right-2 text-2xl opacity-75 pointer-events-none select-none filter drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">
        🕸️
      </div>

      {/* Gentle swaying bat in top-left */}
      <motion.div
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: 'top center' }}
        className="absolute top-12 left-6 hidden md:flex flex-col items-center pointer-events-none"
      >
        <div className="w-[1px] h-14 bg-orange-400/40" />
        <span className="text-xl select-none filter drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">
          🦇
        </span>
      </motion.div>

      {/* Subtle festive corner badge */}
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
