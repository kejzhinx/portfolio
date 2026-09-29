import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-zinc-950 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Rotating Element Container */}
          <div className="relative mb-12">
            {/* The image-like square provided in the prompt */}
            <motion.div
              animate={{ 
                rotate: 360,
                boxShadow: [
                  "0 0 20px rgba(0,229,255,0.1)",
                  "0 0 40px rgba(0,229,255,0.3)",
                  "0 0 20px rgba(0,229,255,0.1)"
                ]
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-zinc-900 border-2 border-brand-purple/20 flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-brand-purple/5 to-transparent" />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-brand-purple" />
              <div className="absolute top-0 left-0 w-[2px] h-8 bg-brand-purple" />
              <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-brand-purple" />
              <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-brand-purple" />

              <div className="relative flex items-center gap-1">
                <span className="text-2xl md:text-3xl font-black text-white tracking-widest">SEC</span>
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-2 md:w-3 md:h-3 bg-brand-purple rounded-full"
                />
              </div>
            </motion.div>

            {/* Orbiting particles for extra tech feel */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-4 border border-white/5 rounded-full"
              />
            ))}
          </div>

          {/* Loading Bar Section */}
          <div className="w-64 md:w-80 space-y-3">
            <div className="flex justify-between items-end px-1">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Initial_Load</span>
              <span className="text-[10px] font-mono text-brand-purple font-bold tracking-widest">
                {Math.min(100, Math.round(progress))}%
              </span>
            </div>
            
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                className="h-full bg-brand-purple shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            <motion.p 
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center font-mono text-[9px] text-white/20 uppercase tracking-[0.3em] mt-4"
            >
              Establishing secure connection...
            </motion.p>
          </div>

          {/* Background scan lines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
