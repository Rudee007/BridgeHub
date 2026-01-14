import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, CheckCircle } from 'lucide-react';
import { FloatingPill } from '../ui/FloatingPill';
import { FadeIn } from '../react-bits/FadeIn';

const companies = [
  { name: 'Google', position: { top: '15%', left: '10%' }, delay: 0 },
  { name: 'Microsoft', position: { top: '20%', right: '15%' }, delay: 0.2 },
  { name: 'Stripe', position: { top: '35%', right: '8%' }, delay: 0.4 },
  { name: 'Tesla', position: { top: '40%', left: '12%' }, delay: 0.6 },
  { name: 'Amazon', position: { top: '60%', left: '8%' }, delay: 0.8 },
  { name: 'Meta', position: { top: '55%', right: '18%' }, delay: 1.0 },
  { name: 'OpenAI', position: { top: '70%', left: '20%' }, delay: 1.2 },
  { name: 'Airbnb', position: { top: '75%', right: '25%' }, delay: 1.4 },
  { name: 'Netflix', position: { bottom: '20%', left: '15%' }, delay: 1.6 },
  { name: 'Spotify', position: { bottom: '15%', right: '12%' }, delay: 1.8 },
];

export const ForUniversitiesHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20" style={{ background: '#F6F7FB' }}>
      {/* Floating Pills Background */}
      <div className="absolute inset-0 hidden lg:block">
        {companies.map((company, index) => (
          <div
            key={company.name}
            className="absolute"
            style={{
              top: company.position.top,
              bottom: company.position.bottom,
              left: company.position.left,
              right: company.position.right,
            }}
          >
            <FloatingPill 
              delay={company.delay}
              duration={4 + index * 0.5}
              onClick={() => console.log(`Clicked ${company.name}`)}
            >
              {company.name}
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-secondary-200 mb-8 shadow-sm"
            >
              <GraduationCap className="w-4 h-4 text-secondary-600" />
              <span className="text-sm font-medium text-secondary-700">
                Trusted by 50+ Universities
              </span>
            </motion.div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.2}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold mb-8 leading-tight">
              Connect Students with{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Real Projects
              </span>
            </h1>
          </FadeIn>

          {/* Subheadline */}
          <FadeIn delay={0.4}>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Partner with innovative companies. Give your students real-world experience while maintaining full academic control.
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
                Join as University
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
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-secondary-600 hover:text-secondary-600 transition-all duration-300 min-w-[240px] shadow-lg"
              >
                Learn More
              </motion.button>
            </div>
          </FadeIn>

          {/* Trust Indicators */}
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Full academic control</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Easy integration</span>
              </div>
              <div className="hidden sm:block w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                <span>Dedicated support</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
