import { motion } from 'framer-motion';
import { AlertTriangle, Sparkles, X, Check } from 'lucide-react';
import { FadeIn } from '../react-bits/FadeIn';

const problems = [
  'Fragmented hiring processes across universities',
  'Limited real industry exposure for students',
  'Manual coordination with no visibility',
  'No academic control over student assignments',
];

const solutions = [
  'Centralized collaboration hub',
  'Verified industry projects at scale',
  'Structured university workflows',
  'Hiring-ready, proven talent',
];

export const ProblemSolution = () => {
  return (
    <section className="relative py-20 md:py-32 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Clean Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-900">
              The Problem We Solve
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Traditional industry-academia collaboration is broken. We're here to fix it.
            </p>
          </div>
        </FadeIn>

        {/* Comparison Cards */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Without BridgeHub Card */}
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Without BridgeHub
                    </h3>
                  </div>

                  {/* Problems List */}
                  <div className="space-y-4">
                    {problems.map((problem, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <X className="w-4 h-4 text-red-500" strokeWidth={2} />
                        </div>
                        <p className="text-gray-600 text-[15px] leading-relaxed">
                          {problem}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Animated Gradient Curve - Updated Brand Colors */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <motion.svg
                width="150"
                height="80"
                viewBox="0 0 150 80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <defs>
                  <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" /> {/* blue-500 */}
                    <stop offset="100%" stopColor="#8B5CF6" /> {/* violet-500 */}
                  </linearGradient>

                  <filter id="dotGlow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <motion.path
                  id="curvePath"
                  d="M 10 40 Q 75 15, 140 40"
                  stroke="url(#curveGradient)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
                />

                <motion.circle
                  r="5"
                  fill="#8B5CF6"
                  filter="url(#dotGlow)"
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{ 
                    offsetDistance: ["0%", "100%"],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    times: [0, 0.1, 0.9, 1]
                  }}
                  style={{
                    offsetPath: "path('M 10 40 Q 75 15, 140 40')",
                  }}
                />
              </motion.svg>
            </div>

            {/* With BridgeHub Card */}
            <FadeIn delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <div className="bg-[#faf8f5] rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      With BridgeHub
                    </h3>
                  </div>

                  {/* Solutions List */}
                  <div className="space-y-4">
                    {solutions.map((solution, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-green-600" strokeWidth={2} />
                        </div>
                        <p className="text-gray-600 text-[15px] leading-relaxed">
                          {solution}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
