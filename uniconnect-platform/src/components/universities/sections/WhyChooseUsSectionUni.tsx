"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  TrendingUp,
  Building2,
  FileSpreadsheet,
  GraduationCap,
  Globe,
  BarChart3,
} from "lucide-react";

// --- UPDATED CONTENT: University/TPO Centric ---
const features = [
  {
    icon: TrendingUp,
    title: "Boost Placement Stats",
    description: "The metric that matters most. We help you secure more offers, higher packages, and better roles for your students.",
  },
  {
    icon: Building2,
    title: "Instant Corporate Network",
    description: "Stop cold calling HRs. Gain direct access to a pre-vetted network of active hiring partners looking for fresh talent.",
  },
  {
    icon: FileSpreadsheet,
    title: "Ditch the Spreadsheets",
    description: "Move your entire placement cell to the cloud. Automated tracking, scheduling, and reporting—no manual data entry required.",
  },
  {
    icon: GraduationCap,
    title: "Beyond the Curriculum",
    description: "Enable students to work on live industry projects. They graduate with real experience, making them 10x more employable.",
  },
  {
    icon: Globe,
    title: "Showcase Your Talent",
    description: "Put your university on the map. We give your students a standardized, professional profile that industry recruiters trust.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Visibility",
    description: "Know exactly who is placed, who isn't, and where the gaps are. Track every student's journey from application to offer letter.",
  },
];

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: any; 
  title: string; 
  description: string; 
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 60, 
        scale: 0.95 
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative p-8 bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
    >
      {/* Simple gradient on hover - adjusted to Blue for Universities */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-50/0 via-white to-indigo-50/0 group-hover:from-blue-50/50 group-hover:to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300"
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const WhyChooseUsSectionUni = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-200/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.015]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
            For Modern Universities
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Your campus has talent.{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 bg-clip-text text-transparent">
                We give them wings.
              </span>

              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isHeaderInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.path
                  d="M0 6 Q50 1, 100 6 T200 6"
                  stroke="url(#gradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bridge the gap between academia and industry. Modernize your placement cell and ensure every student gets the opportunity they deserve.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};