import { useTheme } from '../context/ThemeContext';

export default function FloatingCyberObjects() {
  const { isDark } = useTheme();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {isDark ? (
        <>
          {/* Dark Mode Aurora / Nebula Ambient Orbs - Hardware Accelerated */}
          <div 
            className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[50px] sm:blur-[140px] pointer-events-none transform-gpu will-change-transform bg-indigo-600/15" 
          />
          <div 
            className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[50px] sm:blur-[150px] pointer-events-none transform-gpu will-change-transform bg-cyan-500/12" 
          />
          <div 
            className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full blur-[60px] sm:blur-[160px] pointer-events-none transform-gpu will-change-transform bg-purple-600/12" 
          />
        </>
      ) : (
        <>
          {/* Light Mode Multi-Tone Aurora Ambient Mesh - Hardware Accelerated */}
          <div 
            className="absolute top-[-5%] left-[-8%] w-[50vw] h-[50vw] rounded-full blur-[45px] sm:blur-[130px] pointer-events-none transform-gpu will-change-transform bg-gradient-to-br from-indigo-300/30 via-violet-300/25 to-purple-200/20" 
          />
          <div 
            className="absolute top-[35%] right-[-8%] w-[48vw] h-[48vw] rounded-full blur-[50px] sm:blur-[140px] pointer-events-none transform-gpu will-change-transform bg-gradient-to-bl from-rose-200/25 via-pink-200/20 to-amber-200/20" 
          />
          <div 
            className="absolute bottom-[-8%] left-[15%] w-[55vw] h-[55vw] rounded-full blur-[55px] sm:blur-[150px] pointer-events-none transform-gpu will-change-transform bg-gradient-to-tr from-sky-200/25 via-indigo-200/20 to-teal-100/20" 
          />
          <div 
            className="absolute top-[65%] right-[25%] w-[35vw] h-[35vw] rounded-full blur-[45px] sm:blur-[120px] pointer-events-none transform-gpu will-change-transform bg-gradient-to-r from-violet-200/20 to-fuchsia-200/15" 
          />
        </>
      )}

      {/* Subtle Tech Grid Pattern */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity ${
          isDark ? 'opacity-[0.035]' : 'opacity-[0.045]'
        }`}
        style={{
          backgroundImage: isDark
            ? `linear-gradient(to right, rgba(99, 102, 241, 0.25) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(99, 102, 241, 0.25) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(99, 102, 241, 0.16) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(99, 102, 241, 0.16) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  );
}
