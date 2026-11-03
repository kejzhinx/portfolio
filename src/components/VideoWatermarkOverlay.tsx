import { useState, useId } from 'react';
import { Shield, Lock, ShieldAlert, Sparkles, Eye, Check } from 'lucide-react';

export interface VideoWatermarkOverlayProps {
  /** Size/context mode */
  mode?: 'card' | 'modal';
  /** Primary copyright owner name */
  creatorName?: string;
  /** Custom warning label */
  warningLabel?: string;
  /** Whether to show the bottom/top security indicator chip */
  showSecurityBadge?: boolean;
  /** Allow viewer to adjust opacity preset in modal */
  interactiveControls?: boolean;
}

export default function VideoWatermarkOverlay({
  mode = 'card',
  creatorName = 'Jeric de los Reyes',
  warningLabel = 'DO NOT COPY OR REPOST • ALL RIGHTS RESERVED',
  showSecurityBadge = true,
  interactiveControls = false,
}: VideoWatermarkOverlayProps) {
  const patternId = useId().replace(/:/g, '_');
  // Watermark density / opacity presets: 'balanced' (default, visible & readable), 'high' (anti-theft high visibility), 'discrete'
  const [securityLevel, setSecurityLevel] = useState<'balanced' | 'high' | 'subtle'>('balanced');
  const [showControls, setShowControls] = useState(false);

  // Determine opacity values based on mode and securityLevel
  const getOpacity = () => {
    if (securityLevel === 'high') {
      return {
        fillOpacity: 0.38,
        strokeOpacity: 0.65,
        badgeBg: 'bg-red-950/85 text-red-200 border-red-500/40',
        dotOpacity: 0.3,
      };
    }
    if (securityLevel === 'subtle') {
      return {
        fillOpacity: 0.16,
        strokeOpacity: 0.28,
        badgeBg: 'bg-slate-900/80 text-slate-300 border-white/20',
        dotOpacity: 0.12,
      };
    }
    // balanced default
    return {
      fillOpacity: mode === 'card' ? 0.24 : 0.28,
      strokeOpacity: mode === 'card' ? 0.42 : 0.5,
      badgeBg: 'bg-black/75 text-indigo-200 border-indigo-500/30',
      dotOpacity: 0.2,
    };
  };

  const { fillOpacity, strokeOpacity, badgeBg, dotOpacity } = getOpacity();

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. FULL-COVERAGE REPEATING DIAGONAL WATERMARK SVG PATTERN */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <pattern
            id={`watermark-pattern-${patternId}`}
            width={mode === 'card' ? '240' : '280'}
            height={mode === 'card' ? '120' : '140'}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-26)"
          >
            {/* Fine security dot grid */}
            <circle cx="20" cy="20" r="1" fill="#FFFFFF" fillOpacity={dotOpacity} />
            <circle cx="140" cy="80" r="1" fill="#6366F1" fillOpacity={dotOpacity} />
            <circle cx="220" cy="30" r="0.8" fill="#FFFFFF" fillOpacity={dotOpacity} />

            {/* Row 1: Primary Creator & Copyright Brand */}
            <text
              x="20"
              y="40"
              fill="#FFFFFF"
              fillOpacity={fillOpacity}
              stroke="#000000"
              strokeWidth="0.8"
              strokeOpacity={strokeOpacity}
              style={{
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 800,
                fontSize: mode === 'card' ? '12px' : '14px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              © {creatorName.toUpperCase()}
            </text>

            {/* Row 2: Anti-theft warning & Kejzhin handle */}
            <text
              x="60"
              y="95"
              fill="#818CF8"
              fillOpacity={fillOpacity * 1.1}
              stroke="#030712"
              strokeWidth="0.6"
              strokeOpacity={strokeOpacity}
              style={{
                fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontWeight: 700,
                fontSize: mode === 'card' ? '9px' : '11px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              {warningLabel}
            </text>

            {/* Micro security verification tag */}
            <text
              x="160"
              y="65"
              fill="#F59E0B"
              fillOpacity={fillOpacity * 0.75}
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 600,
                fontSize: mode === 'card' ? '7.5px' : '8.5px',
                letterSpacing: '0.08em',
              }}
            >
              • @KEJZHIN • AUTHENTIC WORK •
            </text>

            {/* Subtle diagonal safety line through pattern */}
            <line
              x1="0"
              y1="50"
              x2="280"
              y2="50"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              strokeDasharray="4 6"
              strokeOpacity={dotOpacity * 0.7}
            />
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#watermark-pattern-${patternId})`}
        />
      </svg>

      {/* 2. CENTER WATERMARK CREATOR STAMP (Prominent deterrent on center crops) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div
          className={`flex flex-col items-center justify-center text-center px-4 py-2.5 rounded-2xl border backdrop-blur-[1px] transition-all duration-300 ${
            mode === 'card'
              ? 'scale-75 sm:scale-90 opacity-60 group-hover/screen:opacity-90'
              : 'scale-90 sm:scale-100 opacity-70 hover:opacity-100'
          }`}
          style={{
            background: 'radial-gradient(ellipse at center, rgba(3, 7, 18, 0.55) 0%, rgba(3, 7, 18, 0.25) 75%, transparent 100%)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
          }}
        >
          <div className="flex items-center gap-1.5 mb-0.5">
            <Shield size={mode === 'card' ? 12 : 14} className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
            <span
              className="text-[10px] sm:text-xs font-black tracking-widest uppercase text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              style={{ letterSpacing: '0.18em' }}
            >
              {creatorName}
            </span>
            <Lock size={mode === 'card' ? 10 : 12} className="text-indigo-400" />
          </div>
          <span className="text-[8px] sm:text-[9.5px] font-mono font-semibold tracking-wider text-indigo-300/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            ORIGINAL WORK • COPYRIGHT PROTECTED
          </span>
        </div>
      </div>

      {/* 3. CORNER COPYRIGHT BADGE & SECURITY INDICATOR */}
      {showSecurityBadge && (
        <div
          className={`absolute ${
            mode === 'card'
              ? 'bottom-2 left-2 scale-90 sm:scale-95'
              : 'bottom-3 left-3 sm:bottom-4 sm:left-4'
          } flex items-center gap-1.5 z-30 pointer-events-auto`}
        >
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold backdrop-blur-md shadow-lg border transition-all ${badgeBg}`}
            title="Content Protection Active - Unauthorized Reproduction or Scraping Prohibited"
          >
            <ShieldAlert size={11} className="text-indigo-400 shrink-0" />
            <span className="tracking-wide">
              {mode === 'card' ? '© Jeric de los Reyes' : 'Protected Video Mockup • © Jeric de los Reyes'}
            </span>
          </div>

          {/* Interactive Security Level Selector for Modal Theater */}
          {interactiveControls && mode === 'modal' && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowControls((prev) => !prev)}
                className="px-2 py-1 rounded-full bg-black/70 hover:bg-black/90 text-slate-300 hover:text-white text-[9px] font-mono border border-white/20 transition-all flex items-center gap-1 cursor-pointer"
                title="Adjust Watermark Density"
              >
                <Eye size={10} />
                <span>{securityLevel.toUpperCase()}</span>
              </button>

              {showControls && (
                <div className="absolute bottom-full left-0 mb-1.5 p-1.5 rounded-xl bg-slate-950/95 border border-white/20 shadow-2xl backdrop-blur-lg flex flex-col gap-1 z-40 min-w-[125px]">
                  <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold px-1.5 pt-0.5">
                    Watermark Density
                  </span>
                  {(['subtle', 'balanced', 'high'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        setSecurityLevel(lvl);
                        setShowControls(false);
                      }}
                      className={`flex items-center justify-between px-2 py-1 rounded-lg text-[10px] font-semibold text-left transition-colors cursor-pointer ${
                        securityLevel === lvl
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="capitalize">{lvl}</span>
                      {securityLevel === lvl && <Check size={11} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
