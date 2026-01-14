"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
  delay?: number;
}

const StatItem = ({ value, suffix, label, duration = 2, delay = 0 }: StatItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });

    return () => unsubscribe();
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex flex-col items-center justify-center"
    >
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3">
        {displayValue}
        {displayValue > 0 && suffix}
      </h2>

      <p className="text-gray-300 text-base md:text-lg font-medium">
        {label}
      </p>
    </motion.div>
  );
};

export const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-150px" });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-hidden"
    >
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Optional Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold text-indigo-300 bg-indigo-900/30 border border-indigo-700/30 rounded-full backdrop-blur-sm">
            Trusted by Industry Leaders
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <StatItem
            value={10}
            suffix="M+"
            label="startup-ready talent"
            delay={0.2}
          />
          <StatItem
            value={25}
            suffix="k+"
            label="Companies"
            delay={0.4}
          />
          <StatItem
            value={100}
            suffix="k+"
            label="Hires made"
            delay={0.6}
          />
        </div>

        {/* Tech Logos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">Powering tech teams at leading companies</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-50">
            {/* Add your tech logos here */}
            <div className="text-gray-500 text-xs font-mono">GOOGLE</div>
            <div className="text-gray-500 text-xs font-mono">MICROSOFT</div>
            <div className="text-gray-500 text-xs font-mono">AMAZON</div>
            <div className="text-gray-500 text-xs font-mono">NETFLIX</div>
            <div className="text-gray-500 text-xs font-mono">META</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
