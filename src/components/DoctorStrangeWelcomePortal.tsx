import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface PortalWelcomeProps {
  key?: string;
  onComplete?: () => void;
  forceShow?: boolean;
}

// Highly optimized metal spark structure for buttery 60fps across all devices
interface MetalSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  colorIdx: number;
  alpha: number;
  decay: number;
  life: number;
  maxLife: number;
  trailMult: number;
  gravity: number;
  drag: number;
  canBranch: boolean;
}

// Electric blue incandescent metal spark palette (white-hot core + electric cyan & sapphire blue)
// Additive blending creates natural optical incandescence with 0 blur filters
const SPARK_COLORS = [
  '#FFFFFF', // White-hot molten
  '#E0F2FE', // Light blue-white
  '#7DD3FC', // Bright sky blue
  '#38BDF8', // Cyan metal flare
  '#00F0FF', // Vivid electric cyan
  '#0284C7', // Deep electric blue
  '#2563EB', // Sapphire blue
];

export default function DoctorStrangeWelcomePortal({ onComplete }: PortalWelcomeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isFinishedRef = useRef(false);
  const isAcceleratingRef = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Device-aware DPR: cap to 1.25 on high-DPI/mobile to guarantee smooth 60fps fill-rate
    const isMobile = width < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.0 : 1.25);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    const centerX = () => width / 2;
    const centerY = () => height / 2;
    const maxRadius = () => Math.hypot(width / 2, height / 2) + 40;

    const startTime = performance.now();
    let lastTime = startTime;

    // Timing parameters:
    // 1. Initial 2-second delay: small circle in center, violently spinning with realistic metal sparks
    // 2. After 2 seconds: smooth, accelerating expansion until the whole website is revealed
    const SMALL_CIRCLE_DELAY = 2000;
    const EXPAND_DURATION = 1200;

    // Small circle radius held during the initial 2-second delay
    const smallRadius = Math.max(38, Math.min(54, Math.min(width, height) * 0.08));
    let currentRadius = smallRadius;
    let rotationAngle = 0;

    // Particle pool sized for solid 60fps performance on all devices
    const MAX_SPARKS = isMobile ? 180 : 320;
    const sparks: MetalSpark[] = [];

    // Preallocated color buckets for batched draw calls (reduces draw calls from 1000+ to <10)
    const colorBuckets: { x: number; y: number; tx: number; ty: number }[][] = SPARK_COLORS.map(
      () => []
    );
    const whiteHeads: { x: number; y: number; r: number }[] = [];

    // Spawn authentic Doctor Strange sling ring metal sparks:
    // Ejected tangentially from the perimeter of the spinning circle
    const spawnSparks = (cx: number, cy: number, r: number, count: number) => {
      if (r <= 0 || sparks.length >= MAX_SPARKS) return;
      // Do not spawn if circle rim is already far off-screen
      if (r > Math.max(width, height) * 0.85) return;

      const spawnLimit = Math.min(count, MAX_SPARKS - sparks.length);

      for (let i = 0; i < spawnLimit; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radialOffset = (Math.random() - 0.5) * 4;
        const spawnR = Math.max(2, r + radialOffset);

        const x = cx + Math.cos(angle) * spawnR;
        const y = cy + Math.sin(angle) * spawnR;

        // Tangential velocity vector (clockwise rotation around circle)
        const tangentX = -Math.sin(angle);
        const tangentY = Math.cos(angle);

        // Outward radial unit vector
        const radialX = Math.cos(angle);
        const radialY = Math.sin(angle);

        // Sling ring physics:
        // High tangential speed + outward centrifugal fling
        const tangentSpeed = 6.0 + Math.random() * 14.0;
        const outwardSpeed = 1.0 + Math.random() * 4.0;

        const vx = tangentX * tangentSpeed + radialX * outwardSpeed;
        const vy = tangentY * tangentSpeed + radialY * outwardSpeed;

        const maxLife = 14 + Math.random() * 20;
        const size = 1.1 + Math.random() * 1.5;

        // Weighted color selection favoring white-hot cores and bright cyan
        const colorIdx =
          Math.random() < 0.35 ? 0 : Math.floor(Math.random() * SPARK_COLORS.length);

        sparks.push({
          x,
          y,
          vx,
          vy,
          size,
          colorIdx,
          alpha: 1.0,
          decay: 1.0 / maxLife,
          life: 0,
          maxLife,
          trailMult: 1.2 + Math.random() * 1.2,
          gravity: 0.22 + Math.random() * 0.16,
          drag: 0.94 + Math.random() * 0.02,
          canBranch: Math.random() < 0.15,
        });
      }
    };

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67, 1.8);
      lastTime = time;
      const elapsed = time - startTime;
      const cx = centerX();
      const cy = centerY();
      const maxR = maxRadius();

      // State machine for radius:
      // 0s to 2s: small circle in center with subtle kinetic hum
      // after 2s: circle smoothly gets bigger until whole website is visible
      if (isAcceleratingRef.current) {
        currentRadius += ((maxR - currentRadius) * 0.25 + 40) * dt;
      } else if (elapsed < SMALL_CIRCLE_DELAY) {
        // Phase 1: Small circle delayed for 2 seconds with energetic jitter
        const pulse = Math.sin(elapsed * 0.018) * 1.2;
        currentRadius = smallRadius + pulse;
      } else {
        // Phase 2: After 2 seconds, circle expands smoothly until the whole website is revealed
        const expandElapsed = elapsed - SMALL_CIRCLE_DELAY;
        const progress = Math.min(expandElapsed / EXPAND_DURATION, 1.0);
        // Exponential/cubic acceleration for the grand portal reveal
        const ease = progress < 0.6
          ? 2.5 * progress * progress
          : 1 - Math.pow(1 - progress, 2.5);
        currentRadius = smallRadius + (maxR - smallRadius) * ease;
      }

      // Continuous sling ring rotation
      rotationAngle += 0.32 * dt;

      // Spawn rate: balanced for smooth 60fps
      const isExpanding = elapsed >= SMALL_CIRCLE_DELAY || isAcceleratingRef.current;
      const spawnCount = isExpanding
        ? (isMobile ? 12 : 18)
        : (isMobile ? 8 : 14);

      spawnSparks(cx, cy, currentRadius, spawnCount);

      ctx.save();
      ctx.scale(dpr, dpr);

      // STEP 1: Dark veil covering the website
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // STEP 2: Cut clean circular aperture through the veil to reveal website underneath
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(cx, cy, Math.max(0, currentRadius), 0, Math.PI * 2);
      ctx.fill();

      // STEP 3: Authentic Doctor Strange Molten Spark Rim
      // Use 'lighter' additive blend mode: overlapping sparks burn with bright optical heat
      ctx.globalCompositeOperation = 'lighter';

      if (currentRadius < maxR + 20) {
        // Clean circular arcs hugging the perimeter (0 chords crossing the interior!)
        const arcCount = isMobile ? 4 : 6;
        for (let i = 0; i < arcCount; i++) {
          const start = rotationAngle * (1.2 + i * 0.15) + (i * Math.PI * 2) / arcCount;
          const arcLength = 0.5 + Math.sin(rotationAngle * 2 + i) * 0.2;
          const rimOffset = (i % 2 === 0 ? 1 : -1) * (i * 0.5);
          const r = Math.max(2, currentRadius + rimOffset);

          ctx.beginPath();
          ctx.arc(cx, cy, r, start, start + arcLength);
          ctx.lineWidth = i === 0 ? 2.2 : 1.3;
          ctx.strokeStyle = i % 2 === 0 ? '#FFFFFF' : '#00F0FF';
          ctx.stroke();
        }

        // Concentrated molten ring border
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.stroke();
      }

      // STEP 4: Update physics and batch sparks for maximum 60fps throughput
      for (let c = 0; c < SPARK_COLORS.length; c++) {
        colorBuckets[c].length = 0;
      }
      whiteHeads.length = 0;

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += dt;
        s.alpha -= s.decay * dt;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        // Starburst branch split
        if (s.canBranch && s.life > s.maxLife * 0.45 && sparks.length < MAX_SPARKS) {
          s.canBranch = false;
          const currentSpeed = Math.hypot(s.vx, s.vy);
          if (currentSpeed > 3.0) {
            const baseAngle = Math.atan2(s.vy, s.vx);
            const branchAngle = baseAngle + (Math.random() < 0.5 ? -0.55 : 0.55);
            const branchSpeed = currentSpeed * 0.7;

            sparks.push({
              x: s.x,
              y: s.y,
              vx: Math.cos(branchAngle) * branchSpeed,
              vy: Math.sin(branchAngle) * branchSpeed,
              size: s.size * 0.7,
              colorIdx: 0, // White-hot
              alpha: s.alpha,
              decay: 0.16,
              life: 0,
              maxLife: 10,
              trailMult: 1.1,
              gravity: s.gravity * 1.3,
              drag: 0.92,
              canBranch: false,
            });
          }
        }

        // Instantaneous physics: drag + downward gravity
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vx *= Math.pow(s.drag, dt);
        s.vy *= Math.pow(s.drag, dt);
        s.vy += s.gravity * dt;

        // Motion streak tail
        const tailX = s.x - s.vx * s.trailMult;
        const tailY = s.y - s.vy * s.trailMult;

        colorBuckets[s.colorIdx].push({
          x: s.x,
          y: s.y,
          tx: tailX,
          ty: tailY,
        });

        if (s.alpha > 0.3) {
          whiteHeads.push({
            x: s.x,
            y: s.y,
            r: Math.max(0.6, s.size * 0.55),
          });
        }
      }

      // Render spark streaks in ultra-efficient batched passes
      ctx.lineWidth = 1.6;
      ctx.lineCap = 'round';
      for (let c = 0; c < SPARK_COLORS.length; c++) {
        const bucket = colorBuckets[c];
        if (bucket.length === 0) continue;
        ctx.strokeStyle = SPARK_COLORS[c];
        ctx.beginPath();
        for (let j = 0; j < bucket.length; j++) {
          const pt = bucket[j];
          ctx.moveTo(pt.x, pt.y);
          ctx.lineTo(pt.tx, pt.ty);
        }
        ctx.stroke();
      }

      // Render incandescent white heads in a single batched pass
      if (whiteHeads.length > 0) {
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        for (let j = 0; j < whiteHeads.length; j++) {
          const h = whiteHeads[j];
          ctx.moveTo(h.x + h.r, h.y);
          ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      ctx.restore();

      // Check completion: when portal has fully expanded past the screen diagonal
      if (currentRadius >= maxR && !isFinishedRef.current) {
        isFinishedRef.current = true;
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
        return;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleInteraction = () => {
      isAcceleratingRef.current = true;
    };

    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  const handleClickFastForward = () => {
    isAcceleratingRef.current = true;
  };

  return (
    <motion.div
      key="doctor-strange-blue-portal-overlay"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      className="fixed inset-0 z-[9999] overflow-hidden select-none"
      onClick={handleClickFastForward}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-auto"
      />
    </motion.div>
  );
}
