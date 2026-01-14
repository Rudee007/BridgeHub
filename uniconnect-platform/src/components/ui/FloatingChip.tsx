import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useMemo, useState } from "react";

interface FloatingChipProps {
  children: ReactNode;
  initialX: number;
  initialY: number;
  delay?: number;
  onClick?: () => void;
  mobileMode?: boolean; // ✨ NEW: Optional mobile flag
}

// ✅ OPTIMIZED: Single global mouse position (not offset per chip)
const globalMouse = {
  x: 0,
  y: 0,
  listeners: new Set<() => void>(),
  initialized: false,
  hasMovedOnce: false,

  init() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;

    this.x = window.innerWidth / 2;
    this.y = window.innerHeight / 2;

    const handleMove = (e: MouseEvent) => {
      this.x = e.clientX;
      this.y = e.clientY;
      
      if (!this.hasMovedOnce) {
        this.hasMovedOnce = true;
      }
      
      this.listeners.forEach((fn) => fn());
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
  },
};

export const FloatingChip = ({
  children,
  initialX,
  initialY,
  delay = 0,
  onClick,
  mobileMode = false, // ✨ NEW
}: FloatingChipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const liveDistanceFromCenter = useMotionValue(100);

  const springConfig = { damping: 25, stiffness: 50, mass: 1.2 };
  const x = useSpring(offsetX, springConfig);
  const y = useSpring(offsetY, springConfig);

  const parallaxMultiplier = useMemo(() => {
    const centerX = 50;
    const centerY = 35;
    const distX = initialX - centerX;
    const distY = initialY - centerY;
    const staticDist = Math.sqrt(distX * distX + distY * distY);
    
    const normalized = Math.min(staticDist / 50, 1);
    return 0.5 + normalized * 1.0;
  }, [initialX, initialY]);

  const baseFadeOpacity = useTransform(
    liveDistanceFromCenter,
    [0, 150, 300],
    [0, 0.5, 1]
  );
  
  const baseFadeScale = useTransform(
    liveDistanceFromCenter,
    [0, 150, 300],
    [0.5, 0.85, 1]
  );

  const finalOpacity = useTransform(
    baseFadeOpacity,
    (opacity) => isHovered ? 1 : opacity
  );

  const finalScale = useTransform(
    baseFadeScale,
    (scale) => isHovered ? 1 : scale
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimatedIn(true);
    }, delay * 1000 + 600);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    globalMouse.init();

    const updatePosition = () => {
      if (!globalMouse.hasMovedOnce || !hasAnimatedIn) {
        offsetX.set(0);
        offsetY.set(0);
        
        const initialPosX = (initialX / 100) * window.innerWidth;
        const initialPosY = (initialY / 100) * window.innerHeight;
        
        const heroCenterX = window.innerWidth / 2;
        const heroCenterY = window.innerHeight * 0.35;
        
        const distX = initialPosX - heroCenterX;
        const distY = initialPosY - heroCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        liveDistanceFromCenter.set(distance);
        return;
      }

      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
    
      const mouseOffsetX = (globalMouse.x - viewportCenterX) / viewportCenterX;
      const mouseOffsetY = (globalMouse.y - viewportCenterY) / viewportCenterY;
    
      const moveX = -mouseOffsetX * 205 * parallaxMultiplier;
      const moveY = -mouseOffsetY * 205 * parallaxMultiplier;
    
      offsetX.set(moveX);
      offsetY.set(moveY);
      
      const currentX = (initialX / 100) * window.innerWidth + moveX;
      const currentY = (initialY / 100) * window.innerHeight + moveY;
      
      const heroCenterX = window.innerWidth / 2;
      const heroCenterY = window.innerHeight * 0.35;
      
      const distX = currentX - heroCenterX;
      const distY = currentY - heroCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      liveDistanceFromCenter.set(distance);
    };
    
    globalMouse.listeners.add(updatePosition);
    updatePosition();

    return () => {
      globalMouse.listeners.delete(updatePosition);
    };
  }, [offsetX, offsetY, parallaxMultiplier, initialX, initialY, liveDistanceFromCenter, hasAnimatedIn]);

  // ✨ MOBILE MODE: Simple static button
  if (mobileMode) {
    return (
      <motion.button
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: delay,
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2.5 bg-white border border-gray-200/60 rounded-lg text-sm font-medium text-gray-700 shadow-sm active:shadow-md transition-shadow whitespace-nowrap"
      >
        {children}
      </motion.button>
    );
  }

  // ✅ DESKTOP MODE: Exact same as before (UNCHANGED)
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        position: "absolute",
        left: `${initialX}%`,
        top: `${initialY}%`,
        x,
        y,
        opacity: finalOpacity,
        scale: finalScale,
        zIndex: isHovered ? 9999 : 1,
        pointerEvents: "auto",
      }}
      className="pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      >
        <motion.button
          whileHover={{
            scale: 1.6,
            y: -8,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 1.4 }}
          className="group relative px-10 py-5 bg-white/90 backdrop-blur-sm border border-gray-200/60 rounded-lg text-lg font-bold text-gray-700 shadow-md hover:shadow-2xl hover:border-primary-400 hover:bg-gradient-to-r hover:from-primary-100 hover:to-secondary-100 hover:text-primary-800 transition-all duration-300 cursor-pointer whitespace-nowrap"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-200/0 via-primary-200/70 to-secondary-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 font-medium">{children}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
