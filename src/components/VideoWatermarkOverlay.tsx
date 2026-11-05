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
    </div>
  );
}
