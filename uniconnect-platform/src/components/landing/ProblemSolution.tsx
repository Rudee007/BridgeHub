import { motion } from 'framer-motion';
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

// Puzzle piece SVG paths (simplified jigsaw shapes)
const PuzzlePiece = ({ className, delay = 0, connected = false }: { className?: string; delay?: number; connected?: boolean }) => (
  <motion.svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    className={className}
    initial={{ opacity: 0, scale: 0.8, rotate: connected ? 0 : Math.random() * 360 }}
    animate={connected ? {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
    } : {
      opacity: [0.3, 0.5, 0.3],
      scale: [0.9, 1, 0.9],
      rotate: [0, 5, -5, 0],
      x: [0, Math.random() * 20 - 10, 0],
      y: [0, Math.random() * 20 - 10, 0],
    }}
    
    transition={{
      duration: connected ? 0.8 : 4,
      delay: delay,
      repeat: connected ? 0 : Infinity,
      ease: "easeInOut",
    }}
  >
    <path
      d="M 10 10 L 40 10 C 45 10 45 0 40 0 C 35 0 35 10 40 10 L 70 10 L 70 40 C 70 45 80 45 80 40 C 80 35 70 35 70 40 L 70 70 L 40 70 C 35 70 35 80 40 80 C 45 80 45 70 40 70 L 10 70 L 10 40 C 10 35 0 35 0 40 C 0 45 10 45 10 40 Z"
      fill="currentColor"
      strokeWidth="2"
      stroke="currentColor"
      strokeOpacity="0.5"
    />
  </motion.svg>
);

export const ProblemSolution = () => {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] overflow-hidden">
      
      {/* Animated Background Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-3xl"
      />

      <div className="container-custom relative z-10">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                The Problem We
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Solve
              </span>
            </h2>
            <p className="text-lg text-white/60">
              From fragmented chaos to unified collaboration
            </p>
          </div>
        </FadeIn>

        {/* Main Puzzle Visualization */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* LEFT: Scattered Puzzle Pieces (Problems) */}
            <FadeIn delay={0.1}>
              <div className="relative min-h-[400px]">
                
                {/* Card Background */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-10">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-white/90 mb-2">
                      Without BridgeHub
                    </h3>
                    <p className="text-sm text-white/50">Fragmented & Disconnected</p>
                  </div>

                  {/* Problem List */}
                  <div className="space-y-4 relative z-10">
                    {problems.map((problem, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex-shrink-0 mt-1.5">
                          <div className="w-2 h-2 rounded-sm bg-white/30 rotate-45" />
                        </div>
                        <p className="text-white/60 text-[15px] leading-relaxed">
                          {problem}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating Scattered Puzzle Pieces */}
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <PuzzlePiece 
                    className="absolute top-4 left-4 text-blue-400/40" 
                    delay={0}
                  />
                  <PuzzlePiece 
                    className="absolute top-16 right-8 text-purple-400/40" 
                    delay={0.5}
                  />
                  <PuzzlePiece 
                    className="absolute bottom-20 left-12 text-blue-300/40" 
                    delay={1}
                  />
                  <PuzzlePiece 
                    className="absolute bottom-8 right-16 text-purple-300/40" 
                    delay={1.5}
                  />
                </div>
              </div>
            </FadeIn>

            {/* RIGHT: Connected Puzzle Pieces (Solutions) */}
            <FadeIn delay={0.2}>
              <div className="relative min-h-[400px]">
                
                {/* Card Background with Gradient */}
                <div className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-10 overflow-hidden">
                  
                  {/* Glowing connection lines background */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <svg className="w-full h-full">
                      <defs>
                        <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="50%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                      
                      {/* Animated connection lines */}
                      <motion.path
                        d="M 20 20 L 80 80 M 80 20 L 20 80 M 50 0 L 50 100"
                        stroke="url(#connectionGradient)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 2, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
                      />
                    </svg>
                  </div>

                  <div className="relative z-10 mb-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                      With BridgeHub
                    </h3>
                    <p className="text-sm text-white/50">Connected & Unified</p>
                  </div>

                  {/* Solution List */}
                  <div className="space-y-4 relative z-10">
                    {solutions.map((solution, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                        className="flex items-start gap-3 group"
                      >
                        <motion.div 
                          className="flex-shrink-0 mt-1.5"
                          whileHover={{ scale: 1.2, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-2 h-2 rounded-sm bg-gradient-to-br from-emerald-400 to-green-400 rotate-45" />
                        </motion.div>
                        <p className="text-white/80 text-[15px] leading-relaxed group-hover:text-white/95 transition-colors">
                          {solution}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Connected Puzzle Pieces forming a bridge/logo */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                  <PuzzlePiece 
                    className="absolute top-4 left-4 text-blue-400" 
                    delay={0.3}
                    connected
                  />
                  <PuzzlePiece 
                    className="absolute top-4 left-20 text-purple-400" 
                    delay={0.5}
                    connected
                  />
                  <PuzzlePiece 
                    className="absolute bottom-4 left-4 text-purple-400" 
                    delay={0.7}
                    connected
                  />
                  <PuzzlePiece 
                    className="absolute bottom-4 left-20 text-pink-400" 
                    delay={0.9}
                    connected
                  />
                  
                  {/* Light trails connecting pieces */}
                  <svg className="absolute inset-0 w-full h-full">
                    <motion.path
                      d="M 50 30 L 90 30 M 50 70 L 90 70 M 70 30 L 70 70"
                      stroke="url(#connectionGradient)"
                      strokeWidth="2"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                    />
                  </svg>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-white/40 text-sm">
            Traditional collaboration is broken into pieces. We bring them together.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
