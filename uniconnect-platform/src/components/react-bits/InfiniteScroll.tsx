import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface InfiniteScrollProps {
  children: ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export function InfiniteScroll({ 
  children, 
  speed = 20,
  direction = 'left',
  className = '' 
}: InfiniteScrollProps) {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-flex gap-12 md:gap-16"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
      >
        {/* First set */}
        <div className="flex gap-12 md:gap-16">{children}</div>
        {/* Duplicate for seamless loop */}
        <div className="flex gap-12 md:gap-16">{children}</div>
      </motion.div>
    </div>
  );
}
