import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export const FloatingElement = ({ 
  children, 
  delay = 0,
  duration = 6,
  yOffset = 20
}: FloatingElementProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};
