import { CountUp } from '../react-bits/CountUp';
import { FadeIn } from '../react-bits/FadeIn';

const stats = [
  { value: 500, suffix: '+', label: 'Partner Companies', subtext: 'From startups to Fortune 500' },
  { value: 200, suffix: '+', label: 'Universities Worldwide', subtext: 'Across 40+ countries' },
  { value: 50, suffix: 'K+', label: 'Students Placed', subtext: 'With 95% retention rate' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', subtext: 'From universities & companies' },
];

export const Stats = () => {
  return (
    <section className="section-spacing bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,rgba(255,255,255,0.2),transparent)]" />
      </div>

      <div className="container-custom relative z-10">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              The Numbers Speak
            </h2>
            <p className="text-xl text-white/80">
              Join thousands of companies and universities transforming education together.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <div className="glass p-8 rounded-2xl text-center group hover:scale-105 transition-transform duration-300">
                <div className="text-6xl font-bold text-white mb-2 font-display">
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-white/70">
                  {stat.subtext}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
