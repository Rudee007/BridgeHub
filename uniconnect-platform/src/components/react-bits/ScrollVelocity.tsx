import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';

interface ScrollVelocityProps {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}

// Wrap utility function
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ScrollVelocity({ 
  children, 
  baseVelocity = 2,
  className = '' 
}: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div 
        className="flex flex-nowrap"
        style={{ x }}
      >
        {/* Render 4 times for seamless loop */}
        <div className="flex gap-12 md:gap-16 flex-shrink-0">{children}</div>
        <div className="flex gap-12 md:gap-16 flex-shrink-0">{children}</div>
        <div className="flex gap-12 md:gap-16 flex-shrink-0">{children}</div>
        <div className="flex gap-12 md:gap-16 flex-shrink-0">{children}</div>
      </motion.div>
    </div>
  );
}
