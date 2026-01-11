import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Building2, GraduationCap, ChevronDown } from 'lucide-react';
import { NetworkVisualization } from '../ui/NetworkVisualization';
import { AnimatedWord } from '../ui/AnimatedText';
import { MagneticButton } from '../ui/MagneticButton';

export const Hero = () => {
  const sectionRef = useRef(null);
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

  const headlineWords = ['Where', 'Industry', 'Meets', 'Academia', '—', 'At', 'Scale.'];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50/30 to-violet-50/30">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-transparent"
          style={{ opacity: springOpacity }}
        />
      </div>

      {/* Network Visualization Background */}
      <div className="absolute inset-0">
        <NetworkVisualization />
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-[32rem] h-[32rem] bg-secondary-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container max-w-7xl mx-auto px-6 lg:px-8 py-20"
        style={{ scale: springScale, y: springY }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-200 mb-8 shadow-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <motion.span
              className="text-sm font-medium text-primary-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Trusted by 50+ universities worldwide
            </motion.span>
          </motion.div>

          {/* Headline with Word Animation */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold mb-8 leading-tight">
            {headlineWords.map((word, index) => (
              <AnimatedWord
                key={index}
                word={word}
                index={index}
                isHighlight={word === 'Academia'}
              />
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            One platform for companies to launch real projects and hire talent,
            while universities manage students with full academic control.
          </motion.p>

          {/* CTAs with Magnetic Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <MagneticButton strength={0.15}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-xl hover:shadow-glow-primary transition-all duration-300 min-w-[240px] justify-center"
              >
                <Building2 size={20} />
                Partner as a Company
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
            </MagneticButton>

            <MagneticButton strength={0.15}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-primary-600 hover:text-primary-600 transition-all duration-300 min-w-[240px] flex items-center gap-2 justify-center shadow-lg"
              >
                <GraduationCap size={20} />
                Join as a University
                <motion.span
                  className="inline-block opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight size={20} />
                </motion.span>
              </motion.button>
            </MagneticButton>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="pt-8 border-t border-gray-200/50"
          >
            <p className="text-sm text-gray-500 mb-6 font-medium">
              Partnering with leading institutions
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {['University A', 'Tech Corp', 'Global Inc', 'Innovation Labs'].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.4, y: 0 }}
                  whileHover={{ opacity: 1, scale: 1.1 }}
                  transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
                  className="flex items-center justify-center px-6 py-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50 grayscale hover:grayscale-0 transition-all cursor-pointer shadow-sm"
                >
                  <span className="text-sm font-semibold text-gray-700">{name}</span>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs text-gray-500 font-medium">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            />
          </div>
          <ChevronDown className="text-gray-400 animate-bounce" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};
