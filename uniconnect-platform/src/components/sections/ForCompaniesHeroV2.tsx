import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle } from 'lucide-react';
import { FloatingChip } from '../ui/FloatingChip';

// University chips positions
const universities = [
  { name: 'MIT', x: 12, y: 15 },
  { name: 'Stanford', x: 28, y: 12 },
  { name: 'IIT Delhi', x: 72, y: 18 },
  { name: 'Oxford', x: 88, y: 22 },
  { name: 'Harvard', x: 8, y: 38 },
  { name: 'UC Berkeley', x: 18, y: 52 },
  { name: 'Cambridge', x: 15, y: 68 },
  { name: 'ETH Zurich', x: 85, y: 42 },
  { name: 'IIT Bombay', x: 82, y: 58 },
  { name: 'Toronto', x: 88, y: 72 },
  { name: 'NUS Singapore', x: 25, y: 78 },
  { name: 'Carnegie Mellon', x: 68, y: 75 },
  { name: 'Imperial', x: 45, y: 25 },
  { name: 'Caltech', x: 58, y: 28 },
];

export const ForCompaniesHeroV2 = () => {
  return (
    <section 
      className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-white pt-20"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 via-white to-blue-50/20" />
      
      {/* Floating University Chips */}
      <div className="absolute inset-0 max-h-[65vh] pointer-events-none">
        {universities.map((uni, index) => (
          <FloatingChip
            key={uni.name}
            initialX={uni.x}
            initialY={uni.y}
            delay={index * 0.06}
            onClick={() => console.log(`Clicked: ${uni.name}`)}
          >
            {uni.name}
          </FloatingChip>
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-primary-200/60 mb-6 shadow-lg pointer-events-auto"
        >
          <Building2 className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">
            For Companies
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight leading-tight"
        >
          Find Top{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            University Talent
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Connect with verified students from leading institutions.
          Launch projects, hire talent, and build your team.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 pointer-events-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[240px] justify-center"
          >
            Get Started Free
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-primary-600 hover:text-primary-600 transition-all duration-300 min-w-[240px] shadow-lg"
          >
            Schedule Demo
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600"
        >
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-green-500" />
            <span>Setup in 5 minutes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
