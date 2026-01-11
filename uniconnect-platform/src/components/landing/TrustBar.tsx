import { motion } from 'framer-motion';

const logos = [
  { name: 'Plaid', width: 'w-24' },
  { name: 'Airtable', width: 'w-28' },
  { name: 'NerdWallet', width: 'w-32' },
  { name: 'Adonis', width: 'w-24' },
  { name: 'Consensys', width: 'w-32' },
];

export const TrustBar = () => {
  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <p className="text-center text-gray-400 text-sm font-medium">
          Startups who used our platform
        </p>
      </div>

      <div className="relative">
        <motion.div
          animate={{
            x: [0, -1920], // Adjust based on total width
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex gap-12 items-center"
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <div className={`h-12 ${logo.width} bg-white/10 rounded-lg flex items-center justify-center`}>
                <span className="text-white font-semibold text-lg">{logo.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
