import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Maximize2,
  Layers,
  MousePointer2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import VideoWatermarkOverlay from './VideoWatermarkOverlay';

export interface OrbitProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'apps' | 'security' | 'graphics';
  categoryLabel: string;
  tags: string[];
  description: string;
  longDescription: string;
  image: string;
  videoUrl?: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  playStoreUrl?: string;
  features?: string[];
  highlights?: string;
  underDevelopment?: boolean;
  developmentOngoing?: boolean;
}

interface OrbitProjectStageProps {
  projects: OrbitProjectItem[];
  onOpenModal: (project: OrbitProjectItem) => void;
  activeCategory?: string;
}

// ----------------------------------------------------------------------
// Ambient Cyber Wave Background Canvas (matches user's screencast video)
// ----------------------------------------------------------------------
function CyberWaveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      t += 0.008;

      // Draw subtle luminous wave ribbons
      const waveConfigs = [
        { amp: 45, freq: 0.0018, speed: 0.8, yRatio: 0.45, color: 'rgba(56, 189, 248, 0.12)', width: 2 },
        { amp: 65, freq: 0.0012, speed: 1.1, yRatio: 0.52, color: 'rgba(99, 102, 241, 0.14)', width: 2.5 },
        { amp: 85, freq: 0.0009, speed: 0.6, yRatio: 0.48, color: 'rgba(147, 51, 234, 0.09)', width: 1.8 },
        { amp: 35, freq: 0.0022, speed: 1.4, yRatio: 0.58, color: 'rgba(34, 211, 238, 0.1)', width: 1.5 },
      ];

      waveConfigs.forEach((wc) => {
        ctx.beginPath();
        const baseY = h * wc.yRatio;
        for (let x = 0; x <= w; x += 6) {
          const y = baseY + Math.sin(x * wc.freq + t * wc.speed) * wc.amp + Math.cos(x * wc.freq * 0.6 - t * 0.5) * (wc.amp * 0.4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wc.color;
        ctx.lineWidth = wc.width;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none opacity-80"
    />
  );
}

// ----------------------------------------------------------------------
// 3D Revolving Cylinder Showcase
// ----------------------------------------------------------------------
export default function OrbitProjectStage({
  projects,
  onOpenModal,
}: OrbitProjectStageProps) {
  const { isDark, isHalloween, isChristmas } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);

  // Smooth rotation state with lerp
  const currentAngleRef = useRef(0);
  const targetAngleRef = useRef(0);
  const [displayAngle, setDisplayAngle] = useState(0);

  // Drag tracking
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartAngleRef = useRef(0);
  const hasDraggedRef = useRef(false);

  // Hover state (pauses auto idle drift)
  const [isHovered, setIsHovered] = useState(false);

  // Measure container width
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setViewportWidth(containerRef.current.offsetWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine cylinder geometry based on screen size
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth < 1024;

  // Balanced card dimensions & radius relative to perspective so front cards
  // don't blow up into an oversized hero card
  const cardWidth = isMobile ? 155 : isTablet ? 200 : 240;
  const cardHeight = isMobile ? 102 : isTablet ? 132 : 156;
  const radius = isMobile ? 270 : isTablet ? 400 : 520;

  // Prepare cards array: 14 to 16 cards around the 3D ring
  const cylinderCards = useMemo(() => {
    if (projects.length === 0) return [];
    if (projects.length >= 14) return projects.slice(0, 16);
    const result: OrbitProjectItem[] = [];
    while (result.length < 14) {
      result.push(...projects);
    }
    return result.slice(0, 14);
  }, [projects]);

  const count = cylinderCards.length || 1;
  const stepAngle = 360 / count;

  // RequestAnimationFrame loop for continuous lerp smoothing + gentle idle drift
  useEffect(() => {
    let animId: number;

    const tick = () => {
      // Gentle idle drift when user isn't interacting or dragging
      if (!isDraggingRef.current && !isHovered) {
        targetAngleRef.current += 0.04;
      }

      // Smooth lerp towards target angle
      const diff = targetAngleRef.current - currentAngleRef.current;
      currentAngleRef.current += diff * 0.085;

      setDisplayAngle(currentAngleRef.current);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  // 1. Mouse Wheel on 3D Showcase rotates the cylinder
  const handleWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaY) > 2) {
      targetAngleRef.current += e.deltaY * 0.16;
    }
  }, []);

  // 2. Global Page Scroll rotates the cylinder smoothly
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleWindowScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        if (rect.bottom > -200 && rect.top < window.innerHeight + 200) {
          targetAngleRef.current += delta * 0.24;
        }
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, []);

  // Attach wheel handler to container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: true });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Pointer drag to spin cylinder
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartAngleRef.current = targetAngleRef.current;
    hasDraggedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasDraggedRef.current = true;
    }
    targetAngleRef.current = dragStartAngleRef.current - deltaX * 0.35;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Navigation Arrows
  const rotateNext = () => {
    targetAngleRef.current -= stepAngle;
  };

  const rotatePrev = () => {
    targetAngleRef.current += stepAngle;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDraggingRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full overflow-visible select-none"
      style={{
        height: isMobile ? '440px' : isTablet ? '520px' : '580px',
        touchAction: 'pan-y',
        cursor: isDraggingRef.current ? 'grabbing' : 'grab',
      }}
    >
      {/* Subtle Ambient Cyber Glow Waves floating directly on page background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)',
        }}
      >
        <CyberWaveCanvas />
      </div>

      {/* CENTER FLOATING TYPOGRAPHY ("View all WORKS" in the open center of the 3D ring) */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10"
        style={{ transform: 'translateY(-6px)' }}
      >
        <span
          className={`font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${
            isDark || isHalloween || isChristmas ? 'text-white/90' : 'text-slate-900/90'
          }`}
          style={{ letterSpacing: '-0.02em' }}
        >
          View all
        </span>
        <span
          className={`font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.24em] uppercase -mt-2 sm:-mt-5 select-none ${
            isDark || isHalloween || isChristmas ? 'text-white/[0.12]' : 'text-slate-900/[0.08]'
          }`}
        >
          WORKS
        </span>
      </div>

      {/* 3D ORBIT RING STAGE (No outer card/box background — cards float directly in 3D space) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible"
        style={{
          perspective: isMobile ? '1300px' : isTablet ? '1750px' : '2200px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative w-0 h-0 will-change-transform pointer-events-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(17deg) rotateY(${displayAngle}deg)`,
          }}
        >
          {cylinderCards.map((project, index) => {
            const cardAngle = index * stepAngle;
            // Compute relative angle to camera (-180 to 180)
            const relAngle = ((((cardAngle + displayAngle) % 360) + 540) % 360) - 180;
            const rad = (relAngle * Math.PI) / 180;
            const cosVal = Math.cos(rad); // 1 = front, -1 = back
            const isFront = cosVal > 0;

            // Smooth depth opacity: front cards crisp, back cards subtly faded
            const opacity = Math.max(0.28, 0.45 + 0.55 * Math.max(0, cosVal));
            const zIndex = Math.round((cosVal + 1) * 100);

            return (
              <div
                key={`${project.id}-${index}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!hasDraggedRef.current) {
                    onOpenModal(project);
                  }
                }}
                className="absolute top-0 left-0 will-change-transform cursor-pointer group"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  transformStyle: 'preserve-3d',
                  zIndex,
                  opacity,
                  transition: 'opacity 0.2s ease-out',
                }}
              >
                {/* Clean Floating 3D Project Card (No macOS bar, no hero card box) */}
                <div
                  className="relative w-full h-full rounded-xl overflow-hidden border border-white/15 group-hover:border-cyan-400/70 bg-[#070b14] shadow-[0_14px_35px_rgba(0,0,0,0.55)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_18px_45px_rgba(56,189,248,0.35)]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Anti-Theft Watermark Overlay */}
                  <VideoWatermarkOverlay mode="card" showSecurityBadge={false} />

                  {/* Subtle hover-only title reveal */}
                  <div className="absolute inset-x-0 bottom-0 pt-6 pb-2 px-2.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-1.5 z-25 pointer-events-none">
                    <span className="text-[11px] font-semibold text-white truncate">
                      {project.title.split('—')[0].trim()}
                    </span>
                    <ArrowUpRight size={12} className="text-cyan-300 shrink-0" />
                  </div>

                  {/* Back-face depth shadow when facing away */}
                  {!isFront && (
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        backgroundColor: `rgba(4, 7, 17, ${Math.min(0.65, (1 - cosVal) * 0.4)})`,
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Minimal Left / Right Orbit Controls */}
      <div className="absolute bottom-2 right-4 sm:right-8 flex items-center gap-2 z-30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            rotatePrev();
          }}
          aria-label="Previous project in 3D orbit"
          className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
            isDark || isHalloween || isChristmas
              ? 'bg-white/[0.06] hover:bg-white/[0.14] border-white/15 text-white/80 hover:text-white'
              : 'bg-slate-900/10 hover:bg-slate-900/20 border-slate-900/15 text-slate-800'
          }`}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            rotateNext();
          }}
          aria-label="Next project in 3D orbit"
          className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
            isDark || isHalloween || isChristmas
              ? 'bg-white/[0.06] hover:bg-white/[0.14] border-white/15 text-white/80 hover:text-white'
              : 'bg-slate-900/10 hover:bg-slate-900/20 border-slate-900/15 text-slate-800'
          }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
