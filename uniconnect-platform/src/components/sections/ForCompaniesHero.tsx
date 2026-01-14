import { motion } from 'framer-motion';
import { ArrowRight, Building2, CheckCircle } from 'lucide-react';
import { FloatingPill } from '../ui/FloatingPill';
import { FadeIn } from '../react-bits/FadeIn';

const universities = [
  { name: 'MIT', position: { top: '15%', left: '10%' }, delay: 0 },
  { name: 'Stanford', position: { top: '20%', right: '15%' }, delay: 0.2 },
  { name: 'IIT Delhi', position: { top: '35%', right: '8%' }, delay: 0.4 },
  { name: 'Oxford', position: { top: '40%', left: '12%' }, delay: 0.6 },
  { name: 'Harvard', position: { top: '60%', left: '8%' }, delay: 0.8 },
  { name: 'UC Berkeley', position: { top: '55%', right: '18%' }, delay: 1.0 },
  { name: 'Cambridge', position: { top: '70%', left: '20%' }, delay: 1.2 },
  { name: 'ETH Zurich', position: { top: '75%', right: '25%' }, delay: 1.4 },
  { name: 'IIT Bombay', position: { bottom: '15%', right: '12%' }, delay: 1.6 },
];

export const ForCompaniesHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20" style={{ background: '#FCF4F6' }}>
      {/* Floating Pills Background */}
      <div className="absolute inset-0 hidden lg:block">
        {universities.map((uni, index) => (
          <div
            key={uni.name}
            className="absolute"
            style={{
              top: uni.position.top,
              bottom: uni.position.bottom,
              left: uni.position.left,
              right: uni.position.right,
            }}
          >
            <FloatingPill 
              delay={uni.delay}
              duration={4 + index * 0.5}
              onClick={() => console.log(`Clicked ${uni.name}`)}
            >
              {uni.name}
            </FloatingPill>
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
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
      <div className="relative z-10 container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <FadeIn delay={0}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-200 mb-8 shadow-sm"
            >
              <Building2 className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">
                Trusted by 200+ Companies
              </span>
            </motion.div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold mb-8 leading-tight">
              Find Top{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                University Talent
              </span>
            </h1>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Connect with verified students from leading institutions. Launch projects, hire talent, and build your team.
            </p>
          </FadeIn>

          {/* CTA Buttons */}
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-xl hover:shadow-glow-primary transition-all duration-300 min-w-[240px] justify-center"
              >
                Get Started Free
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
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
            </div>
          </FadeIn>

          {/* Trust Indicators */}
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Free forever plan</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
