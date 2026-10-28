import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchMatch = window.matchMedia('(pointer: coarse)').matches;
      if (touchMatch || 'ontouchstart' in window) {
        setIsTouchDevice(true);
        return;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor-hover]')
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Sukuna Hand Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100000] will-change-transform"
        style={{
          x: mousePosition.x - 23, // Scaled Hotspot X offset (58 * 0.4)
          y: mousePosition.y - 4,  // Scaled Hotspot Y offset (9 * 0.4)
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5)) drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))',
        }}
        animate={{
          scale: isClicked ? 0.9 : isHovered ? 1.2 : 1,
          rotate: isClicked ? -5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.5 }}
      >
        <img 
          src="/assets/aistudio/sukuna_cursor.png" 
          alt="Sukuna Cursor"
          className="w-[48px] h-auto object-contain"
        />
        
        {/* Optional Flame Glow effect behind the tip */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[4px] left-[24px] w-4 h-4 bg-red-500/30 blur-lg rounded-full -translate-x-1/2 -translate-y-1/2"
        />
      </motion.div>

      {/* Click Micro Ripple Effect */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 border border-red-500 bg-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
            style={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
