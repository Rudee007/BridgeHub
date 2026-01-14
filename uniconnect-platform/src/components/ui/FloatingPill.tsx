import { motion, useMotionValue, useSpring } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';

interface FloatingPillProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  xOffset?: number;
  yOffset?: number;
  onClick?: () => void;
  mouseFollowStrength?: number; // How much to follow mouse (0-1)
}

export const FloatingPill = ({ 
  children, 
  delay = 0,
  duration = 5,
  xOffset = 0,
  yOffset = 0,
  onClick,
  mouseFollowStrength = 0.03 // Default subtle movement
}: FloatingPillProps) => {
  // Global mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate movement based on mouse position relative to viewport center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Apply strength multiplier for subtle movement
      mouseX.set(distanceX * mouseFollowStrength);
      mouseY.set(distanceY * mouseFollowStrength);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, mouseFollowStrength]);

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1,
        y: [yOffset, yOffset - 15, yOffset],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      style={{
        x,
        y,
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
      }}
      whileTap={{ scale: 0.98 }}
      className="px-6 py-3 bg-white border border-gray-200 rounded-full font-medium text-gray-700 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200 shadow-sm cursor-pointer text-sm md:text-base whitespace-nowrap"
    >
      {children}
    </motion.button>
  );
};
