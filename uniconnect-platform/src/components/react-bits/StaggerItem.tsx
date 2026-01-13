import { motion,type Variants } from 'framer-motion';
import { type ReactNode } from 'react';

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = '' }: StaggerItemProps) => {
  const item: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1] as const
      }
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};
