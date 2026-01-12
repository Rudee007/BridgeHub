import { Briefcase, Users, TrendingUp } from 'lucide-react';
import { FadeIn } from '../react-bits/FadeIn';
import { FeatureCard } from '../ui/Card';

const features = [
  {
    icon: <Briefcase className="text-white" size={32} />,
    title: 'Real-World Projects',
    description: 'Connect students with actual industry projects, not just theoretical assignments.',
    stat: '10K+ Projects',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Users className="text-white" size={32} />,
    title: 'Seamless Collaboration',
    description: 'Universities manage students with full academic control while companies drive innovation.',
    stat: '95% Satisfaction',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: <TrendingUp className="text-white" size={32} />,
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
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Why <span className="gradient-text">BridgeHub</span>?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4">
              We're solving the disconnect between academic learning and industry needs, one project at a time.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                stat={feature.stat}
                gradient={feature.gradient}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
