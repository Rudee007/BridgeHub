import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { FadeIn } from '../react-bits/FadeIn';
import { FloatingElement } from '../react-bits/FloatingElement';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-violet-50/30 pt-20">
      {/* Animated Background Blobs */}
      <FloatingElement delay={0} duration={8} yOffset={30}>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl" />
      </FloatingElement>
      
      <FloatingElement delay={1} duration={10} yOffset={40}>
        <div className="absolute bottom-20 left-20 w-[32rem] h-[32rem] bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-3xl" />
      </FloatingElement>

      {/* Floating Decorative Elements */}
      <FloatingElement delay={0.5} duration={7} yOffset={15}>
        <div className="absolute top-32 left-12 w-16 h-16 bg-primary-500/10 rounded-2xl rotate-12" />
      </FloatingElement>
      
      <FloatingElement delay={1.5} duration={9} yOffset={20}>
        <div className="absolute bottom-32 right-16 w-20 h-20 bg-secondary-500/10 rounded-full" />
      </FloatingElement>

      <FloatingElement delay={2} duration={6} yOffset={12}>
        <div className="absolute top-1/2 right-32 w-12 h-12 bg-accent-500/10 rounded-xl -rotate-12" />
      </FloatingElement>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <FadeIn delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full text-sm font-medium text-primary-700 shadow-lg mb-8"
          >
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            Trusted by 50+ universities worldwide
          </motion.div>
        </FadeIn>

        {/* Main Headline */}
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold mb-6 leading-tight">
            Where Industry Meets<br />
            <span className="gradient-text">Academia</span> — At Scale.
          </h1>
        </FadeIn>

        {/* Subheadline */}
        <FadeIn delay={0.3}>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            One platform for companies to launch real projects and hire talent,
            while universities manage students with full academic control.
          </p>
        </FadeIn>

        {/* CTA Buttons */}
        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold text-lg flex items-center gap-2 shadow-xl"
            >
              Partner as a Company
              <ArrowRight size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-primary-600 hover:text-primary-600 transition"
            >
              Join as a University
            </motion.button>
          </div>
        </FadeIn>

        {/* Stats Cards */}
        <FadeIn delay={0.5}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Partner Companies", gradient: "from-blue-500 to-cyan-500" },
              { number: "200+", label: "Universities", gradient: "from-violet-500 to-purple-500" },
              { number: "50K+", label: "Students Placed", gradient: "from-pink-500 to-rose-500" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass p-8 rounded-2xl shadow-xl cursor-pointer"
              >
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
