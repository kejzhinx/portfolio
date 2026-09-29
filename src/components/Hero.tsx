import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

function TypewriterSequence({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'waiting' | 'deleting'>('typing');

  useEffect(() => {
    let timer: any;
    const currentPhrase = phrases[index % phrases.length];

    if (phase === 'typing') {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setPhase('waiting');
        }, 100);
      }
    } else if (phase === 'waiting') {
      timer = setTimeout(() => {
        setPhase('deleting');
      }, 2500);
    } else if (phase === 'deleting') {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 40);
      } else {
        setPhase('typing');
        setIndex(prev => prev + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [index, displayText, phase, phrases]);

  return (
    <span className="relative inline-flex items-center min-w-0">
      <span className="transition-opacity duration-300 whitespace-nowrap">
        <span className="text-gradient">
          {displayText}
        </span>
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[0.9em] bg-brand-purple ml-2 flex-shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.8)]"
      />
    </span>
  );
}

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-dvh md:h-screen flex flex-col items-center justify-center pt-12 md:pt-16 pb-4 md:pb-8 px-6 md:px-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-purple/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-zinc-800/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10 flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex relative w-full md:col-span-5 z-10 opacity-80 md:opacity-100 items-center justify-center min-h-[200px] md:min-h-[500px] pointer-events-none md:order-last"
        >
          {/* Main Floating Object Group */}
          <div className="relative w-full h-full flex items-center justify-center scale-[0.55] sm:scale-75 md:scale-100">
            
            {/* Primary Orbiting Prism - Refined with outer ring */}
            <motion.div 
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-brand-purple/20 blur-[40px] animate-pulse" />
              
              <div className="w-40 h-40 md:w-56 md:h-56 glass-card rounded-3xl border-brand-purple/40 shadow-[0_0_50px_rgba(0,229,255,0.3)] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-brand-purple/10 to-transparent" />
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-purple" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-purple" />
                
                <motion.div 
                   animate={{ scale: [1, 1.1, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                   className="w-20 h-20 md:w-28 md:h-28 bg-linear-to-br from-brand-purple to-brand-pink rounded-3xl blur-2xl opacity-30" 
                />
                <div className="z-10 text-xl md:text-2xl font-black text-white/40 font-mono tracking-tighter">
                  SEC<span className="text-brand-purple">.</span>
                </div>
              </div>
            </motion.div>

            {/* Orbiting Elements - Fewer for mobile performance */}
            <motion.div 
              animate={{ rotate: 360, x: [60, 100, 60], y: [-20, 20, -20] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute w-10 h-10 md:w-12 md:h-12 glass-card rounded-xl border-brand-pink/40 shadow-lg"
            />

            <motion.div 
              animate={{ rotate: -360, x: [-80, -120, -80], y: [40, -40, 40] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-12 h-12 md:w-16 md:h-16 glass-card rounded-full border-brand-purple/40 shadow-lg"
            />

            <div className="hidden md:block">
              <motion.div 
                animate={{ y: [0, 40, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-10 w-4 h-4 bg-indigo-500 rounded-full blur-[2px]"
              />

              <motion.div 
                animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 left-20 w-8 h-8 glass-card rounded-lg rotate-12 border-white/10"
              />
            </div>

            {/* Glowing lines connections effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
               <div className="w-[120%] h-px bg-linear-to-r from-transparent via-indigo-500/20 to-transparent rotate-12" />
               <div className="w-[120%] h-px bg-linear-to-r from-transparent via-sky-500/20 to-transparent -rotate-12" />
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="space-y-6 md:space-y-8 md:col-span-7 z-20 relative -mt-6 md:mt-0"
        >
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-xl sm:text-3xl md:text-5xl font-black leading-[1.1] tracking-tighter min-h-[2.5em] md:min-h-[2.2em]">
              <span className="block mb-2 md:mb-4">Hi, I am Jeric</span>
              <div className="relative">
                <TypewriterSequence phrases={["Web Penetration Tester", "Graphics Designer"]} />
              </div>
            </h1>
            <div className="space-y-4">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-brand-purple text-[10px] md:text-sm font-mono tracking-widest uppercase border-l-2 border-brand-purple/30 pl-4 font-bold"
              >
                Cybersecurity Expert | Visual Identity Specialist
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-white/70 text-xs md:text-sm max-w-2xl leading-relaxed"
              >
                8 years of hands-on experience as a Web Penetration Tester. Securing digital infrastructures while crafting professional brand identities.
              </motion.p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
              <button 
                onClick={() => navigate('/project')}
                className="px-8 py-3.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-2xl transition-all shadow-2xl shadow-black/20 text-xs md:text-sm cursor-pointer"
              >
                My Work
              </button>
            <button 
              onClick={() => navigate('/resume')}
              className="px-8 py-3.5 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white font-bold rounded-2xl transition-all bg-white/[0.02] backdrop-blur-sm text-xs md:text-sm cursor-pointer"
            >
              Hire Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
