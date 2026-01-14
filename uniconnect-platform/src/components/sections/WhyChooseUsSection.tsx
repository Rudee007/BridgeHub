"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  Target,
  TrendingUp,
  Zap,
  ShieldCheck,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Access Top Talent",
    description: "Connect with pre-vetted students from leading universities, ready to contribute to real projects.",
  },
  {
    icon: Target,
    title: "Targeted Matching",
    description: "Our AI-powered matching ensures you find candidates with the exact skills your projects need.",
  },
  {
    icon: TrendingUp,
    title: "Build Your Pipeline",
    description: "Create a sustainable talent pipeline by engaging students before they hit the job market.",
  },
  {
    icon: Zap,
    title: "Fast Onboarding",
    description: "Students come prepared with industry-relevant experience through university partnerships.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "University-verified profiles and project portfolios ensure candidate quality and authenticity.",
  },
  {
    icon: Clock,
    title: "Flexible Engagement",
    description: "From internships to project-based work, choose the engagement model that fits your needs.",
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
      className="group relative p-8 bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300"
    >
      {/* ✅ REMOVED: Gradient overlays that were causing the color issue */}
      
      {/* Simple gradient on hover - only affects background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-50/0 via-white to-secondary-50/0 group-hover:from-primary-50/50 group-hover:to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300"
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
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

export const WhyChooseUsSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-200/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary-200/10 rounded-full blur-3xl" />
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
          <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-700 bg-primary-100 rounded-full">
            Why Companies Choose BridgeHub
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Transform your hiring process with{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 bg-clip-text text-transparent">
                direct access
              </span>
              {/* ✨ Underline decoration */}
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
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
                    <stop offset="0%" stopColor="#ec4899" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
            <br />
            to university talent pools
          </motion.h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join 25,000+ companies building exceptional teams through our platform
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
