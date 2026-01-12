import { motion } from 'framer-motion';
import { CountUp } from '../react-bits/CountUp';
import { FadeIn } from '../react-bits/FadeIn';
import { ScrollVelocity } from '../react-bits/ScrollVelocity';
import { CompanyLogo } from '../ui/CompanyLogo';

const stats = [
  { value: 4, suffix: 'M+', label: 'Matches Made', description: 'Successful project completions' },
  { value: 10, suffix: 'K+', label: 'Tech Jobs', description: 'Students placed in top companies' },
  { value: 5, suffix: 'M+', label: 'Startup Ready Candidates', description: 'Industry-ready graduates' },
];

const logos = [
  { name: 'Stripe', width: 'w-28' },
  { name: 'Notion', width: 'w-28' },
  { name: 'Vercel', width: 'w-28' },
  { name: 'Figma', width: 'w-24' },
  { name: 'Linear', width: 'w-28' },
  { name: 'Slack', width: 'w-24' },
  { name: 'Discord', width: 'w-28' },
  { name: 'Github', width: 'w-28' },
  { name: 'Airbnb', width: 'w-28' },
  { name: 'Uber', width: 'w-24' },
  { name: 'Dropbox', width: 'w-28' },
  { name: 'Zoom', width: 'w-24' },
];

export const StatsAndTrust = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gray-900 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Stats Section */}
        <FadeIn>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="inline-block"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                </span>
                <span className="text-sm font-medium text-gray-300">
                  Trusted by industry leaders
                </span>
              </div>
            </motion.div>
          </div>
        </FadeIn>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {stats.map((stat, index) => (
            <FadeIn key={index} delay={0.1 * index}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center group cursor-default"
              >
                <div className="mb-4">
                  <span className="text-6xl md:text-7xl lg:text-8xl font-bold font-display bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                    <CountUp end={stat.value} duration={1} suffix={stat.suffix} />
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {stat.label}
                </h3>
                
                <p className="text-sm md:text-base text-gray-400">
                  {stat.description}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* Divider Line */}
        <FadeIn delay={0.4}>
          <div className="relative mb-16">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 text-sm text-gray-500 bg-gray-900">
                Startups who used our platform
              </span>
            </div>
          </div>
        </FadeIn>

        {/* ✅ ScrollVelocity - Working Version */}
        <FadeIn delay={0.5}>
          <div className="relative">
            {/* Gradient Fade Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />
            
            {/* ScrollVelocity Component - Fixed & Working */}
            <ScrollVelocity baseVelocity={-5}>
              {logos.map((logo, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="flex-shrink-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col items-center gap-3 px-4">
                    {/* Logo Icon */}
                    <div className={`h-12 ${logo.width} flex items-center justify-center`}>
                      <CompanyLogo 
                        name={logo.name} 
                        className="w-full h-full text-white"
                      />
                    </div>
                    
                    {/* Company Name */}
                    <span className="text-xs font-medium text-gray-400 whitespace-nowrap">
                      {logo.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </ScrollVelocity>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
