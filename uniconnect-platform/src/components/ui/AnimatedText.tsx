import { motion } from 'framer-motion';

interface AnimatedWordProps {
  word: string;
  index: number;
  isHighlight?: boolean;
}

export const AnimatedWord = ({ word, index, isHighlight }: AnimatedWordProps) => {
  return (
    <span className="inline-block overflow-hidden mr-[0.35em]">
      <motion.span
        className={`inline-block ${isHighlight ? 'gradient-text' : ''}`}
        initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{
          duration: 0.8,
          delay: 0.1 + index * 0.1,
          ease: [0.215, 0.61, 0.355, 1],
        }}
      >
        {word}
      </motion.span>
    </span>
  );
};
