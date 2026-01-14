import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useMemo, useState } from "react";

interface FloatingChipProps {
  children: ReactNode;
  initialX: number;
  initialY: number;
  delay?: number;
  onClick?: () => void;
}

// ✅ OPTIMIZED: Single global mouse position (not offset per chip)
const globalMouse = {
  x: 0,
  y: 0,
  listeners: new Set<() => void>(),
  initialized: false,

  init() {
    if (this.initialized || typeof window === "undefined") return;
    this.initialized = true;

    const handleMove = (e: MouseEvent) => {
      this.x = e.clientX;
      this.y = e.clientY;
      // Notify all chips at once
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
}: FloatingChipProps) => {
  // ✅ NEW: Track hover state for dynamic z-index
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Motion values
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  
  // ✅ NEW: Track LIVE distance from center (updates as chip moves!)
  const liveDistanceFromCenter = useMotionValue(100);

  // ✅ Smooth spring
  const springConfig = { damping: 25, stiffness: 50, mass: 1.2 };
  const x = useSpring(offsetX, springConfig);
  const y = useSpring(offsetY, springConfig);

  // ✅ OPTIMIZED: Parallax multiplier based on distance (farther = moves more)
  const parallaxMultiplier = useMemo(() => {
    const centerX = 50;
    const centerY = 35;
    const distX = initialX - centerX;
    const distY = initialY - centerY;
    const staticDist = Math.sqrt(distX * distX + distY * distY);
    
    const normalized = Math.min(staticDist / 50, 1);
    return 0.5 + normalized * 1.0;
  }, [initialX, initialY]);

  // ✅ FIXED: Dynamic fade based on LIVE position (not static!)
  const fadeOpacity = useTransform(
    liveDistanceFromCenter,
    [0, 150, 300], // Distance thresholds in pixels
    [0, 0.5, 1]    // Opacity: invisible → faint → full
  );
  
  const fadeScale = useTransform(
    liveDistanceFromCenter,
    [0, 150, 300], // Distance thresholds in pixels
    [0.5, 0.85, 1] // Scale: tiny → medium → full
  );

  useEffect(() => {
    // ✅ FIXED: Ensure init runs only once globally
    globalMouse.init();

    const updatePosition = () => {
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;

      // ✅ Mouse offset from center (normalized -1 to 1)
      const mouseOffsetX = (globalMouse.x - viewportCenterX) / viewportCenterX;
      const mouseOffsetY = (globalMouse.y - viewportCenterY) / viewportCenterY;

      // ✅ PARALLAX LAYERS: Each chip moves different amount based on distance
      const moveX = -mouseOffsetX * 150 * parallaxMultiplier;
      const moveY = -mouseOffsetY * 150 * parallaxMultiplier;

      offsetX.set(moveX);
      offsetY.set(moveY);
      
      // ✅ NEW: Calculate LIVE position (initial + offset)
      const currentX = (initialX / 100) * window.innerWidth + moveX;
      const currentY = (initialY / 100) * window.innerHeight + moveY;
      
      // ✅ NEW: Calculate distance from hero center (for fade effect)
      const heroCenterX = window.innerWidth / 2;
      const heroCenterY = window.innerHeight * 0.35; // Hero is at 35% height
      
      const distX = currentX - heroCenterX;
      const distY = currentY - heroCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      
      // ✅ NEW: Update live distance (triggers fade effect!)
      liveDistanceFromCenter.set(distance);
    };

    // ✅ Register this chip's update function globally
    globalMouse.listeners.add(updatePosition);

    // Initial position
    updatePosition();

    return () => {
      // ✅ Cleanup: Remove listener
      globalMouse.listeners.delete(updatePosition);
    };
  }, [offsetX, offsetY, parallaxMultiplier, initialX, initialY, liveDistanceFromCenter]);

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

        // ✅ FIXED: Use LIVE fade values (updates as chip moves!)
        opacity: fadeOpacity,
        scale: fadeScale,

        // ✅ FIXED: zIndex should be in style not animate
        zIndex: isHovered ? 9999 : 1,
      }}
      className="pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Idle floating animation */}
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
        {/* Chip button */}
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
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-200/0 via-primary-200/70 to-secondary-200/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <span className="relative z-10 font-medium">{children}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
