"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, GraduationCap } from "lucide-react";

export const GetStartedSectionUni = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white"
    >
      {/* Decorative gradient blobs - Adjusted to Blue/Indigo for 'Academic' feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:20px_20px] opacity-[0.02]" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-12">
        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative p-12 md:p-16 rounded-3xl bg-white border border-gray-200 shadow-xl text-center overflow-hidden"
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-white rounded-3xl" />

          <div className="relative">
            {/* Icon - Changed to Graduation Cap */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -180 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg"
            >
              <GraduationCap className="w-10 h-10 text-white" />
            </motion.div>

            {/* Heading - University Centric */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Transform your Campus{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Placements
              </span>
            </motion.h2>

            {/* Description - Placement Officer Focused */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Connect your students with 500+ top-tier companies. Digitize your TPO, streamline drives, and boost placement rates effortlessly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              {/* Primary Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                Register Institute
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Secondary Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-sm"
              >
                Book TPO Demo
              </motion.button>
            </motion.div>

            {/* Trust Badge - University Specific */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-500 text-sm"
            >
              ✓ Zero cost for universities • AI-powered matching • NAAC compliant reporting
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};