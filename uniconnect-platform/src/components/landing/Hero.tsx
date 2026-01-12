import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, ChevronDown } from 'lucide-react';
import { NetworkVisualization } from '../ui/NetworkVisualization';
import { AnimatedWord } from '../ui/AnimatedText';
import { MagneticButton } from '../ui/MagneticButton';
import { RippleButton } from '../ui/RippleButton';
import { useMouseGradient } from '@/hooks/useMouseGradient';

export const Hero = () => {
  const sectionRef = useRef(null);
  const mousePosition = useMouseGradient();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const headlineWords = ['Bridge', 'the', 'Gap', 'Between', 'Talent', '&', 'Opportunity'];

  return (
    <section
      ref={sectionRef}
      className="relative hero-height flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
    >
      {/* Mouse-following gradient background */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(139, 92, 246, 0.12) 0%, 
            rgba(99, 102, 241, 0.08) 25%, 
            rgba(59, 130, 246, 0.04) 50%, 
            transparent 70%)`,
        }}
      />

      {/* Static gradient base - Light purple/lavender */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 via-indigo-50/60 to-blue-50/50">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent"
          style={{ opacity: springOpacity }}
        />
      </div>

      {/* Network Visualization Background */}
      <div className="absolute inset-0">
        <NetworkVisualization />
      </div>

      {/* Floating Gradient Orbs - Purple tones */}
      <motion.div
        className="hidden md:block absolute top-20 left-20 w-96 h-96 bg-violet-400/12 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="hidden md:block absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-indigo-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
        style={{ scale: springScale, y: springY }}
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge - Golden ratio spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-violet-200/50 mb-10 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <motion.span
              className="text-sm font-semibold text-indigo-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Trusted by 50+ universities worldwide
            </motion.span>
          </motion.div>

          {/* Headline - Golden Ratio Typography (base × 1.618) */}
          <h1 className="font-display font-black mb-8 leading-[1.1] tracking-tight text-gray-900">
            <span className="block text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.8rem] xl:text-[6.5rem]">
              {headlineWords.map((word, index) => (
                <AnimatedWord
                  key={index}
                  word={word}
                  index={index}
                  isHighlight={false}
                />
              ))}
            </span>
          </h1>

          {/* Subheadline - Golden ratio smaller (headline / 1.618²) */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed font-medium px-4"
          >
          </motion.p>

          {/* Value propositions - Golden ratio spacing (40px ≈ base × φ) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-12 text-base sm:text-lg text-gray-700 px-4"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
              <span className="font-medium">Real Projects: Build portfolios with actual work</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-2.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gray-800" />
              <span className="font-medium">Job Placements: Direct path to full-time roles</span>
            </motion.div>
          </motion.div>

          {/* CTAs - Golden ratio button sizing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20 px-4"
          >
            <MagneticButton strength={0.15}>
              <RippleButton
                variant="primary"
                className="group relative w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[240px]"
              >
                <Building2 size={20} />
                Post Projects & Hire
                <ArrowRight 
                  size={20} 
                  className="group-hover:translate-x-1 transition-transform" 
                />
              </RippleButton>
            </MagneticButton>

            <MagneticButton strength={0.15}>
              <RippleButton
                variant="secondary"
                className="w-full sm:w-auto px-8 py-4 text-base sm:text-lg font-semibold flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm text-gray-900 rounded-xl border-2 border-gray-300 hover:border-gray-400 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300 min-w-[240px]"
              >
                <GraduationCap size={20} />
                Join as University
              </RippleButton>
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators - Golden ratio spacing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
            className="pt-10 border-t border-gray-200/60"
          >
            <p className="text-xs sm:text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">
              Partnering with leading institutions
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {['MIT', 'Stanford', 'Google', 'Microsoft'].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  transition={{ delay: 1.8 + i * 0.1, duration: 0.5 }}
                  className="flex items-center justify-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60 hover:border-gray-300 hover:bg-white/80 transition-all cursor-pointer shadow-sm"
                >
                  <span className="text-sm sm:text-base font-bold text-gray-700">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Scroll</span>
          <ChevronDown className="text-gray-400" size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
};
