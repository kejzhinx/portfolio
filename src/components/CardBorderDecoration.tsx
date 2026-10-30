import { useTheme } from '../context/ThemeContext';

export default function CardBorderDecoration() {
  const { isHalloween, isChristmas, isRain } = useTheme();

  if (isRain) {
    return (
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
        {/* Subtle Rain Corner Glow Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/15 via-blue-500/5 to-transparent blur-sm" />
      </div>
    );
  }

  if (isHalloween) {
    return (
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
        {/* Subtle Halloween Corner Glow Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-orange-500/10 via-purple-500/5 to-transparent blur-sm" />
      </div>
    );
  }

  if (isChristmas) {
    return (
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden">
        {/* Subtle Christmas Corner Glow Accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/10 via-red-500/5 to-transparent blur-sm" />
      </div>
    );
  }

  return null;
}
