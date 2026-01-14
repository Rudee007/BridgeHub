import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, CheckCircle } from 'lucide-react';
import { FloatingChip } from '../ui/FloatingChip';

// Company chips positions (UNCHANGED)
const companies = [
  { name: 'Google', x: 12, y: 15 },
  { name: 'Microsoft', x: 28, y: 12 },
  { name: 'Stripe', x: 72, y: 18 },
  { name: 'Tesla', x: 88, y: 22 },
  { name: 'Amazon', x: 8, y: 38 },
  { name: 'Meta', x: 18, y: 52 },
  { name: 'OpenAI', x: 15, y: 68 },
  { name: 'Airbnb', x: 85, y: 42 },
  { name: 'Netflix', x: 82, y: 58 },
  { name: 'Spotify', x: 88, y: 72 },
  { name: 'Uber', x: 25, y: 78 },
  { name: 'Adobe', x: 68, y: 75 },
  { name: 'Apple', x: 45, y: 25 },
  { name: 'Salesforce', x: 58, y: 28 },
];

// ✨ NEW: Mobile chips
const mobileChips = ['Google', 'Microsoft', 'Stripe', 'Tesla', 'Amazon', 'Meta', 'OpenAI', 'Airbnb', 'Netflix', 'Spotify'];

export const ForUniversitiesHeroV2 = () => {
  return (
    <>
      {/* ✅ DESKTOP SECTION (EXACTLY AS BEFORE - UNCHANGED) */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden bg-white pt-20 hidden lg:flex">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-purple-50/20" />
        
        <div className="absolute inset-0 max-h-[65vh] pointer-events-none">
          {companies.map((company, index) => (
            <FloatingChip
              key={company.name}
              initialX={company.x}
              initialY={company.y}
              delay={index * 0.06}
              onClick={() => console.log(`Clicked: ${company.name}`)}
            >
              {company.name}
            </FloatingChip>
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-secondary-200/60 mb-8 shadow-lg pointer-events-auto"
          >
            <GraduationCap className="w-4 h-4 text-secondary-600" />
            <span className="text-sm font-medium text-secondary-700">For Universities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tight leading-tight"
          >
            Connect Students with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Real Projects
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Partner with innovative companies. Give your students real-world experience 
            while maintaining full academic control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 pointer-events-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[240px] justify-center"
            >
              Join as University
              <motion.span className="inline-block" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={20} />
              </motion.span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-secondary-600 hover:text-secondary-600 transition-all duration-300 min-w-[240px] shadow-lg"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span>Full academic control</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
            <div className="flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" />
              <span>Easy integration</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ✨ MOBILE SECTION (NEW) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white pt-20 pb-12 lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-purple-50/20" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-secondary-200/60 mb-6 shadow-lg mx-auto"
          >
            <GraduationCap className="w-4 h-4 text-secondary-600" />
            <span className="text-sm font-medium text-secondary-700">For Universities</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight"
          >
            Connect Students with{' '}
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Real Projects
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed"
          >
            Partner with innovative companies. Give your students real-world experience 
            while maintaining full academic control.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 mb-6"
          >
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-xl"
            >
              Join as University
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold text-base border-2 border-gray-200 shadow-lg"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-4 text-xs text-gray-600"
          >
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Full academic control</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Easy integration</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-2xl mx-auto px-6 mt-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {mobileChips.map((chip, index) => (
              <FloatingChip
                key={chip}
                initialX={0}
                initialY={0}
                delay={index * 0.05}
                onClick={() => console.log(`Clicked: ${chip}`)}
                mobileMode={true}
              >
                {chip}
              </FloatingChip>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};
