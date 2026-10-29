import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'motion/react';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const touchMatch = window.matchMedia('(pointer: coarse)').matches;
      if (touchMatch || 'ontouchstart' in window) {
        setIsTouchDevice(true);
        return;
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-cursor-hover]')
        );
        setIsHovered(interactive);
      }
    };

    const onMouseDown = () => setIsPressed(true);
    const onMouseUp = () => setIsPressed(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100000] will-change-transform"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: -12,
        translateY: -3,
      }}
    >
      <div className="relative pointer-events-none">
        <motion.img 
          src="/assets/images/sukuna_cursor.png" 
          alt="Sukuna Custom Cursor"
          animate={{
            scale: isPressed ? 0.9 : isHovered ? 1.15 : 1,
            rotate: isPressed ? -4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="w-[38px] h-auto object-contain pointer-events-none"
          style={{
            filter: 'hue-rotate(185deg) saturate(2.2) brightness(1.15) drop-shadow(0 0 10px rgba(59, 130, 246, 0.85))',
          }}
        />
      </div>
    </motion.div>
  );
}


