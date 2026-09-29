import { motion } from 'motion/react';

export default function SubPageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Background fill to ensure no transparency issues */}
      <div className="absolute inset-0 bg-bg-dark" />
      
      {/* Dynamic atmospheric glows - more vibrant */}
      <div className="absolute top-[5%] -right-[10%] w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[140px] opacity-40 animate-pulse" />
      <div className="absolute bottom-[10%] -left-[10%] w-[700px] h-[700px] bg-brand-pink/5 rounded-full blur-[160px] opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[200px] opacity-20" />
      
      {/* Subtle Tech-Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ 
             backgroundImage: `linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px), 
                               linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px)`,
             backgroundSize: '100px 100px' 
           }} 
      />

      {/* Floating Technical Elements - Optimized for higher detail on desktop */}
      <div className="absolute inset-0">
        {[...Array(window.innerWidth > 768 ? 12 : 6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
                x: (i * 8 + Math.random() * 10) + '%', 
                y: (i * 7 + Math.random() * 15) + '%',
                opacity: 0,
                rotate: Math.random() * 360
            }}
            animate={{ 
              y: ['0%', (Math.random() * -30 - 15) + '%', '0%'],
              opacity: [0.03, 0.08, 0.03],
              rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)]
            }}
            transition={{ 
              duration: 12 + i * 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className={`absolute rounded-xl border border-brand-purple/10 ${i % 3 === 0 ? 'w-48 h-48' : 'w-20 h-20'}`}
            style={{ 
              clipPath: i % 4 === 0 ? 'polygon(0% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Hexagon Pattern Section - Static on mobile, animated on desktop */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[8%] right-[15%] opacity-[0.03] scale-150 hidden md:block"
      >
        <svg width="300" height="300" viewBox="0 0 100 100">
           <path d="M50 1L95 25V75L50 99L5 75V25L50 1Z" fill="none" stroke="#00E5FF" strokeWidth="0.3" />
           <path d="M50 20L80 35V65L50 80L20 65V35L50 20Z" fill="none" stroke="#00E5FF" strokeWidth="0.1" />
        </svg>
      </motion.div>

      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[15%] left-[8%] opacity-[0.02] scale-[2.5]"
      >
        <svg width="400" height="400" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="48" fill="none" stroke="#00E5FF" strokeWidth="0.1" strokeDasharray="3 3" />
           <circle cx="50" cy="50" r="30" fill="none" stroke="#00E5FF" strokeWidth="0.05" />
        </svg>
      </motion.div>

      {/* Additional Spinning Technical Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] border border-brand-purple/5 rounded-full border-dashed opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] border border-brand-pink/5 rounded-full border-dashed opacity-10"
      />

      {/* Floating Geometry Objects (More) - Reduced for performance */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`extra-obj-${i}`}
            initial={{ 
              x: (20 + i * 25) + '%', 
              y: (15 + i * 20) + '%',
              opacity: 0
            }}
            animate={{ 
              y: ['0%', '-20%', '0%'],
              opacity: [0, 0.05, 0]
            }}
            transition={{ 
              duration: 20 + i * 5, 
              repeat: Infinity, 
              delay: i * 5
            }}
            className="absolute w-24 h-24 md:w-32 md:h-32 border-[0.5px] border-brand-purple/10 rounded-lg"
          />
        ))}
      </div>

      {/* Pulsing Light Circles - Static on mobile */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] border border-brand-purple/5 rounded-full z-0" />
 
       {/* Cyber HUD Elements */}
       <div className="absolute inset-0 z-0">
         <div className="absolute top-20 left-20 w-32 h-px bg-linear-to-r from-brand-purple/20 to-transparent" />
         <div className="absolute bottom-40 right-20 w-32 h-px bg-linear-to-l from-brand-pink/20 to-transparent" />
         <div className="absolute top-1/2 left-4 w-px h-64 bg-linear-to-b from-transparent via-brand-purple/10 to-transparent" />
       </div>

      {/* top & Bottom Subtle Boundaries */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-purple/20 to-transparent" />
      
      {/* Scanning Line Effect - slow and refined */}
      <motion.div 
        animate={{ y: ['-100%', '350%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-purple/40 to-transparent md:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
      />
      
      {/* Reverse Scanning Line - Desktop only */}
      <motion.div 
        animate={{ y: ['350%', '-100%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-pink/20 to-transparent hidden md:block"
      />
      
      {/* HUD Elements simplified */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <div
            key={`hud-box-${i}`}
            className="hidden md:flex absolute flex-col gap-1 opacity-[0.05]"
            style={{ 
              top: (40 + i * 20) + '%', 
              left: (20 + i * 25) + '%'
            }}
          >
            <div className="w-16 h-[1px] bg-brand-purple" />
            <div className="w-2 h-2 border border-brand-purple rotate-45" />
          </div>
        ))}
      </div>

      {/* Connection Nodes Background */}
      <motion.svg 
        animate={{ rotate: -360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-full opacity-[0.08] origin-center scale-[2]"
      >
        <pattern id="dotGridLarge" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#00E5FF" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dotGridLarge)" />
      </motion.svg>
    </div>
  );
}
