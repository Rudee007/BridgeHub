import { Briefcase, Users, TrendingUp, Award, Zap, Shield } from 'lucide-react';
import { FadeIn } from '../react-bits/FadeIn';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Briefcase,
    title: 'Real-World Projects',
    description: 'Connect students with actual industry projects, not just theoretical assignments.',
    stat: '10K+ Projects',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Seamless Collaboration',
    description: 'Universities manage students with full academic control while companies drive innovation.',
    stat: '95% Satisfaction',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Career Acceleration',
    description: 'Students build portfolios with real work experience, leading to better job prospects.',
    stat: '3x Faster Hiring',
    gradient: 'from-pink-500 to-rose-500',
  },
];

export const Features = () => {
  return (
    <section id="features" className="section-spacing bg-white">
      <div className="container-custom">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Why <span className="gradient-text">BridgeHub</span>?
            </h2>
            <p className="text-xl text-gray-600">
              We're solving the disconnect between academic learning and industry needs, one project at a time.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="card card-hover p-8 group"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="text-white" size={32} />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className={`inline-block px-4 py-2 rounded-lg bg-gradient-to-r ${feature.gradient} bg-opacity-10 text-sm font-bold`}>
                  {feature.stat}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
